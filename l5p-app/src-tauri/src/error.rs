use l5p_rgb::{keyboard::KeyboardError, ranged::OutOfRangeError};
use serde::Serialize;
use thiserror::Error;

#[derive(Error, Debug)]
pub(super) enum Error {
    #[error(transparent)]
    OutOfRangeError(#[from] OutOfRangeError),

    #[error(transparent)]
    KeyboardError(#[from] KeyboardError),
}

impl Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(self.to_string().as_str())
    }
}
