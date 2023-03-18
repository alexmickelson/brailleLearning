import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "oidc-react";

export const useIsAdmin = () => {
  const auth = useAuth();
  if (!auth) return false;
  if (auth && !auth.userData) return false;

  const userIsAdmin =
    auth.userData?.profile.email === "alexmickelson96@gmail.com";
  if (userIsAdmin) return true;

  return false;
};

export const useIsAdminQuery = (userSub: string) =>
  useQuery(["is admin query", userSub], async () => {
    const url = `/api/user/profile`;
    const response = await axios.get(url);
    return response.data.is_admin;
  });
