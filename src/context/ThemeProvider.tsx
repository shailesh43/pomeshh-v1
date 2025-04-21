
import React, { createContext, useContext, useLayoutEffect, useState } from "react";

const THEME_KEY = "theme";
const THEMES = ["theme-obsidian", "theme-catppuccin", "theme-gruvbox"];
const DEFAULT_THEME = "theme-obsidian";

type ThemeContextProps = {
  theme: string;
  setTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// Utility to apply the theme to <html>
function applyThemeClass(theme: string) {
  if (typeof document !== "undefined") {
    document.documentElement.classList.remove(...THEMES);
    document.documentElement.classList.add(theme);
  }
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(THEME_KEY) || DEFAULT_THEME;
    }
    return DEFAULT_THEME;
  });

  useLayoutEffect(() => {
    applyThemeClass(theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // Also on mount, enforce theme
  useLayoutEffect(() => {
    applyThemeClass(theme);
  }, []);

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useThemeContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeContext must be used within ThemeProvider");
  return ctx;
}
