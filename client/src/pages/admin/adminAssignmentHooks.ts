import { useMutation, useQuery } from "@tanstack/react-query";
import { getQueryClient } from "../../services/queryClient";
import { axiosClient } from "../../utils/axiosClient";
import { Assignment } from "../../models/assignmentModel";

const queryClient = getQueryClient();
export const adminAssignmentKeys = {
  allAssignments: ["assignments", "admin all assignments"] as const,
  assignmentDetail: (assignmentId: string) =>
    ["assignments", "admin assignment Detail", assignmentId] as const,
};

export const useCreateAssignmentMutation = () =>
  useMutation({
    mutationFn: async (assignmentOptions: { name: string; }) => {
      const url = `/api/admin/assignments/new`;
      await axiosClient.post(url, assignmentOptions);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
    },
  });

export const useDeleteAssignmentMutation = (assignmentId: string) =>
  useMutation({
    mutationFn: async () => {
      const url = `/api/admin/assignments/${assignmentId}`;
      await axiosClient.delete(url);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
    },
  });

export const useUpdateAssignmentMutation = (assignmentId: string) =>
  useMutation({
    mutationFn: async (assignment: Assignment) => {
      const url = `/api/admin/assignments/${assignmentId}`;
      const body = {
        ...assignment,
        availableDate: assignment.availableDate?.toISOString(),
        closedDate: assignment.closedDate?.toISOString(),
      };
      await axiosClient.put(url, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
    },
  });

export const useAddStageMutation = (assignmentId: string) => 
useMutation({
  mutationFn: async () => {
    const url = `/api/admin/assignments/${assignmentId}/stage`;
    await axiosClient.post(url);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["assignments"] });
  },
});

export const useAdminAllAssignmentsQuery = () =>
  useQuery({
    queryKey: adminAssignmentKeys.allAssignments,
    queryFn: async (): Promise<Assignment[]> => {
      const url = `/api/admin/assignments/all`;
      const response = await axiosClient.get(url);
      return response.data;
    },
  });


export const useAdminAssignmentDetailsQuery = (assignmentId: string) =>
  useQuery({
    queryKey: adminAssignmentKeys.assignmentDetail(assignmentId),
    queryFn: async (): Promise<Assignment> => {
      const url = `/api/assignments/details/${assignmentId}`;
      const response = await axiosClient.get(url);
      return response.data;
    },
  });