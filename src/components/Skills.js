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
      image: "https://i.pinimg.com/originals/c4/37/12/c43712af49b76ffbf268dd254800624d.gif"
    },
    {
      title: "UI/UX Design",
      description: "Industry Leading Development with award-winning animations and latest technologies",
      technologies: ["Figma", "Adobe XD", "Sketch"],
      image: "https://i.pinimg.com/originals/79/06/59/7906595f1669df4c15a3b24e8a76d980.gif"
    },
    {
      title: "Brand Identity & Visual Identity",
      description: "Industry Leading Development with award-winning animations and latest technologies",
      technologies: ["Branding", "Visual Identity"],
      image: "https://i.pinimg.com/originals/0f/d9/46/0fd94656b3dded6e0aec40d63dd3fcb9.gif"
    }
  ];

  return (
    <>

      <div className="services-container" id = "Skills">
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