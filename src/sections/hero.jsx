import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import { AnimatedBackground } from "../components";


const ComputersCanvas = lazy(() => import("../components/canvas/desktop"));

const Hero = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    show: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
        type: "spring",
        stiffness: 50,
        damping: 20,
      },
    }),
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen mx-auto bg-black overflow-hidden"
    >
      <AnimatedBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-16 flex flex-col md:flex-row items-center md:items-start gap-5 mt-28 md:mt-32 lg:mt-36">
        <motion.div
          initial="hidden"
          animate="show"
          className="flex flex-col justify-center items-center md:items-start text-center md:text-left"
        >
          <motion.h1
            variants={textVariants}
            custom={1}
            className="font-black text-white lg:text-[70px] md:text-[60px] sm:text-[50px] xs:text-[40px] text-[32px] leading-tight lg:leading-[90px] md:leading-[75px] mt-4"
          >
            Hi, I'm <span className="text-purple-300">Sijo</span>
          </motion.h1>

          <motion.p
            variants={textVariants}
            custom={2}
            className="text-[#dfd9ff] font-medium lg:text-[30px] md:text-[26px] sm:text-[22px] xs:text-[18px] text-[16px] leading-relaxed mt-3 max-w-lg"
          >
            I develop user interfaces <br className="sm:block hidden" /> and web
            applications
          </motion.p>
        </motion.div>
      </div>

      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <ComputersCanvas />
        </Suspense>
      </div>

      <div className="absolute bottom-24 w-full flex justify-center items-center lg:hidden">
        <a href="#about" aria-label="Scroll to About section">
          <div className="w-[35px] h-[60px] rounded-3xl border-4 border-purple-400 flex justify-center items-start p-2">
            <motion.div
              className="w-3 h-3 bg-purple-400 rounded-full mb-1"
              animate={{ y: [0, 20, 0] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
