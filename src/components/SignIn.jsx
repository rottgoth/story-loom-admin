import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:3000/sessions", {
        email,
        password
      });
      localStorage.setItem("token", response.data.token);
      onLogin(response.data.token);
      setError("");
      navigate("/");
    } catch (err) {
      setError("Failed to sign in. Please check your credentials.");
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;