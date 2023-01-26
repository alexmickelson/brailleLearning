import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Assignment } from "./assignmentModel";

export const assignmentKeys = {
  all: ["all assignments key"] as const,
};

export const useGetAllAssignmentsQuery = () =>
  useQuery(assignmentKeys.all, async (): Promise<Assignment[]> => {
    const url = `/api/assignments/all`;
    const response = await axios.get(url);
    return response.data;
  });
