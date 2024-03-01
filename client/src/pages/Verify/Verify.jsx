import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const { token } = useParams(); // Retrieve the token from URL params

  const navigate = useNavigate();

  useEffect(() => {
    // Make a request to your backend to verify the token
    const verifyToken = async () => {
      try {
        const response = await axios.get(`/api/v1/auth/verify/${token}`);
        toast.success(response.data.message);
        if (response.data.success) {
          setTimeout(() => {
            navigate("/signin");
          }, 1000);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    };

    verifyToken();
  }, [token]);

  return <div>Verifying...</div>;
};

export default Verify;
