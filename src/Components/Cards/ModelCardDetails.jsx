import { Link, useNavigate, useParams } from "react-router";
import {
  FaCalendarAlt,
  FaUser,
  FaDatabase,
  FaShoppingCart,
  FaRobot,
} from "react-icons/fa";
import Container from "../Container/Container";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/Context/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Loader from "../Shared/Loader";
import Swal from "sweetalert2";

const ModelCardDetails = () => {
  const [detailsData, setDetailsData] = useState({});
  const [leading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axiosPublic.get(`/models/${id}`).then((res) => setDetailsData(res?.data));

    setLoading(false);
  }, [axiosPublic, id, refetch]);

  const handlePurchase = async () => {
    const purchasedAiModelData = {
      aiModel_Id: detailsData?._id,
      name: detailsData?.name,
      framework: detailsData?.framework,
      useCase: detailsData?.useCase,
      createdBy: detailsData?.createdBy,
      purchased_By: user?.email,
      image: detailsData?.image,
    };

    const data = await axiosPublic.post(
      `/purchased/${detailsData?._id}`,
      purchasedAiModelData
    );
    if (data.data.insertedId) {
      setRefetch(!refetch);
      toast.success("Purchased Successful");
    }
  };

  const handleAiModelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/deleteModel/${id}`).then((res) => {
          if (res?.data.deletedCount > 0) {
            Swal.fire({
              icon: "success",
              title: "Your Model has been deleted",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/allModels");
          }
        });
      }
    });
  };

  if (leading) {
    return <Loader />;
  }

  return (
    <Container>
      <div className="my-[var(--section-gap)] flex justify-center">
        <div className="relative w-full max-w-3xl rounded-3xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-[2px] shadow-xl hover:shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
          <div className="bg-white rounded-3xl p-6 md:p-8">
            <div className="relative  rounded-2xl mb-6">
              <img
                src={detailsData?.image}
                alt={name}
                className="w-full h-64 object-cover rounded-2xl transition-transform duration-700 hover:scale-105"
              />
              <span className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                {detailsData?.framework}
              </span>
            </div>

            <h2 className="text-3xl font-extrabold text-gray-800 mb-3 flex items-center gap-2">
              <FaRobot className="text-indigo-600" />
              {detailsData?.name}
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              {detailsData?.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                <FaCalendarAlt className="text-pink-500 text-lg" />
                <span>
                  <span className="font-semibold">Created At:</span>{" "}
                  {detailsData?.createdAt}
                </span>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                <FaUser className="text-indigo-500 text-lg" />
                <span>
                  <span className="font-semibold">Created By:</span>{" "}
                  {detailsData?.createdBy}
                </span>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                <FaDatabase className="text-orange-500 text-lg" />
                <span>
                  <span className="font-semibold">Dataset:</span>{" "}
                  {detailsData?.dataset}
                </span>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                <FaShoppingCart className="text-pink-500 text-lg" />
                <span>
                  <span className="font-semibold">Purchased:</span>{" "}
                  {detailsData?.purchased}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl mt-3.5">
              <span className="font-semibold">Use Case:</span>{" "}
              {detailsData?.useCase}
            </div>

            {user?.email === detailsData?.createdBy ? (
              <button
                onClick={handlePurchase}
                className="mt-6 btn  w-full text-lg rounded-xl shadow-md"
                disabled={true}
              >
                Purchased Model
              </button>
            ) : (
              <button
                onClick={handlePurchase}
                className="mt-6 btn my-button w-full text-lg rounded-xl shadow-md cursor-pointer"
              >
                Purchased Model
              </button>
            )}

            {user?.email === detailsData?.createdBy && (
              <div className="grid grid-cols-2 gap-10  mt-8">
                <Link
                  to={`/updateAiModelData/${detailsData?._id}`}
                  className="w-full btn btn-dash transform hover:scale-105 transition-transform duration-700 rounded-full px-6 text-lg"
                >
                  Edit
                </Link>
                <Link
                  onClick={() => handleAiModelDelete(detailsData?._id)}
                  className="w-full btn btn-dash transform hover:scale-105 transition-transform duration-700 rounded-full px-6 text-lg"
                >
                  Delete
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ModelCardDetails;
