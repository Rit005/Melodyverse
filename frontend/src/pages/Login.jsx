import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function Login() {
  const navigate = useNavigate();

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Basic validation
  const validateForm = () => {
    if (!emailOrUsername.trim()) {
      setError("Email or Username is required");
      return false;
    }
    if (!password.trim()) {
      setError("Password is required");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await api.post("/login", {
        email: emailOrUsername,
        password
      });

      const token = res.data.token;

      if (rememberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      navigate("/home");

    } catch (err) {
      console.log(err);
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 px-4">
      <form
        className="bg-gray-800 p-7 rounded-xl w-full max-w-sm shadow-lg"
        onSubmit={handleLogin}
      >
        <h2 className="text-white text-3xl font-bold mb-5 text-center">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Email or Username"
          className="w-full mb-3 p-2.5 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEmailOrUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-2 p-2.5 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center text-gray-300 text-sm">
            <input
              type="checkbox"
              className="mr-2"
              onChange={() => setRememberMe(!rememberMe)}
            />
            Remember me
          </label>

          <Link
            to="/forgot-password"
            className="text-blue-400 text-sm hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold p-2 rounded mt-1"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 font-medium">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}
