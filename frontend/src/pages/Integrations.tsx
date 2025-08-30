import { Helmet } from "react-helmet-async";

export default function Integrations() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '/integrations';
  return (
    <main className="section">
      <Helmet>
        <title>Integrations - Trivesha</title>
        <meta name="description" content="Partner tools and integrations we support." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <div className="container text-left">
        <h1 className="font-heading text-4xl mb-4">Integrations & Partners</h1>
        <p className="text-muted-foreground">We work with modern tools and services.</p>
      </div>
    </main>
  );
}
