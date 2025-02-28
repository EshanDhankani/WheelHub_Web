import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import image from "../images/aboutimg.jpeg";
import "../styles/mechanicdetail.css";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import BookAppointment from "../components/BookAppointment";
import { toast } from "react-hot-toast";

const MechanicDetail = () => {
  const location = useLocation();
  const { mechanic } = location.state || {};
  const [modalOpen, setModalOpen] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          console.log(
            "User's live location:",
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {
          toast.error("Unable to fetch your live location");
          console.error("Geolocation error:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
    }
  }, []);

  if (!mechanic) {
    return <div className="error-message">Mechanic details not found!</div>;
  }

  const handleAppointment = () => {
    if (!token) {
      return toast.error("You must log in first");
    }
    setModalOpen(true);
  };

  const handleViewLocation = () => {
    if (mechanic?.location && userLocation) {
      const mechanicLocationQuery = encodeURIComponent(mechanic.location);
      const userLocationQuery = `${userLocation.latitude},${userLocation.longitude}`;

      const mapUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLocationQuery}&destination=${mechanicLocationQuery}&travelmode=driving`;
      window.open(mapUrl, "_blank");
    } else {
      toast.error("Location not available or unable to fetch user location");
    }
  };

  return (
    <div className="detail">
      <NavBar />
      <div className="container mt-5 mechanic-container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6 mechanic-image-container">
            <img
              className="img-fluid mechanic-image"
              src={mechanic?.userId?.pic || image}
              alt={`${mechanic?.userId?.firstname} ${mechanic?.userId?.lastname}`}
            />
          </div>

          <div className="col-lg-6 col-md-6 mechanic-info-container">
            <div className="d-flex flex-column justify-content-between h-100">
              <div>
                <h4 className="mechanic-name">
                  {mechanic?.userId?.firstname} {mechanic?.userId?.lastname}
                </h4>
                <ul className="list-unstyled mechanic-details">
                  <li>
                    <strong>Location:</strong> {mechanic?.location || "N/A"}
                  </li>
                  <li>
                    <strong>Experience:</strong> {mechanic?.experience || "N/A"}{" "}
                    yrs
                  </li>
                  <li>
                    <strong>Phone:</strong> {mechanic?.phoneNumber || "N/A"}
                  </li>
                  <li>
                    <strong>Timing:</strong>{" "}
                    {mechanic?.timingFrom && mechanic?.timingTo
                      ? `${mechanic.timingFrom} - ${mechanic.timingTo}`
                      : "N/A"}
                  </li>
                </ul>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="price">
                  Service Charge: <span className="price-value">RS: 500</span>
                  <br />
                </p>
                <div className="reviews">
                  <br />
                  Reviews: <span className="stars">★ 4.5</span>
                </div>
              </div>
              <Button
                variant="contained"
                className="book-appointment-button w-100 mb-1"
                onClick={handleViewLocation}
              >
                View Location & Path
              </Button>
              <Button
                variant="contained"
                className="book-appointment-button w-100 mb-1"
                onClick={handleAppointment}
              >
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      </div>

      {modalOpen && mechanic && (
        <BookAppointment setModalOpen={setModalOpen} ele={mechanic} />
      )}
      <Footer />
    </div>
  );
};

export default MechanicDetail;
