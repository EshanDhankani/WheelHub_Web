import React from "react";
import Contact from "../components/Contact";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import HomeCircles from "../components/HomeCircles";
import "../styles/hero.css"

const Home = () => {
  return (
    <>
      <div  >
        <Navbar />
        <Hero />
        <AboutUs />
        <HomeCircles />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default Home;
