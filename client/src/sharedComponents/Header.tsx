import React from "react";
import { useAuth } from "oidc-react";
import { useIsAdmin } from "../services/userService";
import { NavLink } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  const auth = useAuth();
  const isAdmin = useIsAdmin();

  return (
    <header className=" h-24 bg-theme dark:bg-theme-secondary flex">
      <NavLink
        to={"/"}
        className="
          text-white
          dark:text-gray-50 
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
        <>
          <NavLink
            to="/grading"
            className="
            text-gray-100
            w-min
            my-auto
            mx-3
            font-bold
          "
          >
            Grading
          </NavLink>

          <NavLink
            to="/admin"
            className="
            text-gray-100
            w-min
            my-auto
            mx-3
            font-bold
          "
          >
            Admin
          </NavLink>
        </>
      )}
      <ThemeToggle />
      {auth && auth.userData && (
        <button
          onClick={() => {
            auth.signOut();
            window.location.replace(
              process.env.REACT_APP_AUTHORITY + "/oidc/logout"
            );
          }}
          className="my-auto mx-3"
        >
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
