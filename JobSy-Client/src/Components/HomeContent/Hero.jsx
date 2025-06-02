import React, { useState, useMemo } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeroBackGround from "../../assets/BackGroundsImages/HeroBackGround.jpg";
import UseFetchJobList from "../Hooks/UseFetchJobList";

export default function Hero() {
  const navigate = useNavigate();
  const { fetchedJobs, loading } = UseFetchJobList(); // ✅ Corrected

  const [jobTitle, setJobTitle] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");

  const uniqueLocations = useMemo(() => {
    const locations = new Set();
    fetchedJobs.forEach((job) => {
      if (job.location) locations.add(job.location);
    });
    return ["", ...Array.from(locations).sort()];
  }, [fetchedJobs]);

  const uniqueJobTypes = useMemo(() => {
    const types = new Set();
    fetchedJobs.forEach((job) => {
      if (job.job_type) types.add(job.job_type);
    });
    return ["", ...Array.from(types).sort()];
  }, [fetchedJobs]);

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    if (jobTitle) queryParams.append("title", jobTitle);
    if (selectedRegion) queryParams.append("location", selectedRegion);
    if (selectedJobType) queryParams.append("job_type", selectedJobType);
    navigate(`/joblist?${queryParams.toString()}`);
  };

  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat "
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))`,
      }}
    >
      <section className="min-h-[80vh] flex items-center relative px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-10 leading-tight">
              The Easiest Way To Get Your Dream Job
            </h1>
            <p className="text-xl text-gray-300 mb-14 max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cupiditate est, consequuntur perferendis.
            </p>

            <div className="bg-opacity-10 backdrop-blur-sm rounded-lg p-6 max-w-4xl mx-auto w-full">
              {loading ? (
                <p className="text-white">Loading search options...</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <input
                    type="text"
                    placeholder="Job title, Company..."
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="h-12 w-full rounded-md px-4 text-white bg-transparent border border-gray-300 placeholder-white focus:ring-green-500 focus:border-green-500"
                  />

                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="h-12 w-full rounded-md px-4 text-white bg-transparent border border-gray-300 focus:ring-green-500 focus:border-green-500 appearance-none pr-8"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='white'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 0.75rem center",
                      backgroundSize: "1.5em 1.5em",
                    }}
                  >
                    <option value="" className="text-gray-800">
                      Select Region
                    </option>
                    {uniqueLocations.map((location) => (
                      <option key={location} value={location} className="text-gray-800">
                        {location || "Unknown Location"}
                      </option>
                    ))}
                  </select>

                  <select
                    value={selectedJobType}
                    onChange={(e) => setSelectedJobType(e.target.value)}
                    className="h-12 w-full rounded-md px-4 text-white bg-transparent border border-gray-300 focus:ring-green-500 focus:border-green-500 appearance-none pr-8"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='white'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 0.75rem center",
                      backgroundSize: "1.5em 1.5em",
                    }}
                  >
                    <option value="" className="text-gray-800">
                      Select Job Type
                    </option>
                    {uniqueJobTypes.map((type) => (
                      <option key={type} value={type} className="text-gray-800">
                        {type ? type.replace(/_/g, " ") : "All Job Types"}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={handleSearch}
                    className="h-12 w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md flex items-center justify-center transition-colors duration-200"
                  >
                    <Search className="w-5 h-5 mr-2" /> Search Job
                  </button>
                </div>
              )}

              <div className="flex flex-wrap items-center mt-6 gap-2">
                <span className="text-white font-medium">Trending Keywords:</span>
                {["UI Designer", "Python", "Developer"].map((kw) => (
                  <div
                    key={kw}
                    className="badge badge-outline bg-opacity-20 text-white border-white border-opacity-30 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-opacity-30 transition-colors duration-200"
                    onClick={() => setJobTitle(kw)}
                  >
                    {kw}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <ChevronDown className="w-6 h-6 text-gray-600" />
          </div>
        </div>
      </section>
    </div>
  );
}
