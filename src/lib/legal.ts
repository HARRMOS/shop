/** Informations légales — complétez les champs entre crochets avant mise en production. */
export const LEGAL = {
  siteName: process.env.NEXT_PUBLIC_SITE_NAME || "Noor Collection",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://noor.ummati.pro",
  email: "contact@noor-collection.fr",
  phone: "[Numéro de téléphone à compléter]",

  companyName: "[Raison sociale à compléter]",
  legalForm: "[Forme juridique — ex. SARL, SAS, auto-entrepreneur]",
  siret: "[SIRET à compléter]",
  rcs: "[RCS à compléter — ex. RCS Paris B XXX XXX XXX]",
  tva: "[N° TVA intracommunautaire à compléter]",
  capital: "[Capital social à compléter — le cas échéant]",
  address: "[Adresse complète du siège social à compléter]",
  director: "[Nom du directeur de publication à compléter]",

  hostName: "OVH SAS",
  hostAddress: "2 rue Kellermann, 59100 Roubaix, France",
  hostWebsite: "https://www.ovh.com",
  hostPhone: "+33 9 72 10 10 07",

  mediatorName: "[Nom du médiateur de la consommation à compléter]",
  mediatorUrl: "[URL du médiateur à compléter]",

  lastUpdated: "29 juin 2026",
} as const;
