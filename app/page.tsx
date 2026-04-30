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
import AboutModel from "@/models/About";
import ServiceCategory from "@/models/ServiceCategory";
import ProjectModel from "@/models/Project";
import BlogModel from "@/models/Blog";
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
export const revalidate = 60; 

export default async function Home() {
  await connectDB();

  const [sliders, aboutData, categories, projects, blogs] = await Promise.all([
    SliderModel.find().lean(),
    AboutModel.findOne().lean(),
    ServiceCategory.find().lean(),
    ProjectModel.find().lean(),
    BlogModel.find().sort({ date: -1 }).limit(10).lean()
  ]);
  
  // Serialization
  const initialSliderData = sliders.length > 0 ? JSON.parse(JSON.stringify(sliders[0])) : null;
  const initialAboutData = aboutData ? JSON.parse(JSON.stringify(aboutData)) : null;
  
  const colors = ["#e8b86d", "#6d9fe8", "#e86d9f", "#6de8b8", "#b86de8", "#e8d06d"];
  const initialServicesData = categories.map((cat: any, i: number) => ({
    id: (i + 1).toString().padStart(2, '0'),
    _id: cat._id.toString(),
    slug: cat.slug || cat._id.toString(),
    title: cat.title || cat.name || 'Untitled Category',
    short: cat.name || cat.title || 'CAT',
    desc: cat.description || '',
    highlight: cat.highlight || '',
    tags: cat.tags || [],
    img: cat.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop",
    color: colors[i % colors.length]
  }));

  const pjColors = ["#6de8b8", "#6d9fe8", "#e86d9f", "#b86de8"];
  const initialProjectsData = projects.map((p: any, i: number) => {
    const displayId = (i + 1).toString().padStart(2, '0');
    const size = i % 4 === 0 ? 'large' : 'small';
    const color = pjColors[i % pjColors.length];
    return {
      _originalId: p._id.toString(),
      id: displayId,
      size,
      title: p.title || 'Untitled Project',
      category: p.category || 'General',
      desc: p.description || '',
      img: p.image || '/images/project-img-1.jpg',
      color,
      stats: Array.isArray(p.stats) ? p.stats.map((s: any) => ({ val: s.value || '', label: s.label || '' })) : [],
      tags: Array.isArray(p.technologies) && p.technologies.length > 0 ? p.technologies : [p.category || 'General'],
    }
  });

  const initialBlogsData = JSON.parse(JSON.stringify(blogs));

  return (
    <>
      <Slider initialData={initialSliderData} />
      <About initialData={initialAboutData} />
      {/* <Counters /> */}
      <Services initialData={initialServicesData} />
      <Projects initialData={initialProjectsData} />
      <Gallery />
      <Clients />
      <BlogSection initialData={initialBlogsData} />
      <Reels />
      <Testimonials />
    </>
  );
}