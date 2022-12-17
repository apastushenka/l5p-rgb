import { Brightness } from './Brightness';
import { DirectionPicker } from './DirectionPicker';
import { Spacer } from './Spacer';
import { Speed } from './Speed';

import { EffectProps, WaveState } from '../effect';

export function WaveEffect({ children, state, onChange }: EffectProps<WaveState>) {
  return (
    <div className='column'>
      <div className='row'>
        {children}
        <Spacer />
        <DirectionPicker value={state.direction}
          onChange={direction => onChange({ ...state, direction })} />
        <Speed value={state.speed}
          onChange={speed => onChange({ ...state, speed })} />
        <Brightness value={state.brightness}
          onChange={brightness => onChange({ ...state, brightness })} />
      </div>
    </div>
  );
}
