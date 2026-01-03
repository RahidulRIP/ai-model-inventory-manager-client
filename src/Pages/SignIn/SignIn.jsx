import { use, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { FiLock, FiMail, FiArrowRight, FiShield } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Providers/Context/AuthContext";
import toast from "react-hot-toast";
import GoogleSignIn from "../Shared/GoogleSignIn/GoogleSignIn";
import { motion } from "framer-motion";

const SignIn = () => {
  const [eyes, setEyes] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { signInUser, googleSignIn } = use(AuthContext);
  const location = useLocation();
  const goTo = location?.state ? location?.state : "/";
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const userEmail = form.email.value;
    const userPassword = form.password.value;

    setError("");
    signInUser(userEmail, userPassword)
      .then(() => {
        toast.success("Identity Verified!");
        form.reset();
        navigate(goTo);
      })
      .catch(() => {
        toast.error("Access Denied: Invalid Credentials");
        setError("Invalid email or password. Please try again.");
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        toast.success("Google Authentication Successful!");
        navigate(goTo);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      <title>SignIn || Ai-Craft</title>

      <div className="w-full max-w-md relative">
        {/* Decorative Background Element */}
        <div className="absolute inset-0 bg-indigo-600 translate-x-3 translate-y-3 rounded-[32px] -z-10 border-2 border-slate-900"></div>

        <div className="bg-white border-4 border-slate-900 rounded-[32px] p-8 md:p-10 shadow-none relative overflow-hidden">
          {/* Top Tag */}
          <div className="absolute top-0 right-0 bg-slate-900 text-white px-6 py-2 rounded-bl-2xl font-black text-[10px] tracking-widest uppercase">
            Secure Node
          </div>

          <header className="mb-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 border-2 border-indigo-100"
            >
              <FiShield size={24} />
            </motion.div>
            <motion.h2
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-3xl font-black text-slate-900 leading-none uppercase tracking-tighter"
            >
              System <span className="text-indigo-600">Login</span>
            </motion.h2>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2 italic">
              Neural Registry Authentication Required
            </p>
          </header>

          <motion.form
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSignIn}
            className="space-y-5"
          >
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                Access Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                <input
                  name="email"
                  type="email"
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@neural.link"
                  className="w-full bg-slate-50 border-2 border-slate-900 p-4 pl-12 rounded-2xl font-bold text-slate-900 placeholder:text-slate-300 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1 flex justify-between">
                Security Key
                <Link
                  to="/resetPassword"
                  state={{ email }}
                  className="text-indigo-600 hover:underline italic"
                >
                  Lost Key?
                </Link>
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                <input
                  name="password"
                  type={eyes ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border-2 border-slate-900 p-4 pl-12 rounded-2xl font-bold text-slate-900 placeholder:text-slate-300 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setEyes(!eyes)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900"
                >
                  {eyes ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 p-3 rounded-xl">
                <p className="text-red-600 text-[10px] font-black uppercase tracking-tight text-center">
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-[4px_4px_0px_0px_rgba(79,70,229,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              Sign in <FiArrowRight />
            </button>
          </motion.form>

          <div className="my-8 flex items-center gap-4">
            <div className="h-[2px] bg-slate-100 flex-1"></div>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
              OR
            </span>
            <div className="h-[2px] bg-slate-100 flex-1"></div>
          </div>

          <div className="space-y-6">
            <GoogleSignIn handleGoogleSignIn={handleGoogleSignIn} />

            <p className="text-center text-[11px] font-bold text-slate-400 uppercase tracking-tight">
              New to the Network?{" "}
              <Link
                to="/signUp"
                className="text-indigo-600 font-black hover:underline"
              >
                Register Instance
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
