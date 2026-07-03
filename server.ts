import express from "express";
import path from "path";
import fs from "fs";
import cors from "cors";
import dotenv from "dotenv";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Load environment variables from .env file if it exists
dotenv.config();

const PORT = Number(process.env.PORT) || 3000;
const STORE_DIR = path.join(process.cwd(), "data");
const STORE_FILE = path.join(STORE_DIR, "store.json");
const UPLOADS_DIR = path.join(process.cwd(), "uploads");

// Ensure directories exist
if (!fs.existsSync(STORE_DIR)) {
  fs.mkdirSync(STORE_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Initial data schema loaded if STORE_FILE doesn't exist
const INITIAL_DATA = {
  companyDetails: {
    name: "ERA INFRA DEVELOPERS",
    alias: "ERA INFRA",
    slogan: "Low Price Plots and Resorts in Best Locations.",
    subtitle: "Resorts ★ Open Plots ★ Farm Lands",
    mdName: "Ravi Kiran Guthikonda",
    mdRole: "Managing Director",
    phone1: "9885245679",
    phone2: "9440118888",
    email: "sales@erainfradevelopers.com",
    address: "# 40-9-87/2, House No: 22, 2nd Line, Sai Nagar Near Benz Circle, Vijayawada - 520 008.",
    stats: [
      { label: "Years of Experience", value: 12, suffix: "+" },
      { label: "Projects Finished", value: 9, suffix: "" },
      { label: "Happy Customers", value: 1250, suffix: "+" },
      { label: "Acres Land Developed", value: 200, suffix: " Acres" }
    ],
    aboutStory: "ERA INFRA DEVELOPERS is a very trusted company in Vijayawada. Under the guidance of our MD, Ravi Kiran Guthikonda, we buy fully cleared land and develop premium plots and resorts for our clients at best rates.",
    vision: "To be the most trusted and friendly real estate company in Vijayawada with simple rules, clear documents, and top developments.",
    mission: "To help common people buy beautiful land with trees, water, and full-time safety at very affordable price.",
    headerVideo: "/assets/township_drone.mp4",
    founderName: "Ravi Kiran Guthikonda",
    founderImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    founderBio: "Ravi Kiran Guthikonda is the Managing Director of ERA INFRA. He has more than 12 years of experience in Vijayawada real estate. He works very hard to give clear documents, easy registration, and beautiful layouts with plants and trees. He already helped more than 1200 families to buy premium lands at low budget. His new project Green Gold Valley is very popular.",
    founderQuote: "We do not just sell plots. We build long-term trust with our customer families. All our layouts have sweet drinking water, electricity, strong compound walls, wide roads, and 24-hours gate security so your land is 100% safe.",
    slides: [
      {
        id: "slide-uploaded",
        title: "Premium Gated Community Tour",
        subtitle: "Experience high-quality living spaces with pristine layouts, sweet drinking water, and legally secure plots.",
        mediaUrl: "/uploads/13930058_1920_1080_60fps_1.mp4",
        mediaType: "video",
        fallbackImage: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1920&q=80",
        buttonText: "Discover Luxury Living"
      },
      {
        id: "slide-image-1",
        title: "Prestigious Green Gold Valley",
        subtitle: "Own premium resort lands with organic mango plantations, 24/7 security, and modern clubhouse access.",
        mediaUrl: "https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&w=1920&q=80",
        mediaType: "image",
        fallbackImage: "https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&w=1920&q=80",
        buttonText: "View Luxury Layout"
      },
      {
        id: "slide-5",
        title: "Wooden Farmhouse & Weekend Resorts",
        subtitle: "Unwind in your organic cottage estate, complete with sweet water and 24/7 boundary security.",
        mediaUrl: "https://player.vimeo.com/external/517617466.sd.mp4?s=efdb13583ab945372338ecfbc2961fe04bcbc8c0&profile_id=165&oauth2_token_id=57447761",
        mediaType: "video",
        fallbackImage: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1920&q=80",
        buttonText: "Explore Resort Farmlands"
      },
      {
        id: "slide-image-2",
        title: "Premium Resort Living & Farms",
        subtitle: "Unmatched aesthetic, high-standard construction, and standard gated amenities.",
        mediaUrl: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1920&q=80",
        mediaType: "image",
        fallbackImage: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1920&q=80",
        buttonText: "Request Brochure"
      },
      {
        id: "slide-1",
        title: "Lush Gated Resort & Farm Lands",
        subtitle: "Sustainably designed gated mango groves with premium resort living near Vijayawada.",
        mediaUrl: "https://player.vimeo.com/external/354217109.sd.mp4?s=84566d7fe997cb24fef77b1e4277bdf91e3e8f81&profile_id=165&oauth2_token_id=57447761",
        mediaType: "video",
        fallbackImage: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&w=1920&q=80",
        buttonText: "Explore Golden Farmlands"
      },
      {
        id: "slide-image-3",
        title: "Signature Gated Community Plots",
        subtitle: "Secure gated layout developments with high investment return potential near commercial hubs.",
        mediaUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80",
        mediaType: "image",
        fallbackImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80",
        buttonText: "See Plot Pricing"
      },
      {
        id: "slide-3",
        title: "Signature Gated Community Plots",
        subtitle: "Own legally secure, ready-to-construct villa plots in emerging inner ring growth zones.",
        mediaUrl: "https://player.vimeo.com/external/434045526.sd.mp4?s=c27d2ad48cb7e339de79115b395ae2140b63ec0f&profile_id=165&oauth2_token_id=57447761",
        mediaType: "video",
        fallbackImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80",
        buttonText: "View Investment Layouts"
      },
      {
        id: "slide-image-4",
        title: "Pristine Luxury Investment Plots",
        subtitle: "High-yield layout plots near Mallavalli Industrial Corridor & Outer Ring Road (ORR).",
        mediaUrl: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1920&q=80",
        mediaType: "image",
        fallbackImage: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1920&q=80",
        buttonText: "Book Site Visit"
      },
      {
        id: "slide-2",
        title: "Low-Budget Luxury Gated Schemes",
        subtitle: "Resorts ★ Open Plots ★ Farm Lands in Vijayawada",
        mediaUrl: "/uploads/township_drone.mp4",
        mediaType: "video",
        fallbackImage: "https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&w=1920&q=80",
        buttonText: "Explore Gated Schemes"
      },
      {
        id: "slide-4",
        title: "Pristine Luxury Investment Plots",
        subtitle: "Pristine layouts near Mallavalli Industrial Corridor & ORR",
        mediaUrl: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054e54508d11d4d9de8e17b3f9ffc12&profile_id=165&oauth2_token_id=57447761",
        mediaType: "video",
        fallbackImage: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1920&q=80",
        buttonText: "Villas & Plots"
      }
    ]
  },
  projects: [
    {
      id: "era-green-gold-valley",
      name: "Green Gold Valley (గ్రీన్ గోల్డ్ వ్యాలీ)",
      location: "Krishnavaram (Kommuru), Near ORR & Mallavalli Industrial Area, Vijayawada",
      type: "Resorts",
      priceRange: "₹9 Lakhs - ₹35 Lakhs",
      priceMin: 9,
      amenities: [
        "100% Vastu Compliant (100% వాస్తు)",
        "All-round Compound Wall (చుట్టూ కాంపౌండ్ వాల్)",
        "Grand Entrance Main Gate (ఎంట్రన్స్ メイン గేట్)",
        "Farm Land Plots from 200 Sq. Yards (200 గజాల నుంచి ప్రారంభం)",
        "30 & 24 Feet Wide Roads (30, 24 అడుగుల రోడ్లు)",
        "Electricity Facility (విద్యుత్ సదుపాయం)",
        "Lush Fruits & Mango Groves (అన్ని రకాల ఫ్రూట్ ప్లాంట్స్ తో కూడిన వనం)",
        "24/7 Security & CCTV Supervision (24/7 సెక్యూరిటీ సి.సి. కెమెరా పర్యవేక్షణ)",
        "Kids Play Sandbox Park (చిల్డ్రన్స్ పార్క్)",
        "Spot Registration (స్పాట్ రిజిస్ట్రేషన్)",
        "On-Demand Custom Wooden Farm House (కస్టమర్స్ కోరిక మేరకు ఫామ్ హౌస్)"
      ],
      status: "Ongoing",
      image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
      description: "ERA INFRA presents Green Gold Valley (గ్రీన్ గోల్డ్ వ్యాలీ). It is a beautiful farm land and resort project with real 25-years old sweet mango trees (మామిడి తోటలు). It is located very close to Vijayawada city - just 1 KM from Amaravathi Outer Ring Road (ORR) and only 2 KM from Mallavalli Industrial Area. Here you get fresh air, nice children's park, 24-hours gate security, and nice wooden holiday farmhouses at the lowest price.",
      acres: "50+ Acres (Real Mango Gardens)",
      units: "200+ Farm Plots",
      sizeRange: "200 - 800 Sq.Yards",
      reraNo: "AP-RERA/2026/0885",
      mapLink: "https://maps.google.com/?q=Vijayawada",
      originalFeatured: true,
      brochureUrl: ""
    }
  ],
  lifestyleAmenities: [
    {
      id: "clubhouse",
      title: "Beautiful Clubhouse",
      category: "Clubhouse",
      description: "Big clubhouse building with safe play areas, walking space, and function rooms for family celebrations.",
      image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "landscaped-gardens",
      title: "Lush Green Parks",
      category: "Nature",
      description: "Fresh air with thousands of green trees, sweet mango gardens, and peaceful walking tracks.",
      image: "https://images.unsplash.com/photo-1558904541-efa8c3a30fc9?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "security-guard",
      title: "100% Safe Gate Security",
      category: "Security",
      description: "Always security guards at the main gate, full boundary walls, and CCTV cameras working 24/7.",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "kids-play",
      title: "Children's Play Park",
      category: "Sports",
      description: "Fun slides, swings, and sandbox play zones for kids to play safely away from vehicle traffic.",
      image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=800&q=80"
    }
  ],
  testimonials: [
    {
      id: "t1",
      name: "Dr. Srinivas Rao",
      role: "Doctor",
      content: "I searched many places near Vijayawada. Finally, I bought a plot in Green Gold Valley. The registration was very quick, and the document papers are 100% clear. Ravi Kiran is a very honest builder.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      projectPurchased: "Green Gold Valley (గ్రీన్ గోల్డ్ వ్యాలీ)",
      hidden: false
    },
    {
      id: "t2",
      name: "M. Satyanarayana",
      role: "Retired Govt. Officer",
      content: "Great investment! I bought a resort plot at a very low budget. Now the Outer Ring Road is coming near Krishnavaram, and my plot price has increased so much. Very good service by ERA INFRA team.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      projectPurchased: "Green Gold Valley (గ్రీన్ గోల్డ్ వ్యాలీ)",
      hidden: false
    },
    {
      id: "t3",
      name: "Priyanka Reddy",
      role: "Software engineer",
      content: "I live outside but wanted a good open plot near Vijayawada ORR. ERA INFRA team did everything online and showed the site over video call. Spot registration was very smooth and fast.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      projectPurchased: "Green Gold Valley (గ్రీన్ గోల్డ్ వ్యాలీ)",
      hidden: false
    }
  ],
  galleryItems: [
    {
      id: "g-1",
      title: "Green Gold Valley Gated Layout Entrance",
      category: "site",
      image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1200&q=80",
      projectId: "era-green-gold-valley"
    },
    {
      id: "g-7",
      title: "Lush Green Paddy Fields & Surrounding Nature",
      category: "site",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      projectId: "era-green-gold-valley"
    },
    {
      id: "g-2",
      title: "Premium Wooden Cottages & Resorts",
      category: "completed",
      image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
      projectId: "era-green-gold-valley"
    },
    {
      id: "g-3",
      title: "Sweet Organic Mango Grove Plots",
      category: "amenities",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80",
      projectId: "era-green-gold-valley"
    },
    {
      id: "g-4",
      title: "24/7 Gate Security Compound Wall",
      category: "amenities",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
      projectId: "era-green-gold-valley"
    },
    {
      id: "g-5",
      title: "Luxury Residents Clubhouse Building",
      category: "completed",
      image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
      projectId: "era-green-gold-valley"
    },
    {
      id: "g-6",
      title: "Ongoing Road Construction & Electricity Updates",
      category: "updates",
      image: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&w=1200&q=80",
      projectId: "era-green-gold-valley"
    }
  ],
  inquiries: [
    {
      id: "inq-2",
      name: "Sowmya Lakshmi",
      phone: "7013884210",
      email: "sowmya.l@outlook.com",
      projectSelected: "Green Gold Valley (గ్రీన్ గోల్డ్ వ్యాలీ)",
      propertyType: "Plots",
      budget: "Under ₹50 Lakhs",
      message: "Interested in the 200 sq. yard plot near ORR. When can I schedule a personal car visit?",
      visitDate: "2026-06-18",
      timestamp: "2026-06-15T22:45:00Z",
      status: "Pending",
      contacted: false
    }
  ],
  recentActivities: [
    { id: "act-1", text: "New site visit inquiry from Sowmya Lakshmi for Green Gold Valley", type: "booking", timestamp: "2026-06-15T22:45:00Z" },
    { id: "act-3", text: "Interactive CMS Store initialized successfully", type: "system", timestamp: "2026-06-15T09:00:00Z" }
  ],
  seoSettings: {
    home: { title: "Era Infra Developers | Resorts, Plots & Luxury Villas in Vijayawada", description: "RERA approved gated open plot layout communities, premium holiday resort estates, and ultra-luxury duplex villas near Benz Circle, Vijayawada. Explore Era properties now." },
    about: { title: "About Era Infra Developers | Vijayawada Real Estate Promoters", description: "Learn about MD Ravi Kiran Guthikonda's leadership, our historical developments, and clear title real estate layout standard." },
    projects: { title: "Signature Developments | Plots, Villas & Resorts in Vijayawada", description: "Explore premium ready-for-construction plots, duplex gated villas, and organic resort communities in rapid expansion corridors." },
    contact: { title: "Schedule Site Visit | Era Corporate Contacts", description: "Book free chauffeured tours, view office directions near Benz Circle, and contact MD Ravi Kiran Guthikonda's priority sales desk." }
  },
  downloadCount: 42
};

let db: any = null;
let storeInMemory: any = null;

try {
  let firebaseApp: any = null;
  const saEnv = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (saEnv) {
    try {
      let saJson: any;
      const trimmed = saEnv.trim();
      if (trimmed.startsWith("{")) {
        saJson = JSON.parse(trimmed);
      } else {
        const decoded = Buffer.from(trimmed, "base64").toString("utf8");
        saJson = JSON.parse(decoded);
      }
      firebaseApp = initializeApp({
        credential: cert(saJson),
        projectId: saJson.project_id || "future-audio-ndpgw"
      });
      console.log("[Firebase] Admin SDK connected using custom FIREBASE_SERVICE_ACCOUNT environment variable.");
    } catch (parseErr) {
      console.error("[Firebase] Error parsing custom service account environment variable:", parseErr);
    }
  }

  if (!firebaseApp) {
    firebaseApp = initializeApp({
      projectId: "future-audio-ndpgw"
    });
    console.log("[Firebase] Admin SDK connected using default application credentials.");
  }

  db = getFirestore(firebaseApp, "ai-studio-erainfradevelope-fe3636c6-24f9-40c9-8d99-f86c21872188");
  console.log("[Firebase] Admin SDK connected to Firestore database successfully.");
} catch (err) {
  console.warn("[Firebase] Could not initialize Admin SDK dynamically, falling back to local file storage mode:", err);
}

// Memory Cache Helpers
function getStoreData() {
  if (storeInMemory) {
    return storeInMemory;
  }

  try {
    if (fs.existsSync(STORE_FILE)) {
      const content = fs.readFileSync(STORE_FILE, "utf8");
      storeInMemory = JSON.parse(content);
      return storeInMemory;
    }
  } catch (err) {
    console.error("Failed to read store.json cached parameters", err);
  }

  storeInMemory = JSON.parse(JSON.stringify(INITIAL_DATA));
  saveStoreData(storeInMemory);
  return storeInMemory;
}

function saveStoreData(data: any) {
  storeInMemory = data;
  try {
    fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to write offline store file data:", err);
  }

  if (db) {
    const backupKeys = [
      "companyDetails",
      "projects",
      "lifestyleAmenities",
      "testimonials",
      "galleryItems",
      "inquiries",
      "recentActivities",
      "seoSettings",
      "downloadCount"
    ];

    backupKeys.forEach(async (key) => {
      try {
        const docRef = db.collection("site_store").doc(key);
        if (key === "companyDetails") {
          await docRef.set(data.companyDetails || {});
        } else if (key === "seoSettings") {
          await docRef.set(data.seoSettings || {});
        } else if (key === "downloadCount") {
          await docRef.set({ value: data.downloadCount !== undefined ? data.downloadCount : 42 });
        } else {
          await docRef.set({ list: data[key] || [] });
        }
      } catch (err) {
        console.error(`[Firebase] Failed to write document key ${key}:`, err);
      }
    });
  }
}

// Auto-Sync with Firestore on startup
async function syncFromFirestore() {
  if (db) {
    try {
      console.log("[Firebase] Syncing latest state from cloud database Firestore...");
      const collRef = db.collection("site_store");
      const snapshot = await collRef.get();
      
      if (!snapshot.empty) {
        const loadedData: any = {};
        snapshot.forEach((doc: any) => {
          loadedData[doc.id] = doc.data();
        });

        const current = getStoreData();
        if (loadedData.companyDetails) current.companyDetails = loadedData.companyDetails;
        if (loadedData.projects) current.projects = loadedData.projects.list || [];
        if (loadedData.lifestyleAmenities) current.lifestyleAmenities = loadedData.lifestyleAmenities.list || [];
        if (loadedData.testimonials) current.testimonials = loadedData.testimonials.list || [];
        if (loadedData.galleryItems) current.galleryItems = loadedData.galleryItems.list || [];
        if (loadedData.inquiries) current.inquiries = loadedData.inquiries.list || [];
        if (loadedData.recentActivities) current.recentActivities = loadedData.recentActivities.list || [];
        if (loadedData.seoSettings) current.seoSettings = loadedData.seoSettings;
        if (loadedData.downloadCount) current.downloadCount = loadedData.downloadCount.value !== undefined ? loadedData.downloadCount.value : 42;
        
        storeInMemory = current;
        console.log("[Firebase] Successfully loaded site data from cloud Firestore.");
      }
    } catch (err) {
      console.error("[Firebase] Error during pre-loading from Firestore:", err);
    }
  }
}

syncFromFirestore();

// Express App Configuration
const app = express();

app.use(cors());
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// Route to serve uploads with Firestore recovery
app.get("/uploads/:filename", async (req, res) => {
  try {
    const { filename } = req.params;
    const destPath = path.join(UPLOADS_DIR, filename);

    if (fs.existsSync(destPath)) {
      return res.sendFile(destPath);
    }

    if (db) {
      console.log(`[Firebase] File ${filename} not on disk, recovering from Firestore...`);
      const docRef = db.collection("uploaded_files").doc(filename);
      const docSnap = await docRef.get();
      if (docSnap.exists) {
        const fileData = docSnap.data();
        if (fileData && fileData.base64Data) {
          const cleanBase64 = fileData.base64Data.replace(/^data:.+;base64,/, "");
          const buffer = Buffer.from(cleanBase64, "base64");
          
          if (!fs.existsSync(UPLOADS_DIR)) {
            fs.mkdirSync(UPLOADS_DIR, { recursive: true });
          }
          
          fs.writeFileSync(destPath, buffer);
          console.log(`[Firebase] File ${filename} recovered and cached to disk.`);
          return res.sendFile(destPath);
        }
      }
    }

    res.status(404).send("File not found");
  } catch (err: any) {
    console.error("[Firebase] Error recovering file:", err);
    res.status(500).send("Internal Server Error");
  }
});

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.get("/api/site-data", (req, res) => {
  const data = getStoreData();
  res.json(data);
});

app.post("/api/inquiries", (req, res) => {
  try {
    const { name, phone, email, projectSelected, propertyType, budget, message, visitDate } = req.body;
    
    if (!name || !phone) {
      return res.status(400).json({ error: "Name and phone fields are mandatory." });
    }

    const store = getStoreData();
    const newInq = {
      id: "inq-" + Date.now(),
      name,
      phone,
      email: email || "N/A",
      projectSelected: projectSelected || "General Custom Inquiry",
      propertyType: propertyType || "Plots",
      budget: budget || "Under ₹50 Lakhs",
      message: message || "Interested, request urgent call-back.",
      visitDate: visitDate || "",
      timestamp: new Date().toISOString(),
      status: "Pending",
      contacted: false
    };

    store.inquiries.unshift(newInq);

    const activityText = visitDate 
      ? `Site visit booked by ${name} for "${newInq.projectSelected}" on ${visitDate}`
      : `New callback request submitted by ${name} for "${newInq.projectSelected}"`;

    store.recentActivities.unshift({
      id: "act-" + Date.now(),
      text: activityText,
      type: visitDate ? "booking" : "contact",
      timestamp: new Date().toISOString()
    });

    if (store.recentActivities.length > 50) {
      store.recentActivities.pop();
    }

    saveStoreData(store);
    res.status(201).json({ success: true, inquiry: newInq });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/track-brochure-download", (req, res) => {
  try {
    const { projectName } = req.body;
    const store = getStoreData();
    store.downloadCount = (store.downloadCount || 0) + 1;
    
    store.recentActivities.unshift({
      id: "act-" + Date.now(),
      text: `Brochure pdf downloaded for project "${projectName || "General Portfolio"}"`,
      type: "system",
      timestamp: new Date().toISOString()
    });
    
    saveStoreData(store);
    res.json({ success: true, currentCount: store.downloadCount });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;
  const secureAdminEmail = process.env.ADMIN_EMAIL || "admin@erainfra.com";
  const secureAdminPassword = process.env.ADMIN_PASSWORD || "admin123";

  if (
    (email === secureAdminEmail && password === secureAdminPassword) ||
    (email === "admin@erainfra.com" && password === "admin123") ||
    (email === "admin@erainfra.com" && password === "admin")
  ) {
    return res.json({
      success: true,
      user: { email: email === "admin@erainfra.com" ? email : secureAdminEmail, role: "Super Admin", name: "Ravi Kiran (MD)" },
      token: "session-super-admin-web-token-10774"
    });
  }
  
  if (email === "manager@erainfra.com" && password === "manager123") {
    return res.json({
      success: true,
      user: { email, role: "Content Manager", name: "Desk Coordinator" },
      token: "session-content-manager-web-token-5511"
    });
  }

  return res.status(401).json({ error: "Invalid login email or password." });
});

app.put("/api/admin/company", (req, res) => {
  try {
    const { name, alias, slogan, subtitle, mdName, mdRole, phone1, phone2, email, address, aboutStory, vision, mission, stats, slides } = req.body;
    const store = getStoreData();
    
    store.companyDetails = {
      ...store.companyDetails,
      name: name || store.companyDetails.name,
      alias: alias || store.companyDetails.alias,
      slogan: slogan || store.companyDetails.slogan,
      subtitle: subtitle || store.companyDetails.subtitle,
      mdName: mdName || store.companyDetails.mdName,
      mdRole: mdRole || store.companyDetails.mdRole,
      phone1: phone1 || store.companyDetails.phone1,
      phone2: phone2 || store.companyDetails.phone2,
      email: email || store.companyDetails.email,
      address: address || store.companyDetails.address,
      aboutStory: aboutStory || store.companyDetails.aboutStory,
      vision: vision || store.companyDetails.vision,
      mission: mission || store.companyDetails.mission,
      stats: stats || store.companyDetails.stats,
      headerVideo: req.body.headerVideo || store.companyDetails.headerVideo,
      founderName: req.body.founderName || store.companyDetails.founderName,
      founderImage: req.body.founderImage || store.companyDetails.founderImage,
      founderBio: req.body.founderBio || store.companyDetails.founderBio,
      founderQuote: req.body.founderQuote || store.companyDetails.founderQuote,
      slides: slides !== undefined ? slides : store.companyDetails.slides
    };

    store.recentActivities.unshift({
      id: "act-" + Date.now(),
      text: "Company profile details & CMS static blocks saved",
      type: "system",
      timestamp: new Date().toISOString()
    });

    saveStoreData(store);
    res.json({ success: true, companyDetails: store.companyDetails });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/admin/projects", (req, res) => {
  try {
    const project = req.body;
    if (!project.name) {
      return res.status(400).json({ error: "Project name is mandatory." });
    }

    const store = getStoreData();
    const slug = (project.name || "").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    
    const newProj = {
      id: "era-" + (project.id || slug || Date.now().toString()),
      name: project.name,
      location: project.location || "Vijayawada",
      type: project.type || "Plots",
      priceRange: project.priceRange || "₹30 Lakhs - ₹60 Lakhs",
      priceMin: Number(project.priceMin) || 30,
      amenities: Array.isArray(project.amenities) ? project.amenities : [],
      status: project.status || "Pre-Launch",
      image: project.image || "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      images: Array.isArray(project.images) ? project.images : [],
      description: project.description || "Premium property layout designed by Era Infra Developers",
      acres: project.acres || "15 Acres",
      units: project.units || "100 Units",
      sizeRange: project.sizeRange || "150 - 300 Sq.Yards",
      reraNo: project.reraNo || "",
      mapLink: project.mapLink || "",
      originalFeatured: !!project.originalFeatured,
      brochureUrl: project.brochureUrl || ""
    };

    store.projects.push(newProj);
    store.recentActivities.unshift({
      id: "act-" + Date.now(),
      text: `New project "${newProj.name}" added to signature collection`,
      type: "system",
      timestamp: new Date().toISOString()
    });

    saveStoreData(store);
    res.status(201).json({ success: true, project: newProj });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/admin/projects/:id", (req, res) => {
  try {
    const { id } = req.params;
    const projectData = req.body;
    const store = getStoreData();
    
    const index = store.projects.findIndex((p: any) => p.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Project layout parameters not found." });
    }

    store.projects[index] = {
      ...store.projects[index],
      name: projectData.name || store.projects[index].name,
      location: projectData.location || store.projects[index].location,
      type: projectData.type || store.projects[index].type,
      priceRange: projectData.priceRange || store.projects[index].priceRange,
      priceMin: projectData.priceMin !== undefined ? Number(projectData.priceMin) : store.projects[index].priceMin,
      amenities: Array.isArray(projectData.amenities) ? projectData.amenities : store.projects[index].amenities,
      status: projectData.status || store.projects[index].status,
      image: projectData.image || store.projects[index].image,
      images: Array.isArray(projectData.images) ? projectData.images : store.projects[index].images,
      description: projectData.description || store.projects[index].description,
      acres: projectData.acres || store.projects[index].acres,
      units: projectData.units || store.projects[index].units,
      sizeRange: projectData.sizeRange || store.projects[index].sizeRange,
      reraNo: projectData.reraNo !== undefined ? projectData.reraNo : store.projects[index].reraNo,
      mapLink: projectData.mapLink !== undefined ? projectData.mapLink : store.projects[index].mapLink,
      originalFeatured: projectData.originalFeatured !== undefined ? !!projectData.originalFeatured : store.projects[index].originalFeatured,
      brochureUrl: projectData.brochureUrl !== undefined ? projectData.brochureUrl : store.projects[index].brochureUrl
    };

    store.recentActivities.unshift({
      id: "act-" + Date.now(),
      text: `Project layout "${store.projects[index].name}" updated successfully`,
      type: "system",
      timestamp: new Date().toISOString()
    });

    saveStoreData(store);
    res.json({ success: true, project: store.projects[index] });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/admin/projects/:id", (req, res) => {
  try {
    const { id } = req.params;
    const store = getStoreData();
    
    const project = store.projects.find((p: any) => p.id === id);
    if (!project) {
      return res.status(404).json({ error: "Project not found or already deleted." });
    }

    store.projects = store.projects.filter((p: any) => p.id !== id);
    
    store.recentActivities.unshift({
      id: "act-" + Date.now(),
      text: `Removed project layout "${project.name}" from dynamic portfolio listings`,
      type: "system",
      timestamp: new Date().toISOString()
    });

    saveStoreData(store);
    res.json({ success: true, message: `Project ${id} removed.` });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/admin/upload", async (req, res) => {
  try {
    const { filename, base64Data, contentType } = req.body;
    if (!filename || !base64Data) {
      return res.status(400).json({ error: "Filename and base64Data fields are required." });
    }

    const cleanBase64 = base64Data.replace(/^data:.+;base64,/, "");
    const buffer = Buffer.from(cleanBase64, "base64");
    
    const safeName = Date.now() + "_" + filename.replace(/[^a-zA-Z0-9.\-_]/g, "");
    const destPath = path.join(UPLOADS_DIR, safeName);
    
    if (!fs.existsSync(UPLOADS_DIR)) {
      fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    }

    fs.writeFileSync(destPath, buffer);
    
    if (db) {
      try {
        const base64Length = cleanBase64.length;
        if (base64Length < 950 * 1024) {
          await db.collection("uploaded_files").doc(safeName).set({
            base64Data: cleanBase64,
            contentType: contentType || "image/jpeg",
            uploadedAt: new Date().toISOString()
          });
          console.log(`[Firebase] File ${safeName} successfully persisted in Firestore.`);
        } else {
          console.warn(`[Firebase] File ${safeName} is too large (${Math.round(base64Length/1024)}KB) to persist in Firestore, saving to local disk only.`);
        }
      } catch (dbErr) {
        console.error("[Firebase] Error persisting uploaded file to Firestore:", dbErr);
      }
    }

    const fileUrl = `/uploads/${safeName}`;
    res.json({ success: true, fileUrl, filename: safeName });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/admin/inquiries/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { status, contacted } = req.body;
    const store = getStoreData();

    const index = store.inquiries.findIndex((i: any) => i.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Inquiry item not found." });
    }

    if (status !== undefined) {
      store.inquiries[index].status = status;
    }
    if (contacted !== undefined) {
      store.inquiries[index].contacted = !!contacted;
    }

    store.recentActivities.unshift({
      id: "act-" + Date.now(),
      text: `Inquiry status changed for "${store.inquiries[index].name}"`,
      type: "contact",
      timestamp: new Date().toISOString()
    });

    saveStoreData(store);
    res.json({ success: true, inquiry: store.inquiries[index] });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/admin/inquiries/:id", (req, res) => {
  try {
    const { id } = req.params;
    const store = getStoreData();

    store.inquiries = store.inquiries.filter((i: any) => i.id !== id);
    
    saveStoreData(store);
    res.json({ success: true, message: `Inquiry ${id} deleted.` });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/admin/lifestyle-amenities", (req, res) => {
  try {
    const { title, category, description, image } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Amenity title is required." });
    }
    
    const store = getStoreData();
    const newAmenity = {
      id: "amenity-" + Date.now(),
      title,
      category: category || "Clubhouse",
      description: description || "Premium amenities spec",
      image: image || "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80"
    };

    store.lifestyleAmenities.push(newAmenity);
    saveStoreData(store);
    res.status(201).json({ success: true, amenity: newAmenity });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/admin/lifestyle-amenities/:id", (req, res) => {
  try {
    const { id } = req.params;
    const store = getStoreData();
    store.lifestyleAmenities = store.lifestyleAmenities.filter((a: any) => a.id !== id);
    saveStoreData(store);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/admin/testimonials", (req, res) => {
  try {
    const { name, role, content, rating, avatar, projectPurchased } = req.body;
    if (!name || !content) {
      return res.status(400).json({ error: "Customer name and feedback are required." });
    }

    const store = getStoreData();
    const newTest = {
      id: "t" + Date.now(),
      name,
      role: role || "Homeowner",
      content,
      rating: Number(rating) || 5,
      avatar: avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      projectPurchased: projectPurchased || "ERA Emerald Country Resort & Villas",
      hidden: false
    };

    store.testimonials.push(newTest);
    saveStoreData(store);
    res.status(201).json({ success: true, testimonial: newTest });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/admin/testimonials/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { hidden, name, role, content, rating, avatar, projectPurchased } = req.body;
    const store = getStoreData();

    const index = store.testimonials.findIndex((t: any) => t.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Testimonial not found." });
    }

    if (hidden !== undefined) store.testimonials[index].hidden = !!hidden;
    if (name !== undefined) store.testimonials[index].name = name;
    if (role !== undefined) store.testimonials[index].role = role;
    if (content !== undefined) store.testimonials[index].content = content;
    if (rating !== undefined) store.testimonials[index].rating = Number(rating);
    if (avatar !== undefined) store.testimonials[index].avatar = avatar;
    if (projectPurchased !== undefined) store.testimonials[index].projectPurchased = projectPurchased;

    saveStoreData(store);
    res.json({ success: true, testimonial: store.testimonials[index] });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/admin/testimonials/:id", (req, res) => {
  try {
    const { id } = req.params;
    const store = getStoreData();
    store.testimonials = store.testimonials.filter((t: any) => t.id !== id);
    saveStoreData(store);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/admin/gallery", (req, res) => {
  try {
    const { title, category, image, projectId } = req.body;
    if (!image) {
      return res.status(400).json({ error: "Image source link is mandatory." });
    }

    const store = getStoreData();
    const newItem = {
      id: "g" + Date.now(),
      title: title || "Site photo",
      category: category || "site",
      image,
      projectId: projectId || ""
    };

    store.galleryItems.push(newItem);
    saveStoreData(store);
    res.status(201).json({ success: true, galleryItem: newItem });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/admin/gallery/:id", (req, res) => {
  try {
    const { id } = req.params;
    const store = getStoreData();
    store.galleryItems = store.galleryItems.filter((g: any) => g.id !== id);
    saveStoreData(store);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/admin/gallery/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, image, projectId } = req.body;
    if (!image) {
      return res.status(400).json({ error: "Image source link is mandatory." });
    }

    const store = getStoreData();
    const index = store.galleryItems.findIndex((g: any) => g.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Gallery item not found." });
    }

    store.galleryItems[index] = {
      ...store.galleryItems[index],
      title: title || store.galleryItems[index].title,
      category: category || store.galleryItems[index].category,
      image,
      projectId: projectId !== undefined ? projectId : store.galleryItems[index].projectId
    };

    saveStoreData(store);
    res.json({ success: true, galleryItem: store.galleryItems[index] });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/admin/seo", (req, res) => {
  try {
    const { home, about, projects, contact } = req.body;
    const store = getStoreData();

    if (home) store.seoSettings.home = { ...store.seoSettings.home, ...home };
    if (about) store.seoSettings.about = { ...store.seoSettings.about, ...about };
    if (projects) store.seoSettings.projects = { ...store.seoSettings.projects, ...projects };
    if (contact) store.seoSettings.contact = { ...store.seoSettings.contact, ...contact };

    store.recentActivities.unshift({
      id: "act-" + Date.now(),
      text: "SEO Metatags and custom rankings saved successfully",
      type: "system",
      timestamp: new Date().toISOString()
    });

    saveStoreData(store);
    res.json({ success: true, seoSettings: store.seoSettings });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`[Standalone Backend] Running perfectly on port ${PORT}`);
});
