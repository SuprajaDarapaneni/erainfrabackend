import mongoose, { Schema } from "mongoose";
// --- Schemas ---
const CompanyDetailsSchema = new Schema({
    name: { type: String, required: true },
    alias: { type: String, required: true },
    slogan: String,
    subtitle: String,
    mdName: String,
    mdRole: String,
    phone1: String,
    phone2: String,
    email: String,
    address: String,
    stats: [{ label: String, value: Number, suffix: String }],
    aboutStory: String,
    vision: String,
    mission: String,
    headerVideo: String,
    founderName: String,
    founderImage: String,
    founderBio: String,
    founderQuote: String,
    slides: [{
            id: String,
            title: String,
            subtitle: String,
            mediaUrl: String,
            mediaType: String,
            fallbackImage: String,
            buttonText: String
        }]
}, { timestamps: true });
const ProjectSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    location: String,
    type: String,
    priceRange: String,
    priceMin: Number,
    amenities: [String],
    status: String,
    image: String,
    description: String,
    acres: String,
    units: String,
    sizeRange: String,
    reraNo: String,
    mapLink: String,
    originalFeatured: Boolean,
    brochureUrl: String
}, { timestamps: true });
const LifestyleAmenitySchema = new Schema({
    id: { type: String, required: true, unique: true },
    title: String,
    category: String,
    description: String,
    image: String
}, { timestamps: true });
const TestimonialSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: String,
    role: String,
    content: String,
    rating: Number,
    avatar: String,
    projectPurchased: String,
    hidden: { type: Boolean, default: false }
}, { timestamps: true });
const GalleryItemSchema = new Schema({
    id: { type: String, required: true, unique: true },
    title: String,
    category: String,
    image: String,
    projectId: String
}, { timestamps: true });
const InquirySchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: String,
    phone: String,
    email: String,
    projectSelected: String,
    propertyType: String,
    budget: String,
    message: String,
    visitDate: String,
    timestamp: String,
    status: { type: String, default: "Pending" },
    contacted: { type: Boolean, default: false }
}, { timestamps: true });
const RecentActivitySchema = new Schema({
    id: { type: String, required: true, unique: true },
    text: String,
    type: String,
    timestamp: String
}, { timestamps: true });
const SeoSettingsSchema = new Schema({
    home: { title: String, description: String },
    about: { title: String, description: String },
    projects: { title: String, description: String },
    contact: { title: String, description: String }
}, { timestamps: true });
const DownloadCountSchema = new Schema({
    count: { type: Number, default: 42 }
}, { timestamps: true });
// --- Models ---
export const CompanyDetails = mongoose.model("CompanyDetails", CompanyDetailsSchema);
export const Project = mongoose.model("Project", ProjectSchema);
export const LifestyleAmenity = mongoose.model("LifestyleAmenity", LifestyleAmenitySchema);
export const Testimonial = mongoose.model("Testimonial", TestimonialSchema);
export const GalleryItem = mongoose.model("GalleryItem", GalleryItemSchema);
export const Inquiry = mongoose.model("Inquiry", InquirySchema);
export const RecentActivity = mongoose.model("RecentActivity", RecentActivitySchema);
export const SeoSettings = mongoose.model("SeoSettings", SeoSettingsSchema);
export const DownloadCount = mongoose.model("DownloadCount", DownloadCountSchema);
