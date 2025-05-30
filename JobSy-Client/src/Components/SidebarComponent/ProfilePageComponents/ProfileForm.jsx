import React, { useState } from 'react';
import authApiClient from '../../FetchingApi/auth-api-client';


export default function ProfileForm({ profileData, isEditing, onInputChange, onSubmit }) {
  console.log("profile data", profileData.gender);

  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [passwordFields, setPasswordFields] = useState({
    current_password: "",
    new_password: "",
    confirm_new_password: "",
  });
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(null);     // Add error state

  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    setPasswordFields((prevFields) => ({
      ...prevFields,
      [id]: value,
    }));
  };

  const handleFormSubmit = async (e) => { // Made async to await the API call
    e.preventDefault(); // Prevent default form submission behavior

    setLoading(true);
    setError(null); // Clear previous errors

    // const dataToUpdate = { ...profileData }; 
    const dataToUpdate = {
    first_name: profileData.first_name,
    last_name: profileData.last_name,
    phone_number: profileData.phone_number,
    address: profileData.address,

    email: profileData.email,
    gender: profileData.sex,
    date_of_birth: profileData.date_of_birth
} 

    if (showPasswordFields) {
      // Basic client-side password validation
      if (passwordFields.new_password !== passwordFields.confirm_new_password) {
        setError("New password and confirm password do not match.");
        setLoading(false);
        return;
      }
      if (!passwordFields.current_password || !passwordFields.new_password) {
        setError("Current and new passwords are required to change password.");
        setLoading(false);
        return;
      }

      // Add password fields to the data if changing password
      dataToUpdate.current_password = passwordFields.current_password;
      dataToUpdate.new_password = passwordFields.new_password;
      // Note: confirm_new_password is for client-side validation only, usually not sent to backend
    }

    try {

      const response = await authApiClient.patch('/auth/users/me/', dataToUpdate);
      console.log('Profile update successful:', response.data);

      onSubmit(response.data); 

      setPasswordFields({
        current_password: "",
        new_password: "",
        confirm_new_password: "",
      });
      setShowPasswordFields(false); // Hide password fields
    } catch (err) {
      console.error('Error updating profile:', err);
      // Display a user-friendly error message
      if (err.response && err.response.data) {
        setError(err.response.data.detail || err.response.data.message || "An error occurred during update.");
      } else {
        setError("Network error or server unavailable.");
      }
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleFormSubmit}>
      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="first_name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            placeholder="First Name"
            value={profileData.first_name || ''}
            onChange={onInputChange}
            disabled={!isEditing || loading} 
            className={`text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
              !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          />
        </div>
        <div>
          <label
            htmlFor="last_name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            placeholder="Last Name"
            value={profileData.last_name || ''}
            onChange={onInputChange}
            disabled={!isEditing || loading} 
            className={`text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
              !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          />
        </div>
      </div>

      {/* Email and Phone Number */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={profileData.email || ''}
            onChange={onInputChange}
            disabled={!isEditing || loading} 
            className={`text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
              !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          />
        </div>
        <div>
          <label
            htmlFor="phone_number"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phone_number"
            placeholder="Phone Number"
            value={profileData.phone_number || ''}
            onChange={onInputChange}
            disabled={!isEditing || loading} 
            className={`text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
              !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          />
        </div>
      </div>

      {/* Address */}
      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Address
        </label>
        <input
          type="text"
          id="address"
          placeholder="Address"
          value={profileData.address || ''}
          onChange={onInputChange}
          disabled={!isEditing || loading} 
          className={`text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
            !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
        />
      </div>

      {/* Sex and Date of Birth */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="sex"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Gender
          </label>
          <select
            id="sex"
            value={profileData.gender || ''}
            onChange={onInputChange}
            disabled={!isEditing || loading} 
            className={`text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white ${
              !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="date_of_birth"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Date Of Birth
          </label>
          <input
            type="date"
            id="date_of_birth"
            placeholder="YYYY/MM/DD"
            value={profileData.date_of_birth || ''}
            onChange={onInputChange}
            disabled={!isEditing || loading} 
            className={`text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
              !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          />
        </div>
      </div>

      {/* --- Password Change Section --- */}
      {isEditing && (
        <div className="mt-6 border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
            <button
              type="button"
              onClick={() => setShowPasswordFields(!showPasswordFields)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              disabled={loading} // Disable if loading
            >
              {showPasswordFields ? "Hide Fields" : "Change Password?"}
            </button>
          </div>

          {showPasswordFields && (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="current_password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="current_password"
                  placeholder="Enter current password"
                  value={passwordFields.current_password}
                  onChange={handlePasswordChange}
                  disabled={loading} // Disable if loading
                  className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label
                  htmlFor="new_password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="new_password"
                  placeholder="Enter new password"
                  value={passwordFields.new_password}
                  onChange={handlePasswordChange}
                  disabled={loading} // Disable if loading
                  className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label
                  htmlFor="confirm_new_password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirm_new_password"
                  placeholder="Confirm new password"
                  value={passwordFields.confirm_new_password}
                  onChange={handlePasswordChange}
                  disabled={loading} // Disable if loading
                  className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-red-600 text-sm mt-2">{error}</p>
      )}

      {/* Submit Button (only visible in edit mode) */}
      {isEditing && (
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none"
          disabled={loading} // Disable button when loading
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      )}
    </form>
  );
}