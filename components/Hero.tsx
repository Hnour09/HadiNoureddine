"use client";

import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { memo, useEffect, useMemo, useState } from 'react';
import { SpaceBackground } from './hero/SpaceBackground';
import { NetworkSphere } from './hero/NetworkSphere';
import { TechIcons } from './hero/TechIcons';
import { CosmicButtons } from './hero/CosmicButtons';

const Hero = memo(() => {
  const prefersReducedMotion = useReducedMotion();
  const titles = useMemo(
    () => [
      "Full-Stack Cloud Architect",
      "Backend & API Engineer",
      "AWS Solutions Engineer",
      "Automation & AI Integrations",
      "Applied ML Engineer",
    ],
    []
  );
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 2600);
    return () => clearInterval(interval);
  }, [prefersReducedMotion, titles.length]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black-100 flex flex-col">
      {/* Cosmic space background with nebulas */}
      <SpaceBackground />

      {/* 3D Network Mesh Sphere */}
      <NetworkSphere />

      {/* Floating tech icon badges - Hidden on mobile to prevent clutter */}
      <div className="absolute inset-0 hidden md:block pointer-events-none">
        <TechIcons />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col items-center justify-center flex-grow px-5 sm:px-10 pb-24 md:pb-32">
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 1, delay: prefersReducedMotion ? 0 : 0.5 }}
          className="mt-12 mb-0"
        >
          <div className="text-white-100 text-xs tracking-[0.3em] uppercase h-5 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={titles[titleIndex]}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="block"
              >
                {titles[titleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Main Name - Massive gradient with 3D effect */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 1.5, delay: prefersReducedMotion ? 0 : 0.8 }}
          className="mb-6 md:mb-12 text-center"
          style={{
            fontSize: 'clamp(1.75rem, 6vw, 6.5rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            willChange: 'transform, opacity',
          }}
        >
          <span
            className="block font-bold bg-gradient-to-b from-white via-purple to-blue-500 bg-clip-text text-transparent"
            style={{
              filter: 'drop-shadow(0 0 40px rgba(203, 172, 249, 0.3)) drop-shadow(0 4px 20px rgba(0, 0, 0, 0.5))',
            }}
          >
            Hadi Noureddine
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 1, delay: prefersReducedMotion ? 0 : 1.2 }}
          className="max-w-3xl text-center mb-16 md:mb-36"
        >
          <p className="text-white-100 text-sm md:text-lg font-medium tracking-wide px-4">
            Engineering scalable cloud infrastructure and distributed systems{' '}
            <span className="bg-gradient-to-r from-purple via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              with architectural precision
            </span>
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <div className="mt-24 md:mt-44 lg:mt-52">
          <CosmicButtons />
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 1, delay: prefersReducedMotion ? 0 : 1.8 }}
          className="absolute bottom-3 md:bottom-8 left-0 right-0 flex justify-center gap-6 md:gap-24"
        >
          <div className="text-center">
            <div className="text-xl md:text-4xl mb-2 tracking-tight bg-gradient-to-r from-purple via-blue-500 to-cyan-400 bg-clip-text text-transparent font-bold">3+</div>
            <div className="text-[10px] text-white-100/50 uppercase tracking-[0.2em]">Years Exp.</div>
          </div>
          <div className="text-center">
            <div className="text-xl md:text-4xl mb-2 tracking-tight bg-gradient-to-r from-purple via-blue-500 to-cyan-400 bg-clip-text text-transparent font-bold">10+</div>
            <div className="text-[10px] text-white-100/50 uppercase tracking-[0.2em]">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-xl md:text-4xl mb-2 tracking-tight bg-gradient-to-r from-purple via-blue-500 to-cyan-400 bg-clip-text text-transparent font-bold">99%</div>
            <div className="text-[10px] text-white-100/50 uppercase tracking-[0.2em]">Uptime</div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black-100 to-transparent z-20 pointer-events-none" />

      {/* Large decorative star - bottom right */}
      <motion.div
        className="hidden md:block absolute bottom-8 right-8 z-30 opacity-50 pointer-events-none"
        style={{ willChange: 'transform, opacity' }}
        animate={prefersReducedMotion ? {} : {
          rotate: 360,
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
          opacity: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <path
            d="M40 0 L42 38 L80 40 L42 42 L40 80 L38 42 L0 40 L38 38 Z"
            fill="white"
            opacity="0.7"
            style={{
              filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.9))',
            }}
          />
        </svg>
      </motion.div>
    </div>
  );
});

Hero.displayName = 'Hero';

export default Hero;