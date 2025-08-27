import express from "express";
import { body, validationResult } from "express-validator";
import User from "../models/User.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// Apply authentication to all admin routes
router.use(protect);
router.use(authorize("admin"));

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin only)
router.get("/users", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const role = req.query.role || "";

    const skip = (page - 1) * limit;

    // Build search query
    let query = {};

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { username: { $regex: search, $options: "i" } },
      ];
    }

    if (role) {
      console.log("🔍 Adding role filter:", role);
      query.role = role;
    }

    if (req.query.isActive !== undefined) {
      console.log("🔍 Adding isActive filter:", req.query.isActive);
      query.isActive = req.query.isActive === "true";
    }

    console.log("📊 Final MongoDB Query:", query);

    // Get users with pagination
    const users = await User.find(query)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const total = await User.countDocuments(query);

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @desc    Get single user
// @route   GET /api/admin/users/:id
// @access  Private (Admin only)
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: { user },
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @desc    Create user (Admin only)
// @route   POST /api/admin/users
// @access  Private (Admin only)
router.post(
  "/users",
  [
    body("username")
      .isLength({ min: 3, max: 30 })
      .withMessage("Username must be between 3 and 30 characters")
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage(
        "Username can only contain letters, numbers, and underscores"
      ),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("firstName")
      .trim()
      .isLength({ min: 1, max: 50 })
      .withMessage(
        "First name is required and must be less than 50 characters"
      ),
    body("lastName")
      .trim()
      .isLength({ min: 1, max: 50 })
      .withMessage("Last name is required and must be less than 50 characters"),
    body("role")
      .isIn(["admin", "editor", "viewer"])
      .withMessage("Role must be admin, editor, or viewer"),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: errors.array(),
        });
      }

      const { username, email, password, firstName, lastName, role } = req.body;

      // Check if user already exists
      const emailExists = await User.emailExists(email);
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: "Email already registered",
        });
      }

      const usernameExists = await User.usernameExists(username);
      if (usernameExists) {
        return res.status(400).json({
          success: false,
          message: "Username already taken",
        });
      }

      // Create user
      const user = await User.create({
        username,
        email,
        password,
        firstName,
        lastName,
        role: role || "viewer",
      });

      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: {
          user: user.getPublicProfile(),
        },
      });
    } catch (error) {
      console.error("Create user error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
);

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private (Admin only)
router.put(
  "/users/:id",
  [
    body("firstName")
      .optional()
      .trim()
      .isLength({ min: 1, max: 50 })
      .withMessage("First name must be less than 50 characters"),
    body("lastName")
      .optional()
      .trim()
      .isLength({ min: 1, max: 50 })
      .withMessage("Last name must be less than 50 characters"),
    body("email")
      .optional()
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),
    body("role")
      .optional()
      .isIn(["admin", "editor", "viewer"])
      .withMessage("Role must be admin, editor, or viewer"),
    body("isActive")
      .optional()
      .isBoolean()
      .withMessage("isActive must be a boolean"),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: errors.array(),
        });
      }

      const { firstName, lastName, email, role, isActive } = req.body;

      // Check if user exists
      const existingUser = await User.findById(req.params.id);
      if (!existingUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Check if email is being updated and if it already exists
      if (email && email !== existingUser.email) {
        const emailExists = await User.emailExists(email);
        if (emailExists) {
          return res.status(400).json({
            success: false,
            message: "Email already registered",
          });
        }
      }

      // Update user
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          firstName: firstName || existingUser.firstName,
          lastName: lastName || existingUser.lastName,
          email: email || existingUser.email,
          role: role || existingUser.role,
          isActive: isActive !== undefined ? isActive : existingUser.isActive,
        },
        { new: true, runValidators: true }
      );

      res.json({
        success: true,
        message: "User updated successfully",
        data: {
          user: user.getPublicProfile(),
        },
      });
    } catch (error) {
      console.error("Update user error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
);

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin only)
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete your own account",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private (Admin only)
router.get("/stats", async (req, res) => {
  try {
    // Import models
    const Project = (await import("../models/Project.js")).default;
    const PricingPlan = (await import("../models/PricingPlan.js")).default;

    // User statistics
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const adminUsers = await User.countDocuments({ role: "admin" });
    const editorUsers = await User.countDocuments({ role: "editor" });
    const viewerUsers = await User.countDocuments({ role: "viewer" });

    // Get recent users (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentUsers = await User.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    });

    // Get users who logged in recently (last 24 hours)
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    const recentLogins = await User.countDocuments({
      lastLogin: { $gte: oneDayAgo },
    });

    // Project statistics
    const totalProjects = await Project.countDocuments();
    const publishedProjects = await Project.countDocuments({
      status: "published",
    });
    const draftProjects = await Project.countDocuments({ status: "draft" });
    const featuredProjects = await Project.countDocuments({ featured: true });

    // Projects by category
    const webDesignProjects = await Project.countDocuments({
      category: "Web Design",
      status: "published",
    });
    const webDevProjects = await Project.countDocuments({
      category: "Web Development",
      status: "published",
    });
    const mobileAppProjects = await Project.countDocuments({
      category: "Mobile Apps",
      status: "published",
    });
    const gameProjects = await Project.countDocuments({
      category: "Games",
      status: "published",
    });

    // Recent projects (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentProjects = await Project.countDocuments({
      createdAt: { $gte: thirtyDaysAgo },
    });

    // Pricing plan statistics
    const totalPricingPlans = await PricingPlan.countDocuments();
    const activePricingPlans = await PricingPlan.countDocuments({
      isActive: true,
    });
    const popularPricingPlan = await PricingPlan.findOne({
      popular: true,
      isActive: true,
    });

    res.json({
      success: true,
      data: {
        // User stats
        totalUsers,
        activeUsers,
        adminUsers,
        editorUsers,
        viewerUsers,
        recentUsers,
        recentLogins,

        // Project stats
        totalProjects,
        publishedProjects,
        draftProjects,
        featuredProjects,
        webDesignProjects,
        webDevProjects,
        mobileAppProjects,
        gameProjects,
        recentProjects,

        // Pricing stats
        totalPricingPlans,
        activePricingPlans,
        popularPricingPlan: popularPricingPlan?.name || "None",

        // Growth metrics
        userGrowthRate:
          recentUsers > 0 ? Math.round((recentUsers / totalUsers) * 100) : 0,
        projectGrowthRate:
          recentProjects > 0
            ? Math.round((recentProjects / totalProjects) * 100)
            : 0,
      },
    });
  } catch (error) {
    console.error("Get stats error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @desc    Get recent activity feed
// @route   GET /api/admin/recent-activity
// @access  Private (Admin only)
router.get("/recent-activity", async (req, res) => {
  try {
    const Project = (await import("../models/Project.js")).default;
    const PricingPlan = (await import("../models/PricingPlan.js")).default;

    const limit = parseInt(req.query.limit) || 10;

    // Get recent users
    const recentUsers = await User.find()
      .select("firstName lastName email role createdAt")
      .sort({ createdAt: -1 })
      .limit(Math.floor(limit / 3))
      .lean();

    // Get recent projects
    const recentProjects = await Project.find()
      .select("title status category createdAt")
      .populate("createdBy", "firstName lastName")
      .sort({ createdAt: -1 })
      .limit(Math.floor(limit / 3))
      .lean();

    // Get recent pricing updates
    const recentPricingUpdates = await PricingPlan.find()
      .select("name popular isActive updatedAt")
      .populate("updatedBy", "firstName lastName")
      .sort({ updatedAt: -1 })
      .limit(Math.floor(limit / 3))
      .lean();

    // Combine and format activities
    const activities = [
      ...recentUsers.map((user) => ({
        type: "user",
        action: "User registered",
        details: `${user.firstName} ${user.lastName} (${user.role})`,
        timestamp: user.createdAt,
        icon: "UserPlus",
        color: "blue",
      })),
      ...recentProjects.map((project) => ({
        type: "project",
        action: `Project ${project.status}`,
        details: `${project.title} (${project.category})`,
        timestamp: project.createdAt,
        icon: "FolderPlus",
        color: "green",
      })),
      ...recentPricingUpdates.map((plan) => ({
        type: "pricing",
        action: "Pricing updated",
        details: `${plan.name} plan ${plan.popular ? "(marked popular)" : ""}`,
        timestamp: plan.updatedAt,
        icon: "DollarSign",
        color: "orange",
      })),
    ];

    // Sort by timestamp and limit
    const sortedActivities = activities
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);

    res.json({
      success: true,
      data: {
        activities: sortedActivities,
        total: activities.length,
      },
    });
  } catch (error) {
    console.error("Get recent activity error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;
