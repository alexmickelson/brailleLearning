import React from "react";
import { Spinner } from "../../sharedComponents/Spinner";
import { useAllUsersQuery } from "./adminHooks";

export const AdminUserManagement = () => {
  const usersQuery = useAllUsersQuery();

  if (usersQuery.isLoading) return <Spinner />;
  if (usersQuery.isError) return <div>Error loading users</div>;
  if (!usersQuery.data) return <div>no user data</div>;

  return (
    <div>
      AdminUserManagement
      {usersQuery.data.map((u) => (
        <div key={u.sub}>{u.name}</div>
      ))}
    </div>
  );
};
