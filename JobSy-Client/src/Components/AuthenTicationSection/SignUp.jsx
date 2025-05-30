import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../FetchingApi/api-client';
import authapiclient from "../FetchingApi/auth-api-client"


export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [registeredEmailForResend, setRegisteredEmailForResend] = useState('');
  const [registrationCompleted, setRegistrationCompleted] = useState(false); // New state variable


  const _navigate = useNavigate(); // Renamed to _navigate to avoid conflict with navigate in comments

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setRegisteredEmailForResend('');
    setRegistrationCompleted(false); // Reset this state on new submission attempt

    if (!email || !password || !confirmPassword || !firstName || !lastName || !phoneNumber || !address) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    const payload = {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      address,
    };

    try {
      // Register the user
      await apiClient.post('/auth/users/', payload);

      // If registration is successful, set a success message, store the email, and mark completion
      setSuccessMessage('Registration successful! An activation email has been sent to your inbox. Please check your email to activate your account. You can close this page now or resend the email if you don\'t receive it.');
      setRegisteredEmailForResend(email);
      setRegistrationCompleted(true); // Set to true after successful registration

      // Do NOT redirect immediately. Wait for user to activate.
      // If you still want to redirect after a delay, uncomment this:
      // setTimeout(() => {
      //   _navigate('/login'); // Use _navigate here
      // }, 2000);

    } catch (err) {
      if (err.response) {
        const data = err.response.data;
        if (data.email?.[0]?.includes('already exists')) {
          setError('This email is already registered. Please use a different email or log in.');
          setRegisteredEmailForResend(email);
          setRegistrationCompleted(true); // If email exists, treat as "completed" for resend purposes
        } else if (data.detail) {
          setError(data.detail);
        } else if (data.non_field_errors) {
          setError(data.non_field_errors[0]);
        }
        else {
          setError('Registration failed. Please try again.');
        }
      } else {
        setError('Network error or server is unreachable. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendActivation = async () => {
    if (!registeredEmailForResend) {
      setError("No registered email found to resend. Please register first or try again.");
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const res = await authapiclient.post("/auth/users/resend_activation/", {
        email: registeredEmailForResend,
      });

      if (res.status === 204 || res.status === 200) {
        setSuccessMessage(`Activation email resent successfully to ${registeredEmailForResend}! Please check your inbox.`);
      } else {
        const result = res.data;
        setError(result?.detail || result?.message || "Failed to resend email. Please try again.");
      }
    } catch (error) {
      console.error("Resend activation error:", error);
      setError(
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        "Error resending activation email. Please check your email and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg border border-gray-200 shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Sign Up to JobSy</h2>

        {/* Error message display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {/* Success message display */}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> {successMessage}</span>
            {registeredEmailForResend && (
              <button
                onClick={handleResendActivation}
                disabled={isLoading}
                className={`ml-3 px-3 py-1 text-sm rounded-md transition-colors duration-200
                  ${isLoading
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
              >
                {isLoading ? 'Resending...' : 'Resend Email'}
              </button>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                id="first-name"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="text-black mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={registrationCompleted} // Disable input fields after completion
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                id="last-name"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="text-black mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={registrationCompleted} // Disable input fields after completion
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                id="phone-number"
                type="tel"
                placeholder="e.g., 1234567890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="text-black mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={registrationCompleted} // Disable input fields after completion
              />
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                id="address"
                type="text"
                placeholder="Your Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="text-black mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={registrationCompleted} // Disable input fields after completion
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="signup-email"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-black mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={registrationCompleted} // Disable input fields after completion
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-black mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={registrationCompleted} // Disable input fields after completion
              />
            </div>

            {/* Re-Type Password */}
            <div>
              <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-gray-700">
                Re-Type Password
              </label>
              <input
                id="signup-confirm-password"
                type="password"
                placeholder="Re-type Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="text-black mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={registrationCompleted} // Disable input fields after completion
              />
            </div>
          </div> {/* End of grid container */}

          <button
            type="submit"
            disabled={isLoading || registrationCompleted} // Disable when loading or after completion
            className={`w-full bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md mt-6 transition-colors duration-200 ${
              isLoading || registrationCompleted ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Signing Up...' : (registrationCompleted ? 'Registration Complete' : 'Sign Up')}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}