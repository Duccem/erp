import { useState } from 'react';
import { ColorPicker, getColorFromName, getRandomColor } from './color-picker';
import { Input } from './input';

type Props = {
  placeholder: string;
  defaultValue?: string;
  defaultColor?: string;
  autoFocus?: boolean;
  onChange: (values: { name: string; color: string }) => void;
};

export function InputColor({ placeholder, defaultValue, onChange, defaultColor, autoFocus }: Props) {
  const [color, setColor] = useState(defaultColor ?? getRandomColor());
  const [value, setValue] = useState(defaultValue);

  return (
    <div className="relative">
      <ColorPicker
        value={color}
        onSelect={(newColor) => {
          setColor(newColor);
          onChange({
            color: newColor,
            name: value || '',
          });
        }}
      />
      <Input
        placeholder={placeholder}
        autoComplete="off"
        autoCapitalize="none"
        autoFocus={autoFocus}
        autoCorrect="off"
        spellCheck="false"
        className="pl-7 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        value={value}
        onChange={(evt) => {
          const newName = evt.target.value;
          const newColor = getColorFromName(newName);

          setColor(newColor);
          setValue(newName);

          onChange({
            color: newColor,
            name: newName,
          });
        }}
      />
    </div>
  );
}
