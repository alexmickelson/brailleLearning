import { useState } from "react";

export interface NumberInputControl {
  value: number;
  setValue: (i: number) => void;
}

export const useNumberInput = (
  initialValue: number,
): NumberInputControl => {
  const [value, setValue] = useState<number>(initialValue);
  return { value, setValue };
};
