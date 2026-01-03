import { Link, useNavigate, useParams } from "react-router";
import {
  FaUser,
  FaDatabase,
  FaShoppingCart,
  FaRobot,
  FaMicrochip,
  FaShieldAlt,
} from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/Context/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import UseAxiosTokenSecure from "../../Hooks/UseAxiosTokenSecure";
import Container from "../Container/Container";
import Loader from "../Shared/Loader";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ModelCardDetails = () => {
  const [detailsData, setDetailsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosSecure();
  const axiosTokenSecure = UseAxiosTokenSecure();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axiosPublic.get(`/models/${id}`).then((res) => {
      setDetailsData(res?.data);
      setLoading(false);
    });
  }, [axiosPublic, id, refetch]);

  const handlePurchase = async () => {
    if (!user?.email) {
      navigate("/signIn");
      return toast.error("Please login to acquire this model");
    }

    const payload = {
      aiModel_Id: detailsData?._id,
      name: detailsData?.name,
      image: detailsData?.image,
      framework: detailsData?.framework,
      useCase: detailsData?.useCase,
      createdBy: detailsData?.createdBy,
      purchased_By: user?.email,
      timestamp: new Date().toISOString(),
    };

    try {
      const res = await axiosPublic.post(
        `/purchased/${detailsData?._id}`,
        payload
      );

      if (res.data.insertedId) {
        setRefetch(!refetch);
        toast.success("License Acquired Successfully");
        navigate("/dashboard/myModelsPurchasePage");
      }
    } catch (error) {
      console.error("Purchase Error:", error);
      toast.error(
        "Transaction failed: " +
          (error.response?.data?.message || "Server Error")
      );
    }
  };

  const handleAiModelDelete = (modelId) => {
    Swal.fire({
      title: "Confirm Deletion?",
      text: "This action cannot be undone. The model will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Delete Model",
      borderRadius: "16px",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosTokenSecure.delete(`/deleteModel/${modelId}`).then((res) => {
          if (res?.data.deletedCount > 0) {
            toast.success("Model removed from inventory");
            navigate("/allModels");
          }
        });
      }
    });
  };

  if (loading) return <Loader />;

  const isOwner = user?.email === detailsData?.createdBy;

  return (
    <div className="bg-[#fafafa] min-h-screen py-20">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* 1. Header Navigation */}
          <div className="mb-8 flex justify-between items-center">
            <button
              onClick={() => navigate(-1)}
              className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors"
            >
              ← BACK TO MODELS
            </button>
            {isOwner && (
              <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-3 py-1 rounded-full border border-amber-200 uppercase tracking-tighter">
                Your Inventory Item
              </span>
            )}
          </div>

          <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Column*/}
              <div className="p-8 lg:border-r border-slate-100 bg-slate-50/50">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={detailsData?.image}
                    alt={detailsData?.name}
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl border border-slate-200 shadow-sm text-xs font-bold text-indigo-600">
                    {detailsData?.framework}
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-slate-100 flex items-center gap-3">
                    <FaShieldAlt className="text-green-500" />
                    <span className="text-[11px] font-bold text-slate-400 uppercase">
                      Enterprise Verified
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-100 flex items-center gap-3">
                    <FaMicrochip className="text-blue-500" />
                    <span className="text-[11px] font-bold text-slate-400 uppercase">
                      GPU Optimized
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="p-8 md:p-12 flex flex-col">
                <div className="flex items-center gap-3 text-indigo-600 mb-4">
                  <FaRobot size={24} />
                  <span className="text-sm font-black uppercase tracking-[0.2em]">
                    Model Profile
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                  {detailsData?.name}
                </h1>

                <p className="text-slate-500 text-lg leading-relaxed mb-8">
                  {detailsData?.description}
                </p>

                {/* Data Grid */}
                <div className="space-y-4 mb-10">
                  <div className="flex items-center justify-between py-3 border-b border-slate-50">
                    <div className="flex items-center gap-3 text-slate-600 font-medium">
                      <FaUser className="text-slate-400" /> Created By
                    </div>
                    <span className="text-slate-900 font-bold">
                      {detailsData?.createdBy}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-50">
                    <div className="flex items-center gap-3 text-slate-600 font-medium">
                      <FaDatabase className="text-slate-400" /> Dataset Scale
                    </div>
                    <span className="text-slate-900 font-bold">
                      {detailsData?.dataset}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-50">
                    <div className="flex items-center gap-3 text-slate-600 font-medium">
                      <FaShoppingCart className="text-slate-400" />{" "}
                      Installations
                    </div>
                    <span className="text-slate-900 font-bold">
                      {detailsData?.purchased || 0}
                    </span>
                  </div>
                </div>

                {/* Actions */}

                <div className="mt-auto space-y-4">
                  <button
                    onClick={handlePurchase}
                    disabled={isOwner}
                    className={`w-full py-5 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-xl
      ${
        isOwner
          ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200 shadow-none"
          : "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98] shadow-indigo-200"
      }`}
                  >
                    {isOwner ? "Licensed (Creator)" : "Deploy Model Now"}
                  </button>

                  {/* Owner Actions Grid */}
                  {isOwner && (
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                      <Link
                        to={`/updateAiModelData/${detailsData?._id}`}
                        className="flex justify-center items-center py-4 rounded-xl border border-slate-200 font-bold text-[10px] uppercase tracking-[0.15em] text-slate-600 bg-white hover:bg-slate-50 hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300"
                      >
                        Edit Specs
                      </Link>
                      <button
                        onClick={() => handleAiModelDelete(detailsData?._id)}
                        className="py-4 rounded-xl border border-red-100 bg-red-50 text-red-600 font-bold text-[10px] uppercase tracking-[0.15em] hover:bg-red-600 hover:text-white transition-all duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ModelCardDetails;
