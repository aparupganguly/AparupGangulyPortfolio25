import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, useGLTF } from '@react-three/drei';
import { gsap } from 'gsap';

const AnimatedModel = () => {
  const modelRef = useRef();
  const { scene } = useGLTF('/assets/logo.glb');

  useEffect(() => {
    console.log('Model loaded successfully from /assets/logo.glb');

    // Make the model's materials semi-transparent
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.transparent = false;
        child.material.opacity = 0.7;
      }
    });

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newScale = 1.5 + scrollY * 0.001;

      if (modelRef.current) {
        gsap.to(modelRef.current.scale, {
          x: newScale,
          y: newScale,
          z: newScale,
          duration: 0.5,
          ease: 'power2.out',

        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scene]);

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.2;
    }
  });

  if (!scene) {
    console.error('Error: Scene not loaded');
    return null;
  }

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={[1.5, 1.5, 1.5]}
      position={[0, -10, 0]}
    />
  );
};

useGLTF.preload('/assets/logo.glb');

const LoadingFallback = () => {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};

const ThreeDModel = () => {
  return (
    <>
      <div
        style={{

          height: "20vh",
          position: "fixed",
          // zIndex: -1,

        }}
      >
        <Canvas shadows>
          <Environment preset='dawn'

            environmentIntensity={0.5} />
          {/* <directionalLight position={[1, 5, 5]} intensity={0.1} /> */}
          <Suspense fallback={<LoadingFallback />}>
            <AnimatedModel />
          </Suspense>
        </Canvas>
      </div>
      {/* Optional: Additional transparent overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height1: '100vh',
          width: '100vw',
          pointerEvents: 'none', // This ensures the overlay doesn't interfere with interactions
        }}
      />
    </>
  );
};

export default ThreeDModel;