import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import TalkButton from "./buttons/TalkButton";
import "../styles/Hero.css";

const Hero = () => {
  const heroRef = useRef(null);
  const nameRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 1.2, ease: "power2.out" } });

    const nameElement = nameRef.current;
    const chars = nameElement.textContent.split('');
    nameElement.textContent = '';

    chars.forEach((char) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.className = 'hero-char';
      nameElement.appendChild(span);
    });

    const spanElements = nameElement.querySelectorAll('.hero-char');

    // Optimized load animation
    tl.fromTo(
      spanElements,
      { opacity: 0, y: 40 }, // Slightly smaller offset
      {
        opacity: 1,
        y: 0,
        duration: 0.5, // Shorter duration
        stagger: 0.05, // Reduced stagger time
        ease: "power2.out",
      }
    );

    // Sequential animation for other elements
    tl.fromTo(
      ".availableText",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, } // Small delay after hero name
    )
      .fromTo(
        ".leftText",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, }
      )
      .fromTo(
        ".scrollInstructionTextPc",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, }
      );

    // Smooth hover effects
    const handleMouseEnter = (event) => {
      if (window.matchMedia("(hover: hover)").matches) {
        const index = Array.from(spanElements).indexOf(event.target);
        gsap.to(spanElements, {
          y: (i) => (i >= index ? -6 : 0), // Smaller lift
          scale: (i) => (i >= index ? 1.06 : 1),
          rotationX: (i) => (i >= index ? 8 : 0),
          color: (i) => (i >= index ? '#4A90E2' : 'inherit'),
          textShadow: (i) => (i >= index ? "0 6px 12px rgba(74, 144, 226, 0.3)" : "none"),
          stagger: 0.02, // Reduced stagger
          ease: 'power2.out',
        });
      }
    };

    const handleMouseLeave = () => {
      if (window.matchMedia("(hover: hover)").matches) {
        gsap.to(spanElements, {
          y: 0,
          scale: 1,
          rotationX: 0,
          color: 'inherit',
          textShadow: "none",
          stagger: 0.02,
          ease: 'power2.out',
        });
      }
    };

    spanElements.forEach(span => {
      span.addEventListener('mouseenter', handleMouseEnter);
      span.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      spanElements.forEach(span => {
        span.removeEventListener('mouseenter', handleMouseEnter);
        span.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div ref={heroRef}>
      <div className="heroContainer">
        <p
          ref={nameRef}
          className="heroName"
          style={{
            cursor: 'pointer',
            userSelect: 'none',
            transition: 'all 0.3s ease',
          }}
        >
          APARUP GANGULY
        </p>

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
