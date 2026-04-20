import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

const CounterSchema = new mongoose.Schema({
  label: String,
  value: String,
  icon: String,
});

const SiteSettingsSchema = new mongoose.Schema({
  phone: String,
  phone2: String,
  email: String,
  address: String,
  counters: [CounterSchema],
  updatedAt: Date,
});

const SiteSettings = mongoose.models.SiteSettings || mongoose.model('SiteSettings', SiteSettingsSchema);

async function check() {
    try {
        await mongoose.connect(MONGODB_URI!);
        const count = await SiteSettings.countDocuments();
        const settings = await SiteSettings.findOne();
        const all = await SiteSettings.find();
        
        console.log('--- DATABASE CHECK ---');
        console.log('Total documents:', count);
        console.log('First document:', JSON.stringify(settings, null, 2));
        console.log('All IDs:', all.map(a => a._id));
        console.log('-----------------------');
        
        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}

check();
