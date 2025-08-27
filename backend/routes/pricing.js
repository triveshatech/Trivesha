import express from "express";
import { body, validationResult } from "express-validator";
import PricingPlan from "../models/PricingPlan.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// @desc    Get all pricing plans (Public)
// @route   GET /api/pricing
// @access  Public
router.get("/", async (req, res) => {
  try {
    const plans = await PricingPlan.getActivePlans();

    res.json({
      success: true,
      data: {
        plans: plans.map((plan) => plan.getPublicData()),
      },
    });
  } catch (error) {
    console.error("Get pricing plans error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// Apply authentication to admin routes
router.use(protect);
router.use(authorize("admin"));

// @desc    Get all pricing plans for admin
// @route   GET /api/pricing/admin
// @access  Private (Admin only)
router.get("/admin", async (req, res) => {
  try {
    const plans = await PricingPlan.find({})
      .populate("createdBy", "firstName lastName email")
      .populate("updatedBy", "firstName lastName email")
      .sort({ order: 1, createdAt: 1 });

    res.json({
      success: true,
      data: { plans },
    });
  } catch (error) {
    console.error("Get admin pricing plans error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @desc    Get single pricing plan
// @route   GET /api/pricing/admin/:id
// @access  Private (Admin only)
router.get("/admin/:id", async (req, res) => {
  try {
    const plan = await PricingPlan.findById(req.params.id)
      .populate("createdBy", "firstName lastName email")
      .populate("updatedBy", "firstName lastName email");

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Pricing plan not found",
      });
    }

    res.json({
      success: true,
      data: { plan },
    });
  } catch (error) {
    console.error("Get pricing plan error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @desc    Create pricing plan
// @route   POST /api/pricing/admin
// @access  Private (Admin only)
router.post(
  "/admin",
  [
    body("name")
      .trim()
      .isLength({ min: 1, max: 50 })
      .withMessage("Plan name is required and must be less than 50 characters"),
    body("price")
      .trim()
      .isLength({ min: 1, max: 50 })
      .withMessage("Price is required and must be less than 50 characters"),
    body("description")
      .trim()
      .isLength({ min: 1, max: 500 })
      .withMessage(
        "Description is required and must be less than 500 characters"
      ),
    body("features")
      .isArray({ min: 1 })
      .withMessage("At least one feature is required"),
    body("features.*")
      .trim()
      .isLength({ min: 1, max: 200 })
      .withMessage("Each feature must be between 1 and 200 characters"),
    body("cta")
      .trim()
      .isLength({ min: 1, max: 50 })
      .withMessage("CTA text is required and must be less than 50 characters"),
    body("order")
      .isInt({ min: 0, max: 2 })
      .withMessage("Order must be 0, 1, or 2"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: errors.array(),
        });
      }

      const {
        name,
        price,
        priceNote,
        description,
        popular,
        features,
        cta,
        note,
        order,
      } = req.body;

      // Check if order is already taken
      const existingPlan = await PricingPlan.findOne({ order, isActive: true });
      if (existingPlan) {
        return res.status(400).json({
          success: false,
          message: `Order ${order} is already taken by "${existingPlan.name}" plan`,
        });
      }

      const plan = await PricingPlan.create({
        name,
        price,
        priceNote,
        description,
        popular: popular || false,
        features,
        cta,
        note,
        order,
        createdBy: req.user.id,
      });

      await plan.populate("createdBy", "firstName lastName email");

      res.status(201).json({
        success: true,
        message: "Pricing plan created successfully",
        data: { plan },
      });
    } catch (error) {
      console.error("Create pricing plan error:", error);

      if (error.message === "Maximum of 3 pricing plans allowed") {
        return res.status(400).json({
          success: false,
          message:
            "Maximum of 3 pricing plans allowed. Please deactivate an existing plan first.",
        });
      }

      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
);

// @desc    Update pricing plan
// @route   PUT /api/pricing/admin/:id
// @access  Private (Admin only)
router.put(
  "/admin/:id",
  [
    body("name")
      .optional()
      .trim()
      .isLength({ min: 1, max: 50 })
      .withMessage("Plan name must be less than 50 characters"),
    body("price")
      .optional()
      .trim()
      .isLength({ min: 1, max: 50 })
      .withMessage("Price must be less than 50 characters"),
    body("description")
      .optional()
      .trim()
      .isLength({ min: 1, max: 500 })
      .withMessage("Description must be less than 500 characters"),
    body("features")
      .optional()
      .isArray({ min: 1 })
      .withMessage("At least one feature is required"),
    body("features.*")
      .optional()
      .trim()
      .isLength({ min: 1, max: 200 })
      .withMessage("Each feature must be between 1 and 200 characters"),
    body("cta")
      .optional()
      .trim()
      .isLength({ min: 1, max: 50 })
      .withMessage("CTA text must be less than 50 characters"),
    body("order")
      .optional()
      .isInt({ min: 0, max: 2 })
      .withMessage("Order must be 0, 1, or 2"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: errors.array(),
        });
      }

      const plan = await PricingPlan.findById(req.params.id);
      if (!plan) {
        return res.status(404).json({
          success: false,
          message: "Pricing plan not found",
        });
      }

      // Check if order is being changed and if it's already taken
      if (req.body.order !== undefined && req.body.order !== plan.order) {
        const existingPlan = await PricingPlan.findOne({
          order: req.body.order,
          isActive: true,
          _id: { $ne: plan._id },
        });
        if (existingPlan) {
          return res.status(400).json({
            success: false,
            message: `Order ${req.body.order} is already taken by "${existingPlan.name}" plan`,
          });
        }
      }

      // Update the plan
      Object.assign(plan, {
        ...req.body,
        updatedBy: req.user.id,
      });

      await plan.save();
      await plan.populate("updatedBy", "firstName lastName email");

      res.json({
        success: true,
        message: "Pricing plan updated successfully",
        data: { plan },
      });
    } catch (error) {
      console.error("Update pricing plan error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
);

// @desc    Toggle popular status
// @route   PATCH /api/pricing/admin/:id/popular
// @access  Private (Admin only)
router.patch("/admin/:id/popular", async (req, res) => {
  try {
    const plan = await PricingPlan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Pricing plan not found",
      });
    }

    if (plan.popular) {
      // If already popular, remove popular status
      plan.popular = false;
      await plan.save();
    } else {
      // Set this plan as popular (automatically removes from others)
      await PricingPlan.setPopularPlan(plan._id);
    }

    await plan.populate("updatedBy", "firstName lastName email");

    res.json({
      success: true,
      message: `Plan ${
        plan.popular ? "marked as popular" : "unmarked as popular"
      }`,
      data: { plan },
    });
  } catch (error) {
    console.error("Toggle popular status error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @desc    Delete pricing plan (soft delete)
// @route   DELETE /api/pricing/admin/:id
// @access  Private (Admin only)
router.delete("/admin/:id", async (req, res) => {
  try {
    const plan = await PricingPlan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Pricing plan not found",
      });
    }

    // Soft delete by setting isActive to false
    plan.isActive = false;
    plan.updatedBy = req.user.id;
    await plan.save();

    res.json({
      success: true,
      message: "Pricing plan deactivated successfully",
    });
  } catch (error) {
    console.error("Delete pricing plan error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @desc    Restore pricing plan
// @route   PATCH /api/pricing/admin/:id/restore
// @access  Private (Admin only)
router.patch("/admin/:id/restore", async (req, res) => {
  try {
    const plan = await PricingPlan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Pricing plan not found",
      });
    }

    // Check if we already have 3 active plans
    const activePlansCount = await PricingPlan.countDocuments({
      isActive: true,
    });
    if (activePlansCount >= 3) {
      return res.status(400).json({
        success: false,
        message:
          "Maximum of 3 pricing plans allowed. Please deactivate an existing plan first.",
      });
    }

    plan.isActive = true;
    plan.updatedBy = req.user.id;
    await plan.save();

    res.json({
      success: true,
      message: "Pricing plan restored successfully",
      data: { plan },
    });
  } catch (error) {
    console.error("Restore pricing plan error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @desc    Reorder pricing plans
// @route   PATCH /api/pricing/admin/reorder
// @access  Private (Admin only)
router.patch(
  "/admin/reorder",
  [
    body("plans")
      .isArray({ min: 1, max: 3 })
      .withMessage("Plans array must contain 1-3 items"),
    body("plans.*.id").notEmpty().withMessage("Plan ID is required"),
    body("plans.*.order")
      .isInt({ min: 0, max: 2 })
      .withMessage("Order must be 0, 1, or 2"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: errors.array(),
        });
      }

      const { plans } = req.body;

      // Update all plans in a transaction-like manner
      const updatePromises = plans.map(({ id, order }) =>
        PricingPlan.findByIdAndUpdate(
          id,
          { order, updatedBy: req.user.id },
          { new: true }
        )
      );

      await Promise.all(updatePromises);

      // Get updated plans
      const updatedPlans = await PricingPlan.getActivePlans();

      res.json({
        success: true,
        message: "Pricing plans reordered successfully",
        data: { plans: updatedPlans },
      });
    } catch (error) {
      console.error("Reorder pricing plans error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
);

export default router;
