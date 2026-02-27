import { Header } from "../sections";
import { Cursor, AnimatedUnderline, AnimatedBackground, SEO } from "../components";
import { myProjects } from "../constants";
import { GrGithub } from "react-icons/gr";
import { FaLink, FaLaptopCode } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { lazy, Suspense, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

const Footer = lazy(() => import("../sections/footer"));

const ProjectCard = ({ project, index }) => {
    const videoRef = useRef(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    const handleMouseEnter = () => {
        setIsVideoPlaying(true);
        videoRef.current?.play().catch(() => { });
    };

    const handleMouseLeave = () => {
        setIsVideoPlaying(false);
        videoRef.current?.pause();
        if (videoRef.current) videoRef.current.currentTime = 0;
    };

    return (
        <Tilt
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            scale={1.02}
            transitionSpeed={2500}
            className="h-full"
        >
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 }
                }}
                className="group relative h-full bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 flex flex-col"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Image/Video Container */}
                <div className="relative w-full aspect-video bg-black overflow-hidden border-b border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent z-10" />

                    {/* Video or Fallback */}
                    {project.texture ? (
                        <video
                            ref={videoRef}
                            src={project.texture}
                            muted
                            loop
                            playsInline
                            className={`w-full h-full object-cover transition-opacity duration-500 ${isVideoPlaying ? 'opacity-100' : 'opacity-60 grayscale group-hover:grayscale-0'}`}
                        />
                    ) : (
                        <div className="relative w-full h-full bg-zinc-900">
                            <img
                                src="/assets/project-placeholder.png"
                                alt={project.title}
                                className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                            />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-white/40 group-hover:text-white/70 font-mono text-[10px] tracking-widest uppercase border border-white/10 px-3 py-1.5 rounded backdrop-blur-sm transition-colors">
                                    Preview Unavailable
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Badge */}
                    <div className="absolute top-3 right-3 z-20 px-2 py-1 bg-black/60 backdrop-blur rounded text-[10px] font-mono text-white/70 border border-white/10 uppercase tracking-widest">
                        Project {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 relative z-20">
                    <Link to={`/projects/${index}`} className="block w-fit">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                            {project.title}
                        </h3>
                    </Link>

                    <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                        {project.desc}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.slice(0, 3).map((tag, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-gray-300"
                            >
                                <img src={tag.path} alt={tag.name} className="w-3 h-3 object-contain" />
                                {tag.name}
                            </div>
                        ))}
                        {project.tags.length > 3 && (
                            <div className="px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-gray-400">
                                +{project.tags.length - 3}
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="flex gap-3">
                            <a
                                href={project.git}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                                title="View Code"
                            >
                                <GrGithub size={18} />
                            </a>
                            {project.href && (
                                <a
                                    href={project.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                                    title="Live Demo"
                                >
                                    <FaLink size={16} />
                                </a>
                            )}
                        </div>

                        <Link
                            to={`/projects/${index}`}
                            className="text-xs font-bold uppercase tracking-wider text-purple-400 hover:text-purple-300 transition-colors"
                        >
                            Read More
                        </Link>
                    </div>
                </div>

                {/* Spotlight Effect Gradient */}
                <div className="absolute -inset-px bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
        </Tilt>
    );
};

const ProjectsPage = () => {
    const navigate = useNavigate();

    return (
        <div className="relative z-0 bg-black min-h-screen flex flex-col justify-between overflow-x-hidden">
            <SEO
                title="Projects"
                description="Explore my portfolio of web applications, cybersecurity tools, and full-stack projects built with modern technologies."
                name="@clementsijo"
                type="website"
                image="/assets/profile.png"
            />
            <AnimatedBackground className="absolute inset-0 -z-10" />

            <Header />
            <Cursor />

            <main className="container mx-auto px-6 pt-32 pb-20 relative z-10">
                {/* Back Button */}
                <motion.button
                    onClick={() => navigate(-1)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8 flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-purple-500/50 transition-all group"
                >
                    <IoArrowBack className="text-white group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white">Back</span>
                </motion.button>

                {/* Page Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
                            All <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Projects</span>
                        </h1>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            A showcase of my technical journey, featuring full-stack applications, experimental interfaces, and creative coding.
                        </p>
                    </motion.div>
                </div>

                {/* Grid */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
                >
                    {myProjects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            index={index}
                            project={project}
                        />
                    ))}
                </motion.div>
            </main>

            <Suspense fallback={<div className="h-20"></div>}>
                <Footer />
            </Suspense>
        </div>
    );
};

export default ProjectsPage;
