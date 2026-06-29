import { LegalLayout } from "@/components/LegalLayout";
import { LEGAL } from "@/lib/legal";

export const metadata = {
  title: "Mentions légales",
  description: `Mentions légales du site ${LEGAL.siteName}.`,
};

export default function MentionsLegalesPage() {
  return (
    <LegalLayout title="Mentions légales">
      <p>
        Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour
        la Confiance dans l&apos;Économie Numérique (LCEN), les présentes mentions légales s&apos;appliquent
        au site <strong>{LEGAL.siteUrl}</strong>.
      </p>

      <section>
        <h2>1. Éditeur du site</h2>
        <ul>
          <li><strong>Raison sociale :</strong> {LEGAL.companyName}</li>
          <li><strong>Forme juridique :</strong> {LEGAL.legalForm}</li>
          <li><strong>Capital social :</strong> {LEGAL.capital}</li>
          <li><strong>Siège social :</strong> {LEGAL.address}</li>
          <li><strong>SIRET :</strong> {LEGAL.siret}</li>
          <li><strong>RCS :</strong> {LEGAL.rcs}</li>
          <li><strong>N° TVA intracommunautaire :</strong> {LEGAL.tva}</li>
          <li><strong>Email :</strong> {LEGAL.email}</li>
          <li><strong>Téléphone :</strong> {LEGAL.phone}</li>
          <li><strong>Directeur de la publication :</strong> {LEGAL.director}</li>
        </ul>
      </section>

      <section>
        <h2>2. Hébergeur</h2>
        <ul>
          <li><strong>Raison sociale :</strong> {LEGAL.hostName}</li>
          <li><strong>Adresse :</strong> {LEGAL.hostAddress}</li>
          <li><strong>Site web :</strong> {LEGAL.hostWebsite}</li>
          <li><strong>Téléphone :</strong> {LEGAL.hostPhone}</li>
        </ul>
      </section>

      <section>
        <h2>3. Activité</h2>
        <p>
          {LEGAL.siteName} est une boutique en ligne spécialisée dans la vente de vêtements et accessoires
          de mode modeste pour homme et femme. L&apos;activité consiste en la commercialisation de produits
          textiles via internet, avec livraison en France et dans certains pays limitrophes.
        </p>
      </section>

      <section>
        <h2>4. Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble du contenu du site (structure, textes, logos, images, vidéos, bases de données)
          est la propriété exclusive de {LEGAL.companyName} ou de ses ayants droit. Toute reproduction,
          distribution ou exploitation non autorisée est interdite et constitue une contrefaçon.
        </p>
      </section>

      <section>
        <h2>5. Limitation de responsabilité</h2>
        <p>
          L&apos;éditeur ne saurait être tenu responsable des dommages directs ou indirects causés au
          matériel de l&apos;utilisateur lors de l&apos;accès au site, résultant soit de l&apos;utilisation
          d&apos;un matériel ne répondant pas aux spécifications requises, soit de l&apos;apparition d&apos;un
          bug ou d&apos;une incompatibilité.
        </p>
      </section>

      <section>
        <h2>6. Liens hypertextes</h2>
        <p>
          Le site peut contenir des liens vers d&apos;autres sites. L&apos;éditeur n&apos;exerce aucun
          contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
        </p>
      </section>

      <section>
        <h2>7. Droit applicable</h2>
        <p>
          Le site et les présentes mentions légales sont régis par le droit français. Tout litige relatif
          à l&apos;utilisation du site sera soumis à la compétence des tribunaux français.
        </p>
      </section>

      <section>
        <h2>8. Documents complémentaires</h2>
        <ul>
          <li><a href="/cgv" className="text-sage hover:underline">Conditions générales de vente (CGV)</a></li>
          <li><a href="/cgu" className="text-sage hover:underline">Conditions générales d&apos;utilisation (CGU)</a></li>
          <li><a href="/confidentialite" className="text-sage hover:underline">Politique de confidentialité</a></li>
          <li><a href="/livraison" className="text-sage hover:underline">Livraison &amp; retours</a></li>
        </ul>
      </section>
    </LegalLayout>
  );
}
