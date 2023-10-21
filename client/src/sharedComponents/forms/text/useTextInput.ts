import { useEffect, useState } from "react";
import { Rules, validate } from "../formValidation";
import { TextInputControl } from "./TextInputRow";


export const useTextInput = (
  initialValue: string,
  rules?: Rules
): TextInputControl => {
  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    setError(validate(value, rules));
  }, [value, setError, rules]);
  const hasRules = !!rules;
  return { value, setValue, error, hasRules };
};
