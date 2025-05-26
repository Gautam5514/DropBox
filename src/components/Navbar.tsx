'use client';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isAnimating, setIsAnimating] = useState(true);
  const [isFinal, setIsFinal] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const animateIn = async () => {
      await controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 1.25, ease: 'easeOut' }
      });
      setIsAnimating(false);
      setTimeout(() => setIsFinal(true), 1500);
    };
    animateIn();
  }, [controls]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={controls}
      className={cn(
        "nav-container fixed top-0 left-0 w-full h-[180px] md:h-[180px] flex flex-col justify-between items-start px-8 md:px-12 py-6 bg-white z-50",
        isAnimating && "animating-in",
        isFinal && "final"
      )}
    >
      <div className="nav-wrapper-gridlines w-full h-full relative transition-opacity duration-[1500ms] ease-in-out delay-[750ms]">
        <div className="absolute top-4 left-4 z-50">
          <Image src="/logo.png" alt="Dropbox Logo" width={40} height={40} />
        </div>
        <div className="tile-line nav-l absolute left-0 top-1/2 w-[1px] bg-black transform -translate-y-1/2 origin-top scale-y-0 transition-transform duration-500"></div>
        <div className="tile-line nav-r absolute right-0 top-1/2 w-[1px] bg-black transform -translate-y-1/2 origin-bottom scale-y-0 transition-transform duration-500"></div>
        <div className="tile-line nav-t absolute top-0 left-1/2 h-[1px] bg-black transform -translate-x-1/2 origin-right scale-x-0 transition-transform duration-500"></div>
        <div className="tile-line nav-b absolute bottom-0 left-1/2 h-[1px] bg-black transform -translate-x-1/2 origin-left scale-x-0 transition-transform duration-500"></div>
      </div>
      
      <motion.div 
        className="home-logo-container absolute w-[180px] h-[180px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-[1500ms] ease-[cubic-bezier(.5,0,0.05,1)] delay-[1000ms]"
        animate={isFinal ? {
          width: '91px',
          height: '91px',
          left: '45px',
          bottom: '44.5px',
          transition: {
            duration: 1.5,
            ease: [0.5, 0, 0.05, 1],
            delay: 1
          }
        } : {}}
      >
        <svg className="home-logo w-full h-full" viewBox="0 0 91 91" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path 
            d="M45.5 0L91 45.5L45.5 91L0 45.5L45.5 0Z"
            initial={{ pathLength: 0, fillOpacity: 0 }}
            animate={{ 
              pathLength: 1,
              fillOpacity: 0,
              transition: {
                pathLength: { duration: 1.25, ease: [0.4, 0, 0.3, 1], delay: 0.5 }
              }
            }}
            stroke="currentColor"
            strokeWidth="2"
            className="vector-effect-non-scaling-stroke"
          />
        </svg>
      </motion.div>

      <div className="nav-button-title-container absolute right-8 md:right-12 top-1/2 transform -translate-y-1/2 flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="text-lg font-medium hover:text-blue-600 transition-colors"
        >
          Menu
        </motion.button>
      </div>
    </motion.nav>
  );
}
