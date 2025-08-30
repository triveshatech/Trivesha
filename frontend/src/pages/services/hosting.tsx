import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import hostingImage from "@/assets/services/scene1.png";

const features = [
  {
    icon: "🌐",
    title: "Global Reach",
    description: "Fast, secure hosting with global CDN and 99.9% uptime."
  },
  {
    icon: "🔒",
    title: "SSL & Security",
    description: "Free SSL, DDoS protection, and daily backups for peace of mind."
  },
  {
    icon: "⚡",
    title: "Lightning Fast",
    description: "Optimized servers for high performance and quick load times."
  },
  {
    icon: "🛠️",
    title: "Easy Management",
    description: "Intuitive control panel for domains, DNS, and email setup."
  },
  {
    icon: "📈",
    title: "Scalable Solutions",
    description: "From small sites to enterprise, scale as your business grows."
  },
  {
    icon: "💬",
    title: "24/7 Support",
    description: "Expert support available anytime you need help."
  }
];

const tools = [
  { name: "cPanel", category: "Hosting Panel", icon: "🖥️" },
  { name: "Cloudflare", category: "CDN/Security", icon: "☁️" },
  { name: "AWS", category: "Cloud", icon: "🟧" },
  { name: "Let's Encrypt", category: "SSL", icon: "🔐" },
  { name: "Google Domains", category: "Domain", icon: "🌍" },
  { name: "Mailgun", category: "Email", icon: "✉️" },
  { name: "DigitalOcean", category: "Cloud", icon: "💧" },
  { name: "Namecheap", category: "Domain", icon: "🏷️" }
];

const packages = [
  {
    name: "Starter Hosting",
    price: "₹3,000/yr",
    description: "Perfect for personal sites and small businesses",
    features: [
      "1 website",
      "10GB SSD storage",
      "Free SSL",
      "Daily backups",
      "Basic support"
    ],
    popular: false
  },
  {
    name: "Business Hosting",
    price: "₹7,500/yr",
    description: "For growing businesses with more traffic",
    features: [
      "5 websites",
      "50GB SSD storage",
      "Free SSL & CDN",
      "Priority support",
      "Advanced security"
    ],
    popular: true
  },
  {
    name: "Enterprise Hosting",
    price: "₹18,000/yr",
    description: "Custom solutions for large organizations",
    features: [
      "Unlimited websites",
      "Unlimited storage",
      "Dedicated resources",
      "Custom security",
      "24/7 expert support"
    ],
    popular: false
  }
];

const process = [
  {
    step: "01",
    title: "Consultation",
    description: "Understand your hosting and domain needs, traffic, and growth plans."
  },
  {
    step: "02",
    title: "Setup & Migration",
    description: "Register domains, set up hosting, and migrate your existing sites."
  },
  {
    step: "03",
    title: "Optimization",
    description: "Configure CDN, SSL, and performance settings for best results."
  },
  {
    step: "04",
    title: "Ongoing Support",
    description: "Monitor, backup, and support your site for maximum uptime."
  }
];

export default function HostingManagement() {
  return (
    <main className="bg-[#0A0E2A] text-[#EAEAEA] min-h-screen">
      <SEO
        title="Domain & Hosting Management — Trivesha"
        description="Complete domain registration, DNS management, and hosting solutions for your projects."
        canonical="/services/hosting"
        ogImage="/social-images/og-services.png"
      />

      {/* Hero Section */}
  <section className="relative overflow-hidden bg-gradient-to-br from-[#0F1428] to-[#0A0E2A] pt-24 pb-16">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-[#2DD4BF]">Domain & Hosting Management</h1>
              <p className="text-lg mb-8 text-[#A0AEC0]">Complete domain registration, DNS management, and hosting solutions for your business or personal projects.</p>
              <Button asChild className="bg-[#2DD4BF] hover:bg-[#5EEAD4] text-[#0A0E2A] font-semibold px-8 py-4 text-lg">
                <Link to="/contact">Get a free quote</Link>
              </Button>
            </div>
            <div>
              <img src={hostingImage} alt="Domain & Hosting Management" className="rounded-2xl shadow-2xl w-full max-w-md mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#0A0E2A]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#2DD4BF] mb-4 drop-shadow-[0_4px_20px_rgba(45,212,191,0.2)]">
              Why Choose Our Hosting
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Fast, secure, and scalable hosting for every business size
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="group border border-[#1C2333] bg-[#111528] rounded-2xl p-8 text-center shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.15)] hover:border-[#2DD4BF]/30 transition-all duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-xl mb-2 text-[#EAEAEA]">{feature.title}</h3>
                <p className="text-[#A0AEC0] text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-24 bg-pink-900">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Tools & Platforms We Use
            </h2>
            <p className="text-lg text-pink-100 max-w-2xl mx-auto">
              Industry-leading tools for reliable hosting and domain management
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {tools.map((tool, i) => (
              <div key={i} className="group bg-pink-800/60 rounded-xl p-6 text-center border border-pink-700 hover:bg-pink-700/40 transition-all duration-300">
                <div className="text-3xl mb-2">{tool.icon}</div>
                <div className="font-semibold text-pink-200">{tool.name}</div>
                <div className="text-xs text-pink-100 mt-1">{tool.category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-pink-950">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-pink-300 mb-4 drop-shadow-[0_4px_20px_rgba(236,72,153,0.2)]">
              Our Hosting Process
            </h2>
            <p className="text-lg text-pink-100 max-w-2xl mx-auto">
              A proven approach for seamless setup and ongoing support
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, i) => (
              <div key={i} className="bg-pink-900/60 rounded-2xl p-8 text-center border border-pink-700">
                <div className="text-2xl font-bold text-pink-200 mb-2">{step.step}</div>
                <h3 className="font-semibold text-lg mb-2 text-pink-100">{step.title}</h3>
                <p className="text-pink-100 text-base">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-24 bg-pink-900">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Hosting Packages
            </h2>
            <p className="text-lg text-pink-100 max-w-2xl mx-auto">
              Choose the perfect plan for your website or business
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, i) => (
              <div key={i} className={`rounded-2xl border-2 p-8 text-center transition-all duration-300 ${pkg.popular ? 'border-pink-400 bg-pink-800/80 shadow-lg shadow-pink-400/10' : 'border-pink-700 bg-pink-900/60 hover:border-pink-400/60'}`}>
                <div className={`font-bold text-xl mb-2 ${pkg.popular ? 'text-pink-200' : 'text-pink-100'}`}>{pkg.name}</div>
                <div className="text-3xl font-bold text-pink-300 mb-4">{pkg.price}</div>
                <div className="text-pink-100 mb-4">{pkg.description}</div>
                <ul className="text-pink-100 text-left mb-6 space-y-2">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2"><span className="text-pink-300">•</span> {f}</li>
                  ))}
                </ul>
                {pkg.popular && <div className="bg-pink-400 text-white text-xs px-2 py-1 rounded-full inline-block mb-2">Most Popular</div>}
                <Button asChild className="w-full bg-pink-600 hover:bg-pink-500 text-white font-semibold py-3 text-lg mt-2">
                  <Link to="/contact">Get Started</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-pink-900 via-pink-800 to-pink-950 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-pink-200">Ready to launch your website?</h2>
            <p className="text-lg text-pink-100 mb-8 max-w-2xl mx-auto">Get a free consultation and let us handle your domain, hosting, and website setup from start to finish.</p>
            <Button asChild size="lg" className="bg-pink-600 hover:bg-pink-500 text-white font-semibold px-8 py-4 text-lg">
              <Link to="/contact">Get Free Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
