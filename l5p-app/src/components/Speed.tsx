import { Label } from '@fluentui/react-components';
import { Select } from '@fluentui/react-components/unstable';

type SpeedProps = {
  value: number,
  onChange: (value: number) => void,
};

function Speed({ value, onChange }: SpeedProps) {
  return (
    <div>
      <Label htmlFor='speed'>Speed</Label>
      <Select id='speed' value={value}
        onChange={(ev, data) => onChange(Number(data.value))}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </Select>
    </div>
  );
}

export { Speed };
