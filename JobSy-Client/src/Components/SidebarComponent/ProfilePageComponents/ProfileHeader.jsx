import React from 'react';
import { Edit, Save, X } from "lucide-react";

export default function ProfileHeader({ isEditing, toggleEditMode, handleSubmit }) {
  const handleSaveClick = () => {
    handleSubmit(new Event('submit', { cancelable: true }));
    toggleEditMode();
  };

  const handleCancelClick = () => {
    toggleEditMode();
  };

  return (
    <div className="mb-6 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600">
          {isEditing ? "Edit your profile" : "View your profile"}
        </p>
      </div>

      {isEditing ? (
        <div className="flex gap-2">
          <button
            onClick={handleSaveClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg flex items-center transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none"
          >
            <Save className="w-4 h-4 mr-2" /> Save
          </button>

          <button
            onClick={handleCancelClick}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg flex items-center transition-colors duration-200 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 outline-none"
          >
            <X className="w-4 h-4 mr-2" /> Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={toggleEditMode}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg flex items-center transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none"
        >
          <Edit className="w-4 h-4 mr-2" /> Edit
        </button>
      )}
    </div>
  );
}
