import { useContext, useState } from "react";
import { FaEye, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { FiImage, FiLock, FiMail, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router";

import toast from "react-hot-toast";

import { AuthContext } from "../../Providers/Context/AuthContext";
import GoogleSignIn from "../Shared/GoogleSignIn/GoogleSignIn";

const SignUp = () => {
  const [eyes, setEyes] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { createUser, updateUserProfile, googleSignIn } =
    useContext(AuthContext);

  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;

  const handleCreateUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const userName = form.name.value;
    const userPhoto = form.photo.value;
    const userEmail = form.email.value;
    const userPassword = form.password.value;
    const checkBox = form.terms.checked;
    if (!checkBox) {
      toast.error("Accept Terms & Conditions");
      return;
    }

    if (!passwordRegex.test(userPassword)) {
      setError(
        "Must contain a capital, a small letter, a number, and 6+ chars."
      );
      return;
    }

    setError("");
    // create user
    createUser(userEmail, userPassword)
      .then(() => {
        // console.log(result.user);

        // update profile
        const profileInfo = {
          displayName: userName,
          photoURL: userPhoto,
        };
        updateUserProfile(profileInfo)
          .then(() => {
            toast.success("Account created successfully!");
            form.reset();
            navigate("/");
          })
          .catch((err) => {
            setError(err.message);
          });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  // signin with google
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        // console.log(result.user);
        toast.success("Sign In successful!");
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div>
      <title>SignUp || SwapPals</title>
      <div>
        <div className="flex items-center justify-center my-12 md:my-28 p-3.5">
          <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Register your account
            </h2>
            <form onSubmit={handleCreateUser} className="space-y-4">
              {/* name  */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Your Name
                </label>
                <div className="relative">
                  <input
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className="input input-bordered w-full pl-10 outline-none"
                    required
                  />
                  <FiUser className="absolute top-3.5 left-3 z-1  text-gray-400" />
                </div>
              </div>
              {/* photo  */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Photo URL
                </label>
                <div className="relative">
                  <input
                    name="photo"
                    type="url"
                    placeholder="Enter photo URL"
                    className="input input-bordered w-full pl-10"
                  />
                  <FiImage className="absolute  top-3.5 left-3 z-1  text-gray-400" />
                </div>
              </div>
              {/* email  */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="input input-bordered w-full pl-10"
                    required
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
                </div>
              </div>
              {/* checkBox  */}
              <div className="flex items-center gap-2">
                <input
                  name="terms"
                  type="checkbox"
                  className="checkbox checkbox-sm"
                />
                <h2 className="text-sm text-gray-700">
                  Accept Terms & Conditions
                </h2>
              </div>

              {/* error  */}
              {error && <h2 className="text-red-600">{error}</h2>}

              <button
                type="submit"
                className="btn btn-block bg-black text-white hover:bg-gray-800"
              >
                Register
              </button>
            </form>

            {/* google sign in */}
            <div>
              <GoogleSignIn handleGoogleSignIn={handleGoogleSignIn} />
            </div>

            <h2>
              Have an account? Please{" "}
              <Link
                to={"/signIn"}
                className=" btn-link tex-lg font-medium text-accent"
              >
                Sign In
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
