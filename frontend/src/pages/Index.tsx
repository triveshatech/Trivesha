import SEO from "@/components/SEO";
import { generateOrganizationSchema, generateLocalBusinessSchema, generateWebSiteSchema } from "@/lib/seo";
import heroBgImage from "@/assets/hero-bg.jpeg";
import uiImage from "@/assets/home/ui.png";
import webImage from "@/assets/home/web.png";
import appImage from "@/assets/home/app.png";
import dImage from "@/assets/home/d.png";
import { Button } from "@/components/ui/button";
import ScrollToTop from "@/components/ui/scroll-to-top";
import AnimatedBackground from "@/components/ui/animated-background";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Calendar, Users, HeartHandshake, Layers, Rocket, Shield, Smartphone, Globe, Gamepad2, Wrench, Eye, Star, MessageSquare, Mail } from "lucide-react";
import InitialsAvatar from "@/components/ui/initials-avatar";
import "@/styles/interactive-particles.css";
import { useEffect, useState } from "react";
import { useLatestProjects } from "@/hooks/use-latest-projects";
import { contactAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const BenefitItem = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className="flex items-center gap-4 bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-teal-500/50 transition-all duration-300 group">
    <div className="text-teal-400 bg-teal-500/10 p-3 rounded-lg flex-shrink-0 group-hover:bg-teal-500/20 transition-colors duration-300">
      {icon}
    </div>
    <div>
      <h4 className="font-semibold text-white mb-1">{title}</h4>
      <p className="text-sm text-gray-400">{desc}</p>
    </div>
  </div>
);

const ServiceCard = ({ image, title, bullets, link }: { image: string; title: string; bullets: string[]; link: string }) => (
  <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-800/50 hover:border-teal-500/50 hover:shadow-2xl hover:shadow-teal-500/10 hover:scale-[1.02] transition-all duration-500 group h-full">
    {/* Image Section - 40% of card */}
    <div className="relative h-48 bg-gradient-to-br from-teal-900/30 to-blue-900/30 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-blue-500/20"></div>
      <img 
        src={image} 
        alt={`${title} - Professional service illustration showing modern design and development capabilities`}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 z-10 opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
    
    {/* Content Section - 60% of card */}
    <div className="p-8">
      <h3 className="font-bold text-xl text-white mb-4 group-hover:text-teal-400 transition-colors duration-300">{title}</h3>
      <ul className="space-y-3 mb-6">
        {bullets.map((bullet, i) => (
          <li key={i} className="text-gray-400 flex items-start gap-3 group-hover:text-gray-300 transition-colors duration-300">
            <CheckCircle className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0 group-hover:text-teal-300" />
            <span className="text-sm leading-relaxed">{bullet}</span>
          </li>
        ))}
      </ul>
      <Button asChild variant="ghost" className="text-teal-400 hover:text-white hover:bg-teal-600 p-0 h-auto font-semibold group/btn">
        <Link to={link} className="flex items-center gap-2 py-2 px-4 rounded-lg transition-all duration-300">
          Learn More 
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
        </Link>
      </Button>
    </div>
  </div>
);

const ProjectCard = ({ title, result, image, slug }: { title: string; result: string; image: string; slug: string }) => (
  <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800/50 hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-300 group">
    <div className="aspect-video bg-gray-800 relative overflow-hidden">
      <img 
        src={image} 
        alt={`${title} project showcase`}
        className="w-full h-full object-cover opacity-80" 
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = '/placeholder.svg';
        }}
      />
      <div className="absolute inset-0 bg-teal-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <Button asChild variant="secondary" size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
          <Link to={`/portfolio/${slug}`}>
            <Eye className="w-4 h-4 mr-2" />
            View Case Study
          </Link>
        </Button>
      </div>
    </div>
    <div className="p-6">
      <h3 className="font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-orange-400 font-medium">{result}</p>
    </div>
  </div>
);

