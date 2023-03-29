import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Submission } from "../../../models/submissionModel";
import { getQueryClient } from "../../../services/queryClient";
import { axiosClient } from "../../../utils/axiosClient";

const queryClient = getQueryClient();
export const gradingKeys = {
  submissions: (assignmentId: string) =>
    ["all submissions key", assignmentId] as const,
};

export const useSubmissionsQuery = (assignmentId: string) =>
  useQuery(gradingKeys.submissions(assignmentId), async () => {
    const url = `/api/submissions/${assignmentId}/all`;
    const response = await axiosClient.get<Submission[]>(url);
    return response.data;
  });

export const useOverrideGradeMutation = (
  submissionId: string,
  assignmentId: string
) =>
  useMutation(
    async (grade: number) => {
      const url = `/api/submissions/${submissionId}/grade`;
      const body = { grade: grade };
      await axios.put(url, body);
    },
    {
      onSuccess: () =>
        queryClient.invalidateQueries(gradingKeys.submissions(assignmentId)),
    }
  );
