import { useEffect, useState } from 'react';
import { EffectPicker } from './components/EffectPicker';

import { BreathEffect } from './components/BreathEffect';
import { StaticEffect } from './components/StaticEffect';
import { WaveEffect } from './components/WaveEffect';

import { setBreathEffect, setStaticEffect, setWaveEffect } from './api';
import { Color } from './color';
import { EffectState } from './effect';

const DEFAULT_COLOR: Color = [
  { r: 255, g: 255, b: 255 },
  { r: 255, g: 255, b: 255 },
  { r: 255, g: 255, b: 255 },
  { r: 255, g: 255, b: 255 },
];

const DEFAULT_BRIGHTNESS = 1;
const DEFAULT_SPEED = 1;
const DEFAULT_DIRECTION = 'ltr';

function App() {
  let [effectState, setEffectState] = useState<EffectState>({
    current: 'static',
    static: {
      color: DEFAULT_COLOR,
      brightness: DEFAULT_BRIGHTNESS,
    },
    breath: {
      color: DEFAULT_COLOR,
      brightness: DEFAULT_BRIGHTNESS,
      speed: DEFAULT_SPEED,
    },
    wave: {
      brightness: DEFAULT_BRIGHTNESS,
      speed: DEFAULT_SPEED,
      direction: DEFAULT_DIRECTION,
    }
  });

  useEffect(() => {
    setEffect(effectState).catch((error) => console.error(`Error: ${error}`));
  }, [effectState]);

  let effectPicker = <EffectPicker value={effectState.current}
    onChange={current => setEffectState({ ...effectState, current })} />

  switch (effectState.current) {
    case 'static':
      return (
        <StaticEffect state={effectState.static}
          onChange={state => setEffectState({ ...effectState, static: state })}>
          {effectPicker}
        </StaticEffect>
      )

    case 'breath':
      return (
        <BreathEffect state={effectState.breath}
          onChange={state => setEffectState({ ...effectState, breath: state })}>
          {effectPicker}
        </BreathEffect>
      )

    case 'wave':
      return (
        <WaveEffect state={effectState.wave}
          onChange={state => setEffectState({ ...effectState, wave: state })}>
          {effectPicker}
        </WaveEffect>
      )
  }
}

function setEffect(effect: EffectState) {
  switch (effect.current) {
    case 'static':
      return setStaticEffect(effect.static);
    case 'breath':
      return setBreathEffect(effect.breath);
    case 'wave':
      return setWaveEffect(effect.wave);
  }
}

export { App };
