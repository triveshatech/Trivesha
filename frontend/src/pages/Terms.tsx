import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, FileText, Handshake, CreditCard, Users, Copyright, XCircle, AlertTriangle, Scale, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollToTop from "@/components/ui/scroll-to-top";

export default function Terms() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '/terms';
  const lastUpdated = "January 15, 2025";

  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: FileText,
      content: "By accessing or using Trivesha's website and services, you agree to be bound by these Terms of Service."
    },
    {
      id: "services",
      title: "Services Provided",
      icon: Handshake,
      content: "Trivesha offers:",
      list: [
        "Website design & development (static, dynamic, custom)",
        "UI/UX design (Figma)",
        "Backend maintenance & deployment",
        "Domain purchase & management",
        "Mobile app and simple game development"
      ]
    },
    {
      id: "quotes-payment",
      title: "Quotes & Payment",
      icon: CreditCard,
      content: "Payment and quote terms:",
      list: [
        "All quotes are valid for 14 days unless otherwise stated",
        "Payment terms will be agreed upon in writing before project start",
        "Late payments may incur a delay in delivery"
      ]
    },
    {
      id: "client-responsibilities",
      title: "Client Responsibilities",
      icon: Users,
      content: "You agree to:",
      list: [
        "Provide accurate project information and required assets",
        "Respond to communication in a timely manner",
        "Obtain all necessary rights/permissions for materials you supply"
      ]
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property",
      icon: Copyright,
      content: "Rights and ownership:",
      list: [
        "Final deliverables become your property once full payment is made",
        "Trivesha may display non-confidential work in its portfolio unless otherwise agreed"
      ]
    },
    {
      id: "cancellations",
      title: "Cancellations & Refunds",
      icon: XCircle,
      content: "Cancellation policy:",
      list: [
        "Cancellation before work starts: full refund minus processing fees",
        "Cancellation after work starts: refund based on uncompleted milestones"
      ]
    },
    {
      id: "limitations",
      title: "Limitations of Liability",
      icon: AlertTriangle,
      content: "We are not responsible for:",
      list: [
        "Loss of data, revenue, or business resulting from the use of our services",
        "Downtime or service interruptions caused by third-party providers"
      ]
    },
    {
      id: "governing-law",
      title: "Governing Law",
      icon: Scale,
      content: "These terms are governed by the laws of India, and disputes will be resolved in the courts of Khammam, Telangana."
    },
    {
      id: "contact",
      title: "Contact",
      icon: Mail,
      content: "For questions about these terms:",
      contact: {
        email: "trivesha.tech@gmail.com"
      }
    }
  ];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-black">
      <Helmet>
        <title>Terms of Service - Trivesha</title>
        <meta name="description" content="Terms of Service for Trivesha. Learn about our service agreements, payment terms, and client responsibilities." />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        {/* Background particles */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-3 h-3 bg-teal-400 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-32 w-2 h-2 bg-orange-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-40 left-40 w-4 h-4 bg-teal-300 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="container mx-auto max-w-7xl px-6 py-16 md:py-20 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ArrowRight size={14} />
            <span className="text-gray-400">Legal</span>
            <ArrowRight size={14} />
            <span className="text-white font-medium">Terms of Service</span>
          </nav>

          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 leading-tight bg-gradient-to-r from-teal-400 to-teal-300 text-transparent bg-clip-text">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              Our service agreements and terms of engagement
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

                      {section.contact && (
                        <div className="ml-16 p-6 bg-gradient-to-r from-gray-800/80 to-gray-700/80 rounded-xl border border-gray-600/50">
                          <div className="flex items-center space-x-3">
                            <Mail size={20} className="text-teal-400" />
                            <div>
                              <p className="text-gray-400">Email us at:</p>
                              <a 
                                href={`mailto:${section.contact.email}`}
                                className="text-orange-400 hover:underline font-medium"
                              >
                                {section.contact.email}
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Important Notice */}
              <Card className="mt-8 border-2 border-orange-500/30 shadow-lg bg-gray-800/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <AlertTriangle className="w-8 h-8 text-orange-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-heading text-xl font-bold text-white mb-3">
                        Important Notice
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        These terms constitute a legally binding agreement between you and Trivesha. 
                        By using our services, you acknowledge that you have read, understood, and agree to be bound by these terms.
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        If you do not agree with any part of these terms, please do not use our services. 
                        For any clarifications or custom arrangements, please contact us before engaging our services.
                      </p>
                    </div>
                  </div>
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
            Ready to work with us?
          </h3>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Now that you understand our terms, let's discuss your project and how we can help bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-teal-600 hover:bg-teal-500 text-white text-lg px-8 shadow-lg shadow-teal-500/25"
              onClick={() => window.location.href = '/contact'}
            >
              Start Your Project
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-orange-500/50 text-orange-400 hover:bg-orange-500 hover:text-white text-lg px-8 bg-transparent"
              onClick={() => window.location.href = '/services'}
            >
              View Services
            </Button>
          </div>
        </div>
      </section>
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </main>
  );
}
