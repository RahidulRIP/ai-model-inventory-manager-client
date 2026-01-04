import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {
  RiCpuLine,
  RiCodeSSlashLine,
  RiSettings4Line,
  RiStackLine,
} from "react-icons/ri";
import Container from "../../Container/Container";

const ModelCategories = () => {
  const axiosSecure = useAxiosSecure();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosSecure.get("/models");
        const data = response.data;

        // Group data by 'framework' dynamically
        const counts = data.reduce((acc, model) => {
          // Fallback to "Standard" if framework field is missing
          const framework = model.framework || "Standard";
          acc[framework] = (acc[framework] || 0) + 1;
          return acc;
        }, {});

        const categoryArray = Object.keys(counts).map((key) => ({
          name: key,
          count: counts[key],
        }));

        setCategories(categoryArray);
      } catch (err) {
        console.error("Error fetching framework categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [axiosSecure]);

  // Updated icon logic for Frameworks
  const getIcon = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("react") || lowerName.includes("js"))
      return <RiCodeSSlashLine />;
    if (lowerName.includes("python") || lowerName.includes("torch"))
      return <RiSettings4Line />;
    if (lowerName.includes("tensor") || lowerName.includes("flow"))
      return <RiStackLine />;
    return <RiCpuLine />;
  };

  if (loading)
    return (
      <div className="py-20  text-center font-black animate-pulse text-indigo-600">
        SCANNING_FRAMEWORK_STACKS...
      </div>
    );

  return (
    <div className="py-24 md:py-40 bg-base-200">
      <Container>
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">
            Framework <span className="text-indigo-600">Stacks</span>
          </h2>
          <p className="text-slate-500 font-bold uppercase text-sm tracking-widest mt-2">
            Model distribution across {categories.length} core technologies
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="group p-10 border-2 border-slate-900 bg-white md:shadow-[8px_8px_0px_0px_rgba(79,70,229,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all cursor-pointer"
            >
              <div className="text-5xl text-indigo-600 mb-8 group-hover:rotate-12 transition-transform duration-300">
                {getIcon(cat.name)}
              </div>
              <h3 className="text-2xl font-black uppercase mb-4 truncate text-slate-900">
                {cat.name}
              </h3>
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase">
                    Model Count
                  </p>
                  <p className="font-mono text-xl font-black text-slate-900">
                    {cat.count.toString().padStart(2, "0")}
                  </p>
                </div>
                <div className="text-[10px] font-black uppercase bg-gray-400  px-2 py-1">
                  Verified
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ModelCategories;
