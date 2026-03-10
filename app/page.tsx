import About from "./components/About/About";
import Slider from "./components/Slider/Slider";
import Services from "./components/Services/Services";
import Projects from "./components/Projects/Projects";
import Clients from "./components/Clients/Clients";
import Pricing from "./components/Pricing/Pricing";
import Testimonials from "./components/Testimonials/Testimonials";
import Gallery from "./components/Gallery/Gallery";


export default function Home() {
  return (
    <>
      <Slider />
      <About />
      <Services />
      <Projects />
      <Gallery />
      <Clients />
      <Pricing />
      <Testimonials />

    </>
  );
}

