import { Brightness } from './Brightness';
import { ColorPicker } from './ColorPicker';
import { Spacer } from './Spacer';
import { Speed } from './Speed';

import { BreathState, EffectProps } from '../effect';

function BreathEffect({ children, state, onChange }: EffectProps<BreathState>) {
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
      <ColorPicker color={state.color}
        onChange={color => onChange({ ...state, color })} />
    </div>
  );
}

export { BreathEffect };
