import { useMutation, useQuery } from "@tanstack/react-query";
import { Assignment } from "../models/assignmentModel";
import { axiosClient } from "../utils/axiosClient";
import { getQueryClient } from "../services/queryClient";

const queryClient = getQueryClient();

export const assignmentKeys = {
  all: ["allassignmentskey"] as const,
  assignmentDetail: (assignmentId: string) =>
    ["assignmentDetail", assignmentId] as const,

  grade: (assignmentId: string) =>
    ["assignmentgradekey", assignmentId] as const,
};

export const useAllAssignmentsQuery = () =>
  useQuery(assignmentKeys.all, async (): Promise<Assignment[]> => {
    const url = `/api/assignments/all`;
    const response = await axiosClient.get(url);
    return response.data;
  });

export const useAssignmentDetailsQuery = (assignmentId: string) =>
  useQuery(
    assignmentKeys.assignmentDetail(assignmentId),
    async (): Promise<Assignment> => {
      const url = `/api/assignments/details/${assignmentId}`;
      const response = await axiosClient.get(url);
      return response.data;
    }
  );

export const useGetGradeQuery = (assignmentId: string) =>
  useQuery(
    assignmentKeys.grade(assignmentId),
    async (): Promise<{ grade?: number }> => {
      const url = `/api/assignments/grades/${assignmentId}`;
      const response = await axiosClient.get(url);
      return response.data;
    }
  );

export const useSubmitAssignmentMutation = (assignmentId: string) =>
  useMutation(
    async (braille: string) => {
      const url = `/api/submissions/${assignmentId}`;
      const body = {
        braille: braille,
      };
      const response = await axiosClient.post(url, body);
      return response.data;
    },
    {
      onSuccess: () =>
        queryClient.invalidateQueries(assignmentKeys.grade(assignmentId)),
    }
  );
