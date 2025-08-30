import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import backendImage from "@/assets/services/scene3.png";

const features = [
  { icon: "⚙️", title: "Server Management", description: "Proactive monitoring, updates, and security for your servers." },
  { icon: "🚀", title: "CI/CD Automation", description: "Automated deployments for faster, safer releases." },
  { icon: "🔒", title: "Security & Backups", description: "Daily backups, SSL, and advanced security protocols." },
  { icon: "📈", title: "Performance Tuning", description: "Optimize databases, APIs, and infrastructure for speed." },
  { icon: "☁️", title: "Cloud & DevOps", description: "AWS, DigitalOcean, Docker, and scalable cloud solutions." },
  { icon: "🛠️", title: "Custom Integrations", description: "API, third-party, and workflow automation for your stack." }
];

const tools = [
  { name: "Node.js", category: "Backend", icon: "🟢" },
  { name: "Express.js", category: "API", icon: "🚏" },
  { name: "MongoDB", category: "Database", icon: "🍃" },
  { name: "PostgreSQL", category: "Database", icon: "🐘" },
  { name: "Docker", category: "DevOps", icon: "🐳" },
  { name: "AWS", category: "Cloud", icon: "☁️" },
  { name: "Nginx", category: "Web Server", icon: "🟩" },
  { name: "GitHub Actions", category: "CI/CD", icon: "🤖" }
];

const packages = [
  {
    name: "Basic Maintenance",
    price: "₹8,000/mo",
    description: "For small projects and startups",
    features: [
      "Server monitoring",
      "Weekly updates",
      "Basic backups",
      "Email support"
    ],
    popular: false
  },
  {
    name: "Business Maintenance",
    price: "₹18,000/mo",
    description: "For growing businesses with critical uptime",
    features: [
      "24/7 monitoring",
      "Daily backups",
      "Security audits",
      "Priority support"
    ],
    popular: true
  },
  {
    name: "Enterprise Maintenance",
    price: "₹40,000/mo",
    description: "Custom solutions for large organizations",
    features: [
      "Custom SLAs",
      "DevOps automation",
      "Cloud scaling",
      "Dedicated engineer"
    ],
    popular: false
  }
];

const process = [
  { step: "01", title: "Assessment", description: "Analyze your current infrastructure and needs." },
  { step: "02", title: "Setup & Automation", description: "Configure servers, CI/CD, and security protocols." },
  { step: "03", title: "Optimization", description: "Tune performance, monitor, and automate backups." },
  { step: "04", title: "Ongoing Support", description: "Continuous monitoring, updates, and expert support." }
];

export default function BackendMaintenance() {
  return (
    <main className="bg-[#0A0E2A] text-[#EAEAEA] min-h-screen">
      <SEO
        title="Backend Maintenance & Deployment — Trivesha"
        description="Reliable server management, continuous deployment, and infrastructure optimization services."
        canonical="/services/backend"
        ogImage="/social-images/og-services.png"
      />

      {/* Hero Section */}
  <section className="relative overflow-hidden bg-gradient-to-br from-[#0F1428] to-[#0A0E2A] pt-24 pb-16">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-[#2DD4BF]">Backend Maintenance & Deployment</h1>
              <p className="text-lg mb-8 text-[#A0AEC0]">Reliable server management, continuous deployment, and infrastructure optimization services for your business growth.</p>
              <Button asChild className="bg-[#2DD4BF] hover:bg-[#5EEAD4] text-[#0A0E2A] font-semibold px-8 py-4 text-lg">
                <Link to="/contact">Get a free quote</Link>
              </Button>
            </div>
            <div>
              <img src={backendImage} alt="Backend Maintenance" className="rounded-2xl shadow-2xl w-full max-w-md mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#0A0E2A]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#2DD4BF] mb-4 drop-shadow-[0_4px_20px_rgba(45,212,191,0.2)]">
              Why Choose Our Backend Services
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Secure, scalable, and automated backend solutions for every business
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
      <section className="py-24 bg-purple-900">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Tools & Technologies We Use
            </h2>
            <p className="text-lg text-purple-100 max-w-2xl mx-auto">
              Modern backend, cloud, and DevOps tools for robust solutions
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {tools.map((tool, i) => (
              <div key={i} className="group bg-purple-800/60 rounded-xl p-6 text-center border border-purple-700 hover:bg-purple-700/40 transition-all duration-300">
                <div className="text-3xl mb-2">{tool.icon}</div>
                <div className="font-semibold text-purple-200">{tool.name}</div>
                <div className="text-xs text-purple-100 mt-1">{tool.category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-purple-950">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-purple-300 mb-4 drop-shadow-[0_4px_20px_rgba(168,85,247,0.2)]">
              Our Backend Process
            </h2>
            <p className="text-lg text-purple-100 max-w-2xl mx-auto">
              A proven approach for secure, scalable, and automated systems
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, i) => (
              <div key={i} className="bg-purple-900/60 rounded-2xl p-8 text-center border border-purple-700">
                <div className="text-2xl font-bold text-purple-200 mb-2">{step.step}</div>
                <h3 className="font-semibold text-lg mb-2 text-purple-100">{step.title}</h3>
                <p className="text-purple-100 text-base">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-24 bg-purple-900">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Maintenance Packages
            </h2>
            <p className="text-lg text-purple-100 max-w-2xl mx-auto">
              Choose the right plan for your backend and infrastructure
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, i) => (
              <div key={i} className={`rounded-2xl border-2 p-8 text-center transition-all duration-300 ${pkg.popular ? 'border-purple-400 bg-purple-800/80 shadow-lg shadow-purple-400/10' : 'border-purple-700 bg-purple-900/60 hover:border-purple-400/60'}`}>
                <div className={`font-bold text-xl mb-2 ${pkg.popular ? 'text-purple-200' : 'text-purple-100'}`}>{pkg.name}</div>
                <div className="text-3xl font-bold text-purple-300 mb-4">{pkg.price}</div>
                <div className="text-purple-100 mb-4">{pkg.description}</div>
                <ul className="text-purple-100 text-left mb-6 space-y-2">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2"><span className="text-purple-300">•</span> {f}</li>
                  ))}
                </ul>
                {pkg.popular && <div className="bg-purple-400 text-white text-xs px-2 py-1 rounded-full inline-block mb-2">Most Popular</div>}
                <Button asChild className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 text-lg mt-2">
                  <Link to="/contact">Get Started</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-purple-200">Ready for reliable backend?</h2>
            <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">Get a free consultation and let us handle your server, deployment, and infrastructure needs.</p>
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-8 py-4 text-lg">
              <Link to="/contact">Get Free Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
