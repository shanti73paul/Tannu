import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const { navigate, setUser, setAdmin, api } = useContext(AppContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/auth/login", formData); // ✅ proxy URL

      if (data.success) {
        const user = data.user;

        if (user.role === "employer") {
          setUser(user);
          navigate("/");
        } else if (user.role === "student") {
          setUser(user);
          navigate("/");
        } else {
          setAdmin(true);
          navigate("/admin");
        }

        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-gray-500 max-w-[350px] mx-4 md:p-6 p-4 rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Login Now
        </h2>

        {/* Email */}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full border my-3 rounded-full py-2.5 px-4"
          autoComplete="email"
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full border mt-1 rounded-full py-2.5 px-4"
          autoComplete="current-password"
          required
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full mt-4 bg-primary py-2.5 rounded-full text-white active:scale-95"
        >
          Log in
        </button>

        {/* Signup Link */}
        <p className="text-center mt-4">
          Don’t have an account?
          <Link to="/signup" className="text-blue-500 underline ml-1">
            Signup Now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;