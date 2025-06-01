import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import useAuthContext from "../Hooks/UseAuthContext";
import ErroAlert from "../ErorAlert/Eror";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { loginUser, errorMsg } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    setAuthError(null);

    const success = await loginUser(data);
    setLoading(false);

    if (success) {
      navigate("/dashboard");
    } else {
      setAuthError(errorMsg || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white shadow-lg border rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to JobSy</h2>

        {authError && <ErroAlert error={authError} />}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email format",
                },
              })}
              className={`mt-1 w-full px-4 py-2 border rounded-md focus:outline-none shadow-sm text-black ${
                errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`mt-1 w-full px-4 py-2 border rounded-md focus:outline-none shadow-sm text-black ${
                errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"
              }`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white mr-2" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4zm2 5.3A8 8 0 014 12H0c0 3 1.1 5.8 3 7.9l3-2.6z"
                />
              </svg>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 text-center text-sm text-gray-600 space-y-2">
          <p>
            <Link to="/forgot" className="text-green-600 hover:underline">
              Forgot Password?
            </Link>
          </p>
          <p>
            Don’t have an account?{" "}
            <Link to="/signup" className="text-green-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
