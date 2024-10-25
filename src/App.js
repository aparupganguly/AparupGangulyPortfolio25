import React from 'react';
import { ReactLenis } from "@studio-freight/react-lenis";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Works from './components/Works';
import ThreeDModel from './components/models/ThreeDModel';
import Skills from './components/Skills';

const App = () => {
  return (
    <>
      <ReactLenis root>
        <Navbar />
        <Hero />
        <Works />
        <Skills />
      </ReactLenis>
    </>
  );
};

export default App;
