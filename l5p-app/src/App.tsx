import { useEffect, useState } from 'react';
import { EffectPicker } from './components/EffectPicker';

import { BreathEffect } from './components/BreathEffect';
import { SmoothEffect } from './components/SmoothEffect';
import { StaticEffect } from './components/StaticEffect';
import { WaveEffect } from './components/WaveEffect';

import { setBreathEffect, setSmoothEffect, setStaticEffect, setWaveEffect } from './api';
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
    },
    smooth: {
      brightness: DEFAULT_BRIGHTNESS,
      speed: DEFAULT_SPEED,
    },
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

    case 'smooth':
      return (
        <SmoothEffect state={effectState.smooth}
          onChange={state => setEffectState({ ...effectState, smooth: state })}>
          {effectPicker}
        </SmoothEffect>
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
    case 'smooth':
      return setSmoothEffect(effect.smooth);
  }
}

export { App };
