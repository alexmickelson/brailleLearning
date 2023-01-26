import React, { FC, useState } from "react";
import { Spinner } from "../../../components/Spinner";
import { BrailKeyboard } from "../../brailleKeyboard/BrailKeyboard";
import { useGetGradeQuery, useGradeSubmissionMutation } from "../assignmentHooks";
import { Assignment } from "../assignmentModel";
import { Grade } from "./Grade";

export const AssignmentDetail: FC<{ assignment: Assignment }> = ({
  assignment,
}) => {
  const [brailInput, setBrailInput] = useState("");
  const gradeSubmissionMutation = useGradeSubmissionMutation(assignment.id);

  return (
    <div>
      <div>{assignment.text}</div>
      <Grade assignmentId={assignment.id} />
      <BrailKeyboard updateBrail={setBrailInput} />

      <div className="flex justify-center">
        <button onClick={() => gradeSubmissionMutation.mutate(brailInput)}>
          Submit
        </button>
      </div>
      <div className="flex justify-center">
        {gradeSubmissionMutation.isLoading && <Spinner />}
      </div>
    </div>
  );
};
