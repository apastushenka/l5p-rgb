import { Brightness } from './Brightness';
import { ColorPicker } from './ColorPicker';
import { Spacer } from './Spacer';

import { StaticState } from '../effect';

type StaticEffectProps = {
  children: JSX.Element,
  state: StaticState,
  onChange: (state: StaticState) => void,
};

function StaticEffect({ children, state, onChange }: StaticEffectProps) {
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
