'use client';
import React, { useEffect, createContext, useContext, useState, ReactNode } from 'react';
import Lenis from '@studio-freight/lenis';

type ScrollContextType = {
  lenis: Lenis | null;
  scrollY: number;
};

const ScrollContext = createContext<ScrollContextType>({ lenis: null, scrollY: 0 });

export const useLenis = () => useContext(ScrollContext);

export const SmoothScrollProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const lenisInstance = new Lenis({
      lerp: 0.075,
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      // smoothTouch: true, // This option is deprecated or removed in newer Lenis versions
      // Removed smoothTouch as it's no longer a valid Lenis option.
      // Lenis typically handles touch smoothing automatically in newer versions.
    });

    lenisInstance.on('scroll', ({ scroll }: { scroll: number }) => {
      setScrollY(scroll);
    });

    const raf = (time: DOMHighResTimeStamp) => { // Changed type to DOMHighResTimeStamp for accuracy
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    setLenis(lenisInstance);

    return () => {
      lenisInstance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ lenis, scrollY }}>
      {children}
    </ScrollContext.Provider>
  );
};
