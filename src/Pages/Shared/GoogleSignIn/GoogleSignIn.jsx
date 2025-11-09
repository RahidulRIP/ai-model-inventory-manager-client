import { FcGoogle } from "react-icons/fc";

const GoogleSignIn = ({ handleGoogleSignIn }) => {
  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        className="btn btn-outline w-full flex items-center justify-center gap-2 text-gray-700 hover:bg-gray-100 border-gray-300 rounded-sm transition-all duration-200"
      >
        <FcGoogle className="text-xl" />
        <span className="font-medium">Continue with Google</span>
      </button>
    </div>
  );
};

export default GoogleSignIn;
