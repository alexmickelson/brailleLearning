import React, { useState } from "react";
import { Spinner } from "../../sharedComponents/Spinner";
import { AssignmentDetail } from "./assignmentDetail/AssignmentDetail";
import { useGetAllAssignmentsQuery } from "./assignmentHooks";
import { Assignment } from "../../models/assignmentModel";

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
        <h5>Assignments: </h5>
        {assignmentsQuery.data.map((a) => (
          <div
            key={a.id.toString()}
            onClick={() => setSelectedAssignment(a)}
            className="
            my-3
            px-3 
            py-1 
            cursor-pointer
            bg-slate-200 
            dark:bg-theme-secondary
            dark:border-theme-800
            dark:border-2

            transition-all
            duration-300
            hover:scale-110
            hover:text-slate-100
            hover:bg-slate-800

            dark:hover:bg-neutral-800
            "
          >
            {a.name}
          </div>
        ))}
      </div>
      <div className="w-full">
        {selectedAssignment && (
          <>
            <AssignmentDetail assignment={selectedAssignment} />
          </>
        )}
      </div>
    </div>
  );
};
