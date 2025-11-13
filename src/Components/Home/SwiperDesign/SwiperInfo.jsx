import { motion } from "framer-motion";
import { Link } from "react-router";

const SwiperInfo = ({ image, title }) => {
  return (
    <motion.div
      initial={{ scale: 1 }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.9, 1, 0.9],
      }}
      transition={{
        duration: 10,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    >
      <div
        className="bg-cover bg-center h-60 md:h-[600px] rounded-sm  flex flex-col items-center justify-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <h2 className="text-lg md:text-xl w-72 font-medium bg-gradient-to-r from-[#00f2fe] to-[#4facfe] bg-clip-text text-transparent text-center  rounded-sm mb-3.5">
          {title}
        </h2>
        <Link to={"/allModels"} className="my-button rounded-xl">
          Start Now
        </Link>
      </div>
    </motion.div>
  );
};

export default SwiperInfo;
