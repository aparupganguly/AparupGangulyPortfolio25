import React from 'react';

const Footer = () => {
    return (
        <div style={{
            position: 'fixed',      // Sticks the footer to the bottom
            bottom: 0,              // Aligns it to the bottom of the viewport
            left: 0,
            width: '100%',          // Covers full width
            height: '5px',          // Thickness of the black line
            backgroundColor: '#000', // Black color
            margin: 0,
            padding: 0,
            boxSizing: 'border-box' // Ensures no extra spacing
        }}>
        </div>
    );
};

export default Footer;
