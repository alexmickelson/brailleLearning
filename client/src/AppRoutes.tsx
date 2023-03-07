import { useAuth } from "oidc-react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "./sharedComponents/ErrorBoundary";
import { Header } from "./sharedComponents/Header";
import { AdminMenu } from "./pages/admin/AdminMenu";
import { AllAssignments } from "./pages/assignments/AllAssignments";
import { useIsAdmin } from "./services/userService";

export const AppRoutes = () => {
  const auth = useAuth();
  const isAdmin = useIsAdmin();

  return (
    <>
      <div
        className=" 
          h-screen 
          transition-all duration-500 
          dark:bg-black
          dark:text-white
        "
      >
        <Toaster />
        <Header />

        <ErrorBoundary>
          {auth && auth.userData && (
            <Routes>
              <Route path="/" element={<AllAssignments />} />
              {isAdmin && <Route path="/admin" element={<AdminMenu />} />}
            </Routes>
          )}
          {auth && !auth.userData && (
            <div className="m-5">Please log in to continue</div>
          )}
        </ErrorBoundary>
      </div>
    </>
  );
};
