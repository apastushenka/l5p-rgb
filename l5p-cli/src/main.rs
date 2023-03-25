use anyhow::{Context, Result};
use clap::Parser;
use l5p_rgb::{effect::Effect, keyboard::Keyboard};

mod cli;
use cli::{Cli, Colors, Direction, Effects};

fn main() -> Result<()> {
    let cli = Cli::parse();

    let effect = match cli.effect {
        Effects::Static(Colors {
            color1,
            color2,
            color3,
            color4,
        }) => Effect::Static {
            color: [color1, color2, color3, color4],
            brightness: cli.brightness,
        },
        Effects::Breath(Colors {
            color1,
            color2,
            color3,
            color4,
        }) => Effect::Breath {
            color: [color1, color2, color3, color4],
            brightness: cli.brightness,
            speed: cli.speed,
        },
        Effects::Wave { direction } => Effect::Wave {
            brightness: cli.brightness,
            speed: cli.speed,
            direction: match direction {
                Direction::Ltr => l5p_rgb::effect::Direction::LeftToRight,
                Direction::Rtl => l5p_rgb::effect::Direction::RightToRight,
            },
        },
        Effects::Smooth {} => Effect::Smooth {
            brightness: cli.brightness,
            speed: cli.speed,
        },
    };

    let keyboard = Keyboard::new().context("Failed to open device")?;

    keyboard
        .set_effect(effect)
        .context("Failed to write to device")?;

    Ok(())
}
