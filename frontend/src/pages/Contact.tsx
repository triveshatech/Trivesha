import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ContactAnimatedBackground from "@/components/ui/contact-animated-background";
import ContactStars from "@/components/ui/contact-stars";
import emailIcon from "@/assets/contact/email.png";
import callIcon from "@/assets/contact/call.png";
import locationIcon from "@/assets/contact/location.png";
import { contactAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function ContactDark() {
  const canonical = typeof window !== "undefined" ? window.location.href : "/contact";
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
    privacyPolicy: false,
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactCards = [
    {
      image: emailIcon,
      title: "Email Us",
      content: "trivesha.tech@gmail.com",
      action: "mailto:trivesha.tech@gmail.com",
      actionText: "Send Email",
    },
    {
      image: callIcon,
      title: "Call Us",
      content: "+91 73309 75148",
      subtitle: "Mon–Fri, 9am–7pm IST",
      action: "tel:+917330975148",
      actionText: "Call Now",
    },
    {
      image: locationIcon,
      title: "Khammam, India",
      content: "Telangana, India",
      subtitle: "Office headquarters",
      action: "https://maps.google.com",
      actionText: "Get Directions",
    },
  ];

  const projectTypes = [
    "Website Development",
    "Mobile App Development",
    "UI/UX Design",
    "Backend Development",
    "Game Development",
    "Website Redesign",
    "Maintenance & Support",
    "Other",
  ];

  const budgetRanges = ["₹10k - ₹25k", "₹25k - ₹50k", "₹50k - ₹1L", "₹1L - ₹3L", "₹3L+", "Let's discuss"];

  const timelineOptions = ["ASAP (Rush job)", "1-2 weeks", "1-2 months", "3-6 months", "6+ months", "Flexible"];

  const faqs = [
    {
      question: "How quickly do you respond to inquiries?",
      answer:
        "We respond to all inquiries within 24 hours, usually much faster. For urgent projects, we're available for immediate calls during business hours.",
    },
    {
      question: "What information do you need to provide a quote?",
      answer:
        "Tell us about your project goals, preferred timeline, and budget range. If you have wireframes, designs, or examples of what you like, that helps us provide a more accurate estimate.",
    },
    {
      question: "Do you work with international clients?",
      answer:
        "Yes! We work with clients worldwide. We're experienced in remote collaboration and have clients across different time zones.",
    },
    {
      question: "Can we schedule a call to discuss the project?",
      answer:
        "Absolutely! After you submit the form, we'll email you with available time slots for a detailed discussion about your project.",
    },
    {
      question: "What's your typical project timeline?",
      answer:
        "Simple websites: 1-3 weeks, Complex web apps: 4-8 weeks, Mobile apps: 6-12 weeks. Timeline depends on project scope and feedback cycles.",
    },
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting || isSubmitted) return;
    
    setIsSubmitting(true);
    
    try {
      // Basic frontend validation
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields (Name, Email, Message)",
          variant: "destructive",
        });
        return;
      }

      if (!formData.privacyPolicy) {
        toast({
          title: "Privacy Policy",
          description: "Please accept the privacy policy to continue",
          variant: "destructive",
        });
        return;
      }

      // Submit form
      const response = await contactAPI.submitForm({
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim() || undefined,
        phone: formData.phone.trim() || undefined,
        projectType: formData.projectType || undefined,
        budget: formData.budget || undefined,
        timeline: formData.timeline || undefined,
        message: formData.message.trim(),
      });

      if (response.data.success) {
        setIsSubmitted(true);
        
        toast({
          title: "Thank you! 🎉",
          description: "Your message has been sent successfully. We'll get back to you within 24 hours!",
        });

        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          projectType: "",
          budget: "",
          timeline: "",
          message: "",
          privacyPolicy: false,
        });

        // Show success message for 5 seconds then allow new submissions
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }
    } catch (error: unknown) {
      console.error('Contact form error:', error);
      
      let errorMessage = "We're experiencing technical difficulties. Please try again later.";
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string; errors?: Array<{ msg: string }> } } };
        if (axiosError.response?.data?.message) {
          errorMessage = axiosError.response.data.message;
        } else if (axiosError.response?.data?.errors) {
          errorMessage = axiosError.response.data.errors.map((err: { msg: string }) => err.msg).join(', ');
        }
      }
      
      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="text-zinc-100 relative">
      <Helmet>
        <title>Contact Us - Trivesha</title>
        <meta
          name="description"
          content="Get in touch with Trivesha. Request a quote, discuss your project, or ask questions. We respond within 24 hours."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {/* Hero Section with Animated Background */}
      <section className="contact-animated-bg relative overflow-hidden min-h-screen flex items-center">
        <ContactAnimatedBackground />
        <ContactStars section="hero" density="medium" />
        <div className="container mx-auto max-w-7xl px-6 py-20 md:py-24 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-heading text-4xl md:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-[0_6px_24px_rgba(255,255,255,0.35)]">
              Let's Build Something Together
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-12 leading-relaxed max-w-3xl mx-auto">
              Have a project in mind? We're here to answer questions, discuss ideas, and start your next launch.
            </p>

            {/* Founders Quote */}
            <div className="flex items-center justify-center mb-8 bg-black/20 backdrop-blur-md rounded-2xl p-6 max-w-lg mx-auto border border-white/20">
                <div className="flex -space-x-3 mr-4">
                  <img
                    src="https://ik.imagekit.io/gopichakradhar/assets/gopi.png"
                    alt="Gopi Chakradhar"
                    className="w-12 h-12 rounded-full border-2 border-white/30 shadow"
                  />
                  <img
                    src="https://ik.imagekit.io/gopichakradhar/assets/shiva.png"
                    alt="Mandapudi Shiva Rama Krishna"
                    className="w-12 h-12 rounded-full border-2 border-white/30 shadow"
                  />
                </div>
              <p className="text-sm text-white font-medium">"We reply in less than 24 hours"</p>
            </div>

            <Button
              size="lg"
              className="bg-white/20 hover:bg-white/30 text-white text-lg px-10 py-4 shadow-[0_10px_40px_rgba(255,255,255,0.25)] backdrop-blur-sm border border-white/30"
              onClick={scrollToForm}
            >
              Request a Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 bg-[#0A0E2A] relative z-10">
        <ContactStars section="general" density="low" />
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {contactCards.map((card, index) => (
              <div key={index} className={`${index === 2 ? "col-span-2 md:col-span-1" : ""}`}>
                <Card className="group border border-white/10 bg-[#111528]/80 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.45)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] transition-all duration-300 rounded-2xl h-full">
                  <CardContent className="p-6 md:p-8 text-center">
                    <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center mx-auto mb-4 md:mb-6">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-20 h-20 md:w-28 md:h-28 object-contain contact-icon drop-shadow-[0_8px_30px_rgba(59,130,246,0.25)]"
                      />
                    </div>

                    <h3 className="font-heading text-lg md:text-xl font-bold text-teal-300 mb-2 md:mb-3">
                      {card.title}
                    </h3>

                    <p className="text-zinc-200 font-medium mb-1 md:mb-2 text-sm md:text-base">{card.content}</p>

                    {card.subtitle && (
                      <p className="text-xs md:text-sm text-zinc-400 mb-3 md:mb-4">{card.subtitle}</p>
                    )}

                    <a
                      href={card.action}
                      className="inline-flex items-center text-blue-300 hover:text-white transition-colors font-medium text-sm md:text-base"
                      target={card.action.startsWith("http") ? "_blank" : "_self"}
                      rel={card.action.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {card.actionText} →
                    </a>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-20 md:py-24 bg-[#0A0E2A] relative z-10">
        <ContactStars section="form" density="medium" />
        <div className="container mx-auto max-w-4xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-teal-300 mb-4">Tell Us About Your Project</h2>
            <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
              Fill out the form below and we'll get back to you with a detailed proposal
            </p>
          </div>

          <div className="bg-[#0F1428] border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] p-8">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-zinc-300 uppercase tracking-wider">
                    Name *
                  </Label>
                  <Input
                    id="name"
                    required
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-12 border-white/15 bg-[#0B0F1F] text-zinc-100 placeholder:text-zinc-500 focus:border-blue-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-zinc-300 uppercase tracking-wider">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12 border-white/15 bg-[#0B0F1F] text-zinc-100 placeholder:text-zinc-500 focus:border-blue-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm font-medium text-zinc-300 uppercase tracking-wider">
                    Company
                  </Label>
                  <Input
                    id="company"
                    placeholder="Your company name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="h-12 border-white/15 bg-[#0B0F1F] text-zinc-100 placeholder:text-zinc-500 focus:border-blue-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-zinc-300 uppercase tracking-wider">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    placeholder="+91 73309 75148"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-12 border-white/15 bg-[#0B0F1F] text-zinc-100 placeholder:text-zinc-500 focus:border-blue-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectType" className="text-sm font-medium text-zinc-300 uppercase tracking-wider">
                  Project Type
                </Label>
                <Select
                  value={formData.projectType}
                  onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                >
                  <SelectTrigger className="h-12 border-white/15 bg-[#0B0F1F] text-zinc-100 focus:border-blue-400">
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0F1428] text-zinc-100 border-white/10">
                    {projectTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-sm font-medium text-zinc-300 uppercase tracking-wider">
                    Budget Range
                  </Label>
                  <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                    <SelectTrigger className="h-12 border-white/15 bg-[#0B0F1F] text-zinc-100 focus:border-blue-400">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0F1428] text-zinc-100 border-white/10">
                      {budgetRanges.map((budget) => (
                        <SelectItem key={budget} value={budget}>
                          {budget}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeline" className="text-sm font-medium text-zinc-300 uppercase tracking-wider">
                    Timeline
                  </Label>
                  <Select
                    value={formData.timeline}
                    onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                  >
                    <SelectTrigger className="h-12 border-white/15 bg-[#0B0F1F] text-zinc-100 focus:border-blue-400">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0F1428] text-zinc-100 border-white/10">
                      {timelineOptions.map((timeline) => (
                        <SelectItem key={timeline} value={timeline}>
                          {timeline}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium text-zinc-300 uppercase tracking-wider">
                  Project Details
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your project, goals, and any specific requirements..."
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="border-white/15 bg-[#0B0F1F] text-zinc-100 placeholder:text-zinc-500 focus:border-blue-400 resize-none"
                />
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="privacy"
                  checked={formData.privacyPolicy}
                  onChange={(e) => setFormData({ ...formData, privacyPolicy: e.target.checked })}
                  className="mt-1 h-4 w-4 accent-blue-400 bg-[#0B0F1F] border-white/20"
                />
                <label htmlFor="privacy" className="text-sm text-zinc-300">
                  I agree to the{" "}
                  <Link to="/privacy" className="text-blue-300 hover:text-white underline">
                    privacy policy
                  </Link>{" "}
                  and consent to being contacted about this inquiry.
                </label>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-14 bg-teal-500 hover:bg-teal-400 text-black text-lg font-semibold shadow-[0_10px_40px_rgba(45,212,191,0.25)] disabled:opacity-60"
                disabled={!formData.name || !formData.email || !formData.privacyPolicy || isSubmitting || isSubmitted}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Message...
                  </>
                ) : isSubmitted ? (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Message Sent Successfully!
                  </>
                ) : (
                  "Send Project Request"
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-24 bg-[#0A0E2A] relative z-10">
        <ContactStars section="general" density="low" />
        <div className="container mx-auto max-w-4xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-teal-300 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-zinc-300">Quick answers to common questions about working with us</p>
          </div>

          <div className="space-y-4">
                {faqs.slice(0, 2).map((faq, index) => (
              <Card
                key={index}
                className="border border-white/10 bg-[#0F1428] hover:border-blue-400/30 hover:bg-[#0F1428]/90 transition-all duration-300"
              >
                <CardContent className="p-0">
                  <button
                    className="w-full p-6 text-left flex items-center justify-between focus:outline-none"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <h3 className="font-semibold text-lg text-teal-300 pr-4">{faq.question}</h3>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-blue-300 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-blue-300 flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-zinc-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
                <div className="text-center pt-6">
                  <Button asChild className="bg-teal-500 hover:bg-teal-400 text-black font-semibold px-8 py-3 rounded-xl">
                    <Link to="/faq">View all FAQ's</Link>
                  </Button>
                </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-gradient-to-br from-[#0A0E2A] via-[#101530] to-[#0F1428] relative overflow-hidden z-10">
        <ContactStars section="general" density="low" />
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(13,148,136,0.15), transparent 50%),
                                radial-gradient(circle at 80% 50%, rgba(59,130,246,0.15), transparent 50%)`,
            }}
          />
        </div>
        
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
                  onClick={scrollToForm}
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
