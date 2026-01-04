import { motion } from "framer-motion";
import { use } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../../Providers/Context/AuthContext";
import { AiOutlineLogin } from "react-icons/ai";

const SwiperInfo = ({ image, title, subtitle, isActive }) => {
  const { user } = use(AuthContext);
  return (
    <div className="relative h-full w-full flex items-center justify-center md:justify-start">
      <div className="absolute inset-0 z-0">
        <div
          className={`h-full w-full bg-cover bg-center transition-transform duration-[8000ms] ${
            isActive ? "scale-100 opacity-60" : "scale-110 opacity-0"
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent md:bg-gradient-to-r md:from-slate-950 md:to-transparent z-10" />
      </div>

      <div className="relative z-20 px-6 md:px-20 lg:px-32 w-full">
        <div className="max-w-3xl text-center md:text-left">
          {/* Title */}
          <h2
            className={`text-3xl sm:text-5xl md:text-7xl font-black text-white leading-tight transition-all duration-1000 delay-300 ${
              isActive
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {title.split("—")[0]}
            <span className="block text-cyan-400 italic font-medium">
              {title.split("—")[1]}
            </span>
          </h2>

          {/* Subtitle */}
          <p
            className={`mt-4 text-sm md:text-xl text-slate-300 leading-relaxed max-w-xl transition-all duration-1000 delay-500 ${
              isActive
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {subtitle}
          </p>

          {/* Button */}
          <div
            className={`mt-8 transition-all duration-1000 delay-700 ${
              isActive
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {/* <Link
              to="/allModels"
              className="inline-block w-full sm:w-auto px-10 py-4 bg-cyan-500 text-slate-950 font-bold rounded-xl hover:bg-cyan-400 transition-colors text-center"
            >
              Get Started
            </Link> */}

            {user ? (
              <div className="flex items-center gap-4">
                {/* Dynamic Welcome Message */}
                <div className="hidden md:block text-right">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    System Access: Granted
                  </p>
                  <h4 className="text-sm font-black uppercase text-gray-500">
                    Welcome,{" "}
                    <span className="text-indigo-600">
                      {user?.displayName || "Agent"}
                    </span>
                  </h4>
                </div>

                {/* Optional: User Avatar/Profile Icon could go here */}
                <div className="w-10 h-10 bg-indigo-600 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex items-center justify-center text-white font-black">
                  {user?.displayName?.charAt(0) || "U"}
                </div>
              </div>
            ) : (
              <Link to="/signUp" className="no-underline">
                <button
                  className="
                    group flex items-center justify-center gap-4 bg-white text-slate-900 
                    font-black text-xs uppercase tracking-[0.3em] px-10 py-6 rounded-2xl 
                    transition-all duration-300 
                    hover:bg-indigo-500 hover:text-white
                    active:translate-y-1 
                    shadow-[8px_8px_0px_0px_rgba(79,70,229,1)]
                    hover:shadow-none
                  "
                >
                  <AiOutlineLogin className="text-xl transition-transform group-hover:rotate-12" />
                  Get Started Now
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwiperInfo;
