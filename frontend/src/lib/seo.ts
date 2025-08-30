// SEO utility functions and constants
export const SITE_CONFIG = {
  name: 'Trivesha',
  url: 'https://trivesha.com',
  title: 'Build, Launch, Maintain - Websites, Apps, Games | Trivesha',
  description: 'From Figma to Play Store: Design, Development, Deployment, Maintenance - all in one place. Since 2019, we\'ve delivered 120+ projects with 99.9% uptime.',
  keywords: 'web development, mobile app development, UI UX design, software development, digital agency, startup services, MVP development',
  author: 'Trivesha Team',
  creator: 'Trivesha',
  publisher: 'Trivesha',
  locale: 'en_US',
  type: 'website',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  twitter: '@trivesha',
  verification: {
    google: 'your-google-verification-code',
    bing: 'your-bing-verification-code',
  }
};

export interface SEOConfig {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product' | 'profile';
  articleSection?: string;
  articleTags?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export const generateSEOConfig = (config: SEOConfig = {}) => {
  const canonical = config.canonical || '';
  const ogImage = config.ogImage || '/social-images/og-home.png';
  const fullOgImageUrl = ogImage.startsWith('http') ? ogImage : `${SITE_CONFIG.url}${ogImage}`;
  
  return {
    title: config.title || SITE_CONFIG.title,
    description: config.description || SITE_CONFIG.description,
    canonical: canonical ? `${SITE_CONFIG.url}${canonical}` : SITE_CONFIG.url,
    ogImage: fullOgImageUrl,
    ogType: config.ogType || 'website',
    robots: config.noindex || config.nofollow 
      ? `${config.noindex ? 'noindex' : 'index'}, ${config.nofollow ? 'nofollow' : 'follow'}`
      : SITE_CONFIG.robots,
    articleSection: config.articleSection,
    articleTags: config.articleTags,
    publishedTime: config.publishedTime,
    modifiedTime: config.modifiedTime,
  };
};

// Schema.org markup generators
export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": SITE_CONFIG.name,
  "url": SITE_CONFIG.url,
  "logo": `${SITE_CONFIG.url}/logo.png`,
  "description": SITE_CONFIG.description,
  "foundingDate": "2019",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN",
    "addressRegion": "Telangana",
    "addressLocality": "Hyderabad"
  },
  "contactPoint": {
    "@type": "ContactPoint",
  "telephone": "+91-7330975148",
    "contactType": "customer service",
    "email": "hello@trivesha.com"
  },
  "sameAs": [
    "https://linkedin.com/company/trivesha",
    "https://twitter.com/trivesha",
  "https://github.com/triveshatech"
  ],
  "service": [
    {
      "@type": "Service",
      "name": "Web Development",
      "description": "Custom web development solutions"
    },
    {
      "@type": "Service", 
      "name": "Mobile App Development",
      "description": "iOS and Android app development"
    },
    {
      "@type": "Service",
      "name": "UI/UX Design",
      "description": "User interface and experience design"
    }
  ]
});

export const generateLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": SITE_CONFIG.name,
  "url": SITE_CONFIG.url,
  "logo": `${SITE_CONFIG.url}/logo.png`,
  "description": SITE_CONFIG.description,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Tech Hub",
    "addressLocality": "Hyderabad",
    "addressRegion": "Telangana",
    "postalCode": "500001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "17.3850",
    "longitude": "78.4867"
  },
  "telephone": "+91-9876543210",
  "email": "hello@trivesha.com",
  "openingHours": "Mo-Fr 09:00-18:00",
  "priceRange": "$$",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "50"
  }
});

export const generateWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": SITE_CONFIG.name,
  "url": SITE_CONFIG.url,
  "description": SITE_CONFIG.description,
  "publisher": {
    "@type": "Organization",
    "name": SITE_CONFIG.name,
    "logo": {
      "@type": "ImageObject",
      "url": `${SITE_CONFIG.url}/logo.png`
    }
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${SITE_CONFIG.url}/search?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
});

export const generateArticleSchema = (config: {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedTime: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": config.title,
  "description": config.description,
  "url": config.url,
  "image": config.image,
  "datePublished": config.publishedTime,
  "dateModified": config.modifiedTime || config.publishedTime,
  "author": {
    "@type": "Person",
    "name": config.author || "Trivesha Team"
  },
  "publisher": {
    "@type": "Organization",
    "name": SITE_CONFIG.name,
    "logo": {
      "@type": "ImageObject",
      "url": `${SITE_CONFIG.url}/logo.png`
    }
  },
  "articleSection": config.section,
  "keywords": config.tags?.join(', ')
});

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `${SITE_CONFIG.url}${item.url}`
  }))
});

export const generateServiceSchema = (config: {
  name: string;
  description: string;
  url: string;
  image: string;
  price?: string;
  category: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": config.name,
  "description": config.description,
  "url": config.url,
  "image": config.image,
  "provider": {
    "@type": "Organization",
    "name": SITE_CONFIG.name,
    "url": SITE_CONFIG.url
  },
  "serviceType": config.category,
  "offers": config.price ? {
    "@type": "Offer",
    "price": config.price,
    "priceCurrency": "USD"
  } : undefined
});
