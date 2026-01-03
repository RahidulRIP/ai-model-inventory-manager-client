import { useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { AuthContext } from "../Context/AuthContext";
import { auth } from "../../Firebase/firebase.config";

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (profileInfo) => {
    return updateProfile(auth.currentUser, profileInfo);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signUserOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const forgetLoginPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const valueContext = {
    user,
    setUser,
    loading,
    setLoading,
    error,
    setError,
    createUser,
    signInUser,
    updateUserProfile,
    signUserOut,
    googleSignIn,
    forgetLoginPassword,
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  return <AuthContext value={valueContext}>{children}</AuthContext>;
};

export default AuthProviders;
