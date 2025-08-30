import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowLeft, ExternalLink, Calendar, Clock, Users, TrendingUp, Shield, Smartphone, Star } from "lucide-react";
import project2 from "@/assets/project/project-2.png";

export default function FinTechApp() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '/portfolio/fintech-app';

  const projectDetails = {
    title: "FinTech Mobile App",
    subtitle: "SecureBank - Revolutionary Banking Experience",
    category: "Mobile App Development",
    client: "SecureBank",
    duration: "6 months",
    team: "8 professionals",
    budget: "₹15,50,000",
    completionDate: "June 2024",
    platforms: "iOS & Android",
    downloads: "100K+",
    description: "A cutting-edge mobile banking application with biometric authentication, real-time transactions, and comprehensive financial management tools. Built with security-first approach and user-centric design.",
    challenge: "Traditional banking apps were slow, had poor security measures, complex navigation, and lacked modern features. Users were frustrated with lengthy authentication processes and limited functionality for financial management.",
    solution: "We developed a secure, fast, and intuitive mobile banking app with biometric authentication, real-time notifications, comprehensive financial analytics, and seamless user experience across all devices."
  };

  const keyResults = [
    {
      metric: "100K+",
      description: "Active daily users",
      icon: <Users className="w-6 h-6" />
    },
    {
      metric: "4.8★",
      description: "App store rating",
      icon: <Star className="w-6 h-6" />
    },
    {
      metric: "99.9%",
      description: "Security uptime",
      icon: <Shield className="w-6 h-6" />
    },
    {
      metric: "2.1s",
      description: "Average load time",
      icon: <Clock className="w-6 h-6" />
    }
  ];

  const technologies = [
    { name: "React Native", category: "Framework", color: "text-[#61DAFB]" },
    { name: "TypeScript", category: "Language", color: "text-[#3178C6]" },
    { name: "Node.js", category: "Backend", color: "text-[#339933]" },
    { name: "MongoDB", category: "Database", color: "text-[#47A248]" },
    { name: "JWT", category: "Security", color: "text-[#000000]" },
    { name: "Firebase", category: "Services", color: "text-[#FFCA28]" },
    { name: "Stripe", category: "Payment", color: "text-[#635BFF]" },
    { name: "AWS", category: "Cloud", color: "text-[#FF9900]" }
  ];

  const securityFeatures = [
    {
      title: "Biometric Authentication",
      description: "Fingerprint and Face ID support for secure access",
      icon: <Shield className="w-8 h-8" />
    },
    {
      title: "End-to-End Encryption",
      description: "All data encrypted with 256-bit encryption",
      icon: <Shield className="w-8 h-8" />
    },
    {
      title: "Real-time Fraud Detection",
      description: "AI-powered monitoring for suspicious activities",
      icon: <Shield className="w-8 h-8" />
    },
    {
      title: "Secure PIN Management",
      description: "Dynamic PIN generation and secure storage",
      icon: <Shield className="w-8 h-8" />
    }
  ];

  const features = [
    "Biometric login (Face ID, Fingerprint)",
    "Real-time transaction notifications",
    "Account balance and transaction history",
    "Money transfer between accounts",
    "Bill payment and scheduling",
    "Investment portfolio tracking",
    "Credit score monitoring",
    "Expense categorization and analytics",
    "ATM and branch locator",
    "Customer support chat",
    "Document scanner for checks",
    "Budgeting and savings goals"
  ];

  const userJourney = [
    {
      step: "Onboarding",
      description: "Streamlined account setup with document verification",
      time: "< 5 minutes"
    },
    {
      step: "Authentication",
      description: "Secure biometric login or PIN authentication",
      time: "< 2 seconds"
    },
    {
      step: "Dashboard",
      description: "Comprehensive overview of accounts and recent activity",
      time: "Instant load"
    },
    {
      step: "Transactions",
      description: "Quick money transfers with confirmation",
      time: "< 30 seconds"
    }
  ];

  const testimonial = {
    text: "This app has revolutionized our customer experience. The security features are top-notch, and users love how intuitive and fast everything is. Our customer satisfaction scores have increased dramatically.",
    author: "Rajesh Kumar",
    position: "CTO, SecureBank",
    avatar: "/placeholder.svg"
  };

  return (
    <main className="bg-[#0A0E2A] text-[#EAEAEA] min-h-screen">
      <Helmet>
        <title>FinTech Mobile App - Portfolio - Trivesha</title>
        <meta name="description" content="Secure banking mobile app for SecureBank with 100K+ daily users, biometric authentication, and 4.8-star rating. View the complete development case study." />
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
          <div className="mb-8">
            <Button asChild variant="outline" className="border-2 border-[#2DD4BF]/50 text-[#2DD4BF] hover:bg-[#2DD4BF]/10 hover:border-[#2DD4BF] hover:text-[#5EEAD4] font-semibold bg-transparent">
              <Link to="/portfolio">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Portfolio
              </Link>
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="text-[#2DD4BF] bg-[#2DD4BF]/10 border border-[#2DD4BF]/20">
                  {projectDetails.category}
                </Badge>
                <h1 className="font-heading text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
                  <span className="text-[#EAEAEA] drop-shadow-[0_4px_20px_rgba(234,234,234,0.2)]">
                    {projectDetails.title}
                  </span>
                </h1>
                <p className="text-xl text-[#2DD4BF] font-semibold">
                  {projectDetails.subtitle}
                </p>
                <p className="text-lg md:text-xl text-[#A0AEC0] leading-relaxed">
                  {projectDetails.description}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Button size="lg" className="bg-gradient-to-r from-[#2DD4BF] to-[#5EEAD4] hover:from-[#5EEAD4] hover:to-[#7DD3FC] text-[#0A0E2A] font-semibold text-lg px-8 shadow-[0_8px_24px_rgba(45,212,191,0.25)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.35)] border-0">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Download App
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 border-2 border-[#FF7849]/50 text-[#FF7849] hover:bg-[#FF7849]/10 hover:border-[#FF7849] hover:text-[#FF8B61] font-semibold bg-transparent">
                  Start Similar Project
                </Button>
              </div>

              {/* Project Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                <div>
                  <div className="flex items-center mb-2">
                    <Calendar className="w-4 h-4 text-[#2DD4BF] mr-2" />
                    <span className="text-sm text-[#A0AEC0]">Duration</span>
                  </div>
                  <div className="font-semibold text-[#EAEAEA]">{projectDetails.duration}</div>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <Users className="w-4 h-4 text-[#2DD4BF] mr-2" />
                    <span className="text-sm text-[#A0AEC0]">Team</span>
                  </div>
                  <div className="font-semibold text-[#EAEAEA]">{projectDetails.team}</div>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <Smartphone className="w-4 h-4 text-[#2DD4BF] mr-2" />
                    <span className="text-sm text-[#A0AEC0]">Platforms</span>
                  </div>
                  <div className="font-semibold text-[#EAEAEA]">{projectDetails.platforms}</div>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <TrendingUp className="w-4 h-4 text-[#2DD4BF] mr-2" />
                    <span className="text-sm text-[#A0AEC0]">Downloads</span>
                  </div>
                  <div className="font-semibold text-[#EAEAEA]">{projectDetails.downloads}</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-[#1C2333]">
                <img 
                  src={project2} 
                  alt={projectDetails.title}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E2A]/60 to-transparent"></div>
              </div>
              
              {/* Floating metrics */}
              <div className="absolute -bottom-6 -left-6 bg-[#111528] rounded-xl p-4 shadow-[0_8px_24px_rgba(0,0,0,0.4)] border border-[#1C2333]">
                <div className="text-2xl font-bold text-[#2DD4BF] mb-1">4.8★</div>
                <div className="text-sm text-[#A0AEC0]">App Store Rating</div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-[#111528] rounded-xl p-4 shadow-[0_8px_24px_rgba(0,0,0,0.4)] border border-[#1C2333]">
                <div className="text-2xl font-bold text-[#FF7849] mb-1">100K+</div>
                <div className="text-sm text-[#A0AEC0]">Daily Users</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Results */}
      <section className="py-24 bg-[#0A0E2A]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#2DD4BF] mb-4 drop-shadow-[0_4px_20px_rgba(45,212,191,0.2)]">
              App Performance Metrics
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Outstanding results that showcase the app's success and user adoption
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyResults.map((result, index) => (
              <Card key={index} className="text-center border border-[#1C2333] bg-[#111528] shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.25)] hover:border-[#2DD4BF]/30 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 flex items-center justify-center mx-auto mb-4 text-[#2DD4BF]">
                    {result.icon}
                  </div>
                  <div className="text-4xl font-bold text-[#2DD4BF] mb-2">{result.metric}</div>
                  <div className="text-[#A0AEC0] leading-relaxed">{result.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-24 bg-[#0F1428]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#EAEAEA] mb-4">
              Security-First Approach
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Bank-grade security features protecting user data and transactions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityFeatures.map((feature, index) => (
              <Card key={index} className="text-center border border-[#1C2333] bg-[#111528] shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.25)] hover:border-[#2DD4BF]/30 transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 rounded-full bg-[#FF7849]/10 border border-[#FF7849]/20 flex items-center justify-center mx-auto mb-4 text-[#FF7849]">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg font-bold text-[#EAEAEA]">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#A0AEC0] text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* User Journey */}
      <section className="py-24 bg-[#0A0E2A]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#2DD4BF] mb-4 drop-shadow-[0_4px_20px_rgba(45,212,191,0.2)]">
              Seamless User Journey
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Optimized flow from onboarding to daily banking activities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {userJourney.map((step, index) => (
              <div key={index} className="relative">
                <Card className="border border-[#1C2333] bg-[#111528] shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.25)] hover:border-[#2DD4BF]/30 transition-all duration-300 h-full text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-[#2DD4BF] text-[#0A0E2A] font-bold text-xl flex items-center justify-center mx-auto mb-4">
                      {index + 1}
                    </div>
                    <h3 className="font-bold text-[#EAEAEA] text-lg mb-3">{step.step}</h3>
                    <p className="text-[#A0AEC0] leading-relaxed text-sm mb-3">{step.description}</p>
                    <Badge variant="secondary" className="text-[#2DD4BF] bg-[#2DD4BF]/10 border border-[#2DD4BF]/20">
                      {step.time}
                    </Badge>
                  </CardContent>
                </Card>
                {index < userJourney.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#2DD4BF]/50 to-[#2DD4BF]/20"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Used */}
      <section className="py-24 bg-[#0F1428]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#EAEAEA] mb-4">
              Technologies Used
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Modern mobile development stack for optimal performance
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <Card key={index} className="text-center border border-[#1C2333] bg-[#111528] shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.15)] hover:border-[#2DD4BF]/30 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <h3 className={`font-bold text-lg mb-1 ${tech.color}`}>{tech.name}</h3>
                  <p className="text-sm text-[#A0AEC0]">{tech.category}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-24 bg-[#0A0E2A]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#2DD4BF] mb-4 drop-shadow-[0_4px_20px_rgba(45,212,191,0.2)]">
              Complete Feature Set
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Comprehensive banking functionality for all user needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center p-4 bg-[#111528] rounded-lg border border-[#1C2333] hover:border-[#2DD4BF]/30 transition-all duration-300">
                <CheckCircle className="w-6 h-6 text-[#2DD4BF] mr-4 flex-shrink-0" />
                <span className="text-[#EAEAEA] font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-24 bg-[#0F1428]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <Card className="border border-[#1C2333] bg-[#111528] shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[#FF7849]/10 border border-[#FF7849]/20 flex items-center justify-center mb-4">
                  <div className="w-6 h-6 rounded-full bg-[#FF7849]"></div>
                </div>
                <CardTitle className="text-2xl font-bold text-[#EAEAEA]">The Challenge</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#A0AEC0] leading-relaxed text-lg">
                  {projectDetails.challenge}
                </p>
              </CardContent>
            </Card>

            <Card className="border border-[#1C2333] bg-[#111528] shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-[#2DD4BF]" />
                </div>
                <CardTitle className="text-2xl font-bold text-[#EAEAEA]">Our Solution</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#A0AEC0] leading-relaxed text-lg">
                  {projectDetails.solution}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Client Testimonial */}
      <section className="py-24 bg-[#0A0E2A]">
        <div className="container mx-auto max-w-7xl px-6">
          <Card className="border border-[#1C2333] bg-[#111528] shadow-[0_8px_24px_rgba(0,0,0,0.35)] max-w-4xl mx-auto">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-[#2DD4BF]/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="text-4xl text-[#2DD4BF]">"</span>
              </div>
              <blockquote className="text-xl md:text-2xl text-[#EAEAEA] mb-8 leading-relaxed font-medium">
                "{testimonial.text}"
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#2DD4BF]/30"
                />
                <div className="text-left">
                  <div className="font-bold text-lg text-[#EAEAEA]">{testimonial.author}</div>
                  <div className="text-[#A0AEC0]">{testimonial.position}</div>
                </div>
              </div>
            </CardContent>
          </Card>
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
            Ready to Build Your Mobile App?
          </h2>
          <p className="text-xl text-[#A0AEC0] mb-8 max-w-2xl mx-auto">
            Let's create a secure, user-friendly mobile app that your customers will love.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#2DD4BF] to-[#5EEAD4] hover:from-[#5EEAD4] hover:to-[#7DD3FC] text-[#0A0E2A] font-bold text-xl px-12 py-4 shadow-[0_12px_32px_rgba(45,212,191,0.3)] hover:shadow-[0_20px_48px_rgba(45,212,191,0.4)] border-0 transition-all duration-300 transform hover:scale-105"
            >
              Start Your Mobile App
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
