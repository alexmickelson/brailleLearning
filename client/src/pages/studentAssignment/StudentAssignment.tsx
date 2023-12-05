import { FC, useState } from "react";
import { Grade } from "./Grade";
import { Spinner } from "../../sharedComponents/Spinner";
import { BrailleKeyboard } from "../brailleKeyboard/BrailleKeyboard";
import {
  useAssignmentDetailsQuery,
  useSubmitAssignmentMutation,
} from "../../hooks/assignmentHooks";
import { useNavigate } from "react-router-dom";
import { SubmissionList } from "./SubmissionList";
import { AssignmentType } from "../../models/assignmentModel";
import { useTextInput } from "../../sharedComponents/forms/text/useTextInput";
import { TextInputRow } from "../../sharedComponents/forms/text/TextInputRow";
import { StudentAssignmentStage } from "./StudentAssignmentStage";

export const StudentAssignment: FC<{ assignmentId: string }> = ({
  assignmentId,
}) => {
  const navigate = useNavigate();

  const assignmentQuery = useAssignmentDetailsQuery(assignmentId);
  const submissionMutation = useSubmitAssignmentMutation(assignmentId);
  const autoGradeFeatureFlag = import.meta.env.VITE_AUTOGRADING === "true";
  const [loadTime, setLoadTime] = useState(new Date());

  if (assignmentQuery.isLoading) return <Spinner />;
  if (assignmentQuery.isError) return <div>Error loading assignment</div>;
  if (!assignmentQuery.data) return <div>Error, no assignment data found</div>;

  const submitAssignment = () => {
    const currentTime = new Date();
    const difference = currentTime.getTime() - loadTime.getTime();
    const differenceInSeconds = difference / 1000;

    // if (assignmentQuery.data.type === AssignmentType.PRINT_TO_BRAILLE) {
    //   submissionMutation
    //     .mutateAsync({
    //       submissionString: brailInput,
    //       secondsToComplete: differenceInSeconds,
    //     })
    //     .then(() => {
    //       setLoadTime(new Date());
    //       navigate("/");
    //     });
    // }
    // if (assignmentQuery.data.type === AssignmentType.BRAILLE_TO_PRINT) {
    //   submissionMutation
    //     .mutateAsync({
    //       submissionString: textControl.value,
    //       secondsToComplete: differenceInSeconds,
    //     })
    //     .then(() => {
    //       setLoadTime(new Date());
    //       navigate("/");
    //     });
    // }
  };

  const allowSubmission = assignmentQuery.data.closedDate
    ? assignmentQuery.data.closedDate > new Date()
    : true;

  return (
    <div className="m-3">
      <h1 className="text-center">{assignmentQuery.data.name}</h1>

      <SubmissionList assignmentId={assignmentId} />

      {allowSubmission && (
        <>
          <hr />

          {assignmentQuery.data.stages.map((stage) => (
            <div key={stage.id} className="m-5 p-5 border rounded-lg bg-trueGray-900">
              <StudentAssignmentStage stage={stage} />
            </div>
          ))}

          <div className="flex justify-center">
            <button
              onClick={submitAssignment}
              disabled={
                submissionMutation.isPending || submissionMutation.isSuccess
              }
            >
              Submit
            </button>
          </div>
        </>
      )}
      <div className="flex justify-center">
        {submissionMutation.isPending && <Spinner />}
      </div>
      {autoGradeFeatureFlag && <Grade assignmentId={assignmentQuery.data.id} />}
    </div>
  );
};
