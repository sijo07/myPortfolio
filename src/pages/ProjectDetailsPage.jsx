import { useParams, Link } from "react-router-dom";
import { Header } from "../sections";
import { Cursor, AnimatedUnderline } from "../components";
import { myProjects } from "../constants";
import { GrGithub, GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";
import { FaLink } from "react-icons/fa";
import { lazy, Suspense, useEffect } from "react";

const Footer = lazy(() => import("../sections/footer"));

const ProjectDetailsPage = () => {
    const { id } = useParams();
    const project = myProjects[id];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Project not found</h2>
                    <Link to="/projects" className="text-purple-400 hover:text-purple-300">
                        Back to Projects
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="relative z-0 bg-primary min-h-screen flex flex-col justify-between">
            <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center fixed inset-0 -z-10 opacity-30"></div>

            <div>
                <Header />
                <Cursor />

                <article className="px-6 lg:px-24 pt-32 pb-20 max-w-7xl mx-auto">
                    {/* Back Navigation */}
                    <Link
                        to="/projects"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group"
                    >
                        <GrFormPreviousLink className="text-2xl group-hover:-translate-x-1 transition-transform" />
                        Back to Projects
                    </Link>

                    {/* Title Section */}
                    <div className="mb-12">
                        <h1 className="text-white text-4xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#6b3fa0] to-[#781844]">
                            {project.title}
                        </h1>
                        <div className="flex flex-wrap gap-3">
                            {project.tags.map((tag) => (
                                <div
                                    key={tag.name}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300"
                                >
                                    <img src={tag.path} alt={tag.name} className="w-5 h-5 object-contain" />
                                    {tag.name}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Video / Visual Section */}
                    <div className="w-full aspect-video rounded-3xl overflow-hidden bg-black/50 border border-white/10 shadow-2xl mb-12">
                        <video
                            src={project.texture}
                            autoPlay
                            loop
                            muted
                            playsInline
                            controls
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Description */}
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                    Project Overview
                                    <AnimatedUnderline />
                                </h3>
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    {project.desc}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-white mb-4">Technical Details</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {project.subdesc}
                                </p>
                            </div>
                        </div>

                        {/* Sidebar / Actions */}
                        <div className="lg:col-span-1">
                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 sticky top-32">
                                <h3 className="text-xl font-bold text-white mb-6">Links</h3>
                                <div className="space-y-4">
                                    <a
                                        href={project.git}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-purple-500/50 transition-all group"
                                    >
                                        <span className="flex items-center gap-3 text-gray-300 group-hover:text-white">
                                            <GrGithub className="text-xl" />
                                            Source Code
                                        </span>
                                        <FaLink className="text-gray-500 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all" />
                                    </a>

                                    {project.href && (
                                        <a
                                            href={project.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/40 hover:to-pink-600/40 border border-purple-500/30 hover:border-purple-500 transition-all group"
                                        >
                                            <span className="flex items-center gap-3 text-white">
                                                <FaLink className="text-xl" />
                                                Live Demo
                                            </span>
                                            <FaLink className="text-white opacity-0 group-hover:opacity-100 transition-all" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Fixed Side Navigation - Desktop */}
                <Link
                    to={`/projects/${id > 0 ? Number(id) - 1 : myProjects.length - 1}`}
                    className="fixed left-4 top-1/2 -translate-y-1/2 z-20 p-4 bg-black/20 hover:bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-white/50 hover:text-white transition-all hidden lg:flex items-center group"
                    aria-label="Previous Project"
                >
                    <GrFormPreviousLink className="text-3xl group-hover:-translate-x-1 transition-transform" />
                </Link>

                <Link
                    to={`/projects/${Number(id) < myProjects.length - 1 ? Number(id) + 1 : 0}`}
                    className="fixed right-4 top-1/2 -translate-y-1/2 z-20 p-4 bg-black/20 hover:bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-white/50 hover:text-white transition-all hidden lg:flex items-center group"
                    aria-label="Next Project"
                >
                    <GrFormNextLink className="text-3xl group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <Suspense fallback={<div className="h-20"></div>}>
                <Footer />
            </Suspense>
        </div >
    );
};

export default ProjectDetailsPage;
