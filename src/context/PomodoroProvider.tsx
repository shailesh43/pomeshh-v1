
import React, { createContext, useContext, useEffect, useState } from "react";

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

type Activity = {
  focusTime: number; // in minutes
  sessions: number;
  canceled: number;
};

type PomodoroState = {
  timerMode: "work" | "break";
  timeLeft: number; // seconds
  isRunning: boolean;
  tasks: Task[];
  activity: Activity;
};

// Constants
const WORK_DURATION = 25 * 60;
const BREAK_DURATION = 5 * 60;
const LOCAL_KEY = "pomitoAppState";

// Context Setup
const PomodoroContext = createContext<{
  state: PomodoroState;
  setState: React.Dispatch<React.SetStateAction<PomodoroState>>;
  resetTimer: (mode?: "work" | "break") => void;
  addTask: (text: string) => void;
  updateTask: (id: string, text: string) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
} | null>(null);

export const PomodoroProvider = ({ children }: { children: React.ReactNode }) => {
  // State
  const [state, setState] = useState<PomodoroState>(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) return JSON.parse(saved);
    return {
      timerMode: "work",
      timeLeft: WORK_DURATION,
      isRunning: false,
      tasks: [],
      activity: { focusTime: 0, sessions: 0, canceled: 0 },
    };
  });

  // Persist to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
  }, [state]);

  // Timer tick handler
  useEffect(() => {
    if (!state.isRunning) return;
    if (state.timeLeft <= 0) {
      // Stop and update activity
      setState(s => ({
        ...s,
        isRunning: false,
        activity: {
          ...s.activity,
          focusTime:
            s.timerMode === "work"
              ? s.activity.focusTime + WORK_DURATION / 60
              : s.activity.focusTime,
          sessions: s.timerMode === "work" ? s.activity.sessions + 1 : s.activity.sessions,
        },
      }));
      return;
    }
    const intv = setInterval(() => {
      setState(s => ({ ...s, timeLeft: s.timeLeft - 1 }));
    }, 1000);
    return () => clearInterval(intv);
  }, [state.isRunning, state.timeLeft, state.timerMode]);

  // Reset Timer
  const resetTimer = (mode?: "work" | "break") => {
    setState(s => ({
      ...s,
      timerMode: mode ?? s.timerMode,
      timeLeft: mode === "break"
        ? BREAK_DURATION
        : mode === "work"
        ? WORK_DURATION
        : s.timerMode === "work"
        ? WORK_DURATION
        : BREAK_DURATION,
      isRunning: false,
    }));
  };

  // Tasks CRUD
  const addTask = (text: string) =>
    setState(s => ({
      ...s,
      tasks: [...s.tasks, { id: Date.now().toString(), text, completed: false }],
    }));
  const updateTask = (id: string, text: string) =>
    setState(s => ({
      ...s,
      tasks: s.tasks.map(t => (t.id === id ? { ...t, text } : t)),
    }));
  const deleteTask = (id: string) =>
    setState(s => ({ ...s, tasks: s.tasks.filter(t => t.id !== id) }));
  const toggleTask = (id: string) =>
    setState(s => ({
      ...s,
      tasks: s.tasks.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ),
    }));

  return (
    <PomodoroContext.Provider
      value={{
        state,
        setState,
        resetTimer,
        addTask,
        updateTask,
        deleteTask,
        toggleTask,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};

export const usePomodoro = () => {
  const context = useContext(PomodoroContext);
  if (!context) throw new Error("usePomodoro must be used within PomodoroProvider");
  return context;
};
