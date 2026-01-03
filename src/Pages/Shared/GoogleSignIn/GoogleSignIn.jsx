import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { use } from "react";
import { AuthContext } from "../../../Providers/Context/AuthContext";
import UseAxiosTokenSecure from "../../../Hooks/UseAxiosTokenSecure";

const GoogleSignIn = () => {
  const { googleSignIn } = use(AuthContext);
  const axiosSecure = UseAxiosTokenSecure();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(async (result) => {
        // 1. Extract only basic user info
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
          photo: result.user?.photoURL,
        };

        // 2. Post to DB (Server will inject role: "user" and date)
        try {
          const res = await axiosSecure.post("/users", userInfo);

          if (
            res.data.insertedId ||
            res.data.message === "User already exists"
          ) {
            toast.success("Social login successful!");
            navigate("/");
          }
        } catch (dbErr) {
          console.error("Database Sync Error:", dbErr);
          // Still navigate because the Firebase Auth was successful
          navigate("/");
        }
      })
      .catch((err) => {
        console.error("Google Auth Error:", err);
        toast.error("Google sign-in failed.");
      });
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-3 py-4 bg-white border-2 border-slate-900 rounded-2xl font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:scale-95 group"
      >
        <div className="p-1 bg-white rounded-lg transition-transform group-hover:scale-110">
          <FcGoogle className="text-2xl" />
        </div>
        <span className="text-[11px] text-slate-700">Continue with Google</span>
      </button>
    </div>
  );
};

export default GoogleSignIn;

// import { FcGoogle } from "react-icons/fc";

// const GoogleSignIn = ({ handleGoogleSignIn }) => {
//   return (
//     <div>
//       <button
//         onClick={handleGoogleSignIn}
//         className="btn btn-outline w-full flex items-center justify-center gap-2 text-gray-700 hover:bg-gray-100 border-gray-300 rounded-sm transition-all duration-200"
//       >
//         <FcGoogle className="text-xl" />
//         <span className="font-medium">Continue with Google</span>
//       </button>
//     </div>
//   );
// };

// export default GoogleSignIn;
