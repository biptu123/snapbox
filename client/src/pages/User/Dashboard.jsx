import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <Layout>
      <div className="" style={{ minHeight: "1604.44px" }}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Profile</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">User Profile</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                <div className="card card-primary card-outline">
                  <div className="card-body box-profile">
                    <div className="text-center">
                      <img
                        className="profile-user-img img-fluid img-circle"
                        src="../../dist/img/avatar5.png"
                        alt="User profile picture"
                      />
                    </div>
                    <h3 className="profile-username text-center">
                      {user.name || "Guest User"}
                    </h3>
                    <p className="text-muted text-center">{user.username}</p>
                    <ul className="list-group list-group-unbordered mb-3">
                      <li className="list-group-item">
                        <b>Joined at</b>{" "}
                        <a className="float-right">
                          {new Date(user.createdAt).toLocaleDateString(
                            undefined,
                            {
                              year: "2-digit",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </a>
                      </li>
                      <li className="list-group-item">
                        <b>Updated At</b>{" "}
                        <a className="float-right">
                          {new Date(user.updatedAt).toLocaleDateString(
                            undefined,
                            {
                              year: "2-digit",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </a>
                      </li>
                      <li className="list-group-item">
                        <b>Plans</b> <a className="float-right">No plans</a>
                      </li>
                    </ul>
                    <a
                      onClick={handleLogout}
                      className="btn btn-primary btn-block"
                    >
                      <b>Logout</b>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div className="card">
                  <div className="card-header p-2">
                    <ul className="nav nav-pills">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          href="#activity"
                          data-toggle="tab"
                        >
                          My membership
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="#timeline"
                          data-toggle="tab"
                        >
                          Past Invoice
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="#settings"
                          data-toggle="tab"
                        >
                          Settings
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body">
                    <div className="tab-content">
                      <div className="active tab-pane" id="activity">
                        <div className="card-body p-0">
                          <table className="table table-sm">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Level</th>
                                <th>Billing</th>
                                <th>Expiration</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1.</td>
                                <td>Free Plan</td>
                                <td>Free.</td>
                                <td>March 14, 2024</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="tab-pane" id="timeline">
                        <div className="card-body p-0">
                          <table className="table table-sm">
                            <thead>
                              <tr>
                                <th>Date</th>
                                <th>Level</th>
                                <th>Amount</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>February 13, 2024</td>
                                <td>Free Plan</td>
                                <td> INR 0.00</td>
                                <td>
                                  <span className="badge bg-success">Paid</span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="tab-pane" id="settings">
                        <form className="form-horizontal">
                          <div className="form-group row">
                            <label
                              htmlFor="inputName"
                              className="col-sm-2 col-form-label"
                            >
                              Name
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="email"
                                className="form-control"
                                id="inputName"
                                placeholder="Name"
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputName2"
                              className="col-sm-2 col-form-label"
                            >
                              Usename
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="inputName2"
                                placeholder="Name"
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputExperience"
                              className="col-sm-2 col-form-label"
                            >
                              Profile photo
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="file"
                                className="form-control"
                                id="inputExperience"
                                placeholder="profile_photo"
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="offset-sm-2 col-sm-10">
                              <button type="submit" className="btn btn-danger">
                                Edit profile
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Dashboard;
