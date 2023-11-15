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

export interface StudentAndSubmissions {
  sub: string;
  submissions: Submission[];
}

export const useAdminSubmissionsQuery = (assignmentId: string) =>
  useQuery({
    queryKey: gradingKeys.submissions(assignmentId),
    queryFn: async () => {
      const url = `/api/submissions/admin/${assignmentId}/all`;
      const response = await axiosClient.get<StudentAndSubmissions[]>(url);
      return response.data;
    },
  });

export const useOverrideGradeMutation = (
  submissionId: string,
  assignmentId: string
) =>
  useMutation({
    mutationFn: async (grade: number) => {
      const url = `/api/submissions/${submissionId}/grade`;
      const body = { grade: grade };
      await axios.put(url, body);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: gradingKeys.submissions(assignmentId),
      }),
  });
