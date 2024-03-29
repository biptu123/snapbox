import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../slices/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  const user = useSelector((state) => state.user);
  console.log(user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/v1/admin/all-users", {
          headers: {
            Authorization: `${user?.token}`,
          },
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const makeAdmin = async (_id) => {
    try {
      const response = await axios.get(`/api/v1/admin/make-admin/${_id}`, {
        headers: {
          Authorization: `${user?.token}`,
        },
      });
      if (response?.data?.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Error making admin:", error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <AdminLayout title="All Users">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Users Table</h3>
          <div className="card-tools">
            <ul className="pagination pagination-sm float-right"></ul>
          </div>
        </div>
        <div className="card-body p-0">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: 10 }}>#</th>
                <th>Username</th>
                <th>Email</th> <th>Action</th>
                <th style={{ width: 40 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role == 0 ? (
                      <button
                        className="btn btn-primary "
                        onClick={() => makeAdmin(user._id)}
                      >
                        Make Admin
                      </button>
                    ) : (
                      "Already an Admin"
                    )}
                  </td>
                  <td>
                    {user.isVerified ? (
                      <span className="badge bg-success">Active</span>
                    ) : (
                      <span className="badge bg-danger">Inactive</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UsersList;
