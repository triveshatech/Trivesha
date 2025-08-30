import express from "express";
import { body, validationResult } from "express-validator";
import rateLimit from "express-rate-limit";
import Contact from "../models/Contact.js";
import {
  sendUserThankYou,
  sendAdminNotification,
} from "../utils/emailService.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// Rate limiting for contact form submissions
const contactFormLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 requests per windowMs
  message: {
    success: false,
    message:
      "Too many contact form submissions. Please try again in 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Validation middleware for contact form
const validateContactForm = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Name must be between 1 and 100 characters")
    .matches(/^[a-zA-Z0-9\s@._-]+$/)
    .withMessage("Name contains invalid characters"),

  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please enter a valid email address"),

  body("company")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Company name cannot exceed 100 characters"),

  body("phone")
    .optional()
    .trim()
    .matches(/^[\+]?[0-9\s\-\(\)]+$/)
    .withMessage("Please enter a valid phone number")
    .isLength({ max: 20 })
    .withMessage("Phone number cannot exceed 20 characters"),

  body("projectType")
    .optional()
    .isIn([
      "Website Development",
      "Mobile App Development",
      "UI/UX Design",
      "Backend Development",
      "Game Development",
      "Website Redesign",
      "Maintenance & Support",
      "Other",
    ])
    .withMessage("Invalid project type"),

  body("budget")
    .optional()
    .isIn([
      "₹10k - ₹25k",
      "₹25k - ₹50k",
      "₹50k - ₹1L",
      "₹1L - ₹3L",
      "₹3L+",
      "Let's discuss",
    ])
    .withMessage("Invalid budget range"),

  body("timeline")
    .optional()
    .isIn([
      "ASAP (Rush job)",
      "1-2 weeks",
      "1-2 months",
      "3-6 months",
      "6+ months",
      "Flexible",
    ])
    .withMessage("Invalid timeline"),

  body("message")
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage("Message must be between 1 and 2000 characters"),
];

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public (Rate Limited)
router.post("/", contactFormLimiter, validateContactForm, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const {
      name,
      email,
      company,
      phone,
      projectType,
      budget,
      timeline,
      message,
    } = req.body;

    // Get client IP and user agent
    const ipAddress =
      req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
    const userAgent = req.get("User-Agent");

    // Create contact entry
    const contact = await Contact.create({
      name,
      email,
      company,
      phone,
      projectType,
      budget,
      timeline,
      message,
      ipAddress,
      userAgent,
      source: "website",
    });

    // Format data for emails
    const contactData = contact.formatForEmail();
    contactData.ipAddress = ipAddress;
    contactData.userAgent = userAgent;

    // Send emails concurrently
    const emailPromises = [
      sendUserThankYou(contactData).then((result) => {
        if (result.success) {
          contact.emailSentToUser = true;
        }
        return { type: "user", result };
      }),
      sendAdminNotification(contactData).then((result) => {
        if (result.success) {
          contact.emailSentToAdmin = true;
        }
        return { type: "admin", result };
      }),
    ];

    const emailResults = await Promise.allSettled(emailPromises);

    // Update contact with email status
    await contact.save();

    // Log email results
    emailResults.forEach((result, index) => {
      if (result.status === "fulfilled") {
        const { type, result: emailResult } = result.value;
        if (emailResult.success) {
          console.log(`✅ ${type} email sent successfully`);
        } else {
          console.error(`❌ ${type} email failed:`, emailResult.error);
        }
      } else {
        console.error(`❌ Email promise ${index} rejected:`, result.reason);
      }
    });

    // Prepare response
    const emailStatuses = emailResults.map((result) => {
      if (result.status === "fulfilled") {
        return result.value.result;
      }
      return {
        success: false,
        error: result.reason?.message || "Unknown error",
      };
    });

    res.status(201).json({
      success: true,
      message:
        "Contact form submitted successfully! We'll get back to you within 24 hours.",
      data: {
        id: contact._id,
        submittedAt: contact.createdAt,
        emailStatus: {
          userEmail: emailStatuses[0],
          adminEmail: emailStatuses[1],
        },
      },
    });
  } catch (error) {
    console.error("Contact form submission error:", error);

    // Send generic error response
    res.status(500).json({
      success: false,
      message:
        "We're experiencing technical difficulties. Please try again later or contact us directly.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// @desc    Get all contact submissions (Admin only)
// @route   GET /api/contact/admin
// @access  Private (Admin/Editor)
router.get(
  "/admin",
  protect,
  authorize("admin", "editor"),
  async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const status = req.query.status;
      const priority = req.query.priority;
      const search = req.query.search;
      const sortBy = req.query.sortBy || "createdAt";
      const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

      // Build query
      let query = {};

      if (status && status !== "all") {
        query.status = status;
      }

      if (priority && priority !== "all") {
        query.priority = priority;
      }

      if (search) {
        query.$or = [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { company: { $regex: search, $options: "i" } },
          { message: { $regex: search, $options: "i" } },
        ];
      }

      // Get total count for pagination
      const total = await Contact.countDocuments(query);

      // Get contacts with pagination
      const contacts = await Contact.find(query)
        .populate("assignedTo", "firstName lastName email")
        .sort({ [sortBy]: sortOrder })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      res.json({
        success: true,
        data: contacts,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1,
        },
      });
    } catch (error) {
      console.error("Get contacts error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
);

// @desc    Get contact statistics (Admin only)
// @route   GET /api/contact/admin/stats
// @access  Private (Admin/Editor)
router.get(
  "/admin/stats",
  protect,
  authorize("admin", "editor"),
  async (req, res) => {
    try {
      const stats = await Contact.getStats();

      // Get additional stats
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const todayCount = await Contact.countDocuments({
        createdAt: { $gte: todayStart },
      });

      const avgResponseTime = await Contact.aggregate([
        {
          $match: {
            status: { $ne: "new" },
            createdAt: {
              $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            },
          },
        },
        {
          $group: {
            _id: null,
            avgResponseTime: {
              $avg: {
                $subtract: ["$updatedAt", "$createdAt"],
              },
            },
          },
        },
      ]);

      res.json({
        success: true,
        data: {
          ...stats,
          today: todayCount,
          avgResponseTimeHours:
            avgResponseTime.length > 0
              ? Math.round(
                  avgResponseTime[0].avgResponseTime / (1000 * 60 * 60 * 1000)
                )
              : null,
        },
      });
    } catch (error) {
      console.error("Get contact stats error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
);

// @desc    Get single contact submission (Admin only)
// @route   GET /api/contact/admin/:id
// @access  Private (Admin/Editor)
router.get(
  "/admin/:id",
  protect,
  authorize("admin", "editor"),
  async (req, res) => {
    try {
      const contact = await Contact.findById(req.params.id).populate(
        "assignedTo",
        "firstName lastName email"
      );

      if (!contact) {
        return res.status(404).json({
          success: false,
          message: "Contact not found",
        });
      }

      res.json({
        success: true,
        data: contact,
      });
    } catch (error) {
      console.error("Get contact error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
);

// @desc    Update contact status/notes (Admin only)
// @route   PUT /api/contact/admin/:id
// @access  Private (Admin/Editor)
router.put(
  "/admin/:id",
  protect,
  authorize("admin", "editor"),
  [
    body("status")
      .optional()
      .isIn(["new", "contacted", "in-progress", "completed", "archived"])
      .withMessage("Invalid status"),
    body("priority")
      .optional()
      .isIn(["low", "medium", "high", "urgent"])
      .withMessage("Invalid priority"),
    body("adminNotes")
      .optional()
      .trim()
      .isLength({ max: 1000 })
      .withMessage("Admin notes cannot exceed 1000 characters"),
    body("followUpDate")
      .optional()
      .isISO8601()
      .withMessage("Invalid follow-up date"),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const { status, priority, adminNotes, followUpDate, assignedTo } =
        req.body;

      const contact = await Contact.findById(req.params.id);

      if (!contact) {
        return res.status(404).json({
          success: false,
          message: "Contact not found",
        });
      }

      // Update fields
      if (status) contact.status = status;
      if (priority) contact.priority = priority;
      if (adminNotes !== undefined) contact.adminNotes = adminNotes;
      if (followUpDate) contact.followUpDate = new Date(followUpDate);
      if (assignedTo) contact.assignedTo = assignedTo;

      await contact.save();

      // Populate the updated contact
      await contact.populate("assignedTo", "firstName lastName email");

      res.json({
        success: true,
        message: "Contact updated successfully",
        data: contact,
      });
    } catch (error) {
      console.error("Update contact error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
);

// @desc    Delete contact submission (Admin only)
// @route   DELETE /api/contact/admin/:id
// @access  Private (Admin only)
router.delete("/admin/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    await Contact.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.error("Delete contact error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;
