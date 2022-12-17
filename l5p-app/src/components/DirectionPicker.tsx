import { Label } from '@fluentui/react-components';
import { Select } from '@fluentui/react-components/unstable';

import { Direction } from '../effect';

type DirectionProps = {
  value: Direction,
  onChange: (value: Direction) => void,
};

export function DirectionPicker({ value, onChange }: DirectionProps) {
  return (
    <div>
      <Label htmlFor='direction'>Direction</Label>
      <Select id='direction' value={value}
        onChange={(ev, data) => onChange(data.value as Direction)}>
        <option value='ltr'>Left to Right</option>
        <option value='rtl'>Right to Left</option>
      </Select>
    </div>
  );
}
