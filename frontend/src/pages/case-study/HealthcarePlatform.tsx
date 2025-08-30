import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Users, Shield, Clock, TrendingUp, CheckCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";

const HealthcarePlatform = () => {
  return (
    <>
      <Helmet>
        <title>Healthcare Platform Case Study - Trivedia Flow</title>
        <meta name="description" content="Discover how we built a comprehensive healthcare platform that improved patient care and streamlined medical operations for 100+ healthcare providers." />
        <meta name="keywords" content="healthcare platform, medical software, patient management, HIPAA compliance, case study" />
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
                  Healthcare Technology
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  MedCare Pro Platform
                </h1>
                <p className="text-xl text-gray-300 mb-6">
                  A comprehensive healthcare management platform that revolutionized patient care delivery and medical practice operations across 100+ healthcare facilities.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["React", "Node.js", "PostgreSQL", "HIPAA Compliant", "AWS", "Real-time Analytics"].map((tech) => (
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
                    View Demo
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-2xl p-8 backdrop-blur-sm border border-gray-800">
                  <img 
                    src="/placeholder.svg" 
                    alt="Healthcare Platform Dashboard"
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
                <div className="text-3xl font-bold text-cyan-400 mb-2">100+</div>
                <div className="text-gray-400">Healthcare Providers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">50K+</div>
                <div className="text-gray-400">Active Patients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">40%</div>
                <div className="text-gray-400">Efficiency Increase</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">99.9%</div>
                <div className="text-gray-400">Uptime Achieved</div>
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
                  Healthcare providers were struggling with fragmented systems, inefficient patient management, 
                  and compliance challenges. They needed a unified platform that could handle everything from 
                  patient records to appointment scheduling while maintaining strict HIPAA compliance.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <h3 className="font-semibold text-white">Fragmented Systems</h3>
                      <p className="text-gray-400 text-sm">Multiple disconnected software solutions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <h3 className="font-semibold text-white">Compliance Issues</h3>
                      <p className="text-gray-400 text-sm">Difficulty maintaining HIPAA compliance</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <h3 className="font-semibold text-white">Poor User Experience</h3>
                      <p className="text-gray-400 text-sm">Complex interfaces reducing productivity</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 text-white">Key Pain Points</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-red-400" />
                        <span className="text-gray-300">Time-consuming manual processes</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-red-400" />
                        <span className="text-gray-300">Security and compliance concerns</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-red-400" />
                        <span className="text-gray-300">Poor patient experience</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 text-red-400" />
                        <span className="text-gray-300">Limited analytics and insights</span>
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
                We developed a comprehensive healthcare platform that unified all medical operations 
                while ensuring the highest standards of security and compliance.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <Shield className="w-12 h-12 text-cyan-400 mb-4" />
                  <h3 className="font-semibold mb-3 text-white">HIPAA Compliance</h3>
                  <p className="text-gray-400">
                    Built with security-first approach, ensuring complete HIPAA compliance and data protection.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <Users className="w-12 h-12 text-cyan-400 mb-4" />
                  <h3 className="font-semibold mb-3 text-white">Patient Management</h3>
                  <p className="text-gray-400">
                    Comprehensive patient records, appointment scheduling, and communication tools.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <TrendingUp className="w-12 h-12 text-cyan-400 mb-4" />
                  <h3 className="font-semibold mb-3 text-white">Analytics Dashboard</h3>
                  <p className="text-gray-400">
                    Real-time insights and reporting to improve decision-making and patient outcomes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16 px-4 bg-gray-900/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {[
                  "Electronic Health Records (EHR) management",
                  "Appointment scheduling and calendar integration",
                  "Prescription management and drug interaction checks",
                  "Patient portal for secure communication",
                  "Billing and insurance claim processing",
                  "Laboratory results integration"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                {[
                  "Multi-location practice management",
                  "Telemedicine and video consultation support",
                  "Medical inventory and supply tracking",
                  "Staff scheduling and resource allocation",
                  "Compliance reporting and audit trails",
                  "Mobile app for healthcare providers"
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

        {/* Results */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Results & Impact</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold mb-6 text-white">Measurable Outcomes</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Patient Wait Time Reduction</span>
                    <span className="text-cyan-400 font-semibold">45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Administrative Efficiency</span>
                    <span className="text-cyan-400 font-semibold">40%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Patient Satisfaction Score</span>
                    <span className="text-cyan-400 font-semibold">4.8/5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">System Uptime</span>
                    <span className="text-cyan-400 font-semibold">99.9%</span>
                  </div>
                </div>
              </div>
              <div>
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <Star className="w-5 h-5 text-yellow-400 mt-1" />
                      <div>
                        <h4 className="font-semibold text-white">Client Testimonial</h4>
                        <p className="text-gray-400 mt-2">
                          "This platform has transformed our practice. We've seen a 40% increase in efficiency 
                          and our patients love the new portal. The team's expertise in healthcare technology 
                          is exceptional."
                        </p>
                        <p className="text-cyan-400 mt-3 font-medium">
                          - Dr. Sarah Johnson, Chief Medical Officer
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-cyan-600/20 to-blue-600/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Healthcare Practice?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss how we can build a custom healthcare solution for your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-cyan-600 hover:bg-cyan-700">
                <Link to="/contact">Start Your Project</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Link to="/portfolio">View More Projects</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HealthcarePlatform;
