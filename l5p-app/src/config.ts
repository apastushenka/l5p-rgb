import { BaseDirectory, createDir, readTextFile, writeTextFile } from '@tauri-apps/api/fs';
import { EffectState } from './effect';

const FILENAME = 'config';

export async function init() {
  await createDir('', { dir: BaseDirectory.AppConfig, recursive: true });
}

export async function load() {
  let json = await readTextFile(FILENAME, { dir: BaseDirectory.AppConfig });

  return JSON.parse(json) as EffectState;
}

export async function save(effect: EffectState) {
  let json = JSON.stringify(effect, undefined, 2);

  return writeTextFile(FILENAME, json, { dir: BaseDirectory.AppConfig });
}