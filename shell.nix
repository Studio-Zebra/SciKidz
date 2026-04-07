{
  pkgs,
  config,
  ...
}:
with pkgs;
  mkShell {
    packages = [
      nixd

      ssh-to-age
      age
      agenix
      sops
    ];

    shellHook = ''
      ${config.pre-commit.shellHook}
      source ${config.agenix-shell.installationScript}/bin/install-agenix-shell
    '';
  }
