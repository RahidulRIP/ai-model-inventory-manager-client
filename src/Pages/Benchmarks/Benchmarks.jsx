import React, { useState } from "react";
import Container from "../../Components/Container/Container";
import { FiZap, FiCpu, FiActivity, FiServer, FiInfo } from "react-icons/fi";
import { motion } from "framer-motion";

const Benchmarks = () => {
  const [activeTab, setActiveTab] = useState("Inference");

  const benchmarkData = [
    {
      id: 1,
      name: "Neural-X1",
      framework: "PyTorch",
      speed: "12ms",
      accuracy: "99.2%",
      load: "Low",
    },
    {
      id: 2,
      name: "Vision-Pro",
      framework: "TensorFlow",
      speed: "45ms",
      accuracy: "94.5%",
      load: "High",
    },
    {
      id: 3,
      name: "GPT-Craft",
      framework: "JAX",
      speed: "110ms",
      accuracy: "98.1%",
      load: "Medium",
    },
    {
      id: 4,
      name: "Deep-Sense",
      framework: "Scikit-Learn",
      speed: "5ms",
      accuracy: "89.0%",
      load: "Ultra-Low",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 md:p-12">
      <Container>
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-4 border-slate-900 pb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-indigo-600 text-white p-2 rounded-lg shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                <FiActivity size={24} />
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600">
                Live Performance Metrics
              </span>
            </div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              Neural <span className="text-indigo-600">Benchmarks</span>
            </h1>
          </div>
          <div className="flex gap-4">
            {["Inference", "Training", "Latency"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 border-slate-900 transition-all ${
                  activeTab === tab
                    ? "bg-slate-900 text-white shadow-[4px_4px_0px_0px_rgba(79,70,229,1)]"
                    : "bg-white text-slate-900 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Table Area */}
          <div className="lg:col-span-2 bg-white border-4 border-slate-900 rounded-[32px] overflow-hidden shadow-[12px_12px_0px_0px_rgba(15,23,42,1)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest">
                  <tr>
                    <th className="px-8 py-6">Model Signature</th>
                    <th className="px-8 py-6">Response Time</th>
                    <th className="px-8 py-6">Precision</th>
                    <th className="px-8 py-6 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-slate-100">
                  {benchmarkData.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-indigo-50/50 transition-colors"
                    >
                      <td className="px-8 py-6">
                        <div className="font-black text-slate-900 uppercase text-sm">
                          {item.name}
                        </div>
                        <div className="text-[9px] font-bold text-indigo-600 uppercase flex items-center gap-1">
                          <FiCpu size={10} /> {item.framework}
                        </div>
                      </td>
                      <td className="px-8 py-6 font-mono font-bold text-slate-600">
                        {item.speed}
                      </td>
                      <td className="px-8 py-6">
                        <div className="w-full bg-slate-100 h-3 rounded-full border border-slate-200 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: item.accuracy }}
                            transition={{ duration: 1 }}
                            className="bg-emerald-500 h-full"
                          />
                        </div>
                        <span className="text-[9px] font-black text-slate-400 uppercase mt-1 inline-block">
                          {item.accuracy} Accuracy
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <span className="inline-block px-3 py-1 rounded-lg border-2 border-slate-900 bg-white text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                          Stable
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            <div className="bg-indigo-600 border-4 border-slate-900 rounded-[32px] p-8 text-white shadow-[12px_12px_0px_0px_rgba(15,23,42,1)]">
              <FiZap size={32} className="mb-4" />
              <h3 className="text-xl font-black uppercase tracking-tighter italic">
                Network Load
              </h3>
              <p className="text-indigo-200 text-xs font-bold uppercase mt-2">
                All systems operating within optimal neural parameters.
              </p>
              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-[10px] font-black uppercase">
                  <span>Server Latency</span>
                  <span>0.04ms</span>
                </div>
                <div className="w-full bg-indigo-800 h-2 rounded-full">
                  <div className="w-[15%] bg-white h-full rounded-full" />
                </div>
              </div>
            </div>

            <div className="bg-white border-4 border-slate-900 rounded-[32px] p-8 shadow-[12px_12px_0px_0px_rgba(15,23,42,1)]">
              <div className="flex items-center gap-2 mb-4">
                <FiInfo className="text-slate-400" />
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Registry Note
                </h4>
              </div>
              <p className="text-sm font-bold text-slate-900 leading-relaxed uppercase tracking-tight">
                Benchmark testing is conducted via our{" "}
                <span className="text-indigo-600 underline">
                  Decentralized GPU Cluster
                </span>{" "}
                in real-time.
              </p>
            </div>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="mt-20 text-center">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.5em] mb-8">
            Pending Evaluation
          </h2>
          <div className="flex flex-wrap justify-center gap-4 opacity-40 grayscale">
            {["LLAMA-3", "Claude-Next", "Stable-XL", "Gemini-Ultra"].map(
              (m) => (
                <div
                  key={m}
                  className="border-2 border-slate-300 px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest italic"
                >
                  {m}
                </div>
              )
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Benchmarks;
