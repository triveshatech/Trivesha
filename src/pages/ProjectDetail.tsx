import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { portfolioAPI } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  ArrowLeft, 
  ExternalLink, 
  Calendar, 
  Clock, 
  Users, 
  TrendingUp, 
  Palette, 
  Code, 
  Zap,
  DollarSign
} from "lucide-react";

// Icon mapping for key results
const iconMap: { [key: string]: React.ReactNode } = {
  'trending-up': <TrendingUp className="w-6 h-6" />,
  'users': <Users className="w-6 h-6" />,
  'zap': <Zap className="w-6 h-6" />,
  'clock': <Clock className="w-6 h-6" />,
  'dollar-sign': <DollarSign className="w-6 h-6" />,
  'palette': <Palette className="w-6 h-6" />,
  'code': <Code className="w-6 h-6" />,
  'check-circle': <CheckCircle className="w-6 h-6" />,
};

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: projectData, isLoading, error } = useQuery({
    queryKey: ['project', slug],
    queryFn: async () => {
      if (!slug) throw new Error('No slug provided');
      const response = await portfolioAPI.getBySlug(slug);
      return response;
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });

  const project = projectData?.data?.data?.project;
  
  const canonical = typeof window !== 'undefined' ? window.location.href : `/portfolio/${slug}`;

  if (isLoading) {
    return (
      <main className="bg-[#0A0E2A] text-[#EAEAEA] min-h-screen">
        <div className="container mx-auto max-w-7xl px-6 py-24">
          <div className="space-y-8">
            {/* Loading skeleton */}
            <div className="h-8 bg-gray-700 rounded animate-pulse w-32" />
            <div className="h-16 bg-gray-700 rounded animate-pulse w-3/4" />
            <div className="h-96 bg-gray-700 rounded animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-64 bg-gray-700 rounded animate-pulse" />
              <div className="h-64 bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="bg-[#0A0E2A] text-[#EAEAEA] min-h-screen">
        <div className="container mx-auto max-w-7xl px-6 py-24 text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-[#A0AEC0] mb-8">The project you're looking for doesn't exist or has been removed.</p>
          <Button asChild className="bg-[#2DD4BF] hover:bg-[#5EEAD4] text-[#0A0E2A]">
            <Link to="/portfolio">← Back to Portfolio</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#0A0E2A] text-[#EAEAEA] min-h-screen">
      <Helmet>
        <title>{project.title} - Portfolio - Trivesha</title>
        <meta name="description" content={project.description || project.longDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={`${project.title} - Portfolio - Trivesha`} />
        <meta property="og:description" content={project.description || project.longDescription} />
        <meta property="og:image" content={project.heroImage || project.image} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${project.title} - Portfolio - Trivesha`} />
        <meta name="twitter:description" content={project.description || project.longDescription} />
        <meta name="twitter:image" content={project.heroImage || project.image} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F1428] to-[#0A0E2A] pt-24 pb-16">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(45,212,191,0.15), transparent 50%),
                                radial-gradient(circle at 75% 75%, rgba(255,120,73,0.15), transparent 50%)`,
            }}
          />
        </div>

        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="mb-8">
            <Button asChild variant="outline" className="border-2 border-[#2DD4BF]/50 text-[#2DD4BF] hover:bg-[#2DD4BF]/10 hover:border-[#2DD4BF] hover:text-[#5EEAD4] font-semibold bg-transparent">
              <Link to="/portfolio">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Portfolio
              </Link>
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="text-[#2DD4BF] bg-[#2DD4BF]/10 border border-[#2DD4BF]/20">
                  {project.category}
                </Badge>
                <h1 className="font-heading text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
                  <span className="text-[#EAEAEA] drop-shadow-[0_4px_20px_rgba(234,234,234,0.2)]">
                    {project.title}
                  </span>
                </h1>
                {project.subtitle && (
                  <p className="text-xl text-[#2DD4BF] font-semibold">
                    {project.subtitle}
                  </p>
                )}
                <p className="text-lg md:text-xl text-[#A0AEC0] leading-relaxed">
                  {project.longDescription || project.description}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6">
                {project.liveUrl && (
                  <Button size="lg" className="bg-gradient-to-r from-[#2DD4BF] to-[#5EEAD4] hover:from-[#5EEAD4] hover:to-[#7DD3FC] text-[#0A0E2A] font-semibold text-lg px-8 shadow-[0_8px_24px_rgba(45,212,191,0.25)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.35)] border-0" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Live Site
                    </a>
                  </Button>
                )}
                <Button size="lg" variant="outline" className="text-lg px-8 border-2 border-[#FF7849]/50 text-[#FF7849] hover:bg-[#FF7849]/10 hover:border-[#FF7849] hover:text-[#FF8B61] font-semibold bg-transparent" asChild>
                  <Link to="/contact">Start Similar Project</Link>
                </Button>
              </div>

              {/* Project Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                {project.duration && (
                  <div>
                    <div className="flex items-center mb-2">
                      <Calendar className="w-4 h-4 text-[#2DD4BF] mr-2" />
                      <span className="text-sm text-[#A0AEC0]">Duration</span>
                    </div>
                    <div className="font-semibold text-[#EAEAEA]">{project.duration}</div>
                  </div>
                )}
                {project.teamSize && (
                  <div>
                    <div className="flex items-center mb-2">
                      <Users className="w-4 h-4 text-[#2DD4BF] mr-2" />
                      <span className="text-sm text-[#A0AEC0]">Team</span>
                    </div>
                    <div className="font-semibold text-[#EAEAEA]">{project.teamSize}</div>
                  </div>
                )}
                {project.completionDate && (
                  <div>
                    <div className="flex items-center mb-2">
                      <Clock className="w-4 h-4 text-[#2DD4BF] mr-2" />
                      <span className="text-sm text-[#A0AEC0]">Completed</span>
                    </div>
                    <div className="font-semibold text-[#EAEAEA]">{project.completionDate}</div>
                  </div>
                )}
                {project.budget && (
                  <div>
                    <div className="flex items-center mb-2">
                      <TrendingUp className="w-4 h-4 text-[#2DD4BF] mr-2" />
                      <span className="text-sm text-[#A0AEC0]">Budget</span>
                    </div>
                    <div className="font-semibold text-[#EAEAEA]">{project.budget}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-[#1C2333]">
                <img 
                  src={project.heroImage || project.image} 
                  alt={project.title}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E2A]/60 to-transparent"></div>
              </div>
              
              {/* Floating metrics */}
              {project.keyResults && project.keyResults.length > 0 && (
                <>
                  {project.keyResults[0] && (
                    <div className="absolute -bottom-6 -left-6 bg-[#111528] rounded-xl p-4 shadow-[0_8px_24px_rgba(0,0,0,0.4)] border border-[#1C2333]">
                      <div className="text-2xl font-bold text-[#2DD4BF] mb-1">{project.keyResults[0].metric}</div>
                      <div className="text-sm text-[#A0AEC0]">{project.keyResults[0].description}</div>
                    </div>
                  )}
                  
                  {project.keyResults[1] && (
                    <div className="absolute -top-6 -right-6 bg-[#111528] rounded-xl p-4 shadow-[0_8px_24px_rgba(0,0,0,0.4)] border border-[#1C2333]">
                      <div className="text-2xl font-bold text-[#FF7849] mb-1">{project.keyResults[1].metric}</div>
                      <div className="text-sm text-[#A0AEC0]">{project.keyResults[1].description}</div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Key Results */}
      {project.keyResults && project.keyResults.length > 0 && (
        <section className="py-24 bg-[#0A0E2A]">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#2DD4BF] mb-4 drop-shadow-[0_4px_20px_rgba(45,212,191,0.2)]">
                Key Results Achieved
              </h2>
              <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
                Measurable improvements that directly impacted business growth
              </p>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(project.keyResults.length, 4)} gap-8`}>
              {project.keyResults.map((result, index) => (
                <Card key={index} className="text-center border border-[#1C2333] bg-[#111528] shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.25)] hover:border-[#2DD4BF]/30 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 flex items-center justify-center mx-auto mb-4 text-[#2DD4BF]">
                      {result.icon ? iconMap[result.icon] || <TrendingUp className="w-6 h-6" /> : <TrendingUp className="w-6 h-6" />}
                    </div>
                    <div className="text-4xl font-bold text-[#2DD4BF] mb-2">{result.metric}</div>
                    <div className="text-[#A0AEC0] leading-relaxed">{result.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Challenge & Solution */}
      {(project.challenge || project.solution) && (
        <section className="py-24 bg-[#0F1428]">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-2 gap-16">
              {project.challenge && (
                <Card className="border border-[#1C2333] bg-[#111528] shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-[#FF7849]/10 border border-[#FF7849]/20 flex items-center justify-center mb-4">
                      <div className="w-6 h-6 rounded-full bg-[#FF7849]"></div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-[#EAEAEA]">The Challenge</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#A0AEC0] leading-relaxed text-lg">
                      {project.challenge}
                    </p>
                  </CardContent>
                </Card>
              )}

              {project.solution && (
                <Card className="border border-[#1C2333] bg-[#111528] shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 flex items-center justify-center mb-4">
                      <CheckCircle className="w-6 h-6 text-[#2DD4BF]" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-[#EAEAEA]">Our Solution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#A0AEC0] leading-relaxed text-lg">
                      {project.solution}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Technologies Used */}
      {project.technologies && project.technologies.length > 0 && (
        <section className="py-24 bg-[#0A0E2A]">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#EAEAEA] mb-4">
                Technologies Used
              </h2>
              <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
                Modern tech stack for optimal performance and scalability
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {project.technologies.map((tech, index) => (
                <Card key={index} className="text-center border border-[#1C2333] bg-[#111528] shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.15)] hover:border-[#2DD4BF]/30 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <h3 className={`font-bold text-lg mb-1 ${tech.color || 'text-[#2DD4BF]'}`}>{tech.name}</h3>
                    <p className="text-sm text-[#A0AEC0]">{tech.category}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Project Timeline */}
      {project.timeline && project.timeline.length > 0 && (
        <section className="py-24 bg-[#0F1428]">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#EAEAEA] mb-4">
                Project Timeline
              </h2>
              <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
                Structured approach from research to launch
              </p>
            </div>

            <div className="space-y-8">
              {project.timeline.map((phase, index) => (
                <Card key={index} className="border border-[#1C2333] bg-[#111528] shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.25)] hover:border-[#2DD4BF]/30 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="grid lg:grid-cols-3 gap-6 items-start">
                      <div>
                        <div className="flex items-center mb-4">
                          <div className="w-8 h-8 rounded-full bg-[#2DD4BF] text-[#0A0E2A] font-bold flex items-center justify-center mr-4">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-bold text-xl text-[#EAEAEA]">{phase.phase}</h3>
                            {phase.duration && (
                              <p className="text-[#2DD4BF] font-semibold">{phase.duration}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div>
                        {phase.description && (
                          <p className="text-[#A0AEC0] leading-relaxed">
                            {phase.description}
                          </p>
                        )}
                      </div>
                      <div>
                        {phase.deliverables && phase.deliverables.length > 0 && (
                          <>
                            <h4 className="font-semibold text-[#EAEAEA] mb-3">Deliverables:</h4>
                            <ul className="space-y-2">
                              {phase.deliverables.map((deliverable, deliverableIndex) => (
                                <li key={deliverableIndex} className="flex items-center text-sm text-[#A0AEC0]">
                                  <CheckCircle className="w-4 h-4 text-[#2DD4BF] mr-2 flex-shrink-0" />
                                  {deliverable}
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Implemented */}
      {project.features && project.features.length > 0 && (
        <section className="py-24 bg-[#0A0E2A]">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#2DD4BF] mb-4 drop-shadow-[0_4px_20px_rgba(45,212,191,0.2)]">
                Features Implemented
              </h2>
              <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
                Comprehensive functionality for enhanced user experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.features.map((feature, index) => (
                <div key={index} className="flex items-center p-4 bg-[#111528] rounded-lg border border-[#1C2333] hover:border-[#2DD4BF]/30 transition-all duration-300">
                  <CheckCircle className="w-6 h-6 text-[#2DD4BF] mr-4 flex-shrink-0" />
                  <span className="text-[#EAEAEA] font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Client Testimonial */}
      {project.testimonials && project.testimonials.length > 0 && (
        <section className="py-24 bg-[#0F1428]">
          <div className="container mx-auto max-w-7xl px-6">
            <Card className="border border-[#1C2333] bg-[#111528] shadow-[0_8px_24px_rgba(0,0,0,0.35)] max-w-4xl mx-auto">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-[#2DD4BF]/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <span className="text-4xl text-[#2DD4BF]">"</span>
                </div>
                <blockquote className="text-xl md:text-2xl text-[#EAEAEA] mb-8 leading-relaxed font-medium">
                  "{project.testimonials[0].quote}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  {project.testimonials[0].avatar && (
                    <img 
                      src={project.testimonials[0].avatar} 
                      alt={project.testimonials[0].author}
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#2DD4BF]/30"
                    />
                  )}
                  <div className="text-left">
                    <div className="font-bold text-lg text-[#EAEAEA]">{project.testimonials[0].author}</div>
                    <div className="text-[#A0AEC0]">{project.testimonials[0].position}</div>
                    {project.testimonials[0].company && (
                      <div className="text-[#A0AEC0]">{project.testimonials[0].company}</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Additional Images Gallery */}
      {project.images && project.images.length > 0 && (
        <section className="py-24 bg-[#0A0E2A]">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#EAEAEA] mb-4">
                Project Gallery
              </h2>
              <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
                Additional screenshots and design previews
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.images.map((image, index) => (
                <div key={index} className="relative rounded-lg overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.35)] border border-[#1C2333] hover:shadow-[0_12px_36px_rgba(45,212,191,0.25)] hover:border-[#2DD4BF]/30 transition-all duration-300 hover:scale-105">
                  <img 
                    src={image} 
                    alt={`${project.title} screenshot ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#0A0E2A] via-[#111528] to-[#0F1428] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(45,212,191,0.15), transparent 50%),
                                radial-gradient(circle at 75% 75%, rgba(255,120,73,0.15), transparent 50%)`,
            }}
          />
        </div>
        
        <div className="container mx-auto max-w-7xl px-6 text-center relative z-10">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#EAEAEA] mb-6 drop-shadow-[0_4px_20px_rgba(234,234,234,0.2)]">
            Ready for Similar Results?
          </h2>
          <p className="text-xl text-[#A0AEC0] mb-8 max-w-2xl mx-auto">
            Let's discuss how we can transform your project and deliver exceptional results.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#2DD4BF] to-[#5EEAD4] hover:from-[#5EEAD4] hover:to-[#7DD3FC] text-[#0A0E2A] font-bold text-xl px-12 py-4 shadow-[0_12px_32px_rgba(45,212,191,0.3)] hover:shadow-[0_20px_48px_rgba(45,212,191,0.4)] border-0 transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link to="/contact">Start Your Project</Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="text-xl px-12 py-4 border-2 border-[#FF7849]/50 text-[#FF7849] hover:bg-[#FF7849]/10 hover:border-[#FF7849] hover:text-[#FF8B61] font-bold bg-transparent"
              asChild
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
