import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/Context/AuthContext";
import Loader from "../../Components/Shared/Loader";
import Container from "../../Components/Container/Container";
import { Link } from "react-router";
import UseAxiosTokenSecure from "../../Hooks/UseAxiosTokenSecure";
import { motion } from "framer-motion";
import { FiDatabase, FiExternalLink, FiCpu, FiUser } from "react-icons/fi";

const MyModelsPage = () => {
  const [modelsData, setModelsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosTokenSecure();

  useEffect(() => {
    // Senior Practice: Using an AbortController or ensuring async/await is handled cleanly
    const getMyModels = async () => {
      try {
        const res = await axiosSecure.get(
          `/models/specificsModals?email=${user?.email}`
        );
        setModelsData(res.data);
      } catch (err) {
        console.error("Critical: Model Ledger Fetch Failed", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) getMyModels();
  }, [user?.email, axiosSecure]);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-[#f8fafc] p-2.5 md:p-12">
      <Container>
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-200 pb-10">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">
              Developer Console
            </span>
            <h1 className="text-4xl font-black text-slate-900 mt-2 tracking-tighter">
              MY MODEL <span className="text-indigo-600">LEDGER.</span>
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              Manage and monitor your deployed neural assets.
            </p>
          </div>
          <div className="bg-white px-6 py-3 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex items-center gap-4">
            <FiDatabase className="text-indigo-600" />
            <span className="text-xs font-black uppercase tracking-widest text-slate-900">
              Total Assets: {modelsData.length}
            </span>
          </div>
        </div>

        {/* Technical Ledger (Table) */}
        <div className="bg-white border-2 border-slate-900 rounded-[24px] overflow-hidden shadow-[8px_8px_0px_0px_rgba(15,23,42,0.05)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest">
                    Index
                  </th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-indigo-300">
                    Architecture
                  </th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest">
                    Engine / Framework
                  </th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest">
                    Application
                  </th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {modelsData.length > 0 ? (
                  modelsData.map((data, index) => (
                    <motion.tr
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      key={data._id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      <td className="px-6 py-6 text-xs font-mono text-slate-400">
                        {String(index + 1).padStart(2, "0")}
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-xl border-2 border-slate-100 overflow-hidden bg-slate-50 group-hover:border-indigo-200 transition-all">
                            <img
                              className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                              src={data?.image}
                              alt={data?.name}
                            />
                          </div>
                          <div>
                            <div className="font-black text-slate-900 uppercase text-sm tracking-tight">
                              {data?.name}
                            </div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1 mt-1">
                              <FiUser className="text-indigo-500" />{" "}
                              {data?.createdBy.split("@")[0]}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-[10px] font-black uppercase tracking-wider border border-slate-200">
                          <FiCpu className="text-indigo-600" />{" "}
                          {data?.framework}
                        </span>
                      </td>
                      <td className="px-6 py-6 text-sm font-bold text-slate-500 italic">
                        {data?.useCase}
                      </td>
                      <td className="px-6 py-6 text-right">
                        <Link
                          to={`/modelCardDetails/${data?._id}`}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-slate-900 text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:shadow-none active:translate-y-0.5"
                        >
                          Details <FiExternalLink />
                        </Link>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                          <FiDatabase size={32} />
                        </div>
                        <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">
                          No Assets Deployed to Ledger
                        </p>
                        <Link
                          to="/dashboard/addModel"
                          className="text-indigo-600 text-xs font-black uppercase tracking-widest underline mt-2"
                        >
                          Register Your First Model
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MyModelsPage;
