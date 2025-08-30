import { Helmet } from "react-helmet-async";

export default function ComingSoon() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '/coming-soon';
  return (
    <main className="section">
      <Helmet>
        <title>Coming Soon - Trivesha</title>
        <meta name="description" content="This page is coming soon." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <div className="container text-left">
        <h1 className="font-heading text-4xl mb-4">Coming Soon</h1>
        <p className="text-muted-foreground">We’re building this page. Check back shortly.</p>
      </div>
    </main>
  );
}
