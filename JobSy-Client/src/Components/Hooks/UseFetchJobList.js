import { useEffect, useState } from "react";
import apiClient from "../FetchingApi/api-client";



const UseFetchJobList = () => {
  const [jobs, setjobs] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiClient.get("/jobs/");

        console.log(" Full category API response:", res.data);

        const data = Array.isArray(res.data)
          ? res.data
          : res.data.results || [];

        console.log(" Parsed categories:", data);

        setjobs(data);
      } catch (error) {
        console.error(" Failed to fetch categories:", error);
        setjobs([]);
      }
    };

    fetchCategories();
  }, []);

  return jobs;
};

export default UseFetchJobList;
