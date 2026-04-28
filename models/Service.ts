import mongoose from 'mongoose'

const ServiceSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  slug:        { type: String, required: true, unique: true },
  short:       { type: String, required: true },
  category:    { type: String, default: '' },
  industry:    { type: String, default: '' },
  description: { type: String, default: '' },
  highlight:   { type: String, default: '' },
  tags:        [{ type: String }],
  image:       { type: String, default: '' },
  heroStats:   [{ num: String, label: String }],
  offers:      [{ title: String, text: String, icon: String }],
  steps:       [{ title: String, text: String }],
  faqs:        [{ q: String, a: String }],
  order:       { type: Number, default: 0 },
  createdAt:   { type: Date,   default: Date.now },
})

export default mongoose.models.Service ||
  mongoose.model('Service', ServiceSchema)
