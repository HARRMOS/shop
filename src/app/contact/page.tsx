export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="py-8 lg:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl lg:text-4xl text-charcoal mb-8">Contact</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4 text-charcoal-light">
            <p>Une question ? N&apos;hésitez pas à nous contacter.</p>
            <p>
              <strong className="text-charcoal">Email :</strong>{" "}
              <a href="mailto:contact@noor-collection.fr" className="text-sage hover:underline">
                contact@noor-collection.fr
              </a>
            </p>
            <p>
              <strong className="text-charcoal">Téléphone :</strong> +33 1 23 45 67 89
            </p>
            <p>
              <strong className="text-charcoal">Horaires :</strong> Lun–Ven, 9h–18h
            </p>
          </div>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Nom"
              className="w-full px-4 py-3 border border-cream-dark bg-warm-white focus:outline-none focus:border-sage text-sm"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-cream-dark bg-warm-white focus:outline-none focus:border-sage text-sm"
            />
            <textarea
              rows={4}
              placeholder="Votre message"
              className="w-full px-4 py-3 border border-cream-dark bg-warm-white focus:outline-none focus:border-sage text-sm resize-none"
            />
            <button
              type="submit"
              className="w-full bg-charcoal text-warm-white py-3 text-sm uppercase tracking-widest hover:bg-charcoal-light transition-colors"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
