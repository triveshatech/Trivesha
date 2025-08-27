import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { protect, authorize } from "../middleware/auth.js";

// Load environment variables
dotenv.config({ path: "./config.env" });

const router = express.Router();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Allow only images
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB default
  },
  fileFilter: fileFilter,
});

// @desc    Upload single image
// @route   POST /api/upload/image
// @access  Private (Admin/Editor)
router.post(
  "/image",
  protect,
  authorize("admin", "editor"),
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      // Upload to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "trivedia-flow",
        resource_type: "image",
      });

      // Clean up local file
      try {
        fs.unlinkSync(req.file.path);
      } catch (e) {}

      res.json({
        success: true,
        message: "File uploaded successfully",
        data: {
          filename: req.file.filename,
          originalName: req.file.originalname,
          mimetype: req.file.mimetype,
          size: req.file.size,
          url: uploadResult.secure_url,
          publicId: uploadResult.public_id,
          width: uploadResult.width,
          height: uploadResult.height,
        },
      });
    } catch (error) {
      // Log error for debugging (only in development)
      if (process.env.NODE_ENV === "development") {
        console.error("Upload error:", error.message);
      }

      // Clean up local file if it exists
      if (req.file && req.file.path) {
        try {
          fs.unlinkSync(req.file.path);
        } catch (e) {}
      }

      res.status(500).json({
        success: false,
        message: `Upload error: ${error.message}`,
        error: process.env.NODE_ENV === "development" ? error.stack : undefined,
      });
    }
  }
);

// @desc    Upload multiple images
// @route   POST /api/upload/images
// @access  Private (Admin/Editor)
router.post(
  "/images",
  protect,
  authorize("admin", "editor"),
  upload.array("images", 10),
  async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No files uploaded",
        });
      }

      const uploadPromises = req.files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "trivedia-flow",
          resource_type: "image",
        });
        try {
          fs.unlinkSync(file.path);
        } catch (e) {}
        return {
          filename: file.filename,
          originalName: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
        };
      });

      const uploadedFiles = await Promise.all(uploadPromises);

      res.json({
        success: true,
        message: "Files uploaded successfully",
        data: {
          files: uploadedFiles,
          count: uploadedFiles.length,
        },
      });
    } catch (error) {
      console.error("Multiple upload error:", error);
      res.status(500).json({
        success: false,
        message: "Server error during upload",
      });
    }
  }
);

// @desc    Delete uploaded file
// @route   DELETE /api/upload/:filename
// @access  Private (Admin/Editor)
router.delete(
  "/:filename",
  protect,
  authorize("admin", "editor"),
  async (req, res) => {
    try {
      const { filename } = req.params;
      const filePath = path.join(uploadsDir, filename);

      // Check if file exists
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({
          success: false,
          message: "File not found",
        });
      }

      // Delete file
      fs.unlinkSync(filePath);

      res.json({
        success: true,
        message: "File deleted successfully",
      });
    } catch (error) {
      console.error("Delete file error:", error);
      res.status(500).json({
        success: false,
        message: "Server error during file deletion",
      });
    }
  }
);

// @desc    Get list of uploaded files
// @route   GET /api/upload/files
// @access  Private (Admin/Editor)
router.get(
  "/files",
  protect,
  authorize("admin", "editor"),
  async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const skip = (page - 1) * limit;

      // Read files from uploads directory
      const files = fs
        .readdirSync(uploadsDir)
        .filter((file) => {
          const ext = path.extname(file).toLowerCase();
          return [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(ext);
        })
        .map((filename) => {
          const filePath = path.join(uploadsDir, filename);
          const stats = fs.statSync(filePath);
          return {
            filename,
            url: `/uploads/${filename}`,
            size: stats.size,
            createdAt: stats.birthtime,
            modifiedAt: stats.mtime,
          };
        })
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(skip, skip + limit);

      const total = fs.readdirSync(uploadsDir).filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(ext);
      }).length;

      res.json({
        success: true,
        data: {
          files,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
          },
        },
      });
    } catch (error) {
      console.error("Get files error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
);

// Error handling middleware for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File too large",
      });
    }
    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        success: false,
        message: "Too many files",
      });
    }
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        success: false,
        message: "Unexpected file field",
      });
    }
  }

  if (error.message === "Only image files are allowed") {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  next(error);
});

export default router;
