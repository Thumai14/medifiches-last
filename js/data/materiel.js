/* MediFiche — MATERIEL_DB */

'use strict';

const MATERIEL_DB = [
  // ─── CARDIAQUE & VASCULAIRE ───
  { id: 'm8', slug: 'bas-contention', nom: 'Bas de contention classe 2', categorie: 'cardiaque', icone: '__SVG__bas de contention.svg__',
    description: 'Orthèse élastique de compression médicale dégressive (pression maximale à la cheville, décroissante vers le haut). La classe 2 (20,1 à 27 hPa à la cheville) est la plus couramment prescrite en 1ère intention. Existe en version jarret (mi-mollet) ou cuisse, élastique 1 ou 2 sens, en série ou sur mesure.',
    indication: 'Insuffisance veineuse chronique (jambes lourdes, varices), prévention et traitement de l\'œdème veineux, prévention de la thrombose veineuse profonde (TVP) — notamment en période post-opératoire, lors de voyages prolongés, ou pendant la grossesse, accompagnement des suites de sclérothérapie ou de chirurgie veineuse.',
    conseils: [
      'Enfiler le matin, avant le lever, lorsque l\'œdème est minimal — l\'enfilage en fin de journée est nettement moins efficace et plus difficile.',
      'Mesure précise du tour de cheville, mollet et longueur de jambe indispensable : un bas mal calibré perd son efficacité thérapeutique et peut créer un effet garrot inversé.',
      'Utiliser un enfile-bas ou des gants en caoutchouc facilite la pose, particulièrement chez les personnes à mobilité réduite ou en surpoids.',
      'Renouvellement tous les 6 mois en moyenne (élasticité qui se dégrade avec les lavages répétés), même en l\'absence d\'usure visible.',
      'Lavage à la main ou cycle délicat à basse température recommandé pour préserver l\'élasticité ; éviter l\'essorage agressif et le sèche-linge.',
    ],
    contre_indications: [
      'Artériopathie oblitérante des membres inférieurs (AOMI) sévère ou non évaluée — un bilan vasculaire (index de pression systolique) est nécessaire avant prescription si un doute existe sur la composante artérielle.',
      'Phlegmatia coerulea ou ischémie aiguë du membre — urgence vasculaire, contention formellement contre-indiquée.',
      'Dermatose suintante, infectée ou très inflammatoire sur la zone de pose, sauf avis médical contraire.',
      'Troubles sévères de la sensibilité cutanée (neuropathie périphérique avancée, notamment diabétique) rendant la surveillance de la tolérance difficile par le patient lui-même.',
    ],
    remboursement: {
      mention: 'Remboursable sur prescription',
      code_lppr: 'Variable selon forme/classe — ex. 2116557 (bas jarret série, élastique 1 sens, classe I) [⚠️ code exact non confirmé dans le PDF source pour la classe 2 générique, à vérifier sur la prescription précise]',
      taux: '60% de la base de remboursement Sécurité Sociale (100% si ALD/CMU) — base : chaussette 21,96€ / bas 29,18€ / collant 41,19€',
      note: 'Exemple concret : pour un bas acheté 36€, la base de remboursement est de 29,18€ → Sécurité Sociale rembourse 60% de cette base (17,51€), la complémentaire santé peut compléter jusqu\'à 100% de la base (11,67€) selon le contrat (ligne "Appareillage" ou "Prothèses médicales orthopédiques" du tableau de garanties), et le dépassement au-delà de la base (6,82€ ici) reste à la charge du patient sauf meilleure prise en charge mutuelle. Les dates de fin de prise en charge affichées dans la nomenclature officielle sont indicatives : un code reste actif tant qu\'aucune décision explicite de radiation n\'a été publiée.',
    },
    otc: ['Crème veinotonique', 'Gel apaisant jambes lourdes', 'Complément veinotonique (vigne rouge, marron d\'Inde)'],
    pathologies_liees: ['diabete-type-2', 'hypertension'],
    sources: [{label: "HAS — Compression médicale en insuffisance veineuse", url: "https://www.has-sante.fr/jcms/c_272500/fr/la-compression-medicale"}, {label: "Nomenclature LPP — Titre II Ch.1", url: "https://www.ameli.fr/pharmacien/exercice-professionnel/nomenclatures-codifications/lppr"}, {label: "ANSM — Dispositifs de compression", url: "https://ansm.sante.fr"}] },
  { id: 'm9', slug: 'oxymetre-pouls', nom: 'Oxymètre de pouls', categorie: 'cardiaque', icone: '__SVG__oxymetre de pouls.svg__',
    description: 'Pléthysmographe portable mesurant par voie transcutanée (au doigt généralement) la saturation pulsée en oxygène (SpO2) et la fréquence cardiaque, par absorption différentielle de lumière à deux longueurs d\'onde. Mesure instantanée, non invasive, en quelques secondes.',
    indication: 'Surveillance à domicile de patients asthmatiques, BPCO, insuffisants cardiaques ou respiratoires chroniques ; suivi des infections respiratoires (grippe, bronchiolite, COVID) pour repérer une désaturation ; usage sportif ou altitude (non médical).',
    conseils: [
      'Ongles vernis, faux ongles ou vernis sombre faussent la mesure — utiliser un doigt sans vernis ou nettoyer l\'ongle avant la mesure.',
      'Extrémités froides ou mauvaise circulation périphérique (Raynaud, vasoconstriction) peuvent donner une mesure peu fiable ou un échec de lecture.',
      'Une valeur isolée ponctuelle a moins de valeur qu\'une tendance dans le temps : conseiller de noter les mesures si suivi d\'une pathologie chronique.',
      'SpO2 < 94-95% au repos chez une personne auparavant normale, ou désaturation rapide à l\'effort : orienter vers une consultation médicale rapide, ne pas se contenter de l\'auto-interprétation.',
      'Ne remplace jamais une consultation médicale ni un avis clinique — c\'est un outil de surveillance, pas de diagnostic.',
    ],
    contre_indications: [
      'Aucune contre-indication formelle à l\'usage (dispositif non invasif), mais fiabilité réduite en cas de mauvaise perfusion périphérique, de mouvement excessif du doigt, ou de lumière ambiante très intense.',
      'Intoxication au monoxyde de carbone : l\'oxymètre de pouls classique peut afficher une SpO2 faussement normale ou élevée (ne distingue pas l\'oxyhémoglobine de la carboxyhémoglobine) — ne pas s\'y fier dans ce contexte spécifique.',
    ],
    remboursement: {
      mention: 'Non remboursable',
      note: '[⚠️ Recherche effectuée dans le PDF LPP officiel (mise à jour juin 2026) : aucune section dédiée trouvée pour l\'oxymètre de pouls grand public] L\'oxymétrie de pouls n\'est prise en charge par l\'Assurance Maladie que lorsqu\'elle est intégrée à un autre dispositif médical déjà remboursé (par exemple certains appareils de PPC pour apnée du sommeil avec monitoring intégré), pas comme appareil autonome vendu en pharmacie. Le modèle grand public reste donc à la charge intégrale du patient.',
    },
    otc: [],
    pathologies_liees: ['asthme', 'hypertension'],
    sources: [{label: "HAS — Oxymétrie de pouls", url: "https://www.has-sante.fr"}, {label: "ANSM — Dispositifs de mesure SpO2", url: "https://ansm.sante.fr"}, {label: "Nomenclature LPP", url: "https://www.ameli.fr/pharmacien/exercice-professionnel/nomenclatures-codifications/lppr"}] },
  { id: 'm10', slug: 'tensiometre-bras', nom: 'Tensiomètre bras homologué', categorie: 'cardiaque', icone: '__SVG__Tensiometre de bras homologue.svg__',
    description: 'Appareil automatique de mesure de la pression artérielle par brassard huméral (bras), homologué selon la norme NF C 74-313. Certains modèles intègrent une détection de fibrillation auriculaire et une mémoire de plusieurs dizaines de mesures avec moyennage automatique.',
    indication: 'Hypertension artérielle connue ou suspectée, automesure tensionnelle dans le cadre du suivi cardiologique (règle des 3), dépistage à domicile, suivi de l\'efficacité d\'un traitement antihypertenseur.',
    conseils: [
      'Mesurer assis, dos soutenu, après au moins 5 minutes de repos, sans avoir fumé, bu du café ni fait d\'effort dans les 30 minutes précédentes.',
      'Brassard positionné au niveau du cœur, taille du brassard adaptée à la circonférence du bras (un brassard trop petit surestime la tension, trop grand la sous-estime).',
      'Règle des 3 pour l\'automesure : 3 mesures consécutives à 1-2 minutes d\'intervalle, matin et soir, pendant 3 jours, en notant chaque valeur ou en utilisant la mémoire de l\'appareil.',
      'Brassard poignet déconseillé en 1ère intention pour le dépistage et le suivi médical (moins fiable que le brassard bras) — à réserver à un usage de confort occasionnel.',
      'Une lecture ponctuelle élevée isolée ne doit pas alarmer : c\'est la tendance sur plusieurs jours qui compte pour la décision médicale, à transmettre au médecin.',
    ],
    contre_indications: [
      'Aucune contre-indication formelle à l\'usage du tensiomètre lui-même (dispositif non invasif), mais certaines arythmies importantes (fibrillation auriculaire notamment) peuvent rendre la mesure automatique moins fiable selon les modèles.',
      'Ne pas utiliser sur un bras porteur d\'une perfusion, d\'une fistule artério-veineuse de dialyse, ou du côté d\'un curage ganglionnaire (notamment après chirurgie du sein) sans avis médical.',
    ],
    remboursement: {
      mention: 'Non remboursable',
      note: '[⚠️ Recherche effectuée dans le PDF LPP officiel (mise à jour juin 2026) : aucune section dédiée trouvée pour l\'automesure tensionnelle grand public] La LPP ne couvre que l\'automesure de l\'INR chez les patients sous antivitamine K (dispositif différent, sans rapport avec la tension artérielle). Le tensiomètre d\'automesure tensionnelle reste donc à la charge intégrale du patient, qu\'il soit prescrit ou non par le médecin.',
    },
    otc: [],
    pathologies_liees: ['hypertension'],
    sources: [{label: "HAS — Automesure tensionnelle", url: "https://www.has-sante.fr/jcms/c_1600164/fr/fiche-de-bon-usage-automesure-tensionnelle"}, {label: "SFHTA — Recommandations", url: "https://www.sfhta.eu"}, {label: "Nomenclature LPP", url: "https://www.ameli.fr/pharmacien/exercice-professionnel/nomenclatures-codifications/lppr"}] },

  // ─── DIABÈTE & SURVEILLANCE ───
  { id: 'm11', slug: 'capteur-glycemie-continue', nom: 'Capteur de glycémie en continu (CGM)', categorie: 'diabete', icone: '__SVG__capteur de glycemie.svg__',
    description: 'Système flash ou continu d\'autosurveillance du glucose interstitiel, mesurant en temps réel via un capteur sous-cutané porté 14 jours, avec lecture par scan (lecteur dédié ou smartphone) ou transmission continue. Alarmes configurables en cas d\'hypo/hyperglycémie.',
    indication: 'Diabète de type 1 ou de type 2 (adultes et enfants ≥ 4 ans) traités par insulinothérapie intensifiée (pompe externe ou ≥ 3 injections/jour) et pratiquant une autosurveillance glycémique pluriquotidienne (≥ 3-4 mesures/jour).',
    conseils: [
      'Port du capteur 14 jours puis remplacement systématique — limite réglementaire de prise en charge à 26 capteurs maximum par an et par patient.',
      'Scanner le capteur au moins toutes les 8 heures : un intervalle plus long fait perdre les données accumulées dans la mémoire du capteur depuis le dernier scan.',
      'Fiabilité réduite le 1er jour de pose : informer le patient que les premières valeurs peuvent être moins précises, vigilance accrue pendant cette période.',
      'Garder un lecteur de glycémie capillaire classique disponible : nécessaire en cas de panne du capteur, de doute sur une valeur affichée, ou si le fabricant recommande une vérification (notamment en cas de variation glycémique rapide).',
      'Formation initiale du patient indispensable avant utilisation (pose, interprétation des courbes, conduite à tenir selon les résultats) — généralement assurée par une structure d\'éducation thérapeutique.',
    ],
    contre_indications: [
      'Allergie connue aux composants du capteur ou de l\'adhésif (réaction cutanée locale possible, à rechercher notamment en cas d\'antécédent avec un capteur similaire).',
      'Incapacité du patient (ou de son entourage) à comprendre et utiliser le système — un critère d\'arrêt prévu dès la période d\'essai initiale.',
      'Mauvaise tolérance cutanée répétée du capteur, incapacité à porter un capteur en permanence.',
    ],
    remboursement: {
      mention: 'Remboursable sur prescription',
      code_lppr: '[⚠️ code spécifique non extrait précisément du PDF pour cette fiche générique — varie selon le fabricant/modèle (FreeStyle Libre, Dexcom...), se référer à la prescription]',
      taux: '100% en général (ALD diabète) — à vérifier selon la situation du patient',
      note: 'Prescription initiale réservée à un diabétologue ou un pédiatre expérimenté en diabétologie. Période d\'essai obligatoire de 1 à 3 mois avant la prescription de longue durée, avec évaluation clinique (hypoglycémies sévères, temps dans la cible, HbA1c) avant la poursuite. Après cette période, le renouvellement peut être assuré par tout médecin. La prise en charge du CGM exclut celle d\'un lecteur de glycémie capillaire classique en parallèle (sauf bandelettes/lancettes de vérification, limitées à 100/an dans ce cadre).',
    },
    otc: ['Bandelettes de cétonurie/cétonémie (en cas d\'hyperglycémie)'],
    pathologies_liees: ['diabete-type-2'],
    sources: [{label: "HAS — Capteurs de glycémie en continu", url: "https://www.has-sante.fr/jcms/p_3361754/fr/systemes-de-mesure-en-continu-du-glucose-interstitiel"}, {label: "Nomenclature LPP — Titre I Ch.1", url: "https://www.ameli.fr/pharmacien/exercice-professionnel/nomenclatures-codifications/lppr"}, {label: "SFD — Recommandations autosurveillance", url: "https://www.sfdiabete.org"}] },
  { id: 'm12', slug: 'lecteur-glycemie', nom: 'Lecteur de glycémie', categorie: 'diabete', icone: '__SVG__lecteur de glycemie.svg__',
    description: 'Appareil de mesure de la glycémie capillaire par prélèvement au doigt (bandelette réactive + autopiqueur), résultat en quelques secondes. Mémoire de plusieurs centaines de mesures avec courbes de tendance, certains modèles transmettent les données par Bluetooth.',
    indication: 'Diabète de type 1 et de type 2 traités par insuline ou par sulfamides hypoglycémiants, surveillance des hypoglycémies, vérification ponctuelle en complément d\'un capteur de glycémie en continu (CGM).',
    conseils: [
      'Se laver les mains à l\'eau et au savon avant la mesure — les traces de sucre alimentaire sur les doigts peuvent fausser significativement le résultat.',
      'Piquer sur le côté du doigt plutôt qu\'au centre de la pulpe (moins de terminaisons nerveuses, moins douloureux), en alternant les doigts.',
      'Bandelettes à conserver à température ambiante, flacon refermé immédiatement après usage (l\'humidité et la lumière altèrent les résultats), à utiliser avant la date de péremption une fois le flacon ouvert.',
      'Autopiqueur à usage strictement individuel, à changer régulièrement (l\'aiguille s\'émousse et rend la piqûre plus douloureuse).',
      'Vérifier la cohérence du lecteur avec les bandelettes (calibration parfois nécessaire selon le modèle) — un code erroné peut fausser toutes les mesures suivantes.',
    ],
    contre_indications: [
      'Aucune contre-indication formelle à l\'usage du dispositif (prélèvement capillaire mineur), prudence chez les patients sous anticoagulants (saignement au point de piqûre légèrement prolongé) ou présentant des troubles sévères de la coagulation.',
    ],
    remboursement: {
      mention: 'Remboursable sur prescription',
      code_lppr: '1108350 (kit complet ACCU-CHEK MOBILE, exemple) ou 1199297 (set de prélèvement seul)',
      taux: '100% en général (ALD diabète) — à vérifier selon la situation du patient',
      note: 'Exemple sourcé dans le PDF LPP : kit ACCU-CHEK MOBILE (lecteur + autopiqueur + cassette de tests), code 1108350, tarif 58,08€, garanti 4 ans, renouvellement possible tous les 4 ans. Le set complet ne peut être pris en charge qu\'une seule fois par patient (à l\'instauration de l\'autosurveillance) ; au-delà, seuls les consommables (bandelettes, autopiqueur, lancettes) sont renouvelés séparément. Autopiqueur seul (code 1117454, 11,78€) : 1 attribution/an chez l\'adulte, 2/an chez l\'enfant.',
    },
    otc: ['Resucrage (gel ou comprimés de glucose)', 'Bandelettes de cétonurie'],
    pathologies_liees: ['diabete-type-2'],
    sources: [{label: "HAS — Autosurveillance glycémique", url: "https://www.has-sante.fr/jcms/c_1242816/fr/autosurveillance-glycemique"}, {label: "Nomenclature LPP — Titre I Ch.1", url: "https://www.ameli.fr/pharmacien/exercice-professionnel/nomenclatures-codifications/lppr"}, {label: "SFD — Recommandations 2023", url: "https://www.sfdiabete.org"}] },
  { id: 'm13', slug: 'stylo-insuline', nom: 'Stylo injecteur d\'insuline', categorie: 'diabete', icone: '__SVG__stylo-a-insuline.svg__',
    description: 'Dispositif d\'injection sous-cutanée d\'insuline, réutilisable (avec cartouche remplaçable) ou jetable pré-rempli, à dose réglable par crans. Aiguille fine et courte adaptable, à usage unique.',
    indication: 'Diabète insulino-requérant (type 1 ou type 2 en échec des traitements oraux), nécessitant une ou plusieurs injections quotidiennes d\'insuline.',
    conseils: [
      'Changer l\'aiguille à chaque injection — la réutilisation émousse la pointe (douleur accrue) et favorise la formation de microlipodystrophies au point d\'injection.',
      'Rotation systématique des sites d\'injection (abdomen, cuisses, bras, fesses) pour éviter les lipodystrophies qui altèrent l\'absorption de l\'insuline et déséquilibrent la glycémie.',
      'Conserver l\'insuline non utilisée au réfrigérateur (2-8°C, jamais au congélateur) ; une fois le stylo entamé, conservation à température ambiante pendant 4 semaines maximum (durée variable selon l\'insuline, vérifier la notice).',
      'Vérifier l\'aspect de l\'insuline avant chaque injection (limpide pour les insulines rapides, homogène après remise en suspension pour les insulines intermédiaires/lentes en suspension).',
      'Purger l\'air du stylo avant chaque injection (test de sécurité) pour garantir l\'exactitude de la dose délivrée.',
    ],
    contre_indications: [
      'Aucune contre-indication au dispositif lui-même ; vigilance sur l\'adéquation entre le stylo et le type de cartouche/insuline (certains stylos sont spécifiques à une marque ou un dosage, ne pas mélanger).',
      'Lipodystrophie ou induration au site d\'injection habituel : changer de zone, ne pas insister sur une zone déjà altérée (absorption imprévisible de l\'insuline).',
    ],
    remboursement: {
      mention: 'Remboursable sur prescription',
      code_lppr: '1132086 ou 1131690 (stylo réutilisable avec aiguille/réservoir) ; aiguilles 1138077 (B/100) ou 1112391 (B/200)',
      taux: '100% en général (ALD diabète) — à vérifier selon la situation du patient',
      note: 'Codes et tarifs sourcés dans le PDF LPP officiel : stylo réutilisable à cartouches préremplies ou avec réservoir non réutilisable, tarif 42,00€ TTC. Aiguilles stériles non réutilisables adaptables au stylo : 14,42€ (boîte de 100) ou 28,85€ (boîte de 200). Les stylos jetables pré-remplis spécifiques à une insuline donnée peuvent avoir des codes différents selon le laboratoire — se référer à la prescription précise.',
    },
    otc: ['Resucrage (gel ou comprimés de glucose)', 'Conteneur DASTRI pour aiguilles usagées'],
    pathologies_liees: ['diabete-type-2'],
    sources: [{label: "HAS — Insulinothérapie", url: "https://www.has-sante.fr/jcms/c_1242557/fr/strategie-medicamenteuse-du-controle-glycemique-du-diabete-de-type-2"}, {label: "Nomenclature LPP — Titre I Ch.1", url: "https://www.ameli.fr/pharmacien/exercice-professionnel/nomenclatures-codifications/lppr"}, {label: "SFD — Recommandations insulinothérapie", url: "https://www.sfdiabete.org"}] },

  // ─── HYGIÈNE & CONFORT ───
  { id: 'm14', slug: 'lit-medicalise', nom: 'Lit médicalisé électrique', categorie: 'hygiene', icone: '__SVG__lit medicalise.svg__',
    description: 'Lit articulé à commande électrique, réglage indépendant du dossier et de la partie jambes, hauteur variable facilitant les transferts et les soins. Barrières de sécurité latérales amovibles, plusieurs gammes (standard, enfant 3-12 ans, renforcé >135 kg).',
    indication: 'Perte d\'autonomie motrice transitoire ou définitive, soins palliatifs, suites de chirurgie lourde, prévention et traitement des escarres, maintien à domicile de patients dépendants.',
    conseils: [
      'Position semi-assise (dossier relevé à 30-45°) recommandée pendant et après les repas pour limiter le risque de fausse route, particulièrement chez les patients à mobilité réduite.',
      'Matelas ou surmatelas anti-escarres à associer systématiquement en cas d\'alitement prolongé — le lit seul ne prévient pas les escarres.',
      'Hauteur du lit à ajuster pour les transferts (la plus basse pour le coucher/lever autonome, plus haute pour faciliter les soins par un tiers).',
      'Barrières latérales : évaluer le bénéfice/risque selon l\'état cognitif du patient — recommandées en cas de risque de chute mais peuvent être anxiogènes ou inadaptées chez un patient confus (risque de blessure en tentant de les franchir).',
      'Vérifier le bon fonctionnement de la télécommande et son accessibilité pour le patient si celui-ci doit régler le lit lui-même.',
    ],
    contre_indications: [
      'Aucune contre-indication formelle au lit médicalisé lui-même ; vigilance sur le choix du modèle selon le poids du patient (gamme standard limitée, modèle renforcé au-delà de 135 kg).',
    ],
    remboursement: {
      mention: 'Remboursable sur prescription',
      code_lppr: '1241763 (location standard) / 1283879 (location enfant) / 1249523 (location >135kg) / 1235662 (achat lit spécifique)',
      taux: '60% du tarif LPPR (100% si ALD/CMU) — à vérifier selon la situation du patient',
      note: 'Tarifs sourcés dans le PDF LPP officiel : location hebdomadaire lit standard 12,22€ (code 1241763), lit enfant 25,00€ (1283879), lit >135kg 22,81€ (1249523). Achat d\'un lit spécifique (besoins particuliers liés au poids/pathologie) pris en charge sur devis, plafonné à 1030€, renouvelable après 5 ans. Accessoires pris en charge séparément : alèse imperméable (1207453, 6,86€), cerceau (1225675, 8,00€), matelas simple (1211383, 85,00€). Forfait de livraison/installation : 238,11€ (code 1274047) pour les lits en location. Les dates de fin de prise en charge affichées dans la nomenclature sont indicatives, sans effet sur la validité réelle du remboursement.',
    },
    otc: ['Crème ou mousse de prévention des escarres'],
    pathologies_liees: [],
    sources: [{label: "HAS — Lits médicaux à domicile", url: "https://www.has-sante.fr"}, {label: "Nomenclature LPP — Titre II Ch.2", url: "https://www.ameli.fr/pharmacien/exercice-professionnel/nomenclatures-codifications/lppr"}, {label: "ANSM — Dispositifs MAD", url: "https://ansm.sante.fr"}] },
  { id: 'm15', slug: 'protections-incontinence', nom: 'Protections anatomiques incontinence', categorie: 'hygiene', icone: '__SVG__couche.svg__',
    description: 'Protections absorbantes anatomiques à usage unique (forme culotte, change complet ou protection anatomique avec filet de maintien), discrètes sous les vêtements, avec indice d\'absorption croissant selon le niveau de fuite (léger, modéré, fort, très fort).',
    indication: 'Incontinence urinaire ou mixte (urinaire et fécale) légère à sévère, période post-opératoire urologique ou gynécologique, perte d\'autonomie, troubles neurologiques avec incontinence.',
    conseils: [
      'Choisir l\'indice d\'absorption selon le volume réel de pertes (légère, modérée, forte, très forte) — une protection surdimensionnée n\'est pas plus efficace et peut être moins confortable.',
      'Changer régulièrement, sans attendre la saturation complète, pour limiter le risque de macération et d\'irritation cutanée (dermite du siège).',
      'Associer systématiquement une crème protectrice périnéale à base d\'oxyde de zinc en cas de port prolongé ou de peau fragile.',
      'Bien ajuster la taille à la morphologie (tour de taille/hanches) : une protection mal ajustée fuit davantage qu\'une protection bien dimensionnée mais moins absorbante.',
      'Orienter vers une évaluation médicale si l\'incontinence est récente, s\'aggrave, ou s\'accompagne de signes inhabituels (douleur, sang, fièvre) — ne pas se limiter à l\'appareillage sans bilan de la cause.',
    ],
    contre_indications: [
      'Aucune contre-indication formelle au dispositif ; vigilance chez les patients à peau très fragile (escarres, dermatoses) où le port prolongé peut aggraver les lésions sans surveillance rapprochée.',
    ],
    remboursement: {
      mention: 'Non remboursable',
      note: '[⚠️ Recherche effectuée dans le PDF LPP officiel (mise à jour juin 2026) : confirmé que la nomenclature ne couvre que les étuis péniens, manchons périgénitaux et urinaux — PAS les protections absorbantes anatomiques classiques type change complet ou culotte absorbante] Ces protections restent à la charge du patient ou de sa complémentaire santé (certains contrats incluent un forfait "incontinence" ou "matériel médical divers"). Une prise en charge partielle existe via l\'APA (Allocation Personnalisée d\'Autonomie) ou la PCH (Prestation de Compensation du Handicap) selon la situation du patient — orienter vers une assistante sociale si besoin.',
    },
    otc: ['Crème protectrice périnéale (oxyde de zinc)', 'Lingettes nettoyantes sans rinçage'],
    pathologies_liees: [],
    sources: [{label: "HAS — Incontinence urinaire de la femme", url: "https://www.has-sante.fr/jcms/c_1511578/fr/incontinence-urinaire-de-la-femme"}, {label: "Nomenclature LPP — Titre II Ch.7", url: "https://www.ameli.fr/pharmacien/exercice-professionnel/nomenclatures-codifications/lppr"}, {label: "AFU — Recommandations", url: "https://www.urofrance.org"}] },
  { id: 'm16', slug: 'siege-de-bain', nom: 'Siège de bain / douche', categorie: 'hygiene', icone: '__SVG__siege de bain.svg__',
    description: 'Siège ou tabouret antidérapant, hauteur réglable, à poser dans la baignoire ou la douche pour sécuriser la toilette en position assise. Fixation par ventouses ou pieds antidérapants, poids maximal supporté généralement autour de 130 kg selon les modèles.',
    indication: 'Perte d\'autonomie, période post-opératoire (notamment orthopédique), personnes âgées, troubles de l\'équilibre, prévention des chutes dans la salle de bain.',
    conseils: [
      'Vérifier l\'adhérence des ventouses avant chaque utilisation — un dépôt de calcaire ou une surface non parfaitement lisse réduit fortement leur efficacité.',
      'Associer à une barre d\'appui murale fixée solidement pour faciliter l\'assise et le relevé en toute sécurité.',
      'Nettoyer et sécher le siège après chaque utilisation : l\'humidité résiduelle favorise le développement de moisissures, notamment sous l\'assise et au niveau des fixations.',
      'Vérifier la stabilité du siège sur le fond de la baignoire ou de la douche avant la première utilisation, en présence de l\'aidant si besoin.',
      'Privilégier un modèle avec dossier et accoudoirs en cas de faiblesse du tronc ou de risque de bascule.',
    ],
    contre_indications: [
      'Aucune contre-indication formelle ; vérifier le poids maximal supporté par le modèle choisi avant l\'achat selon la morphologie du patient.',
    ],
    remboursement: {
      mention: 'Non remboursable',
      note: '[⚠️ Recherche effectuée dans le PDF LPP officiel (mise à jour juin 2026) : aucune section trouvée pour le siège de bain/douche] Ce type d\'aide technique au confort et à la sécurité de la toilette n\'est pas inscrit à la nomenclature LPPR. Reste à la charge du patient ; une participation peut exister via l\'APA, la PCH, ou certaines caisses de retraite complémentaire selon la situation — orienter vers une assistante sociale si besoin.',
    },
    otc: [],
    pathologies_liees: [],
    sources: [{label: "HAS — Aides techniques MAD", url: "https://www.has-sante.fr"}, {label: "Nomenclature LPP — Titre II Ch.4", url: "https://www.ameli.fr/pharmacien/exercice-professionnel/nomenclatures-codifications/lppr"}, {label: "ANAP — Référentiel aides techniques", url: "https://www.anap.fr"}] },

  // ─── MOBILITÉ ───
  { id: 'm1', slug: 'canne-ergonomique', nom: 'Canne ergonomique réglable', categorie: 'mobilite', icone: '__SVG__cane.svg__',
    description: 'Canne de marche réglable en hauteur, en bois ou en aluminium léger, avec poignée anatomique anti-dérapante répartissant la pression sur la paume. Embout caoutchouc antidérapant en bout de canne.',
    indication: 'Appui unilatéral en cas d\'arthrose de hanche ou de genou, suites de fracture des membres inférieurs, instabilité légère à modérée de la marche, soulagement d\'une douleur articulaire à la marche.',
    conseils: [
      'Tenir la canne du côté opposé à la douleur ou à la jambe la plus faible — règle de base souvent mal connue des patients, à expliquer systématiquement.',
      'Avancer la canne en même temps que la jambe atteinte, puis la jambe saine, pour un schéma de marche à 2 temps cohérent.',
      'Hauteur correcte : poignée au niveau du grand trochanter (hanche), coude fléchi à environ 15-20° lorsque la main tient la poignée, bras le long du corps.',
      'Embout caoutchouc à vérifier régulièrement — l\'usure réduit l\'adhérence et augmente le risque de glissade, notamment sur sol mouillé.',
      'Canne tripode ou quadripode à privilégier en cas de besoin d\'appui plus stable (meilleur équilibre que la canne simple, au prix d\'un encombrement plus important).',
    ],
    contre_indications: [
      'Aucune contre-indication formelle ; une canne mal adaptée (mauvaise hauteur, mauvais côté) peut aggraver les douleurs ou créer des compensations posturales délétères (épaule, dos).',
    ],
    remboursement: {
      mention: 'Remboursable sur prescription',
      code_lppr: '1270463 (canne bois) / 1296787 (canne métal réglable) / 1200764 (canne tripode/quadripode)',
      taux: '60% du tarif LPPR (100% si ALD/CMU) — à vérifier selon la situation du patient',
      note: 'Tarifs sourcés dans le PDF LPP officiel : canne en bois 6,10€, canne métallique réglable en hauteur 12,20€, canne tripode ou quadripode 12,65€. Canne blanche pour patient malvoyant/aveugle : code distinct 1206880, 6,86€. Les dates de fin de prise en charge affichées dans la nomenclature sont indicatives, sans effet sur la validité réelle du remboursement.',
    },
    otc: [],
    pathologies_liees: ['douleur-arthrose'],
    sources: [{label: "HAS — Aides à la marche", url: "https://www.has-sante.fr"}, {label: "Nomenclature LPP — Titre II Ch.3", url: "https://www.ameli.fr/pharmacien/exercice-professionnel/nomenclatures-codifications/lppr"}, {label: "ANSM — Dispositifs aide à la marche", url: "https://ansm.sante.fr"}] },
  { id: 'm2', slug: 'deambulateur', nom: 'Déambulateur 4 roues', categorie: 'mobilite', icone: '__SVG__deambulateur 4 roues.svg__',
    description: 'Cadre de marche sur 4 roues pivotantes, avec siège intégré, panier de rangement et freins de type vélo (frein de parking à l\'arrêt). Plus fluide à manier que le 2 roues, adapté aux sols réguliers.',
    indication: 'Troubles de l\'équilibre, faiblesse musculaire des membres inférieurs, suites d\'AVC, besoin de sécurisation de la marche sur de longues distances ou pour les sorties à l\'extérieur.',
    conseils: [
      'Régler la hauteur des poignées au niveau du poignet, bras le long du corps, coude légèrement fléchi.',
      'Vérifier le bon fonctionnement des freins avant chaque utilisation — un frein mal serré ou usé est une cause fréquente de chute.',
      'Ne pas utiliser dans les escaliers ni sur terrain très accidenté : le déambulateur est conçu pour une marche sur sol plat et stable.',
      'Le siège intégré permet une pause assise en cas de fatigue, mais ne doit pas être confondu avec un usage prolongé comme fauteuil (pas de dossier ergonomique).',
      'Vérifier régulièrement l\'état des roulettes (usure, blocage) qui conditionne la fluidité et la sécurité du déplacement.',
    ],
    contre_indications: [
      'Troubles cognitifs sévères empêchant la compréhension de l\'utilisation des freins — risque de chute par mauvaise manipulation, évaluation au cas par cas.',
      'Terrain très accidenté ou escaliers : usage non adapté, prévoir une aide différente (canne adaptée, accompagnement humain) pour ces situations.',
    ],
    remboursement: {
      mention: 'Remboursable sur prescription',
      code_lppr: '1285619 (achat) / 1225646 (location ≤26 sem) / 1260418 (location >26 sem)',
      taux: '60% du tarif LPPR (100% si ALD/CMU) — à vérifier selon la situation du patient',
      note: 'Tarifs sourcés dans le PDF LPP officiel : achat 53,81€, location courte durée (≤26 semaines) 2,21€/semaine, location longue durée (>26 semaines) 1,34€/semaine. Forfait de livraison/installation pour la location : 12,96€ (code 1290968). La nomenclature LPP ne distingue pas explicitement déambulateur 2 roues et 4 roues : ces codes couvrent le déambulateur générique, quel que soit le nombre de roues.',
    },
    otc: [],
    pathologies_liees: ['douleur-arthrose'],
    sources: [{label: "HAS — Déambulateurs et cadres de marche", url: "https://www.has-sante.fr"}, {label: "Nomenclature LPP — Titre II Ch.3", url: "https://www.ameli.fr/pharmacien/exercice-professionnel/nomenclatures-codifications/lppr"}, {label: "ANAP — Référentiel mobilité", url: "https://www.anap.fr"}] },
  { id: 'm3', slug: 'fauteuil-roulant', nom: 'Fauteuil roulant manuel', categorie: 'mobilite', icone: '__SVG__fauteuil roulant.svg__',
    description: 'Fauteuil roulant pliant léger à propulsion manuelle, repose-pieds amovibles, accoudoirs rabattables facilitant les transferts. Catégorie FMP (fauteuil manuel pliant) dans la classification officielle, la plus simple et la plus courante.',
    indication: 'Incapacité à la marche prolongée ou totale, période post-opératoire, pathologies neurologiques limitant la mobilité, besoin de déplacement autonome ou avec tierce assistance.',
    conseils: [
      'Vérifier la pression des pneus régulièrement (si pneumatiques) — une pression insuffisante augmente l\'effort de propulsion et l\'usure.',
      'Adapter la largeur et la profondeur du siège à la morphologie du patient : un fauteuil trop large favorise les mauvaises postures et les points de pression asymétriques.',
      'Formation de l\'accompagnant aux techniques de transfert recommandée (lit-fauteuil, fauteuil-toilettes) pour limiter les risques de chute et les troubles musculo-squelettiques de l\'aidant.',
      'Coussin anti-escarres à associer systématiquement en cas d\'usage prolongé (plusieurs heures par jour) pour prévenir les points d\'appui ischiatiques.',
      'Vérifier le verrouillage des freins avant chaque transfert assis-debout ou debout-assis.',
    ],
    contre_indications: [
      'Aucune contre-indication formelle au fauteuil roulant lui-même ; le choix du modèle (largeur, type d\'assise, dossier) doit être adapté à la pathologie et à la morphologie — un mauvais choix peut favoriser escarres ou troubles posturaux.',
    ],
    remboursement: {
      mention: 'Remboursable sur prescription',
      code_lppr: '4544151 (achat neuf, catégorie FMP) / 1268182 (location ≤13 sem) / 1291028 (location 14-26 sem)',
      taux: '60% du tarif LPPR (100% si ALD/CMU) — à vérifier selon la situation du patient',
      note: 'Tarifs sourcés dans le PDF LPP officiel : achat fauteuil manuel pliant standard (FMP) 360,53€ TTC, location courte durée (≤13 semaines) 3,82€/semaine, location 14-26 semaines 2,97€/semaine. Option d\'achat après une période de location : code 1267633, 108,16€. Pour les besoins plus complexes (fauteuils modulaires, électriques, châssis spécifiques), la classification LPP prévoit d\'autres catégories (FMPR, FRM...) avec des codes et tarifs différents — orienter vers un prestataire spécialisé pour ces cas.',
    },
    otc: ['Coussin anti-escarres (si non déjà fourni)'],
    pathologies_liees: [],
    sources: [{label: "HAS — Fauteuils roulants", url: "https://www.has-sante.fr/jcms/c_1739369/fr/fauteuils-roulants-et-autres-vehicules-pour-personnes-handicapees"}, {label: "Nomenclature LPP — Titre II Ch.3", url: "https://www.ameli.fr/pharmacien/exercice-professionnel/nomenclatures-codifications/lppr"}, {label: "APF France handicap", url: "https://www.apf-francehandicap.org"}] },
  { id: 'm4', slug: 'semelles-orthopediques', nom: 'Semelles orthopédiques sur mesure', categorie: 'mobilite', icone: '__SVG__semelle orthopedique.svg__',
    description: 'Orthèses plantaires thermoformées, réalisées sur mesure après examen podologique (podoscope, podogramme), corrigeant la posture du pied et répartissant les zones d\'appui plantaire. À distinguer des semelles de confort en vente libre, non personnalisées.',
    indication: 'Arthrose du genou ou de la hanche avec trouble de l\'appui, pied diabétique à risque (décharge des zones de pression), fasciite plantaire, troubles de la statique du pied (pied plat, pied creux), métatarsalgies.',
    conseils: [
      'Porter les semelles tous les jours, dans toutes les chaussures adaptées (semelle retirable, volume suffisant) — un port irrégulier réduit fortement l\'efficacité corrective.',
      'Prévoir une période d\'adaptation progressive (quelques heures par jour la première semaine) en cas de semelles très correctrices, pour éviter l\'inconfort initial.',
      'Remplacement tous les 12 à 18 mois en moyenne, ou plus tôt en cas d\'usure visible ou de changement de la pathologie sous-jacente.',
      'Chaussures fermées à lacets ou à scratch recommandées pour bien maintenir la semelle et le pied ; les chaussures ouvertes ou trop souples limitent l\'efficacité.',
      'Chez le patient diabétique : vérifier régulièrement l\'absence de point de frottement ou de lésion cutanée liée à la semelle (perte de sensibilité possible masquant une blessure).',
    ],
    contre_indications: [
      'Plaie ou lésion cutanée active au point d\'appui prévu de la semelle : adapter ou différer la fabrication jusqu\'à cicatrisation, sauf avis podologique contraire.',
    ],
    remboursement: {
      mention: 'Remboursable sur prescription',
      code_lppr: '2180450 / 2122121 / 2140455 (par pointure) ou 2158449 (semelle monobloc résine)',
      taux: '60% du tarif LPPR (100% si ALD/CMU) — à vérifier selon la situation du patient',
      note: 'Tarifs sourcés dans le PDF LPP officiel : environ 13 à 14€ par paire selon la pointure (codes variables), semelle monobloc en résine thermoformée 27,34€. Prise en charge réservée aux semelles réalisées sur mesure après examen clinique du pied (podoscope/podogramme) — les semelles de série ou de confort vendues sans prescription ne sont jamais remboursées.',
    },
    otc: ['Crème podologique réparatrice (talons, callosités)'],
    pathologies_liees: ['douleur-arthrose', 'diabete-type-2'],
    sources: [{label: "HAS — Orthèses plantaires", url: "https://www.has-sante.fr"}, {label: "Nomenclature LPP — Titre II Ch.1", url: "https://www.ameli.fr/pharmacien/exercice-professionnel/nomenclatures-codifications/lppr"}, {label: "SOFCOT — Recommandations", url: "https://www.sofcot.fr"}] },

  // ─── NUTRITION ───
  { id: 'm17', slug: 'complement-nutritionnel', nom: 'Compléments nutritionnels oraux (CNO)', categorie: 'nutrition', icone: '__SVG__nutrition.svg__',
    description: 'Boissons, crèmes ou potages hypercaloriques et hyperprotidiques destinés à compléter une alimentation insuffisante, disponibles en de nombreuses saveurs et textures, environ 200-300 kcal par unité avec 10-20g de protéines selon les formules.',
    indication: 'Dénutrition ou risque de dénutrition diagnostiqué, perte de poids involontaire, anorexie, période post-chimiothérapie ou post-chirurgicale, personnes âgées à appétit réduit.',
    conseils: [
      'Servir frais ou avec des glaçons pour améliorer la palatabilité — la plupart des CNO sont mieux acceptés froids que tièdes.',
      'Prendre en collation entre les repas plutôt qu\'à leur place, pour ne pas réduire davantage la prise alimentaire normale.',
      'Suivi du poids hebdomadaire recommandé pour évaluer l\'efficacité de la complémentation et ajuster si besoin avec le prescripteur.',
      'Varier les saveurs et les textures (boisson, crème, potage) pour limiter la lassitude gustative en cas de prise prolongée.',
      'En cas de diabète associé, vérifier l\'index glycémique et la teneur en glucides du produit choisi avec le prescripteur.',
    ],
    contre_indications: [
      'Allergie ou intolérance à l\'un des composants (lactose, protéines de lait, gluten selon les formules) — vérifier la composition précise du produit choisi.',
      'Troubles sévères de la déglutition non évalués : un avis orthophonique ou médical est nécessaire avant introduction si une dysphagie est suspectée (risque de fausse route).',
    ],
    remboursement: {
      mention: 'Remboursable sur prescription',
      code_lppr: '1100241 et codes similaires selon la formule (boisson, crème, potage)',
      taux: '60% du tarif LPPR (100% si ALD/CMU) — à vérifier selon la situation du patient',
      note: 'Tarif sourcé dans le PDF LPP officiel : environ 5,18€ par boîte de 4 unités pour les références type 1100241 (tarif variable selon la formule exacte). Prise en charge conditionnée à des critères de dénutrition précis (perte de poids ≥5%/mois ou ≥10%/6 mois, IMC abaissé, score MNA, albuminémie basse selon l\'âge) — la 1ère prescription est limitée à 1 mois, avec une 1ère délivrance de 10 jours seulement : le pharmacien a un rôle explicite d\'adaptation du complément selon l\'observance et la tolérance avant la suite de la délivrance.',
    },
    otc: ['Vitamine D', 'Complexe multivitaminé adapté à la personne âgée'],
    pathologies_liees: [],
    sources: [{label: "HAS — Compléments nutritionnels oraux", url: "https://www.has-sante.fr/jcms/c_1264980/fr/complementation-nutritionnelle-orale"}, {label: "Nomenclature LPP — Titre III Ch.1", url: "https://www.ameli.fr/pharmacien/exercice-professionnel/nomenclatures-codifications/lppr"}, {label: "SFNCM — Recommandations nutrition", url: "https://www.sfncm.org"}] },
  { id: 'm18', slug: 'epaississants', nom: 'Épaississants alimentaires', categorie: 'nutrition', icone: '__SVG__nutrition.svg__',
    description: 'Poudre instantanée sans saveur ajoutée, à diluer dans les liquides ou aliments pour en modifier la texture selon plusieurs niveaux de consistance (nectar, miel, pudding/crème) afin de sécuriser la déglutition.',
    indication: 'Troubles de la déglutition oropharyngée (dysphagie) chez les personnes de plus de 3 ans, le plus souvent dans un contexte post-AVC, maladie neurologique (Parkinson, sclérose en plaques) ou démence évoluée.',
    conseils: [
      'Suivre strictement les recommandations de texture données par l\'orthophoniste ou l\'équipe soignante (nectar, miel ou pudding) — une texture inadaptée augmente le risque de fausse route.',
      'Peser ou mesurer les doses avec précision (cuillère-mesure fournie), ne pas approximer : une concentration insuffisante ne sécurise pas la déglutition, une concentration excessive peut rendre la prise désagréable ou difficile.',
      'Vérifier la tolérance initiale avec l\'équipe soignante, notamment chez les patients très fragiles ou en début de prise en charge.',
      'Respecter un temps de repos après dilution (variable selon les produits, souvent quelques minutes) pour que l\'épaississement atteigne sa texture finale avant de servir.',
      'Certains produits épaississent davantage avec le temps (notamment au contact de la salive) : prévenir l\'aidant de ce phénomène pour éviter une texture trop épaisse en fin de repas.',
    ],
    contre_indications: [
      'Dysphagie non évaluée par un professionnel : l\'introduction d\'un épaississant ne doit pas se substituer à un bilan de la déglutition (orthophonique ou médical) déterminant la texture réellement adaptée.',
    ],
    remboursement: {
      mention: 'Remboursable sur prescription',
      code_lppr: '1174937 (Clinutren ThickenUp Clear) ou 1192042 (Gel\'Clear)',
      taux: '60% du tarif LPPR (100% si ALD/CMU) — à vérifier selon la situation du patient',
      note: 'Tarifs sourcés dans le PDF LPP officiel : Clinutren ThickenUp Clear 12,00€, Gel\'Clear 9,10€ (tarifs au conditionnement de référence). Indication réservée à la dysphagie oropharyngée chez les patients de plus de 3 ans — prescription initiale par le médecin, souvent sur recommandation orthophonique.',
    },
    otc: [],
    pathologies_liees: [],
    sources: [{label: "HAS — Troubles de la déglutition", url: "https://www.has-sante.fr/jcms/c_1260376/fr/prise-en-charge-de-la-dysphagie"}, {label: "Nomenclature LPP — Titre III", url: "https://www.ameli.fr/pharmacien/exercice-professionnel/nomenclatures-codifications/lppr"}, {label: "SFNEP — Recommandations dysphagies", url: "https://www.sfnep.org"}] },

  // ─── POST-OPÉRATOIRE ───
  { id: 'm19', slug: 'attelle-poignet', nom: 'Attelle de repos poignet', categorie: 'mobilite', icone: '__SVG__atelle de repos poignet.svg__',
    description: 'Orthèse thermoformable ou préformée maintenant le poignet en position neutre ou en légère extension, fermeture par velcro réglable, parfois renfort métallique ou plastique rigide intégré selon le degré d\'immobilisation recherché.',
    indication: 'Syndrome du canal carpien, tendinite du poignet ou de De Quervain, suites de fracture du poignet (après accord du chirurgien), entorse du poignet.',
    conseils: [
      'Porter surtout la nuit pour le syndrome du canal carpien — c\'est en position de flexion prolongée pendant le sommeil que la compression du nerf médian est la plus marquée.',
      'Retirer l\'attelle pour les séances de rééducation ou de mobilisation active selon la prescription du médecin ou du kinésithérapeute, ne pas l\'utiliser en continu sans réévaluation.',
      'Nettoyer régulièrement l\'attelle et la peau en dessous (contact cutané prolongé, risque de macération ou d\'irritation, surtout en été).',
      'Vérifier que les velcros maintiennent correctement le poignet en position neutre sans compression excessive (risque de gêne circulatoire ou de paresthésies si trop serrée).',
      'Évaluer la gêne fonctionnelle au quotidien (toilette, habillage) et adapter le port aux activités si la prescription le permet.',
    ],
    contre_indications: [
      'Plaie cutanée ouverte ou infectée sous la zone de pose, sauf protection adaptée et avis médical.',
      'Troubles sévères de la sensibilité ou de la circulation du membre rendant la surveillance de la tolérance difficile par le patient lui-même.',
    ],
    remboursement: {
      mention: 'Remboursable sur prescription',
      code_lppr: '2145984 (attelle extension poignet) et codes variables selon le type exact d\'attelle',
      taux: '60% du tarif LPPR (100% si ALD/CMU) — à vérifier selon la situation du patient',
      note: 'Tarif sourcé dans le PDF LPP officiel pour l\'attelle d\'extension du poignet : 45,63€ (code 2145984). D\'autres références existent selon le mouvement à corriger et le degré de rigidité, avec des tarifs variant approximativement de 45 à 94€ — se référer à la prescription précise pour le code exact. [⚠️ L\'attelle de repos simple type "canal carpien" vendue couramment en pharmacie peut correspondre à une référence différente selon le fabricant — vérifier la correspondance exacte avec le code LPPR avant facturation]',
    },
    otc: ['Gel ou patch anti-inflammatoire local', 'Bande de contention/strapping'],
    pathologies_liees: ['douleur-arthrose'],
    sources: [{label: "HAS — Orthèses du membre supérieur", url: "https://www.has-sante.fr"}, {label: "Nomenclature LPP — Titre II Ch.1", url: "https://www.ameli.fr/pharmacien/exercice-professionnel/nomenclatures-codifications/lppr"}, {label: "SFCM — Recommandations main", url: "https://www.sfcm.fr"}] },
  { id: 'm20', slug: 'bequilles', nom: 'Béquilles axillaires / avant-bras', categorie: 'mobilite', icone: '__SVG__Bequilles axillaires.svg__',
    description: 'Béquilles réglables en aluminium, modèle axillaire (appui sous le bras, avec barre de préhension) ou modèle avant-bras dit "canadienne" (appui sur l\'avant-bras avec poignée), selon la prescription et le type d\'appui recherché.',
    indication: 'Fracture du membre inférieur, suites de chirurgie orthopédique (prothèse de hanche ou de genou), entorse grave de la cheville ou du genou, décharge totale ou partielle d\'un membre.',
    conseils: [
      'Réglage de la hauteur de poignée : niveau du pli du poignet, bras le long du corps, coude légèrement fléchi.',
      'Béquilles axillaires : l\'appui doit se faire sur les mains et non sous les aisselles — un appui prolongé sous l\'aisselle comprime le nerf radial et peut provoquer une paralysie transitoire du poignet ("paralysie des béquilles").',
      'Vérifier régulièrement les embouts antidérapants (usure, durcissement) — un embout lisse ou fendu augmente fortement le risque de glissade.',
      'Expliquer le schéma de marche adapté à la prescription (décharge complète : béquilles puis jambe saine ; décharge partielle : appui progressif autorisé) — une mauvaise utilisation retarde la consolidation ou aggrave la blessure.',
      'Hauteur des poignées des canadiennes à régler également, en complément de la hauteur globale, pour un appui confortable de l\'avant-bras.',
    ],
    contre_indications: [
      'Troubles sévères de l\'équilibre ou des membres supérieurs (force, coordination) rendant l\'usage des béquilles dangereux — orienter vers un déambulateur ou un fauteuil roulant selon l\'évaluation.',
    ],
    remboursement: {
      mention: 'Remboursable sur prescription',
      code_lppr: '1261872 (paire, béquilles d\'aisselle réglables)',
      taux: '60% du tarif LPPR (100% si ALD/CMU) — à vérifier selon la situation du patient',
      note: 'Tarif sourcé dans le PDF LPP officiel : 18,29€ la paire pour les béquilles d\'aisselle réglables en hauteur, tout type, à l\'achat. [⚠️ Code spécifique pour les béquilles avant-bras (canadiennes) non confirmé précisément dans le PDF — vérifier la référence exacte selon le modèle prescrit]',
    },
    otc: ['Crème apaisante mains/paumes (en cas d\'usage prolongé)'],
    pathologies_liees: ['douleur-arthrose'],
    sources: [{label: "HAS — Aides à la marche", url: "https://www.has-sante.fr"}, {label: "Nomenclature LPP — Titre II Ch.3", url: "https://www.ameli.fr/pharmacien/exercice-professionnel/nomenclatures-codifications/lppr"}, {label: "ANSM — Dispositifs aide à la marche", url: "https://ansm.sante.fr"}] },

  // ─── RESPIRATOIRE ───
  { id: 'm5', slug: 'aerosol-compresseur', nom: 'Aérosolthérapie par compresseur', categorie: 'respiratoire', icone: '__SVG__aerosol therapy.svg__',
    description: 'Nébuliseur pneumatique transformant un médicament liquide en microgouttelettes inhalables via un compresseur d\'air et un masque ou embout buccal, permettant une administration locale directe dans les voies aériennes.',
    indication: 'Asthme (notamment crises sévères ou patient ne pouvant utiliser les aérosols-doseurs), BPCO, mucoviscidose, bronchiolite du nourrisson, toute situation nécessitant l\'administration de bronchodilatateurs ou de corticoïdes inhalés par nébulisation.',
    conseils: [
      'Nettoyer le masque et la cuve à nébulisation après chaque utilisation à l\'eau tiède savonneuse, bien sécher avant rangement — un matériel mal entretenu est une source de contamination bactérienne.',
      'Changer le filtre du compresseur selon la notice du fabricant (périodicité variable selon les modèles et la fréquence d\'usage).',
      'Ne jamais partager le matériel entre patients sans désinfection complète, en particulier en cas de pathologie infectieuse ou de mucoviscidose (risque de transmission croisée).',
      'Position semi-assise pendant la séance pour optimiser le dépôt pulmonaire du médicament, respiration calme et régulière par la bouche si embout buccal utilisé.',
      'Durée de séance généralement 10 à 15 minutes selon le volume de médicament et le débit de l\'appareil — ne pas interrompre avant la fin recommandée par la prescription.',
    ],
    contre_indications: [
      'Aucune contre-indication formelle au dispositif lui-même ; le choix de la molécule nébulisée relève de la prescription médicale et de ses propres contre-indications.',
    ],
    remboursement: {
      mention: 'Remboursable sur prescription',
      code_lppr: '1163342 (achat nébuliseur + masque) / 1134458 (location courte durée)',
      taux: '60% du tarif LPPR (100% si ALD/CMU) — à vérifier selon la situation du patient',
      note: 'Tarifs sourcés dans le PDF LPP officiel : achat du nébuliseur avec masque ou embout buccal 12,93€, location courte durée (≤4 semaines) 9,30€/semaine. Pour un besoin ponctuel et court (ex. bronchiolite aiguë), la location est souvent plus pertinente économiquement que l\'achat.',
    },
    otc: ['Sérum physiologique pour dilution si besoin'],
    pathologies_liees: ['asthme'],
    sources: [{label: "HAS — Aérosolthérapie", url: "https://www.has-sante.fr/jcms/c_272507/fr/asthme-et-rhinite-allergique"}, {label: "Nomenclature LPP — Titre II Ch.6", url: "https://www.ameli.fr/pharmacien/exercice-professionnel/nomenclatures-codifications/lppr"}, {label: "SPLF — Recommandations aérosolthérapie", url: "https://splf.fr"}] },
  { id: 'm6', slug: 'aspirateur-nasal', nom: 'Aspirateur nasal électrique', categorie: 'respiratoire', icone: '__SVG__sinusite aigue.svg__',
    description: 'Dispositif d\'aspiration douce des sécrétions nasales par embout adapté, puissance réglable selon l\'âge et la tolérance, à pile ou sur secteur selon les modèles (à distinguer du mouche-bébé manuel buccal).',
    indication: 'Nourrissons et jeunes enfants ne sachant pas se moucher seuls, rhinite allergique sévère encombrante, sinusite chronique avec sécrétions difficiles à évacuer.',
    conseils: [
      'Utiliser avec du sérum physiologique avant l\'aspiration : il fluidifie les sécrétions et améliore nettement l\'efficacité du geste.',
      'Limiter à 3-4 aspirations par jour maximum — un usage trop fréquent peut irriter la muqueuse nasale et créer un effet inverse (inflammation, sécrétions réactionnelles).',
      'Nettoyer l\'embout après chaque usage (risque infectieux et de transmission, notamment en collectivité ou entre frères et sœurs).',
      'Choisir une puissance adaptée à l\'âge de l\'enfant — débuter à puissance minimale chez le nourrisson et ajuster selon la tolérance.',
      'Privilégier les moments où l\'enfant est calme (avant les repas ou le coucher) plutôt qu\'en pleine crise de pleurs pour un geste plus efficace et moins traumatisant.',
    ],
    contre_indications: [
      'Saignement de nez actif ou récent : différer l\'aspiration ou adapter la douceur du geste selon la situation.',
      'Lésion ou irritation visible de la muqueuse nasale : éviter l\'aspiration sur la zone lésée.',
    ],
    remboursement: {
      mention: 'Non remboursable',
      note: '[⚠️ Recherche effectuée dans le PDF LPP officiel (mise à jour juin 2026) : aucune section trouvée pour l\'aspirateur nasal électrique] Ce dispositif de confort et d\'hygiène nasale n\'est pas inscrit à la nomenclature LPPR et reste à la charge intégrale du patient/des parents.',
    },
    otc: ['Sérum physiologique unidose', 'Spray nasal eau de mer isotonique'],
    pathologies_liees: ['rhinite-allergique', 'allergie-pollen'],
    sources: [{label: "HAS — Rhinopharyngites du nourrisson", url: "https://www.has-sante.fr/jcms/c_272486/fr/rhinopharyngite-aigue-du-nourrisson"}, {label: "ANSM — Dispositifs de désobstruction nasale", url: "https://ansm.sante.fr"}, {label: "Nomenclature LPP", url: "https://www.ameli.fr/pharmacien/exercice-professionnel/nomenclatures-codifications/lppr"}] },
  { id: 'm7', slug: 'peak-flow-meter', nom: 'Peak-flow meter', categorie: 'respiratoire', icone: '__SVG__peakflow meter.svg__',
    description: 'Débitmètre de pointe portable mesurant le débit expiratoire maximal (DEP) lors d\'une expiration forcée, outil simple d\'autosurveillance permettant de détecter une dégradation de la fonction respiratoire avant l\'apparition de symptômes francs.',
    indication: 'Asthme modéré à sévère, suivi à domicile de la fonction respiratoire, adaptation du traitement de fond en lien avec le médecin, identification précoce d\'une exacerbation.',
    conseils: [
      'Mesurer le matin, avant la prise du bronchodilatateur, pour une valeur représentative de l\'état de base — recommandé également en complément en soirée selon le plan d\'action prescrit.',
      'Noter systématiquement les valeurs dans un carnet de suivi ou une application dédiée pour visualiser la tendance dans le temps, plus informative qu\'une valeur isolée.',
      'Établir avec le médecin le "meilleur score personnel" du patient en période stable, qui servira de référence pour interpréter les mesures suivantes.',
      'Orienter vers une consultation rapide ou l\'application du plan d\'action personnalisé si la valeur descend sous 80% du meilleur score personnel, et vers une urgence si elle descend sous 50%.',
      'Technique de mesure à vérifier régulièrement (debout, inspiration profonde puis expiration la plus forte et rapide possible) — une mauvaise technique fausse complètement l\'interprétation.',
    ],
    contre_indications: [
      'Aucune contre-indication formelle à l\'usage du dispositif ; un effort expiratoire forcé répété peut être mal toléré en cas de pneumothorax récent ou de chirurgie thoracique/abdominale récente — avis médical dans ce contexte.',
    ],
    remboursement: {
      mention: 'Non remboursable',
      note: '[⚠️ Recherche effectuée dans le PDF LPP officiel (mise à jour juin 2026) : aucune section trouvée pour le débitmètre de pointe (peak-flow meter)] Ce dispositif de surveillance reste à la charge intégrale du patient, qu\'il soit conseillé ou non par le médecin dans le cadre du plan d\'action de l\'asthme.',
    },
    otc: [],
    pathologies_liees: ['asthme'],
    sources: [{label: "HAS — Suivi de l'asthme à domicile", url: "https://www.has-sante.fr/jcms/c_1005214/fr/asthme"}, {label: "GINA Guidelines 2024", url: "https://ginasthma.org"}, {label: "SPLF — Recommandations suivi asthme", url: "https://splf.fr"}] },

  // ─── MATERNITÉ & PÉRINÉE ───
  { id: 'm21', slug: 'tire-lait', nom: 'Tire-lait électrique', categorie: 'maternite', icone: '__SVG__tire lait.svg__',
    description: 'Dispositif d\'extraction du lait maternel par aspiration mécanique régulée, simple ou double pompage, plusieurs niveaux d\'intensité et de rythme réglables pour reproduire au mieux la tétée du nourrisson.',
    indication: 'Allaitement maternel avec besoin d\'expression du lait, stimulation ou maintien de la lactation, séparation mère-enfant (hospitalisation, prématurité, reprise du travail), engorgement mammaire, difficulté de mise au sein.',
    conseils: [
      'Respecter des règles d\'hygiène strictes : stérilisation des téterelles et du kit de recueil avant la première utilisation, puis nettoyage rigoureux après chaque usage.',
      'Taille de téterelle adaptée au diamètre du mamelon indispensable au confort et à l\'efficacité de l\'expression — une taille inadaptée peut causer douleur et expression insuffisante.',
      'Démarrer à intensité faible puis augmenter progressivement jusqu\'au niveau confortable le plus efficace, sans jamais aller jusqu\'à la douleur.',
      'Le pharmacien a un rôle actif de formation à l\'utilisation et à l\'entretien du dispositif, en complément de l\'accompagnement par la sage-femme ou la consultante en lactation.',
      'Conservation du lait exprimé selon les règles strictes (durée et température) à rappeler systématiquement à la délivrance.',
    ],
    contre_indications: [
      'Lésion mammaire ouverte ou infectée (mastite avec abcès) : avis médical avant poursuite de l\'expression, technique éventuellement à adapter.',
      'Douleur importante à l\'utilisation : signe d\'une taille de téterelle inadaptée ou d\'une intensité excessive — ne pas poursuivre sans réajustement.',
    ],
    remboursement: {
      mention: 'Remboursable sur prescription dans certaines situations',
      code_lppr: '1161248 (forfait mise à disposition) / 1129440 (location hebdomadaire)',
      taux: '60% du tarif LPPR (100% si ALD/CMU) — à vérifier selon la situation du patiente',
      note: 'Tarifs sourcés dans le PDF LPP officiel : forfait de mise à disposition 30,00€ (code 1161248), location hebdomadaire 7,50€ (code 1129440). Prescription initiale limitée à 10 semaines maximum, renouvelable ensuite par tranches de 3 mois selon l\'évolution de la situation (prématurité, hospitalisation du nourrisson, pathologie maternelle ou infantile justifiant la séparation).',
    },
    otc: ['Coussinets d\'allaitement', 'Crème protectrice mamelons (lanoline purifiée)'],
    pathologies_liees: [],
    sources: [{label: "HAS — Allaitement maternel", url: "https://www.has-sante.fr/jcms/c_1729367/fr/allaitement-maternel"}, {label: "Nomenclature LPP — Titre III", url: "https://www.ameli.fr/pharmacien/exercice-professionnel/nomenclatures-codifications/lppr"}, {label: "ANSM — Dispositifs allaitement", url: "https://ansm.sante.fr"}] },
  { id: 'm22', slug: 'urostimulateur', nom: 'Urostimulateur (rééducation périnéale)', categorie: 'maternite', icone: '__SVG__neurostim.svg__',
    description: 'Dispositif d\'électrostimulation des muscles du plancher pelvien par sonde vaginale (femme) ou anale (homme/femme), permettant un renforcement musculaire périnéal actif en complément ou en relais d\'une rééducation manuelle.',
    indication: 'Incontinence urinaire d\'effort, rééducation périnéale post-partum, prolapsus débutant (stade peu avancé), incontinence post-prostatectomie chez l\'homme.',
    conseils: [
      'Sonde strictement personnelle, à usage individuel exclusif — jamais de partage même au sein du même foyer (risque infectieux).',
      'Séances régulières nécessaires pour obtenir un résultat durable : la rééducation périnéale s\'inscrit sur plusieurs semaines, pas d\'effet attendu après une ou deux séances isolées.',
      'Nettoyage de la sonde après chaque utilisation selon les recommandations du fabricant, séchage complet avant rangement.',
      'L\'usage à domicile fait généralement suite à un apprentissage initial encadré (sage-femme, kinésithérapeute spécialisé) — vérifier que cet apprentissage a bien eu lieu avant la délivrance.',
      'Reprendre contact avec le prescripteur en l\'absence d\'amélioration après plusieurs semaines d\'utilisation régulière, pour réévaluation.',
    ],
    contre_indications: [
      'Grossesse en cours — contre-indication formelle à l\'électrostimulation périnéale par voie vaginale.',
      'Infection urinaire ou génitale active non traitée.',
      'Bilan urodynamique non réalisé au préalable : la prise en charge nécessite une évaluation spécialisée préalable, pas une utilisation d\'emblée sans cadre médical.',
    ],
    remboursement: {
      mention: 'Remboursable sur prescription',
      code_lppr: '1189270 (achat) / 1111701 (location ≤26 sem) / 1183014 (forfait sonde/électrode annuel)',
      taux: '60% du tarif LPPR (100% si ALD/CMU) — à vérifier selon la situation du patient',
      note: 'Tarifs sourcés dans le PDF LPP officiel : achat de l\'électrostimulateur 304,90€ (code 1189270), location courte durée (≤26 semaines) 11,74€/semaine (code 1111701), forfait annuel sonde/électrode 25,92€ (code 1183014). [⚠️ La prise en charge nécessite généralement un bilan urodynamique préalable et une période probatoire de rééducation en centre (6-8 semaines) avant le passage à un usage à domicile — conditions précises à confirmer selon le parcours du patient]',
    },
    otc: ['Gel lubrifiant hydrosoluble (pour la sonde)'],
    pathologies_liees: ['hbp-prostate'],
    sources: [{label: "HAS — Stimulation nerf tibial", url: "https://www.has-sante.fr/jcms/p_3208766/fr/stimulation-du-nerf-tibial-posterieur"}, {label: "Nomenclature LPP — Titre II Ch.5", url: "https://www.ameli.fr/pharmacien/exercice-professionnel/nomenclatures-codifications/lppr"}, {label: "AFU — Recommandations incontinence", url: "https://www.urofrance.org"}] },

  // ─── DOULEUR & NEUROSTIMULATION ───
  { id: 'm23', slug: 'neurostimulateur', nom: 'Neurostimulateur électrique transcutané (TENS)', categorie: 'douleur', icone: '__SVG__neurostim.svg__',
    description: 'Appareil de neurostimulation électrique transcutanée (TENS) à visée antalgique : électrodes autocollantes positionnées sur ou autour de la zone douloureuse, intensité et fréquence réglables par le patient lui-même selon une plage prescrite.',
    indication: 'Douleurs chroniques rebelles (lombalgie chronique, arthrose), douleurs neuropathiques, douleurs post-opératoires en complément du traitement médicamenteux, certaines douleurs de règles (dysménorrhée).',
    conseils: [
      'Peau propre, sèche et sans crème avant la pose des électrodes pour une bonne adhérence et une conduction électrique optimale.',
      'Ne jamais positionner les électrodes sur le thorax ni à proximité immédiate chez un patient porteur d\'un pacemaker ou d\'un défibrillateur implantable — interférence électrique possible.',
      'Démarrer à intensité faible et augmenter progressivement jusqu\'au seuil de "fourmillement confortable" recherché, sans jamais provoquer de contraction musculaire douloureuse.',
      'Respecter scrupuleusement le programme de suivi prescrit (évaluations à 1, 2, 3 puis 6 mois) : c\'est cette réévaluation régulière qui conditionne la poursuite de la prise en charge.',
      'Changer les électrodes régulièrement (perte d\'adhérence et d\'efficacité avec le temps), ne pas réutiliser des électrodes décollées ou asséchées.',
    ],
    contre_indications: [
      'Porteur de pacemaker ou défibrillateur implantable — contre-indication formelle au TENS, en particulier à proximité du thorax.',
      'Grossesse en cours (zone abdominale ou lombaire) sauf avis médical spécifique encadrant l\'utilisation.',
      'Épilepsie non stabilisée (selon localisation des électrodes), zone cutanée lésée, infectée ou présentant des troubles sensitifs sévères empêchant le patient de juger de l\'intensité tolérable.',
    ],
    remboursement: {
      mention: 'Remboursable sur prescription, très encadrée',
      code_lppr: '1189940 (location) / 1183468 (achat) / 1134240 (électrodes, lot de 4)',
      taux: '60% du tarif LPPR (100% si ALD/CMU) — à vérifier selon la situation du patient',
      note: 'Conditions sourcées dans le PDF LPP officiel : prescription initiale réservée à un médecin spécialisé dans la prise en charge de la douleur (titulaire d\'un DU douleur ou exerçant en structure spécialisée), précédée d\'un essai préalable obligatoire. Suivi structuré prévu à 1, 2, 3 puis 6 mois pour valider la poursuite. Location limitée à 6 mois maximum avant le passage à l\'achat si l\'efficacité est confirmée. Électrodes (lot de 4, code 1134240) limitées à un lot par 15 jours. [⚠️ Tarifs précis en euros non extraits avec certitude pour ces codes — se référer à la prescription et au prestataire pour le montant exact]',
    },
    otc: [],
    pathologies_liees: ['lombalgie', 'douleur-arthrose'],
    sources: [{label: "HAS — Neurostimulation transcutanée (TENS)", url: "https://www.has-sante.fr/jcms/c_1066790/fr/douleur-chronique"}, {label: "Nomenclature LPP — Titre II Ch.5", url: "https://www.ameli.fr/pharmacien/exercice-professionnel/nomenclatures-codifications/lppr"}, {label: "SFETD — Recommandations douleur chronique", url: "https://www.sfetd-douleur.org"}] },

  // ─── HYGIÈNE & CONFORT (ajouts) ───
  { id: 'm24', slug: 'table-de-lit', nom: 'Table de lit réglable', categorie: 'hygiene', icone: '__SVG__table-de-lit.svg__',
    description: 'Plateau réglable en hauteur et en inclinaison, monté sur roulettes, glissant sous le lit ou le fauteuil pour permettre de manger, lire ou travailler en position allongée ou semi-assise sans avoir à se déplacer.',
    indication: 'Maintien à domicile, perte d\'autonomie, prise des repas au lit, activités diverses (lecture, ordinateur, jeux) en position allongée ou semi-assise prolongée.',
    conseils: [
      'Vérifier le passage du piètement sous le lit ou le fauteuil avant l\'achat — la hauteur du sommier ou des pieds du fauteuil peut limiter la compatibilité selon les modèles.',
      'Verrouiller les roulettes une fois la table positionnée pour éviter tout glissement involontaire pendant l\'usage (repas notamment).',
      'Plateau souvent amovible ou avec surface lavable pour faciliter le nettoyage après les repas.',
      'Vérifier la stabilité du plateau en pleine charge avant de poser des liquides chauds ou des objets lourds dessus.',
      'Réglage de l\'inclinaison utile pour la lecture ou l\'utilisation d\'une tablette/ordinateur, à plat pour les repas.',
    ],
    contre_indications: [
      'Aucune contre-indication formelle ; vérifier la charge maximale supportée par le plateau avant d\'y poser du matériel lourd (plateau-repas, ordinateur).',
    ],
    remboursement: {
      mention: 'Non remboursable',
      note: '[⚠️ Recherche effectuée dans le PDF LPP officiel (mise à jour juin 2026) : aucune section trouvée pour la table de lit réglable] Ce dispositif de confort n\'est pas inscrit à la nomenclature LPPR et reste à la charge intégrale du patient.',
    },
    otc: [],
    pathologies_liees: [],
    sources: [{label: "HAS — Aides techniques MAD", url: "https://www.has-sante.fr"}, {label: "Nomenclature LPP — Titre II Ch.2", url: "https://www.ameli.fr/pharmacien/exercice-professionnel/nomenclatures-codifications/lppr"}, {label: "ANAP — Référentiel MAD", url: "https://www.anap.fr"}] },
  { id: 'm25', slug: 'potence-de-lit', nom: 'Potence de lit (lève-personne d\'appoint)', categorie: 'hygiene', icone: '__SVG__potence.svg__',
    description: 'Structure verticale fixée au cadre ou au sommier du lit, équipée d\'une poignée suspendue (trapèze ou anneau), permettant au patient de se redresser ou de se hisser seul en position assise grâce à la force des bras.',
    indication: 'Perte d\'autonomie modérée, suites de chirurgie orthopédique, maintien à domicile, difficulté à se redresser seul dans le lit sans aide complète.',
    conseils: [
      'Vérifier la fixation et la stabilité de la potence avant chaque utilisation, particulièrement après un déplacement du lit ou un démontage/remontage.',
      'Respecter la charge maximale indiquée par le fabricant — au-delà, la structure n\'est plus garantie et le risque de chute augmente fortement.',
      'Ne remplace pas un lève-personne (soulève-malade) pour les transferts complets en cas de dépendance majeure : la potence nécessite une force des membres supérieurs suffisante de la part du patient.',
      'Vérifier que le patient comprend bien comment relâcher la prise en toute sécurité, sans à-coup, pour éviter une chute arrière au moment de se rallonger.',
      'À réévaluer régulièrement : si le patient ne parvient plus à l\'utiliser seul en toute sécurité, orienter vers une solution de transfert assisté complet.',
    ],
    contre_indications: [
      'Force insuffisante des membres supérieurs pour assurer un appui sûr — risque de chute si le patient ne peut maintenir la prise.',
      'Troubles cognitifs sévères empêchant la compréhension de l\'utilisation correcte du dispositif.',
    ],
    remboursement: {
      mention: 'Non remboursable',
      note: '[⚠️ Recherche effectuée dans le PDF LPP officiel (mise à jour juin 2026) : aucun code propre trouvé pour une potence de lit simple] Point important à ne pas confondre : le "soulève-malade" inscrit à la LPP (dispositif mobile sur roues pour transfert complet, code 1231782, location 17,53€/semaine) est un appareil différent de la potence fixe à poignée suspendue décrite ici. La potence simple reste non remboursée et à la charge du patient ; si un besoin de transfert complet existe, orienter vers une évaluation pour un véritable lève-personne, lui remboursable sur prescription.',
    },
    otc: [],
    pathologies_liees: ['osteoporose'],
    sources: [{label: "HAS — Aides techniques MAD", url: "https://www.has-sante.fr"}, {label: "Nomenclature LPP — Titre II Ch.2", url: "https://www.ameli.fr/pharmacien/exercice-professionnel/nomenclatures-codifications/lppr"}, {label: "ANAP — Référentiel MAD", url: "https://www.anap.fr"}] },

  // ─── MOBILITÉ (ajouts) ───
  { id: 'm26', slug: 'deambulateur-2-roues', nom: 'Déambulateur 2 roues', categorie: 'mobilite', icone: '__SVG__deambulateur 2 roues.svg__',
    description: 'Cadre de marche avec 2 roues avant pivotantes et 2 pieds fixes (patins) arrière. Plus stable que le modèle 4 roues car il ne peut pas rouler en arrière de façon incontrôlée, mais moins fluide à manier et nécessite de soulever légèrement l\'arrière à chaque pas.',
    indication: 'Troubles de l\'équilibre modérés, rééducation à la marche après hospitalisation ou chirurgie, besoin de sécurité accrue par rapport au déambulateur 4 roues chez les patients à risque de chute important.',
    conseils: [
      'Vérifier régulièrement l\'état des patins arrière (usure, durcissement) — des patins lisses glissent et perdent leur fonction de freinage naturel.',
      'Hauteur des poignées réglée au niveau du poignet, bras légèrement fléchi, comme pour les autres aides à la marche.',
      'Moins adapté aux sols irréguliers ou aux seuils de porte que le modèle 4 roues, en raison du mouvement de bascule nécessaire à chaque pas.',
      'Technique d\'utilisation à expliquer : avancer le déambulateur, puis avancer en soulevant légèrement l\'arrière sur les patins avant de reposer le poids.',
      'Privilégier ce modèle (par rapport au 4 roues) chez les patients ayant tendance à "se laisser emporter" par un déambulateur trop mobile.',
    ],
    contre_indications: [
      'Terrain très accidenté ou pentes importantes : usage non adapté, risque de déséquilibre lors du mouvement de bascule nécessaire à l\'avancée.',
    ],
    remboursement: {
      mention: 'Remboursable sur prescription',
      code_lppr: '1285619 (achat) / 1225646 (location ≤26 sem) / 1260418 (location >26 sem)',
      taux: '60% du tarif LPPR (100% si ALD/CMU) — à vérifier selon la situation du patient',
      note: 'Mêmes codes et tarifs que le déambulateur générique (voir fiche "Déambulateur 4 roues") : la nomenclature LPP ne distingue pas le nombre de roues, seulement la catégorie "déambulateur". Achat 53,81€, location courte durée 2,21€/semaine, location longue durée 1,34€/semaine, livraison 12,96€.',
    },
    otc: [],
    pathologies_liees: ['osteoporose'],
    sources: [{label: "HAS — Déambulateurs et cadres de marche", url: "https://www.has-sante.fr"}, {label: "Nomenclature LPP — Titre II Ch.3", url: "https://www.ameli.fr/pharmacien/exercice-professionnel/nomenclatures-codifications/lppr"}, {label: "ANAP — Référentiel mobilité", url: "https://www.anap.fr"}] },
  { id: 'm27', slug: 'fauteuil-transfert', nom: 'Fauteuil de transfert', categorie: 'mobilite', icone: '__SVG__fauteuil de transfert.svg__',
    description: 'Fauteuil roulant léger et pliable, conçu pour des déplacements courts et des transferts ponctuels (lit-fauteuil, domicile-véhicule), généralement plus compact et moins confortable qu\'un fauteuil roulant principal destiné à un usage prolongé.',
    indication: 'Transferts ponctuels, sorties courtes (rendez-vous médical, transport), perte d\'autonomie temporaire, complément à un fauteuil roulant principal pour les déplacements occasionnels hors domicile.',
    conseils: [
      'Vérifier le verrouillage des freins avant tout transfert assis-debout ou debout-assis — un fauteuil non freiné est une cause fréquente de chute lors du transfert.',
      'Ne pas utiliser comme fauteuil principal au long cours : le confort et l\'ergonomie sont limités par rapport à un fauteuil roulant adapté à un usage prolongé (risque de mauvaise posture, d\'escarres en cas d\'usage quotidien intensif).',
      'Accoudoirs et repose-pieds amovibles à utiliser pour faciliter le transfert latéral ou frontal selon la méthode employée.',
      'Vérifier la largeur du fauteuil par rapport aux portes et couloirs du domicile avant l\'achat si un usage intérieur régulier est prévu.',
      'Poids et pliage à vérifier si le fauteuil doit être transporté fréquemment en voiture.',
    ],
    contre_indications: [
      'Usage prolongé quotidien (plusieurs heures) : non adapté, privilégier un fauteuil roulant principal mieux conçu pour le confort et la prévention des escarres dans ce cas.',
    ],
    remboursement: {
      mention: 'Non remboursable',
      note: '[⚠️ Recherche effectuée dans le PDF LPP officiel (mise à jour juin 2026) : aucune section spécifique trouvée pour le "fauteuil de transfert" léger sous ce nom] Ce modèle léger destiné aux transferts ponctuels ne correspond pas aux catégories de la nomenclature des fauteuils roulants (FMP, FMPR, etc.), conçues pour un usage médical plus soutenu. Si le besoin réel du patient correspond à un usage prolongé, orienter vers une évaluation pour un fauteuil roulant standard remboursable (voir fiche dédiée) plutôt que ce modèle de confort.',
    },
    otc: [],
    pathologies_liees: [],
    sources: [{label: "HAS — Fauteuils roulants de transfert", url: "https://www.has-sante.fr"}, {label: "Nomenclature LPP — Titre II Ch.3", url: "https://www.ameli.fr/pharmacien/exercice-professionnel/nomenclatures-codifications/lppr"}, {label: "APF France handicap", url: "https://www.apf-francehandicap.org"}] },
  { id: 'm28', slug: 'fauteuil-releveur', nom: 'Fauteuil releveur électrique', categorie: 'mobilite', icone: '__SVG__fauteuil-inclinable.svg__',
    description: 'Fauteuil de repos avec assise motorisée s\'inclinant et se relevant progressivement pour faciliter le passage assis-debout et debout-assis, télécommande de réglage de l\'inclinaison du dossier et de l\'assise.',
    indication: 'Perte d\'autonomie, arthrose sévère des membres inférieurs ou du rachis, difficulté majeure à se relever d\'un fauteuil standard, besoin de confort prolongé en position assise/semi-allongée.',
    conseils: [
      'Vérifier l\'espace nécessaire au déploiement complet du fauteuil (proximité d\'un mur ou d\'un meuble) avant l\'achat — le mécanisme de bascule nécessite un dégagement à l\'arrière.',
      'Anticiper avec le patient la position de repli manuel possible en cas de coupure de courant (la plupart des modèles prévoient une manœuvre de secours).',
      'Essai en situation réelle fortement recommandé avant l\'achat : le gabarit, la profondeur d\'assise et le confort varient beaucoup d\'un modèle à l\'autre et doivent convenir à la morphologie du patient.',
      'Vérifier l\'accessibilité de la télécommande pour un patient ayant des troubles de la préhension (boutons suffisamment gros et espacés).',
      'Un coussin anti-escarres reste pertinent en cas de station assise prolongée, même sur un fauteuil releveur confortable.',
    ],
    contre_indications: [
      'Aucune contre-indication formelle ; vigilance chez les patients très agités ou présentant des troubles cognitifs sévères pouvant déclencher le mécanisme de façon inappropriée ou dangereuse.',
    ],
    remboursement: {
      mention: 'Non remboursable',
      note: '[⚠️ Recherche effectuée dans le PDF LPP officiel (mise à jour juin 2026) : aucune section trouvée pour le fauteuil releveur électrique] Ce dispositif est considéré comme un équipement de confort et n\'est pas inscrit à la nomenclature LPPR. Reste à la charge du patient ; certaines aides peuvent exister via l\'APA, la PCH, ou des caisses de retraite complémentaire selon la situation — orienter vers une assistante sociale si besoin.',
    },
    otc: [],
    pathologies_liees: ['douleur-arthrose'],
    sources: [{label: "HAS — Aides à la verticalisation", url: "https://www.has-sante.fr"}, {label: "Nomenclature LPP — Titre II Ch.3", url: "https://www.ameli.fr/pharmacien/exercice-professionnel/nomenclatures-codifications/lppr"}, {label: "ANAP — Référentiel fauteuils releveurs", url: "https://www.anap.fr"}] },
  { id: 'm29', slug: 'fauteuil-coquille', nom: 'Fauteuil coquille (maintien postural)', categorie: 'mobilite', icone: '__SVG__fauteuil.svg__',
    description: 'Fauteuil à coque enveloppante avec inclinaison réglable, conçu pour assurer un maintien postural global chez les patients à mobilité très réduite ne pouvant se maintenir assis sans soutien latéral et dorsal important.',
    indication: 'Troubles neurologiques sévères (séquelles d\'AVC majeur, maladies neurodégénératives avancées), perte d\'autonomie majeure, patients ne pouvant se maintenir assis sans soutien complet du tronc et de la tête.',
    conseils: [
      'Réglage de l\'inclinaison à adapter selon la tolérance du patient et le risque de fausse route — une inclinaison excessive en arrière pendant les repas augmente ce risque.',
      'Coussin anti-escarres souvent associé en cas de station assise prolongée, le maintien enveloppant ne dispensant pas d\'une prévention active des points de pression.',
      'Installation et réglages initiaux à réaliser idéalement avec un professionnel formé (ergothérapeute, kinésithérapeute) pour garantir un positionnement réellement adapté à la morphologie et à la pathologie du patient.',
      'Vérifier régulièrement l\'adéquation du fauteuil à l\'évolution de l\'état du patient (un maintien postural inadapté peut favoriser des déformations ou des escarres).',
      'Prévoir une vigilance accrue lors des transferts (entrée/sortie du fauteuil), souvent plus complexes qu\'avec un fauteuil roulant standard du fait de la forme enveloppante.',
    ],
    contre_indications: [
      'Aucune contre-indication formelle au dispositif lui-même ; le choix du modèle et des réglages doit impérativement être individualisé par un professionnel pour éviter de créer de nouveaux points de pression ou troubles posturaux.',
    ],
    remboursement: {
      mention: 'Non remboursable',
      note: '[⚠️ Recherche effectuée dans le PDF LPP officiel (mise à jour juin 2026) : une "coquille pour bain en matière plastique" existe bien à la nomenclature (code 1245407, 127,31€) mais il s\'agit d\'un dispositif PÉDIATRIQUE (≤16 ans) destiné spécifiquement au bain — elle ne correspond pas à ce fauteuil coquille de maintien postural pour tous âges et hors contexte du bain] Ce fauteuil reste donc non remboursé au titre de la LPP. Pour un enfant de moins de 16 ans et un besoin spécifique de coquille de bain, se référer à cette autre référence, à ne pas confondre avec la présente fiche.',
    },
    otc: ['Crème ou mousse de prévention des escarres'],
    pathologies_liees: ['parkinson', 'alzheimer'],
    sources: [{label: "HAS — Fauteuils coquilles et positionnement", url: "https://www.has-sante.fr"}, {label: "Nomenclature LPP — Titre II Ch.3", url: "https://www.ameli.fr/pharmacien/exercice-professionnel/nomenclatures-codifications/lppr"}, {label: "APF France handicap", url: "https://www.apf-francehandicap.org"}] },

  // ─── HYGIÈNE & CONFORT (ajouts prévention escarres) ───
  { id: 'm30', slug: 'matelas-classe2-anti-escarres', nom: 'Matelas anti-escarres classe 2', categorie: 'hygiene', icone: '__SVG__matelas classe 2.svg__',
    description: 'Matelas ou surmatelas en mousse viscoélastique dite "à mémoire de forme" (parfois mixte ou multistrate), offrant une meilleure répartition des points de pression que la mousse classique grâce à sa déformation sous la chaleur et le poids du corps.',
    indication: 'Aide à la prévention de l\'escarre chez les patients ayant un antécédent d\'escarre et un risque évalué à un score ≤14 sur l\'échelle de Norton (ou échelle équivalente), aide au traitement des escarres de stade 1-2 en association avec un système de décharge localisée.',
    conseils: [
      'Évaluer et documenter le score de risque (échelle de Norton ou équivalente) avant la mise en place — c\'est ce score qui conditionne la prise en charge en classe 2 plutôt qu\'en classe 1.',
      'Le linge de lit ne doit pas être bordé trop serré : un drap trop tendu annule l\'effet d\'amortissement du matelas en créant un "effet hamac".',
      'Vérifier le poids du patient par rapport à la plage validée par le fabricant pour la référence choisie (les plages varient de 30 à 180 kg selon les modèles).',
      'Nettoyage et désinfection selon la notice du fabricant — la housse est conçue pour résister à l\'ammoniaque urinaire et aux produits chlorés sans durcir.',
      'Une amélioration insuffisante ou une aggravation des lésions cutanées doit faire reconsidérer le passage à un support de classe supérieure (matelas à air motorisé).',
    ],
    contre_indications: [
      'Patients très lourds ou très légers hors de la plage de poids validée pour la référence retenue — l\'efficacité de répartition de pression n\'est plus garantie hors plage.',
      'Escarres de stade 3 ou 4 en zone d\'appui sans système de décharge localisée associé : la classe 2 seule peut être insuffisante, avis médical pour orienter vers un support plus adapté.',
    ],
    remboursement: {
      mention: 'Remboursable sur prescription',
      code_lppr: 'Variable selon le modèle — ex. 1223423 (matelas ALOVA, mousse viscoélastique) ou 1206548 (surmatelas)',
      taux: '60% du tarif LPPR (100% si ALD/CMU) — à vérifier selon la situation du patient',
      note: 'Tarifs sourcés dans le PDF LPP officiel : environ 247,18€ pour un surmatelas en mousse viscoélastique classe 2, environ 296,62€ pour un matelas complet classe 2 (tarifs variant légèrement selon la référence exacte du fabricant). Prise en charge limitée à un matelas ou surmatelas maximum tous les 3 ans. [⚠️ Code LPPR exact dépendant de la marque/référence précise — de nombreuses références existent à la nomenclature avec des codes différents, se référer à la prescription pour le modèle exact]',
    },
    otc: ['Crème ou mousse de prévention des escarres'],
    pathologies_liees: [],
    sources: [{label: "HAS — Prévention et traitement des escarres", url: "https://www.has-sante.fr/jcms/c_272971/fr/prevention-et-traitement-des-escarres-de-l-adulte-et-du-sujet-age"}, {label: "Nomenclature LPP — Titre II Ch.2", url: "https://www.ameli.fr/pharmacien/exercice-professionnel/nomenclatures-codifications/lppr"}, {label: "EPUAP — Recommandations escarres", url: "https://www.epuap.org"}] },
  { id: 'm31', slug: 'matelas-a-air', nom: 'Matelas à air motorisé', categorie: 'hygiene', icone: '__SVG__matelas-a air.svg__',
    description: 'Matelas ou surmatelas à air motorisé à pression alternée, associé à un compresseur réglable qui gonfle et dégonfle alternativement des cellules d\'air pour répartir et faire varier les zones d\'appui dans le temps, offrant un niveau de prévention/traitement supérieur à la mousse simple.',
    indication: 'Aide à la prévention de l\'escarre chez les patients à risque moyen à élevé (selon jugement clinique et échelles), alités plus de 15 heures par jour, aide au traitement ou en post-chirurgie d\'escarre chez des patients à risque moyen à élevé avec escarres de stade 1 à 4 selon localisation.',
    conseils: [
      'Vérifier le bon fonctionnement du compresseur à chaque installation : c\'est lui qui assure l\'alternance de pression, un dysfonctionnement annule l\'effet thérapeutique sans que cela soit toujours visible à l\'œil nu.',
      'Respecter le degré de gonflage indiqué dans la notice en fonction du poids du patient — un matelas insuffisamment ou trop gonflé perd son efficacité de répartition de pression.',
      'Le matelas et son ensemble de réparation/pompe (fournis si non autogonflable) doivent être conservés à disposition en cas de fuite ou de perforation.',
      'Surveillance cutanée renforcée malgré le dispositif : le matelas à air motorisé réduit le risque mais ne dispense pas des changements de position et de la surveillance régulière des points d\'appui.',
      'Niveau de bruit du compresseur à anticiper avec le patient et son entourage (fonctionnement continu, jour et nuit).',
    ],
    contre_indications: [
      'Instabilité rachidienne ou fracture vertébrale non consolidée : la surface mobile du matelas à air peut être contre-indiquée selon l\'avis du chirurgien — vérifier avant installation.',
      'Patient hors de la plage de poids validée par le fabricant pour la référence retenue.',
    ],
    remboursement: {
      mention: 'Remboursable sur prescription',
      code_lppr: '1240054 (achat compresseur) / 1217374 (location hebdomadaire compresseur + surmatelas) / 1227332 (forfait livraison)',
      taux: '60% du tarif LPPR (100% si ALD/CMU) — à vérifier selon la situation du patient',
      note: 'Tarifs sourcés dans le PDF LPP officiel : achat du compresseur 158,19€ (code 1240054), location hebdomadaire du compresseur associée au surmatelas 10,88€/semaine (code 1217374), forfait de livraison 17,48€ (code 1227332, non cumulable avec un autre forfait de livraison). La prise en charge du compresseur est subordonnée au caractère remboursable du matelas ou surmatelas associé — les deux éléments doivent être pris en charge ensemble, pas séparément.',
    },
    otc: ['Crème ou mousse de prévention des escarres'],
    pathologies_liees: [],
    sources: [{label: "HAS — Supports anti-escarres", url: "https://www.has-sante.fr/jcms/c_272971/fr/prevention-et-traitement-des-escarres-de-l-adulte-et-du-sujet-age"}, {label: "Nomenclature LPP — Titre II Ch.2", url: "https://www.ameli.fr/pharmacien/exercice-professionnel/nomenclatures-codifications/lppr"}, {label: "EPUAP — Recommandations escarres", url: "https://www.epuap.org"}] },

  // ─── MOBILITÉ (ajout déambulateur fixe) ───
  { id: 'm32', slug: 'deambulateur-sans-roues', nom: 'Déambulateur sans roues (fixe)', categorie: 'mobilite', icone: '__SVG__deambulateur.svg__',
    description: 'Cadre de marche fixe, sans roue, à 4 pieds munis d\'embouts antidérapants, réglable en hauteur. Le patient doit le soulever et l\'avancer à chaque pas, ce qui en fait le modèle le plus stable mais le plus lent et le plus exigeant physiquement parmi les déambulateurs.',
    indication: 'Troubles de l\'équilibre importants, rééducation initiale à la marche après hospitalisation ou chirurgie, besoin de sécurité maximale chez les patients à très haut risque de chute, en particulier en intérieur sur de courtes distances.',
    conseils: [
      'Technique d\'utilisation à bien expliquer : soulever entièrement le cadre, l\'avancer d\'un pas, le reposer fermement au sol avant d\'avancer — ne jamais faire glisser le cadre au sol.',
      'Nécessite une force suffisante des membres supérieurs pour soulever le cadre à chaque pas ; à réévaluer si le patient commence à le faire glisser au lieu de le soulever (signe de fatigue ou de force insuffisante, risque de déséquilibre).',
      'Vérifier régulièrement les embouts antidérapants des 4 pieds (usure, durcissement) — un embout en mauvais état augmente le risque de glissade au moment de la repose.',
      'Modèle particulièrement adapté aux sols irréguliers ou aux tapis, là où un déambulateur à roues serait moins stable.',
      'Hauteur des poignées réglée au niveau du poignet, bras légèrement fléchi, comme pour les autres aides à la marche.',
    ],
    contre_indications: [
      'Force insuffisante des membres supérieurs pour soulever le cadre de façon répétée — orienter vers un modèle à roues (2 ou 4 roues) si ce critère n\'est pas rempli.',
      'Distances de marche importantes à parcourir régulièrement : le mode d\'utilisation (soulever-avancer-reposer) est lent et fatigant, peu adapté aux longs trajets.',
    ],
    remboursement: {
      mention: 'Remboursable sur prescription',
      code_lppr: '1285619 (achat) / 1225646 (location ≤26 sem) / 1260418 (location >26 sem)',
      taux: '60% du tarif LPPR (100% si ALD/CMU) — à vérifier selon la situation du patient',
      note: 'Mêmes codes et tarifs que les autres déambulateurs (voir fiches "4 roues" et "2 roues") : la nomenclature LPP précise explicitement "fixes ou articulés ou à roulettes" sous un même code générique "déambulateur", réglable en hauteur. Achat 53,81€, location courte durée 2,21€/semaine, location longue durée 1,34€/semaine, livraison 12,96€ (code 1290968).',
    },
    otc: [],
    pathologies_liees: ['osteoporose'],
    sources: [{label: "HAS — Aides à la marche", url: "https://www.has-sante.fr"}, {label: "Nomenclature LPP — Titre II Ch.3", url: "https://www.ameli.fr/pharmacien/exercice-professionnel/nomenclatures-codifications/lppr"}, {label: "ANAP — Référentiel mobilité", url: "https://www.anap.fr"}] },
];

