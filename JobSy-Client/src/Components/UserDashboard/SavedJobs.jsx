import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, DollarSign, Clock, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify'; 

import default_logo from '../../assets/Deafult/defalt-logo.png';
import AuthContext from '../Context/AuthContext';
import apiClient from '../FetchingApi/api-client';



const SavedJobs = () => {
  const { user, token } = useContext(AuthContext);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      setLoading(true);
      setError(null); // Clear previous errors

      if (!user || !token) {
        setLoading(false);
        setError("Please log in to view your saved jobs.");
        return;
      }

      try {
        const response = await apiClient.get("/saved-jobs/", {
          headers: {
            Authorization: `JWT ${token}`, 
          },
        });
        
        setSavedJobs(response.data.results); 
        console.log("saved data check", response.data);
      } catch (err) {
        console.error("Error fetching saved jobs:", err);
        setError("Failed to load saved jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, [user, token]); 

  const handleRemoveJob = async (savedJobEntryId) => {
    // Show a confirmation dialog
    if (!window.confirm("Are you sure you want to remove this job from your saved list?")) {
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `JWT ${token}`,
        },
      };

      await apiClient.delete(`/saved-jobs/${savedJobEntryId}/`, config); 
      
      setSavedJobs(prevSavedJobs => prevSavedJobs.filter(job => job.id !== savedJobEntryId)); 
      toast.success("Job removed successfully!");
    } catch (err) {
      console.error("Failed to remove job:", err);
      toast.error("Failed to remove job. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center">
          <span className="loading loading-spinner loading-lg text-green-500"></span>
          <p className="mt-4 text-gray-700">Loading your saved jobs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div role="alert" className="alert alert-error shadow-lg max-w-lg text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (savedJobs.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">No Saved Jobs Found</h2>
          <p className="text-gray-600 mb-6">
            It looks like you haven't saved any jobs yet. Start exploring and save jobs you're interested in!
          </p>
          <Link to="/jobs" className="btn btn-primary bg-green-600 hover:bg-green-700 text-white border-none">
            Browse All Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Your Saved Jobs</h1>

        <div className="space-y-6">
          {savedJobs.map((savedJobEntry) => ( 
   
            <div key={savedJobEntry.id} className="card card-side bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="card-body p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start justify-between">
          
                <div className="flex-1 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left mb-4 sm:mb-0">
                  <img
                  
                    src={savedJobEntry.job?.logo_image || default_logo} 
                    alt={`${savedJobEntry.job?.company_name} logo`}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-lg mb-4 sm:mb-0 sm:mr-6"
                  />
                  <div>
                    <h2 className="card-title text-xl font-semibold text-gray-900 mb-2">
                      {/* Link to the specific job details page */}
                      <Link to={`/jobs/${savedJobEntry.job?.id}`} className="hover:text-green-600 transition-colors duration-200">
                        {savedJobEntry.job?.title || "N/A"}
                      </Link>
                    </h2>
                    <p className="text-gray-600 text-sm mb-2">{savedJobEntry.job?.company_name || "N/A"}</p>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-3 text-gray-500 text-sm">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-green-500" />
                        <span>{savedJobEntry.job?.location || "N/A"}</span>
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-1 text-green-500" />
                        <span className="capitalize">{savedJobEntry.job?.job_type?.replace(/_/g, " ") || "N/A"}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1 text-green-500" />
                        <span>${savedJobEntry.job?.salary ? parseFloat(savedJobEntry.job.salary).toLocaleString() : 'N/A'}</span>
                      </div>
                      {savedJobEntry.job?.deadline && (
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1 text-green-500" />
                          <span>Deadline: {new Date(savedJobEntry.job.deadline).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="card-actions justify-center sm:justify-end">
                  <button
                    onClick={() => handleRemoveJob(savedJobEntry.id)} 
                    className="btn btn-error text-white btn-sm px-4 py-2 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedJobs;