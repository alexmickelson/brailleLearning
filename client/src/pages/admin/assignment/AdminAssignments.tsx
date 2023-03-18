import React from "react";
import { Spinner } from "../../../sharedComponents/Spinner";
import { useGetAllAssignmentsQuery } from "../../assignments/assignmentHooks";

export const AdminAssignments = () => {
  const assignmentsQuery = useGetAllAssignmentsQuery();

  if (assignmentsQuery.isLoading) return <Spinner />;
  if (assignmentsQuery.isError)
    return <div>Error loading assignments query</div>;
  if (!assignmentsQuery.data) return <div>no assignment query data</div>;

  return (
    <div>
      {assignmentsQuery.data.map((d) => (
        <div key={d.id}>{d.name}</div>
      ))}
    </div>
  );
};
