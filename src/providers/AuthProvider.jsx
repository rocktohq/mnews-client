import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  // SignIn with Google
  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };
  // SignUp with Email and Password
  const signUpUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Update Profile
  const updateUserProfile = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // SignIn with Email and Password
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign Out User
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // On UserState Change
  useEffect(() => {
    setLoading(true);
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };

      // * If user is loggedIn then create a new token
      if (currentUser) {
        axiosPublic
          .post("/jwt", loggedUser, {
            withCredentials: true,
          })
          .then(() => {
            setLoading(false);
          });
      } else {
        axiosPublic
          .post("/logout", loggedUser, {
            withCredentials: true,
          })
          .then((err) => {
            console.log(err.data);
            setLoading(false);
          });
      }

      return () => {
        unSubscribe();
      };
    });
  }, [axiosPublic, user?.email]);

  // Auth Info
  const authInfo = {
    user,
    loading,
    googleSignIn,
    signUpUser,
    updateUserProfile,
    signInUser,
    signOutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node,
};
