import React, { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<string>();

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);
  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);
  return (
      <div className="rounded-full p-2 my-auto">
        {theme === "dark" ? (
          <FaSun
            onClick={() => setTheme("light")}
            className="text-gray-500 dark:text-gray-400 text-2xl cursor-pointer"
          />
        ) : (
          <FaMoon
            onClick={() => setTheme("dark")}
            className="text-gray-500 dark:text-gray-400 text-2xl cursor-pointer"
          />
        )}
      </div>
  );
};
