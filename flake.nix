{
  description = "Empty flake with basic devshell";

  inputs = {
    systems.url = "github:nix-systems/default";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";

    agenix = {
      url = "github:ryantm/agenix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    agenix-shell = {
      url = "github:aciceri/agenix-shell";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    treefmt-nix = {
      url = "github:numtide/treefmt-nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    git-hooks-nix = {
      url = "github:cachix/git-hooks.nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = inputs @ {
    nixpkgs,
    flake-parts,
    agenix,
    ...
  }: let
    inherit (nixpkgs) lib;
  in
    flake-parts.lib.mkFlake {inherit inputs;} {
      imports = with inputs; [
        agenix-shell.flakeModules.default
        treefmt-nix.flakeModule
        git-hooks-nix.flakeModule
      ];
      systems = import inputs.systems;
      agenix-shell.secrets = (import ./secrets.nix {inherit lib;}).agenix-shell-secrets;
      perSystem = {
        pkgs,
        config,
        system,
        ...
      }: {
        _module.args.pkgs = import nixpkgs {
          inherit system;
          overlays = [
            (_: _: {
              agenix = agenix.packages.${system}.default;
            })
          ];
          config.allowUnfree = true;
        };

        devShells.default = import ./shell.nix {
          inherit lib pkgs;
          config = {
            inherit (config) pre-commit agenix-shell;
          };
        };

        treefmt = import ./treefmt.nix {
          inherit lib pkgs;
        };

        pre-commit = import ./pre-commit.nix {
          inherit lib pkgs;
        };

        apps = rec {
          deploy = {
            type = "app";
            program = "${pkgs.writeShellApplication {
              name = "deploy";
              runtimeInputs = with pkgs; [
                docker
              ];
              text = ''
                nix run .#teardown

                sleep 5 # Wait for all services to disapear

                # Create required networks
                docker network create --driver overlay --attachable proxy

                # Deploy the new stack
                docker stack deploy -c docker/swarm-cd/docker-compose.yml swarm-cd
              '';
            }}/bin/deploy";
          };

          teardown = {
            type = "app";
            program = "${pkgs.writeShellApplication {
              name = "teardown";
              runtimeInputs = with pkgs; [
                docker
              ];
              text = ''
                docker stack rm swarm-cd

                docker stack ls | awk 'NR > 1 {print $1}' | while read -r stack; do
                  echo "Removing stack: $stack"
                  docker stack rm "$stack"
                done
              '';
            }}/bin/teardown";
          };

          default = deploy;
        };
      };
    };
}