// Tri alphabétique dans chaque catégorie
MATERIEL_DB.sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));

const CATEGORIES_MAD = [
  { id: 'all',          label: 'Tout voir',               icone: '/icons/dispositif/fiche-custom.svg' },
  { id: 'cardiaque',    label: 'Cardiaque & Vasculaire',  icone: '❤️' },
  { id: 'diabete',      label: 'Diabète & Surveillance',  icone: '🩺' },
  { id: 'douleur',      label: 'Douleur & Neurostimulation', icone: '⚡' },
  { id: 'hygiene',      label: 'Hygiène & Confort',       icone: '🛁' },
  { id: 'maternite',    label: 'Maternité & Périnée',     icone: '🤱' },
  { id: 'mobilite',     label: 'Mobilité',                icone: '🦽' },
  { id: 'nutrition',    label: 'Nutrition',               icone: '🍽️' },
  { id: 'postop',       label: 'Post-opératoire',         icone: '🩹' },
  { id: 'respiratoire', label: 'Respiratoire',            icone: '🫁' },
];

/* Normalisation des champs de recherche, mémoïsée sur l'objet au premier accès — calcul paresseux
   plutôt qu'un pré-calcul global, pour rester robuste si un futur materiel-extra.js (pansements,
   pédiatrie — cf. roadmap) ajoute des entrées à MATERIEL_DB après ce script. */
