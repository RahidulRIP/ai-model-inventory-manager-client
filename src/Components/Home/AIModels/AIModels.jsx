import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import ModelCard from "../../Cards/ModelCard";
import Container from "../../Container/Container";
import Loader from "../../Shared/Loader";

const AIModels = () => {
  const [modelsData, setModelsData] = useState();
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosSecure();

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
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
            Featured AI Models
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-8 md:mt-16 p-2.5">
            {modelsData.slice(0, 6).map((data) => (
              <ModelCard key={data._id} data={data} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AIModels;
