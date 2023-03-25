use super::{Payload, Serialize};

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
