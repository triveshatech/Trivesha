import express from "express";
import { body, validationResult } from "express-validator";
import User from "../models/User.js";
import { protect, generateToken } from "../middleware/auth.js";

const router = express.Router();

// Temporary mock data for testing when MongoDB is not available
const mockUsers = [
  {
    id: "1",
    username: "admin",
    email: process.env.ADMIN_EMAIL || "admin@trivedia.com",
    firstName: "Admin",
    lastName: "User",
    role: "admin",
    isActive: true,
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/HS.iK2i", // hashed version of admin123
  },
];

// Helper function to check if MongoDB is connected
const isMongoConnected = () => {
  try {
    return User.db.readyState === 1;
  } catch (error) {
    return false;
  }
};

router.post(
  "/register",
  [
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const { username, email, password, firstName, lastName } = req.body;

      // Check if MongoDB is connected
      if (isMongoConnected()) {
        // Use MongoDB
        const existingUser = await User.findOne({
          $or: [{ email }, { username }],
        });
        if (existingUser) {
          return res.status(400).json({
            success: false,
            message: "User with this email or username already exists",
          });
        }

        const user = await User.create({
          username,
          email,
          password,
          firstName,
          lastName,
        });

        const token = generateToken(user._id);
        res.status(201).json({
          success: true,
          message: "User registered successfully",
          data: {
            user: user.getPublicProfile(),
            token,
          },
        });
      } else {
        // Use mock data
        const existingUser = mockUsers.find(
          (u) => u.email === email || u.username === username
        );
        if (existingUser) {
          return res.status(400).json({
            success: false,
            message: "User with this email or username already exists",
          });
        }

        const newUser = {
          id: Date.now().toString(),
          username,
          email,
          firstName,
          lastName,
          role: "admin",
          isActive: true,
          password: password, // In real app, this would be hashed
        };
        mockUsers.push(newUser);

        const token = generateToken(newUser.id);
        res.status(201).json({
          success: true,
          message: "User registered successfully (Mock Mode)",
          data: {
            user: {
              id: newUser.id,
              username: newUser.username,
              email: newUser.email,
              firstName: newUser.firstName,
              lastName: newUser.lastName,
              role: newUser.role,
              isActive: newUser.isActive,
            },
            token,
          },
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({
        success: false,
        message: "Server error during registration",
      });
    }
  }
);

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
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

      const { email, password } = req.body;

      // Check if MongoDB is connected
      if (isMongoConnected()) {
        // Use MongoDB
        const user = await User.findByCredentials(email, password);
        if (!user.isActive) {
          return res.status(401).json({
            success: false,
            message: "Account is deactivated",
          });
        }
        const token = generateToken(user._id);
        res.json({
          success: true,
          message: "Login successful",
          data: {
            user: user.getPublicProfile(),
            token,
          },
        });
      } else {
        // Use mock data
        const user = mockUsers.find((u) => u.email === email);
        if (!user || user.password !== password) {
          // Simple password check for mock
          return res.status(401).json({
            success: false,
            message: "Invalid email or password",
          });
        }
        if (!user.isActive) {
          return res.status(401).json({
            success: false,
            message: "Account is deactivated",
          });
        }
        const token = generateToken(user.id);
        res.json({
          success: true,
          message: "Login successful (Mock Mode)",
          data: {
            user: {
              id: user.id,
              username: user.username,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              role: user.role,
              isActive: user.isActive,
            },
            token,
          },
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(401).json({
        success: false,
        message: error.message || "Invalid credentials",
      });
    }
  }
);

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({
      success: true,
      data: {
        user: user.getPublicProfile(),
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
router.put(
  "/profile",
  protect,
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

      const { firstName, lastName, email } = req.body;

      // Check if email is being updated and if it already exists
      if (email && email !== req.user.email) {
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
        req.user.id,
        {
          firstName: firstName || req.user.firstName,
          lastName: lastName || req.user.lastName,
          email: email || req.user.email,
        },
        { new: true, runValidators: true }
      );

      res.json({
        success: true,
        message: "Profile updated successfully",
        data: {
          user: user.getPublicProfile(),
        },
      });
    } catch (error) {
      console.error("Update profile error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
);

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
router.put(
  "/change-password",
  protect,
  [
    body("currentPassword")
      .notEmpty()
      .withMessage("Current password is required"),
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters long"),
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

      const { currentPassword, newPassword } = req.body;

      // Get user with password
      const user = await User.findById(req.user.id).select("+password");

      // Check current password
      const isMatch = await user.matchPassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Current password is incorrect",
        });
      }

      // Update password
      user.password = newPassword;
      await user.save();

      res.json({
        success: true,
        message: "Password changed successfully",
      });
    } catch (error) {
      console.error("Change password error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
);

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
router.post("/logout", protect, async (req, res) => {
  try {
    // In a more complex setup, you might want to blacklist the token
    // For now, we'll just return a success message
    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;
