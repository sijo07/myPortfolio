import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";

const TechCard = ({ index, name, icon }) => {
    return (
        <Tilt
            className="w-full"
            perspective={500}
            glareEnable={true}
            glareMaxOpacity={0.45}
            scale={1.02}
            transitionSpeed={450}
        >
            <motion.div
                variants={fadeIn("right", "spring", 0.1 * index, 0.75)}
                className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
            >
                <div
                    className="bg-tertiary rounded-[20px] py-6 px-4 min-h-[140px] flex justify-evenly items-center flex-col backdrop-blur-sm bg-opacity-80 border border-white/10"
                >
                    <img
                        src={icon}
                        alt={name}
                        className={`w-16 h-16 object-contain ${name === "Github" || name === "Next.js" ? "invert" : ""}`}
                    />
                    <h3 className="text-white text-[16px] font-bold text-center mt-2">
                        {name}
                    </h3>
                </div>
            </motion.div>
        </Tilt>
    );
};

export default TechCard;
