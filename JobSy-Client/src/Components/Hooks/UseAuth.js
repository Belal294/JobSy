import { useEffect, useState, useCallback, useMemo } from "react";
import apiClient from "../FetchingApi/api-client";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingInitialAuth, setLoadingInitialAuth] = useState(true);

  const getToken = () => {
    const token = localStorage.getItem("authTokens");
    return token ? JSON.parse(token) : null;
  };

  const [authTokens, setAuthTokens] = useState(getToken());

  // ✅ Correct derived login status
  const isLoggedIn = useMemo(() => {
    return !!authTokens?.access && !!user;
  }, [authTokens, user]);

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

  const fetchUserProfile = useCallback(async (tokens) => {
    const currentTokens = tokens || authTokens;
    if (!currentTokens?.access) {
      setUser(null);
      return;
    }

    try {
      const response = await apiClient.get("/auth/users/me/", {
        headers: { Authorization: `JWT ${currentTokens.access}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error Fetching user profile:", error);
      logoutUser();
    }
  }, [authTokens]);

  useEffect(() => {
    const initializeAuth = async () => {
      setLoadingInitialAuth(true);
      const storedTokens = getToken();
      if (storedTokens?.access) {
        setAuthTokens(storedTokens);
        await fetchUserProfile(storedTokens);
      } else {
        setUser(null);
      }
      setLoadingInitialAuth(false);
    };

    initializeAuth();
  }, [fetchUserProfile]);

  const updateUserProfile = async (data) => {
    setErrorMsg("");
    try {
      await apiClient.put("/auth/users/me/", data, {
        headers: { Authorization: `JWT ${authTokens?.access}` },
      });
      await fetchUserProfile();
      return { success: true, message: "Profile updated successfully." };
    } catch (error) {
      return handleAPIError(error, "Failed to update profile.");
    }
  };

  const changePassword = async (data) => {
    setErrorMsg("");
    try {
      await apiClient.post("/auth/users/set_password/", data, {
        headers: { Authorization: `JWT ${authTokens?.access}` },
      });
      return { success: true, message: "Password changed successfully." };
    } catch (error) {
      return handleAPIError(error);
    }
  };

  const loginUser = async (userData) => {
    setErrorMsg("");
    try {
      const response = await apiClient.post("/auth/jwt/create/", userData);
      const newAuthTokens = response.data;
      setAuthTokens(newAuthTokens);
      localStorage.setItem("authTokens", JSON.stringify(newAuthTokens));
      await fetchUserProfile(newAuthTokens);
      return { success: true };
    } catch (error) {
      setErrorMsg(error.response?.data?.detail || "Login failed");
      return { success: false, message: error.response?.data?.detail || "Login failed" };
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

  const logoutUser = () => {
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
    isLoggedIn, // ✅ This is now a derived value from tokens & user
    errorMsg,
    loadingInitialAuth,
    loginUser,
    registerUser,
    logoutUser,
    updateUserProfile,
    changePassword,
    resetPassword,
    resetPasswordConfirm,
    fetchUserProfile,
  };
};

export default useAuth;
