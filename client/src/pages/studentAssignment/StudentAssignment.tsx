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

export const StudentAssignment: FC<{ assignmentId: string }> = ({
  assignmentId,
}) => {
  const navigate = useNavigate();
  const [brailInput, setBrailInput] = useState("");

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
    submissionMutation
      .mutateAsync({
        braille: brailInput,
        secondsToComplete: differenceInSeconds,
      })
      .then(() => {
        setLoadTime(new Date());
        navigate("/");
      });
  };

  return (
    <div className="m-3">
      <h1 className="text-center">{assignmentQuery.data.name}</h1>
      <div
        className="
          text-center
          rounded-lg
          m-5
          p-2
          bg-slate-200
          border-slate-300

          dark:bg-gray-700
          dark:border-gray-800
        "
      >
        <div className="text-sm">Translate the Following Text:</div>
        <div>
          <strong>{assignmentQuery.data.text}</strong>
        </div>
      </div>
      <BrailleKeyboard updateBrail={setBrailInput} />

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

      {assignmentQuery.data.showReferenceBraille && (
        <>
          <div>Reference: {assignmentQuery.data.referenceBraille}</div>
        </>
      )}

      <div className="flex justify-center">
        {submissionMutation.isPending && <Spinner />}
      </div>
      {autoGradeFeatureFlag && <Grade assignmentId={assignmentQuery.data.id} />}

      <hr />
      <SubmissionList assignmentId={assignmentId} />
    </div>
  );
};
