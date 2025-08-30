import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Code, Database, Smartphone, Globe, Gamepad2, Zap, Shield, TrendingUp } from "lucide-react";

export default function DevelopmentServices() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '/services/development';

  const developmentServices = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Web Development",
      description: "Modern, responsive websites built with cutting-edge technologies",
      features: ["React & Next.js", "Responsive design", "SEO optimized", "Performance focused"],
      link: "/services/web-development"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile App Development",
      description: "Cross-platform mobile applications for iOS and Android",
      features: ["React Native", "Flutter", "Native performance", "App store ready"],
      link: "/services/mobile-app-development"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Backend Development",
      description: "Scalable server-side solutions and API development",
      features: ["Node.js & Python", "RESTful APIs", "Database design", "Cloud deployment"],
      link: "#backend-development"
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: "Game Development",
      description: "Engaging HTML5 and mobile games with modern frameworks",
      features: ["HTML5 games", "Mobile games", "Game mechanics", "Monetization"],
      link: "#game-development"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Custom Software",
      description: "Tailored software solutions for specific business needs",
      features: ["Custom applications", "Integration solutions", "Automation tools", "Enterprise software"],
      link: "#custom-software"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "API Development",
      description: "Robust APIs for seamless integration and data exchange",
      features: ["REST APIs", "GraphQL", "Authentication", "Documentation"],
      link: "#api-development"
    }
  ];

  const technologies = [
    { name: "React", category: "Frontend", icon: "⚛️", color: "text-[#61DAFB]" },
    { name: "Next.js", category: "Framework", icon: "🔺", color: "text-[#000000]" },
    { name: "Node.js", category: "Backend", icon: "🟢", color: "text-[#339933]" },
    { name: "Python", category: "Backend", icon: "🐍", color: "text-[#3776AB]" },
    { name: "TypeScript", category: "Language", icon: "📘", color: "text-[#3178C6]" },
    { name: "MongoDB", category: "Database", icon: "🍃", color: "text-[#47A248]" },
    { name: "PostgreSQL", category: "Database", icon: "🐘", color: "text-[#336791]" },
    { name: "AWS", category: "Cloud", icon: "☁️", color: "text-[#FF9900]" }
  ];

  const developmentTypes = [
    {
      title: "Web Applications",
      subtitle: "Modern Web Solutions",
      description: "Full-stack web applications with modern frameworks and best practices",
      features: ["React/Next.js", "Node.js Backend", "Database Integration", "Cloud Deployment"],
      color: "from-[#2DD4BF] to-[#5EEAD4]",
      stats: { projects: "50+", performance: "95%", satisfaction: "98%" }
    },
    {
      title: "Mobile Applications", 
      subtitle: "Cross-Platform Apps",
      description: "Native-quality mobile apps that work seamlessly across platforms",
      features: ["React Native", "Flutter", "Native Modules", "App Store Optimization"],
      color: "from-[#FF7849] to-[#FF8B61]",
      stats: { projects: "25+", downloads: "100K+", rating: "4.8★" }
    },
    {
      title: "Backend Systems",
      subtitle: "Scalable Infrastructure",
      description: "Robust backend systems that power your applications reliably",
      features: ["API Development", "Database Design", "Cloud Architecture", "Security"],
      color: "from-[#9333EA] to-[#A855F7]",
      stats: { apis: "100+", uptime: "99.9%", requests: "1M+" }
    },
    {
      title: "Game Development",
      subtitle: "Interactive Experiences",
      description: "Engaging games for web and mobile platforms with modern game engines",
      features: ["HTML5 Games", "Mobile Games", "Multiplayer", "Game Analytics"],
      color: "from-[#10B981] to-[#34D399]",
      stats: { games: "15+", players: "50K+", engagement: "85%" }
    }
  ];

  const process = [
    {
      step: "01",
      title: "Planning & Architecture",
      description: "Define requirements, choose technology stack, and design system architecture",
      icon: <Code className="w-8 h-8" />
    },
    {
      step: "02",
      title: "Development & Testing",
      description: "Agile development with continuous testing and code quality assurance",
      icon: <Zap className="w-8 h-8" />
    },
    {
      step: "03",
      title: "Integration & Security",
      description: "API integrations, security implementation, and performance optimization",
      icon: <Shield className="w-8 h-8" />
    },
    {
      step: "04",
      title: "Deployment & Monitoring",
      description: "Cloud deployment, monitoring setup, and ongoing maintenance support",
      icon: <TrendingUp className="w-8 h-8" />
    }
  ];

  const packages = [
    {
      name: "Startup MVP",
      price: "₹1,50,000",
      period: "project",
      description: "Perfect for startups and proof of concept",
      features: [
        "Web or mobile app",
        "Basic features (5-8)",
        "Database setup",
        "Basic authentication",
        "3 months support",
        "Source code included"
      ],
      popular: false
    },
    {
      name: "Business Application",
      price: "₹4,50,000",
      period: "project",
      description: "Complete application for growing businesses",
      features: [
        "Full-stack application",
        "Advanced features (15+)",
        "Admin dashboard",
        "Third-party integrations",
        "Security implementation",
        "6 months support",
        "Cloud deployment"
      ],
      popular: true
    },
    {
      name: "Enterprise Solution",
      price: "₹10,00,000",
      period: "project",
      description: "Large-scale applications with custom requirements",
      features: [
        "Custom architecture",
        "Unlimited features",
        "Multiple integrations",
        "Advanced security",
        "Performance optimization",
        "12 months support",
        "Dedicated team"
      ],
      popular: false
    }
  ];

  return (
    <main className="bg-[#0A0E2A] text-[#EAEAEA] min-h-screen">
      <Helmet>
        <title>Development Services - Trivesha</title>
        <meta name="description" content="Professional development services including web development, mobile apps, backend systems, and custom software solutions. Build robust applications with cutting-edge technologies." />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F1428] to-[#0A0E2A] pt-24 pb-16">
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
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="text-[#2DD4BF] bg-[#2DD4BF]/10 border border-[#2DD4BF]/20">
                Development Services
              </Badge>
              <h1 className="font-heading text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
                <span className="text-[#EAEAEA] drop-shadow-[0_4px_20px_rgba(234,234,234,0.2)]">
                  Build Robust Applications
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2DD4BF] via-[#5EEAD4] to-[#7DD3FC] drop-shadow-[0_4px_20px_rgba(45,212,191,0.4)]">
                  With Cutting-Edge Tech
                </span>
              </h1>
              <p className="text-lg md:text-xl text-[#A0AEC0] leading-relaxed max-w-3xl mx-auto">
                Transform your ideas into powerful applications. We build scalable, secure, and high-performance 
                solutions using modern technologies and best practices.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-[#2DD4BF] to-[#5EEAD4] hover:from-[#5EEAD4] hover:to-[#7DD3FC] text-[#0A0E2A] font-semibold text-lg px-8 shadow-[0_8px_24px_rgba(45,212,191,0.25)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.35)] border-0">
                Start Development Project
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-2 border-[#2DD4BF]/50 text-[#2DD4BF] hover:bg-[#2DD4BF]/10 hover:border-[#2DD4BF] hover:text-[#5EEAD4] font-semibold bg-transparent">
                View Development Portfolio
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#2DD4BF] mb-2">75+</div>
                <div className="text-sm text-[#A0AEC0]">Apps Developed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FF7849] mb-2">99.9%</div>
                <div className="text-sm text-[#A0AEC0]">Uptime Achieved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#2DD4BF] mb-2">500K+</div>
                <div className="text-sm text-[#A0AEC0]">Users Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#9333EA] mb-2">24/7</div>
                <div className="text-sm text-[#A0AEC0]">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Development Services Grid */}
      <section className="py-24 bg-[#0A0E2A]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#2DD4BF] mb-4 drop-shadow-[0_4px_20px_rgba(45,212,191,0.2)]">
              Our Development Services
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Comprehensive development solutions for web, mobile, and custom applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {developmentServices.map((service, index) => (
              <Card key={index} className="group border border-[#1C2333] bg-[#111528] shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.25)] hover:border-[#2DD4BF]/30 transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 flex items-center justify-center mx-auto mb-4 text-[#2DD4BF] group-hover:scale-110 transition-transform duration-300">
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
                        <CheckCircle className="w-4 h-4 text-[#2DD4BF] mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {service.link.startsWith('#') ? (
                    <Button variant="outline" className="w-full border-2 border-[#2DD4BF]/50 text-[#2DD4BF] hover:bg-[#2DD4BF]/10 hover:border-[#2DD4BF] font-semibold bg-transparent">
                      Coming Soon
                    </Button>
                  ) : (
                    <Button asChild variant="outline" className="w-full border-2 border-[#2DD4BF]/50 text-[#2DD4BF] hover:bg-[#2DD4BF]/10 hover:border-[#2DD4BF] font-semibold bg-transparent">
                      <Link to={service.link}>Learn More</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-24 bg-[#0F1428]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#EAEAEA] mb-4">
              Technologies We Master
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Industry-leading technologies for modern, scalable applications
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {technologies.map((tech, index) => (
              <Card key={index} className="text-center border border-[#1C2333] bg-[#111528] shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.15)] hover:border-[#2DD4BF]/30 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{tech.icon}</div>
                  <h3 className="font-bold text-[#EAEAEA] mb-1">{tech.name}</h3>
                  <p className="text-sm text-[#A0AEC0]">{tech.category}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Development Types */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {developmentTypes.map((type, index) => (
              <Card key={index} className="group border border-[#1C2333] bg-[#111528] shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.25)] hover:border-[#2DD4BF]/30 transition-all duration-300 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${type.color}`}></div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="text-[#2DD4BF] bg-[#2DD4BF]/10 border border-[#2DD4BF]/20">
                      {type.subtitle}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold text-[#EAEAEA] mb-3">
                    {type.title}
                  </CardTitle>
                  <CardDescription className="text-[#A0AEC0] text-base leading-relaxed mb-4">
                    {type.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {type.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-[#2DD4BF] mr-2 flex-shrink-0" />
                        <span className="text-sm text-[#EAEAEA]">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-[#0F1428] rounded-lg">
                    {Object.entries(type.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg font-bold text-[#2DD4BF]">{value}</div>
                        <div className="text-xs text-[#A0AEC0] capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full bg-[#2DD4BF] hover:bg-[#5EEAD4] text-[#0A0E2A] font-semibold">
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#2DD4BF] mb-4 drop-shadow-[0_4px_20px_rgba(45,212,191,0.2)]">
              Our Development Process
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Agile development methodology that ensures quality and timely delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="relative">
                <Card className="border border-[#1C2333] bg-[#111528] shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.25)] hover:border-[#2DD4BF]/30 transition-all duration-300 h-full text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 flex items-center justify-center mx-auto mb-4 text-[#2DD4BF]">
                      {step.icon}
                    </div>
                    <div className="text-2xl font-bold text-[#2DD4BF] mb-3">{step.step}</div>
                    <h3 className="font-bold text-[#EAEAEA] text-lg mb-3">{step.title}</h3>
                    <p className="text-[#A0AEC0] leading-relaxed text-sm">{step.description}</p>
                  </CardContent>
                </Card>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#2DD4BF]/50 to-[#2DD4BF]/20"></div>
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
              Development Service Packages
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Scalable development solutions for projects of all sizes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <Card key={index} className={`relative border-2 bg-[#111528] shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all duration-300 ${
                pkg.popular 
                  ? 'border-[#2DD4BF] shadow-[0_12px_36px_rgba(45,212,191,0.25)] scale-105' 
                  : 'border-[#1C2333] hover:border-[#2DD4BF]/30 hover:shadow-[0_12px_36px_rgba(45,212,191,0.15)]'
              }`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-[#2DD4BF] text-[#0A0E2A] font-bold px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-[#EAEAEA] mb-2">
                    {pkg.name}
                  </CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-[#2DD4BF]">{pkg.price}</span>
                    <span className="text-[#A0AEC0] ml-2">/{pkg.period}</span>
                  </div>
                  <CardDescription className="text-[#A0AEC0]">
                    {pkg.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {pkg.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#2DD4BF] flex-shrink-0" />
                      <span className="text-[#EAEAEA]">{feature}</span>
                    </div>
                  ))}
                  
                  <div className="pt-6">
                    <Button 
                      className={`w-full font-semibold ${
                        pkg.popular
                          ? 'bg-[#2DD4BF] hover:bg-[#5EEAD4] text-[#0A0E2A] shadow-[0_8px_24px_rgba(45,212,191,0.25)]'
                          : 'bg-[#111528] border-2 border-[#2DD4BF]/50 text-[#2DD4BF] hover:bg-[#2DD4BF]/10 hover:border-[#2DD4BF]'
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
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(45,212,191,0.15), transparent 50%),
                                radial-gradient(circle at 75% 75%, rgba(255,120,73,0.15), transparent 50%)`,
            }}
          />
        </div>
        
        <div className="container mx-auto max-w-7xl px-6 text-center relative z-10">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#EAEAEA] mb-6 drop-shadow-[0_4px_20px_rgba(234,234,234,0.2)]">
            Ready to Build Your Application?
          </h2>
          <p className="text-xl text-[#A0AEC0] mb-8 max-w-2xl mx-auto">
            Let's turn your ideas into powerful, scalable applications. Start your development journey today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#2DD4BF] to-[#5EEAD4] hover:from-[#5EEAD4] hover:to-[#7DD3FC] text-[#0A0E2A] font-bold text-xl px-12 py-4 shadow-[0_12px_32px_rgba(45,212,191,0.3)] hover:shadow-[0_20px_48px_rgba(45,212,191,0.4)] border-0 transition-all duration-300 transform hover:scale-105"
            >
              Start Development Project
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="text-xl px-12 py-4 border-2 border-[#FF7849]/50 text-[#FF7849] hover:bg-[#FF7849]/10 hover:border-[#FF7849] hover:text-[#FF8B61] font-bold bg-transparent"
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
