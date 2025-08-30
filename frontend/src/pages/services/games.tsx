import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import gamesImage from "@/assets/services/scene4.png";

const features = [
  { icon: "🎮", title: "Cross-Platform Games", description: "HTML5, iOS, and Android games for maximum reach." },
  { icon: "⚡", title: "Fast Performance", description: "Optimized code for smooth gameplay and quick load times." },
  { icon: "🧩", title: "Custom Mechanics", description: "Unique gameplay tailored to your brand or business goals." },
  { icon: "💰", title: "Monetization", description: "In-app purchases, ads, and reward systems for revenue." },
  { icon: "🌍", title: "Global Leaderboards", description: "Engage users with real-time scores and competitions." },
  { icon: "📈", title: "Analytics & Updates", description: "Track player behavior and push new features easily." }
];

const tools = [
  { name: "Phaser.js", category: "HTML5 Engine", icon: "🕹️" },
  { name: "Unity", category: "Game Engine", icon: "🎲" },
  { name: "Cocos2d", category: "2D Engine", icon: "🧸" },
  { name: "PixiJS", category: "Rendering", icon: "✨" },
  { name: "Firebase", category: "Backend", icon: "🔥" },
  { name: "PlayFab", category: "Leaderboards", icon: "🏆" },
  { name: "AdMob", category: "Monetization", icon: "💵" },
  { name: "App Store/Play Store", category: "Distribution", icon: "📱" }
];

const packages = [
  {
    name: "Casual Game",
    price: "₹40,000",
    description: "Simple games for web or mobile, perfect for engagement",
    features: [
      "1 game mode",
      "Custom branding",
      "Basic analytics",
      "Ad integration",
      "2 weeks delivery"
    ],
    popular: false
  },
  {
    name: "Business Game",
    price: "₹90,000",
    description: "Feature-rich games for marketing or business goals",
    features: [
      "Multiple game modes",
      "Leaderboards",
      "In-app purchases",
      "Advanced analytics",
      "4 weeks delivery"
    ],
    popular: true
  },
  {
    name: "Enterprise Game",
    price: "₹2,00,000",
    description: "Complex games with custom features and backend",
    features: [
      "Custom mechanics",
      "Multiplayer support",
      "Cloud backend",
      "Ongoing updates",
      "6 weeks delivery"
    ],
    popular: false
  }
];

const process = [
  { step: "01", title: "Concept & Ideation", description: "Brainstorm game ideas, mechanics, and business goals." },
  { step: "02", title: "Design & Prototyping", description: "Create wireframes, art, and interactive prototypes." },
  { step: "03", title: "Development & Testing", description: "Build, test, and optimize the game for all platforms." },
  { step: "04", title: "Launch & Support", description: "Publish to stores, monitor analytics, and provide updates." }
];

export default function GameDevelopment() {
  return (
    <main className="bg-[#0A0E2A] text-[#EAEAEA] min-h-screen">
      <SEO
        title="Game Development — Trivesha"
        description="Casual HTML5 and mobile games with engaging gameplay and monetization strategies."
        canonical="/services/games"
        ogImage="/social-images/og-services.png"
      />

      {/* Hero Section */}
  <section className="relative overflow-hidden bg-gradient-to-br from-[#0F1428] to-[#0A0E2A] pt-24 pb-16">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-[#2DD4BF]">Game Development</h1>
              <p className="text-lg mb-8 text-[#A0AEC0]">Casual HTML5 and mobile games with engaging gameplay and monetization strategies for your brand or business.</p>
              <Button asChild className="bg-[#2DD4BF] hover:bg-[#5EEAD4] text-[#0A0E2A] font-semibold px-8 py-4 text-lg">
                <Link to="/contact">Get a free quote</Link>
              </Button>
            </div>
            <div>
              <img src={gamesImage} alt="Game Development" className="rounded-2xl shadow-2xl w-full max-w-md mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#0A0E2A]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#2DD4BF] mb-4 drop-shadow-[0_4px_20px_rgba(45,212,191,0.2)]">
              Why Choose Our Game Development
            </h2>
            <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
              Engaging, scalable, and monetizable games for every platform
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
      <section className="py-24 bg-green-900">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Tools & Platforms We Use
            </h2>
            <p className="text-lg text-green-100 max-w-2xl mx-auto">
              Modern engines and tools for high-quality game development
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {tools.map((tool, i) => (
              <div key={i} className="group bg-green-800/60 rounded-xl p-6 text-center border border-green-700 hover:bg-green-700/40 transition-all duration-300">
                <div className="text-3xl mb-2">{tool.icon}</div>
                <div className="font-semibold text-green-200">{tool.name}</div>
                <div className="text-xs text-green-100 mt-1">{tool.category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-green-950">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-green-300 mb-4 drop-shadow-[0_4px_20px_rgba(34,197,94,0.2)]">
              Our Game Development Process
            </h2>
            <p className="text-lg text-green-100 max-w-2xl mx-auto">
              From idea to launch, a proven approach for fun and success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, i) => (
              <div key={i} className="bg-green-900/60 rounded-2xl p-8 text-center border border-green-700">
                <div className="text-2xl font-bold text-green-200 mb-2">{step.step}</div>
                <h3 className="font-semibold text-lg mb-2 text-green-100">{step.title}</h3>
                <p className="text-green-100 text-base">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-24 bg-green-900">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Game Development Packages
            </h2>
            <p className="text-lg text-green-100 max-w-2xl mx-auto">
              Flexible packages for every business and budget
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, i) => (
              <div key={i} className={`rounded-2xl border-2 p-8 text-center transition-all duration-300 ${pkg.popular ? 'border-green-400 bg-green-800/80 shadow-lg shadow-green-400/10' : 'border-green-700 bg-green-900/60 hover:border-green-400/60'}`}>
                <div className={`font-bold text-xl mb-2 ${pkg.popular ? 'text-green-200' : 'text-green-100'}`}>{pkg.name}</div>
                <div className="text-3xl font-bold text-green-300 mb-4">{pkg.price}</div>
                <div className="text-green-100 mb-4">{pkg.description}</div>
                <ul className="text-green-100 text-left mb-6 space-y-2">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2"><span className="text-green-300">•</span> {f}</li>
                  ))}
                </ul>
                {pkg.popular && <div className="bg-green-400 text-white text-xs px-2 py-1 rounded-full inline-block mb-2">Most Popular</div>}
                <Button asChild className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 text-lg mt-2">
                  <Link to="/contact">Get Started</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-green-900 via-green-800 to-green-950 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-green-200">Ready to build your game?</h2>
            <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">Get a free consultation and let us turn your game idea into a reality for web, iOS, or Android.</p>
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-4 text-lg">
              <Link to="/contact">Get Free Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
