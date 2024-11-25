import { useRef, useState, useEffect } from "react";
import gsap from "gsap";  // Import gsap here
import axios from "axios";
import logo from "../assets/logo.png";
import "../styles/Navbar.css";


const Navbar = () => {
  const [state, setState] = useState("");
  const [stateAbbreviation, setStateAbbreviation] = useState("");
  const [time, setTime] = useState(new Date());
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);  // Create a ref for the menu

  useEffect(() => {
    const fetchLocationAndTime = async () => {
      try {
        const ipResponse = await axios.get("https://ipapi.co/json/");
        const { region, region_code, timezone } = ipResponse.data;

        setState(region);
        setStateAbbreviation(region_code);

        const timeResponse = await axios.get(
          `https://worldtimeapi.org/api/timezone/${timezone}`
        );
        const currentTime = new Date(timeResponse.data.datetime);
        setTime(currentTime);

        const intervalId = setInterval(() => {
          setTime((prevTime) => new Date(prevTime.getTime() + 60000));
        }, 60000);

        return () => clearInterval(intervalId);
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
    setMenuOpen(!menuOpen);
    document.body.classList.toggle("no-scroll", !menuOpen); // Disable/enable scrolling

    // Animate the menu open or close
    if (!menuOpen) {
      // Smooth reveal effect with GSAP
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: "-100%" }, // Initial hidden state (above the screen)
        { opacity: 1, y: "0", duration: 0.5 } // Animate to visible position
      );
    } else {
      // Smooth hide effect with GSAP
      gsap.to(menuRef.current, { opacity: 0, y: "-100%", duration: 0.5 }); // Animate to hidden
    }
  };


  return (
    <div className="navbarContainer">
      <img src={logo} alt="Aparup Ganguly" className="logo" />
      <div className="time">
        {error ? <p>{error}</p> : <p>{stateAbbreviation} - {formatTime(time)}</p>}
      </div>

      <p className="menu" onClick={toggleMenu}>menu</p>

      {/* Fullscreen menu */}
      {menuOpen && (
        <div className="fullscreenMenu">
          <p className="close" onClick={toggleMenu}>close</p>
          <div className="menuItems">
            <p>Projects</p>
            <p>About</p>
            <p>Contact</p>
          </div>
          <p className="footer">APARUP GANGULY</p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
