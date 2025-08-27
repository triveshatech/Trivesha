import mongoose from "mongoose";

const pricingPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Plan name is required"],
      trim: true,
      maxlength: [50, "Plan name cannot exceed 50 characters"],
    },
    price: {
      type: String,
      required: [true, "Price is required"],
      trim: true,
      maxlength: [50, "Price cannot exceed 50 characters"],
    },
    priceNote: {
      type: String,
      trim: true,
      maxlength: [100, "Price note cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    popular: {
      type: Boolean,
      default: false,
    },
    features: [
      {
        type: String,
        required: [true, "Feature text is required"],
        trim: true,
        maxlength: [200, "Feature cannot exceed 200 characters"],
      },
    ],
    cta: {
      type: String,
      required: [true, "CTA text is required"],
      trim: true,
      maxlength: [50, "CTA text cannot exceed 50 characters"],
    },
    note: {
      type: String,
      trim: true,
      maxlength: [200, "Note cannot exceed 200 characters"],
    },
    order: {
      type: Number,
      default: 0,
      min: 0,
      max: 2, // Only allow 3 plans (0, 1, 2)
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // Additional metadata for admin tracking
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
  }
);

// Ensure only one plan can be marked as popular
pricingPlanSchema.pre("save", async function (next) {
  if (this.isModified("popular") && this.popular === true) {
    // Unmark all other plans as popular
    await this.constructor.updateMany(
      { _id: { $ne: this._id } },
      { popular: false }
    );
    console.log("🌟 Set popular plan:", this.name);
  }

  // Ensure we don't exceed 3 plans
  if (this.isNew) {
    const planCount = await this.constructor.countDocuments({ isActive: true });
    if (planCount >= 3) {
      const error = new Error("Maximum of 3 pricing plans allowed");
      return next(error);
    }
  }

  if (this.isModified() && !this.isNew) {
    this.updatedBy = this.createdBy; // In real app, get from request context
  }
  next();
});

// Index for ordering and performance
pricingPlanSchema.index({ order: 1, isActive: 1 });
pricingPlanSchema.index({ isActive: 1, createdAt: -1 });

// Static method to get active plans in order
pricingPlanSchema.statics.getActivePlans = function () {
  return this.find({ isActive: true })
    .sort({ order: 1, createdAt: 1 })
    .limit(3);
};

// Static method to set popular plan
pricingPlanSchema.statics.setPopularPlan = async function (planId) {
  // First, remove popular status from all plans
  await this.updateMany({}, { popular: false });

  // Then set the specified plan as popular
  const result = await this.findByIdAndUpdate(
    planId,
    { popular: true },
    { new: true }
  );

  console.log("🌟 Set popular plan:", result?.name);
  return result;
};

// Instance method to get public representation
pricingPlanSchema.methods.getPublicData = function () {
  return {
    _id: this._id,
    name: this.name,
    price: this.price,
    priceNote: this.priceNote,
    description: this.description,
    popular: this.popular,
    features: this.features,
    cta: this.cta,
    note: this.note,
    order: this.order,
  };
};

const PricingPlan = mongoose.model("PricingPlan", pricingPlanSchema);

export default PricingPlan;
