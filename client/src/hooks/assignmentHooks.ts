import { useMutation, useQuery } from "@tanstack/react-query";
import { Assignment } from "../models/assignmentModel";
import { axiosClient } from "../utils/axiosClient";
import { getQueryClient } from "../services/queryClient";
import { Submission } from "../models/submissionModel";

const queryClient = getQueryClient();

export const assignmentKeys = {
  available: ["available assignments"] as const,
  assignmentDetail: (assignmentId: string) =>
    ["assignmentDetail", assignmentId] as const,

  grade: (assignmentId: string) =>
    ["assignmentgradekey", assignmentId] as const,

  assignmentSubmissions: (assignmentId: string) => [
    "assignmentSubmissions",
    assignmentId,
  ],
};

export const useAvailableAssignmentsQuery = () =>
  useQuery({
    queryKey: assignmentKeys.available,
    queryFn: async (): Promise<Assignment[]> => {
      const url = `/api/assignments/all`;
      const response = await axiosClient.get(url);
      return response.data;
    },
  });

export const useAssignmentDetailsQuery = (assignmentId: string) =>
  useQuery({
    queryKey: assignmentKeys.assignmentDetail(assignmentId),
    queryFn: async (): Promise<Assignment> => {
      const url = `/api/assignments/details/${assignmentId}`;
      const response = await axiosClient.get(url);
      return response.data;
    },
  });

export const useGetGradeQuery = (assignmentId: string) =>
  useQuery({
    queryKey: assignmentKeys.grade(assignmentId),
    queryFn: async (): Promise<{ grade?: number }> => {
      const url = `/api/assignments/grades/${assignmentId}`;
      const response = await axiosClient.get(url);
      return response.data;
    },
  });

export const useSubmitAssignmentMutation = (assignmentId: string) =>
  useMutation({
    mutationFn: async (braille: string) => {
      const url = `/api/submissions/${assignmentId}`;
      const body = {
        braille: braille,
      };
      const response = await axiosClient.post(url, body);
      return response.data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({queryKey: assignmentKeys.grade(assignmentId)}),
  });

export const useAssignmentSubmissionsQuery = (assignmentId: string) =>
  useQuery({
    queryKey: assignmentKeys.assignmentSubmissions(assignmentId),
    queryFn: async (): Promise<Submission[]> => {

      const url = `/api/assignments/submissions/${assignmentId}`;
      const response = await axiosClient.get(url);
      return response.data;
    },
  });
