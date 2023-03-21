import { useQuery } from "@tanstack/react-query";
import { Assignment } from "../models/assignmentModel";
import { axiosClient } from "../utils/axiosClient";

export const sharedAssignmentKeys = {
  all: ["allassignmentskey"] as const,
  assignmentDetail: (assignmentId: string) =>
    ["assignmentDetail", assignmentId] as const,
};

export const useAllAssignmentsQuery = () =>
  useQuery(sharedAssignmentKeys.all, async (): Promise<Assignment[]> => {
    const url = `/api/assignments/all`;
    const response = await axiosClient.get(url);
    return response.data;
  });

export const useAssignmentDetailsQuery = (assignmentId: string) =>
  useQuery(
    sharedAssignmentKeys.assignmentDetail(assignmentId),
    async (): Promise<Assignment> => {
      const url = `/api/assignments/details/${assignmentId}`;
      const response = await axiosClient.get(url);
      return response.data;
    }
  );
