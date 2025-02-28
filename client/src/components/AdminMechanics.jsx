import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Empty from "./Empty";
import fetchData from "../helper/apiCall";
import "../styles/user.css";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const AdminMechanics = () => {
  const [mechanics, setMechanics] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const getAllMechanics = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const temp = await fetchData(`/mechanic/getallmechanics`);
      setMechanics(temp);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      toast.error("Failed to load mechanics data.");
    }
  }, [dispatch]);

  const deleteUser = async (userId) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete?");
      if (confirm) {
        await toast.promise(
          axios.put(
            "/mechanic/deletemechanic",
            { userId },
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          ),
          {
            success: "Mechanic deleted successfully",
            error: "Unable to delete mechanic",
            loading: "Deleting mechanic...",
          }
        );
        getAllMechanics();
      }
    } catch (error) {
      toast.error("Failed to delete mechanic. Please try again.");
    }
  };

  useEffect(() => {
    getAllMechanics();
  }, [getAllMechanics]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="user-section">
          <h3 className="home-sub-heading">All Mechanics</h3>
          {mechanics.length > 0 ? (
            <div className="user-container">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>

                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>

                    <th>Experience</th>
                    <th>Timing From</th>
                    <th>Timing To</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {mechanics?.map((ele, i) => (
                    <tr key={ele?._id}>
                      <td>{i + 1}</td>

                      <td>{ele?.userId?.firstname}</td>
                      <td>{ele?.userId?.lastname}</td>
                      <td>{ele?.userId?.email}</td>

                      <td>{ele?.experience}</td>
                      <td>{ele?.timingFrom}</td>
                      <td>{ele?.timingTo}</td>
                      <td className="select">
                        <button
                          className="btn user-btn"
                          onClick={() => {
                            deleteUser(ele?.userId?._id);
                          }}
                        >
                          Remove
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

export default AdminMechanics;
