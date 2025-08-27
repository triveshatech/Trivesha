import express from 'express';
import { body, validationResult } from 'express-validator';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Sample content data (in a real app, this would be in a database)
let contentData = {
  hero: {
    title: "Transform Your Digital Presence",
    subtitle: "We create innovative web solutions that drive growth and engagement",
    description: "Trivedia Flow is your partner in digital transformation. We specialize in creating cutting-edge web applications, mobile apps, and digital experiences that help businesses thrive in the modern digital landscape.",
    ctaText: "Get Started",
    ctaLink: "/contact",
    backgroundImage: "/hero-bg.jpeg"
  },
  services: [
    {
      id: "web-development",
      title: "Web Development",
      description: "Custom web applications built with modern technologies",
      image: "/assets/home/web.png",
      features: ["React & Next.js", "Node.js Backend", "Database Design", "API Integration"],
      link: "/services/web-development"
    },
    {
      id: "mobile-development",
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications",
      image: "/assets/home/app.png",
      features: ["iOS & Android", "React Native", "Flutter", "App Store Optimization"],
      link: "/services/mobile-app-development"
    },
    {
      id: "ui-ux-design",
      title: "UI/UX Design",
      description: "User-centered design that delights and converts",
      image: "/assets/home/ui.png",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
      link: "/services/ui-ux-design"
    }
  ],
  about: {
    title: "About Trivedia Flow",
    subtitle: "Your Digital Transformation Partner",
    description: "We are a team of passionate developers, designers, and strategists dedicated to helping businesses succeed in the digital age. With years of experience and a commitment to excellence, we deliver solutions that make a difference.",
    stats: [
      { label: "Projects Completed", value: "150+" },
      { label: "Happy Clients", value: "50+" },
      { label: "Team Members", value: "12" },
      { label: "Years Experience", value: "5+" }
    ]
  },
  contact: {
    title: "Get In Touch",
    subtitle: "Let's discuss your project",
    description: "Ready to start your digital transformation journey? Contact us today to discuss your project requirements and how we can help bring your vision to life.",
    email: "hello@trivediaflow.com",
    phone: "+1 (555) 123-4567",
    address: "123 Digital Street, Tech City, TC 12345"
  }
};

// @desc    Get all content
// @route   GET /api/content
// @access  Public
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      data: contentData
    });
  } catch (error) {
    console.error('Get content error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get specific content section
// @route   GET /api/content/:section
// @access  Public
router.get('/:section', async (req, res) => {
  try {
    const { section } = req.params;
    
    if (!contentData[section]) {
      return res.status(404).json({
        success: false,
        message: 'Content section not found'
      });
    }

    res.json({
      success: true,
      data: contentData[section]
    });
  } catch (error) {
    console.error('Get content section error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Update content section (Admin/Editor only)
// @route   PUT /api/content/:section
// @access  Private (Admin/Editor)
router.put('/:section', protect, authorize('admin', 'editor'), [
  body('data').isObject().withMessage('Data must be an object')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    const { section } = req.params;
    const { data } = req.body;

    if (!contentData[section]) {
      return res.status(404).json({
        success: false,
        message: 'Content section not found'
      });
    }

    // Update the content
    contentData[section] = { ...contentData[section], ...data };

    res.json({
      success: true,
      message: 'Content updated successfully',
      data: contentData[section]
    });
  } catch (error) {
    console.error('Update content error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Create new content section (Admin only)
// @route   POST /api/content
// @access  Private (Admin only)
router.post('/', protect, authorize('admin'), [
  body('section').isString().withMessage('Section name is required'),
  body('data').isObject().withMessage('Data must be an object')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    const { section, data } = req.body;

    if (contentData[section]) {
      return res.status(400).json({
        success: false,
        message: 'Content section already exists'
      });
    }

    // Create new content section
    contentData[section] = data;

    res.status(201).json({
      success: true,
      message: 'Content section created successfully',
      data: contentData[section]
    });
  } catch (error) {
    console.error('Create content error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Delete content section (Admin only)
// @route   DELETE /api/content/:section
// @access  Private (Admin only)
router.delete('/:section', protect, authorize('admin'), async (req, res) => {
  try {
    const { section } = req.params;

    if (!contentData[section]) {
      return res.status(404).json({
        success: false,
        message: 'Content section not found'
      });
    }

    // Prevent deletion of critical sections
    const criticalSections = ['hero', 'about', 'contact'];
    if (criticalSections.includes(section)) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete critical content sections'
      });
    }

    // Delete the content section
    delete contentData[section];

    res.json({
      success: true,
      message: 'Content section deleted successfully'
    });
  } catch (error) {
    console.error('Delete content error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get content schema (for admin panel forms)
// @route   GET /api/content/schema/:section
// @access  Private (Admin/Editor)
router.get('/schema/:section', protect, authorize('admin', 'editor'), async (req, res) => {
  try {
    const { section } = req.params;
    
    // Define schemas for different content sections
    const schemas = {
      hero: {
        title: { type: 'string', required: true, maxLength: 100 },
        subtitle: { type: 'string', required: true, maxLength: 200 },
        description: { type: 'text', required: true, maxLength: 500 },
        ctaText: { type: 'string', required: true, maxLength: 50 },
        ctaLink: { type: 'string', required: true },
        backgroundImage: { type: 'image', required: true }
      },
      about: {
        title: { type: 'string', required: true, maxLength: 100 },
        subtitle: { type: 'string', required: true, maxLength: 200 },
        description: { type: 'text', required: true, maxLength: 1000 },
        stats: { type: 'array', items: { type: 'object' } }
      },
      contact: {
        title: { type: 'string', required: true, maxLength: 100 },
        subtitle: { type: 'string', required: true, maxLength: 200 },
        description: { type: 'text', required: true, maxLength: 500 },
        email: { type: 'email', required: true },
        phone: { type: 'string', required: true },
        address: { type: 'text', required: true, maxLength: 200 }
      }
    };

    if (!schemas[section]) {
      return res.status(404).json({
        success: false,
        message: 'Schema not found for this section'
      });
    }

    res.json({
      success: true,
      data: schemas[section]
    });
  } catch (error) {
    console.error('Get schema error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
