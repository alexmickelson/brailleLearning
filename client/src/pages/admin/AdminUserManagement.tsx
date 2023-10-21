import { Spinner } from "../../sharedComponents/Spinner";
import {
  useAllUsersQuery,
  useMakeAdminMutation,
  useRemoveAdminMutation,
} from "./adminHooks";

export const AdminUserManagement = () => {
  const usersQuery = useAllUsersQuery();
  const makeAdminMutation = useMakeAdminMutation();
  const removeAdminMutation = useRemoveAdminMutation();
  if (usersQuery.isLoading) return <Spinner />;
  if (usersQuery.isError) return <div>Error loading users</div>;
  if (!usersQuery.data) return <div>no user data</div>;

  return (
    <div>
      <h3>AdminUserManagement</h3>
      <table className="table-auto w-full">
        <thead className="text-left">
          <tr>
            <th>Name</th>
            <th>Is Admin</th>
            <th>SUB</th>
          </tr>
        </thead>
        <tbody>
          {usersQuery.data.map((u) => (
            <tr key={u.sub}>
              <td>{u.name}</td>
              <td>{u.isAdmin ? "True" : "False"}</td>
              <td>{u.sub}</td>
              <td>
                {u.isAdmin ? (
                  <button onClick={() => removeAdminMutation.mutate(u.sub)}>
                    Remove Admin
                  </button>
                ) : (
                  <button onClick={() => makeAdminMutation.mutate(u.sub)}>
                    Make Admin
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
