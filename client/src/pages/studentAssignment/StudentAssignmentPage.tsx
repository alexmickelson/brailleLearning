
import { StudentAssignment } from "./StudentAssignment";
import { useParams } from "react-router-dom";

export const StudentAssignmentPage = () => {
  const { assignmentId } = useParams();

  return (
    <>
      {!assignmentId && <div>No valid assignment id in url</div>}
      {assignmentId && <StudentAssignment assignmentId={assignmentId} />}
    </>
  );
};
