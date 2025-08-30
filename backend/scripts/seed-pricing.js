// seed-pricing.js - Script to initialize default pricing plans
import mongoose from "mongoose";
import dotenv from "dotenv";
import PricingPlan from "../models/PricingPlan.js";
import User from "../models/User.js";

// Load environment variables
dotenv.config({ path: "./.env" });

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

// Default pricing plans data
const defaultPlans = [
  {
    name: "Starter",
    price: "₹8k–₹25k",
    priceNote: "Starting from ₹8,000",
    description: "Perfect for small businesses and personal websites",
    popular: false,
    features: [
      "1–3 responsive pages",
      "Mobile-first design",
      "Basic SEO setup",
      "SSL certificate included",
      "Domain setup help",
      "30-day post-launch support",
      "Contact form integration",
    ],
    cta: "Choose Starter",
    note: "Custom features available on request",
    order: 0,
    isActive: true,
  },
  {
    name: "Growth",
    price: "₹25k–₹80k",
    priceNote: "Starting from ₹25,000",
    description: "For businesses with dynamic content and custom needs",
    popular: true,
    features: [
      "5–10 custom pages",
      "Content Management System",
      "Custom UI/UX design",
      "Backend integration",
      "Analytics setup",
      "60-day support & updates",
      "Performance optimization",
      "Social media integration",
    ],
    cta: "Choose Growth",
    note: "Most popular for growing businesses",
    order: 1,
    isActive: true,
  },
  {
    name: "Scale",
    price: "₹80k+",
    priceNote: "Starting from ₹80,000",
    description: "Custom applications and enterprise solutions",
    popular: false,
    features: [
      "Unlimited pages & features",
      "Complex backend systems",
      "API integrations",
      "Custom admin dashboard",
      "Advanced analytics",
      "90-day premium support",
      "Performance SLA",
      "Scalable architecture",
    ],
    cta: "Choose Scale",
    note: "Enterprise-grade solutions",
    order: 2,
    isActive: true,
  },
];

const seedPricingPlans = async () => {
  try {
    console.log("🌱 Starting pricing plans seeding...");

    // Find an admin user to set as creator
    let adminUser = await User.findOne({ role: "admin" });

    if (!adminUser) {
      console.log("⚠️  No admin user found. Creating default admin user...");
      adminUser = await User.create({
        username: "admin",
        email: process.env.ADMIN_EMAIL || "admin@trivesha.com",
        password: process.env.ADMIN_PASSWORD || "Admin123!",
        firstName: "Admin",
        lastName: "User",
        role: "admin",
      });
      console.log("✅ Default admin user created");
    }

    // Clear existing pricing plans
    const existingPlansCount = await PricingPlan.countDocuments();
    if (existingPlansCount > 0) {
      console.log(
        `🗑️  Removing ${existingPlansCount} existing pricing plans...`
      );
      await PricingPlan.deleteMany({});
    }

    // Create new pricing plans
    console.log("📄 Creating pricing plans...");

    for (const planData of defaultPlans) {
      const plan = await PricingPlan.create({
        ...planData,
        createdBy: adminUser._id,
      });
      console.log(`✅ Created plan: ${plan.name} (Order: ${plan.order})`);
    }

    console.log("🎉 Pricing plans seeding completed successfully!");

    // Verify the created plans
    const createdPlans = await PricingPlan.find({}).sort({ order: 1 });
    console.log("\n📊 Summary of created plans:");
    createdPlans.forEach((plan) => {
      console.log(
        `  - ${plan.name}: ${plan.price} ${plan.popular ? "⭐" : ""}`
      );
    });

    console.log(`\n✨ Total plans created: ${createdPlans.length}`);
    console.log(
      `🌟 Popular plan: ${createdPlans.find((p) => p.popular)?.name || "None"}`
    );
  } catch (error) {
    console.error("❌ Error seeding pricing plans:", error);

    if (error.code === 11000) {
      console.error("🔄 Duplicate key error - some plans might already exist");
    }

    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
  }
};

const main = async () => {
  await connectDB();
  await seedPricingPlans();
};

// Run the script
main().catch((error) => {
  console.error("❌ Script failed:", error);
  process.exit(1);
});
