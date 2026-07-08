/* MediFiche — DERMATO_DB */

'use strict';

const DERMATO_DB = [

  // ══════════════════════════════
  //  PEAUX SÈCHES & ATOPIQUES
  // ══════════════════════════════
  {
    id: 'd1', slug: 'xerose', nom: 'Xérose cutanée (peau très sèche)',
    categorie: 'seche', icone: '/icons/dermatologie/xerose - peau seche.svg',
    description: 'Peau sèche sévère avec inconfort, tiraillements et squames. Souvent chronique, s\'aggrave en hiver avec le chauffage et le froid.',
    symptomes: ['Tiraillements après lavage', 'Squames visibles', 'Démangeaisons modérées', 'Peau terne et rugueuse', 'Crevasses aux mains et pieds'],
    conseils: [
      'Appliquer l\'émollient sur peau encore légèrement humide après la douche (dans les 3 min).',
      'Douche courte à l\'eau tiède (max 35°C) — l\'eau chaude détruit le film hydrolipidique.',
      'Savon surgras ou syndet sans parfum uniquement — jamais de savon alcalin.',
      'Humidifier l\'air intérieur en hiver.',
      'Boire 1,5L d\'eau par jour minimum.',
      'Porter des vêtements en coton doux, éviter la laine directement sur la peau.',
    ],
    eviter: [
      'Produits contenant alcool, parfums, conservateurs irritants.',
      'Eau trop chaude ou bains prolongés.',
      'Savons détergents classiques.',
      'Exposition prolongée au froid ou au vent sans protection.',
    ],
    contre_indications: [
      'Rétinoïdes topiques et exfoliants acides : à éviter ou espacer, ils aggravent la sécheresse et l\'irritation sur peau xérosique.',
      'Corticoïdes topiques au long cours sans avis médical : risque d\'atrophie cutanée, ne traitent pas la cause de la sécheresse.',
      'Allergie connue à un excipient (parfum, lanoline) : vérifier la composition avant tout nouvel émollient.',
    ],
    signes_alerte: [
      'Sécheresse cutanée brutale et diffuse, inexpliquée → rechercher une cause sous-jacente (hypothyroïdie, diabète, insuffisance rénale) : orienter vers un médecin.',
      'Fissures profondes, surinfection (rougeur chaude, pus, traînée rouge) → consultation médicale.',
      'Xérose ne répondant pas aux émollients après plusieurs semaines d\'application régulière → avis dermatologique.',
    ],
    regime: [
      'Bonne hydratation (> 1,5L d\'eau/jour) — n\'hydrate pas directement la peau mais soutient l\'équilibre cutané général.',
      'Acides gras essentiels (oméga-3 : poissons gras, noix, graines de lin) favorisant la fonction barrière cutanée.',
      'Limiter l\'alcool et le tabac, facteurs aggravants de la sécheresse cutanée.',
    ],
    produits: [
      {nom: 'Lipikar Baume AP+M (La Roche-Posay)', usage: 'Émollient de référence peau très sèche — corps', texture: 'Baume riche', gamme: 'La Roche-Posay'},
      {nom: 'Exomega Control Émollient (A-Derma)', usage: 'Peau atopique sèche adulte/enfant — quotidien', texture: 'Émollient fluide', gamme: 'A-Derma'},
      {nom: 'Neovadiol Peri-Menopause (Vichy)', usage: 'Xérose cutanée peau mature — confort intense', texture: 'Crème riche', gamme: 'Vichy'},
      {nom: 'Atoderm Intensive Baume (Bioderma)', usage: 'Peaux très sèches à tendance atopique', texture: 'Baume', gamme: 'Bioderma'},
      {nom: 'Cold Cream Corps (Avène)', usage: 'Protection contre le froid et sécheresse', texture: 'Crème protectrice', gamme: 'Avène'},
      {nom: '🌿 Huile de coco vierge + aloe vera', usage: 'Alternative naturelle — beurre karité mélangé à HE lavande diluée', texture: 'Naturel', gamme: 'Naturel'},
    ],
    sources: []
  },

  {
    id: 'd2', slug: 'eczema-mains', nom: 'Eczéma des mains',
    categorie: 'seche', icone: '/icons/dermatologie/eczema-des-mains.svg',
    description: 'Dermatite chronique des mains avec poussées inflammatoires. Très fréquent chez les professionnels de santé et métiers en contact avec l\'eau.',
    symptomes: ['Rougeurs et vésicules prurigineuses', 'Fissures douloureuses', 'Desquamation', 'Poussées déclenchées par contact eau/savon/produits'],
    conseils: [
      'Crème protectrice avant les travaux humides ou le port de gants.',
      'Gants en coton sous les gants en latex/nitrile pour les professions exposées.',
      'Dermocorticoïde de classe 3 sur les mains lors des poussées — les mains tolèrent bien.',
      'Crème émolliente après chaque lavage des mains.',
      'Éviter les irritants professionnels identifiés.',
    ],
    eviter: [
      'Gels hydroalcooliques répétés sans réhydratation.',
      'Détergents ménagers sans gants.',
      'Bijoux en nickel (allergène fréquent).',
      'Se laver les mains à l\'eau trop chaude.',
    ],
    contre_indications: [
      'Dermocorticoïdes : usage limité dans le temps (max 2-3 semaines en poussée), pas en continu sans avis médical (risque d\'atrophie cutanée fine).',
      'Lésions surinfectées : éviter l\'application de corticoïde local avant traitement de l\'infection.',
      'Allergie de contact suspectée (nickel, conservateurs) : éviction de l\'allergène avant tout traitement symptomatique.',
    ],
    signes_alerte: [
      'Surinfection (pus, croûtes jaunâtres, douleur pulsatile) → consultation médicale, antibiothérapie possible.',
      'Eczéma des mains ne répondant pas aux dermocorticoïdes après 2-3 semaines → avis dermatologique, recherche d\'allergène professionnel.',
      'Extension rapide, fièvre, altération de l\'état général → médecin.',
    ],
    regime: [
      'Aucune restriction alimentaire spécifique démontrée ; bonne hydratation générale recommandée.',
      'Limiter l\'alcool, facteur favorisant des poussées inflammatoires chez certains patients.',
    ],
    produits: [
      {nom: 'Cicaplast Mains (La Roche-Posay)', usage: 'Réparation intense mains très abîmées', texture: 'Crème mains', gamme: 'La Roche-Posay'},
      {nom: 'Epitheliale AH Mains (A-Derma)', usage: 'Mains sèches et crevassées — réparation', texture: 'Crème concentrée', gamme: 'A-Derma'},
      {nom: 'Nutrilogie 1 Mains (Vichy)', usage: 'Mains sèches à très sèches — nutrition', texture: 'Crème riche', gamme: 'Vichy'},
      {nom: 'Atoderm Mains (Bioderma)', usage: 'Réparation barrière cutanée mains — eczéma', texture: 'Crème intensive', gamme: 'Bioderma'},
      {nom: 'Cicalfate+ Mains (Avène)', usage: 'Crevasses et fissures profondes mains', texture: 'Crème réparatrice', gamme: 'Avène'},
      {nom: '🌿 Beurre de karité pur + HE camomille', usage: 'Alternative naturelle — massage mains soir', texture: 'Naturel', gamme: 'Naturel'},
    ],
    sources: [{label: 'Dermato-info — Eczéma de contact', url: 'https://dermato-info.fr/les-maladies-de-la-peau/les-maladies-connaitre-par-tranches-dages', date: 'consulté 07/2026'}, {label: 'Ameli — Eczéma de contact', url: 'https://www.ameli.fr/assure/sante/themes/eczema-contact', date: 'consulté 07/2026'}]
  },

  {
    id: 'd3', slug: 'eczema-atopique', nom: 'Eczéma atopique',
    categorie: 'seche', icone: '/icons/dermatologie/eczema-atopique.svg',
    description: 'Dermatite atopique chronique avec poussées. Touche 15-20% des enfants, souvent amélioration à l\'adolescence mais persistance possible chez l\'adulte.',
    symptomes: ['Plaques rouges prurigineuses aux plis', 'Peau sèche généralisée', 'Vésicules suintantes lors des poussées', 'Altération du sommeil par le prurit'],
    conseils: [
      'Émollient QUOTIDIEN sur tout le corps, même hors crise — c\'est la base du traitement.',
      'Dermocorticoïde sur les lésions uniquement, pas sur peau saine.',
      'Bain ou douche courte à l\'eau tiède avec pain surgras.',
      'Appliquer l\'émollient dans les 3 minutes après le bain.',
      'Identifier et éviter les facteurs déclenchants (acariens, stress, transpiration).',
      'Couper les ongles courts pour limiter les lésions de grattage.',
    ],
    eviter: [
      'Produits parfumés ou avec conservateurs allergisants.',
      'Textiles synthétiques ou laine sur la peau.',
      'Eau trop chaude — aggrave le prurit.',
      'Tabac passif — facteur aggravant démontré.',
    ],
    contre_indications: [
      'Dermocorticoïdes : respecter la classe et la durée prescrites, jamais sur le visage sans avis médical (classe faible uniquement si besoin).',
      'Lésions suintantes ou croûteuses évoquant une surinfection : avis médical avant dermocorticoïde.',
      'Vaccination récente (varicelle, etc.) : éviter l\'application de corticoïde sur la zone vaccinale dans les jours suivants.',
    ],
    signes_alerte: [
      'Surinfection bactérienne (croûtes mielleuses, pus, fièvre) → consultation rapide.',
      'Eczéma herpétique (vésicules groupées, douleur, fièvre) → urgence dermatologique.',
      'Poussées très fréquentes ou invalidantes malgré traitement bien conduit → avis dermatologique pour réévaluation thérapeutique.',
    ],
    regime: [
      'Pas de régime d\'exclusion alimentaire systématique sans diagnostic d\'allergie confirmé (risque de carences inutiles chez l\'enfant).',
      'Bonne hydratation générale ; éviter le tabac (passif inclus), facteur aggravant démontré.',
    ],
    produits: [
      {nom: 'Lipikar Syndet AP+ (La Roche-Posay)', usage: 'Nettoyant crème corps/visage peaux atopiques', texture: 'Syndet', gamme: 'La Roche-Posay'},
      {nom: 'Exomega Control Crème (A-Derma)', usage: 'Émollient de référence DA adulte/enfant', texture: 'Crème', gamme: 'A-Derma'},
      {nom: 'Eau Thermale apaisante (Vichy)', usage: 'Brumisation apaisante lors des poussées', texture: 'Spray', gamme: 'Vichy'},
      {nom: 'Atoderm Intensive Baume (Bioderma)', usage: 'Baume de fond peau atopique sèche', texture: 'Baume', gamme: 'Bioderma'},
      {nom: 'Trixéra+ Selectiose (Avène)', usage: 'Émollient peau atopique — tolérance maximale', texture: 'Émollient', gamme: 'Avène'},
      {nom: '🌿 Huile de bourrache + HE camomille romaine', usage: 'Alternative naturelle — restaure la barrière cutanée', texture: 'Naturel', gamme: 'Naturel'},
    ],
    sources: [{label: 'Dermato-info — Dermatite atopique', url: 'https://dermato-info.fr/les-maladies-de-la-peau/dermatite-atopique', date: 'MàJ 2025 · consulté 07/2026'}, {label: 'Ameli — Dermatite atopique', url: 'https://www.ameli.fr/assure/sante/themes/eczema-atopique', date: 'consulté 07/2026'}]
  },

  // ══════════════════════════════
  //  PEAUX GRASSES & ACNÉ
  // ══════════════════════════════
  {
    id: 'd4', slug: 'acne-legere', nom: 'Acné légère à modérée',
    categorie: 'grasse', icone: '/icons/dermatologie/acne.svg',
    description: 'Dermatose chronique du follicule pilosébacé. Points noirs, points blancs et papulo-pustules. Très fréquente à l\'adolescence mais peut toucher l\'adulte.',
    symptomes: ['Comédons ouverts (points noirs) et fermés (points blancs)', 'Papules et pustules inflammatoires', 'Peau grasse et brillante', 'Pores dilatés'],
    conseils: [
      'Nettoyage doux matin et soir avec gel nettoyant non comédogène.',
      'Ne jamais percer les boutons (risque cicatrices et surinfection).',
      'Crème hydratante non comédogène obligatoire même sur peau grasse.',
      'Photoprotection indispensable si traitement par rétinoïdes ou peroxyde de benzoyle.',
      'Régularité du traitement local — l\'effet se voit après 6-8 semaines.',
      'Changer la taie d\'oreiller 2x/semaine.',
    ],
    eviter: [
      'Produits comédogènes (huile de coco, beurre de karité pur sur le visage).',
      'Maquillage occlusif non comédogène.',
      'Toucher le visage avec les mains.',
      'Exposition solaire sans protection.',
    ],
    contre_indications: [
      'Rétinoïdes topiques et peroxyde de benzoyle : contre-indiqués en cas de grossesse ou désir de grossesse (rétinoïdes) ; photosensibilisants — protection solaire obligatoire.',
      'Association de plusieurs actifs irritants (rétinoïde + peroxyde de benzoyle + acide salicylique) sans espacement : risque d\'irritation cutanée importante.',
      'Acné chez la femme avec signes d\'hyperandrogénie (hirsutisme, troubles du cycle) : orienter vers un médecin, ne pas traiter en automédication seule.',
    ],
    signes_alerte: [
      'Acné sévère, nodulo-kystique ou laissant des cicatrices → consultation dermatologique pour traitement systémique.',
      'Absence d\'amélioration après 2-3 mois de traitement local bien conduit → avis médical.',
      'Acné brutale chez l\'adulte avec autres signes (pilosité excessive, troubles menstruels) → recherche de cause hormonale.',
    ],
    regime: [
      'Limiter les aliments à index glycémique élevé (sucres rapides) : lien démontré avec l\'aggravation de l\'acné chez certains patients.',
      'Produits laitiers : lien possible mais non systématique, pas d\'éviction généralisée recommandée.',
    ],
    produits: [
      {nom: 'Effaclar Duo+ (La Roche-Posay)', usage: 'Soin anti-acné de référence officine', texture: 'Crème légère', gamme: 'La Roche-Posay'},
      {nom: 'Cleanance Expert (A-Derma)', usage: 'Soin global peaux acnéiques — séborégulateur', texture: 'Émulsion', gamme: 'A-Derma'},
      {nom: 'Normaderm Phytosolution (Vichy)', usage: 'Hydratation + action anti-imperfections 24h', texture: 'Gel-crème', gamme: 'Vichy'},
      {nom: 'Sébium Mat (Bioderma)', usage: 'Matifiant + resserrement des pores', texture: 'Soin matifiant', gamme: 'Bioderma'},
      {nom: 'Cleanance Comedomed (Avène)', usage: 'Concentré anti-imperfections comédons', texture: 'Concentré', gamme: 'Avène'},
      {nom: '🌿 Argile verte + HE tea tree diluée', usage: 'Alternative naturelle — masque 1x/semaine', texture: 'Naturel', gamme: 'Naturel'},
    ],
    sources: [{label: 'Dermato-info — Acné', url: 'https://dermato-info.fr/les-maladies-de-la-peau/acne', date: 'consulté 07/2026'}, {label: 'Ameli — Acné', url: 'https://www.ameli.fr/assure/sante/themes/acne', date: 'consulté 07/2026'}]
  },

  {
    id: 'd5', slug: 'dermite-seborrheique', nom: 'Dermite séborrhéique',
    categorie: 'grasse', icone: '/icons/dermatologie/dermite-seborrheique.svg',
    description: 'Affection chronique par prolifération de Malassezia (levure). Plaques rouges squameuses sur les zones séborrhéiques : cuir chevelu, sillons naso-labiaux, sourcils.',
    symptomes: ['Pellicules grasses jaunâtres', 'Rougeurs sur sillons naso-labiaux et sourcils', 'Prurit modéré', 'Squames grasses au cuir chevelu', 'Récidives fréquentes'],
    conseils: [
      'Shampooing antipelliculaire au moins 2x/semaine lors des poussées.',
      'Laisser poser le shampooing actif 5 minutes avant de rincer.',
      'Crème antifongique visage lors des poussées.',
      'En entretien : shampooing doux régulier et crème émolliente non grasse.',
      'Gestion du stress — facteur déclenchant majeur.',
    ],
    eviter: [
      'Produits gras sur le visage (aggrave la prolifération de Malassezia).',
      'Alcool topique (irrite et aggrave).',
      'Arrêter le traitement trop tôt — la DS récidive.',
    ],
    contre_indications: [
      'Antifongiques topiques (kétoconazole) : usage ponctuel, pas en continu prolongé sans avis médical.',
      'Dermocorticoïdes sur le visage : usage bref uniquement, jamais en traitement de fond (risque de rosacée cortico-induite).',
      'Contexte d\'immunodépression (VIH, etc.) où la DS est volontiers sévère et récidivante : orienter vers un médecin.',
    ],
    signes_alerte: [
      'Extension brutale et sévère, résistance au traitement habituel → rechercher une cause sous-jacente (immunodépression), avis médical.',
      'Surinfection (suintement, croûtes, douleur) → consultation.',
      'DS du nourrisson étendue ou associée à d\'autres symptômes → avis pédiatrique.',
    ],
    regime: [
      'Pas de lien alimentaire démontré ; gestion du stress recommandée car facteur déclenchant reconnu.',
      'Limiter l\'alcool, facteur aggravant possible.',
    ],
    produits: [
      {nom: 'Kerium DS shampooing (La Roche-Posay)', usage: 'Cuir chevelu DS — poussées actives', texture: 'Shampooing actif', gamme: 'La Roche-Posay'},
      {nom: 'Squanorm Pellicules grasses (A-Derma)', usage: 'Pellicules grasses — traitement curatif', texture: 'Shampooing', gamme: 'A-Derma'},
      {nom: 'Dercos Anti-Pelliculaire DS (Vichy)', usage: 'Traitement pellicules grasses et sèches', texture: 'Shampooing', gamme: 'Vichy'},
      {nom: 'Séborrheïd crème (Bioderma)', usage: 'Crème visage dermite séborrhéique', texture: 'Crème légère', gamme: 'Bioderma'},
      {nom: 'Cicalfate+ DS crème (Avène)', usage: 'Zones rouges et squameuses du visage', texture: 'Crème apaisante', gamme: 'Avène'},
      {nom: '🌿 HE tea tree + HE lavande dans huile jojoba', usage: 'Alternative naturelle — application locale zones touchées', texture: 'Naturel', gamme: 'Naturel'},
    ],
    sources: [{label: 'Dermato-info — Dermite séborrhéique', url: 'https://dermato-info.fr/les-maladies-de-la-peau/dermite-seborrheique', date: 'consulté 07/2026'}, {label: 'Ameli — Pellicules et dermite séborrhéique', url: 'https://www.ameli.fr/assure/sante/themes/dermatite-seborrheique', date: 'consulté 07/2026'}]
  },

  // ══════════════════════════════
  //  PEAUX SENSIBLES & ROUGEURS
  // ══════════════════════════════
  {
    id: 'd6', slug: 'rosacee', nom: 'Rosacée',
    categorie: 'sensible', icone: '/icons/dermatologie/rosacee.svg',
    description: 'Affection chronique vasculaire du visage avec rougeurs persistantes, couperose et parfois papulo-pustules. Touche surtout les peaux claires 30-50 ans.',
    symptomes: ['Flush (bouffées de chaleur au visage)', 'Érythrose persistante des joues et nez', 'Télangiectasies (couperose)', 'Papules et pustules (forme papulo-pustuleuse)', 'Hypersensibilité cutanée'],
    conseils: [
      'Nettoyage avec eau thermale et émollient très doux — jamais de gommage.',
      'Photoprotection SPF 50+ quotidienne — le soleil est le déclencheur n°1.',
      'Éviter les variations de température brutales (sport intense, bains chauds, sauna).',
      'Fond de teint vert correcteur anti-rougeurs pour couvrir l\'érythrose.',
      'Tenir un journal des déclencheurs personnels.',
    ],
    eviter: [
      'Alcool — vasodilatateur puissant.',
      'Épices, boissons chaudes, aliments très chauds.',
      'Produits avec alcool, menthol, camphre, acides forts.',
      'Gommages et peelings agressifs.',
    ],
    contre_indications: [
      'Dermocorticoïdes : formellement à éviter sur la rosacée, ils aggravent la maladie et favorisent une dermite cortico-induite.',
      'Vasodilatateurs (certains traitements cardiovasculaires, alcool) : aggravent les flushs, sans être pour autant à arrêter sans avis médical.',
      'Cosmétiques irritants (acides, rétinoïdes forts) : à introduire progressivement et sous surveillance si besoin.',
    ],
    signes_alerte: [
      'Atteinte oculaire (yeux rouges, sensation de sable, photophobie) → rosacée oculaire, avis ophtalmologique.',
      'Épaississement du nez (rhinophyma) qui s\'installe → avis dermatologique pour prise en charge spécifique.',
      'Forme papulo-pustuleuse importante ne répondant pas aux soins locaux → consultation pour traitement systémique.',
    ],
    regime: [
      'Éviter l\'alcool et les plats très épicés, déclencheurs fréquents de flush.',
      'Limiter les boissons très chaudes (café, thé) qui favorisent la vasodilatation faciale.',
    ],
    produits: [
      {nom: 'Rosaliac AR riche (La Roche-Posay)', usage: 'Anti-rougeurs, renforcement paroi vasculaire', texture: 'Soin correcteur', gamme: 'La Roche-Posay'},
      {nom: 'Sensifine AR (A-Derma)', usage: 'Peau sensible sujette aux rougeurs chroniques', texture: 'Crème légère', gamme: 'A-Derma'},
      {nom: 'Normaderm Phytosolution rouge (Vichy)', usage: 'Anti-rougeurs + hydratation', texture: 'Soin correcteur', gamme: 'Vichy'},
      {nom: 'Sensibio AR (Bioderma)', usage: 'Soin anti-rougeurs peau sensible réactive', texture: 'Crème', gamme: 'Bioderma'},
      {nom: 'Antirougeurs jour SPF 30 (Avène)', usage: 'Hydratation + réduction rougeurs + protection', texture: 'Émulsion légère', gamme: 'Avène'},
      {nom: '🌿 Eau florale de camomille + aloe vera gel', usage: 'Alternative naturelle — brumisation apaisante', texture: 'Naturel', gamme: 'Naturel'},
    ],
    sources: [{label: 'Dermato-info — Rosacée', url: 'https://dermato-info.fr/les-maladies-de-la-peau/rosacee-0', date: 'consulté 07/2026'}, {label: 'Ameli — Couperose et rosacée', url: 'https://www.ameli.fr/assure/sante/themes/rosacee-couperose', date: 'consulté 07/2026'}]
  },

  {
    id: 'd7', slug: 'peau-sensible', nom: 'Peau sensible réactive',
    categorie: 'sensible', icone: '/icons/dermatologie/peau-sensible.svg',
    description: 'Peau à réactivité excessive aux stimuli physiques, chimiques ou environnementaux. Sensation de tiraillement, picotements et rougeurs fréquentes.',
    symptomes: ['Picotements et brûlures à l\'application de cosmétiques', 'Rougeurs réactives au froid/chaud/vent', 'Tiraillements fréquents', 'Réactions aux parfums et conservateurs'],
    conseils: [
      'Tester tout nouveau produit sur le poignet 48h avant application visage.',
      'Moins de produits, de meilleure qualité — simplifier la routine.',
      'Choisir formules hypoallergéniques sans parfum, sans alcool.',
      'Eau thermale comme base de soins.',
      'Photoprotection minérale mieux tolérée que chimique.',
    ],
    eviter: [
      'Parfums, huiles essentielles, alcool dénaturé dans les soins.',
      'Méthylisothiazolinone (MIT) — conservateur très allergisant.',
      'Acides en haute concentration (AHA, BHA).',
      'Gommages mécaniques agressifs.',
    ],
    contre_indications: [
      'Tout nouveau cosmétique : test préalable obligatoire (poignet ou rétro-auriculaire) avant application visage.',
      'Association de plusieurs actifs réputés irritants (rétinoïdes + acides + parfum) : à éviter, aggrave la réactivité.',
      'Allergie de contact suspectée et non identifiée : avis dermatologique pour bilan allergologique si gêne persistante.',
    ],
    signes_alerte: [
      'Œdème du visage, gonflement des lèvres/paupières → suspicion de réaction allergique sévère, consultation rapide.',
      'Réactivité s\'aggravant malgré simplification de la routine cosmétique → avis dermatologique.',
      'Sensation de brûlure intense ou cloques après application d\'un produit → arrêt immédiat et avis médical si persistance.',
    ],
    regime: [
      'Pas de lien alimentaire démontré ; bonne hydratation générale recommandée.',
      'Limiter les expositions extrêmes (froid, vent, chaleur) qui aggravent la réactivité cutanée.',
    ],
    produits: [
      {nom: 'Toleriane Ultra (La Roche-Posay)', usage: 'Crème ultra-apaisante peau très sensible', texture: 'Crème', gamme: 'La Roche-Posay'},
      {nom: 'Skin Recovery Cream (A-Derma)', usage: 'Reconstruction barrière peau sensible fragilisée', texture: 'Crème apaisante', gamme: 'A-Derma'},
      {nom: 'Aqualia Thermal riche (Vichy)', usage: 'Hydratation intense peau sensible sèche', texture: 'Crème riche', gamme: 'Vichy'},
      {nom: 'Sensibio Riche (Bioderma)', usage: 'Peaux sensibles sèches à très sèches', texture: 'Crème riche', gamme: 'Bioderma'},
      {nom: 'Eau Thermale spray + Toleriane (Avène)', usage: 'Duo nettoyage + soin peau ultra-sensible', texture: 'Spray + Crème', gamme: 'Avène'},
      {nom: '🌿 Eau florale de rose + huile de jojoba', usage: 'Alternative naturelle — hydratation douce sans allergène', texture: 'Naturel', gamme: 'Naturel'},
    ],
    sources: []
  },

  // ══════════════════════════════
  //  PATHOLOGIES SPÉCIFIQUES
  // ══════════════════════════════
  {
    id: 'd8', slug: 'psoriasis', nom: 'Psoriasis',
    categorie: 'specifique', icone: '/icons/dermatologie/psoriasis.svg',
    description: 'Maladie inflammatoire chronique avec plaques épidermiques épaisses et squameuses. Touche 2-3% de la population. Impact psychologique souvent important.',
    symptomes: ['Plaques rouges recouvertes de squames blanches ou argentées', 'Localisation coudes, genoux, cuir chevelu, bas du dos', 'Prurit variable', 'Ongles atteints (onycholyse, pitting)'],
    conseils: [
      'Émollient quotidien sur tout le corps — réduit le prurit et améliore l\'aspect.',
      'Dermocorticoïdes en poussées sous contrôle médical.',
      'Exposition solaire modérée bénéfique — attention aux coups de soleil.',
      'Gestion du stress — facteur déclenchant majeur.',
      'Alcool et tabac aggravent significativement — aborder avec le patient.',
    ],
    eviter: [
      'Frottements et traumatismes cutanés (phénomène de Koebner).',
      'Médicaments aggravants : bêta-bloquants, lithium, AINS.',
      'Alcool (aggrave et réduit l\'efficacité des traitements).',
      'Arrêter brutalement les corticoïdes topiques (rebond).',
    ],
    contre_indications: [
      'Dermocorticoïdes : arrêt brutal proscrit, dégression progressive sous contrôle médical pour éviter l\'effet rebond.',
      'Vitamine D topique (calcipotriol) : ne pas dépasser les doses maximales hebdomadaires (risque d\'hypercalcémie), ne pas associer à l\'acide salicylique (inactivation).',
      'Grossesse : plusieurs traitements systémiques du psoriasis sont contre-indiqués — toute prise en charge de fond doit être réévaluée avec le médecin.',
    ],
    signes_alerte: [
      'Atteinte articulaire (douleurs, gonflements) → rhumatisme psoriasique possible, avis médical/rhumatologique.',
      'Psoriasis en plaques très étendu ou érythrodermique (rougeur généralisée) → urgence dermatologique.',
      'Retentissement psychologique important (anxiété, isolement social) → en parler, orienter si besoin vers un accompagnement adapté.',
    ],
    regime: [
      'Alimentation de type méditerranéen et limitation de l\'alcool : associées à une amélioration du psoriasis dans plusieurs études.',
      'Surpoids : la perte de poids améliore la réponse aux traitements et réduit la sévérité.',
      'Arrêt ou réduction du tabac, facteur aggravant démontré.',
    ],
    produits: [
      {nom: 'Kerium Antipelliculaire cuir chevelu psoriasique (La Roche-Posay)', usage: 'Cuir chevelu psoriasique — entretien', texture: 'Shampooing', gamme: 'La Roche-Posay'},
      {nom: 'Dermalibour+ Crème (A-Derma)', usage: 'Peaux irritées et lésées — plaques légères', texture: 'Crème', gamme: 'A-Derma'},
      {nom: 'Dercos Antipelliculaire Intense (Vichy)', usage: 'Cuir chevelu psoriasique — usage prolongé', texture: 'Shampooing', gamme: 'Vichy'},
      {nom: 'Atoderm Pommade (Bioderma)', usage: 'Émollient intense plaques très épaisses', texture: 'Pommade', gamme: 'Bioderma'},
      {nom: 'Trixéra+ Pommade (Avène)', usage: 'Plaques sèches et squameuses — corps', texture: 'Pommade émolliente', gamme: 'Avène'},
      {nom: '🌿 Huile de chanvre + HE tea tree + aloe vera', usage: 'Alternative naturelle — anti-inflammatoire cutané', texture: 'Naturel', gamme: 'Naturel'},
    ],
    sources: [{label: 'Dermato-info — Psoriasis', url: 'https://dermato-info.fr/les-maladies-de-la-peau/psoriasis', date: 'consulté 07/2026'}, {label: 'Ameli — Psoriasis', url: 'https://www.ameli.fr/assure/sante/themes/psoriasis', date: 'consulté 07/2026'}]
  },

  {
    id: 'd9', slug: 'mycose-cutanee', nom: 'Mycose cutanée (pied d\'athlète)',
    categorie: 'specifique', icone: '/icons/dermatologie/mycose-cutanee---pied-dathelete.svg',
    description: 'Infection fongique superficielle par dermatophytes. Pied d\'athlète très fréquent. Contagieux par contact direct ou indirect.',
    symptomes: ['Desquamation entre les orteils', 'Prurit et brûlures locales', 'Plaques érythémateuses à bordure active', 'Possible atteinte des ongles', 'Odeur caractéristique'],
    conseils: [
      'Traitement local antifongique pendant 4 semaines minimum.',
      'Bien sécher entre les orteils après la douche.',
      'Porter des chaussettes en coton changées quotidiennement.',
      'Ne jamais marcher pieds nus dans les vestiaires, piscines.',
      'Traiter les chaussures avec poudre antifongique.',
    ],
    eviter: [
      'Chaussures synthétiques non respirantes.',
      'Chaussettes synthétiques — favorisent la macération.',
      'Arrêter le traitement avant la durée prescrite.',
      'Partager serviettes, chaussures, chaussettes.',
    ],
    contre_indications: [
      'Antifongiques topiques : respecter la durée complète même si amélioration rapide des symptômes (récidive fréquente si arrêt prématuré).',
      'Diabète ou artériopathie des membres inférieurs : toute lésion du pied (mycose comprise) nécessite une vigilance accrue et un avis médical rapide en cas de doute.',
      'Atteinte unguéale (onychomycose) : les traitements locaux seuls sont souvent insuffisants, avis médical pour traitement adapté.',
    ],
    signes_alerte: [
      'Extension rapide, rougeur chaude et douloureuse, traînée lymphatique → suspicion de surinfection bactérienne, consultation rapide.',
      'Patient diabétique ou immunodéprimé avec lésion du pied → consultation médicale systématique, ne pas se limiter à l\'automédication.',
      'Absence d\'amélioration après 4 semaines de traitement bien conduit → avis médical, vérifier le diagnostic.',
    ],
    regime: [
      'Pas de lien alimentaire direct ; bonne hygiène et séchage rigoureux des pieds recommandés au quotidien.',
    ],
    produits: [
      {nom: 'Mycohydralin crème (La Roche-Posay)', usage: 'Mycose cutanée large spectre — pied d\'athlète', texture: 'Crème', gamme: 'La Roche-Posay'},
      {nom: 'Dermalibour+ Cica spray (A-Derma)', usage: 'Assainissant cutané — zones mycosiques légères', texture: 'Spray', gamme: 'A-Derma'},
      {nom: 'Amycor poudre antifongique', usage: 'Poudre chaussures et pieds — prévention et traitement', texture: 'Poudre', gamme: 'Générique/officinal'},
      {nom: 'Lamisil crème 1% (terbinafine)', usage: 'Référence — 1 semaine application suffit souvent', texture: 'Crème', gamme: 'Novartis'},
      {nom: 'Amorolfine 5% vernis (Locéryl)', usage: 'Onychomycose — traitement ongles', texture: 'Vernis', gamme: 'Galderma'},
      {nom: '🌿 HE tea tree pure + bicarbonate de soude', usage: 'Alternative naturelle — bain de pied antifongique', texture: 'Naturel', gamme: 'Naturel'},
    ],
    sources: [{label: 'Dermato-info — Mycoses cutanées', url: 'https://dermato-info.fr/les-maladies-de-la-peau/mycoses-cutanees', date: 'consulté 07/2026'}, {label: 'Ameli — Mycose cutanée', url: 'https://www.ameli.fr/assure/sante/themes/mycose-cutanee-peau', date: 'consulté 07/2026'}]
  },

  {
    id: 'd10', slug: 'cicatrices-vergetures', nom: 'Cicatrice',
    categorie: 'specifique', icone: '/icons/dermatologie/cicatrice.svg',
    description: 'Cicatrices post-acné, post-chirurgie ou vergetures liées à une distension rapide du derme (grossesse, croissance, prise de poids rapide).',
    symptomes: ['Vergetures rouges (récentes) ou blanches (anciennes)', 'Cicatrices en relief (chéloïdes)', 'Cicatrices déprimées post-acné', 'Cicatrices dyschromiques'],
    conseils: [
      'Les vergetures rouges (récentes) répondent mieux — agir tôt.',
      'Massage quotidien avec huile ou crème — stimule la synthèse de collagène.',
      'Photoprotection indispensable sur les cicatrices.',
      'Patience : minimum 3-6 mois de traitement régulier.',
      'Gel de silicone — référence pour les cicatrices hypertrophiques.',
    ],
    eviter: [
      'Soleil sans protection sur une cicatrice récente.',
      'Arrêter le traitement trop tôt.',
      'Produits irritants sur cicatrice non consolidée.',
    ],
    contre_indications: [
      'Cicatrice non encore fermée ou suturée : pas de massage ni de produit avant cicatrisation complète, avis du chirurgien/médecin si doute.',
      'Antécédent de chéloïdes : éviter le percing, tatouage ou chirurgie esthétique non indispensable sur peau à risque sans avis médical préalable.',
      'Produits dépigmentants forts (hydroquinone) sur cicatrices dyschromiques : usage encadré médicalement, pas en automédication prolongée.',
    ],
    signes_alerte: [
      'Cicatrice qui grossit, devient douloureuse ou inflammatoire après plusieurs semaines → avis médical (chéloïde évolutive).',
      'Signes de surinfection sur cicatrice récente (chaleur, pus, fièvre) → consultation rapide.',
      'Vergetures ou cicatrices avec changement d\'aspect brutal (couleur, relief) → avis dermatologique pour écarter une autre cause.',
    ],
    regime: [
      'Bonne hydratation et apport protéique suffisant favorisent la qualité de la cicatrisation.',
      'Vitamine C et zinc : cofacteurs de la synthèse de collagène, intérêt d\'une alimentation équilibrée pendant la phase de réparation.',
    ],
    produits: [
      {nom: 'Cicaplast Baume B5+ (La Roche-Posay)', usage: 'Cicatrisation et réparation cicatrices fraîches', texture: 'Baume', gamme: 'La Roche-Posay'},
      {nom: 'Cicalfate+ crème (Avène)', usage: 'Cicatrices fraîches — phase de réparation', texture: 'Crème réparatrice', gamme: 'Avène'},
      {nom: 'Lift Activ Glyco-C (Vichy)', usage: 'Unification teint et atténuation cicatrices', texture: 'Ampoules', gamme: 'Vichy'},
      {nom: 'Kelo-Cote gel silicone', usage: 'Cicatrices hypertrophiques et chéloïdes — référence', texture: 'Gel silicone', gamme: 'Alliance Pharma'},
      {nom: 'Bio-Oil Specialist', usage: 'Vergetures et cicatrices — massage régulier', texture: 'Huile sèche', gamme: 'Bio-Oil'},
      {nom: '🌿 Huile de rose musquée bio + vitamine E', usage: 'Alternative naturelle — massage matin/soir', texture: 'Naturel', gamme: 'Naturel'},
    ],
    sources: []
  },
  {
    id: 'd21', slug: 'vergetures', nom: 'Vergetures',
    categorie: 'specifique', icone: '/icons/dermatologie/vergetures.svg',
    description: 'Stries atrophiques du derme (striae distensae) dues à une distension rapide de la peau : grossesse, croissance, prise de poids. Deux phases : rouge/violette (active) puis blanche nacrée (définitive).',
    symptomes: ['Stries rouges ou violettes (phase inflammatoire)', 'Stries blanches nacrées (phase atrophique)', 'Localisation : ventre, seins, hanches, cuisses, fesses'],
    conseils: [
      'Vergetures rouges = agir vite : seule la phase active répond aux soins.',
      'Massage quotidien avec huile ou crème : améliore l\'élasticité et la microcirculation.',
      'Prévention grossesse : commencer dès le 4e mois avec une huile adaptée (amande douce, argan).',
      'Vergetures blanches = irréversibles cosmétiquement → orienter vers dermatologue pour laser.',
    ],
    produits: [
      {nom: 'Mustela Maternité huile', usage: 'Prévention vergetures grossesse', texture: 'Huile', gamme: 'Mustela'},
      {nom: 'Cicalfate+ Vergetures (Avène)', usage: 'Prévention et soin vergetures actives', texture: 'Crème', gamme: 'Avène'},
      {nom: 'Klorane Maternité huile sèche', usage: 'Prévention vergetures — usage quotidien', texture: 'Huile sèche', gamme: 'Klorane'},
    ],
    signes_alerte: [
      'Trétinoïne topique (vergetures rouges) : CI absolue grossesse et allaitement — prescription uniquement.',
      'Vergetures associées à une prise de poids rapide et une hypertension → évoquer un Cushing.',
    ],
    sources: [{label: 'Dermato-info — Cicatrices et vergetures', url: 'https://dermato-info.fr/les-maladies-de-la-peau/les-maladies-connaitre-par-tranches-dages', date: 'consulté 07/2026'}],
  },

  {
    id: 'd11', slug: 'urticaire', nom: 'Urticaire aiguë',
    categorie: 'specifique', icone: '/icons/dermatologie/urticaire.svg',
    description: 'Réaction cutanée avec plaques oedémateuses prurigineuses mobiles et fugaces. Peut être allergique ou non allergique.',
    symptomes: ['Plaques rouges surélevées prurigineuses', 'Lésions fugaces (< 24h au même endroit)', 'Oedème possible (angioedème)', 'Brûlures locales'],
    conseils: [
      'Antihistaminique non sédatif (cétirizine 10mg) en 1ère intention.',
      'Identifier et éviter le facteur déclenchant.',
      'Douche fraîche — soulage le prurit temporairement.',
      'Ne jamais gratter — aggrave et risque de surinfection.',
    ],
    eviter: [
      'Aspirine et AINS (peuvent déclencher ou aggraver).',
      'Alcool (libérateur d\'histamine).',
      'Vêtements serrés sur les lésions.',
    ],
    contre_indications: [
      'Antihistaminiques de 1ère génération (sédatifs) : à éviter en conduite ou chez la personne âgée, préférer les antihistaminiques non sédatifs de 2e génération.',
      'AINS et aspirine : facteurs déclenchants ou aggravants connus de l\'urticaire, à éviter pendant l\'épisode.',
      'IEC (traitement de l\'hypertension) : peuvent provoquer un angiœdème — signaler au médecin si urticaire/angiœdème sous ce traitement.',
    ],
    signes_alerte: [
      'Œdème du visage, des lèvres, de la langue ou de la gorge, difficulté à respirer ou à avaler → urgence vitale, appeler le SAMU 15 immédiatement (angiœdème/anaphylaxie).',
      'Urticaire associée à des vertiges, malaise, chute de tension → SAMU 15 sans délai.',
      'Urticaire persistant plus de 6 semaines (urticaire chronique) → consultation médicale pour bilan étiologique.',
    ],
    regime: [
      'En cas de suspicion alimentaire : éviction de l\'aliment suspecté et avis médical, pas d\'éviction large non justifiée.',
      'Limiter l\'alcool et les aliments riches en histamine (fromages affinés, charcuterie, poissons fumés) en cas de poussées fréquentes.',
    ],
    produits: [
      {nom: 'Cicaplast spray thermique (La Roche-Posay)', usage: 'Apaisement immédiat des plaques prurigineuses', texture: 'Spray', gamme: 'La Roche-Posay'},
      {nom: 'Gel apaisant (A-Derma Epitheliale)', usage: 'Soulagement local prurit urticarien', texture: 'Gel apaisant', gamme: 'A-Derma'},
      {nom: 'Eau Thermale spray (Vichy)', usage: 'Brumisation apaisante anti-prurit', texture: 'Spray', gamme: 'Vichy'},
      {nom: 'Sensibio Eau micellaire (Bioderma)', usage: 'Nettoyage doux sans friction des zones atteintes', texture: 'Lotion', gamme: 'Bioderma'},
      {nom: 'Eau Thermale spray (Avène)', usage: 'Apaisement des plaques et brûlures', texture: 'Spray', gamme: 'Avène'},
      {nom: '🌿 Gel aloe vera pur + compresse froide', usage: 'Alternative naturelle — soulagement local immédiat', texture: 'Naturel', gamme: 'Naturel'},
    ],
    sources: [{label: 'Dermato-info — Urticaire', url: 'https://dermato-info.fr/les-maladies-de-la-peau/urticaire', date: 'consulté 07/2026'}, {label: 'Ameli — Urticaire', url: 'https://www.ameli.fr/assure/sante/themes/urticaire', date: 'consulté 07/2026'}]
  },

  {
    id: 'd12', slug: 'zona', nom: 'Zona',
    categorie: 'specifique', icone: '/icons/dermatologie/zona.svg',
    description: 'Réactivation du virus varicelle-zona (VZV). Vésicules douloureuses unilatérales en bande. Fréquent après 50 ans et en cas d\'immunodépression.',
    symptomes: ['Douleurs précédant l\'éruption de 2-4 jours', 'Vésicules unilatérales en bande (métamère)', 'Brûlures et allodynie intenses', 'Possible atteinte ophtalmique'],
    conseils: [
      'Traitement antiviral à débuter dans les 72h — urgence médicale.',
      'Ne pas percer les vésicules — risque de surinfection et dissémination.',
      'Compresses froides pour soulager localement.',
      'Antalgiques adaptés — ne pas sous-traiter.',
      'Vaccination recommandée dès 65 ans.',
    ],
    eviter: [
      'Contact avec immunodéprimés, femmes enceintes sans immunité, nourrissons.',
      'Antiseptiques irritants sur les vésicules.',
      'Retarder le traitement antiviral au-delà de 72h.',
    ],
    contre_indications: [
      'Antiviraux (valaciclovir, aciclovir) : adaptation de dose nécessaire en cas d\'insuffisance rénale — avis médical/pharmacien systématique.',
      'Corticoïdes : pas en automédication sur un zona, peuvent aggraver la dissémination virale.',
      'Patient immunodéprimé : prise en charge médicale obligatoire, pas de simple conseil comptoir.',
    ],
    signes_alerte: [
      'Zona ophtalmique (autour de l\'œil, bout du nez) → urgence ophtalmologique, risque de complications oculaires graves.',
      'Douleurs persistant plus d\'un mois après guérison cutanée → douleurs post-zostériennes, avis médical pour prise en charge spécifique.',
      'Fièvre élevée, altération de l\'état général, zona très étendu → consultation médicale rapide, surtout si terrain à risque (âge, immunodépression).',
    ],
    regime: [
      'Pas de régime spécifique ; bonne hydratation et alimentation équilibrée pour soutenir la convalescence.',
    ],
    produits: [
      {nom: 'Cicaplast Baume B5+ (La Roche-Posay)', usage: 'Soins locaux vésicules — protection et cicatrisation', texture: 'Baume', gamme: 'La Roche-Posay'},
      {nom: 'Cicalfate+ crème (Avène)', usage: 'Réparation cutanée post-vésicules', texture: 'Crème réparatrice', gamme: 'Avène'},
      {nom: 'Dermalibour+ Cica crème (A-Derma)', usage: 'Assainissant et réparateur lésions zostériennes', texture: 'Crème', gamme: 'A-Derma'},
      {nom: 'Paracétamol 1g + compresses stériles', usage: 'Antalgique + nettoyage doux des lésions', texture: 'Comprimé + Matériel', gamme: 'Générique'},
      {nom: '🌿 Compresses aloé vera gel + HE lavande diluée', usage: 'Alternative naturelle — apaisement local vésicules', texture: 'Naturel', gamme: 'Naturel'},
    ],
    sources: [{label: 'Dermato-info — Zona', url: 'https://dermato-info.fr/les-maladies-de-la-peau/zona', date: 'consulté 07/2026'}, {label: 'Ameli — Zona', url: 'https://www.ameli.fr/assure/sante/themes/zona', date: 'consulté 07/2026'}]
  },

  // ══ EXTENSION — d13 à d20 ══

  {
    id: 'd13', slug: 'herpes-labial', nom: 'Herpès labial',
    categorie: 'specifique', icone: '/icons/dermatologie/herpes.svg',
    description: 'Infection virale récurrente par HSV-1 (Herpes Simplex Virus type 1). Bouton de fièvre classique de la lèvre, déclenché par le soleil, le stress, la fatigue ou l\'immunodépression. Très haute fréquence au comptoir — 2e motif de conseil en dermatologie officinale.',
    symptomes: [
      'Prodromes : picotements, brûlures, tension de la lèvre (J-1 à J-2)',
      'Vésicules en bouquet sur fond érythémateux',
      'Croûte jaunâtre en 4-5 jours',
      'Guérison spontanée en 10-14 jours',
      'Récidives à la même localisation'
    ],
    conseils: [
      'Aciclovir ou penciclovir crème en application dès les PRODROMES — l\'efficacité diminue drastiquement si appliqué après apparition des vésicules.',
      'Applications toutes les 4h, 5x/jour pendant 5 jours minimum.',
      'Se laver les mains avant et après application — risque d\'auto-inoculation oculaire grave (kératite herpétique).',
      'Ne pas embrasser, partager couverts ou verres en phase active — contagiosité maximale sur vésicules ouvertes.',
      'Photoprotection labiale SPF 50+ systématique si facteur soleil identifié comme déclencheur.',
      'En cas de récidives très fréquentes (> 6/an) : orientation vers médecin pour traitement antiviral oral préventif.',
    ],
    eviter: [
      'Crever ou triturer les vésicules — dissémination et surinfection bactérienne.',
      'Contact avec les yeux, les organes génitaux, les nourrissons et les immunodéprimés.',
      'Baisers en phase active.',
      'Fond de teint ou maquillage sur les lésions ouvertes.',
    ],
    contre_indications: [
      'Antiviraux topiques : pas d\'efficacité démontrée une fois les vésicules constituées — informer le patient sans le décourager pour les prochaines poussées.',
      'Corticoïdes locaux : contre-indiqués sur l\'herpès, risque d\'aggravation et de dissémination virale.',
      'Femme enceinte ou allaitante : traitement antiviral oral réservé à l\'avis médical, pas d\'automédication systémique.',
    ],
    signes_alerte: [
      'Atteinte oculaire (œil rouge, douloureux, photophobie) → urgence ophtalmologique (kératite herpétique).',
      'Poussée chez le nourrisson, la femme enceinte ou un patient immunodéprimé → avis médical, ne pas se limiter au conseil comptoir.',
      'Lésions très étendues, fièvre, altération de l\'état général → consultation médicale.',
    ],
    regime: [
      'Pas de régime alimentaire spécifique démontré ; gestion de la fatigue et du stress recommandée, facteurs déclenchants fréquents.',
    ],
    produits: [
      {nom: 'Zovirax crème (Aciclovir 5%)', usage: 'Traitement de référence — à débuter aux prodromes', texture: 'Crème', gamme: 'GSK'},
      {nom: 'Vectavir crème (Penciclovir 1%)', usage: 'Application toutes les 2h — cicatrisation légèrement plus rapide', texture: 'Crème', gamme: 'Haleon'},
      {nom: 'Compeed patch herpès', usage: 'Protection mécanique + action hydrocolloïde — discrétion', texture: 'Patch', gamme: 'Compeed'},
      {nom: 'Stick lèvres SPF 50+ (Avène)', usage: 'Prévention récidive solaire — protection labiale totale', texture: 'Stick', gamme: 'Avène'},
      {nom: '🌿 HE Tea tree 1 goutte pure localement + Lysine 1g/j', usage: 'Alternative naturelle — antivirale topique + acide aminé inhibiteur de la réplication virale', texture: 'Naturel', gamme: 'Naturel'},
    ],
    sources: [{label: 'Ameli — Herpès labial', url: 'https://www.ameli.fr/assure/sante/themes/herpes-labial', date: 'consulté 07/2026'}, {label: 'HAS — Herpès cutané, varicelle, zona', url: 'https://www.has-sante.fr/jcms/c_2608703/fr/', date: 'consulté 07/2026'}]
  },

  {
    id: 'd14', slug: 'coup-de-soleil', nom: 'Coup de soleil',
    categorie: 'specifique', icone: '/icons/dermatologie/coup-de-soleil.svg',
    description: 'Brûlure cutanée par exposition excessive aux UV. Du 1er degré (érythème) au 2e degré superficiel (phlyctènes). Saisonnalité forte (juin-août). Risque surajouté : déshydratation, coup de chaleur, cancérisation à long terme.',
    symptomes: [
      'Érythème douloureux apparaissant 4-6h après exposition',
      '1er degré : rougeur uniforme, chaleur, douleur, sans bulle',
      '2e degré superficiel : phlyctènes (cloques), douleur intense',
      'Œdème facial possible',
      'Fièvre, frissons, nausées si étendu (> 15% surface corporelle)'
    ],
    conseils: [
      'Refroidissement immédiat sous eau fraîche (pas froide, pas de glace) 10-15 minutes — réduit significativement la profondeur des lésions.',
      'Appliquer un émollient apaisant (aloe vera gel ou crème post-solaire) généreusement dès la sortie de l\'eau.',
      'Éviter tout soleil sur les zones brûlées pendant 48h minimum, puis protection SPF 50+ sur nouvelle peau pendant 3 mois.',
      'Hydratation orale renforcée — les brûlures entraînent une perte hydrique importante.',
      'Paracétamol antalgique — ne pas associer AINS sans avis médical si brûlure étendue.',
      'Ne jamais percer les phlyctènes — risque infectieux majeur.',
    ],
    eviter: [
      'Glaçons ou eau glacée directement sur la peau — aggrave les lésions par choc thermique.',
      'Dentifrice, beurre, huile, corps gras — risque infectieux et aggravation.',
      'Dermocorticoïdes sur brûlures ouvertes.',
      'Exposition solaire immédiate après guérison sans protection maximale (SPF 50+).',
      'Lidocaïne topique en automédication — risque allergique et retard diagnostique.',
    ],
    contre_indications: [
      'AINS : prudence en cas de brûlure étendue ou déshydratation associée, avis médical au-delà de l\'antalgie ponctuelle.',
      'Photosensibilisants (certains médicaments, cosmétiques) : facteur de risque à rechercher en cas de coup de soleil disproportionné par rapport à l\'exposition.',
      'Enfant de moins de 3 ans : coup de soleil étendu = consultation médicale systématique, pas de prise en charge comptoir seule.',
    ],
    signes_alerte: [
      'Coup de soleil étendu (> 15-20% de la surface corporelle) avec fièvre, frissons, malaise → consultation médicale, risque de déshydratation sévère.',
      'Phlyctènes très nombreuses ou étendues → avis médical pour évaluation du degré de la brûlure.',
      'Signes de coup de chaleur associés (confusion, absence de sueur, température corporelle très élevée) → urgence, SAMU 15.',
    ],
    regime: [
      'Hydratation orale renforcée — les brûlures solaires entraînent une perte hydrique importante.',
      'Antioxydants (fruits rouges, agrumes) pouvant soutenir la réparation cutanée, sans effet préventif substitutif à la protection solaire.',
    ],
    produits: [
      {nom: 'Après-soleil Gel aloe vera (Avène)', usage: 'Refroidissement et réhydratation — premier geste', texture: 'Gel apaisant', gamme: 'Avène'},
      {nom: 'Posthelios Melt-in Gel (La Roche-Posay)', usage: 'Réparation post-solaire — action anti-oxydante', texture: 'Gel fondant', gamme: 'La Roche-Posay'},
      {nom: 'Cicaplast Baume B5+ (La Roche-Posay)', usage: 'Stade réparateur J+2 — protection + cicatrisation', texture: 'Baume', gamme: 'La Roche-Posay'},
      {nom: 'Cicalfate+ (Avène)', usage: 'Si début de phlyctène — protection antiseptique + réparation', texture: 'Crème réparatrice', gamme: 'Avène'},
      {nom: '🌿 Gel aloe vera pur réfrigéré + eau florale de lavande', usage: 'Alternative naturelle — application généreuse immédiate, très efficace au stade 1er degré', texture: 'Naturel', gamme: 'Naturel'},
    ],
    sources: [{label: 'Ameli — Coup de soleil', url: 'https://www.ameli.fr/assure/sante/themes/coup-soleil', date: 'consulté 07/2026'}]
  },

  {
    id: 'd15', slug: 'impetigo', nom: 'Impétigo',
    categorie: 'specifique', icone: '/icons/dermatologie/impetigo.svg',
    description: 'Infection bactérienne superficielle de la peau — très contagieuse. Staphylocoque doré et streptocoque A. Touche surtout les enfants de 2 à 6 ans. Traitement antibiotique local ou systémique selon extension.',
    symptomes: [
      'Vésicules ou bulles sur fond érythémateux',
      'Croûtes jaunâtres en miel (aspecten "miel-caramel" caractéristique)',
      'Localisé autour du nez, de la bouche, sur les membres',
      'Prurit intense, pas de fièvre en forme localisée',
      'Extension rapide par auto-inoculation (grattage)'
    ],
    conseils: [
      'Antibiothérapie locale (acide fusidique ou mupirocine) en 1ère intention si lésions limitées < 5 éléments — prescription médicale obligatoire.',
      'Nettoyer les lésions à l\'eau et savon doux avant chaque application d\'antibiotique local.',
      'Ongles courts, lavage mains fréquent — stopper l\'auto-inoculation.',
      'Éviction scolaire jusqu\'à 48h après début du traitement antibiotique efficace.',
      'Linge de toilette personnel, non partagé pendant la durée du traitement.',
      'Orientation médicale immédiate si lésions étendues, fièvre ou forme bulleuse importante.',
    ],
    eviter: [
      'Gratter les croûtes — risque de cicatrices et de dissémination.',
      'Automédication antibiotique oral sans prescription.',
      'Antiseptiques forts (Bétadine alcoolique) — irritants, retardent la cicatrisation.',
      'Partage de serviettes, vêtements ou literie.',
    ],
    contre_indications: [
      'Antibiotiques locaux (acide fusidique, mupirocine) : nécessitent une prescription médicale, pas d\'automédication en pharmacie.',
      'Corticoïdes topiques : contre-indiqués sur impétigo, aggravent l\'infection bactérienne.',
      'Allergie connue aux antibiotiques de la famille prescrite : signaler systématiquement au médecin/pharmacien.',
    ],
    signes_alerte: [
      'Fièvre, lésions très étendues ou forme bulleuse importante → consultation médicale urgente, traitement systémique probable.',
      'Absence d\'amélioration après 48h de traitement antibiotique bien conduit → avis médical, rechercher une résistance.',
      'Œdème, rougeur extensive autour des lésions → suspicion de complication, consultation rapide.',
    ],
    regime: [
      'Pas de régime spécifique ; hygiène des mains et du linge rigoureuse pour limiter la contagion, notamment en collectivité (école).',
    ],
    produits: [
      {nom: 'Fucidine crème (acide fusidique 2%)', usage: 'Antibiotique local de référence — sur prescription', texture: 'Crème', gamme: 'Leo Pharma'},
      {nom: 'Bactroban crème (mupirocine 2%)', usage: 'Alternative si résistance — sur prescription', texture: 'Crème', gamme: 'Haleon'},
      {nom: 'Septivon savon antiseptique', usage: 'Nettoyage avant application — chlorhexidine douce', texture: 'Savon liquide', gamme: 'Urgo'},
      {nom: 'Compresses stériles non tissées', usage: 'Nettoyage et protection des lésions', texture: 'Compresses', gamme: 'Générique'},
      {nom: '🌿 Miel de Manuka certifié (IAF ≥ 15+)', usage: 'Alternative naturelle — propriétés antibactériennes documentées, application locale après avis médical', texture: 'Naturel', gamme: 'Naturel'},
    ],
    sources: [{label: 'Dermato-info — Infections bactériennes (impétigo)', url: 'https://dermato-info.fr/les-maladies-de-la-peau/infections-bacteriennes', date: 'consulté 07/2026'}, {label: 'Ameli — Impétigo', url: 'https://www.ameli.fr/assure/sante/themes/impetigo', date: 'consulté 07/2026'}, {label: 'HAS — Infections cutanées bactériennes (impétigo)', url: 'https://www.has-sante.fr/jcms/c_2936055/fr/prise-en-charge-des-infections-cutanees-bacteriennes-courantes-recommandations', date: 'consulté 07/2026'}]
  },

  // ══════════════════════════════
  //  PEAUX GRASSES & ACNÉ (suite)
  // ══════════════════════════════

  {
    id: 'd16', slug: 'seborrhee-peau-grasse', nom: 'Séborrhée — peau grasse',
    categorie: 'grasse', icone: '/icons/dermatologie/seborrhee---peau-grasse.svg',
    description: 'Hypersécrétion sébacée sans composante inflammatoire (distinct de l\'acné). Peau brillante, pores dilatés, teint terne. Terrain souvent hormonal ou génétique. Très demandé en conseil cosmétique officinal.',
    symptomes: [
      'Brillance excessive notamment zone T (front, nez, menton)',
      'Pores visiblement dilatés',
      'Points noirs (comédons ouverts) sans pustules inflammatoires',
      'Teint terne avec imperfections mineures',
      'Maquillage qui "tient" peu'
    ],
    conseils: [
      'Nettoyage 2x/jour max — le sur-nettoyage stimule la production de sébum en retour (effet rebond).',
      'Gel nettoyant sans savon, sans paraben, sans huile minérale.',
      'Crème hydratante matifiante légère — éviter les textures lourdes qui occluent les pores.',
      'Sérum niacinamide (10%) : régulateur du sébum cliniquement prouvé, très bien toléré.',
      'Masque argile 1x/semaine maximum — assainissant mais ne pas laisser sécher complètement.',
      'Photoprotection non comédogène obligatoire (gel ou fluide SPF 50+).',
    ],
    eviter: [
      'Produits occlusifs ou gras (vaseline, huile de coco sur le visage).',
      'Alcool dénaturé — irritant, aggrave l\'hypersécrétion par réflexe.',
      'Nettoyage plus de 2x/jour.',
      'Toucher le visage fréquemment — transfert sébum + bactéries.',
      'Exfoliation mécanique agressive (grains abrasifs).',
    ],
    contre_indications: [
      'Nettoyage excessif ou produits décapants : effet rebond, la peau produit davantage de sébum en réaction.',
      'Niacinamide et autres actifs régulateurs : généralement bien tolérés, mais tester en cas de peau par ailleurs sensible.',
    ],
    signes_alerte: [
      'Apparition de lésions inflammatoires (papules, pustules) : signe d\'évolution vers une vraie acné, orienter vers la fiche/prise en charge correspondante.',
      'Séborrhée brutale et inexpliquée chez l\'adulte avec autres signes hormonaux → avis médical pour recherche de cause sous-jacente.',
    ],
    regime: [
      'Pas de lien alimentaire formellement démontré pour la séborrhée isolée (sans acné associée).',
    ],
    produits: [
      {nom: 'Effaclar gel nettoyant (La Roche-Posay)', usage: 'Nettoyage doux peaux grasses — sans savon', texture: 'Gel', gamme: 'La Roche-Posay'},
      {nom: 'Cleanance gel (A-Derma)', usage: 'Nettoyant peaux grasses à imperfections', texture: 'Gel moussant', gamme: 'A-Derma'},
      {nom: 'Normaderm Phytosolution (Vichy)', usage: 'Soin hydratant matifiant 24h — non comédogène', texture: 'Gel-crème', gamme: 'Vichy'},
      {nom: 'Sébium Pore Refiner (Bioderma)', usage: 'Resserrement des pores + matification durable', texture: 'Soin matifiant', gamme: 'Bioderma'},
      {nom: '🌿 Eau florale de romarin + argile blanche kaolin', usage: 'Alternative naturelle — tonique + masque hebdomadaire assainissant doux', texture: 'Naturel', gamme: 'Naturel'},
    ],
    sources: [{label: 'Dermato-info — Dermite séborrhéique / Séborrhée', url: 'https://dermato-info.fr/les-maladies-de-la-peau/dermite-seborrheique', date: 'consulté 07/2026'}, {label: 'Ameli — Pellicules et dermite séborrhéique', url: 'https://www.ameli.fr/assure/sante/themes/dermatite-seborrheique', date: 'consulté 07/2026'}]
  },

  // ══════════════════════════════
  //  PATHOLOGIES SPÉCIFIQUES (suite)
  // ══════════════════════════════

  {
    id: 'd17', slug: 'verrues', nom: 'Verrues (vulgaires & plantaires)',
    categorie: 'specifique', icone: '/icons/dermatologie/verrue.svg',
    description: 'Infection épidermique par le papillomavirus humain (HPV). Verrues vulgaires (mains, doigts) et plantaires (plante du pied, très douloureuses à la pression). Contagion par contact direct et indirect (piscine, vestiaires).',
    symptomes: [
      'Verrues vulgaires : papules rugueuses sur les doigts et mains',
      'Verrues plantaires : zone indurée et douloureuse à la marche',
      'Points noirs centraux (thromboses capillaires) pathognomoniques',
      'Dermatoglyphes (lignes cutanées) interrompus sur la lésion',
      'Possible dispersion par grattage (autoinoculation)'
    ],
    conseils: [
      'Traitement cryothérapie officinale (azote liquide -196°C ou diméthyl éther) : 1ère intention, efficace si appliqué correctement, 2-3 séances espacées de 2-3 semaines.',
      'Acide salicylique à 10-30% : application quotidienne après bain chaud et ponçage doux — traitement de fond de 8 à 12 semaines.',
      'Limaille légère (lime à verrue) avant traitement pour retirer la kératine — améliore la pénétration du traitement.',
      'Protéger la peau saine autour avec de la vaseline avant application d\'acide.',
      'Orienter vers un dermatologue si verrue périunguéale, du visage, > 6 mois de traitement inefficace ou patient immunodéprimé.',
    ],
    eviter: [
      'Marcher pieds nus dans les zones communes (piscine, vestiaire).',
      'Gratter ou couper la verrue — dissémination HPV.',
      'Partager chaussures ou serviettes.',
      'Appliquer acide salicylique sur la peau saine environnante ou sur le visage.',
    ],
    contre_indications: [
      'Acide salicylique : contre-indiqué chez le diabétique avec troubles de la sensibilité/circulation des pieds sans avis médical préalable, et jamais sur le visage.',
      'Cryothérapie : prudence chez l\'enfant jeune (douleur, coopération), avis médical si verrue très sensible ou zone difficile.',
      'Patient immunodéprimé : verrues souvent plus résistantes et étendues, orientation médicale recommandée d\'emblée.',
    ],
    signes_alerte: [
      'Verrue qui change d\'aspect (couleur, saignement, croissance rapide) → avis dermatologique pour écarter un diagnostic différentiel.',
      'Verrue périunguéale, du visage ou des organes génitaux → orientation médicale/dermatologique, pas de traitement comptoir.',
      'Absence d\'amélioration après plusieurs mois de traitement bien conduit → avis dermatologique.',
    ],
    regime: [
      'Pas de lien alimentaire ; bonne immunité générale favorisant la résolution spontanée (fréquente chez l\'enfant).',
    ],
    produits: [
      {nom: 'Wartner cryothérapie (Omega Pharma)', usage: 'Traitement froid ponctuels — 1 à 3 séances', texture: 'Aérosol cryogène', gamme: 'Wartner'},
      {nom: 'Bazuka gel (acide salicylique + lactic acid)', usage: 'Traitement kératolytique quotidien 12 semaines', texture: 'Gel occlusif', gamme: 'Dendron'},
      {nom: 'Verrufilm (acide salicylique 26%)', usage: 'Film occlusifsur les verrues vulgaires et plantaires', texture: 'Solution filmogène', gamme: 'Stiefel'},
      {nom: 'Compeed verrues plantaires', usage: 'Patch protecteur + acide salicylique — confort de marche', texture: 'Patch', gamme: 'Compeed'},
      {nom: '🌿 HE Thuja occidentalis diluée 5% dans huile végétale', usage: 'Alternative naturelle — 1 goutte sur la verrue 2x/jour sous pansement occlusif (hors visage)', texture: 'Naturel', gamme: 'Naturel'},
    ],
    sources: [{label: 'Ameli — Verrues', url: 'https://www.ameli.fr/assure/sante/themes/verrues', date: 'consulté 07/2026'}, {label: 'Dermato-info — Verrues', url: 'https://dermato-info.fr/les-maladies-de-la-peau/verrues', date: 'consulté 07/2026'}]
  },

  {
    id: 'd18', slug: 'perleche', nom: 'Perlèche',
    categorie: 'specifique', icone: '/icons/dermatologie/perleche.svg',
    description: 'Inflammation des commissures labiales (angles de la bouche). Origine multifactorielle : mycosique (Candida), bactérienne, carence en B2/fer, ou mécanique (appui dentaire). Très fréquente et souvent récidivante.',
    symptomes: [
      'Fissure douloureuse aux coins de la bouche',
      'Rougeur et enduit blanchâtre (si mycosique)',
      'Croûtes et saignements au mouvement buccal',
      'Bilatérale souvent mycosique, unilatérale souvent bactérienne ou mécanique'
    ],
    conseils: [
      'Identifier la cause : si enduit blanchâtre → antifongique local (miconazole) ; si contexte dentier mal adapté ou macération → hygiène + protection ; si bilatérale récidivante → bilan carences B2 et fer.',
      'Crème antifongique (miconazole 2%) en 1ère intention en automédication car Candida majoritaire.',
      'Appliquer après séchage soigneux des commissures.',
      'Protéger avec un baume cicatrisant après guérison.',
      'Si porteur de prothèse dentaire : nettoyage quotidien de la prothèse à l\'antifongique (Mycostatine solution buccale), ajustement prothétique si nécessaire.',
    ],
    eviter: [
      'Se lécher les lèvres et les commissures — la salive macère et aggrave.',
      'Dermocorticoïdes seuls sans couverture antifongique (risque de propagation mycosique).',
      'Corpus lipstick ou graisses sans action antifongique sur lésion active.',
    ],
    contre_indications: [
      'Miconazole (Daktarin) : interaction majeure avec les anticoagulants oraux (AVK) même en usage local — vérifier systématiquement les traitements en cours avant délivrance.',
      'Lésion bilatérale chronique récidivante : penser à une carence (fer, vitamine B2) à confirmer médicalement plutôt que traiter en boucle sans bilan.',
      'Prothèse dentaire mal adaptée comme cause : le traitement antifongique seul ne suffit pas sans correction mécanique.',
    ],
    signes_alerte: [
      'Perlèche très récidivante malgré traitement bien conduit → avis médical pour bilan de carence ou cause sous-jacente (diabète, immunodépression).',
      'Extension au-delà des commissures, douleur importante, fièvre → consultation.',
    ],
    regime: [
      'Carence en fer ou vitamine B2 (riboflavine) parfois en cause : alimentation variée (viandes, œufs, produits laitiers, légumes verts) en prévention, bilan médical si récidives.',
    ],
    produits: [
      {nom: 'Daktarin gel buccal (miconazole 2%)', usage: 'Antifongique de référence perlèche mycosique — local', texture: 'Gel', gamme: 'Johnson & Johnson'},
      {nom: 'Lomexin crème (fenticonazole 2%)', usage: 'Alternative antifongique topique commissures', texture: 'Crème', gamme: 'Recordati'},
      {nom: 'Cicaplast Lèvres (La Roche-Posay)', usage: 'Phase de réparation — post-traitement antifongique', texture: 'Baume lèvres', gamme: 'La Roche-Posay'},
      {nom: 'Bépanthène Plus crème', usage: 'Si composante bactérienne — antibactérien + cicatrisant', texture: 'Crème', gamme: 'Bayer'},
      {nom: '🌿 Huile de coco vierge + HE tea tree 1% + vitamine B2 orale', usage: 'Alternative naturelle — antifongique doux + traitement de la carence', texture: 'Naturel', gamme: 'Naturel'},
    ],
    sources: [{label: 'Dermato-info — Perlèche', url: 'https://dermato-info.fr/les-maladies-de-la-peau/perleche', date: 'consulté 07/2026'}]
  },

  {
    id: 'd19', slug: 'ongle-incarne', nom: 'Ongle incarné',
    categorie: 'specifique', icone: '/icons/dermatologie/ongle-incarne.svg',
    description: 'Pénétration du bord latéral de l\'ongle (surtout gros orteil) dans la chair environnante. Douleur progressive pouvant évoluer vers une infection bactérienne (paronychie). Souvent lié à une mauvaise coupe ou un chaussage serré.',
    symptomes: [
      'Douleur latérale du gros orteil, aggravée par la marche et la pression',
      'Rougeur et gonflement du bourrelet péri-unguéal',
      'Suintement séreux, puis purulent si infection',
      'Bourgeon charnu (granulome pyogénique) au stade avancé',
      'Fièvre possible si cellulite étendue'
    ],
    conseils: [
      'Stade 1 (douleur sans infection) : bains de pied eau tiède salée 10 min 2x/jour + tuck technique (coton tige entre ongle et bourrelet) — résolution dans 80% des cas.',
      'Coupe d\'ongle droite, jamais arrondie sur les côtés — règle préventive fondamentale à expliquer.',
      'Chaussures à bout large, pas de chaussures pointues ni talons hauts pendant la guérison.',
      'Stade 2 (infection débutante) : orienter vers médecin pour antibiothérapie orale ± soins podologiques.',
      'Stade 3 (granulome/infection récidivante) : avis chirurgical — évulsion partielle ou totale de l\'ongle.',
    ],
    eviter: [
      'Couper les angles de l\'ongle (aggraver l\'incarnation).',
      'Tripoter l\'ongle ou tenter d\'enlever soi-même la lame incarnée — risque infectieux.',
      'Chaussettes synthétiques qui compriment au stade aigu.',
      'Vernis à ongles épais sur ongle affecté (retarde le diagnostic).',
    ],
    contre_indications: [
      'Patient diabétique ou artéritique : toute lésion du pied (ongle incarné compris) nécessite un avis médical rapide, pas de prise en charge comptoir seule.',
      'Antiseptiques forts type Bétadine alcoolique : irritants sur peau déjà fragilisée, préférer une antisepsie douce.',
      'Tentative d\'évulsion soi-même : jamais recommandée, risque infectieux et de récidive majoré.',
    ],
    signes_alerte: [
      'Pus, traînée rouge remontant le long du pied, fièvre → suspicion de cellulite, consultation médicale urgente.',
      'Patient diabétique avec ongle incarné, même peu symptomatique → consultation rapide systématique.',
      'Granulome ou récidives fréquentes malgré soins bien conduits → avis chirurgical/podologique.',
    ],
    regime: [
      'Pas de régime spécifique ; chaussage adapté et coupe d\'ongle droite sont les vraies mesures préventives.',
    ],
    produits: [
      {nom: 'Scholl spray ou gel ongle incarné', usage: 'Ramollissement du bord unguéal — facilite la tuck technique', texture: 'Spray / Gel', gamme: 'Scholl'},
      {nom: 'Septivon ou Biseptine solution', usage: 'Antisepsie bain de pied si début d\'infection', texture: 'Solution antiseptique', gamme: 'Urgo / Cooper'},
      {nom: 'Compresses stériles + ruban adhésif hypoallergénique', usage: 'Protection mécanique bourrelet après soin', texture: 'Pansement', gamme: 'Générique'},
      {nom: 'Ongle StopOngle (Urgo)', usage: 'Correcteur ongle incarné — traction progressive', texture: 'Dispositif correcteur', gamme: 'Urgo'},
      {nom: '🌿 Bain pied eau tiède + gros sel marin + HE tea tree 2 gouttes', usage: 'Alternative naturelle — antisepsie et ramollissement naturels', texture: 'Naturel', gamme: 'Naturel'},
    ],
    sources: [{label: 'Dermato-info — L\'ongle (ongle incarné)', url: 'https://dermato-info.fr/les-conseils-et-tutos-peau/longle', date: 'consulté 07/2026'}, {label: 'Ameli — Ongle incarné', url: 'https://www.ameli.fr/assure/sante/themes/ongle-incarne', date: 'consulté 07/2026'}]
  },

  {
    id: 'd20', slug: 'prurit-anal', nom: 'Prurit anal',
    categorie: 'specifique', icone: '/icons/dermatologie/prurit-anal.svg',
    description: 'Démangeaison persistante de la région anale. Origine souvent bénigne (mycose, irritation, oxyures) mais doit éliminer une cause organique. Très fréquent, sous-déclaré par pudeur. Question de comptoir délicate à aborder avec tact.',
    symptomes: [
      'Prurit intense anal, surtout nocturne',
      'Brûlures, irritation péri-anale',
      'Lésions de grattage, excoriation',
      'Rougeur et macération péri-anale',
      'Vers blancs visibles dans les selles ou sur le périnée (oxyures)'
    ],
    conseils: [
      'Hygiène douce : eau tiède seule ou savon surgras sans parfum, 1x/jour — le sur-nettoyage agressive aggrave l\'irritation.',
      'Séchage soigneux par tamponnement (jamais frottement) après la toilette.',
      'Sous-vêtements en coton pur, changés quotidiennement.',
      'Si oxyures suspectés (prurit nocturne, enfants) : Fluvermal (flubendazole) ou Vermox sans ordonnance chez > 2 ans — traiter toute la famille simultanément.',
      'Si mycose suspectée (macération, diabète, corticothérapie orale) : antifongique topique local (éconazole).',
      'Orienter vers médecin si persistance > 3 semaines, sang, perte de poids, ou antécédent personnel de cancer colorectal.',
    ],
    eviter: [
      'Papier toilette parfumé ou lingettes avec alcool — irritant majeur.',
      'Scratching — entretient le cycle prurit-grattage-lésions-prurit.',
      'Dermocorticoïdes en automédication au-delà de 7 jours sans diagnostic précis.',
      'Sous-vêtements synthétiques, vêtements trop serrés.',
    ],
    contre_indications: [
      'Anesthésiques locaux (type Tronothane) : usage bref uniquement, risque de sensibilisation cutanée en cas d\'utilisation prolongée.',
      'Dermocorticoïdes : pas en automédication au-delà de 7 jours, et jamais sans diagnostic clair de la cause du prurit.',
      'Flubendazole (oxyures) : traiter toute la famille en même temps pour éviter la réinfestation, respecter la prise à J0 et J14.',
    ],
    signes_alerte: [
      'Persistance > 3 semaines malgré mesures d\'hygiène et traitement adapté → consultation médicale.',
      'Sang dans les selles, perte de poids inexpliquée, antécédent personnel ou familial de cancer colorectal → consultation médicale rapide, ne pas se limiter à un traitement symptomatique.',
      'Lésion visible, masse ou douleur anale importante → avis médical (proctologie).',
    ],
    regime: [
      'Bonne hydratation et fibres alimentaires pour favoriser un transit régulier, limitant l\'irritation locale.',
      'Limiter les irritants alimentaires (épices fortes, alcool, café) en cas de prurit sensible à ces facteurs.',
    ],
    produits: [
      {nom: 'Fluvermal (flubendazole 100mg)', usage: 'Oxyures — sans ordonnance > 2 ans — 1 comprimé, renouveler à J14', texture: 'Comprimé', gamme: 'Zentiva'},
      {nom: 'Pevaryl crème (éconazole 1%)', usage: 'Mycose péri-anale — 2x/jour pendant 28 jours', texture: 'Crème antifongique', gamme: 'Cilag'},
      {nom: 'Tronothane crème anesthésiante', usage: 'Soulagement prurit aigu — courte durée', texture: 'Crème', gamme: 'Solvay'},
      {nom: 'Bepanthol lotion lavante', usage: 'Hygiène douce quotidienne péri-anale', texture: 'Lotion lavante', gamme: 'Bayer'},
      {nom: '🌿 Liniment oléocalcaire + eau de rose', usage: 'Alternative naturelle — nettoyage doux et apaisant, idéal si peau très irritée', texture: 'Naturel', gamme: 'Naturel'},
    ],
    sources: [{label: 'Ameli — Démangeaisons anales', url: 'https://www.ameli.fr/assure/sante/themes/demangeaisons-anales', date: 'consulté 07/2026'}]
  },

  {
    id: 'd21', slug: 'varicelle', nom: 'Varicelle',
    categorie: 'specifique', icone: '__SVG__varicelle.svg__',
    description: 'Primo-infection au virus varicelle-zona (VZV), très contagieuse, touchant surtout l\'enfant entre 2 et 4 ans. Éruption vésiculeuse prurigineuse évoluant par poussées successives.',
    symptomes: ['Éruption vésiculeuse généralisée évoluant par poussées', 'Prurit intense', 'Fièvre modérée', 'Possibles lésions buccales'],
    conseils: [
      'Éviction scolaire jusqu\'à assèchement de toutes les vésicules (environ J7-J10).',
      'Ongles courts et mains propres pour éviter le grattage et la surinfection.',
      'Bains tièdes pluriquotidiens avec savon surgras (assouplissent les croûtes).',
      'Application de lotion à la calamine ou gel d\'aloe vera pour soulager le prurit.',
      'Non contagieux avant l\'éruption (sauf 1-2 jours avant).',
    ],
    eviter: [
      'Aspirine : contre-indiquée (syndrome de Reye).',
      'Ibuprofène : déconseillé (risque d\'infection bactérienne sévère à streptocoque selon données pharmacovigilance).',
      'Antibiotiques : inutiles (viral) sauf surinfection bactérienne.',
      'Corticoïdes systémiques : contre-indiqués (extension virale).',
    ],
    contre_indications: [
      'Aspirine : contre-indiquée chez l\'enfant atteint de varicelle (syndrome de Reye).',
      'Ibuprofène et AINS : déconseillés, risque accru de surinfection bactérienne sévère.',
      'Corticoïdes systémiques : contre-indiqués, risque d\'extension virale.',
    ],
    signes_alerte: [
      'Lésions cutanées très inflammatoires, chaudes, purulentes → surinfection bactérienne → médecin.',
      'Fièvre persistante > 3 jours ou reprise de fièvre → médecin.',
      'Atteinte neurologique (ataxie, céphalées intenses) → urgences (varicelle cérébrale).',
      'Varicelle chez femme enceinte → urgences (risque fœtal).',
      'Varicelle chez immunodéprimé → urgences.',
    ],
    regime: [
      'Alimentation normale, hydratation renforcée.',
      'Si lésions buccales : alimentation froide et molle (yaourt, glaces).',
      'Éviter les aliments acides en cas d\'aphtes buccaux.',
    ],
    produits: [
      {nom: 'Lotion calamine', usage: 'Antiprurigineux local classique — sèche les vésicules', texture: 'Lotion', gamme: 'Générique'},
      {nom: 'Gel aloe vera pur', usage: 'Apaisant et cicatrisant local', texture: 'Gel', gamme: 'Naturel'},
      {nom: 'Antihistaminique adapté à l\'âge (Atarax®)', usage: 'Prurit nocturne invalidant', texture: 'Sirop/Comprimé', gamme: 'UCB Pharma'},
      {nom: 'Paracétamol pédiatrique', usage: 'Antipyrétique et antalgique', texture: 'Sirop/Suppositoire', gamme: 'Générique'},
    ],
    sources: [{label: 'Dermato-info — Varicelle', url: 'https://dermato-info.fr/les-maladies-de-la-peau/varicelle', date: 'consulté 07/2026'}, {label: 'Ameli — Varicelle', url: 'https://www.ameli.fr/assure/sante/themes/varicelle', date: 'consulté 07/2026'}, {label: 'HAS — Herpès cutané, varicelle, zona', url: 'https://www.has-sante.fr/jcms/c_2608703/fr/', date: 'consulté 07/2026'}]
  },

];

