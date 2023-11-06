import { FC } from "react";
import {
  useAssignmentDetailsQuery,
  useAssignmentSubmissionsQuery,
} from "../../hooks/assignmentHooks";
import { Spinner } from "../../sharedComponents/Spinner";
import { printDate } from "../../utils/datePrinter";

export const SubmissionList: FC<{ assignmentId: string }> = ({
  assignmentId,
}) => {
  const submissionsQuery = useAssignmentSubmissionsQuery(assignmentId);
  const assignmentQuery = useAssignmentDetailsQuery(assignmentId);

  if (submissionsQuery.isLoading) return <Spinner />;
  if (submissionsQuery.isError)
    return <div>Error loading assignment submissions</div>;
  if (!submissionsQuery.data)
    return <div>Error, no data for assignment submissions</div>;

  if (assignmentQuery.isLoading) return <Spinner />;
  if (assignmentQuery.isError)
    return <div>Error loading assignment details</div>;
  if (!assignmentQuery.data)
    return <div>Error, no data for assignment details</div>;

  if (submissionsQuery.data.length === 0) return <div></div>;

  const dateColClasses = "col-span-2 text-end  me-3";
  const rowClasses = "grid grid-cols-8 my-2";
  
  return (
    <div className="p-5">
      <h5 className="text-center">
        {submissionsQuery.data.length} Submissions
      </h5>

      <div className={rowClasses + " font-bold border-b-4 mb-2"}>
        <div className={dateColClasses}>Date</div>
        <div className="text-center">Grade</div>
        <div>Submitted Braille</div>
      </div>

      {submissionsQuery.data.map((submission) => (
        <div key={submission.id} className={rowClasses}>
          <div className="col-span-2 text-end  me-3">
            {printDate(submission.submittedDate)}
          </div>
          <div className="text-center">
            {submission.grade || "-"} / {assignmentQuery.data.points}
          </div>
          <div className="col-span-5 whitespace-break-spaces break-words">
            {submission.submittedText}
          </div>
        </div>
      ))}
    </div>
  );
};
