import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBook,
  FaCode,
  FaShieldAlt,
  FaRocket,
  FaTerminal,
} from "react-icons/fa";
import { Link } from "react-router";
import Container from "../../Container/Container"; // Assuming you have a Container component

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
    <div className="bg-base-200 min-h-screen py-12 md:py-24 border-b-2 border-gray-300">
      <Container>
        {/* Header Section */}
        <div className="mb-10 md:mb-16 border-b border-slate-100 pb-8 md:pb-10 px-4 md:px-0">
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">
            Knowledge Base
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-600 mt-4 tracking-tight">
            Technical <br className="block md:hidden" /> Documentation
          </h1>
          <p className="text-slate-500 mt-4 text-base md:text-lg max-w-2xl font-medium leading-relaxed">
            Complete guide to integrating, licensing, and scaling AI models
            within our ecosystem.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Sidebar Navigation - Responsive Design */}
          <aside className="lg:w-1/4 px-4 md:px-0">
            {/* Mobile View: Horizontal Scrollable or Stacked Grid */}
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 lg:pb-0 no-scrollbar">
              {Object.keys(sections).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex-shrink-0 lg:w-full flex items-center gap-3 md:gap-4 px-5 py-3 md:px-6 md:py-4 rounded-xl font-bold text-xs md:text-sm transition-all border-2
                    ${
                      activeTab === key
                        ? "bg-slate-900 text-white border-slate-900 shadow-xl"
                        : "text-slate-500 bg-white border-transparent hover:bg-slate-50 hover:text-gray-500"
                    }`}
                >
                  <span
                    className={
                      activeTab === key ? "text-indigo-400" : "text-slate-400"
                    }
                  >
                    {sections[key].icon}
                  </span>
                  <span className="whitespace-nowrap">
                    {sections[key].title}
                  </span>
                </button>
              ))}
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:w-3/4 px-4 md:px-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-50 border border-slate-200 rounded-[24px] md:rounded-[40px] p-6 md:p-12 lg:p-16 min-h-[400px] flex flex-col shadow-sm"
              >
                <div className="flex items-center gap-2 text-indigo-600 mb-6 font-black uppercase text-[10px] tracking-widest">
                  <FaBook /> Section{" "}
                  {Object.keys(sections).indexOf(activeTab) + 1}
                </div>

                <h2 className="text-2xl md:text-4xl font-black text-gray-600 mb-6 tracking-tight">
                  {sections[activeTab].title}
                </h2>

                <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-10 font-medium">
                  {sections[activeTab].content}
                </p>

                {/* Integration Help Card */}
                <div className="mt-auto pt-10 border-t border-slate-200">
                  <div className="bg-white p-5 md:p-8 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="max-w-md">
                      <h4 className="font-bold text-gray-500 text-lg">
                        Need further help?
                      </h4>
                      <p className="text-sm text-slate-500 mt-1 font-medium">
                        Our engineers are available for custom integrations and
                        architectural auditing.
                      </p>
                    </div>

                    <Link to="/contactExpert" className="w-full md:w-auto">
                      <button
                        type="button"
                        className="w-full md:w-auto group relative flex items-center justify-center gap-3 px-8 py-4 rounded-xl md:rounded-2xl 
                          bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.25em] 
                          transition-all duration-300 hover:bg-indigo-600 active:translate-y-1 
                          shadow-[4px_4px_0px_0px_rgba(79,70,229,0.4)]"
                      >
                        Contact Expert
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
            </AnimatePresence>
          </main>
        </div>
      </Container>
    </div>
  );
};

export default Documentation;
