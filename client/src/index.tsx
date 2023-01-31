import React from "react";
import ReactDOM from "react-dom/client";
import "./imports.css";
import "./index.css";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import { getQueryClient } from "./services/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, AuthProviderProps } from "oidc-react";

const oidcConfig: AuthProviderProps = {
  onSignIn: async (user: any) => {
    alert("You just signed in, congratz! Check out the console!");
    console.log(user);
    window.location.hash = "";
  },
  authority: `https://login.microsoftonline.com/${process.env.REACT_APP_MICROSOFT_TENANT}/v2.0`,
  clientId: process.env.REACT_APP_CLIENT_ID,
  redirectUri: "http://localhost:8080/",
};

const queryClient = getQueryClient();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
