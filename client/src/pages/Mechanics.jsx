import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/mechanics.css";
import fetchData from "../helper/apiCall";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/reducers/rootSlice";
import Empty from "../components/Empty";
import BookAppointment from "../components/BookAppointment";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Chat } from "@mui/icons-material";

const Mechanics = () => {
  const [mechanics, setMechanics] = useState([]);
  const [filteredMechanics, setFilteredMechanics] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);
  const token = localStorage.getItem("token") || "";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllDocs = async () => {
      dispatch(setLoading(true));
      try {
        const data = await fetchData(`/mechanic/getallmechanics`);
        setMechanics(data);
        setFilteredMechanics(data);
      } catch (error) {
        console.error("Error fetching mechanics:", error);
        toast.error("Failed to load mechanics. Please try again.");
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchAllDocs();
  }, [dispatch]);

  // Handle search/filter
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = mechanics.filter((mechanic) =>
      mechanic.location?.toLowerCase().includes(searchValue)
    );
    setFilteredMechanics(filtered);
  };

  const handleModal = (mechanic) => {
    if (!token) {
      return toast.error("You must 12 log in first");
    }
    setSelectedMechanic(mechanic);
    setModalOpen(true);
  };

  const handleViewDetail = (mechanic) => {
    navigate(`/mechanic/${mechanic._id}`, { state: { mechanic } });
  };

  const handleChat = (mechanicId) => {
    navigate(`/chat/${mechanicId}`);
  };

  return (
    <>
      <div className="mechanic">
        <Navbar />
        {loading && <Loading />}
        {!loading && (
          <section className="container-mechanics">
            <h2 className="page-heading">Our Mechanics</h2>

            <div className="search-bar mb-4">
              <input
                type="text"
                placeholder="Search by address"
                value={searchTerm}
                onChange={handleSearch}
                className="form-control"
              />
            </div>
            {filteredMechanics.length > 0 ? (
              <div className="mechanics-card-container">
                {filteredMechanics.map((ele) => (
                  <div
                    className="card mb-4 shadow-sm border-0 position-relative"
                    key={ele._id}
                  >
                    <div className="chat-icon-container">
                      <button
                        className="btn btn-light chat-icon"
                        onClick={() => handleChat(ele._id)}
                      >
                        <Chat />
                      </button>
                    </div>
                    <div className="card-body text-center">
                      <div className="card-img mb-3">
                        <img
                          src={
                            ele?.userId?.pic ||
                            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                          }
                          alt="profile"
                          className="rounded-circle img-fluid"
                        />
                      </div>
                      <h3 className="card-name h5 mb-3">
                        {ele?.userId?.firstname} {ele?.userId?.lastname}
                      </h3>
                      <p className="location text-muted">
                        <strong>Location: </strong>
                        {ele?.location || "N/A"}
                      </p>
                      <p className="experience text-muted">
                        <strong>Experience: </strong>
                        {ele?.experience ? `${ele.experience} yrs` : "N/A"}
                      </p>
                      <p className="phone text-muted">
                        <strong>Phone: </strong>
                        {ele?.phoneNumber || "N/A"}
                      </p>
                      <p className="timing text-muted">
                        <strong>Timing: </strong>
                        {ele?.timingFrom && ele?.timingTo
                          ? `${ele.timingFrom} - ${ele.timingTo}`
                          : "N/A"}
                      </p>
                      <p className="rating text-muted">
                        <strong>Fees: </strong> {ele?.fees || "N/A"}
                      </p>
                      <button
                        className="btn btn-primary btn-block mt-3"
                        onClick={() => handleViewDetail(ele)}
                      >
                        View Detail
                      </button>
                      <button
                        className="btn btn-primary btn-block mt-4"
                        onClick={() => handleModal(ele)}
                      >
                        Book Appointment
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Empty />
            )}
          </section>
        )}
        {modalOpen && selectedMechanic && (
          <BookAppointment setModalOpen={setModalOpen} ele={selectedMechanic} />
        )}
        <Footer />
      </div>
    </>
  );
};

export default Mechanics;
