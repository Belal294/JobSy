import React, { useState } from 'react';
import { Camera } from "lucide-react";
import DeafaultProfile from '../../../assets/Deafult/deaflu-profile.png';
import DeafaultBackground from '../../../assets/Deafult/defalt-background.jpg';
import authApiClient from '../../FetchingApi/auth-api-client';

export default function ProfileImageSection({ profileData, isEditing, onImageChange }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = async (e, imageType) => {
    if (!isEditing) return;

    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append(imageType, file);

    try {
      const response = await authApiClient.patch('/auth/users/me/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(`${imageType} update successful:`, response.data);
      // **Crucially, call the parent's onImageChange with the updated data**
      // The parent component should then use this data to update its profileData state.
      if (onImageChange) {
        onImageChange(response.data);
      }
    } catch (err) {
      console.error(`Error updating ${imageType}:`, err);
      if (err.response && err.response.data) {
        setError(err.response.data.detail || err.response.data.message || `An error occurred during ${imageType} upload.`);
      } else {
        setError("Network error or server unavailable.");
      }
    } finally {
      setLoading(false);
      // Clear the file input value to allow selecting the same file again if needed
      e.target.value = '';
    }
  };

  return (
    <div className="relative mb-8">
      {/* Cover Image Section */}
      <div className="relative h-48 bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={profileData.cover_image || DeafaultBackground}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        {isEditing && (
          <label
            htmlFor="cover-upload"
            className="absolute top-4 right-4 bg-white rounded-lg p-2 shadow-md hover:shadow-lg transition-shadow cursor-pointer flex items-center"
          >
            <Camera className="w-4 h-4 text-gray-600" />
            <span className="ml-2 text-sm text-gray-600">Cover</span>
            <input
              id="cover-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageUpload(e, "cover_image")} // Direct call
              disabled={loading}
            />
          </label>
        )}
      </div>

      {/* Profile Picture */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-5">
        <div className="relative">
          <div className="w-40 h-40 bg-gray-300 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img
              src={profileData.profile_image || DeafaultProfile}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          {isEditing && (
            <label
              htmlFor="profile-upload"
              className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-1.5 shadow-md hover:bg-blue-600 transition-colors cursor-pointer"
            >
              <Camera className="w-3 h-3 text-white" />
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e, "profile_image")} // Direct call
                disabled={loading}
              />
            </label>
          )}
        </div>
      </div>

      {/* Loading and Error Indicators */}
      {loading && (
        <p className="text-center text-blue-500 text-sm mt-10">Uploading image...</p>
      )}
      {error && (
        <p className="text-center text-red-600 text-sm mt-10">{error}</p>
      )}

      {isEditing && (
        <div className="text-center mb-8 pt-12">
          <p className="text-gray-700 font-medium">
            Upload Profile and Cover Image
          </p>
        </div>
      )}
    </div>
  );
}