import React from "react";
import "../css/Landing.css"; // Import your CSS file for styling
import LandingCoverPhoto from "../assets/img/landing-cover.png";

export const Landing = () => {
  return (
    <div className="landing-container">
      <div className="left-grid">
        <h1>From Zero to Hero: Unleash Your Digital Potential</h1>
        <p className="text-body">
          Welcome to <strong>Premium Coding for Kids</strong> - The best way to
          <strong> get started</strong> with <strong>programming</strong> for
          kids! With a focus on nurturing curiosity, critical thinking, and
          problem-solving skills, we empower students to reach their full
          potential and make fun and <strong>interactive computer games</strong>
          . Join us and elevate your child's education to new heights.
        </p>
        <button className="cta-button">Book a Free Trial Class</button>
      </div>
      <div className="right-grid">
        <img src={LandingCoverPhoto} alt="Visual Patterns" />
        {/* Add any additional content for the right-grid */}
      </div>
    </div>
  );
};
