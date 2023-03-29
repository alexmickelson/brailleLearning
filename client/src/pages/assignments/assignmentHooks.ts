import { useMutation, useQuery } from "@tanstack/react-query";
import { getQueryClient } from "../../services/queryClient";
import { axiosClient } from "../../utils/axiosClient";

const queryClient = getQueryClient();
export const assignmentKeys = {
  grade: (assignmentId: string) =>
    ["assignmentgradekey", assignmentId] as const,
};


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
