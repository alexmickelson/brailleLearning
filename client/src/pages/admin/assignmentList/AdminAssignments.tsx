import React, { useState } from "react";
import { Spinner } from "../../../sharedComponents/Spinner";
import { NewAssignment } from "../NewAssignment";
import { AssignmentCard } from "./AssignmentCard";
import { ManageAssignment } from "./ManageAssignment";
import { GoArrowLeft } from "react-icons/go";
import { useAllAssignmentsQuery } from "../../../hooks/assignmentHooks";

export const AdminAssignments = () => {
  const assignmentsQuery = useAllAssignmentsQuery();
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
      {!selectedAssignment && (
        <>
          <NewAssignment />
          <br />
          <div className="flex flex-wrap gap-4 my-3">
            {assignmentsQuery.data.map((d) => (
              <AssignmentCard
                assignment={d}
                key={d.id}
                selectAssignment={setSelectedAssignmentId}
              />
            ))}
          </div>
        </>
      )}
      {selectedAssignment && (
        <>
          <button onClick={() => setSelectedAssignmentId(undefined)}>
            <div className="flex">
              <GoArrowLeft className="my-auto mr-3" /> Back
            </div>
          </button>
          <ManageAssignment
            key={selectedAssignment.id}
            assignment={selectedAssignment}
            onSaveCallback={() => setSelectedAssignmentId(undefined)}
          />
        </>
      )}
    </>
  );
};
