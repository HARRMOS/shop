import Link from "next/link";
import { LEGAL } from "@/lib/legal";

interface LegalLayoutProps {
  title: string;
  children: React.ReactNode;
}

const legalNav = [
  { href: "/cgv", label: "CGV" },
  { href: "/cgu", label: "CGU" },
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Confidentialité" },
  { href: "/livraison", label: "Livraison & retours" },
];

export function LegalLayout({ title, children }: LegalLayoutProps) {
  return (
    <div className="py-8 lg:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl lg:text-4xl text-charcoal mb-2">{title}</h1>
        <p className="text-xs text-charcoal-light mb-8">
          Dernière mise à jour : {LEGAL.lastUpdated} — {LEGAL.siteName}
        </p>

        <nav className="flex flex-wrap gap-x-4 gap-y-2 mb-10 pb-6 border-b border-cream-dark text-xs uppercase tracking-widest">
          {legalNav.map((link) => (
            <Link key={link.href} href={link.href} className="text-sage hover:text-sage-dark transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="space-y-8 text-charcoal-light leading-relaxed text-sm [&_h2]:font-display [&_h2]:text-lg [&_h2]:text-charcoal [&_h2]:mb-3 [&_h2]:mt-6 [&_h3]:font-medium [&_h3]:text-charcoal [&_h3]:mb-2 [&_h3]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2">
          {children}
        </div>
      </div>
    </div>
  );
}
