import React from "react";
import { Toaster } from "react-hot-toast";
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
      <Toaster />
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};
