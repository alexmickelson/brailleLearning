import React from 'react'
import "./imports.css";
import "./index.css";
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthProviderProps, AuthProvider } from 'oidc-react';
import { getQueryClient } from './services/queryClient.tsx';
import { App } from './App.tsx';


const queryClient = getQueryClient();
const oidcConfig: AuthProviderProps = {
  authority: import.meta.env.VITE_AUTHORITY,
  clientId: import.meta.env.VITE_CLIENT_ID,
  redirectUri: import.meta.env.VITE_HOST,
  onSignIn: async (user) => {
    if (!user) {
      console.log("could not sign in user");
      return;
    }
    // console.log(user);
    const expiresDate = new Date(0);
    expiresDate.setUTCSeconds(user.profile.exp ?? 0);

    const token = user.id_token;
    console.log("Cookie expires at", expiresDate);
    window.location.search = "";
    document.cookie = `jwt=${token}; expires=${expiresDate.toUTCString()}; SameSite=Strict; path=/api;`;
  },
  onSignOut: () => {
    queryClient.clear();
    document.cookie = `jwt=; expires=${new Date(0).toUTCString()};  SameSite=Strict; path=/api;`;
  },
  scope: "openid profile email",
  responseType: "code",
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
