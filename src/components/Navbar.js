import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import "../styles/Navbar.css";
import ThreeDModel from "./models/ThreeDModel";

const Navbar = () => {
  const [state, setState] = useState("");
  const [stateAbbreviation, setStateAbbreviation] = useState("");
  const [time, setTime] = useState(new Date()); // Initialize as a Date object
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLocationAndTime = async () => {
      try {
        // Get user's IP address and location details
        const ipResponse = await axios.get("https://ipapi.co/json/");
        const { region, region_code, timezone } = ipResponse.data;

        setState(region);
        setStateAbbreviation(region_code); // Use region_code for the state abbreviation

        // Fetch the current time using worldtimeapi.org based on the timezone
        const timeResponse = await axios.get(
          `https://worldtimeapi.org/api/timezone/${timezone}`,
        );
        const currentTime = new Date(timeResponse.data.datetime); // Create a Date object from the response
        setTime(currentTime);

        // Update time every minute
        const intervalId = setInterval(() => {
          setTime((prevTime) => new Date(prevTime.getTime() + 60000)); // Add one minute
        }, 60000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
      } catch (err) {
        setError("Beyond Limits");
      }
    };

    fetchLocationAndTime();
  }, []);

  // Format time without seconds and include AM/PM
  const formatTime = (date) => {
    if (!(date instanceof Date)) {
      return "Invalid date"; // Handle the case where date is not valid
    }

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM"; // Determine AM/PM

    hours = hours % 12; // Convert to 12-hour format
    hours = hours ? hours : 12; // The hour '0' should be '12'

    return `${hours}:${minutes}${ampm}`; // Format the time
  };

  return (
    <div className='navbarContainer'>
      <img src={logo} alt='Aparup Ganguly' className='logo' />
      <div className='time'>
        {error ? (
          <p>{error}</p>
        ) : (
          <p>
            {stateAbbreviation}-{formatTime(time)}
          </p>
        )}
      </div>

      <p className='menu'>menu</p>
    </div>
  );
};

export default Navbar;
