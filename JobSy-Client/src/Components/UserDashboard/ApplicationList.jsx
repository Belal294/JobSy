import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import apiClient from "../FetchingApi/api-client";
import { MapPin } from "react-feather";
import default_logo from "../../assets/Deafult/defalt-logo.png";
import AuthContext from "../Context/AuthContext";

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await apiClient.get("/applications/", {
          headers: {
            Authorization: `JWT ${token}`,
          },
        });
        setApplications(response.data.results || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load applications.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchApplications();
    } else {
      setError("You must be logged in to see your applications.");
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  if (applications.length === 0) {
    return <div className="text-center py-8 text-gray-600">No applications found.</div>;
  }

  return (
    <div className="space-y-6 mb-8 max-w-4xl mx-auto">
      <h2 className="text-black text-2xl font-bold mb-4">Your Job Applications</h2>
      {applications.map(({ id, job_detail, status, status_display }) => {
        const jobData = job_detail || {};
        const {
          id: jobId,
          title,
          company_name,
          location,
          logo_image,
          salary,
        } = jobData;

        const getStatusBadge = (status) => {
          switch (status) {
            case "accepted":
              return "bg-green-100 text-green-800";
            case "rejected":
              return "bg-red-100 text-red-800";
            case "pending":
              return "bg-yellow-100 text-yellow-800";
            default:
              return "bg-gray-100 text-gray-700";
          }
        };

        return (
          <Link to={`/jobs/${jobId || ""}`} key={id}>
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out border border-gray-200 relative overflow-hidden p-6 flex items-center justify-between hover:transform hover:translate-x-1 hover:scale-100 hover:before:absolute hover:before:inset-y-0 hover:before:left-0 hover:before:bg-green-500 hover:before:w-1 before:transition-all before:duration-300 before:ease-in-out">
              
              {/* Logo */}
              <div className="flex-shrink-0 mr-6 flex items-center">
                <img
                  src={logo_image || default_logo}
                  alt={`${company_name || "Company"} logo`}
                  className="w-16 h-16 object-contain"
                />
              </div>

              {/* Job info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {title || "Job Title"}
                </h3>
                <p className="text-gray-500 text-sm mb-1 truncate">
                  {company_name || "Unknown Company"}
                </p>
                <div className="flex items-center text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="truncate">{location || "Unknown Location"}</span>
                </div>
              </div>

              {/* Status and salary */}
              <div className="flex flex-col items-end space-y-1 ml-6 flex-shrink-0">
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-full capitalize ${getStatusBadge(
                    status
                  )}`}
                >
                  {status_display || status || "Unknown Status"}
                </span>
                <span className="text-sm text-gray-600">
                  {salary ? `$${salary}` : "Salary: N/A"}
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ApplicationList;
