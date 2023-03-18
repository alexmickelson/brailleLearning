import React, { useState } from "react";
import { useIsAdmin } from "../../services/userService";
import { AdminAssignments } from "./assignmentList/AdminAssignments";
import { NewAssignment } from "./NewAssignment";
import { MdAssignment, MdOutlineAssignment } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import { SideNavigation } from "../assignments/SideNavigation";

export const AdminPage = () => {
  const isAdmin = useIsAdmin();
  const [showNewAssignment, setShowNewAssignment] = useState(false);

  if (!isAdmin) return <div>Unauthorized</div>;

  return (
    <div className="">
      <br />
      <h1 className="text-center">Admin Menu</h1>
      <div className="flex">
        <SideNavigation />
        <div className="m-5 grow">
          {!showNewAssignment && (
            <button onClick={() => setShowNewAssignment(true)}>
              Add Assignment?
            </button>
          )}
          {showNewAssignment && (
            <>
              <button className="" onClick={() => setShowNewAssignment(false)}>
                Hide New Assignment
              </button>
              <NewAssignment onSubmit={() => setShowNewAssignment(false)} />
            </>
          )}
          <br />
          <AdminAssignments />
        </div>
      </div>
    </div>
  );
};
