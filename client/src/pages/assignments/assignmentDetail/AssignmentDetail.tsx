import React, { FC, useState } from "react";
import { Spinner } from "../../../sharedComponents/Spinner";
import { BrailKeyboard } from "../../brailleKeyboard/BrailKeyboard";
import { useGradeSubmissionMutation } from "../assignmentHooks";
import { Assignment } from "../../../models/assignmentModel";
import { Grade } from "./Grade";

export const AssignmentDetail: FC<{ assignment: Assignment }> = ({
  assignment,
}) => {
  const [brailInput, setBrailInput] = useState("");
  const gradeSubmissionMutation = useGradeSubmissionMutation(assignment.id);

  return (
    <div className="m-3">
      <h1 className="text-center">{assignment.name}</h1>
      <div
        className="
          text-center
          border-4
          rounded-lg
          m-5
          p-2
          bg-slate-200
          border-slate-300
        "
      >
        <div>
          <strong>Translate the Following Text:</strong>
        </div>
        <div>{assignment.text}</div>
      </div>
      <BrailKeyboard updateBrail={setBrailInput} />

      <div className="flex justify-center">
        <button onClick={() => gradeSubmissionMutation.mutate(brailInput)}>
          Submit
        </button>
      </div>
      <div className="flex justify-center">
        {gradeSubmissionMutation.isLoading && <Spinner />}
      </div>
      <Grade assignmentId={assignment.id} />
    </div>
  );
};
