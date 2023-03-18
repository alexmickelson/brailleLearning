import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const adminKeys = {
};


export const useCreateAssignmentMutation = () =>
  useMutation(async (assignmentOptions: { name: string; text: string }) => {
    const url = `/api/assignments/new`;
    await axios.post(url, assignmentOptions);
  });
