import React, { FC } from "react";
import { Spinner } from "../../../sharedComponents/Spinner";
import { useGetGradeQuery } from "../assignmentHooks";

export const Grade: FC<{ assignmentId: number }> = ({ assignmentId }) => {
  const gradeQuery = useGetGradeQuery(assignmentId);

  if (gradeQuery.isLoading) return <Spinner />;
  if (gradeQuery.isError) return <div>Error loading grades</div>;
  if (!gradeQuery.data) return <div>No data for grade query</div>;

  return (
    <div className="ml-3 text-gray-500">
      Assignment Grade:{" "}
      {typeof gradeQuery.data.grade === "number"
        ? gradeQuery.data.grade
        : "no submission"}
    </div>
  );
};
