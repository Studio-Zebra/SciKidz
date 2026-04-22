{
  pkgs,
  config,
  ...
}:
with pkgs;
  mkShell {
    packages = [
      nixd
      alejandra

      ssh-to-age
      age
      agenix-cli
      sops

      (python3.withPackages (ps:
        with ps; [
          ansible-core
          ansible
        ]))
      ansible-lint
    ];

    shellHook = ''
      ${config.pre-commit.shellHook}
      source ${config.agenix-shell.installationScript}/bin/install-agenix-shell
    '';
  }
