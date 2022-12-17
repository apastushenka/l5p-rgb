import { invoke } from '@tauri-apps/api';
import { Color } from './color';

export function setStaticEffect(effect: { color: Color, brightness: number }) {
  return invoke('set_static_effect', effect);
}

export function setBreathEffect(effect: { color: Color, brightness: number, speed: number }) {
  return invoke('set_breath_effect', effect);
}

export function setWaveEffect(effect: { brightness: number, speed: number, direction: 'ltr' | 'rtl' }) {
  return invoke('set_wave_effect', effect);
}

export function setSmoothEffect(effect: { brightness: number, speed: number }) {
  return invoke('set_smooth_effect', effect);
}
