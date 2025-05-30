import { useEffect, useState } from "react";
import { Heart, MapPin, Building2, Clock, Facebook, Twitter, Linkedin, PinIcon as Pinterest } from "lucide-react";
import apiClient from "../../FetchingApi/api-client";
import { useParams } from "react-router-dom";
import JobListingSection from "../../HomeContent/JobListingSection";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await apiClient.get(`/jobs/${id}`);
        setJob(response.data);
      } catch (err) {
        setError("Failed to load job details. Please try again later.");
        console.error("Error fetching job details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJobDetails();
    } else {
      setError("Job ID not found in URL.");
      setLoading(false);
    }
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    try {
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (e) {
      console.error("Error formatting date:", e);
      return "Invalid Date";
    }
  };

  const parseMultilineString = (text) => {
    if (!text) return [];
    return text.split(/[\r\n]+/).filter(line => line.trim() !== '');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-700">Loading job details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-700">No job details found.</p>
      </div>
    );
  }

  const responsibilitiesList = parseMultilineString(job.responsibilities);
  const educationList = parseMultilineString(job.education);
  const benefitsList = parseMultilineString(job.benefits);

  return (
    <div className="min-h-screen bg-gray-50">
       <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-6">
              {/* Company Logo */}
              <div className="w-24 h-24 bg-white border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                {job.image ? (
                  <img src={job.image} alt={job.company_name || "Company Logo"} className="object-cover w-full h-full" />
                ) : (
                  <div className="text-black font-bold text-xl">{job.company_name ? job.company_name.charAt(0) : "N/A"}</div>
                )}
              </div>

              {/* Job Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">{job.title || "Job Title N/A"}</h1>
                <div className="flex items-center space-x-6 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-4 h-4" />
                    <span>{job.company_name || "Company N/A"}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location || "Location N/A"}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-green-600">{job.job_type ? job.job_type.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase()) : "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                <Heart className="w-4 h-4" />
                <span>Save Job</span>
              </button>
              <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Apply Now</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* ... (Hero Image, Job Description, Responsibilities, Education + Experience, Other Benefits, Bottom Action Buttons) ... */}
            <div className="w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                {job.image ? (
                  <img src={job.image} alt="Workspace" className="object-cover w-full h-full" />
                ) : (
                  <span className="text-gray-500">Workspace Image Placeholder</span>
                )}
              </div>

              {/* Job Description */}
              <div>
                <h2 className="text-xl font-semibold text-green-600 mb-4 flex items-center">
                  <span className="w-1 h-6 bg-green-500 mr-3"></span>
                  Job Description
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>{job.description || "No description provided."}</p>
                </div>
              </div>

              {/* Responsibilities */}
              <div>
                <h2 className="text-xl font-semibold text-green-600 mb-4 flex items-center">
                  <span className="w-1 h-6 bg-green-500 mr-3"></span>
                  Responsibilities
                </h2>
                <ul className="space-y-3">
                  {responsibilitiesList.length > 0 ? (
                    responsibilitiesList.map((res, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600">{res}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-600">No responsibilities listed.</li>
                  )}
                </ul>
              </div>

              {/* Education + Experience */}
              <div>
                <h2 className="text-xl font-semibold text-green-600 mb-4 flex items-center">
                  <span className="w-1 h-6 bg-green-500 mr-3"></span>
                  Education + Experience
                </h2>
                <ul className="space-y-3">
                  {educationList.length > 0 ? (
                    educationList.map((edu, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600">{edu}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-600">No education or experience details provided.</li>
                  )}
                </ul>
              </div>

              {/* Other Benefits */}
              <div>
                <h2 className="text-xl font-semibold text-green-600 mb-4 flex items-center">
                  <span className="w-1 h-6 bg-green-500 mr-3"></span>
                  Other Benefits
                </h2>
                <ul className="space-y-3">
                  {benefitsList.length > 0 ? (
                    benefitsList.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-600">No additional benefits listed.</li>
                  )}
                </ul>
              </div>

              {/* Bottom Action Buttons */}
              <div className="flex items-center justify-center space-x-4 pt-8">
                <button className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  <Heart className="w-4 h-4" />
                  <span>Save Job</span>
                </button>
                <button className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600">Apply Now</button>
              </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Job Summary */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-green-600 mb-4">Job Summary</h3>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-900">Published on:</span>
                  <span className="text-gray-600 ml-2">{formatDate(job.posted_at)}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Vacancy:</span>
                  <span className="text-gray-600 ml-2">{job.vacancy || "N/A"}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Employment Status:</span>
                  <span className="text-gray-600 ml-2">{job.job_type ? job.job_type.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase()) : "N/A"}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Experience:</span>
                  <span className="text-gray-600 ml-2">{job.experience || "N/A"}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Job Location:</span>
                  <span className="text-gray-600 ml-2">{job.location || "N/A"}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Salary:</span>
                  <span className="text-gray-600 ml-2">{job.salary ? `$${parseFloat(job.salary).toLocaleString()}` : "N/A"}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Gender:</span>
                  <span className="text-gray-600 ml-2">{job.gender ? job.gender.charAt(0).toUpperCase() + job.gender.slice(1) : "Any"}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Application Deadline:</span>
                  <span className="text-gray-600 ml-2">{formatDate(job.deadline)}</span>
                </div>
              </div>
            </div>

            {/* Share */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-green-600 mb-4">Share</h3>
              <div className="flex space-x-3">
                <button className="p-2 text-green-500 hover:bg-green-50 rounded">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="p-2 text-green-500 hover:bg-green-50 rounded">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="p-2 text-green-500 hover:bg-green-50 rounded">
                  <Linkedin className="w-5 h-5" />
                </button>
                <button className="p-2 text-green-500 hover:bg-green-50 rounded">
                  <Pinterest className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Pass the current job ID and a flag indicating it's from job details */}
      <JobListingSection currentJobId={id} fromDetailsPage={true} />
    </div>
  );
}