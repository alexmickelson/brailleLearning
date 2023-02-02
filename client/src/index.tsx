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
  authority: `https://login.microsoftonline.com/${process.env.REACT_APP_MICROSOFT_TENANT}/v2.0`,
  clientId: process.env.REACT_APP_CLIENT_ID,
  redirectUri: "http://localhost:8080/",
  onSignIn: async (user) => {
    if (!user) {
      console.log("could not sign in user");
      return;
    }
    const expiresDate = new Date(0);
    expiresDate.setUTCSeconds(user.profile.exp ?? 0);
    const token = user.id_token;
    console.log(user);
    window.location.search = "";
    document.cookie = `jwt=${token}; expires=${expiresDate.toUTCString()}; SameSite=Strict; path=/api;`;
  },
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
