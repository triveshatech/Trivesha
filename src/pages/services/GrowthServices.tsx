import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, TrendingUp, BarChart3, Target, Search, Users, Megaphone, Rocket, Globe, Zap, Star, DollarSign } from "lucide-react";

export default function GrowthServices() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '/services/growth';

  const growthServices = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "SEO Optimization",
      description: "Improve search rankings and organic traffic with proven SEO strategies",
      features: ["Keyword research", "On-page optimization", "Technical SEO", "Content strategy"],
      link: "#seo-optimization"
    },
    {
      icon: <Megaphone className="w-8 h-8" />,
      title: "Digital Marketing",
      description: "Comprehensive digital marketing campaigns across multiple channels",
      features: ["Social media marketing", "Email campaigns", "Content marketing", "PPC advertising"],
      link: "#digital-marketing"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics & Insights",
      description: "Data-driven insights to optimize performance and ROI",
      features: ["Google Analytics setup", "Conversion tracking", "Performance reports", "ROI analysis"],
      link: "#analytics-insights"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Social Media Growth",
      description: "Build and engage your audience across social media platforms",
      features: ["Content creation", "Community management", "Influencer partnerships", "Social advertising"],
      link: "#social-media-growth"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Conversion Optimization",
      description: "Optimize your website and funnels for maximum conversions",
      features: ["A/B testing", "Landing page optimization", "User experience analysis", "Funnel optimization"],
      link: "#conversion-optimization"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Growth Strategy",
      description: "Comprehensive growth strategies tailored to your business goals",
      features: ["Market analysis", "Growth planning", "Strategy implementation", "Performance tracking"],
      link: "#growth-strategy"
    }
  ];

  const platforms = [
    { name: "Google", icon: "🔍", color: "text-[#4285F4]", reach: "8.5B+" },
    { name: "Facebook", icon: "📘", color: "text-[#1877F2]", reach: "2.9B+" },
    { name: "Instagram", icon: "📷", color: "text-[#E4405F]", reach: "2B+" },
    { name: "LinkedIn", icon: "💼", color: "text-[#0A66C2]", reach: "900M+" },
    { name: "YouTube", icon: "📺", color: "text-[#FF0000]", reach: "2.7B+" },
    { name: "Twitter", icon: "🐦", color: "text-[#1DA1F2]", reach: "450M+" }
  ];

  const growthTypes = [
    {
      title: "SEO & Content Marketing",
      subtitle: "Organic Growth",
      description: "Build sustainable organic traffic through SEO and content strategies",
      features: ["Keyword Research", "Content Strategy", "Technical SEO", "Link Building"],
      color: "from-[#2DD4BF] to-[#5EEAD4]",
      stats: { traffic: "+250%", rankings: "Top 10", content: "500+" }
    },
    {
      title: "Paid Advertising",
      subtitle: "Immediate Results",
      description: "Drive targeted traffic and conversions with strategic paid campaigns",
      features: ["Google Ads", "Facebook Ads", "LinkedIn Ads", "Retargeting"],
      color: "from-[#FF7849] to-[#FF8B61]",
      stats: { roas: "400%", clicks: "1M+", conversions: "+180%" }
    },
    {
      title: "Social Media Marketing",
      subtitle: "Brand Awareness",
      description: "Build brand presence and engage with your audience on social platforms",
      features: ["Content Creation", "Community Management", "Influencer Marketing", "Social Ads"],
      color: "from-[#9333EA] to-[#A855F7]",
      stats: { followers: "+500%", engagement: "+300%", reach: "10M+" }
    },
    {
      title: "Conversion Optimization",
      subtitle: "Better Performance",
      description: "Optimize your website and funnels to convert more visitors into customers",
      features: ["A/B Testing", "UX Analysis", "Landing Pages", "Funnel Optimization"],
      color: "from-[#10B981] to-[#34D399]",
      stats: { conversion: "+65%", revenue: "+120%", users: "100K+" }
    }
  ];

  const process = [
    {
      step: "01",
      title: "Growth Audit",
      description: "Analyze current performance and identify growth opportunities",
      icon: <BarChart3 className="w-8 h-8" />
    },
    {
      step: "02",
      title: "Strategy Development",
      description: "Create comprehensive growth strategy aligned with business goals",
      icon: <Target className="w-8 h-8" />
    },
    {
      step: "03",
      title: "Campaign Execution",
      description: "Implement growth campaigns across multiple channels",
      icon: <Rocket className="w-8 h-8" />
    },
    {
      step: "04",
      title: "Optimization & Scaling",
      description: "Continuously optimize and scale successful growth initiatives",
      icon: <TrendingUp className="w-8 h-8" />
    }
  ];

  const packages = [
    {
      name: "Growth Starter",
      price: "₹50,000",
      period: "month",
      description: "Essential growth services for small businesses",
      features: [
        "SEO optimization",
        "Social media management",
        "Basic analytics",
        "Monthly reports",
        "Email support",
        "2 campaigns"
      ],
      popular: false
    },
    {
      name: "Growth Accelerator",
      price: "₹1,25,000",
      period: "month",
      description: "Comprehensive growth package for scaling businesses",
      features: [
        "Advanced SEO & content",
        "Multi-channel marketing",
        "Paid advertising",
        "Conversion optimization",
        "Weekly reports",
        "Priority support",
        "5 campaigns"
      ],
      popular: true
    },
    {
      name: "Growth Enterprise",
      price: "₹2,50,000",
      period: "month",
      description: "Full-scale growth solutions for large enterprises",
      features: [
        "Custom growth strategy",
        "Dedicated growth team",
        "Advanced analytics",
        "A/B testing platform",
        "Daily monitoring",
        "24/7 support",
        "Unlimited campaigns"
      ],
      popular: false
    }
  ];

  return (
    <main className="bg-[#0A0E2A] text-[#EAEAEA] min-h-screen">
      <Helmet>
        <title>Growth Services - Trivesha</title>
        <meta name="description" content="Professional growth services including SEO, digital marketing, social media growth, analytics, and conversion optimization. Accelerate your business growth with data-driven strategies." />
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
                Growth Services
              </Badge>
              <h1 className="font-heading text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
                <span className="text-[#EAEAEA] drop-shadow-[0_4px_20px_rgba(234,234,234,0.2)]">
                  Accelerate Business Growth
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2DD4BF] via-[#5EEAD4] to-[#7DD3FC] drop-shadow-[0_4px_20px_rgba(45,212,191,0.4)]">
                  With Data-Driven Strategies
                </span>
              </h1>
              <p className="text-lg md:text-xl text-[#A0AEC0] leading-relaxed max-w-3xl mx-auto">
                Drive sustainable growth through strategic marketing, SEO optimization, and conversion-focused campaigns. 
                Turn your digital presence into a powerful growth engine.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-[#2DD4BF] to-[#5EEAD4] hover:from-[#5EEAD4] hover:to-[#7DD3FC] text-[#0A0E2A] font-semibold text-lg px-8 shadow-[0_8px_24px_rgba(45,212,191,0.25)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.35)] border-0">
                Start Growth Strategy
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-2 border-[#2DD4BF]/50 text-[#2DD4BF] hover:bg-[#2DD4BF]/10 hover:border-[#2DD4BF] hover:text-[#5EEAD4] font-semibold bg-transparent">
                Free Growth Audit
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#2DD4BF] mb-2">250%</div>
                <div className="text-sm text-[#A0AEC0]">Average Traffic Increase</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FF7849] mb-2">400%</div>
                <div className="text-sm text-[#A0AEC0]">Average ROI</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#2DD4BF] mb-2">65%</div>
                <div className="text-sm text-[#A0AEC0]">Conversion Uplift</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#9333EA] mb-2">100+</div>
                <div className="text-sm text-[#A0AEC0]">Growth Campaigns</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Growth Services Grid */}
      <section className="py-24 bg-[#0A0E2A]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#2DD4BF] mb-4 drop-shadow-[0_4px_20px_rgba(45,212,191,0.2)]">
              Our Growth Services
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Comprehensive growth solutions to scale your business effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {growthServices.map((service, index) => (
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

      {/* Platforms Section */}
      <section className="py-24 bg-[#0F1428]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#EAEAEA] mb-4">
              Marketing Platforms We Master
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Leverage the power of leading platforms to reach your target audience
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
            {platforms.map((platform, index) => (
              <Card key={index} className="text-center border border-[#1C2333] bg-[#111528] shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.15)] hover:border-[#2DD4BF]/30 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{platform.icon}</div>
                  <h3 className="font-bold text-[#EAEAEA] mb-1">{platform.name}</h3>
                  <p className="text-sm text-[#A0AEC0]">{platform.reach} users</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Growth Types */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {growthTypes.map((type, index) => (
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
              Our Growth Process
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Data-driven approach to sustainable business growth
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

      {/* Success Metrics */}
      <section className="py-24 bg-[#0F1428]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#EAEAEA] mb-4">
              Proven Growth Results
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Real metrics from our successful growth campaigns
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border border-[#1C2333] bg-[#111528] shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.25)] hover:border-[#2DD4BF]/30 transition-all duration-300">
              <CardContent className="p-8">
                <TrendingUp className="w-12 h-12 text-[#2DD4BF] mx-auto mb-4" />
                <div className="text-4xl font-bold text-[#2DD4BF] mb-2">250%</div>
                <div className="text-[#EAEAEA] font-semibold mb-2">Traffic Growth</div>
                <div className="text-sm text-[#A0AEC0]">Average organic traffic increase</div>
              </CardContent>
            </Card>

            <Card className="text-center border border-[#1C2333] bg-[#111528] shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.25)] hover:border-[#2DD4BF]/30 transition-all duration-300">
              <CardContent className="p-8">
                <DollarSign className="w-12 h-12 text-[#FF7849] mx-auto mb-4" />
                <div className="text-4xl font-bold text-[#FF7849] mb-2">400%</div>
                <div className="text-[#EAEAEA] font-semibold mb-2">ROI Achieved</div>
                <div className="text-sm text-[#A0AEC0]">Return on advertising spend</div>
              </CardContent>
            </Card>

            <Card className="text-center border border-[#1C2333] bg-[#111528] shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.25)] hover:border-[#2DD4BF]/30 transition-all duration-300">
              <CardContent className="p-8">
                <Target className="w-12 h-12 text-[#9333EA] mx-auto mb-4" />
                <div className="text-4xl font-bold text-[#9333EA] mb-2">65%</div>
                <div className="text-[#EAEAEA] font-semibold mb-2">Conversion Rate</div>
                <div className="text-sm text-[#A0AEC0]">Average conversion improvement</div>
              </CardContent>
            </Card>

            <Card className="text-center border border-[#1C2333] bg-[#111528] shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.25)] hover:border-[#2DD4BF]/30 transition-all duration-300">
              <CardContent className="p-8">
                <Star className="w-12 h-12 text-[#10B981] mx-auto mb-4" />
                <div className="text-4xl font-bold text-[#10B981] mb-2">4.9</div>
                <div className="text-[#EAEAEA] font-semibold mb-2">Client Rating</div>
                <div className="text-sm text-[#A0AEC0]">Average client satisfaction</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-[#0A0E2A]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#EAEAEA] mb-4">
              Growth Service Packages
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Choose the growth package that fits your business needs
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
            Ready to Accelerate Your Growth?
          </h2>
          <p className="text-xl text-[#A0AEC0] mb-8 max-w-2xl mx-auto">
            Let's build a comprehensive growth strategy that drives real results. Start your growth journey today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#2DD4BF] to-[#5EEAD4] hover:from-[#5EEAD4] hover:to-[#7DD3FC] text-[#0A0E2A] font-bold text-xl px-12 py-4 shadow-[0_12px_32px_rgba(45,212,191,0.3)] hover:shadow-[0_20px_48px_rgba(45,212,191,0.4)] border-0 transition-all duration-300 transform hover:scale-105"
            >
              Start Growth Strategy
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
