import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminDashboard = (props) => {
  const user = useSelector((state) => state.user);
  const [details, setDetails] = useState();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get("/api/v1/admin/get-details", {
          headers: {
            Authorization: `${user?.token}`,
          },
        });
        setDetails(response.data.details);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchDetails();
  }, []);
  return (
    <AdminLayout title="Dashboard">
      <div className="row">
        <div className="col-lg-3 col-6">
          {/* small box */}
          <div className="small-box bg-info">
            <div className="inner">
              <h3>{details?.unverified_payments}</h3>
              <p>Unverified Payments</p>
            </div>
            <div className="icon">
              <i className="ion ion-bag" />
            </div>
            <Link to="/admin/payments" className="small-box-footer">
              More info <i className="fas fa-arrow-circle-right" />
            </Link>
          </div>
        </div>
        {/* ./col */}
        <div className="col-lg-3 col-6">
          {/* small box */}
          <div className="small-box bg-success">
            <div className="inner">
              <h3>{details?.total_payments}</h3>
              <p>Total Payments</p>
            </div>
            <div className="icon">
              <i className="ion ion-stats-bars" />
            </div>
            <Link to="/admin/payments" className="small-box-footer">
              More info <i className="fas fa-arrow-circle-right" />
            </Link>
          </div>
        </div>
        {/* ./col */}
        <div className="col-lg-3 col-6">
          {/* small box */}
          <div className="small-box bg-warning">
            <div className="inner">
              <h3>{details?.users}</h3>
              <p>User Registrations</p>
            </div>
            <div className="icon">
              <i className="ion ion-person-add" />
            </div>
            <Link to="/admin/users" className="small-box-footer">
              More info <i className="fas fa-arrow-circle-right" />
            </Link>
          </div>
        </div>
        {/* ./col */}
        <div className="col-lg-3 col-6">
          {/* small box */}
          <div className="small-box bg-danger">
            <div className="inner">
              <h3>{details?.active_users}</h3>
              <p>Active User</p>
            </div>
            <div className="icon">
              <i className="ion ion-pie-graph" />
            </div>
            <Link to="/admin/users" className="small-box-footer">
              More info <i className="fas fa-arrow-circle-right" />
            </Link>
          </div>
        </div>
        {/* ./col */}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
