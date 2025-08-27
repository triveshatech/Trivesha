import express from "express";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { protect, authorize } from "../middleware/auth.js";

// Load environment variables
dotenv.config({ path: "./config.env" });

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer for memory storage (Vercel compatible)
const storage = multer.memoryStorage();

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

      // Upload buffer directly to Cloudinary (Vercel compatible)
      const uploadResult = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString(
          "base64"
        )}`,
        {
          folder: "trivedia-flow",
          resource_type: "image",
        }
      );

      res.json({
        success: true,
        message: "File uploaded successfully",
        data: {
          filename: req.file.originalname,
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
        const result = await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          {
            folder: "trivedia-flow",
            resource_type: "image",
          }
        );
        return {
          filename: file.originalname,
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

// @desc    Delete uploaded file from Cloudinary
// @route   DELETE /api/upload/:publicId
// @access  Private (Admin/Editor)
router.delete(
  "/:publicId",
  protect,
  authorize("admin", "editor"),
  async (req, res) => {
    try {
      const { publicId } = req.params;

      // Delete from Cloudinary
      const result = await cloudinary.uploader.destroy(publicId);

      if (result.result === "ok") {
        res.json({
          success: true,
          message: "File deleted successfully",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "File not found",
        });
      }
    } catch (error) {
      console.error("Delete file error:", error);
      res.status(500).json({
        success: false,
        message: "Server error during file deletion",
      });
    }
  }
);

// @desc    Get list of uploaded files from Cloudinary
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

      // Get files from Cloudinary
      const result = await cloudinary.search
        .expression("folder:trivedia-flow")
        .sort_by([["created_at", "desc"]])
        .max_results(limit)
        .next_cursor((page - 1) * limit)
        .execute();

      const files = result.resources.map((file) => ({
        publicId: file.public_id,
        filename: file.display_name || file.public_id,
        url: file.secure_url,
        size: file.bytes,
        width: file.width,
        height: file.height,
        format: file.format,
        createdAt: file.created_at,
      }));

      res.json({
        success: true,
        data: {
          files,
          pagination: {
            page,
            limit,
            total: result.total_count,
            pages: Math.ceil(result.total_count / limit),
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
