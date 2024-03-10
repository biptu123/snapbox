import { useEffect, useState } from "react";
import Loader from "../Loader";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setToken } from "../../slices/userSlice";

const Spinner = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => prevValue - 1);
    }, 1000);
    if (count === 0) {
      navigate("/signin", { state: location.pathname });
    }
    return () => clearInterval(interval);
  }, [count, navigate, location]);

  return (
    <>
      <h1 className="text-center">Redirecting in {count} seconds...</h1>
      <Loader loading={true} />
    </>
  );
};

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // Check if user data and token exist in local storage
    const userFromLocalStorage = localStorage.getItem("user");
    const tokenFromLocalStorage = localStorage.getItem("token");

    if (userFromLocalStorage && tokenFromLocalStorage) {
      // Dispatch actions to set user data and token in Redux store
      dispatch(setUser(JSON.parse(userFromLocalStorage)));
      dispatch(setToken(tokenFromLocalStorage));
    }
    const authCheck = async () => {
      try {
        if (!user?.token) return; // Skip if no token available
        const response = await axios.get("/api/v1/auth/user-auth", {
          headers: {
            Authorization: `${user?.token}`,
          },
        });
        setIsAuthenticated(response.data.ok);
        dispatch(setUser(response.data.user));
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false); // Handle error by setting isAuthenticated to false
      }
    };
    authCheck();
  }, [user?.token]);

  return isAuthenticated ? <Outlet /> : <Spinner />;
};

export default PrivateRoute;
