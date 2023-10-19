import React, { FC } from "react";
import { Assignment } from "../../../../models/assignmentModel";
import {
  useTextInput,
  TextInputRow,
} from "../../../../sharedComponents/forms/TextInputRow";
import { useUpdateAssignmentMutation } from "../../adminHooks";
import {
  CheckInputRow,
  useCheckInput,
} from "../../../../sharedComponents/forms/CheckInputRow";

export const ManageAssignment: FC<{
  assignment: Assignment;
  onSaveCallback: () => void;
}> = ({ assignment, onSaveCallback }) => {
  const updateAssignmentMutation = useUpdateAssignmentMutation(assignment.id);
  const nameControl = useTextInput(assignment.name);
  const textControl = useTextInput(assignment.text);
  const livePreviewControl = useCheckInput(assignment.showReference);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    updateAssignmentMutation
      .mutateAsync({
        name: nameControl.value,
        text: textControl.value,
        sho
      })
      .then(() => onSaveCallback());
  };

  return (
    <div className="m-auto">
      <h3 className="text-center">Update Assignment</h3>
      <form onSubmit={submitHandler}>
        <TextInputRow label="Assignment Name" control={nameControl} />
        <TextInputRow label="Text" control={textControl} isTextArea={true} />

        <hr />
        <h4 className="text-center">Assignment Options</h4>
        <div className="flex justify-center">
          <div>
            <CheckInputRow
              label="show live reference"
              control={livePreviewControl}
            />
          </div>
        </div>
        <hr />

        <div className="flex justify-center">
          <button className="m-3">Save</button>
        </div>
      </form>
    </div>
  );
};
