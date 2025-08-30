import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Home, MapPin, Smartphone, TrendingUp, CheckCircle, Star, Search } from "lucide-react";
import { Link } from "react-router-dom";

const RealEstateApp = () => {
  return (
    <>
      <Helmet>
        <title>Real Estate Mobile App Case Study - Trivedia Flow</title>
        <meta name="description" content="Discover how we built a comprehensive real estate mobile app that connected 500K+ users with properties, featuring AR visualization and smart search capabilities." />
        <meta name="keywords" content="real estate app, property search, AR visualization, mobile development, real estate technology, case study" />
      </Helmet>

      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <Link to="/portfolio" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Link>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="border-cyan-400 text-cyan-400 mb-4">
                  Real Estate Technology
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  PropFinder Mobile App
                </h1>
                <p className="text-xl text-gray-300 mb-6">
                  A revolutionary real estate mobile application that transforms property search and visualization 
                  with AR technology, serving 500K+ users across major Indian cities.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["React Native", "AR Core", "Node.js", "MongoDB", "Google Maps", "AI Search"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-gray-800 text-gray-300">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button asChild className="bg-cyan-600 hover:bg-cyan-700">
                    <Link to="/contact">Start Your Project</Link>
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Download App
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-cyan-600/20 to-green-600/20 rounded-2xl p-8 backdrop-blur-sm border border-gray-800">
                  <img 
                    src="/placeholder.svg" 
                    alt="Real Estate App Interface"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">500K+</div>
                <div className="text-gray-400">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">2M+</div>
                <div className="text-gray-400">Property Listings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">80%</div>
                <div className="text-gray-400">Faster Search</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">4.7/5</div>
                <div className="text-gray-400">App Store Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Challenge */}
        <section className="py-16 px-4 bg-gray-900/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">The Challenge</h2>
                <p className="text-gray-300 mb-6">
                  The real estate market in India was fragmented with poor user experiences, limited property 
                  visualization, and time-consuming search processes. Buyers needed a modern, intuitive platform 
                  that could help them find and visualize properties efficiently.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <h3 className="font-semibold text-white">Fragmented Listings</h3>
                      <p className="text-gray-400 text-sm">Properties scattered across multiple platforms</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <h3 className="font-semibold text-white">Poor Visualization</h3>
                      <p className="text-gray-400 text-sm">Limited photos and no virtual tour capabilities</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <h3 className="font-semibold text-white">Time-Consuming Process</h3>
                      <p className="text-gray-400 text-sm">Manual search and multiple site visits required</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 text-white">Market Pain Points</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Search className="w-5 h-5 text-red-400" />
                        <span className="text-gray-300">Inefficient search algorithms</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-red-400" />
                        <span className="text-gray-300">Poor location-based filtering</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-red-400" />
                        <span className="text-gray-300">Lack of mobile-optimized experience</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 text-red-400" />
                        <span className="text-gray-300">No market trend insights</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Solution */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Our Solution</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We developed a cutting-edge mobile app that combines AR visualization, AI-powered search, 
                and comprehensive property data to revolutionize the real estate experience.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <Home className="w-12 h-12 text-cyan-400 mb-4" />
                  <h3 className="font-semibold mb-3 text-white">AR Visualization</h3>
                  <p className="text-gray-400">
                    Immersive AR technology allows users to visualize properties and furniture placement in real-time.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <Search className="w-12 h-12 text-cyan-400 mb-4" />
                  <h3 className="font-semibold mb-3 text-white">Smart Search</h3>
                  <p className="text-gray-400">
                    AI-powered search engine with natural language processing and predictive recommendations.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <MapPin className="w-12 h-12 text-cyan-400 mb-4" />
                  <h3 className="font-semibold mb-3 text-white">Location Intelligence</h3>
                  <p className="text-gray-400">
                    Advanced mapping with neighborhood insights, connectivity scores, and amenity analysis.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16 px-4 bg-gray-900/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Revolutionary Features</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {[
                  "Augmented Reality property visualization",
                  "Voice-enabled property search",
                  "360° virtual property tours",
                  "AI-powered price prediction",
                  "Real-time chat with agents",
                  "Mortgage calculator and EMI planner"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                {[
                  "Offline property bookmarking",
                  "Neighborhood scoring and analytics",
                  "Document verification assistance",
                  "Investment potential calculator",
                  "Social features and property reviews",
                  "Integration with legal services"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Technical Innovation */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Technical Excellence</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 text-white">AR & 3D Technology</h3>
                  <p className="text-gray-400 mb-4">
                    Implemented ARCore and ARKit for seamless AR experiences, allowing users to place virtual 
                    furniture and visualize space modifications in real-time through their mobile cameras.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-gray-800 text-gray-300">ARCore</Badge>
                    <Badge variant="secondary" className="bg-gray-800 text-gray-300">ARKit</Badge>
                    <Badge variant="secondary" className="bg-gray-800 text-gray-300">3D Modeling</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 text-white">AI Search Engine</h3>
                  <p className="text-gray-400 mb-4">
                    Built a sophisticated search algorithm using machine learning to understand user preferences 
                    and provide personalized property recommendations based on behavior patterns.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-gray-800 text-gray-300">TensorFlow</Badge>
                    <Badge variant="secondary" className="bg-gray-800 text-gray-300">NLP</Badge>
                    <Badge variant="secondary" className="bg-gray-800 text-gray-300">Elasticsearch</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* User Journey */}
        <section className="py-16 px-4 bg-gray-900/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">User Journey Transformation</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-white font-bold">BEFORE</span>
                </div>
                <h3 className="font-semibold text-white mb-4">Traditional Process</h3>
                <ul className="text-gray-400 space-y-2 text-sm">
                  <li>• Multiple website visits</li>
                  <li>• Limited property photos</li>
                  <li>• Time-consuming site visits</li>
                  <li>• Manual price comparison</li>
                  <li>• Poor agent communication</li>
                </ul>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <ArrowLeft className="w-8 h-8 text-white transform rotate-180" />
                </div>
                <h3 className="font-semibold text-white mb-4">Our Innovation</h3>
                <ul className="text-gray-400 space-y-2 text-sm">
                  <li>• AI-powered recommendations</li>
                  <li>• AR virtual tours</li>
                  <li>• Smart filtering system</li>
                  <li>• Integrated communication</li>
                  <li>• Real-time market data</li>
                </ul>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-white font-bold">AFTER</span>
                </div>
                <h3 className="font-semibold text-white mb-4">Enhanced Experience</h3>
                <ul className="text-gray-400 space-y-2 text-sm">
                  <li>• Single app solution</li>
                  <li>• Immersive AR viewing</li>
                  <li>• Reduced site visits by 60%</li>
                  <li>• Instant price insights</li>
                  <li>• Seamless transactions</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Market Impact</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold mb-6 text-white">Business Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">User Acquisition Rate</span>
                    <span className="text-cyan-400 font-semibold">300%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Search Efficiency</span>
                    <span className="text-cyan-400 font-semibold">80%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">User Engagement Time</span>
                    <span className="text-cyan-400 font-semibold">+150%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Conversion Rate</span>
                    <span className="text-cyan-400 font-semibold">25%</span>
                  </div>
                </div>
              </div>
              <div>
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <Star className="w-5 h-5 text-yellow-400 mt-1" />
                      <div>
                        <h4 className="font-semibold text-white">Industry Recognition</h4>
                        <p className="text-gray-400 mt-2">
                          "PropFinder has set a new standard for real estate apps in India. The AR feature 
                          is a game-changer that saves buyers valuable time and provides unprecedented 
                          property insights."
                        </p>
                        <p className="text-cyan-400 mt-3 font-medium">
                          - Real Estate Weekly Magazine
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Market Recognition */}
        <section className="py-16 px-4 bg-gray-900/50">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Awards & Achievements</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">Best PropTech App 2024</h3>
                <p className="text-gray-400">India Real Estate Awards</p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">Most Innovative Mobile App</h3>
                <p className="text-gray-400">Tech Innovation Summit</p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">Fastest Growing Platform</h3>
                <p className="text-gray-400">Business Excellence Awards</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-cyan-600/20 to-green-600/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Industry?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's build innovative mobile solutions that revolutionize user experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-cyan-600 hover:bg-cyan-700">
                <Link to="/contact">Start Your Mobile App Project</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Link to="/portfolio">Explore More Projects</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default RealEstateApp;
