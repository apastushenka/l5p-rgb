import { invoke } from '@tauri-apps/api';
import { Color } from './color';

export function setStaticEffect(color: Color, brightness: number) {
	return invoke('set_static_effect', { color, brightness });
}

export function setBreathEffect(color: Color, brightness: number, speed: number) {
	return invoke('set_breath_effect', { color, brightness, speed });
}