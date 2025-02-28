import React from "react";
import image from "../images/aboutimg.jpeg";
import "../styles/about.css"

const AboutUs = () => {
  return (
    <>
      <div className="body " >
      <section className="container">
        <span className="page-heading about-heading mt-4">About Us</span>
        <div className="about ">
          <div className="hero-img aboutimgdiv">
            <img
              src={image}
              className="aboutimage"
              alt="hero"
            />
          </div>
          <div className="hero-content">
            <p >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae error culpa, esse beatae amet illo debitis blanditiis consectetur nemo, et minus at eos molestias nobis excepturi officia. Distinctio, et id?
              Lorem ipsum, dolor  alias autem repellendus reprehenderit, fugit et, est facere vitae voluptatum dolorum architecto accusantium rem vero quis quasi.
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Quibusdam tenetur doloremque molestias repellat minus asperiores
              in aperiam dolor, quaerat praesentium. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Voluptatibus, repudiandae! Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Provident
              quibusdam doloremque ex? Officia atque ab dolore? Tempore totam
              non ea!
            </p>
          </div>
        </div>
        </section>
      </div>
    </>
  );
};

export default AboutUs;
