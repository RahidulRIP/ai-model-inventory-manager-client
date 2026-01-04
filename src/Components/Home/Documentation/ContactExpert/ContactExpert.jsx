import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHeadset, FaEnvelope, FaUser, FaMicrochip } from "react-icons/fa";
import toast from "react-hot-toast";

const ContactExpert = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate professional API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Inquiry sent to our AI Engineers!"); // Successful Toast
      e.target.reset(); // Clears the form fields
    }, 1500);
  };

  return (
    <section className="bg-base-200 py-12 md:py-24 px-6 border-b-2 border-gray-300">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Context */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">
                Enterprise Support
              </span>
              <h2 className="text-5xl font-black text-gray-600 mt-4 tracking-tight leading-[1.1]">
                Consult with our <br /> AI Engineers.
              </h2>
              <p className="text-slate-500 mt-6 text-lg leading-relaxed">
                Need help integrating a specific model or scaling your local
                inference? Our experts specialize in neural optimization.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: <FaHeadset />,
                  title: "Technical Consultation",
                  desc: "1-on-1 architecture review for your AI project.",
                },
                {
                  icon: <FaMicrochip />,
                  title: "Custom Training",
                  desc: "Fine-tune models on your private enterprise datasets.",
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-5 items-start">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-indigo-600 shrink-0 border border-slate-100">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-500 uppercase text-[11px] tracking-widest">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: The Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-slate-50 border-2 border-slate-900 p-8 md:p-12 rounded-[40px] shadow-[12px_12px_0px_0px_rgba(15,23,42,1)]"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input
                      required
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 focus:border-indigo-600 focus:outline-none transition-all font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="john@company.com"
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 focus:border-indigo-600 focus:outline-none transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  Your Technical Requirement
                </label>
                <textarea
                  required
                  name="message"
                  rows="4"
                  placeholder="Describe your project goals..."
                  className="w-full px-6 py-4 rounded-xl border-2 border-slate-200 focus:border-indigo-600 focus:outline-none transition-all font-medium resize-none text-gray-500"
                ></textarea>
              </div>

              {/* Functional Industrial Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.25em] transition-all duration-300 flex items-center justify-center gap-3
                  ${
                    loading
                      ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed translate-y-1 shadow-none"
                      : "bg-slate-900 text-white hover:bg-indigo-600 active:translate-y-1 shadow-[4px_4px_0px_0px_rgba(79,70,229,0.4)] hover:shadow-none"
                  }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-current"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Inquiry Now"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactExpert;
