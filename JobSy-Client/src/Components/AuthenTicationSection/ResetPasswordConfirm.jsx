import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiClient from "../FetchingApi/api-client"; // Ensure this path is correct
import { Key, Loader2, CheckCircle, XCircle } from 'lucide-react'; // Import icons

const ResetPasswordConfirm = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    // Client-side password match validation before API call
    if (data.password !== data.confirmPassword) {
      setErrorMsg("❌ Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await apiClient.post("/auth/users/reset_password_confirm/", {
        uid,
        token,
        new_password: data.password,
        re_new_password: data.confirmPassword,
      });

      if (response.status === 204 || response.status === 200) {
        setSuccessMsg("✅ Password has been reset successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2500);
      }
    } catch (error) {
      console.error("Reset error:", error.response?.data || error.message);
      let errorMessage = "An unexpected error occurred. Please try again.";

      if (error.response) {
        const data = error.response.data;
        if (data.new_password && Array.isArray(data.new_password) && data.new_password.length > 0) {
          errorMessage = data.new_password[0]; // Display password-specific error
        } else if (data.token) {
          errorMessage = "The reset link is invalid or has expired."; // Specific token error
        } else if (data.uid) {
          errorMessage = "The user ID is invalid."; // Specific uid error
        } else if (data.detail) {
          errorMessage = data.detail; // General detail error
        }
      } else if (error.request) {
        errorMessage = "Network error: Could not connect to the server.";
      }
      setErrorMsg(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const newPasswordValue = watch("password"); // Watch new password for confirm password validation

  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 bg-white"> {/* White background for the page */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 sm:p-8 border border-gray-200"> {/* Card styling */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Set New Password</h2>
          <p className="text-gray-600 text-md">
            Enter your new password below. Make sure it's strong and secure.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* New Password Field */}
          <div className="relative">
            <label htmlFor="password" className="sr-only">New Password</label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Key className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm
                ${errors.password ? "border-red-500" : "border-gray-300 bg-white text-gray-900"}
              `}
              {...register("password", {
                required: "New password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
                // You can add more complex password validation rules here (e.g., regex for special chars, numbers)
              })}
              disabled={loading}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <XCircle className="h-4 w-4 mr-1 inline" />
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Key className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm
                ${errors.confirmPassword ? "border-red-500" : "border-gray-300 bg-white text-gray-900"}
              `}
              {...register("confirmPassword", {
                required: "Please confirm your new password",
                validate: (value) =>
                  value === newPasswordValue || "Passwords do not match", // Direct comparison with watch
              })}
              disabled={loading}
              aria-invalid={errors.confirmPassword ? "true" : "false"}
            />
            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <XCircle className="h-4 w-4 mr-1 inline" />
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-200
              ${loading || errors.password || errors.confirmPassword || !newPasswordValue // Disable if loading, form errors, or password not typed
                ? 'bg-green-400 opacity-70 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
              }`}
            disabled={loading || errors.password || errors.confirmPassword || !newPasswordValue}
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5 mr-2" /> // Spinning loader icon
            ) : (
              <Key className="h-5 w-5 mr-2" /> // Key icon
            )}
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {/* Success Message */}
        {successMsg && (
          <div className="mt-6 flex items-center justify-center p-3 rounded-md bg-green-50 text-green-700 text-sm" role="alert">
            <CheckCircle className="h-5 w-5 mr-2" />
            <p>{successMsg}</p>
          </div>
        )}
        {/* Error Message */}
        {errorMsg && (
          <div className="mt-6 flex items-center justify-center p-3 rounded-md bg-red-50 text-red-700 text-sm" role="alert">
            <XCircle className="h-5 w-5 mr-2" />
            <p>{errorMsg}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;