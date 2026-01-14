import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiGithub, FiLinkedin, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

import { staggerContainer, fadeIn, zoomIn } from "../utils/motion";
import { navLinks } from "../constants";
import { ContactForm } from "../components";

const socialLinks = [
  {
    icon: <FiGithub className="w-5 h-5 md:w-5 md:h-5" />,
    href: "https://github.com/sijo07",
  },
  {
    icon: <FiLinkedin className="w-5 h-5 md:w-5 md:h-5" />,
    href: "https://www.linkedin.com/in/clementsijo/",
  },
];

const Header = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const openContactForm = () => setContactFormOpen(true);
  const closeContactForm = () => setContactFormOpen(false);

  // Handle updates when location changes
  useEffect(() => {
    if (location.pathname === "/projects") {
      setActive("All Projects");
      window.scrollTo(0, 0);
    } else if (location.hash) {
      const id = location.hash.replace("#", "");
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        setActive(navLinks.find((n) => n.id === id)?.title || "Home");
      }
    }
  }, [location]);

  const handleNavClick = (id) => {
    setToggle(false);
    if (location.pathname !== "/") return;

    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActive(
        id === "home" ? "Home" : navLinks.find((n) => n.id === id)?.title
      );
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);

      if (location.pathname !== "/") return;

      const sections = navLinks.map(nav => {
        const el = document.getElementById(nav.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          return { id: nav.title, top: rect.top, height: rect.height };
        }
        return null;
      }).filter(Boolean);

      // Find the section that covers the top-center of the viewport or is closest to the top
      // We look for the first section whose top is somewhat near the top of the viewport
      // or simply the one currently occupying the "reading" area (e.g. 100px from top)

      let currentSection = "Home";

      // Default to "Home" if near the top
      if (scrollY < 100) {
        currentSection = "Home";
      } else {
        // Find section closest to top (but not passed completely)
        // A simple heuristic: The section with the smallest positive 'top' value 
        // OR the section with the largest negative 'top' value (meaning we are inside it)

        // Strategy: We are "in" a section if its top is <= viewport_offset AND its bottom is > viewport_offset
        const viewportOffset = 150; // Use a comfortable offset

        for (const section of sections) {
          if (section.top <= viewportOffset && (section.top + section.height) > viewportOffset) {
            currentSection = section.id;
            break;
          }
        }
      }
      setActive(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = contactFormOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [contactFormOpen]);

  const modalVariants = {
    hidden: { scale: 0.85, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };
  const menuVariants = {
    hidden: { opacity: 0, y: "-100%" },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 18 },
    },
    exit: { opacity: 0, y: "-100%", transition: { duration: 0.3 } },
  };

  return (
    <>
      <motion.header
        id="header"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 25,
          duration: 1,
        }}
        className={`sm:px-16 px-6 w-full flex items-center py-5 fixed top-0 z-50 ${scrolled
          ? "bg-black/90 shadow-md border-b border-purple-700 backdrop-blur-md"
          : "bg-black/90"
          }`}
      >
        <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
          >
            <h4 className="text-purple-400 font-bold text-3xl sm:text-4xl animate-bounce">
              &lt;/&gt;
            </h4>
            <p className="text-2xl font-bold cursor-pointer uppercase pt-1">
              Clementsijo
            </p>
          </Link>

          <motion.ul
            className="hidden md:flex flex-row items-center list-none mx-auto gap-10"
            variants={staggerContainer(0.15, 0.6)}
            initial="hidden"
            animate="show"
          >
            {navLinks.map((nav, index) => (
              <motion.li
                key={nav.id}
                variants={fadeIn("down", "spring", 0.2 * index, 0.75)}
                className={`text-[18px] font-medium cursor-pointer relative group hover:text-purple-100 ${active === nav.title ? "text-white" : "text-gray-300"
                  }`}
              >
                <Link
                  to={nav.id === "all-projects" ? "/projects" : `/#${nav.id}`}
                  className="relative"
                  onClick={(e) => {
                    // If it's the projects page link, we let it navigate normally
                    if (nav.id === "all-projects") {
                      setActive("All Projects");
                      return; // Let standard navigation happen
                    }

                    // If we are already on home, prevent default and scroll
                    if (location.pathname === "/") {
                      e.preventDefault();
                      handleNavClick(nav.id);
                    }
                    // Otherwise let it navigate to /#id which the useEffect will handle
                  }}
                >
                  {nav.title}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-purple-500 transition-all duration-300 ${active === nav.title ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                  ></span>
                </Link>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            className="hidden md:flex items-center gap-4"
            variants={staggerContainer(0.1, 1)}
            initial="hidden"
            animate="show"
          >
            {socialLinks.map((s, idx) => (
              <motion.a
                key={idx}
                variants={fadeIn("down", "spring", 1 + idx * 0.1, 0.8)}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
              >
                {s.icon}
              </motion.a>
            ))}
            <motion.button
              onClick={openContactForm}
              variants={zoomIn(1.2, 0.6)}
              className="ml-4 px-4 py-2 rounded-xl border-2 border-purple-700 text-white font-bold hover:bg-gradient-to-r from-purple-700 to-violet-700 hover:text-white transition-all duration-500 capitalize animate-pulse"
            >
              Hire me
            </motion.button>
          </motion.div>

          <div className="md:hidden flex justify-end items-center relative z-50">
            <button
              onClick={() => setToggle(!toggle)}
              className="flex flex-col justify-center items-center w-[28px] h-[28px] gap-[6px] focus:outline-none bg-transparent relative z-50"
            >
              <motion.span
                className="w-full h-[3px] bg-white rounded-lg origin-center"
                animate={toggle ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              <motion.span
                className="w-full h-[3px] bg-white rounded-lg"
                animate={toggle ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="w-full h-[3px] bg-white rounded-lg origin-center"
                animate={toggle ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </button>
            <AnimatePresence>
              {toggle && (
                <motion.div
                  key="mobileMenu"
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="fixed top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 z-40"
                >
                  <motion.ul
                    className="flex flex-col items-center gap-6 list-none"
                    variants={staggerContainer(0.15, 0.2)}
                    initial="hidden"
                    animate="show"
                  >
                    {navLinks.map((nav, index) => (
                      <motion.li
                        key={nav.id}
                        variants={fadeIn(
                          "down",
                          "spring",
                          0.1 * (index + 1),
                          0.5
                        )}
                        className={`text-[20px] font-medium cursor-pointer ${active === nav.title ? "text-white" : "text-gray-400"
                          } hover:text-teal-400 transition-colors duration-300`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(nav.id);
                        }}
                      >
                        <Link
                          to={nav.id === "all-projects" ? "/projects" : `/#${nav.id}`}
                          onClick={(e) => {
                            if (nav.id === "all-projects") {
                              setToggle(false);
                              return;
                            }
                            if (location.pathname === "/") {
                              e.preventDefault();
                              handleNavClick(nav.id);
                            } else {
                              setToggle(false);
                            }
                          }}
                        >
                          {nav.title}
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>

                  <motion.div
                    className="flex items-center gap-6 mt-6"
                    variants={staggerContainer(0.15, 0.5)}
                    initial="hidden"
                    animate="show"
                  >
                    {socialLinks.map((s, idx) => (
                      <motion.a
                        key={idx}
                        variants={fadeIn("up", "spring", 0.2 + idx * 0.1, 0.5)}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-teal-500"
                        onClick={() => setToggle(false)}
                      >
                        {s.icon}
                      </motion.a>
                    ))}
                  </motion.div>

                  <motion.button
                    variants={zoomIn(0.5, 0.6)}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    onClick={() => {
                      setToggle(false);
                      openContactForm();
                    }}
                    className="px-4 py-2 rounded-xl border-2 border-purple-700 text-white font-bold transition-all duration-300 capitalize"
                  >
                    Hire me
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {contactFormOpen && (
          <motion.div
            className="fixed top-0 left-0 w-screen h-screen bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-md sm:max-w-lg rounded-xl shadow-2xl p-6 sm:p-8 border border-purple-700 overflow-auto bg-black/70"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-white capitalize">
                  Get in touch
                </h1>
                <button onClick={closeContactForm}>
                  <FiX className="w-6 h-6 text-white hover:text-purple-400 transition-colors" />
                </button>
              </div>
              <ContactForm onSuccess={closeContactForm} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
