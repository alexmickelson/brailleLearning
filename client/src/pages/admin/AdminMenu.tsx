import React, { useState } from "react";
import { useIsAdmin } from "../../services/userService";
import { NewAssignment } from "./NewAssignment";

export const AdminMenu = () => {
  const isAdmin = useIsAdmin();
  const [showNewAssignment, setShowNewAssignment] = useState(false);

  if (!isAdmin) return <div>Unauthorized</div>;

  return (
    <div className="container mx-auto">
      <br />
      <h1 className="text-center">Admin Menu</h1>

      <div className="m-5">
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
      </div>
    </div>
  );
};
