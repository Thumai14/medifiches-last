/* MediFiche — PATHOLOGIES_DB principale */

'use strict';

const PATHOLOGIES_DB = [
  {
    id: 1, slug: "allergie-pollen", nom: "Allergie au pollen",
    categorie: "Allergologie", saison: [3,4,5,6], icone: "__SVG__allergie-au-pollen.svg__",
    conseils: ["Éviter les sorties entre 6h et 10h (pic pollinique).", "Porter des lunettes de soleil enveloppantes.", "Aérer le logement uniquement en soirée.", "Douche systématique après exposition extérieure.", "Antihistaminiques 2e génération (cétirizine, loratadine) en 1ère intention."],
    contre_indications: ["Aspirine et AINS à éviter si terrain asthmatique associé (risque bronchospasme).", "Antihistaminiques 1ère génération (prométhazine) : sédation marquée, contre-indiqués si conduite.", "Interactions antihistaminiques + alcool/anxiolytiques : majoration sédation."],
    regime: ["Réduire les aliments histaminolibérateurs : fraises, tomates, alcool, charcuterie, fromages affinés.", "Favoriser oméga-3 (saumon, sardines), vitamine C (kiwi, poivron) et curcuma.", "Bonne hydratation (> 1,5L/jour)."],
    signes_alerte: ["Rhinite persistante malgré traitement → médecin.", "Sibilances, dyspnée, crise d'asthme → urgences.", "Urticaire généralisé, œdème de Quincke, hypotension → SAMU 15 (anaphylaxie)."],
    medecine_naturelle: {
      phytotherapie: ["Plantain lancéolé : antihistaminique naturel, décongestionnant nasal.", "Pétasite : réduit les symptômes de rhinite allergique (efficacité comparable aux antiH1).", "Euphraise : soulage les yeux rouges et larmoyants."],
      aromatherapie: ["HE Camomille romaine : anti-allergique et apaisante — 1 goutte sur le poignet.", "HE Estragon : antispasmodique, efficace sur le terrain allergique.", "HE Eucalyptus radiata : décongestionnant nasal — inhalation humide."],
      homeopathie: ["Allium cepa 9CH : yeux et nez qui coulent, brûlants.", "Sabadilla 9CH : éternuements en salves, démangeaisons du palais.", "Histaminum 15CH : terrain allergique de fond."],
      micronutrition: ["Vitamine C 1g/jour : effet antihistaminique naturel.", "Quercétine 500mg : flavonoïde inhibiteur de la libération d'histamine.", "Probiotiques (Lactobacillus rhamnosus) : modulation de la réponse immunitaire allergique."],
    },
    medicaments_otc: ["Cétirizine 10mg", "Loratadine 10mg", "Cromoglicate nasal", "Sérum physiologique nasal"],
    vente_complementaire: [
      {produit: "Spray nasal lavage (Sterimar, Physiomer)", raison: "Élimination mécanique des allergènes"},
      {produit: "Lunettes anti-UV enveloppantes", raison: "Protection oculaire contre le pollen"},
      {produit: "Purificateur d'air HEPA", raison: "Filtration des allergènes à domicile"},
      {produit: "Compléments vitamine C + quercétine", raison: "Effet antihistaminique naturel"},
    ],
    sources: [{label: "Santé.fr — Rhinite allergique", url: "https://www.sante.fr/rhinite-allergique-rhume-des-foins", date: "MàJ 08/2025 · consulté 07/2026"},{label: "ANSM", url: "https://ansm.sante.fr"},{label: "Vidal", url: "https://www.vidal.fr"}]
  },
  {
    id: 7, slug: "asthme", nom: "Asthme",
    categorie: "Pneumologie", saison: [3,4,5,9,10], icone: "__SVG__Asthme.svg__",
    conseils: ["Vérifier systématiquement la technique d'inhalation (erreur très fréquente).", "Traitement de fond (corticoïde inhalé) à prendre quotidiennement même sans symptômes.", "Identifier et éviter les facteurs déclenchants (tabac, acariens, AINS, effort par temps froid).", "Plan d'action écrit remis au patient."],
    contre_indications: ["Bêta-bloquants (y compris collyres timolol) formellement contre-indiqués.", "AINS et aspirine contre-indiqués si asthme à l'aspirine (10-20% des asthmatiques).", "Codéine et dérivés opiacés : risque de dépression respiratoire.", "SOS bronchodilatateur (Ventoline) : max 3-4 bouffées par utilisation."],
    regime: ["Éviter sulfites et sulfates (vin, bière, fruits secs, crustacés).", "Favoriser oméga-3 (poissons gras, noix) et magnésium (chocolat noir).", "Maintenir un IMC normal (obésité aggrave significativement l'asthme)."],
    signes_alerte: ["Crise non soulagée après 3 bouffées de Ventoline → SAMU 15.", "FR > 30/min, parole difficile, cyanose des lèvres → urgence vitale.", "Agitation ou somnolence lors d'une crise → signe de gravité."],
    medecine_naturelle: {
      phytotherapie: ["Ginkgo biloba : propriétés anti-inflammatoires bronchiques.", "Lierre grimpant (Hedera helix) : bronchodilatateur naturel, efficace sur la toux.", "Thym : expectorant et antispasmodique bronchique."],
      aromatherapie: ["HE Ravintsara : antivirale, soutien respiratoire en prévention.", "HE Eucalyptus globulus : expectorant puissant — inhalation.", "HE Lavande vraie : antispasmodique, détend les bronches (usage doux)."],
      homeopathie: ["Poumon histamine 15CH : désensibilisation de fond.", "Ipeca 9CH : asthme avec nausées et mucosités abondantes.", "Arsenicum album 9CH : asthme nocturne avec anxiété."],
      micronutrition: ["Magnésium 400mg/jour : bronchodilatateur naturel, déficit fréquent.", "Vitamine D 1000-2000 UI/jour : module la réponse inflammatoire bronchique.", "Oméga-3 EPA/DHA : réduction de l'inflammation des voies aériennes."],
    },
    medicaments_otc: ["Chambre d'inhalation (aide à la technique)", "Peak-flow meter (suivi domicile)"],
    vente_complementaire: [
      {produit: "Chambre d'inhalation (Volumatic, Babyhaler)", raison: "Améliore drastiquement l'efficacité des inhalateurs"},
      {produit: "Peak-flow meter", raison: "Surveillance autonome du souffle à domicile"},
      {produit: "Housse anti-acariens matelas + oreiller", raison: "Réduction des allergènes déclencheurs"},
      {produit: "Compléments vitamine D + magnésium", raison: "Déficits fréquents dans l'asthme"},
    ],
    sources: [{label: "Ameli — Prise en charge de l'asthme", url: "https://www.ameli.fr/assure/sante/themes/asthme-adulte/asthme-traitement/la-prise-en-charge-de-l-asthme", date: "consulté 07/2026"},{label: "VIDAL Reco — Asthme de l'adulte", url: "https://www.vidal.fr/maladies/recommandations/asthme-de-l-adulte-1457.html", date: "MàJ 05/2024 · consulté 07/2026"},{label: "GINA Guidelines 2024", url: "https://ginasthma.org"}]
  },
  {
    id: 9, slug: "constipation", nom: "Constipation",
    categorie: "Gastro-entérologie", saison: [1,2,3,4,5,6,7,8,9,10,11,12], icone: "__SVG__colon.svg__",
    conseils: ["Hydratation : minimum 1,5L d'eau par jour (impératif).", "Activité physique régulière (stimule le transit).", "Ne jamais retarder l'envie d'aller à la selle.", "Laxatifs osmotiques en 1ère intention (macrogol, lactulose).", "Horaire régulier après les repas (réflexe gastro-colique)."],
    contre_indications: ["Laxatifs stimulants (bisacodyl, séné) : max 7-10 jours, contre-indiqués si occlusion ou douleurs abdominales inexpliquées.", "Contre-indiqués pendant la grossesse (séné).", "Paraffine déconseillée au long cours (malabsorption vitamines A, D, E, K)."],
    regime: ["Fibres alimentaires : légumes, fruits (kiwi, poires, pruneaux), légumineuses, céréales complètes.", "Pruneaux et kiwi : efficacité clinique prouvée.", "Eaux riches en magnésium (Hépar, Contrex).", "Augmenter les fibres progressivement pour éviter les ballonnements."],
    signes_alerte: ["Constipation brutale d'apparition récente sans cause évidente → médecin.", "Sang dans les selles, alternance diarrhée/constipation, perte de poids inexpliquée → médecin.", "Douleurs abdominales persistantes → consultation urgente."],
    medecine_naturelle: {
      phytotherapie: ["Psyllium blond (Plantago ovata) : fibres solubles, laxatif doux et efficace.", "Séné (usage court) : stimule les contractions intestinales — max 7 jours.", "Aloe vera (jus intérieur) : laxatif doux en cure courte."],
      aromatherapie: ["HE Gingembre : stimule le transit digestif — 1 goutte dans une cuillère de miel.", "HE Marjolaine à coquilles : antispasmodique intestinal.", "Massage abdominal avec HE romarin dans huile végétale (sens des aiguilles d'une montre)."],
      homeopathie: ["Nux vomica 9CH : constipation avec envies inefficaces, sédentarité.", "Bryonia 9CH : selles dures et sèches, aggravées par le mouvement.", "Alumina 9CH : constipation chronique avec absence de besoin."],
      micronutrition: ["Magnésium marin 300mg/jour : laxatif osmotique naturel doux.", "Probiotiques (Bifidobacterium longum) : régulation du transit.", "Prébiotiques (inuline, FOS) : nourrissent la flore intestinale bénéfique."],
    },
    medicaments_otc: ["Macrogol (Forlax, Movicol)", "Lactulose (Duphalac)", "Bisacodyl (Dulcolax) — courte durée", "Psyllium (Métamucil)"],
    vente_complementaire: [
      {produit: "Psyllium blond (Métamucil)", raison: "Fibres solubles — transit naturel doux"},
      {produit: "Eau Hépar", raison: "Richesse en magnésium, laxatif naturel"},
      {produit: "Pruneaux d'Agen", raison: "Efficacité clinique prouvée"},
      {produit: "Probiotiques spécifiques transit", raison: "Régulation de la flore intestinale"},
    ],
    sources: [{label: "HAS — Constipation", url: "https://www.has-sante.fr"},{label: "SNFGE", url: "https://www.snfge.org"},{label: "Vidal", url: "https://www.vidal.fr"}]
  },
  {
    id: 3, slug: "diabete-type-2", nom: "Diabète type 2",
    categorie: "Endocrinologie", saison: [1,2,3,4,5,6,7,8,9,10,11,12], icone: "__SVG__lecteur de glycemie.svg__",
    conseils: ["Surveillance glycémique régulière selon objectif personnalisé.", "Activité physique 30 min/jour minimum (marche, natation).", "Soins des pieds quotidiens (inspection, hydratation, coupe ongles droite).", "Ne jamais arrêter le traitement sans avis médical.", "Consultation annuelle ophtalmologue + néphrologue."],
    contre_indications: ["Metformine : suspendre si examen avec produit de contraste iodé, jeûne prolongé, insuffisance rénale aiguë.", "AINS déconseillés (risque insuffisance rénale).", "Alcool potentialise le risque d'hypoglycémie.", "Interactions sulfamides + AINS, aspirine forte dose, fluoroquinolones."],
    regime: ["Index glycémique bas : légumineuses, céréales complètes, légumes verts.", "Limiter sucres rapides, graisses saturées, alcool, jus de fruits.", "3 repas réguliers, ne pas sauter de repas.", "Fibres solubles ++ (avoine, pomme, psyllium)."],
    signes_alerte: ["Hypoglycémie (< 0,70 g/L) : tremblements, sueurs, confusion → resucrage immédiat 15g glucides.", "Si inconscience → glucagon + SAMU 15.", "Hyperglycémie persistante > 2,50 g/L → médecin urgent."],
    medecine_naturelle: {
      phytotherapie: ["Gymnema sylvestre : réduit l'absorption intestinale du glucose et stimule l'insuline.", "Berbérine (épine-vinette) : hypoglycémiante, efficacité comparable à la metformine selon études.", "Cannelle de Ceylan 1-3g/jour : améliore la sensibilité à l'insuline."],
      aromatherapie: ["HE Géranium rosat : réputée pour l'équilibre glycémique — usage en diffusion.", "HE Coriandre : soutien pancréatique traditionnel.", "HE Lavande vraie : gestion du stress (facteur aggravant la glycémie)."],
      homeopathie: ["Phosphoric acidum 9CH : fatigue et polyurie du diabétique.", "Syzygium jambolanum 4CH : hypoglycémiant de terrain.", "Uranium nitricum 9CH : diabète avec polyphagie et amaigrissement."],
      micronutrition: ["Chrome 200µg/jour : améliore la sensibilité à l'insuline.", "Magnésium 300mg/jour : déficit fréquent, améliore le métabolisme glucidique.", "Alpha-acide lipoïque 600mg : antioxydant, prévention neuropathie diabétique."],
    },
    medicaments_otc: ["Glucomètre + bandelettes", "Alcool isopropylique 70%", "Lancettes stériles", "Sucre de resucrage d'urgence"],
    vente_complementaire: [
      {produit: "Lecteur de glycémie + bandelettes", raison: "Surveillance glycémique à domicile"},
      {produit: "Crème hydratante pieds urée 10-20%", raison: "Prévention complications podologiques"},
      {produit: "Semelles orthopédiques diabétiques", raison: "Protection et confort plantaire"},
      {produit: "Pilulier semainier", raison: "Améliore l'observance du traitement"},
    ],
    sources: [{label: "Ameli — Diabète type 2 : traitement médicamenteux", url: "https://www.ameli.fr/assure/sante/themes/diabete-adulte/diabete-traitement/traitements-medicamenteux", date: "consulté 07/2026"},{label: "SFD", url: "https://www.sfdiabete.org"},{label: "Vidal", url: "https://www.vidal.fr"}]
  },
  {
    id: 11, slug: "douleur-arthrose", nom: "Douleur arthrosique",
    categorie: "Rhumatologie", saison: [10,11,12,1,2,3], icone: "__SVG__Douleur Arthrosique.svg__",
    conseils: ["Activité physique adaptée en dehors des poussées.", "Kinésithérapie en phase aiguë et en entretien.", "Chaud ou froid local selon tolérance individuelle.", "Paracétamol en 1ère intention antalgique.", "Protéger les articulations touchées (aides techniques)."],
    contre_indications: ["AINS : efficaces mais risque digestif, rénal, cardiovasculaire au long cours.", "Contre-indiqués si insuffisance rénale, cardiaque, ulcère gastrique, grossesse 3e trimestre.", "Opiacés faibles (tramadol, codéine) : risque de dépendance, prudence."],
    regime: ["Oméga-3 (poissons gras 3x/semaine) et curcuma + pipérine.", "Vitamine D et calcium (produits laitiers, sardines, légumes verts).", "Maintenir un poids normal (chaque kilo perdu = 4 kg de moins sur les genoux).", "Éviter excès d'alcool et tabac (favorisent l'inflammation)."],
    signes_alerte: ["Douleur intense brutale, gonflement chaud et rouge + fièvre → urgences (arthrite septique).", "Blocage articulaire persistant → chirurgien orthopédiste.", "Déformation rapide d'une articulation → rhumatologue."],
    medecine_naturelle: {
      phytotherapie: ["Harpagophytum (griffe du diable) : anti-inflammatoire articulaire, efficacité bien documentée.", "Boswellia serrata : inhibiteur des médiateurs de l'inflammation (leucotriènes).", "Curcuma + pipérine : anti-inflammatoire puissant, protège le cartilage."],
      aromatherapie: ["HE Gaulthérie couchée (wintergreen) : anti-inflammatoire majeur — application locale diluée.", "HE Genévrier commun : drainant et anti-inflammatoire articulaire.", "HE Romarin à camphre : antalgique local, améliore la circulation articulaire."],
      homeopathie: ["Rhus toxicodendron 9CH : douleurs améliorées par le mouvement, aggravées au repos.", "Bryonia 9CH : douleurs aggravées par le moindre mouvement.", "Apis mellifica 9CH : articulation gonflée, chaude, rouge, soulagée par le froid."],
      micronutrition: ["Collagène marin hydrolysé 10g/jour : soutien du cartilage articulaire.", "Glucosamine + chondroïtine : nutrition du cartilage, tolérance variable.", "Vitamine C 500mg/jour : cofacteur de la synthèse du collagène."],
    },
    medicaments_otc: ["Paracétamol 1g", "Ibuprofène 400mg (courte durée)", "Diclofénac gel 1% (topique)", "Glucosamine + chondroïtine"],
    vente_complementaire: [
      {produit: "Genouillère / coudière de maintien", raison: "Soutien articulaire mécanique"},
      {produit: "Patch chaud (Nexcare, Thermacare)", raison: "Soulagement de la douleur par la chaleur"},
      {produit: "Compléments curcuma + pipérine", raison: "Anti-inflammatoire naturel bien toléré"},
      {produit: "Huile de CBD topique", raison: "Soulagement articulaire naturel — forte demande"},
    ],
    sources: [{label: "Ameli — Traitement de l'arthrose", url: "https://www.ameli.fr/assure/sante/themes/arthrose-genou/traitement-medical-chirurgical", date: "consulté 07/2026"},{label: "SFR", url: "https://www.larhumato.fr"},{label: "Vidal", url: "https://www.vidal.fr"}]
  },
  {
    id: 5, slug: "gastro-enterite", nom: "Gastro-entérite aiguë",
    categorie: "Gastro-entérologie", saison: [10,11,12,1,2,3], icone: "__SVG__gastro.svg__",
    conseils: ["Réhydratation orale en priorité absolue (SRO sachet).", "Reprendre l'alimentation dès que possible — ne pas jeûner.", "Hygiène des mains stricte au savon 20 secondes (contagion ++).", "Pas de retour en collectivité avant 48h après fin des symptômes."],
    contre_indications: ["Lopéramide contre-indiqué si fièvre > 38°C, sang dans les selles, enfants < 2 ans.", "Aspirine et AINS : irritants gastriques, contre-indiqués.", "Antibiotiques inutiles sur virose (90% des cas)."],
    regime: ["Phase aiguë : riz blanc, carottes cuites, banane mûre, toast, eau + SRO.", "Éviter lait, graisses, sucres raffinés, café, alcool, épices.", "Réintroduction progressive normale en 48-72h.", "Yaourt et kéfir tolérés (probiotiques bénéfiques)."],
    signes_alerte: ["Déshydratation sévère (sécheresse buccale, absence d'urine > 8h) → urgences.", "Sang dans les selles, fièvre > 39°C persistante > 48h → urgences.", "Nourrisson et personne âgée : seuil d'alerte plus bas."],
    medecine_naturelle: {
      phytotherapie: ["Gingembre frais : antiémétique naturel, réduit nausées et vomissements.", "Charbon végétal activé : absorbant intestinal, réduit ballonnements et diarrhée.", "Cannelier (infusion) : antiseptique intestinal et antidiarrhéique."],
      aromatherapie: ["HE Gingembre : antiémétique — 1 goutte sur le plexus solaire diluée.", "HE Basilic tropical : antispasmodique digestif puissant.", "HE Tea tree : antiseptique intestinal — usage oral sous avis pharmacien."],
      homeopathie: ["Arsenicum album 9CH : gastro avec brûlures, vomissements et diarrhée simultanés.", "Veratrum album 9CH : vomissements violents avec prostration et sueurs froides.", "Nux vomica 9CH : nausées et envies de vomir sans soulagement."],
      micronutrition: ["Probiotiques Saccharomyces boulardii (Ultralevure) : réduit durée et intensité.", "Zinc 20mg/jour pendant 5 jours : réduit la durée de la diarrhée aiguë.", "Glutamine 5g/jour : répare la muqueuse intestinale."],
    },
    medicaments_otc: ["SRO (Hydrigoz, Picolyte)", "Racécadotril 100mg", "Smectite dioctaédrique (Smecta)", "Probiotiques (Ultralevure, Lactéol)"],
    vente_complementaire: [
      {produit: "SRO sachets (Hydrigoz, Picolyte)", raison: "Réhydratation — priorité absolue"},
      {produit: "Probiotiques (Ultralevure, Lactéol)", raison: "Restauration de la flore intestinale"},
      {produit: "Gel hydroalcoolique familial", raison: "Prévention de la contagion intrafamiliale"},
      {produit: "Thermomètre digital", raison: "Surveillance température si fièvre associée"},
    ],
    sources: [{label: "HAS — Gastro-entérite", url: "https://www.has-sante.fr"},{label: "SNFGE", url: "https://www.snfge.org"},{label: "Vidal", url: "https://www.vidal.fr"}]
  },
  {
    id: 4, slug: "hypertension", nom: "Hypertension artérielle",
    categorie: "Cardiologie", saison: [1,2,3,4,5,6,7,8,9,10,11,12], icone: "__SVG__blood-pressure.svg__",
    conseils: ["Prise du traitement à heure fixe (même heure chaque jour).", "Automesure tensionnelle : matin + soir, 3 jours consécutifs, 3 mesures.", "Activité physique régulière d'intensité modérée.", "Arrêt du tabac prioritaire."],
    contre_indications: ["AINS (ibuprofène, kétoprofène, naproxène) : augmentent la TA, à éviter absolument.", "Décongestionnants nasaux strictement contre-indiqués.", "Réglisse et produits à base de réglisse contre-indiqués.", "Alcool réduit l'efficacité du traitement."],
    regime: ["Sel < 5-6g/jour (lire étiquettes, éviter charcuterie, plats préparés).", "Limiter alcool (< 2 verres/jour).", "Régime DASH : fruits, légumes, produits laitiers allégés, céréales complètes.", "Potassium (banane, légumineuses), magnésium (amandes, épinards)."],
    signes_alerte: ["TA > 180/110 mmHg avec céphalées sévères, vision trouble, douleur thoracique → urgence absolue.", "Déficit moteur ou troubles de la parole → AVC possible, SAMU 15 immédiat."],
    medecine_naturelle: {
      phytotherapie: ["Olivier (feuilles) : hypotenseur naturel doux, vasodilatateur.", "Ail (Allium sativum) : réduit modestement la TA systolique.", "Aubépine : cardiotonique et hypotenseur léger, anxiolytique."],
      aromatherapie: ["HE Ylang-ylang : hypotenseur et calmant — diffusion ou massage nuque.", "HE Marjolaine à coquilles : parasympatholytique, réduit la TA par action nerveuse.", "HE Lavande vraie : gestion du stress tensionnel — bain ou diffusion."],
      homeopathie: ["Glonoinum 9CH : HTA avec pulsations dans la tête, bouffées de chaleur.", "Aurum metallicum 9CH : HTA avec dépression et surinvestissement au travail.", "Natrum muriaticum 9CH : HTA avec rétention d'eau et émotions refoulées."],
      micronutrition: ["Magnésium 400mg/jour : vasodilatateur naturel, déficit très fréquent.", "Coenzyme Q10 100mg/jour : améliore la fonction endothéliale.", "Oméga-3 EPA/DHA 2g/jour : réduction modeste de la TA systolique."],
    },
    medicaments_otc: ["Tensiomètre homologué (bras de préférence)", "Carnet automesure"],
    vente_complementaire: [
      {produit: "Tensiomètre bras homologué NF", raison: "Automesure tensionnelle — indispensable"},
      {produit: "Sel de régime (chlorure de potassium)", raison: "Substitut sel pour la cuisine"},
      {produit: "Compléments magnésium + potassium", raison: "Soutien naturel de la tension"},
      {produit: "Pilulier semainier", raison: "Améliore l'observance du traitement chronique"},
    ],
    sources: [{label: "HAS/SFHTA — Prise en charge de l'HTA de l'adulte", url: "https://www.has-sante.fr/jcms/c_2059286/fr/prise-en-charge-de-l-hypertension-arterielle-de-l-adulte", date: "MàJ 10/2016 · consulté 07/2026"},{label: "ESC/ESH Guidelines 2023", url: "https://www.escardio.org"},{label: "Vidal", url: "https://www.vidal.fr"}]
  },
  {
    id: 8, slug: "insomnie", nom: "Insomnie",
    categorie: "Neurologie / Psychiatrie", saison: [1,2,3,4,5,6,7,8,9,10,11,12], icone: "__SVG__insomnie.svg__",
    conseils: ["Horaires de coucher et lever stricts, même le week-end.", "Chambre fraîche (16-18°C), sombre, calme et dédiée au sommeil.", "Pas d'écrans 1h avant le coucher (lumière bleue bloque la mélatonine).", "Rituel de relaxation : lecture, méditation, respiration."],
    contre_indications: ["Doxylamine (Donormyl) contre-indiquée si glaucome, adénome prostate, épilepsie.", "Interactions majeures avec alcool, benzodiazépines, antidépresseurs.", "Mélatonine : déconseillée femme enceinte ou allaitante, enfants < 12 ans."],
    regime: ["Éliminer caféine après 14h (café, thé noir, cola, boissons énergisantes).", "Dîner léger 2-3h avant coucher.", "Magnésium le soir (amandes, noix du Brésil, banane).", "Tisanes : valériane, passiflore, mélisse, camomille."],
    signes_alerte: ["Insomnie chronique > 3 semaines impactant la qualité de vie → médecin.", "Ronflements intenses + pauses respiratoires nocturnes → médecin (apnée du sommeil).", "Hypersomnie diurne sévère → consultation spécialisée."],
    medecine_naturelle: {
      phytotherapie: ["Valériane : réduit la latence d'endormissement, améliore la qualité du sommeil.", "Passiflore : anxiolytique et sédative légère, idéale si insomnie liée au stress.", "Mélisse + houblon : combinaison apaisante, sédative douce sans accoutumance."],
      aromatherapie: ["HE Lavande vraie : sédative, réduit le temps d'endormissement — spray oreiller.", "HE Marjolaine à coquilles : sédative puissante — 1 goutte sur les tempes.", "HE Petit grain bigarade : anxiolytique, régule le système nerveux autonome."],
      homeopathie: ["Coffea cruda 9CH : insomnie par hyperactivité mentale, pensées qui s'enchaînent.", "Nux vomica 9CH : insomnie par surmenage, réveil vers 3h avec idées noires.", "Ignatia amara 9CH : insomnie après choc émotionnel ou deuil."],
      micronutrition: ["Mélatonine 1-2mg : 30 min avant coucher, efficace surtout sur l'endormissement.", "Magnésium bisglycinate 300mg le soir : détente neuromusculaire.", "L-Théanine 200mg : acide aminé du thé vert, anxiolytique sans sédation."],
    },
    medicaments_otc: ["Doxylamine 15mg (Donormyl)", "Mélatonine 1-2mg", "Valériane + houblon (Euphytose Nuit)", "Magnésium bisglycinate"],
    vente_complementaire: [
      {produit: "Mélatonine 1mg (Pileje, Arkorelax)", raison: "Régulation du cycle circadien"},
      {produit: "Tisane sommeil (valériane + mélisse + houblon)", raison: "Rituel relaxant du coucher"},
      {produit: "Huile essentielle lavande vraie", raison: "Effet anxiolytique et sédatif léger"},
      {produit: "Magnésium bisglycinate (soir)", raison: "Détente musculaire et nerveuse"},
    ],
    sources: [{label: "HAS/SFTG — Insomnie en médecine générale", url: "https://www.has-sante.fr/jcms/c_937775/fr/plaintes-du-sommeil-insomnie", date: "consulté 07/2026"},{label: "Vidal", url: "https://www.vidal.fr"}]
  },
  {
    id: 12, slug: "migraine", nom: "Migraine",
    categorie: "Neurologie", saison: [1,2,3,4,5,6,7,8,9,10,11,12], icone: "__SVG__Migraine.svg__",
    conseils: ["Identifier et éviter les facteurs déclenchants personnels (stress, manque de sommeil, alcool).", "Prendre le traitement de crise le plus tôt possible dès les prodromes.", "Repos dans une pièce sombre et silencieuse.", "Tenir un journal de céphalées pour le suivi.", "Éviter la surconsommation d'antalgiques (> 10j/mois = céphalée de rebond)."],
    contre_indications: ["Aspirine et AINS contre-indiqués si antécédents ulcère gastrique, grossesse 3e trimestre.", "Triptans : contre-indiqués si antécédents coronariens, AVC, HTA non contrôlée.", "Codéine : risque de céphalée de rebond et de dépendance."],
    regime: ["Éviter les déclencheurs : alcool (vin rouge, bière), chocolat, fromages affinés, charcuteries (nitrites).", "Ne pas sauter de repas (hypoglycémie déclenchante).", "Bonne hydratation tout au long de la journée.", "Magnésium 400mg/j en prévention (efficacité prouvée)."],
    signes_alerte: ["Céphalée en 'coup de tonnerre' (intensité maximale en < 1 min) → urgences neurologiques.", "Première migraine > 50 ans, déficit neurologique focal → urgences.", "Modification du caractère des migraines habituelles → médecin."],
    medecine_naturelle: {
      phytotherapie: ["Grande camomille (Tanacetum parthenium) : réduit fréquence et intensité en prévention.", "Pétasite : anti-migraine preventif, efficacité documentée.", "Gingembre frais : antiémétique et antalgique lors des crises."],
      aromatherapie: ["HE Menthe poivrée : application sur les tempes et front — antalgique local immédiat.", "HE Lavande vraie : sédative, calme la crise et l'anxiété associée.", "HE Gaulthérie : antalgique, appliquée en massage sur la nuque."],
      homeopathie: ["Belladonna 9CH : migraine avec visage rouge, pulsations, aggravée par la lumière.", "Iris versicolor 9CH : migraine avec troubles visuels et nausées.", "Spigelia 9CH : migraine orbitaire gauche, pulsatile, aggravée par le mouvement."],
      micronutrition: ["Magnésium 400mg/jour : prévention, réduit fréquence des crises (prouvé).", "Riboflavine (vitamine B2) 400mg/jour : prévention migraine, efficacité prouvée.", "CoQ10 300mg/jour : traitement de fond, réduit la fréquence des crises."],
    },
    medicaments_otc: ["Paracétamol 1g + caféine (Claradol Caféine)", "Ibuprofène 400mg", "Aspirine 1g effervescent", "Métoclopramide (nausées)"],
    vente_complementaire: [
      {produit: "Patch froid front (Nexcare, Kool'n'Soothe)", raison: "Soulagement immédiat sans médicament"},
      {produit: "Lunettes anti-lumière bleue", raison: "Prévention déclenchement par les écrans"},
      {produit: "Compléments magnésium 400mg/jour", raison: "Prophylaxie — efficacité clinique prouvée"},
      {produit: "HE menthe poivrée", raison: "Alternative non médicamenteuse — tempes"},
    ],
    sources: [{label: "Ameli — Migraine : consultation et traitement", url: "https://www.ameli.fr/assure/sante/themes/migraine/diagnostic-traitement", date: "MàJ 01/2026 · consulté 07/2026"},{label: "SFEMC", url: "https://www.sf-neuro.org"},{label: "Vidal", url: "https://www.vidal.fr"}]
  },
  {
    id: 2, slug: "rhinite-allergique", nom: "Rhinite allergique",
    categorie: "Allergologie", saison: [3,4,5,6,7], icone: "__SVG__sinusite aigue.svg__",
    conseils: ["Lavage nasal au sérum physiologique matin et soir.", "Antihistaminiques 2e génération en traitement de fond.", "Identifier et éviter les facteurs déclenchants.", "Corticoïdes nasaux si rhinite persistante modérée-sévère (sur prescription)."],
    contre_indications: ["Décongestionnants nasaux : maximum 5 jours — risque de rhinite médicamenteuse par rebond.", "Contre-indiqués si HTA non contrôlée, cardiopathie, grossesse, enfants < 15 ans.", "Pseudoéphédrine : risque cardiovasculaire, retiré de la vente libre en 2023."],
    regime: ["Hydratation importante (> 1,5L/jour).", "Éviter alcool et épices (vasodilatation muqueuse nasale).", "Probiotiques pouvant moduler la réponse allergique (Lactobacillus rhamnosus)."],
    signes_alerte: ["Fièvre, jetage purulent verdâtre, douleurs sinusiennes → médecin (surinfection bactérienne).", "Anosmie prolongée → consultation ORL.", "Otalgies associées → médecin."],
    medecine_naturelle: {
      phytotherapie: ["Plantain lancéolé : antihistaminique et décongestionnant nasal naturel.", "Euphraise : soulage les symptômes oculaires et nasaux.", "Ortie (Urtica dioica) : antihistaminique naturel en extrait lyophilisé."],
      aromatherapie: ["HE Eucalyptus radiata : décongestionnant nasal doux — inhalation.", "HE Camomille romaine : anti-allergique, apaisante.", "HE Niaouli : immunostimulant et décongestionnant nasal."],
      homeopathie: ["Allium cepa 9CH : nez qui coule avec brûlures, éternuements.", "Sabadilla 9CH : éternuements en salves, prurit palatin.", "Nux vomica 9CH : rhinite avec nez bouché la nuit et coulant le jour."],
      micronutrition: ["Vitamine C 1g/jour : antihistaminique naturel.", "Quercétine 500mg : inhibe la libération d'histamine.", "Probiotiques (Lactobacillus rhamnosus GG) : modulation immunitaire."],
    },
    medicaments_otc: ["Cétirizine 10mg", "Loratadine 10mg", "Budésonide nasal", "NaCl 0,9% spray nasal"],
    vente_complementaire: [
      {produit: "Sérum physiologique nasal pressurisé", raison: "Lavage quotidien des fosses nasales"},
      {produit: "Humidificateur d'air", raison: "Muqueuses nasales moins irritées"},
      {produit: "Probiotiques (Lactobacillus rhamnosus)", raison: "Modulation de la réponse allergique"},
    ],
    sources: [{label: "Santé.fr — Rhinite allergique", url: "https://www.sante.fr/rhinite-allergique-rhume-des-foins", date: "MàJ 08/2025 · consulté 07/2026"},{label: "ANSM", url: "https://ansm.sante.fr"},{label: "Vidal", url: "https://www.vidal.fr"}]
  },
];

