import React, { useState } from "react";
import { Spinner } from "../../components/Spinner";
import { AssignmentDetail } from "./assignmentDetail/AssignmentDetail";
import { useGetAllAssignmentsQuery } from "./assignmentHooks";
import { Assignment } from "./assignmentModel";

export const AllAssignments = () => {
  const assignmentsQuery = useGetAllAssignmentsQuery();
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment>();

  if (assignmentsQuery.isLoading) return <Spinner />;
  if (assignmentsQuery.isError) return <div>Error loading all assignments</div>;
  if (!assignmentsQuery.data)
    return <div>No assignment data (this should never display)</div>;

  return (
    <div>
      {assignmentsQuery.data.map((a) => (
        <div key={a.id.toString()}>
          <button className="btn" onClick={() => setSelectedAssignment(a)}>
            {a.name}
          </button>
        </div>
      ))}
      {selectedAssignment && (
        <>
          <hr />
          <AssignmentDetail assignment={selectedAssignment} />
        </>
      )}
    </div>
  );
};
