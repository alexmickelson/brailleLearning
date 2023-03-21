import React from "react";
import { useNavigate } from "react-router-dom";
import { useAllAssignmentsQuery } from "../../hooks/assignmentHooks";
import { Spinner } from "../../sharedComponents/Spinner";

export const GradingPage = () => {
  const assignmentsQuery = useAllAssignmentsQuery();
  const navigate = useNavigate();
  if (assignmentsQuery.isLoading) return <Spinner />;
  if (assignmentsQuery.isError) return <div>Error loading all assignments</div>;
  if (!assignmentsQuery.data)
    return <div>No assignment data (this should never display)</div>;
  return (
    <div>
      <h1 className="text-center">Grading</h1>
      <table className=" w-full text-left border-collapse">
        <thead className="border-b">
          <tr>
            <th className="p-5">Name</th>
            <th className="p-5">Text</th>
          </tr>
        </thead>
        <tbody className="">
          {assignmentsQuery.data.map((a) => (
            <tr
              key={a.id}
              onClick={() => navigate(`/grading/${a.id}`)}
              className="
                border-b border-gray-500 
              
                transition-all
                duration-500
                hover:cursor-pointer
                hover:bg-gray-800
              "
            >
              <td className="p-5">{a.name}</td>
              <td className="p-5">{a.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
