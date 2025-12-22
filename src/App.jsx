import { BrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Header, Hero } from "./sections";
import { Cursor } from "./components";

const About = lazy(() => import("./sections/about"));
const Skills = lazy(() => import("./sections/skills"));
const Projects = lazy(() => import("./sections/projects"));
const Contact = lazy(() => import("./sections/contact"));
const Footer = lazy(() => import("./sections/footer"));

function App() {
  return (
    <>
      <BrowserRouter>
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
      </BrowserRouter>
    </>
  );
}

export default App;
