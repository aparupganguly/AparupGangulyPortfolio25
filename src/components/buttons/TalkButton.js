import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const TalkButton = () => {
  const buttonRef = useRef(null);
  const contentRef = useRef(null);
  const rippleRef = useRef(null);
  const particlesRef = useRef([]);
  const [isHovered, setIsHovered] = useState(false);

  // Text scramble effect
  // const scrambleText = (target, originalText) => {
  //   const letters = "APARUPGANGULY";
  //   let iteration = 0;
    
  //   const interval = setInterval(() => {
  //     target.innerText = originalText
  //       .split("")
  //       .map((letter, index) => {
  //         if(index < iteration) {
  //           return originalText[index];
  //         }
  //         return letters[Math.floor(Math.random() * 26)]
  //       })
  //       .join("");
      
  //     if(iteration >= originalText.length) clearInterval(interval);
  //     iteration += 1/3;
  //   }, 30);
  // };

  // Create particle
  const createParticle = (x, y) => {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: fixed;
      pointer-events: none;
      width: 4px;
      height: 4px;
      background: #FCF9F0;
      border-radius: 50%;
      z-index: 99;
    `;
    document.body.appendChild(particle);
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = 1 + Math.random() * 2;
    const dx = Math.cos(angle) * velocity;
    const dy = Math.sin(angle) * velocity;
    
    gsap.fromTo(particle, 
      {
        x: x,
        y: y,
        opacity: 1,
        scale: 1
      },
      {
        duration: 1,
        x: x + dx * 50,
        y: y + dy * 50,
        opacity: 0,
        scale: 0,
        ease: "power2.out",
        onComplete: () => particle.remove()
      }
    );
  };

  useEffect(() => {
    const button = buttonRef.current;
    const content = contentRef.current;
    const ripple = rippleRef.current;
    const textElement = button.querySelector('.btnText');
    const originalText = textElement.innerText;
    let bounds;
    let mouseX = 0;
    let mouseY = 0;
    let buttonX = 0;
    let buttonY = 0;
    
    const magneticLoop = () => {
      if (!bounds) return;
      
      const deltaX = mouseX - buttonX;
      const deltaY = mouseY - buttonY;
      
      buttonX += deltaX * 0.1;
      buttonY += deltaY * 0.1;
      
      gsap.set(content, {
        x: buttonX * 0.2,
        y: buttonY * 0.2
      });
      
      requestAnimationFrame(magneticLoop);
    };
    
    const mouseMove = (e) => {
      const { clientX, clientY } = e;
      mouseX = clientX - bounds.left - bounds.width / 2;
      mouseY = clientY - bounds.top - bounds.height / 2;
      
      gsap.to(ripple, {
        x: clientX - bounds.left,
        y: clientY - bounds.top,
        opacity: 0.2,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      
      if (Math.random() > 0.8) {
        createParticle(clientX, clientY);
      }
    };
    
    const mouseEnter = (e) => {
      bounds = button.getBoundingClientRect();
      setIsHovered(true);
      magneticLoop();
      
      gsap.to(content, {
        scale: 1.04,
        duration: 0.3,
        ease: "power2.out"
      });
      
      // scrambleText(textElement, originalText);
      
      gsap.set(ripple, {
        scale: 0,
        opacity: 0.5
      });
    };
    
    const mouseLeave = () => {
      setIsHovered(false);
      bounds = null;
      
      gsap.to(content, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      });
      
      gsap.to(ripple, {
        opacity: 0,
        scale: 0,
        duration: 0.3,
        ease: "power2.in"
      });
      
      textElement.innerText = originalText;
    };

    button.addEventListener("mouseenter", mouseEnter);
    button.addEventListener("mousemove", mouseMove);
    button.addEventListener("mouseleave", mouseLeave);

    return () => {
      button.removeEventListener("mouseenter", mouseEnter);
      button.removeEventListener("mousemove", mouseMove);
      button.removeEventListener("mouseleave", mouseLeave);
    };
  }, []);

  return (
    <div 
      ref={buttonRef} 
      className="talkButton"
      style={{ 
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div 
        ref={rippleRef}
        style={{
          position: 'absolute',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: '#FCF9F0',
          opacity: 0,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none'
        }}
      />
      
      <div 
        ref={contentRef} 
        style={{ 
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',  // Added gap between text and arrow
          zIndex: 1
        }}
      >
        <p className="btnText">Let's talk</p>
        <svg 
          className="arrow"
          xmlns='http://www.w3.org/2000/svg'
          width='44'
          height='16'
          viewBox='0 0 44 20'
          fill='none'
          style={{
            transition: 'transform 0.3s',
            transform: isHovered ? 'translateX(5px)' : 'none'
          }}
        >
          <path
            d='M0.829346 10.8394H41.8638M41.8638 10.8394L33.7583 1.21399M41.8638 10.8394L33.7583 18.9449'
            stroke='#FCF9F0'
            strokeWidth='2.02639'
          />
        </svg>
      </div>
    </div>
  );
};

export default TalkButton;