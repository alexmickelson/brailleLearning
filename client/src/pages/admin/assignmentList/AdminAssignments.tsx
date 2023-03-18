import React, { useState } from "react";
import { Spinner } from "../../../sharedComponents/Spinner";
import { useGetAllAssignmentsQuery } from "../../assignments/assignmentHooks";
import { AssignmentCard } from "./AssignmentCard";
import { ManageAssignment } from "./ManageAssignment";

export const AdminAssignments = () => {
  const assignmentsQuery = useGetAllAssignmentsQuery();
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string>();

  if (assignmentsQuery.isLoading) return <Spinner />;
  if (assignmentsQuery.isError)
    return <div>Error loading assignments query</div>;
  if (!assignmentsQuery.data) return <div>no assignment query data</div>;

  const selectedAssignment = assignmentsQuery.data.find(
    (a) => a.id === selectedAssignmentId
  );
  return (
    <>
      <div className="flex gap-4 my-3">
        {assignmentsQuery.data.map((d) => (
          <AssignmentCard
            assignment={d}
            key={d.id}
            selectAssignment={setSelectedAssignmentId}
          />
        ))}
      </div>
      {selectedAssignment && (
        <ManageAssignment assignment={selectedAssignment} />
      )}
    </>
  );
};
