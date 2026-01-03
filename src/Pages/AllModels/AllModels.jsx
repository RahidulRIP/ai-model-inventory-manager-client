import { useEffect, useState, useCallback } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loader from "../../Components/Shared/Loader";
import Container from "../../Components/Container/Container";
import ModelCard from "../../Components/Cards/ModelCard";
import { useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import SearchNotFound from "../../Components/Error/SearchNotFound";
import { FiSearch, FiFilter, FiCpu } from "react-icons/fi";

const AllModels = () => {
  const [modelsData, setModelsData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeFramework, setActiveFramework] = useState("All Frameworks");

  const axiosSecure = useAxiosSecure();
  const { pathname } = useLocation();

  // Unified Fetch Function - Senior Practice: Memoize callbacks to prevent unnecessary re-renders
  const fetchModels = useCallback(
    async (params = {}) => {
      try {
        setLoading(true);
        const endpoint = params.search
          ? `/models/search?value=${params.search}`
          : params.filter && params.filter !== "All Frameworks"
          ? `/models/filter?value=${params.filter}`
          : "/models";

        const response = await axiosSecure.get(endpoint);
        setModelsData(response?.data || []);
      } catch (err) {
        console.error("Data Retrieval Error:", err);
      } finally {
        setLoading(false);
      }
    },
    [axiosSecure]
  );

  useEffect(() => {
    fetchModels();
  }, [fetchModels]);

  const onFilterChange = (e) => {
    const val = e.target.value;
    setActiveFramework(val);
    fetchModels({ filter: val });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchModels({ search: searchValue });
  };

  if (loading && modelsData.length === 0) return <Loader />;

  return (
    <div className="min-h-screen bg-base-100   pb-24">
      {/* Header Section with Industrial Aesthetic */}
      <div className="bg-base-200  border-b border-slate-200 pt-16 pb-12 mb-12">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <FiCpu className="text-xl" />
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                  Neural Inventory v2.0
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-gray-500 tracking-tighter leading-none">
                EXPLORE <br />
                <span className="text-indigo-600">AI MODELS.</span>
              </h1>
            </div>

            {/* Glassmorphism Control Bar */}
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative group">
                <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                <select
                  onChange={onFilterChange}
                  className="pl-11 pr-8 py-4 bg-white border-2 border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:border-indigo-600 transition-all appearance-none cursor-pointer min-w-[180px] shadow-sm"
                >
                  <option>All Frameworks</option>
                  <option>TensorFlow</option>
                  <option>PyTorch</option>
                  <option>Keras</option>
                </select>
              </div>

              <form
                onSubmit={handleSearch}
                className="flex flex-1 md:w-80 relative"
              >
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Identify model..."
                  className="w-full pl-11 pr-24 py-4 text-gray-400 bg-white border-2 border-slate-200 rounded-2xl text-sm font-bold outline-none focus:border-indigo-600 transition-all shadow-sm"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 px-6 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-colors"
                >
                  Query
                </button>
              </form>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        {/* Results Info */}
        <div className="flex items-center justify-between mb-8 px-2">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Showing {modelsData.length} instances
            {activeFramework !== "All Frameworks" &&
              ` // Filter: ${activeFramework}`}
          </p>
          <div className="h-[1px] flex-1 bg-slate-200 mx-6 hidden md:block" />
        </div>

        {/* Content Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <div className="py-20 flex justify-center w-full">
              <span className="loading loading-dots loading-lg text-indigo-600"></span>
            </div>
          ) : modelsData.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
            >
              {modelsData.map((model) => (
                <ModelCard
                  key={model._id}
                  data={model}
                  allModelsPath={pathname}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20"
            >
              <SearchNotFound />
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
};

export default AllModels;
