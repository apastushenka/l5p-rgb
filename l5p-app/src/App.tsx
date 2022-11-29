import { useState } from 'react';
import { EffectPicker } from './components/EffectPicker';
import { StaticEffect } from './components/StaticEffect';

import { Color } from './color';
import { Effect } from './effect';

const DEFAULT_COLOR: Color = [
  { r: 255, g: 255, b: 255 },
  { r: 255, g: 255, b: 255 },
  { r: 255, g: 255, b: 255 },
  { r: 255, g: 255, b: 255 },
];

const DEFAULT_BRIGHTNESS = 1;

function App() {
  let [effect, setEffect] = useState<Effect>('static');

  let effectPicker = <EffectPicker value={effect} onChange={setEffect} />

  return (
    <StaticEffect color={DEFAULT_COLOR} brightness={DEFAULT_BRIGHTNESS}>
      {effectPicker}
    </StaticEffect>
  )
}

export { App };
