import { Spinner } from "../../sharedComponents/Spinner";
import {
  useAvailableCompletedAssignmentsQuery,
  useAvailableUncompletedAssignmentsQuery,
  usePastAssignmentsQuery,
} from "../../hooks/assignmentHooks";
import { useNavigate } from "react-router-dom";
import { printDate } from "../../utils/datePrinter";

export const AllAssignments = () => {
  const navigate = useNavigate();
  const uncomletedAssignmentsQuery = useAvailableUncompletedAssignmentsQuery();
  const completedAssignmentsQuery = useAvailableCompletedAssignmentsQuery();
  const pastAssignmentsQuery = usePastAssignmentsQuery();

  if (uncomletedAssignmentsQuery.isLoading) return <Spinner />;
  if (uncomletedAssignmentsQuery.isError)
    return <div>Error loading uncompleted assignments</div>;
  if (!uncomletedAssignmentsQuery.data)
    return <div>No uncompleted assignment data</div>;

  if (completedAssignmentsQuery.isLoading) return <Spinner />;
  if (completedAssignmentsQuery.isError)
    return <div>Error loading completed assignments</div>;
  if (!completedAssignmentsQuery.data)
    return <div>No completed assignment data</div>;

  if (pastAssignmentsQuery.isLoading) return <Spinner />;
  if (pastAssignmentsQuery.isError)
    return <div>Error loading past assignments</div>;
  if (!pastAssignmentsQuery.data)
    return <div>No past assignment data</div>;

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
      <h5>Finished Assignments (can be retaken): </h5>
      <div className="flex">
        {completedAssignmentsQuery.data.map((a) => (
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
      <br />
      <br />
      <br />
      <h5>Past Assignments (past due date): </h5>
      <div className="flex">
        {pastAssignmentsQuery.data.map((a) => (
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
