import { useMutation, useQuery } from "@tanstack/react-query";
import { UserProfile } from "../../models/userModel";
import { getQueryClient } from "../../services/queryClient";
import { axiosClient } from "../../utils/axiosClient";

const queryClient = getQueryClient();
export const adminKeys = {
  allUsers: ["all users"] as const,
  user: (userSub: string) => ["all users", userSub] as const,
};

export const useAllUsersQuery = () =>
  useQuery({
    queryKey: adminKeys.allUsers,
    queryFn: async (): Promise<UserProfile[]> => {
      const url = "/api/admin/users/all";
      const response = await axiosClient.get(url);
      return response.data;
    },
  });

export const useUserProfileQuery = (userSub: string) => {
  const allUsersQuery = useAllUsersQuery();
  const userQuery = useQuery({
    queryKey: adminKeys.user(userSub),
    queryFn: async () => {
      const users = allUsersQuery.data?.find((u) => u.sub === userSub);
      if (!users) {
        console.log(allUsersQuery.data);
        throw Error(`Could not find user with sub: ${userSub}`);
      }
      return users;
    },
    enabled: !!allUsersQuery.data,
  });
  return userQuery;
};

export const useMakeAdminMutation = () =>
  useMutation({
    mutationFn: async (userSub: string) => {
      const url = `/api/admin/users/makeAdmin`;
      const body = {
        sub: userSub,
      };

      await axiosClient.put(url, body);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: adminKeys.allUsers }),
  });

export const useRemoveAdminMutation = () =>
  useMutation({
    mutationFn: async (userSub: string) => {
      const url = `/api/admin/users/removeAdmin`;
      const body = {
        sub: userSub,
      };

      await axiosClient.put(url, body);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: adminKeys.allUsers }),
  });
