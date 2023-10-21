import { useMutation, useQuery } from "@tanstack/react-query";
import { assignmentKeys } from "../../hooks/assignmentHooks";
import { getQueryClient } from "../../services/queryClient";
import { axiosClient } from "../../utils/axiosClient";
import { Assignment } from "../../models/assignmentModel";

const queryClient = getQueryClient();
export const adminAssignmentKeys = {
  allAssignments: ["all assignments"] as const,
};

export const useCreateAssignmentMutation = () =>
  useMutation({
    mutationFn: async (assignmentOptions: { name: string; text: string }) => {
      const url = `/api/admin/assignments/new`;
      await axiosClient.post(url, assignmentOptions);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assignmentKeys.available });
      queryClient.invalidateQueries({
        queryKey: adminAssignmentKeys.allAssignments,
      });
    },
  });
  export const useDeleteAssignmentMutation = (assignmentId: string) =>
    useMutation({
      mutationFn: async () => {
        const url = `/api/admin/assignments/${assignmentId}`;
        await axiosClient.delete(url);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: assignmentKeys.available });
        queryClient.invalidateQueries({
          queryKey: adminAssignmentKeys.allAssignments,
        });
        queryClient.invalidateQueries({
          queryKey: assignmentKeys.assignmentDetail(assignmentId),
        });
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
        queryClient.invalidateQueries({ queryKey: assignmentKeys.available });
        queryClient.invalidateQueries({
          queryKey: adminAssignmentKeys.allAssignments,
        });
        queryClient.invalidateQueries({
          queryKey: assignmentKeys.assignmentDetail(assignmentId),
        });
      },
    });

export const useAllAssignmentsQuery = () =>
  useQuery({
    queryKey: adminAssignmentKeys.allAssignments,
    queryFn: async (): Promise<Assignment[]> => {
      const url = `/api/admin/assignments/all`;
      const response = await axiosClient.get(url);
      return response.data;
    },
  });
