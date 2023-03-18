import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserProfile } from "../../models/userModel";
import { getQueryClient } from "../../services/queryClient";
import { assignmentKeys } from "../assignments/assignmentHooks";

const queryClient = getQueryClient();
export const adminKeys = {
  allUsers: ["all users"] as const,
};

export const useCreateAssignmentMutation = () =>
  useMutation(
    async (assignmentOptions: { name: string; text: string }) => {
      const url = `/api/assignments/new`;
      await axios.post(url, assignmentOptions);
    },
    {
      onSuccess: () => queryClient.invalidateQueries(assignmentKeys.all),
    }
  );

export const useUpdateAssignemntMutation = (assignmentId: string) =>
  useMutation(
    async ({ name, text }: { name: string; text: string }) => {
      const url = `/api/assignments/${assignmentId}`;
      const body = {
        name,
        text,
      };
      await axios.put(url, body);
    },
    {
      onSuccess: () => queryClient.invalidateQueries(assignmentKeys.all),
    }
  );

export const useAllUsersQuery = () =>
  useQuery(adminKeys.allUsers, async (): Promise<UserProfile[]> => {
    const url = "/api/users/all";
    const response = await axios.get(url);
    return response.data;
  });
