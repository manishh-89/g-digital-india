import About from "./components/About/About";
// import Counters from "./components/Counters/Counters";
import Slider from "./components/Slider/Slider";
import Services from "./components/Services/Services";
import Projects from "./components/Projects/Projects";
import Clients from "./components/Clients/Clients";
import Testimonials from "./components/Testimonials/Testimonials";
import Gallery from "./components/Gallery/Gallery";
import BlogSection from "./components/Blog/Blog";


export default function Home() {
  return (
    <>
      <Slider />
      <About />
      {/* <Counters /> */}
      <Services />
      <Projects />
      <Gallery />
      <Clients />
      <BlogSection/>
      <Testimonials />

    </>
  );
}