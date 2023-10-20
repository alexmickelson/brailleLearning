import { FC } from "react";
import { useAssignmentSubmissionsQuery } from "../../hooks/assignmentHooks";
import { Spinner } from "../../sharedComponents/Spinner";
import { printDate } from "../../utils/datePrinter";

export const SubmissionList: FC<{ assignmentId: string }> = ({
  assignmentId,
}) => {
  const submissionsQuery = useAssignmentSubmissionsQuery(assignmentId);

  if (submissionsQuery.isLoading) return <Spinner />;
  if (submissionsQuery.isError)
    return <div>Error loading assignment submissions</div>;
  if (!submissionsQuery.data)
    return <div>Error, no data for assignment submissions</div>;

  return (
    <div className="p-5">
      <h5 className="text-center">
        {submissionsQuery.data.length} Submissions
      </h5>

      <div className="grid grid-cols-4 font-bold border-b-4 mb-2">
        <div>Date</div>
        <div>Grade</div>
        <div>Submitted Braille</div>
      </div>

      {submissionsQuery.data.map((submission) => (
        <div key={submission.id} className="grid grid-cols-8 my-2">
          <div className="col-span-2">{printDate(submission.submittedDate)}</div>
          <div className="">{submission.grade}</div>
          <div className="col-span-5">{submission.submittedText}</div>
        </div>
      ))}
    </div>
  );
};
