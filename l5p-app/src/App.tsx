import { useEffect, useState } from 'react';
import { EffectPicker } from './components/EffectPicker';

import { BreathEffect } from './components/BreathEffect';
import { SmoothEffect } from './components/SmoothEffect';
import { StaticEffect } from './components/StaticEffect';
import { WaveEffect } from './components/WaveEffect';

import { setBreathEffect, setSmoothEffect, setStaticEffect, setWaveEffect } from './api';
import { save } from './config';
import { EffectState } from './effect';

function App({ state }: { state: EffectState }) {
  let [effectState, setEffectState] = useState<EffectState>(state);

  useEffect(() => {
    setEffect(effectState)
      .then(() => save(effectState))
      .catch((error) => console.error(`Error: ${error}`));
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
