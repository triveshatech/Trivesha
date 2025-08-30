import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Code, Database, Globe, Zap, Shield, TrendingUp } from "lucide-react";

export default function WebDevelopment() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '/services/web-development';

  const technologies = [
    { name: "React", category: "Frontend", icon: "⚛️" },
    { name: "Next.js", category: "Framework", icon: "🔺" },
    { name: "TypeScript", category: "Language", icon: "📘" },
    { name: "Node.js", category: "Backend", icon: "🟢" },
    { name: "MongoDB", category: "Database", icon: "🍃" },
    { name: "PostgreSQL", category: "Database", icon: "🐘" },
    { name: "AWS", category: "Cloud", icon: "☁️" },
    { name: "Docker", category: "DevOps", icon: "🐳" }
  ];

  const features = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Responsive Design",
      description: "Mobile-first approach ensuring your website looks perfect on all devices"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Optimized performance with 95+ Google PageSpeed scores"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with SSL, HTTPS, and regular backups"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Scalable Architecture",
      description: "Built to grow with your business using modern tech stacks"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "SEO Optimized",
      description: "Search engine friendly with structured data and meta optimization"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Clean Code",
      description: "Well-documented, maintainable code following industry best practices"
    }
  ];

  const packages = [
    {
      name: "Starter",
      price: "₹25,000",
      period: "one-time",
      description: "Perfect for small businesses and personal websites",
      features: [
        "5-8 pages",
        "Responsive design",
        "Contact form",
        "Basic SEO",
        "3 months support",
        "Free domain setup"
      ],
      popular: false
    },
    {
      name: "Business",
      price: "₹55,000",
      period: "one-time",
      description: "Ideal for growing businesses with advanced features",
      features: [
        "10-15 pages",
        "Advanced animations",
        "CMS integration",
        "E-commerce ready",
        "6 months support",
        "Performance optimization",
        "Analytics setup"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "₹1,25,000",
      period: "one-time",
      description: "Custom solutions for large organizations",
      features: [
        "Unlimited pages",
        "Custom features",
        "API integrations",
        "Advanced security",
        "12 months support",
        "Priority support",
        "Custom training"
      ],
      popular: false
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Planning",
      description: "We analyze your requirements, target audience, and create a detailed project roadmap with wireframes and technical specifications."
    },
    {
      step: "02", 
      title: "Design & Prototyping",
      description: "Our designers create stunning mockups and interactive prototypes that align with your brand identity and user experience goals."
    },
    {
      step: "03",
      title: "Development & Testing",
      description: "Clean, scalable code development followed by rigorous testing across devices, browsers, and performance benchmarks."
    },
    {
      step: "04",
      title: "Launch & Optimization",
      description: "Smooth deployment to production with ongoing monitoring, optimization, and support to ensure peak performance."
    }
  ];

  return (
    <main className="bg-[#0A0E2A] text-[#EAEAEA] min-h-screen">
      <Helmet>
        <title>Web Development Services - Trivesha</title>
        <meta name="description" content="Professional web development services using React, Next.js, and modern technologies. Custom websites that drive business growth." />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F1428] to-[#0A0E2A] pt-24 pb-16">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="text-[#2DD4BF] bg-[#2DD4BF]/10 border border-[#2DD4BF]/20">
                  Web Development
                </Badge>
                <h1 className="font-heading text-4xl md:text-5xl xl:text-6xl font-bold text-[#2DD4BF] leading-tight drop-shadow-[0_4px_20px_rgba(45,212,191,0.3)]">
                  Custom Web Development
                </h1>
                <p className="text-lg md:text-xl text-[#A0AEC0] leading-relaxed">
                  Transform your business with modern, responsive websites built using cutting-edge technologies. 
                  From simple landing pages to complex web applications.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-[#2DD4BF] hover:bg-[#5EEAD4] text-[#0A0E2A] font-semibold text-lg px-8 w-full sm:w-auto shadow-[0_8px_24px_rgba(45,212,191,0.25)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.35)] border-0">
                  Get Free Quote
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 border-2 border-[#2DD4BF]/50 text-[#2DD4BF] hover:bg-[#2DD4BF]/10 hover:border-[#2DD4BF] hover:text-[#5EEAD4] w-full sm:w-auto font-semibold bg-transparent">
                  View Portfolio
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#2DD4BF] mb-1">50+</div>
                  <div className="text-sm text-[#A0AEC0]">Websites Built</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FF7849] mb-1">95%</div>
                  <div className="text-sm text-[#A0AEC0]">PageSpeed Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#2DD4BF] mb-1">24/7</div>
                  <div className="text-sm text-[#A0AEC0]">Support</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-[#111528] rounded-lg p-6 shadow-[0_20px_48px_rgba(0,0,0,0.4)] border border-[#1C2333]">
                <div className="mb-4 flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[#FF5F57] rounded-full"></div>
                  <div className="w-3 h-3 bg-[#FFBD2E] rounded-full"></div>
                  <div className="w-3 h-3 bg-[#28CA42] rounded-full"></div>
                </div>
                <div className="bg-[#0F1428] rounded p-4 font-mono text-sm">
                  <div className="text-[#2DD4BF]">const</div>
                  <div className="text-[#EAEAEA] ml-4">website = {"{"}</div>
                  <div className="text-[#FF7849] ml-8">responsive: true,</div>
                  <div className="text-[#FF7849] ml-8">performance: '95+',</div>
                  <div className="text-[#FF7849] ml-8">secure: true,</div>
                  <div className="text-[#FF7849] ml-8">seo: 'optimized'</div>
                  <div className="text-[#EAEAEA] ml-4">{"}"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#0A0E2A]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#2DD4BF] mb-4 drop-shadow-[0_4px_20px_rgba(45,212,191,0.2)]">
              Why Choose Our Web Development
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              We deliver modern, scalable websites that drive business growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group border border-[#1C2333] bg-[#111528] shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.25)] hover:border-[#2DD4BF]/30 transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 flex items-center justify-center mx-auto mb-4 text-[#2DD4BF] group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-[#EAEAEA]">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-[#A0AEC0] leading-relaxed">
                    {feature.description}
                  </CardDescription>
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
              Technologies We Use
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Cutting-edge tech stack for modern, performant websites
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <div key={index} className="group">
                <Card className="text-center border border-[#1C2333] bg-[#111528] shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.15)] hover:border-[#2DD4BF]/30 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="text-3xl mb-3">{tech.icon}</div>
                    <h3 className="font-bold text-[#EAEAEA] mb-1">{tech.name}</h3>
                    <p className="text-sm text-[#A0AEC0]">{tech.category}</p>
                  </CardContent>
                </Card>
              </div>
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
              A proven methodology that ensures quality and on-time delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="relative">
                <Card className="border border-[#1C2333] bg-[#111528] shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.25)] hover:border-[#2DD4BF]/30 transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-[#2DD4BF] mb-4">{step.step}</div>
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
              Web Development Packages
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Choose the perfect package for your business needs
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
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Left Content */}
              <div className="text-center lg:text-left flex-1">
                <h3 className="font-heading text-3xl md:text-4xl font-bold text-teal-300 mb-4 drop-shadow-[0_4px_20px_rgba(13,148,136,0.3)]">
                  Ready to start?
                </h3>
                <p className="text-lg md:text-xl text-zinc-300 mb-6 lg:mb-0 leading-relaxed">
                  Let's discuss your project and make it happen.
                </p>
              </div>

              {/* Right Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* CTA Button */}
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-400 hover:to-teal-300 text-black text-lg font-semibold px-8 py-4 rounded-xl shadow-[0_15px_50px_rgba(45,212,191,0.25)] hover:shadow-[0_20px_60px_rgba(45,212,191,0.35)] transition-all duration-300 hover:-translate-y-1"
                  // onClick={scrollToForm} // You can implement scrollToForm if needed
                >
                  <span className="flex items-center gap-2">
                    Start Your Project
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Button>

                {/* Social Links with Glass Effect */}
                <div className="flex items-center gap-4">
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/trivesha-tech-439635378/"
                    className="group w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 hover:border-blue-400/50 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-blue-500/20 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(59,130,246,0.3)]"
                  >
                    <svg className="w-5 h-5 text-white group-hover:text-blue-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a
                    href="#"
                    className="group w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 hover:border-pink-400/50 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-pink-500/20 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(236,72,153,0.3)]"
                  >
                    <svg className="w-5 h-5 text-white group-hover:text-pink-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C8.396 0 7.929.01 6.684.048 5.443.085 4.601.204 3.875.43c-.789.306-1.459.717-2.126 1.384S.436 3.188.43 3.875C.204 4.601.085 5.443.048 6.684.01 7.929 0 8.396 0 12.017s.01 4.087.048 5.332c.037 1.241.156 2.083.38 2.809.2.522.478.963.923 1.417.444.445.895.723 1.417.923.726.224 1.568.343 2.809.38 1.245.038 1.712.048 5.332.048s4.087-.01 5.332-.048c1.241-.037 2.083-.156 2.809-.38a5.13 5.13 0 0 0 1.417-.923c.445-.444.723-.895.923-1.417.224-.726.343-1.568.38-2.809.038-1.245.048-1.712.048-5.332s-.01-4.087-.048-5.332c-.037-1.241-.156-2.083-.38-2.809a5.13 5.13 0 0 0-.923-1.417A5.13 5.13 0 0 0 19.078.43c-.726-.224-1.568-.343-2.809-.38C15.024.01 14.557.001 12.017.001h0zm-.764 1.969c.329 0 .717.006 1.185.016.468.01.668.013.889.056.223.043.374.096.465.168.117.09.235.235.302.374.072.138.125.289.168.512.043.221.046.421.056.889.01.468.016.856.016 1.185v3.192c0 .329-.006.717-.016 1.185-.01.468-.013.668-.056.889-.043.223-.096.374-.168.465-.09.117-.235.235-.374.302-.138.072-.289.125-.512.168-.221.043-.421.046-.889.056-.468.01-.856.016-1.185.016H8.825c-.329 0-.717-.006-1.185-.016-.468-.01-.668-.013-.889-.056-.223-.043-.374-.096-.465-.168a1.35 1.35 0 0 1-.302-.374 1.35 1.35 0 0 1-.168-.512c-.043-.221-.046-.421-.056-.889-.01-.468-.016-.856-.016-1.185V8.825c0-.329.006-.717.016-1.185.01-.468.013-.668.056-.889.043-.223.096-.374.168-.465.09-.117.235-.235.374-.302.138-.072.289-.125.512-.168.221-.043.421-.046.889-.056.468-.01.856-.016 1.185-.016h3.192zm0 1.838a4.11 4.11 0 1 0 0 8.22 4.11 4.11 0 0 0 0-8.22zm0 1.441a2.669 2.669 0 1 1 0 5.338 2.669 2.669 0 0 1 0-5.338zm5.230-.481a.96.96 0 1 1-1.92 0 .96.96 0 0 1 1.92 0z"/>
                    </svg>
                  </a>

                  {/* GitHub */}
                  <a
                    href="https://github.com/triveshatech"
                    className="group w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 hover:border-gray-400/50 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-gray-500/20 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(156,163,175,0.3)]"
                  >
                    <svg className="w-5 h-5 text-white group-hover:text-gray-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
