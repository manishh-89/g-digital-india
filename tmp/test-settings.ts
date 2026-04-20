import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI not found');
    process.exit(1);
}

const CounterSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
  icon:  { type: String, default: '🏆' },
});

const SiteSettingsSchema = new mongoose.Schema({
  phone:   { type: String, default: '+91 98765 43210' },
  phone2:  { type: String, default: '' },
  email:   { type: String, default: 'info@greendigitalindia.com' },
  address: { type: String, default: 'New Delhi, India' },
  counters: { type: [CounterSchema], default: [
    { label: 'Happy Clients',      value: '500+', icon: '😊' },
    { label: 'Projects Completed', value: '300+', icon: '✅' },
    { label: 'Years Experience',   value: '10+',  icon: '📅' },
    { label: 'Team Members',       value: '50+',  icon: '👥' },
  ]},
  updatedAt: { type: Date, default: Date.now },
});

const SiteSettings = mongoose.models.SiteSettings || mongoose.model('SiteSettings', SiteSettingsSchema);

async function test() {
    try {
        console.log('Connecting to:', MONGODB_URI);
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected');

        let settings = await SiteSettings.findOne();
        if (!settings) {
            console.log('Creating default settings...');
            settings = await SiteSettings.create({});
            console.log('✅ Created');
        } else {
            console.log('✅ Found settings:', settings);
        }

        // Test update
        settings.phone = '+91 11111 11111';
        await settings.save();
        console.log('✅ Update successful');

        await mongoose.disconnect();
        console.log('✅ Disconnected');
    } catch (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    }
}

test();
