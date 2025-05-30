import { useForm } from "react-hook-form";
import { useState } from "react";
import apiClient from "../FetchingApi/api-client"; // Ensure this path is correct
import { Mail, Loader2, CheckCircle, XCircle } from 'lucide-react'; // Import icons from lucide-react

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailValue = watch("email"); // Watch email input value for button disable logic

  const onSubmit = async (data) => {
    // Clear previous messages
    setError("");
    setMessage("");
    setLoading(true);

    try {
      console.log("Sending request with email:", data.email);

      const response = await apiClient.post("/auth/users/reset_password/", {
        email: data.email,
      });

      console.log("Response from API:", response);

      // It's generally better to give a generic message for security reasons,
      // even if the email doesn't exist, to prevent enumeration attacks.
      setMessage(
        "If an account with that email exists, we've sent a password reset link to your inbox. Please check your spam folder if you don't see it."
      );
    } catch (err) {
      console.error("Error caught in catch block:", err);
      console.error("Error response data:", err.response?.data);

      // Djoser's /reset_password/ endpoint often returns 204 No Content
      // even if the email doesn't exist, again, for security.
      // So, catching errors here might be for network issues or malformed requests.
      if (err.response) {
        // If there's an actual error response body, try to parse it
        const data = err.response.data;
        if (data.email && Array.isArray(data.email) && data.email.length > 0) {
          setError(data.email[0]); // Display the first email-specific error
        } else if (data.detail) {
          setError(data.detail); // Display general detail errors
        } else if (err.response.status === 400) {
          setError("Invalid request. Please check your email and try again.");
        } else {
          setError("An unexpected error occurred. Please try again later.");
        }
      } else {
        setError("Network error: Could not connect to the server. Please check your internet connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 bg-white"> {/* Changed background to white */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 sm:p-8 border border-gray-200"> {/* Removed dark mode classes */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Forgot your password?</h2> {/* Removed dark:text-white */}
          <p className="text-gray-600 text-md"> {/* Removed dark:text-gray-400 */}
            No worries! Enter your email address below and we'll send you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <label htmlFor="email" className="sr-only">Email address</label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm
                ${errors.email ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 bg-white text-gray-900"} {/* Removed dark mode classes */}
              `}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              disabled={loading}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <XCircle className="h-4 w-4 mr-1 inline" />
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-200
              ${(!emailValue || errors.email || loading)
                ? 'bg-green-400 opacity-70 cursor-not-allowed' // Removed dark:bg-green-600
                : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500' // Removed dark mode classes
              }`}
            disabled={!emailValue || errors.email || loading}
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5 mr-2" /> // Spinning loader icon
            ) : (
              <Mail className="h-5 w-5 mr-2" /> // Mail icon
            )}
            {loading ? "Sending link..." : "Send Reset Link"}
          </button>
        </form>

        {message && (
          <div className="mt-6 flex items-center justify-center p-3 rounded-md bg-green-50 text-green-700 text-sm" role="alert"> {/* Removed dark mode classes */}
            <CheckCircle className="h-5 w-5 mr-2" />
            <p>{message}</p>
          </div>
        )}
        {error && (
          <div className="mt-6 flex items-center justify-center p-3 rounded-md bg-red-50 text-red-700 text-sm" role="alert"> {/* Removed dark mode classes */}
            <XCircle className="h-5 w-5 mr-2" />
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;