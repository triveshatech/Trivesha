import express from "express";
import { body, validationResult } from "express-validator";
import Project from "../models/Project.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// Public routes (no authentication required)
// @desc    Get all published projects
// @route   GET /api/portfolio
// @access  Public
router.get("/", async (req, res) => {
  try {
    console.log("📊 Public portfolio request:", req.query);
    const { category, featured, limit = 50, page = 1 } = req.query;
    const skip = (page - 1) * limit;

    let query = { status: "published" };

    if (category && category !== "All") {
      query.category = category;
    }

    if (featured === "true") {
      query.featured = true;
    }

    console.log("🔍 Portfolio query:", query);

    const projects = await Project.find(query)
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate("createdBy", "firstName lastName");

    const total = await Project.countDocuments(query);

    console.log(`✅ Found ${projects.length} projects out of ${total} total`);
    console.log(
      "📋 Projects:",
      projects.map((p) => ({ id: p._id, title: p.title, status: p.status }))
    );

    // Disable caching to fix 304 issues
    res.set("Cache-Control", "no-cache, no-store, must-revalidate");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");

    res.json({
      success: true,
      data: {
        projects,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("❌ Get projects error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @desc    Get project categories
// @route   GET /api/portfolio/categories
// @access  Public
router.get("/categories", async (req, res) => {
  try {
    const categories = await Project.distinct("category", {
      status: "published",
    });

    // Disable caching to fix 304 issues
    res.set("Cache-Control", "no-cache, no-store, must-revalidate");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");

    res.json({
      success: true,
      data: { categories },
    });
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @desc    Get current featured project
// @route   GET /api/portfolio/featured
// @access  Public
router.get("/featured", async (req, res) => {
  try {
    const featuredProject = await Project.findOne({
      featured: true,
      status: "published",
    }).populate("createdBy", "firstName lastName");

    // Disable caching to fix 304 issues
    res.set("Cache-Control", "no-cache, no-store, must-revalidate");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");

    if (!featuredProject) {
      return res.json({
        success: true,
        data: { project: null },
        message: "No featured project found",
      });
    }

    res.json({
      success: true,
      data: { project: featuredProject },
    });
  } catch (error) {
    console.error("Get featured project error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @desc    Get single project by slug
// @route   GET /api/portfolio/slug/:slug
// @access  Public
router.get("/slug/:slug", async (req, res) => {
  try {
    const project = await Project.findBySlug(req.params.slug).populate(
      "createdBy",
      "firstName lastName"
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      data: { project },
    });
  } catch (error) {
    console.error("Get project by slug error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @desc    Get single project
// @route   GET /api/portfolio/:id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      status: "published",
    }).populate("createdBy", "firstName lastName");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      data: { project },
    });
  } catch (error) {
    console.error("Get project error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// Admin routes (authentication required)
// Apply authentication to all admin routes
router.use(protect);
router.use(authorize("admin", "editor"));

// @desc    Get all projects (admin)
// @route   GET /api/portfolio/admin/all
// @access  Private (Admin/Editor)
router.get("/admin/all", async (req, res) => {
  try {
    console.log("🔐 Admin portfolio request from user:", req.user?.id);
    console.log("📊 Admin query params:", req.query);

    const { status, category, search, page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    let query = {};

    if (status) {
      query.status = status;
    }

    if (category && category !== "All") {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { client: { $regex: search, $options: "i" } },
      ];
    }

    console.log("🔍 Admin query:", query);

    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate("createdBy", "firstName lastName")
      .populate("updatedBy", "firstName lastName");

    const total = await Project.countDocuments(query);

    console.log(
      `✅ Admin found ${projects.length} projects out of ${total} total`
    );
    console.log(
      "📋 Admin projects:",
      projects.map((p) => ({ id: p._id, title: p.title, status: p.status }))
    );

    // Disable caching to fix 304 issues
    res.set("Cache-Control", "no-cache, no-store, must-revalidate");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");

    res.json({
      success: true,
      data: {
        projects,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("❌ Get all projects error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @desc    Create new project
// @route   POST /api/portfolio
// @access  Private (Admin/Editor)
router.post(
  "/",
  [
    body("title")
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage("Title is required and must be less than 100 characters"),
    body("description")
      .trim()
      .isLength({ min: 1, max: 1000 })
      .withMessage(
        "Description is required and must be less than 1000 characters"
      ),
    body("category")
      .isIn([
        "Web Design",
        "Web Development",
        "Mobile Apps",
        "Games",
        "Maintenance",
        "Featured",
      ])
      .withMessage("Invalid category"),
    body("client")
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage(
        "Client name is required and must be less than 100 characters"
      ),
    body("image")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Project image is required"),
    body("status")
      .optional()
      .isIn(["draft", "published", "archived"])
      .withMessage("Invalid status"),
    body("featured")
      .optional()
      .isBoolean()
      .withMessage("Featured must be a boolean"),
    body("order")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Order must be a non-negative integer"),
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

      // If creating a featured project, unfeature all other projects first
      if (req.body.featured === true) {
        await Project.updateMany(
          {},
          {
            featured: false,
            updatedBy: req.user.id,
          }
        );
        console.log(
          "🌟 Unfeatured all existing projects, creating new featured project:",
          req.body.title
        );
      }

      const projectData = {
        ...req.body,
        createdBy: req.user.id,
        updatedBy: req.user.id,
      };

      const project = await Project.create(projectData);

      // Double-check: Ensure only this project is featured if it was set as featured
      if (projectData.featured === true) {
        await Project.updateMany(
          { _id: { $ne: project._id } },
          {
            featured: false,
            updatedBy: req.user.id,
          }
        );
        console.log("✅ Verified: Only", project.title, "is now featured");
      }

      res.status(201).json({
        success: true,
        message: "Project created successfully",
        data: { project },
      });
    } catch (error) {
      console.error("Create project error:", error);

      // Handle validation errors
      if (error.name === "ValidationError") {
        const validationErrors = Object.values(error.errors).map(
          (err) => err.message
        );
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: validationErrors,
        });
      }

      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
);

// @desc    Update project
// @route   PUT /api/portfolio/:id
// @access  Private (Admin/Editor)
router.put(
  "/:id",
  [
    body("title")
      .optional()
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage("Title must be less than 100 characters"),
    body("description")
      .optional()
      .trim()
      .isLength({ min: 1, max: 1000 })
      .withMessage("Description must be less than 1000 characters"),
    body("category")
      .optional()
      .isIn([
        "Web Design",
        "Web Development",
        "Mobile Apps",
        "Games",
        "Maintenance",
        "Featured",
      ])
      .withMessage("Invalid category"),
    body("client")
      .optional()
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage("Client name must be less than 100 characters"),
    body("status")
      .optional()
      .isIn(["draft", "published", "archived"])
      .withMessage("Invalid status"),
    body("featured")
      .optional()
      .isBoolean()
      .withMessage("Featured must be a boolean"),
    body("order")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Order must be a non-negative integer"),
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

      const project = await Project.findById(req.params.id);

      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }

      // If setting project as featured, unfeature all other projects first
      if (req.body.featured === true) {
        await Project.updateMany(
          { _id: { $ne: req.params.id } },
          {
            featured: false,
            updatedBy: req.user.id,
          }
        );
        console.log(
          "🌟 Unfeatured all other projects, featuring:",
          project.title
        );
      }

      const updatedProject = await Project.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          updatedBy: req.user.id,
        },
        { new: true, runValidators: true }
      )
        .populate("createdBy", "firstName lastName")
        .populate("updatedBy", "firstName lastName");

      // Double-check: Ensure only this project is featured if it was set as featured
      if (req.body.featured === true) {
        await Project.updateMany(
          { _id: { $ne: req.params.id } },
          {
            featured: false,
            updatedBy: req.user.id,
          }
        );
        console.log(
          "✅ Verified: Only",
          updatedProject.title,
          "is now featured"
        );
      }

      res.json({
        success: true,
        message: "Project updated successfully",
        data: { project: updatedProject },
      });
    } catch (error) {
      console.error("Update project error:", error);

      // Handle validation errors
      if (error.name === "ValidationError") {
        const validationErrors = Object.values(error.errors).map(
          (err) => err.message
        );
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: validationErrors,
        });
      }

      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
);

// @desc    Delete project
// @route   DELETE /api/portfolio/:id
// @access  Private (Admin/Editor)
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Delete project error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @desc    Bulk update project status
// @route   PATCH /api/portfolio/bulk-status
// @access  Private (Admin/Editor)
router.patch(
  "/bulk-status",
  [
    body("projectIds")
      .isArray({ min: 1 })
      .withMessage("Project IDs array is required"),
    body("status")
      .isIn(["draft", "published", "archived"])
      .withMessage("Invalid status"),
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

      const { projectIds, status } = req.body;

      const result = await Project.updateMany(
        { _id: { $in: projectIds } },
        {
          status,
          updatedBy: req.user.id,
        }
      );

      res.json({
        success: true,
        message: `${result.modifiedCount} projects updated successfully`,
        data: { modifiedCount: result.modifiedCount },
      });
    } catch (error) {
      console.error("Bulk update error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
);

// @desc    Reorder projects
// @route   PATCH /api/portfolio/reorder
// @access  Private (Admin/Editor)
router.patch(
  "/reorder",
  [
    body("projects")
      .isArray({ min: 1 })
      .withMessage("Projects array is required"),
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

      const { projects } = req.body;

      // Update each project's order
      const updatePromises = projects.map(({ id, order }) =>
        Project.findByIdAndUpdate(id, { order, updatedBy: req.user.id })
      );

      await Promise.all(updatePromises);

      res.json({
        success: true,
        message: "Projects reordered successfully",
      });
    } catch (error) {
      console.error("Reorder projects error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
);

export default router;
