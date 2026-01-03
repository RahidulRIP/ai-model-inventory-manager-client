import { motion } from "framer-motion";
import {
  FaBrain,
  FaLightbulb,
  FaRocket,
  FaProjectDiagram,
  FaExclamationTriangle,
  FaGlobe,
} from "react-icons/fa";
import { Link } from "react-router";

const AboutAIModels = () => {
  const cards = [
    {
      title: "How AI Models Work",
      icon: <FaBrain className="text-indigo-500" />,
      points: [
        "Neural networks mimic the human brain through data processing layers.",
        "They learn from large datasets to improve performance over time.",
        "Used for image recognition, speech, and language translation.",
      ],
    },
    {
      title: "Why They Matter",
      icon: <FaLightbulb className="text-amber-500" />,
      points: [
        "Chatbots enable natural human-like conversations.",
        "Image Recognition identifies objects and people accurately.",
        "Medical AI helps diagnose diseases with high efficiency.",
      ],
    },
    {
      title: "Global Applications",
      icon: <FaRocket className="text-emerald-500" />,
      points: [
        "Autonomous vehicles that navigate complex environments safely.",
        "Virtual assistants like Siri and Alexa simplify daily tasks.",
        "Fraud detection systems securing global banking networks.",
      ],
    },
    {
      title: "Types of AI Models",
      icon: <FaProjectDiagram className="text-blue-500" />,
      points: [
        "Supervised Learning — trained on specifically labeled data.",
        "Reinforcement Learning — learns through feedback loops.",
        "Generative Models — creating original text, art, and music.",
      ],
    },
    {
      title: "Critical Challenges",
      icon: <FaExclamationTriangle className="text-red-500" />,
      points: [
        "Data bias which may lead to unfair or skewed outcomes.",
        "Explainability — making complex decisions interpretable.",
        "Energy usage — addressing the carbon footprint of large models.",
      ],
    },
    {
      title: "The AI Future",
      icon: <FaGlobe className="text-purple-500" />,
      points: [
        "Edge AI — running on-device for maximum speed and privacy.",
        "Quantum AI — leveraging the power of quantum computing.",
        "Toward human-like, ethical, and safe intelligence.",
      ],
    },
  ];

  return (
    <section className="md:px-16 text-slate-900 overflow-hidden my-[var(--section-gap)] p-2.5 md:p-12">
      <div className="max-w-5xl mx-auto text-center mb-20">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-xs font-black uppercase tracking-[0.3em] text-indigo-600 mb-4 block"
        >
          Intelligence Redefined
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-black text-gray-500 mb-8 tracking-tight"
        >
          About AI Models
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed"
        >
          AI models are high-performance systems that learn from data, recognize
          complex patterns, and make high-accuracy predictions.
        </motion.p>
      </div>

      {/* 

[Image of a neural network architecture diagram]
 */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-8 bg-white rounded-[32px] border border-slate-200 shadow-sm hover:shadow-xl transition-all group"
          >
            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
              {card.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">
              {card.title}
            </h3>
            <ul className="space-y-4">
              {card.points.map((point, pIndex) => (
                <li
                  key={pIndex}
                  className="flex items-start gap-3 text-sm text-slate-500 leading-relaxed"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-24 px-4"
      >
        {/* Removed Link from here to fix the stray line issue */}
        <div className="bg-white border-2 border-slate-900 p-10 rounded-[40px] max-w-4xl mx-auto shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] text-center">
          <p className="text-slate-900 text-xl md:text-2xl font-bold mb-8 italic">
            "AI models are the foundation of the intelligent future —
            continuously learning, adapting, and improving our world."
          </p>

          <Link to="/documentation" className="inline-block no-underline">
            <button className="px-10 py-5 rounded-2xl bg-slate-900 text-white font-black text-xs uppercase tracking-[0.25em] transition-all duration-300 hover:bg-indigo-600 active:translate-y-1 shadow-[4px_4px_0px_0px_rgba(79,70,229,0.4)] hover:shadow-none border-none outline-none">
              Explore Documentation
            </button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutAIModels;
