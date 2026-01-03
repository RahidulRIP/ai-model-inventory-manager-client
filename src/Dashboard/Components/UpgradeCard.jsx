import toast from "react-hot-toast";
import { FiZap, FiArrowRight, FiShield } from "react-icons/fi";

const UpgradeCard = ({ currentPlan = "Free", usageCount = 8, limit = 10 }) => {
  const usagePercentage = (usageCount / limit) * 100;

  const handleUpgrade = () => {
    toast.success("This feature is Coming Soon", {
      icon: "🚀",
      style: {
        borderRadius: "10px",
        background: "#1e293b",
        color: "#fff",
        fontSize: "12px",
        fontWeight: "bold",
        border: "1px solid rgba(255,255,255,0.1)",
      },
    });
  };

  return (
    <div className="relative group mx-2">
      {/* Background Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[30px] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

      <div className="relative bg-slate-900 rounded-[28px] p-6 border border-white/10 overflow-hidden shadow-2xl">
        {/* Subtle Glassmorphism Mesh */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-40 h-40 bg-indigo-600/10 rounded-full blur-[60px]" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-40 h-40 bg-purple-600/10 rounded-full blur-[60px]" />

        <div className="relative z-10">
          {/* Badge */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2 px-2.5 py-1 bg-white/5 border border-white/10 rounded-full">
              <FiShield className="text-indigo-400 text-[10px]" />
              <span className="text-[9px] font-black uppercase tracking-wider text-indigo-200">
                {currentPlan} Account
              </span>
            </div>
            {usagePercentage >= 80 && (
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            )}
          </div>

          <h3 className="text-white text-lg font-bold leading-tight tracking-tight">
            Scale your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              AI Logic
            </span>
          </h3>

          <p className="text-slate-400 text-[11px] mt-2 leading-relaxed">
            You've used{" "}
            <span className="text-white font-bold">
              {usageCount}/{limit}
            </span>{" "}
            free model slots. Upgrade to remove all limits.
          </p>

          {/* Realistic Progress Bar */}
          <div className="mt-4 mb-6">
            <div className="flex justify-between items-end mb-1.5">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                Usage Status
              </span>
              <span
                className={`text-[10px] font-black ${
                  usagePercentage >= 80 ? "text-red-400" : "text-indigo-400"
                }`}
              >
                {usagePercentage}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
              <div
                className={`h-full transition-all duration-1000 ease-out rounded-full shadow-[0_0_12px_rgba(99,102,241,0.3)] ${
                  usagePercentage >= 80
                    ? "bg-gradient-to-r from-red-500 to-orange-400"
                    : "bg-gradient-to-r from-indigo-500 to-purple-500"
                }`}
                style={{ width: `${usagePercentage}%` }}
              />
            </div>
          </div>

          <button
            onClick={handleUpgrade}
            className="group/btn w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-indigo-900/20"
          >
            Upgrade Now
            <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeCard;
