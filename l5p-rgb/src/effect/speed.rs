use super::{Payload, Serialize};
use crate::ranged::Ranged;

pub type Speed = Ranged<1, 4>;

impl Serialize for Speed {
    fn serialize(&self, payload: &mut Payload) {
        payload[3] = self.value();
    }
}
