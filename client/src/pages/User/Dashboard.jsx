import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../slices/userSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Settings from "./Settings";
import PastInvoices from "./PastInvoices";

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const [cardInfo, setCardInfo] = useState(null);
  const [payments, setPayments] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };
  const location = useLocation();

  useEffect(() => {
    const getCardInfo = async () => {
      try {
        const response = await axios.get(
          `/api/v1/user/cardinfo/${user.username}`
        );
        if (response.data.success) {
          setCardInfo(response.data.cardInfo);
        }
      } catch (error) {
        setCardInfo(null);
      }
    };
    const getPayments = async () => {
      try {
        const response = await axios.get(`/api/v1/user/payments/${user._id}`);
        if (response.data.success) {
          setPayments(response.data.payments);
        }
      } catch (error) {
        setPayments([]);
      }
    };
    if (user.username) {
      getCardInfo();
      getPayments();
    } else {
      navigate("/");
    }
  }, [user.username]);

  return (
    <Layout>
      <div className="">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Profile</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
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
                        src={user?.image?.url || "../../dist/img/avatar5.png"}
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
                    </ul>
                    {/* Manage card button */}
                    {user?.card && (
                      <>
                        <a
                          onClick={() => navigate(`/${user?.username}`)}
                          className="btn btn-outline-secondary btn-block"
                        >
                          <b>Your Card</b>
                        </a>
                        <a
                          onClick={() =>
                            navigate("/manage-card", {
                              state: location.pathname,
                            })
                          }
                          className="btn btn-outline-success btn-block"
                        >
                          <b>Manage Card</b>
                        </a>
                      </>
                    )}

                    {/* Logout button */}
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
                          <table className="table table-bordered table-hover text-dark">
                            <thead className="thead-light">
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Service</th>
                                <th scope="col">Started At</th>
                                <th scope="col">Expires At</th>
                              </tr>
                            </thead>
                            <tbody>
                              {cardInfo && (
                                <tr>
                                  <th scope="row">1.</th>
                                  <td>Smart B Card</td>
                                  <td>
                                    {new Date(
                                      cardInfo?.starting_date
                                    ).toLocaleDateString(undefined, {
                                      year: "2-digit",
                                      month: "short",
                                      day: "numeric",
                                    })}
                                  </td>
                                  <td>
                                    {new Date(
                                      cardInfo?.expiry_date
                                    ).toLocaleDateString(undefined, {
                                      year: "2-digit",
                                      month: "short",
                                      day: "numeric",
                                    })}
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      {payments && <PastInvoices payments={payments} />}
                      <Settings />
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
