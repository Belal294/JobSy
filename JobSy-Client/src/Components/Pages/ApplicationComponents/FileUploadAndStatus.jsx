import React from "react";

export default function FileUploadAndStatus({
  selectedFile,
  handleFileChange,
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* File Upload */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <label
            htmlFor="fileUpload"
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md cursor-pointer text-sm font-medium text-gray-700 transition-colors"
          >
            Upload Resume/CV
          </label>
          <input
            type="file"
            id="fileUpload"
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.doc,.docx,.txt"
          />
          <span className="text-sm text-gray-500">
            {selectedFile ? selectedFile.name : "No file chosen"}
          </span>
        </div>

        <div className="border-2 border-dashed border-yellow-300 bg-yellow-50 rounded-lg p-8 text-center">
          <p className="text-yellow-600 font-medium">Drag and drop your resume here</p>
        </div>
      </div>

      
    </div>
  );
}
