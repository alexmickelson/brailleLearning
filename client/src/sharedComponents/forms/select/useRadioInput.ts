import { useState } from "react";


export interface RadioInputControl<T> {
  value?: T;
  setValue: (val?: string) => void;
  options: string[];
  displayValue: string;
  getKey: (i: T) => string;
}

export function useRadioInput<T>({
  initialValue = undefined, options, getKey, required, setValueCallback,
}: {
  initialValue?: T;
  options: T[];
  getKey: (i: T) => string;
  required?: boolean;
  setValueCallback?: (i?: T) => void;
}): RadioInputControl<T> {
  const [value, setValue] = useState<T | undefined>(initialValue);

  const setValueByKey = (incomingKey?: string) => {
    if (incomingKey) {
      const selected = options.find((o) => getKey(o) === incomingKey);
      setValue(selected);
      if (setValueCallback) {
        setValueCallback(selected);
      }
    } else {
      setValue(undefined);
      if (setValueCallback) {
        setValueCallback(undefined);
      }
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
    getKey
  };
}
