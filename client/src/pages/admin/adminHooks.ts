import { useMutation, useQuery } from "@tanstack/react-query";
import { assignmentKeys } from "../../hooks/assignmentHooks";
import { UserProfile } from "../../models/userModel";
import { getQueryClient } from "../../services/queryClient";
import { axiosClient } from "../../utils/axiosClient";

const queryClient = getQueryClient();
export const adminKeys = {
  allUsers: ["all users"] as const,
  user: (userId: string) => ["all users", userId] as const,
};

export const useCreateAssignmentMutation = () =>
  useMutation(
    async (assignmentOptions: { name: string; text: string }) => {
      const url = `/api/assignments/new`;
      await axiosClient.post(url, assignmentOptions);
    },
    {
      onSuccess: () => queryClient.invalidateQueries(assignmentKeys.all),
    }
  );

export const useUpdateAssignmentMutation = (assignmentId: string) =>
  useMutation(
    async ({
      name,
      text,
      showLivePreview,
      showReferenceBraille,
      referenceBraille,
    }: {
      name: string;
      text: string;
      showLivePreview: boolean;
      showReferenceBraille: boolean;
      referenceBraille?: string;
    }) => {
      const url = `/api/assignments/${assignmentId}`;
      const body = {
        name,
        text,
        showLivePreview,
        showReferenceBraille,
        referenceBraille
      };
      await axiosClient.put(url, body);
    },
    {
      onSuccess: () => queryClient.invalidateQueries(assignmentKeys.all),
    }
  );

export const useAllUsersQuery = () =>
  useQuery(adminKeys.allUsers, async (): Promise<UserProfile[]> => {
    const url = "/api/admin/users/all";
    const response = await axiosClient.get(url);
    return response.data;
  });

export const useUserProfileQuery = (userId: string) => {
  const allUsersQuery = useAllUsersQuery();
  const userQuery = useQuery(
    adminKeys.user(userId),
    async () => {
      const user = allUsersQuery.data?.find((u) => u.sub === userId);
      if (!user) throw Error(`Could not find user with sub: ${userId}`);
      return user;
    },
    {
      enabled: !!allUsersQuery.data,
    }
  );
  return userQuery;
};

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
