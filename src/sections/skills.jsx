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
      <motion.div
        className="w-full text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-purple-400 text-lg sm:text-xl font-semibold uppercase tracking-[0.2em]">
          Skills & Technologies
          <AnimatedUnderline className="mx-auto mt-2" />
        </h3>
        <h2 className="text-white text-4xl sm:text-5xl font-bold mt-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          My Tech Stack
        </h2>
      </motion.div>

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
