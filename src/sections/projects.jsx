import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { GrGithub } from "react-icons/gr";
import { FaLink, FaLaptopCode } from "react-icons/fa";

import { myProjects } from "../constants";
import { AnimatedBackground } from "../components";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;
    const totalWidth = track.scrollWidth - window.innerWidth + 100;

    const tween = gsap.to(track, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${myProjects.length * 2000}`,
        pin: true,
        scrub: 1,
      },
    });

    // Individual Box Animations
    track.querySelectorAll(".project-box").forEach((box) => {
      // Scale In Animation
      gsap.fromTo(box,
        { scale: 0.8, opacity: 0.5, rotateY: 10 },
        {
          scale: 1,
          opacity: 1,
          rotateY: 0,
          scrollTrigger: {
            trigger: box,
            containerAnimation: tween,
            start: "left 90%",
            end: "center center",
            scrub: true,
          }
        }
      );

      // Scale Out Animation
      gsap.to(box, {
        scale: 0.8,
        opacity: 0.5,
        rotateY: -10,
        scrollTrigger: {
          trigger: box,
          containerAnimation: tween,
          start: "center center",
          end: "right 10%",
          scrub: true,
        }
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-[100vh] lg:h-screen bg-black overflow-hidden flex flex-col justify-center"
    >
      <AnimatedBackground className="absolute inset-0 -z-10" />

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-900/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

      <div className="container mx-auto px-6 mb-8 lg:absolute lg:top-12 lg:left-24 lg:mb-0 z-20">
        <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
          Selected Works
        </h2>
        <div className="h-1 w-24 bg-purple-500 mt-4 rounded-full" />
      </div>

      <div
        ref={trackRef}
        className="flex gap-[6vw] px-[10vw] items-center w-max h-full relative z-20"
      >
        {
          myProjects.map((project, index) => (
            <div
              key={index}
              className="relative project-box w-[85vw] md:w-[60vw] lg:w-[45vw] xl:w-[35vw] h-[60vh] flex-shrink-0 group perspective-1000"
            >
              {/* Card Content */}
              <div className="w-full h-full bg-[#0a0a0a]/90 backdrop-blur-3xl border-[3px] border-white/10 rounded-[2.5rem] overflow-hidden hover:border-purple-500/50 transition-all duration-700 flex flex-col shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative z-20">

                {/* Media Area */}
                <div className="relative h-[55%] overflow-hidden group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10" />
                  {project.texture ? (
                    <video
                      src={project.texture}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="relative w-full h-full bg-zinc-900">
                      <img
                        src="/assets/project-placeholder.png"
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-white/50 group-hover:text-white/80 font-mono text-sm tracking-widest uppercase border border-white/10 px-4 py-2 rounded-full backdrop-blur-md transition-colors">
                          Preview Unavailable
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Overlay Tags */}
                  <div className="absolute top-4 right-4 z-20 flex gap-2">
                    {project.tags.slice(0, 2).map((tag, i) => (
                      <div key={i} className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-xs text-white">
                        {tag.name}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Text Content */}
                <div className="p-8 flex flex-col flex-1 relative z-20">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4 group-hover:text-purple-400 transition-colors leading-tight break-words">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-base line-clamp-3 mb-6 flex-1">
                    {project.desc}
                  </p>

                  <div className="flex items-center gap-4 mt-auto">
                    <a
                      href={project.git}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all text-white text-sm font-medium"
                    >
                      <GrGithub size={18} />
                      Code
                    </a>
                    {project.href && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 rounded-xl hover:bg-purple-700 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all text-white text-sm font-medium"
                      >
                        <FaLink size={16} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        }

        {/* View All Projects Card */}
        <div className="project-box w-[85vw] md:w-[60vw] lg:w-[30vw] h-[60vh] flex-shrink-0 flex items-center justify-center">
          <Link
            to="/projects"
            className="group relative flex flex-col items-center justify-center gap-6 p-12 rounded-[2.5rem] border border-white/20 bg-zinc-900/40 backdrop-blur-xl hover:border-purple-500/50 transition-all duration-500 w-full h-full shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
          >
            <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:border-purple-500 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all duration-500 bg-black/50 backdrop-blur-sm">
              <span className="text-3xl text-white group-hover:text-purple-400 transition-colors">→</span>
            </div>
            <h3 className="text-3xl font-bold text-white group-hover:text-purple-400 transition-colors">
              View All
            </h3>
            <p className="text-gray-500 text-center">
              Explore the complete archive of my work.
            </p>
          </Link>
        </div>
      </div >
    </section >
  );
};

export default Projects;
