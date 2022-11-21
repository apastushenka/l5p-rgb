use std::ops::RangeBounds;

#[derive(Clone, Debug)]
pub struct Ranged<const MIN: u8, const MAX: u8>(u8);

impl<const MIN: u8, const MAX: u8> Ranged<MIN, MAX> {
    pub fn value(&self) -> u8 {
        self.0
    }

    pub fn range() -> impl RangeBounds<u8> {
        MIN..=MAX
    }
}

impl<const MIN: u8, const MAX: u8> TryFrom<u8> for Ranged<MIN, MAX> {
    type Error = &'static str;

    fn try_from(value: u8) -> Result<Self, Self::Error> {
        if Self::range().contains(&value) {
            Ok(Self(value))
        } else {
            Err("value out of range")
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    const MIN: u8 = 1;
    const MAX: u8 = 6;

    type TestRanged = Ranged<MIN, MAX>;

    #[test]
    fn try_from_in_range() {
        assert_eq!(TestRanged::try_from(4).unwrap().0, 4);
        assert_eq!(TestRanged::try_from(MIN).unwrap().0, MIN);
        assert_eq!(TestRanged::try_from(MAX).unwrap().0, MAX);
    }

    #[test]
    fn try_from_out_of_range() {
        assert!(TestRanged::try_from(MIN - 1).is_err());
        assert!(TestRanged::try_from(MAX + 1).is_err());
    }
}
