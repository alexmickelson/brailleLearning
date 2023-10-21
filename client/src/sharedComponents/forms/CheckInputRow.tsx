import { FC } from "react";

export interface CheckInputControl {
  value: boolean;
  setValue: (i: boolean) => void;
}

interface Props {
  label: string;
  control: CheckInputControl;
  displayLabel?: boolean;
  isTextArea?: boolean;
  rows?: number;
  autoFocus?: boolean;
  // columnSpan?: number;
}

export const CheckInputRow: FC<Props> = ({
  label,
  control,
  autoFocus = false,
}) => {
  const salt = Math.random();
  // const [hasBeenTouched, setHasBeenTouched] = useState(false);

  // const validationClasses =
  //   hasBeenTouched && control.error
  //     ? "is-invalid"
  //     : hasBeenTouched
  //     ? "is-valid"
  //     : "";

  const computedLabel = label.toLowerCase().replace(" ", "") + salt;
  // const labelClasses = `
  //   mb-2 
  //   text-sm 
  //   font-medium 
  // `;
  // const inputClasses = `
  //   rounded-lg
  //   p-3
  //   dark:bg-gray-700
  //   dark:text-gray-50

  //   dark:border

  //   dark:border-gray-100
  //   dark:active:border-gray-400
  //   dark:focus:border-gray-400
  //   outline-none
    
  //   `;
  // ${validationClasses}

  return (
    <div>
      <div className="flex items-center mb-4">
        <input
          name={computedLabel}
          id={computedLabel}
          type="checkbox"
          
          checked={control.value}
          onChange={(e) => control.setValue(e.target.checked)}
          autoFocus={autoFocus}
          className="
            w-4 
            h-4 
            text-blue-600 
            bg-gray-100 
            border-gray-300 
            rounded 
            focus:ring-blue-500 
            dark:focus:ring-blue-600 
            dark:ring-offset-gray-800 
            focus:ring-2 
            dark:bg-gray-700 
            dark:border-gray-600
          "
        />
        <label
          htmlFor={computedLabel}
          className="
            ml-2 
            text-sm 
            font-medium 
            text-gray-900 
            dark:text-gray-300
          "
        >
          {label}
        </label>
      </div>
      {/* {displayLabel && (
        <div className={labelClasses}>
          <label htmlFor={computedLabel} className="col-form-label">
            {label}:
          </label>
        </div>
      )}
      <div className={"col-md col my-auto"}>
        <input
          type="checkbox"
          name={computedLabel}
          id={computedLabel}
          className={inputClasses}
          checked={control.value}
          onChange={(e) => control.setValue(e.target.checked)}
          // onBlur={() => setHasBeenTouched(!!control.hasRules)}
          autoFocus={autoFocus}
        />
         {control.error && hasBeenTouched && (
          <div
            className="text-rose-600 text-end"
            id={`${computedLabel}Feedback`}
          >
            {control.error}
          </div>
        )} 
      </div> */}
    </div>
  );
};
