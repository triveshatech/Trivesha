import mongoose from "mongoose";
import Project from "../models/Project.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: "./.env" });

const migrateProjects = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("🔌 Connected to MongoDB");

    // Get all existing projects
    const projects = await Project.find({});
    console.log(`📋 Found ${projects.length} projects to migrate`);

    let migratedCount = 0;

    for (const project of projects) {
      let needsUpdate = false;

      // Generate slug if missing
      if (!project.slug) {
        project.slug = project.title
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "-")
          .replace(/-+/g, "-")
          .replace(/^-|-$/g, "");
        needsUpdate = true;
        console.log(
          `  📝 Generated slug for "${project.title}": ${project.slug}`
        );
      }

      // Initialize new array fields if missing
      if (!project.keyResults || project.keyResults.length === 0) {
        project.keyResults = [];
        needsUpdate = true;
      }

      if (!project.technologies || project.technologies.length === 0) {
        project.technologies = [];
        needsUpdate = true;
      }

      if (!project.timeline || project.timeline.length === 0) {
        project.timeline = [];
        needsUpdate = true;
      }

      if (!project.features || project.features.length === 0) {
        project.features = [];
        needsUpdate = true;
      }

      if (!project.testimonials || project.testimonials.length === 0) {
        project.testimonials = [];
        needsUpdate = true;
      }

      if (!project.images || project.images.length === 0) {
        project.images = [];
        needsUpdate = true;
      }

      // Add sample data for demonstration (optional)
      if (
        project.title.toLowerCase().includes("ecommerce") &&
        project.keyResults.length === 0
      ) {
        project.keyResults = [
          {
            metric: "45%",
            description: "Increase in conversion rate",
            icon: "trending-up",
          },
          {
            metric: "65%",
            description: "Reduction in cart abandonment",
            icon: "users",
          },
          {
            metric: "200%",
            description: "Improvement in mobile sales",
            icon: "zap",
          },
        ];

        project.technologies = [
          { name: "React", category: "Frontend", color: "text-[#61DAFB]" },
          { name: "Node.js", category: "Backend", color: "text-[#47A248]" },
          { name: "MongoDB", category: "Database", color: "text-[#47A248]" },
          { name: "Stripe", category: "Payment", color: "text-[#635BFF]" },
        ];

        project.features = [
          "Advanced product search and filtering",
          "One-click checkout process",
          "Responsive mobile-first design",
          "Real-time inventory management",
          "Personalized product recommendations",
        ];

        project.challenge =
          "The existing e-commerce platform had a 68% cart abandonment rate, poor mobile experience, and confusing navigation. Users struggled to find products and the checkout process was lengthy.";

        project.solution =
          "We conducted extensive user research, redesigned the entire user journey, implemented a modern responsive design system, and streamlined the checkout process with mobile-first experience.";

        needsUpdate = true;
        console.log(`  🎨 Added sample rich content for "${project.title}"`);
      }

      // Save if any changes were made
      if (needsUpdate) {
        await project.save();
        migratedCount++;
        console.log(`  ✅ Updated project: ${project.title}`);
      }
    }

    console.log(`\n🎉 Migration completed! Updated ${migratedCount} projects`);
    console.log("\n📋 Summary:");
    console.log(`  • Total projects: ${projects.length}`);
    console.log(`  • Projects updated: ${migratedCount}`);
    console.log(
      `  • Projects with slugs: ${projects.filter((p) => p.slug).length}`
    );
    console.log("\n🚀 Next steps:");
    console.log("  1. Start your server: npm run dev");
    console.log(
      "  2. Visit admin panel: http://localhost:3000/admin/portfolio-enhanced"
    );
    console.log("  3. Edit projects to add rich content");
    console.log(
      "  4. Test dynamic pages: http://localhost:3000/portfolio/{slug}"
    );
  } catch (error) {
    console.error("❌ Migration failed:", error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log("🔌 Disconnected from MongoDB");
  }
};

// Check if this script is being run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log("🚀 Starting project migration...\n");
  migrateProjects();
}

export default migrateProjects;
