import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../FetchingApi/api-client";
import ApplicationDetails from "./ApplicationDetails";
import FileUploadAndStatus from "./FileUploadAndStatus";
import AuthContext from "../../Context/AuthContext";

export default function ApplicationForm() {
  const { token } = useContext(AuthContext);
  const { id } = useParams();

  const [formData, setFormData] = useState({
    job_title: "",
    years_experience: "",
    availability: "",
    expected_salary: "",
    status_messages: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setSubmissionStatus("You must be logged in to apply.");
      return;
    }

    if (!id) {
      setSubmissionStatus("No job selected.");
      return;
    }

    setSubmissionStatus("Submitting application...");

    try {
      const applicationData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        applicationData.append(key, value);
      });

      if (selectedFile) {
        applicationData.append("resume", selectedFile);
      }

      const jobId = parseInt(id);
      applicationData.append("job", jobId);

      const response = await apiClient.post("applications/", applicationData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `JWT ${token}`,
        },
      });

      setSubmissionStatus("Application submitted successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting application:", error);

      let errorMsg = "Submission failed. Please try again.";

      if (error.response?.data) {
        const data = error.response.data;

        if (Array.isArray(data) && data.length > 0) {
          errorMsg = data[0];
        } else if (data.non_field_errors && data.non_field_errors.length > 0) {
          errorMsg = data.non_field_errors[0];
        } else if (typeof data === "object") {
          const firstKey = Object.keys(data)[0];
          if (Array.isArray(data[firstKey]) && data[firstKey].length > 0) {
            errorMsg = data[firstKey][0];
          }
        }
      }

      setSubmissionStatus(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Job Application Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <ApplicationDetails
            formData={formData}
            handleInputChange={handleInputChange}
          />

          <FileUploadAndStatus
            formData={formData}
            selectedFile={selectedFile}
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
          />

          {submissionStatus && (
            <div
              className={`text-center py-2 px-4 rounded-md ${
                submissionStatus.toLowerCase().includes("successfully")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {submissionStatus}
            </div>
          )}

          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              SUBMIT APPLICATION
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
