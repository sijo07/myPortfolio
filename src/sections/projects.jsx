import gsap from "gsap";
import { Suspense, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls } from "@react-three/drei";
import { GrFormNextLink, GrFormPreviousLink, GrGithub } from "react-icons/gr";
import { FaLink } from "react-icons/fa";

import { myProjects } from "../constants";
import { CanvasLoader, Computer } from "../components/canvas";
import { AnimatedBackground, AnimatedUnderline } from "../components";

const projectCount = myProjects.length;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const detailsRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigation = (direction) => {
    setSelectedProjectIndex((prev) => {
      const nextIndex =
        direction === "previous"
          ? prev === 0
            ? projectCount - 1
            : prev - 1
          : prev === projectCount - 1
            ? 0
            : prev + 1;

      detailsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return nextIndex;
    });
  };

  const current = myProjects[selectedProjectIndex] || {
    title: "Loading...",
    desc: "",
    subdesc: "",
    tags: [],
    href: "#",
    texture: null,
  };

  return (
    <section
      id="projects"
      ref={detailsRef}
      className="relative min-h-screen flex flex-col lg:flex-row items-start lg:items-center justify-center gap-12 lg:gap-20 px-6 lg:px-24 py-20 bg-black overflow-hidden"
    >
      <AnimatedBackground className="absolute inset-0 -z-10" />
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedProjectIndex + "-text"}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="z-10 w-full lg:w-1/2 text-left text-white flex flex-col space-y-6"
        >
          <motion.h3
            variants={itemVariants}
            className="text-purple-400 text-lg font-semibold uppercase tracking-widest"
          >
            Project Showcase
            <AnimatedUnderline />
          </motion.h3>

          <motion.h2
            variants={itemVariants}
            className="bg-clip-text text-transparent bg-gradient-to-r from-[#6b3fa0] to-[#781844] text-4xl sm:text-5xl lg:text-5xl font-bold mt-3 leading-snug"
          >
            {current.title}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-gray-200 text-base sm:text-lg mt-4 max-w-[580px] leading-relaxed tracking-wide"
          >
            {current.desc}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-sm sm:text-base mt-2 max-w-[580px] leading-relaxed tracking-wide"
          >
            {current.subdesc}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="relative mt-6 w-full flex flex-wrap justify-start gap-4 perspective-1000"
          >
            {current.tags.map((tag, i) => (
              <div
                key={tag.name}
                className="group relative flex items-center justify-center px-4 py-2 rounded-2xl bg-gradient-to-tr from-[#6b3fa0] to-[#781844] text-white font-semibold text-sm cursor-pointer transform transition-all duration-500 hover:scale-110 hover:rotate-1"
              >
                <img
                  src={tag.path}
                  alt={tag.name}
                  className="w-5 h-5 mr-2 object-contain flex-shrink-0"
                />
                <span className="whitespace-nowrap">{tag.name}</span>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 bg-gradient-to-tr from-[#6b3fa0] to-[#781844] blur-xl transition-opacity duration-300"></div>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-5 mt-10"
          >
            <button
              aria-label="Previous Project"
              onClick={() => handleNavigation("previous")}
              className="p-3 bg-gradient-to-tr from-[#6b3fa0] to-[#781844] rounded-full shadow-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all"
            >
              <GrFormPreviousLink size={25} />
            </button>

            <a
              href={current.git}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Repo"
              className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#6b3fa0] to-[#781844] rounded-full shadow-lg hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] transition-all focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <GrGithub size={22} className="text-white" />
            </a>

            {current.href && (
              <a
                href={current.href}
                target="_blank"
                rel="noreferrer"
                aria-label="Live Project Link"
                className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#6b3fa0] to-[#781844] rounded-full shadow-lg hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] transition-all focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <FaLink size={22} className="text-white" />
              </a>
            )}

            <button
              aria-label="Next Project"
              onClick={() => handleNavigation("next")}
              className="p-3 bg-gradient-to-tr from-[#6b3fa0] to-[#781844] rounded-full shadow-lg hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] transition-all"
            >
              <GrFormNextLink size={25} />
            </button>

            <Link
              to="/projects"
              className="ml-auto px-6 py-2 rounded-xl border border-purple-500/50 text-white font-semibold hover:bg-purple-900/30 hover:border-purple-500 transition-all duration-300"
            >
              View All Projects
            </Link>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedProjectIndex}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative z-10 w-full lg:w-1/2 h-[320px] sm:h-[420px] md:h-[480px] flex justify-center items-center"
        >
          <div className="w-full h-full rounded-2xl">
            <Canvas>
              <ambientLight intensity={Math.PI} />
              <directionalLight position={[10, 10, 5]} />
              <Center>
                <Suspense fallback={<CanvasLoader />}>
                  <group
                    scale={windowWidth < 1024 ? 2.2 : 2.3}
                    position={
                      windowWidth < 1024 ? [-0.3, -3.0, 0] : [-0.5, -3, 0]
                    }
                    rotation={[0, -0.1, 0]}
                  >
                    <Computer texture={current.texture} />
                  </group>
                </Suspense>
              </Center>
              <OrbitControls
                enableZoom={false}
                minPolarAngle={Math.PI / 2}
                maxPolarAngle={Math.PI / 2}
                minAzimuthAngle={-Math.PI / 6}
                maxAzimuthAngle={Math.PI / 6}
              />
            </Canvas>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Projects;
