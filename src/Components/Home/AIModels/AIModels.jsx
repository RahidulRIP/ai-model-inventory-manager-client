import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import ModelCard from "../../Cards/ModelCard";
import Container from "../../Container/Container";
import Loader from "../../Shared/Loader";
import { Link } from "react-router";

const AIModels = () => {
  const [modelsData, setModelsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosSecure();

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const { data } = await axiosPublic.get("/models");
        setModelsData(data);
      } catch (err) {
        console.error("Failed to fetch models:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchModels();
  }, [axiosPublic]);

  if (loading) return <Loader />;

  return (
    <section className="pb-16 md:pb-32">
      <Container>
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[2px] w-12 bg-indigo-600"></span>
              <span className="text-[11px] font-black tracking-[0.3em] text-indigo-600 uppercase">
                Curated Inventory
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-gray-500 tracking-tight leading-[1.1]">
              Featured <span className="text-indigo-600">AI Models</span>
            </h2>

            <p className="mt-6 text-slate-500 text-lg md:text-xl leading-relaxed max-w-xl">
              Explore our hand-picked selection of high-performance models
              optimized for production-ready intelligence.
            </p>
          </div>

          <Link
            to="/allModels"
            className="hidden md:inline-flex items-center gap-3 text-indigo-600 font-bold group"
          >
            <span className="relative">
              VIEW ALL MODELS
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {modelsData.slice(0, 4).map((data) => (
            <div
              key={data._id}
              className="group transition-all duration-500 hover:-translate-y-3"
            >
              <ModelCard data={data} />
            </div>
          ))}
        </div>

        <div className="mt-16 flex md:hidden">
          <Link
            to="/allModels"
            className="w-full text-center py-5 bg-white border border-slate-200 rounded-2xl font-bold text-slate-900 shadow-sm active:scale-95 transition-transform"
          >
            Browse All Models
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default AIModels;
