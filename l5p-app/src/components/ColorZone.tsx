import { Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTrigger, makeStyles } from '@fluentui/react-components';
import { useState } from 'react';
import { ChromePicker } from 'react-color';
import { Rgb } from '../color';

type ColorZoneProps = {
  color: Rgb;
  onChange: (color: Rgb) => void;
};

const useStyles = makeStyles({
  dialog: {
    maxWidth: '214px',
    paddingLeft: '6px',
    paddingRight: '6px',
    paddingTop: '6px',
    paddingBottom: '6px',
  }
});

const pickerStyle = {
  default: {
    picker: {
      boxShadow: 'none',
    },
  }
};

function ColorZone({ color, onChange }: ColorZoneProps) {
  let [pickerOpen, setPickerOpen] = useState(false);
  let [pickerColor, setPickerColor] = useState(color);

  let classes = useStyles();

  let background = {
    backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
  };

  let onApply = () => {
    setPickerOpen(false);
    onChange(pickerColor);
  };

  let onOpenChange = (open: boolean) => {
    setPickerOpen(open);
    if (open) {
      setPickerColor(color);
    }
  };

  return (
    <Dialog open={pickerOpen} onOpenChange={(event, data) => onOpenChange(data.open)}>
      <DialogTrigger>
        <div className='color-zone' style={background} />
      </DialogTrigger>
      <DialogSurface className={classes.dialog}>
        <DialogBody>
          <DialogContent>
            <div className='color-picker'>
              <ChromePicker styles={pickerStyle} color={pickerColor} disableAlpha={true}
                onChange={color => setPickerColor(color.rgb)} />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={onApply}>Apply</Button>
            <DialogTrigger disableButtonEnhancement>
              <Button>Cancel</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}

export { ColorZone };
