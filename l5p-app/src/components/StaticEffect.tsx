import { Brightness } from './Brightness';
import { ColorPicker } from './ColorPicker';
import { Spacer } from './Spacer';

import { EffectProps, StaticState } from '../effect';

function StaticEffect({ children, state, onChange }: EffectProps<StaticState>) {
  return (
    <div className='column'>
      <div className='row'>
        {children}
        <Spacer />
        <Brightness value={state.brightness}
          onChange={brightness => onChange({ ...state, brightness })} />
      </div>
      <ColorPicker color={state.color}
        onChange={color => onChange({ ...state, color })} />
    </div>
  );
}

export { StaticEffect };
