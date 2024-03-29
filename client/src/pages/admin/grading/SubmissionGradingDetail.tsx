import { FC } from "react";
import { useOverrideGradeMutation } from "./GradingHooks";
import { Submission } from "../../../models/submissionModel";
import { Assignment } from "../../../models/assignmentModel";
import { NumberInputRow } from "../../../sharedComponents/forms/number/NumberInputRow";
import { Spinner } from "../../../sharedComponents/Spinner";
import { useNumberInput } from "../../../sharedComponents/forms/number/useNumberInput";
import { printTime } from "../../../utils/timePrinter";

export const SubmissionGradingDetail: FC<{
  submission: Submission;
  assignment: Assignment;
}> = ({ submission, assignment }) => {
  const overrideGradeMutation = useOverrideGradeMutation(
    submission.id,
    submission.assignmentId
  );
  const newGradeControl = useNumberInput(submission.grade);
  const saveNewGrade = () => {
    if (newGradeControl.value) {
      const newGradeFloat = newGradeControl.value;
      overrideGradeMutation.mutateAsync(newGradeFloat);
    }
  };
  return (
    <>
      <div className="mx-5 px-3 flex flex-row justify-between">
        <div>Time to Complete: {printTime(submission.secondsToComplete)}</div>
        <div className="col-span-3 my-auto whitespace-break-spaces break-words">
          {submission.submittedText}
        </div>
        
        <div className="justify-self-end my-auto">
          {overrideGradeMutation.isPending && <Spinner />}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveNewGrade();
            }}
            onBlur={() => {
              saveNewGrade();
            }}
            className="flex"
          >
            <NumberInputRow control={newGradeControl} />
            {/* <div className="my-auto ms-2 pt-2 text-2xl">
              /{assignment.points}
            </div> */}
          </form>
          <div className="my-auto">Graded by: {submission.gradedByUserName}</div>
        </div>
      </div>
    </>
  );
};
