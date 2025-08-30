import { Helmet } from "react-helmet-async";
import { SITE_CONFIG, generateSEOConfig, SEOConfig } from "@/lib/seo";

interface SEOProps extends SEOConfig {
  children?: React.ReactNode;
  schemaMarkup?: object | object[];
}

export const SEO: React.FC<SEOProps> = ({ 
  children, 
  schemaMarkup,
  ...seoConfig 
}) => {
  const config = generateSEOConfig(seoConfig);
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{config.title}</title>
      <meta name="description" content={config.description} />
      <meta name="robots" content={config.robots} />
      <meta name="author" content={SITE_CONFIG.author} />
      <meta name="creator" content={SITE_CONFIG.creator} />
      <meta name="publisher" content={SITE_CONFIG.publisher} />
      <meta name="keywords" content={SITE_CONFIG.keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={config.canonical} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={config.ogType} />
      <meta property="og:title" content={config.title} />
      <meta property="og:description" content={config.description} />
      <meta property="og:url" content={config.canonical} />
      <meta property="og:site_name" content={SITE_CONFIG.name} />
      <meta property="og:locale" content={SITE_CONFIG.locale} />
      <meta property="og:image" content={config.ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={config.title} />
      
      {/* Article specific meta tags */}
      {config.ogType === 'article' && (
        <>
          {config.articleSection && (
            <meta property="article:section" content={config.articleSection} />
          )}
          {config.articleTags && config.articleTags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
          {config.publishedTime && (
            <meta property="article:published_time" content={config.publishedTime} />
          )}
          {config.modifiedTime && (
            <meta property="article:modified_time" content={config.modifiedTime} />
          )}
          <meta property="article:author" content={SITE_CONFIG.author} />
        </>
      )}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE_CONFIG.twitter} />
      <meta name="twitter:creator" content={SITE_CONFIG.twitter} />
      <meta name="twitter:title" content={config.title} />
      <meta name="twitter:description" content={config.description} />
      <meta name="twitter:image" content={config.ogImage} />
      <meta name="twitter:image:alt" content={config.title} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#14b8a6" />
      <meta name="msapplication-TileColor" content="#14b8a6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content={SITE_CONFIG.name} />
      
      {/* Verification Meta Tags */}
      {SITE_CONFIG.verification.google && (
        <meta name="google-site-verification" content={SITE_CONFIG.verification.google} />
      )}
      {SITE_CONFIG.verification.bing && (
        <meta name="msvalidate.01" content={SITE_CONFIG.verification.bing} />
      )}
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/favicon.png" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* Schema Markup */}
      {schemaMarkup && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(schemaMarkup) ? schemaMarkup : [schemaMarkup])}
        </script>
      )}
      
      {children}
    </Helmet>
  );
};

export default SEO;
