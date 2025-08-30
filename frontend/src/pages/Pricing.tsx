// Type for pricing plan
type PricingPlan = {
  _id?: string;
  name: string;
  price: string;
  priceNote?: string;
  description: string;
  features: string[];
  cta?: string;
  note?: string;
  popular?: boolean;
};
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, ChevronDown, ChevronUp, Sparkles, Zap, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { pricingAPI } from "@/lib/api";
import domainIcon from "@/assets/pricing/domain.png";
import sslIcon from "@/assets/pricing/ssl.png";
import securityIcon from "@/assets/pricing/security.png";
import supportIcon from "@/assets/pricing/30day.png";
import heroGif from "@/assets/pricing/hero.gif";

export default function Pricing() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '/pricing';
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'Starter' | 'Growth' | 'Scale'>('Growth');

  // Fetch dynamic pricing plans
  const { data: pricingData, isLoading: plansLoading, error: plansError } = useQuery({
    queryKey: ['pricing-plans'],
    queryFn: () => pricingAPI.getPlans(),
  });

  const dynamicPlans = pricingData?.data?.data?.plans || [];

  // Use dynamic plans only
  const pricingPlans = dynamicPlans;

  // Update activeTab based on available plans
  useEffect(() => {
    if (pricingPlans.length > 0) {
  const popularPlan = pricingPlans.find((plan: PricingPlan) => plan.popular);
      if (popularPlan) {
        setActiveTab(popularPlan.name as 'Starter' | 'Growth' | 'Scale');
      } else {
        setActiveTab(pricingPlans[0].name as 'Starter' | 'Growth' | 'Scale');
      }
    }
  }, [pricingPlans]);

  const comparisonFeatures = [
    {
      category: "Design Features",
      features: [
        { name: "Custom UI/UX Design", starter: true, growth: true, scale: true },
        { name: "Figma Prototypes", starter: false, growth: true, scale: true },
        { name: "Brand Guidelines", starter: false, growth: true, scale: true },
        { name: "Custom Graphics", starter: false, growth: true, scale: true }
      ]
    },
    {
      category: "Development Features",
      features: [
        { name: "Responsive Design", starter: true, growth: true, scale: true },
        { name: "Static Pages", starter: true, growth: true, scale: true },
        { name: "Dynamic Content", starter: false, growth: true, scale: true },
        { name: "Backend Systems", starter: false, growth: true, scale: true },
        { name: "API Integration", starter: false, growth: false, scale: true }
      ]
    },
    {
      category: "Support & Maintenance",
      features: [
        { name: "Post-launch Support", starter: "30 days", growth: "60 days", scale: "90 days" },
        { name: "Content Updates", starter: false, growth: true, scale: true },
        { name: "Technical Support", starter: "Email", growth: "Email + Call", scale: "Priority" },
        { name: "Performance SLA", starter: false, growth: false, scale: true }
      ]
    },
    {
      category: "Hosting & Security",
      features: [
        { name: "Domain Setup", starter: true, growth: true, scale: true },
        { name: "SSL Certificate", starter: true, growth: true, scale: true },
        { name: "Basic Security", starter: true, growth: true, scale: true },
        { name: "Daily Backups", starter: false, growth: true, scale: true },
        { name: "CDN Setup", starter: false, growth: false, scale: true }
      ]
    }
  ];

  const includedFeatures = [
    {
      image: domainIcon,
      title: "Domain Setup Help",
      description: "We'll help you register and configure your perfect domain name"
    },
    {
      image: sslIcon,
      title: "SSL & Security",
      description: "Free SSL certificates and basic security hardening included"
    },
    {
      image: securityIcon,
      title: "Mobile Responsive",
      description: "Every site works perfectly on all devices and screen sizes"
    },
    {
      image: supportIcon,
      title: "30-Day Support",
      description: "Post-launch support to ensure everything runs smoothly"
    }
  ];

  const faqs = [
    {
      question: "Can I upgrade my plan later?",
      answer: "Absolutely! You can upgrade to a higher plan anytime. We'll apply your previous payment towards the new plan and only charge the difference."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 14-day money-back guarantee if you're not satisfied with our initial design concepts. After development begins, refunds are handled case-by-case."
    },
    {
      question: "What's the payment schedule?",
      answer: "We typically work with a 50% upfront payment to start, and 50% upon project completion. For larger projects, we can arrange milestone-based payments."
    },
    {
      question: "Are domains & hosting included?",
      answer: "Domain registration and hosting setup help are included, but the ongoing costs (typically ₹1,000-3,000/year) are separate. We can recommend the best hosting solutions for your needs."
    },
    {
      question: "How long does it take to launch?",
      answer: "Starter plans: 1-2 weeks, Growth plans: 3-6 weeks, Scale plans: 6-12 weeks. Timeline depends on project complexity and your feedback response time."
    },
    {
      question: "What happens after the project is complete?",
      answer: "You get full ownership of your website, source code, and all assets. We also provide documentation and training on how to manage your site."
    }
  ];

  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="w-5 h-5 text-[#2ECC71] mx-auto" />
      ) : (
        <X className="w-5 h-5 text-[#B0B3B8] mx-auto" />
      );
    }
    return <span className="text-sm text-center text-[#E4E6EB] bg-[#007C78]/20 px-2 py-1 rounded-full border border-[#007C78]/30">{value}</span>;
  };

  return (
    <main className="bg-[#0E1117] text-[#E4E6EB]">
      <Helmet>
        <title>Pricing - Trivesha</title>
        <meta name="description" content="Transparent pricing for web design and development. Choose from Starter, Growth, or Scale packages with clear deliverables." />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-600/90 via-blue-500/80 to-cyan-400/70">
        {/* Animated Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-cyan-900/20" />
        
        {/* Dynamic Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(168, 85, 247, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.2) 0%, transparent 50%)
            `
          }} />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-32 h-32 bg-purple-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-blue-400/25 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '3s' }} />
          <div className="absolute bottom-1/3 left-1/6 w-20 h-20 bg-cyan-400/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-purple-300/25 rounded-full blur-lg animate-bounce" style={{ animationDelay: '2s', animationDuration: '4s' }} />
        </div>

        <div className="container mx-auto max-w-7xl px-6 py-20 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            
            {/* Left Side - Content */}
            <div className="space-y-8 text-white">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span className="bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                  Transparent Pricing
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-white via-purple-100 to-cyan-100 bg-clip-text text-transparent">
                    Simple plans.
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-200 via-blue-200 to-cyan-200 bg-clip-text text-transparent">
                    Clear results.
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-purple-100/90 leading-relaxed max-w-2xl">
                  Whether you need a simple static site or a full custom app, we've got a 
                  <span className="font-semibold text-cyan-200"> transparent package</span> for you.
                </p>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-purple-100 font-medium">No Hidden Fees</span>
                </div>
                
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-blue-100 font-medium">Clear Deliverables</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg px-8 py-4 rounded-xl shadow-[0_20px_40px_rgba(168,85,247,0.3)] hover:shadow-[0_25px_50px_rgba(168,85,247,0.4)] transform hover:-translate-y-1 transition-all duration-300 border border-purple-400/20" 
                  asChild
                >
                  <Link to="/contact">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Get Free Quote
                  </Link>
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/40 text-lg px-8 py-4 rounded-xl transition-all duration-300"
                  onClick={() => document.getElementById('comparison')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Compare Plans
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 pt-6 text-sm text-purple-200/80">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>120+ Projects Delivered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <span>6+ Years Experience</span>
                </div>
              </div>
            </div>

            {/* Right Side - Hero Visual */}
            <div className="relative flex items-center justify-center lg:justify-end">
              {/* Main Visual Container */}
              <div className="relative w-full max-w-lg">
                {/* Hero GIF */}
                <div className="relative rounded-xl overflow-hidden">
                  <img 
                    src={heroGif}
                    alt="Pricing visualization with animated 3D gradient spiral representing our transparent and scalable pricing structure"
                    className="w-full h-auto object-cover"
                    style={{ 
                      filter: 'brightness(1.1) contrast(1.1) saturate(1.2)',
                      borderRadius: '12px'
                    }}
                  />
                </div>

                {/* Floating Price Tags */}
                <div className="absolute top-8 left-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 animate-bounce" style={{ animationDuration: '3s' }}>
                  <span className="text-xs font-medium text-cyan-200">Starting</span>
                  <div className="text-lg font-bold text-white">₹8k</div>
                </div>
                
                <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                  <span className="text-xs font-medium text-purple-200">Enterprise</span>
                  <div className="text-lg font-bold text-white">Custom</div>
                </div>

                {/* Orbiting Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-spin" style={{ animationDuration: '8s' }} />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-slate-900 via-gray-900 to-black relative">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
            `
          }} />
        </div>
        
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Choose Your Perfect Plan
            </h2>
            <p className="text-lg text-[#B0B3B8] max-w-2xl mx-auto">
              Transparent pricing with everything you need to succeed online
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plansLoading ? (
              // Loading state
              [...Array(3)].map((_, index) => (
                <Card key={index} className="relative border border-white/5 bg-[#1A1F26] animate-pulse">
                  <CardHeader className="text-center p-8 pb-4">
                    <div className="h-6 bg-gray-700 rounded mb-4"></div>
                    <div className="h-10 bg-gray-700 rounded mb-4"></div>
                    <div className="h-4 bg-gray-700 rounded mb-4"></div>
                    <div className="h-16 bg-gray-700 rounded"></div>
                  </CardHeader>
                  <CardContent className="p-8 pt-4">
                    <div className="space-y-4 mb-8">
                      {[...Array(6)].map((_, idx) => (
                        <div key={idx} className="h-4 bg-gray-700 rounded"></div>
                      ))}
                    </div>
                    <div className="h-12 bg-gray-700 rounded"></div>
                  </CardContent>
                </Card>
              ))
            ) : plansError ? (
              // Error state
              <div className="col-span-full text-center py-12">
                <p className="text-red-400 mb-4">❌ Failed to load pricing plans</p>
                <p className="text-gray-400 text-sm mb-4">Please try refreshing the page</p>
                <Button 
                  onClick={() => window.location.reload()}
                  className="bg-[#007C78] hover:bg-[#006763] text-white"
                >
                  Retry
                </Button>
              </div>
            ) : pricingPlans.length === 0 ? (
              // No plans available
              <div className="col-span-full text-center py-12">
                <p className="text-yellow-400 mb-4">⚠️ No pricing plans available</p>
                <p className="text-gray-400 text-sm">Please contact us for pricing information</p>
              </div>
            ) : null}
            
            {!plansLoading && pricingPlans.map((plan: PricingPlan, index: number) => (
              <Card 
                key={plan._id || plan.name || index}
                className={`pricing-card relative border border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 bg-[#1A1F26] ${
                  plan.popular ? 'lg:scale-105 ring-2 ring-[#FF6B3D] shadow-[0_0_30px_rgba(255,107,61,0.3)]' : ''
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#FF6B3D] hover:bg-[#e55a2b] text-white px-4 py-1 shadow-[0_0_20px_rgba(255,107,61,0.4)]">
                    Most Popular
                  </Badge>
                )}

                <CardHeader className="text-center p-8 pb-4">
                  <CardTitle className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="text-4xl font-bold text-white mb-2" style={{ letterSpacing: '-0.02em' }}>
                    {plan.price}
                  </div>
                  {plan.priceNote && (
                    <p className="text-sm text-[#B0B3B8] mb-4">
                      {plan.priceNote}
                    </p>
                  )}
                  <CardDescription className="text-base leading-relaxed text-[#E4E6EB]">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-8 pt-4">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-[#2ECC71] mt-0.5 flex-shrink-0" />
                        <span className="text-[#E4E6EB]">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    size="lg" 
                    className={`w-full text-lg ${
                      plan.popular 
                        ? 'bg-[#FF6B3D] hover:bg-[#e55a2b] text-white shadow-[0_10px_30px_rgba(255,107,61,0.3)] hover:shadow-[0_15px_40px_rgba(255,107,61,0.4)]' 
                        : 'bg-[#007C78] hover:bg-[#006763] text-white shadow-[0_10px_30px_rgba(0,124,120,0.3)]'
                    }`}
                    asChild
                  >
                    <Link to="/contact">{plan.cta}</Link>
                  </Button>

                  {plan.note && (
                    <p className="text-sm text-[#B0B3B8] text-center mt-4">
                      {plan.note}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section id="comparison" className="py-20 md:py-24 bg-[#121212]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Compare All Features
            </h2>
            <p className="text-lg text-[#B0B3B8]">
              See exactly what's included in each plan
            </p>
          </div>

          {/* Mobile View - Card-based Layout */}
          <div className="lg:hidden">
            {/* Mobile Tab Navigation */}
            <div className="flex bg-[#1A1F26] p-1 rounded-xl mb-6 overflow-hidden border border-white/5">
              {["Starter", "Growth", "Scale"].map((plan) => (
                <button
                  key={plan}
                  onClick={() => setActiveTab(plan as 'Starter' | 'Growth' | 'Scale')}
                  className={`flex-1 py-3 px-4 text-sm font-semibold rounded-lg transition-all ${
                    activeTab === plan
                      ? plan === 'Growth' 
                        ? 'bg-[#FF6B3D] text-white shadow-md shadow-[#FF6B3D]/20' 
                        : 'bg-[#007C78] text-white shadow-md shadow-[#007C78]/20'
                      : 'text-[#B0B3B8] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {plan}
                  {plan === 'Growth' && <span className="ml-1 text-xs">★</span>}
                </button>
              ))}
            </div>

            {/* Active Plan Details */}
            <Card className={`border-2 ${activeTab === "Growth" ? "border-[#FF6B3D]/30 bg-[#FF6B3D]/5" : "border-[#007C78]/30 bg-[#007C78]/5"} bg-[#1A1F26]`}>
              <CardHeader className={`text-center p-4 ${activeTab === "Growth" ? "bg-[#FF6B3D]" : "bg-[#007C78]"} text-white rounded-t-lg`}>
                <CardTitle className="text-xl font-bold">
                  {activeTab} Plan Features
                  {activeTab === "Growth" && (
                    <Badge className="ml-2 bg-white text-[#FF6B3D] text-xs">Most Popular</Badge>
                  )}
                </CardTitle>
                <p className="text-sm opacity-90 mt-1">
                  {activeTab === "Starter" && "₹8k–₹25k • Perfect for small businesses"}
                  {activeTab === "Growth" && "₹25k–₹80k • Best for growing businesses"}
                  {activeTab === "Scale" && "₹80k+ • Enterprise solutions"}
                </p>
              </CardHeader>
              <CardContent className="p-4">
                {comparisonFeatures.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="mb-6 last:mb-0">
                    <h4 className="font-semibold text-white text-sm uppercase tracking-wide mb-3 border-b border-white/10 pb-2 flex items-center">
                      <span className={`w-6 h-6 rounded-full text-white text-xs flex items-center justify-center mr-2 ${
                        activeTab === "Growth" ? "bg-[#FF6B3D]" : "bg-[#007C78]"
                      }`}>
                        {categoryIndex + 1}
                      </span>
                      {category.category}
                    </h4>
                    <div className="space-y-3">
                      {category.features.map((feature, featureIndex) => {
                        const featureValue = activeTab === "Starter" ? feature.starter : 
                                            activeTab === "Growth" ? feature.growth : 
                                            feature.scale;
                        
                        return (
                          <div key={featureIndex} className={`flex items-center justify-between py-2 px-3 rounded-lg ${
                            typeof featureValue === 'boolean' && featureValue ? 'bg-[#2ECC71]/10 border border-[#2ECC71]/20' : 
                            typeof featureValue === 'string' ? 'bg-[#007C78]/10 border border-[#007C78]/20' : 'bg-white/5 border border-white/5'
                          }`}>
                            <span className="text-sm text-[#E4E6EB] flex-1 font-medium">{feature.name}</span>
                            <div className="flex-shrink-0 ml-3">
                              {typeof featureValue === 'boolean' ? (
                                featureValue ? (
                                  <div className="flex items-center text-[#2ECC71]">
                                    <Check className="w-4 h-4 mr-1" />
                                    <span className="text-xs font-medium">Included</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center text-[#B0B3B8]">
                                    <X className="w-4 h-4 mr-1" />
                                    <span className="text-xs">Not included</span>
                                  </div>
                                )
                              ) : (
                                <span className="text-xs font-semibold text-[#007C78] bg-[#007C78]/20 px-2 py-1 rounded-full border border-[#007C78]/30">
                                  {featureValue}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
                
                {/* CTA Button for Active Plan */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <Button 
                    size="lg" 
                    className={`w-full text-lg ${
                      activeTab === "Growth" 
                        ? 'bg-[#FF6B3D] hover:bg-[#e55a2b] text-white shadow-[0_10px_30px_rgba(255,107,61,0.3)]' 
                        : 'bg-[#007C78] hover:bg-[#006763] text-white shadow-[0_10px_30px_rgba(0,124,120,0.3)]'
                    }`}
                    asChild
                  >
                    <Link to="/contact">Choose {activeTab} Plan</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Compare All Plans - Mobile */}
            <div className="mt-8 bg-[#1A1F26] rounded-2xl p-4 border border-white/5">
              <h3 className="font-heading text-lg font-bold text-white mb-4 text-center">
                Quick Compare All Plans
              </h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-[#1E242C] rounded-lg p-3 border border-white/5">
                  <h4 className="font-semibold text-white text-xs mb-2">Starter</h4>
                  <div className="text-xs text-[#B0B3B8] space-y-1">
                    <div className="flex items-center justify-center"><Check className="w-3 h-3 text-[#2ECC71] mr-1" />Responsive</div>
                    <div className="flex items-center justify-center"><Check className="w-3 h-3 text-[#2ECC71] mr-1" />SSL</div>
                    <div className="text-[#007C78] font-medium">30d Support</div>
                  </div>
                </div>
                <div className="bg-[#FF6B3D] text-white rounded-lg p-3 shadow-[0_0_20px_rgba(255,107,61,0.3)]">
                  <h4 className="font-semibold text-xs mb-2">Growth ★</h4>
                  <div className="text-xs space-y-1 opacity-90">
                    <div className="flex items-center justify-center"><Check className="w-3 h-3 mr-1" />Everything +</div>
                    <div className="flex items-center justify-center"><Check className="w-3 h-3 mr-1" />Custom Design</div>
                    <div className="font-medium">60d Support</div>
                  </div>
                </div>
                <div className="bg-[#1E242C] rounded-lg p-3 border border-white/5">
                  <h4 className="font-semibold text-white text-xs mb-2">Scale</h4>
                  <div className="text-xs text-[#B0B3B8] space-y-1">
                    <div className="flex items-center justify-center"><Check className="w-3 h-3 text-[#2ECC71] mr-1" />Everything +</div>
                    <div className="flex items-center justify-center"><Check className="w-3 h-3 text-[#2ECC71] mr-1" />API Integration</div>
                    <div className="text-[#007C78] font-medium">90d Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop View - Table Layout */}
          <div className="hidden lg:block">
            <div className="overflow-x-auto bg-[#1E242C] rounded-2xl shadow-lg border border-white/5">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#007C78] text-white">
                    <th className="text-left p-6 font-semibold sticky left-0 bg-[#007C78] z-10">Features</th>
                    <th className="text-center p-6 font-semibold">Starter</th>
                    <th className="text-center p-6 font-semibold bg-[#FF6B3D]">Growth</th>
                    <th className="text-center p-6 font-semibold">Scale</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((category, categoryIndex) => (
                    <>
                      <tr key={`category-${categoryIndex}`} className="bg-[#1A1F26]">
                        <td colSpan={4} className="p-4 font-semibold text-white text-lg">
                          {category.category}
                        </td>
                      </tr>
                      {category.features.map((feature, featureIndex) => (
                        <tr 
                          key={`feature-${categoryIndex}-${featureIndex}`}
                          className={featureIndex % 2 === 0 ? 'bg-[#1E242C]' : 'bg-[#232830]'}
                        >
                          <td className="p-4 font-medium sticky left-0 bg-inherit z-10 text-[#E4E6EB]">
                            {feature.name}
                          </td>
                          <td className="p-4 text-center">
                            {renderFeatureValue(feature.starter)}
                          </td>
                          <td className="p-4 text-center bg-[#FF6B3D]/5">
                            {renderFeatureValue(feature.growth)}
                          </td>
                          <td className="p-4 text-center">
                            {renderFeatureValue(feature.scale)}
                          </td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Comparison Toggle Alternative */}
          <div className="md:hidden lg:hidden mt-8">
            <div className="bg-[#1A1F26] rounded-2xl p-6 border border-white/5">
              <h3 className="font-heading text-lg font-bold text-white mb-4 text-center">
                Quick Feature Summary
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <h4 className="font-semibold text-white text-sm mb-2">Starter</h4>
                  <div className="text-xs text-[#B0B3B8] space-y-1">
                    <div>✓ Responsive Design</div>
                    <div>✓ SSL & Security</div>
                    <div>✓ 30-day Support</div>
                    <div className="text-[#FF6B3D] font-medium">Basic Features</div>
                  </div>
                </div>
                <div className="border-x border-white/10 px-2">
                  <h4 className="font-semibold text-[#FF6B3D] text-sm mb-2">Growth</h4>
                  <div className="text-xs text-[#B0B3B8] space-y-1">
                    <div>✓ Everything in Starter</div>
                    <div>✓ Custom Design</div>
                    <div>✓ CMS Integration</div>
                    <div className="text-[#FF6B3D] font-medium">Advanced Features</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm mb-2">Scale</h4>
                  <div className="text-xs text-[#B0B3B8] space-y-1">
                    <div>✓ Everything in Growth</div>
                    <div>✓ API Integration</div>
                    <div>✓ 90-day Support</div>
                    <div className="text-[#FF6B3D] font-medium">Enterprise Features</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20 md:py-24 bg-[#0E1117]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              What's Included in All Plans
            </h2>
            <p className="text-lg text-[#B0B3B8]">
              Every project comes with these essential features
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {includedFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-40 h-40 flex items-center justify-center mx-auto mb-6 bg-[#1A1F26] rounded-2xl border border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-32 h-32 object-contain pricing-icon drop-shadow-[0_8px_30px_rgba(13,148,136,0.25)]"
                  />
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#B0B3B8] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Quote CTA */}
      <section className="py-20 bg-gradient-to-br from-[#007C78] via-[#0D9488] to-[#121212] text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,107,61,0.15), transparent 50%),
                                radial-gradient(circle at 80% 50%, rgba(0,124,120,0.15), transparent 50%)`,
            }}
          />
        </div>
        
        <div className="container mx-auto max-w-7xl px-6 text-center relative z-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Need something unique? Let's scope it together.
          </h2>
          <p className="text-lg text-[#B0B3B8] mb-8 max-w-2xl mx-auto">
            Every business is different. If our packages don't fit perfectly, let's create a custom solution just for you.
          </p>
          <Button 
            size="lg" 
            className="bg-[#FF6B3D] hover:bg-[#e55a2b] text-white text-xl px-10 py-4 shadow-[0_15px_50px_rgba(255,107,61,0.25)] hover:shadow-[0_20px_60px_rgba(255,107,61,0.35)]"
            asChild
          >
            <Link to="/contact">Request Custom Quote</Link>
          </Button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-24 bg-[#121212]">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-[#B0B3B8]">
              Everything you need to know about our pricing and process
            </p>
          </div>

          <div className="space-y-6">
            {faqs.slice(0, 2).map((faq, index) => (
              <Card key={index} className="border border-white/10 bg-[#1A1F26] hover:border-[#007C78]/50 hover:bg-[#232830] transition-all duration-300">
                <CardContent className="p-0">
                  <button
                    className="w-full p-6 text-left flex items-center justify-between focus:outline-none"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <h3 className="font-semibold text-lg text-white pr-4">
                      {faq.question}
                    </h3>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-[#007C78] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#007C78] flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-[#B0B3B8] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            <div className="text-center pt-6">
              <Button asChild className="bg-[#007C78] hover:bg-[#006763] text-white font-semibold px-8 py-3 rounded-xl">
                <Link to="/faq">View all FAQ's</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-[#0E1117] border-t border-white/10">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12">
          
            <div className="flex items-center space-x-4">
              <img 
                src="/placeholder.svg" 
                alt="Client testimonial" 
                className="w-12 h-12 rounded-full border-2 border-white/10"
              />
              <div className="text-left">
                <p className="text-sm text-[#B0B3B8] italic">
                  "Excellent value for money. Professional service at fair prices."
                </p>
                <p className="text-xs text-[#007C78] font-medium mt-1">
                  - Verified Client Review
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}