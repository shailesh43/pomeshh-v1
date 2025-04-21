
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Ensure the saved theme class is added to <html> before the app renders
const THEME_KEY = "theme";
const DEFAULT_THEME = "theme-obsidian";

function applyGlobalTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    const toApply = saved || DEFAULT_THEME;
    document.documentElement.classList.remove("theme-obsidian", "theme-catppuccin", "theme-gruvbox");
    document.documentElement.classList.add(toApply);
  } catch {
    document.documentElement.classList.remove("theme-obsidian", "theme-catppuccin", "theme-gruvbox");
    document.documentElement.classList.add(DEFAULT_THEME);
  }
}
applyGlobalTheme();

createRoot(document.getElementById("root")!).render(<App />);
