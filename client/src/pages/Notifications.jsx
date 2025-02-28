import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/notification.css";
import Empty from "../components/Empty";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import fetchData from "../helper/apiCall";
import { setLoading } from "../redux/reducers/rootSlice";
import Loading from "../components/Loading";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const getAllNotif = async () => {
    try {
      dispatch(setLoading(true));
      const temp = await fetchData(`/notification/getallnotifs`);
      setNotifications(temp);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getAllNotif();
  }, [dispatch]);

  return (
    <>
      <div className="Notify">
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <section className="notif-section">
          <h2 className="page-heading" style={{color: "white"}}>Your Notifications</h2>
          {notifications.length > 0 ? (
            <div className="notifications">
              <table className="notifications-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Content</th>
                    <th>Date</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {notifications.map((notif, i) => (
                    <tr key={notif._id}>
                      <td>{i + 1}</td>
                      <td>{notif.content}</td>
                      <td>{notif.updatedAt.split("T")[0]}</td>
                      <td>{notif.updatedAt.split("T")[1].split(".")[0]}</td>
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
      </div>
      
      
      <Footer />
    </>
  );
};

export default Notifications;


