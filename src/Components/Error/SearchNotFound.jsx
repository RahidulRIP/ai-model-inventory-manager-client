import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router";

const SearchNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4 mx-auto">
      <div className="text-gray-300 text-[80px] mb-4">
        <AiOutlineSearch />
      </div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        No Results Found
      </h2>
      <p className="text-gray-500 mb-6">
        We could not find any data matching your search.
      </p>
      <Link
        to={"/"}
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Back To Home
      </Link>
    </div>
  );
};

export default SearchNotFound;
