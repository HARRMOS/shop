import Image from "next/image";
import { images } from "@/lib/images";

export function Newsletter() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative hidden lg:block min-h-[420px]">
          <Image
            src={images.newsletter}
            alt="Femme portant un hijab"
            fill
            className="object-cover"
            sizes="50vw"
          />
        </div>

        <div className="bg-sage-dark text-warm-white px-6 sm:px-12 lg:px-16 py-16 lg:py-20 flex flex-col justify-center">
          <p className="text-gold-light text-xs uppercase tracking-[0.35em] mb-4">Newsletter</p>
          <h2 className="font-display text-3xl sm:text-4xl mb-4 leading-tight">
            −10% sur votre<br />première commande
          </h2>
          <p className="text-cream/75 text-sm leading-relaxed mb-8 max-w-sm">
            Inscrivez-vous pour recevoir nos nouveautés, offres exclusives
            et conseils pour porter vos tenues avec élégance.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md">
            <input
              type="email"
              placeholder="Votre email"
              className="flex-1 px-4 py-3.5 bg-warm-white/10 border border-warm-white/20 text-warm-white placeholder:text-cream/40 focus:outline-none focus:border-gold-light text-sm"
            />
            <button
              type="submit"
              className="px-8 py-3.5 bg-gold text-charcoal text-xs uppercase tracking-[0.2em] font-semibold hover:bg-gold-light transition-colors shrink-0"
            >
              S&apos;inscrire
            </button>
          </form>
          <p className="text-[10px] text-cream/40 mt-4">
            Pas de spam. Désinscription en un clic.
          </p>
        </div>
      </div>
    </section>
  );
}
