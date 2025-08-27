import { Helmet } from "react-helmet-async";

export default function Testimonials() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '/testimonials';
  return (
    <main className="section">
      <Helmet>
        <title>Testimonials - Trivesha</title>
        <meta name="description" content="Client reviews and success stories." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <div className="container text-left">
        <h1 className="font-heading text-4xl mb-4">Testimonials</h1>
        <p className="text-muted-foreground">What our clients say about working with us.</p>
      </div>
    </main>
  );
}
