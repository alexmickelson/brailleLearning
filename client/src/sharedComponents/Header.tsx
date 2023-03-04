import React from "react";
import { useAuth } from "oidc-react";
import { useIsAdmin } from "../services/userService";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const auth = useAuth();
  const isAdmin = useIsAdmin();

  console.log(auth.userData);

  return (
    <header className=" h-24 bg-gray-800 flex">
      <NavLink
        to={"/"}
        className="
          text-gray-200 
          my-auto 
          mx-3 
          border-none
          text-5xl font-extrabold tracking-tighter
        "
      >
        Braille Typing
      </NavLink>
      <div className="flex-grow"></div>
      {isAdmin && (
        <NavLink
          to="/admin"
          className="
            text-slate-100
            w-min
            my-auto
            mx-3
            font-bold
          "
        >
          Admin
        </NavLink>
      )}
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
