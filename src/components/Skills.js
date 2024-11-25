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
      technologies: ["React.JS", "Three.JS", "Next.JS", "React Native", "TypeScript"],
      image: "https://i.pinimg.com/736x/3d/0d/9e/3d0d9e03ccea6e96c7cb0aa131b993ed.jpg"
    },
    {
      title: "UI/UX Design",
      description: "Industry Leading Development with award-winning animations and latest technologies",
      technologies: ["Figma", "Adobe XD", "Sketch"],
      image: "https://i.pinimg.com/736x/5a/62/95/5a6295e6b5cce93a42e29c4cf86d726b.jpg"
    },
    {
      title: "Brand Identity & Visual Identity",
      description: "Industry Leading Development with award-winning animations and latest technologies",
      technologies: ["Branding", "Visual Identity"],
      image: "https://i.pinimg.com/736x/78/a8/e6/78a8e64d18e54fd5b1733e79cd4ac31b.jpg"
    }
  ];

  return (
    <div className="services-container">
      {services.map((service) => (
        <ServiceCard
          key={service.title}
          {...service}
        />
      ))}
    </div>
  );
};

export default Skills;