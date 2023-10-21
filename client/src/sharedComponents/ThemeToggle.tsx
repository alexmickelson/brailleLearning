import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export const ThemeToggle = () => {


  const storedTheme = localStorage.getItem("theme");
  const userSystemDarkTheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const defaultTheme = storedTheme === "dark" || (!storedTheme && userSystemDarkTheme) ? "dark" : "light"

  const [theme, setTheme] = useState<string>(defaultTheme);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <div className="rounded-full p-2 my-auto">
      {theme === "dark" ? (
        <FaSun
          onClick={() => setTheme("light")}
          className="text-gray-200 text-2xl cursor-pointer"
        />
      ) : (
        <FaMoon
          onClick={() => setTheme("dark")}
          className="text-gray-800 dark:text-gray-400 text-2xl cursor-pointer"
        />
      )}
    </div>
  );
};
