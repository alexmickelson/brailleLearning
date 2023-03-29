import { useAuth } from "oidc-react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "./sharedComponents/ErrorBoundary";
import { Header } from "./sharedComponents/Header";
import { AdminPage } from "./pages/admin/AdminPage";
import { AllAssignments } from "./pages/assignments/AllAssignments";
import { useIsAdmin } from "./services/userService";
import { GradingPage } from "./pages/admin/grading/GradingPage";
import { GradeAssignmentPage } from "./pages/admin/grading/GradeAssignmentPage";

export const AppRoutes = () => {
  const auth = useAuth();
  const isAdmin = useIsAdmin();

  return (
    <>
      <div
        className=" 
          min-h-screen
          pb-1
          transition-all duration-500
          dark:bg-gray-900
          dark:text-gray-50
        "
      >
        <Toaster />
        <Header />

        <ErrorBoundary>
          {auth && auth.userData && (
            <Routes>
              <Route path="/" element={<AllAssignments />} />
              {isAdmin && <Route path="/admin" element={<AdminPage />} />}
              {isAdmin && <Route path="/grading" element={<GradingPage />} />}
              {isAdmin && <Route path="/grading/:assignmentId" element={<GradeAssignmentPage />} />}
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
