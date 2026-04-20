import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  slug:        { type: String, unique: true },
  category:    { type: String, default: 'SEO' },
  industry:    { type: String, default: '' },
  description: { type: String, default: '' },
  image:       { type: String, default: '' },
  technologies: [{ type: String }],
  liveUrl:     { type: String },
  challenges:  { type: String },
  solutions:   { type: String },
  results:     { type: String },
  stats: [
    {
      label: { type: String },
      value: { type: String },
    },
  ],
  clientName: { type: String },
  duration:   { type: String },
  featured:   { type: Boolean, default: false },
  order:      { type: Number,  default: 0 },
});

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

async function seed() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/g-digital-india');
    console.log('Connected to MongoDB');

    // Remove existing if any with same slug
    await Project.deleteOne({ slug: 'battery-nearby' });

    const newProject = new Project({
      title: "Battery Nearby - Automotive Service Portal",
      slug: "battery-nearby",
      category: "Web Design",
      industry: "Automotive",
      description: "A comprehensive lead generation and service booking platform for a local automotive battery provider, focused on high conversion and local SEO. The platform allows users to find the nearest service hub and book immediate assistance.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
      technologies: ["Next.js", "MongoDB", "Node.js", "Cloudinary", "FontAwesome"],
      liveUrl: "https://batterynearby.com",
      challenges: "The client was struggling with low online visibility and a manual booking process that resulted in missed leads during off-hours. Their old site was not mobile-friendly, which is critical for people stranded with dead batteries.",
      solutions: "We developed a mobile-first, high-performance website with an integrated 24/7 automated booking system. We implemented local SEO schema to ensure they appear in 'battery shop near me' searches across multiple locations.",
      results: "Within the first month of launch, the business recorded a 150% increase in inbound service calls and a significant boost in automated bookings, reducing customer wait times drastically.",
      stats: [
        { label: "Lead Increase", value: "150%" },
        { label: "Conversion Rate", value: "12%" },
        { label: "Local Search Rank", value: "#1" }
      ],
      clientName: "Battery Nearby Ltd.",
      duration: "4 Weeks",
      order: 1
    });

    await newProject.save();
    console.log('Project "Battery Nearby" seeded successfully!');
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
