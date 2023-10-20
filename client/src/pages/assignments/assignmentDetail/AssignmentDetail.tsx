import React, { FC, useState } from "react";
import { Spinner } from "../../../sharedComponents/Spinner";
import { BrailleKeyboard } from "../../brailleKeyboard/BrailleKeyboard";
import { useSubmitAssignmentMutation } from "../assignmentHooks";
import { Assignment } from "../../../models/assignmentModel";
import { Grade } from "./Grade";

export const AssignmentDetail: FC<{ assignment: Assignment }> = ({
  assignment,
}) => {
  const [brailInput, setBrailInput] = useState("");
  const gradeSubmissionMutation = useSubmitAssignmentMutation(assignment.id);
  const autoGradeFeatureFlag = process.env.REACT_APP_AUTOGRADING;

  return (
    <div className="m-3">
      <h1 className="text-center">{assignment.name}</h1>
      <div
        className="
          text-center
          rounded-lg
          m-5
          p-2
          bg-slate-200
          border-slate-300

          dark:bg-gray-700
          dark:border-gray-800
        "
      >
        <div>
          <strong>Translate the Following Text:</strong>
        </div>
        <div>{assignment.text}</div>
      </div>
      <BrailleKeyboard updateBrail={setBrailInput} />

      <div className="flex justify-center">
        <button onClick={() => gradeSubmissionMutation.mutate(brailInput)}>
          Submit
        </button>
      </div>
      <div className="flex justify-center">
        {gradeSubmissionMutation.isLoading && <Spinner />}
      </div>
      {autoGradeFeatureFlag && <Grade assignmentId={assignment.id} />}
    </div>
  );
};
