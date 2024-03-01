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
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      navigate("/signin", {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location]);

  return (
    <>
      <h1 className="text-center">Redirecting in {count} second...</h1>
      <Loader loading={true} />
    </>
  );
};

export default function AdminRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    const tokenFromLocalStorage = localStorage.getItem("token");

    if (userFromLocalStorage && tokenFromLocalStorage) {
      // Dispatch actions to set user data and token in Redux store
      dispatch(setUser(JSON.parse(userFromLocalStorage)));
      dispatch(setToken(tokenFromLocalStorage));
    }
    const authCheck = async () => {
      try {
        const response = await axios.get(`/api/v1/auth/admin-auth`, {
          headers: {
            Authorization: `${user?.token}`,
          },
        });
        setIsAuthenticated(response.data.ok);
      } catch (error) {}
    };
    authCheck();
  }, [user?.token]);

  return isAuthenticated ? <Outlet /> : <Spinner />;
}
