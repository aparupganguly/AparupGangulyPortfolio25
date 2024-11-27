import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const hoverCursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check for mobile devices by detecting screen width
    const checkMobileDevice = () => {
      setIsMobile(window.innerWidth <= 768);  // 768px or less is considered mobile/tablet
    };

    checkMobileDevice();  // Check on mount
    window.addEventListener('resize', checkMobileDevice); // Listen to window resize

    if (isMobile) return;  // Don't add event listeners on mobile devices

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;

      // Smooth follow effect
      gsap.to([cursorRef.current, hoverCursorRef.current], {
        x: x - 8,
        y: y - 8,
        ease: 'power2.out',
        duration: 0.1,
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const handleMouseClick = () => {
      // Click pulse effect using GSAP timeline
      gsap.timeline()
        .to(cursorRef.current, { scale: 1.5, opacity: 0.5, duration: 0.2, ease: 'power2.out' })
        .to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.2, ease: 'power2.in' });
    };

    const hoverElements = document.querySelectorAll('a, button, img, p, h1, h2, span, .hover-target');
    hoverElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);

    return () => {
      window.removeEventListener('resize', checkMobileDevice); // Cleanup on unmount
      if (isMobile) return; // Don't remove event listeners on mobile devices

      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseClick);
      hoverElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [isMobile]);

  // Don't render cursor on mobile or tablet devices
  if (isMobile) return null;

  return (
    <>
      {/* Main Cursor */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          backgroundColor: 'black',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
        }}
      />
      {/* Hover Cursor Mask */}
      <div
        ref={hoverCursorRef}
        style={{
          position: 'fixed',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          backgroundColor: '#24ff50',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: isHovering ? 1 : 0,
          transition: 'opacity 0.3s ease',
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
};

export default CustomCursor;
