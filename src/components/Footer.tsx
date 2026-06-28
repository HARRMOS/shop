import Link from "next/link";
import { Mail, Phone, Share2 } from "lucide-react";

const footerLinks = {
  boutique: [
    { href: "/collections/femme", label: "Collection Femme" },
    { href: "/collections/homme", label: "Collection Homme" },
    { href: "/boutique", label: "Tous les produits" },
  ],
  infos: [
    { href: "/a-propos", label: "À propos" },
    { href: "/livraison", label: "Livraison & retours" },
    { href: "/contact", label: "Contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="font-display text-2xl text-warm-white">
              Noor Collection
            </Link>
            <p className="mt-4 text-sm text-cream-dark leading-relaxed">
              Vêtements musulmans élégants et modestes pour homme et femme.
              Qualité premium, style intemporel.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-dark hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <Share2 size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest text-gold mb-4">Boutique</h3>
            <ul className="space-y-3">
              {footerLinks.boutique.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream-dark hover:text-warm-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest text-gold mb-4">Informations</h3>
            <ul className="space-y-3">
              {footerLinks.infos.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream-dark hover:text-warm-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest text-gold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-cream-dark">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-sage-light shrink-0" />
                <a href="mailto:contact@noor-collection.fr" className="hover:text-warm-white transition-colors">
                  contact@noor-collection.fr
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-sage-light shrink-0" />
                <span>+33 1 23 45 67 89</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-charcoal-light flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-cream-dark">
          <p>&copy; {new Date().getFullYear()} Noor Collection. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="hover:text-warm-white transition-colors">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="hover:text-warm-white transition-colors">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
