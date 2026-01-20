import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Header, Hero } from "./sections";
import { Cursor, Loader, ErrorBoundary, ScrollHandler } from "./components";

const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ProjectDetailsPage = lazy(() => import("./pages/ProjectDetailsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

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
      <Suspense fallback={<div className="h-screen w-full"></div>}>
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
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollHandler />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
