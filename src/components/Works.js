import React, { useEffect, useRef } from "react";
import "../styles/Works.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const Works = () => {
  const works = [
    { id: 1, title: 'VR Experience', category: 'large', imageUrl: 'https://i.pinimg.com/enabled_lo/564x/52/6d/e7/526de71be3fafe6d388751c888f589cf.jpg' },
    { id: 2, title: 'Digital Profile', category: 'medium', imageUrl: 'https://i.pinimg.com/enabled_lo/564x/78/05/b5/7805b58809a73e76d19b531d4e1eaf9e.jpg' },
    { id: 3, title: 'Effects Project', category: 'medium', imageUrl: 'https://i.pinimg.com/736x/39/87/7e/39877e9faf76211f415c16db93888f69.jpg' },
    { id: 4, title: 'Interface Design', category: 'large', imageUrl: 'https://i.pinimg.com/564x/58/6a/50/586a50eac1c28cf097532a37dd3439ce.jpg' },
    { id: 5, title: 'Abstract Art', category: 'large', imageUrl: 'https://i.pinimg.com/enabled_lo/564x/e2/77/07/e27707bae5618730ed014fac9140417c.jpg' },
    { id: 6, title: 'Typography', category: 'medium', imageUrl: 'https://i.pinimg.com/736x/3f/30/fb/3f30fbfc6eae2f070c28e81bf0b8904d.jpg' },
    { id: 7, title: 'Product Design', category: 'large', imageUrl: 'https://i.pinimg.com/enabled_lo/564x/36/51/b3/3651b34ceefa14b8a660995c39d56de5.jpg' }
  ];

  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const workRefs = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial animation for title (immediately visible with subtle animation)
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

    // Parallax effect on all images (subtle for first two, stronger for others)
    workRefs.current.forEach((item, index) => {
      const image = item.querySelector('.works__image');
      const parallaxStrength = index < 2 ? -10 : -20; // Subtle parallax for first two

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

  return (
    <div className='worksContainer' ref={containerRef}>
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
              // Ensure initial visibility for first two items
              visibility: 'visible',
              // Optional: add initial opacity for smoother first render
              opacity: index < 2 ? 1 : 0
            }}
          >
            <div className="works__image-container">
              <img
                src={work.imageUrl}
                alt={work.title}
                className="works__image"
              />
              <div className="works__overlay">
                {/* <h3 className="works__item-title">{work.title}</h3> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Works;