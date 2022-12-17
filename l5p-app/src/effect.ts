import { Color } from './color';

export type Effect = 'static' | 'breath' | 'wave' | 'smooth';

export type Direction = 'ltr' | 'rtl';

export type StaticState = {
  color: Color,
  brightness: number,
};

export type BreathState = {
  color: Color,
  brightness: number,
  speed: number,
};

export type WaveState = {
  brightness: number,
  speed: number,
  direction: Direction,
};

export type SmoothState = {
  brightness: number,
  speed: number,
};

export type EffectState = {
  current: Effect,
  static: StaticState,
  breath: BreathState,
  wave: WaveState,
  smooth: SmoothState,
};

export type EffectProps<T> = {
  children: JSX.Element,
  state: T,
  onChange: (state: T) => void,
};