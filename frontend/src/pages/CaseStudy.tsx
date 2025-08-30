import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ScrollToTop from "@/components/ui/scroll-to-top";

export default function CaseStudy() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '/case-study';
  
  const project = {
    title: "E-Commerce Platform Redesign",
    client: "Fashion Forward",
    category: "Web Design",
    duration: "3 months",
    year: "2024",
    heroImage: "/placeholder.svg",
    overview: "Fashion Forward, a leading online retailer, approached us to redesign their e-commerce platform. Their existing site had high bounce rates and low conversion, affecting their bottom line.",
    challenge: "The main challenges were poor user experience, outdated design, slow loading times, and a complex checkout process that led to cart abandonment.",
    solution: "We conducted user research, redesigned the entire user journey, implemented a modern design system, optimized performance, and streamlined the checkout process.",
    results: [
      { metric: "Conversion Rate", improvement: "+45%", description: "Increased from 2.1% to 3.0%" },
      { metric: "Page Load Time", improvement: "-60%", description: "Reduced from 5.2s to 2.1s" },
      { metric: "Cart Abandonment", improvement: "-35%", description: "Reduced from 70% to 45%" },
      { metric: "Mobile Traffic", improvement: "+80%", description: "Better mobile experience" }
    ],
    techStack: [
      { name: "Figma", category: "Design" },
      { name: "React", category: "Frontend" },
      { name: "TypeScript", category: "Frontend" },
      { name: "Next.js", category: "Framework" },
      { name: "Tailwind CSS", category: "Styling" },
      { name: "Stripe", category: "Payment" }
    ],
    timeline: [
      { phase: "Discovery & Research", duration: "2 weeks", tasks: ["User interviews", "Competitor analysis", "Technical audit"] },
      { phase: "Design & Prototyping", duration: "4 weeks", tasks: ["Wireframes", "UI design", "Interactive prototypes"] },
      { phase: "Development", duration: "6 weeks", tasks: ["Frontend development", "Backend integration", "Testing"] },
      { phase: "Launch & Optimization", duration: "2 weeks", tasks: ["Deployment", "Performance optimization", "Bug fixes"] }
    ],
    screenshots: [
      { image: "/placeholder.svg", title: "Homepage Redesign", description: "Modern, conversion-focused design" },
      { image: "/placeholder.svg", title: "Product Pages", description: "Enhanced product showcase" },
      { image: "/placeholder.svg", title: "Checkout Process", description: "Streamlined 2-step checkout" },
      { image: "/placeholder.svg", title: "Mobile Experience", description: "Responsive mobile design" }
    ],
    testimonial: {
      quote: "The team at Trivesha completely transformed our online presence. The new design not only looks amazing but has significantly improved our business metrics.",
      author: "Sarah Johnson",
      role: "CEO, Fashion Forward",
      avatar: "/placeholder.svg"
    }
  };

  return (
    <main className="min-h-screen bg-black">
      <Helmet>
        <title>{project.title} Case Study - Trivesha</title>
        <meta name="description" content={`Case study: ${project.overview.substring(0, 150)}...`} />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 py-24 overflow-hidden">
        {/* Background particles */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-3 h-3 bg-teal-400 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-32 w-2 h-2 bg-orange-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-40 left-40 w-4 h-4 bg-teal-300 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-teal-500/10 text-teal-400 border-teal-500/30">{project.category}</Badge>
                <h1 className="font-heading text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-teal-300 text-transparent bg-clip-text leading-tight">
                  {project.title}
                </h1>
                <div className="flex flex-wrap gap-6 text-gray-400">
                  <div>
                    <span className="font-medium">Client:</span> {project.client}
                  </div>
                  <div>
                    <span className="font-medium">Duration:</span> {project.duration}
                  </div>
                  <div>
                    <span className="font-medium">Year:</span> {project.year}
                  </div>
                </div>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed">
                {project.overview}
              </p>
              <Button className="bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-500/25">
                View Live Site
              </Button>
            </div>
            <div>
              <img 
                src={project.heroImage} 
                alt={project.title}
                className="w-full h-96 object-cover rounded-lg shadow-2xl opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-24 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl font-bold text-white mb-4">
              The Challenge
            </h2>
          </div>
          <div className="bg-red-500/10 border-l-4 border-red-500 p-8 rounded-lg backdrop-blur-sm">
            <p className="text-lg leading-relaxed text-gray-300">
              {project.challenge}
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 bg-black border-t border-gray-800">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl font-bold text-white mb-4">
              Our Solution
            </h2>
          </div>
          <div className="bg-teal-500/10 border-l-4 border-teal-500 p-8 rounded-lg backdrop-blur-sm">
            <p className="text-lg leading-relaxed text-gray-300">
              {project.solution}
            </p>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-24 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl font-bold text-white mb-4">
              Results & Impact
            </h2>
            <p className="text-lg text-gray-400">
              Measurable improvements across all key metrics
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {project.results.map((result, index) => (
              <Card key={index} className="text-center border border-gray-800/50 shadow-lg bg-gray-800/50 backdrop-blur-sm hover:border-teal-500/50 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="text-3xl font-bold text-orange-400 mb-2">
                    {result.improvement}
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-white mb-2">
                    {result.metric}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {result.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="py-24 bg-black border-t border-gray-800">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl font-bold text-white mb-4">
              Design Showcase
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {project.screenshots.map((screenshot, index) => (
              <div key={index} className="space-y-4">
                <img 
                  src={screenshot.image} 
                  alt={screenshot.title}
                  className="w-full h-80 object-cover rounded-lg shadow-lg opacity-90"
                />
                <div className="text-center">
                  <h3 className="font-semibold text-lg text-white mb-2">
                    {screenshot.title}
                  </h3>
                  <p className="text-gray-400">
                    {screenshot.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-24 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl font-bold text-white mb-4">
              Technology Stack
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {['Design', 'Frontend', 'Framework', 'Styling', 'Payment'].map((category) => (
              <div key={category}>
                <h3 className="font-semibold text-lg text-white mb-4">
                  {category}
                </h3>
                <div className="space-y-2">
                  {project.techStack
                    .filter(tech => tech.category === category)
                    .map((tech, index) => (
                      <Badge key={index} variant="outline" className="mr-2 border-teal-500/30 text-teal-400 bg-teal-500/10">
                        {tech.name}
                      </Badge>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-black border-t border-gray-800">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl font-bold text-white mb-4">
              Project Timeline
            </h2>
          </div>

          <div className="space-y-8">
            {project.timeline.map((phase, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-700/50">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-heading text-xl font-semibold text-white">
                        {phase.phase}
                      </h3>
                      <Badge variant="secondary" className="bg-orange-500/10 text-orange-400 border-orange-500/30">
                        {phase.duration}
                      </Badge>
                    </div>
                    <ul className="space-y-2">
                      {phase.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                          <span className="text-gray-300">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="text-center">
            <Card className="border border-gray-800/50 shadow-lg bg-gray-800/50 backdrop-blur-sm">
              <CardContent className="p-12">
                <div className="text-6xl text-orange-400 mb-6">"</div>
                <p className="text-xl text-gray-300 mb-8 italic leading-relaxed">
                  {project.testimonial.quote}
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <img 
                    src={project.testimonial.avatar} 
                    alt={project.testimonial.author}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-teal-500/30"
                  />
                  <div className="text-left">
                    <h4 className="font-semibold text-lg text-white">
                      {project.testimonial.author}
                    </h4>
                    <p className="text-gray-400">
                      {project.testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white border-t border-gray-800 relative overflow-hidden">
        {/* Background particles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-teal-400/20 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-orange-400/30 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-teal-300/20 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="container mx-auto max-w-4xl px-6 text-center relative z-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-teal-300 text-transparent bg-clip-text">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Let's discuss how we can help you achieve similar results for your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-teal-600 hover:bg-teal-500 text-white text-lg px-8 shadow-lg shadow-teal-500/25"
            >
              Start Your Project
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-orange-500/50 text-orange-400 hover:bg-orange-500 hover:text-white text-lg px-8 bg-transparent"
            >
              View More Work
            </Button>
          </div>
        </div>
      </section>
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </main>
  );
}
