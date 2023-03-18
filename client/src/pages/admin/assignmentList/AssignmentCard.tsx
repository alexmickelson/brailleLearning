import React, { FC, useState } from "react";
import { Assignment } from "../../../models/assignmentModel";

export const AssignmentCard: FC<{
  assignment: Assignment;
  selectAssignment: (id: string) => void;
}> = ({ assignment, selectAssignment }) => {
  return (
    <div
      className="
          outline rounded p-3
          cursor-pointer
          text-wrap
          text-center
          w-48
        "
      onClick={() => {
        selectAssignment(assignment.id);
      }}
    >
      <h5>{assignment.name}</h5>
    </div>
  );
};
