import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { portfolioAPI } from "@/lib/api";
import SEO from "@/components/SEO";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import workImage from "@/assets/work.jpeg";

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Fetch projects data
  const { data: projectsData, isLoading: projectsLoading, error: projectsError } = useQuery({
    queryKey: ['portfolio'], // Remove activeFilter to prevent excessive requests
    queryFn: async () => {
      console.log('🚀 Making portfolio API call');
      try {
        const response = await portfolioAPI.getAll({ 
          limit: 50 // Get all projects, filter on frontend for now
        });
        console.log('📦 Portfolio API Response:', response);
        console.log('📊 Response data:', response.data);
        return response;
      } catch (error) {
        console.error('❌ Portfolio API Error:', error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes  
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: false, // Disable retry to prevent 429 errors
    refetchOnMount: false, // Disable refetch on mount to prevent multiple requests
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Fetch featured project data
  const { data: featuredData, isLoading: featuredLoading, error: featuredError } = useQuery({
    queryKey: ['featured-project'],
    queryFn: async () => {
      console.log('🚀 Making featured project API call');
      try {
        const response = await portfolioAPI.getFeatured();
        console.log('⭐ Featured Project API Response:', response);
        return response;
      } catch (error) {
        console.error('❌ Featured Project API Error:', error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes  
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const { data: categoriesData, error: categoriesError } = useQuery({
    queryKey: ['portfolio-categories'], // Remove timestamp from query key
    queryFn: async () => {
      console.log('🚀 Making categories API call');
      try {
        const response = await portfolioAPI.getCategories();
        console.log('📦 Categories API Response:', response);
        console.log('📊 Categories data:', response.data);
        return response;
      } catch (error) {
        console.error('❌ Categories API Error:', error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: false, // Disable retry to prevent 429 errors
    refetchOnMount: false, // Disable refetch on mount
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Debug logging
  console.log('🎯 Portfolio Page Debug:');
  console.log('Active Filter:', activeFilter);
  console.log('Projects Data:', projectsData);
  console.log('Projects Loading:', projectsLoading);
  console.log('Projects Error:', projectsError);
  console.log('Featured Data:', featuredData);
  console.log('Featured Loading:', featuredLoading);
  console.log('Featured Error:', featuredError);
  console.log('Categories Data:', categoriesData);
  console.log('Categories Error:', categoriesError);
  
  // Schema markup for portfolio
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Portfolio", url: "/portfolio" }
  ]);

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "Trivesha Portfolio",
    "description": "Showcase of our best web development, mobile app, and design projects",
    "url": "https://trivesha.com/portfolio",
    "creator": {
      "@type": "Organization", 
      "name": "Trivesha"
    }
  };
  
  const categories = ['All', ...(categoriesData?.data?.data?.categories || [])];
  
  const projects = projectsData?.data?.data?.projects || [];
  
  // Extract featured project from API response
  const featuredProjects = featuredData?.data?.data?.projects || [];
  const featuredProject = featuredProjects.length > 0 ? featuredProjects[0] : null;
  
  // Debug logging
  console.log('🔍 Projects Debug Info:');
  console.log('📊 Raw projectsData:', projectsData);
  console.log('📊 projectsData.data:', projectsData?.data);
  console.log('📊 projectsData.data.data:', projectsData?.data?.data);
  console.log('📊 Final projects array:', projects);
  console.log('📊 Projects length:', projects.length);
  console.log('📊 Categories debug:', categoriesData?.data?.data);

  const clientLogos = [
    { name: "TechStart", logo: "/placeholder.svg" },
    { name: "DataFlow", logo: "/placeholder.svg" },
    { name: "SecureBank", logo: "/placeholder.svg" },
    { name: "EduTech", logo: "/placeholder.svg" },
    { name: "MedCare", logo: "/placeholder.svg" },
    { name: "GameStudio", logo: "/placeholder.svg" }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter((project: any) => project.category === activeFilter);

  return (
    <main className="bg-[#0A0E2A] text-[#EAEAEA]">
      <SEO
        title="Portfolio - Trivesha"
        description="Explore our portfolio of web design, development, mobile apps, games and maintenance projects. Real results for real businesses."
        canonical="/portfolio"
        ogImage="/social-images/og-portfolio.png"
        schemaMarkup={[breadcrumbSchema, portfolioSchema]}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F1428] to-[#0A0E2A] pt-24 pb-24 md:pt-32 md:pb-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(45,212,191,0.15), transparent 50%),
                                radial-gradient(circle at 75% 75%, rgba(255,120,73,0.1), transparent 50%)`,
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="text-left">
              <div className="inline-block">
                <Badge variant="secondary" className="bg-[#2DD4BF]/10 text-[#2DD4BF] border border-[#2DD4BF]/20 mb-6">
                  Portfolio
                </Badge>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl leading-tight text-[#EAEAEA] mb-6 drop-shadow-[0_4px_20px_rgba(234,234,234,0.2)]">
                Our Work.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2DD4BF] to-[#5EEAD4] drop-shadow-[0_4px_20px_rgba(45,212,191,0.3)]">Your Results.</span>
              </h1>
              <p className="text-lg md:text-xl text-[#A0AEC0] mb-8 leading-relaxed">
                From Figma concepts to deployed products - here's how we deliver measurable results for businesses like yours.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-[#2DD4BF] hover:bg-[#5EEAD4] text-[#0A0E2A] font-semibold w-full sm:w-auto shadow-[0_8px_24px_rgba(45,212,191,0.25)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.35)] border-0"
                  asChild
                >
                  <Link to="/contact">Start Your Project</Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-[#FF7849]/50 text-[#FF7849] hover:bg-[#FF7849]/10 hover:border-[#FF7849] hover:text-[#FF8B61] w-full sm:w-auto font-semibold bg-transparent"
                  onClick={() => document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Case Studies
                </Button>
              </div>
              
              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-4 md:gap-8">
                <div className="text-center md:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-[#2DD4BF] mb-1">120+</div>
                  <div className="text-xs md:text-sm text-[#A0AEC0]">Projects Delivered</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-[#FF7849] mb-1">50+</div>
                  <div className="text-xs md:text-sm text-[#A0AEC0]">Happy Clients</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-[#2DD4BF] mb-1">6+</div>
                  <div className="text-xs md:text-sm text-[#A0AEC0]">Years Experience</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-[#111528] to-[#0F1428] rounded-2xl p-8 border border-[#1C2333] shadow-[0_12px_32px_rgba(0,0,0,0.4)]">
                <img 
                  src={workImage} 
                  alt="Portfolio showcase mockup"
                  className="w-full rounded-lg shadow-2xl border border-[#1C2333]"
                />
              </div>
              
              {/* Floating cards */}
              <div className="absolute -top-4 -right-4 bg-[#111528] rounded-xl p-4 shadow-[0_8px_24px_rgba(0,0,0,0.4)] border border-[#1C2333]">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-[#2DD4BF] rounded-full"></div>
                  <span className="font-medium text-[#EAEAEA]">99.9% Uptime</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-[#111528] rounded-xl p-4 shadow-[0_8px_24px_rgba(0,0,0,0.4)] border border-[#1C2333]">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-[#FF7849] rounded-full"></div>
                  <span className="font-medium text-[#EAEAEA]">Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Featured Project */}
      {featuredLoading ? (
        // Loading skeleton for featured project
        <section className="py-24 bg-[#0F1428] relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="w-full h-96 bg-gray-700 animate-pulse rounded-2xl"></div>
              </div>
              <div className="order-1 lg:order-2 space-y-8">
                <div className="h-6 w-32 bg-gray-700 animate-pulse rounded mb-4"></div>
                <div className="h-10 bg-gray-700 animate-pulse rounded mb-2"></div>
                <div className="h-6 w-3/4 bg-gray-700 animate-pulse rounded mb-4"></div>
                <div className="h-20 bg-gray-700 animate-pulse rounded"></div>
              </div>
            </div>
          </div>
        </section>
      ) : featuredError ? (
        // Error state for featured project
        <section className="py-24 bg-[#0F1428] relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10 text-center">
            <p className="text-[#FF6B6B] text-lg mb-4">Error loading featured project</p>
            <p className="text-[#A0AEC0] text-sm">Please try refreshing the page</p>
          </div>
        </section>
      ) : featuredProject ? (
        // Dynamic featured project
        <section className="py-24 bg-[#0F1428] relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 30% 20%, rgba(45,212,191,0.1), transparent 50%),
                                  radial-gradient(circle at 70% 80%, rgba(255,120,73,0.1), transparent 50%)`,
              }}
            />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative">
                  <img 
                    src={featuredProject.fullImageUrl || featuredProject.image} 
                    alt={featuredProject.title}
                    className="w-full h-96 object-cover rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.4)] border border-[#1C2333]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E2A]/60 to-transparent rounded-2xl"></div>
                </div>
              </div>
              <div className="order-1 lg:order-2 space-y-8">
                <div>
                  <Badge variant="secondary" className="bg-[#FF7849]/10 text-[#FF7849] border border-[#FF7849]/20 mb-4">
                    Featured Project
                  </Badge>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#EAEAEA] mb-2 drop-shadow-[0_4px_20px_rgba(234,234,234,0.1)]">
                    {featuredProject.title}
                  </h2>
                  {featuredProject.subtitle && (
                    <p className="text-xl text-[#2DD4BF] font-semibold mb-4">
                      {featuredProject.subtitle}
                    </p>
                  )}
                </div>
                
                <p className="text-lg text-[#A0AEC0] leading-relaxed">
                  {featuredProject.longDescription || featuredProject.description}
                </p>

                {/* Display results if available */}
                {featuredProject.results && featuredProject.results.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-[#EAEAEA]">Key Results:</h3>
                    <div className="grid gap-3">
                      {featuredProject.results.map((result, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-[#2DD4BF] rounded-full flex-shrink-0"></div>
                          <span className="text-[#A0AEC0]">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Display keyResults if available (from admin panel) */}
                {featuredProject.keyResults && featuredProject.keyResults.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-[#EAEAEA]">Key Results:</h3>
                    <div className="grid gap-3">
                      {featuredProject.keyResults.map((result, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-[#2DD4BF] rounded-full flex-shrink-0"></div>
                          <span className="text-[#A0AEC0]">{result.metric}: {result.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Combined tags and technologies display */}
                {(() => {
                  const allTags = [];
                  
                  // Add regular tags
                  if (featuredProject.tags && featuredProject.tags.length > 0) {
                    allTags.push(...featuredProject.tags);
                  }
                  
                  // Add technology names
                  if (featuredProject.technologies && featuredProject.technologies.length > 0) {
                    const techNames = featuredProject.technologies.map(tech => tech.name || tech);
                    allTags.push(...techNames);
                  }
                  
                  // Remove duplicates (case-insensitive)
                  const uniqueTags = allTags.filter((tag, index, arr) => 
                    arr.findIndex(t => t.toLowerCase() === tag.toLowerCase()) === index
                  );
                  
                  return uniqueTags.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {uniqueTags.map((tag, index) => (
                        <span key={index} className="bg-[#2DD4BF]/10 text-[#2DD4BF] text-sm px-3 py-1 rounded-full border border-[#2DD4BF]/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null;
                })()}

                <Button className="bg-[#2DD4BF] hover:bg-[#5EEAD4] text-[#0A0E2A] font-semibold shadow-[0_8px_24px_rgba(45,212,191,0.25)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.35)] border-0" asChild>
                  <Link to={`/portfolio/${featuredProject.slug || featuredProject._id}`}>View Full Case Study</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Portfolio Grid */}
      <section className="py-24 bg-[#0A0E2A]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#2DD4BF] mb-4 drop-shadow-[0_4px_20px_rgba(45,212,191,0.2)]">
              {activeFilter === 'All' ? 'Projects' : activeFilter} Portfolio
            </h2>
            <p className="text-[#A0AEC0] mb-8">Check out our latest projects</p>
            <div className="w-24 h-1 bg-[#2DD4BF] mx-auto mb-4 rounded-full"></div>
           <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? "default" : "outline"}
                className={`rounded-full px-6 py-2 transition-all duration-300 ${
                  activeFilter === category
                    ? "bg-[#2DD4BF] text-[#0A0E2A] hover:bg-[#5EEAD4] shadow-[0_8px_24px_rgba(45,212,191,0.25)] font-semibold border-0"
                    : "border-2 border-[#2DD4BF]/50 text-[#2DD4BF] hover:bg-[#2DD4BF]/10 hover:border-[#2DD4BF] hover:text-[#5EEAD4] bg-transparent"
                }`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projectsLoading ? (
              // Loading skeleton
              [...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden border-2 border-[#1C2333] bg-[#111528]">
                  <div className="h-48 md:h-64 bg-gray-700 animate-pulse" />
                  <CardContent className="p-4 md:p-6">
                    <div className="h-6 bg-gray-700 rounded animate-pulse mb-2" />
                    <div className="h-4 bg-gray-700 rounded animate-pulse mb-4 w-3/4" />
                    <div className="flex gap-2 mb-4">
                      <div className="h-6 w-16 bg-gray-700 rounded animate-pulse" />
                      <div className="h-6 w-20 bg-gray-700 rounded animate-pulse" />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : projectsError ? (
              <div className="col-span-full text-center py-12">
                <p className="text-[#FF6B6B] text-lg mb-4">Error loading projects</p>
                <p className="text-[#A0AEC0] text-sm">
                  {(projectsError as any)?.response?.status === 429 
                    ? "Too many requests - please wait a moment and refresh the page"
                    : (projectsError as any)?.message || "Something went wrong"}
                </p>
              </div>
            ) : filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <Card key={project._id} className="group overflow-hidden border-2 border-[#1C2333] shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(45,212,191,0.25)] cursor-pointer bg-[#111528] transition-all duration-500 hover:-translate-y-1 hover:border-[#2DD4BF]/30">
                  <Link to={`/portfolio/${project.slug || project._id}`}>
                    <div className="relative overflow-hidden">
                      <img 
                        src={(project as any).fullImageUrl || (project as any).image} 
                        alt={project.title}
                        className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-[#2DD4BF]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <Button className="bg-[#0A0E2A] text-[#2DD4BF] hover:bg-[#111528] hover:text-[#5EEAD4] text-sm md:text-base font-semibold shadow-[0_8px_24px_rgba(10,14,42,0.3)]">
                          View Case Study →
                        </Button>
                      </div>
                      <Badge className="absolute top-2 left-2 md:top-4 md:left-4 bg-[#111528]/90 text-[#2DD4BF] border border-[#2DD4BF]/20 text-xs md:text-sm font-medium">
                        {project.category}
                      </Badge>
                    </div>
                    
                    <CardContent className="p-4 md:p-6">
                      <h3 className="font-heading text-lg md:text-xl font-bold text-[#EAEAEA] mb-2 md:mb-3">
                        {project.title}
                      </h3>
                      <p className="text-[#A0AEC0] mb-3 md:mb-4 line-clamp-2 leading-relaxed text-sm md:text-base">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
                        {project.tags?.slice(0, 3).map((tag, index) => (
                          <span key={index} className="text-xs bg-[#2DD4BF]/10 text-[#2DD4BF] px-2 py-1 rounded border border-[#2DD4BF]/20">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs md:text-sm text-[#7A869C]">
                          Client: {project.client}
                        </span>
                        <span className="text-[#FF7849] hover:text-[#FF8B61] font-medium text-xs md:text-sm transition-colors hover:drop-shadow-[0_0_8px_rgba(255,120,73,0.6)]">
                          View Details →
                        </span>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-[#A0AEC0] text-lg">No projects found for this category.</p>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" className="border-2 border-[#2DD4BF]/50 text-[#2DD4BF] hover:bg-[#2DD4BF]/10 hover:border-[#2DD4BF] hover:text-[#5EEAD4] font-semibold bg-transparent">
              Load More Projects
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-[#0F1428] via-[#FF7849]/20 to-[#0A0E2A] text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-15">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,120,73,0.15), transparent 60%),
                                radial-gradient(circle at 75% 75%, rgba(45,212,191,0.1), transparent 60%)`,
            }}
          />
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#FF7849] rounded-full opacity-40 animate-ping"></div>
          <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-[#2DD4BF] rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-[#FF7849] rounded-full opacity-50 animate-ping" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6 drop-shadow-[0_4px_20px_rgba(234,234,234,0.2)]">
            <span className="text-[#EAEAEA]">Your Project Could Be</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7849] via-[#FF8B61] to-[#FFB088] drop-shadow-[0_4px_20px_rgba(255,120,73,0.4)]">Here Next</span>
          </h2>
          <p className="text-xl text-[#A0AEC0] mb-8 max-w-3xl mx-auto leading-relaxed">
            Let's design and build something that works for you. Join the growing list of businesses we've helped transform digitally.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-[#FF7849] hover:bg-[#FF8B61] text-white w-full sm:w-auto font-bold shadow-[0_12px_32px_rgba(255,120,73,0.3)] hover:shadow-[0_20px_48px_rgba(255,120,73,0.4)] border-0 transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link to="/contact">Get a Free Quote</Link>
            </Button>
            <Button 
              size="lg" 
              className="border-2 border-[#2DD4BF]/50 bg-transparent text-[#2DD4BF] hover:bg-[#2DD4BF]/10 hover:border-[#2DD4BF] hover:text-[#5EEAD4] w-full sm:w-auto font-bold transition-all duration-300"
              asChild
            >
              <Link to="/contact">Schedule a Call</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
