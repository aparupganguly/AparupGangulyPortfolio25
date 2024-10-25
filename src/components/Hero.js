import React from "react";
import TalkButton from "./buttons/TalkButton";
import "../styles/Hero.css";
import ThreeDModel from "./models/ThreeDModel";
const Hero = () => {
  return (
    <>
      <div className='heroContainer'>
        {/* <ThreeDModel /> */}
        <p className='heroName'>APARUP GANGULY</p>

        <div className='availableText'>
          <div className='circle pulse green'></div>
          <span>Available for Projects</span>
        </div>
      </div>
      <div className='heroSubTextContainer'>
        <p className='leftText'>
          Delivering seamless <span>WEB</span> and <span> Mobile App </span>{" "}
          experiences with captivating <span>Animations</span> and innovative{" "}
          <span>UI/UX</span> design
        </p>
        <p className='scrollInstructionTextPc' style={{ color: "#3D3D3D" }}>
          [ Would You Mind Scrolling? ]
        </p>
      </div>

      <TalkButton />
    </>
  );
};

export default Hero;
