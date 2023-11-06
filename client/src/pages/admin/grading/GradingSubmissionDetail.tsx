import { FC } from "react";
import { Submission } from "../../../models/submissionModel";
import { Spinner } from "../../../sharedComponents/Spinner";
import { printDate } from "../../../utils/datePrinter";
import { useUserProfileQuery } from "../adminHooks";
import { useOverrideGradeMutation } from "./GradingHooks";
import { useNumberInput } from "../../../sharedComponents/forms/number/useNumberInput";
import { NumberInputRow } from "../../../sharedComponents/forms/number/NumberInputRow";
import { printTime } from "../../../utils/timePrinter";
import { Assignment } from "../../../models/assignmentModel";

export const GradingSubmissionDetail: FC<{ submission: Submission, assignment: Assignment }> = ({
  submission,
  assignment,
}) => {
  const userProfileQuery = useUserProfileQuery(submission.userSub);
  const overrideGradeMutation = useOverrideGradeMutation(
    submission.id,
    submission.assignmentId
  );
  const newGradeControl = useNumberInput(submission.grade);

  if (userProfileQuery.isLoading) return <Spinner />;
  if (userProfileQuery.isError) return <div>Error loading user profile</div>;
  if (!userProfileQuery.data) return <div>No user profile data</div>;

  const saveNewGrade = () => {
    if (newGradeControl.value) {
      const newGradeFloat = newGradeControl.value;
      overrideGradeMutation.mutateAsync(newGradeFloat);
    }
  };
  return (
    <>
      <div className="mx-5 px-3 grid grid-cols-6 gap-3 justify-between">
        <div className="my-auto">
          <div>{userProfileQuery.data.name}</div>
          <div className="italic text-sm">
            {printDate(submission.submittedDate)}
          </div>
          <div>{printTime(submission.secondsToComplete)}</div>
        </div>
        <div className="col-span-3 my-auto whitespace-break-spaces break-words">
          {submission.submittedText}
        </div>
        <div className="my-auto">{submission.gradedByUserName}</div>
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
            <div className="my-auto ms-2 pt-2 text-2xl">/{assignment.points}</div>
          </form>
        </div>
      </div>
      <hr />
    </>
  );
};
