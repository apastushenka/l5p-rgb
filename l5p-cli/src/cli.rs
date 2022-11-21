use clap::{Args, Parser, Subcommand, ValueEnum};
use csscolorparser::ParseColorError;
use l5p_rgb::{
    effect::{Brightness, Rgb, Speed},
    ranged::Ranged,
};

#[derive(Parser)]
#[command()]
pub struct Cli {
    /// Light brightness in range 1-2
    #[arg(short, long, default_value = "1", value_parser = parse_brightness)]
    pub brightness: Brightness,

    /// Animation speed in range 1-4
    #[arg(short, long, default_value = "1", value_parser = parse_speed)]
    pub speed: Speed,

    #[command(subcommand)]
    pub effect: Effects,
}

#[derive(Subcommand)]
pub enum Effects {
    Static(Colors),
    Breath(Colors),
    Wave {
        /// Direction of the effect
        #[arg(value_enum)]
        direction: Direction,
    },
    Smooth {},
}

#[derive(Args)]
pub struct Colors {
    #[arg(value_parser = parse_color)]
    pub color1: Rgb,

    #[arg(value_parser = parse_color)]
    pub color2: Rgb,

    #[arg(value_parser = parse_color)]
    pub color3: Rgb,

    #[arg(value_parser = parse_color)]
    pub color4: Rgb,
}

#[derive(Clone, ValueEnum)]
pub enum Direction {
    Ltr,
    Rtl,
}

fn parse_color(s: &str) -> Result<Rgb, ParseColorError> {
    let color = csscolorparser::parse(s)?;
    let [r, g, b, _] = color.to_rgba8();

    Ok(Rgb(r, g, b))
}

fn parse_brightness(s: &str) -> Result<Brightness, String> {
    parse_ranged(s)
}

fn parse_speed(s: &str) -> Result<Speed, String> {
    parse_ranged(s)
}

fn parse_ranged<const MIN: u8, const MAX: u8>(s: &str) -> Result<Ranged<MIN, MAX>, String> {
    let value = s.parse::<u8>().map_err(|e| e.to_string())?;
    let result = value.try_into()?;

    Ok(result)
}
