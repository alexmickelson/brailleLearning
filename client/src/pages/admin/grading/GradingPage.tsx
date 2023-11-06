import { useNavigate } from "react-router-dom";
import { Spinner } from "../../../sharedComponents/Spinner";
import { useAdminAllAssignmentsQuery } from "../adminAssignmentHooks";

export const GradingPage = () => {
  const assignmentsQuery = useAdminAllAssignmentsQuery();
  const navigate = useNavigate();
  if (assignmentsQuery.isLoading) return <Spinner />;
  if (assignmentsQuery.isError) return <div>Error loading all assignments</div>;
  if (!assignmentsQuery.data)
    return <div>No assignment data (this should never display)</div>;

  return (
    <div>
      <br />
      <h1 className="text-center">Grading</h1>
      <table className=" w-full text-left border-collapse">
        <thead className="border-b">
          <tr>
            <th className="p-5">Assignment Name</th>
            <th className="p-5">Assignment Text</th>
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
