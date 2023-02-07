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
