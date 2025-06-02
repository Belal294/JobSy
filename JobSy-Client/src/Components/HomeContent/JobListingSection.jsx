import default_logo from '../../assets/Deafult/defalt-logo.png';

import React, { useEffect, useState, useMemo } from "react";
import { MapPin, Search } from "lucide-react";
import  UseFetchJobList  from "../Hooks/UseFetchJobList";
import { Link, useLocation } from "react-router-dom";

export default function JobListingSection({
  currentJobId,
  fromDetailsPage,
  isHomePage,
}) {
  const { fetchedJobs, loading } = UseFetchJobList();
  const location = useLocation();

  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  // States for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedGender, setSelectedGender] = useState("any");

  useEffect(() => {
    setSearchTerm(queryParams.get('title') || "");
    setSelectedJobType(queryParams.get('job_type') || "all");
    setSelectedLocation(queryParams.get('location') || "all");

  }, [queryParams]); 

  const uniqueLocations = useMemo(() => {

    if (!fetchedJobs) return ['all'];
    const locations = new Set();
    fetchedJobs.forEach(job => {
      if (job.location) {
        locations.add(job.location);
      }
    });
    return ['all', ...Array.from(locations).sort()];
  }, [fetchedJobs]);

  const uniqueJobTypes = useMemo(() => {
  
    if (!fetchedJobs) return ['all'];
    const types = new Set();
    fetchedJobs.forEach(job => {
      if (job.job_type) {
        types.add(job.job_type);
      }
    });
    return ['all', ...Array.from(types).sort()];
  }, [fetchedJobs]);

  // Filter jobs based on current state (which can be initialized from URL or user input)
  const jobs = useMemo(() => {
    // Return empty array if fetchedJobs is not yet available or loading
    if (loading || !fetchedJobs) return [];

    let currentJobs = fetchedJobs;

    // Filter out the current job if on a details page
    if (fromDetailsPage) {
      currentJobs = currentJobs.filter(
        (job) => String(job.id) !== String(currentJobId)
      );
    }

    // Apply filters only if not on the home page
    if (!isHomePage) {
      // Filter by search term (job title, company name, location)
      if (searchTerm) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        currentJobs = currentJobs.filter(
          (job) =>
            job.title?.toLowerCase().includes(lowerCaseSearchTerm) || // Added optional chaining
            (job.company_name && job.company_name.toLowerCase().includes(lowerCaseSearchTerm)) ||
            (job.location?.toLowerCase().includes(lowerCaseSearchTerm)) // Added optional chaining
        );
      }

      // Filter by selected job type
      if (selectedJobType !== "all") {
        currentJobs = currentJobs.filter((job) => job.job_type === selectedJobType);
      }

      // Filter by selected location
      if (selectedLocation !== "all") {
        currentJobs = currentJobs.filter((job) => job.location === selectedLocation);
      }

      // Filter by selected gender
      if (selectedGender !== "any") {
        // Ensure job.gender exists and matches, or handle cases where it might be null/empty
        currentJobs = currentJobs.filter((job) => job.gender === selectedGender);
      }
    }

    // On home page, show only the first 3 jobs
    if (isHomePage) {
      return currentJobs.slice(0, 3);
    }

    return currentJobs;
  }, [
    fetchedJobs,
    currentJobId,
    fromDetailsPage,
    searchTerm,
    selectedJobType,
    selectedLocation,
    selectedGender,
    isHomePage,
    loading 
  ]);

  // Determine the section title based on props
  const sectionTitle = fromDetailsPage
    ? "More Job Openings"
    : isHomePage
    ? "Latest Job Openings"
    : `${jobs.length} Job${jobs.length !== 1 ? "s" : ""} Listed`;

  // Options for Gender dropdown
  const genderOptions = [
    { value: "any", label: "Any" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 px-4 sm:px-6 lg:px-12 py-8"
    
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          {sectionTitle}
        </h1>
      </div>

      {!isHomePage && (
        <div className="bg-white rounded-lg shadow p-6 mb-8 border border-gray-200 space-y-4">
          {/* Search Input */}
          <div className="w-full">
            <label
              htmlFor="search-input"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Search by Keyword
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                id="search-input"
                className="block w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-gray-900 placeholder-gray-400 focus:border-green-500 focus:ring-green-500 sm:text-sm"
                placeholder="Job title, company, location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filter Dropdowns (Job Type, Location, Gender) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Job Type Filter */}
            <div>
              <label
                htmlFor="job-type-select"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Job Type
              </label>
              <select
                id="job-type-select"
                className="text-black mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                value={selectedJobType}
                onChange={(e) => setSelectedJobType(e.target.value)}
              >
                {/* Dynamically generated options from fetched data */}
                {uniqueJobTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Job Types' : type.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label
                htmlFor="location-select"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Location
              </label>
              <select
                id="location-select"
                className="text-black mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {/* Dynamically generated options from fetched data */}
                {uniqueLocations.map((location) => (
                  <option key={location} value={location}>
                    {location === 'all' ? 'All Locations' : location}
                  </option>
                ))}
              </select>
            </div>

            {/* Gender Filter (button group) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <div
                className="inline-flex rounded-md border border-gray-300 shadow-sm overflow-hidden"
                role="group"
              >
                {genderOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`px-4 py-2 text-sm font-medium
                      ${
                        selectedGender === option.value
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }
                      border-r last:border-r-0 transition-colors duration-200
                    `}
                    onClick={() => setSelectedGender(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {jobs.length > 0 ? (
        <div className="space-y-6 mb-8">
          {jobs.map((job) => (
            <Link to={`/jobs/${job.id}`} key={job.id}>
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out border border-gray-200 relative overflow-hidden hover:transform hover:translate-x-1 hover:scale-100 hover:before:absolute hover:before:inset-y-0 hover:before:left-0 hover:before:bg-green-500 hover:before:w-1 before:transition-all before:duration-300 before:ease-in-out">
                <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  {/* Left Section */}
                  <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                    <img
                      src={job.logo_image || default_logo} // Using default_logo
                      alt={`${job.company_name || job.company_profile_name || "Company"} logo`} // Better fallback
                      className="w-16 h-16 object-contain"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {job.title}
                      </h3>
                      <p className="text-gray-500 text-sm mb-1">
                        {job.company_name || job.company_profile_name || "Unknown Company"} {/* Improved fallback for company name */}
                      </p>
                      <div className="flex items-center text-gray-400 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{job.location || "Unknown Location"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="flex flex-col items-start sm:items-end space-y-2">
                    <span
                      className={`border-none badge ${
                        job.job_type === "internship"
                          ? "bg-yellow-500"
                          : job.job_type === "full_time"
                          ? "bg-green-500"
                          : job.job_type === "part_time"
                          ? "bg-blue-500"
                          : job.job_type === "contract"
                          ? "bg-purple-500"
                          : "bg-gray-500" // Fallback color
                      } text-white px-4 py-2 text-sm capitalize rounded-full`}
                    >
                      {job.job_type?.replace(/_/g, " ") || "N/A"} {/* Added optional chaining and N/A fallback */}
                    </span>
                    <span className="mr-3 text-sm text-gray-600">${job.salary || "N/A"}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 py-8">
          No jobs match your current filters. Try adjusting your search.
        </div>
      )}

      {!isHomePage && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {jobs.length > 0 ? `1-${jobs.length}` : "0"} Jobs
          </div>

          {/* Pagination - Note: This is static. For dynamic pagination, you'd need more logic. */}
          <div className="join">
            <button className="btn btn-sm join-item bg-white text-black border border-gray-300 hover:bg-gray-100 transition-colors duration-200">
              Prev
            </button>
            <button className="btn btn-sm btn-success join-item bg-green-500 text-white border-green-500 hover:bg-green-600 transition-colors duration-200">
              1
            </button>
            <button className="btn btn-sm join-item bg-white text-black border border-gray-300 hover:bg-gray-100 transition-colors duration-200">
              2
            </button>
            <button className="btn btn-sm join-item bg-white text-black border border-gray-300 hover:bg-gray-100 transition-colors duration-200">
              3
            </button>
            <button className="btn btn-sm join-item bg-white text-black border border-gray-300 hover:bg-gray-100 transition-colors duration-200">
              4
            </button>
            <button className="btn btn-sm join-item bg-white text-black border border-gray-300 hover:bg-gray-100 transition-colors duration-200">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}