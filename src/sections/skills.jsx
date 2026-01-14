import { motion } from "framer-motion";
import { AnimatedBackground, AnimatedUnderline, TechCard } from "../components";
import { skillsData } from "../constants";

const Skills = () => {
  return (
    <section
      id="skills"
      className="relative min-h-screen py-20 px-6 sm:px-16 lg:px-24 bg-black overflow-hidden flex flex-col items-center"
    >
      <AnimatedBackground className="absolute inset-0 -z-10" />

      {/* Header */}
      <div className="w-full flex flex-col items-center text-center mb-16 space-y-4">
        <motion.h3
          className="text-purple-300 text-lg font-semibold uppercase tracking-widest"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Skills & Technologies
          <AnimatedUnderline className="mx-auto" />
        </motion.h3>

        <motion.h2
          className="text-white text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-tight"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          My Tech Stack
          <AnimatedUnderline width="w-32" height="h-2" duration={0.8} className="mx-auto mt-2" />
        </motion.h2>
      </div>

      {/* Holographic Grid */}
      <div className="w-full max-w-7xl mx-auto flex flex-wrap justify-center gap-10">
        {skillsData.map((skill, index) => (
          <div key={skill.name} className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 perspective-[1000px]">
            <TechCard index={index} {...skill} icon={skill.path} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
