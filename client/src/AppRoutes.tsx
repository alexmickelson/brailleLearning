import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrailKeyboard } from "./pages/BrailKeyboard";

export const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <BrailKeyboard />,
    },
  ]);

  return <RouterProvider router={router} />;
};
