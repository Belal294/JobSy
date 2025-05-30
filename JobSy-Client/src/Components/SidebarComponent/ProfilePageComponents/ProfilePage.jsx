import { useState, useEffect } from "react";
import authApiClient from "../../FetchingApi/auth-api-client";
import ProfileHeader from "./ProfileHeader";
import ProfileImageSection from "./ProfileImage"; // Assuming this is ProfileImage.jsx
import ProfileForm from "./ProfileForm";

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    address: "",
    profile_image: "", // Will store URL from backend
    cover_image: "",   // Will store URL from backend
    email: "",
    gender: "",
    date_of_birth: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // Added success message

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        setError(null); // Clear previous errors on new fetch
        const response = await authApiClient.get("auth/users/me/");

        console.log("check gender", response.data);
         
        const user = response.data; 

        setProfileData({
          first_name: user.first_name || "",
          last_name: user.last_name || "",
          phone_number: user.phone_number || "",
          address: user.address || "",
          profile_image: user.profile_image || "", // Should be URL
          cover_image: user.cover_image || "",     // Should be URL
          email: user.email || "",
          gender: user.gender || "",
          // Format date for input type="date"
          date_of_birth: user.date_of_birth
            ? new Date(user.date_of_birth).toISOString().split("T")[0]
            : "",
        });
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Failed to load profile data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []); // Empty dependency array means this runs once on mount

  // Handler for text/select/date inputs in ProfileForm
  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handler for image updates coming from ProfileImageSection
  // This function receives the *updated user data* from the API response
  // of the image upload in ProfileImageSection.
  const handleImageChange = (updatedUserData) => {
    // Update the profileData state with the new image URLs (and any other updated fields)
    setProfileData((prevData) => ({
      ...prevData,
      profile_image: updatedUserData.profile_image || prevData.profile_image,
      cover_image: updatedUserData.cover_image || prevData.cover_image,
      // If the backend sends other updated fields, you can merge them:
      // ...updatedUserData
    }));
    setSuccessMessage("Image updated successfully!");
    // Clear success message after some time
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // Main submit handler for ProfileForm (general profile data and password)
  const handleSubmit = async (e, passwordFields = {}) => {
    e.preventDefault(); // Prevent default form submission

    if (!isEditing) return; // Only proceed if in edit mode

    setLoading(true);
    setError(null); // Clear previous errors
    setSuccessMessage(null); // Clear previous success messages

    const { current_password, new_password, confirm_new_password } = passwordFields;
    let passwordChangeSuccessful = true; // Flag to track password change status

    // --- 1. Handle Password Change (if applicable) ---
    // Only attempt password change if new_password or current_password is provided
    if (new_password || current_password) {
      if (!current_password) {
        setError("Current password is required to change password.");
        setLoading(false);
        return;
      }
      if (!new_password) {
        setError("New password is required.");
        setLoading(false);
        return;
      }
      if (new_password !== confirm_new_password) {
        setError("New password and confirm password do not match.");
        setLoading(false);
        return;
      }
      if (new_password.length < 8) { // Example: minimum length
        setError("New password must be at least 8 characters long.");
        setLoading(false);
        return;
      }

      try {
        // Assuming Djoser's set_password endpoint or similar
        const passwordChangeResponse = await authApiClient.post("auth/users/set_password/", {
          current_password: current_password,
          new_password: new_password,
        });
        console.log("Password change successful:", passwordChangeResponse.data);
        setSuccessMessage("Password changed successfully!");
      } catch (passwordErr) {
        console.error("Error changing password:", passwordErr.response ? passwordErr.response.data : passwordErr.message);
        setError(passwordErr.response?.data?.current_password?.[0] || "Failed to change password. Please check your current password and try again.");
        passwordChangeSuccessful = false; // Mark password change as failed
        setLoading(false);
        return; // Stop execution if password change fails
      }
    }

    // --- 2. Handle General Profile Data Update ---
    // Only proceed with profile data update if password change was successful OR no password change was attempted
    if (passwordChangeSuccessful) {
      const profileUpdatePayload = {
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        phone_number: profileData.phone_number,
        address: profileData.address,
        email: profileData.email,
        sex: profileData.sex,
        // Ensure date_of_birth is sent as YYYY-MM-DD or null/empty string
        date_of_birth: profileData.date_of_birth || null, // Send null if empty
      };

      // Remove any fields that are empty strings or not meant for PATCH
      // This is crucial for PATCH requests to avoid sending empty values for optional fields
      Object.keys(profileUpdatePayload).forEach(key => {
        if (profileUpdatePayload[key] === "") {
          delete profileUpdatePayload[key];
        }
      });
      // Do NOT include profile_image or cover_image here, as they are handled by ProfileImageSection

      try {
        // Using PATCH for partial updates, which is common for user profiles
        const profileResponse = await authApiClient.patch("auth/users/me/", profileUpdatePayload);
        console.log("General profile data update successful:", profileResponse.data);
        setProfileData((prevData) => ({
          ...prevData,
          ...profileResponse.data, // Merge updated fields from response
          // Ensure date_of_birth is formatted correctly for display if it's updated
          date_of_birth: profileResponse.data.date_of_birth
            ? new Date(profileResponse.data.date_of_birth).toISOString().split("T")[0]
            : "",
        }));
        setSuccessMessage("Profile data updated successfully!");
        setIsEditing(false); // Exit edit mode after successful save
      } catch (err) {
        console.error("Error updating profile (general info):", err.response ? err.response.data : err.message);
        // More specific error handling for fields
        if (err.response && err.response.data) {
            const errorData = err.response.data;
            if (errorData.date_of_birth) {
                setError(`Date of Birth: ${errorData.date_of_birth.join(', ')}`);
            } else if (errorData.email) {
                setError(`Email: ${errorData.email.join(', ')}`);
            } else {
                setError(errorData.detail || errorData.message || "Failed to update profile data. Please check your inputs.");
            }
        } else {
            setError("Network error or server unavailable.");
        }
      }
    }
    setLoading(false); // Ensure loading is always set to false
    // Clear success message after some time
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white text-center">
        <p className="text-gray-700">Loading profile...</p>
      </div>
    );
  }

  // Display error if any
  if (error && !isEditing) { // Only show persistent error if not editing
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white text-center text-red-600">
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Reload Page</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <ProfileHeader
        isEditing={isEditing}
        toggleEditMode={() => setIsEditing(!isEditing)}

      />

      {/* Success/Error messages for the whole page */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> {successMessage}</span>
        </div>
      )}
      {error && isEditing && ( // Show error during editing
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      <ProfileImageSection
        profileData={profileData}
        isEditing={isEditing}
        onImageChange={handleImageChange}
      />
      <ProfileForm
        profileData={profileData}
        isEditing={isEditing}
        onInputChange={handleChange} // Handles general input changes
        onSubmit={handleSubmit} // Handles general profile data and password submission
      />
    </div>
  );
}