import { FC } from "react";
import { Submission } from "../../../models/submissionModel";
import { Spinner } from "../../../sharedComponents/Spinner";
import { useUserProfileQuery } from "../adminHooks";
import { Assignment } from "../../../models/assignmentModel";
import { SubmissionGradingDetail } from "./SubmissionGradingDetail";

export const GradingSubmissionDetail: FC<{
  submissions: Submission[];
  assignment: Assignment;
  studentSub: string;
}> = ({ submissions, assignment, studentSub }) => {
  const userProfileQuery = useUserProfileQuery(studentSub);

  if (userProfileQuery.isLoading) return <Spinner />;
  if (userProfileQuery.isError) return <div>Error loading user profile</div>;
  if (!userProfileQuery.data) return <div>No user profile data</div>;

  return (
    <>
      <div>{userProfileQuery.data.name}</div>
      {submissions.map((s) => (
        <SubmissionGradingDetail
          key={s.id}
          submission={s}
          assignment={assignment}
        />
      ))}
    </>
  );
};
