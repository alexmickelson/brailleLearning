import React, { FC } from "react";
import { Assignment } from "../../../models/assignmentModel";
import {
  TextInputRow,
  useTextInput,
} from "../../../sharedComponents/forms/TextInputRow";
import { useUpdateAssignemntMutation } from "../adminHooks";

export const ManageAssignment: FC<{
  assignment: Assignment;
  onSaveCallback: () => void;
}> = ({ assignment, onSaveCallback }) => {
  const updateAssignmentMutation = useUpdateAssignemntMutation(assignment.id);
  const nameControl = useTextInput(assignment.name);
  const textControl = useTextInput(assignment.text);
  return (
    <div className="m-auto">
      <h3 className="text-center">Update Assignment</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateAssignmentMutation
            .mutateAsync({
              name: nameControl.value,
              text: textControl.value,
            })
            .then(() => onSaveCallback());
        }}
      >
        <TextInputRow label="Assignment Name" control={nameControl} />
        <TextInputRow label="Text" control={textControl} isTextArea={true} />
        <div className="flex justify-center">
          <button className="m-3">Save</button>
        </div>
      </form>
    </div>
  );
};
