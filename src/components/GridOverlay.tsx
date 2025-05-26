'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function GridOverlay() {
  const { scrollYProgress } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.2, 0.15]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    // Create vertical lines
    const numColumns = 12;
    for (let i = 1; i < numColumns; i++) {
      const line = document.createElement('div');
      line.className = 'grid-line-vertical';
      line.style.left = `${(i / numColumns) * 100}%`;
      container.appendChild(line);
    }

    // Create horizontal lines
    const numRows = Math.floor(containerHeight / 80);
    for (let i = 1; i < numRows; i++) {
      const line = document.createElement('div');
      line.className = 'grid-line-horizontal';
      line.style.top = `${i * 100}px`;
      container.appendChild(line);
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (
    <motion.div 
      className="grid-overlay"
      style={{ opacity }}
    >
      <div 
        ref={containerRef}
        className="grid-lines"
      />
    </motion.div>
  );
}