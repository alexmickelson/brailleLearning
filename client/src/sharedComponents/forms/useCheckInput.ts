import { useState } from "react";
import { CheckInputControl } from "./CheckInputRow";


export const useCheckInput = (initialValue: boolean): CheckInputControl => {
  const [value, setValue] = useState<boolean>(initialValue);
  // const [error, setError] = useState<boolean>(false);
  // useEffect(() => {
  //   setError(validate(value, rules));
  // }, [value, setError, rules]);
  // const hasRules = !!rules;
  return { value, setValue };
};
