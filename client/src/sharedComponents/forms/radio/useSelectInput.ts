import { useEffect, useState } from "react";
import { SelectInputControl } from "./SelectInputRow";


export function useSelectInput<T>({
  initialValue = undefined, options, getKey, required, setValueCallback,
}: {
  initialValue?: T;
  options: T[];
  getKey: (i: T) => string;
  required?: boolean;
  setValueCallback?: (i?: T) => void;
}): SelectInputControl<T> {
  const [value, setValue] = useState<T | undefined>(initialValue);
  const [error, setError] = useState("");
  useEffect(() => {
    const errorMessage = required && value ? "required" : "";
    setError(errorMessage);
  }, [value, required]);

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
    error,
    options: displayOptions,
  };
}
