import React from 'react';
import { ReactLenis } from "@studio-freight/react-lenis";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Works from './components/Works';
import Skills from './components/Skills';
import Contact from './components/Contact';
import CustomCursor from "./components/cursor/CustomCursor";
import Footer from './components/Footer';
const App = () => {
  return (
    <>
      <ReactLenis root>
        <CustomCursor />
        <Navbar />
        <Hero />
        <Works />
        <Skills />
        <Contact />
        <Footer />

      </ReactLenis>
    </>
  );
};

export default App;