const PricingCard = ({ title, range, features, isPopular = false }: { title: string; range: string; features: string[]; isPopular?: boolean }) => (
  <div className={`bg-gray-900/80 backdrop-blur-sm rounded-2xl border overflow-hidden transition-all duration-300 hover:scale-105 ${isPopular ? 'border-teal-500 shadow-lg shadow-teal-500/20' : 'border-gray-800/50 hover:border-teal-500/50'}`}>
    <div className={`p-4 text-center text-white ${isPopular ? 'bg-gradient-to-r from-teal-600 to-teal-500' : 'bg-gradient-to-r from-gray-800 to-gray-700'}`}>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-lg font-bold mt-1">{range}</p>
      {isPopular && (
        <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full inline-block mt-2">
          Most Popular
        </div>
      )}
    </div>
    <div className="p-6">
      <ul className="space-y-3">
        {features.map((feature, i) => (
          <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      <Button className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white">
        Get Quote
      </Button>
    </div>
  </div>
);

const TestimonialCard = ({ quote, name, avatar }: { quote: string; name: string; avatar: string }) => (
  <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 hover:border-teal-500/50 transition-all duration-300 relative group">
    <div className="absolute -top-2 -left-2 text-6xl text-teal-500/30 font-serif">"</div>
    <div className="relative z-10">
      <div className="flex items-center gap-2 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
        ))}
      </div>
      <p className="text-gray-300 mb-6 italic leading-relaxed">{quote}</p>
      <div className="flex items-center gap-3">
        <InitialsAvatar name={name} src={avatar} size={48} className="ring-2 ring-teal-500/30" />
        <div>
          <p className="font-semibold text-white">{name}</p>
        </div>
      </div>
    </div>
  </div>
);

const ProcessStep = ({ step, title, desc, icon }: { step: string; title: string; desc: string; icon: React.ReactNode }) => (
  <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 hover:border-teal-500/50 transition-all duration-300 text-center group">
    <div className="text-orange-400 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <div className="inline-block bg-gradient-to-r from-teal-400 to-blue-400 text-transparent bg-clip-text text-xs font-semibold uppercase tracking-wide mb-2">{step}</div>
    <h3 className="font-semibold text-white mb-2">{title}</h3>
    <p className="text-sm text-gray-400">{desc}</p>
  </div>
);

