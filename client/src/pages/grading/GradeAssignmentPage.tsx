import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { useAssignmentDetailsQuery } from "../../hooks/assignmentHooks";
import { Spinner } from "../../sharedComponents/Spinner";
import { useSubmissionsQuery } from "./GradingHooks";

export const GradeAssignmentPage = () => {
  const { assignmentId } = useParams();
  if (!assignmentId) return <div>Missing Assignment ID</div>;
  return <WrappedGradeAssignmentPage assignmentId={assignmentId} />;
};

const WrappedGradeAssignmentPage: FC<{ assignmentId: string }> = ({
  assignmentId,
}) => {
  const assignmentDetailsQuery = useAssignmentDetailsQuery(assignmentId);
  const submissionsQuery = useSubmissionsQuery(assignmentId);

  if (assignmentDetailsQuery.isLoading) return <Spinner />;
  if (assignmentDetailsQuery.isError)
    return <div>Error loading assignment details</div>;
  if (!assignmentDetailsQuery.data)
    return <div>no assignment details data</div>;
  if (submissionsQuery.isLoading) return <Spinner />;
  if (submissionsQuery.isError)
    return <div>Error loading assignment submissions</div>;
  if (!submissionsQuery.data) return <div>no assignment submission data</div>;

    console.log(submissionsQuery.data);
    
  return (
    <div>
      <h1 className="text-center">Grade: {assignmentDetailsQuery.data.name}</h1>
      <div>Assignment Text: {assignmentDetailsQuery.data.text}</div>

    </div>
  );
};
