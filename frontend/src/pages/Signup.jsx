import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { motion } from "framer-motion";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validate = () => {
    if (!form.username || !form.email || !form.password)
      return setError("All fields required");

    if (form.password !== form.confirmPassword)
      return setError("Passwords do not match");

    if (!acceptTerms)
      return setError("Agree to terms first");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await api.post("/signup", form);

      setSuccess("Signup Successful! Check console for email verification link.");

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center h-screen bg-gray-900 px-4"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-7 rounded-xl w-full max-w-sm shadow-xl"
        aria-label="Signup Form"
      >
        <h2 className="text-white text-2xl font-bold mb-5 text-center">
          Create Account 🎵
        </h2>

        {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
        {success && <p className="text-green-400 text-sm mb-2 text-center">{success}</p>}

        <input
          name="username"
          placeholder="Username"
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
          onChange={handleChange}
          aria-label="Username"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
          onChange={handleChange}
          aria-label="Email"
        />

        <div className="relative">
          <input
            name="password"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
            onChange={handleChange}
            aria-label="Password"
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="text-sm text-blue-400 absolute right-3 top-2 cursor-pointer"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        <input
          name="confirmPassword"
          placeholder="Confirm Password"
          type={showPassword ? "text" : "password"}
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
          onChange={handleChange}
          aria-label="Confirm Password"
        />

        <label className="flex items-center text-gray-300 text-sm mb-3">
          <input
            type="checkbox"
            className="mr-2"
            checked={acceptTerms}
            onChange={() => setAcceptTerms(!acceptTerms)}
          />
          I agree to Terms & Conditions
        </label>

        <button
          className="w-full bg-purple-600 text-white p-2 rounded mt-3"
          disabled={false}
        >
          Create Account
        </button>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Already have an account?
          <Link to="/" className="text-purple-400 ml-1">Login</Link>
        </p>
      </form>
    </motion.div>
  );
}
