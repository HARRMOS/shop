/** Images Unsplash — mode modeste / vêtements musulmans (libres de droits) */
const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=85&auto=format&fit=crop`;

export const images = {
  hero: u("1578507435314-e39e7852eddd", 1920),
  heroSecondary: u("1578507435314-e39e7852eddd", 1200),
  brandStory: u("1522219406764-db207f1f7640", 1400),

  collections: {
    femme: u("1561442748-c50715dc32f6", 1200),
    homme: u("1627062422492-d076f4b6793a", 1200),
  },

  categories: {
    abayas: u("1643770515578-66328182d332", 800),
    hijabs: u("1594048225077-fe0c6e35d822", 800),
    jilbabs: u("1546246380-70f857cf5310", 800),
    qamis: u("1578507435314-e39e7852eddd", 800),
    thobes: u("1619974255488-59e69c33fdb7", 800),
    ensembles: u("1626497361649-81cc097e9bfd", 800),
  },

  products: {
    abayaNour: u("1772474542630-5f5822ca8421"),
    abayaMedina: u("1561442748-c50715dc32f6"),
    abayaDaily: u("1546246380-70f857cf5310"),
    hijabMousseline: u("1594048225077-fe0c6e35d822"),
    hijabJersey: u("1536814294574-df49a3cc97bd"),
    jilbabAmira: u("1768830985958-e8d3a93d3f14"),
    ensembleLayla: u("1626497361649-81cc097e9bfd"),
    qamisNoor: u("1578507435314-e39e7852eddd"),
    qamisPremium: u("1619974255488-59e69c33fdb7"),
    thobeEmirati: u("1627062422492-d076f4b6793a"),
    sarouelAladin: u("1666162174698-21b2f82f7ee9"),
    ensembleJumuah: u("1712215150388-0c61e8b60a1a", 1200),
  },

  newsletter: u("1536814294574-df49a3cc97bd", 1400),
} as const;
