import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../FetchingApi/api-client";
import ErroAlert from "../ErorAlert/Eror";


const ActivateAccount = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { uid, token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .post("/auth/users/activation/", { uid, token })
      .then(() => {
        setMessage("Account activated successfully!");
        setTimeout(() => navigate("/login"), 2000); 
      })
      .catch((error) => {
        setError("Something went wrong. Please check your activation link.");
        console.log(error);
      });
  }, [uid, token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold">Account Activation</h2>

        {message && (
          <>
            <div role="alert" className="alert alert-success mt-4">
              <span>{message}</span>
            </div>
            <div className="text-center mt-4">
              <button onClick={() => navigate("/login")} className="btn btn-primary">
                Go to Login
              </button>
            </div>
          </>
        )}

        {error && <ErroAlert error={error} />}
      </div>
    </div>
  );
};

export default ActivateAccount;
