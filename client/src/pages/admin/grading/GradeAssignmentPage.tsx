import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAssignmentDetailsQuery } from "../../../hooks/assignmentHooks";
import { Spinner } from "../../../sharedComponents/Spinner";
import {
  StudentAndSubmissions,
  useAdminSubmissionsQuery,
} from "./GradingHooks";
import { GradingSubmissionDetail } from "./GradingStudentSubmissionDetail";

export const GradeAssignmentPage = () => {
  const { assignmentId } = useParams();
  if (!assignmentId) return <div>Missing Assignment ID</div>;
  return <WrappedGradeAssignmentPage assignmentId={assignmentId} />;
};

const WrappedGradeAssignmentPage: FC<{ assignmentId: string }> = ({
  assignmentId,
}) => {
  const [selectedStudentSub, setSelectedStudentSub] =
    useState<StudentAndSubmissions>();
  const assignmentDetailsQuery = useAssignmentDetailsQuery(assignmentId);
  const submissionsQuery = useAdminSubmissionsQuery(assignmentId);

  useEffect(() => {
    if (!selectedStudentSub && submissionsQuery.data?.length) {
      setSelectedStudentSub(submissionsQuery.data[0]);
    }
  }, [selectedStudentSub, submissionsQuery.data]);

  if (assignmentDetailsQuery.isLoading) return <Spinner />;
  if (assignmentDetailsQuery.isError)
    return <div>Error loading assignment details</div>;
  if (!assignmentDetailsQuery.data)
    return <div>no assignment details data</div>;
  if (submissionsQuery.isLoading) return <Spinner />;
  if (submissionsQuery.isError)
    return <div>Error loading assignment submissions</div>;
  if (!submissionsQuery.data) return <div>no assignment submission data</div>;

  const handleNext = () => {
    const currentIndex = submissionsQuery.data.findIndex(
      (s) => s.sub === selectedStudentSub?.sub
    );
    if (currentIndex === submissionsQuery.data.length) return;

    setSelectedStudentSub(submissionsQuery.data[currentIndex + 1]);
  };
  const handlePrevious = () => {
    const currentIndex = submissionsQuery.data.findIndex(
      (s) => s.sub === selectedStudentSub?.sub
    );
    if (currentIndex === 0) return;

    setSelectedStudentSub(submissionsQuery.data[currentIndex - 1]);
  };

  return (
    <div>
      <h1 className="text-center">
        Grading: {assignmentDetailsQuery.data.name}
      </h1>
      <div className="m-3 text-center">
        <h5>{assignmentDetailsQuery.data.text}</h5>
      </div>
      <div className="flex justify-between">
        <button className="btn-secondary" onClick={handlePrevious}>
          Prevous
        </button>
        <button className="btn-secondary" onClick={handleNext}>
          Next
        </button>
      </div>
      {selectedStudentSub && (
        <GradingSubmissionDetail
          submissions={selectedStudentSub.submissions}
          assignment={assignmentDetailsQuery.data}
          studentSub={selectedStudentSub.sub}
        />
      )}
    </div>
  );
};
