import { useState } from "react";

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
  labelColSize = "2",
  inputClassName,
  tabIndex = -1,
}: Props<T>) {
  const [hasBeenTouched, _setHasBeenTouched] = useState(false);

  const validationClasses =
    hasBeenTouched && control.error
      ? "is-invalid"
      : hasBeenTouched
      ? "is-valid"
      : "";

  const computedLabel = label.toLowerCase().replace(" ", "");
  const labelClasses = `col-md-${labelColSize} text-end my-auto`;

  return (
    <div className="form-group row my-3">
      <div className={labelClasses + " col-4"}>
        <label htmlFor={computedLabel} className="col-form-label">
          {label}:
        </label>
      </div>
      <div
        className={
          inputClassName ? `my-auto ${inputClassName}` : "col-md col my-auto"
        }
      >
        <select
          name={computedLabel}
          id={computedLabel}
          className={"form-select" + validationClasses}
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
        {control.error && hasBeenTouched && (
          <div className="invalid-feedback" id={`${computedLabel}Feedback`}>
            {control.error}
          </div>
        )}
      </div>
    </div>
  );
}
