import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";

export const App = () => {
  return (
    <div className="">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
};