const CATEGORIES_DERMATO = [
  { id: 'all',        label: 'Tout voir',                 icone: '/icons/dermatologie/fiche-custom.svg' },
  { id: 'seche',      label: 'Peaux sèches & atopiques',  icone: '🏜️' },
  { id: 'grasse',     label: 'Peaux grasses & acné',      icone: '🔴' },
  { id: 'sensible',   label: 'Peaux sensibles',           icone: '🪷' },
  { id: 'specifique', label: 'Pathologies spécifiques',   icone: '🔷' },
];

/* Normalisation des champs de recherche, mémoïsée sur l'objet au premier accès — calcul paresseux
   plutôt qu'un pré-calcul global, pour rester robuste si un futur dermato-extra.js ajoute des
   entrées à DERMATO_DB après ce script. Utilisé par Search.suggest() dans ui.js. */
function getDermatoSearchIndex(d) {
  if (!d._searchIndex) {
    const norm = s => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    d._searchIndex = { nom: norm(d.nom), desc: norm(d.description) };
  }
  return d._searchIndex;
}

const DermatoAPI = {
  async getAll()            { return [...DERMATO_DB]; },
  async getByCategorie(cat) { return cat === 'all' ? [...DERMATO_DB] : DERMATO_DB.filter(d => d.categorie === cat); },
  async getBySlug(slug)     { return DERMATO_DB.find(d => d.slug === slug) || null; },
  getCategories()           { return CATEGORIES_DERMATO; }
};