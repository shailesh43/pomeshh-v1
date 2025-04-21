
import React from "react";
import { usePomodoro } from "@/context/PomodoroProvider";
import { Clock, BookOpen, BookX } from "lucide-react";
import { Select } from "@/components/ui/select";

const Activity = () => {
  const { state } = usePomodoro();
  // Here only demo, all values are local only
  return (
    <div className="flex-1 bg-[#181615] min-h-screen px-0 pt-10">
      <div className="container max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-5">Activity</h1>
        <div className="bg-[#23201d] text-white/90 rounded-lg p-5 mb-5">
          <span className="block font-bold mb-1">This is a demo of the Activity feature (Coming soon)</span>
          <span>
            Upgrade to PRO to access your real activity data and unlock more features. This feature will be available in 3 days.
          </span>
        </div>
        <div className="mb-5">
          <select className="px-4 py-2 rounded-md bg-[#23201d] text-white border border-white/10 focus:outline-none">
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#23201d] rounded-lg p-4 flex flex-col items-center text-center border border-white/10">
            <span className="text-white/75 text-base">Focus Time</span>
            <Clock className="text-white/40" size={18} />
            <span className="text-2xl font-bold mt-2">{state.activity.focusTime ?? 0}m</span>
          </div>
          <div className="bg-[#23201d] rounded-lg p-4 flex flex-col items-center text-center border border-white/10">
            <span className="text-white/75 text-base">Sessions</span>
            <BookOpen className="text-white/40" size={18} />
            <span className="text-2xl font-bold mt-2">{state.activity.sessions ?? 0}</span>
          </div>
          <div className="bg-[#23201d] rounded-lg p-4 flex flex-col items-center text-center border border-white/10">
            <span className="text-white/75 text-base">Cancelled</span>
            <BookX className="text-white/40" size={18} />
            <span className="text-2xl font-bold mt-2">{state.activity.canceled ?? 0}</span>
          </div>
          <div className="bg-[#23201d] rounded-lg p-4 flex flex-col items-center text-center border border-white/10">
            <span className="text-white/75 text-base">Average</span>
            <Clock className="text-white/40" size={18} />
            <span className="text-2xl font-bold mt-2">40min</span>
          </div>
        </div>
        <div className="bg-[#23201d] text-white/80 rounded-lg p-6 mb-5">
          <span className="font-bold">Charts</span>
          <div className="mt-2">At this moment, charts are only available on desktop.</div>
        </div>
        <div className="bg-[#23201d] p-6 rounded-lg text-white/90 text-lg font-semibold">
          <span>Deep Work Hours</span>
          <div className="text-xs font-normal text-white/60">DAILY</div>
          {/* Placeholder for real chart */}
          <div className="h-40 flex items-center justify-center text-white/20 text-lg">
            {/* Add recharts bar here in pro version */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
