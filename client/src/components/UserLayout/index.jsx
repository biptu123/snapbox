import React from "react";
import Header from "./Header";
import Sidemenu from "./Sidemenu";

const UserLayout = (props) => {
  return (
    <div>
      <div>
        <Header />
        <Sidemenu />
        <div className="content-wrapper">
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0">{props.title}</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active">{props.title}</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <section className="content">
            <div className="container-fluid">{props.children}</div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
