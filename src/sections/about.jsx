import React from "react";
import { motion } from "framer-motion";
import { aboutData, educationData, internshipData } from "../constants";
import { profile } from "../assets/index.js";
import { AnimatedBackground, AnimatedUnderline } from "../components";
import { FiDownload } from "react-icons/fi";
import { IoSchoolOutline, IoBriefcaseOutline } from "react-icons/io5";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const TimelineItem = ({ title, subtitle, date, icon: Icon, color }) => (
  <motion.div
    variants={fadeUp}
    className="relative pl-6 pb-6 border-l-2 border-white/10 last:pb-0 hover:border-purple-500 transition-colors duration-300 group"
  >
    <div className={`absolute top-0 -left-[9px] w-4 h-4 rounded-full bg-black border-2 border-${color}-500 group-hover:scale-125 transition-transform duration-300`} />
    <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 hover:border-white/10 transition-colors">
      <div className="flex items-start justify-between mb-1">
        <h4 className="text-white font-bold text-lg">{title}</h4>
        <Icon className={`text-${color}-400 text-xl`} />
      </div>
      <p className="text-gray-300 text-sm font-medium mb-1">{subtitle}</p>
      <p className="text-gray-500 text-xs font-mono">{date}</p>
    </div>
  </motion.div>
);

const About = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center px-6 sm:px-10 lg:px-20 py-24 overflow-hidden bg-black"
    >
      <AnimatedBackground className="absolute inset-0 -z-10" />

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

      <div className="container mx-auto relative z-10 flex flex-col md:flex-row gap-12 lg:gap-20 items-center">

        {/* Left Content (Text) */}
        <div className="w-full md:w-3/5 space-y-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {/* Header */}
            <motion.div variants={fadeUp}>
              <h3 className="text-purple-300 text-sm font-bold uppercase tracking-[0.2em] mb-2 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-purple-500"></span>
                About Me
              </h3>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                {aboutData.title}
                <span className="text-purple-500">.</span>
              </h2>
            </motion.div>

            {/* Description Box */}
            <motion.div
              variants={fadeUp}
              className="backdrop-blur-xl bg-zinc-900/30 border border-white/10 rounded-2xl p-6 mb-8 hover:border-purple-500/30 transition-colors"
            >
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                {aboutData.description}
              </p>
            </motion.div>

            {/* Timeline Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <motion.div variants={fadeUp}>
                <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
                  <IoSchoolOutline className="text-purple-400" />
                  Education
                </h3>
                <div className="pl-2">
                  {educationData.map((edu, index) => (
                    <TimelineItem
                      key={index}
                      title={edu.degree}
                      subtitle={edu.institution}
                      date={edu.year}
                      icon={IoSchoolOutline}
                      color="purple"
                    />
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
                  <IoBriefcaseOutline className="text-pink-400" />
                  Internship
                </h3>
                <div className="pl-2">
                  {internshipData.map((intern, index) => (
                    <TimelineItem
                      key={index}
                      title={intern.position}
                      subtitle={intern.company}
                      date={intern.period}
                      icon={IoBriefcaseOutline}
                      color="pink"
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Resume Button */}
            <motion.div variants={fadeUp} className="pt-6">
              <a
                href={aboutData.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-purple-400 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
              >
                <FiDownload size={20} />
                Download Resume
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Content (Image) */}
        <motion.div
          className="w-full md:w-2/5 flex justify-center"
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full blur-[2px] group-hover:blur-md transition-all duration-500 opacity-70"></div>
            <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[420px] lg:h-[420px] rounded-full p-[4px] bg-gradient-to-br from-white/20 to-white/0 overflow-hidden backdrop-blur-sm">
              <img
                src={profile}
                alt="Profile"
                className="w-full h-full object-cover rounded-full lg:grayscale lg:group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </motion.div>

      </div >
    </section >
  );
};

export default About;
