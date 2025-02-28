import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Empty from "./Empty";
import fetchData from "../helper/apiCall";
import "../styles/user.css";
import { api } from './Client/apiUrl';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const AdminAccessory = () => {
  const [mechanics, setMechanics] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  
  const getAllMechanics = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const temp = await fetchData(`/accessory/get-accessory-by-user`);
      console.log("Fetched data:", temp); 
      setMechanics(temp);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      toast.error("Failed to load accessories data.");
    }
  }, [dispatch]);

  const deleteAcceccoryId = async (deleteAcceccoryId) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete?");
      if (confirm) {
        await toast.promise(
          axios.delete(`${api}/accessoryAds/${deleteAcceccoryId}`, {
            withCredentials: true,
          }),
          {
            success: "Accessory deleted successfully",
            error: "Unable to delete Accessory",
            loading: "Deleting Accessory...",
          }
        );
        getAllMechanics(); 
      }
    } catch (error) {
      toast.error("Failed to delete accessory. Please try again.");
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
          <h3 className="home-sub-heading">All User Accessories</h3>
          {mechanics.length > 0 ? (
            <div className="user-container">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Owner</th>
                    <th>Condition</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Picture</th>
                    <th>City</th>
                    <th>Accessory Info</th>
                    <th>Accessory Detail</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {mechanics.map((ele, i) => (
                    <tr key={ele?._id}>
                      <td>{i + 1}</td>
                      <td>{ele?.email}</td>
                      <td>{ele?.condition}</td>
                      <td>{ele?.category}</td>
                      <td>{ele?.price}</td>
                      <td>
                        <img
                          className="user-table-pic"
                          src={ele?.images.length > 0 ? `${api}/${ele?.images[0]}` : "/default-avatar.png"}
                          alt="Accessory"
                        />
                      </td>
                      <td>{ele?.city}</td>
                      <td>{ele?.accessoryInfo}</td>
                      <td>{ele?.accessoryDescription}</td>
                      <td className="select">
                        <button
                          className="btn user-btn"
                          onClick={() => deleteAcceccoryId(ele?._id)}
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

export default AdminAccessory;
