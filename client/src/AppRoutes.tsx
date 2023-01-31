import React from "react";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Header } from "./components/Header";
import { AllAssignments } from "./pages/assignments/AllAssignments";

export const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AllAssignments />,
    },
  ]);

  return (
    <>
      <div className=" h-screen bg-gray-80 ">
        <Toaster />
        <Header />
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </div>
    </>
  );
};
