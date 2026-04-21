import { connectDB } from "./lib/mongodb";
import Blog from "./models/Blog";

async function check() {
  await connectDB();
  const count = await Blog.countDocuments();
  console.log("Total Blogs found:", count);
  const latest = await Blog.find().limit(1);
  console.log("Latest Blog:", latest);
  process.exit();
}

check();
