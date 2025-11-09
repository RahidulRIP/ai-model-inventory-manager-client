import { motion } from "framer-motion";
import { AiOutlineLogin } from "react-icons/ai";

const GetStarted = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-purple-500 py-24 px-6 md:px-16 text-white">
      <div className="max-w-4xl mx-auto text-center">
        {/* Animated Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Get Started with AI Models
        </motion.h2>

        {/* Animated Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl mb-10 leading-relaxed"
        >
          Register or log in to start cataloging, tracking, and managing AI
          models efficiently. Take full control of your AI projects and explore
          the power of modern machine learning.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button className="flex items-center justify-center gap-2 bg-white text-indigo-600 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300">
            <AiOutlineLogin className="text-2xl" />
            Get Started
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default GetStarted;
