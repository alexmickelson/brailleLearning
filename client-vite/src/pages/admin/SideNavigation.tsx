import React, { FC } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";

export const adminViewOptions = {
  assignments: "assignments",
  users: "users",
};

export const SideNavigation: FC<{ setView: (view: string) => void }> = ({
  setView,
}) => {
  const sidebarClasses = `
    border border-5 rounded-lg 
    flex justify-start
    p-3 px-5
    my-3 

    transition-all
    duration-500
    hover:bg-gray-700
    hover:cursor-pointer
  `;
  return (
    <div className="w-64 mx-3 ">
      <div
        className={sidebarClasses}
        onClick={() => setView(adminViewOptions.assignments)}
      >
        <div className="my-auto mx-3">
          <MdAssignment />
        </div>
        <div>Assignments</div>
      </div>
      <div
        className={sidebarClasses}
        onClick={() => setView(adminViewOptions.users)}
      >
        <div className="my-auto mx-3">
          <FaUserGraduate />
        </div>
        <div>Users</div>
      </div>
    </div>
  );
};
