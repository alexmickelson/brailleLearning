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
    <div className="flex">
      <div className="m-5">
        {assignmentsQuery.data.map((a) => (
          <div
            key={a.id.toString()}
            onClick={() => setSelectedAssignment(a)}
            className="outline hover:bg-slate-200 rounded-lg px-3 py-1 cursor-pointer"
          >
            {a.name}
          </div>
        ))}
      </div>
      <div>
        {selectedAssignment && (
          <>
            <hr />
            <AssignmentDetail assignment={selectedAssignment} />
          </>
        )}
      </div>
    </div>
  );
};
