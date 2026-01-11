import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "../sections";
import { Cursor, AnimatedUnderline, AnimatedBackground } from "../components";
import { myProjects } from "../constants";
import { GrGithub, GrFormPreviousLink, GrFormNextLink, GrPlay } from "react-icons/gr";
import { FaLink } from "react-icons/fa";
import { lazy, Suspense, useEffect, useState, useRef } from "react";

const Footer = lazy(() => import("../sections/footer"));

const ProjectDetailsPage = () => {
    const { id } = useParams();
    const project = myProjects[id];
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    if (!project) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden text-center p-6">
                <Cursor />
                <AnimatedBackground className="absolute inset-0 opacity-50" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="z-10 relative"
                >
                    <h1 className="text-[120px] md:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-b from-purple-500/20 to-transparent leading-none select-none">
                        VOID
                    </h1>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
                        <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 uppercase tracking-[0.2em]">
                            Project Not Found
                        </h2>
                        <p className="text-gray-400 text-sm md:text-base max-w-xs mx-auto mb-8 font-light leading-relaxed">
                            The archive you are searching for is offline or relocated.
                        </p>

                        <Link to="/projects">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white border border-purple-500/50 rounded-full font-bold tracking-widest uppercase text-xs transition-all shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_40px_rgba(168,85,247,0.4)]"
                            >
                                Re-Link to Archive
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <div className="relative z-0 bg-primary min-h-screen flex flex-col justify-between overflow-hidden">
            <AnimatedBackground className="absolute inset-0 -z-10" />
            <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center fixed inset-0 -z-20 opacity-30"></div>

            <div>
                <Header />
                <Cursor />

                <motion.article
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="px-6 lg:px-24 pt-32 pb-20 max-w-7xl mx-auto"
                >
                    {/* Back Navigation */}
                    <motion.div variants={itemVariants}>
                        <Link
                            to="/projects"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white mb-8 transition-all group backdrop-blur-sm"
                        >
                            <GrFormPreviousLink className="text-2xl group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm font-medium uppercase tracking-wider">Back to Archive</span>
                        </Link>
                    </motion.div>

                    {/* Title Section */}
                    <motion.div variants={itemVariants} className="mb-12">
                        <h1 className="text-white text-5xl sm:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-300 to-[#781844] drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                            {project.title}
                        </h1>
                        <div className="flex flex-wrap gap-3">
                            {project.tags.map((tag) => (
                                <motion.div
                                    key={tag.name}
                                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                                    className="flex items-center gap-2.5 px-5 py-2 rounded-2xl bg-white/5 border border-white/10 text-sm text-gray-300 backdrop-blur-md transition-colors"
                                >
                                    <img src={tag.path} alt={tag.name} className="w-5 h-5 object-contain" />
                                    <span className="font-medium">{tag.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Video / Visual Section */}
                    <motion.div
                        variants={itemVariants}
                        className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden bg-black/50 border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.5)] mb-16 cursor-pointer group/video"
                        onClick={togglePlay}
                    >
                        <video
                            ref={videoRef}
                            src={project.texture}
                            loop
                            muted
                            playsInline
                            controls={false}
                            className="w-full h-full object-cover opacity-90 transition-opacity duration-700 group-hover/video:opacity-100"
                        />

                        {/* Play/Pause Overlay */}
                        <div className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover/video:opacity-100' : 'opacity-100'}`}>
                            <motion.div
                                initial={false}
                                animate={{
                                    scale: isPlaying ? 0.8 : 1,
                                    opacity: isPlaying ? 0.3 : 1,
                                    backgroundColor: isPlaying ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.1)"
                                }}
                                className="w-24 h-24 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 shadow-[0_0_40px_rgba(168,85,247,0.4)]"
                            >
                                {isPlaying ? (
                                    <div className="w-6 h-6 bg-white/80 rounded-sm" />
                                ) : (
                                    <GrPlay className="text-white ml-2 text-5xl" />
                                )}
                            </motion.div>
                        </div>

                        {!isPlaying && (
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-xs uppercase tracking-[0.3em] font-mono animate-pulse">
                                Click to engage visual relay
                            </div>
                        )}
                    </motion.div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Main Description */}
                        <div className="lg:col-span-8 space-y-12">
                            <motion.div variants={itemVariants}>
                                <div className="flex items-center gap-4 mb-6">
                                    <h3 className="text-2xl font-bold text-white uppercase tracking-wider">
                                        Project Overview
                                    </h3>
                                    <div className="h-px flex-grow bg-gradient-to-r from-purple-500/50 to-transparent" />
                                </div>
                                <p className="text-gray-300 text-xl leading-relaxed font-light">
                                    {project.desc}
                                </p>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <div className="flex items-center gap-4 mb-6">
                                    <h3 className="text-xl font-bold text-white uppercase tracking-wider">
                                        Technical Architecture
                                    </h3>
                                    <div className="h-px flex-grow bg-gradient-to-r from-pink-500/50 to-transparent" />
                                </div>
                                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm relative overflow-hidden group">
                                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl group-hover:bg-purple-600/20 transition-colors duration-700" />
                                    <p className="text-gray-400 text-lg leading-relaxed relative z-10">
                                        {project.subdesc}
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Sidebar / Actions */}
                        <motion.div variants={itemVariants} className="lg:col-span-4">
                            <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 border border-white/20 sticky top-32 shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-600 opacity-50" />

                                <h3 className="text-2xl font-bold text-white mb-8 tracking-tight">Access Linkage</h3>

                                <div className="space-y-5">
                                    <motion.a
                                        whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.08)" }}
                                        href={project.git}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all group/link"
                                    >
                                        <span className="flex items-center gap-4 text-gray-300 group-hover/link:text-white transition-colors">
                                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover/link:bg-purple-500/20 transition-colors">
                                                <GrGithub className="text-2xl" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-sm uppercase tracking-widest text-white">Repository</span>
                                                <span className="text-xs text-gray-500">View Source Code</span>
                                            </div>
                                        </span>
                                        <FaLink className="text-gray-500 group-hover/link:text-purple-400 transition-colors" />
                                    </motion.a>

                                    {project.href && (
                                        <motion.a
                                            whileHover={{ y: -4 }}
                                            href={project.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center justify-between p-5 rounded-2xl bg-gradient-to-br from-purple-600/80 to-pink-700/80 hover:from-purple-500 hover:to-pink-600 border border-white/20 shadow-lg shadow-purple-500/20 transition-all group/link"
                                        >
                                            <span className="flex items-center gap-4 text-white">
                                                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                                                    <FaLink className="text-2xl" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-sm uppercase tracking-widest">Live Uplink</span>
                                                    <span className="text-xs text-white/70">Visit Application</span>
                                                </div>
                                            </span>
                                            <FaLink className="text-white/50 group-hover/link:text-white transition-colors" />
                                        </motion.a>
                                    )}
                                </div>

                                <div className="mt-8 pt-8 border-t border-white/10">
                                    <div className="flex items-center justify-between text-xs text-gray-500 uppercase tracking-widest">
                                        <span>Status</span>
                                        <span className="text-green-400 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                            Operational
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.article>

                {/* Navigation Overlays */}
                <Link
                    to={`/projects/${id > 0 ? Number(id) - 1 : myProjects.length - 1}`}
                    className="fixed left-8 top-1/2 -translate-y-1/2 z-30 p-5 bg-white/5 hover:bg-white/10 backdrop-blur-2xl border border-white/10 rounded-full text-white/30 hover:text-white transition-all hidden xl:flex items-center group shadow-2xl"
                    aria-label="Previous Project"
                >
                    <GrFormPreviousLink className="text-4xl group-hover:-translate-x-2 transition-transform" />
                    <span className="absolute left-full ml-4 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-sm font-bold tracking-[0.3em] uppercase pointer-events-none">
                        Previous
                    </span>
                </Link>

                <Link
                    to={`/projects/${Number(id) < myProjects.length - 1 ? Number(id) + 1 : 0}`}
                    className="fixed right-8 top-1/2 -translate-y-1/2 z-30 p-5 bg-white/5 hover:bg-white/10 backdrop-blur-2xl border border-white/10 rounded-full text-white/30 hover:text-white transition-all hidden xl:flex items-center group shadow-2xl"
                    aria-label="Next Project"
                >
                    <span className="absolute right-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-sm font-bold tracking-[0.3em] uppercase pointer-events-none text-right">
                        Next
                    </span>
                    <GrFormNextLink className="text-4xl group-hover:translate-x-2 transition-transform" />
                </Link>
            </div>

            <Suspense fallback={<div className="h-20"></div>}>
                <Footer />
            </Suspense>
        </div >
    );
};

export default ProjectDetailsPage;
