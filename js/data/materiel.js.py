# Script d'enrichissement des 26 fiches MAD restantes
# Sources : PDF 08-bandages (bas-contention), PDF 00-prescription (règles générales)
#           web_search pour les informations spécifiques vérifiées

import re

path = '/home/claude/v213/medifiche/js/data/materiel.js'
c = open(path).read()

V = 'consulté 07/2026'
A = 'https://www.ameli.fr'

# ── Table d'enrichissement ──
# Format : slug → { note_append, conseils_add[], source_add[] }
# On COMPLÈTE la note existante (append) et on AJOUTE des conseils sans supprimer les existants
ENRICHMENTS = {

  'bas-contention': {
    'note_append': ' Bandages multitypes de contention veineuse (mémo Ameli MàJ 24/07/2025) : indiqués en 1ère intention dans l\'ulcère actif d\'origine veineuse (stade C6, IPS>0,8). Pas d\'accord préalable. Prescripteurs : tous médecins. Le dispositif peut être laissé en place jusqu\'à 7 jours maximum — renouvellement selon le niveau d\'exsudat et l\'évolution de l\'œdème. La pose du bandage multicouche est une technique complexe nécessitant une formation préalable. Tarifs : KIT BIFLEX® 46,56–51,52€, PROFORE® 15,39–19,76€, ROSIDAL SYS® 54,32–102,50€, URGO K2® 15,46–19,90€, 3M COBAN 2® 18,06€. BIFLEX et ROSIDAL SOFT sont réutilisables (lavage machine) ; PROFORE, URGO K2 et COBAN 2 : usage unique.',
    'conseils_add': [
      'Bandages multitypes : réservés aux ulcères veineux actifs (stade C6, IPS > 0,8) — pas de prise en charge si ulcère cicatrisé ou fermé.',
      'La pose du bandage multicouche est une technique complexe nécessitant une formation — ne pas confondre avec la délivrance simple de bas de contention.',
    ],
    'source_add': [{'label': 'Ameli — Mémo LPP Bandages multitypes (MàJ 24/07/2025)', 'url': 'https://www.ameli.fr/sites/default/files/Documents/08-bandages-multitypes-contention-LPP-memoPS.pdf', 'date': V}],
  },

  'oxymetre-pouls': {
    'note_append': ' Dispositif de surveillance non remboursable sur la LPP en usage courant à domicile. La prise en charge n\'existe que dans des protocoles très spécifiques (ex. protocole Covid-19 de 2021, désormais caduque). Appareil validé CE indispensable : les saturomètres non médicaux (vendus en bijouterie, sport) ne donnent pas de valeurs fiables. Valeurs normales : SpO₂ ≥ 95% au repos chez un adulte sain — toute valeur < 92% persistante doit alerter.',
    'conseils_add': [
      'SpO₂ normale : ≥ 95% au repos. En dessous de 92% persistant ou ≥ 94% avec symptômes respiratoires marqués → orienter vers une consultation médicale urgente.',
    ],
    'source_add': [],
  },

  'tensiometre-bras': {
    'note_append': ' Appareil d\'automesure tensionnelle non remboursable par l\'AM. Seuls les appareils validés cliniquement (liste sur societe-francaise-hypertension-arterielle.org) doivent être recommandés. Méthode des 3 mesures matin et soir pendant 3 jours (règle des 3) : seuil d\'alerte > 135/85 mmHg en automesure. Préférer systématiquement le bras au poignet (moins fiable en cas d\'arythmie ou de mauvaise position).',
    'conseils_add': [
      'Méthode des 3 : 3 mesures matin ET soir pendant 3 jours consécutifs, jamais juste après un effort. Seuil d\'alerte en automesure : > 135/85 mmHg (différent du cabinet médical > 140/90 mmHg).',
    ],
    'source_add': [],
  },

  'stylo-insuline': {
    'note_append': ' Prescripteurs : tous médecins, sages-femmes. Pas d\'accord préalable. La prescription doit préciser le type d\'insuline et le dispositif adapté à l\'insuline prescrite (cartouche compatible). Les stylos jetables pré-remplis ne nécessitent pas de cartouche ; les stylos réutilisables sont rechargés avec des cartouches 3 mL (prise en charge séparée). Conservation : insuline non entamée au réfrigérateur (2–8°C) ; stylo en cours à température ambiante ≤25°C, durée variable selon la référence (28 à 42 jours).',
    'conseils_add': [
      'Conservation : stylo en cours à température ambiante (≤ 25°C, à l\'abri de la lumière) — durée variable selon la référence (28 à 42 jours selon le fabricant). Ne jamais congeler.',
    ],
    'source_add': [],
  },

  'protections-incontinence': {
    'note_append': ' IMPORTANT : les protections anatomiques absorbantes jetables (changes complets, slips absorbants, protections anatomiques) ne sont pas remboursées par l\'Assurance Maladie en usage courant — elles ne figurent pas sur la LPP. Seuls les dispositifs pour incontinence sévère sont pris en charge : étuis péniens, poches de recueil, sondes urinaires (LPP Titre II). Des aides financières alternatives existent : APA (personnes âgées en perte d\'autonomie), PCH (handicap reconnu < 60 ans), forfait mutuelle incontinence. Prescripteurs : médecins (sur ordonnance détaillant le type, la quantité et la durée).',
    'conseils_add': [
      'Les protections absorbantes jetables standard (changes, slips, anatomiques) ne sont PAS remboursées par l\'AM — orienter vers les aides alternatives : APA pour les seniors, PCH pour les personnes handicapées, forfait mutuelle.',
    ],
    'source_add': [{'label': 'Ameli — Incontinence urinaire', 'url': f'{A}/assure/sante/themes/incontinence-urinaire', 'date': V}],
  },

  'siege-de-bain': {
    'note_append': ' Non remboursable par l\'AM sur la LPP standard. Des aides financières alternatives existent selon la situation : AGEFIPH (travailleurs en situation de handicap), MDPH/PCH (personnes handicapées < 60 ans), ANAH-Ma Prime Adapt\' (adaptation du logement), aide de la caisse de retraite (CARSAT, MSA). L\'ergothérapeute peut évaluer le besoin et délivrer une prescription, facilitant l\'accès aux aides.',
    'conseils_add': [],
    'source_add': [],
  },

  'canne-ergonomique': {
    'note_append': ' Prescripteurs : tous médecins, ergothérapeutes. Pas d\'accord préalable. Achat uniquement. Ordonnance simple obligatoire pour la prise en charge (sans ordonnance = aucun remboursement). Tarifs LPP indicatifs : canne en bois 6,10€ (code 1270463), canne anglaise 12,20€/unité (1296787), tripode/quadripode 12,65€ (1200764). Taux de remboursement : 60% (100% si ALD). La canne doit être réglée à la bonne hauteur : poignée au niveau du grand trochanter, coude légèrement fléchi (15–20°).',
    'conseils_add': [
      'Réglage de la hauteur : poignée au niveau du grand trochanter (pli de la hanche), coude légèrement fléchi à 15–20°. Un réglage incorrect augmente le risque de chutes et de lombalgies.',
    ],
    'source_add': [],
  },

  'deambulateur': {
    'note_append': ' Prescripteurs : tous médecins, ergothérapeutes, masseurs-kinésithérapeutes. Pas d\'accord préalable. Achat uniquement. Ordonnance simple obligatoire (préciser le type : sans roues, 2 roues, 4 roues avec ou sans assise). Un seul équipement de même code LPP est pris en charge — l\'AM ne rembourse pas un 2e appareil en parallèle. Le rollator (4 roues avec assise) est indiqué pour les trajets extérieurs plus longs et les patients nécessitant des pauses fréquentes.',
    'conseils_add': [
      'Un seul déambulateur de même type (même code LPP) est pris en charge par l\'AM — la délivrance d\'un appareil supplémentaire n\'est pas remboursée.',
    ],
    'source_add': [],
  },

  'deambulateur-2-roues': {
    'note_append': ' Prescripteurs : tous médecins, ergothérapeutes, masseurs-kinésithérapeutes. Pas d\'accord préalable. Achat uniquement. Indiqué pour les patients nécessitant un soutien léger tout en maintenant une certaine propulsion vers l\'avant (différence avec déambulateur sans roues : moins de stabilité, plus de fluidité de marche). Tarif LPP indicatif : ~53,81€.',
    'conseils_add': [],
    'source_add': [],
  },

  'deambulateur-sans-roues': {
    'note_append': ' Prescripteurs : tous médecins, ergothérapeutes, masseurs-kinésithérapeutes. Pas d\'accord préalable. Achat uniquement. Offre la stabilité maximale mais impose de soulever l\'appareil à chaque pas — adapté aux patients avec peu de force dans les membres inférieurs mais une bonne force des bras. Contre-indiqué si l\'utilisateur ne peut pas soulever l\'appareil de façon répétée.',
    'conseils_add': [],
    'source_add': [],
  },

  'fauteuil-roulant': {
    'note_append': ' Réforme VPH du 1er décembre 2025 : tous les fauteuils roulants inscrits à la LPP sont désormais remboursés à 100% (sans reste à charge sur la base LPP), en achat comme en location. Fauteuils manuels non modulaires (FMP/FMPR) : prescription tout médecin ou ergothérapeute, pas de DAP. Fauteuils modulaires (FRM, FRMC, FRMA…) : prescription médecin MPR ou DU Appareillage + ergothérapeute, DAP obligatoire (Cerfa 11164*04), fiche d\'évaluation et essai requis. FRE (électrique modulaire) : idem + essai pratique avec certificat d\'aptitude à la conduite.',
    'conseils_add': [
      'Réforme VPH déc. 2025 : tous les fauteuils roulants inscrits à la LPP sont pris en charge à 100% — plus de reste à charge sur la base LPP (achat ou location).',
    ],
    'source_add': [],
  },

  'semelles-orthopediques': {
    'note_append': ' Prescripteurs : tous médecins, pédicures-podologues. Pas d\'accord préalable. Achat uniquement. La prise en charge est subordonnée à des critères précis : affection podologique justifiée (hallux valgus, trouble statique sévère, pied diabétique, post-chirurgical…). L\'ordonnance doit préciser l\'indication et le type de semelle (thermoformée, milieu de gamme, etc.). Les semelles de série non prescrites ne sont pas remboursées.',
    'conseils_add': [],
    'source_add': [{'label': 'Ameli — Remboursement semelles orthopédiques', 'url': f'{A}/assure/remboursements/rembourse/medicaments-vaccins-dispositifs-medicaux/semelles-orthopediques-orthese-plantaire-prise-en-charge', 'date': V}],
  },

  'epaississants': {
    'note_append': ' Prescripteurs : tous médecins, orthophonistes. Pas d\'accord préalable. Indication exclusive : dysphagie avec troubles de déglutition documentés (bilan orthophonique ou gériatrique recommandé). L\'ordonnance doit préciser la consistance cible selon la classification IDDSI (niveau 0 à 4 : liquide, néctar, miel, pudding). Les épaississants non prescrits ou pour simple confort ne sont pas remboursés. Vérifier la compatibilité avec les médicaments inclus dans la prise.',
    'conseils_add': [
      'Classification IDDSI : préciser le niveau de texture (1 = liquide légèrement épaissi, 2 = néctar, 3 = miel, 4 = pudding). Les épaississants à base d\'amidon et ceux à base de gomme xanthane ont des comportements différents à la chaleur et avec les acides.',
    ],
    'source_add': [],
  },

  'attelle-poignet': {
    'note_append': ' Prescripteurs : tous médecins, masseurs-kinésithérapeutes, ergothérapeutes. Pas d\'accord préalable. Achat uniquement. L\'ordonnance doit préciser le type d\'orthèse (repos nocturne, active de jour, de stabilisation), le côté (droit/gauche) et l\'indication. Codes LPPR spécifiques selon le modèle (poignet rigide 2182755 ~41,64€, poignet-main 2159526 ~56,64€, poignet-pouce 2189800 ~53,18€ — source PDF LPP p.1044).',
    'conseils_add': [],
    'source_add': [],
  },

  'bequilles': {
    'note_append': ' Prescripteurs : tous médecins, ergothérapeutes, masseurs-kinésithérapeutes. Pas d\'accord préalable. Achat uniquement. Ordonnance simple obligatoire. Tarifs LPP (source PDF officiel p.848) : béquilles axillaires 18,29€/paire (1261872), canne anglaise à appui antébrachial 12,20€/unité (1296787). Taux : 60% base LPP (100% si ALD). La hauteur doit être réglée avec la pointe à 15 cm du pied, coude fléchi à 30° (béquilles axillaires) ou poignée au grand trochanter (cannes anglaises).',
    'conseils_add': [
      'Réglage béquilles axillaires : appui axillaire à 3–4 cm du creux axillaire (pas de contact direct pour éviter la compression du plexus brachial), coude fléchi à 30°.',
    ],
    'source_add': [],
  },

  'aerosol-compresseur': {
    'note_append': ' Prescripteurs : tous médecins, sages-femmes, infirmiers (dans le cadre d\'actes infirmiers). Note importante : les appareils générateurs d\'aérosols ne sont PAS codés dans la base LPP classique — ils figurent en annexe PDF de la nomenclature (code nature de prestation ARO). La prise en charge se fait via des forfaits de location selon le type d\'appareil et la pathologie (asthme sévère, mucoviscidose, BPCO…). Consommables (nébuliseur, tubulures, interface) : à usage unique par patient, pris en charge séparément. Achat : possible pour certains appareils à tamis (ex. eFlow Rapid, Velox).',
    'conseils_add': [
      'Les générateurs d\'aérosols ne sont pas codés dans la base LPP numérique — consulter la version PDF de la nomenclature sur ameli.fr ou le formulaire ARO. La délivrance en officine se fait en location pour la majorité des cas.',
    ],
    'source_add': [{'label': 'CRAMIF — Aérosolthérapie : prescription et prise en charge', 'url': 'https://www.cramif.fr/actualites/aerosoltherapie-prescription-et-prise-en-charge-des-medicaments-et-des-dispositifs', 'date': V}],
  },

  'aspirateur-nasal': {
    'note_append': ' Pas de code LPP pour les aspirateurs nasaux électriques en usage courant — non remboursables en standard. Certains modèles médicaux peuvent faire l\'objet d\'une prise en charge ponctuelle sur avis de pédiatre (mucoviscidose, pathologie ORL récurrente sévère). L\'ordonnance est recommandée même sans remboursement pour documenter l\'indication médicale (nourrisson, enfant atteint de pathologie respiratoire chronique).',
    'conseils_add': [
      'Nettoyer le bec et les tubulures après chaque usage (eau savonneuse) et désinfecter régulièrement. Ne jamais partager l\'embout entre enfants.',
    ],
    'source_add': [],
  },

  'peak-flow-meter': {
    'note_append': ' Prescripteurs : tous médecins. Pas d\'accord préalable. Pris en charge pour le suivi de l\'asthme à domicile (plan d\'action personnalisé). L\'ordonnance doit préciser la fréquence de mesure (matin/soir) et la durée. Renouvellement annuel possible. La surveillance du DEP (débit expiratoire de pointe) est un élément clé du suivi de l\'asthme : zone verte (≥80% de la valeur théorique ou personnelle), zone orange (60–80% : adapter le traitement), zone rouge (<60% : urgence).',
    'conseils_add': [
      'Interprétation : zone verte ≥80% de la meilleure valeur personnelle = asthme contrôlé. Zone orange 60–80% = traitement à adapter selon le plan d\'action. Zone rouge <60% = urgence médicale.',
    ],
    'source_add': [],
  },

  'tire-lait': {
    'note_append': ' Prescripteurs : tous médecins, sages-femmes, puéricultrices. Pas d\'accord préalable. La location d\'un tire-lait électrique double pompe est prise en charge les 28 premiers jours en cas d\'hospitalisation du nouveau-né (prématurité, pathologie). Au-delà ou hors hospitalisation : non remboursée sauf protocole spécifique. Les accessoires (kit personnel : embout, téterelle, tubulures, biberons) sont à usage personnel et pris en charge séparément sur prescription.',
    'conseils_add': [
      'Le kit personnel (embout, téterelle, tubulures) est à usage strictement personnel — ne jamais partager entre patientes même si l\'appareil est loué. Prise en charge séparée sur prescription.',
    ],
    'source_add': [],
  },

  'urostimulateur': {
    'note_append': ' Prescripteurs : tous médecins, sages-femmes, masseurs-kinésithérapeutes (dans le cadre de soins). Pas d\'accord préalable. La rééducation périnéale par biofeedback électrostimulatoire nécessite un bilan préalable et une prescription du nombre de séances. Les appareils de rééducation sont remboursés dans le cadre d\'une prescription médicale avec objectif documenté. Un bilan kinésithérapique préalable est fortement recommandé pour valider l\'indication et les paramètres de stimulation.',
    'conseils_add': [],
    'source_add': [],
  },

  'neurostimulateur': {
    'note_append': ' Achat ou location (non cumulables). La location est limitée à 6 mois maximum. Un test d\'efficacité/essai préalable est requis (évaluation de la douleur) avant la prescription à long terme. Câbles de stimulation (code 1100672), accumulateur rechargeable (1128647) facturés séparément. Le TENS est contre-indiqué en cas de stimulateur cardiaque, implant métallique à proximité des électrodes, grossesse (hors protocole spécialisé), épilepsie non contrôlée. Tarif LPP : location 1189940 (jusqu\'à 6 mois), achat 1183468.',
    'conseils_add': [
      'TENS : contre-indiqué en cas de stimulateur cardiaque ou pace-maker, défibrillateur, thrombose veineuse profonde ou thrombophlébite, épilepsie non contrôlée, grossesse (hors protocole spécifique).',
    ],
    'source_add': [],
  },

  'table-de-lit': {
    'note_append': ' Non pris en charge séparément par la LPP — considéré comme accessoire de confort. En pratique, prescrit en accompagnement d\'un lit médicalisé mais non remboursé individuellement. Vérifier si certains prestataires l\'incluent dans leurs forfaits de location de lit médicalisé (certains le proposent gratuitement avec la location). Utile pour maintenir l\'autonomie du patient (repas, lecture, tablette) sans mobilisation du soignant.',
    'conseils_add': [],
    'source_add': [],
  },

  'potence-de-lit': {
    'note_append': ' Rappel clé : non prise en charge si un lit médicalisé est déjà remboursé — elle est alors incluse dans le forfait du lit (codes 1241763 location / 1270316 achat). La prise en charge isolée s\'applique aux patients utilisant leur propre lit (non médicalisé). Location hebdomadaire : ≤65 semaines 2,29€ (code 1273415), au-delà 1,52€ (1201858) + forfait livraison 1293412.',
    'conseils_add': [],
    'source_add': [],
  },

  'fauteuil-transfert': {
    'note_append': ' Prescripteurs : tous médecins, ergothérapeutes. Pas d\'accord préalable. Achat uniquement. Le fauteuil de transfert est un fauteuil roulant à propulsion par tierce personne, léger, destiné aux déplacements sur courte distance et aux transferts (ambulance, hôpital, courses). Il n\'est pas adapté à un usage autonome quotidien — dans ce cas, orienter vers un fauteuil roulant standard. Prise en charge dans la nomenclature VPH (100% depuis décembre 2025).',
    'conseils_add': [],
    'source_add': [],
  },

  'fauteuil-releveur': {
    'note_append': ' Non remboursable sur la LPP en standard — considéré comme équipement de confort/sécurité. Des aides financières alternatives existent : MaPrimeAdapt\' (ANAH) pour l\'adaptation du logement, aide CARSAT/MSA (personnes âgées), PCH/MDPH (personnes handicapées), aide du Conseil Départemental, déduction fiscale pour les personnes âgées ou handicapées (crédit d\'impôt services à la personne). L\'ergothérapeute peut faire une évaluation et aider à constituer les dossiers d\'aide.',
    'conseils_add': [
      'Non remboursé par l\'AM : orienter vers les aides au financement — MaPrimeAdapt\' (ANAH), CARSAT, PCH/MDPH selon le profil du patient. L\'ergothérapeute peut aider à constituer le dossier.',
    ],
    'source_add': [],
  },

  'matelas-a-air': {
    'note_append': ' Prescripteurs : tous médecins, ergothérapeutes. Pas d\'accord préalable. Achat (avec option location pour certains surmatelas à air motorisés : 10,88€/semaine en LPP). Indication : patients à risque d\'escarre élevé (Norton ≤ 14) ou lésions médullaires. Les matelas à air motorisés (avec compresseur) sont classés 1B — renouvellement tous les 2 ans. Vérifier la pression du compresseur régulièrement (alarme si coupure de courant). Tarif indicatif : surmatelas à air avec compresseur 294,64€ (classe 1B).',
    'conseils_add': [
      'Prévoir une solution de secours en cas de coupure de courant : le compresseur s\'arrête et la protection anti-escarre est nulle — conserver un coussin de mousse de substitution et signaler l\'alarme sonore du compresseur à l\'entourage.',
    ],
    'source_add': [],
  },
}
