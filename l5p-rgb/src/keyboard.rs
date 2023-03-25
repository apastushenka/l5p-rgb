use crate::effect::Effect;
use hidapi::{HidApi, HidDevice, HidError};
use once_cell::sync::Lazy;
use std::collections::HashSet;
use thiserror::Error;

static DEVICES: Lazy<HashSet<(u16, u16)>> = Lazy::new(|| {
    let mut devices = HashSet::new();
    devices.insert((0x048d, 0xc955));
    devices.insert((0x048d, 0xc963));
    devices.insert((0x048d, 0xc965));
    devices.insert((0x048d, 0xc975));
    devices
});

#[derive(Error, Debug)]
pub enum KeyboardError {
    #[error("no supported devices found")]
    DeviceNotFound,

    #[error("device error")]
    DeviceError(#[from] HidError),
}

pub struct Keyboard {
    keyboard: HidDevice,
}

impl Keyboard {
    pub fn new() -> Result<Self, KeyboardError> {
        let api = HidApi::new()?;

        let device = api
            .device_list()
            .find(|&d| DEVICES.contains(&(d.vendor_id(), d.product_id())))
            .ok_or(KeyboardError::DeviceNotFound)?;

        let keyboard = Keyboard {
            keyboard: device.open_device(&api)?,
        };

        Ok(keyboard)
    }

    pub fn set_effect(&self, effect: Effect) -> Result<(), KeyboardError> {
        self.keyboard.send_feature_report(&effect.build())?;

        Ok(())
    }
}
