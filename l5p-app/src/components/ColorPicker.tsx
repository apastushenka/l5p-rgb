import { Label } from '@fluentui/react-components';
import { ColorZone } from './ColorZone';

import { Color, Rgb } from '../color';

type ColorPickerProps = {
  color: Color;
  onChange: (color: Color) => void;
};

function ColorPicker({ color, onChange }: ColorPickerProps) {
  let handleColorChange = (zoneIndex: number, zoneColor: Rgb) => {
    let newColor: Color = [...color];
    newColor[zoneIndex] = zoneColor;

    onChange(newColor);
  };

  return (
    <div>
      <Label>Color</Label>
      <div className='row'>
        <ColorZone color={color[0]} onChange={color => handleColorChange(0, color)} />
        <ColorZone color={color[1]} onChange={color => handleColorChange(1, color)} />
        <ColorZone color={color[2]} onChange={color => handleColorChange(2, color)} />
        <ColorZone color={color[3]} onChange={color => handleColorChange(3, color)} />
      </div >
    </div >
  );
}

export { ColorPicker };
