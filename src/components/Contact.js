import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import "../styles/Contact.css";
import TalkButton from "./buttons/TalkButton";

const Contact = () => {
  const [selected, setSelected] = useState([]);
  const buttonRefs = useRef({});

  const interests = [
    "Web Development",
    "UI/UX Design",
    "Web Animations",
    "Mobile Application Dev",
    "Visual Identity",
    "Branding",
  ];

  const handleSelect = (interest, index) => {
    setSelected((prevSelected) => {
      const newSelection = prevSelected.includes(interest)
        ? prevSelected.filter((item) => item !== interest) // Deselect
        : [...prevSelected, interest]; // Select

      // Animate the clicked button
      if (!prevSelected.includes(interest)) {
        gsap.to(buttonRefs.current[index], {
          backgroundColor: "#0A0A0A",
          color: "#FCF9F0",
          duration: 0.3, // Faster animation
          ease: "power1.out",
        });
      } else {
        gsap.to(buttonRefs.current[index], {
          backgroundColor: "#fff",
          color: "#0A0A0A",
          duration: 0.3,
          ease: "power1.out",
        });
      }
      return newSelection;
    });
  };

  const handleHover = (index) => {
    gsap.to(buttonRefs.current[index], {
      duration: 0.2,
      ease: "power1.out",
    });
  };

  const handleLeave = (index) => {
    gsap.to(buttonRefs.current[index], {
      duration: 0.2,
      ease: "power1.out",
    });
  };

  return (
    <div className='interest-form' id='contacts'>
      <div className='contactHeadingContainer'>
        <p className='contact-heading'>What interests you?</p>
        <p className='contact-heading2'>Let's Talk!</p>
      </div>
      <div className='button-container'>
        {interests.map((interest, index) => (
          <button
            key={index}
            ref={(el) => (buttonRefs.current[index] = el)}
            className={`interest-button ${
              selected.includes(interest) ? "selected" : ""
            }`}
            onClick={() => handleSelect(interest, index)}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => handleLeave(index)}>
            {interest}
          </button>
        ))}
      </div>
      <form className='form-section'>
        <input type='text' placeholder='Your Name' />
        <input type='email' placeholder='Email' />
        <input placeholder='Project Details'></input>
        <TalkButton name='Submit' />
      </form>
    </div>
  );
};

export default Contact;
