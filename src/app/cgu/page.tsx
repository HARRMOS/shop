import { LegalLayout } from "@/components/LegalLayout";
import { LEGAL } from "@/lib/legal";

export const metadata = {
  title: "Conditions générales d'utilisation",
  description: `Conditions générales d'utilisation du site ${LEGAL.siteName}.`,
};

export default function CguPage() {
  return (
    <LegalLayout title="Conditions générales d'utilisation (CGU)">
      <p>
        Les présentes Conditions Générales d&apos;Utilisation (ci-après « CGU ») définissent les modalités
        d&apos;accès et d&apos;utilisation du site <strong>{LEGAL.siteUrl}</strong> édité par{" "}
        <strong>{LEGAL.companyName}</strong> (ci-après « l&apos;Éditeur »). L&apos;utilisation du site
        implique l&apos;acceptation pleine et entière des présentes CGU.
      </p>

      <section>
        <h2>1. Accès au site</h2>
        <p>
          Le site est accessible gratuitement à tout utilisateur disposant d&apos;un accès à Internet.
          L&apos;Éditeur s&apos;efforce d&apos;assurer un accès continu au site mais peut suspendre,
          interrompre ou limiter l&apos;accès pour maintenance, mise à jour ou en cas de force majeure,
          sans obligation de préavis ni indemnisation.
        </p>
      </section>

      <section>
        <h2>2. Compte utilisateur</h2>
        <p>
          L&apos;accès à l&apos;espace client (« Mon compte ») se fait via un lien de connexion envoyé
          à l&apos;adresse email associée à une commande. L&apos;utilisateur est responsable de la
          confidentialité de ses accès et de toute activité effectuée depuis son compte. En cas de suspicion
          d&apos;usage frauduleux, contactez-nous immédiatement à {LEGAL.email}.
        </p>
      </section>

      <section>
        <h2>3. Utilisation autorisée</h2>
        <p>L&apos;utilisateur s&apos;engage à utiliser le site de manière loyale et conforme aux lois en vigueur. Il est notamment interdit de :</p>
        <ul>
          <li>Utiliser le site à des fins illicites, frauduleuses ou portant atteinte aux droits de tiers</li>
          <li>Tenter d&apos;accéder de manière non autorisée aux systèmes, données ou comptes d&apos;autrui</li>
          <li>Diffuser des contenus illicites, diffamatoires, injurieux ou contraires aux bonnes mœurs</li>
          <li>Copier, reproduire ou exploiter le contenu du site sans autorisation écrite préalable</li>
          <li>Utiliser des robots, scrapers ou outils automatisés pour extraire des données du site</li>
        </ul>
      </section>

      <section>
        <h2>4. Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble des éléments du site (textes, images, logos, graphismes, vidéos, structure,
          logiciels) est protégé par le droit de la propriété intellectuelle et appartient à l&apos;Éditeur
          ou à ses partenaires. Toute reproduction, représentation ou exploitation non autorisée constitue
          une contrefaçon sanctionnée par les articles L335-2 et suivants du Code de la propriété
          intellectuelle.
        </p>
      </section>

      <section>
        <h2>5. Contenu utilisateur</h2>
        <p>
          Les messages envoyés via le formulaire de contact ou les demandes de remboursement doivent rester
          courtois et pertinents. L&apos;Éditeur se réserve le droit de supprimer tout contenu inapproprié
          et de refuser l&apos;accès au site en cas de manquement grave aux présentes CGU.
        </p>
      </section>

      <section>
        <h2>6. Liens hypertextes</h2>
        <p>
          Le site peut contenir des liens vers des sites tiers. L&apos;Éditeur n&apos;exerce aucun contrôle
          sur ces sites et décline toute responsabilité quant à leur contenu ou leurs pratiques. La création
          de liens vers le site est autorisée sous réserve qu&apos;ils ne portent pas atteinte à l&apos;image
          de {LEGAL.siteName} et qu&apos;ils ouvrent le site dans une nouvelle fenêtre.
        </p>
      </section>

      <section>
        <h2>7. Limitation de responsabilité</h2>
        <p>
          L&apos;Éditeur met tout en œuvre pour fournir des informations exactes et à jour, mais ne garantit
          pas l&apos;absence d&apos;erreurs ou d&apos;omissions. L&apos;utilisation du site se fait sous sa
          seule responsabilité. L&apos;Éditeur ne saurait être tenu responsable des dommages directs ou
          indirects résultant de l&apos;accès ou de l&apos;impossibilité d&apos;accéder au site.
        </p>
      </section>

      <section>
        <h2>8. Données personnelles et cookies</h2>
        <p>
          Le traitement des données personnelles est décrit dans notre{" "}
          <a href="/confidentialite" className="text-sage hover:underline">politique de confidentialité</a>.
          Le site utilise des cookies strictement nécessaires au fonctionnement (panier, session) et,
          le cas échéant, des cookies analytiques soumis à votre consentement.
        </p>
      </section>

      <section>
        <h2>9. Ventes en ligne</h2>
        <p>
          Les achats effectués sur le site sont soumis aux{" "}
          <a href="/cgv" className="text-sage hover:underline">Conditions Générales de Vente (CGV)</a>,
          qui prévalent pour toute relation commerciale.
        </p>
      </section>

      <section>
        <h2>10. Modification des CGU</h2>
        <p>
          L&apos;Éditeur se réserve le droit de modifier les présentes CGU à tout moment. Les CGU
          applicables sont celles en vigueur à la date de consultation du site. Il est conseillé de les
          consulter régulièrement.
        </p>
      </section>

      <section>
        <h2>11. Droit applicable</h2>
        <p>
          Les présentes CGU sont soumises au droit français. En cas de litige, et après tentative de
          résolution amiable, les tribunaux compétents seront ceux du ressort du siège social de
          l&apos;Éditeur, sous réserve des règles impératives de protection des consommateurs.
        </p>
      </section>

      <section>
        <h2>12. Contact</h2>
        <p>
          {LEGAL.companyName} — {LEGAL.address}<br />
          Email : {LEGAL.email} — Tél. : {LEGAL.phone}
        </p>
      </section>
    </LegalLayout>
  );
}
