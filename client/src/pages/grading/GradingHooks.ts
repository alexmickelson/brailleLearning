import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "../../utils/axiosClient";

export const gradingKeys = {
  submissions: (assignmentId: string) =>
    ["all submissions key", assignmentId] as const,
};

export const useSubmissionsQuery = (assignmentId: string) =>
  useQuery(gradingKeys.submissions(assignmentId), async () => {
    const url = `/api/assignment/${assignmentId}/submissions`;
    const response = await axiosClient.get(url);
    return response.data;
  });
