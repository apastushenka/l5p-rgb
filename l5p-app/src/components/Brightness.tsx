import { Label } from '@fluentui/react-components';
import { Select } from '@fluentui/react-components/unstable';

type BrightnessProps = {
  value: number,
  onChange: (value: number) => void,
};

function Brightness({ value, onChange }: BrightnessProps) {
  return (
    <div>
      <Label htmlFor='brightness'>Brightness</Label>
      <Select id='brightness' value={value}
        onChange={(ev, data) => onChange(Number(data.value))}>
        <option>1</option>
        <option>2</option>
      </Select>
    </div>
  );
}

export { Brightness };