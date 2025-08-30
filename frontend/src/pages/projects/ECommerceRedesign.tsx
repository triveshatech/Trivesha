import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowLeft, ExternalLink, Calendar, Clock, Users, TrendingUp, Palette, Code, Zap } from "lucide-react";
import project1 from "@/assets/project/project-1.png";

export default function ECommerceRedesign() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '/portfolio/ecommerce-redesign';

  const projectDetails = {
    title: "E-Commerce Platform Redesign",
    subtitle: "Fashion Forward - Complete UI/UX Transformation",
    category: "Web Design & Development",
    client: "Fashion Forward",
    duration: "4 months",
    team: "5 professionals",
    budget: "₹8,50,000",
    completionDate: "March 2024",
    liveUrl: "https://fashionforward.example.com",
    description: "A comprehensive redesign of a leading fashion retailer's e-commerce platform that transformed user experience and dramatically increased conversion rates. The project involved complete UX research, UI redesign, frontend development, and performance optimization.",
    challenge: "Fashion Forward's existing e-commerce platform had a 68% cart abandonment rate, poor mobile experience, and confusing navigation. Users struggled to find products, the checkout process was lengthy, and the overall design felt outdated compared to competitors.",
    solution: "We conducted extensive user research, redesigned the entire user journey, implemented a modern responsive design system, streamlined the checkout process, and optimized for mobile-first experience with advanced filtering and search capabilities."
  };

  const keyResults = [
    {
      metric: "45%",
      description: "Increase in conversion rate",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      metric: "65%",
      description: "Reduction in cart abandonment",
      icon: <Users className="w-6 h-6" />
    },
    {
      metric: "200%",
      description: "Improvement in mobile sales",
      icon: <Zap className="w-6 h-6" />
    },
    {
      metric: "3.2s",
      description: "Average page load time",
      icon: <Clock className="w-6 h-6" />
    }
  ];

  const technologies = [
    { name: "Figma", category: "Design", color: "text-[#F24E1E]" },
    { name: "React", category: "Frontend", color: "text-[#61DAFB]" },
    { name: "TypeScript", category: "Language", color: "text-[#3178C6]" },
    { name: "Tailwind CSS", category: "Styling", color: "text-[#06B6D4]" },
    { name: "Next.js", category: "Framework", color: "text-[#000000]" },
    { name: "Stripe", category: "Payment", color: "text-[#635BFF]" },
    { name: "Vercel", category: "Hosting", color: "text-[#000000]" },
    { name: "MongoDB", category: "Database", color: "text-[#47A248]" }
  ];

  const timeline = [
    {
      phase: "Research & Discovery",
      duration: "3 weeks",
      description: "User interviews, analytics review, competitor analysis, and stakeholder workshops",
      deliverables: ["User personas", "Journey maps", "Technical audit", "Requirements document"]
    },
    {
      phase: "Design & Prototyping",
      duration: "6 weeks",
      description: "Wireframing, visual design, design system creation, and interactive prototyping",
      deliverables: ["Wireframes", "Design system", "High-fidelity mockups", "Interactive prototype"]
    },
    {
      phase: "Development",
      duration: "8 weeks",
      description: "Frontend development, backend integration, payment gateway setup, and mobile optimization",
      deliverables: ["Responsive website", "Admin dashboard", "Payment integration", "Mobile app"]
    },
    {
      phase: "Testing & Launch",
      duration: "3 weeks",
      description: "Quality assurance, performance testing, user acceptance testing, and deployment",
      deliverables: ["Test reports", "Performance metrics", "Launch plan", "Training materials"]
    }
  ];

  const features = [
    "Advanced product search and filtering",
    "One-click checkout process",
    "Responsive mobile-first design",
    "Real-time inventory management",
    "Personalized product recommendations",
    "Social media integration",
    "Wishlist and comparison features",
    "Multi-payment gateway support",
    "Customer review system",
    "Order tracking and notifications"
  ];

  const testimonial = {
    text: "The redesign exceeded our expectations. The new platform not only looks amazing but has significantly improved our business metrics. Our customers love the new experience, and we've seen a dramatic increase in mobile sales.",
    author: "Priya Sharma",
    position: "CEO, Fashion Forward",
    avatar: "/placeholder.svg"
  };

  return (
    <main className="bg-[#0A0E2A] text-[#EAEAEA] min-h-screen">
      <Helmet>
        <title>E-Commerce Platform Redesign - Portfolio - Trivesha</title>
        <meta name="description" content="Complete e-commerce platform redesign for Fashion Forward that increased conversion rates by 45% and reduced cart abandonment by 65%. View the full case study." />
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
                  View Live Site
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
                    <Clock className="w-4 h-4 text-[#2DD4BF] mr-2" />
                    <span className="text-sm text-[#A0AEC0]">Completed</span>
                  </div>
                  <div className="font-semibold text-[#EAEAEA]">{projectDetails.completionDate}</div>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <TrendingUp className="w-4 h-4 text-[#2DD4BF] mr-2" />
                    <span className="text-sm text-[#A0AEC0]">Budget</span>
                  </div>
                  <div className="font-semibold text-[#EAEAEA]">{projectDetails.budget}</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-[#1C2333]">
                <img 
                  src={project1} 
                  alt={projectDetails.title}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E2A]/60 to-transparent"></div>
              </div>
              
              {/* Floating metrics */}
              <div className="absolute -bottom-6 -left-6 bg-[#111528] rounded-xl p-4 shadow-[0_8px_24px_rgba(0,0,0,0.4)] border border-[#1C2333]">
                <div className="text-2xl font-bold text-[#2DD4BF] mb-1">45%</div>
                <div className="text-sm text-[#A0AEC0]">Conversion Increase</div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-[#111528] rounded-xl p-4 shadow-[0_8px_24px_rgba(0,0,0,0.4)] border border-[#1C2333]">
                <div className="text-2xl font-bold text-[#FF7849] mb-1">200%</div>
                <div className="text-sm text-[#A0AEC0]">Mobile Sales</div>
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
              Key Results Achieved
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Measurable improvements that directly impacted business growth
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

      {/* Technologies Used */}
      <section className="py-24 bg-[#0A0E2A]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#EAEAEA] mb-4">
              Technologies Used
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Modern tech stack for optimal performance and scalability
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

      {/* Project Timeline */}
      <section className="py-24 bg-[#0F1428]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#EAEAEA] mb-4">
              Project Timeline
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Structured approach from research to launch
            </p>
          </div>

          <div className="space-y-8">
            {timeline.map((phase, index) => (
              <Card key={index} className="border border-[#1C2333] bg-[#111528] shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.25)] hover:border-[#2DD4BF]/30 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-3 gap-6 items-start">
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 rounded-full bg-[#2DD4BF] text-[#0A0E2A] font-bold flex items-center justify-center mr-4">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-bold text-xl text-[#EAEAEA]">{phase.phase}</h3>
                          <p className="text-[#2DD4BF] font-semibold">{phase.duration}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-[#A0AEC0] leading-relaxed">
                        {phase.description}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#EAEAEA] mb-3">Deliverables:</h4>
                      <ul className="space-y-2">
                        {phase.deliverables.map((deliverable, deliverableIndex) => (
                          <li key={deliverableIndex} className="flex items-center text-sm text-[#A0AEC0]">
                            <CheckCircle className="w-4 h-4 text-[#2DD4BF] mr-2 flex-shrink-0" />
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Implemented */}
      <section className="py-24 bg-[#0A0E2A]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#2DD4BF] mb-4 drop-shadow-[0_4px_20px_rgba(45,212,191,0.2)]">
              Features Implemented
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Comprehensive functionality for enhanced user experience
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
            Ready for Similar Results?
          </h2>
          <p className="text-xl text-[#A0AEC0] mb-8 max-w-2xl mx-auto">
            Let's discuss how we can transform your e-commerce platform and boost your conversion rates.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#2DD4BF] to-[#5EEAD4] hover:from-[#5EEAD4] hover:to-[#7DD3FC] text-[#0A0E2A] font-bold text-xl px-12 py-4 shadow-[0_12px_32px_rgba(45,212,191,0.3)] hover:shadow-[0_20px_48px_rgba(45,212,191,0.4)] border-0 transition-all duration-300 transform hover:scale-105"
            >
              Start Your Project
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
