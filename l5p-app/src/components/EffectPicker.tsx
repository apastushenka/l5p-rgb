import { Label } from '@fluentui/react-components';
import { Select } from '@fluentui/react-components/unstable';
import { Effect } from '../effect';

type EffectProps = {
  value: Effect
  onChange: (effect: Effect) => void,
};

function EffectPicker({ value, onChange }: EffectProps) {
  return (
    <div>
      <Label htmlFor="effect">Effect</Label>
      <Select id="effect" value={value}
        onChange={(ev, data) => onChange(data.value as Effect)}>
        <option value='static'>Static</option>
        <option value='breath'>Breath</option>
      </Select>
    </div>
  );
}

export { EffectPicker };
