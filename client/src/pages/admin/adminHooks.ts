import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getQueryClient } from "../../services/queryClient";
import { assignmentKeys } from "../assignments/assignmentHooks";

const queryClient = getQueryClient();
export const adminKeys = {};

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
