import { useEffect, useState, useCallback } from "react";
import apiClient from "../FetchingApi/api-client";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const getToken = () => {
    const token = localStorage.getItem("authTokens");
    return token ? JSON.parse(token) : null;
  };

  const [authTokens, setAuthTokens] = useState(getToken());

  const handleAPIError = (error, defaultMessage = "Something Went Wrong! Try Again") => {
    console.error(error);
    if (error.response && error.response.data) {
      const errorMessage = Object.values(error.response.data).flat().join("\n");
      setErrorMsg(errorMessage);
      return { success: false, message: errorMessage };
    }
    setErrorMsg(defaultMessage);
    return { success: false, message: defaultMessage };
  };

  const fetchUserProfile = useCallback(async () => {
    if (!authTokens?.access) return;
    try {
      const response = await apiClient.get("/auth/users/me/", {
        headers: { Authorization: `JWT ${authTokens.access}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error Fetching user", error);
      logout();
    }
  }, [authTokens]);

  useEffect(() => {
    if (authTokens) fetchUserProfile();
    else setUser(null);
  }, [authTokens, fetchUserProfile]);

  const updateUserProfile = async (data) => {
    setErrorMsg("");
    try {
      await apiClient.put("/auth/users/me/", data, {
        headers: { Authorization: `JWT ${authTokens?.access}` },
      });
    } catch (error) {
      return handleAPIError(error);
    }
  };

  const changePassword = async (data) => {
    setErrorMsg("");
    try {
      await apiClient.post("/auth/users/set_password/", data, {
        headers: { Authorization: `JWT ${authTokens?.access}` },
      });
    } catch (error) {
      return handleAPIError(error);
    }
  };

  const loginUser = async (userData) => {
    setErrorMsg("");
    try {
      const response = await apiClient.post("/auth/jwt/create/", userData);
      setAuthTokens(response.data);
      localStorage.setItem("authTokens", JSON.stringify(response.data));
      await fetchUserProfile();
      return true;
    } catch (error) {
      setErrorMsg(error.response?.data?.detail || "Login failed");
      return false;
    }
  };

  const registerUser = async (userData) => {
    setErrorMsg("");
    try {
      await apiClient.post("/auth/users/", userData);
      return {
        success: true,
        message: "Registration successful. Check your email to activate your account.",
      };
    } catch (error) {
      return handleAPIError(error, "Registration failed. Please try again");
    }
  };

  const logout = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  const resetPassword = async (data) => {
    setErrorMsg("");
    try {
      await apiClient.post("/auth/users/reset_password/", data);
      return {
        success: true,
        message: "Password reset email sent. Please check your inbox.",
      };
    } catch (error) {
      return handleAPIError(error, "Failed to send password reset email.");
    }
  };

  const resetPasswordConfirm = async (data) => {
    setErrorMsg("");
    try {
      await apiClient.post("/auth/users/reset_password_confirm/", data);
      return {
        success: true,
        message: "Password has been reset successfully.",
      };
    } catch (error) {
      return handleAPIError(error, "Failed to reset password.");
    }
  };

  return {
    user,
    errorMsg,
    authTokens, 
    token: authTokens?.access, 
    loginUser,
    registerUser,
    logout,
    updateUserProfile,
    changePassword,
    resetPassword,
    resetPasswordConfirm,
  };
};

export default useAuth;
