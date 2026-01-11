import { Header } from "../sections";
import { Cursor, AnimatedUnderline } from "../components";
import { myProjects } from "../constants";
import { GrGithub, GrPlay } from "react-icons/gr";
import { FaLink } from "react-icons/fa";
import { lazy, Suspense, useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = lazy(() => import("../sections/footer"));

const ProjectCard = ({ project, index, activeVideoIndex, setActiveVideoIndex }) => {
    const videoRef = useRef(null);
    const isPlaying = activeVideoIndex === index;

    // Handle video play/pause based on global state
    useEffect(() => {
        if (isPlaying) {
            videoRef.current?.play().catch(e => console.log("Play failed", e));
        } else {
            videoRef.current?.pause();
        }
    }, [isPlaying]);

    const handleMouseEnter = () => {
        if (window.innerWidth >= 768) { // Desktop hover behavior
            setActiveVideoIndex(index);
        }
    };

    const handleMouseLeave = () => {
        if (window.innerWidth >= 768) {
            setActiveVideoIndex(null);
        }
    };

    const handleMobilePlay = (e) => {
        e.stopPropagation(); // Prevent bubbling
        if (isPlaying) {
            setActiveVideoIndex(null);
        } else {
            setActiveVideoIndex(index);
        }
    };

    return (
        <div
            className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 group flex flex-col h-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 group-hover:shadow-[0_0_20px_rgba(107,63,160,0.5)] transition-all duration-300 bg-black/50">
                <video
                    ref={videoRef}
                    src={project.texture}
                    muted
                    loop
                    playsInline
                    preload="none"
                    className="w-full h-full object-cover"
                />

                {/* Mobile Play Button / Desktop Overlay (Hidden on hover) */}
                <div
                    className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 md:group-hover:opacity-0 ${isPlaying ? 'opacity-0 md:opacity-100' : 'opacity-100'}`}
                    onClick={handleMobilePlay}
                >
                    <button
                        className="md:hidden w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all cursor-pointer z-20"
                        aria-label="Play Video"
                    >
                        {isPlaying ? (
                            <div className="w-4 h-4 bg-white rounded-sm" /> // Stop icon
                        ) : (
                            <GrPlay className="text-white ml-1" size={20} />
                        )}
                    </button>
                </div>
            </div>

            <Link to={`/projects/${index}`} className="block w-fit group-hover:text-purple-400 transition-colors">
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6b3fa0] to-[#781844] mb-3 group-hover:from-purple-400 group-hover:to-pink-500 transition-all">
                    {project.title}
                </h3>
            </Link>

            <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                {project.desc}
            </p>

            <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                {project.tags.map((tag) => (
                    <div
                        key={tag.name}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300"
                    >
                        <img src={tag.path} alt={tag.name} className="w-3.5 h-3.5 object-contain" />
                        {tag.name}
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5">
                <a
                    href={project.git}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-white/5 rounded-full hover:bg-gradient-to-tr from-[#6b3fa0] to-[#781844] transition-all duration-300 group/btn"
                >
                    <GrGithub className="text-white text-lg group-hover/btn:scale-110 transition-transform" />
                </a>

                {project.href && (
                    <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 bg-white/5 rounded-full hover:bg-gradient-to-tr from-[#6b3fa0] to-[#781844] transition-all duration-300 group/btn"
                        title="Live Demo"
                    >
                        <FaLink className="text-white text-lg group-hover/btn:scale-110 transition-transform" />
                    </a>
                )}

                <Link
                    to={`/projects/${index}`}
                    className="ml-auto px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/40 hover:to-pink-600/40 border border-purple-500/30 hover:border-purple-500 rounded-lg text-sm text-gray-300 hover:text-white transition-all whitespace-nowrap"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

const ProjectsPage = () => {
    const [activeVideoIndex, setActiveVideoIndex] = useState(null);

    return (
        <div className="relative z-0 bg-primary min-h-screen flex flex-col justify-between">
            <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center fixed inset-0 -z-10 opacity-30"></div>

            <div>
                <Header />
                <Cursor />

                <section className="px-6 lg:px-24 pt-32 pb-20">
                    <div className="text-center mb-16">
                        <h2 className="text-white text-4xl sm:text-5xl font-bold">
                            All Projects
                        </h2>
                        <div className="flex justify-center mt-2">
                            <AnimatedUnderline />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {myProjects.map((project, index) => (
                            <ProjectCard
                                key={index}
                                index={index}
                                project={project}
                                activeVideoIndex={activeVideoIndex}
                                setActiveVideoIndex={setActiveVideoIndex}
                            />
                        ))}
                    </div>
                </section>
            </div>

            <Suspense fallback={<div className="h-20"></div>}>
                <Footer />
            </Suspense>
        </div>
    );
};

export default ProjectsPage;
