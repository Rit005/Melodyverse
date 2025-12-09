import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: ""
  });

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const validateForm = () => {
    if (!form.username.trim()) return setError("Username is required");
    if (!form.email.trim()) return setError("Email is required");
    if (!validateEmail(form.email)) return setError("Invalid email format");
    if (!form.password.trim()) return setError("Password is required");
    if (form.password.length < 6) return setError("Password must be at least 6 characters");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match");
    if (!acceptTerms) return setError("Please agree to the Terms & Conditions");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      await api.post("/signup", form);

      console.log(`Simulated welcome email sent to ${form.email}`);

      setSuccessMessage("Signup Successful! Redirecting to login...");
      setTimeout(() => navigate("/"), 2000);

    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4">
      <form
        className="bg-gray-800/80 backdrop-blur-md p-8 rounded-xl w-full max-w-sm shadow-2xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-white text-3xl font-bold mb-6 text-center">
          Create MelodyVerse Account 🎵
        </h2>

        {successMessage && <p className="text-green-400 text-sm text-center mb-3">{successMessage}</p>}
        {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}

        <input name="fullName" placeholder="Full Name (Optional)" className="w-full mb-3 p-2.5 rounded bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500" onChange={handleChange} />
        <input name="username" placeholder="Username *" className="w-full mb-3 p-2.5 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-purple-500" onChange={handleChange} />
        <input name="email" type="email" placeholder="Email *" className="w-full mb-3 p-2.5 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-purple-500" onChange={handleChange} />
        <input name="profilePic" placeholder="Profile Picture URL (Optional)" className="w-full mb-3 p-2.5 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-purple-500" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password *" className="w-full mb-3 p-2.5 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-purple-500" onChange={handleChange} />
        <input name="confirmPassword" type="password" placeholder="Confirm Password *" className="w-full mb-4 p-2.5 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-purple-500" onChange={handleChange} />

        <label className="flex items-center text-gray-300 text-sm mb-4">
          <input type="checkbox" className="mr-2 accent-purple-600" onChange={() => setAcceptTerms(!acceptTerms)} />
          I agree to the <Link to="/terms" className="text-purple-400 underline">Terms & Conditions</Link>
        </label>

        <button className="w-full bg-purple-600 hover:bg-purple-700 transition text-white font-semibold p-2.5 rounded" disabled={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Already have an account? <Link to="/" className="text-purple-400 font-medium hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
}
