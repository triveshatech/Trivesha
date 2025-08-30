import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, User, Lock, Eye, Globe, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollToTop from "@/components/ui/scroll-to-top";

export default function Privacy() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '/privacy';
  const lastUpdated = "January 15, 2025";

  const sections = [
    {
      id: "introduction",
      title: "Introduction",
      icon: Shield,
      content: "At Trivesha, your privacy matters. This Privacy Policy explains how we collect, use, and protect your personal information when you interact with our website, services, and products."
    },
    {
      id: "information-we-collect",
      title: "Information We Collect", 
      icon: User,
      content: "We may collect the following types of information:",
      list: [
        "Contact details - name, email, phone, company",
        "Project information - details you share about your business needs",
        "Technical data - IP address, browser type, device info",
        "Usage data - pages visited, time spent, click patterns",
        "Payment details (for paid projects) - processed securely by third-party payment providers"
      ]
    },
    {
      id: "how-we-use",
      title: "How We Use Your Information",
      icon: Eye,
      content: "We use your information to:",
      list: [
        "Respond to inquiries and provide quotes",
        "Deliver and maintain our services",
        "Improve our website and offerings",
        "Send service updates, invoices, and important notices",
        "Comply with legal obligations"
      ]
    },
    {
      id: "sharing-information",
      title: "Sharing of Information",
      icon: Globe,
      content: "We do not sell your data. We may share information:",
      list: [
        "With service providers (e.g., hosting, analytics, payment processors)",
        "If required by law or legal process",
        "To protect our rights and prevent fraud"
      ]
    },
    {
      id: "cookies-tracking",
      title: "Cookies & Tracking",
      icon: Eye,
      content: "Our website uses cookies and similar tools to:",
      list: [
        "Remember your preferences",
        "Measure website performance",
        "Provide relevant content"
      ],
      note: "You can disable cookies in your browser, but some features may not work."
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: Lock,
      content: "We take reasonable technical and organizational measures to protect your data from unauthorized access, loss, or misuse."
    },
    {
      id: "your-rights",
      title: "Your Rights",
      icon: User,
      content: "Depending on your location, you may have rights to:",
      list: [
        "Access the data we hold about you",
        "Request correction or deletion",
        "Opt-out of marketing communications"
      ],
      note: "To exercise these rights, email trivesha.tech@gmail.com."
    },
    {
      id: "policy-changes",
      title: "Changes to this Policy",
      icon: Shield,
      content: "We may update this policy from time to time. Updates will be posted on this page with a new \"last updated\" date."
    },
    {
      id: "contact",
      title: "Contact",
      icon: Mail,
      content: "If you have questions, contact us at:",
      contact: {
        company: "Trivesha",
        email: "trivesha.tech@gmail.com",
        location: "Khammam, India"
      }
    }
  ];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-black">
      <Helmet>
        <title>Privacy Policy - Trivesha</title>
        <meta name="description" content="Learn how Trivesha collects, uses, and protects your personal information. Your privacy matters to us." />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Background particles */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-3 h-3 bg-teal-400 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-32 w-2 h-2 bg-orange-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-40 left-40 w-4 h-4 bg-teal-300 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="container mx-auto max-w-7xl px-6 py-16 md:py-20 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
            <Link to="/" className="hover:text-teal-400 transition-colors">Home</Link>
            <ArrowRight size={14} />
            <span className="text-gray-400">Legal</span>
            <ArrowRight size={14} />
            <span className="text-teal-400 font-medium">Privacy Policy</span>
          </nav>

          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-teal-300 text-transparent bg-clip-text mb-4 leading-tight">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              Learn how we collect, use, and protect your personal information
            </p>
            <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/30">
              Last updated: {lastUpdated}
            </Badge>
          </div>
        </div>
      </section>

      <div className="py-16 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <Card className="p-6 shadow-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
                  <h3 className="font-heading text-lg font-bold text-teal-400 mb-4">
                    Quick Navigation
                  </h3>
                  <nav className="space-y-2">
                    {sections.map((section, index) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className="flex items-center space-x-3 w-full text-left px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-teal-500/10 hover:text-teal-400 transition-colors"
                      >
                        <section.icon size={16} />
                        <span>{section.title}</span>
                      </button>
                    ))}
                  </nav>
                </Card>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card className="shadow-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 overflow-hidden">
                <CardContent className="p-0">
                  {sections.map((section, index) => (
                    <div
                      key={section.id}
                      id={section.id}
                      className="p-8 md:p-12 border-b border-gray-700/50 last:border-b-0"
                    >
                      <div className="flex items-start space-x-4 mb-6">
                        <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
                            {section.title}
                          </h2>
                          <p className="text-lg text-gray-300 leading-relaxed mb-4">
                            {section.content}
                          </p>
                        </div>
                      </div>

                      {section.list && (
                        <ul className="space-y-3 mb-6 ml-16">
                          {section.list.map((item, idx) => (
                            <li key={idx} className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-gray-300 leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {section.note && (
                        <div className="ml-16 p-4 bg-teal-500/10 rounded-lg border-l-4 border-teal-500">
                          <p className="text-gray-300 italic">{section.note}</p>
                        </div>
                      )}

                      {section.contact && (
                        <div className="ml-16 p-6 bg-gradient-to-r from-gray-800/80 to-gray-700/80 rounded-xl border border-gray-600/50">
                          <div className="space-y-2">
                            <h4 className="font-semibold text-teal-400 text-lg">{section.contact.company}</h4>
                            <p className="text-gray-300 flex items-center space-x-2">
                              <Mail size={16} />
                              <a 
                                href={`mailto:${section.contact.email}`}
                                className="text-orange-400 hover:underline"
                              >
                                {section.contact.email}
                              </a>
                            </p>
                            <p className="text-gray-400">{section.contact.location}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <section className="py-16 bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white border-t border-gray-800 relative overflow-hidden">
        {/* Background particles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-teal-400/20 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-orange-400/30 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-teal-300/20 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="container mx-auto max-w-7xl px-6 text-center relative z-10">
          <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-teal-300 text-transparent bg-clip-text">
            Have questions about our privacy practices?
          </h3>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            We're here to help. Contact us if you need clarification on any part of this policy.
          </p>
          <Button 
            size="lg" 
            className="bg-teal-600 hover:bg-teal-500 text-white text-lg px-8 shadow-lg shadow-teal-500/25"
            onClick={() => window.location.href = '/contact'}
          >
            Contact Us
          </Button>
        </div>
      </section>
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </main>
  );
}
