import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import "../styles/Contact.css";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  const [formValid, setFormValid] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value };
      validateForm(newData);
      return newData;
    });
  };

  // Form validation logic
  const validateForm = (data) => {
    const isValid =
      data.user_name.trim() !== "" &&
      data.user_email.trim() !== "" &&
      data.message.trim() !== "";
    setFormValid(isValid);
  };

  // Send email using EmailJS
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_br8o8mc", "template_0w57pzm", form.current, {
        publicKey: "QvDUz2MLDTeJAeZZN",
      })
      .then(
        () => {
          alert("Response Submitted! We’ll get back in touch soon! ✅");
        },
        (error) => {
          console.error("FAILED...", error.text);
        }
      );
  };

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
        ? prevSelected.filter((item) => item !== interest)
        : [...prevSelected, interest];

      if (!prevSelected.includes(interest)) {
        gsap.to(buttonRefs.current[index], {
          backgroundColor: "#0A0A0A",
          color: "#FCF9F0",
          duration: 0.3,
        });
      } else {
        gsap.to(buttonRefs.current[index], {
          backgroundColor: "transparent",
          color: "#0A0A0A",
          duration: 0.3,
        });
      }
      return newSelection;
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
            className={`interest-button ${selected.includes(interest) ? "selected" : ""
              }`}
            onClick={() => handleSelect(interest, index)}
          >
            {interest}
          </button>
        ))}
      </div>
      <form className='form-section' ref={form} onSubmit={sendEmail}>
        <input
          type='text'
          name='user_name'
          placeholder='Your Name'
          onChange={handleChange}
        />
        <input
          type='email'
          name='user_email'
          placeholder='Email'
          onChange={handleChange}
        />
        <textarea
          name='message'
          placeholder='Project Details'
          onChange={handleChange}
          style={{ fontFamily: "Helvetica-Regular" }}
        />
        <div className='submitBtn'>
          <button className="talkButton" type='submit' disabled={!formValid}>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                zIndex: 1,
              }}>
              <p className='btnText'>Submit </p> {/* Use the name prop here */}
              <svg
                className='arrow'
                xmlns='http://www.w3.org/2000/svg'
                width='44'
                height='16'
                viewBox='0 0 44 20'
                fill='none'
                style={{
                  transition: "transform 0.3s",

                }}>
                <path
                  d='M0.829346 10.8394H41.8638M41.8638 10.8394L33.7583 1.21399M41.8638 10.8394L33.7583 18.9449'
                  stroke='#FCF9F0'
                  strokeWidth='2.02639'
                />
              </svg>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
