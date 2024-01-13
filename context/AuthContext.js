// For user authentication
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, getTutor } from 'advance-tuition-backend';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [tutorData, setTutorData] = useState();

  // These functions should be in the backend...
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const verifyEmail = () => {
    return sendEmailVerification(auth.currentUser);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const isVerified = () => {
    return auth.currentUser.emailVerified;
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Update the displayName for the user
  const updateDisplayName = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };

  const updateTutorDataOnMount = async (uid) => {
    const tutorData = await getTutor(uid);
    setTutorData(tutorData);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) updateTutorDataOnMount(user.uid);
      else setTutorData(null);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    tutorData,
    signup,
    isVerified,
    login,
    logout,
    resetPassword,
    updateDisplayName,
    verifyEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
