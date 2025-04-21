
import React from "react";

const Profile = () => {
  return (
    <div className="flex-1 bg-[#181615] min-h-screen px-0 pt-10">
      <div className="container max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-7">My Profile</h1>
        {/* Account Info */}
        <div className="bg-[#23201d] rounded-xl p-8 mb-7 border border-white/10">
          <div className="font-bold text-white text-xl mb-2">Account Information</div>
          <div className="flex items-center gap-6">
            <div className="rounded-full bg-cyan-600 text-white w-[72px] h-[72px] flex items-center justify-center text-3xl font-bold">
              S
            </div>
            <div>
              <div className="font-extrabold text-white text-lg">Shailesh Sathe</div>
              <div className="text-white/70 mb-1">satheshailesh43@gmail.com</div>
              <div className="text-white/40 mb-3">Member since 3/29/2025</div>
              <button className="px-4 py-2 bg-[#181615] border border-white/10 rounded hover:bg-[#272522] text-white/80 text-sm font-bold">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        {/* Subscription */}
        <div className="bg-[#23201d] rounded-xl p-8 mb-7 border border-white/10">
          <div className="font-bold text-white text-xl mb-3">Subscription</div>
          <div className="text-white/60 mb-3">
            You are currently on the Free plan.
            <br />
            <span className="text-white/70">
              Upgrade to Pro for advanced features and unlimited usage.
            </span>
          </div>
          <button className="w-full px-4 py-2 bg-[#151415] rounded-lg hover:brightness-110 text-white font-medium">
            Subscribe
          </button>
        </div>
        {/* Actions */}
        <div className="bg-[#23201d] rounded-xl p-8 border border-white/10">
          <div className="font-bold text-white text-xl mb-3">Account Actions</div>
          <button className="underline text-white/60 hover:text-white">Sign out</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
