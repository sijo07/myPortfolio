import { motion } from "framer-motion";

const Loader = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
            <div className="relative flex items-center justify-center">
                {/* Outer Ring */}
                <motion.div
                    className="absolute w-24 h-24 border-4 border-purple-500/30 rounded-full"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Middle Ring - Spinning */}
                <motion.div
                    className="absolute w-16 h-16 border-t-4 border-purple-500 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />

                {/* Inner Core */}
                <motion.div
                    className="w-4 h-4 bg-purple-400 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.8)]"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                    }}
                />
            </div>

            <motion.p
                className="mt-8 text-purple-200 font-mono tracking-[0.2em] text-sm uppercase"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                Initializing System...
            </motion.p>
        </div>
    );
};

export default Loader;
