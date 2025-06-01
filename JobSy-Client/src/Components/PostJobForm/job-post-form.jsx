import { useState, useContext } from "react";
import JobDetailsSection from "./job-details-section";
import CompanyDetailsSection from "./company-details-section";
import submitFormData from './SubmitFormData';
import AuthContext from "../Context/AuthContext";

const JobPostForm = () => {
  const { user, token } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    job_type: "",
    salary: "",
    vacancy: "",
    experience: "",
    gender: "any", // Default value as per your previous code
    responsibilities: "",
    education: "",
    benefits: "",
    deadline: "",
    logo_image: null, // Matches serializer field
    company_image: null, // Matches serializer field
    company_name: "", // Matches serializer field
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !token) {
      alert("You must be logged in to post a job.");
      return;
    }

    const result = await submitFormData(formData, token);

    if (result.success) {
      alert("Job posted successfully!");
      // Reset form data after successful submission
      setFormData({
        title: "",
        description: "",
        location: "",
        job_type: "",
        salary: "",
        vacancy: "",
        experience: "",
        gender: "any",
        responsibilities: "",
        education: "",
        benefits: "",
        deadline: "",
        logo_image: null,
        company_image: null,
        company_name: "",
      });
    } else {
      alert(`Failed to post job: ${result.error || "Unknown error"}`);
    }
  };

  const handlePreview = () => {
    console.log("Preview clicked");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">Post A Job</h1>
        </div>

        <form
          id="job-form"
          onSubmit={handleSubmit}
          className="bg-white rounded-lg border border-gray-200"
        >
          <JobDetailsSection
            formData={formData}
            handleInputChange={handleInputChange}
          />
          <CompanyDetailsSection
            formData={formData}
            handleInputChange={handleInputChange}
          />

          <div className="flex justify-end gap-4 p-6 bg-gray-50 border-t border-gray-200">
            <button
              type="button"
              onClick={handlePreview}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              Preview
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
            >
              Save Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobPostForm;