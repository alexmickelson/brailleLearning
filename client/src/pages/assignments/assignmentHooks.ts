import { useMutation, useQuery } from "@tanstack/react-query";
import { getQueryClient } from "../../services/queryClient";
import { Assignment } from "../../models/assignmentModel";
import axios from "axios";

const queryClient = getQueryClient();
export const assignmentKeys = {
  all: ["allassignmentskey"] as const,
  grade: (assignmentId: string) =>
    ["assignmentgradekey", assignmentId] as const,
};

export const useGetAllAssignmentsQuery = () =>
  useQuery(assignmentKeys.all, async (): Promise<Assignment[]> => {
    const url = `/api/assignments/all`;
    const response = await axios.get(url);
    return response.data;
  });

export const useGetGradeQuery = (assignmentId: string) =>
  useQuery(
    assignmentKeys.grade(assignmentId),
    async (): Promise<{ grade?: number }> => {
      const url = `/api/assignments/grades/${assignmentId}`;
      const response = await axios.get(url);
      return response.data;
    }
  );

export const useGradeSubmissionMutation = (assignmentId: string) =>
  useMutation(
    async (braille: string) => {
      const url = `/api/assignments/submit/${assignmentId}`;
      const body = {
        braille: braille,
      };
      const response = await axios.post(url, body);
      return response.data;
    },
    {
      onSuccess: () =>
        queryClient.invalidateQueries(assignmentKeys.grade(assignmentId)),
    }
  );
