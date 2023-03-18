import React, { FC } from "react";
import { Assignment } from "../../../models/assignmentModel";
import {
  TextInputRow,
  useTextInput,
} from "../../../sharedComponents/forms/TextInputRow";
import { assignmentKeys } from "../../assignments/assignmentHooks";

export const ManageAssignment: FC<{ assignment: Assignment }> = ({
  assignment,
}) => {
  const nameControl = useTextInput(assignment.name);
  const textControl = useTextInput(assignment.text);
  return (
    <div className="m-auto">
      Update Assignment
      <TextInputRow label="Assignment Name" control={nameControl} />
      <TextInputRow label="Text" control={textControl} isTextArea={true} />
    </div>
  );
};
