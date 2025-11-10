import { use, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { FiLock, FiMail } from "react-icons/fi";
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
    // create user
    signInUser(userEmail, userPassword)
      .then(() => {
        // console.log(result.user);
        toast.success("Sign In successful!");
        form.reset();
        navigate(goTo);
      })
      .catch(() => {
        toast.error("Invalid Email Or Password");
        setError("Invalid email or password. Please try again.");
      });
  };

  // signin with google
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        toast.success("Sign In successful by google!");
        navigate(goTo);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div>
      <title>SignIn || SwapPals</title>
      <div className=" flex items-center justify-center my-8 md:my-20 p-3.5">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
          <motion.h2
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-xl md:text-3xl font-bold text-center text-gray-800"
          >
            Login to AI Model Inventory Manager
          </motion.h2>
          <motion.form
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            onSubmit={handleSignIn}
            className="space-y-4"
          >
            {/* email  */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  name="email"
                  type="email"
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="input input-bordered w-full pl-10"
                />
                <FiMail className="absolute top-3.5 left-3 z-1  text-gray-400" />
              </div>
            </div>
            {/* password  */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={eyes ? "text" : "password"}
                  placeholder="Enter your password"
                  className="input input-bordered w-full pl-10"
                  required
                />
                <FiLock className="absolute top-3.5 left-3 z-1  text-gray-400" />
                <button type="button" onClick={() => setEyes(!eyes)}>
                  {eyes ? (
                    <FaRegEye className="absolute right-6 top-3 z-1" />
                  ) : (
                    <FaRegEyeSlash className="absolute right-6 top-3 z-1" />
                  )}
                </button>
                <div>
                  <Link
                    to={"/resetPassword"}
                    state={{ email }}
                    className="link link-hover"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
            </div>
            {/* error  */}
            {error && <h2 className="text-red-600">{error}</h2>}
            <button
              type="submit"
              className="btn btn-block bg-black text-white hover:bg-gray-800"
            >
              Login
            </button>
          </motion.form>
          {/* google sign in */}
          <div>
            <GoogleSignIn handleGoogleSignIn={handleGoogleSignIn} />
          </div>
          <h2>
            Have an account? Please{" "}
            <Link
              to={"/signUp"}
              className=" btn-link tex-lg font-medium text-accent"
            >
              Sign Up
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
