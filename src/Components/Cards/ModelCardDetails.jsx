import { useLoaderData } from "react-router";
import {
  FaCalendarAlt,
  FaUser,
  FaDatabase,
  FaShoppingCart,
  FaRobot,
} from "react-icons/fa";
import Container from "../Container/Container";
import { useContext } from "react";
import { AuthContext } from "../../Providers/Context/AuthContext";

const ModelCardDetails = () => {
  const { user } = useContext(AuthContext);
  const detailsData = useLoaderData();
  const {
    image,
    framework,
    name,
    description,
    useCase,
    createdAt,
    createdBy,
    dataset,
    purchased,
  } = detailsData;

  return (
    <Container>
      <div className="my-[var(--section-gap)] flex justify-center">
        <div className="relative w-full max-w-3xl rounded-3xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-[2px] shadow-xl hover:shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
          <div className="bg-white rounded-3xl p-6 md:p-8">
            <div className="relative  rounded-2xl mb-6">
              <img
                src={image}
                alt={name}
                className="w-full h-64 object-cover rounded-2xl transition-transform duration-700 hover:scale-105"
              />
              <span className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                {framework}
              </span>
            </div>

            <h2 className="text-3xl font-extrabold text-gray-800 mb-3 flex items-center gap-2">
              <FaRobot className="text-indigo-600" />
              {name}
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">{description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                <FaCalendarAlt className="text-pink-500 text-lg" />
                <span>
                  <span className="font-semibold">Created At:</span> {createdAt}
                </span>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                <FaUser className="text-indigo-500 text-lg" />
                <span>
                  <span className="font-semibold">Created By:</span> {createdBy}
                </span>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                <FaDatabase className="text-orange-500 text-lg" />
                <span>
                  <span className="font-semibold">Dataset:</span> {dataset}
                </span>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                <FaShoppingCart className="text-pink-500 text-lg" />
                <span>
                  <span className="font-semibold">Purchased:</span> {purchased}
                </span>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-4 py-3 rounded-xl shadow-md">
              <span className="font-semibold">Use Case:</span> {useCase}
            </div>

            {user?.email == createdBy ? (
              <div className="grid grid-cols-2 gap-10  mt-8">
                <button className="w-full btn btn-dash transform hover:scale-105 transition-transform duration-700 rounded-full px-6 text-lg">
                  Edit
                </button>
                <button className="w-full btn btn-dash transform hover:scale-105 transition-transform duration-700 rounded-full px-6 text-lg">
                  Delete
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ModelCardDetails;
