import React from "react";
import image from "../images/mechanicImage.jpeg";
import "../styles/hero.css";

const Hero = () => {
  return (
    <section className="back">
      <section className="hero">
      <div className="hero-content">
        <h1 style={{color:"white"}}>
          Your Ride, <br />
          Our Responsibility
        </h1>
        <p style={{color:"white"}}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          tenetur doloremque molestias repellat minus asperiores in aperiam
          dolor, quaerat praesentium.
        </p>
      </div>
      <div className="hero-img" >
        <img
        style={{borderRadius:'20px'}}
          src={image}
          alt="hero"
        />
      </div>
    </section>
    </section>
  );
};

export default Hero;