export default function Index() {
  // Fetch latest 3 projects
  const { projects, loading, error } = useLatestProjects(3);
  
  // Form state for the quote request
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Schema markup for homepage
  const schemaMarkup = [
    generateOrganizationSchema(),
    generateLocalBusinessSchema(),
    generateWebSiteSchema()
  ];

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to continue.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.message.trim()) {
      // Set a default message if none provided
      setFormData(prev => ({
        ...prev,
        message: "I'm interested in getting a quote for my project. Please contact me with more details."
      }));
    }

    setIsSubmitting(true);

    try {
      const response = await contactAPI.submitForm({
        name: formData.email.split('@')[0], // Extract name from email prefix
        email: formData.email,
        message: formData.message.trim() || "I'm interested in getting a quote for my project. Please contact me with more details.",
        projectType: "Website Development", // Default project type
        source: "homepage-quote-form"
      });

      if (response.data.success) {
        toast({
          title: "Thank You! 🎉",
          description: "We've received your request and will get back to you within 24 hours.",
          variant: "default",
        });
        
        // Reset form
        setFormData({
          email: '',
          message: ''
        });
      } else {
        throw new Error(response.data.message || 'Something went wrong');
      }
    } catch (error: any) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Failed",
        description: error.response?.data?.message || "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add mouse interaction for particles
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const ctaSection = document.querySelector('.cta-section') as HTMLElement;
      if (!ctaSection) return;

      const rect = ctaSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update CSS custom properties for mouse position
      ctaSection.style.setProperty('--mouse-x', `${x}px`);
      ctaSection.style.setProperty('--mouse-y', `${y}px`);

      // Add glow effect following mouse
      const glowElement = ctaSection.querySelector('::before') as HTMLElement;
      if (ctaSection.contains(e.target as Node)) {
        ctaSection.style.setProperty('--mouse-opacity', '1');
      } else {
        ctaSection.style.setProperty('--mouse-opacity', '0');
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth-scroll to element when URL contains a hash (e.g. #contact)
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        try {
          const el = document.querySelector(hash) as HTMLElement | null;
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        } catch (e) {
          // ignore invalid selector
        }
      }
    };

    // initial check
    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, []);

  return (
    <main className="min-h-screen bg-black">
      <SEO
        title="Build, Launch, Maintain - Websites, Apps, Games | Trivesha"
        description="From Figma to Play Store: Design, Development, Deployment, Maintenance - all in one place. Since 2019, we've delivered 120+ projects with 99.9% uptime."
        canonical="/"
        ogImage="/social-images/og-home.png"
        schemaMarkup={schemaMarkup}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Animated Background */}
        <AnimatedBackground />
        
        {/* Content Overlay */}
        <div className="container mx-auto px-6 relative z-20">
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center max-w-5xl mx-auto">
              <div className="inline-block bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-700/50 mb-8">
                <span className="text-teal-400 text-sm font-medium">✨ Since 2019 • 120+ Projects Delivered</span>
              </div>
              
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl leading-tight mb-8">
                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 text-transparent bg-clip-text">
                  Build, Launch, Maintain
                </span>
                <br />
                <span className="bg-gradient-to-r from-teal-400 via-teal-300 to-blue-400 text-transparent bg-clip-text">
                  Websites, Apps, Games
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
                From Figma to Play Store: Design, Development, Deployment, Maintenance - all in one place.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button asChild size="lg" className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white border-0 px-8 py-4 text-lg w-full sm:w-auto shadow-lg shadow-teal-500/25">
                  <Link to="/contact">
                    Get Free Quote <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-orange-500/50 bg-orange-500/10 text-orange-400 hover:bg-orange-500 hover:text-white backdrop-blur-sm px-8 py-4 text-lg w-full sm:w-auto">
                  <Link to="/portfolio">See Our Work</Link>
                </Button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">120+</div>
                  <div className="text-sm text-gray-400">Projects Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">99.9%</div>
                  <div className="text-sm text-gray-400">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">6+</div>
                  <div className="text-sm text-gray-400">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">24/7</div>
                  <div className="text-sm text-gray-400">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Benefits Strip */}
      <section className="bg-gray-900 py-20 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <BenefitItem 
              icon={<CheckCircle className="w-6 h-6" />}
              title="Verified on JustDial"
              desc="Trusted by 120+ clients"
            />
            <BenefitItem 
              icon={<Calendar className="w-6 h-6" />}
              title="Since 2019"
              desc="6+ years of experience"
            />
            <BenefitItem 
              icon={<Users className="w-6 h-6" />}
              title="Full-stack team"
              desc="UI → Backend coverage"
            />
            <BenefitItem 
              icon={<HeartHandshake className="w-6 h-6" />}
              title="Post-launch support"
              desc="99.9% uptime guarantee"
            />
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="bg-black py-24 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-white mb-6">Our Services</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-blue-400 mx-auto mb-6"></div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              From concept to launch, we provide comprehensive digital solutions tailored to your business needs
            </p>
          </div>
          <div className="grid gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 max-w-[90%] mx-auto">
            <ServiceCard
              image={uiImage}
              title="UI/UX & Figma Design"
              bullets={[
                "User research & wireframes",
                "Interactive prototypes",
                "Design system creation",
                "Mobile-first approach"
              ]}
              link="/services/design"
            />
            <ServiceCard
              image={webImage}
              title="Website Development"
              bullets={[
                "Static & dynamic sites",
                "Custom CMS solutions", 
                "E-commerce platforms",
                "SEO optimization"
              ]}
              link="/services/web-development"
            />
            <ServiceCard
              image={appImage}
              title="Mobile Apps & Games"
              bullets={[
                "iOS & Android apps",
                "React Native development",
                "Simple 2D games",
                "App Store deployment"
              ]}
              link="#contact"
            />
            <ServiceCard
              image={dImage}
              title="Maintenance & Hosting"
              bullets={[
                "24/7 monitoring",
                "Regular updates",
                "Performance optimization",
                "99.9% uptime guarantee"
              ]}
              link="#contact"
            />
          </div>
          <div className="text-center mt-16">
            <Button asChild size="lg" className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white px-8 py-4 text-lg shadow-lg shadow-teal-500/25">
              <Link to="/services">
                View All Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="bg-gray-900 py-24 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl text-white mb-6">Our Work</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-blue-400"></div>
            </div>
            <Button asChild variant="outline" className="border-teal-500/50 text-teal-400 hover:bg-teal-500 hover:text-white backdrop-blur-sm">
              <Link to="/portfolio">View All Projects</Link>
            </Button>
          </div>
          
          {/* Dynamic Project Cards */}
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-gray-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800/50 animate-pulse">
                  <div className="aspect-video bg-gray-800"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  </div>
                </div>
              ))
            ) : error ? (
              // Error state
              <div className="col-span-full text-center py-12">
                <p className="text-red-400 mb-4">Failed to load projects</p>
                <Button 
                  onClick={() => window.location.reload()} 
                  variant="outline" 
                  className="border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white"
                >
                  Try Again
                </Button>
              </div>
            ) : projects.length === 0 ? (
              // No projects state
              <div className="col-span-full text-center py-12">
                <p className="text-gray-400 mb-4">No projects available</p>
                <Button asChild variant="outline" className="border-teal-500/50 text-teal-400 hover:bg-teal-500 hover:text-white">
                  <Link to="/contact">Start Your Project</Link>
                </Button>
              </div>
            ) : (
              // Display projects
              projects.map((project) => {
                // Get the best available result text
                const resultText = project.results && project.results.length > 0 
                  ? project.results[0] 
                  : `${project.category} for ${project.client}`;
                
                // Get the best available image URL
                const imageUrl = project.fullImageUrl || project.image;
                
                return (
                  <ProjectCard
                    key={project._id}
                    title={project.title}
                    result={resultText}
                    image={imageUrl}
                    slug={project.slug}
                  />
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="bg-black py-24 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-white mb-6">How We Work</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-blue-400 mx-auto mb-6"></div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Our streamlined process ensures efficient delivery and exceptional results
            </p>
          </div>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            <ProcessStep
              step="Step 1"
              title="Discover"
              desc="Understand your goals, target audience, and project requirements"
              icon={<MessageSquare className="w-8 h-8" />}
            />
            <ProcessStep
              step="Step 2"
              title="Design"
              desc="Figma first approach with feedback loops and iterative design"
              icon={<Layers className="w-8 h-8" />}
            />
            <ProcessStep
              step="Step 3"
              title="Deploy & Maintain"
              desc="Launch with CI/CD pipelines and ongoing support"
              icon={<Rocket className="w-8 h-8" />}
            />
          </div>
        </div>
      </section>


      {/* Testimonials */}
      <section className="bg-black py-24 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-white mb-6">What Clients Say</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-blue-400 mx-auto mb-6"></div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Trusted by businesses worldwide for exceptional digital solutions
            </p>
          </div>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            <TestimonialCard
              quote="Trivesha delivered our e-commerce platform ahead of schedule. The attention to detail and performance optimization exceeded our expectations."
              name="Rajesh Kumar"
              avatar="/placeholder.svg"
            />
            <TestimonialCard
              quote="Clear communication and fast iterations made our mobile app project smooth. They handled both design and development perfectly."
              name="Priya Singh"
              avatar="/placeholder.svg"
            />
            <TestimonialCard
              quote="Our website conversions jumped 38% after launch. The design is beautiful and the performance is outstanding."
              name="Michael Chen"
              avatar="/placeholder.svg"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
  <section id="contact" className="bg-gradient-to-r from-gray-900 via-black to-gray-900 py-24 border-t border-teal-500/20 relative overflow-hidden cta-section">
        {/* Interactive Particles & Light Effects Background */}
        <div className="absolute inset-0">
          {/* Glowing particles with shine effect */}
          <div className="absolute top-20 left-20 w-3 h-3 bg-teal-400/30 rounded-full animate-pulse shadow-[0_0_15px_rgba(45,212,191,0.6)] hover:shadow-[0_0_25px_rgba(45,212,191,0.8)] transition-all duration-500 cursor-pointer interactive-particle"></div>
          <div className="absolute top-32 right-32 w-2 h-2 bg-teal-300/40 rounded-full animate-ping shadow-[0_0_10px_rgba(45,212,191,0.5)]" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-40 left-40 w-4 h-4 bg-teal-500/25 rounded-full animate-pulse shadow-[0_0_20px_rgba(45,212,191,0.7)] hover:shadow-[0_0_30px_rgba(45,212,191,0.9)] transition-all duration-500 cursor-pointer interactive-particle large" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-40 left-1/3 w-1.5 h-1.5 bg-teal-400/35 rounded-full animate-ping shadow-[0_0_8px_rgba(45,212,191,0.6)]" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute bottom-32 right-20 w-2.5 h-2.5 bg-teal-300/30 rounded-full animate-pulse shadow-[0_0_12px_rgba(45,212,191,0.5)] hover:shadow-[0_0_20px_rgba(45,212,191,0.7)] transition-all duration-500 cursor-pointer interactive-particle" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-60 right-1/4 w-1 h-1 bg-teal-400/50 rounded-full animate-ping shadow-[0_0_6px_rgba(45,212,191,0.8)]" style={{animationDelay: '2.5s'}}></div>
          
          {/* Medium floating particles with glow */}
          <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-teal-400/35 rounded-full animate-bounce shadow-[0_0_10px_rgba(45,212,191,0.6)] hover:shadow-[0_0_18px_rgba(45,212,191,0.8)] transition-all duration-500 cursor-pointer interactive-particle" style={{animationDelay: '0.8s', animationDuration: '3s'}}></div>
          <div className="absolute bottom-1/3 right-1/6 w-1.5 h-1.5 bg-teal-300/40 rounded-full animate-bounce shadow-[0_0_8px_rgba(45,212,191,0.5)]" style={{animationDelay: '1.2s', animationDuration: '4s'}}></div>
          <div className="absolute top-1/2 left-1/8 w-1 h-1 bg-teal-500/45 rounded-full animate-pulse shadow-[0_0_6px_rgba(45,212,191,0.7)]" style={{animationDelay: '0.3s'}}></div>
          
          {/* Small scattered shine particles */}
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-teal-400/40 rounded-full animate-ping shadow-[0_0_8px_rgba(45,212,191,0.8)]" style={{animationDelay: '3s'}}></div>
          <div className="absolute bottom-1/4 left-1/4 w-0.5 h-0.5 bg-teal-300/50 rounded-full animate-pulse shadow-[0_0_4px_rgba(45,212,191,0.9)]" style={{animationDelay: '3.5s'}}></div>
          <div className="absolute top-3/4 right-1/8 w-1 h-1 bg-teal-400/30 rounded-full animate-ping shadow-[0_0_6px_rgba(45,212,191,0.6)]" style={{animationDelay: '4s'}}></div>
          
          {/* Floating gradient orbs with intense glow */}
          <div className="absolute top-1/4 right-1/5 w-8 h-8 bg-gradient-to-r from-teal-400/20 to-teal-300/10 rounded-full blur-sm animate-pulse shadow-[0_0_25px_rgba(45,212,191,0.4)] hover:shadow-[0_0_40px_rgba(45,212,191,0.6)] transition-all duration-700 cursor-pointer interactive-particle large" style={{animationDelay: '1.8s'}}></div>
          <div className="absolute bottom-1/5 left-1/5 w-12 h-12 bg-gradient-to-br from-teal-500/15 to-teal-400/8 rounded-full blur-md animate-pulse shadow-[0_0_30px_rgba(45,212,191,0.3)]" style={{animationDelay: '2.3s'}}></div>
          <div className="absolute top-2/3 left-2/3 w-6 h-6 bg-gradient-to-l from-teal-300/25 to-teal-500/12 rounded-full blur-sm animate-pulse shadow-[0_0_20px_rgba(45,212,191,0.5)] hover:shadow-[0_0_35px_rgba(45,212,191,0.7)] transition-all duration-700 cursor-pointer interactive-particle" style={{animationDelay: '0.7s'}}></div>
          
          {/* Additional sparkle effects */}
          <div className="absolute top-16 left-1/2 w-1 h-1 bg-white/60 rounded-full animate-ping shadow-[0_0_10px_rgba(255,255,255,0.8)] sparkle-white" style={{animationDelay: '4.5s'}}></div>
          <div className="absolute bottom-16 right-1/2 w-0.5 h-0.5 bg-white/70 rounded-full animate-pulse shadow-[0_0_6px_rgba(255,255,255,0.9)] sparkle-white" style={{animationDelay: '5s'}}></div>
          <div className="absolute top-1/2 right-1/5 w-1.5 h-1.5 bg-white/50 rounded-full animate-ping shadow-[0_0_8px_rgba(255,255,255,0.7)] sparkle-white" style={{animationDelay: '5.5s'}}></div>
          <div className="absolute top-3/4 left-1/5 w-0.5 h-0.5 bg-white/80 rounded-full animate-pulse shadow-[0_0_4px_rgba(255,255,255,1)] sparkle-white" style={{animationDelay: '6s'}}></div>
          <div className="absolute bottom-1/3 right-2/3 w-1 h-1 bg-white/55 rounded-full animate-ping shadow-[0_0_7px_rgba(255,255,255,0.8)] sparkle-white" style={{animationDelay: '6.5s'}}></div>
          
          {/* Moving light rays */}
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-teal-400/20 to-transparent animate-pulse" style={{animationDelay: '2s', animationDuration: '6s'}}></div>
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-teal-300/15 to-transparent animate-pulse" style={{animationDelay: '4s', animationDuration: '8s'}}></div>
          
          {/* Interactive constellation lines (on hover) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: 'rgba(45,212,191,0.6)', stopOpacity: 0}} />
                <stop offset="50%" style={{stopColor: 'rgba(45,212,191,0.8)', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: 'rgba(45,212,191,0.6)', stopOpacity: 0}} />
              </linearGradient>
            </defs>
            <line x1="15%" y1="25%" x2="40%" y2="60%" stroke="url(#lineGradient)" strokeWidth="1" className="opacity-0 transition-opacity duration-1000 hover:opacity-100" />
            <line x1="85%" y1="30%" x2="60%" y2="80%" stroke="url(#lineGradient)" strokeWidth="1" className="opacity-0 transition-opacity duration-1000 hover:opacity-100" />
            <line x1="25%" y1="75%" x2="75%" y2="25%" stroke="url(#lineGradient)" strokeWidth="1" className="opacity-0 transition-opacity duration-1000 hover:opacity-100" />
          </svg>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block bg-teal-500/10 backdrop-blur-sm rounded-full px-4 py-2 border border-teal-500/30 mb-6">
              <span className="text-teal-400 text-sm font-medium">🚀 Start Your Journey</span>
            </div>
            
            <h2 className="font-heading text-4xl md:text-5xl mb-8">
              <span className="bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">Ready to Start Your</span>
              <br />
              <span className="bg-gradient-to-r from-teal-400 to-teal-300 text-transparent bg-clip-text">Project?</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Get a free consultation and detailed quote for your next website, app, or digital project.
            </p>
            
            <div className="max-w-lg mx-auto">
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 border border-teal-500/20 shadow-2xl shadow-teal-500/10">
                <form className="space-y-6" onSubmit={handleFormSubmit}>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your email address"
                      className="w-full px-6 py-4 rounded-xl bg-gray-800/50 border border-teal-500/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-300"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your project"
                      rows={3}
                      className="w-full px-6 py-4 rounded-xl bg-gray-800/50 border border-teal-500/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 resize-none transition-all duration-300"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      type="submit" 
                      size="lg" 
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-semibold py-4 text-lg shadow-lg shadow-teal-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      {isSubmitting ? 'Sending...' : 'Get Free Quote'}
                    </Button>
                    <Button asChild type="button" variant="outline" size="lg" className="flex-1 border-orange-500/50 bg-orange-500/10 text-orange-400 hover:bg-orange-500 hover:text-white font-semibold py-4 text-lg backdrop-blur-sm">
                      <a href="https://wa.me/917330975148" target="_blank" rel="noopener noreferrer">Call Now</a>
                    </Button>
                  </div>
                </form>
                
                <div className="mt-8 pt-6 border-t border-teal-500/20">
                  <p className="text-sm text-gray-400 mb-3">Trusted by 120+ businesses</p>
                  <div className="flex items-center justify-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-teal-400">Free Consultation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                      <span className="text-xs text-teal-400">24h Response</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                      <span className="text-xs text-teal-400">No Commitment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </main>
  );
}
