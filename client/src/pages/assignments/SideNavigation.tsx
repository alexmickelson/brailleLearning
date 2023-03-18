import React from "react";
import { FaUserGraduate } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";

export const SideNavigation = () => {
  return (
    <div
      className="
          w-64
          mx-3
        "
    >
      <div
        className="
              border border-5 rounded-lg 
              flex justify-start
              p-3 px-5
              mx-5


              transition-all
              duration-500
              hover:bg-gray-700
            "
      >
        <div className="my-auto mx-3">
          <MdAssignment />
        </div>
        <div>Assignments</div>
      </div>
      <div
        className="
              border border-5 rounded-lg 
              flex justify-start
              p-3 px-5
              mx-5


              transition-all
              duration-500
              hover:bg-gray-700
            "
      >
        <div className="my-auto mx-3">
          <FaUserGraduate />
        </div>
        <div>Users</div>
      </div>
    </div>
  );
};
