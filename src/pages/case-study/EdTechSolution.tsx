import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, BookOpen, Users, Smartphone, TrendingUp, CheckCircle, Star, Play } from "lucide-react";
import { Link } from "react-router-dom";

const EdTechSolution = () => {
  return (
    <>
      <Helmet>
        <title>EdTech Learning Platform Case Study - Trivedia Flow</title>
        <meta name="description" content="Discover how we built an innovative EdTech platform that revolutionized online learning for 250K+ students with AI-powered personalization and offline capabilities." />
        <meta name="keywords" content="edtech platform, online learning, educational technology, mobile learning, AI personalization, case study" />
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
                  Educational Technology
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  EduLearn Pro Platform
                </h1>
                <p className="text-xl text-gray-300 mb-6">
                  An AI-powered educational platform that personalizes learning experiences for 250K+ students 
                  across India with interactive content, offline capabilities, and real-time progress tracking.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["React Native", "Flutter", "Node.js", "AI/ML", "Firebase", "Offline Sync"].map((tech) => (
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
                    <Play className="w-4 h-4 mr-2" />
                    Watch Demo
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-cyan-600/20 to-purple-600/20 rounded-2xl p-8 backdrop-blur-sm border border-gray-800">
                  <img 
                    src="/placeholder.svg" 
                    alt="EdTech Platform Interface"
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
                <div className="text-3xl font-bold text-cyan-400 mb-2">250K+</div>
                <div className="text-gray-400">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">95%</div>
                <div className="text-gray-400">Completion Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">60%</div>
                <div className="text-gray-400">Learning Improvement</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">4.9/5</div>
                <div className="text-gray-400">User Rating</div>
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
                  Traditional education was struggling to engage digital-native students, especially in remote areas 
                  with poor internet connectivity. Students needed personalized learning paths, interactive content, 
                  and the ability to learn offline while tracking their progress effectively.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <h3 className="font-semibold text-white">Low Engagement</h3>
                      <p className="text-gray-400 text-sm">Students losing interest in traditional learning methods</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <h3 className="font-semibold text-white">Connectivity Issues</h3>
                      <p className="text-gray-400 text-sm">Limited internet access in rural areas</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <h3 className="font-semibold text-white">One-Size-Fits-All</h3>
                      <p className="text-gray-400 text-sm">Lack of personalized learning experiences</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 text-white">Key Challenges</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-red-400" />
                        <span className="text-gray-300">Limited interactive content</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-red-400" />
                        <span className="text-gray-300">Poor teacher-student collaboration</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-red-400" />
                        <span className="text-gray-300">Lack of mobile-first approach</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 text-red-400" />
                        <span className="text-gray-300">No progress tracking or analytics</span>
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
                We created an AI-powered learning platform that adapts to each student's pace and learning style, 
                with robust offline capabilities and engaging interactive content.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <BookOpen className="w-12 h-12 text-cyan-400 mb-4" />
                  <h3 className="font-semibold mb-3 text-white">AI Personalization</h3>
                  <p className="text-gray-400">
                    Adaptive learning algorithms that customize content based on individual student performance and preferences.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <Smartphone className="w-12 h-12 text-cyan-400 mb-4" />
                  <h3 className="font-semibold mb-3 text-white">Offline Learning</h3>
                  <p className="text-gray-400">
                    Download lessons, videos, and quizzes for offline access, with automatic sync when connected.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <TrendingUp className="w-12 h-12 text-cyan-400 mb-4" />
                  <h3 className="font-semibold mb-3 text-white">Progress Analytics</h3>
                  <p className="text-gray-400">
                    Real-time insights for students, parents, and teachers to track learning progress and identify areas for improvement.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16 px-4 bg-gray-900/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Platform Features</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {[
                  "AI-powered personalized learning paths",
                  "Interactive video lessons with gamification",
                  "Offline content download and sync",
                  "Real-time doubt resolution chat",
                  "Comprehensive assessment and testing",
                  "Multi-language support (Hindi, English, Regional)"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                {[
                  "Parent dashboard for progress monitoring",
                  "Teacher portal with class management",
                  "Adaptive quizzing and instant feedback",
                  "Collaborative study groups and forums",
                  "Achievement badges and leaderboards",
                  "Integration with school management systems"
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

        {/* Technical Implementation */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Technical Innovation</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 text-white">Mobile-First Architecture</h3>
                  <p className="text-gray-400 mb-4">
                    Built with Flutter for seamless cross-platform experience, ensuring consistent performance 
                    across Android and iOS devices with optimized battery usage.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-gray-800 text-gray-300">Flutter</Badge>
                    <Badge variant="secondary" className="bg-gray-800 text-gray-300">Dart</Badge>
                    <Badge variant="secondary" className="bg-gray-800 text-gray-300">SQLite</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 text-white">AI Learning Engine</h3>
                  <p className="text-gray-400 mb-4">
                    Machine learning algorithms analyze student behavior, learning patterns, and performance 
                    to deliver personalized content recommendations and adaptive difficulty levels.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-gray-800 text-gray-300">TensorFlow</Badge>
                    <Badge variant="secondary" className="bg-gray-800 text-gray-300">Python</Badge>
                    <Badge variant="secondary" className="bg-gray-800 text-gray-300">ML Pipeline</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-16 px-4 bg-gray-900/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Impact & Results</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold mb-6 text-white">Learning Outcomes</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Course Completion Rate</span>
                    <span className="text-cyan-400 font-semibold">95%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Learning Speed Improvement</span>
                    <span className="text-cyan-400 font-semibold">60%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Test Score Improvement</span>
                    <span className="text-cyan-400 font-semibold">45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Daily Active Users</span>
                    <span className="text-cyan-400 font-semibold">180K+</span>
                  </div>
                </div>
              </div>
              <div>
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <Star className="w-5 h-5 text-yellow-400 mt-1" />
                      <div>
                        <h4 className="font-semibold text-white">Student Testimonial</h4>
                        <p className="text-gray-400 mt-2">
                          "This app has completely changed how I study. The AI suggestions are spot-on, and I can 
                          learn even when traveling to my village. My grades have improved significantly!"
                        </p>
                        <p className="text-cyan-400 mt-3 font-medium">
                          - Priya S., Class 10 Student
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Awards & Recognition */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Awards & Recognition</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">Best EdTech Innovation 2024</h3>
                <p className="text-gray-400">India Digital Awards</p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">People's Choice Award</h3>
                <p className="text-gray-400">EdTech Excellence Summit</p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">Fastest Growing Platform</h3>
                <p className="text-gray-400">Indian Startup Awards</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-cyan-600/20 to-purple-600/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Revolutionize Education?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's build the next generation of learning platforms together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-cyan-600 hover:bg-cyan-700">
                <Link to="/contact">Start Your EdTech Project</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Link to="/portfolio">View More Case Studies</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EdTechSolution;
