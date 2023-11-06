import { FC } from "react";
import { NumberInputControl } from "./useNumberInput";

interface Props {
  label?: string;
  control: NumberInputControl;
  displayLabel?: boolean;
  autoFocus?: boolean;
}

export const NumberInputRow: FC<Props> = ({
  label,
  control,
  displayLabel = true,
  autoFocus = false,
}) => {
  const salt = Math.random();

  const computedLabel = label?.toLowerCase().replace(" ", "") ?? "blanklabel" + salt;
  const labelClasses = `
    mb-2 
    text-sm 
    font-medium 
  `;
  const inputClasses = `
    rounded-lg
    p-3
    dark:bg-gray-700
    dark:text-gray-50

    dark:border

    dark:border-gray-100
    dark:active:border-gray-400
    dark:focus:border-gray-400
    outline-none
  `;

  return (
    <div className="mt-3">
      {displayLabel && label && (
        <div className={labelClasses}>
          <label htmlFor={computedLabel} className="col-form-label">
            {label}:
          </label>
        </div>
      )}
      <div className={"col-md col my-auto"}>
        <input
          type="number"
          name={computedLabel}
          id={computedLabel}
          className={inputClasses}
          value={control.value}
          onChange={(e) => control.setValue(parseInt(e.target.value))}
          autoFocus={autoFocus}
        />
      </div>
    </div>
  );
};
