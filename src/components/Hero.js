import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import TalkButton from "./buttons/TalkButton";
import "../styles/Hero.css";

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });

    tl.fromTo(
      ".heroName",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.2 }
    )
      .fromTo(
        ".availableText",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0 },
        "-=0.8" // Overlap animations
      )
      .fromTo(
        ".leftText",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0 },
        "-=0.6"
      )
      .fromTo(
        ".scrollInstructionTextPc",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0 },
        "-=0.4"
      );
  }, []);

  return (
    <div ref={heroRef}>
      <div className="heroContainer">
        <p className="heroName">APARUP GANGULY</p>

        <div className="availableText">
          <div className="circle pulse green"></div>
          <span>Available for Projects</span>
        </div>
      </div>
      <div className="heroSubTextContainer">
        <p className="leftText">
          Delivering seamless <span>WEB</span> and <span> Mobile App </span>{" "}
          experiences with captivating <span>Animations</span> and innovative{" "}
          <span>UI/UX</span> design
        </p>
        <p className="scrollInstructionTextPc" style={{ color: "#3D3D3D" }}>
          [ Would You Mind Scrolling? ]
        </p>
      </div>

      <TalkButton />
    </div>
  );
};

export default Hero;
