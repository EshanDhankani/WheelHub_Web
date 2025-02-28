import React from "react";
import "../styles/footer.css";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import { HashLink } from "react-router-hash-link";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{marginTop: 40}}>
      <div className="footer d-flex flex-col">
        <div className="footer-links">
         <ul>
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/mechanics"}>Mechanics</NavLink>
            </li>
            <li>
              <NavLink to={"/appointments"}>Appointments</NavLink>
            </li>
            <li>
              <NavLink to={"/notifications"}>Notifications</NavLink>
            </li>
            <li>
              <HashLink to={"/#contact"}>Contact Us</HashLink>
            </li>
            
          </ul>
        </div>
        <div >
           <ul className="sociallinks">
            <li className="facebook">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebookF />
              </a>
            </li>
            <li className="youtube">
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FaYoutube />
              </a>
            </li>
            <li className="instagram">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
