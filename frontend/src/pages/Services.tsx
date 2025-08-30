import { useState } from "react";
import SEO from "@/components/SEO";
import { generateServiceSchema } from "@/lib/seo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PixelCanvas from "@/components/ui/pixel-canvas";
import InitialsAvatar from "@/components/ui/initials-avatar";
import designImage from "@/assets/services/design.png";
import developmentImage from "@/assets/services/development.png";
import infrastructureImage from "@/assets/services/infrastructure.png";
import growthImage from "@/assets/services/growth.png";
import uiuxImage from "@/assets/services/scene1.png";
import webImage from "@/assets/services/scene2.png";
import devImage from "@/assets/services/scene3.png";
import appImage from "@/assets/services/scene4.png";
import designIcon from "@/assets/services/design-icon.png";
import buildIcon from "@/assets/services/build-icon.png";
import launchIcon from "@/assets/services/launch-icon.png";

export default function Services() {
  // Schema markup for services
  const servicesSchema = [
    generateServiceSchema({
      name: "UI/UX Design",
      description: "Figma-first prototypes and user-centered design solutions that convert visitors into customers.",
      url: "https://trivesha.com/services/ui-ux-design",
      image: "https://trivesha.com/assets/services/design.png",
      category: "Design Services"
    }),
    generateServiceSchema({
      name: "Web Development", 
      description: "Static, dynamic, and custom websites built with modern technologies for optimal performance.",
      url: "https://trivesha.com/services/web-development",
      image: "https://trivesha.com/assets/services/development.png",
      category: "Development Services"
    }),
    generateServiceSchema({
      name: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android.",
      url: "https://trivesha.com/services/mobile-app-development", 
      image: "https://trivesha.com/assets/services/app.png",
      category: "Development Services"
    })
  ];
  
  const services = [
    {
      icon: "🎨",
      title: "UI/UX Design",
      description: "Figma-first prototypes and user-centered design solutions that convert visitors into customers.",
      link: "/services/ui-ux-design",
      theme: "teal" as const
    },
    {
      icon: "💻",
      title: "Website Development",
      description: "Static, dynamic, and custom websites built with modern technologies for optimal performance.",
      link: "/services/web-development",
      theme: "blue" as const
    },
    {
      icon: "⚙️",
      title: "Backend Maintenance & Deployment",
      description: "Reliable server management, continuous deployment, and infrastructure optimization services.",
      link: "/services/backend",
      theme: "purple" as const
    },
    {
      icon: "📱",
      title: "Mobile App Development",
      description: "Cross-platform mobile applications for Play Store and App Store with native performance.",
      link: "/services/mobile-app-development",
      theme: "orange" as const
    },
    {
      icon: "🎮",
      title: "Game Development",
      description: "Casual HTML5 and mobile games with engaging gameplay and monetization strategies.",
      link: "/services/games",
      theme: "green" as const
    },
    {
      icon: "🌐",
      title: "Domain & Hosting Management",
      description: "Complete domain registration, DNS management, and hosting solutions for your projects.",
      link: "/services/hosting",
      theme: "pink" as const
    }
  ];

  const categories = [
    {
      title: "Design",
      subtitle: "UI/UX, redesigns",
      description: "Transform your ideas into beautiful, functional designs that users love and businesses need.",
      image: designImage,
      cta: "See design examples",
      link: "/services/design"
    },
    {
      title: "Development", 
      subtitle: "Web, Mobile, Games",
      description: "Build robust applications with cutting-edge technologies and best practices for scalability.",
      image: developmentImage,
      cta: "View development work",
      link: "/services/development"
    },
    {
      title: "Infrastructure",
      subtitle: "Domains, Hosting, Maintenance", 
      description: "Keep your digital assets running smoothly with reliable infrastructure and ongoing support.",
      image: infrastructureImage,
      cta: "Explore infrastructure",
      link: "/services/infrastructure"
    },
    {
      title: "Growth",
      subtitle: "SEO, Analytics, Support",
      description: "Grow your online presence with data-driven strategies and continuous optimization.",
      image: growthImage, 
      cta: "Learn about growth",
      link: "/services/growth"
    }
  ];

  const processSteps = [
    {
      image: designIcon,
      title: "Discover",
      description: "Understand your goals, audience, and technical requirements through detailed consultation."
    },
    {
      image: buildIcon,
      title: "Build", 
      description: "Design and develop your solution using proven methodologies and modern technologies."
    },
    {
      image: launchIcon,
      title: "Launch & Maintain",
      description: "Deploy your project and provide ongoing support to ensure optimal performance."
    }
  ];

  const testimonials = [
    {
      avatar: "/placeholder.svg",
      name: "Priya Sharma",
      role: "CEO, TechStart",
      quote: "Trivesha delivered our mobile app ahead of schedule with exceptional quality. Their attention to detail is remarkable."
    },
    {
      avatar: "/placeholder.svg", 
      name: "Rajesh Kumar",
      role: "Founder, E-Commerce Plus",
      quote: "The website redesign increased our conversion rate by 40%. Professional service from start to finish."
    },
    {
      avatar: "/placeholder.svg",
      name: "Anita Gupta", 
      role: "Marketing Director, StartupXYZ",
      quote: "Outstanding UI/UX work that perfectly captured our brand identity. Highly recommend their services."
    }
  ];

  // State for project grid (show 3 at a time, load more on click)
  const [visibleProjects, setVisibleProjects] = useState(3);
  const totalProjects = services.length;
  const canLoadMore = visibleProjects < totalProjects;

  return (
    <main className="bg-[#0A0E2A] text-[#EAEAEA]">
      <SEO
        title="Services - Trivesha"
        description="Web design, development, apps, DevOps, maintenance. Explore Trivesha services and compare plans."
        canonical="/services"
        ogImage="/social-images/og-services.png"
        schemaMarkup={servicesSchema}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F1428] to-[#0A0E2A]">
        <div className="container mx-auto max-w-7xl px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="font-heading text-4xl md:text-5xl xl:text-6xl font-bold text-[#2DD4BF] leading-tight drop-shadow-[0_4px_20px_rgba(45,212,191,0.3)]">
                All the digital services you need, in one place
              </h1>
              <p className="text-lg md:text-xl text-[#A0AEC0] leading-relaxed">
                From concept to deployment, we handle your entire digital journey. 
                Expert design, development, and maintenance services tailored to your business goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-[#2DD4BF] hover:bg-[#5EEAD4] text-[#0A0E2A] font-semibold text-lg px-8 w-full sm:w-auto shadow-[0_8px_24px_rgba(45,212,191,0.25)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.35)] border-0" asChild>
                  <Link to="/contact">Get a free quote</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 border-2 border-[#2DD4BF]/50 text-[#2DD4BF] hover:bg-[#2DD4BF]/10 hover:border-[#2DD4BF] hover:text-[#5EEAD4] w-full sm:w-auto font-semibold bg-transparent" asChild>
                  <Link to="/portfolio">See portfolio</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="hero-mockup bg-[#111528] rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.35)] overflow-hidden transform rotate-2 border border-[#1C2333]">
                    <img src={uiuxImage} alt="Design mockup" className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h3 className="font-semibold text-sm text-[#EAEAEA]">UI/UX Design</h3>
                    </div>
                  </div>
                  <div className="hero-mockup bg-[#111528] rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.35)] overflow-hidden transform -rotate-1 border border-[#1C2333]">
                    <img src={appImage} alt="Mobile app" className="w-full h-32 object-cover" />
                    <div className="p-3">
                      <h3 className="font-semibold text-sm text-[#EAEAEA]">Mobile Apps</h3>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="hero-mockup bg-[#111528] rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.35)] overflow-hidden transform -rotate-2 border border-[#1C2333]">
                    <img src={webImage} alt="Web development" className="w-full h-36 object-cover" />
                    <div className="p-4">
                      <h3 className="font-semibold text-sm text-[#EAEAEA]">Web Development</h3>
                    </div>
                  </div>
                  <div className="hero-mockup bg-[#111528] rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.35)] overflow-hidden transform rotate-1 border border-[#1C2333]">
                    <img src={devImage} alt="DevOps" className="w-full h-28 object-cover" />
                    <div className="p-3">
                      <h3 className="font-semibold text-sm text-[#EAEAEA]">DevOps</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-[#0A0E2A]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#2DD4BF] mb-4 drop-shadow-[0_4px_20px_rgba(45,212,191,0.2)]">
              Our Services
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Comprehensive digital solutions to bring your vision to life
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.slice(0, visibleProjects).map((service, index) => (
              <Card key={index} className="service-card group cursor-pointer border border-[#1C2333] bg-[#111528] shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.25)] hover:border-[#2DD4BF]/30 transition-all duration-300 relative overflow-hidden">
                <PixelCanvas 
                  theme={service.theme}
                  gap={4}
                  speed={25}
                />
                <CardHeader className="text-center p-4 md:p-6 relative z-20">
                  <div className="service-icon w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 bg-[#0F1428] border border-[#1C2333]">
                    <span className="text-lg md:text-2xl">{service.icon}</span>
                  </div>
                  <CardTitle className="text-lg md:text-xl font-bold text-[#EAEAEA]">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0 relative z-20">
                  <CardDescription className="text-center text-[#A0AEC0] leading-relaxed text-sm md:text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="justify-center p-4 md:p-6 pt-0 relative z-20">
                  {service.link.startsWith('#') ? (
                    <a 
                      href={service.link}
                      className="text-[#2DD4BF] hover:text-[#5EEAD4] font-medium transition-colors text-sm md:text-base hover:drop-shadow-[0_0_8px_rgba(94,234,212,0.6)]"
                    >
                      Learn more →
                    </a>
                  ) : (
                    <Link 
                      to={service.link}
                      className="text-[#2DD4BF] hover:text-[#5EEAD4] font-medium transition-colors text-sm md:text-base hover:drop-shadow-[0_0_8px_rgba(94,234,212,0.6)]"
                    >
                      Learn more →
                    </Link>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            {canLoadMore ? (
              <Button
                variant="outline"
                className="border-2 border-[#2DD4BF]/50 text-[#2DD4BF] hover:bg-[#2DD4BF]/10 hover:border-[#2DD4BF] hover:text-[#5EEAD4] font-semibold bg-transparent"
                onClick={() => setVisibleProjects(Math.min(visibleProjects + 3, totalProjects))}
              >
                Load More Projects
              </Button>
            ) : (
              <Button
                variant="outline"
                className="border-2 border-[#FF7849]/50 text-[#FF7849] hover:bg-[#FF7849]/10 hover:border-[#FF7849] hover:text-[#FF8B61] font-semibold bg-transparent"
                onClick={() => setVisibleProjects(3)}
              >
                Show Less
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Category Sections */}
      <section className="py-0">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className={`py-16 relative overflow-hidden ${index % 2 === 0 ? 'bg-[#0A0E2A]' : 'bg-[#0F1428]'}`}
          >
            {/* Timeline Pattern Background */}
            <div className="absolute inset-0 opacity-5">
              {/* Vertical timeline lines */}
              <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#2DD4BF] to-transparent" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#FF7849] to-transparent" />
              <div className="absolute left-3/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#2DD4BF] to-transparent" />
              
              {/* Horizontal connecting lines */}
              <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2DD4BF]/50 to-transparent" />
              <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF7849]/50 to-transparent" />
              
              {/* Timeline nodes/dots */}
              <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-[#2DD4BF]/60 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-[#FF7849]/60 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute top-1/4 left-3/4 w-3 h-3 bg-[#2DD4BF]/60 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
              
              <div className="absolute top-3/4 left-1/4 w-2 h-2 bg-[#FF7849]/60 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute top-3/4 left-1/2 w-3 h-3 bg-[#2DD4BF]/60 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute top-3/4 left-3/4 w-2 h-2 bg-[#FF7849]/60 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
              
              {/* Diagonal connection lines */}
              <div className="absolute top-1/4 left-1/4 w-32 h-px bg-gradient-to-r from-[#2DD4BF]/30 to-transparent transform rotate-45 origin-left" />
              <div className="absolute top-3/4 right-1/4 w-32 h-px bg-gradient-to-l from-[#FF7849]/30 to-transparent transform -rotate-45 origin-right" />
            </div>
            
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-3">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(rgba(45,212,191,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(45,212,191,0.1) 1px, transparent 1px),
                  linear-gradient(rgba(255,120,73,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,120,73,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '80px 80px, 80px 80px, 120px 120px, 120px 120px',
                backgroundPosition: '0 0, 0 0, 40px 40px, 40px 40px'
              }} />
            </div>
            
            {/* Flowing timeline animation */}
            <div className="absolute inset-0 opacity-4">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2DD4BF]/40 to-transparent animate-pulse" style={{ animationDelay: `${index * 0.5}s` }} />
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-[#FF7849]/40 to-transparent animate-pulse" style={{ animationDelay: `${index * 0.8}s` }} />
            </div>
            
            {/* Subtle radial gradients */}
            <div className="absolute inset-0 opacity-8">
              <div className="absolute inset-0" style={{
                background: `
                  radial-gradient(ellipse 200px 100px at ${index % 2 === 0 ? '20%' : '80%'} 30%, rgba(45,212,191,0.08), transparent),
                  radial-gradient(ellipse 150px 75px at ${index % 2 === 0 ? '80%' : '20%'} 70%, rgba(255,120,73,0.06), transparent)
                `
              }} />
            </div>
            
            <div className="container mx-auto max-w-7xl px-6 relative z-10">
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <Badge variant="secondary" className="text-[#2DD4BF] bg-[#2DD4BF]/10 border border-[#2DD4BF]/20">
                    {category.subtitle}
                  </Badge>
                  <h3 className="font-heading text-3xl font-bold text-[#EAEAEA]">
                    {category.title}
                  </h3>
                  <p className="text-lg text-[#A0AEC0] leading-relaxed">
                    {category.description}
                  </p>
                  <Button asChild variant="outline" className="border-2 border-[#2DD4BF]/50 text-[#2DD4BF] hover:bg-[#2DD4BF]/10 hover:border-[#2DD4BF] hover:text-[#5EEAD4] font-semibold bg-transparent">
                    <Link to={category.link}>
                      {category.cta}
                    </Link>
                  </Button>
                </div>
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="category-card rounded-lg overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.35)] border border-[#1C2333] hover:shadow-[0_12px_36px_rgba(45,212,191,0.15)] transition-all duration-300">
                    <img 
                      src={category.image} 
                      alt={category.title}
                      className="w-full h-80 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gradient-to-br from-[#0F1428] via-[#2DD4BF]/20 to-[#0A0E2A] text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(45,212,191,0.15), transparent 50%),
                                radial-gradient(circle at 75% 75%, rgba(255,120,73,0.15), transparent 50%)`,
            }}
          />
        </div>
        
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 drop-shadow-[0_4px_20px_rgba(45,212,191,0.3)]">
              Our Process
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              A structured approach that ensures quality results every time
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center mx-auto mb-4 md:mb-6 relative">
                  {/* Soft glow background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2DD4BF]/20 to-transparent rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full h-full object-contain process-icon relative z-10 drop-shadow-[0_8px_30px_rgba(45,212,191,0.25)]"
                  />
                </div>
                <h3 className="font-heading text-lg md:text-xl font-bold mb-3 md:mb-4 text-[#EAEAEA]">
                  {step.title}
                </h3>
                <p className="text-[#A0AEC0] leading-relaxed text-sm md:text-base">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#0F1428] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 20%, rgba(45,212,191,0.1), transparent 50%),
                                radial-gradient(circle at 70% 80%, rgba(255,120,73,0.1), transparent 50%)`,
            }}
          />
        </div>
        
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-[#2DD4BF]/10 text-[#2DD4BF] border border-[#2DD4BF]/20">
              Client Success Stories
            </Badge>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#EAEAEA] mb-4 drop-shadow-[0_4px_20px_rgba(45,212,191,0.2)]">
              What Our Clients Say
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Trusted by businesses across India to deliver exceptional digital experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group testimonial-card border-2 border-[#1C2333] bg-gradient-to-br from-[#111528] to-[#0F1428] shadow-[0_12px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_48px_rgba(45,212,191,0.15)] hover:border-[#2DD4BF]/30 transition-all duration-500 relative overflow-hidden">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2DD4BF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardContent className="p-6 md:p-8 relative z-10">
                  {/* Quote Icon */}
                  <div className="w-12 h-12 bg-[#2DD4BF]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#2DD4BF]/20 transition-colors duration-300">
                    <span className="text-2xl text-[#2DD4BF]">"</span>
                  </div>
                  
                  <p className="text-[#EAEAEA] mb-6 leading-relaxed text-base font-medium relative">
                    {testimonial.quote}
                  </p>
                  
                  <div className="flex items-center space-x-4 pt-4 border-t border-[#1C2333] group-hover:border-[#2DD4BF]/20 transition-colors duration-300">
                    <div className="relative">
                      <InitialsAvatar
                        name={testimonial.name}
                        src={testimonial.avatar}
                        size={48}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#2DD4BF]/30 group-hover:border-[#2DD4BF]/60 transition-colors duration-300"
                      />
                      <div className="absolute inset-0 rounded-full bg-[#2DD4BF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#EAEAEA] text-base mb-1">
                        {testimonial.name}
                      </h4>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <div className="inline-flex items-center space-x-2 bg-[#FF7849]/10 px-6 py-3 rounded-full border border-[#FF7849]/20">
              <div className="w-2 h-2 bg-[#FF7849] rounded-full animate-pulse"></div>
              <span className="text-[#FF7849] font-semibold">JustDial Verified Partner</span>
              <div className="w-2 h-2 bg-[#FF7849] rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-24 bg-gradient-to-br from-[#0A0E2A] via-[#111528] to-[#0F1428] text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,120,73,0.15), transparent 60%),
                                radial-gradient(circle at 75% 75%, rgba(45,212,191,0.1), transparent 60%),
                                radial-gradient(circle at 50% 50%, rgba(255,120,73,0.08), transparent 80%)`,
            }}
          />
        </div>
        
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#FF7849] rounded-full opacity-40 animate-ping"></div>
          <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-[#2DD4BF] rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-[#FF7849] rounded-full opacity-50 animate-ping" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-[#2DD4BF] rounded-full opacity-25 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        {/* Main Content */}
        <div className="container mx-auto max-w-7xl px-6 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-[#FF7849]/10 px-6 py-3 rounded-full border border-[#FF7849]/20 mb-8">
            <div className="w-2 h-2 bg-[#FF7849] rounded-full animate-pulse"></div>
            <span className="text-[#FF7849] font-semibold text-sm">Ready to Start Your Project?</span>
            <div className="w-2 h-2 bg-[#FF7849] rounded-full animate-pulse"></div>
          </div>
          
          {/* Main Heading */}
          <div className="space-y-4 mb-8">
            <h2 className="font-heading text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
              <span className="text-[#EAEAEA] drop-shadow-[0_4px_20px_rgba(234,234,234,0.2)]">
                Got a project in mind?
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7849] via-[#FF8B61] to-[#FFB088] drop-shadow-[0_4px_20px_rgba(255,120,73,0.4)]">
                Let's start building.
              </span>
            </h2>
          </div>
          
          {/* Subtext */}
          <p className="text-xl text-[#A0AEC0] mb-12 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your ideas into reality? Get a personalized quote today and let's bring your vision to life.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="group bg-gradient-to-r from-[#FF7849] to-[#FF8B61] hover:from-[#FF8B61] hover:to-[#FFB088] text-white font-bold text-xl px-12 py-4 shadow-[0_12px_32px_rgba(255,120,73,0.3)] hover:shadow-[0_20px_48px_rgba(255,120,73,0.4)] border-0 transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link to="/contact">
                <span className="mr-2">Get Quote</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="text-xl px-12 py-4 border-2 border-[#2DD4BF]/50 text-[#2DD4BF] hover:bg-[#2DD4BF]/10 hover:border-[#2DD4BF] hover:text-[#5EEAD4] font-bold bg-transparent backdrop-blur-sm shadow-[0_8px_24px_rgba(45,212,191,0.15)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.25)] transition-all duration-300"
              asChild
            >
              <Link to="/portfolio">View Portfolio</Link>
            </Button>
          </div>
          
          {/* Bottom Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#FF7849] mb-2">50+</div>
              <div className="text-sm text-[#A0AEC0]">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#2DD4BF] mb-2">98%</div>
              <div className="text-sm text-[#A0AEC0]">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#FF7849] mb-2">24/7</div>
              <div className="text-sm text-[#A0AEC0]">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#2DD4BF] mb-2">5★</div>
              <div className="text-sm text-[#A0AEC0]">Average Rating</div>
            </div>
          </div>
        </div>
        
        {/* Bottom Gradient Border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF7849] to-transparent opacity-50"></div>
      </section>
    </main>
  );
}
