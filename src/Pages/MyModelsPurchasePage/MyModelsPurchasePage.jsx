import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/Context/AuthContext";
import Loader from "../../Components/Shared/Loader";
import Container from "../../Components/Container/Container";
import { Link } from "react-router";
import UseAxiosTokenSecure from "../../Hooks/UseAxiosTokenSecure";
import {
  FiCpu,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiInbox,
  FiArrowRight,
} from "react-icons/fi";

const MyModelsPurchasePage = () => {
  const [modelsData, setModelsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosTokenSecure();

  useEffect(() => {
    const fetchPurchases = async () => {
      if (!user?.email) return;
      try {
        setLoading(true);
        const res = await axiosSecure.get(
          `/models/specificsModalsPurchase?email=${user?.email}`
        );

        const sortedData = (res.data || []).sort(
          (a, b) =>
            new Date(b.timestamp || b._id) - new Date(a.timestamp || a._id)
        );

        setModelsData(sortedData);
      } catch (err) {
        console.error("Ledger Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [user?.email, axiosSecure]);

  // Pagination Logic
  const totalPages = Math.ceil(modelsData.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = modelsData.slice(startIndex, startIndex + itemsPerPage);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-[#f8fafc] p-2.5 md:p-12">
      <Container>
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-end gap-4 border-b-2 border-slate-100 pb-8">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
              Acquisition <span className="text-indigo-600">Ledger</span>
            </h1>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mt-2">
              Synchronized with Neural Network Registry
            </p>
          </div>
          <div className="bg-slate-900 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">
            Total Assets: {modelsData.length}
          </div>
        </div>

        {/* Conditional Rendering: Table vs Empty State */}
        {modelsData.length === 0 ? (
          <div className="bg-white border-4 border-dashed border-slate-200 rounded-[40px] p-20 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 border-2 border-slate-100">
              <FiInbox size={40} className="text-slate-300" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
              Registry Empty
            </h2>
            <p className="text-slate-400 text-sm max-w-xs mt-2 font-medium">
              No neural models have been acquired under this account signature
              yet.
            </p>
            <Link
              to="/allModels"
              className="mt-8 flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              Browse Marketplace <FiArrowRight />
            </Link>
          </div>
        ) : (
          <>
            {/* Table Content */}
            <div className="bg-white border-2 border-slate-900 rounded-[32px] overflow-hidden shadow-[12px_12px_0px_0px_rgba(15,23,42,1)]">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white border-b-2 border-slate-900">
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest">
                        Index
                      </th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest">
                        Model Specs
                      </th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-indigo-300">
                        Framework
                      </th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest">
                        Ownership
                      </th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedData.map((data, index) => (
                      <tr
                        key={data._id}
                        className="hover:bg-indigo-50/30 transition-colors group"
                      >
                        <td className="px-8 py-6 font-mono text-xs text-slate-300">
                          {String(startIndex + index + 1).padStart(2, "0")}
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <img
                                className="h-14 w-14 rounded-2xl object-cover border-2 border-slate-100"
                                src={data?.image}
                                alt=""
                              />
                              {index === 0 && currentPage === 1 && (
                                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[8px] px-2 py-0.5 rounded-full font-black animate-bounce">
                                  NEW
                                </span>
                              )}
                            </div>
                            <div>
                              <div className="font-black text-slate-900 text-sm uppercase tracking-tight">
                                {data?.name}
                              </div>
                              <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                {data?.useCase}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="inline-flex items-center gap-2 text-[10px] font-black text-slate-700 uppercase bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
                            <FiCpu className="text-indigo-600" />{" "}
                            {data?.framework}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                            From:{" "}
                            <span className="text-slate-900">
                              {data?.createdBy?.split("@")[0]}
                            </span>
                          </div>
                          <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter mt-1 flex items-center gap-1">
                            <FiClock /> Decoded Assets
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <Link
                            to={`/modelCardDetails/${data?.aiModel_Id}`}
                            className="inline-block bg-white border-2 border-slate-900 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                          >
                            Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* PAGINATION CONTROLS */}
            {totalPages > 1 && (
              <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                  Registry Page {currentPage} / {totalPages}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-3 border-2 border-slate-900 rounded-xl disabled:opacity-20 hover:bg-slate-100 transition-all"
                  >
                    <FiChevronLeft size={20} />
                  </button>
                  <div className="flex flex-wrap gap-2">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-12 h-12 rounded-xl border-2 border-slate-900 font-black text-xs transition-all ${
                          currentPage === i + 1
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
                            : "bg-white text-slate-900"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="p-3 border-2 border-slate-900 rounded-xl disabled:opacity-20 hover:bg-slate-100 transition-all"
                  >
                    <FiChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default MyModelsPurchasePage;
