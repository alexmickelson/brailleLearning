import { useMutation, useQuery } from "@tanstack/react-query";
import { sharedAssignmentKeys } from "../../hooks/assignmentHooks";
import { UserProfile } from "../../models/userModel";
import { getQueryClient } from "../../services/queryClient";
import { axiosClient } from "../../utils/axiosClient";

const queryClient = getQueryClient();
export const adminKeys = {
  allUsers: ["all users"] as const,
};

export const useCreateAssignmentMutation = () =>
  useMutation(
    async (assignmentOptions: { name: string; text: string }) => {
      const url = `/api/assignments/new`;
      await axiosClient.post(url, assignmentOptions);
    },
    {
      onSuccess: () => queryClient.invalidateQueries(sharedAssignmentKeys.all),
    }
  );

export const useUpdateAssignmentMutation = (assignmentId: string) =>
  useMutation(
    async ({ name, text }: { name: string; text: string }) => {
      const url = `/api/assignments/${assignmentId}`;
      const body = {
        name,
        text,
      };
      await axiosClient.put(url, body);
    },
    {
      onSuccess: () => queryClient.invalidateQueries(sharedAssignmentKeys.all),
    }
  );

export const useAllUsersQuery = () =>
  useQuery(adminKeys.allUsers, async (): Promise<UserProfile[]> => {
    const url = "/api/admin/users/all";
    const response = await axiosClient.get(url);
    return response.data;
  });

export const useMakeAdminMutation = () =>
  useMutation(
    async (userSub: string) => {
      const url = `/api/admin/users/makeAdmin`;
      const body = {
        sub: userSub,
      };

      await axiosClient.put(url, body);
    },
    {
      onSuccess: () => queryClient.invalidateQueries(adminKeys.allUsers),
    }
  );

export const useRemoveAdminMutation = () =>
  useMutation(
    async (userSub: string) => {
      const url = `/api/admin/users/removeAdmin`;
      const body = {
        sub: userSub,
      };

      await axiosClient.put(url, body);
    },
    {
      onSuccess: () => queryClient.invalidateQueries(adminKeys.allUsers),
    }
  );
