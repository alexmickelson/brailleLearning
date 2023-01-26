import React, { FC } from "react";
import { BrailKeyboard } from "../../brailleKeyboard/BrailKeyboard";
import { Assignment } from "../assignmentModel";

export const AssignmentDetail: FC<{ assignment: Assignment }> = ({
  assignment,
}) => {
  return (
    <div>
      <div>{assignment.text}</div>
      <BrailKeyboard />
    </div>
  );
};
