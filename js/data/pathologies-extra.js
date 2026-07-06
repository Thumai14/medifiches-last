/* MediFiche — PATHOLOGIES_EXTRA */

'use strict';

// Extension de PATHOLOGIES_DB — nouvelles pathologies
const PATHOLOGIES_EXTRA = [

  // ══════════ RESPIRATOIRE ══════════
  {
    id:20, slug:'bronchite', nom:'Bronchite aiguë', icone:'__SVG__bronchite aigue.svg__', categorie:'Pneumologie',
    saison:[10,11,12,1,2,3],
    conseils:['Repos et hydratation abondante (> 2L/jour).','Antitussifs si toux sèche invalidante — expectorants si toux grasse.','Pas de sport pendant 5-7 jours (risque de myocardite).','Arrêt tabac impératif — accélère la guérison significativement.','Aérer la chambre, humidifier l\'air si trop sec.'],
    contre_indications:['Antibiotiques inutiles dans > 90% des bronchites aiguës virales.','Codéine contre-indiquée chez enfant < 12 ans et femme allaitante.','Antitussifs + expectorants ne pas associer (effets opposés).','AINS à éviter si fièvre mal tolérée — préférer paracétamol.'],
    regime:['Bouillons chauds, tisanes au miel et citron (adoucissants).',  'Éviter alcool et tabac (irritants bronchiques).','Miel : antitussif naturel prouvé — 1 cuillère à café avant le coucher.','Hydratation ++ : fluidifie les sécrétions bronchiques.'],
    signes_alerte:['Fièvre > 39°C persistante > 3 jours → médecin (surinfection bactérienne).','Dyspnée au repos ou cyanose → urgences.','Expectoration purulente verdâtre abondante → médecin.','Durée > 3 semaines → médecin (bronchite chronique, asthme ?)'],
    medecine_naturelle:{
      phytotherapie:['Thym : antiseptique bronchique et expectorant — infusion 3×/jour.','Eucalyptus globulus : inhalations pour décongestionner.','Lierre grimpant (Prospan) : bronchodilatateur et expectorant.'],
      aromatherapie:['HE Ravintsara : antivirale de référence — inhalation humide.','HE Eucalyptus radiata : expectorant doux — enfants > 6 ans.','HE Tea tree + HE Niaouli : immunostimulant.'],
      homeopathie:['Bryonia 9CH : toux sèche douloureuse aggravée au moindre mouvement.','Phosphorus 9CH : bronchite avec laryngite et toux sèche irritante.','Antimonium tartaricum 9CH : toux grasse avec rattles, expectoration difficile.'],
      micronutrition:['Vitamine C 1g/jour : immunostimulant.','Zinc 15mg/jour : réduction de la durée des infections respiratoires.','Propolis en spray buccal : antibactérien et immunostimulant naturel.']
    },
    medicaments_otc:['Paracétamol 1g (fièvre/douleurs)','Carbocistéine (Rhinathiol®) — toux grasse','Dextromethorphane (Humex Toux Sèche®) — toux sèche','Miel + citron (toux douce)'],
    vente_complementaire:[
      {produit:'Inhalateur à vapeur', raison:'Inhalations décongestionantes à domicile'},
      {produit:'Humidificateur d\'air', raison:'Muqueuses respiratoires moins irritées'},
      {produit:'Propolis spray buccal', raison:'Antibactérien naturel voies respiratoires'},
      {produit:'Sirop miel-thym', raison:'Antitussif naturel bien toléré'},
    ],
    sources:[{label:'HAS — Bronchite aiguë', url:'https://www.has-sante.fr'},{label:'ANSM', url:'https://ansm.sante.fr'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },

  {
    id:21, slug:'bpco', nom:'BPCO (bronchopneumopathie chronique obstructive)', icone:'__SVG__bronchite aigue.svg__', categorie:'Pneumologie',
    saison:[1,2,3,4,5,6,7,8,9,10,11,12],
    conseils:['Arrêt du tabac — seul traitement qui ralentit l\'évolution de la BPCO.','Réhabilitation respiratoire avec kinésithérapeute (drainage bronchique).','Vaccinations antigrippale et antipneumococcique obligatoires.','Surveiller SpO2 avec oxymètre à domicile.','Éviter les expositions à la pollution, poussières, fumées.'],
    contre_indications:['Codéine et opioïdes : risque de dépression respiratoire.','Benzodiazépines : dépression respiratoire — éviter.','Bêta-bloquants non cardiosélectifs : bronchospasme possible.','O2 à haute concentration sans prescription : risque d\'hypercapnie.'],
    regime:['Alimentation enrichie en protéines (muscles respiratoires).','Éviter les repas copieux (diaphragme comprimé → dyspnée aggravée).','Hydratation ++ (fluidifie les sécrétions).','Éviter absolutement alcool + oxygène (danger).'],
    signes_alerte:['Exacerbation aiguë : aggravation dyspnée + expectoration purulente → médecin urgent.','SpO2 < 90% → urgences.','Confusion, cyanose des lèvres → SAMU 15.','Œdèmes des membres inférieurs (cor pulmonaire) → médecin.'],
    medecine_naturelle:{
      phytotherapie:['Lierre grimpant : facilite l\'expectoration.','Eucalyptus : fluidifiant bronchique.','Thym : antiseptique des voies aériennes.'],
      aromatherapie:['HE Romarin à cinéole : mucolytique, expectorant.','HE Eucalyptus globulus : bronchodilatateur léger.','Diffusion HE dans la chambre : assainit l\'air.'],
      homeopathie:['Antimonium arsenicosum 9CH : emphysème, dyspnée chronique.','Lobelia inflata 9CH : bronchospasme avec oppression thoracique.'],
      micronutrition:['Vitamine D 1000 UI/jour : module l\'inflammation bronchique.','N-acétylcystéine 600mg : fluidifiant bronchique et antioxydant.','Oméga-3 : réduction de l\'inflammation systémique.']
    },
    medicaments_otc:['Oxymètre de pouls (surveillance SpO2)','Peak-flow meter','N-acétylcystéine (Mucomyst®)'],
    vente_complementaire:[
      {produit:'Oxymètre de pouls', raison:'Surveillance SpO2 quotidienne indispensable'},
      {produit:'N-acétylcystéine (Mucomyst®)', raison:'Fluidifiant bronchique + antioxydant'},
      {produit:'Chambre d\'inhalation', raison:'Optimise l\'efficacité des bronchodilatateurs'},
    ],
    sources:[{label:'HAS — Antibiothérapie : exacerbations aiguës de BPCO', url:'https://www.has-sante.fr/jcms/p_3528903/fr/choix-et-durees-d-antibiotherapie-dans-les-exacerbations-aigues-de-bronchopneumopathie-chronique-obstructive-eabpco', date:'consulté 07/2026'},{label:'GOLD Guidelines 2024', url:'https://goldcopd.org'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },

  {
    id:22, slug:'toux', nom:'Toux sèche / aiguë', icone:'__SVG__toux seche + toux grasse.svg__', categorie:'Pneumologie',
    saison:[10,11,12,1,2,3],
    conseils:['Identifier le type : toux sèche (irritative) vs grasse (productive) → traitement différent.','Humidifier l\'air et s\'hydrater abondamment.','Miel en prise nocturne : efficacité prouvée sur la toux.','Surélever la tête de lit si toux nocturne.','Ne pas associer antitussif + expectorant.'],
    contre_indications:['Codéine : contre-indiquée < 12 ans, femme allaitante, métaboliseurs rapides.','Antitussifs contre-indiqués si toux grasse (risque de rétention des sécrétions).','Expectorants peu prouvés en dehors des maladies respiratoires chroniques.','Bromhexine : CI chez enfant < 6 ans.'],
    regime:['Miel pur 1 cuillère à café avant coucher (antitussif naturel prouvé).','Éviter alcool, tabac, épices (irritants des muqueuses).','Tisane gingembre-citron-miel : adoucissante et antiseptique.','Hydratation ++ pour fluidifier les sécrétions.'],
    signes_alerte:['Toux persistante > 3 semaines → médecin (cancer, asthme, tuberculose).','Hémoptysie (sang dans les crachats) → urgences.','Sifflement à l\'expiration → asthme, médecin.','Toux + fièvre + dyspnée → pneumonie possible, médecin.'],
    medecine_naturelle:{
      phytotherapie:['Thym + miel : antitussif naturel de référence.','Mauve officinale : adoucissante des muqueuses.','Plantain lancéolé : anti-inflammatoire des voies aériennes.'],
      aromatherapie:['HE Ravintsara : antivirale — inhalation sèche sur mouchoir.','HE Eucalyptus radiata : décongestionnant et expectorant.','HE Laurier noble : antispasmodique des bronches.'],
      homeopathie:['Drosera 9CH : toux spasmodique quinteuse, toux du couchant.','Spongia 9CH : toux sèche laryngée, comme une scie.','Rumex crispus 9CH : toux par chatouillements sous le sternum.'],
      micronutrition:['Vitamine C + zinc : soutien immunitaire global.','Propolis : antibactérien et immunostimulant.','Extrait de pépins de pamplemousse : antiseptique naturel.']
    },
    medicaments_otc:['Pholcodine (toux sèche)','Dextromethorphane (Humex Toux Sèche®)','Carbocistéine (toux grasse)','Sirop miel-thym (enfant)'],
    vente_complementaire:[
      {produit:'Sirop miel-thym', raison:'Antitussif naturel — adulte et enfant'},
      {produit:'Pastilles adoucissantes (miel-propolis)', raison:'Soulagement local gorge et toux'},
      {produit:'Humidificateur d\'air', raison:'Muqueuses respiratoires moins irritées'},
    ],
    sources:[{label:'HAS — Toux aiguë', url:'https://www.has-sante.fr'},{label:'ANSM', url:'https://ansm.sante.fr'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },

  {
    id:23, slug:'sinusite', nom:'Sinusite aiguë', icone:'__SVG__sinusite aigue.svg__', categorie:'ORL',
    saison:[10,11,12,1,2,3],
    conseils:['Mouchage régulier et lavage nasal au sérum physiologique.','Décongestionnants nasaux max 5 jours.','Antalgiques si douleurs faciales (paracétamol en 1ère intention).','Inhalations de vapeur d\'eau pour drainer les sinus.','Position semi-assise pour faciliter le drainage.'],
    contre_indications:['Antibiotiques inutiles dans la grande majorité des sinusites virales.','Antihistaminiques : pas d\'effet prouvé sur la sinusite.','Décongestionnants systémiques : CI si HTA, cardiopathie.','Aspirine : éviter si allergie ou asthme.'],
    regime:['Hydratation ++ (fluidifie les sécrétions sinusiennes).','Éviter alcool (vasodilatateur et irritant muqueux).','Aliments épicés peuvent aider à drainer naturellement.','Miel et citron en tisane : adoucissants.'],
    signes_alerte:['Fièvre > 38,5°C + douleurs faciales intenses → médecin (sinusite bactérienne).','Sinusite > 10 jours sans amélioration → médecin.','Œdème périorbitaire, troubles visuels → urgences (sinusite compliquée).','Méningisme (raideur nuque) → SAMU 15.'],
    medecine_naturelle:{
      phytotherapie:['Gélules de Sinupret (gentiane, primevère, sureau, verveine, oseille) : décongestionnant sinusien prouvé.','Eucalyptus en inhalation : antiseptique et drainant.','Thym : antiseptique des muqueuses nasales.'],
      aromatherapie:['HE Eucalyptus globulus : inhalation humide, puissant décongestionnant.','HE Menthe poivrée : 1 goutte sous le nez (adulte) — effect décongestionnant immédiat.','HE Niaouli : antiseptique des voies aériennes.'],
      homeopathie:['Sinus 15CH (complexe homéo) : sinusite avec douleurs faciales.','Kalium bichromicum 9CH : sinusite avec sécrétions épaisses jaunâtres filantes.','Mercurius solubilis 9CH : sinusite infectieuse avec sueurs et halitose.'],
      micronutrition:['Vitamine C 1g/jour : renforce l\'immunité.','Zinc 15mg/jour : antibactérien naturel.','Quercétine : anti-inflammatoire muqueux.']
    },
    medicaments_otc:['Paracétamol 1g (douleurs)','NaCl 0,9% spray nasal (lavage)','Xylométazoline 0,1% (max 5 jours)','Sinupret® (phytothérapie)'],
    vente_complementaire:[
      {produit:'Spray nasal lavage hypertonique (Rhinomer Forte)', raison:'Drainage actif des sécrétions sinusiennes'},
      {produit:'Inhalateur vapeur', raison:'Inhalations décongestionantes à domicile'},
      {produit:'Sinupret® (phytothérapie)', raison:'Décongestionnant sinusien naturel prouvé'},
    ],
    sources:[{label:'HAS — Antibiothérapie : sinusite de l\'adulte', url:'https://www.has-sante.fr/jcms/c_2722806/fr/choix-et-durees-d-antibiotherapies-sinusite-de-l-adulte', date:'MàJ 05/2025 · consulté 07/2026'},{label:'HAS — Sinusites de l\'enfant', url:'https://www.has-sante.fr/jcms/c_2722824/fr/choix-et-durees-d-antibiotherapies-sinusites-de-l-enfant', date:'MàJ 05/2025 · consulté 07/2026'},{label:'ANSM', url:'https://ansm.sante.fr'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },

  {
    id:24, slug:'angine', nom:'Angine (pharyngite aiguë)', icone:'__SVG__angine.svg__', categorie:'ORL / Infectiologie',
    saison:[10,11,12,1,2,3],
    conseils:['Test de diagnostic rapide (TDR) streptocoque en officine — OBLIGATOIRE avant tout antibiotique.','Antalgiques et antipyrétiques pour le confort (paracétamol en 1ère intention).','Gargarismes avec eau salée tiède 3×/jour.','Alimentation molle, froide (glaces = antalgique local).','Repos vocal si laryngite associée.'],
    contre_indications:['Amoxicilline sans TDR positif = mauvaise pratique (résistances).','Aspirine chez l\'enfant et l\'adolescent : risque de syndrome de Reye.','Pas de corticoïdes sans prescription médicale.','Amoxicilline si angine à EBV (mononucléose) : rash cutané systématique.'],
    regime:['Boissons froides : ice-cream, glaces pilées (antalgique local).','Tisanes tièdes (pas brûlantes) avec miel et citron.','Alimentation molle : yaourts, smoothies, soupes.','Éviter alcool et tabac (irritants pharyngés).'],
    signes_alerte:['Dysphagie sévère (impossibilité d\'avaler la salive) → urgences (abcès péri-amygdalien).','Trismus (impossibilité d\'ouvrir la bouche) → urgences.','Stridor → urgences (épiglottite).','TDR positif chez enfant < 3 ans → médecin obligatoire.'],
    medecine_naturelle:{
      phytotherapie:['Propolis en spray buccal : antibactérien et antiviral local.','Echinacea : stimule les défenses immunitaires en début d\'infection.','Sauge officinale : antiseptique pharyngé — gargarisme.'],
      aromatherapie:['HE Tea tree diluée : antibactérien local.','HE Romarin à cinéole : antiseptique voies aériennes.','HE Ravintsara : antivirale si angine virale.'],
      homeopathie:['Belladonna 9CH : début brutal, gorge rouge très douloureuse, fièvre élevée.','Mercurius solubilis 9CH : angine purulente, halitose, salivation excessive.','Lachesis 9CH : angine côté gauche, aggravée par la chaleur et le contact.'],
      micronutrition:['Vitamine C 1g/jour : immunostimulant.','Zinc 15mg : antibactérien et cicatrisant muqueux.','Propolis + miel en spray local.']
    },
    medicaments_otc:['Paracétamol 1g','Ibuprofène 400mg','Spray antiseptique local (Lysopaïne®, Hexaspray®)','TDR streptocoque (en officine)'],
    vente_complementaire:[
      {produit:'TDR streptocoque (Streptatest®)', raison:'Diagnostic rapide — évite les antibiotiques inutiles'},
      {produit:'Pastilles antiseptiques (Lysopaïne®)', raison:'Antisepsie locale et antalgie de la gorge'},
      {produit:'Spray propolis', raison:'Antibactérien naturel local'},
    ],
    sources:[{label:'HAS — Antibiothérapie : angine aiguë de l\'adulte', url:'https://www.has-sante.fr/jcms/p_3529230/fr/choix-et-durees-d-antibiotherapies-angine-aigue-de-l-adulte', date:'MàJ 05/2025 · consulté 07/2026'},{label:'HAS — Angine aiguë de l\'enfant', url:'https://www.has-sante.fr/jcms/p_3529229/fr/choix-et-durees-d-antibiotherapies-angine-aigue-de-l-enfant', date:'MàJ 05/2025 · consulté 07/2026'},{label:'ANSM', url:'https://ansm.sante.fr'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },

  // ══════════ CARDIOVASCULAIRE / MÉTABOLIQUE ══════════
  {
    id:25, slug:'insuffisance-cardiaque', nom:'Insuffisance cardiaque', icone:'__SVG__categorie cardio vasculaire.svg__', categorie:'Cardiologie',
    saison:[1,2,3,4,5,6,7,8,9,10,11,12],
    conseils:['Pesée quotidienne le matin à jeun : alerte si + 2kg en 48h (rétention eau).','Restriction sodée stricte (sel < 3g/jour).','Restriction hydrique selon prescription (souvent 1,5L/jour).','Traitement au long cours même sans symptômes — observance primordiale.','Activité physique adaptée (marche) si stable — éviter les efforts intenses.'],
    contre_indications:['AINS formellement contre-indiqués (rétention hydrosodée, décompensation).','Bêta-bloquants : ne jamais arrêter brutalement.','Alcool : cardiotoxique direct.','Médicaments inotropes négatifs (vérapamil, diltiazem) dans IC systolique.','Automédication : tout nouveau médicament → avis médical.'],
    regime:['Sel < 3g/jour : lire toutes les étiquettes.','Restriction hydrique selon prescription médicale.','Alcool : zéro tolérance (cardiotoxique).','Éviter les aliments très salés : charcuteries, fromages, plats préparés.','Alimentation de type méditerranéen si possible.'],
    signes_alerte:['Prise de poids > 2kg en 48h → contact médecin immédiat.','Dyspnée au repos ou dyspnée nocturne → urgences.','Œdèmes des chevilles qui remontent → médecin urgent.','Syncope ou pré-syncope → urgences.'],
    medecine_naturelle:{
      phytotherapie:['Aubépine (Crataegus) : cardiotonique doux, réduit la PA légèrement.','Olivier (feuilles) : légèrement hypotenseur.'],
      aromatherapie:['HE Lavande vraie : cardiotonique et calmant — diffusion.','HE Ylang-ylang : hypotenseur, relaxant cardiaque.'],
      homeopathie:['Digitalis purpurea 9CH : bradycardie avec suffocation.','Arsenicum album 9CH : angoisse nocturne, dyspnée avec œdèmes.'],
      micronutrition:['CoQ10 100-300mg/jour : améliore la bioénergétique cardiaque (prouvé).','Magnésium 400mg : antiarythmique naturel.','Oméga-3 EPA/DHA 1g/jour : cardioprotecteur.']
    },
    medicaments_otc:['Tensiomètre bras homologué (surveillance PA)','Pèse-personne (contrôle quotidien)','Oxymètre de pouls'],
    vente_complementaire:[
      {produit:'Pèse-personne connecté', raison:'Surveillance poids quotidienne — signe clé de décompensation'},
      {produit:'Tensiomètre bras NF', raison:'Automesure tensionnelle quotidienne'},
      {produit:'Pilulier semainier', raison:'Observance multi-médicaments'},
    ],
    sources:[{label:'HAS — Insuffisance cardiaque', url:'https://www.has-sante.fr'},{label:'ESC Guidelines 2021', url:'https://www.escardio.org'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },

  {
    id:26, slug:'hypercholesterolemie', nom:'Hypercholestérolémie', icone:'__SVG__cholesterol-acide-urique.svg__', categorie:'Cardiologie / Métabolisme',
    saison:[1,2,3,4,5,6,7,8,9,10,11,12],
    conseils:['Traitement au long cours — ne jamais arrêter sans avis médical.','Prise de statine de préférence le soir (synthèse du cholestérol maximale la nuit).','Surveiller les douleurs musculaires (myopathie sous statines — rare).','Bilan lipidique de contrôle 3 mois après initiation.','L\'objectif de LDL est personnalisé selon le risque cardiovasculaire global.'],
    contre_indications:['Statines + jus de pamplemousse : inhibition du CYP3A4 → toxicité musculaire augmentée.','Statines + macrolides/azolés : même interaction CYP3A4.','Statines : CI grossesse (tératogènes).','Fibrates + statines : risque accru de rhabdomyolyse.','Cholestyramine : espacer de 2h tous les autres médicaments (absorption réduite).'],
    regime:['Limiter graisses saturées (viandes grasses, beurre, fromage, charcuterie).','Augmenter oméga-3 (poissons gras 3×/semaine, noix, graines de lin).','Fibres solubles ++ (avoine, légumineuses, pomme) : réduisent LDL.','Stérols végétaux (produits enrichis) : réduction LDL de 10-15%.','Limiter sucres raffinés (augmentent triglycérides).'],
    signes_alerte:['Douleurs musculaires intenses ou faiblesse sous statines → médecin (CPK ?).','Ictère (jaunisse) sous statines → urgences (hépatotoxicité).','Douleur thoracique → SAMU 15 (éliminer SCA).'],
    medecine_naturelle:{
      phytotherapie:['Artichaut (extrait) : réduit le LDL de 10-15% selon certaines études.','Levure de riz rouge : contient monacoline K (statine naturelle) — interactions ++ à vérifier.','Berbérine 500mg 2×/jour : réduit LDL et triglycérides.'],
      aromatherapie:['HE Citron en ingestion (sous avis) : drainant hépatique.'],
      homeopathie:['Cholesterinum 9CH : terrain hypercholestérolémique de fond.'],
      micronutrition:['Oméga-3 EPA/DHA 2-4g/jour : réduit triglycérides de 20-30%.','Stérols végétaux 2g/jour : réduction LDL prouvée.','Bêta-glucane (avoine) 3g/jour : fibres solubles hypocholestérolémiantes.']
    },
    medicaments_otc:['Stérols végétaux (Danacol®, Activia®)','Oméga-3 en complément','Artichaut (Chophytol®)'],
    vente_complementaire:[
      {produit:'Stérols végétaux (Danacol®)', raison:'Réduction LDL prouvée — 2g/jour en complément'},
      {produit:'Oméga-3 EPA/DHA concentré', raison:'Réduction triglycérides + bénéfice cardiovasculaire'},
      {produit:'Avoine en flocons (bêta-glucane)', raison:'Fibres solubles hypocholestérolémiantes'},
    ],
    sources:[{label:'HAS — Hypercholestérolémie', url:'https://www.has-sante.fr'},{label:'ESC/EAS Guidelines 2019', url:'https://www.escardio.org'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },

  {
    id:27, slug:'goutte', nom:'Goutte (hyperuricémie)', icone:'__SVG__cholesterol-acide-urique.svg__', categorie:'Rhumatologie',
    saison:[1,2,3,4,5,6,7,8,9,10,11,12],
    conseils:['Repos strict et surélévation du membre atteint lors des crises.','Glace locale (jamais de chaleur en crise aiguë).','Hydratation abondante : 2-3L/eau/jour (favorise l\'élimination urinaire de l\'urate).','Traitement hypouricémiant (allopurinol) à prendre au long cours même sans crise.','Ne jamais arrêter l\'allopurinol en crise aiguë (aggrave).'],
    contre_indications:['Aspirine à faibles doses : diminue l\'élimination urinaire de l\'urate → contre-indiquée.','AINS : efficaces en crise mais CI insuffisance rénale.','Allopurinol : ne pas initier en pleine crise aiguë (prolonge la crise).','Ampicilline + allopurinol : rash cutané augmenté × 10.'],
    regime:['Éviter la bière, alcools forts (riches en purines et freinent l\'excrétion d\'urate).','Réduire viandes rouges, abats, poissons gras (riches en purines).','Cerises, jus de cerise : réduisent l\'acide urique (prouvé).','Alcaliniser les urines : eau de Vichy (bicarbonates).','Café (même décaféiné) : légèrement protecteur.'],
    signes_alerte:['Crise ne cédant pas sous traitement → médecin.','Fièvre associée → éliminer arthrite septique (urgence).','Tophi qui s\'infectent → médecin.','Insuffisance rénale sur urate → médecin.'],
    medecine_naturelle:{
      phytotherapie:['Cerisier (extrait de jus) : réduit les crises de goutte (prouvé).','Griffe du diable (Harpagophytum) : anti-inflammatoire articulaire.','Ortie : drainante rénale, favorise l\'élimination de l\'urate.'],
      aromatherapie:['HE Genévrier : drainant rénal et articulaire.','HE Citron : alcalinisant urinaire.'],
      homeopathie:['Colchicum autumnale 9CH : crise de goutte aiguë classique.','Uricum acidum 15CH : terrain goutteux chronique.'],
      micronutrition:['Vitamine C 500mg/jour : réduit l\'uricémie légèrement.','Céleri extrait concentré : drainant urique.','Eau alcaline (bicarbonate de sodium) : alcalinisation urinaire.']
    },
    medicaments_otc:['Paracétamol 1g (douleur, pas les AINS en première intention si insuffisance rénale)','Glace locale','Colchicine (sur prescription)'],
    vente_complementaire:[
      {produit:'Jus de cerise concentré', raison:'Réduction des crises de goutte prouvée'},
      {produit:'Eau de Vichy Saint-Yorre', raison:'Alcalinisation urinaire — favorise excrétion urate'},
      {produit:'Céleri extrait (Arkogélules)', raison:'Drainant urique naturel'},
    ],
    sources:[{label:'HAS — Goutte', url:'https://www.has-sante.fr'},{label:'SFR — Recommandations goutte', url:'https://www.larhumato.fr'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },

  // ══════════ DIGESTIF ══════════
  {
    id:28, slug:'rgo', nom:'Reflux gastro-œsophagien (RGO)', icone:'__SVG__RGO et Ulcere gastroduodenal.svg__', categorie:'Gastro-entérologie',
    saison:[1,2,3,4,5,6,7,8,9,10,11,12],
    conseils:['Surélever la tête de lit de 15-20cm (pas juste les oreillers).','Repas en petites quantités, mastication lente, éviter de s\'allonger dans les 3h après les repas.','Perdre du poids si IMC élevé (pression abdominale).','Antiacides efficaces en 5 min pour les symptômes occasionnels.','IPP : prendre 30 min avant le repas pour efficacité maximale.'],
    contre_indications:['Aspirine et AINS : irritants gastriques — aggravent le RGO.','AINS + IPP : l\'IPP ne protège pas totalement — utiliser avec prudence.','IPP au long cours : déficit en magnésium, B12, fer, ostéoporose — surveillance.','Antiacides contenant aluminium : constipation + absorption médicaments altérée.'],
    regime:['Éviter : café, alcool, chocolat, menthe, tomate, agrumes (relâchent le sphincter).','Éviter repas gras et copieux (ralentissent la vidange gastrique).','Éviter alcool, tabac, vêtements serrés à la taille.','Dernier repas 3h avant le coucher.','Chewing-gum sans sucre après les repas : stimule la salive (tampon acide).'],
    signes_alerte:['Dysphagie (difficulté à avaler) → médecin urgent (sténose ?).','Amaigrissement inexpliqué + RGO → fibroscopie.','Vomissements de sang ou selles noires → urgences.','RGO résistant aux IPP à dose double → médecin (endobrachyoesophage ?).'],
    medecine_naturelle:{
      phytotherapie:['Réglisse déglycyrrhizinée (DGL) : protège la muqueuse œsophagienne.','Aloe vera jus : adoucissant de la muqueuse digestive.','Camomille : anti-spasmodique digestif, apaisante.'],
      aromatherapie:['HE Gingembre : stomachique, améliore la vidange gastrique.','HE Basilic : antispasmodique digestif.'],
      homeopathie:['Nux vomica 9CH : RGO avec brûlures, pyrosis après les repas.','Iris versicolor 9CH : RGO acide avec brûlures remontant jusqu\'à la bouche.'],
      micronutrition:['Aloe vera jus 100ml avant les repas : protecteur muqueux.','Mélatonine 3mg au coucher : réduit la sécrétion acide gastrique nocturne.','Zinc-carnosine : protège la muqueuse gastrique.']
    },
    medicaments_otc:['Antiacides (Gaviscon®, Maalox®)','Oméprazole 20mg (IPP) — court terme sans prescription','Aloe vera jus'],
    vente_complementaire:[
      {produit:'Gaviscon® (alginate)', raison:'Barrière physique anti-reflux — efficacité prouvée'},
      {produit:'Surélévateur de tête de lit', raison:'Indispensable pour le RGO nocturne'},
      {produit:'Tisane camomille-réglisse', raison:'Adoucissant digestif naturel'},
    ],
    sources:[{label:'HAS — RGO', url:'https://www.has-sante.fr'},{label:'SNFGE', url:'https://www.snfge.org'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },

  {
    id:29, slug:'ulcere-gastrique', nom:'Ulcère gastroduodénal', icone:'__SVG__RGO et Ulcere gastroduodenal.svg__', categorie:'Gastro-entérologie',
    saison:[1,2,3,4,5,6,7,8,9,10,11,12],
    conseils:['Traitement par IPP au long cours selon la cause (H. pylori ou AINS).','Si H. pylori : trithérapie d\'éradication sur 10-14 jours — observance absolue.','Contrôle de l\'éradication 4 semaines après la fin de l\'antibiothérapie.','Éviter AINS et aspirine si antécédent d\'ulcère.','Arrêt tabac : double le temps de cicatrisation.'],
    contre_indications:['AINS + antécédent ulcère : contre-indication relative — utiliser avec IPP si indispensable.','Corticoïdes + AINS : risque ulcère × 15.','Aspirine même à faible dose aggrave l\'ulcère.','Alcool : irritant direct de la muqueuse gastrique.'],
    regime:['Repas réguliers en petites quantités.','Éviter café, alcool, épices, aliments acides.','Pas de jeûne prolongé (acide sans tampon alimentaire = douleur).','Lait : soulage temporairement mais stimule l\'acide secondairement (mythe).'],
    signes_alerte:['Vomissements de sang (hématémèse) → SAMU 15 (hémorragie digestive).','Selles noires (méléna) → urgences.','Douleur abdominale brutale irradiant dans le dos → SAMU 15 (perforation).','Perte de poids inexpliquée → fibroscopie.'],
    medecine_naturelle:{
      phytotherapie:['Réglisse DGL (déglycyrrhizinée) : cicatrisant de la muqueuse gastrique.','Aloe vera gel : protecteur muqueux.','Mastic (Pistacia lentiscus) : antibactérien contre H. pylori.'],
      aromatherapie:['HE Camomille romaine : anti-spasmodique et apaisante.'],
      homeopathie:['Argentum nitricum 9CH : ulcère avec brûlures et anxiété.','Phosphorus 9CH : hémorragies digestives petites quantités.'],
      micronutrition:['Zinc-carnosine 75mg 2×/jour : cicatrisant prouvé de la muqueuse gastrique.','Vitamine C 500mg : inhibe H. pylori.','Probiotiques (Lactobacillus reuteri) : adjuvant de l\'éradication H. pylori.']
    },
    medicaments_otc:['Oméprazole 20mg (IPP)','Antiacides (Maalox®) — symptomatique'],
    vente_complementaire:[
      {produit:'Zinc-carnosine (Zinco-Carnogel®)', raison:'Cicatrisant muqueux gastrique prouvé'},
      {produit:'Probiotiques (Lactobacillus reuteri)', raison:'Adjuvant de l\'éradication H. pylori'},
    ],
    sources:[{label:'HAS — Ulcère', url:'https://www.has-sante.fr'},{label:'SNFGE', url:'https://www.snfge.org'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },

  {
    id:30, slug:'hemorrhoides', nom:'Hémorroïdes', icone:'__SVG__hemorroide.svg__', categorie:'Gastro-entérologie',
    saison:[1,2,3,4,5,6,7,8,9,10,11,12],
    conseils:['Éviter les efforts de poussée prolongés aux toilettes (max 2-3 min).','Bains de siège à l\'eau tiède 15 min 2×/jour en crise.','Lutter contre la constipation (premier facteur aggravant).','Hygiène anale douce avec eau tiède (pas de papier abrasif).','Surélever les jambes (ottomane) pour faciliter la défécation.'],
    contre_indications:['Laxatifs stimulants au long cours (peuvent aggraver).','Suppositoires corticoïdes : pas > 7 jours (atrophie muqueuse).','Veinotoniques : efficacité limitée — ne pas proposer comme traitement unique.','Crèmes anesthésiques locales en cas d\'allergie au benzocaïne.'],
    regime:['Fibres alimentaires ++ (légumes, fruits, céréales complètes, psyllium).','Hydratation 2L/jour (selles plus molles).','Éviter alcool, épices, café, plats très chauds (vasodilatation).','Pruneaux et kiwi : favorisent un transit régulier.'],
    signes_alerte:['Saignements abondants ou répétés → médecin (éliminer cancer colorectal).','Thrombose hémorroïdaire (nodule bleuté très douloureux) → médecin urgent.','Douleur anale intense fébrile → médecin (abcès ?).','Prolapsus irréductible → urgences.'],
    medecine_naturelle:{
      phytotherapie:['Marron d\'Inde (escine) : veinotonique, réduit l\'inflammation hémorroïdaire.','Hamamélis : astringent, veinotrope.','Cyprès : veinotonique, réduit les œdèmes.'],
      aromatherapie:['HE Cyprès + HE Hélichryse italienne : veinotropes — application diluée locale.'],
      homeopathie:['Aesculus hippocastanum 9CH : hémorroïdes sèches avec pesanteur rectale.','Hamamelis 9CH : hémorroïdes saignantes avec sensation de meurtrisure.','Nux vomica 9CH : hémorroïdes avec constipation et envies inefficaces.'],
      micronutrition:['Vitamine C + bioflavonoïdes (diosmine) : renforcement paroi vasculaire.','Psyllium blond : régularise le transit — évite les efforts de poussée.','Rutine 500mg : veinotonique naturel.']
    },
    medicaments_otc:['Titanoréïne crème®','Daflon 500mg (diosmine+hespéridine)','Préparation H® (formulation US)','Paracétamol (douleur)'],
    vente_complementaire:[
      {produit:'Daflon 500mg (diosmine)', raison:'Veinotonique de référence en crises'},
      {produit:'Psyllium blond', raison:'Régularise le transit — moins d\'efforts de poussée'},
      {produit:'Coussin hémorroïdaire', raison:'Soulagement de la pression assise'},
    ],
    sources:[{label:'HAS — Hémorroïdes', url:'https://www.has-sante.fr'},{label:'SNFGE', url:'https://www.snfge.org'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },

  {
    id:31, slug:'sii', nom:'Syndrome de l\'intestin irritable (SII)', icone:'__SVG__intestin irritable.svg__', categorie:'Gastro-entérologie',
    saison:[1,2,3,4,5,6,7,8,9,10,11,12],
    conseils:['Identifier les aliments déclencheurs personnels (régime d\'éviction progressif).','Régime pauvre en FODMAPs (oligosaccharides fermentescibles) efficace dans 75% des cas.','Gestion du stress ++ : lien fort intestin-cerveau (axe microbiote-cerveau).','Repas réguliers, mâcher lentement, éviter l\'air avalé (boissons gazeuses, chewing-gum).','Probiotiques : peuvent réduire les ballonnements et douleurs.'],
    contre_indications:['AINS : aggravent l\'irritation intestinale.','Antibiotiques sans indication : perturbent le microbiote.','Laxatifs stimulants au long cours (sauf si constipation prédominante).','Antidiarrhéiques (lopéramide) en continu (si diarrhée prédominante — max 2j/épisode).'],
    regime:['Régime pauvre en FODMAPs : éviter fructose (pomme, miel), lactose, légumineuses, blé.','Petites quantités à chaque repas.','Éviter les repas gras et les aliments ultra-transformés.','Intégrer des fibres solubles progressivement (pas les fibres insolubles en phase douloureuse).'],
    signes_alerte:['Sang dans les selles → médecin urgent (éliminer MICI, cancer).','Amaigrissement inexpliqué > 5% → médecin.','Symptômes > 50 ans d\'apparition récente → coloscopie obligatoire.','Douleur nocturne réveillant → n\'est pas un SII, cause organique à chercher.'],
    medecine_naturelle:{
      phytotherapie:['Menthe poivrée huile essentielle (gélules gastro-résistantes) : antispasmodique intestinal prouvé dans le SII.','Artichaut + boldo : digestion et réduction des ballonnements.','Fenouil : carminatif, réduit les gaz intestinaux.'],
      aromatherapie:['HE Basilic + HE Estragon : antispasmodiques digestifs majeurs.','HE Menthe poivrée (voie orale gélules) : prouvée dans les douleurs du SII.'],
      homeopathie:['Colocynthis 9CH : douleurs crampes améliorées par la pression et la chaleur.','Nux vomica 9CH : SII avec constipation, envies inefficaces, stress professionnel.','China rubra 9CH : ballonnements post-repas avec sensation de ventre plein.'],
      micronutrition:['Probiotiques (Bifidobacterium infantis, L. plantarum) : réduction douleurs et ballonnements.','Glutamine 5g/jour : renforce la barrière intestinale.','Magnésium : antispasmodique intestinal naturel.']
    },
    medicaments_otc:['Phloroglucinol (Spasfon®) — antispasmodique','Siméticone (gaz)','Probiotiques (Lactibiane®)','Menthe poivrée gélules (Colpermin®)'],
    vente_complementaire:[
      {produit:'Colpermin® (menthe poivrée gélules)', raison:'Antispasmodique prouvé dans le SII — effet en 2 semaines'},
      {produit:'Probiotiques SII spécifiques (Lactibiane®)', raison:'Réduction douleurs et ballonnements'},
      {produit:'Journal alimentaire', raison:'Identifier les aliments déclencheurs (FODMAPs)'},
    ],
    sources:[{label:'HAS — SII', url:'https://www.has-sante.fr'},{label:'SNFGE', url:'https://www.snfge.org'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },

  // ══════════ DOULEUR / RHUMATOLOGIE ══════════
  {
    id:32, slug:'lombalgie', nom:'Lombalgie (mal de dos)', icone:'__SVG__Lombalgie ( mal de dos ).svg__', categorie:'Rhumatologie',
    saison:[1,2,3,4,5,6,7,8,9,10,11,12],
    conseils:['Maintien de l\'activité physique — le repos strict au lit aggrave la lombalgie.','Antalgie adaptée pour permettre le maintien de l\'activité.','Posture correcte au travail et à la maison.','Éviter le port de charges lourdes ou utiliser la technique correcte (genoux fléchis).','Chaleur locale (bouillotte) en lombalgie non inflammatoire.'],
    contre_indications:['Repos strict au lit > 2 jours : facteur de chronicisation.','AINS en lombalgie chronique au long cours : risque cardiovasculaire et rénal.','Myorelaxants : sédatifs, risque de dépendance.','Corticoïdes systémiques : pas d\'indication dans la lombalgie commune.'],
    regime:['Anti-inflammatoires naturels : oméga-3, curcuma + pipérine, gingembre.','Maintien hydratation (disques intervertébraux composés à 80% d\'eau).','Éviter excès de poids (charge sur les disques).','Magnésium 300mg : antispasmodique musculaire.'],
    signes_alerte:['Douleurs nocturnes intenses réveillant → médecin (spondylite, tumeur).','Déficit moteur ou sensitif des membres inférieurs → urgences (compression médullaire).','Troubles sphinctériens (urine, selles) → SAMU 15 (queue de cheval).','Fièvre + lombalgie → médecin (spondylodiscite).'],
    medecine_naturelle:{
      phytotherapie:['Harpagophytum (griffe du diable) 2400mg/jour : anti-inflammatoire, efficacité prouvée dans la lombalgie.','Saule blanc (aspirine naturelle) : analgésique.','Curcuma + pipérine : anti-inflammatoire musculaire et articulaire.'],
      aromatherapie:['HE Gaulthérie (wintergreen) : anti-inflammatoire local puissant — massage dilué.','HE Lavande aspic : antalgique et décontracturante musculaire.','HE Romarin à camphre : décontracturant musculaire — application locale.'],
      homeopathie:['Rhus toxicodendron 9CH : lombalgies améliorées après quelques mouvements.','Bryonia 9CH : lombalgies aggravées par le moindre mouvement.','Arnica 9CH : lombalgie post-traumatique ou après effort.'],
      micronutrition:['Magnésium bisglycinate 300mg : décontracturant musculaire.','Collagène marin 10g/jour : soutien des disques intervertébraux.','Vitamine D 1000 UI/jour : déficit associé aux douleurs chroniques.']
    },
    medicaments_otc:['Paracétamol 1g','Ibuprofène 400mg (cure courte)','Myorelaxant (Myolastan® sur prescription)','Harpagophytum (Arkogélules®)'],
    vente_complementaire:[
      {produit:'Bouillotte électrique', raison:'Chaleur locale antalgique — efficace sur les contractures'},
      {produit:'Ceinture lombaire de soutien', raison:'Soutien mécanique temporaire'},
      {produit:'Harpagophytum (Arkogélules®)', raison:'Anti-inflammatoire naturel prouvé'},
    ],
    sources:[{label:'HAS — Lombalgie commune : prise en charge', url:'https://www.has-sante.fr/jcms/c_2961499/fr/prise-en-charge-du-patient-presentant-une-lombalgie-commune', date:'consulté 07/2026'},{label:'SFR', url:'https://www.larhumato.fr'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },

  {
    id:33, slug:'tendinite', nom:'Tendinite / Tendinopathie', icone:'__SVG__atelle de repos poignet.svg__', categorie:'Rhumatologie',
    saison:[1,2,3,4,5,6,7,8,9,10,11,12],
    conseils:['Repos relatif de la zone (éviter les gestes déclenchants, pas d\'immobilisation totale).','Glace locale 15 min 3-4×/jour les premiers jours (phase aiguë).','Étirements et exercices excentriques (physiothérapie).','Semelles orthopédiques si tendinite d\'Achille.','Orthèse de repos nocturne si tendinite du coude ou du poignet.'],
    contre_indications:['Injection de corticoïdes intra-tendineuses répétées : fragilisation du tendon, risque de rupture.','Fluoroquinolones : toxicité tendineuse spécifique — contre-indiquées si tendinopathie.','AINS au long cours : risque rénal et cardiovasculaire.','Massage en phase aiguë inflammatoire : aggrave.'],
    regime:['Oméga-3 (anti-inflammatoires naturels).','Vitamine C 500mg : cofacteur de la synthèse du collagène tendineux.','Collagène hydrolysé + vitamine C : soutien tendineux prouvé.','Protéines suffisantes : reconstruction du tissu tendineux.'],
    signes_alerte:['Douleur intense soudaine avec claquement → rupture tendineuse → urgences.','Tendon d\'Achille : signe du Thompson négatif → rupture → urgences.','Fièvre + tendinite → médecin (tendinite septique).','Pas d\'amélioration après 6-8 semaines → médecin (échographie tendineuse).'],
    medecine_naturelle:{
      phytotherapie:['Harpagophytum : anti-inflammatoire tendineux.','Boswellia serrata : anti-inflammatoire chronique.','Curcuma + pipérine : module l\'inflammation tendineuse.'],
      aromatherapie:['HE Gaulthérie : anti-inflammatoire local — application diluée.','HE Hélichryse italienne : anti-hématome et anti-inflammatoire.','HE Camomille allemande : anti-inflammatoire puissant.'],
      homeopathie:['Ruta graveolens 9CH : tendinite, pathologie des tendons et ligaments.','Arnica 9CH : traumatisme aigu tendineux.','Apis mellifica 9CH : tendinite chaude, œdémateuse, soulagée par le froid.'],
      micronutrition:['Collagène marin hydrolysé 10g + vitamine C : reconstruction tendineuse.','Magnésium 300mg : décontracturant musculo-tendineux.','Vitamine C 500mg/jour : cofacteur indispensable synthèse collagène.']
    },
    medicaments_otc:['Diclofénac gel 1% (Voltarène®)','Ibuprofène 400mg (cure courte)','Paracétamol 1g (douleur)','Orthèse de repos'],
    vente_complementaire:[
      {produit:'Diclofénac gel 1% (Voltarène®)', raison:'Anti-inflammatoire local de référence'},
      {produit:'Poche de glace réutilisable', raison:'Cryothérapie locale phase aiguë'},
      {produit:'Collagène marin + vitamine C', raison:'Reconstruction tendineuse — cure de 3 mois'},
    ],
    sources:[{label:'HAS — Tendinopathies', url:'https://www.has-sante.fr'},{label:'SFR', url:'https://www.larhumato.fr'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },

  {
    id:34, slug:'entorse', nom:'Entorse de cheville', icone:'__SVG__entorse.svg__', categorie:'Rhumatologie / Traumatologie',
    saison:[1,2,3,4,5,6,7,8,9,10,11,12],
    conseils:['Protocole RICE (dans les 48h) : Rest, Ice (20 min / 2h), Compression, Elevation.','Mise en charge progressive dès que possible (J2-J3 pour entorse légère).','Rééducation proprioceptive avec kinésithérapeute (prévention récidive).','Strapping ou attelle semi-rigide si entorse grade 2-3.','Règle d\'Ottawa pour décider de faire ou non une radio.'],
    contre_indications:['Chaleur locale dans les 48 premières heures (aggrave l\'inflammation).','Massage en phase aiguë.','Immobilisation totale prolongée (perte de proprioception).','Marche sans protection si entorse sévère (grade 3).'],
    regime:['Ananas frais (bromélaïne) : anti-inflammatoire naturel.','Oméga-3 : réduction de l\'inflammation.','Protéines suffisantes : reconstruction ligamentaire.','Vitamine C : cofacteur de la synthèse du collagène.'],
    signes_alerte:['Douleur à la palpation de la base du 5e métatarse ou de la malléole → radio (Ottawa).','Impossibilité de mise en charge → radio.','Déformation du membre → fracture → urgences.','Pas d\'amélioration après 3 semaines → médecin (lésion ligamentaire complète ?).'],
    medecine_naturelle:{
      phytotherapie:['Arnica : anti-hématome, anti-inflammatoire — gel ou crème locale.','Hélichryse italienne : anti-hématome.','Bromélaïne (ananas) 500mg : anti-œdémateuse prouvée.'],
      aromatherapie:['HE Hélichryse italienne : anti-hématome, cicatrisante ligamentaire.','HE Gaulthérie : anti-inflammatoire local.','HE Lavandin : antalgique.'],
      homeopathie:['Arnica 9CH + Arnica crème : traumatisme aigu, hématome.','Ruta 9CH : lésion tendineuse et ligamentaire.','Bellis perennis 9CH : traumatisme profond des tissus mous.'],
      micronutrition:['Bromélaïne 500mg 3×/jour à distance des repas : anti-inflammatoire et anti-œdémateuse.','Vitamine C 1g : cofacteur réparation ligamentaire.','Collagène hydrolysé : reconstruction des ligaments.']
    },
    medicaments_otc:['Diclofénac gel 1% (Voltarène®)','Ibuprofène 400mg (cure courte)','Arnica gel/crème','Strapping / orthèse cheville'],
    vente_complementaire:[
      {produit:'Attelle semi-rigide de cheville', raison:'Protection et proprioception pendant la guérison'},
      {produit:'Arnica gel (Arnigel®)', raison:'Anti-hématome et anti-inflammatoire local'},
      {produit:'Poche de glace réutilisable', raison:'Cryothérapie phase aiguë — protocole RICE'},
    ],
    sources:[{label:'HAS — Entorse', url:'https://www.has-sante.fr'},{label:'SFR', url:'https://www.larhumato.fr'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },

  {
    id:35, slug:'osteoporose', nom:'Ostéoporose', icone:'__SVG__osteoporose.svg__', categorie:'Rhumatologie',
    saison:[1,2,3,4,5,6,7,8,9,10,11,12],
    conseils:['Calcium 1000-1200mg/jour + vitamine D 800-1000 UI/jour (traitement de base).','Activité physique en charge (marche, tai-chi) : indispensable pour la santé osseuse.','Prévention des chutes : barre d\'appui salle de bain, tapis antidérapants, lunettes adaptées.','Traitement anti-ostéoporotique (bisphosphonate) : prendre à jeun avec grand verre d\'eau, rester debout 30 min.','Ne jamais arrêter le traitement sans avis médical.'],
    contre_indications:['Bisphosphonates : contre-indiqués si insuffisance rénale sévère (DFG < 35).','Bisphosphonates : ne pas associer aux antiacides, fer, calcium (réduisent l\'absorption).','Bisphosphonate IV : risque d\'ostéonécrose de la mâchoire (soins dentaires avant).','Alcool > 2 verres/jour : toxique direct pour les ostéoblastes.'],
    regime:['Calcium alimentaire : fromages, yaourts, sardines avec arêtes, légumes verts.','Vitamine D : poissons gras, exposition solaire 15-20 min/jour (bras, visage).','Protéines suffisantes : indispensables à la matrice osseuse.','Éviter alcool (toxique osseux) et tabac (réduit la densité minérale osseuse).','Café en excès (> 4 tasses/jour) réduit légèrement l\'absorption du calcium.'],
    signes_alerte:['Toute douleur dorsale aiguë chez sujet ostéoporotique → radio (fracture vertébrale).','Douleur de hanche après chute minime → radio (fracture du col fémoral).','Tassement vertébral avec douleur neurologique → urgences.'],
    medecine_naturelle:{
      phytotherapie:['Ortie : riche en calcium, silicium et vitamine K2.','Prêle : reminéralisante (silice organique).','Luzerne (alfalfa) : source de vitamine K et minéraux osseux.'],
      aromatherapie:['HE Romarin : stimulerait les ostéoblastes selon certaines études préliminaires.'],
      homeopathie:['Calcarea carbonica 9CH : terrain ostéoporotique, sujets enrobés et frileux.','Calcarea phosphorica 9CH : enfants à croissance rapide et adultes en décalcification.'],
      micronutrition:['Calcium citrate ou malate 1000mg : mieux absorbé que le carbonate.','Vitamine D3 1000-2000 UI : indispensable à l\'absorption du calcium.','Vitamine K2 (MK-7) 100µg : dirige le calcium vers les os (pas les artères).','Magnésium 300mg : cofacteur de la fixation du calcium osseux.','Silicium organique 100mg : stimule les ostéoblastes.']
    },
    medicaments_otc:['Calcium 1000mg + Vit D 800 UI (Calcidose®, Calperos®)','Vitamine D3 100 000 UI (ampoule trimestrielle)'],
    vente_complementaire:[
      {produit:'Calcium + Vitamine D3 (Calcidose®)', raison:'Base du traitement — calcium 1000mg + vit D 800 UI'},
      {produit:'Vitamine K2 MK-7 100µg', raison:'Oriente le calcium vers les os — synergie vit D'},
      {produit:'Semelles amortissantes', raison:'Réduction de la charge sur les vertèbres'},
    ],
    sources:[{label:'HAS — Ostéoporose : méthodes diagnostiques et indications', url:'https://www.has-sante.fr/jcms/c_271924/fr/l-osteoporose-chez-les-femmes-menopausees-et-chez-les-sujets-traites-par-corticoides-methodes-diagnostiques-et-indications', date:'consulté 07/2026'},{label:'SFR — Recommandations', url:'https://www.larhumato.fr'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },

  // ══════════ NEUROLOGIE / PSYCHIATRIE ══════════
  {
    id:36, slug:'depression', nom:'Dépression', icone:'__SVG__la-depression.svg__', categorie:'Psychiatrie',
    saison:[1,2,3,4,5,6,7,8,9,10,11,12],
    conseils:['Traitement antidépresseur : efficacité à partir de 2-4 semaines — ne pas arrêter avant.','Jamais d\'arrêt brutal d\'un antidépresseur → risque de syndrome de sevrage.','Psychothérapie (TCC) en association médicament : efficacité supérieure à chaque approche seule.','Activité physique régulière : aussi efficace qu\'un antidépresseur dans les dépressions légères à modérées.','Maintenir le lien social même si difficile.'],
    contre_indications:['IMAO : nombreuses interactions alimentaires et médicamenteuses graves (fromages fermentés, vin rouge, sympathomimétiques).','ISRS + triptans : syndrome sérotoninergique possible.','ISRS + AINS/aspirine : risque hémorragique augmenté.','Ne jamais associer 2 antidépresseurs sans suivi médical.','Alcool : aggrave la dépression et interagit avec tous les antidépresseurs.'],
    regime:['Oméga-3 EPA/DHA : action antidépressive légère prouvée (EPA ++ ).','Tryptophane (précurseur sérotonine) : dinde, banane, chocolat noir, légumineuses.','Vitamine D : déficit corrélé à la dépression (vérifier dosage).','Éviter alcool (dépresseur du SNC).','Régularité des repas (glycémie stable → humeur stable).'],
    signes_alerte:['Idées suicidaires → SAMU 15 ou urgences psychiatriques.','Agitation intense ou désorientation → urgences.','Épisode maniaque (IDB) si bipolarité → médecin urgent.'],
    medecine_naturelle:{
      phytotherapie:['Millepertuis (Hypericum perforatum) : efficace dans la dépression légère à modérée — interactions +++ (CYP3A4, contraceptifs).','Safran 30mg/jour : effet antidépresseur prouvé dans les formes légères.'],
      aromatherapie:['HE Bergamote : antidépressive, anxiolytique — diffusion.','HE Ylang-ylang : tonique nerveux, euphorisante.','HE Petit grain bigarade : régulateur nerveux, antidépressif.'],
      homeopathie:['Ignatia amara 9CH : dépression réactionnelle post-choc émotionnel.','Aurum metallicum 9CH : dépression profonde avec sentiment d\'échec et d\'inutilité.','Natrum muriaticum 9CH : dépression avec repli sur soi, refus de consolation.'],
      micronutrition:['Oméga-3 EPA 1-2g/jour : action antidépressive prouvée.','Safran 30mg : plante médicinale avec essais cliniques positifs.','Vitamine D 1000-2000 UI si carence.','Magnésium 400mg : anxiolytique et antidépresseur naturel.']
    },
    medicaments_otc:['Millepertuis (Remotiv®, Prosoft®) — dépression légère UNIQUEMENT','Safran 30mg (Crocus Plus®)'],
    vente_complementaire:[
      {produit:'Lampe de luminothérapie 10 000 lux', raison:'Dépression saisonnière — traitement de 1ère ligne'},
      {produit:'Oméga-3 EPA concentré', raison:'Action antidépressive légère à modérée prouvée'},
      {produit:'Safran 30mg', raison:'Phytothérapie avec essais cliniques positifs'},
    ],
    sources:[{label:'HAS — Épisode dépressif caractérisé de l’adulte (1er recours)', url:'https://www.has-sante.fr/jcms/c_1739917/fr/episode-depressif-caracterise-de-l-adulte-prise-en-charge-en-premier-recours', date:'consulté 07/2026'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },

  {
    id:37, slug:'anxiete', nom:'Trouble anxieux', icone:'__SVG__anxiete.svg__', categorie:'Psychiatrie',
    saison:[1,2,3,4,5,6,7,8,9,10,11,12],
    conseils:['TCC (thérapie cognitive et comportementale) : traitement de 1ère ligne, plus efficace que les médicaments à long terme.','Cohérence cardiaque 3×5 min/jour : régulation du système nerveux autonome.','Activité physique régulière : réduit le taux de cortisol.','Limiter caféine, alcool, tabac (anxiogènes).','Benzodiazépines : max 12 semaines (dépendance).'],
    contre_indications:['Benzodiazépines au long cours : dépendance physique et psychologique, syndrome de sevrage.','Millepertuis + ISRS : syndrome sérotoninergique.','Alcool + anxiolytiques : potentialisation de la sédation (danger).','Conduire sous benzodiazépines : somnolence — danger.'],
    regime:['Magnésium 400mg : anxiolytique naturel démontré.','Éviter excès de caféine (anxiogène direct).','Alcool : anxiolytique à court terme mais rebond anxieux et dépendance.','Tryptophane (précurseur sérotonine) : légumes secs, dinde, banane.'],
    signes_alerte:['Attaque de panique avec douleur thoracique → éliminer SCA (SAMU 15).','Idées suicidaires → urgences psychiatriques.','Phobie sociale invalidante → psychiatre.','Anxiété associée à un trouble dépressif → médecin.'],
    medecine_naturelle:{
      phytotherapie:['Passiflore : anxiolytique sans sédation marquée — efficacité comparable au lorazépam dans certaines études.','Valériane : anxiolytique et sédatif léger.','Rhodiola rosea : adaptogène, gestion du stress chronique.'],
      aromatherapie:['HE Lavande vraie : anxiolytique de référence en aromathérapie.','HE Marjolaine à coquilles : parasympatholytique, apaisante.','HE Petit grain bigarade : régulateur système nerveux autonome.'],
      homeopathie:['Gelsemium sempervirens 9CH : anxiété anticipatoire (trac), tremblement.','Argentum nitricum 9CH : anxiété avec précipitation, diarrhée d\'anxiété.','Ignatia amara 9CH : anxiété réactionnelle post-stress émotionnel.'],
      micronutrition:['Magnésium bisglycinate 400mg : anxiolytique prouvé, améliore la tolérance au stress.','L-Théanine 200mg (thé vert) : anxiolytique sans sédation.','GABA 500mg : neurotransmetteur inhibiteur.','Ashwagandha 300mg : adaptogène, réduit le cortisol.']
    },
    medicaments_otc:['Passiflore (Euphytose®)','Valériane (Valdispert®)','Magnésium B6 (Magne B6®)'],
    vente_complementaire:[
      {produit:'Magne B6® ou magnésium bisglycinate', raison:'Anxiolytique naturel — cure de 3 mois'},
      {produit:'Passiflore + valériane (Euphytose®)', raison:'Phytothérapie anxiolytique — sans dépendance'},
      {produit:'Application cohérence cardiaque', raison:'Outil de gestion du stress prêt à l\'emploi'},
    ],
    sources:[{label:'HAS — Troubles anxieux', url:'https://www.has-sante.fr'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },

  {
    id:38, slug:'epilepsie', nom:'Épilepsie', icone:'__SVG__epilepsie.svg__', categorie:'Neurologie',
    saison:[1,2,3,4,5,6,7,8,9,10,11,12],
    conseils:['Traitement au long cours sans interruption — observance absolue.','Identifier et éviter les facteurs déclenchants (manque de sommeil, alcool, photosensibilité).','Porter un bracelet d\'identification médicale.','Ne jamais conduire si épilepsie non contrôlée (réglementation permis).','Formation de l\'entourage aux premiers secours lors d\'une crise.'],
    contre_indications:['Brusque arrêt du traitement → état de mal épileptique (urgence vitale).','Alcool : abaisse le seuil épileptogène.','Médicaments abaissant le seuil épileptique (tramadol, fluoroquinolones, bupropion).','Valproate : tératogène majeur — éviter absolument chez la femme en âge de procréer (programme ASMR).'],
    regime:['Régime cétogène : efficace dans certaines épilepsies pharmacorésistantes (sous supervision médicale).','Éviter alcool (abaisse le seuil épileptogène).','Sommeil régulier : la privation de sommeil est le déclencheur n°1.','Caféine avec prudence si épilepsie sensible.'],
    signes_alerte:['Crise de plus de 5 minutes → SAMU 15 (état de mal épileptique).','Plusieurs crises sans reprise de conscience → SAMU 15.','Crise chez femme enceinte → SAMU 15.','Traumatisme crânien lors d\'une chute → urgences.'],
    medecine_naturelle:{
      phytotherapie:['Nota : aucune plante médicinale ne remplace un antiépileptique.','Valériane : ne pas associer sans avis médical (potentialisation).'],
      aromatherapie:['Nota : certaines HE sont convulsivantes : camphre, eucalyptus globulus, fenouil — à éviter chez les épileptiques.'],
      homeopathie:['Cuprum metallicum 9CH : adjuvant des crampes et spasmes — sous avis médical.'],
      micronutrition:['Magnésium 300mg : déficit fréquent sous antiépileptiques, peut aider.','Vitamine D : déficit fréquent sous antiépileptiques inducteurs enzymatiques.','Folates : indispensables si valproate (antagoniste acide folique).']
    },
    medicaments_otc:['Diazépam rectal (Valium® rectiol) — prescription — pour crise prolongée','Midazolam buccal (Buccolam®) — prescription'],
    vente_complementaire:[
      {produit:'Bracelet d\'identification médicale', raison:'Identification lors d\'une crise — sécurité'},
      {produit:'Pilulier alarme programmable', raison:'Rappel prise médicament — observance critique'},
    ],
    sources:[{label:'HAS — Parcours de soins épilepsie', url:'https://www.has-sante.fr/jcms/p_3444925/fr/guides-du-parcours-de-sante-de-l-adulte-et-de-l-enfant-avec-epilepsie', date:'consulté 07/2026'},{label:'ANSM', url:'https://ansm.sante.fr'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },

  {
    id:39, slug:'parkinson', nom:'Maladie de Parkinson', icone:'__SVG__parkinson.svg__', categorie:'Neurologie',
    saison:[1,2,3,4,5,6,7,8,9,10,11,12],
    conseils:['Traitement dopaminergique : à prendre à heure fixe, respecter les intervalles.','Kinésithérapie régulière : maintien de la mobilité, prévention des chutes.','Orthophonie si troubles de la déglutition et de la voix.','Adaptation du domicile (barres d\'appui, tapis antidérapants, suppression des obstacles).','Soutien psychologique — impact sur la qualité de vie ++.'],
    contre_indications:['Métoclopramide et dompéridone : antagonistes dopaminergiques centraux — aggrave les symptômes.','Dompéridone : risque cardiaque chez le sujet âgé.','Antipsychotiques classiques : formellement contre-indiqués.','Protéines aux mêmes repas que la L-Dopa : compétition d\'absorption (adapter les repas).'],
    regime:['Protéines : déplacer les protéines au repas du soir (compétition avec L-Dopa sur l\'absorption intestinale).','Alimentation riche en fibres (constipation fréquente sous antiparkinsoniens).','Hydratation +++ (hypotension orthostatique fréquente).','Antioxydants : oméga-3, baies, légumes colorés.'],
    signes_alerte:['Blocage moteur (freezing) soudain → médecin (ajustement traitement).','Troubles sévères de la déglutition → médecin (risque de fausse route).','Hypotension orthostatique sévère (chutes) → médecin.','Hallucinations visuelles → médecin (complication ou médicaments).'],
    medecine_naturelle:{
      phytotherapie:['Mucuna pruriens : source naturelle de L-Dopa (ne pas associer sans avis médical).','Thé vert : neuroprotecteur potentiel.'],
      aromatherapie:['HE Lavande + HE Basilic : relaxation musculaire, réduction de la rigidité.'],
      homeopathie:['Gelsemium 9CH : tremblement de fond, anxiété.'],
      micronutrition:['CoQ10 1200mg/jour : neuroprotecteur mitochondrial (études en cours).','Magnésium 300mg : réduction des crampes musculaires.','Vitamine D 1000 UI : déficit fréquent, neuroprotecteur.']
    },
    medicaments_otc:['Aucun médicament OTC spécifique — traitement entièrement sur prescription'],
    vente_complementaire:[
      {produit:'Canne à pied tripode ou quadripode', raison:'Prévention des chutes (risque majeur)'},
      {produit:'Pilulier alarme programmable', raison:'Prises dopaminergiques à heure fixe — crucial'},
      {produit:'Ustensiles ergonomiques (cuillère lestée)', raison:'Autonomie repas malgré le tremblement'},
    ],
    sources:[{label:'HAS — Parkinson (parcours de soins)', url:'https://www.has-sante.fr/jcms/c_2906074/fr/maladie-de-parkinson-parcours-de-soins', date:'consulté 07/2026'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },

  {
    id:40, slug:'alzheimer', nom:'Maladie d\'Alzheimer', icone:'__SVG__puzzle.svg__', categorie:'Neurologie',
    saison:[1,2,3,4,5,6,7,8,9,10,11,12],
    conseils:['Stimulation cognitive quotidienne (lecture, jeux de mémoire, activités manuelles).','Maintien du lien social et des activités habituelles le plus longtemps possible.','Sécurisation du domicile (identification risques, surveillance médicaments).','Soutien des aidants (épuisement fréquent) — ressources APA, EHPAD.','Identifier et traiter les facteurs aggravants (douleur, infection, dépression).'],
    contre_indications:['Benzodiazépines : peuvent accélérer le déclin cognitif chez les sujets âgés.','Anticholinergiques : aggravent les troubles cognitifs (antihistaminiques H1, antispasmodiques).','Médicaments sédatifs multiples : risque de confusion accrue.','Neuroleptiques classiques : mortalité augmentée chez les patients Alzheimer.'],
    regime:['Régime méditerranéen : le mieux documenté pour la protection cérébrale.','Oméga-3 (huile de poisson, noix, lin) : neuroprotecteurs.','Hydratation ++ (confusion aggravée par la déshydratation).','Vitamines B6, B9, B12 : réduisent l\'homocystéine (facteur de risque cognitif).'],
    signes_alerte:['Syndrome confusionnel aigu (différent de la démence) → urgences (cause infectieuse ou médicamenteuse).','Fugues → dispositifs de sécurité à mettre en place rapidement.','Troubles sévères de la déglutition → médecin (nutrition entérale ?).','Violence ou agitation sévère → médecin (révision traitement).'],
    medecine_naturelle:{
      phytotherapie:['Ginkgo biloba 240mg/jour : améliore légèrement la cognition et le flux sanguin cérébral dans les stades précoces.','Bacopa monnieri : nootropique traditionnel.','Curcuma (curcumine) : propriétés neuroprotectrices et anti-amyloïdes en recherche.'],
      aromatherapie:['HE Romarin à cinéole : mémoire — inhaler avant exercices de mémoire.','HE Lavande : anxiolytique et sédatif — agitation nocturne.'],
      homeopathie:['Anacardium orientale 9CH : troubles de la mémoire, oubli des mots.','Baryta carbonica 9CH : déclin cognitif avec infantilisme et timidité.'],
      micronutrition:['Oméga-3 DHA 2g/jour : principal constituant des membranes neuronales.','Vitamines B6+B9+B12 : réduction homocystéine — ralentit l\'atrophie cérébrale.','Vitamine D 1000 UI : récepteurs cérébraux — neuroprotecteur.']
    },
    medicaments_otc:['Ginkgo biloba 240mg (EGb 761) — stades précoces uniquement'],
    vente_complementaire:[
      {produit:'Pilulier automatique à alarme', raison:'Sécurisation des prises médicamenteuses'},
      {produit:'Bracelet GPS de géolocalisation', raison:'Sécurité en cas de fugue'},
      {produit:'Journal de mémoire / agenda visuel', raison:'Outil de stimulation cognitive quotidienne'},
    ],
    sources:[{label:'HAS — Alzheimer (parcours de soins)', url:'https://www.has-sante.fr/jcms/p_3058411/fr/maladie-d-alzheimer', date:'consulté 07/2026'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },

  // ══════════ UROLOGIE / GYNÉCOLOGIE ══════════
  {
    id:41, slug:'cystite', nom:'Cystite / Infection urinaire', icone:'__SVG__cystite-infection urinaire.svg__', categorie:'Urologie',
    saison:[1,2,3,4,5,6,7,8,9,10,11,12],
    conseils:['Test urinaire rapide (bandelette) en officine pour confirmer avant tout antibiotique.','Hydratation abondante (2-3L/jour) pour diluer et évacuer les bactéries.','Uriner après les rapports sexuels (prévention).','Hygiène périnéale d\'avant en arrière.','Ne jamais se retenir d\'uriner.'],
    contre_indications:['Antibiotiques sans bandelette positive : résistances croissantes.','Antibiotiques urinaires chez la femme enceinte : fosfomycine, nitrofurantoïne — adapter selon antibiogramme.','AINS : peu efficaces seuls sur l\'infection (mais peuvent soulager symptômes courts).','Fluoroquinolones réservées aux formes compliquées (résistances ++).'],
    regime:['Jus de canneberge (cranberry) ou PAC 36mg/jour : prévention des récidives (adhérence des bactéries réduite).','Hydratation 2-3L/jour : dilution et élimination des germes.','Alimentation alcalinisante (légumes verts) : urine moins favorable aux bactéries.','Éviter café et alcool (irritants vésicaux en phase aiguë).'],
    signes_alerte:['Fièvre > 38°C + frissons + douleur lombaire → pyélonéphrite → médecin urgent.','Cystite chez l\'homme → médecin (toujours complication sous-jacente possible).','Cystite pendant la grossesse → médecin obligatoire.','Hématurie macroscopique isolée → médecin (tumeur vésicale ?).'],
    medecine_naturelle:{
      phytotherapie:['Canneberge (cranberry) PAC 36mg : prévention des récidives (prouvé chez la femme).','Bruyère + busserole (arctostaphylos) : antiseptiques urinaires naturels.','Piloselle + ortie : diurétiques, favorisent l\'élimination bactérienne.'],
      aromatherapie:['HE Tea tree : antibactérien (voie orale gélules sous prescription).','HE Santal blanc : antiseptique urinaire traditionnel.'],
      homeopathie:['Cantharis 9CH : cystite avec brûlures intenses, envie urgente et fréquente.','Staphysagria 9CH : cystite post-coïtale.','Mercurius corrosivus 9CH : cystite avec ténesme intense et brûlures à l\'urine.'],
      micronutrition:['PAC de cranberry 36mg/jour : prévention récidives — cure de 3 mois.','Vitamine C 500mg : acidifie les urines et inhibe les bactéries.','D-mannose 2g/jour : anti-adhésif pour E. coli (prouvé).']
    },
    medicaments_otc:['Bandelette urinaire (diagnostic)','Fosfomycine 3g (Monuril®) — sur prescription','Phytothérapie canneberge (Cys-Control®)','D-mannose (Manucran®)'],
    vente_complementaire:[
      {produit:'Bandelette urinaire (Siemens Combur®)', raison:'Diagnostic rapide en officine — avant antibiotique'},
      {produit:'D-mannose 2g (Manucran®)', raison:'Alternative naturelle E. coli — efficacité prouvée'},
      {produit:'Canneberge PAC 36mg (Cys-Control®)', raison:'Prévention des récidives — cure de 3 mois'},
    ],
    sources:[{label:'HAS — Antibiothérapie : cystite aiguë simple de la femme', url:'https://www.has-sante.fr/jcms/c_2722827/fr/choix-et-durees-d-antibiotherapies-cystite-aigue-simple-a-risque-de-complication-ou-recidivante-de-la-femme', date:'MàJ 05/2025 · consulté 07/2026'},{label:'ANSM', url:'https://ansm.sante.fr'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },

  {
    id:42, slug:'hbp-prostate', nom:'HBP (Hypertrophie bénigne de la prostate)', icone:'__SVG__prostate.svg__', categorie:'Urologie',
    saison:[1,2,3,4,5,6,7,8,9,10,11,12],
    conseils:['Éviter les décongestionnants nasaux (pseudoéphédrine) et les anticholinergiques (rétention urinaire).','Réduire les apports hydriques le soir (limiter les nycturie).','Éviter alcool, café, épices (irritants vésicaux).','Vidange vésicale complète (double miction : uriner 2 fois à quelques minutes d\'intervalle).','Activité physique régulière.'],
    contre_indications:['Décongestionnants vasoconstricteurs (alpha-adrénergiques) : rétention urinaire aiguë.','Anticholinergiques (certains antidépresseurs TCA, antihistaminiques H1) : rétention urinaire.','Alpha-bloquants + inhibiteurs PDE5 (sildénafil) : hypotension sévère.','Bêta-bloquants dans certains cas : aggravent les troubles mictionnels.'],
    regime:['Réduire les liquides après 18h (moins de nycturie).','Éviter alcool et café le soir (effets diurétiques et irritants).','Tomates cuites (lycopène) : protège la prostate selon certaines études.','Graines de courge : phytostérols utiles dans l\'HBP.'],
    signes_alerte:['Rétention urinaire aiguë (impossibilité d\'uriner) → urgences (sondage).','Hématurie macroscopique → médecin (cancer prostate ou rein ?).','Infection urinaire récidivante chez l\'homme → médecin.','Score IPSS > 20 → urologie.'],
    medecine_naturelle:{
      phytotherapie:['Serenoa repens (Saw Palmetto) 320mg : réduit les symptômes urinaires de l\'HBP (niveau de preuve modéré).','Pygeum africanum : anti-prolifératif sur la prostate.','Graines de courge (extrait) : phytostérols soulageant les symptômes.'],
      aromatherapie:['HE Cyprès : veinotrope et soutien prostatique.'],
      homeopathie:['Sabal serrulata 9CH : HBP avec dysurie, pollakiurie.','Conium maculatum 9CH : HBP chez homme âgé.'],
      micronutrition:['Zinc 30mg/jour : concentration élevée dans la prostate, rôle anti-prolifératif.','Lycopène 10mg/jour : antioxydant protecteur prostatique.','Serenoa repens 320mg : traitement phytothérapique de référence.']
    },
    medicaments_otc:['Serenoa repens (Permixon® — sur prescription en France)','Graines de courge (Pépicure®)','Zinc 30mg'],
    vente_complementaire:[
      {produit:'Graines de courge extrait (Pépicure®)', raison:'Phytostérols — réduction symptômes urinaires'},
      {produit:'Zinc 30mg', raison:'Soutien de la santé prostatique'},
      {produit:'Lycopène 10mg', raison:'Antioxydant protecteur prostatique'},
    ],
    sources:[{label:'HAS — HBP', url:'https://www.has-sante.fr'},{label:'AFU — Association Française d\'Urologie', url:'https://www.urofrance.org'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },

  {
    id:43, slug:'endometriose', nom:'Endométriose', icone:'__SVG__endometriose.svg__', categorie:'Gynécologie',
    saison:[1,2,3,4,5,6,7,8,9,10,11,12],
    conseils:['Antalgiques dès le début des douleurs (ne pas attendre).','Contraception hormonale continue (sans règles) réduit les douleurs.','Chaleur locale abdominale très efficace sur les crampes endométriosiques.','Alimentation anti-inflammatoire documentée : améliore les symptômes.','Soutien psychologique : maladie chronique avec impact sur la fertilité.'],
    contre_indications:['AINS si souhait de grossesse à court terme (réduisent l\'ovulation).','Progestérone : contre-indiquée si antécédent de dépression (certaines patientes).','Agonistes GnRH au long cours sans add-back therapy : ostéoporose.'],
    regime:['Anti-inflammatoire : oméga-3, curcuma, gingembre, fruits et légumes colorés.','Éviter gluten et produits laitiers : réduisent les symptômes chez certaines patientes (à tester individuellement).','Éviter alcool et café (pro-inflammatoires).','Sucres raffinés et viandes rouges : augmentent l\'inflammation systémique.'],
    signes_alerte:['Douleurs pelviennes sévères non soulagées → médecin.','Dyspareunie profonde persistante → bilan gynécologique.','Infertilité → bilan de fertilité.','Occlusion intestinale (endométriose digestive) → urgences.'],
    medecine_naturelle:{
      phytotherapie:['Vitex agnus-castus : régule le cycle hormonal.','Curcuma : anti-inflammatoire, réduit la douleur.','Framboisier (feuilles) : antispasmodique utérin.'],
      aromatherapie:['HE Clary sage (sauge sclarée) : oestrogen-like, régule les hormones.','HE Lavande + HE Basilic : antispasmodiques utérins.'],
      homeopathie:['Dysménorrhée 7CH (complexe) : douleurs menstruelles.','Magnesia phosphorica 9CH : crampes utérines soulagées par la chaleur et la pression.'],
      micronutrition:['Oméga-3 EPA/DHA 2g/jour : anti-inflammatoire majeur prouvé dans l\'endométriose.','Vitamine D 1000-2000 UI : immunomodulatrice, réduit l\'inflammation endométriale.','N-acétylcystéine 600mg 3×/j : antioxydant, réduit les lésions endométriosiques selon études.','Magnésium 300mg : antispasmodique utérin.']
    },
    medicaments_otc:['Ibuprofène 400mg (douleurs)','Paracétamol 1g (douleurs)','Bouillotte électrique (chaleur locale)'],
    vente_complementaire:[
      {produit:'Bouillotte électrique', raison:'Chaleur locale très efficace sur les crampes endométriosiques'},
      {produit:'Oméga-3 EPA/DHA concentré', raison:'Anti-inflammatoire prouvé — réduction des douleurs'},
      {produit:'Magnésium bisglycinate 300mg', raison:'Antispasmodique utérin naturel'},
    ],
    sources:[{label:'HAS — Prise en charge de l’endométriose', url:'https://www.has-sante.fr/jcms/c_2819733/fr/prise-en-charge-de-l-endometriose', date:'consulté 07/2026'},{label:'CNGOF', url:'https://cngof.fr'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },

  {
    id:44, slug:'spm', nom:'Syndrome prémenstruel (SPM)', icone:'__SVG__cystite-infection urinaire.svg__', categorie:'Gynécologie',
    saison:[1,2,3,4,5,6,7,8,9,10,11,12],
    conseils:['Régularité du sommeil et de l\'activité physique (réduit les symptômes de 50%).','Tenir un journal des symptômes sur 2-3 cycles pour identifier le schéma.','Techniques de relaxation, yoga, méditation.','Réduire sel (rétention eau), alcool et café dans les 10 jours avant les règles.','Antalgiques dès les premiers signes.'],
    contre_indications:['Diurétiques non prescrits : risque d\'hypokaliémie.','Alcool : aggrave les symptômes psychologiques du SPM.','AINS si souhait de grossesse.'],
    regime:['Réduire sel (rétention hydrique), alcool, café, sucres raffinés, chocolat dans la phase lutéale.','Augmenter calcium (1000mg/jour) : réduit les douleurs et l\'humeur.','Vitamine D : déficit corrélé à un SPM plus sévère.','Magnésium 300mg : réduit la rétention d\'eau, les céphalées et les changements d\'humeur.'],
    signes_alerte:['Symptômes très invalidants (TDPM = trouble dysphorique prémenstruel) → psychiatre.','Dépression ou idées suicidaires dans la phase lutéale → médecin urgent.','Règles abondantes + SPM → gynécologue (endométriose, fibromes).'],
    medecine_naturelle:{
      phytotherapie:['Vitex agnus-castus (gattilier) 40mg : réduit les symptômes du SPM (prouvé, efficacité maximale après 3 cycles).','Curcuma : anti-inflammatoire, réduit la dysménorrhée.','Onagre (huile d\'évening primrose) : réduit la mastodynie.'],
      aromatherapie:['HE Clary sage (sauge sclarée) : régule les hormones, œstrogen-like.','HE Géranium rosat : équilibre hormonal, gestion des émotions.','HE Lavande : anxiolytique, gestion de l\'irritabilité.'],
      homeopathie:['Folliculinum 9CH : syndrome prémenstruel global, régulation hormonale.','Pulsatilla 9CH : humeur changeante, larmes faciles, amélioration à l\'air frais.','Sepia 9CH : SPM avec irritabilité, indifférence, fatigue profonde.'],
      micronutrition:['Magnésium bisglycinate 300mg : réduit douleurs, rétention eau et humeur.','Vitamine B6 50-100mg : syndrome prémenstruel, prouvé.','Calcium 1000mg/jour : réduit les douleurs et symptômes psychologiques.','Vitex agnus-castus 40mg : meilleure plante SPM — résultats après 3 cycles.']
    },
    medicaments_otc:['Ibuprofène 400mg (crampes)','Paracétamol 1g','Vitex agnus-castus (Agnus Castus Boiron)','Huile d\'onagre (mastodynie)'],
    vente_complementaire:[
      {produit:'Vitex agnus-castus (Agnus castus®)', raison:'Phytothérapie SPM de référence — efficacité après 3 cycles'},
      {produit:'Magnésium bisglycinate 300mg', raison:'Rétention eau, céphalées, humeur — prendre J16 à J28'},
      {produit:'Huile d\'onagre (Evening primrose)', raison:'Réduit la mastodynie prémenstruelle'},
    ],
    sources:[{label:'HAS — SPM', url:'https://www.has-sante.fr'},{label:'CNGOF', url:'https://cngof.fr'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },

  // ══════════ PÉDIATRIE ══════════
  {
    id:45, slug:'bronchiolite', nom:'Bronchiolite (nourrisson)', icone:'__SVG__bronchite aigue.svg__', categorie:'Pédiatrie',
    saison:[10,11,12,1,2],
    conseils:['Désobstruction rhinopharyngée (DRP) au sérum physiologique avant chaque repas et au coucher.','Position demi-assise pour faciliter la respiration.','Fractionner les repas (volume réduit, fréquence augmentée).','Surveiller la fréquence respiratoire (normale < 60/min chez nourrisson).','Éviter la fumée de tabac dans l\'environnement du nourrisson.'],
    contre_indications:['Antitussifs : formellement contre-indiqués chez le nourrisson.','Décongestionnants nasaux systémiques : contre-indiqués < 15 ans.','Bronchodilatateurs (salbutamol) : pas prouvés dans la bronchiolite (pas de recommandation en France).','Antibiotiques : inutiles (viral dans > 95% des cas).','Corticoïdes : non recommandés dans la bronchiolite aiguë.'],
    regime:['Fractionner les biberons (volume réduit, plus fréquents).','Hydrater par petites quantités fréquentes.','Ne pas forcer l\'alimentation si difficultés respiratoires (risque d\'inhalation).'],
    signes_alerte:['FR > 60/min au repos → urgences.','Tirage intercostal, battement des ailes du nez → urgences.','Cyanose des lèvres → SAMU 15.','Nourrisson < 6 semaines ou prématuré → urgences au moindre signe.','Apnées → SAMU 15.'],
    medecine_naturelle:{
      phytotherapie:['Aucune phytothérapie recommandée chez le nourrisson en bronchiolite.'],
      aromatherapie:['ATTENTION : aucune HE chez nourrisson < 3 mois. Eucalyptus : contre-indiqué < 6 ans.'],
      homeopathie:['Antimonium tartaricum 9CH : bronchiolite avec rattles, mucus abondant.','Ipeca 9CH : bronchiolite avec nausées et encombrement.'],
      micronutrition:['Vitamine D (déjà prescrite chez nourrisson) : soutien immunitaire.']
    },
    medicaments_otc:['NaCl 0,9% (Physiomer® nourrisson, Sérum physiologique) — DRP','Montre Oxymètre nourrisson (surveillance SpO2 si prescription)'],
    vente_complementaire:[
      {produit:'Sérum physiologique unidoses nourrisson', raison:'DRP — désobstruction nasale 6× par jour'},
      {produit:'Aspirateur nasal électrique (Nosiboo®)', raison:'DRP efficace — mieux que l\'aspirateur buccal'},
    ],
    sources:[{label:'HAS — Bronchiolite aiguë du nourrisson (<12 mois)', url:'https://www.has-sante.fr/jcms/p_3118113/fr/prise-en-charge-du-1er-episode-de-bronchiolite-aigue-chez-le-nourrisson-de-moins-de-12-mois', date:'RBP 11/2019 · consulté 07/2026'},{label:'SFP', url:'https://www.sfpediatrie.com'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },

  {
    id:46, slug:'otite', nom:'Otite moyenne aiguë', icone:'__SVG__otite.svg__', categorie:'Pédiatrie / ORL',
    saison:[10,11,12,1,2,3],
    conseils:['Antalgiques systématiques (paracétamol en 1ère intention) pour les douleurs.','Désobstruction nasale (DRP) au sérum physiologique.','Antibiotiques : pas systématiques (attente possible 48-72h chez > 2 ans si forme légère).','Consultation médicale obligatoire pour confirmation du diagnostic (otoscope).','Éviter de mettre de l\'eau dans l\'oreille si otorrhée.'],
    contre_indications:['Aspirine chez l\'enfant < 12 ans : risque de syndrome de Reye.','Automédication antibiotique sans prescription.','Anesthésiants locaux intra-auriculaires : peuvent masquer une perforation.','Codéine : contre-indiquée < 12 ans.'],
    regime:['Position tête surélevée : réduit la pression dans l\'oreille.','Mouchage doux (pas de force) pour évacuer les sécrétions.'],
    signes_alerte:['Fièvre > 39°C persistante > 48h sous antibiotique → médecin.','Rougeur et œdème derrière l\'oreille (mastoïdite) → urgences.','Paralysie faciale → urgences.','Céphalées intenses + raideur nuque → urgences (méningite).'],
    medecine_naturelle:{
      phytotherapie:['Echinacea : immunostimulant pour réduire la fréquence des récidives.','Propolis : immunostimulant en prévention.'],
      aromatherapie:['HE Tea tree + HE Lavande autour de l\'oreille (pas dans le conduit) : antiseptique local.'],
      homeopathie:['Capsicum 9CH : otite avec douleur pulsatile, aggravée par le froid.','Chamomilla 9CH : otite très douloureuse, enfant très agité et inconsolable.','Belladonna 9CH : otite avec début brutal, fièvre, joue rouge du côté atteint.'],
      micronutrition:['Zinc 10mg/jour : réduction du risque d\'infections récidivantes.','Vitamine D : renforcement de l\'immunité.','Probiotiques : réduction des otites à répétition (données préliminaires).']
    },
    medicaments_otc:['Paracétamol (en mg/kg selon poids)','Ibuprofène (> 3 mois)','NaCl 0,9% (DRP)'],
    vente_complementaire:[
      {produit:'Paracétamol en suspension buvable adapté au poids', raison:'Antalgie de 1ère intention'},
      {produit:'Sérum physiologique nourrisson', raison:'DRP — désobstruction rhinopharyngée'},
    ],
    sources:[{label:'HAS — Otite moyenne aiguë purulente de l\'enfant', url:'https://www.has-sante.fr/jcms/c_2722749/fr/choix-et-durees-d-antibiotherapies-otite-moyenne-aigue-purulente-de-l-enfant', date:'MàJ 05/2025 · consulté 07/2026'},{label:'HAS — Otite moyenne aiguë purulente de l\'adulte', url:'https://www.has-sante.fr/jcms/c_2722670/fr/choix-et-durees-d-antibiotherapies-otite-moyenne-aigue-purulente-de-l-adulte', date:'MàJ 05/2025 · consulté 07/2026'},{label:'SFP', url:'https://www.sfpediatrie.com'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },

  {
    id:47, slug:'fievre-enfant', nom:'Fièvre de l\'enfant', icone:'__SVG__fievre de l enfant.svg__', categorie:'Pédiatrie',
    saison:[10,11,12,1,2,3],
    conseils:['Température axillaire + 0,5°C = température centrale. Rectale = référence.','Traitement antipyrétique si fièvre > 38,5°C ET inconfort de l\'enfant (pas systématique si l\'enfant joue).','Déshabiller l\'enfant, maintenir la chambre à 18-20°C.','Hydrater régulièrement (boissons fraîches).','Jamais d\'alternance paracétamol/ibuprofène systématique (non recommandé en routine).'],
    contre_indications:['Aspirine < 15 ans : syndrome de Reye (encéphalopathie hépatique).','Ibuprofène < 3 mois et déshydratation (risque rénal).','Enveloppements humides froids : risque de vasoconstriction et de frissons.','Ne jamais dépasser les doses de paracétamol (15 mg/kg/prise, max 60 mg/kg/jour).'],
    regime:['Hydratation ++: eau, bouillons, jus de fruits dilués.','Alimentation légère si appétit réduit — ne pas forcer.','Glaces/sorbets : refroidissent et hydratent.'],
    signes_alerte:['Nourrisson < 3 mois : toute fièvre → urgences pédiatriques.','Fièvre > 40°C sans cause évidente → médecin.','Convulsions fébriles → SAMU 15.','Signes méningés (raideur nuque, photophobie) → SAMU 15.','Purpura (taches rouges ne s\'effaçant pas à la pression) → SAMU 15.'],
    medecine_naturelle:{
      phytotherapie:['Attention : peu de plantes appropriées chez l\'enfant fébrile.','Sureau (fleurs) : diaphorétique doux — enfant > 6 ans.'],
      aromatherapie:['ATTENTION : pas d\'HE eucalyptus, menthe, thym, romarin < 6 ans (toxiques).','HE Lavande vraie : apaisante, quelques gouttes sur l\'oreiller > 3 mois.'],
      homeopathie:['Belladonna 9CH : fièvre avec début brutal, visage rouge, peau sèche et brûlante.','Ferrum phosphoricum 9CH : fièvre modérée, patient peu perturbé.','Gelsemium 9CH : fièvre avec frissons, courbatures, abattement.'],
      micronutrition:['Vitamine C : soutien immunitaire pendant l\'infection.','Zinc : réduit la durée et la sévérité des infections virales.']
    },
    medicaments_otc:['Paracétamol suspension buvable (adapté au poids)','Ibuprofène suspension (> 3 mois)','Thermomètre électronique'],
    vente_complementaire:[
      {produit:'Thermomètre frontal ou auriculaire', raison:'Prise de température rapide et sans contact'},
      {produit:'Paracétamol suspension buvable (Doliprane®, Efferalgan®)', raison:'Adapté au poids — dose précise'},
    ],
    sources:[{label:'HAS — Fièvre enfant', url:'https://www.has-sante.fr'},{label:'SFP', url:'https://www.sfpediatrie.com'},{label:'Vidal — Fièvre', url:'https://www.vidal.fr'}]
  },

  // ══════════ INFECTIOLOGIE ══════════
  {
    id:49, slug:'grippe', nom:'Grippe', icone:'__SVG__virus.svg__', categorie:'Infectiologie',
    saison:[10,11,12,1,2,3],
    conseils:['Repos au lit strict les premiers jours.','Hydratation abondante (fièvre = perte hydrique importante).','Traitement symptomatique : paracétamol, ibuprofène (adulte).','Vaccination antigrippale annuelle : recommandée personnes à risque.','Masque chirurgical si contact avec personnes fragiles.'],
    contre_indications:['Aspirine : contre-indiquée < 15 ans (syndrome de Reye).','Antibiotiques : inutiles sur la grippe virale (sauf surinfection bactérienne).','Antitussifs codéinés : contre-indiqués < 12 ans et femme allaitante.','Ibuprofène si terrain à risque rénal ou GI.'],
    regime:['Bouillons chauds, tisanes (hydratation + confort).','Alimentation légère si anorexie fébrile.','Éviter alcool (immunosuppresseur et aggrave la déshydratation).','Miel et citron : antitussifs et réconfortants.'],
    signes_alerte:['Dyspnée au repos → urgences (pneumonie grippale).','Fièvre > 40°C persistante > 3 jours → médecin.','Confusion ou perte de conscience → SAMU 15.','Signes de déshydratation sévère → urgences.','Sujet à risque (> 65 ans, immunodéprimé, femme enceinte) : consultation médicale précoce.'],
    medecine_naturelle:{
      phytotherapie:['Echinacea : immunostimulant, réduit la durée et la sévérité si pris au début.','Sureau noir (Sambucus nigra) : antiviral direct contre influenza A et B (prouvé).','Astragale : immunomodulant en prévention.'],
      aromatherapie:['HE Ravintsara : antivirale de référence — inhalation ou massage thoracique dilué.','HE Tea tree : immunostimulant.','HE Eucalyptus radiata : décongestionnant et antiviral.'],
      homeopathie:['Influenzinum 9CH : prévention homéopathique annuelle.','Oscillococcinum® : efficacité limitée mais très bien tolérée.','Gelsemium 9CH : grippe avec abattement, courbatures, frissons.','Eupatorium perfoliatum 9CH : courbatures intenses (comme si les os cassaient).'],
      micronutrition:['Vitamine D 2000 UI : réduction du risque de complications.','Vitamine C 1g/jour : réduction de la durée.','Zinc 15mg : antibactérien et antiviral.','Sureau noir extrait : antiviral prouvé — 4 jours dès les premiers symptômes.']
    },
    medicaments_otc:['Paracétamol 1g','Ibuprofène 400mg (adulte)','Sureau noir (Sambucol®)','Echinacea (Echinacée Boiron®)'],
    vente_complementaire:[
      {produit:'Sambucol® (sureau noir)', raison:'Antiviral naturel prouvé contre influenza A et B'},
      {produit:'Masques chirurgicaux', raison:'Protection de l\'entourage fragile'},
      {produit:'Humidificateur d\'air', raison:'Confort respiratoire et hydratation des muqueuses'},
    ],
    sources:[{label:'HAS — Grippe', url:'https://www.has-sante.fr'},{label:'Santé Publique France', url:'https://www.santepubliquefrance.fr'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },

  {
    id:50, slug:'covid', nom:'COVID-19', icone:'__SVG__virus.svg__', categorie:'Infectiologie',
    saison:[1,2,3,4,5,6,7,8,9,10,11,12],
    conseils:['Isolement 5 jours ou port du masque FFP2 si sortie indispensable.','Test antigénique ou PCR pour confirmer le diagnostic.','Traitement symptomatique : paracétamol en 1ère intention.','Surveillance de la SpO2 à domicile avec oxymètre.','Patients à risque de forme grave (> 65 ans, immunodéprimés, comorbidités) → médecin dès J1.'],
    contre_indications:['Ibuprofène et AINS : déconseillés dans les premières heures (données discutées — préférer paracétamol).','Automédication anticoagulants : risque hémorragique.','Antitussifs : déconseillés si toux productive (retient les sécrétions).','Corticoïdes sans prescription : contre-indiqués dans les formes légères (risques).'],
    regime:['Hydratation ++ (fièvre, toux = perte hydrique).','Alimentation équilibrée pour soutenir l\'immunité.','Vitamine D si carence (réduction du risque de forme sévère).','Zinc + vitamine C : soutien immunitaire.'],
    signes_alerte:['SpO2 < 94% → médecin urgent.','SpO2 < 90% → SAMU 15.','Dyspnée au moindre effort → médecin urgent.','Douleur thoracique, confusion → SAMU 15.','COVID long (symptômes > 4 semaines) → consultation spécialisée.'],
    medecine_naturelle:{
      phytotherapie:['Sureau noir : antiviral et immunostimulant.','Echinacea : immunostimulant en prévention et en début d\'infection.','Andrographis : anti-inflammatoire et antiviral.'],
      aromatherapie:['HE Ravintsara : antivirale — inhalation.','HE Eucalyptus radiata : décongestionnant.','HE Tea tree : immunostimulant.'],
      homeopathie:['Bryonia 9CH : COVID avec toux sèche, fatigue, aggravé par le mouvement.','Gelsemium 9CH : forme grippale avec abattement et courbatures.'],
      micronutrition:['Vitamine D 2000-4000 UI/jour : immunomodulatrice, réduit les formes sévères.','Vitamine C 1-2g/jour : antioxydante et immunostimulante.','Zinc 30mg/jour : antiviral et cicatrisant muqueux.','NAC 600mg : fluidifiant bronchique et antioxydant.']
    },
    medicaments_otc:['Paracétamol 1g (fièvre/douleurs)','Oxymètre de pouls (surveillance SpO2)','Test antigénique COVID','Zinc + Vitamine D + C'],
    vente_complementaire:[
      {produit:'Oxymètre de pouls', raison:'Surveillance SpO2 — alerte précoce forme grave'},
      {produit:'Tests antigéniques COVID (autotests)', raison:'Diagnostic rapide à domicile'},
      {produit:'Masques FFP2', raison:'Protection renforcée si isolement impossible'},
    ],
    sources:[{label:'HAS — COVID-19', url:'https://www.has-sante.fr'},{label:'Santé Publique France', url:'https://www.santepubliquefrance.fr'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },

  {
    id:51, slug:'herpes-labial', nom:'Herpès labial', icone:'__SVG__herpes.svg__', categorie:'Infectiologie',
    saison:[1,2,3,4,5,6,7,8,9,10,11,12],
    conseils:['Traitement antiviral à débuter dès les premiers prodromes (fourmillements, brûlures).','Ne pas toucher les lésions puis les yeux (risque de kératite herpétique).','Laver les mains après contact avec les lésions.','Ne pas embrasser nourrissons et personnes immunodéprimées en poussée.','Stick solaire SPF 50+ sur les lèvres en été (UV déclenchants).'],
    contre_indications:['Corticoïdes locaux : aggravent et disséminent le virus.','Partager les ustensiles (verres, couverts) en phase active.','Aciclovir crème appliqué tardivement (lésion formée) : efficacité réduite.','Antiviraux systémiques : sur prescription seulement (aciclovir, valaciclovir).'],
    regime:['Éviter aliments riches en arginine (favorise le VHS) : chocolat, noix, arachides.','Augmenter l-lysine (inhibe la réplication virale) : poisson, volaille, produits laitiers.','Vitamine C et zinc : soutien immunitaire.'],
    signes_alerte:['Extension vers l\'œil (kératite herpétique) → urgences ophtalmologiques.','Herpès disséminé (nourrisson, immunodéprimé) → SAMU 15.','Herpès chez femme enceinte → médecin urgent.','Récidives > 6 épisodes/an → traitement préventif (valaciclovir).'],
    medecine_naturelle:{
      phytotherapie:['Mélisse (Melissa officinalis) crème : antivirale locale prouvée sur HSV-1.','Propolis crème : antibacterien et antiviral local.','Extrait de pépins de pamplemousse : antiseptique local.'],
      aromatherapie:['HE Tea tree pure : antivirale locale — 1 goutte sur la lésion 3×/jour.','HE Hélichryse italienne : cicatrisante et antivirale.'],
      homeopathie:['Rhus toxicodendron 9CH : herpès vésiculeux avec prurit intense, aggravé par le froid.','Natrum muriaticum 9CH : herpès labial récidivant au soleil, terrain déprimé.'],
      micronutrition:['L-lysine 500-1000mg : inhibe la réplication virale, réduit la fréquence des récidives.','Zinc 15mg : antiviral, accélère la guérison.','Vitamine C 1g : soutien immunitaire.']
    },
    medicaments_otc:['Aciclovir crème 5% (Zovirax® crème)','Penciclovir crème (Vectavir®)','Mélisse crème (Lomaherpan®)'],
    vente_complementaire:[
      {produit:'Aciclovir crème 5% (Zovirax®)', raison:'Antiviral de référence — dès les prodromes'},
      {produit:'Stick lèvres SPF 50+', raison:'Prévention déclenchement par UV'},
      {produit:'L-lysine 500mg', raison:'Prévention des récidives — cure de 6 mois'},
    ],
    sources:[{label:'HAS — Herpès', url:'https://www.has-sante.fr'},{label:'SFD', url:'https://www.sfdermato.org'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },

  {
    id:52, slug:'mycose-vaginale', nom:'Mycose vaginale (candidose)', icone:'__SVG__cystite-infection urinaire.svg__', categorie:'Urologie / Gynécologie',
    saison:[1,2,3,4,5,6,7,8,9,10,11,12],
    conseils:['Traitement local antifongique (ovule ou crème) en 1ère intention.','Traitement systémique (fluconazole) si forme sévère ou récidivante.','Traiter le partenaire si récidives fréquentes.','Hygiène locale avec savon à pH acide (Saforelle®, Gynofemina®).','Sécher soigneusement la zone après la toilette.'],
    contre_indications:['Ovules pendant la grossesse : utiliser uniquement les formes autorisées (éconazole, clotrimazole).','Douches vaginales : détruisent la flore vaginale protectrice — formellement déconseillées.','Strings et vêtements serrés synthétiques : favorisent la macération.','Antibiotiques sans protection probiotique : détruisent Lactobacillus (facteur déclenchant).'],
    regime:['Éviter sucres raffinés et alcool (nourrissent Candida).','Probiotiques (Lactobacillus acidophilus et rhamnosus) : restaurent la flore vaginale.','Yaourts probiotiques : soutien de la flore vaginale.','Ail : antifongique naturel par voie orale.'],
    signes_alerte:['Candidose récidivante (> 4 épisodes/an) → dépistage diabète, VIH.','Leucorrhées malodorantes (vaginose bactérienne vs candidose) → médecin (diagnostic différentiel).','Candidose chez femme enceinte → médecin.','Extension cutanée ou systémique chez immunodéprimé → urgences.'],
    medecine_naturelle:{
      phytotherapie:['Ail (allicine) : antifongique puissant par voie orale.','Canneberge : prévention des infections urogénitales récidivantes.','Calendula : anti-inflammatoire et antifongique local doux.'],
      aromatherapie:['HE Tea tree diluée dans huile végétale : antifongique local — avec précautions.','HE Lavande : apaisante, légèrement antifongique.'],
      homeopathie:['Sepia 9CH : candidose avec pertes blanches, prurit, irritabilité.','Candidum albicans 15CH : traitement de fond des candidoses récidivantes.'],
      micronutrition:['Probiotiques (Lactobacillus acidophilus + rhamnosus) : restaurent la flore vaginale — voie vaginale ou orale.','Curcuma 500mg : antifongique et anti-inflammatoire.','Ail désodorisé 600mg : antifongique systémique naturel.']
    },
    medicaments_otc:['Clotrimazole ovule (Mycohydralin®)','Éconazole ovule (Gynopévaryl®)','Fluconazole 150mg capsule (sur prescription)','Saforelle solution lavante'],
    vente_complementaire:[
      {produit:'Gynopévaryl® ovule (éconazole)', raison:'Traitement local antifongique — traitement de 1ère intention'},
      {produit:'Probiotiques vaginaux (Gynophilus®)', raison:'Restauration de la flore vaginale protectrice'},
      {produit:'Saforelle® solution lavante pH acide', raison:'Hygiène intime adaptée — préserve la flore'},
    ],
    sources:[{label:'HAS — Candidose vaginale', url:'https://www.has-sante.fr'},{label:'CNGOF', url:'https://cngof.fr'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },

  {
    id:53, slug:'angine-streptococcique', nom:'Angine streptococcique', icone:'__SVG__angine.svg__', categorie:'Infectiologie / ORL',
    saison:[10,11,12,1,2,3],
    conseils:['TDR streptocoque positif → antibiotique OBLIGATOIRE (prévention du RAA).','Amoxicilline 6 jours en 1ère intention (ou azithromycine si allergie pénicilline).','Prendre l\'antibiotique jusqu\'au bout même si amélioration rapide.','Éviction scolaire jusqu\'à 24h de traitement antibiotique.','Antalgiques pour le confort (paracétamol ou ibuprofène).'],
    contre_indications:['Amoxicilline si mononucléose infectieuse (EBV) : rash généralisé systématique.','Arrêt de l\'antibiotique avant les 6 jours → risque de RAA.','Aspirine < 15 ans : contre-indiquée.','Macrolides (azithromycine) si résistance locale documentée.'],
    regime:['Boissons fraîches, alimentation molle.','Glaces et yaourts froids : antalgiques locaux naturels.','Miel et tisanes : adoucissants.'],
    signes_alerte:['Trismus, déglutition impossible → urgences (abcès péri-amygdalien).','Stridor → urgences (épiglottite).','Purpura pétéchial → SAMU 15 (purpura fulminans).','Arthrites migratoires sous antibiotique → médecin (RAA naissant).'],
    medecine_naturelle:{
      phytotherapie:['Propolis spray : antiseptique local adjuvant.','Sauge officinale (gargarisme) : antiseptique pharyngé.'],
      aromatherapie:['HE Tea tree diluée localement : antibactérien adjuvant.'],
      homeopathie:['Phytolacca 9CH : angine avec douleurs irradiant aux oreilles.','Streptococcinum 15CH : terrain à angines streptococciques répétées.'],
      micronutrition:['Vitamine C 1g : soutien immunitaire.','Zinc 15mg : cicatrisant muqueux.']
    },
    medicaments_otc:['TDR streptocoque (Streptatest®)','Paracétamol 1g','Spray antiseptique local','Ibuprofène 400mg'],
    vente_complementaire:[
      {produit:'Streptatest® (TDR)', raison:'Diagnostic rapide avant antibiotique — 5 min'},
      {produit:'Pastilles antiseptiques', raison:'Confort local adjuvant'},
    ],
    sources:[{label:'HAS — Antibiothérapie : angine aiguë de l\'adulte', url:'https://www.has-sante.fr/jcms/p_3529230/fr/choix-et-durees-d-antibiotherapies-angine-aigue-de-l-adulte', date:'MàJ 05/2025 · consulté 07/2026'},{label:'HAS — Angine aiguë de l\'enfant', url:'https://www.has-sante.fr/jcms/p_3529229/fr/choix-et-durees-d-antibiotherapies-angine-aigue-de-l-enfant', date:'MàJ 05/2025 · consulté 07/2026'},{label:'ANSM', url:'https://ansm.sante.fr'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },

  {
    id:54, slug:'piqure-moustique', nom:'Piqûre de moustique', icone:'__SVG__-piqures moustique - insectes.svg__', categorie:'Dermatologie / Infectiologie',
    saison:[4,5,6,7,8,9],
    conseils:['Appliquer un antihistaminique topique sur la zone prurigineuse dès la piqûre.','Rincer à l\'eau froide et ne pas gratter (risque de surinfection).','En voyage tropical : répulsifs cutanés homologués DEET ou IR3535 selon l\'âge.','Moustiquaire imprégnée si séjour en zone impaludée (Dengue, Chikungunya, Zika).','Climatisation ou ventilateur réduit les piqûres en intérieur.'],
    contre_indications:['DEET : déconseillé < 6 mois, concentrations limitées < 30% chez l\'enfant.','HE répulsives : déconseillées < 3 ans, éviter grossesse.','Dermocorticoïdes topiques : seulement si réaction oedémateuse locale importante.'],
    regime:['Vitamine B1 (thiamine) : levure de bière, porc, céréales complètes — répulsif naturel modeste.','Éviter les parfums sucrés lors des sorties en soirée.'],
    signes_alerte:['Fièvre dans les jours suivant retour voyage tropical → urgence médicale (paludisme, dengue).','Réaction allergique généralisée (urticaire, dyspnée, hypotension) → SAMU 15.','Zone de piqûre très étendue, rouge, chaude, purulente → surinfection → médecin.'],
    medecine_naturelle:{
      phytotherapie:['Aloe vera gel pur : apaisant et anti-inflammatoire cutané immédiat.','Calendula crème : anti-inflammatoire et adoucissant local.','Plantain lancéolé (cataplasme feuille fraîche) : antihistaminique et antiprurigineux naturel.'],
      aromatherapie:['HE Lavande vraie : une goutte pure sur la piqûre — antiprurigineuse et apaisante.','HE Tea tree : une goutte diluée — antibactérienne, prévient la surinfection.','HE Citronnelle de Java : répulsif naturel dans huile végétale (> 3 ans).'],
      homeopathie:['Apis mellifica 15CH : piqûre avec gonflement rose, brûlant, amélioré par le froid.','Ledum palustre 9CH : douleur améliorée par applications froides.'],
      micronutrition:['Vitamine B1 200-300 mg/jour en cure préventive avant exposition.','Zinc 15 mg : favorise la cicatrisation si grattage.']
    },
    medicaments_otc:['Crème antihistaminique (Apaisyl®, Phénergan crème)','Stylo chauffant Zap-it® (thermopuncture)','Répulsif DEET ou IR3535 homologué ANSES'],
    vente_complementaire:[
      {produit:'Stylo thermique Zap-it®', raison:'Neutralisation immédiate du prurit par chaleur localisée'},
      {produit:'Gel aloe vera pur', raison:'Apaisement cutané naturel'},
      {produit:'Répulsif IR3535 (Cinq sur Cinq)', raison:'Prévention — vente croisée avant sortie'},
      {produit:'Bracelets répulsifs citronnelle (enfants)', raison:'Alternative douce chez les enfants'},
    ],
    sources:[{label:'ANSM — Répulsifs cutanés', url:'https://ansm.sante.fr'},{label:'Santé publique France', url:'https://www.santepubliquefrance.fr'},{label:'HAS', url:'https://www.has-sante.fr'}]
  },
  {
    id:55, slug:'poux', nom:'Poux de tête (pédiculose)', icone:'__SVG__poux.svg__', categorie:'Dermatologie / Parasitologie',
    saison:[8,9,10,11,12,1],
    conseils:['Traiter l\'enfant ET vérifier toute la famille (contamination rapide).','Appliquer la lotion selon la durée exacte de la notice — ne pas réduire.','Peigne à dents fines (Nitfrée, Rapala métal) OBLIGATOIRE après traitement.','Laver textiles à 60°C (bonnets, taies, literie) ou sac hermétique 5 jours.','Prévention : cheveux attachés, lotions répulsives > 3 ans.','Informer l\'école obligatoirement.'],
    contre_indications:['Organophosphorés (malathion) : éviter grossesse, allaitement, < 2 ans.','Produits physiques (diméticone) : privilégier en 1ère intention sans CI majeures.','Ne jamais appliquer HE pures non diluées sur le cuir chevelu de l\'enfant.'],
    regime:['Pas d\'impact alimentaire direct.','Éviter partage brosses, bonnets, casques.'],
    signes_alerte:['Lésions suintantes, croûtes, adénopathies cervicales → surinfection → médecin.','Échec de 2 traitements bien conduits → résistance possible → pharmacien ou médecin.','Prurit intense généralisé corps entier → gale → consultation médicale.'],
    medecine_naturelle:{
      phytotherapie:['Huile de coco vierge : étouffe les poux (effet physique oclusif).','Vinaigre de cidre : aide à dissoudre la colle des lentes avant le peigne.','Huile d\'olive : occlusion 8h sous bonnet puis peigne — méthode mécanique naturelle.'],
      aromatherapie:['HE Tea tree (> 6 ans) : pédiculicide diluée dans huile végétale.','HE Lavande vraie : répulsif et antiprurigineux — 5 gouttes dans shampoing (> 3 ans).'],
      homeopathie:['Staphysaigria 15CH : prurit cuir chevelu intense, réactions de grattage.','Pediculus capitis 15CH (nosode) : traitement de fond terrain prédisposé.'],
      micronutrition:['Zinc 15 mg : si surinfection par grattage.']
    },
    medicaments_otc:['Lotion diméticone (Itax®, Pouxit® Xf, Full Marks®)','Lotion malathion 0,5% (Prioderm®) si résistance','Peigne Nitfrée ou Rapala (métal)','Spray répulsif capillaire (Paranix Protect)'],
    vente_complementaire:[
      {produit:'Peigne métallique antiparasitaire (Nitfrée)', raison:'Indispensable — sans peigne le traitement est incomplet'},
      {produit:'Lotion diméticone (Itax® ou Pouxit®)', raison:'1ère intention — physique, sans résistance possible'},
      {produit:'Spray répulsif capillaire (Paranix Protect)', raison:'Prévention en collectivité'},
      {produit:'Shampoing entretien post-traitement', raison:'Nettoyage complet après cure'},
    ],
    sources:[{label:'VIDAL Reco — Pédiculoses', url:'https://www.vidal.fr/maladies/recommandations/pediculoses-3397.html', date:'consulté 07/2026'},{label:'ANSM', url:'https://ansm.sante.fr'},{label:'Ameli', url:'https://www.ameli.fr/assure/sante/themes/poux'}]
  },
  {
    id:56, slug:'conjonctivite', nom:'Conjonctivite', icone:'__SVG__Categorie Opthalmologie et conjonctivite.svg__', categorie:'Ophtalmologie',
    saison:[1,2,3,4,5,6,7,8,9,10,11,12],
    conseils:['Lavage oculaire au sérum physiologique plusieurs fois par jour.','Hygiène stricte des mains — très contagieuse.','Ne pas partager serviettes, mouchoirs.','Collyres antibiotiques si conjonctivite bactérienne probable.','Arrêt des lentilles de contact pendant tout le traitement.'],
    contre_indications:['Corticoïdes oculaires : jamais sans diagnostic précis (risque kératite herpétique).','Décongestionnants oculaires (naphazoline) : max 5 jours — effet rebond.'],
    regime:['Éviter la piscine pendant la conjonctivite.'],
    signes_alerte:['Douleur oculaire intense, photophobie, baisse d\'acuité visuelle → urgences ophtalmologiques.','Conjonctivite du nouveau-né < 1 mois → médecin en urgence.','Absence d\'amélioration J3-J5 sous antibiotique → médecin.'],
    medecine_naturelle:{
      phytotherapie:['Euphraise : anti-inflammatoire oculaire traditionnel — compresses ou collyre homéopathique.','Camomille (infusion refroidie) : lavage oculaire doux anti-inflammatoire.','Calendula (eau florale) : apaisante et antiseptique légère.'],
      aromatherapie:['Pas d\'HE à appliquer dans ou autour des yeux.'],
      homeopathie:['Apis mellifica 9CH : paupières gonflées, brûlures, larmoiements.','Euphrasia 5CH : larmoiements abondants, yeux piquants, sensibles à la lumière.','Pulsatilla 9CH : sécrétions jaune-vert épaisses, aggravées le matin.'],
      micronutrition:['Vitamine A : essentielle pour la santé oculaire de la conjonctive.','Zinc 15 mg : immunostimulant, accélère la guérison.']
    },
    medicaments_otc:['Sérum physiologique monodoses oculaires','Acide borique 1,2% (lavage oculaire)','Tobramycine 0,3% collyre (Tobrex® — si bactérien)'],
    vente_complementaire:[
      {produit:'Monodoses sérum physiologique oculaire', raison:'Lavage — traitement de base indispensable'},
      {produit:'Lingettes nettoyantes paupières (Blephagel)', raison:'Hygiène des bords ciliaires'},
      {produit:'Larmes artificielles (Artelac)', raison:'Conjonctivite allergique ou sécheresse associée'},
    ],
    sources:[{label:'HAS', url:'https://www.has-sante.fr'},{label:'SFO', url:'https://www.sfo.asso.fr'},{label:'Ameli', url:'https://www.ameli.fr'}]
  },
  {
    id:58, slug:'brulures-estomac-rgo', nom:'Brûlures d\'estomac / RGO', icone:'__SVG__brulure destomax.svg__', categorie:'Gastro-entérologie',
    saison:[1,2,3,4,5,6,7,8,9,10,11,12],
    conseils:['Antiacides (Gaviscon, bicarbonate) ou IPP selon la fréquence et l\'intensité.','Repas légers, fractionnés — ne pas s\'allonger dans les 2-3h post-prandiales.','Surélever la tête du lit de 15-20 cm.','Perdre du poids si surpoids (augmente la pression abdominale).'],
    contre_indications:['IPP au long cours : risque hypomagnésémie, fractures, infections C. difficile.','Bicarbonate de soude : contre-indiqué si régime sans sel, insuffisance cardiaque ou rénale.','AINS et aspirine : aggravent le RGO et les lésions oesophagiennes.'],
    regime:['Éviter : alcool, café, chocolat, menthe, tomates, agrumes, graisses, épices.','Petits repas lentement mastiqués.','Aliments alcalinisants : amandes, banane, melon, légumes cuits.'],
    signes_alerte:['Dysphagie → gastro-entérologue en urgence relative.','Perte de poids, vomissements, méléna → urgence médicale.','RGO résistant aux IPP à pleine dose après 4 semaines → médecin.'],
    medecine_naturelle:{
      phytotherapie:['Réglisse déglycyrrhiziné (DGL) : protège la muqueuse gastrique sans effet tensionnel.','Aloe vera jus interne : soulage les brûlures oesophagiennes.','Camomille matricaire : antispasmodique et anti-inflammatoire digestif.'],
      aromatherapie:['HE Basilic tropical : antispasmodique digestif, calme les remontées acides.'],
      homeopathie:['Robinia pseudoacacia 9CH : brûlures intenses avec régurgitations acides.','Natrum phosphoricum 9CH : régurgitations aigres, langue jaune crémeuse.','Nux vomica 9CH : RGO après excès alimentaires, alcool, surmenage.'],
      micronutrition:['Glutamine 5g/jour : répare la muqueuse gastrique et oesophagienne.','Zinc-carnosine 75 mg : soutien de la muqueuse gastrique.']
    },
    medicaments_otc:['Gaviscon suspension ou comprimés','Oméprazole 10-20 mg (Mopral® — conseil)','Pantoprazole 20 mg (Eupantol® — conseil)','Carbonate de calcium (Rennie®)'],
    vente_complementaire:[
      {produit:'Gaviscon double action', raison:'Antiacide + alginate — 1ère intention post-prandiale'},
      {produit:'Oméprazole 20 mg', raison:'IPP — traitement de fond court terme'},
      {produit:'Oreiller anti-reflux', raison:'Surélévation nocturne efficace'},
      {produit:'Réglisse DGL (gélules)', raison:'Protection muqueuse naturelle sans glycyrrhizine'},
    ],
    sources:[{label:'Ameli — RGO : diagnostic et traitement', url:'https://www.ameli.fr/assure/sante/themes/rgo-adulte/diagnostic-traitements', date:'consulté 07/2026'},{label:'SNFGE', url:'https://www.snfge.org'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },
  {
    id:59, slug:'crampes-musculaires', nom:'Crampes musculaires', icone:'__SVG__bas de contention.svg__', categorie:'Rhumatologie / Neurologie',
    saison:[6,7,8,9],
    conseils:['Hydratation suffisante (crampes à l\'effort et chaleur).','Étirements doux après l\'activité physique.','Lors d\'une crampe : étirer le muscle opposé (crampe mollet → relever le pied en flexion dorsale).','Réchauffement progressif avant le sport.'],
    contre_indications:['Quinine (Hexaquine®) : prescription médicale uniquement, effets graves possibles.','Statines : peuvent provoquer crampes — signaler au médecin prescripteur.'],
    regime:['Magnésium : chocolat noir, amandes, noix, légumineuses.','Potassium : banane, avocat, pomme de terre.','Calcium : produits laitiers, sardines, amandes.','Eau minéralisée (Hépar, Contrex) lors d\'efforts prolongés.'],
    signes_alerte:['Crampes avec douleurs musculaires sévères, urines brunes → urgences (rhabdomyolyse).','Crampes nocturnes intenses et répétées avec paresthésies → médecin.','Crampes avec palpitations après médicament → médecin.'],
    medecine_naturelle:{
      phytotherapie:['Ortie (feuilles) : riche en magnésium et silicium — tonique musculaire.','Prêle des champs : reminéralisante (silicium, magnésium, potassium).','Valériane : relaxante musculaire douce — utile pour les crampes nocturnes.'],
      aromatherapie:['HE Gaulthérie (wintergreen) : antispasmodique musculaire local — massage dilué.','HE Romarin à camphre : stimulant circulatoire, antispasmodique musculaire.','HE Menthe poivrée : vasodilatateur local, sensation fraîcheur antidouleur.'],
      homeopathie:['Cuprum metallicum 9CH : crampes nocturnes des mollets, spasmes intenses.','Magnesia phosphorica 9CH : crampes améliorées par la chaleur et la pression.','Arnica montana 9CH : crampes post-effort avec courbatures.'],
      micronutrition:['Magnésium marin 300-400 mg/jour : déficit fréquent, efficacité prouvée.','Potassium si effort prolongé et transpiration abondante.','Vitamine B6 2 mg/jour : cofacteur de l\'absorption du magnésium.']
    },
    medicaments_otc:['Magnésium marin (Magnévie B6, Spasmag)','Quinine (prescription médicale)'],
    vente_complementaire:[
      {produit:'Magnésium marin + B6 (Magnévie B6)', raison:'Prévention des crampes — traitement de fond'},
      {produit:'Crème sportive réchauffante (Baume du Tigre)', raison:'Soulagement local immédiat'},
      {produit:'Électrolytes sport (sachets)', raison:'Crampes d\'effort à la chaleur'},
    ],
    sources:[{label:'HAS', url:'https://www.has-sante.fr'},{label:'Vidal', url:'https://www.vidal.fr'},{label:'Ameli', url:'https://www.ameli.fr'}]
  },
  {
    id:61, slug:'stress-anxiete', nom:'Stress et anxiété situationnelle', icone:'__SVG__stress.svg__', categorie:'Psychiatrie / Médecine générale',
    saison:[1,2,3,4,5,6,7,8,9,10,11,12],
    conseils:['Différencier stress situationnel (normal) d\'un trouble anxieux généralisé (médecin).','Cohérence cardiaque : 5 cycles de 5s inspiration / 5s expiration.','Activité physique régulière : efficacité comparable aux antidépresseurs sur l\'anxiété légère.','Hygiène du sommeil stricte.','Anxiolytiques phytothérapeutiques en 1ère intention comptoir.'],
    contre_indications:['Benzodiazépines : réservées à la prescription médicale, < 12 semaines.','Antidépresseurs ISRS : prescription médicale, délai d\'action 2-4 semaines.','HE per os : contre-indiquées sans avis pharmacien.'],
    regime:['Réduire café et alcool (anxiogènes).','Magnésium : déficit très lié à l\'anxiété.','Oméga-3 : modulateurs de l\'humeur.','Éviter l\'hypoglycémie (repas réguliers sans sucres rapides).'],
    signes_alerte:['Crises de panique répétées → médecin (TAG ou trouble panique).','Anxiété avec idées noires, perte de goût, asthénie sévère → médecin (dépression).','Anxiété + douleur thoracique, palpitations → urgences (éliminer cause cardiaque).'],
    medecine_naturelle:{
      phytotherapie:['Valériane + Mélisse : synergie anxiolytique sans accoutumance — AMM européenne.','Passiflore : anxiolytique naturel, troubles du sommeil et anxiété légère.','Rhodiola rosea : adaptogène, améliore la résistance au stress chronique.'],
      aromatherapie:['HE Petit grain bigarade : régule le système nerveux autonome — inhalation sur poignets.','HE Bergamote : anxiolytique et rééquilibrante — diffusion 10 min.','HE Lavande vraie : sédative légère, réduit la réponse au stress.'],
      homeopathie:['Gelsemium 15CH : trac, anticipation anxieuse, tremblement.','Argentum nitricum 9CH : anxiété anticipatoire avec agitation.','Ignatia amara 15CH : anxiété post-stress émotionnel, boule dans la gorge.'],
      micronutrition:['Magnésium bisglycinate 300-400 mg/soir : myorelaxant et anxiolytique doux.','L-Théanine 200-400 mg : acide aminé du thé vert, anxiolytique sans sédation.','Ashwagandha (KSM-66) 600 mg/jour : adaptogène, réduit le cortisol.']
    },
    medicaments_otc:['Euphytose® (valériane + mélisse + passiflore)','Magnésium bisglycinate (Magnévie, Spasmag)','Mélatonine 1 mg (si composante insomnie)'],
    vente_complementaire:[
      {produit:'Euphytose® (valériane + mélisse)', raison:'Anxiolytique phytothérapeutique AMM — 1ère intention'},
      {produit:'Magnésium bisglycinate (bonne forme)', raison:'Relaxant nerveux — déficit fréquent dans le stress'},
      {produit:'HE Petit grain bigarade (rollerball)', raison:'Gestion immédiate de la crise d\'angoisse'},
      {produit:'Ashwagandha KSM-66 600 mg', raison:'Adaptogène — forte demande actuelle'},
    ],
    sources:[{label:'Ameli — Traitement des troubles anxieux', url:'https://www.ameli.fr/assure/sante/themes/troubles-anxieux-anxiete/traitement', date:'consulté 07/2026'},{label:'Ameli', url:'https://www.ameli.fr'},{label:'CESPHARM', url:'https://www.cespharm.fr'}]
  },
  {
    id:62, slug:'fatigue-asthenie', nom:'Fatigue / Asthénie', icone:'__SVG__fatigue asthenie.svg__', categorie:'Médecine générale',
    saison:[1,2,3,10,11,12],
    conseils:['Distinguer fatigue physique (effort), psychique (stress) et pathologique (cause sous-jacente).','Bilan biologique de 1ère intention : NFS, TSH, ferritine, vitamine D, B12.','Régulariser le sommeil — priorité absolue.','Activité physique douce et progressive (paradoxalement anti-fatigue si bien conduite).','Hydratation suffisante.'],
    contre_indications:['Stimulants excessifs (caféine, guarana) : effet de rebond, aggrave l\'anxiété.'],
    regime:['Fer : viandes rouges, légumineuses, fruits de mer + vitamine C pour l\'absorption.','Vitamine B12 : viandes, poissons (attention végétaliens).','Vitamine D : soleil, poissons gras, supplémentation en hiver.','Éviter sucres rapides (fatigue réactionnelle à l\'hypoglycémie postprandiale).'],
    signes_alerte:['Fatigue avec fièvre persistante, sueurs nocturnes, adénopathies → médecin urgent.','Fatigue avec pâleur intense, tachycardie, essoufflement au repos → anémie sévère → urgences.','Fatigue isolée inexpliquée > 3 semaines → bilan médical complet.'],
    medecine_naturelle:{
      phytotherapie:['Ginseng (Panax ginseng) : adaptogène, améliore les performances physiques et mentales.','Rhodiola rosea : anti-fatigue et adaptogène validé scientifiquement.','Eleuthérocoque : tonique général et immunostimulant.'],
      aromatherapie:['HE Épinette noire : tonique corticosurrénalien naturel — 2 gouttes sur les reins le matin.','HE Romarin à cinéole : stimulant cognitif et physique — diffusion matin.','HE Menthe poivrée : tonique nerveux immédiat — 1 goutte sur les tempes.'],
      homeopathie:['China rubra 9CH : fatigue après perte de liquides (maladie, accouchement).','Ferrum phosphoricum 9CH : asthénie avec teint pâle.','Phosphoric acidum 9CH : fatigue intellectuelle et émotionnelle profonde.'],
      micronutrition:['Vitamine D3 2000 UI/jour : déficit quasi-universel en hiver en France.','Fer bisglycinate (si carence confirmée) : bien toléré sans constipation.','CoQ10 200 mg/jour : production d\'énergie cellulaire mitochondriale.']
    },
    medicaments_otc:['Multivitamines + minéraux (Supradyn®, Alvityl®)','Vitamine D3 1000-2000 UI','Magnésium + B6 (soutien nerveux)'],
    vente_complementaire:[
      {produit:'Multivitamines (Supradyn® ou Alvityl®)', raison:'Terrain carencé — vente très fréquente fatigue saisonnière'},
      {produit:'Vitamine D3 1000 UI (gélules ou gouttes)', raison:'Déficit quasi-universel en hiver'},
      {produit:'Rhodiola + ginseng (cure 4 semaines)', raison:'Adaptogène naturel anti-fatigue documenté'},
      {produit:'Fer bisglycinate (bonne tolérance digestive)', raison:'Si carence ferritinémique confirmée'},
    ],
    sources:[{label:'HAS', url:'https://www.has-sante.fr'},{label:'Ameli — Fatigue', url:'https://www.ameli.fr/assure/sante/themes/fatigue/comprendre-fatigue'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },

  {
    id:63, slug:'mal-de-gorge', nom:'Maux de gorge (pharyngite)', icone:'__SVG__maux-de-gorge.svg__', categorie:'ORL',
    saison:[10,11,12,1,2,3],
    conseils:['Pastilles ou sprays locaux à effet antalgique/antiseptique, plusieurs fois par jour.','Hydratation fréquente, boissons tièdes plutôt que très chaudes ou glacées.','Gargarismes à l\'eau salée tiède : effet apaisant local.','Repos vocal si voix enrouée associée.','Distinguer viral (très fréquent, pas d\'antibiotique) de bactérien (streptococcique) selon les signes.'],
    contre_indications:['AINS en bain de bouche/local : pas en automédication prolongée sans avis médical (risque de masquer une complication).','Anesthésiques locaux (lidocaïne en spray) : prudence chez l\'enfant, risque de fausse route si la sensibilité pharyngée est trop diminuée.','Antibiotiques : jamais en automédication, à réserver à une prescription après avis médical (test rapide streptococcique).','Aspirine : à éviter chez l\'enfant et l\'adolescent (risque de syndrome de Reye en contexte viral).'],
    regime:['Boissons tièdes (tisane, bouillon) plutôt que très chaudes ou très froides.','Miel dans une boisson tiède : adoucissant local.','Éviter les aliments très épicés, acides ou secs/râpeux qui irritent.','Éviter alcool et tabac, irritants directs de la muqueuse pharyngée.'],
    signes_alerte:['Difficulté à avaler la salive, voix étouffée, difficulté respiratoire → urgences (risque épiglottite/phlegmon).','Fièvre élevée + ganglions + absence de toux + amygdales avec dépôts blancs → évoquer angine streptococcique, consulter pour test rapide.','Mal de gorge > 1 semaine sans amélioration → médecin.','Éruption cutanée associée → médecin (scarlatine possible).'],
    medecine_naturelle:{
      phytotherapie:['Propolis : spray ou pastilles, propriétés antiseptiques et adoucissantes.','Erysimum (herbe aux chantres) : traditionnellement utilisé pour la voix et la gorge.','Guimauve : mucilages adoucissants pour la muqueuse pharyngée.'],
      aromatherapie:['HE Tea tree (arbre à thé) : 1 goutte diluée en gargarisme, propriétés antiseptiques (à ne jamais avaler pure).','HE Citron : en diffusion, assainissant atmosphérique.','Hydrolat de thym : gargarisme doux, alternative à l\'huile essentielle pure.'],
      homeopathie:['Apis mellifica 9CH : gorge rouge, sensation de piqûre, gonflement.','Belladonna 9CH : gorge rouge vif, douleur intense, début brutal avec fièvre.','Phytolacca 9CH : douleur irradiant vers les oreilles, aggravée en avalant.'],
      micronutrition:['Vitamine C : soutien immunitaire en phase virale.','Zinc : peut réduire la durée des symptômes ORL viraux.','Propolis en complément oral : renfort antiseptique.']
    },
    medicaments_otc:['Paracétamol 1g (douleur, fièvre)','Pastilles antiseptiques/anesthésiques locales','Spray buccal antiseptique','Collutoire ou bain de bouche apaisant'],
    vente_complementaire:[
      {produit:'Pastilles miel-propolis', raison:'Adoucissant et antiseptique local, usage répété dans la journée'},
      {produit:'Spray buccal antiseptique', raison:'Action locale ciblée, complément aux pastilles'},
      {produit:'Tisane gorge (thym-miel-citron)', raison:'Hydratation et adoucissement associés'},
    ],
    sources:[{label:'HAS — Antibiothérapie : angine aiguë de l\'adulte', url:'https://www.has-sante.fr/jcms/p_3529230/fr/choix-et-durees-d-antibiotherapies-angine-aigue-de-l-adulte', date:'MàJ 05/2025 · consulté 07/2026'},{label:'ANSM', url:'https://ansm.sante.fr'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },

  {
    id:64, slug:'toux-grasse', nom:'Toux grasse (productive)', icone:'__SVG__toux seche + toux grasse.svg__', categorie:'Pneumologie',
    saison:[10,11,12,1,2,3],
    conseils:['Ne jamais associer à un antitussif : la toux grasse a un rôle utile d\'évacuation des sécrétions.','Favoriser l\'hydratation abondante pour fluidifier les sécrétions bronchiques.','Humidifier l\'air ambiant, surtout en chauffage hivernal (air sec aggrave l\'irritation).','Drainage postural possible chez le nourrisson/enfant sur conseil du pédiatre ou du kiné si encombrement important.','Surélever légèrement la tête de lit si la toux est plus marquée en position allongée.'],
    contre_indications:['Antitussifs (codéine, pholcodine, dextromethorphane) : contre-indiqués en cas de toux grasse — ils favorisent la rétention des sécrétions et le risque de surinfection.','Mucolytiques/expectorants : utilité clinique limitée, certains déconseillés chez le nourrisson (risque d\'encombrement paradoxal).','Antibiotiques : jamais en automédication, la toux grasse est très majoritairement virale au départ.','Chez le nourrisson < 2 ans : prudence avec tout sirop, kinésithérapie respiratoire à privilégier selon avis médical en cas de bronchiolite.'],
    regime:['Hydratation ++ pour fluidifier naturellement les sécrétions.','Miel pur en boisson tiède (sauf enfant < 1 an, risque de botulisme infantile).','Bouillons chauds, tisanes adoucissantes.','Éviter le lait en grande quantité chez certains patients qui rapportent une sensation d\'épaississement des sécrétions (effet non démontré scientifiquement mais fréquemment rapporté).'],
    signes_alerte:['Crachats teintés de sang (hémoptysie) → médecin rapidement.','Fièvre élevée persistante + essoufflement → évoquer pneumonie, consulter.','Toux grasse > 3 semaines sans amélioration → médecin (recherche cause sous-jacente).','Chez le nourrisson : difficultés respiratoires, refus de boire, geignement → urgences.'],
    medecine_naturelle:{
      phytotherapie:['Lierre grimpant (feuille) : expectorant traditionnel, souvent utilisé en sirop pédiatrique.','Thym : antiseptique et légèrement expectorant des voies respiratoires.','Plantain lancéolé : adoucissant et apaisant pour les muqueuses irritées par la toux.'],
      aromatherapie:['HE Eucalyptus radiata : inhalation, propriétés expectorantes et antivirales.','HE Myrte verte : douce, adaptée en diffusion même chez l\'enfant plus grand selon les précautions d\'usage.','HE Ravintsara : soutien antiviral en diffusion atmosphérique.'],
      homeopathie:['Antimonium tartaricum 9CH : toux grasse avec râles, sensation d\'encombrement bronchique important.','Ipeca 9CH : toux grasse avec nausées, difficulté à expectorer.','Coccus cacti 9CH : toux grasse en quintes avec glaires filantes.'],
      micronutrition:['Vitamine C : soutien immunitaire général en phase virale.','Zinc : peut contribuer à réduire la durée des symptômes respiratoires.','N-acétylcystéine (sur conseil/prescription) : mucolytique utilisé dans certains contextes chroniques.']
    },
    medicaments_otc:['Sirop expectorant à base de lierre ou de thym','Sérum physiologique (lavage nasal associé si rhinorrhée)','Pastilles adoucissantes gorge','Solution pour inhalation (eucalyptus, etc.)'],
    vente_complementaire:[
      {produit:'Sirop expectorant lierre/thym', raison:'Aide à fluidifier et faciliter l\'expectoration'},
      {produit:'Humidificateur d\'air', raison:'Réduit l\'irritation des voies respiratoires en air sec'},
      {produit:'Sérum physiologique nasal', raison:'Complément si encombrement nasal associé, fréquent chez l\'enfant'},
    ],
    sources:[{label:'HAS — Toux aiguë', url:'https://www.has-sante.fr'},{label:'ANSM', url:'https://ansm.sante.fr'},{label:'Vidal', url:'https://www.vidal.fr'}]
  },
];

// Ajouter au tableau principal et retrier
PATHOLOGIES_EXTRA.forEach(p => PATHOLOGIES_DB.push(p));
PATHOLOGIES_DB.sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));