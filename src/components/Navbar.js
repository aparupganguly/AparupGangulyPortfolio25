import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import axios from "axios";
import logo from "../assets/logo.png";
import "../styles/Navbar.css";

const Navbar = () => {
  const [stateAbbreviation, setStateAbbreviation] = useState("");
  const [time, setTime] = useState(new Date());
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const menuItemsRef = useRef([]);

  useEffect(() => {
    const fetchLocationAndTime = async () => {
      try {
        const ipResponse = await axios.get("https://ipapi.co/json/");
        const { region_code, timezone } = ipResponse.data;
        setStateAbbreviation(region_code);

        const timeResponse = await axios.get(
          `https://worldtimeapi.org/api/timezone/${timezone}`,
        );
        setTime(new Date(timeResponse.data.datetime));
      } catch (err) {
        setError("Beyond Limits");
      }
    };
    fetchLocationAndTime();
  }, []);

  const formatTime = (date) => {
    if (!(date instanceof Date)) return "Invalid date";
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes}${ampm}`;
  };

  const toggleMenu = () => {
    if (!menuOpen) {
      setMenuOpen(true);
      document.body.classList.add("no-scroll");

      setTimeout(() => {
        if (menuRef.current) {
          gsap.fromTo(
            menuRef.current,
            { opacity: 0, y: "-100%" },
            { opacity: 1, y: "0%", duration: 0.5 },
          );

          gsap.fromTo(
            menuItemsRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 },
          );
        }
      }, 0);
    } else {
      gsap.to(menuItemsRef.current, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
      });
      gsap.to(menuRef.current, {
        opacity: 0,
        y: "-100%",
        duration: 0.5,
        onComplete: () => {
          setMenuOpen(false);
          document.body.classList.remove("no-scroll");
        },
      });
    }
  };

  return (
    <div className='navbarContainer'>
      <img src={logo} alt='Aparup Ganguly' className='logo' />
      <div className='time'>
        {error ? (
          <p>{error}</p>
        ) : (
          <p>
            {stateAbbreviation} - {formatTime(time)}
          </p>
        )}
      </div>

      <p className='menu' onClick={toggleMenu}>
        menu
      </p>

      {menuOpen && (
        <div className='fullscreenMenu' ref={menuRef}>
          <p className='close' onClick={toggleMenu}>
            close
          </p>
          <div className='menuItems'>
            <a href='#workContainerId' style={{ textDecoration: "none" }} onClick={toggleMenu}>
              <p>Projects</p>
            </a>

            <a href='#Skills' style={{ textDecoration: "none" }} onClick={toggleMenu}>
              <p>Skills</p>
            </a>
            <a href='#contacts' style={{ textDecoration: "none" }} onClick={toggleMenu}>
              <p>Contact</p>
            </a>
            <a href='https://linktr.ee/aparupganguly'target="_blank" style={{ textDecoration: "none" }} onClick={toggleMenu}>
              <p>Socials</p>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
