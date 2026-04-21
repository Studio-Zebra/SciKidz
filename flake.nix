{
  description = "Empty flake with basic devshell";

  inputs = {
    systems.url = "github:nix-systems/default";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";

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
    github-actions-nix = {
      url = "github:synapdeck/github-actions-nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = inputs @ {
    self,
    nixpkgs,
    flake-parts,
    ...
  }: let
    inherit (nixpkgs) lib;
  in
    flake-parts.lib.mkFlake {inherit inputs;} {
      imports = with inputs; [
        agenix-shell.flakeModules.default
        treefmt-nix.flakeModule
        git-hooks-nix.flakeModule
        github-actions-nix.flakeModule
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
          config.allowUnfree = true;
        };

        devShells.default = import ./shell.nix {
          inherit lib pkgs;
          config = {
            inherit (config) pre-commit agenix-shell githubActions;
          };
        };

        # --- Configuration Builders --- #
        githubActions = import ./actions.nix {inherit self lib;};
        treefmt = import ./treefmt.nix {inherit lib pkgs;};
        pre-commit = import ./pre-commit.nix {inherit lib pkgs;};

        apps = rec {
          deploy = {
            type = "app";
            program = "${
              pkgs.writeShellApplication {
                name = "deploy";
                runtimeInputs = with pkgs; [
                  docker
                ];
                text = ''
                  nix run .#teardown

                  sleep 10 # Wait for all services to disapear

                  # Create required networks
                  if ! docker network ls | grep -q proxy; then
                    docker network create --driver overlay --attachable proxy
                  fi

                  # Deploy the new stack
                  docker stack deploy -c docker/swarm-cd/docker-compose.yml swarm-cd
                '';
              }
            }/bin/deploy";
          };

          teardown = {
            type = "app";
            program = "${
              pkgs.writeShellApplication {
                name = "teardown";
                runtimeInputs = with pkgs; [
                  docker
                ];
                text = ''
                  STACKS="${lib.concatStringsSep
                    " "
                    (
                      builtins.attrNames
                      (builtins.readDir ./docker)
                    )}"

                  # Remove each stack
                  echo "Removing stacks: $STACKS"
                  for stack in $STACKS; do
                    echo "Removing stack: $stack"
                    docker stack rm "$stack"
                  done

                  sleep 10

                  if docker network ls | grep -q proxy; then
                    echo "Removing network: proxy"
                    docker network rm proxy
                  fi

                  if [ "$#" -eq 1 ] && [ "$1" == "--complete" ] && docker volume ls | grep -q mongodb_mongodb-data; then
                    echo "Removing volume: mongodb_mongodb-data"
                    docker volume rm mongodb_mongodb-data
                  fi
                '';
              }
            }/bin/teardown";
          };

          default = deploy;
        };
      };
    };
}
