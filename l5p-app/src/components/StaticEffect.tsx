import { useEffect, useState } from 'react';
import { Brightness } from './Brightness';
import { ColorPicker } from './ColorPicker';
import { Spacer } from './Spacer';

import { setStaticEffect } from '../api';
import { Color } from '../color';

type StaticEffectProps = {
  children: JSX.Element,
  color: Color,
  brightness: number,
};

function StaticEffect(props: StaticEffectProps) {
  let [color, setColor] = useState(props.color);
  let [brightness, setBrightness] = useState(props.brightness);

  useEffect(() => {
    setStaticEffect(color, brightness)
      .catch((error) => console.error(`Error: ${error}`));
  }, [color, brightness]);

  return (
    <div className='column'>
      <div className='row'>
        {props.children}
        <Spacer />
        <Brightness value={brightness} onChange={setBrightness} />
      </div>
      <ColorPicker color={color} onChange={setColor} />
    </div>
  );
}

export { StaticEffect };
