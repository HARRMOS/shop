import { LegalLayout } from "@/components/LegalLayout";
import { LEGAL } from "@/lib/legal";

export const metadata = {
  title: "Politique de confidentialité",
  description: `Politique de confidentialité et protection des données de ${LEGAL.siteName}.`,
};

export default function ConfidentialitePage() {
  return (
    <LegalLayout title="Politique de confidentialité">
      <p>
        {LEGAL.companyName} (ci-après « nous », « notre ») s&apos;engage à protéger la vie privée des
        utilisateurs du site <strong>{LEGAL.siteUrl}</strong>. La présente politique décrit comment nous
        collectons, utilisons et protégeons vos données personnelles, conformément au Règlement (UE)
        2016/679 (RGPD) et à la loi Informatique et Libertés.
      </p>

      <section>
        <h2>1. Responsable du traitement</h2>
        <p>
          <strong>{LEGAL.companyName}</strong><br />
          {LEGAL.address}<br />
          Email : {LEGAL.email}<br />
          Téléphone : {LEGAL.phone}
        </p>
      </section>

      <section>
        <h2>2. Données collectées</h2>
        <p>Nous collectons les données suivantes :</p>
        <ul>
          <li><strong>Commande :</strong> nom, prénom, email, téléphone, adresse de livraison, détails de commande</li>
          <li><strong>Compte client :</strong> email, historique de commandes, adresse enregistrée</li>
          <li><strong>Contact :</strong> nom, email, message</li>
          <li><strong>Remboursements :</strong> motif de demande, référence commande</li>
          <li><strong>Navigation :</strong> cookies techniques (panier), données de connexion (logs serveur)</li>
        </ul>
        <p>Nous ne collectons pas de données bancaires sur nos serveurs.</p>
      </section>

      <section>
        <h2>3. Finalités et bases légales</h2>
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-cream-dark">
              <th className="py-2 pr-4 font-medium text-charcoal">Finalité</th>
              <th className="py-2 font-medium text-charcoal">Base légale</th>
            </tr>
          </thead>
          <tbody className="text-charcoal-light">
            <tr className="border-b border-cream-dark">
              <td className="py-2 pr-4">Traitement et suivi des commandes</td>
              <td className="py-2">Exécution du contrat</td>
            </tr>
            <tr className="border-b border-cream-dark">
              <td className="py-2 pr-4">Emails de confirmation et suivi</td>
              <td className="py-2">Exécution du contrat</td>
            </tr>
            <tr className="border-b border-cream-dark">
              <td className="py-2 pr-4">Gestion des remboursements</td>
              <td className="py-2">Exécution du contrat / obligation légale</td>
            </tr>
            <tr className="border-b border-cream-dark">
              <td className="py-2 pr-4">Connexion espace client</td>
              <td className="py-2">Exécution du contrat</td>
            </tr>
            <tr className="border-b border-cream-dark">
              <td className="py-2 pr-4">Réponse aux messages contact</td>
              <td className="py-2">Intérêt légitime</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">Newsletter (si inscrit)</td>
              <td className="py-2">Consentement</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>4. Destinataires des données</h2>
        <p>Vos données peuvent être communiquées à :</p>
        <ul>
          <li>Notre hébergeur ({LEGAL.hostName}) pour le stockage technique</li>
          <li>Notre prestataire email (SMTP) pour l&apos;envoi des notifications</li>
          <li>Les transporteurs pour la livraison de vos colis</li>
          <li>Les autorités compétentes sur réquisition légale</li>
        </ul>
        <p>Nous ne vendons ni ne louons vos données personnelles à des tiers.</p>
      </section>

      <section>
        <h2>5. Durée de conservation</h2>
        <ul>
          <li><strong>Données de commande :</strong> 5 ans (obligations comptables et fiscales)</li>
          <li><strong>Compte client :</strong> 3 ans après la dernière activité</li>
          <li><strong>Messages contact :</strong> 2 ans</li>
          <li><strong>Tokens de connexion :</strong> 30 minutes</li>
          <li><strong>Logs techniques :</strong> 12 mois maximum</li>
        </ul>
      </section>

      <section>
        <h2>6. Vos droits</h2>
        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
        <ul>
          <li><strong>Accès</strong> — obtenir une copie de vos données</li>
          <li><strong>Rectification</strong> — corriger des données inexactes</li>
          <li><strong>Effacement</strong> — demander la suppression (sous réserve des obligations légales)</li>
          <li><strong>Limitation</strong> — restreindre le traitement dans certains cas</li>
          <li><strong>Portabilité</strong> — recevoir vos données dans un format structuré</li>
          <li><strong>Opposition</strong> — vous opposer au traitement fondé sur l&apos;intérêt légitime</li>
          <li><strong>Retrait du consentement</strong> — à tout moment pour les traitements basés sur le consentement</li>
        </ul>
        <p>
          Pour exercer vos droits : {LEGAL.email}. Nous répondrons sous 30 jours. Vous pouvez également
          introduire une réclamation auprès de la CNIL :{" "}
          <a href="https://www.cnil.fr" className="text-sage hover:underline" target="_blank" rel="noopener noreferrer">
            www.cnil.fr
          </a>
        </p>
      </section>

      <section>
        <h2>7. Cookies</h2>
        <p>Le site utilise les cookies suivants :</p>
        <ul>
          <li><strong>noor-cart</strong> (localStorage) — contenu du panier, durée : jusqu&apos;à suppression manuelle</li>
          <li><strong>noor_customer_session</strong> — session espace client, durée : 30 jours</li>
          <li><strong>noor_admin_session</strong> — session administration (administrateurs uniquement)</li>
        </ul>
        <p>
          Ces cookies sont strictement nécessaires au fonctionnement du site. Vous pouvez les supprimer
          via les paramètres de votre navigateur, ce qui peut affecter certaines fonctionnalités.
        </p>
      </section>

      <section>
        <h2>8. Sécurité</h2>
        <p>
          Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos
          données : connexion HTTPS, mots de passe sécurisés, accès restreint aux données, hébergement
          sécurisé chez {LEGAL.hostName}.
        </p>
      </section>

      <section>
        <h2>9. Transferts hors UE</h2>
        <p>
          Vos données sont hébergées au sein de l&apos;Union européenne. En cas de transfert vers un pays
          tiers, nous nous assurons que des garanties appropriées sont en place conformément au RGPD.
        </p>
      </section>

      <section>
        <h2>10. Modifications</h2>
        <p>
          Nous pouvons mettre à jour cette politique à tout moment. La date de dernière mise à jour figure
          en haut de cette page. Nous vous encourageons à la consulter régulièrement.
        </p>
      </section>
    </LegalLayout>
  );
}
