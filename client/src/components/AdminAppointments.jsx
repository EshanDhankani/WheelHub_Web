import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Empty from "./Empty";
import fetchData from "../helper/apiCall";
import "../styles/user.css";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const getAllAppoint = async () => {
    try {
      dispatch(setLoading(true));
      const temp = await fetchData(`/appointment/getallappointments`);
      setAppointments(temp);
      dispatch(setLoading(false));
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const checkAndCompleteAppointments = async () => {
    const currentTime = new Date();

    for (let ele of appointments) {
      const appointmentTime = new Date(`${ele.date}T${ele.time}`);

      if (currentTime > appointmentTime && ele.status !== "Completed") {
        await complete(ele);
      }
    }
  };

  const complete = async (ele) => {
    try {
      await toast.promise(
        axios.put(
          "/appointment/completed",
          {
            appointid: ele?._id,
            mechanicId: ele?.mechanicId._id,
            mechanicname: `${ele?.userId?.firstname} ${ele?.userId?.lastname}`,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Appointment marked as completed successfully",
          error: "Unable to mark appointment as completed",
          loading: "Marking appointment as completed...",
        }
      );

      getAllAppoint();
    } catch (error) {
      console.error("Error completing appointment:", error);
    }
  };

  useEffect(() => {
    getAllAppoint();
  }, []);

  useEffect(() => {
    if (appointments.length > 0) {
      checkAndCompleteAppointments();
    }
  }, [appointments]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="user-section">
          <h3 className="home-sub-heading">All Appointments</h3>
          {appointments.length > 0 ? (
            <div className="user-container">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Mechanic</th>
                    <th>User</th>
                    <th>Appointment Date</th>
                    <th>Appointment Time</th>
                    <th>Booking Date</th>
                    <th>Booking Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((ele, i) => (
                    <tr key={ele?._id}>
                      <td>{i + 1}</td>
                      <td>
                        {ele?.mechanicId?.firstname +
                          " " +
                          ele?.mechanicId?.lastname}
                      </td>
                      <td>
                        {ele?.userId?.firstname + " " + ele?.userId?.lastname}
                      </td>
                      <td>{ele?.date}</td>
                      <td>{ele?.time}</td>
                      <td>{ele?.createdAt.split("T")[0]}</td>
                      <td>{ele?.updatedAt.split("T")[1].split(".")[0]}</td>
                      <td>{ele?.status}</td>
                      <td>
                        <button
                          className={`btn user-btn accept-btn ${
                            ele?.status === "Completed" ? "disable-btn" : ""
                          }`}
                          disabled={ele?.status === "Completed"}
                          onClick={() => complete(ele)}
                        >
                          Complete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Empty />
          )}
        </section>
      )}
    </>
  );
};

export default AdminAppointments;
