
import React from "react";

const themes = [
  {
    name: "Obsidian",
    className: "theme-obsidian",
    display: "Obsidian",
  },
  {
    name: "Catppuccin",
    className: "theme-catppuccin",
    display: "Catppuccin",
  },
  {
    name: "Gruvbox",
    className: "theme-gruvbox",
    display: "Gruvbox",
  },
];

const Appearance = () => {
  const [selected, setSelected] = React.useState(() => {
    // Load from localStorage or fallback to obsidian
    return localStorage.getItem("theme") || "theme-obsidian";
  });

  React.useEffect(() => {
    document.documentElement.classList.remove("theme-obsidian", "theme-catppuccin", "theme-gruvbox");
    document.documentElement.classList.add(selected);
    localStorage.setItem("theme", selected);
  }, [selected]);

  return (
    <div className="flex flex-1 flex-col items-center justify-start min-h-screen bg-background pt-10">
      <div className="container max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-7">Appearance Settings</h1>
        <div className="mb-8 bg-card rounded-xl border border-border p-6">
          <h2 className="font-semibold text-xl mb-4">Themes</h2>
          <div className="space-y-4">
            <label className="font-medium mb-2 block">Select a theme</label>
            <div className="rounded-lg bg-background border border-border px-2 py-2">
              {themes.map((theme) => (
                <button
                  key={theme.className}
                  className={`flex items-center w-full mb-2 px-3 py-2 rounded hover:bg-accent hover:text-accent-foreground transition
                    ${selected === theme.className ? "bg-accent text-background font-bold" : ""}
                  `}
                  onClick={() => setSelected(theme.className)}
                >
                  <span className={`mr-3 w-8 h-8 rounded-full border-2 border-border flex items-center justify-center
                    ${theme.className} ${
                    selected === theme.className ? "ring-4 ring-primary" : ""
                  }`}></span>
                  <span className="text-lg">{theme.display}</span>
                  {selected === theme.className && (
                    <span className="ml-auto text-primary font-bold">(Active)</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appearance;
