# 🚀 Trivedia Flow - Digital Innovation Platform

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [Development](#development)
- [Production Deployment](#production-deployment)
- [API Documentation](#api-documentation)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Trivedia Flow is a comprehensive digital agency platform that combines modern web development practices with business functionality. Built for scalability, security, and performance, it serves as a complete solution for digital agencies to showcase their work, manage client interactions, and handle business operations.

### 🎪 **Live Demo**

- **Frontend**: [Coming Soon]
- **Admin Panel**: [Protected Route]

## ✨ Features

### 🌟 **Frontend Features**

- **Dynamic Portfolio Showcase** - Database-driven project display
- **Interactive Contact Forms** - With email notifications and validation
- **Modern UI/UX** - Built with shadcn/ui and Tailwind CSS
- **Responsive Design** - Mobile-first approach
- **SEO Optimized** - Meta tags, sitemap, and social sharing
- **Performance Optimized** - Lazy loading and code splitting

### 🔧 **Admin Panel Features**

- **Secure Authentication** - JWT-based login system
- **Project Management** - CRUD operations for portfolio items
- **Image Upload** - Cloudinary integration
- **Contact Management** - View and manage client inquiries
- **Content Management** - Dynamic content updates
- **User Management** - Role-based access control

### 🚀 **Business Features**

- **Automated Email System** - Client and admin notifications
- **Contact Form Processing** - Database storage and email delivery
- **Portfolio Management** - Showcase latest projects dynamically
- **Pricing Plans** - Flexible service offerings
- **Analytics Ready** - Google Analytics integration

## 🛠️ Tech Stack

### **Frontend**

```
├── React 18.3.1          # Modern React with Hooks
├── TypeScript 5.8.3      # Type-safe development
├── Vite 5.4.19           # Fast build tool
├── Tailwind CSS 3.4.17   # Utility-first CSS
├── shadcn/ui             # High-quality components
├── React Router 6.30.1   # Client-side routing
├── React Query 5.83.0    # Server state management
├── React Hook Form 7.61.1 # Form handling
├── Zod 3.25.76           # Schema validation
└── Lucide React          # Beautiful icons
```

### **Backend**

```
├── Node.js 18+           # JavaScript runtime
├── Express.js 4.18.2     # Web framework
├── MongoDB 8.0.3         # NoSQL database
├── Mongoose 8.0.3        # ODM for MongoDB
├── JWT 9.0.2             # Authentication
├── Bcrypt.js 2.4.3       # Password hashing
├── Multer 1.4.5          # File uploads
├── Cloudinary 1.41.3     # Image management
├── Nodemailer 7.0.5      # Email service
├── Express Validator 7.0.1 # Input validation
├── Helmet 7.1.0          # Security headers
├── CORS 2.8.5            # Cross-origin requests
└── Rate Limiting 7.1.5   # API protection
```

### **DevOps & Tools**

```
├── ESLint 9.32.0         # Code linting
├── TypeScript ESLint     # TypeScript linting
├── Nodemon 3.0.2         # Development server
├── Morgan 1.10.0         # HTTP logging
├── Compression 1.7.4     # Response compression
└── dotenv 16.3.1         # Environment management
```

## 🏗️ Architecture

```
trivedia-flow/
├── 📱 Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── contexts/      # React contexts
│   │   ├── lib/           # Utilities and API
│   │   └── assets/        # Static assets
│   └── public/            # Public assets
│
├── 🔧 Backend (Node.js + Express)
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   ├── middleware/        # Custom middleware
│   ├── utils/             # Helper functions
│   ├── scripts/           # Database utilities
│   └── uploads/           # File storage
│
└── 📚 Documentation
    ├── PRODUCTION_CONFIG.md    # Environment setup
    ├── SECURITY_FIXES_SUMMARY.md # Security guide
    └── PRODUCTION_READY.md     # Deployment guide
```

## 🚀 Quick Start

### **Prerequisites**

- Node.js 18+ and npm
- MongoDB database
- Git

### **Installation**

1. **Clone the repository**

```bash
git clone https://github.com/Shiva-Ch0wdary/trivedia-flow.git
cd trivedia-flow
```

2. **Install frontend dependencies**

```bash
npm install
```

3. **Install backend dependencies**

```bash
cd backend
npm install
```

4. **Environment setup**

```bash
# Create environment file
cp config.env.example config.env

# Add your environment variables (see PRODUCTION_CONFIG.md)
```

5. **Database setup**

```bash
# Seed portfolio data
npm run seed:portfolio

# Seed pricing data
npm run seed:pricing
```

6. **Start development servers**

```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend
cd backend
npm run dev
```

Visit `http://localhost:5173` for frontend and `http://localhost:5000` for API.

## 💻 Development

### **Development Workflow**

```bash
# Frontend development
npm run dev              # Start dev server
npm run build           # Production build
npm run preview         # Preview build
npm run lint            # Code linting

# Backend development
npm run dev             # Start with nodemon
npm run start           # Production start
npm run seed:portfolio  # Seed projects
npm run seed:pricing    # Seed pricing plans
```

### **Project Structure Guidelines**

- **Components**: Reusable UI components in `/src/components`
- **Pages**: Route-level components in `/src/pages`
- **Hooks**: Custom React hooks in `/src/hooks`
- **API Routes**: RESTful endpoints in `/backend/routes`
- **Models**: Database schemas in `/backend/models`

## 🌐 Production Deployment

### **Build Process**

```bash
# Frontend production build
npm run build

# Backend production setup
cd backend
NODE_ENV=production npm start
```

### **Environment Variables**

See `PRODUCTION_CONFIG.md` for complete environment setup guide.

### **Deployment Options**

- **Frontend**: Vercel, Netlify, AWS S3 + CloudFront
- **Backend**: Railway, Heroku, AWS EC2, DigitalOcean
- **Database**: MongoDB Atlas, AWS DocumentDB

### **Performance Optimizations**

- ✅ Code splitting and lazy loading
- ✅ Image optimization via Cloudinary
- ✅ Gzip compression enabled
- ✅ HTTP/2 server push ready
- ✅ CDN-ready static assets

## 📡 API Documentation

### **Base URL**

```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

### **Authentication**

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password"
}
```

### **Portfolio Endpoints**

```http
GET /api/portfolio              # Get all projects
GET /api/portfolio/:id          # Get project by ID
POST /api/portfolio             # Create project (auth required)
PUT /api/portfolio/:id          # Update project (auth required)
DELETE /api/portfolio/:id       # Delete project (auth required)
```

### **Contact Endpoints**

```http
POST /api/contact               # Submit contact form
GET /api/contact                # Get all contacts (auth required)
```

## 🔒 Security

### **Security Features**

- ✅ JWT-based authentication
- ✅ Bcrypt password hashing
- ✅ Input validation and sanitization
- ✅ Rate limiting and DDoS protection
- ✅ CORS configuration
- ✅ Helmet security headers
- ✅ Environment variable protection
- ✅ SQL injection prevention (NoSQL)

### **Security Best Practices**

- All sensitive data in environment variables
- Production error handling (no stack traces)
- Secure file upload validation
- Rate limiting on all endpoints
- Regular security audits

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### **Development Standards**

- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Follow the existing code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Documentation**: Check `/docs` folder for detailed guides
- **Issues**: Create a GitHub issue for bugs or feature requests
- **Contact**: [your-email@example.com]

---

<div align="center">

**Built with ❤️ by the Trivedia Flow Team**

_Empowering businesses through digital innovation_

[Website](#) • [Documentation](PRODUCTION_CONFIG.md) • [API Docs](#api-documentation) • [Support](#support)

</div>
