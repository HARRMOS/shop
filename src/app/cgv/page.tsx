import { LegalLayout } from "@/components/LegalLayout";
import { LEGAL } from "@/lib/legal";

export const metadata = {
  title: "Conditions générales de vente",
  description: `Conditions générales de vente de ${LEGAL.siteName}.`,
};

export default function CgvPage() {
  return (
    <LegalLayout title="Conditions générales de vente (CGV)">
      <p>
        Les présentes Conditions Générales de Vente (ci-après « CGV ») régissent les ventes de produits
        effectuées sur le site <strong>{LEGAL.siteUrl}</strong> par <strong>{LEGAL.companyName}</strong>{" "}
        (ci-après « le Vendeur ») auprès de toute personne physique ou morale effectuant un achat (ci-après
        « le Client »).
      </p>

      <section>
        <h2>Article 1 — Objet et champ d&apos;application</h2>
        <p>
          Les CGV s&apos;appliquent à toute commande passée sur le site {LEGAL.siteName}, sans restriction ni
          réserve. Le Client déclare avoir pris connaissance des présentes CGV et les accepter avant la
          validation de sa commande. Le Vendeur se réserve le droit de modifier les CGV à tout moment ;
          les conditions applicables sont celles en vigueur à la date de la commande.
        </p>
      </section>

      <section>
        <h2>Article 2 — Produits</h2>
        <p>
          Les produits proposés sont des vêtements et accessoires de mode modeste. Les photographies et
          descriptions sont aussi fidèles que possible mais ne sauraient engager la responsabilité du Vendeur
          en cas d&apos;erreur ou d&apos;omission. En cas d&apos;indisponibilité après commande, le Client sera
          informé dans les meilleurs délais et pourra demander l&apos;annulation avec remboursement intégral.
        </p>
      </section>

      <section>
        <h2>Article 3 — Prix</h2>
        <ul>
          <li>Les prix sont indiqués en euros (€) toutes taxes comprises (TTC), hors frais de livraison.</li>
          <li>Les frais de port s&apos;élèvent à 5,90 € en dessous de 80 € d&apos;achat ; la livraison est gratuite à partir de 80 €.</li>
          <li>Le Vendeur se réserve le droit de modifier ses prix ; le prix facturé est celui affiché au moment de la commande.</li>
        </ul>
      </section>

      <section>
        <h2>Article 4 — Commande</h2>
        <p>Le processus de commande comprend les étapes suivantes :</p>
        <ol>
          <li>Sélection des articles et ajout au panier</li>
          <li>Saisie des coordonnées et de l&apos;adresse de livraison</li>
          <li>Acceptation des présentes CGV</li>
          <li>Validation et confirmation de la commande par email</li>
        </ol>
        <p>
          La vente n&apos;est définitive qu&apos;après confirmation par email et selon les modalités de paiement
          convenues. Le Vendeur se réserve le droit de refuser ou d&apos;annuler toute commande en cas de litige
          antérieur, de paiement irrégulier ou de demande manifestement anormale.
        </p>
      </section>

      <section>
        <h2>Article 5 — Paiement</h2>
        <p>
          Sauf indication contraire, le paiement s&apos;effectue à la livraison ou par virement bancaire selon
          les instructions communiquées par email après validation de la commande. Le Vendeur ne conserve pas
          les données bancaires du Client sur ses serveurs. En cas de retard de paiement, des pénalités
          pourront être appliquées conformément à la réglementation en vigueur.
        </p>
      </section>

      <section>
        <h2>Article 6 — Livraison</h2>
        <ul>
          <li>Expédition sous 24 à 48 heures ouvrées après confirmation de commande et réception du paiement le cas échéant.</li>
          <li>Livraison en France métropolitaine, Belgique, Suisse et Luxembourg.</li>
          <li>Les délais indicatifs ne constituent pas un engagement contractuel ; le Vendeur ne saurait être tenu responsable des retards imputables au transporteur.</li>
          <li>Le Client est tenu de vérifier l&apos;état du colis à réception et de signaler toute anomalie sous 48 heures.</li>
        </ul>
        <p>
          Pour plus de détails, consultez la page{" "}
          <a href="/livraison" className="text-sage hover:underline">Livraison &amp; retours</a>.
        </p>
      </section>

      <section>
        <h2>Article 7 — Droit de rétractation</h2>
        <p>
          Conformément aux articles L221-18 et suivants du Code de la consommation, le Client consommateur
          dispose d&apos;un délai de <strong>14 jours</strong> à compter de la réception des produits pour
          exercer son droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalités.
        </p>
        <p>Pour exercer ce droit, le Client doit :</p>
        <ul>
          <li>Notifier sa décision par email à {LEGAL.email} ou via son espace client</li>
          <li>Retourner les articles non portés, non lavés, dans leur emballage d&apos;origine avec étiquettes</li>
        </ul>
        <p>
          Les frais de retour sont à la charge du Client, sauf produit défectueux ou erreur du Vendeur.
          Le remboursement intervient dans un délai de 14 jours après réception et contrôle des articles.
        </p>
      </section>

      <section>
        <h2>Article 8 — Garanties</h2>
        <p>
          Le Client bénéficie de la garantie légale de conformité (articles L217-4 et suivants du Code de la
          consommation) et de la garantie contre les vices cachés (articles 1641 et suivants du Code civil).
          En cas de non-conformité, le Client peut demander la réparation, le remplacement ou le remboursement
          du produit.
        </p>
      </section>

      <section>
        <h2>Article 9 — Responsabilité</h2>
        <p>
          La responsabilité du Vendeur ne saurait être engagée en cas de mauvaise utilisation du produit,
          de non-respect des instructions d&apos;entretien, ou de force majeure. Le Vendeur ne pourra être
          tenu responsable des dommages indirects résultant de l&apos;achat ou de l&apos;utilisation des produits.
        </p>
      </section>

      <section>
        <h2>Article 10 — Données personnelles</h2>
        <p>
          Les données collectées lors de la commande sont traitées conformément au Règlement Général sur la
          Protection des Données (RGPD). Pour en savoir plus, consultez notre{" "}
          <a href="/confidentialite" className="text-sage hover:underline">politique de confidentialité</a>.
        </p>
      </section>

      <section>
        <h2>Article 11 — Médiation et litiges</h2>
        <p>
          Conformément à l&apos;article L612-1 du Code de la consommation, le Client peut recourir gratuitement
          à un médiateur de la consommation en vue de la résolution amiable d&apos;un litige :{" "}
          <strong>{LEGAL.mediatorName}</strong> — {LEGAL.mediatorUrl}.
        </p>
        <p>
          À défaut de résolution amiable, les tribunaux français seront seuls compétents, sous réserve des
          dispositions légales impératives applicables aux consommateurs.
        </p>
      </section>

      <section>
        <h2>Article 12 — Contact</h2>
        <p>
          Pour toute question relative à une commande :<br />
          Email : {LEGAL.email}<br />
          Téléphone : {LEGAL.phone}<br />
          Adresse : {LEGAL.address}
        </p>
      </section>
    </LegalLayout>
  );
}
