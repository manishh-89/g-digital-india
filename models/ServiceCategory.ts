import mongoose from 'mongoose'

const ServiceCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true, sparse: true },
  title: { type: String },
  description: { type: String },
  image: { type: String },
  contentBlocks: [{
    title: String,
    text: String,
    image: String
  }],
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.ServiceCategory || mongoose.model('ServiceCategory', ServiceCategorySchema)
