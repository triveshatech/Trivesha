import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    subtitle: {
      type: String,
      trim: true,
      maxlength: [200, "Subtitle cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: [100, "Slug cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    longDescription: {
      type: String,
      trim: true,
      maxlength: [2000, "Long description cannot exceed 2000 characters"],
    },
    category: {
      type: String,
      required: [true, "Project category is required"],
      enum: [
        "Web Design",
        "Web Development",
        "Mobile Apps",
        "Games",
        "Maintenance",
        "Featured",
      ],
      default: "Web Development",
    },
    client: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
      maxlength: [100, "Client name cannot exceed 100 characters"],
    },
    image: {
      type: String,
      required: [true, "Project image is required"],
    },
    images: [
      {
        type: String,
      },
    ],
    heroImage: {
      type: String,
    },
    tags: [
      {
        type: String,
        trim: true,
        maxlength: [50, "Tag cannot exceed 50 characters"],
      },
    ],
    results: [
      {
        type: String,
        trim: true,
        maxlength: [200, "Result cannot exceed 200 characters"],
      },
    ],
    link: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          if (!v) return true; // Allow empty
          return /^https?:\/\/.+/.test(v) || v.startsWith("/");
        },
        message: "Link must be a valid URL or internal path",
      },
    },
    externalLink: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          if (!v) return true; // Allow empty
          return /^https?:\/\/.+/.test(v);
        },
        message: "External link must be a valid URL",
      },
    },
    liveUrl: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          if (!v) return true; // Allow empty
          return /^https?:\/\/.+/.test(v);
        },
        message: "Live URL must be a valid URL",
      },
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    order: {
      type: Number,
      default: 0,
    },
    // Enhanced project details for dynamic templates
    duration: {
      type: String,
      trim: true,
      maxlength: [50, "Duration cannot exceed 50 characters"],
    },
    teamSize: {
      type: String,
      trim: true,
      maxlength: [50, "Team size cannot exceed 50 characters"],
    },
    budget: {
      type: String,
      trim: true,
      maxlength: [50, "Budget cannot exceed 50 characters"],
    },
    completionDate: {
      type: String,
      trim: true,
      maxlength: [50, "Completion date cannot exceed 50 characters"],
    },
    challenge: {
      type: String,
      trim: true,
      maxlength: [1000, "Challenge cannot exceed 1000 characters"],
    },
    solution: {
      type: String,
      trim: true,
      maxlength: [1000, "Solution cannot exceed 1000 characters"],
    },
    keyResults: [
      {
        metric: {
          type: String,
          trim: true,
          maxlength: [20, "Metric cannot exceed 20 characters"],
        },
        description: {
          type: String,
          trim: true,
          maxlength: [100, "Description cannot exceed 100 characters"],
        },
        icon: {
          type: String,
          trim: true,
          maxlength: [50, "Icon cannot exceed 50 characters"],
        },
      },
    ],
    technologies: [
      {
        name: {
          type: String,
          trim: true,
          maxlength: [50, "Technology name cannot exceed 50 characters"],
        },
        category: {
          type: String,
          trim: true,
          maxlength: [50, "Category cannot exceed 50 characters"],
        },
        color: {
          type: String,
          trim: true,
          maxlength: [50, "Color cannot exceed 50 characters"],
        },
      },
    ],
    timeline: [
      {
        phase: {
          type: String,
          trim: true,
          maxlength: [100, "Phase name cannot exceed 100 characters"],
        },
        duration: {
          type: String,
          trim: true,
          maxlength: [50, "Duration cannot exceed 50 characters"],
        },
        description: {
          type: String,
          trim: true,
          maxlength: [300, "Description cannot exceed 300 characters"],
        },
        deliverables: [
          {
            type: String,
            trim: true,
            maxlength: [100, "Deliverable cannot exceed 100 characters"],
          },
        ],
      },
    ],
    features: [
      {
        type: String,
        trim: true,
        maxlength: [200, "Feature cannot exceed 200 characters"],
      },
    ],
    challenges: [
      {
        type: String,
        trim: true,
        maxlength: [300, "Challenge cannot exceed 300 characters"],
      },
    ],
    solutions: [
      {
        type: String,
        trim: true,
        maxlength: [300, "Solution cannot exceed 300 characters"],
      },
    ],
    metrics: {
      type: Map,
      of: String,
    },
    testimonials: [
      {
        quote: {
          type: String,
          trim: true,
          maxlength: [500, "Testimonial quote cannot exceed 500 characters"],
        },
        author: {
          type: String,
          trim: true,
          maxlength: [100, "Author name cannot exceed 100 characters"],
        },
        position: {
          type: String,
          trim: true,
          maxlength: [100, "Position cannot exceed 100 characters"],
        },
        company: {
          type: String,
          trim: true,
          maxlength: [100, "Company name cannot exceed 100 characters"],
        },
        avatar: {
          type: String,
          trim: true,
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
projectSchema.index({ category: 1, status: 1 });
projectSchema.index({ featured: 1, status: 1 });
projectSchema.index({ status: 1, order: 1 });
projectSchema.index({ title: "text", description: "text" });

// Virtual for full project URL
projectSchema.virtual("fullImageUrl").get(function () {
  if (!this.image) return null;
  if (this.image.startsWith("http")) return this.image;
  return `${process.env.BASE_URL || "http://localhost:5000"}${this.image}`;
});

// Virtual for full image URLs array
projectSchema.virtual("fullImageUrls").get(function () {
  if (!this.images || this.images.length === 0) return [];
  return this.images.map((img) => {
    if (img.startsWith("http")) return img;
    return `${process.env.BASE_URL || "http://localhost:5000"}${img}`;
  });
});

// Pre-save middleware to generate slug and update updatedBy
projectSchema.pre("save", async function (next) {
  // Generate slug from title if not provided
  if (!this.slug || this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }

  // Enforce single featured project constraint
  if (this.isModified("featured") && this.featured === true) {
    // Unfeature all other projects
    await this.constructor.updateMany(
      { _id: { $ne: this._id } },
      { featured: false }
    );
    console.log(
      "🌟 Database hook: Unfeatured all other projects, featuring:",
      this.title
    );
  }

  if (this.isModified() && !this.isNew) {
    this.updatedBy = this.createdBy; // In a real app, you'd get this from the request context
  }
  next();
});

// Static method to find by slug
projectSchema.statics.findBySlug = function (slug) {
  return this.findOne({ slug, status: "published" });
};

// Static method to get published projects
projectSchema.statics.getPublished = function (filters = {}) {
  const query = { status: "published", ...filters };
  return this.find(query).sort({ order: 1, createdAt: -1 });
};

// Static method to get featured projects
projectSchema.statics.getFeatured = function () {
  return this.findOne({ featured: true, status: "published" }).sort({
    createdAt: -1,
  });
};

// Static method to set featured project (ensures only one featured)
projectSchema.statics.setFeatured = async function (projectId) {
  // First, unfeature all projects
  await this.updateMany({}, { featured: false });

  // Then, feature the specified project
  const result = await this.findByIdAndUpdate(
    projectId,
    { featured: true },
    { new: true }
  );

  console.log("🌟 Set featured project:", result?.title);
  return result;
};

// Static method to unfeature all projects
projectSchema.statics.unfeatureAll = function () {
  return this.updateMany({}, { featured: false });
};

// Static method to get projects by category
projectSchema.statics.getByCategory = function (category) {
  return this.find({ category, status: "published" }).sort({
    order: 1,
    createdAt: -1,
  });
};

const Project = mongoose.model("Project", projectSchema);

export default Project;
