import { FC, useState } from "react";

export interface TextInputControl {
  value: string;
  setValue: (i: string) => void;
  error: string;
  hasRules?: boolean;
}

interface Props {
  label: string;
  control: TextInputControl;
  displayLabel?: boolean;
  isTextArea?: boolean;
  rows?: number;
  autoFocus?: boolean;
  // columnSpan?: number;
}

export const TextInputRow: FC<Props> = ({
  label,
  control,
  displayLabel = true,
  isTextArea = false,
  rows = 4,
  autoFocus = false,
}) => {
  const salt = Math.random();
  const [hasBeenTouched, setHasBeenTouched] = useState(false);

  const validationClasses =
    hasBeenTouched && control.error
      ? "is-invalid"
      : hasBeenTouched
      ? "is-valid"
      : "";

  const computedLabel = label.toLowerCase().replace(" ", "") + salt;
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
    
    ${validationClasses}
  `;

  return (
    <div className="mt-3">
      {displayLabel && (
        <div className={labelClasses}>
          <label htmlFor={computedLabel} className="col-form-label">
            {label}:
          </label>
        </div>
      )}
      <div className={"col-md col my-auto"}>
        {isTextArea ? (
          <textarea
            name={computedLabel}
            id={computedLabel}
            value={control.value}
            className={inputClasses + " w-full"}
            onChange={(e) => control.setValue(e.target.value)}
            onBlur={() => setHasBeenTouched(!!control.hasRules)}
            rows={rows}
          />
        ) : (
          <input
            type="text"
            name={computedLabel}
            id={computedLabel}
            className={inputClasses}
            value={control.value}
            onChange={(e) => control.setValue(e.target.value)}
            onBlur={() => setHasBeenTouched(!!control.hasRules)}
            autoFocus={autoFocus}
          />
        )}
        {control.error && hasBeenTouched && (
          <div
            className="text-rose-600 text-end"
            id={`${computedLabel}Feedback`}
          >
            {control.error}
          </div>
        )}
      </div>
    </div>
  );
};
