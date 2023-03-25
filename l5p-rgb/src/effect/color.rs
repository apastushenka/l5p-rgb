use super::{Payload, Serialize};

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
