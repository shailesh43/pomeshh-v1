
import React from "react";

const THEME_KEY = "theme";
const THEMES = ["theme-obsidian", "theme-catppuccin", "theme-gruvbox"];
const DEFAULT_THEME = "theme-obsidian";

// Utility to apply the theme to <html>
function applyThemeClass(theme: string) {
  if (typeof document !== "undefined") {
    document.documentElement.classList.remove(...THEMES);
    document.documentElement.classList.add(theme);
  }
}

export function useTheme() {
  // State for currently active theme
  const [theme, setThemeState] = React.useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(THEME_KEY) || DEFAULT_THEME;
    }
    return DEFAULT_THEME;
  });

  // When theme state changes, apply globally & save to storage
  React.useEffect(() => {
    applyThemeClass(theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // On mount, ensure correct theme is applied (handles navigation)
  React.useEffect(() => {
    applyThemeClass(theme);
  }, []); // run on first mount

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
  };

  return { theme, setTheme };
}
