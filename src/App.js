import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Check if the user is already logged in by checking the token in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => {
    // This method will be called when the user signs in or signs up
    localStorage.setItem("token", token);
    setSuccess("Signed in successfully!");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // This method will be called when the user logs out
    localStorage.removeItem("token");
    setSuccess("Signed out successfully!");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      {success && <p style={{ color: "green" }}>{success}</p>}
      <Routes>
      <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Home />} />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route path="/signin" element={<SignIn onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp onSignUp={handleLogin} />} />
      </Routes>
    </Router>
  );
};

export default App;