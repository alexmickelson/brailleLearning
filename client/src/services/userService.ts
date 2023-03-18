import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "oidc-react";
import { UserProfile } from "../models/userModel";

export const useIsAdmin = () => {
  const auth = useAuth();
  const isAdminQuery = useUserProfileQuery(auth.userData?.profile.sub);
  if (!auth) return false;
  if (auth && !auth.userData) return false;

  const userIsAdmin = isAdminQuery.data?.isAdmin;
  return !!userIsAdmin;
};

export const useUserProfileQuery = (userSub: string | undefined) =>
  useQuery(["is admin query", userSub], async (): Promise<UserProfile> => {
    const url = `/api/user/profile`;
    const response = await axios.get(url);
    return {
      name: response.data.name,
      sub: response.data.sub,
      isAdmin: response.data.is_admin,
    };
  });
