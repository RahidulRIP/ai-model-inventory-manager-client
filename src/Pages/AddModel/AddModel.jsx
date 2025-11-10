import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../Providers/Context/AuthContext";

const AddModel = () => {
  const axiosPublic = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleAddModel = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const framework = form.framework.value;
    const useCase = form.useCase.value;
    const dataset = form.dataSet.value;
    const description = form.description.value;
    const imageURL = form.imageURL.value;
    const createdBy = form.email.value;
    const createdAt = form.createdAt.value;
    const purchased = form.purChased.value;
    const addModelInfo = {
      name,
      framework,
      useCase,
      dataset,
      description,
      imageURL,
      createdBy,
      createdAt,
      purchased,
    };
    const data = await axiosPublic.post("/addModel", { addModelInfo });
    if (data.data.insertedId) {
      toast.success("AI Model Data Add successfully!");
      navigate("/allModels");
    }
  };

  return (
    <div className="my-[var(--section-gap)] max-w-3xl mx-auto p-8 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Add AI Model
      </h2>

      <form onSubmit={handleAddModel} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none"
              placeholder="name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Framework
            </label>
            <input
              type="text"
              name="framework"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none"
              placeholder="framework"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Use Case
            </label>
            <input
              type="text"
              name="useCase"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none"
              placeholder="use case"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Dataset
            </label>
            <input
              type="text"
              name="dataSet"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none"
              placeholder="dataset"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            rows={5}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none"
            placeholder="Describe the model..."
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Image URL
            </label>
            <input
              type="url"
              name="imageURL"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Created By (email)
            </label>
            <input
              type="email"
              name="email"
              defaultValue={user.email}
              readOnly
              className="w-full rounded-xl border border-gray-300 px-4 py-2 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none"
              placeholder="user@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Created At
            </label>
            <input
              type="date"
              name="createdAt"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 bg-gray-50 text-gray-800 focus:outline-none"
            />
          </div>
        </div>

        <div className="md:w-1/3">
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Purchased (number)
          </label>
          <input
            type="number"
            name="purChased"
            defaultValue={0}
            readOnly
            className="w-full rounded-xl border border-gray-300 px-4 py-2 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none"
            placeholder="number"
          />
        </div>

        <div className="flex items-center justify-center gap-4 pt-4">
          <button
            type="submit"
            className="px-6 py-2.5 w-full rounded-xl bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition duration-200"
          >
            Save
          </button>

          <button
            type="reset"
            className="px-5 py-2.5 w-full rounded-xl border border-gray-300 text-gray-700 font-medium bg-white hover:bg-gray-100 transition duration-200"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddModel;
