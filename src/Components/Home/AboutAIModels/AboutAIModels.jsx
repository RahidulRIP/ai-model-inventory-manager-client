import { motion } from "framer-motion";

const AboutAIModels = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-24 px-6 md:px-16 text-gray-800 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text mb-6 text-transparent"
        >
          About AI Models
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-lg md:text-xl text-gray-600 mb-12"
        >
          AI models are intelligent systems that learn from data, recognize
          patterns, and make predictions. They power technologies that transform
          industries and improve human life.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {/* Card 1 */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          initial={{ y: 40 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl"
        >
          <div className="mb-4">
            <h3 className="text-2xl font-semibold text-indigo-600">
              How AI Models Work
            </h3>
          </div>
          <div className="flex flex-col gap-3 text-gray-600">
            <div className="flex items-start gap-2">
              <span className="text-indigo-500">●</span>
              <p>
                Neural networks mimic the human brain through layers that
                process data.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-indigo-500">●</span>
              <p>
                They learn from large datasets to improve performance over time.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-indigo-500">●</span>
              <p>
                Used for image recognition, speech, and language translation.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl"
        >
          <div className="mb-4">
            <h3 className="text-2xl font-semibold text-indigo-600">
              Why They Matter
            </h3>
          </div>
          <div className="flex flex-col gap-3 text-gray-600">
            <div className="flex items-start gap-2">
              <span className="text-indigo-500">●</span>
              <p>Chatbots — enable natural human-like conversations.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-indigo-500">●</span>
              <p>Image Recognition — identifies objects and people.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-indigo-500">●</span>
              <p>Recommendation Systems — personalize user experiences.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-indigo-500">●</span>
              <p>Medical AI — helps diagnose diseases efficiently.</p>
            </div>
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl"
        >
          <div className="mb-4">
            <h3 className="text-2xl font-semibold text-indigo-600">
              Applications of AI Models
            </h3>
          </div>
          <div className="flex flex-col gap-3 text-gray-600">
            <div className="flex items-start gap-2">
              <span className="text-indigo-500">●</span>
              <p>Autonomous vehicles that navigate safely.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-indigo-500">●</span>
              <p>Virtual assistants like Siri and Alexa.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-indigo-500">●</span>
              <p>Fraud detection in banking systems.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-indigo-500">●</span>
              <p>Creative AI for art, music, and design.</p>
            </div>
          </div>
        </motion.div>

        {/* Card 4 */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl"
        >
          <div className="mb-4">
            <h3 className="text-2xl font-semibold text-indigo-600">
              Types of AI Models
            </h3>
          </div>
          <div className="flex flex-col gap-3 text-gray-600">
            <div className="flex items-start gap-2">
              <span className="text-indigo-500">●</span>
              <p>Supervised Learning — trained on labeled data.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-indigo-500">●</span>
              <p>Unsupervised Learning — finds hidden patterns.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-indigo-500">●</span>
              <p>Reinforcement Learning — learns by feedback.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-indigo-500">●</span>
              <p>Generative Models — create text or images.</p>
            </div>
          </div>
        </motion.div>

        {/* Card 5 */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl"
        >
          <div className="mb-4">
            <h3 className="text-2xl font-semibold text-indigo-600">
              Challenges in AI
            </h3>
          </div>
          <div className="flex flex-col gap-3 text-gray-600">
            <div className="flex items-start gap-2">
              <span className="text-indigo-500">●</span>
              <p>Data bias — may lead to unfair outcomes.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-indigo-500">●</span>
              <p>Explainability — hard to interpret decisions.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-indigo-500">●</span>
              <p>Ethical concerns — privacy & accountability.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-indigo-500">●</span>
              <p>Energy usage — large models require huge power.</p>
            </div>
          </div>
        </motion.div>

        {/* Card 6 */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl"
        >
          <div className="mb-4">
            <h3 className="text-2xl font-semibold text-indigo-600">
              The Future of AI Models
            </h3>
          </div>
          <div className="flex flex-col gap-3 text-gray-600">
            <div className="flex items-start gap-2">
              <span className="text-indigo-500">●</span>
              <p>Explainable AI (XAI) — more transparent systems.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-indigo-500">●</span>
              <p>Edge AI — running on-device for speed & privacy.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-indigo-500">●</span>
              <p>Quantum AI — leveraging quantum computing.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-indigo-500">●</span>
              <p>Toward human-like, ethical intelligence.</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="text-center mt-20"
      >
        <p className="text-gray-700 text-lg md:text-xl font-medium mb-6">
          🌍 AI models are the foundation of the intelligent future —
          continuously learning, adapting, and improving our world.
        </p>
        <button className="mt-2 my-button rounded-lg">
          Learn More About AI
        </button>
      </motion.div>
    </section>
  );
};

export default AboutAIModels;
