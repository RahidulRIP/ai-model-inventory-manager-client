import { motion } from "framer-motion";
import { AiOutlineLogin } from "react-icons/ai";
import { Link } from "react-router";

const GetStarted = () => {
  return (
    <section className="bg-slate-900 py-32 px-6 md:px-16 text-white overflow-hidden relative">
      {/* Subtle Background Pattern for "Senior" Texture */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#4f46e5 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      ></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Overline Label */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-6 block"
        >
          Deployment Ready
        </motion.span>

        {/* Industrial Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-none"
        >
          READY TO <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            INTEGRATE?
          </span>
        </motion.h2>

        {/* Technical Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          Register to initialize your developer environment. Track latency,
          manage deployment tokens, and scale your AI architecture with
          enterprise-grade precision.
        </motion.p>

        {/* Industrial CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center"
        >
          <Link to="/login" className="no-underline">
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
        </motion.div>
      </div>
    </section>
  );
};

export default GetStarted;
