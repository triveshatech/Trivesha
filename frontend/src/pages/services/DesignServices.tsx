import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Palette, Monitor, Smartphone, Gamepad2, PenTool, Eye, Users } from "lucide-react";

export default function DesignServices() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '/services/design';

  const designServices = [
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Website Design",
      description: "Modern, responsive web designs that convert visitors into customers",
      features: ["Responsive layouts", "User-centered design", "Brand integration", "Conversion optimization"],
      link: "/services/ui-ux-design"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile App Design",
      description: "Native iOS and Android app designs following platform guidelines",
      features: ["iOS & Android design", "User flows", "Interactive prototypes", "Accessibility"],
      link: "/services/mobile-app-development"
    },
    {
      icon: <PenTool className="w-8 h-8" />,
      title: "UI/UX Design",
      description: "Complete user experience design from research to final interface",
      features: ["User research", "Wireframing", "Prototyping", "Usability testing"],
      link: "/services/ui-ux-design"
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: "Game Design",
      description: "Engaging game interfaces and user experience design",
      features: ["Game UI design", "Character design", "Level design", "Game mechanics"],
      link: "#game-design"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Brand Identity",
      description: "Complete brand identity including logos and visual guidelines",
      features: ["Logo design", "Brand guidelines", "Color palettes", "Typography"],
      link: "#brand-identity"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Design System",
      description: "Comprehensive design systems for consistent brand experience",
      features: ["Component library", "Style guides", "Design tokens", "Documentation"],
      link: "#design-system"
    }
  ];

  const designTypes = [
    {
      title: "UI/UX Design",
      subtitle: "User Interface & Experience",
      description: "Create intuitive, beautiful interfaces that users love to interact with",
      image: "/src/assets/services/scene1.png",
      features: ["User Research", "Wireframing", "Prototyping", "Testing"],
      color: "from-[#9333EA] to-[#A855F7]"
    },
    {
      title: "Website Redesign", 
      subtitle: "Modern Web Experiences",
      description: "Transform outdated websites into modern, high-converting experiences",
      image: "/src/assets/services/scene2.png",
      features: ["Conversion Analysis", "Modern Design", "Performance Boost", "Mobile First"],
      color: "from-[#2DD4BF] to-[#5EEAD4]"
    },
    {
      title: "Mobile App Design",
      subtitle: "iOS & Android Apps", 
      description: "Native mobile experiences that follow platform guidelines",
      image: "/src/assets/services/scene4.png",
      features: ["Platform Guidelines", "User Flows", "Micro-interactions", "Accessibility"],
      color: "from-[#FF7849] to-[#FF8B61]"
    },
    {
      title: "Brand Identity",
      subtitle: "Visual Identity Design",
      description: "Complete brand identity systems that tell your story",
      image: "/src/assets/services/design.png",
      features: ["Logo Design", "Brand Guidelines", "Marketing Materials", "Digital Assets"],
      color: "from-[#10B981] to-[#34D399]"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Research & Discovery",
      description: "Deep dive into your users, market, and business goals to inform design decisions",
      icon: <Users className="w-8 h-8" />
    },
    {
      step: "02",
      title: "Concept & Strategy", 
      description: "Develop design concepts and strategic approaches based on research insights",
      icon: <PenTool className="w-8 h-8" />
    },
    {
      step: "03",
      title: "Design & Prototype",
      description: "Create high-fidelity designs and interactive prototypes for validation",
      icon: <Palette className="w-8 h-8" />
    },
    {
      step: "04",
      title: "Test & Refine",
      description: "User testing and iterative refinement to ensure optimal user experience",
      icon: <Eye className="w-8 h-8" />
    }
  ];

  const packages = [
    {
      name: "Essential Design",
      price: "₹35,000",
      period: "project",
      description: "Perfect for startups and small projects",
      features: [
        "Brand consultation",
        "Logo design + 2 concepts",
        "Basic style guide",
        "Business card design",
        "2 revision rounds",
        "Source files included"
      ],
      popular: false
    },
    {
      name: "Complete Branding",
      price: "₹85,000", 
      period: "project",
      description: "Comprehensive brand identity solution",
      features: [
        "Brand strategy session",
        "Logo design + 5 concepts",
        "Complete brand guidelines",
        "Marketing collateral design",
        "Social media templates",
        "5 revision rounds",
        "3 months support"
      ],
      popular: true
    },
    {
      name: "Enterprise Design",
      price: "₹2,00,000",
      period: "project", 
      description: "Full-scale design system and branding",
      features: [
        "Complete design system",
        "Brand identity + guidelines",
        "UI/UX design package",
        "Marketing asset library",
        "Team training session",
        "Unlimited revisions",
        "6 months support"
      ],
      popular: false
    }
  ];

  return (
    <main className="bg-[#0A0E2A] text-[#EAEAEA] min-h-screen">
      <Helmet>
        <title>Design Services - Trivesha</title>
        <meta name="description" content="Professional design services including UI/UX design, branding, website redesigns, and mobile app design. Transform your ideas into beautiful, functional designs." />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F1428] to-[#0A0E2A] pt-24 pb-16">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(147,51,234,0.15), transparent 50%),
                                radial-gradient(circle at 75% 75%, rgba(45,212,191,0.15), transparent 50%)`,
            }}
          />
        </div>

        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="text-[#9333EA] bg-[#9333EA]/10 border border-[#9333EA]/20">
                Design Services
              </Badge>
              <h1 className="font-heading text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
                <span className="text-[#EAEAEA] drop-shadow-[0_4px_20px_rgba(234,234,234,0.2)]">
                  Transform Your Ideas Into
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9333EA] via-[#A855F7] to-[#C084FC] drop-shadow-[0_4px_20px_rgba(147,51,234,0.4)]">
                  Beautiful Designs
                </span>
              </h1>
              <p className="text-lg md:text-xl text-[#A0AEC0] leading-relaxed max-w-3xl mx-auto">
                We create designs that users love and businesses need. From UI/UX to complete brand identity, 
                our design solutions drive engagement and business growth.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-[#9333EA] to-[#A855F7] hover:from-[#A855F7] hover:to-[#C084FC] text-white font-semibold text-lg px-8 shadow-[0_8px_24px_rgba(147,51,234,0.25)] hover:shadow-[0_12px_36px_rgba(147,51,234,0.35)] border-0">
                Start Design Project
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-2 border-[#9333EA]/50 text-[#9333EA] hover:bg-[#9333EA]/10 hover:border-[#9333EA] hover:text-[#A855F7] font-semibold bg-transparent">
                View Design Portfolio
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#9333EA] mb-2">200+</div>
                <div className="text-sm text-[#A0AEC0]">Designs Created</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#2DD4BF] mb-2">95%</div>
                <div className="text-sm text-[#A0AEC0]">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FF7849] mb-2">50+</div>
                <div className="text-sm text-[#A0AEC0]">Brands Designed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#9333EA] mb-2">40%</div>
                <div className="text-sm text-[#A0AEC0]">Avg. Conversion Lift</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Services Grid */}
      <section className="py-24 bg-[#0A0E2A]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#9333EA] mb-4 drop-shadow-[0_4px_20px_rgba(147,51,234,0.2)]">
              Our Design Services
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Comprehensive design solutions for every aspect of your digital presence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {designServices.map((service, index) => (
              <Card key={index} className="group border border-[#1C2333] bg-[#111528] shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(147,51,234,0.25)] hover:border-[#9333EA]/30 transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 rounded-full bg-[#9333EA]/10 border border-[#9333EA]/20 flex items-center justify-center mx-auto mb-4 text-[#9333EA] group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-[#EAEAEA] mb-2">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-[#A0AEC0] mb-4">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-[#A0AEC0]">
                        <CheckCircle className="w-4 h-4 text-[#9333EA] mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {service.link.startsWith('#') ? (
                    <Button variant="outline" className="w-full border-2 border-[#9333EA]/50 text-[#9333EA] hover:bg-[#9333EA]/10 hover:border-[#9333EA] font-semibold bg-transparent">
                      Coming Soon
                    </Button>
                  ) : (
                    <Button asChild variant="outline" className="w-full border-2 border-[#9333EA]/50 text-[#9333EA] hover:bg-[#9333EA]/10 hover:border-[#9333EA] font-semibold bg-transparent">
                      <Link to={service.link}>Learn More</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Design Types Section */}
      <section className="py-24 bg-[#0F1428]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#EAEAEA] mb-4">
              Specialized Design Solutions
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              From UI/UX to complete brand identity, we cover all your design needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {designTypes.map((type, index) => (
              <Card key={index} className="group border border-[#1C2333] bg-[#111528] shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(147,51,234,0.25)] hover:border-[#9333EA]/30 transition-all duration-300 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${type.color}`}></div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="text-[#9333EA] bg-[#9333EA]/10 border border-[#9333EA]/20">
                      {type.subtitle}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold text-[#EAEAEA] mb-3">
                    {type.title}
                  </CardTitle>
                  <CardDescription className="text-[#A0AEC0] text-base leading-relaxed">
                    {type.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {type.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-[#9333EA] mr-2 flex-shrink-0" />
                        <span className="text-sm text-[#EAEAEA]">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full bg-[#9333EA] hover:bg-[#A855F7] text-white font-semibold">
                    Explore {type.title}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-[#0A0E2A]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#9333EA] mb-4 drop-shadow-[0_4px_20px_rgba(147,51,234,0.2)]">
              Our Design Process
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              A user-centered approach that ensures exceptional design outcomes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="relative">
                <Card className="border border-[#1C2333] bg-[#111528] shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(147,51,234,0.25)] hover:border-[#9333EA]/30 transition-all duration-300 h-full text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 rounded-full bg-[#9333EA]/10 border border-[#9333EA]/20 flex items-center justify-center mx-auto mb-4 text-[#9333EA]">
                      {step.icon}
                    </div>
                    <div className="text-2xl font-bold text-[#9333EA] mb-3">{step.step}</div>
                    <h3 className="font-bold text-[#EAEAEA] text-lg mb-3">{step.title}</h3>
                    <p className="text-[#A0AEC0] leading-relaxed text-sm">{step.description}</p>
                  </CardContent>
                </Card>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#9333EA]/50 to-[#9333EA]/20"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-[#0F1428]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#EAEAEA] mb-4">
              Design Service Packages
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Professional design solutions for every budget and requirement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <Card key={index} className={`relative border-2 bg-[#111528] shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all duration-300 ${
                pkg.popular 
                  ? 'border-[#9333EA] shadow-[0_12px_36px_rgba(147,51,234,0.25)] scale-105' 
                  : 'border-[#1C2333] hover:border-[#9333EA]/30 hover:shadow-[0_12px_36px_rgba(147,51,234,0.15)]'
              }`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-[#9333EA] text-white font-bold px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-[#EAEAEA] mb-2">
                    {pkg.name}
                  </CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-[#9333EA]">{pkg.price}</span>
                    <span className="text-[#A0AEC0] ml-2">/{pkg.period}</span>
                  </div>
                  <CardDescription className="text-[#A0AEC0]">
                    {pkg.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {pkg.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#9333EA] flex-shrink-0" />
                      <span className="text-[#EAEAEA]">{feature}</span>
                    </div>
                  ))}
                  
                  <div className="pt-6">
                    <Button 
                      className={`w-full font-semibold ${
                        pkg.popular
                          ? 'bg-[#9333EA] hover:bg-[#A855F7] text-white shadow-[0_8px_24px_rgba(147,51,234,0.25)]'
                          : 'bg-[#111528] border-2 border-[#9333EA]/50 text-[#9333EA] hover:bg-[#9333EA]/10 hover:border-[#9333EA]'
                      }`}
                      variant={pkg.popular ? "default" : "outline"}
                    >
                      Get Started
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#0A0E2A] via-[#111528] to-[#0F1428] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(147,51,234,0.15), transparent 50%),
                                radial-gradient(circle at 75% 75%, rgba(45,212,191,0.15), transparent 50%)`,
            }}
          />
        </div>
        
        <div className="container mx-auto max-w-7xl px-6 text-center relative z-10">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#EAEAEA] mb-6 drop-shadow-[0_4px_20px_rgba(234,234,234,0.2)]">
            Ready to Transform Your Brand?
          </h2>
          <p className="text-xl text-[#A0AEC0] mb-8 max-w-2xl mx-auto">
            Let's create designs that users love and businesses trust. Start your design journey today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#9333EA] to-[#A855F7] hover:from-[#A855F7] hover:to-[#C084FC] text-white font-bold text-xl px-12 py-4 shadow-[0_12px_32px_rgba(147,51,234,0.3)] hover:shadow-[0_20px_48px_rgba(147,51,234,0.4)] border-0 transition-all duration-300 transform hover:scale-105"
            >
              Start Design Project
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="text-xl px-12 py-4 border-2 border-[#2DD4BF]/50 text-[#2DD4BF] hover:bg-[#2DD4BF]/10 hover:border-[#2DD4BF] hover:text-[#5EEAD4] font-bold bg-transparent"
              asChild
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
