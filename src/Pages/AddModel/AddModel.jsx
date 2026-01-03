import React, { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Providers/Context/AuthContext";
import UseAxiosTokenSecure from "../../Hooks/UseAxiosTokenSecure";
import { FiPlus, FiDatabase, FiLayers, FiInfo, FiImage } from "react-icons/fi";
import Container from "../../Components/Container/Container";

const AddModel = () => {
  const axiosPublic = UseAxiosTokenSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddModel = async (e) => {
    e.preventDefault();
    const form = e.target;

    // Professional practice: Consolidate data into an object directly
    const addModelInfo = {
      name: form.name.value,
      framework: form.framework.value,
      useCase: form.useCase.value,
      dataset: form.dataSet.value,
      description: form.description.value,
      image: form.image.value,
      createdBy: user?.email,
      createdAt: new Date().toISOString().split("T")[0], // Auto-generate date for better UX
      purchased: 0,
    };

    try {
      const data = await axiosPublic.post("/addModel", addModelInfo);
      if (data.data.insertedId) {
        toast.success("AI Model Registered Successfully");
        navigate("/dashboard/myModelsPage");
      }
    } catch (error) {
      toast.error("Registration failed. Check system logs.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-2.5 md:p-12">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center md:text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">
              Inference Node Creation
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-2 tracking-tighter">
              REGISTER NEW <span className="text-indigo-600">MODEL.</span>
            </h2>
            <p className="text-slate-500 mt-4 font-medium">
              Deploy your neural architecture to the global marketplace.
            </p>
          </div>

          <form
            onSubmit={handleAddModel}
            className="bg-white border-2 border-slate-900 rounded-[32px] p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(15,23,42,1)]"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-700">
                  <FiPlus className="text-indigo-600" /> Model Identity
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full rounded-2xl border-2 border-slate-100 px-5 py-4 bg-slate-50 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all font-bold text-slate-900"
                  placeholder="e.g. GPT-Neural-X"
                />
              </div>

              {/* Framework Field - Switched to Select for UX */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-700">
                  <FiLayers className="text-indigo-600" /> Framework
                </label>
                <select
                  name="framework"
                  className="w-full rounded-2xl border-2 border-slate-100 px-5 py-4 bg-slate-50 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all font-bold text-slate-900 appearance-none"
                >
                  <option value="TensorFlow">TensorFlow</option>
                  <option value="PyTorch">PyTorch</option>
                  <option value="Keras">Keras</option>
                  <option value="Scikit-Learn">Scikit-Learn</option>
                </select>
              </div>

              {/* Use Case */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-700">
                  <FiInfo className="text-indigo-600" /> Use Case
                </label>
                <input
                  type="text"
                  name="useCase"
                  required
                  className="w-full rounded-2xl border-2 border-slate-100 px-5 py-4 bg-slate-50 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all font-bold text-slate-900"
                  placeholder="e.g. NLP / Computer Vision"
                />
              </div>

              {/* Dataset */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-700">
                  <FiDatabase className="text-indigo-600" /> Training Dataset
                </label>
                <input
                  type="text"
                  name="dataSet"
                  required
                  className="w-full rounded-2xl border-2 border-slate-100 px-5 py-4 bg-slate-50 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all font-bold text-slate-900"
                  placeholder="e.g. ImageNet 2024"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mt-8 space-y-2">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-700">
                Architecture Description
              </label>
              <textarea
                name="description"
                rows={4}
                required
                className="w-full rounded-2xl border-2 border-slate-100 px-5 py-4 bg-slate-50 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all font-bold text-slate-900 resize-none"
                placeholder="Technical specifications and layer details..."
              ></textarea>
            </div>

            {/* Image URL */}
            <div className="mt-8 space-y-2">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-700">
                <FiImage className="text-indigo-600" /> Visual Representative
                (URL)
              </label>
              <input
                type="url"
                name="image"
                required
                className="w-full rounded-2xl border-2 border-slate-100 px-5 py-4 bg-slate-50 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all font-bold text-slate-900"
                placeholder="https://cloud-storage.com/model-preview.jpg"
              />
            </div>

            {/* Hidden Fields Info */}
            <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-300 flex flex-col md:flex-row justify-between gap-4">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Authorized Creator
                </p>
                <p className="text-sm font-bold text-slate-700">
                  {user?.email}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  System Timestamp
                </p>
                <p className="text-sm font-bold text-slate-700">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row items-center gap-4 mt-12">
              <button
                type="submit"
                className="w-full md:w-2/3 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_rgba(79,70,229,1)] hover:bg-indigo-600 hover:shadow-none active:translate-y-1 transition-all"
              >
                Register Architecture
              </button>

              <button
                type="reset"
                className="w-full md:w-1/3 py-5 border-2 border-slate-200 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-50 hover:text-slate-600 transition-all"
              >
                Clear Node
              </button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default AddModel;