const _normalizeMad = s => String(s || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
function _getMadSearchIndex(m) {
  if (!m._searchIndex) {
    m._searchIndex = {
      nom: _normalizeMad(m.nom),
      ind: _normalizeMad(m.indication),
      desc: _normalizeMad(m.description),
    };
  }
  return m._searchIndex;
}

const MaterielAPI = {
  async getAll()              { return [...MATERIEL_DB]; },
  async getByCategorie(cat)   { return cat === 'all' ? [...MATERIEL_DB] : MATERIEL_DB.filter(m => m.categorie === cat); },
  async getBySlug(slug)       { return MATERIEL_DB.find(m => m.slug === slug) || null; },
  async getByPathologie(slug) { return MATERIEL_DB.filter(m => m.pathologies_liees.includes(slug)); },
  async search(q) {
    const query = _normalizeMad(q);
    const scored = [];
    for (const m of MATERIEL_DB) {
      const { nom, ind, desc } = _getMadSearchIndex(m);
      let score = 0;
      if (nom === query)           score = 100;
      else if (nom.startsWith(query)) score = 80;
      else if (nom.includes(query))   score = 60;
      else if (ind.includes(query))   score = 40;
      else if (desc.includes(query))  score = 20;
      if (score > 0) scored.push({ m, score });
    }
    return scored.sort((a,b) => b.score - a.score).map(x => x.m);
  },
  getCategories() { return CATEGORIES_MAD; }
};
