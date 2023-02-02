import React from "react";
import { useAuth } from "oidc-react";

export const Header = () => {
  const auth = useAuth();
  console.log(auth.userData);

  return (
    <header className=" h-24 bg-gray-800 flex justify-between">
      <h1 className="text-gray-200 my-auto mx-3">Braille Typing</h1>
      {auth && auth.userData && (
        <button onClick={() => auth.signOut()} className="my-auto mx-3">
          Log out!
        </button>
      )}
      {auth && !auth.userData && (
        <button onClick={() => auth.signIn()} className="my-auto mx-3">
          Sign In
        </button>
      )}
    </header>
  );
};
