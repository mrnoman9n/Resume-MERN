import React from "react";

import Banner from "../components/Banner";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Testimonial from "../components/Testimonial";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Banner />

      <Hero />

      {/* Features */}
      <section id="feature">
        <Features />
      </section>

      {/* Testimonial */}
      <section id="testimonial">
        <Testimonial />
      </section>

      {/* Contact / CTA */}
      <section id="contact">
        <CallToAction />
      </section>

      <Footer />
    </div>
  );
};

export default Home;