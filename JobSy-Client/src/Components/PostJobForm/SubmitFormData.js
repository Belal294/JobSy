import apiClient from "../FetchingApi/api-client";

const submitFormData = async (formData, authToken) => {
  const dataToSend = new FormData();

  console.log(" Token being sent:", authToken);

  for (const key in formData) {
    // Exclude file fields (logo_image, company_image) from the initial loop as they are handled separately below
    // Also, exclude null or empty string values, unless you explicitly want to send them
    if (key !== "logo_image" && key !== "company_image" && formData[key] !== null && formData[key] !== "") {
      dataToSend.append(key, formData[key]);
    }
  }

  // Append file fields specifically
  if (formData.logo_image) {
    dataToSend.append("logo_image", formData.logo_image); // Matches serializer field
  }
  if (formData.company_image) {
    dataToSend.append("company_image", formData.company_image); // Matches serializer field
  }

  try {
    const config = {
      headers: {
        Authorization: `JWT ${authToken}`, 
        
      },
    };

    const response = await apiClient.post("/jobs/", dataToSend, config);

    console.log(" Form submitted successfully:", response.data);

    return { success: true, data: response.data };
  } catch (error) {
    console.error(" Error submitting form:", error);

    return {
      success: false,
      error:
        error.response?.data?.detail ||
        JSON.stringify(error.response?.data) || 
        error.message ||
        "Unknown error occurred",
    };
  }
};

export default submitFormData;