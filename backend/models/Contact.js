import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    company: {
      type: String,
      trim: true,
      maxlength: [100, "Company name cannot exceed 100 characters"],
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [20, "Phone number cannot exceed 20 characters"],
    },
    projectType: {
      type: String,
      enum: [
        "Website Development",
        "Mobile App Development",
        "UI/UX Design",
        "Backend Development",
        "Game Development",
        "Website Redesign",
        "Maintenance & Support",
        "Other",
      ],
    },
    budget: {
      type: String,
      enum: [
        "₹10k - ₹25k",
        "₹25k - ₹50k",
        "₹50k - ₹1L",
        "₹1L - ₹3L",
        "₹3L+",
        "Let's discuss",
      ],
    },
    timeline: {
      type: String,
      enum: [
        "ASAP (Rush job)",
        "1-2 weeks",
        "1-2 months",
        "3-6 months",
        "6+ months",
        "Flexible",
      ],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [2000, "Message cannot exceed 2000 characters"],
    },
    status: {
      type: String,
      enum: ["new", "contacted", "in-progress", "completed", "archived"],
      default: "new",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    source: {
      type: String,
      default: "website",
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    emailSentToUser: {
      type: Boolean,
      default: false,
    },
    emailSentToAdmin: {
      type: Boolean,
      default: false,
    },
    adminNotes: {
      type: String,
      maxlength: [1000, "Admin notes cannot exceed 1000 characters"],
    },
    followUpDate: {
      type: Date,
    },
    assignedTo: {
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

// Virtual for full contact info
contactSchema.virtual("fullContactInfo").get(function () {
  let info = this.name;
  if (this.company) info += ` (${this.company})`;
  if (this.email) info += ` - ${this.email}`;
  if (this.phone) info += ` - ${this.phone}`;
  return info;
});

// Index for better query performance
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ createdAt: -1 });
contactSchema.index({ priority: 1 });

// Static method to get contact statistics
contactSchema.statics.getStats = async function () {
  const stats = await this.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const totalContacts = await this.countDocuments();
  const recentContacts = await this.countDocuments({
    createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
  });

  return {
    total: totalContacts,
    recent: recentContacts,
    byStatus: stats,
  };
};

// Instance method to format for email
contactSchema.methods.formatForEmail = function () {
  return {
    name: this.name,
    email: this.email,
    company: this.company || "Not specified",
    phone: this.phone || "Not provided",
    projectType: this.projectType || "Not specified",
    budget: this.budget || "Not specified",
    timeline: this.timeline || "Not specified",
    message: this.message,
    submittedAt: this.createdAt.toLocaleString(),
    id: this._id,
  };
};

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
