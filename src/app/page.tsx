"use client";
import AssetGrid from "@/components/AssetGrid";
import Navbar from "@/components/Navbar";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView, useAnimation } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function Home() {
  const [showButton, setShowButton] = useState(false);
  const { scrollYProgress } = useScroll();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[1920px] px-6">
        <motion.section 
          className="relative h-screen"
          style={{ opacity, scale }}
        >
          <div className="absolute left-0 top-1/2 w-full -translate-y-1/2 space-y-4">
            <h1 className="text-center text-7xl font-bold tracking-tight">Brand Guidelines</h1>
            <p className="text-center text-2xl text-neutral-600">
              Version 4.0 — Updated June 2024
            </p>
          </div>
        </motion.section>

        <AssetGrid />

        <motion.section 
          ref={ref}
          id="foundations" 
          className="py-32"
          variants={sectionVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.h2 
            className="mb-20 text-5xl font-bold"
            variants={sectionVariants}
          >
            Foundations
          </motion.h2>
          
          <div className="grid gap-32">
            {/* Brand Strategy Section */}
            <motion.div 
              className="grid grid-cols-2 gap-16"
              variants={sectionVariants}
            >
              <motion.div 
                className="space-y-6"
                variants={sectionVariants}
              >
                <h3 className="text-3xl font-bold">Brand Strategy</h3>
                <p className="text-lg text-neutral-600">
                  Our brand strategy is built on three core principles...
                </p>
              </motion.div>
              <div className="relative h-96 rounded-3xl bg-neutral-100">
                {/* Placeholder for strategy diagram */}
              </div>
            </motion.div>

            {/* Visual Identity Section */}
            <motion.div 
              className="grid grid-cols-2 gap-16"
              variants={sectionVariants}
            >
              <motion.div 
                className="space-y-6"
                variants={sectionVariants}
              >
                <h3 className="text-3xl font-bold">Visual Identity</h3>
                <p className="text-lg text-neutral-600">
                  Our visual system combines geometric precision with...
                </p>
              </motion.div>
              <div className="relative h-96 rounded-3xl bg-neutral-100">
                {/* Placeholder for identity showcase */}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {showButton && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 bg-black text-white p-3 rounded-full shadow-lg"
          >
            <ArrowUp />
          </motion.button>
        )}
      </main>
    </>
  );
}
