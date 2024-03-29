mod color;
pub use color::{Color, Rgb};

mod brightness;
pub use brightness::Brightness;

mod speed;
pub use speed::Speed;

mod direction;
pub use direction::Direction;

trait Serialize {
    fn serialize(&self, payload: &mut Payload);
}

pub(crate) type Payload = [u8; 33];

#[derive(Clone, Debug)]
pub enum Effect {
    Static {
        color: Color,
        brightness: Brightness,
    },
    Breath {
        color: Color,
        brightness: Brightness,
        speed: Speed,
    },
    Wave {
        brightness: Brightness,
        speed: Speed,
        direction: Direction,
    },
    Smooth {
        brightness: Brightness,
        speed: Speed,
    },
}

impl Serialize for Effect {
    fn serialize(&self, payload: &mut Payload) {
        payload[0] = 0xCC;
        payload[1] = 0x16;

        payload[2] = match self {
            Effect::Static { color, brightness } => {
                // TODO: do we really need it?
                let speed = Speed::try_from(1).unwrap();
                speed.serialize(payload);

                color.serialize(payload);
                brightness.serialize(payload);
                0x01
            }
            Effect::Breath {
                color,
                brightness,
                speed,
            } => {
                color.serialize(payload);
                brightness.serialize(payload);
                speed.serialize(payload);
                0x03
            }
            Effect::Wave {
                brightness,
                speed,
                direction,
            } => {
                brightness.serialize(payload);
                speed.serialize(payload);
                direction.serialize(payload);
                0x04
            }
            Effect::Smooth { brightness, speed } => {
                brightness.serialize(payload);
                speed.serialize(payload);
                0x06
            }
        }
    }
}

impl Effect {
    pub(crate) fn build(&self) -> Payload {
        let mut payload = [0; 33];
        self.serialize(&mut payload);
        payload
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    const COLOR: Color = [
        Rgb(12, 15, 18),
        Rgb(22, 25, 28),
        Rgb(32, 35, 38),
        Rgb(42, 45, 48),
    ];

    #[test]
    fn build_effect_from_static() {
        let effect = Effect::Static {
            color: COLOR,
            brightness: Brightness::try_from(2).unwrap(),
        };

        #[rustfmt::skip]
        let expected = [
            0xCC, 0x16, 0x01, 0x01, 0x02,
            12, 15, 18, 22, 25, 28, 32, 35, 38, 42, 45, 48, // color
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ];

        assert_eq!(effect.build(), expected);
    }

    #[test]
    fn build_effect_from_breath() {
        let effect = Effect::Breath {
            color: COLOR,
            brightness: Brightness::try_from(2).unwrap(),
            speed: Speed::try_from(4).unwrap(),
        };

        #[rustfmt::skip]
        let expected = [
            0xCC, 0x16, 0x03, 0x04, 0x02,
            12, 15, 18, 22, 25, 28, 32, 35, 38, 42, 45, 48, // color
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ];

        assert_eq!(effect.build(), expected);
    }

    #[test]
    fn build_effect_from_wave_ltr() {
        let effect = Effect::Wave {
            brightness: Brightness::try_from(2).unwrap(),
            speed: Speed::try_from(3).unwrap(),
            direction: Direction::LeftToRight,
        };

        #[rustfmt::skip]
        let expected = [
            0xCC, 0x16, 0x04, 0x03, 0x02,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // color
            0, 0, 0x01, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ];

        assert_eq!(effect.build(), expected);
    }

    #[test]
    fn build_effect_from_wave_rtl() {
        let effect = Effect::Wave {
            brightness: Brightness::try_from(2).unwrap(),
            speed: Speed::try_from(3).unwrap(),
            direction: Direction::RightToRight,
        };

        #[rustfmt::skip]
        let expected = [
            0xCC, 0x16, 0x04, 0x03, 0x02,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // color
            0, 0x01, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ];

        assert_eq!(effect.build(), expected);
    }

    #[test]
    fn build_effect_from_wave_smooth() {
        let effect = Effect::Smooth {
            brightness: Brightness::try_from(2).unwrap(),
            speed: Speed::try_from(3).unwrap(),
        };

        #[rustfmt::skip]
        let expected = [
            0xCC, 0x16, 0x06, 0x03, 0x02,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // color
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ];

        assert_eq!(effect.build(), expected);
    }
}
