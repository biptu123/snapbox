import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../../components/Loader";
import Layout from "../../components/Layout/Layout";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/v1/auth/signup", {
        username,
        email,
        password,
      });
      setLoading(false);

      toast.success(response.data.message);
      if (response.data.success) {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }

      // Optionally, you can redirect the user to another page upon successful signup
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message);
      setLoading(false);
    }
    setLoading(false);
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
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 p-3 bg-secondary rounded">
              <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4 form-floating">
                  <input
                    type="text"
                    id="username"
                    className="form-control form-control "
                    placeholder="Enter a valid user name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label className="form-label" htmlFor="username">
                    Username
                  </label>
                </div>
                {/* Email input */}
                <div className="form-outline mb-4  form-floating">
                  <input
                    type="email"
                    id="email"
                    className="form-control form-control"
                    placeholder="Enter a valid email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="form-label" htmlFor="email">
                    Email address
                  </label>
                </div>
                {/* Password input */}
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
                <div className="form-outline mb-4  form-floating">
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Enter password"
                    className="form-control form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <label className="form-label" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                </div>
                <div className="d-flex justify-content-around align-items-center mb-4">
                  {/* Checkbox */}
                  Already registered <Link to="/signin">Signin now</Link>
                </div>
                {/* Submit button */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                >
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Signup;
