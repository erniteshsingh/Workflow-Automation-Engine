import React from "react";
import Navbar from "../../componenets/common/Navbar";
import Footer from "../../componenets/common/Footer";
import Hero from "../../componenets/landing/Hero";
import HowItworks from "../../componenets/landing/HowItworks";
import Features from "../../componenets/landing/Features";
import Cta from "../../componenets/landing/CTA";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />

      <HowItworks />

      <Cta />
      <Footer />
    </div>
  );
};

export default Home;
