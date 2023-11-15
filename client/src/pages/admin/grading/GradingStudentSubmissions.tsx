import { FC } from "react";
import { Submission } from "../../../models/submissionModel";
import { Spinner } from "../../../sharedComponents/Spinner";
import { useUserProfileQuery } from "../adminHooks";
import { Assignment } from "../../../models/assignmentModel";
import { SubmissionGradingDetail } from "./SubmissionGradingDetail";
import { useSelectInput } from "../../../sharedComponents/forms/radio/useSelectInput";
import { printDate } from "../../../utils/datePrinter";
import { SelectInputRow } from "../../../sharedComponents/forms/radio/SelectInputRow";

export const GradingStudentSubmissions: FC<{
  submissions: Submission[];
  assignment: Assignment;
  studentSub: string;
}> = ({ submissions, assignment, studentSub }) => {
  const userProfileQuery = useUserProfileQuery(studentSub);

  const sortedSubmissions = [...submissions].sort(
    (a, b) => b.submittedDate.getTime() - a.submittedDate.getTime()
  );

  const submissionInput = useSelectInput({
    options: sortedSubmissions,
    initialValue: sortedSubmissions[0],
    getKey: (s) => printDate(s.submittedDate),
  });

  if (userProfileQuery.isLoading) return <Spinner />;
  if (userProfileQuery.isError) return <div>Error loading user profile</div>;
  if (!userProfileQuery.data) return <div>No user profile data</div>;

  return (
    <>
      <h3 className="text-center">{userProfileQuery.data.name} </h3>
      <p className="text-center">{studentSub}</p>
      <div className="flex justify-end">
        <SelectInputRow control={submissionInput} label="Submission by Date" />
      </div>
      {submissionInput.value && (
        <SubmissionGradingDetail
          submission={submissionInput.value}
          assignment={assignment}
        />
      )}
    </>
  );
};
