'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import useIsTouchDevice from '../lib/useIsTouchDevice';

export default function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const isTouchDevice = useIsTouchDevice();

  // Handle window size
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    // Set initial size
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Only add mouse move tracking on non-touch devices
    if (!isTouchDevice) {
      const handleMouseMove = (e) => {
        setMousePosition({
          x: e.clientX / (windowSize.width || 1),
          y: e.clientY / (windowSize.height || 1)
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    } else {
      // For touch devices, animate the background slightly on its own
      let frameId;
      let angle = 0;

      const animateBackground = () => {
        angle += 0.001;
        setMousePosition({
          x: 0.5 + Math.sin(angle) * 0.1,
          y: 0.5 + Math.cos(angle) * 0.1
        });
        frameId = requestAnimationFrame(animateBackground);
      };

      frameId = requestAnimationFrame(animateBackground);

      return () => {
        cancelAnimationFrame(frameId);
      };
    }
  }, [isTouchDevice, windowSize.width, windowSize.height]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">      <motion.div
      className="absolute inset-0 w-full h-full bg-gradient-to-br from-mint-100 via-slate-50 to-sky-50"
      animate={{
        background: [
          'linear-gradient(120deg, rgba(246, 253, 248, 0.8) 0%, rgba(248, 250, 252, 0.8) 50%, rgba(240, 249, 255, 0.8) 100%)',
          'linear-gradient(120deg, rgba(209, 250, 229, 0.8) 0%, rgba(152, 245, 255, 0.8) 50%, rgba(186, 230, 253, 0.8) 100%)',
          'linear-gradient(120deg, rgba(246, 253, 248, 0.8) 0%, rgba(248, 250, 252, 0.8) 50%, rgba(240, 249, 255, 0.8) 100%)'
        ]
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    />

      {/* Animated circles that move with mouse position */}      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full bg-mint-100/30 blur-3xl"
        animate={{
          x: mousePosition.x * 100 - 400,
          y: mousePosition.y * 100 - 400,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 50 }}
      />      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-sky-100/30 blur-3xl"
        animate={{
          x: -mousePosition.x * 50 + (windowSize.width / 2 || 0) - 300,
          y: -mousePosition.y * 50 + (windowSize.height / 2 || 0) - 300,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 50 }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-azure-100/30 blur-3xl"
        animate={{
          x: mousePosition.y * 100 + (windowSize.width / 3 || 0) - 200,
          y: mousePosition.x * 100 + (windowSize.height / 3 || 0) - 200,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 50 }}
      />
    </div>
  );
}