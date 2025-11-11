import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loader from "../../Components/Shared/Loader";
import Container from "../../Components/Container/Container";
import ModelCard from "../../Components/Cards/ModelCard";
import { useLocation } from "react-router";
import { motion } from "framer-motion";
import SearchNotFound from "../../Components/Error/SearchNotFound";

const AllModels = () => {
  const [modelsData, setModelsData] = useState();
  const [searchValue, setSearchValue] = useState("");
  // const [filterData, setFilterData] = useState("");
  // console.log(filterData);
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

  // search
  const handleSearchButton = async () => {
    try {
      setLoading(true);
      const searchData = await axiosPublic.get(
        `/models/search?value=${searchValue}`
      );
      setModelsData(searchData.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // filter
  const handleFilterData = async (e) => {
    try {
      setLoading(true);
      const frameworkValue = e.target.value;
      const data = await axiosPublic.get(
        `models/filter?value=${frameworkValue}`
      );
      setModelsData(data?.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

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
          </motion.h2>
          {/* search  */}
          {/* filter  */}
          <div className="w-full p-2.5">
            <div className="md:flex justify-around  w-full items-center">
              <select
                onChange={handleFilterData}
                defaultValue="Pick a color"
                className="select  mb-2.5"
              >
                <option disabled={true}>Pick a framework</option>
                <option>TensorFlow</option>
                <option>PyTorch</option>
                <option>Keras</option>
              </select>

              <fieldset className="fieldset flex ">
                <input
                  onChange={(e) => setSearchValue(e.target.value)}
                  type="text"
                  className="input focus:outline-none"
                  placeholder="Type here"
                />
                <button
                  onClick={handleSearchButton}
                  type="button"
                  className="btn btn-active"
                >
                  search
                </button>
              </fieldset>
            </div>
          </div>
          <div className="divider"></div>
          <div>
            {modelsData && modelsData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-x-16 gap-y-10 p-2.5">
                {modelsData.map((data) => (
                  <ModelCard
                    key={data._id}
                    data={data}
                    allModelsPath={allModelsPath}
                  />
                ))}
              </div>
            ) : (
              <SearchNotFound />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AllModels;
