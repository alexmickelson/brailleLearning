import React from "react";
import { AppRoutes } from "./AppRoutes";
import LoggedIn from "./components/LoggedIn";

export const App = () => {
  return (
    <>
      <LoggedIn />
      <AppRoutes />
    </>
  );
};
