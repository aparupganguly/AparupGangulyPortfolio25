import React from 'react';
import { ReactLenis } from "@studio-freight/react-lenis";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Works from './components/Works';
import Skills from './components/Skills';
import Contact from './components/Contact';

const App = () => {
  return (
    <>
      <ReactLenis root>

        <Navbar />
        <Hero />
        <Works />
        <Skills />
        <Contact />
      </ReactLenis>
    </>
  );
};

export default App;
