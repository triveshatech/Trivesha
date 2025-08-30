import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

const titles: Record<string, string> = {
  "web-design": "Web Design",
  "web-development": "Web Development",
  "backend-devops": "Backend & DevOps",
  "mobile-apps": "Mobile Apps",
  "games": "Games",
  "maintenance": "Maintenance",
  "domains-hosting": "Domains & Hosting",
};

export default function ServiceDetail() {
  const { slug = "service" } = useParams();
  const title = titles[slug] || "Service";
  const canonical = typeof window !== 'undefined' ? window.location.href : `/services/${slug}`;

  return (
    <main className="section">
      <Helmet>
        <title>{title} - Trivesha</title>
        <meta name="description" content={`${title} by Trivesha - deliverables, process, timeline, and pricing.`} />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <div className="container text-left">
        <h1 className="font-heading text-4xl mb-4">{title}</h1>
        <p className="text-muted-foreground">A reusable template page for service details.</p>
      </div>
    </main>
  );
}
