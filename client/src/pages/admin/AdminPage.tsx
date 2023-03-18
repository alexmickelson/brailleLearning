import { useIsAdmin } from "../../services/userService";
import { adminViewOptions, SideNavigation } from "./SideNavigation";
import { AdminAssignments } from "./assignmentList/AdminAssignments";
import { useState } from "react";
import { AdminUserManagement } from "./AdminUserManagement";

export const AdminPage = () => {
  const isAdmin = useIsAdmin();
  const [selectedView, setSelectedView] = useState(
    adminViewOptions.assignments
  );

  if (!isAdmin) return <div>Unauthorized</div>;

  return (
    <div className="">
      <br />
      <h1 className="text-center">Admin Menu</h1>
      <div className="flex">
        <SideNavigation setView={setSelectedView} />
        <div className="m-5 grow">
          {selectedView === adminViewOptions.assignments && (
            <AdminAssignments />
          )}
          {selectedView === adminViewOptions.users && (
            <AdminUserManagement />
          )}
        </div>
      </div>
    </div>
  );
};
