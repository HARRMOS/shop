export const metadata = {
  title: "Livraison & retours",
};

export default function ShippingPage() {
  return (
    <div className="py-8 lg:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl lg:text-4xl text-charcoal mb-8">Livraison & retours</h1>
        <div className="space-y-8 text-charcoal-light leading-relaxed">
          <section>
            <h2 className="font-display text-xl text-charcoal mb-3">Livraison</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Expédition sous 24-48h ouvrées</li>
              <li>Livraison gratuite dès 80€ d&apos;achat</li>
              <li>Frais de port : 5,90€ en dessous de 80€</li>
              <li>Livraison en France métropolitaine, Belgique, Suisse et Luxembourg</li>
              <li>Suivi de colis par email</li>
            </ul>
          </section>
          <section>
            <h2 className="font-display text-xl text-charcoal mb-3">Retours</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>14 jours pour retourner un article non porté</li>
              <li>Étiquettes et emballage d&apos;origine requis</li>
              <li>Remboursement sous 7 jours après réception</li>
              <li>Contact : contact@noor-collection.fr</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
