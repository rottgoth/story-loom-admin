import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = ({ onSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:3000/registrations", {
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      navigate("/dashboard"); // Redirect to dashboard after sign-up
      onSignUp(response.data.token);
    } catch (error) {
      setError("Sign-up failed. Please try again.");
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSignUp}>
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
        <input
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          placeholder="Confirm Password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;