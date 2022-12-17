import { Brightness } from './Brightness';
import { Spacer } from './Spacer';
import { Speed } from './Speed';

import { EffectProps, SmoothState } from '../effect';

export function SmoothEffect({ children, state, onChange }: EffectProps<SmoothState>) {
  return (
    <div className='column'>
      <div className='row'>
        {children}
        <Spacer />
        <Speed value={state.speed}
          onChange={speed => onChange({ ...state, speed })} />
        <Brightness value={state.brightness}
          onChange={brightness => onChange({ ...state, brightness })} />
      </div>
    </div>
  );
}
