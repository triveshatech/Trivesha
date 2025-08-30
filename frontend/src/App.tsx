import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Portfolio from "./pages/Portfolio";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import FAQ from "./pages/FAQ";
import TestimonialsPage from "./pages/Testimonials";
import Integrations from "./pages/Integrations";
import ComingSoon from "./pages/ComingSoon";
import CaseStudy from "./pages/CaseStudy";
import ProjectDetail from "./pages/ProjectDetail";
import WebDevelopment from "./pages/services/WebDevelopment";
import MobileAppDevelopment from "./pages/services/MobileAppDevelopment";
import UIUXDesign from "./pages/services/UIUXDesign";
import BackendMaintenance from "./pages/services/backend";
import GameDevelopment from "./pages/services/games";
import HostingManagement from "./pages/services/hosting";
import DesignServices from "./pages/services/DesignServices";
import DevelopmentServices from "./pages/services/DevelopmentServices";
import InfrastructureServices from "./pages/services/InfrastructureServices";
import GrowthServices from "./pages/services/GrowthServices";
import ECommerceRedesign from "./pages/projects/ECommerceRedesign";
import FinTechApp from "./pages/projects/FinTechApp";
import SaaSDashboard from "./pages/projects/SaaSDashboard";
import HealthcarePlatform from "./pages/case-study/HealthcarePlatform";
import EdTechSolution from "./pages/case-study/EdTechSolution";
import RealEstateApp from "./pages/case-study/RealEstateApp";

// Admin pages
import AdminLogin from "./pages/admin/Login";
import AdminRegister from "./pages/admin/Register";
import AdminDashboard from "./pages/admin/Dashboard";
import PricingManagement from "./pages/admin/PricingManagement";
import PortfolioManagement from "./pages/admin/EnhancedPortfolioManagement";
import UserManagement from "./pages/admin/UserManagement";
import ContactManagement from "./pages/admin/ContactManagement";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Component to handle scroll-to-top on route changes
const ScrollToTopHandler = () => {
  useScrollToTop();
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTopHandler />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={
                <>
                  <Header />
                  <Index />
                  <Footer />
                </>
              } />
              <Route path="/services" element={
                <>
                  <Header />
                  <Services />
                  <Footer />
                </>
              } />
              <Route path="/services/:slug" element={
                <>
                  <Header />
                  <ServiceDetail />
                  <Footer />
                </>
              } />
              <Route path="/services/web-development" element={
                <>
                  <Header />
                  <WebDevelopment />
                  <Footer />
                </>
              } />
              <Route path="/services/mobile-app-development" element={
                <>
                  <Header />
                  <MobileAppDevelopment />
                  <Footer />
                </>
              } />
              <Route path="/services/ui-ux-design" element={
                <>
                  <Header />
                  <UIUXDesign />
                  <Footer />
                </>
              } />
              <Route path="/services/backend" element={
                <>
                  <Header />
                  <BackendMaintenance />
                  <Footer />
                </>
              } />
              <Route path="/services/games" element={
                <>
                  <Header />
                  <GameDevelopment />
                  <Footer />
                </>
              } />
              <Route path="/services/hosting" element={
                <>
                  <Header />
                  <HostingManagement />
                  <Footer />
                </>
              } />
              <Route path="/services/design" element={
                <>
                  <Header />
                  <DesignServices />
                  <Footer />
                </>
              } />
              <Route path="/services/development" element={
                <>
                  <Header />
                  <DevelopmentServices />
                  <Footer />
                </>
              } />
              <Route path="/services/infrastructure" element={
                <>
                  <Header />
                  <InfrastructureServices />
                  <Footer />
                </>
              } />
              <Route path="/services/growth" element={
                <>
                  <Header />
                  <GrowthServices />
                  <Footer />
                </>
              } />
              <Route path="/portfolio/ecommerce-redesign" element={
                <>
                  <Header />
                  <ECommerceRedesign />
                  <Footer />
                </>
              } />
              <Route path="/portfolio/fintech-app" element={
                <>
                  <Header />
                  <FinTechApp />
                  <Footer />
                </>
              } />
              <Route path="/portfolio/saas-dashboard" element={
                <>
                  <Header />
                  <SaaSDashboard />
                  <Footer />
                </>
              } />
              <Route path="/case-study/healthcare-platform" element={
                <>
                  <Header />
                  <HealthcarePlatform />
                  <Footer />
                </>
              } />
              <Route path="/case-study/edtech-solution" element={
                <>
                  <Header />
                  <EdTechSolution />
                  <Footer />
                </>
              } />
              <Route path="/case-study/real-estate-app" element={
                <>
                  <Header />
                  <RealEstateApp />
                  <Footer />
                </>
              } />
              <Route path="/portfolio" element={
                <>
                  <Header />
                  <Portfolio />
                  <Footer />
                </>
              } />
              <Route path="/portfolio/:slug" element={
                <>
                  <Header />
                  <ProjectDetail />
                  <Footer />
                </>
              } />
              <Route path="/case-study/:slug" element={
                <>
                  <Header />
                  <CaseStudy />
                  <Footer />
                </>
              } />
              <Route path="/pricing" element={
                <>
                  <Header />
                  <Pricing />
                  <Footer />
                </>
              } />
              <Route path="/about" element={
                <>
                  <Header />
                  <About />
                  <Footer />
                </>
              } />
              <Route path="/contact" element={
                <>
                  <Header />
                  <Contact />
                  <Footer />
                </>
              } />
              <Route path="/blog" element={
                <>
                  <Header />
                  <Blog />
                  <Footer />
                </>
              } />
              <Route path="/privacy" element={
                <>
                  <Header />
                  <Privacy />
                  <Footer />
                </>
              } />
              <Route path="/terms" element={
                <>
                  <Header />
                  <Terms />
                  <Footer />
                </>
              } />
              <Route path="/faq" element={
                <>
                  <Header />
                  <FAQ />
                  <Footer />
                </>
              } />
              <Route path="/testimonials" element={
                <>
                  <Header />
                  <TestimonialsPage />
                  <Footer />
                </>
              } />
              <Route path="/integrations" element={
                <>
                  <Header />
                  <Integrations />
                  <Footer />
                </>
              } />
              <Route path="/coming-soon" element={
                <>
                  <Header />
                  <ComingSoon />
                  <Footer />
                </>
              } />

              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/register" element={<AdminRegister />} />
              <Route path="/admin/dashboard" element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/portfolio" element={
                <ProtectedRoute>
                  <AdminLayout>
                    <PortfolioManagement />
                  </AdminLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/contacts" element={
                <ProtectedRoute>
                  <AdminLayout>
                    <ContactManagement />
                  </AdminLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/users" element={
                <ProtectedRoute>
                  <AdminLayout>
                    <UserManagement />
                  </AdminLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/pricing" element={
                <ProtectedRoute>
                  <AdminLayout>
                    <PricingManagement />
                  </AdminLayout>
                </ProtectedRoute>
              } />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={
                <>
                  <Header />
                  <NotFound />
                  <Footer />
                </>
              } />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
