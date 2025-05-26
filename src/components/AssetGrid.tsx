"use client";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Image as ImageIcon,
  ImagePlus,
  Palette,
  Landmark,
  Warehouse,
  Mic,
  MicOff,
  ALargeSmall,
  CaseSensitive,
  Share2,
  Waypoints,
  Lock,
  TrendingDown,
  TrendingUp,
  Unlock,
} from "lucide-react";

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.5
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};


const assets = [
  {
    id: 1,
    icon: <Share2 size={64} className="text-blue-300" />,
    hoverIcon: <Waypoints size={64} />,
    title: "Framework",
    color: "#2C3A58",
    iconColor: "text-blue-300",
    area: "framework",
  },
  {
    id: 2,
    icon: <MicOff size={64} className="text-yellow-900" />,
    hoverIcon: <Mic size={64} />,
    title: "Voice & Tone",
    color: "#F5C531",
    iconColor: "text-yellow-900",
    area: "voice",
  },
  {
    id: 3,
    icon: <Landmark size={64} className="text-cyan-900" />,
    hoverIcon: <Warehouse size={64} />,
    title: "Logo",
    color: "#00C2E5",
    iconColor: "text-cyan-900",
    area: "logo",
  },
  {
    id: 4,
    icon: <ALargeSmall size={64} className="text-red-900" />,
    hoverIcon: <CaseSensitive size={64} />,
    title: "Typography",
    color: "#fa551e",
    iconColor: "text-red-900",
    area: "typography",
  },
  {
    id: 5,
    icon: <TrendingDown  size={64} className="text-purple-900" />,
    hoverIcon: <TrendingUp size={64} />,
    title: "Motion",
    color: "#C9A2E1",
    iconColor: "text-purple-900",
    area: "motion",
  },
  {
    id: 6,
    icon: <Lock size={64} className="text-green-900" />,
    hoverIcon: <Unlock size={64} />,
    title: "Iconography",
    color: "#9BD438",
    iconColor: "text-green-900",
    area: "iconography",
  },
  {
    id: 7,
    icon: <Palette size={64} className="text-orange-900" />,
    hoverIcon: <Palette size={64} />,
    title: "Color",
    color: "#ff8c19",
    iconColor: "text-orange-900",
    area: "color",
  },
  {
    id: 8,
    icon: <ImageIcon size={64} className="text-pink-400" />,
    hoverIcon: <ImagePlus size={64} />,
    title: "Imagery",
    color: "#972C6C",
    iconColor: "text-pink-400",
    area: "imagery",
  },
];

export default function AssetGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleClick = (area: string) => {
    const target = document.getElementById(area);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);



  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section ref={ref} className="py-24 px-8 md:px-20 bg-white min-h-screen">
      <motion.div
        variants={gridVariants}
        initial="hidden"
        animate={controls}
        className="grid grid-cols-6 grid-rows-6 gap-4 grid-areas"
      >
        {assets.map((asset) => (
          <motion.div
            key={asset.id}
            variants={itemVariants}
            onMouseEnter={() => setHoveredId(asset.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handleClick(asset.area)}
            whileHover={{
              scale: 1.02,
              backgroundColor: "#000000",
              color: "#fff",
              transition: { type: "spring", stiffness: 400, damping: 30 },
            }}
            className={`relative flex items-center justify-center rounded-lg cursor-pointer overflow-hidden ${asset.area} h-full transform transition-transform duration-300`}
            style={{ backgroundColor: asset.color }}
          >
            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className={`text-2xl md:text-3xl font-semibold absolute top-4 left-4 z-10 ${
                hoveredId === asset.id ? "text-white" : asset.iconColor
              }`}
            >
              {asset.title}
            </motion.h2>

            {/* Dynamic Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{
                y: -5,
                rotate: 5,
                scale: 1.1,
                transition: { type: "spring", stiffness: 400, damping: 20 },
              }}
              className={`absolute bottom-4 right-4 z-10 ${
                hoveredId === asset.id ? "text-white" : asset.iconColor
              }`}
            >
              {hoveredId === asset.id ? asset.hoverIcon : asset.icon}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Grid areas */}
      <style jsx global>{`
        .grid-areas {
          display: grid;
          grid-template-areas:
            "framework framework voice voice voice logo"
            "framework framework voice voice voice logo"
            "iconography iconography color color color logo"
            "iconography iconography color color color typography"
            "imagery imagery imagery imagery motion typography"
            "imagery imagery imagery imagery motion typography";
          grid-template-columns: repeat(6, 1fr);
          grid-template-rows: repeat(6, 150px);
        }
        .framework {
          grid-area: framework;
        }
        .voice {
          grid-area: voice;
        }
        .logo {
          grid-area: logo;
        }
        .typography {
          grid-area: typography;
        }
        .motion {
          grid-area: motion;
        }
        .iconography {
          grid-area: iconography;
        }
        .color {
          grid-area: color;
        }
        .imagery {
          grid-area: imagery;
        }
      `}</style>
    </section>
  );
}
