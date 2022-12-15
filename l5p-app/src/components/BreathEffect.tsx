import { useEffect, useState } from 'react';
import { Brightness } from './Brightness';
import { ColorPicker } from './ColorPicker';
import { Spacer } from './Spacer';
import { Speed } from './Speed';

import { setBreathEffect } from '../api';
import { Color } from '../color';

type BreathEffectProps = {
    children: JSX.Element,
    color: Color,
    brightness: number,
    speed: number,
};

function BreathEffect(props: BreathEffectProps) {
    let [color, setColor] = useState(props.color);
    let [brightness, setBrightness] = useState(props.brightness);
    let [speed, setSpeed] = useState(props.speed);

    useEffect(() => {
        setBreathEffect(color, brightness, speed)
            .catch((error) => console.error(`Error: ${error}`));
    }, [color, brightness, speed]);

    return (
        <div className='column'>
            <div className='row'>
                {props.children}
                <Spacer />
                <Speed value={speed} onChange={setSpeed} />
                <Brightness value={brightness} onChange={setBrightness} />
            </div>
            <ColorPicker color={color} onChange={setColor} />
        </div>
    );
}

export { BreathEffect };
