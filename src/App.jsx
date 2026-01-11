import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Header, Hero } from "./sections";
import { Cursor } from "./components";

const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ProjectDetailsPage = lazy(() => import("./pages/ProjectDetailsPage"));

const About = lazy(() => import("./sections/about"));
const Skills = lazy(() => import("./sections/skills"));
const Projects = lazy(() => import("./sections/projects"));
const Contact = lazy(() => import("./sections/contact"));
const Footer = lazy(() => import("./sections/footer"));

const Home = () => (
  <div className="relative z-0 bg-primary">
    <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
      <Header />
      <Cursor />
      <Hero />
      <Suspense fallback={<div className="text-white text-center py-10">Loading section...</div>}>
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  </div>
);

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div className="bg-primary h-screen w-full flex items-center justify-center text-white font-bold text-xl">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailsPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
