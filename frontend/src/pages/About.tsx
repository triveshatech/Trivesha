import { Helmet } from "react-helmet-async";
import SEO from "@/components/SEO";
import { generateOrganizationSchema } from "@/lib/seo";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ScrollToTop from "@/components/ui/scroll-to-top";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import aboutImage from "@/assets/about-1.png";

interface Founder {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
}

export default function About() {
  // Scroll reveal component for founder cards
  const FounderCard = ({ founder, index }: { founder: Founder; index: number }) => {
    const { elementRef, animationClass, isVisible } = useScrollReveal({
      threshold: 0.2,
      delay: index * 160, // tighter stagger
      duration: 600,
    });

    const transitionDelay = `${index * 120 + 120}ms`;

    const style: React.CSSProperties = {
      transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(18px) scale(0.985)',
      opacity: isVisible ? 1 : 0,
      transition: `transform 620ms cubic-bezier(0.2,0.9,0.2,1) ${transitionDelay}, opacity 480ms ease ${transitionDelay}, box-shadow 420ms ease ${transitionDelay}`,
      willChange: 'transform, opacity',
    };

    return (
      <div ref={elementRef} className="will-change-transform" style={style}>
        <Card className="founder-card group cursor-pointer border border-white/10 bg-[#111528]/80 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(45,212,191,0.15)] hover:-translate-y-2 hover:border-teal-400/30 hover:border-b-4 hover:border-b-orange-400 transition-all duration-300 rounded-2xl overflow-hidden">
          <CardContent className="p-8 text-center">
            <div className="relative mb-6">
              <img 
                src={founder.image} 
                alt={founder.name}
                className="w-32 h-32 rounded-full object-cover mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300"
              />
            </div>

            <h3 className="font-heading text-2xl font-bold text-teal-300 mb-1">
              {founder.name}
            </h3>
            <p className="text-orange-400 font-medium mb-4">
              {founder.role}
            </p>
            <p className="text-zinc-300 leading-relaxed mb-6">
              {founder.bio}
            </p>

            <a 
              href={founder.linkedin}
              className="inline-flex items-center space-x-2 text-teal-300 hover:text-orange-400 transition-colors"
            >
              <ExternalLink size={18} />
              <span>Connect on LinkedIn</span>
            </a>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Schema markup for about page
  const aboutSchema = {
    ...generateOrganizationSchema(),
    "foundingDate": "2019",
    "founder": [
      {
        "@type": "Person",
        "name": "Founder Name",
        "jobTitle": "CEO & Founder"
      }
    ],
    "numberOfEmployees": "10-50",
    "knowsAbout": [
      "Web Development",
      "Mobile App Development", 
      "UI/UX Design",
      "Software Consulting"
    ]
  };

  const milestones = [
    {
      year: "2019",
      title: "Founded in Khammam, India",
      description: "Started our journey with a vision to create exceptional digital experiences",
      isHighlight: false
    },
    {
      year: "2020",
      title: "First international client",
      description: "Expanded our reach beyond borders, serving clients globally",
      isHighlight: false
    },
    {
      year: "2022",
      title: "Expanded services",
      description: "Added mobile apps & game development to our expertise",
      isHighlight: true
    },
    {
      year: "2025",
      title: "AI-powered solutions",
      description: "Launched AI-powered project assistant for better client experience",
      isHighlight: true
    }
  ];

  const founders = [
    {
      name: "Gopi Chakradhar",
      role: "",
      bio: "Full-stack developer with expertise in modern web technologies and system architecture.",
  image: "https://ik.imagekit.io/gopichakradhar/assets/gopi.png",
      linkedin: "https://www.linkedin.com/in/gopi-chakradhar/"
    },
    {
      name: "Shiva Rama Krishna",
      role: "",
      bio: "UI/UX designer and strategist passionate about creating user-centered digital experiences.",
  image: "https://ik.imagekit.io/gopichakradhar/assets/shiva.png",
      linkedin: "https://www.linkedin.com/in/mandapudi-shiva-rama-krishna/"
    }
  ];

  const values = [
    {
      icon: "💎",
      title: "Clarity",
      description: "Clear communication and transparent pricing. No hidden costs, no surprises-just honest collaboration from start to finish."
    },
    {
      icon: "🎨",
      title: "Craft",
      description: "Attention to detail in design and code. Every pixel matters, every line of code is purposeful and optimized."
    },
    {
      icon: "🤝",
      title: "Commitment",
      description: "We stay with you post-launch. Your success is our success, and we're here for the long haul."
    },
    {
      icon: "🚀",
      title: "Growth",
      description: "Scalable solutions that grow with your business. We build for today and tomorrow."
    }
  ];

  const miniServices = [
    { icon: "🎨", title: "UI/UX Design", link: "/services#design" },
    { icon: "💻", title: "Web Development", link: "/services#web-dev" },
    { icon: "📱", title: "Mobile Apps", link: "/services#mobile" },
    { icon: "⚙️", title: "DevOps", link: "/services#backend" },
    { icon: "🎮", title: "Game Development", link: "/services#games" },
    { icon: "🌐", title: "Hosting & Domains", link: "/services#hosting" }
  ];

  const testimonials = [
    {
      quote: "Trivesha transformed our digital presence completely. Their attention to detail is remarkable.",
      author: "Priya Sharma",
      role: "CEO, TechStart",
      rating: 5
    },
    {
      quote: "Professional service from concept to launch. They truly understand business needs.",
      author: "Rajesh Kumar", 
      role: "Founder, E-Commerce Plus",
      rating: 5
    },
    {
      quote: "Outstanding work that perfectly captured our brand identity. Highly recommended!",
      author: "Anita Gupta",
      role: "Marketing Director, StartupXYZ", 
      rating: 5
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-sm ${i < rating ? 'text-orange-400' : 'text-zinc-600'}`}>★</span>
    ));
  };

  return (
    <main className="bg-[#0A0E2A] text-zinc-100">
      <SEO
        title="About Us - Trivesha"
        description="Learn about Trivesha's journey, founders, and our mission to deliver exceptional digital solutions since 2019."
        canonical="/about"
        ogImage="/social-images/og-about.png"
        schemaMarkup={aboutSchema}
      />

      {/* Minimal masked reveal animation styles */}
      <style>{`
        @keyframes slideReveal {
          0% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        .animate-slide-reveal {
          animation: slideReveal 900ms cubic-bezier(0.2,0.9,0.2,1) 300ms both;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-slide-reveal { animation: none; display: none; }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A0E2A] via-[#101530] to-[#1C1C1C]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 0 0, rgba(13,148,136,0.25), transparent 40%),
                              radial-gradient(circle at 100% 0, rgba(255,107,53,0.15), transparent 40%),
                              url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20h60M20 40h60M20 60h60M20 80h60' stroke='%235E6A86' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
            backgroundSize: 'auto, auto, 100px 100px'
          }} />
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large floating particles */}
          <div className="absolute top-20 left-1/4 w-4 h-4 bg-teal-400/20 rounded-full animate-pulse" />
          <div className="absolute top-32 right-1/3 w-2 h-2 bg-orange-400/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-48 left-1/2 w-3 h-3 bg-teal-500/15 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-64 right-1/4 w-1 h-1 bg-orange-300/40 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }} />
          
          {/* Medium particles */}
          <div className="absolute bottom-40 left-1/5 w-2 h-2 bg-teal-300/25 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-60 right-2/5 w-3 h-3 bg-orange-400/20 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }} />
          <div className="absolute bottom-32 left-3/4 w-1.5 h-1.5 bg-teal-400/30 rounded-full animate-pulse" style={{ animationDelay: '3s' }} />
          
          {/* Small floating particles */}
          <div className="absolute top-80 left-1/6 w-1 h-1 bg-orange-500/35 rounded-full animate-bounce" style={{ animationDelay: '0.8s' }} />
          <div className="absolute top-96 right-1/6 w-1 h-1 bg-teal-500/25 rounded-full animate-pulse" style={{ animationDelay: '1.2s' }} />
          <div className="absolute bottom-48 left-2/3 w-1 h-1 bg-orange-300/30 rounded-full animate-bounce" style={{ animationDelay: '1.8s' }} />
          
          {/* Moving gradient orbs */}
          <div className="absolute top-16 right-1/5 w-20 h-20 bg-gradient-to-br from-teal-400/10 to-transparent rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.3s' }} />
          <div className="absolute bottom-20 left-1/6 w-32 h-32 bg-gradient-to-br from-orange-400/8 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.8s' }} />
          <div className="absolute top-1/2 right-1/8 w-16 h-16 bg-gradient-to-br from-teal-500/12 to-transparent rounded-full blur-lg animate-pulse" style={{ animationDelay: '2.2s' }} />
        </div>

        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 animate-pulse" style={{
            backgroundImage: `
              linear-gradient(rgba(13,148,136,0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(13,148,136,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }} />
        </div>

        {/* Subtle moving waves */}
        <div className="absolute inset-0 opacity-5 animate-pulse" style={{ animationDelay: '1s' }}>
          <div className="absolute inset-0" style={{
            background: `
              radial-gradient(ellipse 80% 50% at 20% -20%, rgba(13,148,136,0.3), transparent),
              radial-gradient(ellipse 60% 40% at 80% 120%, rgba(255,107,53,0.2), transparent)
            `
          }} />
        </div>
        
        <div className="container mx-auto max-w-7xl px-6 py-20 md:py-28 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-heading text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-teal-300 drop-shadow-[0_6px_24px_rgba(13,148,136,0.35)]">
              About Trivesha
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 mb-12 leading-relaxed">
              Designing and developing digital experiences since 2019.
            </p>
            
            {/* Founders Photo Cluster */}
            <div className="flex items-center justify-center mb-8 bg-white/5 backdrop-blur rounded-2xl p-6 max-w-lg mx-auto border border-white/10">
              <div className="flex -space-x-4">
                <img 
                  src={founders[0].image} 
                  alt={founders[0].name} 
                  className="w-16 h-16 rounded-full border-4 border-white/20 shadow-lg"
                />
                <img 
                  src={founders[1].image} 
                  alt={founders[1].name} 
                  className="w-16 h-16 rounded-full border-4 border-white/20 shadow-lg"
                />
              </div>
              <span className="ml-6 text-lg text-teal-300 font-medium">Founded by {founders[0].name.split(' ')[0]} & {founders[1].name.split(' ')[0]}</span>
            </div>
            
            <Button size="lg" className="bg-teal-500 hover:bg-teal-400 text-black text-lg px-8 py-4 shadow-[0_10px_40px_rgba(45,212,191,0.25)]" asChild>
              <Link to="/contact">Work with us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 md:py-24 bg-[#0A0E2A] relative overflow-hidden">
        {/* Animated Grid Pattern Background */}
        <div className="absolute inset-0 opacity-20">
          <AnimatedGridPattern 
            className="w-full h-full object-cover"
            width={1400}
            height={600}
          />
        </div>
        
        {/* Additional background elements for depth */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(45,212,191,0.15), transparent 50%),
                              radial-gradient(circle at 75% 75%, rgba(255,120,73,0.1), transparent 50%)`
          }} />
        </div>
        
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="text-teal-300 bg-teal-500/10 border-teal-400/20">
                Our Journey
              </Badge>
                  <div className="space-y-6">
                <div className="text-lg leading-relaxed">
                  <div className="relative inline-block">
                    <span className="text-teal-300 font-bold text-3xl md:text-4xl font-heading block relative z-0">Building Digital Dreams</span>
                    {/* overlay slides to right revealing the text underneath (transparent background) */}
                    <span className="absolute inset-0 bg-transparent z-10 pointer-events-none animate-slide-reveal" aria-hidden="true" />
                  </div>
                  <br /><br />
                  Founded in 2019 in Khammam, India, Trivesha began with a simple mission: to bridge the gap between innovative ideas and exceptional digital execution. What started as a small team of passionate developers has grown into a <span className="text-teal-300 font-semibold">trusted partner</span> for <span className="text-teal-300 font-semibold">businesses worldwide</span>.<br /><br />
                  We specialize in creating <span className="text-orange-300 font-semibold">digital experiences</span> that not only look <span className="text-orange-300 font-semibold">beautiful</span> but also drive real business results. From startups to established enterprises, we've helped our clients transform their digital presence and achieve their goals.<br /><br />
                  Today, we continue to push boundaries with <span className="text-purple-300 font-semibold">cutting-edge technologies</span> while maintaining our core values of clarity, craft, and commitment.
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src={aboutImage} 
                alt="Trivesha team at work"
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-orange-500 to-orange-400 text-black p-6 rounded-xl shadow-[0_15px_50px_rgba(255,107,53,0.4)]">
                <div className="text-3xl font-bold">6+</div>
                <div className="text-sm font-medium">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#0F1428] to-[#111528] relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(13,148,136,0.15), transparent 50%),
                              radial-gradient(circle at 75% 75%, rgba(255,107,53,0.1), transparent 50%)`
          }} />
        </div>

        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-teal-300 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
              Key milestones that shaped our growth
            </p>
          </div>

          {/* Compact Timeline - All Screens */}
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative h-full">
                  {/* Timeline connector line for desktop */}
                  {index < milestones.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-8 h-0.5 bg-gradient-to-r from-teal-400/50 to-transparent z-0" />
                  )}
                  
                  <div className="group cursor-pointer relative z-10 h-full flex flex-col">
                    {/* Year badge with glow */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                      milestone.isHighlight 
                        ? 'bg-gradient-to-br from-orange-500 to-orange-600 shadow-[0_0_20px_rgba(255,107,53,0.4)]' 
                        : 'bg-gradient-to-br from-teal-500 to-teal-600 shadow-[0_0_20px_rgba(45,212,191,0.4)]'
                    } group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-black font-bold text-sm">
                        {milestone.year}
                      </span>
                    </div>
                    
                    {/* Content card with fixed height */}
                    <div className="bg-gradient-to-br from-[#111528]/90 to-[#0A0E2A]/90 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_20px_50px_rgba(45,212,191,0.1)] group-hover:border-teal-400/30 group-hover:-translate-y-1 transition-all duration-300 flex-1 flex flex-col min-h-[200px]">
                      <h3 className="text-lg font-bold text-zinc-100 mb-3 group-hover:text-teal-300 transition-colors">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed flex-1">
                        {milestone.description}
                      </p>
                      
                      {/* Bottom accent line */}
                      <div className={`mt-4 w-12 h-1 rounded-full bg-gradient-to-r ${
                        milestone.isHighlight 
                          ? 'from-orange-400 to-orange-300' 
                          : 'from-teal-400 to-teal-300'
                      } group-hover:w-16 transition-all duration-300`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 md:py-24 bg-[#0A0E2A]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-teal-300 mb-4">
              Meet Our Founders
            </h2>
            <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
              The visionaries behind Trivesha's success story
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {founders.map((founder, index) => (
              <FounderCard key={index} founder={founder} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-24 bg-[#0F1428]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-teal-300 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => (
              <Card key={index} className="value-card group cursor-pointer border border-white/10 bg-[#111528]/80 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(45,212,191,0.15)] hover:border-teal-400/30 transition-all duration-300">
                <CardContent className="p-6 md:p-8 text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:bg-orange-500/10 transition-colors">
                    <span className="text-2xl md:text-3xl">{value.icon}</span>
                  </div>
                  <h3 className="font-heading text-lg md:text-xl font-bold text-teal-300 mb-3 md:mb-4">
                    {value.title}
                  </h3>
                  <p className="text-zinc-300 leading-relaxed text-sm md:text-base">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 md:py-24 bg-[#0A0E2A]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-teal-300 mb-4">
              What We Do
            </h2>
            <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
              A quick overview of our core services
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-12">
            {miniServices.map((service, index) => (
              <a 
                key={index}
                href={service.link}
                className="mini-service-card group bg-[#111528]/80 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6 text-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(45,212,191,0.15)] hover:-translate-y-1 hover:border-teal-400/30 transition-all duration-300"
              >
                <div className="text-2xl md:text-3xl mb-2 md:mb-3 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="font-medium text-zinc-100 text-xs md:text-sm leading-tight">
                  {service.title}
                </h3>
              </a>
            ))}
          </div>

          <div className="text-center">
            <Button asChild variant="outline" size="lg" className="border-teal-400 text-teal-300 hover:bg-teal-500 hover:text-black text-lg px-8 bg-transparent">
              <Link to="/services">See full services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-24 bg-[#0F1428]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-teal-300 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
              Trusted by businesses across India and beyond
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="testimonial-card group relative bg-gradient-to-br from-[#111528] to-[#0A0E2A] border border-white/10 hover:border-teal-400/40 backdrop-blur-sm shadow-[0_10px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_25px_60px_rgba(45,212,191,0.15)] transition-all duration-300 hover:-translate-y-2 rounded-2xl overflow-hidden"
              >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <CardContent className="relative p-8">
                  {/* Quote icon */}
                  <div className="absolute top-6 right-6 text-4xl text-teal-400/20 group-hover:text-teal-400/40 transition-colors duration-300">
                    "
                  </div>
                  
                  {/* Stars */}
                  <div className="flex mb-6 space-x-1">
                    {renderStars(testimonial.rating)}
                  </div>
                  
                  {/* Quote */}
                  <blockquote className="text-zinc-100 mb-8 text-lg leading-relaxed font-medium relative">
                    <span className="text-teal-300/60 text-2xl absolute -left-2 -top-2">"</span>
                    <span className="relative z-10">{testimonial.quote}</span>
                    <span className="text-teal-300/60 text-2xl absolute -bottom-4 right-0">"</span>
                  </blockquote>
                  
                  {/* Author info */}
                  <div className="flex items-center space-x-4 pt-4 border-t border-white/10">
                    {/* Avatar placeholder */}
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-black font-bold text-lg shadow-lg">
                      {testimonial.author.charAt(0)}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-bold text-teal-300 text-lg mb-1">
                        {testimonial.author}
                      </h4>
                    </div>
                    
                    {/* Company badge */}
                    <div className="hidden sm:block">
                      <div className="w-2 h-2 bg-orange-400 rounded-full group-hover:bg-orange-300 transition-colors duration-300" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 bg-gradient-to-br from-[#0A0E2A] via-[#101530] to-[#0F1428] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(13,148,136,0.15), transparent 50%),
                              radial-gradient(circle at 80% 50%, rgba(255,107,53,0.15), transparent 50%)`
          }} />
        </div>
        
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
            <div className="text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-teal-300 mb-4 drop-shadow-[0_4px_20px_rgba(13,148,136,0.3)]">
                Ready to start your project?
              </h2>
              <p className="text-lg md:text-xl text-zinc-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Let's discuss your ideas and transform them into exceptional digital experiences.
              </p>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-400 hover:to-teal-300 text-black text-lg font-semibold px-8 py-4 rounded-xl shadow-[0_15px_50px_rgba(45,212,191,0.25)] hover:shadow-[0_20px_60px_rgba(45,212,191,0.35)] transition-all duration-300 hover:-translate-y-1"
                asChild
              >
                <Link to="/contact">Request a free quote</Link>
              </Button>
              
             
            </div>
          </div>
        </div>
      </section>
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </main>
  );
}