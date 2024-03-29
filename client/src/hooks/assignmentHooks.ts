import { useMutation, useQuery } from "@tanstack/react-query";
import { Assignment } from "../models/assignmentModel";
import { axiosClient } from "../utils/axiosClient";
import { getQueryClient } from "../services/queryClient";
import { Submission } from "../models/submissionModel";

const queryClient = getQueryClient();

export const assignmentKeys = {
  unCompleted: ["assignments", "not completed assignments"] as const,
  completed: ["assignments", "completed assignments"] as const,
  past: ["assignments", "past assignments"] as const,
  assignmentDetail: (assignmentId: string) =>
    ["assignments", "assignmentDetail", assignmentId] as const,

  grade: (assignmentId: string) =>
    ["assignments", "assignmentgradekey", assignmentId] as const,

  assignmentSubmissions: (assignmentId: string) => [
    "assignments", "assignmentSubmissions",
    assignmentId,
  ],
};

export const useAvailableUncompletedAssignmentsQuery = () =>
  useQuery({
    queryKey: assignmentKeys.unCompleted,
    queryFn: async (): Promise<Assignment[]> => {
      const url = `/api/assignments/uncompleted`;
      const response = await axiosClient.get(url);
      return response.data;
    },
  });
export const useAvailableCompletedAssignmentsQuery = () =>
  useQuery({
    queryKey: assignmentKeys.completed,
    queryFn: async (): Promise<Assignment[]> => {
      const url = `/api/assignments/completed`;
      const response = await axiosClient.get(url);
      return response.data;
    },
  });
export const usePastAssignmentsQuery = () =>
  useQuery({
    queryKey: assignmentKeys.past,
    queryFn: async (): Promise<Assignment[]> => {
      const url = `/api/assignments/past`;
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
    mutationFn: async (params: {
      submissionString: string;
      secondsToComplete: number;
    }) => {
      const url = `/api/submissions/${assignmentId}`;
      const body = { ...params };
      const response = await axiosClient.post(url, body);
      return response.data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: assignmentKeys.grade(assignmentId),
      }),
  });

export const useAssignmentSubmissionsQuery = (assignmentId: string) =>
  useQuery({
    queryKey: assignmentKeys.assignmentSubmissions(assignmentId),
    queryFn: async (): Promise<Submission[]> => {
      const url = `/api/submissions/${assignmentId}`;
      const response = await axiosClient.get(url);
      return response.data;
    },
  });
