
export interface SelectInputControl<T> {
  value?: T;
  setValue: (val?: string) => void;
  error: string;
  options: string[];
  displayValue: string;
}

interface Props<T> {
  label: string;
  control: SelectInputControl<T>;
  labelColSize?: string;
  inputClassName?: string;
  tabIndex?: number;
}
export function SelectInputRow<T>({
  label,
  control,
  tabIndex = -1,
}: Props<T>) {
  const salt = Math.random();

  const computedLabel = label.toLowerCase().replace(" ", "") + salt;
  const labelClasses = `
    mb-2 
    text-sm 
    font-medium 
  `;
  const inputClasses = `
    rounded-lg
    p-3
    w-full
    dark:bg-gray-700
    dark:text-gray-50

    dark:border

    dark:border-gray-100
    dark:active:border-gray-400
    dark:focus:border-gray-400
    outline-none
  `;
  return (
    <div className="my-3 w-100">
      <div className={labelClasses}>
        <label htmlFor={computedLabel} className="col-form-label">
          {label}:
        </label>
      </div>
      <div>
        <select
          name={computedLabel}
          id={computedLabel}
          className={inputClasses}
          value={control.displayValue}
          onChange={(e) => control.setValue(e.target.value)}
          tabIndex={tabIndex}
        >
          {control.options.map((o) => (
            <option value={o} key={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
