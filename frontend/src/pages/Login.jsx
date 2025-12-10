import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("All fields required");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/login", {
        ...form,
        rememberMe
      });

      const token = res.data.token;

      if (rememberMe) localStorage.setItem("token", token);
      else sessionStorage.setItem("token", token);

      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
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
        aria-label="Login Form"
      >
        <h2 className="text-white text-2xl font-bold mb-5 text-center">
          MelodyVerse 🎵
        </h2>

        {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}

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

        <label className="flex items-center text-gray-300 text-sm mb-3">
          <input
            type="checkbox"
            className="mr-2"
            onChange={() => setRememberMe(!rememberMe)}
          />
          Remember Me
        </label>

        <button
          className="w-full bg-purple-600 text-white p-2 rounded mt-3"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Don't have an account?
          <Link to="/signup" className="text-purple-400 ml-1">Signup</Link>
        </p>

        <p className="text-gray-400 text-sm mt-2 text-center cursor-pointer">
          Forgot Password?
        </p>
      </form>
    </motion.div>
  );
}
