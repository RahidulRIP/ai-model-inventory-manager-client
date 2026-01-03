import { useContext, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { FiImage, FiLock, FiMail, FiUser, FiCpu } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../../Providers/Context/AuthContext";
import GoogleSignIn from "../Shared/GoogleSignIn/GoogleSignIn";
import UseAxiosTokenSecure from "../../Hooks/UseAxiosTokenSecure";

const SignUp = () => {
  const [eyes, setEyes] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const axiosSecure = UseAxiosTokenSecure();

  const { createUser, updateUserProfile, googleSignIn } =
    useContext(AuthContext);

  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const form = e.target;
    const userName = form.name.value;
    const userPhoto = form.photo.value;
    const userEmail = form.email.value;
    const userPassword = form.password.value;
    const checkBox = form.terms.checked;

    if (!checkBox) {
      toast.error("Please accept Terms & Conditions");
      return;
    }

    if (!passwordRegex.test(userPassword)) {
      const passMsg = "Password needs: 1 Upper, 1 Lower, 1 Number, 6+ Chars";
      setError(passMsg);
      toast.error(passMsg);
      return;
    }

    setError("");
    const loadingToast = toast.loading("Initializing your AI-Craft account...");

    try {
      // 1. Create User in Firebase
      await createUser(userEmail, userPassword);

      // 2. Update Firebase Display Name & Photo
      await updateUserProfile({
        displayName: userName,
        photoURL: userPhoto,
      });

      // 3. Post to MongoDB (Server will inject 'role' and 'createdAt')
      const userInfo = {
        name: userName,
        email: userEmail,
        photo: userPhoto,
      };

      const dbRes = await axiosSecure.post("/users", userInfo);

      if (
        dbRes.data.insertedId ||
        dbRes.data.message === "User already exists"
      ) {
        toast.success("Welcome to the Craft!", { id: loadingToast });
        form.reset();
        navigate("/");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      const errorMessage = err.message.includes("email-already-in-use")
        ? "Email is already registered"
        : "Failed to create account";
      setError(errorMessage);
      toast.error(errorMessage, { id: loadingToast });
    }
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(async (result) => {
        // Sync Google User to DB (Server handles role/date)
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
          photo: result.user?.photoURL,
        };

        await axiosSecure.post("/users", userInfo);
        toast.success("Login Successful!");
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
        toast.error("Google Authentication Failed");
      });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6 py-20">
      <title>SignUp || Ai-Craft</title>

      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-slate-900 text-white rounded-2xl rotate-6 mb-4 shadow-[4px_4px_0px_0px_rgba(99,102,241,1)]">
            <FiCpu size={28} className="animate-pulse" />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-gray-600">
            Create Profile
          </h1>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-2">
            AI-Craft System Access
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white border-2 border-slate-900 p-8 rounded-[32px] shadow-[12px_12px_0px_0px_rgba(15,23,42,1)]">
          <form onSubmit={handleCreateUser} className="space-y-5">
            {/* Name Field */}
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                Developer Name
              </label>
              <div className="relative mt-1">
                <input
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-900 rounded-2xl focus:outline-none focus:ring-4 ring-indigo-500/10 font-bold pl-12"
                  required
                />
                <FiUser
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
              </div>
            </div>

            {/* Photo Field */}
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                Avatar Source URL
              </label>
              <div className="relative mt-1">
                <input
                  name="photo"
                  type="url"
                  placeholder="https://..."
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-900 rounded-2xl focus:outline-none focus:ring-4 ring-indigo-500/10 font-bold pl-12"
                  required
                />
                <FiImage
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                System Email
              </label>
              <div className="relative mt-1">
                <input
                  name="email"
                  type="email"
                  placeholder="dev@aicraft.com"
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-900 rounded-2xl focus:outline-none focus:ring-4 ring-indigo-500/10 font-bold pl-12"
                  required
                />
                <FiMail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                Security Key
              </label>
              <div className="relative mt-1">
                <input
                  name="password"
                  type={eyes ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-900 rounded-2xl focus:outline-none focus:ring-4 ring-indigo-500/10 font-bold pl-12"
                  required
                />
                <FiLock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <button
                  type="button"
                  onClick={() => setEyes(!eyes)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600"
                >
                  {eyes ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center gap-3 px-2">
              <input
                name="terms"
                type="checkbox"
                className="w-5 h-5 border-2 border-slate-900 rounded bg-white checked:bg-indigo-600 transition-all cursor-pointer"
              />
              <span className="text-xs font-bold text-slate-600">
                I accept the Craft Protocols
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-slate-900 text-white border-2 border-slate-900 rounded-2xl font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(99,102,241,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all active:scale-95"
            >
              Register Account
            </button>
          </form>

          {/* Social Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t-2 border-slate-100"></span>
            </div>
            <div className="relative flex justify-center text-[9px] font-black uppercase">
              <span className="bg-white px-3 text-slate-400 tracking-tighter">
                Social Access Protocol
              </span>
            </div>
          </div>

          <GoogleSignIn handleGoogleSignIn={handleGoogleSignIn} />

          <p className="mt-8 text-center text-xs font-bold text-slate-500 uppercase tracking-tighter">
            Already registered?{" "}
            <Link
              to="/signIn"
              className="text-indigo-600 hover:underline decoration-2 underline-offset-4"
            >
              Sign In
            </Link>
          </p>
        </div>
        {error && (
          <p className="mt-4 text-[10px] font-black text-center text-red-500 uppercase">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUp;

// import { useContext, useState } from "react";
// import { FaEye, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
// import { FiImage, FiLock, FiMail, FiUser } from "react-icons/fi";
// import { Link, useNavigate } from "react-router";

// import toast from "react-hot-toast";

// import { AuthContext } from "../../Providers/Context/AuthContext";
// import GoogleSignIn from "../Shared/GoogleSignIn/GoogleSignIn";

// const SignUp = () => {
//   const [eyes, setEyes] = useState(false);
//   const navigate = useNavigate();
//   const [error, setError] = useState("");

//   const { createUser, updateUserProfile, googleSignIn } =
//     useContext(AuthContext);

//   const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;

//   const handleCreateUser = (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const userName = form.name.value;
//     const userPhoto = form.photo.value;
//     const userEmail = form.email.value;
//     const userPassword = form.password.value;
//     const checkBox = form.terms.checked;
//     if (!checkBox) {
//       toast.error("Accept Terms & Conditions");
//       return;
//     }

//     if (!passwordRegex.test(userPassword)) {
//       setError(
//         "Must contain a capital, a small letter, a number, and 6+ chars."
//       );
//       toast.error(
//         "Must contain a capital, a small letter, a number, and 6+ chars."
//       );
//       return;
//     }

//     setError("");
//     // create user
//     createUser(userEmail, userPassword)
//       .then(() => {
//         // update profile
//         const profileInfo = {
//           displayName: userName,
//           photoURL: userPhoto,
//         };
//         updateUserProfile(profileInfo)
//           .then(() => {
//             toast.success("Account created successfully!");
//             form.reset();
//             navigate("/");
//           })
//           .catch((err) => {
//             setError(err.message);
//           });
//       })
//       .catch((err) => {
//         toast.error("Email Already In Use");
//         setError(err.message);
//       });
//   };

//   // signin with google
//   const handleGoogleSignIn = () => {
//     googleSignIn()
//       .then(() => {
//         toast.success("Sign In successful!");
//         navigate("/");
//       })
//       .catch((err) => {
//         setError(err.message);
//       });
//   };

//   return (
//     <div>
//       <title>SignUp || Ai-Craft</title>
//       <div>
//         <div className="flex items-center justify-center my-12 md:my-28 p-3.5">
//           <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
//             <h2 className="text-2xl font-bold text-center text-gray-800">
//               Register your account
//             </h2>
//             <form onSubmit={handleCreateUser} className="space-y-4">
//               {/* name  */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">
//                   Your Name
//                 </label>
//                 <div className="relative">
//                   <input
//                     name="name"
//                     type="text"
//                     placeholder="Enter your name"
//                     className="input input-bordered w-full pl-10 outline-none"
//                     required
//                   />
//                   <FiUser className="absolute top-3.5 left-3 z-1  text-gray-400" />
//                 </div>
//               </div>
//               {/* photo  */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">
//                   Photo URL
//                 </label>
//                 <div className="relative">
//                   <input
//                     name="photo"
//                     type="url"
//                     placeholder="Enter photo URL"
//                     className="input input-bordered w-full pl-10"
//                   />
//                   <FiImage className="absolute  top-3.5 left-3 z-1  text-gray-400" />
//                 </div>
//               </div>
//               {/* email  */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">
//                   Email
//                 </label>
//                 <div className="relative">
//                   <input
//                     name="email"
//                     type="email"
//                     placeholder="Enter your email address"
//                     className="input input-bordered w-full pl-10"
//                     required
//                   />
//                   <FiMail className="absolute top-3.5 left-3 z-1  text-gray-400" />
//                 </div>
//               </div>
//               {/* password  */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     name="password"
//                     type={eyes ? "text" : "password"}
//                     placeholder="Enter your password"
//                     className="input input-bordered w-full pl-10"
//                     required
//                   />
//                   <FiLock className="absolute top-3.5 left-3 z-1  text-gray-400" />
//                   <button type="button" onClick={() => setEyes(!eyes)}>
//                     {eyes ? (
//                       <FaRegEye className="absolute right-6 top-3 z-1" />
//                     ) : (
//                       <FaRegEyeSlash className="absolute right-6 top-3 z-1" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//               {/* checkBox  */}
//               <div className="flex items-center gap-2">
//                 <input
//                   name="terms"
//                   type="checkbox"
//                   className="checkbox checkbox-sm"
//                 />
//                 <h2 className="text-sm text-gray-700">
//                   Accept Terms & Conditions
//                 </h2>
//               </div>

//               {/* error  */}
//               {error && <h2 className="text-red-600">{error}</h2>}

//               <button
//                 type="submit"
//                 className="btn btn-block bg-black text-white hover:bg-gray-800"
//               >
//                 Register
//               </button>
//             </form>

//             {/* google sign in */}
//             <div>
//               <GoogleSignIn handleGoogleSignIn={handleGoogleSignIn} />
//             </div>

//             <h2>
//               Have an account? Please{" "}
//               <Link
//                 to={"/signIn"}
//                 className=" btn-link tex-lg font-medium text-accent"
//               >
//                 Sign In
//               </Link>
//             </h2>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
