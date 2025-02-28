import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../Navbar";
import HomeSection from "./HomeSection";
import Experience from "./Experience";

export default function LandingPage() {


  return (
    <>
      <Navbar />
      <CssBaseline />
      <HomeSection imageSrc="./car-image.png" />
    
    
      <Experience />
    </>
  );
}
