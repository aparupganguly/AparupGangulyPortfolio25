import React, { useEffect, useRef } from 'react';
import '../styles/Skills.css';

const ServiceCard = ({ title, description, technologies, image }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cardRef.current.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cardRef} className="service-card">
      <div className="service-image-container">
        <img
          src={image}
          alt={title}
          className="service-image"
        />
      </div>

      <div className="service-content">
        <div className="service-header">
          <h2 className="service-title">{title}</h2>
          <div className="service-tags">
            {technologies.map((tech) => (
              <span key={tech} className="service-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <p className="service-description">
          {description}
        </p>
      </div>
    </div>
  );
};

const Skills = () => {
  const services = [
    {
      title: "Web & Mobile Application Development",
      description: "Industry Leading Development with 3D & 2D award-winning animations and latest technologies",
      technologies: ["React.JS", "Three.JS", "Next.JS", "React Native", "TypeScript", "GSAP",],
      image: "https://i.pinimg.com/originals/62/db/a2/62dba2ee08a822e6c5527a85bc7ad8b3.gif"
    },
    {
      title: "UI/UX Design",
      description: "Pixel Perfect UI/UX design with clean and minimal layouts, user-centric interfaces that combine aesthetics and functionality for memorable digital experiences  ",
      technologies: ["Figma", "Adobe XD", "Sketch"],
      image: "https://i.pinimg.com/originals/ee/0d/b9/ee0db9f28add47c4a2f7b3a4f953edb7.gif"
    },
    {
      title: "Brand Identity & Visual Identity",
      description: "distinctive brand identities that resonate and leave a lasting impression on your audience",
      technologies: ["Branding", "Visual Identity"],
      image: "https://i.pinimg.com/originals/40/e8/86/40e88600ca26f830049b09ae25f54ec3.gif"
    }
  ];

  return (
    <>

      <div className="services-container" id="Skills">
        <p className='workTitle' style={{ paddingBottom: '2em', }} >
          Top
          <span> Skills* </span>
        </p>
        {services.map((service) => (
          <ServiceCard
            key={service.title}
            {...service}
          />
        ))}
      </div>
    </>
  );
};

export default Skills;