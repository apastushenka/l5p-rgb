import { Popover, PopoverSurface, PopoverTrigger, useId } from '@fluentui/react-components';
import { ChromePicker } from 'react-color';
import { Rgb } from '../color';

type ColorZoneProps = {
  color: Rgb;
  onChange: (color: Rgb) => void;
};

function ColorZone({ color, onChange }: ColorZoneProps) {
  let id = useId();

  let background = {
    backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
  };

  return (
    <Popover size='small' positioning={{ position: 'below', coverTarget: true }}>
      <PopoverTrigger>
        <div className='color-zone' style={background} />
      </PopoverTrigger>
      <PopoverSurface aria-labelledby={id}>
        <div id={id}>
          <ChromePicker color={color} disableAlpha={true}
            onChange={(color) => onChange(color.rgb)} />
        </div>
      </PopoverSurface>
    </Popover>
  );
}

export { ColorZone };
