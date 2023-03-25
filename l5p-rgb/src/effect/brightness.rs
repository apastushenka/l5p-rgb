use super::{Payload, Serialize};
use crate::ranged::Ranged;

pub type Brightness = Ranged<1, 2>;

impl Serialize for Brightness {
    fn serialize(&self, payload: &mut Payload) {
        payload[4] = self.value();
    }
}
