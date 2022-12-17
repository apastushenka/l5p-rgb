import { Color } from './color';

export type Effect = 'static' | 'breath';

export type StaticState = {
  color: Color,
  brightness: number,
};

export type BreathState = {
  color: Color,
  brightness: number,
  speed: number,
};

export type EffectState = {
  current: Effect,
  static: StaticState,
  breath: BreathState,
};
