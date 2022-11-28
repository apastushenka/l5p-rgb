use crate::ranged::Ranged;

trait Serialize {
    fn serialize(&self, payload: &mut Payload);
}

pub(crate) type Payload = [u8; 33];

#[derive(Clone, Debug)]
pub struct Rgb(pub u8, pub u8, pub u8);

pub type Color = [Rgb; 4];

impl Serialize for Color {
    fn serialize(&self, payload: &mut Payload) {
        let mut index = 5;
        for &Rgb(r, g, b) in self {
            payload[index] = r;
            index += 1;

            payload[index] = g;
            index += 1;

            payload[index] = b;
            index += 1;
        }
    }
}

pub type Brightness = Ranged<1, 2>;

impl Serialize for Brightness {
    fn serialize(&self, payload: &mut Payload) {
        payload[4] = self.value();
    }
}

pub type Speed = Ranged<1, 4>;

impl Serialize for Speed {
    fn serialize(&self, payload: &mut Payload) {
        payload[3] = self.value();
    }
}

#[derive(Clone, Debug)]
pub enum Direction {
    LeftToRight,
    RightToRight,
}

impl Serialize for Direction {
    fn serialize(&self, payload: &mut Payload) {
        match self {
            Direction::LeftToRight => payload[19] = 0x01,
            Direction::RightToRight => payload[18] = 0x01,
        }
    }
}

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
            Effect::Static { .. } => 0x01,
            Effect::Breath { .. } => 0x03,
            Effect::Wave { .. } => 0x04,
            Effect::Smooth { .. } => 0x06,
        }
    }
}

impl Effect {
    pub(crate) fn build(&self) -> Payload {
        let mut payload = [0; 33];

        self.serialize(&mut payload);

        let items: [Option<&dyn Serialize>; 3] = match self {
            Effect::Static { color, brightness } => {
                // TODO: do we really need it?
                let speed = Speed::try_from(1).unwrap();
                speed.serialize(&mut payload);

                [Some(color), Some(brightness), None]
            }

            Effect::Breath {
                color,
                brightness,
                speed,
            } => [Some(color), Some(brightness), Some(speed)],

            Effect::Wave {
                brightness,
                speed,
                direction,
            } => [Some(brightness), Some(speed), Some(direction)],

            Effect::Smooth { brightness, speed } => [Some(brightness), Some(speed), None],
        };

        for i in items.iter().flatten() {
            i.serialize(&mut payload);
        }

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
