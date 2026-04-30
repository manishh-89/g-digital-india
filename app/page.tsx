import About from "./components/About/About";
// import Counters from "./components/Counters/Counters";
import Slider from "./components/Slider/Slider";
import Services from "./components/Services/Services";
import Projects from "./components/Projects/Projects";
import Clients from "./components/Clients/Clients";
import Testimonials from "./components/Testimonials/Testimonials";
import Gallery from "./components/Gallery/Gallery";
import BlogSection from "./components/Blog/Blog";
import Reels from "./components/Reels/Reels";
import { connectDB } from "@/lib/mongodb";
import SliderModel from "@/models/Slider";
import SiteSettings from "@/models/SiteSettings";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  await connectDB();
  const settings = await SiteSettings.findOne().lean() as any;
  return {
    title: settings?.metaTitle || "G Digital India | Best Digital Marketing Agency",
    description: settings?.metaDescription || "We provide the best SEO, Web Design and PPC services.",
    keywords: settings?.metaKeywords || "digital marketing, seo, web design",
  };
}

// Configure Next.js to revalidate the page every 60 seconds (or 0 for dynamic)
// 60 means it will fetch fresh data every minute, ensuring fast TTFB while keeping data relatively fresh.
export const revalidate = 60; 

export default async function Home() {
  await connectDB();
  const sliders = await SliderModel.find().lean();
  
  // Safely serialize for Client Component
  const initialSliderData = sliders.length > 0 ? JSON.parse(JSON.stringify(sliders[0])) : null;

  return (
    <>
      <Slider initialData={initialSliderData} />
      <About />
      {/* <Counters /> */}
      <Services />
      <Projects />
      <Gallery />
      <Clients />
      <BlogSection/>
      <Reels />
      <Testimonials />
    </>
  );
}