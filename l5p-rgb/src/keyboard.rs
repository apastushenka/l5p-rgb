use crate::effect::Effect;
use hidapi::{HidApi, HidDevice};
use std::error::Error;

const DEVICES: &[(u16, u16)] = &[(0x048d, 0xc965)];

pub struct Keyboard {
    keyboard: HidDevice,
}

impl Keyboard {
    pub fn new() -> Result<Self, Box<dyn Error>> {
        let api = HidApi::new()?;

        let device = api
            .device_list()
            .find(|&d| DEVICES.contains(&(d.vendor_id(), d.product_id())))
            .ok_or("device not found")?;

        let keyboard = Keyboard {
            keyboard: device.open_device(&api)?,
        };

        Ok(keyboard)
    }

    pub fn set_effect(&self, effect: Effect) -> Result<(), Box<dyn Error>> {
        self.keyboard.send_feature_report(&effect.build())?;

        Ok(())
    }
}
