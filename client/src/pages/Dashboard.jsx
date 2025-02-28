import React from "react";
import AdminApplications from "../components/AdminApplications";
import AdminAppointments from "../components/AdminAppointments";
import AdminUsedCar from "../components/AdminUsedCar";
import AdminMechanics from "../components/AdminMechanics"
import AdminAccessory from "../components/AdminAccessory";
import Sidebar from "../components/Sidebar";
import Users from "../components/Users";

const Dashboard = (props) => {
  const { type } = props;
  return (
    <>
      <section className="layout-section">
        <div className="layout-container">
          <Sidebar />
          {type === "users" ? (
            <Users />
          ) : type === "mechanics" ? (
            <AdminMechanics />
          ) : type === "applications" ? (
            <AdminApplications />
          ) : type == "cars" ?
            (
            
              < AdminUsedCar />
            )
            : type == "accessory" ?
            (
            
              < AdminAccessory />
            )
            : type === "appointments" ? (
              <AdminAppointments />
            ) : (
              <></>
            )}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
