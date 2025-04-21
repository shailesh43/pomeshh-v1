
import React from "react";
import { usePomodoro } from "@/context/PomodoroProvider";
import { Play, Pause } from "lucide-react";

const formatTime = (seconds: number) => {
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return `${mm}:${ss}`;
};

const Timer = () => {
  const { state, setState, resetTimer } = usePomodoro();
  const { timerMode, timeLeft, isRunning } = state;

  return (
    <div className="flex flex-1 flex-col items-center justify-center h-[100vh] bg-[#181615]">
      <div className="flex gap-8 mb-8 mt-4">
        <button
          onClick={() => resetTimer("work")}
          className={`px-8 py-2 rounded-lg text-sm font-medium transition ${
            timerMode === "work"
              ? "bg-white text-black"
              : "text-white/80 bg-transparent hover:bg-white/10"
          }`}
        >
          Deep Work
        </button>
        <button
          onClick={() => resetTimer("break")}
          className={`px-8 py-2 rounded-lg text-sm font-medium transition ${
            timerMode === "break"
              ? "bg-white text-black"
              : "text-white/80 bg-transparent hover:bg-white/10"
          }`}
        >
          Break Time
        </button>
      </div>
      <div className="text-[8rem] font-extrabold text-white tracking-tighter leading-[1.1] mb-8 select-none">
        {formatTime(timeLeft)}
      </div>
      <button
        className="bg-white rounded-lg w-[400px] max-w-[90vw] py-4 flex justify-center items-center text-black text-2xl font-bold transition hover:bg-white/90"
        onClick={() => setState(s => ({ ...s, isRunning: !isRunning }))}
      >
        {isRunning ? <Pause size={26} /> : <Play size={26} />}
      </button>
    </div>
  );
};

export default Timer;
