import { Spinner } from "../../sharedComponents/Spinner";
import { useAvailableAssignmentsQuery } from "../../hooks/assignmentHooks";
import { useNavigate } from "react-router-dom";

export const AllAssignments = () => {
  const navigate = useNavigate()
  const assignmentsQuery = useAvailableAssignmentsQuery();

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
            onClick={() => navigate("/assignment/" + a.id)}
            className="
            my-3
            px-3 
            py-1 
            cursor-pointer
            bg-slate-200 
            dark:bg-gray-700
            dark:border-gray-800
            dark:border-2

            transition-all
            duration-300
            hover:scale-110
            hover:text-slate-100
            hover:bg-slate-800

            dark:hover:bg-gray-800
            "
          >
            {a.name}
          </div>
        ))}
      </div>
    </div>
  );
};