// Tri alphabétique
PATHOLOGIES_DB.sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));

/* Normalisation des champs de recherche (minuscules, sans accents), mémoïsée sur l'objet lui-même
   au premier accès — plutôt que renormalisée à chaque frappe. Calcul paresseux (et non fait une
   fois pour toutes au chargement) car des fichiers d'extension (pathologies-extra.js) ajoutent des
   entrées à PATHOLOGIES_DB après ce script : un pré-calcul global ici les manquerait. */
const _normalize = s => String(s || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
function _getSearchIndex(p) {
  if (!p._searchIndex) {
    p._searchIndex = {
      nom: _normalize(p.nom),
      cat: _normalize(p.categorie),
      cons: _normalize((p.conseils || []).join(' ')),
      ci: _normalize((p.contre_indications || []).join(' ')),
    };
  }
  return p._searchIndex;
}

const MediFicheAPI = {
  async getAll()            { return [...PATHOLOGIES_DB]; },
  async getBySlug(slug)     { return PATHOLOGIES_DB.find(p => p.slug === slug) || null; },
  async search(query) {
    if (!query || query.length < 2) return [];
    const q = _normalize(query);
    const scored = [];
    for (const p of PATHOLOGIES_DB) {
      const { nom, cat, cons, ci } = _getSearchIndex(p);
      let score = 0;
      if (nom === q)                score = 100;      // correspondance exacte
      else if (nom.startsWith(q))   score = 80;       // début du nom
      else if (nom.includes(q))     score = 60;       // nom contient
      else if (cat.includes(q))     score = 40;       // catégorie
      else if (cons.includes(q))    score = 20;       // conseils
      else if (ci.includes(q))      score = 10;       // CI
      if (score > 0) scored.push({ p, score });
    }
    return scored.sort((a,b) => b.score - a.score).map(x => x.p);
  },
  async getBySaison(mois)   { return PATHOLOGIES_DB.filter(p => p.saison.includes(mois)); },
};