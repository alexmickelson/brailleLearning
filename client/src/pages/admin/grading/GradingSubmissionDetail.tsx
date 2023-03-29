import React, { FC, useState } from "react";
import { Submission } from "../../../models/submissionModel";
import {
  TextInputRow,
  useTextInput,
} from "../../../sharedComponents/forms/TextInputRow";
import { Spinner } from "../../../sharedComponents/Spinner";
import { printDate } from "../../../utils/datePrinter";
import { useUserProfileQuery } from "../adminHooks";
import { useOverrideGradeMutation } from "./GradingHooks";

export const GradingSubmissionDetail: FC<{ submission: Submission }> = ({
  submission,
}) => {
  const userProfileQuery = useUserProfileQuery(submission.userId);
  const overrideGradeMutation = useOverrideGradeMutation(
    submission.id,
    submission.assignmentId
  );
  const [showGradeOverride, setShowGradeOverride] = useState(false);
  const newGradeControl = useTextInput("");

  if (userProfileQuery.isLoading) return <Spinner />;
  if (userProfileQuery.isError) return <div>Error loading user profile</div>;
  if (!userProfileQuery.data) return <div>No user profile data</div>;

  return (
    <>
      <div className="mx-5 px-3 grid grid-cols-2">
        <div>
          <div>
            {userProfileQuery.data.name} - {printDate(submission.submittedDate)}
          </div>
          <div>Submission: {submission.submittedText}</div>
        </div>
        <div className="justify-self-end">
          <div>Grade: {submission.grade}</div>
          {!showGradeOverride && (
            <button onClick={() => setShowGradeOverride(true)}>
              Override Grade
            </button>
          )}
          {showGradeOverride && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (newGradeControl.value) {
                  const newGradeFloat = parseFloat(newGradeControl.value);
                  overrideGradeMutation
                    .mutateAsync(newGradeFloat)
                    .then(() => setShowGradeOverride(false));
                }
              }}
            >
              <TextInputRow label={"New Grade"} control={newGradeControl} />
              <button disabled={overrideGradeMutation.isLoading}>
                Save New Grade
              </button>
            </form>
          )}
          {showGradeOverride && (
            <button onClick={() => setShowGradeOverride(false)}>Cancel</button>
          )}
          {overrideGradeMutation.isLoading && <Spinner />}
        </div>
      </div>
      <hr />
    </>
  );
};
