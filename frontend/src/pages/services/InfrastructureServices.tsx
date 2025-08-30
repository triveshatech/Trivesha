import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Cloud, Server, Database, Shield, Monitor, Zap, Globe, Layers, Settings, Lock, TrendingUp } from "lucide-react";

export default function InfrastructureServices() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '/services/infrastructure';

  const infrastructureServices = [
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Cloud Infrastructure",
      description: "Scalable cloud solutions on AWS, Azure, and Google Cloud",
      features: ["Auto-scaling", "Load balancing", "Multi-region deployment", "Cost optimization"],
      link: "#cloud-infrastructure"
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: "Server Management",
      description: "Complete server setup, configuration, and maintenance",
      features: ["Linux/Windows servers", "Performance monitoring", "Security hardening", "Backup solutions"],
      link: "#server-management"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Database Solutions",
      description: "Database design, optimization, and management services",
      features: ["SQL & NoSQL databases", "Performance tuning", "Data migration", "Backup & recovery"],
      link: "#database-solutions"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Security & Compliance",
      description: "Comprehensive security measures and compliance frameworks",
      features: ["SSL/TLS certificates", "Firewall configuration", "Security audits", "GDPR compliance"],
      link: "#security-compliance"
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Monitoring & Analytics",
      description: "Real-time monitoring and performance analytics",
      features: ["24/7 monitoring", "Performance metrics", "Error tracking", "Alert systems"],
      link: "#monitoring-analytics"
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "DevOps & CI/CD",
      description: "Automated deployment pipelines and DevOps practices",
      features: ["CI/CD pipelines", "Container orchestration", "Infrastructure as code", "Automated testing"],
      link: "#devops-cicd"
    }
  ];

  const cloudProviders = [
    { name: "AWS", logo: "☁️", color: "text-[#FF9900]", services: "200+" },
    { name: "Azure", logo: "⚡", color: "text-[#0078D4]", services: "100+" },
    { name: "Google Cloud", logo: "🌩️", color: "text-[#4285F4]", services: "150+" },
    { name: "DigitalOcean", logo: "🌊", color: "text-[#0080FF]", services: "50+" },
    { name: "Cloudflare", logo: "🔥", color: "text-[#F38020]", services: "30+" },
    { name: "Vercel", logo: "▲", color: "text-[#000000]", services: "20+" }
  ];

  const infrastructureTypes = [
    {
      title: "Cloud Infrastructure",
      subtitle: "Scalable & Reliable",
      description: "Modern cloud infrastructure that scales with your business needs",
      features: ["Auto-scaling", "Global CDN", "Load Balancing", "99.9% Uptime"],
      color: "from-[#2DD4BF] to-[#5EEAD4]",
      stats: { uptime: "99.9%", servers: "500+", regions: "12+" }
    },
    {
      title: "Security Framework",
      subtitle: "Enterprise-Grade Security",
      description: "Comprehensive security measures to protect your digital assets",
      features: ["SSL/TLS Encryption", "DDoS Protection", "Security Audits", "Compliance Ready"],
      color: "from-[#FF7849] to-[#FF8B61]",
      stats: { threats: "99.8%", audits: "100+", compliance: "5+" }
    },
    {
      title: "Database Management",
      subtitle: "Optimized Performance",
      description: "High-performance database solutions with automated backups",
      features: ["Database Optimization", "Automated Backups", "Real-time Replication", "Performance Monitoring"],
      color: "from-[#9333EA] to-[#A855F7]",
      stats: { databases: "200+", queries: "1B+", backup: "99.9%" }
    },
    {
      title: "DevOps Solutions",
      subtitle: "Automated Workflows",
      description: "Streamlined development and deployment processes",
      features: ["CI/CD Pipelines", "Container Management", "Infrastructure as Code", "Automated Testing"],
      color: "from-[#10B981] to-[#34D399]",
      stats: { deployments: "1000+", pipelines: "50+", automation: "95%" }
    }
  ];

  const process = [
    {
      step: "01",
      title: "Infrastructure Assessment",
      description: "Analyze current infrastructure and identify optimization opportunities",
      icon: <Monitor className="w-8 h-8" />
    },
    {
      step: "02",
      title: "Architecture Design",
      description: "Design scalable and secure infrastructure architecture",
      icon: <Layers className="w-8 h-8" />
    },
    {
      step: "03",
      title: "Implementation & Migration",
      description: "Deploy infrastructure with minimal downtime and seamless migration",
      icon: <Settings className="w-8 h-8" />
    },
    {
      step: "04",
      title: "Monitoring & Optimization",
      description: "Continuous monitoring and performance optimization",
      icon: <TrendingUp className="w-8 h-8" />
    }
  ];

  const packages = [
    {
      name: "Startup Infrastructure",
      price: "₹25,000",
      period: "month",
      description: "Essential infrastructure for growing startups",
      features: [
        "Cloud server setup",
        "Basic monitoring",
        "SSL certificate",
        "Daily backups",
        "Email support",
        "99.5% uptime SLA"
      ],
      popular: false
    },
    {
      name: "Business Infrastructure",
      price: "₹75,000",
      period: "month",
      description: "Complete infrastructure for established businesses",
      features: [
        "Multi-server setup",
        "Advanced monitoring",
        "Security hardening",
        "Automated backups",
        "Load balancing",
        "24/7 support",
        "99.9% uptime SLA"
      ],
      popular: true
    },
    {
      name: "Enterprise Infrastructure",
      price: "₹1,50,000",
      period: "month",
      description: "Enterprise-grade infrastructure with custom solutions",
      features: [
        "Custom architecture",
        "Multi-region deployment",
        "Advanced security",
        "Dedicated support team",
        "Compliance framework",
        "99.99% uptime SLA"
      ],
      popular: false
    }
  ];

  return (
    <main className="bg-[#0A0E2A] text-[#EAEAEA] min-h-screen">
      <Helmet>
        <title>Infrastructure Services - Trivesha</title>
        <meta name="description" content="Professional infrastructure services including cloud solutions, server management, database optimization, security, and DevOps. Build reliable, scalable infrastructure." />
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
                Infrastructure Services
              </Badge>
              <h1 className="font-heading text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
                <span className="text-[#EAEAEA] drop-shadow-[0_4px_20px_rgba(234,234,234,0.2)]">
                  Scalable Cloud Infrastructure
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2DD4BF] via-[#5EEAD4] to-[#7DD3FC] drop-shadow-[0_4px_20px_rgba(45,212,191,0.4)]">
                  Built for Performance
                </span>
              </h1>
              <p className="text-lg md:text-xl text-[#A0AEC0] leading-relaxed max-w-3xl mx-auto">
                Enterprise-grade infrastructure solutions that provide reliability, security, and scalability. 
                From cloud deployment to ongoing maintenance, we've got you covered.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-[#2DD4BF] to-[#5EEAD4] hover:from-[#5EEAD4] hover:to-[#7DD3FC] text-[#0A0E2A] font-semibold text-lg px-8 shadow-[0_8px_24px_rgba(45,212,191,0.25)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.35)] border-0">
                Setup Infrastructure
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-2 border-[#2DD4BF]/50 text-[#2DD4BF] hover:bg-[#2DD4BF]/10 hover:border-[#2DD4BF] hover:text-[#5EEAD4] font-semibold bg-transparent">
                Infrastructure Audit
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#2DD4BF] mb-2">99.9%</div>
                <div className="text-sm text-[#A0AEC0]">Uptime Achieved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FF7849] mb-2">500+</div>
                <div className="text-sm text-[#A0AEC0]">Servers Managed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#2DD4BF] mb-2">12</div>
                <div className="text-sm text-[#A0AEC0]">Global Regions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#9333EA] mb-2">24/7</div>
                <div className="text-sm text-[#A0AEC0]">Monitoring</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure Services Grid */}
      <section className="py-24 bg-[#0A0E2A]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#2DD4BF] mb-4 drop-shadow-[0_4px_20px_rgba(45,212,191,0.2)]">
              Our Infrastructure Services
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Comprehensive infrastructure solutions for modern businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {infrastructureServices.map((service, index) => (
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
                  <Button variant="outline" className="w-full border-2 border-[#2DD4BF]/50 text-[#2DD4BF] hover:bg-[#2DD4BF]/10 hover:border-[#2DD4BF] font-semibold bg-transparent">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cloud Providers Section */}
      <section className="py-24 bg-[#0F1428]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#EAEAEA] mb-4">
              Trusted Cloud Providers
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              We work with leading cloud providers to deliver reliable infrastructure
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
            {cloudProviders.map((provider, index) => (
              <Card key={index} className="text-center border border-[#1C2333] bg-[#111528] shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.15)] hover:border-[#2DD4BF]/30 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{provider.logo}</div>
                  <h3 className="font-bold text-[#EAEAEA] mb-1">{provider.name}</h3>
                  <p className="text-sm text-[#A0AEC0]">{provider.services} services</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Infrastructure Types */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {infrastructureTypes.map((type, index) => (
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
              Our Infrastructure Process
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Systematic approach to building and maintaining robust infrastructure
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
              Infrastructure Service Plans
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Scalable infrastructure plans that grow with your business
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
            Ready to Scale Your Infrastructure?
          </h2>
          <p className="text-xl text-[#A0AEC0] mb-8 max-w-2xl mx-auto">
            Let's build a robust, scalable infrastructure that supports your business growth. Get started today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#2DD4BF] to-[#5EEAD4] hover:from-[#5EEAD4] hover:to-[#7DD3FC] text-[#0A0E2A] font-bold text-xl px-12 py-4 shadow-[0_12px_32px_rgba(45,212,191,0.3)] hover:shadow-[0_20px_48px_rgba(45,212,191,0.4)] border-0 transition-all duration-300 transform hover:scale-105"
            >
              Setup Infrastructure
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
