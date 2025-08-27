import mongoose from "mongoose";
import dotenv from "dotenv";
import Project from "./models/Project.js";
import User from "./models/User.js";

// Load environment variables
dotenv.config({ path: "./config.env" });

const sampleProjects = [
  {
    title: "E-Commerce Platform Redesign",
    subtitle: "Complete Digital Transformation",
    description:
      "Complete UI/UX overhaul that increased conversion rates by 45% for a leading fashion retailer. Implemented modern design patterns, improved user experience, and integrated advanced analytics.",
    category: "Web Design",
    client: "Fashion Forward",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500",
    tags: ["Figma", "React", "TypeScript", "E-commerce"],
    results: [
      "45% increase in conversion rates",
      "60% improvement in page load speed",
      "30% reduction in cart abandonment",
    ],
    link: "/portfolio/ecommerce-redesign",
    externalLink: "https://fashionforward.com",
    featured: true,
    status: "published",
    order: 1,
    technologies: [
      { name: "React", category: "Frontend", color: "#61DAFB" },
      { name: "TypeScript", category: "Language", color: "#3178C6" },
      { name: "Node.js", category: "Backend", color: "#339933" },
      { name: "MongoDB", category: "Database", color: "#47A248" },
    ],
    duration: "3 months",
    teamSize: 4,
    budget: "$25,000 - $35,000",
  },
  {
    title: "FinTech Mobile App",
    subtitle: "Secure Banking Solution",
    description:
      "Secure banking app with biometric authentication serving 100K+ active users daily. Built with React Native for cross-platform compatibility and enhanced security features.",
    category: "Mobile Apps",
    client: "SecureBank",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500",
    tags: ["React Native", "Node.js", "MongoDB", "Biometrics"],
    results: [
      "100K+ daily active users",
      "99.9% uptime achieved",
      "Zero security breaches",
    ],
    link: "/portfolio/fintech-app",
    externalLink: "https://securebank.com",
    featured: false,
    status: "published",
    order: 2,
    technologies: [
      { name: "React Native", category: "Mobile", color: "#61DAFB" },
      { name: "Node.js", category: "Backend", color: "#339933" },
      { name: "MongoDB", category: "Database", color: "#47A248" },
      { name: "AWS", category: "Cloud", color: "#FF9900" },
    ],
    duration: "6 months",
    teamSize: 6,
    budget: "$50,000 - $75,000",
  },
  {
    title: "SaaS Dashboard Development",
    subtitle: "Real-time Analytics Platform",
    description:
      "Real-time analytics dashboard processing 1M+ data points for enterprise clients. Advanced data visualization and reporting capabilities for business intelligence.",
    category: "Web Development",
    client: "DataFlow Pro",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500",
    tags: ["Next.js", "PostgreSQL", "AWS", "Analytics"],
    results: [
      "1M+ data points processed daily",
      "Real-time dashboard updates",
      "50% faster reporting",
    ],
    link: "/portfolio/saas-dashboard",
    externalLink: "https://dataflowpro.com",
    featured: false,
    status: "published",
    order: 3,
    technologies: [
      { name: "Next.js", category: "Frontend", color: "#000000" },
      { name: "PostgreSQL", category: "Database", color: "#336791" },
      { name: "AWS", category: "Cloud", color: "#FF9900" },
      { name: "D3.js", category: "Visualization", color: "#F68E56" },
    ],
    duration: "4 months",
    teamSize: 5,
    budget: "$40,000 - $60,000",
  },
  {
    title: "Casual Puzzle Game",
    subtitle: "HTML5 Mobile Game",
    description:
      "HTML5 puzzle game with 500K+ downloads and 4.8-star rating on mobile stores. Engaging gameplay mechanics with social features and in-app purchases.",
    category: "Games",
    client: "GameStudio XYZ",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500",
    tags: ["Phaser.js", "Canvas", "WebGL", "Mobile"],
    results: ["500K+ downloads", "4.8-star rating", "$100K+ revenue generated"],
    link: "/case-study/puzzle-game",
    externalLink: "https://puzzlegame.com",
    featured: false,
    status: "published",
    order: 4,
    technologies: [
      { name: "Phaser.js", category: "Game Engine", color: "#8A2BE2" },
      { name: "Canvas", category: "Graphics", color: "#FF4500" },
      { name: "WebGL", category: "Graphics", color: "#990000" },
      { name: "Cordova", category: "Mobile", color: "#E8E8E8" },
    ],
    duration: "5 months",
    teamSize: 3,
    budget: "$30,000 - $45,000",
  },
  {
    title: "Restaurant Chain Website",
    subtitle: "Multi-location Platform",
    description:
      "Multi-location restaurant website with online ordering and table reservation system. Integrated with POS systems and delivery services.",
    category: "Web Design",
    client: "Spice Route",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500",
    tags: ["Figma", "WordPress", "WooCommerce", "POS"],
    results: [
      "200% increase in online orders",
      "Multi-location management",
      "Seamless POS integration",
    ],
    link: "/case-study/restaurant-website",
    externalLink: "https://spiceroute.com",
    featured: false,
    status: "published",
    order: 5,
    technologies: [
      { name: "WordPress", category: "CMS", color: "#21759B" },
      { name: "WooCommerce", category: "E-commerce", color: "#96588A" },
      { name: "PHP", category: "Backend", color: "#777BB4" },
      { name: "MySQL", category: "Database", color: "#4479A1" },
    ],
    duration: "2 months",
    teamSize: 3,
    budget: "$15,000 - $25,000",
  },
  {
    title: "Cloud Infrastructure Optimization",
    subtitle: "Performance & Cost Optimization",
    description:
      "Reduced hosting costs by 60% while improving performance for high-traffic application. Implemented auto-scaling and CDN optimization.",
    category: "Maintenance",
    client: "TechScale Inc",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500",
    tags: ["AWS", "Docker", "Kubernetes", "CDN"],
    results: [
      "60% cost reduction",
      "50% performance improvement",
      "Auto-scaling implemented",
    ],
    link: "/case-study/cloud-optimization",
    externalLink: "https://techscale.com",
    featured: false,
    status: "published",
    order: 6,
    technologies: [
      { name: "AWS", category: "Cloud", color: "#FF9900" },
      { name: "Docker", category: "DevOps", color: "#2496ED" },
      { name: "Kubernetes", category: "DevOps", color: "#326CE5" },
      { name: "CloudFront", category: "CDN", color: "#FF9900" },
    ],
    duration: "3 months",
    teamSize: 4,
    budget: "$20,000 - $35,000",
  },
  {
    title: "Healthcare Management System",
    subtitle: "HIPAA-Compliant Platform",
    description:
      "HIPAA-compliant patient management system for 50+ medical practices. Secure data handling with advanced reporting and analytics.",
    category: "Web Development",
    client: "MedCare Solutions",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500",
    tags: ["Vue.js", "Laravel", "MySQL", "HIPAA"],
    results: [
      "50+ medical practices onboarded",
      "HIPAA compliance achieved",
      "Streamlined patient management",
    ],
    link: "/case-study/healthcare-system",
    externalLink: "https://medcare.com",
    featured: false,
    status: "published",
    order: 7,
    technologies: [
      { name: "Vue.js", category: "Frontend", color: "#4FC08D" },
      { name: "Laravel", category: "Backend", color: "#FF2D20" },
      { name: "MySQL", category: "Database", color: "#4479A1" },
      { name: "Redis", category: "Cache", color: "#DC382D" },
    ],
    duration: "8 months",
    teamSize: 7,
    budget: "$80,000 - $120,000",
  },
  {
    title: "Learning Management App",
    subtitle: "Educational Platform",
    description:
      "Educational app with offline capabilities used by 250K+ students across India. Comprehensive learning management with progress tracking.",
    category: "Mobile Apps",
    client: "EduTech Prime",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500",
    tags: ["Flutter", "Firebase", "Dart", "Offline"],
    results: [
      "250K+ students enrolled",
      "Offline learning capabilities",
      "95% user satisfaction",
    ],
    link: "/case-study/learning-app",
    externalLink: "https://edutechprime.com",
    featured: false,
    status: "published",
    order: 8,
    technologies: [
      { name: "Flutter", category: "Mobile", color: "#02569B" },
      { name: "Firebase", category: "Backend", color: "#FFCA28" },
      { name: "Dart", category: "Language", color: "#0175C2" },
      { name: "SQLite", category: "Database", color: "#003B57" },
    ],
    duration: "7 months",
    teamSize: 5,
    budget: "$60,000 - $90,000",
  },
  {
    title: "Racing Game Mobile",
    subtitle: "3D Multiplayer Racing",
    description:
      "3D racing game with multiplayer support and in-app purchase integration. High-performance graphics with real-time multiplayer functionality.",
    category: "Games",
    client: "Speed Games",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=500",
    tags: ["Unity", "C#", "Photon", "3D"],
    results: ["1M+ downloads", "Real-time multiplayer", "$200K+ revenue"],
    link: "/case-study/racing-game",
    externalLink: "https://speedgames.com",
    featured: false,
    status: "published",
    order: 9,
    technologies: [
      { name: "Unity", category: "Game Engine", color: "#000000" },
      { name: "C#", category: "Language", color: "#239120" },
      { name: "Photon", category: "Networking", color: "#0099FF" },
      { name: "Blender", category: "3D Graphics", color: "#F5792A" },
    ],
    duration: "10 months",
    teamSize: 6,
    budget: "$100,000 - $150,000",
  },
];

const seedPortfolio = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Get or create a default admin user
    let adminUser = await User.findOne({ role: "admin" });
    if (!adminUser) {
      adminUser = await User.create({
        username: "admin",
        email: process.env.ADMIN_EMAIL || "admin@trivedia.com",
        password: process.env.ADMIN_PASSWORD || "admin123",
        firstName: "Admin",
        lastName: "User",
        role: "admin",
      });
      console.log("Created default admin user");
    }

    // Clear existing projects
    await Project.deleteMany({});
    console.log("Cleared existing projects");

    // Add sample projects one by one to ensure slug generation
    const projectsWithUser = sampleProjects.map((project) => ({
      ...project,
      createdBy: adminUser._id,
      updatedBy: adminUser._id,
    }));

    const createdProjects = [];
    for (const projectData of projectsWithUser) {
      const project = new Project(projectData);
      await project.save();
      createdProjects.push(project);
    }

    console.log(`Created ${createdProjects.length} sample projects`);

    console.log("Portfolio seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding portfolio:", error);
    process.exit(1);
  }
};

// Run the seed function
seedPortfolio();
