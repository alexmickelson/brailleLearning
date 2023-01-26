import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { AllAssignments } from "./pages/assignments/AllAssignments";

export const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AllAssignments />,
    },
  ]);

  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};
