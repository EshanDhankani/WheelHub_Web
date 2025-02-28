import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Empty from "./Empty";
import fetchData from "../helper/apiCall";
import "../styles/user.css";
import { api } from "./Client/apiUrl";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const AdminUsedCar = () => {
  const [mechanics, setMechanics] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const getAllMechanics = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const temp = await fetchData(`/usedCar/get-used-cars-by-user`);
      setMechanics(temp);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      toast.error("Failed to load mechanics data.");
    }
  }, [dispatch]);

  const deleteCar = async (deleteCarId) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete?");
      if (confirm) {
        await axios.delete(`${api}/carAds/${deleteCarId}`, {
          withCredentials: true,
        });
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
          <h3 className="home-sub-heading">All Used Cars</h3>
          {mechanics.length > 0 ? (
            <div className="user-container">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Owner</th>

                    <th>Mileage</th>
                    <th>Exterior Color</th>
                    <th>Price</th>
                    <th>Picture</th>
                    <th>City</th>
                    <th>Car Info</th>

                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {mechanics?.map((ele, i) => (
                    <tr key={ele?._id}>
                      <td>{i + 1}</td>
                      <td>{ele?.email}</td>

                      <td>{ele?.mileage}</td>
                      <td>{ele?.exteriorColor}</td>
                      <td>{ele?.price}</td>
                      <td>
                        <img
                          className="user-table-pic"
                          src={
                            ele?.images.length > 0
                              ? `${api}/${ele?.images[0]}`
                              : "/default-avatar.png"
                          }
                        />
                      </td>
                      <td>{ele?.city}</td>
                      <td>{ele?.carInfo}</td>

                      <td className="select">
                        <button
                          className="btn user-btn"
                          onClick={() => {
                            deleteCar(ele?._id);
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

export default AdminUsedCar;
