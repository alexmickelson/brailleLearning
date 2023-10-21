import { RadioInputControl } from "./useRadioInput";

interface Props<T> {
  label: string;
  control: RadioInputControl<T>;
  labelColSize?: string;
  inputClassName?: string;
  tabIndex?: number;
}
export function RadioInputRow<T>({ label, control, tabIndex = -1 }: Props<T>) {
  const salt = Math.random();

  const computedName = label.toLowerCase().replace(" ", "") + salt;
  const labelClasses = `
    mb-2 
    text-sm 
    font-medium 
    inline-flex items-center
  `;
  const inputClasses = `
    form-radio
  `;
  return (
    <div className="my-3 w-100">
      <div className="mb-2">{label}:</div>
      {control.options.map((option) => (
        <div className="ml-2">
          <label className={labelClasses}>
            <input
              type="radio"
              name={computedName}
              className={inputClasses}
              value={control.displayValue}
              onChange={(e) => control.setValue(e.target.value)}
              tabIndex={tabIndex}
            />
            <span className="ml-2"> {option}</span>
          </label>
        </div>
      ))}
    </div>
  );
}
