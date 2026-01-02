import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaBook,
  FaCode,
  FaShieldAlt,
  FaRocket,
  FaTerminal,
} from "react-icons/fa";
import { Link } from "react-router";

const Documentation = () => {
  const [activeTab, setActiveTab] = useState("getting-started");

  const sections = {
    "getting-started": {
      title: "Getting Started",
      icon: <FaRocket />,
      content:
        "Welcome to the AI Model Hub. Our platform allows developers to browse, license, and deploy state-of-the-art machine learning models. To begin, browse the 'All Models' section and select a model that fits your technical requirements.",
    },
    licensing: {
      title: "Licensing Logic",
      icon: <FaShieldAlt />,
      content:
        "Each model on our platform comes with a unique license. Once a user 'Deploys' a model, the ownership record is updated in our secure database. Creators retain the 'Author' status, while buyers receive a 'Licensed' deployment token.",
    },
    deployment: {
      title: "Model Deployment",
      icon: <FaTerminal />,
      content:
        "Models are delivered via secure API endpoints. Upon successful licensing, your dashboard will provide a Deployment Secret Key. Use this key to authenticate your local environment with our model inference servers.",
    },
    architecture: {
      title: "Architecture",
      icon: <FaCode />,
      content:
        "Our system is built on a high-concurrency Node.js backend. We utilize neural network optimization to ensure that model weights are loaded efficiently across distributed edge nodes, reducing latency for global users.",
    },
  };

  return (
    <div className="bg-white min-h-screen py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16 border-b border-slate-100 pb-10">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">
            Knowledge Base
          </span>
          <h1 className="text-5xl font-black text-slate-900 mt-4 tracking-tight">
            Technical Documentation
          </h1>
          <p className="text-slate-500 mt-4 text-lg max-w-2xl">
            Complete guide to integrating, licensing, and scaling AI models
            within our ecosystem.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-12">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1 space-y-2">
            {Object.keys(sections).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl font-bold text-sm transition-all
                  ${
                    activeTab === key
                      ? "bg-slate-900 text-white shadow-lg"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
              >
                <span
                  className={
                    activeTab === key ? "text-indigo-400" : "text-slate-400"
                  }
                >
                  {sections[key].icon}
                </span>
                {sections[key].title}
              </button>
            ))}
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-slate-50 border border-slate-200 rounded-[32px] p-10 lg:p-16 min-h-[400px] flex flex-col"
            >
              <div className="flex items-center gap-3 text-indigo-600 mb-6 font-black uppercase text-xs tracking-widest">
                <FaBook /> Section{" "}
                {Object.keys(sections).indexOf(activeTab) + 1}
              </div>

              <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">
                {sections[activeTab].title}
              </h2>

              <p className="text-slate-600 text-lg leading-relaxed mb-10">
                {sections[activeTab].content}
              </p>

              <div className="mt-auto pt-10 border-t border-slate-200">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900">
                      Need further help?
                    </h4>
                    <p className="text-sm text-slate-500">
                      Our engineers are available for custom integrations.
                    </p>
                  </div>
                  <Link
                    to="/contactExpert"
                    className="group inline-block no-underline"
                  >
                    <button
                      type="button"
                      className="
      relative flex items-center justify-center gap-3 px-8 py-4 rounded-2xl 
      bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.25em] 
      transition-all duration-300 
      hover:bg-indigo-600 hover:shadow-none 
      active:translate-y-1 
      shadow-[4px_4px_0px_0px_rgba(79,70,229,0.4)]
      border-none outline-none
    "
                    >
                      Contact Expert
                      {/* Subtle arrow icon that moves on hover */}
                      <svg
                        className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
