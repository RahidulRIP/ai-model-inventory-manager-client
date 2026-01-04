import React from "react";
import { motion } from "framer-motion";
import Container from "../../Container/Container";

const LiveMetrics = () => {
  const models = [
    {
      name: "Neural-GPT-4",
      status: "Operational",
      latency: "12ms",
      load: "42%",
    },
    { name: "Vision-Core-X", status: "Auditing", latency: "24ms", load: "18%" },
    {
      name: "Deep-Sync-V2",
      status: "Operational",
      latency: "08ms",
      load: "89%",
    },
  ];
  return (
    <section className="bg-base-200 pb-16 md:pb-24 px-6 relative">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-gray-500 font-black text-5xl tracking-tighter mb-4">
              LIVE SYSTEM <br />{" "}
              <span className="text-indigo-600 underline decoration-2">
                METRICS.
              </span>
            </h2>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">
              Real-time synchronization with global inference nodes
            </p>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest">
                Global Traffic
              </p>
              <p className="text-2xl font-black text-gray-500 tracking-tighter">
                842.1k <span className="text-xs text-emerald-500">req/s</span>
              </p>
            </div>
          </div>
        </div>

        {/* The Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {models.map((model, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 border-2 border-slate-900 rounded-[32px] bg-slate-50 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden group"
            >
              {/* Decorative Scanline Animation */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent h-20 w-full -translate-y-full group-hover:animate-[scan_2s_linear_infinite]" />

              <div className="flex justify-between items-start mb-8">
                <h4 className="font-black text-slate-900 tracking-tighter text-xl">
                  {model.name}
                </h4>
                <span className="flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-slate-200 text-[9px] font-black uppercase tracking-widest text-slate-500">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      model.status === "Operational"
                        ? "bg-emerald-500"
                        : "bg-amber-500"
                    } animate-pulse`}
                  />
                  {model.status}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Latency
                  </span>
                  <span className="font-mono text-sm font-black text-slate-900">
                    {model.latency}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: model.load }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-indigo-600"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Current Load
                  </span>
                  <span className="font-mono text-sm font-black text-slate-900">
                    {model.load}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default LiveMetrics;
