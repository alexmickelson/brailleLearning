import { Spinner } from "../../sharedComponents/Spinner";
import {
  useAvailableCompletedAssignmentsQuery,
  useAvailableUncompletedAssignmentsQuery,
} from "../../hooks/assignmentHooks";
import { useNavigate } from "react-router-dom";
import { printDate } from "../../utils/datePrinter";

export const AllAssignments = () => {
  const navigate = useNavigate();
  const uncomletedAssignmentsQuery = useAvailableUncompletedAssignmentsQuery();
  const comletedAssignmentsQuery = useAvailableCompletedAssignmentsQuery();

  if (uncomletedAssignmentsQuery.isLoading) return <Spinner />;
  if (uncomletedAssignmentsQuery.isError)
    return <div>Error loading uncompleted assignments</div>;
  if (!uncomletedAssignmentsQuery.data)
    return <div>No uncompleted assignment data</div>;

  if (comletedAssignmentsQuery.isLoading) return <Spinner />;
  if (comletedAssignmentsQuery.isError)
    return <div>Error loading completed assignments</div>;
  if (!comletedAssignmentsQuery.data)
    return <div>No completed assignment data</div>;

  const assignmentClasses = `
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
  `;
  return (
    <div className="m-5">
      <h5>Upcoming Assignments: </h5>
      <div className="flex">
        {uncomletedAssignmentsQuery.data.map((a) => (
          <div
            key={a.id.toString()}
            onClick={() => navigate("/assignment/" + a.id)}
            className={assignmentClasses}
          >
            <div>{a.name}</div>
            <div className="text-sm italic">
              Due: {a.closedDate && printDate(a.closedDate)}
            </div>
          </div>
        ))}
      </div>
      {uncomletedAssignmentsQuery.data.length === 0 && (
        <>
          <div>You're up to date!</div>
        </>
      )}
      <br />
      <br />
      <br />
      <h5>Finished Assignments: </h5>
      <div className="flex">
        {comletedAssignmentsQuery.data.map((a) => (
          <div
            key={a.id.toString()}
            onClick={() => navigate("/assignment/" + a.id)}
            className={assignmentClasses}
          >
            <div>{a.name}</div>
            <div className="text-sm italic">
              Due: {a.closedDate && printDate(a.closedDate)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
