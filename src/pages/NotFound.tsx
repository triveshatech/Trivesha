import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Zap, Search } from "lucide-react";

export default function NotFound() {
  const popularPages = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: "Portfolio", url: "/portfolio" },
    { name: "About", url: "/about" },
    { name: "Contact", url: "/contact" }
  ];

  return (
    <>
      <SEO
        title="404 - Page Not Found | Trivesha"
        description="The page you're looking for doesn't exist. Return to Trivesha homepage to explore our digital solutions."
        canonical="/404"
        ogImage="/social-images/og-home.png"
        noindex={true}
      />

      {/* Full Screen 404 Page with GIF Background */}
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
        style={{
          backgroundImage: "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')"
        }}
      >
        {/* Dark overlays for theme consistency and text readability */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 via-transparent to-gray-900/60" />
        
        {/* Large 404 text overlay */}
        <h1 className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-black text-white/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none leading-none tracking-wider">
          404
        </h1>

        {/* Enhanced floating particles with more movement */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Primary floating elements */}
          <div className="absolute top-20 left-1/4 w-4 h-4 bg-cyan-400/30 rounded-full animate-bounce" style={{ animationDuration: '2s' }} />
          <div className="absolute top-32 right-1/3 w-2 h-2 bg-orange-400/40 rounded-full animate-ping" style={{ animationDelay: '0.5s', animationDuration: '3s' }} />
          <div className="absolute top-48 left-1/2 w-3 h-3 bg-cyan-500/25 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-40 left-1/5 w-2 h-2 bg-orange-300/35 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '1.5s' }} />
          <div className="absolute bottom-60 right-2/5 w-3 h-3 bg-cyan-400/30 rounded-full animate-ping" style={{ animationDelay: '2.5s' }} />
          
          {/* Moving tech elements */}
          <div className="absolute top-16 left-1/6 w-6 h-6 border border-cyan-400/20 rounded-full animate-spin" style={{ animationDuration: '6s' }} />
          <div className="absolute bottom-32 right-1/6 w-8 h-8 border border-orange-400/25 rotate-45 animate-pulse" style={{ animationDelay: '1.5s' }} />
          
          {/* Animated paths/lines */}
          <div className="absolute top-1/4 left-0 w-20 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }} />
          <div className="absolute bottom-1/4 right-0 w-16 h-0.5 bg-gradient-to-l from-transparent via-orange-400/30 to-transparent animate-pulse" style={{ animationDelay: '3s', animationDuration: '3s' }} />
          
          {/* Additional geometric shapes */}
          <div className="absolute top-1/3 right-1/6 w-4 h-4 bg-cyan-400/15 rotate-45 animate-spin" style={{ animationDuration: '10s' }} />
          <div className="absolute bottom-1/3 left-1/6 w-5 h-5 border-2 border-orange-400/20 rounded-full animate-ping" style={{ animationDelay: '2s', animationDuration: '4s' }} />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(13,148,136,0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(13,148,136,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Main content container */}
        <div className="min-h-screen flex items-center justify-center relative z-10">
          <div className="container mx-auto max-w-4xl px-6 text-center">
            {/* Content section without card container */}
            <div className="relative">
              {/* Main Message with subtle float animation */}
              <div className="animate-pulse mb-8" style={{ animationDuration: '6s' }}>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                  Look like you're lost
                </h2>
                
                <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-md mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  The page you are looking for is not available!
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-black font-bold text-lg px-8 py-4 rounded-xl shadow-[0_15px_40px_rgba(45,212,191,0.25)] hover:shadow-[0_20px_50px_rgba(45,212,191,0.35)] transition-all duration-300 hover:-translate-y-1"
                  asChild
                >
                  <Link to="/">
                    <Home className="w-5 h-5 mr-2" />
                    Go to Home
                  </Link>
                </Button>

                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-gray-300 text-gray-100 hover:bg-white/10 hover:border-gray-200 hover:text-white bg-black/30 backdrop-blur-sm text-lg px-8 py-4 rounded-xl"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Go Back
                </Button>
              </div>

              {/* Popular Pages Section */}
              <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-center gap-2">
                  <Search className="w-6 h-6 text-cyan-400" />
                  Popular Pages
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {popularPages.map((page, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10 border border-gray-600/50 hover:border-cyan-400/50 transition-all duration-300"
                      asChild
                    >
                      <Link to={page.url}>{page.name}</Link>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lightning bolt animation */}
        <div className="absolute top-1/3 left-1/4 opacity-10">
          <Zap className="w-8 h-8 text-yellow-400 animate-bounce" style={{ animationDelay: '1s' }} />
        </div>
      </div>
    </>
  );
}
