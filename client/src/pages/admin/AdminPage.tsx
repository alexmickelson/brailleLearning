import { useIsAdmin } from "../../services/userService";
import { SideNavigation } from "../assignments/SideNavigation";
import { AdminAssignments } from "./assignmentList/AdminAssignments";
import { NewAssignment } from "./NewAssignment";

export const AdminPage = () => {
  const isAdmin = useIsAdmin();

  if (!isAdmin) return <div>Unauthorized</div>;

  return (
    <div className="">
      <br />
      <h1 className="text-center">Admin Menu</h1>
      <div className="flex">
        <SideNavigation />
        <div className="m-5 grow">
          <AdminAssignments />
        </div>
      </div>
    </div>
  );
};
