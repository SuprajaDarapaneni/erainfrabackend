import mongoose, { Schema, Document } from "mongoose";

// --- Types & Interfaces ---

export interface ICompanyDetails extends Document {
  name: string;
  alias: string;
  slogan: string;
  subtitle: string;
  mdName: string;
  mdRole: string;
  phone1: string;
  phone2: string;
  email: string;
  address: string;
  stats: Array<{ label: string; value: number; suffix: string }>;
  aboutStory: string;
  vision: string;
  mission: string;
  headerVideo: string;
  founderName: string;
  founderImage: string;
  founderBio: string;
  founderQuote: string;
  slides: Array<{
    id: string;
    title: string;
    subtitle: string;
    mediaUrl: string;
    mediaType: string;
    fallbackImage: string;
    buttonText: string;
  }>;
}

export interface IProject extends Document {
  id: string;
  name: string;
  location: string;
  type: string;
  priceRange: string;
  priceMin: number;
  amenities: string[];
  status: string;
  image: string;
  images: string[];
  description: string;
  acres: string;
  units: string;
  sizeRange: string;
  reraNo: string;
  mapLink: string;
  originalFeatured: boolean;
  brochureUrl: string;
}

export interface ILifestyleAmenity extends Document {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

export interface ITestimonial extends Document {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
  projectPurchased: string;
  hidden: boolean;
}

export interface IGalleryItem extends Document {
  id: string;
  title: string;
  category: string;
  image: string;
  projectId: string;
}

export interface IInquiry extends Document {
  id: string;
  name: string;
  phone: string;
  email: string;
  projectSelected: string;
  propertyType: string;
  budget: string;
  message: string;
  visitDate: string;
  timestamp: string;
  status: string;
  contacted: boolean;
}

export interface IRecentActivity extends Document {
  id: string;
  text: string;
  type: string;
  timestamp: string;
}

export interface ISeoSettings extends Document {
  home: { title: string; description: string };
  about: { title: string; description: string };
  projects: { title: string; description: string };
  contact: { title: string; description: string };
}

export interface IDownloadCount extends Document {
  count: number;
}

export interface ILocalUpload extends Document {
  filename: string;
  base64Data: string;
  contentType: string;
  uploadedAt: string;
}

// --- Schemas ---

const CompanyDetailsSchema = new Schema<ICompanyDetails>({
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

const ProjectSchema = new Schema<IProject>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  location: String,
  type: String,
  priceRange: String,
  priceMin: Number,
  amenities: [String],
  status: String,
  image: String,
  images: [String],
  description: String,
  acres: String,
  units: String,
  sizeRange: String,
  reraNo: String,
  mapLink: String,
  originalFeatured: Boolean,
  brochureUrl: String
}, { timestamps: true });

const LifestyleAmenitySchema = new Schema<ILifestyleAmenity>({
  id: { type: String, required: true, unique: true },
  title: String,
  category: String,
  description: String,
  image: String
}, { timestamps: true });

const TestimonialSchema = new Schema<ITestimonial>({
  id: { type: String, required: true, unique: true },
  name: String,
  role: String,
  content: String,
  rating: Number,
  avatar: String,
  projectPurchased: String,
  hidden: { type: Boolean, default: false }
}, { timestamps: true });

const GalleryItemSchema = new Schema<IGalleryItem>({
  id: { type: String, required: true, unique: true },
  title: String,
  category: String,
  image: String,
  projectId: String
}, { timestamps: true });

const InquirySchema = new Schema<IInquiry>({
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

const RecentActivitySchema = new Schema<IRecentActivity>({
  id: { type: String, required: true, unique: true },
  text: String,
  type: String,
  timestamp: String
}, { timestamps: true });

const SeoSettingsSchema = new Schema<ISeoSettings>({
  home: { title: String, description: String },
  about: { title: String, description: String },
  projects: { title: String, description: String },
  contact: { title: String, description: String }
}, { timestamps: true });

const DownloadCountSchema = new Schema<IDownloadCount>({
  count: { type: Number, default: 42 }
}, { timestamps: true });

const LocalUploadSchema = new Schema<ILocalUpload>({
  filename: { type: String, required: true, unique: true },
  base64Data: { type: String, required: true },
  contentType: { type: String, default: "image/jpeg" },
  uploadedAt: { type: String, default: () => new Date().toISOString() }
}, { timestamps: true });

// --- Models ---

export const CompanyDetails = mongoose.model<ICompanyDetails>("CompanyDetails", CompanyDetailsSchema);
export const Project = mongoose.model<IProject>("Project", ProjectSchema);
export const LifestyleAmenity = mongoose.model<ILifestyleAmenity>("LifestyleAmenity", LifestyleAmenitySchema);
export const Testimonial = mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
export const GalleryItem = mongoose.model<IGalleryItem>("GalleryItem", GalleryItemSchema);
export const Inquiry = mongoose.model<IInquiry>("Inquiry", InquirySchema);
export const RecentActivity = mongoose.model<IRecentActivity>("RecentActivity", RecentActivitySchema);
export const SeoSettings = mongoose.model<ISeoSettings>("SeoSettings", SeoSettingsSchema);
export const DownloadCount = mongoose.model<IDownloadCount>("DownloadCount", DownloadCountSchema);
export const LocalUpload = mongoose.model<ILocalUpload>("LocalUpload", LocalUploadSchema);
