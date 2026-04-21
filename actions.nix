_: {
  enable = true;

  workflows = {
    push-image = {
      name = "Push Image";
      on = {
        pullRequest = {
          branches = ["main"];
        };
      };
      jobs = {
        push-image = {
          runsOn = "ubuntu-24.04";
          steps = [
            {
              name = "Checkout code";
              uses = "actions/checkout@v4";
            }
            {
              name = "Setup Nix";
              uses = "DeterminateSystems/nix-installer-action@v14";
            }
            {
              name = "Magic Nix Cache";
              uses = "DeterminateSystems/magic-nix-cache-action@v8";
              with_ = {
                use-flakehub = false;
              };
            }
          ];
        };
      };
    };
  };
}
