import { useState } from "react";

export interface RadioInputControl<T> {
  value?: T;
  setValue: (val?: string) => void;
  options: string[];
  displayValue: string;
  getKey: (i: T) => string;
}

export function useRadioInput<T>({
  initialValue = undefined,
  options,
  getKey,
  required,
  onChange,
}: {
  initialValue?: T;
  options: T[];
  getKey: (i: T) => string;
  required?: boolean;
  onChange?: (value?: T) => void;
}): RadioInputControl<T> {
  const [value, setValue] = useState<T | undefined>(initialValue);

  const setValueByKey = (incomingKey?: string) => {
    if (incomingKey) {
      const selected = options.find((o) => getKey(o) === incomingKey);
      setValue(selected);
      onChange && onChange(selected);
    } else {
      setValue(undefined);
      onChange && onChange(undefined);
    }
  };

  const displayValue = value === undefined ? "" : getKey(value);
  const displayOptions = required
    ? options.map(getKey)
    : ["", ...options.map(getKey)];

  return {
    value,
    displayValue,
    setValue: setValueByKey,
    options: displayOptions,
    getKey,
  };
}
