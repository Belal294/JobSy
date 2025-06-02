import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { MapPin } from "react-feather";
import apiClient from "../FetchingApi/api-client";
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
        const response = await apiClient.get("/notifications/", {
          headers: {
            Authorization: `JWT ${token}`,
          },
        });
        setApplications(response.data.results);
        console.log("notification data", response.data); 
      } catch (err) {
        setError("Failed to load notifications.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchApplications();
    } else {
      setError("You must be logged in to see your notifications.");
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
    return <div className="text-center py-8 text-gray-600">No notifications found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      <ul className="space-y-4">
        {applications.map((notification) => (
          <li
            key={notification.id}
            className="bg-white p-4 rounded shadow border border-gray-100"
          >
            <p className="text-gray-800">{notification.message}</p>
            <p className="text-sm text-gray-500">
              {new Date(notification.created_at).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicationList;
