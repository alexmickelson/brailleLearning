import React, { FC, useState } from "react";
import { toast } from "react-hot-toast";
import {
  TextInputRow,
  useTextInput,
} from "../../sharedComponents/forms/TextInputRow";
import { Spinner } from "../../sharedComponents/Spinner";
import { useCreateAssignmentMutation } from "./adminHooks";

export const NewAssignment: FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
  const createMutation = useCreateAssignmentMutation();
  const nameControl = useTextInput("", {
    min: 3,
    max: 30,
    required: true,
  });
  const translateTextControl = useTextInput("", {
    min: 3,
    max: 1000,
    required: true,
  });

  return (
    <div
      className="
        m-3
        p-3
        border-4 
        rounded-xl

        bg-slate-200 
        text-slate-700
        dark:bg-gray-700
        dark:text-gray-50

        
      "
    >
      <h5 className="text-center">Create a New Assignment</h5>
      <hr/>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (nameControl.error || translateTextControl.error) {
            toast.error("Cannot create assignment, form is invalid");
            return;
          }
          createMutation
            .mutateAsync({
              name: nameControl.value,
              text: translateTextControl.value,
            })
            .then(onSubmit);
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          <TextInputRow label="Name" control={nameControl} />
          <TextInputRow
            label="Text to translate"
            control={translateTextControl}
            isTextArea={true}
          />
        </div>
        <div className="flex justify-center m-3">
          <button disabled={createMutation.isLoading}>Submit</button>
          {createMutation.isLoading && <Spinner />}
        </div>
      </form>
    </div>
  );
};
