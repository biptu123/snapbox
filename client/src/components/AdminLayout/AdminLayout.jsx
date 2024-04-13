import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const AdminLayout = (props) => {
  return (
    <div>
      <div
        style={{
          height: "100vh",
          overflowY: "hidden",
        }}
      >
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0">{props.title}</h1>
                </div>
                {/* /.col */}
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active">{props.title}</li>
                  </ol>
                </div>
                {/* /.col */}
              </div>
              {/* /.row */}
            </div>
            {/* /.container-fluid */}
          </div>

          <section className="content">
            <div
              className="container-fluid"
              style={{
                height: "80vh",
                overflowY: "auto",
              }}
            >
              {props.children}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
