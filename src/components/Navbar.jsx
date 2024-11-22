import React from "react";
import { useAuth } from "../contexts/AuthProvider";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import './Navbar.css';
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("User signed in with Google");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo"><a href="/">Reddit</a></div>
      {currentUser ? (
        <div className="logout-wrapper">
          <h4>Welcome, {currentUser.displayName || currentUser.email}</h4>
          <div onClick={handleLogout} className="auth-buttons">
            Log Out
          </div>
          <div className="auth-buttons">
            <a href="/profile">Profile</a>
          </div>
        </div>
      ) : (
        <div className="auth-buttons">
          <div onClick={handleGoogleSignIn}>
            Sign In
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;