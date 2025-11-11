import { Link } from "react-router";

const ModelCard = ({ data, allModelsPath }) => {
  const { image, framework, name, description, useCase, _id } = data;

  return (
    <div className="relative group  bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-[2px] shadow-lg hover:shadow-2xl transition duration-1000 ease-out hover:scale-105">
      <div className="card bg-base-100 rounded-3xl overflow-hidden h-full">
        <figure className="relative h-3/4 rounded-lg overflow-hidden p-2.5">
          <img
            src={image}
            alt="GPT-4 Logo"
            className="object-contain size-full rounded-lg  transition-transform duration-1500 group-hover:scale-112"
          />
          <span className="absolute top-3 left-3 badge badge-primary text-xs font-semibold shadow-md">
            {framework}
          </span>
        </figure>

        <div className="card-body p-5">
          <h2 className="card-title text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
            {name}
          </h2>
          <p className="text-sm text-gray-600 mt-1 line-clamp-3">
            {description}
          </p>
          {allModelsPath && (
            <p className="text-sm text-gray-600 mt-1 line-clamp-3">
              <span className="text-lg font-semibold text-black">
                Use_Case :
              </span>{" "}
              {useCase}
            </p>
          )}
          <div className="card-actions justify-end mt-5">
            <Link
              to={`/modelCardDetails/${_id}`}
              className="btn btn-sm bg-gradient-to-r from-indigo-500 to-pink-500 text-white border-none hover:from-pink-500 hover:to-indigo-500 hover:scale-105 transition-transform duration-1000"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelCard;
