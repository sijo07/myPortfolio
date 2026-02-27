import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GrGithub } from "react-icons/gr";
import { FaLink, FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { myProjects } from "../constants";
import { AnimatedBackground } from "../components";

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const totalSlides = myProjects.length + 1; // +1 for "View All"

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = totalSlides - 1;
      if (nextIndex >= totalSlides) nextIndex = 0;
      return nextIndex;
    });
  };

  const currentSlide = currentIndex < myProjects.length ? myProjects[currentIndex] : null;

  return (
    <section
      id="projects"
      className="relative min-h-screen bg-black overflow-hidden flex flex-col justify-center pt-32 pb-20"
    >
      <AnimatedBackground className="absolute inset-0 -z-10" />

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-900/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 mb-12 z-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
              Selected Works
            </h2>
            <div className="h-1 w-24 bg-purple-500 mt-4 rounded-full" />
          </div>
          <div className="text-white/50 font-mono text-xl">
            {String(currentIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
          </div>
        </div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto h-[75vh] min-h-[500px] flex items-center justify-center z-20 px-6 sm:px-16">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full h-full max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] xl:max-w-6xl group perspective-1000"
          >
            {currentSlide ? (
              <div className="w-full h-full bg-[#0a0a0a]/90 backdrop-blur-3xl border border-white/10 rounded-[2rem] overflow-hidden hover:border-purple-500/50 transition-all duration-700 flex flex-col md:flex-row shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative z-20">
                {/* Media Area */}
                <div className="relative h-[45%] md:h-full md:w-1/2 overflow-hidden group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10" />
                  {currentSlide.texture ? (
                    <video
                      src={currentSlide.texture}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="relative w-full h-full bg-zinc-900">
                      <img
                        src="/assets/project-placeholder.png"
                        alt={currentSlide.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-white/50 group-hover:text-white/80 font-mono text-sm tracking-widest uppercase border border-white/10 px-4 py-2 rounded-full backdrop-blur-md transition-colors">
                          Preview Unavailable
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Overlay Tags */}
                  <div className="absolute top-4 right-4 z-20 flex gap-2 flex-wrap justify-end pl-12">
                    {currentSlide.tags.slice(0, 3).map((tag, i) => (
                      <div key={i} className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-xs text-white whitespace-nowrap">
                        {tag.name}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Text Content */}
                <div className="p-6 md:p-10 flex flex-col flex-1 relative z-20 w-full md:w-1/2 bg-black/20">
                  <div className="mb-2 text-purple-400 font-mono text-sm uppercase tracking-wider">
                    {currentSlide.category || 'Project'}
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4 group-hover:text-purple-400 transition-colors leading-tight break-words">
                    {currentSlide.title}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base mb-6 flex-1 overflow-y-auto pr-2">
                    {currentSlide.desc}
                    <br /><br />
                    {currentSlide.subdesc}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mt-auto pt-4">
                    {currentSlide.git && (
                      <a
                        href={currentSlide.git}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all text-white text-sm font-medium"
                      >
                        <GrGithub size={18} />
                        Code
                      </a>
                    )}
                    {currentSlide.href && (
                      <a
                        href={currentSlide.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 rounded-xl hover:bg-purple-700 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all text-white text-sm font-medium"
                      >
                        <FaLink size={16} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-[#0a0a0a]/90 backdrop-blur-3xl border border-white/10 rounded-[2rem] overflow-hidden hover:border-purple-500/50 transition-all duration-700 flex items-center justify-center shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative z-20">
                <Link
                  to="/projects"
                  className="group relative flex flex-col items-center justify-center gap-6 p-12 w-full h-full"
                >
                  <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:border-purple-500 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all duration-500 bg-black/50 backdrop-blur-sm">
                    <span className="text-4xl text-white group-hover:text-purple-400 transition-colors">→</span>
                  </div>
                  <h3 className="text-4xl font-bold text-white group-hover:text-purple-400 transition-colors text-center">
                    View All Projects
                  </h3>
                  <p className="text-gray-500 text-lg text-center max-w-sm">
                    Explore the complete archive of my work, experiments, and open-source contributions.
                  </p>
                </Link>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Floating Navigation Controls */}
        <button
          className="absolute left-0 lg:-left-4 xl:-left-12 z-30 p-3 md:p-4 rounded-full bg-black/50 border border-white/10 text-white backdrop-blur-md hover:bg-purple-600 hover:border-purple-500 transition-all group shadow-lg"
          onClick={() => paginate(-1)}
        >
          <FaChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </button>
        <button
          className="absolute right-0 lg:-right-4 xl:-right-12 z-30 p-3 md:p-4 rounded-full bg-black/50 border border-white/10 text-white backdrop-blur-md hover:bg-purple-600 hover:border-purple-500 transition-all group shadow-lg"
          onClick={() => paginate(1)}
        >
          <FaChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center items-center gap-2 mt-8 z-20 flex-wrap px-4">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > currentIndex ? 1 : -1);
              setCurrentIndex(i);
            }}
            className={`transition-all duration-300 rounded-full ${i === currentIndex
              ? "w-8 h-2 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.6)]"
              : "w-2 h-2 bg-white/20 hover:bg-white/40"
              }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
