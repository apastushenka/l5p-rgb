import { invoke } from '@tauri-apps/api';
import { Color } from './color';

export function setStaticEffect(color: Color, brightness: number) {
	return invoke('set_static_effect', { color, brightness });
}