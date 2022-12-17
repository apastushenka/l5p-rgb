#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use l5p_rgb::{
    effect::{Brightness, Direction, Effect, Speed},
    keyboard::Keyboard,
};
use serde::Deserialize;
use std::sync::Mutex;

#[derive(Deserialize)]
struct Rgb {
    r: u8,
    g: u8,
    b: u8,
}

impl From<Rgb> for l5p_rgb::effect::Rgb {
    fn from(rgb: Rgb) -> Self {
        l5p_rgb::effect::Rgb(rgb.r, rgb.g, rgb.b)
    }
}

#[derive(Deserialize)]
struct Color([Rgb; 4]);

impl From<Color> for l5p_rgb::effect::Color {
    fn from(color: Color) -> Self {
        let [c0, c1, c2, c3] = color.0;
        [c0.into(), c1.into(), c2.into(), c3.into()]
    }
}

#[tauri::command]
fn set_static_effect(
    state: tauri::State<Mutex<Keyboard>>,
    color: Color,
    brightness: u8,
) -> Result<(), String> {
    let effect = Effect::Static {
        color: color.into(),
        brightness: Brightness::try_from(brightness)?,
    };

    set_effect(state, effect)
}

#[tauri::command]
fn set_breath_effect(
    state: tauri::State<Mutex<Keyboard>>,
    color: Color,
    brightness: u8,
    speed: u8,
) -> Result<(), String> {
    let effect = Effect::Breath {
        color: color.into(),
        brightness: Brightness::try_from(brightness)?,
        speed: Speed::try_from(speed)?,
    };

    set_effect(state, effect)
}

#[tauri::command]
fn set_wave_effect(
    state: tauri::State<Mutex<Keyboard>>,
    brightness: u8,
    speed: u8,
    direction: &str,
) -> Result<(), String> {
    let direction = match direction {
        "ltr" => Direction::LeftToRight,
        "rtl" => Direction::RightToRight,
        _ => return Err("invalid direction".into()),
    };

    let effect = Effect::Wave {
        brightness: Brightness::try_from(brightness)?,
        speed: Speed::try_from(speed)?,
        direction,
    };

    set_effect(state, effect)
}

fn set_effect(state: tauri::State<Mutex<Keyboard>>, effect: Effect) -> Result<(), String> {
    println!("Set effect: {:?}", effect);

    let keyboard = state.lock().unwrap();

    keyboard.set_effect(effect).map_err(|e| e.to_string())
}

fn main() {
    let keyboard = Keyboard::new().unwrap();

    tauri::Builder::default()
        .manage(Mutex::new(keyboard))
        .invoke_handler(tauri::generate_handler![
            set_static_effect,
            set_breath_effect,
            set_wave_effect,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
