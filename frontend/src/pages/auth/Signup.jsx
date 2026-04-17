import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Signup = () => {
  const { navigate, api } = useContext(AppContext);

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student", // default role
    image: null,
  });

  // Cleanup preview (avoid memory leak)
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // Handle text input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({ ...formData, image: file });
    setPreview(URL.createObjectURL(file));
  };

  // Validate form
  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!formData.password) return "Password is required";
    if (formData.password.length < 6)
      return "Password must be at least 6 characters";
    if (!formData.role) return "Please select a role";
    return null;
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMsg = validateForm();
    if (errorMsg) return toast.error(errorMsg);

    try {
      setLoading(true);

      const formPayload = new FormData();

      // Append only non-empty values
      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          formPayload.append(key, formData[key]);
        }
      });

      const { data } = await api.post("/auth/signup", formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-gray-500 max-w-[350px] mx-4 md:p-6 p-4 rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Signup Now
        </h2>

        {/* Image Preview */}
        {preview && (
          <div className="mb-3 flex justify-center">
            <img
              src={preview}
              alt="preview"
              className="w-24 h-24 rounded-full border shadow object-cover"
            />
          </div>
        )}

        {/* File Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 mb-3 cursor-pointer"
        />

        {/* Name */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="w-full border my-2 rounded-full py-2.5 px-4"
          autoComplete="name"
        />

        {/* Role */}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border my-2 rounded-full py-2.5 px-4"
        >
          <option value="student">Student</option>
          <option value="employer">Employer</option>
        </select>

        {/* Email */}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full border my-2 rounded-full py-2.5 px-4"
          autoComplete="email"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full border my-2 rounded-full py-2.5 px-4"
          autoComplete="new-password"
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-3 bg-primary py-2.5 rounded-full text-white active:scale-95 disabled:opacity-50"
        >
          {loading ? "Signing up..." : "Signup"}
        </button>

        {/* Login Link */}
        <p className="text-center mt-4">
          Already have an account?
          <Link to="/login" className="text-blue-500 underline ml-1">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;