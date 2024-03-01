import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import axios from "axios";
import Layout from "../../components/Layout/Layout.jsx";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../../slices/userSlice";

const Signin = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`/api/v1/auth/login`, {
        identifier,
        password,
      });

      setLoading(false);

      if (response.data.success) {
        toast.success(response.data.message);
        const { user, token } = response.data;

        // Dispatch actions to update Redux store
        dispatch(setUser(user));
        dispatch(setToken(token));

        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);

        setTimeout(() => {
          navigate("/user");
        }, 200);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="container-fluid">
        <Loader loading={loading} />
        <div className="container py-5">
          <div className="row d-flex align-items-center justify-content-center">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phone image"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 p-5 bg-secondary rounded">
              <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4  form-floating">
                  <input
                    type="text"
                    id="email"
                    className="form-control form-control"
                    placeholder="Enter a valid username or email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                  />
                  <label className="form-label" htmlFor="email">
                    Username or Email address
                  </label>
                </div>
                <div className="form-outline mb-4  form-floating">
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    className="form-control form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                </div>
                <div className="d-flex justify-content-around align-items-center mb-4">
                  Don't have an account <Link to="/signup">Register now</Link>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Signin;
