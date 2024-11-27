import React, { useEffect, useRef } from "react";
import "../styles/Works.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import work2 from "../assets/works/Work2.png";

const Works = () => {
  const works = [
    { id: 1, title: 'VR Experience', category: 'large', imageUrl: 'https://i.pinimg.com/originals/44/1e/32/441e328fd72158865ea1b983f0a80ba9.gif', url: 'https://www.example1.com' },
    { id: 2, title: 'Digital Profile', category: 'medium', imageUrl: work2, url: 'https://airpods-max-aparup.vercel.app/   ' },
    { id: 3, title: 'Effects Project', category: 'medium', imageUrl: 'https://i.pinimg.com/736x/39/87/7e/39877e9faf76211f415c16db93888f69.jpg', url: 'https://www.example3.com' },
    { id: 4, title: 'Interface Design', category: 'large', imageUrl: 'https://i.pinimg.com/564x/58/6a/50/586a50eac1c28cf097532a37dd3439ce.jpg', url: 'https://www.example4.com' },
    { id: 5, title: 'Abstract Art', category: 'large', imageUrl: 'https://i.pinimg.com/enabled_lo/564x/e2/77/07/e27707bae5618730ed014fac9140417c.jpg', url: 'https://www.example5.com' },
    { id: 6, title: 'Typography', category: 'medium', imageUrl: 'https://i.pinimg.com/736x/3f/30/fb/3f30fbfc6eae2f070c28e81bf0b8904d.jpg', url: 'https://www.example6.com' },
    { id: 7, title: 'Product Design', category: 'large', imageUrl: 'https://i.pinimg.com/enabled_lo/564x/36/51/b3/3651b34ceefa14b8a660995c39d56de5.jpg', url: 'https://www.example7.com' }
  ];

  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const workRefs = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial animation for title
    gsap.fromTo(titleRef.current,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        ease: "power2.out"
      }
    );

    // Initial animation for first two works
    const initialWorks = workRefs.current.slice(0, 2);
    gsap.fromTo(initialWorks,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.4,
        stagger: 0.2,
        ease: "power2.out"
      }
    );

    // Scroll animations for remaining works
    workRefs.current.slice(2).forEach((item, index) => {
      gsap.fromTo(item,
        {
          opacity: 0,
          y: 100,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          delay: index * 0.15 // Stagger effect
        }
      );
    });

    // Parallax effect on all images
    workRefs.current.forEach((item, index) => {
      const image = item.querySelector('.works__image');
      const parallaxStrength = index < 2 ? -10 : -20; // Adjusted strength

      gsap.to(image, {
        yPercent: parallaxStrength,
        ease: "none",
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleWorkClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className='worksContainer' id="workContainerId" ref={containerRef}>
      <p className='workTitle' ref={titleRef}>
        Featured
        <span> Work* </span>
      </p>
      <div className="works__grid">
        {works.map((work, index) => (
          <div
            key={work.id}
            ref={el => workRefs.current[index] = el}
            className={`works__item works__item--${work.category}`}
            style={{
              visibility: 'visible',
              opacity: index < 2 ? 1 : 0
            }}
            onClick={() => handleWorkClick(work.url)} // Add click handler
          >
            <div className="works__image-container">
              <img
                src={work.imageUrl}
                alt={work.title}
                className="works__image"
              />
              <div className="works__overlay">
                {/* Optional title overlay */}
                <h3 className="works__item-title">{work.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Works;
