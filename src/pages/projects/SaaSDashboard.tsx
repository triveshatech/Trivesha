import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowLeft, ExternalLink, Calendar, Clock, Users, TrendingUp, BarChart3, Database, Zap } from "lucide-react";
import project3 from "@/assets/project/project-3.png";

export default function SaaSDashboard() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '/portfolio/saas-dashboard';

  const projectDetails = {
    title: "SaaS Dashboard Development",
    subtitle: "DataFlow Pro - Real-time Analytics Platform",
    category: "Web Development",
    client: "DataFlow Pro",
    duration: "5 months",
    team: "6 professionals",
    budget: "₹12,00,000",
    completionDate: "August 2024",
    dataPoints: "1M+ daily",
    users: "10K+ enterprises",
    description: "A comprehensive real-time analytics dashboard processing millions of data points daily for enterprise clients. Built with scalable architecture and intuitive data visualization.",
    challenge: "Enterprise clients needed a unified dashboard to visualize complex data from multiple sources in real-time. Existing solutions were slow, lacked customization, and couldn't handle large data volumes efficiently.",
    solution: "We developed a high-performance dashboard with real-time data processing, customizable widgets, advanced filtering, and seamless integrations with multiple data sources and APIs."
  };

  const keyResults = [
    {
      metric: "1M+",
      description: "Data points processed daily",
      icon: <Database className="w-6 h-6" />
    },
    {
      metric: "99.9%",
      description: "System uptime",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      metric: "< 2s",
      description: "Dashboard load time",
      icon: <Zap className="w-6 h-6" />
    },
    {
      metric: "85%",
      description: "Faster data insights",
      icon: <BarChart3 className="w-6 h-6" />
    }
  ];

  const technologies = [
    { name: "Next.js", category: "Framework", color: "text-[#000000]" },
    { name: "TypeScript", category: "Language", color: "text-[#3178C6]" },
    { name: "PostgreSQL", category: "Database", color: "text-[#336791]" },
    { name: "AWS", category: "Cloud", color: "text-[#FF9900]" },
    { name: "Redis", category: "Cache", color: "text-[#DC382D]" },
    { name: "Chart.js", category: "Visualization", color: "text-[#FF6384]" },
    { name: "Docker", category: "Container", color: "text-[#2496ED]" },
    { name: "Elasticsearch", category: "Search", color: "text-[#005571]" }
  ];

  const dashboardFeatures = [
    {
      title: "Real-time Data Streaming",
      description: "Live data updates with WebSocket connections",
      icon: <Zap className="w-8 h-8" />
    },
    {
      title: "Custom Widget Builder",
      description: "Drag-and-drop dashboard customization",
      icon: <BarChart3 className="w-8 h-8" />
    },
    {
      title: "Advanced Filtering",
      description: "Complex queries with multiple parameters",
      icon: <Database className="w-8 h-8" />
    },
    {
      title: "Export & Sharing",
      description: "PDF reports and dashboard sharing",
      icon: <TrendingUp className="w-8 h-8" />
    }
  ];

  const features = [
    "Real-time data visualization",
    "Customizable dashboard layouts",
    "Advanced filtering and search",
    "Multi-source data integration",
    "Interactive charts and graphs",
    "Automated report generation",
    "Role-based access control",
    "API integration management",
    "Data export capabilities",
    "Performance monitoring",
    "Collaborative annotations",
    "Mobile responsive design"
  ];

  const performanceMetrics = [
    {
      metric: "Data Processing",
      before: "15 minutes",
      after: "< 30 seconds",
      improvement: "96% faster"
    },
    {
      metric: "Dashboard Load",
      before: "12 seconds",
      after: "< 2 seconds",
      improvement: "83% faster"
    },
    {
      metric: "Concurrent Users",
      before: "500 users",
      after: "10,000+ users",
      improvement: "2000% increase"
    },
    {
      metric: "System Uptime",
      before: "95.5%",
      after: "99.9%",
      improvement: "4.4% increase"
    }
  ];

  const architecture = [
    {
      layer: "Frontend",
      technology: "Next.js + TypeScript",
      description: "Responsive dashboard with real-time updates"
    },
    {
      layer: "API Layer",
      technology: "Node.js + Express",
      description: "RESTful APIs with WebSocket support"
    },
    {
      layer: "Data Processing",
      technology: "Redis + Queue",
      description: "Real-time data processing pipeline"
    },
    {
      layer: "Database",
      technology: "PostgreSQL + Elasticsearch",
      description: "Optimized for analytics and search"
    }
  ];

  const testimonial = {
    text: "This dashboard has transformed how we analyze and present data to our clients. The real-time capabilities and customization options have exceeded our expectations. Our team efficiency has improved dramatically.",
    author: "Sarah Chen",
    position: "VP of Analytics, DataFlow Pro",
    avatar: "/placeholder.svg"
  };

  return (
    <main className="bg-[#0A0E2A] text-[#EAEAEA] min-h-screen">
      <Helmet>
        <title>SaaS Dashboard Development - Portfolio - Trivesha</title>
        <meta name="description" content="Real-time analytics dashboard for DataFlow Pro processing 1M+ data points daily with 99.9% uptime. Complete development case study." />
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
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Live Dashboard
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
                    <Database className="w-4 h-4 text-[#2DD4BF] mr-2" />
                    <span className="text-sm text-[#A0AEC0]">Data Points</span>
                  </div>
                  <div className="font-semibold text-[#EAEAEA]">{projectDetails.dataPoints}</div>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <TrendingUp className="w-4 h-4 text-[#2DD4BF] mr-2" />
                    <span className="text-sm text-[#A0AEC0]">Enterprise Users</span>
                  </div>
                  <div className="font-semibold text-[#EAEAEA]">{projectDetails.users}</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-[#1C2333]">
                <img 
                  src={project3} 
                  alt={projectDetails.title}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E2A]/60 to-transparent"></div>
              </div>
              
              {/* Floating metrics */}
              <div className="absolute -bottom-6 -left-6 bg-[#111528] rounded-xl p-4 shadow-[0_8px_24px_rgba(0,0,0,0.4)] border border-[#1C2333]">
                <div className="text-2xl font-bold text-[#2DD4BF] mb-1">1M+</div>
                <div className="text-sm text-[#A0AEC0]">Daily Data Points</div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-[#111528] rounded-xl p-4 shadow-[0_8px_24px_rgba(0,0,0,0.4)] border border-[#1C2333]">
                <div className="text-2xl font-bold text-[#FF7849] mb-1">99.9%</div>
                <div className="text-sm text-[#A0AEC0]">Uptime</div>
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
              Platform Performance
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Outstanding metrics demonstrating scalability and performance
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

      {/* Performance Comparison */}
      <section className="py-24 bg-[#0F1428]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#EAEAEA] mb-4">
              Performance Improvements
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Dramatic improvements in speed and scalability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {performanceMetrics.map((metric, index) => (
              <Card key={index} className="border border-[#1C2333] bg-[#111528] shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.25)] hover:border-[#2DD4BF]/30 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-[#EAEAEA] mb-4">
                    {metric.metric}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[#A0AEC0]">Before:</span>
                      <span className="text-[#FF7849] font-semibold">{metric.before}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#A0AEC0]">After:</span>
                      <span className="text-[#2DD4BF] font-semibold">{metric.after}</span>
                    </div>
                    <div className="pt-2 border-t border-[#1C2333]">
                      <div className="flex items-center justify-between">
                        <span className="text-[#EAEAEA] font-medium">Improvement:</span>
                        <Badge className="bg-[#2DD4BF] text-[#0A0E2A] font-bold">
                          {metric.improvement}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Features */}
      <section className="py-24 bg-[#0A0E2A]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#2DD4BF] mb-4 drop-shadow-[0_4px_20px_rgba(45,212,191,0.2)]">
              Core Dashboard Features
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Advanced capabilities for enterprise data visualization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dashboardFeatures.map((feature, index) => (
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

      {/* Architecture */}
      <section className="py-24 bg-[#0F1428]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#EAEAEA] mb-4">
              System Architecture
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Scalable architecture designed for high-performance data processing
            </p>
          </div>

          <div className="space-y-6">
            {architecture.map((layer, index) => (
              <Card key={index} className="border border-[#1C2333] bg-[#111528] shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.25)] hover:border-[#2DD4BF]/30 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-3 gap-6 items-center">
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-[#2DD4BF] text-[#0A0E2A] font-bold flex items-center justify-center mr-4">
                          {index + 1}
                        </div>
                        <h3 className="font-bold text-xl text-[#EAEAEA]">{layer.layer}</h3>
                      </div>
                    </div>
                    <div>
                      <Badge variant="secondary" className="text-[#2DD4BF] bg-[#2DD4BF]/10 border border-[#2DD4BF]/20">
                        {layer.technology}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-[#A0AEC0] leading-relaxed">
                        {layer.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Used */}
      <section className="py-24 bg-[#0A0E2A]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#EAEAEA] mb-4">
              Technologies Used
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Modern tech stack optimized for data processing and visualization
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
      <section className="py-24 bg-[#0F1428]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#2DD4BF] mb-4 drop-shadow-[0_4px_20px_rgba(45,212,191,0.2)]">
              Complete Feature Set
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Comprehensive dashboard functionality for enterprise needs
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
      <section className="py-24 bg-[#0A0E2A]">
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
      <section className="py-24 bg-[#0F1428]">
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
            Ready to Build Your Dashboard?
          </h2>
          <p className="text-xl text-[#A0AEC0] mb-8 max-w-2xl mx-auto">
            Let's create a powerful analytics dashboard that processes your data in real-time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#2DD4BF] to-[#5EEAD4] hover:from-[#5EEAD4] hover:to-[#7DD3FC] text-[#0A0E2A] font-bold text-xl px-12 py-4 shadow-[0_12px_32px_rgba(45,212,191,0.3)] hover:shadow-[0_20px_48px_rgba(45,212,191,0.4)] border-0 transition-all duration-300 transform hover:scale-105"
            >
              Start Your Dashboard
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
