import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loader from "../../Components/Shared/Loader";
import Container from "../../Components/Container/Container";
import ModelCard from "../../Components/Cards/ModelCard";
import { useLocation } from "react-router";
import { motion } from "framer-motion";

const AllModels = () => {
  const [modelsData, setModelsData] = useState();
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosSecure();
  const location = useLocation();
  const allModelsPath = location.pathname;
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const data = await axiosPublic.get("/models");
        setModelsData(data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchModels();
  }, [axiosPublic]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="">
      <Container>
        <div className="flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text my-10 text-transparent text-center md:text-start "
          >
            Featured AI Models
            <div className="divider"></div>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-x-16 gap-y-10 p-2.5">
            {modelsData.map((data) => (
              <ModelCard
                key={data._id}
                data={data}
                allModelsPath={allModelsPath}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AllModels;
