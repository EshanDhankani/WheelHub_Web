import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Empty from "../components/Empty";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { setLoading } from "../redux/reducers/rootSlice";
import Loading from "../components/Loading";
import jwt_decode from "jwt-decode";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/notification.css";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const userId = useCallback(() => {
    try {
      return jwt_decode(localStorage.getItem("token"))?.userId;
    } catch {
      return null;
    }
  }, []);

  const getAllAppointments = useCallback(async () => {
    if (!userId()) return;
    try {
      dispatch(setLoading(true));
      const { data } = await axios.get(
        `/appointment/getallappointments?search=${userId()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAppointments(data);
    } catch (error) {
      console.error("Failed to fetch appointments", error);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    getAllAppointments();
  }, [getAllAppointments]);

  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      await toast.promise(
        axios.put(
          "/appointment/updateappointmentstatus",
          {
            appointid: appointmentId,
            status: status,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: `Appointment ${status} successfully`,

          loading: `${status} appointment...`,
        }
      );
      getAllAppointments();
    } catch (error) {}
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <section className="notif-section">
          <h2 className="page-heading" style={{ color: "white" }}>
            Your Appointments
          </h2>
          {appointments.length > 0 ? (
            <div className="notifications">
              <table className="notifications-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Mechanic</th>
                    <th>User</th>
                    <th>Appointment Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((ele, i) => (
                    <tr key={ele?._id}>
                      <td>{i + 1}</td>
                      <td>{`${ele?.mechanicId?.firstname} ${ele?.mechanicId?.lastname}`}</td>
                      <td>{`${ele?.userId?.firstname} ${ele?.userId?.lastname}`}</td>
                      <td>{ele?.date}</td>
                      <td>{ele?.time}</td>
                      <td>{ele?.status}</td>
                      {userId() === ele?.mechanicId?._id && (
                        <td>
                          <div className="action-buttons">
                            <button
                              className={`btn user-btn accept-btn ${
                                ["Completed", "Cancelled"].includes(ele?.status)
                                  ? "disable-btn"
                                  : ""
                              }`}
                              disabled={["Completed", "Cancelled"].includes(
                                ele?.status
                              )}
                              onClick={() =>
                                updateAppointmentStatus(ele._id, "Completed")
                              }
                            >
                              Accept
                            </button>
                            <button
                              className={`btn user-btn reject-btn ${
                                ["Completed", "Cancelled"].includes(ele?.status)
                                  ? "disable-btn"
                                  : ""
                              }`}
                              disabled={["Completed", "Cancelled"].includes(
                                ele?.status
                              )}
                              onClick={() =>
                                updateAppointmentStatus(ele._id, "Cancelled")
                              }
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      )}
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
      <Footer />
    </>
  );
};

export default Appointments;
