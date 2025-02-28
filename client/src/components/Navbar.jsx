import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { HashLink } from "react-router-hash-link";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/reducers/rootSlice";
import { FiMenu } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import ProfileMenu from "./Client/ProfileMenu";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";

import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import Menu from "@mui/material/Menu";
import Slider from "react-slick";
import GoogleIcon from "@mui/icons-material/Google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { api } from "./Client/apiUrl";

import axios from "axios";
import {
  Home,
  Assignment,
  Notifications,
  Person,
  Dashboard,
  ContactMail,
  Login,
  AppRegistration,
  ChatBubble,
} from "@mui/icons-material";
// import VideoFileIcon from "@mui/icons-material/VideoFile";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import BorderHorizontalIcon from "@mui/icons-material/BorderHorizontal";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
const Navbar = () => {
  const [iconActive, setIconActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1200,
    arrows: false,
  };
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        console.log(decodedToken);

        setUser(decodedToken);
        console.log(user);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, [token]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const handleClosePopup = () => {
    setShowLoginPopup(false);
  };
  const handleMenuItemClick = (path) => {
    if (!user) {
      setShowLoginPopup(true);
    } else {
      navigate(path);
    }
    setAnchorEl(null);
  };
  const logoutFunc = () => {
    dispatch(setUserInfo({}));
    localStorage.removeItem("token");

    console.log(localStorage.getItem("token"));

    setToken("");
    setUser(null);
    navigate("/login");
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const handleGoogleLogin = () => {
    window.localStorage.setItem("redirectAfterLogin", "/PostAd");
    window.open(`${api}/auth/google`, "_self");
  };
  const handlePostAdClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDropdown = () => {
    setAnchorEl(null);
  };
  console.log(user);
  return (
    <header>
      <nav className={`navbar ${iconActive ? "nav-active" : ""}`}>
        <div className="nav-logo">
          <NavLink to="/">
            <img src="/logo2.png" alt="profile" className="user-avatar" />
            <span>{}</span>
          </NavLink>
        </div>
        <ul className="nav-links">
          {}
          {token && !user?.isAdmin && !user?.isMechanic ? (
            <>
              <li>
                <NavLink to="/UsedCars">
                  <div className="nav-item">
                    <LocalTaxiIcon className="nav-icon" />
                    <span>Used Cars</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/autoparts">
                  <div className="nav-item">
                    <CarRepairIcon className="nav-icon" />
                    <span>Auto Store</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to="">
                  <div onClick={handlePostAdClick} className="nav-item">
                    <BorderHorizontalIcon className="nav-icon" />
                    <span>Post Ads</span>
                  </div>
                </NavLink>
              </li>

              <li>
                <NavLink to="/mechanics">
                  <div className="nav-item">
                    <Assignment className="nav-icon" />
                    <span>Mechanics</span>
                  </div>
                </NavLink>
              </li>
              <li className="mt-1">
                <div className="nav-item">
                  <ProfileMenu
                    user={user ? user : { name: "" }}
                    onLogout={logoutFunc}
                  />
                </div>
              </li>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseDropdown}
              >
                <MenuItem onClick={() => handleMenuItemClick("/PostAd")}>
                  Sell Your Car
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("/AccessoryAd")}>
                  Sell Your Accessory
                </MenuItem>
              </Menu>
            </>
          ) : (
            ""
          )}

          {token && user?.isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/users">
                  <div className="nav-item">
                    <Dashboard className="nav-icon" />
                    <span>Dashboard</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <span className="btn" onClick={logoutFunc}>
                  Logout
                </span>
              </li>
            </>
          ) : token && user?.isMechanic ? (
            <>
              <li>
                <NavLink to="/appointments">
                  <div className="nav-item">
                    <Assignment className="nav-icon" />
                    <span>Appointments</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/notifications">
                  <div className="nav-item">
                    <Notifications className="nav-icon" />
                    <span>Notifications</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/chatpage">
                  <div className="nav-item">
                    <ChatBubble className="nav-icon" />
                    <span>Chat</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/mechanic-profile">
                  <div className="nav-item">
                    <Person className="nav-icon" />
                    <span>Profile</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <span className="btn" onClick={logoutFunc}>
                  Logout
                </span>
              </li>
            </>
          ) : !token && !user?.isAdmin && !user?.isMechanic ? (
            <>
              <li>
                <NavLink to="/UsedCars">
                  <div className="nav-item">
                    <LocalTaxiIcon className="nav-icon" />
                    <span>Used Cars</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/autoparts">
                  <div className="nav-item">
                    <CarRepairIcon className="nav-icon" />
                    <span>Auto Store</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to="">
                  <div onClick={handlePostAdClick} className="nav-item">
                    <BorderHorizontalIcon className="nav-icon" />
                    <span>Post Ads</span>
                  </div>
                </NavLink>
              </li>
         
              <li>
                <NavLink to="/mechanics">
                  <div className="nav-item">
                    <Assignment className="nav-icon" />
                    <span>Mechanics</span>
                  </div>
                </NavLink>
              </li>
              <li className="mt-1">
                <NavLink className="btn" to="/login">
                  <div className="nav-item">
                    <span>
                      Login <Login className="nav-icon ml-2" />
                    </span>
                  </div>
                </NavLink>
              </li>
              <li className="mt-1">
                <NavLink className="btn" to="/mechanic-register">
                  <div className="nav-item">
                    <span>
                      Join us <AppRegistration className="nav-icon ml-2" />
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* <li className="mt-1">
                <NavLink className="btn" to="/suggest-me">
                  <div className="nav-item">
                    <span>
                      Suggest Me <AppRegistration className="nav-icon ml-2" />
                    </span>
                  </div>
                </NavLink>
              </li> */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseDropdown}
              >
                <MenuItem onClick={() => handleMenuItemClick("/PostAd")}>
                  Sell Your Car
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("/AccessoryAd")}>
                  Sell Your Accessory
                </MenuItem>
              </Menu>
            </>
          ) : null}
        </ul>
      </nav>
      <div className="menu-icons">
        {!iconActive ? (
          <FiMenu className="menu-open" onClick={() => setIconActive(true)} />
        ) : (
          <RxCross1
            className="menu-close"
            onClick={() => setIconActive(false)}
          />
        )}
      </div>
      <Dialog open={showLoginPopup} onClose={handleClosePopup}>
        <IconButton
          aria-label="close"
          onClick={handleClosePopup}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Box textAlign="center" sx={{ maxWidth: 400 }}>
            <Slider {...sliderSettings}>
              <div>
                <img
                  src="/assets/1.jpg"
                  alt="Slide 1"
                  style={{ width: "80%", maxWidth: "150px", margin: "auto" }}
                />
                <Typography variant="body1">Save Your Favourite Ads</Typography>
              </div>
              <div>
                <img
                  src="/assets/2.jpg"
                  alt="Slide 2"
                  style={{ width: "80%", maxWidth: "150px", margin: "auto" }}
                />
                <Typography variant="body1">
                  Safely Connect With Buyers
                </Typography>
              </div>
              <div>
                <img
                  src="/assets/3.jpg"
                  alt="Slide 3"
                  style={{ width: "80%", maxWidth: "150px", margin: "auto" }}
                />
                <Typography variant="body1">Create Quick Alerts</Typography>
              </div>
            </Slider>

            <Typography variant="h6" component="div" gutterBottom></Typography>

            <Typography
              variant="body2"
              color="textSecondary"
              gutterBottom
            ></Typography>

            <Button
              startIcon={<GoogleIcon />}
              variant="outlined"
              fullWidth
              sx={{
                textTransform: "none",
                mb: 1,
                mt: 3,
              }}
              onClick={handleGoogleLogin}
            >
              Continue with Google
            </Button>

            <Typography variant="caption" display="block" sx={{ mt: 2 }}>
              By continuing, you agree to our{" "}
              <Link href="#">Terms of Service</Link> and{" "}
              <Link href="#">Privacy Policy</Link>.
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Navbar;
