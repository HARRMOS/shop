const testimonials = [
  {
    quote: "Des abayas d'une qualité exceptionnelle. Les tissus sont luxueux et la coupe est parfaite.",
    author: "Fatima B.",
    location: "Paris",
  },
  {
    quote: "Enfin une boutique qui comprend nos besoins. Mon mari adore son qamis, je recommande !",
    author: "Aïcha M.",
    location: "Lyon",
  },
  {
    quote: "Livraison rapide, emballage soigné. Les hijabs ne glissent pas, exactement ce que je cherchais.",
    author: "Sarah K.",
    location: "Marseille",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-cream border-y border-cream-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.35em] text-sage mb-3">Témoignages</p>
          <h2 className="font-display text-3xl sm:text-4xl text-charcoal">
            Ce qu&apos;elles en disent
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t) => (
            <blockquote
              key={t.author}
              className="bg-warm-white p-8 lg:p-10 border border-cream-dark flex flex-col"
            >
              <span className="font-display text-4xl text-gold/40 leading-none mb-4">&ldquo;</span>
              <p className="text-charcoal-light leading-relaxed flex-1 text-sm">{t.quote}</p>
              <footer className="mt-6 pt-6 border-t border-cream-dark">
                <p className="font-medium text-charcoal text-sm">{t.author}</p>
                <p className="text-xs text-charcoal-light/70 mt-0.5">{t.location}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
