import React, { useState } from "react";
import Container from "../../Components/Container/Container";
import {
  FiBook,
  FiTerminal,
  FiCode,
  FiLayers,
  FiCopy,
  FiCheck,
  FiCpu,
  FiGlobe,
  FiKey,
  FiAlertTriangle,
} from "react-icons/fi";

const Docs = () => {
  const [copied, setCopied] = useState("");

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(""), 2000);
  };

  const sections = [
    { id: "intro", title: "Introduction", icon: <FiBook /> },
    { id: "install", title: "Installation", icon: <FiLayers /> },
    { id: "auth", title: "Authentication", icon: <FiKey /> },
    { id: "usage", title: "Basic Usage", icon: <FiTerminal /> },
    // { id: "endpoints", title: "Endpoints", icon: <FiGlobe /> },
    { id: "limits", title: "Rate Limits", icon: <FiAlertTriangle /> },
  ];

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-12 lg:p-20">
      <Container>
        <div className="flex flex-col lg:flex-row gap-16">
          {/* STICKY SIDEBAR NAVIGATION */}
          <aside className="w-full lg:w-80">
            <div className="sticky top-10 space-y-8">
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8 ml-2">
                  System Documentation v2.0
                </h3>
                <nav className="space-y-3">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="group flex items-center gap-4 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border-2 border-transparent text-gray-500 bg-white hover:border-slate-900 hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
                    >
                      <span className="text-indigo-600 group-hover:scale-110 transition-transform">
                        {section.icon}
                      </span>
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>

              {/* API STATUS BOX */}
              <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-[12px_12px_0px_0px_rgba(79,70,229,1)]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    API Operational
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">
                  Current Uptime
                </p>
                <p className="text-2xl font-black font-mono">99.98%</p>
              </div>
            </div>
          </aside>

          {/* MAIN DOCUMENTATION CONTENT */}
          <main className="flex-1 max-w-4xl">
            {/* HERO SECTION */}
            <header className="mb-20">
              <div className="bg-indigo-600 inline-block p-4 rounded-3xl mb-8 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] border-2 border-slate-900">
                <FiCpu className="text-white" size={32} />
              </div>
              <h1 className="text-6xl md:text-7xl font-black text-gray-600 uppercase tracking-tighter leading-[0.9]">
                Neural <br /> <span className="text-indigo-600">Protocol</span>
              </h1>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-6 max-w-xl leading-relaxed">
                The definitive guide to integrating high-performance AI models
                into your production environment via the AI-Craft Ledger.
              </p>
            </header>

            <div className="space-y-24">
              {/* SECTION: INTRODUCTION */}
              <section id="intro" className="scroll-mt-10">
                <h2 className="text-3xl font-black text-gray-500 uppercase tracking-tight mb-6 flex items-center gap-4">
                  <span className="text-slate-200">01.</span> Introduction
                </h2>
                <div className="prose prose-slate max-w-none space-y-4">
                  <p className="text-lg text-slate-600 font-medium leading-relaxed">
                    Welcome to the AI-Craft developer portal. Our API allows you
                    to programmatically access neural networks acquired through
                    our marketplace. This protocol ensures low-latency execution
                    and framework-agnostic integration.
                  </p>
                </div>
              </section>

              {/* SECTION: INSTALLATION */}
              <section id="install" className="scroll-mt-10">
                <h2 className="text-3xl font-black text-gray-500 uppercase tracking-tight mb-6 flex items-center gap-4">
                  <span className="text-slate-200">02.</span> Installation
                </h2>
                <p className="text-slate-600 font-medium mb-6">
                  Install our unified toolkit to manage model lifecycles.
                </p>

                <div className="bg-white border-4 border-slate-900 rounded-[32px] p-8 shadow-[12px_12px_0px_0px_rgba(15,23,42,1)]">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Terminal Output
                    </span>
                    <button
                      onClick={() =>
                        handleCopy("npm install @ai-craft/core", "install")
                      }
                      className="text-indigo-600 font-black text-[10px] uppercase hover:underline"
                    >
                      {copied === "install" ? "Copied!" : "Copy Command"}
                    </button>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-100">
                    <code className="font-mono text-slate-900 font-bold">
                      <span className="text-indigo-600">$</span> npm install
                      @ai-craft/core @ai-craft/neural-bridge
                    </code>
                  </div>
                </div>
              </section>

              {/* SECTION: AUTHENTICATION */}
              <section id="auth" className="scroll-mt-10">
                <h2 className="text-3xl font-black text-gray-500  uppercase tracking-tight mb-6 flex items-center gap-4">
                  <span className="text-slate-200">03.</span> Authentication
                </h2>
                <div className="bg-amber-50 border-2 border-amber-200 p-8 rounded-[32px] mb-8">
                  <h4 className="flex items-center gap-2 text-amber-800 font-black uppercase text-[10px] tracking-widest mb-2">
                    <FiAlertTriangle /> Security Warning
                  </h4>
                  <p className="text-amber-900/70 text-sm font-bold leading-relaxed uppercase tracking-tight">
                    Never expose your private Neural Signature in client-side
                    code. Always use environment variables in a secure backend
                    node.
                  </p>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed mb-6">
                  Access your signature via the{" "}
                  <span className="text-indigo-600 font-bold underline">
                    Profile Settings
                  </span>
                  . Include it in the header of every request.
                </p>
                <div className="bg-slate-900 rounded-[32px] p-8 text-indigo-300 font-mono text-sm leading-relaxed shadow-[12px_12px_0px_0px_rgba(79,70,229,0.2)]">
                  <p>Authorization: Bearer {"<YOUR_NEURAL_SIGNATURE_KEY>"}</p>
                  <p>X-Provider-ID: {"ai-craft-internal"}</p>
                </div>
              </section>

              {/* SECTION: USAGE */}
              <section id="usage" className="scroll-mt-10">
                <h2 className="text-3xl font-black text-gray-500  uppercase tracking-tight mb-6 flex items-center gap-4">
                  <span className="text-slate-200">04.</span> Basic Usage
                </h2>
                <div className="bg-slate-900 rounded-[32px] overflow-hidden border-4 border-slate-900 shadow-[12px_12px_0px_0px_rgba(15,23,42,1)]">
                  <div className="bg-slate-800 px-8 py-4 flex justify-between items-center border-b border-slate-700">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                      initialize.js
                    </span>
                    <FiCode className="text-slate-500" />
                  </div>
                  <pre className="p-8 overflow-x-auto">
                    <code className="font-mono text-sm text-slate-300 leading-8">
                      {`import { NeuralBridge } from '@ai-craft/core';\n\nconst client = new NeuralBridge({\n  signature: process.env.AI_CRAFT_KEY\n});\n\n// Run Inference\nconst response = await client.predict({\n  model: 'NEURAL-X1-PRO',\n  input: { tensor: [1, 0, 24, 55] }\n});`}
                    </code>
                  </pre>
                </div>
              </section>

              {/* SECTION: RATE LIMITS */}
              <section id="limits" className="scroll-mt-10">
                <h2 className="text-3xl font-black text-gray-500  uppercase tracking-tight mb-6 flex items-center gap-4">
                  <span className="text-slate-200">05.</span> Rate Limits
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border-2 border-slate-900 p-8 rounded-[32px] shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
                      Free Tier
                    </p>
                    <p className="text-2xl font-black text-gray-500 ">
                      1,000{" "}
                      <span className="text-sm font-medium text-slate-400">
                        Req/Day
                      </span>
                    </p>
                  </div>
                  <div className="bg-indigo-600 border-2 border-slate-900 p-8 rounded-[32px] shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] text-white">
                    <p className="text-[10px] font-black text-indigo-200 uppercase tracking-[0.2em] mb-2">
                      Enterprise
                    </p>
                    <p className="text-2xl font-black">
                      Unlimited{" "}
                      <span className="text-sm font-medium text-indigo-300">
                        Burst
                      </span>
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* FOOTER OF DOCS */}
            <footer className="mt-32 pt-12 border-t-2 border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                © 2026 AI-CRAFT GLOBAL NEURAL NETWORK
              </p>
              <div className="flex gap-8">
                <a
                  href="#"
                  className="text-[10px] font-black text-gray-500  uppercase hover:text-indigo-600"
                >
                  Github
                </a>
                <a
                  href="#"
                  className="text-[10px] font-black text-gray-500  uppercase hover:text-indigo-600"
                >
                  Discord
                </a>
                <a
                  href="#"
                  className="text-[10px] font-black text-gray-500 uppercase hover:text-indigo-600"
                >
                  Changelog
                </a>
              </div>
            </footer>
          </main>
        </div>
      </Container>
    </div>
  );
};

export default Docs;
