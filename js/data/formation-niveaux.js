/* MediFiche — Formation niveaux 2, 3, 4
   Variable globale : FN[slug].n2 / n3 / n4
   Structure par niveau :
     saviez_vous : string
     schema      : string SVG (optionnel)
     physiopatho : string
     mecanisme   : string (n2) / pharmacocinetique (n3) / recommandations (n4)
     diagnostic  : string (n2) / cas_clinique (n3) / situations_complexes (n4)
     effets_secondaires : [{label, niveau}]
     classes     : [{classe, dci[], specialites[], couleur, remarque}]
     interactions: string[]
     points_cles : string[]
   Sources : HAS, ANSM, VIDAL, cours officiels DFASP1/DFASP2
*/
'use strict';
const FN = {};

/* ════════════════════════════════════════════════════════
   F1 — ALLERGIE AU POLLEN
   ════════════════════════════════════════════════════════ */
FN['allergie-pollen'] = {
  n2: {
    saviez_vous: "En France, le calendrier pollinique varie selon les régions : les cyprès commencent en janvier dans le Sud, les graminées en mai-juin partout, les ambroisies en août dans la vallée du Rhône. L'allergène Bet v 1 du bouleau est si proche de certaines protéines alimentaires qu'il provoque des allergies croisées avec les pommes et les noisettes.",
    physiopatho: "Phase de sensibilisation : le pollen (10–100 µm) traverse la muqueuse nasale → capturé par les cellules dendritiques → présentation aux lymphocytes T CD4+ → polarisation Th2 → sécrétion d'IL-4 et IL-13 → commutation isotypique des lymphocytes B vers la production d'IgE spécifiques → fixation des IgE sur les mastocytes et basophiles via le récepteur FcεRI à haute affinité.\n\nPhase effectrice (2e contact) : pontage des IgE par l'allergène → dégranulation des mastocytes → libération d'histamine, leucotriènes C4/D4, prostaglandine D2, tryptase → rhinorrhée, éternuements, prurit (phase immédiate, 5–30 min). Réaction tardive 4–8 h après : afflux d'éosinophiles guidés par l'IL-5 et l'éotaxine → inflammation chronique de la muqueuse.",
    mecanisme: "AntiH1 2G (cétirizine, loratadine, bilastine) : antagonistes compétitifs des récepteurs H1 périphériques. Faible passage de la barrière hémato-encéphalique → peu sédatifs. La bilastine et la fexofénadine sont substrats de la P-glycoprotéine intestinale (pas de métabolisme CYP3A4).\n\nCorticoïdes nasaux (fluticasone, mométasone) : agonistes des récepteurs glucocorticoïdes → transrépression de NF-κB → réduction de l'œdème, du mucus et du recrutement des éosinophiles. Biodisponibilité systémique < 1 % pour la fluticasone. Délai d'action : 3–7 jours.\n\nCromoglicate : stabilisant des mastocytes via inhibition des canaux Cl⁻ → prévient la dégranulation → usage strictement préventif.",
    diagnostic: "Prick-tests cutanés (référence) : lecture à 15 min, positivité si papule ≥ 3 mm. Alternative : dosage des IgE spécifiques sériques (ImmunoCAP). Classification ARIA en intermittente/persistante × légère/modérée-sévère.",
    effets_secondaires: [
      {label:"Somnolence résiduelle (cétirizine > loratadine > bilastine)", niveau:"warning"},
      {label:"Sécheresse buccale, rétention urinaire (antiH1 1G — anticholinergiques)", niveau:"danger"},
      {label:"Épistaxis légère (corticoïdes nasaux — mauvaise technique)", niveau:"info"},
      {label:"Inhibition de croissance (corticoïdes nasaux forts chez enfant — rare)", niveau:"warning"},
    ],
    classes: [
      {classe:"AntiH1 2G — peu/pas sédatifs", dci:["Cétirizine 10mg","Loratadine 10mg","Bilastine 20mg","Fexofénadine 120mg"], specialites:["Zyrtec®","Clarityne®","Bilaska®","Telfast®"], couleur:"#1B6B52", remarque:"Bilastine et fexofénadine : pas de métabolisme CYP → moins d'interactions"},
      {classe:"Corticoïdes nasaux — 1ère intention sur congestion", dci:["Mométasone 50µg","Fluticasone furoate 27,5µg","Budésonide 32µg"], specialites:["Nasonex®","Avamys®","Rhinocort®"], couleur:"#1E3A5F", remarque:"Supérieurs aux antiH1 sur la congestion nasale (méta-analyses Cochrane)"},
      {classe:"ITA — seul traitement modificateur", dci:["Extraits allergéniques graminées/arbres"], specialites:["Grazax®","Actair®","Staloral®"], couleur:"#6B2D5E", remarque:"Sublinguale ou sous-cutanée — 3 ans minimum — modifie le cours naturel de la maladie"},
    ],
    interactions: [
      "AntiH1 1G + alcool ou benzodiazépines : synergie sédative — CI formelle",
      "Kétoconazole oral + loratadine : inhibition CYP3A4 → ↑ [loratadine] (peu cliniquement significatif)",
      "Jus de pamplemousse + fexofénadine : inhibition P-gp intestinale → ↑ absorption (espacer de 4 h)",
    ],
    points_cles: [
      "Sensibilisation = obligatoire avant toute allergie : pas de réaction à la 1ère exposition au pollen",
      "IgE se fixent sur les mastocytes → au 2e contact : dégranulation → histamine → symptômes",
      "AntiH1 2G : efficaces sur rhinorrhée et prurit, moins sur la congestion nasale",
      "Corticoïdes nasaux : supérieurs sur la congestion — délai 3–7 jours avant effet complet",
      "Score ARIA guide le traitement par étapes (intermittent léger → persistant sévère)",
    ],
  },
  n3: {
    saviez_vous: "L'immunothérapie allergénique (ITA) est le seul traitement qui modifie réellement l'histoire naturelle de la maladie. Elle induit une tolérance immunologique via les lymphocytes T régulateurs (Treg) sécrétant l'IL-10 et le TGF-β. Cette tolérance peut persister 3 à 5 ans après l'arrêt d'un traitement de 3 ans.",
    physiopatho: "Alarmines épithéliales : les cellules épithéliales nasales produisent TSLP, IL-25 et IL-33 en réponse au pollen → activation des ILC2 (Innate Lymphoid Cells de type 2) et des Th2 → cascade IL-4/IL-5/IL-13.\n\nRemodelage muqueux en rhinite chronique : hyperplasie des cellules caliciformes, fibrose sous-épithéliale (dépôt de collagène III), néovascularisation → peut évoluer vers la polypose naso-sinusienne (PNS) si non traité — entité distincte contrôlée par dupilumab dans les formes réfractaires.",
    pharmacocinetique: "Cétirizine : Tmax = 1 h, T½ = 8–10 h, élimination rénale 60 % inchangée → adapter si ClCr < 30 mL/min (dose × ½).\nBilastine : Tmax = 1,3 h, T½ = 14,5 h, non métabolisée → aucune adaptation rénale ou hépatique.\nFluticasone propionate nasal : Tmax local 15–30 min, biodisponibilité systémique < 1 % (fort effet de premier passage CYP3A4 hépatique). Mométasone : biodisponibilité < 0,1 % — le plus sûr à long terme.",
    cas_clinique: "Patient 28 ans, rhinite aux graminées depuis 5 ans, obstruction nasale résiduelle sous cétirizine 10 mg/j. VEMS/CVF normal. Que proposez-vous ?\n\nRaisonnement : obstruction réfractaire aux antiH1 → ajouter corticoïde nasal (mométasone 2 bouffées/narine/j). Si rhinite persistante modérée-sévère depuis ≥ 2 ans avec impact fonctionnel → discuter ITA sublinguale (graminées : Grazax® ou Actair®). Vérifier co-morbidité asthmatique (ARIA 2022 : 'united airway').",
    effets_secondaires: [
      {label:"Anosmie (polypose avancée non traitée — pas due aux médicaments)", niveau:"warning"},
      {label:"Glaucome / cataracte (corticoïdes nasaux forts + collyres cortisonés cumulés — très rare)", niveau:"danger"},
      {label:"Réactions locales ITA sublinguale : prurit buccal, œdème lingual (bénin, résolutif)", niveau:"info"},
      {label:"Anaphylaxie ITA sous-cutanée : 1/1 000 000 d'injections — surveillance 30 min obligatoire", niveau:"danger"},
    ],
    classes: [
      {classe:"Dupilumab (anti-IL-4Rα) — rhinite + polypose sévère", dci:["Dupilumab 300mg SC/2 semaines"], specialites:["Dupixent®"], couleur:"#991B1B", remarque:"AMM rhinite chronique sévère avec polypose réfractaire — bloque IL-4 ET IL-13 simultanément"},
      {classe:"Montélukast (anti-leucotriène)", dci:["Montélukast 10mg/j"], specialites:["Singulair®"], couleur:"#B45309", remarque:"Rhinite + asthme associé — efficacité modeste seul, utile en add-on"},
      {classe:"Azélastine nasale (antiH1 topique)", dci:["Azélastine 0,1%"], specialites:["Allergodil®"], couleur:"#1E3A5F", remarque:"Action rapide 15 min — efficace sur prurit et rhinorrhée. Moins actif sur congestion"},
    ],
    interactions: [
      "Dupilumab + vaccins vivants atténués : déconseillé pendant le traitement (espacer de 4 semaines)",
      "ITA + bêta-bloquants (non sélectifs) : CI relative pour l'ITA sous-cutanée (risque anaphylaxie réfractaire à l'adrénaline)",
      "AntiH1 + ITA : les antiH1 ne masquent pas les réactions systémiques — peuvent être co-utilisés pendant l'ITA",
    ],
    points_cles: [
      "TSLP / IL-33 / IL-25 = alarmines épithéliales — cibles thérapeutiques émergentes (tézépélumab en cours d'évaluation)",
      "ITA : 3 mécanismes de tolérance — Treg (IL-10/TGF-β), déviation Th1, IgG4 bloquantes",
      "Mométasone nasale : biodisponibilité systémique < 0,1 % — utilisable en grossesse (données rassurantes)",
      "Dupilumab : réduction des polypes de 80 % (SINUS-24 trial) — AMM rhinite + polypose réfractaire",
      "ARIA 2022 : algorithme digital (application MACVIA) pour suivi en temps réel du contrôle de la rhinite",
    ],
  },
  n4: {
    saviez_vous: "L'ANSM a retiré la pseudoéphédrine orale du marché français en novembre 2023 (risque d'AVC hémorragique). Les patients habitués aux décongestionnants oraux doivent être reorientés vers les corticoïdes nasaux ou les lavages salins hypertoniques.",
    physiopatho: "Barrière épithéliale et rhinite : les mutations de la filaggrine (FLG) — impliquées dans la dermatite atopique — altèrent aussi l'intégrité de l'épithélium nasal → ↑ pénétrance allergénique → ↑ sensibilisation. Ce concept 'outside-in' explique la comorbidité fréquente rhinite-DA-asthme (triade atopique). La même altération de ZO-1 et claudine-1 est retrouvée dans les épithéliums nasaux et bronchiques des atopiques.",
    recommandations: "HAS 2022 — Rhinite allergique : algorithme 3 paliers. Palier 1 : antiH1 oral 2G ou corticoïde nasal en monothérapie. Palier 2 : association corticoïde nasal + antiH1 oral (ou Dymista® association fixe). Palier 3 : ITA si insuffisamment contrôlé après 3 mois + impact fonctionnel. ANSM 2023 : retrait pseudoéphédrine — orienter vers solutions alternatives.",
    situations_complexes: "Grossesse : cétirizine ou loratadine (données de sécurité les plus importantes en grossesse). Éviter antiH1 1G (anticholinergiques). Corticoïdes nasaux : mométasone (données rassurantes, biodisponibilité < 0,1 %). Ne pas initier une ITA pendant la grossesse (risque anaphylaxie lors des montées de doses) ; si déjà en maintenance : continuer.\n\nInsuffisance rénale (ClCr < 30) : réduire dose cétirizine de moitié. Bilastine non métabolisée → pas d'adaptation.\n\nSujet âgé : éviter absolument antiH1 1G (liste de Beers — confusion, rétention urinaire, chutes). Préférer loratadine ou fexofénadine.\n\nEnfant < 2 ans : pas d'antiH1 — lavage nasal sérum physiologique isotonique uniquement.",
    effets_secondaires: [
      {label:"Syndrome anticholinergique (antiH1 1G sujet âgé) : confusion, rétention, chutes — urgence", niveau:"danger"},
      {label:"Allongement QT (hydroxyzine > 100 mg/j, loratadine fortes doses) — surveillance ECG", niveau:"danger"},
      {label:"Rhinite médicamenteuse (Jost) : décongestionnants nasaux > 5 jours → rebond vasodilatatoire", niveau:"danger"},
      {label:"Freinage corticotrope (rare — cumul corticoïdes nasaux forts + inhalés à fortes doses)", niveau:"warning"},
    ],
    classes: [
      {classe:"Association fixe fluticasone + azélastine nasale", dci:["Fluticasone 50µg + Azélastine 137µg / bouffée"], specialites:["Dymista®"], couleur:"#1B6B52", remarque:"Supérieur aux deux composants en monothérapie sur la congestion (étude MAXIS). Remboursé si RA modérée-sévère insuffisamment contrôlée"},
      {classe:"Omalizumab (anti-IgE) — rhinite + asthme allergique", dci:["Omalizumab SC/2–4 semaines"], specialites:["Xolair®"], couleur:"#991B1B", remarque:"AMM rhinite allergique + asthme allergique sévère — réduit les IgE libres totales. Dose selon poids et IgE totales"},
      {classe:"Dupilumab (anti-IL-4Rα) — rhinite + polypose", dci:["Dupilumab 300mg SC/2 semaines"], specialites:["Dupixent®"], couleur:"#6B2D5E", remarque:"Remboursé France 2021 pour PNS sévère réfractaire. Traçabilité lot obligatoire"},
    ],
    interactions: [
      "Hydroxyzine + médicaments allongeant le QT (azithromycine, halopéridol, amiodarone) : CONTRE-INDIQUÉE",
      "AntiH1 1G + anticholinergiques (oxybutynine, tricycliques, atropine) : accumulation des effets anticholinergiques",
      "Kétoconazole systémique + loratadine : inhibition CYP3A4/2D6 → ↑ AUC loratadine (surveillance ECG si cardiopathie)",
    ],
    points_cles: [
      "Technique spray nasal : tête légèrement penchée en avant, orienter vers l'EXTÉRIEUR (pas la cloison) → prévient épistaxis et perforation",
      "Pseudoéphédrine retirée (ANSM 2023) : orienter vers corticoïdes nasaux ou sérum hypertonique",
      "Délivrance ITA sublinguale : vérifier ordonnance allergologue, conserver au réfrigérateur, informer sur la durée (3 ans)",
      "Dupilumab / biothérapies : traçabilité obligatoire (n° de lot), déclaration pharmacovigilance si EI inattendu",
      "Signal ANSM : antiH1 1G chez sujet âgé = médicament potentiellement inapproprié (liste Beers/STOPP)",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F2 — ASTHME
   ════════════════════════════════════════════════════════ */
FN['asthme'] = {
  n2: {
    saviez_vous: "L'asthme n'est pas qu'une maladie pulmonaire : c'est une maladie systémique de l'inflammation Th2. 80 % des asthmatiques ont une rhinite allergique associée (concept 'united airway disease'). Le GINA 2024 a supprimé le SABA en monothérapie — même une crise légère doit être traitée avec un inhalateur combiné CSI/formotérol.",
    physiopatho: "Triple mécanisme :\n1. Inflammation chronique : infiltration par éosinophiles, mastocytes, lymphocytes Th2 → cytokines IL-4, IL-5, IL-13 → IgE spécifiques, hypersécrétion de mucus, lésions épithéliales.\n2. Hyperréactivité bronchique (HRB) : réponse exagérée des muscles lisses à des stimuli non spécifiques (froid, exercice, polluants) → mesurée par le test à la méthacholine (PC20 < 8 mg/mL confirme le diagnostic si spirométrie normale).\n3. Remodelage bronchique : si asthme non contrôlé → épaississement de la membrane basale, fibrose sous-épithéliale, hypertrophie musculaire lisse → obstruction partiellement irréversible.",
    mecanisme: "SABA (salbutamol) : agoniste β2-adrénergique → activation de l'adénylate cyclase → ↑ AMPc → activation PKA → phosphorylation MLCK → relaxation musculaire lisse bronchique en 3–5 min. Durée 4–6 h.\n\nCSI (béclométasone, budésonide, fluticasone) : liaison au récepteur cytoplasmique GR → translocation nucléaire → transrépression de NF-κB et AP-1 → ↓ IL-4, IL-5, IL-13, éotaxine. Efficacité anti-inflammatoire en 1–2 semaines.\n\nLABA (formotérol, salmétérol) : même mécanisme que SABA, T½ longue (12–24 h). JAMAIS en monothérapie dans l'asthme (risque de masquage de l'aggravation → association obligatoire avec CSI).",
    diagnostic: "Spirométrie : VEMS/CVF < 0,70 + réversibilité ≥ 12 % et ≥ 200 mL après β2 → confirme l'obstruction réversible. DEP à domicile : variabilité ≥ 20 % sur 2 semaines = asthme instable. Classification GINA 2024 en 5 paliers. ACT (Asthma Control Test) : score ≤ 19/25 = asthme non contrôlé.",
    effets_secondaires: [
      {label:"Candidose oropharyngée (CSI) — rinçage de bouche après chaque inhalation obligatoire", niveau:"warning"},
      {label:"Tachycardie, tremblements (SABA fortes doses)", niveau:"warning"},
      {label:"Hypokaliémie (SABA + diurétiques hypokaliémiants) — risque arythmie", niveau:"danger"},
      {label:"Retard de croissance (CSI forts > 400 µg BDP/j chez enfant — dose-dépendant)", niveau:"warning"},
      {label:"Bronchospasme paradoxal à l'inhalation (rare — changer de dispositif)", niveau:"danger"},
    ],
    classes: [
      {classe:"CSI seuls — traitement de fond", dci:["Béclométasone HFA","Budésonide","Fluticasone propionate","Ciclésonide"], specialites:["Beclojet®","Pulmicort®","Flixotide®","Alvesco®"], couleur:"#1B6B52", remarque:"Ciclésonide = pro-drogue activée dans le poumon → moins d'effets systémiques"},
      {classe:"Association CSI + LABA — fond + secours (SMART)", dci:["Budésonide/Formotérol","Fluticasone/Salmétérol","Béclométasone/Formotérol"], specialites:["Symbicort®","Séretide®","Foster®"], couleur:"#1E3A5F", remarque:"Symbicort® : stratégie SMART (1 seul inhalateur pour fond ET secours) — réduit les exacerbations de 35 %"},
      {classe:"Montelukast (anti-leucotriène)", dci:["Montélukast 10mg"], specialites:["Singulair®"], couleur:"#B45309", remarque:"Add-on si asthme + rhinite ou effort — jamais en monothérapie dans l'asthme"},
    ],
    interactions: [
      "β-bloquants (y compris collyres timolol, cartéolol) : CI absolue dans l'asthme — bronchospasme fatal",
      "AINS / aspirine : asthme à l'aspirine (AERD) dans 10–20 % — intolérance aux inhibiteurs COX-1",
      "Kétoconazole oral + fluticasone inhalée forte dose : inhibition CYP3A4 → ↑ [fluticasone] systémique → freinage corticotrope",
    ],
    points_cles: [
      "VEMS/CVF < 0,70 + réversibilité ≥ 12 % et 200 mL → diagnostic spirométrique d'asthme confirmé",
      "SABA > 2×/semaine OU réveil nocturne → asthme non contrôlé (GINA) → intensifier le traitement",
      "Stratégie SMART (Symbicort®) : 1 seul inhalateur fond + secours → meilleure observance et moins d'exacerbations",
      "Collyres β-bloquants (timolol) = contre-indication absolue dans l'asthme — souvent oubliée !",
      "Rinçage de bouche systématique après tout CSI inhalé → prévient la candidose oropharyngée",
    ],
  },
  n3: {
    saviez_vous: "Le GINA 2024 a révolutionné le traitement de l'asthme léger : les SABA (salbutamol seul) ne sont plus recommandés à aucun palier. La stratégie AIR (Anti-Inflammatory Reliever) — utiliser le CSI/formotérol comme seul inhalateur pour le fond ET les crises — est désormais la référence dès le palier 1.",
    physiopatho: "Phénotypes immunologiques d'asthme :\n• Asthme T2-high (éosinophilique/allergique) : IL-4/IL-5/IL-13 dominantes → répondeur aux CSI et aux biothérapies anti-T2. Biomarqueurs : éosinophiles ≥ 150/µL, IgE totales élevées, FeNO ≥ 25 ppb.\n• Asthme T2-low (neutrophilique) : IL-8/IL-17 → moins répondeur aux CSI → souvent lié au tabagisme et à l'obésité → cible : azithromycine (hors AMM).\n• Asthme à éosinophiles à début tardif (non-atopique) : adultes, éosinophiles sanguins élevés sans sensibilisation allergénique → cible : anti-IL-5.",
    pharmacocinetique: "Dépôt pulmonaire des inhalateurs — facteurs clés :\n• Taille des particules MMAD 1–5 µm pour atteindre les bronches distales.\n• pMDI (aérosol-doseur) : nécessite coordination main-bouche, MMAD ~3–5 µm. Avec chambre d'inhalation : ↓ impact oro-pharyngé de 80 %.\n• DPI (poudre sèche) : nécessite débit inspiratoire ≥ 30 L/min (Turbuhaler® ≥ 60 L/min). Inutilisable en crise sévère.\n• Budésonide : T½ plasmatique 2–3 h, fort métabolisme hépatique CYP3A4. Formotérol : T½ = 10 h.",
    cas_clinique: "Femme 35 ans, asthme allergique aux acariens. Sous fluticasone 250 µg/j + salbutamol à la demande (4 prises/semaine). IgE totales 450 UI/mL. Éosinophiles sanguins 0,8 G/L. 3 exacerbations en 6 mois. Que proposez-vous ?\n\nRaisonnement : asthme non contrôlé palier 3 GINA → step-up palier 4 (CSI forte dose + LABA). Si toujours insuffisant → asthme sévère : bilan phénotypique. Profil T2-high (IgE élevées + éosinophiles ≥ 300/µL) → biothérapie : omalizumab (anti-IgE) ou mépolizumab (anti-IL-5). Discuter switch vers stratégie SMART (Symbicort® fond + secours).",
    effets_secondaires: [
      {label:"Freinage corticotrope (CSI forte dose > 800 µg FP/j au long cours)", niveau:"danger"},
      {label:"Ostéoporose (CSI + corticoïdes systémiques répétés — surveiller densitométrie)", niveau:"warning"},
      {label:"Infections respiratoires basses ↑ (biothérapies anti-IL-5 — légère augmentation)", niveau:"warning"},
      {label:"Syndrome de Churg-Strauss (EGPA) lors de la réduction des corticoïdes sous biothérapie (rare)", niveau:"danger"},
    ],
    classes: [
      {classe:"Anti-IgE (asthme T2-high allergique)", dci:["Omalizumab SC/2–4 sem"], specialites:["Xolair®"], couleur:"#991B1B", remarque:"IgE totales 30–1500 UI/mL + sensibilisation prouvée. Dose calculée selon poids et IgE. Réduction exacerbations 25–50 %"},
      {classe:"Anti-IL-5 (asthme T2 éosinophilique)", dci:["Mépolizumab 100mg SC/4sem","Benralizumab 30mg SC","Reslizumab IV"], specialites:["Nucala®","Fasenra®","Cinqaero®"], couleur:"#6B2D5E", remarque:"Éosinophiles sanguins ≥ 300/µL — réduction exacerbations 50–70 %"},
      {classe:"Anti-IL-4Rα (asthme T2 + DA ou rhinite)", dci:["Dupilumab SC/2 sem"], specialites:["Dupixent®"], couleur:"#1E3A5F", remarque:"AMM asthme sévère T2-high — bloque IL-4 ET IL-13. Éosinophiles ≥ 150/µL ou FeNO ≥ 25 ppb"},
    ],
    interactions: [
      "Ritonavir (inhibiteur CYP3A4 puissant) + fluticasone inhalée : syndrome de Cushing iatrogène décrit — éviter l'association",
      "Théophylline + macrolides ou fluoroquinolones : ↑ [théophylline] → fenêtre thérapeutique étroite → dosage sérique impératif",
      "Formotérol + tocolytiques (ritodrine) : potentialisation des effets β-adrénergiques",
    ],
    points_cles: [
      "Phénotype T2-high (éosinophiles ≥ 150/µL + IgE élevées + FeNO ≥ 25 ppb) → biothérapie si asthme sévère réfractaire",
      "Chambre d'inhalation obligatoire avec pMDI chez l'enfant < 6 ans et le sujet âgé (coordination impossible)",
      "Technique Turbuhaler® : toujours charger à la verticale, ne jamais souffler dans l'embout avant inhalation",
      "ACT ≤ 19/25 = asthme non contrôlé → step-up thérapeutique systématique",
      "GINA 2024 : SABA seul n'est plus recommandé à aucun palier (remplacé par CSI/formotérol)",
    ],
  },
  n4: {
    saviez_vous: "Le plan d'action personnalisé écrit (PAA) est l'outil le plus coûts-efficace en asthme : il réduit les hospitalisations de 40 % et les visites aux urgences de 30 %. Pourtant, seulement 30 % des patients asthmatiques en possèdent un en France.",
    physiopatho: "Remodelage bronchique irréversible : en l'absence de traitement de fond, l'inflammation chronique induit une hypertrophie des glandes muqueuses, une hyperplasie des cellules caliciformes, un épaississement de la membrane basale (collagène IV et fibronectine), une angiogenèse et une hypertrophie du muscle lisse. Ce remodelage est partiellement prévenu par un CSI débuté précocement, mais jamais complètement réversible — d'où l'importance du diagnostic et du traitement précoces.",
    recommandations: "GINA 2024 : révision majeure — stratégie AIR (Anti-Inflammatory Reliever). Tous paliers : CSI/formotérol (Symbicort® 100/6 µg) utilisé comme fond ET comme secours. Palier 3–4 : CSI fort dose + LABA. Palier 5 : biothérapies + add-on tézépélumab (tous phénotypes), tiotropium (palier 4–5).\n\nANSM 2023 : renforcement des informations sur les risques des LABA en monothérapie (CI absolue sans CSI).",
    situations_complexes: "Grossesse : continuer absolument le CSI (bénéfice >>> risque — asthme mal contrôlé = risque périnatal majeur). Budésonide a le plus de données de sécurité en grossesse. SABA utilisable. LABA si nécessaire. Biothérapies : données limitées — discussion au cas par cas.\n\nSujet âgé : comorbidités CV → SABA avec précaution (tachycardie, hypokaliémie). Vérifier systématiquement que les β-bloquants cardiaques co-prescrits ne sont pas contre-indiqués → contacter le prescripteur.\n\nSportif de haut niveau : déclaration AMA obligatoire pour les CSI inhalés > seuil TUE (Therapeutic Use Exemption).\n\nAsthme du travail : interroger sur l'exposition professionnelle (isocyanates, farine, latex) — cause curable si éviction.",
    effets_secondaires: [
      {label:"Crise d'asthme aiguë grave (DEP < 50 % + pas de réponse SABA) → SAMU 15", niveau:"danger"},
      {label:"Syndrome de Cushing iatrogène (CSI forte dose + inhibiteurs CYP3A4 puissants)", niveau:"danger"},
      {label:"Anaphylaxie à omalizumab : 0,1 % — administration en milieu médicalisé obligatoire, surveillance 30 min", niveau:"danger"},
      {label:"Tézépélumab : réactions injection, pharyngite (10–15 %)", niveau:"info"},
    ],
    classes: [
      {classe:"Tézépélumab (anti-TSLP) — tous phénotypes", dci:["Tézépélumab 210mg SC/4 sem"], specialites:["Tezspire®"], couleur:"#991B1B", remarque:"AMM 2023 — asthme sévère non contrôlé tous phénotypes (T2-high ET T2-low). 1er anti-alarmine disponible"},
      {classe:"Tiotropium (anti-cholinergique LAMA)", dci:["Tiotropium 2,5µg/bouffée"], specialites:["Spiriva Respimat® 2,5µg"], couleur:"#B45309", remarque:"AMM asthme adulte palier 4–5 (add-on CSI + LABA insuffisant). Bronchodilatation complémentaire 24 h"},
      {classe:"Azithromycine (asthme neutrophilique — hors AMM)", dci:["Azithromycine 250mg 3×/sem"], specialites:["Zithromax®"], couleur:"#6B2D5E", remarque:"Hors AMM — efficace dans l'asthme T2-low neutrophilique sévère (propriétés anti-inflammatoires propres des macrolides)"},
    ],
    interactions: [
      "β-bloquants cardiosélectifs (bisoprolol) : à éviter si alternative disponible — bronchospasme possible même cardiosélectif",
      "AINS / aspirine : CI si AERD (Aspirin-Exacerbated Respiratory Disease = asthme + polypose + intolérance aspirine)",
      "Omalizumab : aucune interaction médicamenteuse connue (anticorps monoclonal — catabolisme protéique)",
    ],
    points_cles: [
      "GINA 2024 : SABA seul = plus recommandé — CSI/formotérol comme fond ET secours (stratégie AIR/SMART)",
      "Vérifier β-bloquants (y compris collyres) à chaque délivrance : timolol, cartéolol, bétaxolol = CI dans l'asthme",
      "DEP zone rouge (< 50 % du meilleur) sans réponse SABA → appeler le SAMU 15",
      "Plan d'action personnalisé écrit (PAA) : remettre à chaque asthmatique — réduit hospitalisations de 40 %",
      "Biothérapies : numéro de lot à tracer + déclaration pharmacovigilance ANSM si effet inattendu",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F3 — CONSTIPATION
   ════════════════════════════════════════════════════════ */
FN['constipation'] = {
  n2: {
    saviez_vous: "La fréquence normale des selles varie de 3/jour à 3/semaine — une grande variabilité interindividuelle normale. Les laxatifs osmotiques (macrogol) sont les seuls validés en traitement prolongé sans risque de dépendance ni de déséquilibre électrolytique. Le lactulose cause plus de ballonnements que le macrogol car il est fermenté par les bactéries coliques.",
    physiopatho: "Deux mécanismes principaux :\n1. Constipation de transit (côlon paresseux) : hypomotilité colique → temps de transit allongé (> 72 h) → absorption excessive d'eau → selles dures et peu fréquentes. Causes : sédentarité, médicaments (opioïdes, anticholinergiques, inhibiteurs calciques, fer, antidépresseurs tricycliques), déshydratation.\n2. Trouble de la défécation (dyssynergie ano-rectale) : défaut de relaxation du sphincter externe à la poussée → blocage mécanique malgré un transit normal. Biorétroaction (biofeedback) = traitement de choix pour cette forme.",
    mecanisme: "Macrogol (PEG 4000) : polymère hydrophile de haut poids moléculaire → non absorbé → retient l'eau dans la lumière intestinale par effet osmotique → ramollissement des selles. Pas de fermentation bactérienne → pas de ballonnements. Sûr au long cours.\n\nLactulose : disaccharide non absorbable → fermenté par les bactéries coliques → acides organiques + CO2 + H2 → ballonnements fréquents. Délai d'action 24–48 h.\n\nBisacodyl / séné : stimulent les terminaisons nerveuses entériques → ↑ contractions propulsives + ↓ absorption d'eau colique. Effet en 6–12 h. Usage strict ≤ 10 jours (risque de mélanose colique bénigne + dépendance fonctionnelle).\n\nPsyllium (ispaghul) : mucilage soluble → gonfle au contact de l'eau → ↑ volume du bol fécal → stimulation péristaltique mécanique. Un grand verre d'eau obligatoire.",
    diagnostic: "Critères de Rome IV : < 3 selles/semaine + ≥ 1 symptôme (selles dures, efforts de poussée, sensation d'évacuation incomplète, temps excessif) depuis ≥ 6 mois. Signes d'alarme → coloscopie : sang dans les selles, amaigrissement, anémie, constipation récente et progressive > 50 ans, ATCD familial CCR.",
    effets_secondaires: [
      {label:"Ballonnements, flatulences (lactulose > macrogol)", niveau:"info"},
      {label:"Crampes abdominales (laxatifs stimulants)", niveau:"warning"},
      {label:"Hypokaliémie sévère (stimulants au long cours + diurétiques)", niveau:"danger"},
      {label:"Obstruction œsophagienne (psyllium sans eau suffisante)", niveau:"danger"},
      {label:"Fécalome (psyllium + constipation sévère non diagnostiquée)", niveau:"danger"},
    ],
    classes: [
      {classe:"PEG / Macrogol — 1ère intention", dci:["Macrogol 4000","Macrogol 3350 + électrolytes"], specialites:["Forlax®","Movicol®","Transipeg®"], couleur:"#1B6B52", remarque:"Movicol® contient des électrolytes → pas de déséquilibre même au long cours. 2–4 sachets/j"},
      {classe:"Stimulants de contact — usage court", dci:["Bisacodyl 5–10mg","Sénoside A+B (séné)","Picosulfate sodique"], specialites:["Dulcolax®","Tamarine®","Picolax®"], couleur:"#B45309", remarque:"MAX 10 jours — mélanose colique si usage prolongé (réversible à l'arrêt du traitement)"},
      {classe:"Fibres solubles — confort", dci:["Psyllium blond (ispaghul)"], specialites:["Métamucil®","Spagulax®","Psylia®"], couleur:"#1E3A5F", remarque:"1 grand verre d'eau à chaque prise — CI si constipation sévère ou transit très ralenti (↑ risque fécalome)"},
    ],
    interactions: [
      "Bisacodyl + lait ou antiacides : dissolution prématurée du comprimé gastro-résistant → crampes abdominales violentes",
      "Psyllium + digoxine, lithium, warfarine : réduction de l'absorption — espacer d'au moins 2 heures",
      "Lactulose + antibiotiques (néomycine) : réduction de la fermentation bactérienne → perte d'efficacité",
    ],
    points_cles: [
      "Macrogol = 1ère intention adulte et enfant — seul validé au long cours sans risque de dépendance",
      "Signes d'alarme (sang, amaigrissement, anémie) → ne jamais traiter sans coloscopie préalable",
      "Psyllium = CI si constipation sévère ou transit très ralenti (risque aggravation ou fécalome)",
      "Médicaments constipants à chercher systématiquement : opioïdes, anticholinergiques, inhibiteurs calciques, fer, tricycliques",
      "Dyssynergie ano-rectale : ni macrogol ni stimulants n'aident → seul le biofeedback est efficace",
    ],
  },
  n3: {
    saviez_vous: "La constipation induite par les opioïdes (OIC) est un effet classe : tous les opioïdes la causent car les récepteurs µ intestinaux (absent de la BHE) ralentissent le transit. Les PAMORA (méthylnaltrexone, naloxégol) bloquent spécifiquement les µ périphériques sans lever l'analgésie centrale — une avancée thérapeutique majeure en soins palliatifs.",
    physiopatho: "Transport épithélial intestinal : la sécrétion d'eau dans la lumière intestinale dépend des canaux Cl⁻ (CFTR, ClC-2) et du cotransporteur Na⁺/K⁺/2Cl⁻ (NKCC1) à la membrane basolatérale. Dans la constipation sécrétoire (rare), ces canaux sont inhibés. Dans la constipation opioïde, les récepteurs µ sur les neurones entériques inhibent la libération d'acétylcholine → ↓ péristaltisme, ↑ tonus sphinctérien, ↓ sécrétion intestinale.\n\nLe prucalopride est un agoniste sélectif 5-HT4 : active les neurones sérotoninergiques entériques → libération d'acétylcholine → ↑ contractions propagées du côlon → transit accéléré.",
    pharmacocinetique: "Macrogol 4000 : non absorbé (PM > 4000 Da), transit complet en 12–72 h selon dose et sujet. Aucun métabolisme. Aucune interaction médicamenteuse directe.\n\nBisacodyl : prodrogue → hydrolyse par les estérases coliques et bactériennes → désacétyl-bisacodyl (actif). Absorption systémique < 5 %, élimination urinaire sous forme de glucuronide. Ne pas associer à des antiacides (dissolution prématurée).\n\nPrucalopride : Tmax = 2–3 h, T½ = 24 h, élimination rénale 65 % inchangée. Dose : 2 mg/j adulte (1 mg/j si IR sévère ou sujet âgé).",
    cas_clinique: "Patient 72 ans, cancer du côlon opéré, sous morphine orale LP 60 mg/j pour douleurs. Constipation sévère (0–1 selle/semaine) malgré macrogol 4 sachets/j + bisacodyl 10 mg/soir. Que proposez-vous ?\n\nRaisonnement : constipation induite par les opioïdes (OIC) réfractaire aux laxatifs classiques → mécanisme spécifique (récepteurs µ intestinaux) → PAMORA. Méthylnaltrexone SC (Relistor®) : AMM OIC en soins palliatifs si laxatifs insuffisants. Ne franchit pas la BHE → analgésie centrale préservée. Dose : 8–12 mg SC selon poids. Effet rapide (4 h).",
    effets_secondaires: [
      {label:"Prucalopride : céphalées les premiers jours (transitoires, régressent spontanément)", niveau:"info"},
      {label:"Méthylnaltrexone : douleurs abdominales, diarrhée (mécanisme d'action)", niveau:"warning"},
      {label:"Linaclotide : diarrhée dose-dépendante — CI enfant < 18 ans", niveau:"warning"},
      {label:"Naloxégol + kétoconazole : CI — inhibition CYP3A4 → ↑ absorption systémique naloxégol", niveau:"danger"},
    ],
    classes: [
      {classe:"Prucalopride (agoniste 5-HT4 sélectif)", dci:["Prucalopride 2mg/j"], specialites:["Resolor®"], couleur:"#1B6B52", remarque:"AMM constipation chronique si ≥ 2 laxatifs classiques insuffisants. Pas de risque cardiaque (sélectivité 5-HT4 ++) contrairement à la cisapride"},
      {classe:"Linaclotide (agoniste GC-C)", dci:["Linaclotide 290µg/j"], specialites:["Constella®"], couleur:"#1E3A5F", remarque:"AMM SII-C et constipation chronique — active la guanylate cyclase C entérocytaire → ↑ sécrétion Cl⁻ et eau dans la lumière"},
      {classe:"PAMORA (anti-µ périphériques)", dci:["Méthylnaltrexone SC","Naloxégol 25mg oral","Naldemédine 0,2mg"], specialites:["Relistor®","Moventig®","Rizmoic®"], couleur:"#6B2D5E", remarque:"OIC uniquement — ne franchit pas la BHE → analgésie centrale préservée. Méthylnaltrexone : action en 4 h"},
    ],
    interactions: [
      "Prucalopride + médicaments allongeant le QT : risque théorique très faible (sélectivité 5-HT4 élevée) — surveiller si cardiopathie",
      "Naloxégol + inhibiteurs CYP3A4 forts (kétoconazole, clarithromycine) : CI — absorption systémique massiquement augmentée",
      "Linaclotide : aucune interaction médicamenteuse connue (action purement locale intestinale)",
    ],
    points_cles: [
      "Prucalopride : agoniste 5-HT4 sélectif → pas de risque cardiaque (≠ cisapride retirée pour torsades de pointes)",
      "Linaclotide : active GC-C → ↑ GMPc → ↑ CFTR → sécrétion Cl⁻/eau → mécanisme sécrétoire intestinal",
      "PAMORA : mécanisme ciblé sur l'OIC — inutile en constipation fonctionnelle sans opioïdes",
      "Canal ClC-2 intestinal : cible de la lubiprostrone (non disponible en France — information pour mémoire)",
      "Probiotiques (Lactobacillus rhamnosus GG, Bifidobacterium) : réduction de la durée de transit de 24–30 h (méta-analyse 2021)",
    ],
  },
  n4: {
    saviez_vous: "Le fécalome est une urgence médicale souvent méconnue chez le sujet âgé institutionnalisé. Il peut se présenter paradoxalement par une 'diarrhée par regorgement' — des selles liquides passant autour d'un bouchon dur — conduisant à tort à arrêter les laxatifs. L'extraction manuelle douce reste la principale solution d'urgence.",
    physiopatho: "Axe cerveau-intestin dans la constipation chronique : la constipation fonctionnelle chronique implique un dysfonctionnement de l'axe entérique-central. La sérotonine (95 % produite dans le tractus digestif) régule le péristaltisme via les récepteurs 5-HT4 (prokinétiques) et 5-HT3 (sécrétoires). Une dysbiose intestinale (↓ Bifidobacterium, ↑ certains Firmicutes) est associée aux constipations sévères. La sensibilisation viscérale (SII-C) implique les afférences TRPV1 — cible du linaclotide qui réduit aussi la douleur abdominale.",
    recommandations: "HAS / ESCP 2020 : algorithme constipation fonctionnelle adulte. Palier 1 : hygiène de vie (fibres alimentaires 25 g/j, hydratation 1,5 L/j, activité physique) + macrogol si insuffisant. Palier 2 : stimulants en cure courte (≤ 10 j). Palier 3 : prucalopride si ≥ 2 laxatifs insuffisants. Bilan spécialisé si réfractaire (transit colique aux marqueurs, test d'expulsion ballonnet). SFED 2021 : coloscopie si signes d'alarme ou > 50 ans avec changement récent du transit.",
    situations_complexes: "Grossesse : macrogol (non absorbé → sûr). Bisacodyl et séné : données limitées — cures courtes acceptables si nécessaire aux 2e et 3e trimestres. ÉVITER paraffine (↓ absorption vitamines liposolubles dont vit K → risque hémorragique néonatal).\n\nSujet âgé : risque de fécalome → prévenir par macrogol en entretien systématique si immobilisation ou opioïdes. Éviter laxatifs stimulants au long cours.\n\nOncologie sous opioïdes : association systématique macrogol + bisacodyl dès l'introduction des opioïdes (protocole). Si OIC persistant → PAMORA.\n\nEnfant : macrogol 0,2–0,8 g/kg/j (Forlax® pédiatrique ou Movicol Enfant®). Lactulose acceptable < 6 ans.",
    effets_secondaires: [
      {label:"Fécalome sujet âgé → diarrhée par regorgement (piège diagnostic) → extraction manuelle + lavement", niveau:"danger"},
      {label:"Hypokaliémie profonde (laxatifs stimulants au long cours + diurétiques) → arythmies cardiaques", niveau:"danger"},
      {label:"Hyponatrémie (lavement au phosphate chez l'insuffisant rénal) — ne pas utiliser en IRC", niveau:"danger"},
      {label:"Dépendance psychologique aux laxatifs (constipation fonctionnelle chronique ancienne)", niveau:"warning"},
    ],
    classes: [
      {classe:"Macrogol 3350 + électrolytes (référence long cours)", dci:["Macrogol 3350 + NaCl + KCl + NaHCO3"], specialites:["Movicol®","Klean-Prep® (coloscopie)"], couleur:"#1B6B52", remarque:"Movicol® : électrolytes → aucun déséquilibre ionique même au long cours. Idéal sujet âgé, IRC, grossesse"},
      {classe:"Naldemédine (PAMORA oral)", dci:["Naldemédine 200µg/j"], specialites:["Rizmoic®"], couleur:"#6B2D5E", remarque:"AMM OIC adulte — 1 comprimé/j. T½ = 11 h. Substrat CYP3A4 → interactions à vérifier"},
      {classe:"Méthylcellulose (fibre semi-synthétique)", dci:["Méthylcellulose"], specialites:["Citrucel® — non disponible France, référence internationale"], couleur:"#555", remarque:"Information comparative : fibre soluble non fermentescible → pas de ballonnements (avantage vs psyllium)"},
    ],
    interactions: [
      "Macrogol + lithium : ne pas administrer simultanément en préparation coloscopique (dilution → ↓ lithémie transitoire)",
      "Bisacodyl + digitaliques + diurétiques : risque d'hypokaliémie cumulée → surveillance ECG et ionogramme",
      "Psyllium + warfarine : réduction de l'absorption — espacer de 2 h — surveiller INR (interactions non prévisibles)",
    ],
    points_cles: [
      "Constipation iatrogène : chercher systématiquement opioïdes, anticholinergiques, inhibiteurs calciques, fer, antidépresseurs tricycliques",
      "Macrogol = seul laxatif validé en traitement long cours sans déséquilibre électrolytique ni dépendance",
      "PAMORA : uniquement si constipation induite par les opioïdes — inefficace en constipation fonctionnelle",
      "Fécalome sujet âgé : urgence médicale — extraire manuellement puis prévenir par macrogol en entretien",
      "Éducation patient : normalité de 3 selles/j à 3/semaine — dédramatiser, expliquer l'importance de l'hydratation et de l'activité physique",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F4 — DIABÈTE TYPE 2
   ════════════════════════════════════════════════════════ */
FN['diabete-type-2'] = {
  n2: {
    saviez_vous: "Les SGLT2 (gliflozines) ont une propriété inattendue : leur bénéfice cardiovasculaire et rénal est largement indépendant de l'effet glycémique. L'empagliflozine réduit de 38 % la mortalité cardiovasculaire et de 35 % les hospitalisations pour insuffisance cardiaque (EMPA-REG OUTCOME, NEJM 2015) — chez des patients avec HbA1c pourtant déjà contrôlée.",
    physiopatho: "L'octet omineux de DeFronzo : le DT2 implique 8 mécanismes simultanés :\n1. Insulinorésistance musculaire : les GLUT4 ne transloquent plus vers la surface cellulaire → glucose reste en circulation.\n2. Insulinorésistance hépatique : néoglucogenèse maintenue malgré l'hyperinsulinémie.\n3. Dysfonction des cellules β : apoptose progressive → au diagnostic DT2, 50 % des cellules β sont déjà perdues.\n4. Incrétinopathie : ↓ sécrétion de GLP-1 et GIP après les repas → ↑ glucagon inadapté → hyperglycémie postprandiale.\n5. ↑ Réabsorption rénale du glucose (↑ SGLT2 dans le DT2) → maintien de l'hyperglycémie malgré la glycosurie.",
    mecanisme: "Metformine : inhibe le complexe 1 de la chaîne respiratoire mitochondriale → ↑ ratio AMP/ATP → activation AMPK → ↓ expression des enzymes gluconéogéniques hépatiques (PEPCK, G6Pase). Pas d'effet sur la sécrétion d'insuline → pas d'hypoglycémie en monothérapie.\n\nSGLT2 inhibiteurs (dapagliflozine, empagliflozine) : inhibent le cotransporteur Na⁺/glucose SGLT2 dans le tubule proximal rénal → ~70 g/j de glucose éliminé dans les urines → ↓ glycémie + ↓ pression artérielle (natriurèse osmotique) + ↓ poids + cardioprotection et néphroprotection indépendantes.\n\nGLP-1 analogues (liraglutide, sémaglutide) : se lient au récepteur GLP-1 → ↑ insulinosécrétion glucose-dépendante + ↓ glucagon + ralentissement vidange gastrique + ↓ appétit → perte de poids 5–15 %.",
    diagnostic: "HbA1c ≥ 6,5 % (48 mmol/mol) à 2 reprises, ou glycémie à jeun ≥ 1,26 g/L à 2 reprises, ou glycémie ≥ 2 g/L + symptômes. Objectif HbA1c : 7 % (53 mmol/mol) en général, 6,5 % si récent + longue espérance de vie, 8–9 % si sujet âgé fragile ou hypoglycémies fréquentes.",
    effets_secondaires: [
      {label:"Acidose lactique (metformine) — très rare si CI respectées (ClCr < 30 = CI)", niveau:"danger"},
      {label:"Hypoglycémies sévères (sulfamides, insuline) — risque vital — plan d'action resucrage", niveau:"danger"},
      {label:"Infections génitales mycosiques (SGLT2) — 10–15 % des femmes", niveau:"warning"},
      {label:"Nausées, vomissements (GLP-1) — fréquents au début, régressent en 4–8 semaines", niveau:"info"},
      {label:"Acidocétose euglycémique (SGLT2) — rare, glycémie < 2,5 g/L + cétonémie élevée — urgence", niveau:"danger"},
    ],
    classes: [
      {classe:"Metformine — 1ère intention toujours", dci:["Metformine 500–2000mg/j"], specialites:["Glucophage®","Stagid® (libération prolongée, mieux toléré)"], couleur:"#1B6B52", remarque:"CI si DFG < 30, alcool, injection iode (suspendre 48 h avant/après), anesthésie générale"},
      {classe:"SGLT2 inhibiteurs — 2ème ligne + protection CV/rénale", dci:["Dapagliflozine 10mg","Empagliflozine 10–25mg","Canagliflozine 100–300mg"], specialites:["Forxiga®","Jardiance®","Invokana®"], couleur:"#1E3A5F", remarque:"Dapagliflozine : AMM IC + IRC + DT2. Empagliflozine : meilleure évidence CV (EMPA-REG). CI si DFG < 30"},
      {classe:"GLP-1 analogues — perte de poids + glycémie", dci:["Liraglutide 1,2–1,8mg SC/j","Sémaglutide 0,5–1mg SC/sem","Sémaglutide 7–14mg oral/j"], specialites:["Victoza®","Ozempic®","Rybelsus®"], couleur:"#6B2D5E", remarque:"Rybelsus® oral : prise à jeun 30 min avant repas avec ≤ 120 mL d'eau — conditions strictes ou efficacité nulle"},
    ],
    interactions: [
      "Metformine + produit de contraste iodé : suspendre 48 h avant et 48 h après → risque d'acidose lactique si IRA",
      "Sulfamides + AINS, fluconazole, IEC : potentialisation de l'hypoglycémie (déplacement protéique + inhibition métabolisme)",
      "SGLT2 + diurétiques de l'anse + AINS : triple whammy rénal → risque d'IRA — surveiller créatinine et PA",
    ],
    points_cles: [
      "HbA1c = moyenne des glycémies sur 3 mois (demi-vie des GR) — objectif personnalisé selon profil et comorbidités",
      "Metformine : arrêt obligatoire si DFG < 30, alcool, injection iode, chirurgie sous AG",
      "SGLT2 : donner à tout DT2 avec IC ou IRC (bénéfice prouvé indépendant de la glycémie)",
      "GLP-1 : triple bénéfice — glycémie + poids + pression artérielle",
      "Sulfamides : identifier les patients à risque d'hypoglycémie (sujet âgé, IRC, repas sauté, alcool)",
    ],
  },
  n3: {
    saviez_vous: "Le tirzépatide (Mounjaro®) est le premier double agoniste GIP/GLP-1 approuvé — il entraîne une perte de poids jusqu'à 20–22 % du poids corporel dans les essais SURMOUNT (obésité), surpassant tous les traitements antérieurs. Les essais SURPASS ont montré une supériorité sur le sémaglutide en HbA1c et en perte de poids dans le DT2.",
    physiopatho: "Glucotoxicité et lipotoxicité sur les cellules β : l'hyperglycémie chronique génère des espèces réactives de l'oxygène (ROS) via la chaîne respiratoire mitochondriale → activation des caspases → apoptose des cellules β. Les acides gras saturés activent les TLR4 (toll-like receptor 4) des cellules β → NF-κB → cytokines pro-inflammatoires → apoptose. Cette double toxicité explique la progressivité inéluctable du DT2 et la nécessité d'intensifier le traitement au fil des années.",
    pharmacocinetique: "Metformine : Tmax = 1,5–3 h, liaison protéique nulle, aucun métabolisme hépatique (éliminée inchangée par voie rénale, T½ = 1,5–4,5 h plasmatique). CI si DFG < 30 (accumulation → acidose lactique).\n\nEmpagliflozine : Tmax = 1,5 h, liaison protéique 86 %, glucuronidation hépatique (UGT1A3/2B7), T½ = 12,4 h. Efficacité glycémique réduite si DFG < 60 (moins de glucose filtré) mais bénéfice CV et rénal maintenu jusqu'à DFG 20 mL/min.\n\nSémaglutide SC : T½ = 168 h (7 jours) → injection hebdomadaire. Liaison albumine 99 % + modification de la lysine 26 → résistance à la DPP-4. Sémaglutide oral (Rybelsus®) : biodisponibilité avec SNAC (excipient absorbeur) ~1–2 % — très sensible à l'eau, aux aliments, aux médicaments.",
    cas_clinique: "Patient 58 ans, DT2 depuis 10 ans. HbA1c = 8,2 %. IMC = 32 kg/m². Sous metformine 2 g/j + gliclazide 60 mg/j. Insuffisance cardiaque FEVG 35 % (IC-FEr). Que proposez-vous ?\n\nRaisonnement : HbA1c non contrôlée + IC-FEr → indication forte d'un SGLT2 (dapagliflozine ou empagliflozine — AMM IC + DT2). Ajouter au schéma actuel. Ne pas augmenter le gliclazide (risque hypoglycémie + pas de bénéfice CV). Discuter remplacement du gliclazide par SGLT2 pour simplifier. L'IC-FEr avec DFG > 20 justifie un SGLT2 même sans déséquilibre glycémique.",
    effets_secondaires: [
      {label:"Acidocétose diabétique euglycémique (SGLT2) — glycémie < 2,5 g/L + cétonémie → piège diagnostique", niveau:"danger"},
      {label:"Gangrène de Fournier (SGLT2) — très rare mais signalé ANSM — consulter en urgence si douleur périnéale", niveau:"danger"},
      {label:"Amputations membres inférieurs ↑ (canagliflozine > autres SGLT2 — CANVAS trial) — surveillance vasculaire", niveau:"warning"},
      {label:"Lithiase biliaire (GLP-1 — ralentissement vidange vésiculaire, cholestase) — surveillance si facteurs de risque", niveau:"warning"},
    ],
    classes: [
      {classe:"Tirzépatide (double agoniste GIP + GLP-1)", dci:["Tirzépatide 5–10–15mg SC/sem"], specialites:["Mounjaro®"], couleur:"#991B1B", remarque:"AMM DT2 2023 (France) + obésité (en cours). Perte de poids > sémaglutide. Essais SURPASS. Injection stylo pré-rempli"},
      {classe:"DPP-4 inhibiteurs (gliptines) — neutres sur le poids", dci:["Sitagliptine 100mg","Vildagliptine 50mg×2","Saxagliptine 5mg"], specialites:["Januvia®","Galvus®","Onglyza®"], couleur:"#B45309", remarque:"Augmentent la T½ du GLP-1 endogène. Neutres sur le poids. Saxagliptine : signal IC (ne pas utiliser si IC)"},
      {classe:"Insuline dégludec/liraglutide (association fixe)", dci:["Insuline dégludec + Liraglutide"], specialites:["Xultophy®"], couleur:"#6B2D5E", remarque:"1 injection/j. Moins de prise de poids qu'insuline seule. Associe protection basale + effet GLP-1"},
    ],
    interactions: [
      "SGLT2 + insuline ou sulfamides : réduire doses insuline/sulfamides de 20–30 % pour prévenir hypoglycémie",
      "Saxagliptine + kétoconazole (CYP3A4 fort) : ↑ AUC saxagliptine × 2,5 → réduire à 2,5 mg/j",
      "Metformine + topiramate : risque d'acidose métabolique (double inhibition de l'anhydrase carbonique)",
    ],
    points_cles: [
      "EMPA-REG OUTCOME : empagliflozine → -38 % mortalité CV, -35 % hospitalisations IC — bénéfice indépendant de la glycémie",
      "LEADER : liraglutide → -13 % MACE, -22 % mortalité cardiovasculaire",
      "Tirzépatide : double agoniste GIP/GLP-1 → perte de poids jusqu'à 22 % (essais SURMOUNT obésité)",
      "Acidocétose euglycémique SGLT2 : piège car glycémie normale alors que les corps cétoniques sont élevés",
      "Metformine + DFG 30–60 : réduire à 1–1,5 g/j et surveiller créatinine tous les 6 mois",
    ],
  },
  n4: {
    saviez_vous: "La substitution d'une insuline biosimilaire est INTERDITE en France sans accord explicite du prescripteur (arrêté du 13 novembre 2017). Contrairement aux médicaments génériques, les insulines biosimilaires ne sont pas substituables automatiquement en officine — le pharmacien doit mentionner explicitement le biosimilaire sur l'ordonnance avec l'accord du médecin.",
    physiopatho: "Contre-régulation glycémique : en dessous de 0,7 g/L, l'hypothalamus déclenche une réponse adrénergique (glucagon, adrénaline → tachycardie, sueurs, tremblements = signaux d'alerte). En dessous de 0,5 g/L, la neuroglycopénie commence (confusion, convulsions, coma). Attention : les β-bloquants masquent les signes adrénergiques MAIS PAS les signes neuroglycopéniques → hypoglycémie silencieuse chez le coronarien traité.",
    recommandations: "HAS 2024 — DT2 : metformine en 1ère intention maintenue. Choix du 2e antidiabétique guidé par :\n• Maladie cardiovasculaire athérosclérotique → GLP-1 (liraglutide, sémaglutide) ou SGLT2\n• Insuffisance cardiaque ou IRC (DFG 20–60) → SGLT2 (dapagliflozine ou empagliflozine)\n• Surpoids/obésité → GLP-1 ou tirzépatide\n• Risque hypoglycémie → DPP-4 ou SGLT2 (éviter sulfamides).\nANSM 2023 : renforcement des informations sur la cétoacidose euglycémique sous SGLT2 — suspendre 3–4 jours avant toute chirurgie ou jeûne prolongé.",
    situations_complexes: "Grossesse (DG) : insuline uniquement (NPH + rapide ou analogues lispro/asparte). Metformine : traversée placentaire, non recommandée en 1ère intention en France. Arrêt de tous les ADO avant conception sauf discussion cas par cas.\n\nChirurgie : metformine arrêtée 48 h avant (risque IRA per-opératoire). SGLT2 arrêtés 3–4 jours avant (cétoacidose euglycémique). GLP-1 arrêtés 1 semaine avant chirurgie élective (vidange gastrique ralentie → risque d'inhalation).\n\nJeûne (Ramadan) : sulfamides → risque hypoglycémie → réévaluer avec médecin. SGLT2 et GLP-1 : moins à risque. Décaler la metformine au repas du soir (Iftar).",
    effets_secondaires: [
      {label:"Hypoglycémie sévère : glucagon 1 mg IM ou glucagon nasal (Baqsimi®) — former les proches", niveau:"danger"},
      {label:"SGLT2 : suspendre avant chirurgie, jeûne prolongé, accouchement → cétoacidose euglycémique sinon", niveau:"danger"},
      {label:"GLP-1 + chirurgie digestive (vidange ralentie) : risque inhalation → arrêter 1 semaine avant", niveau:"danger"},
      {label:"Myopathie statines (fréquemment associées en DT2) — surveiller créatine kinase si douleurs musculaires", niveau:"warning"},
    ],
    classes: [
      {classe:"Glucagon nasal (urgence hypoglycémique)", dci:["Glucagon 3mg poudre nasale"], specialites:["Baqsimi®"], couleur:"#C0392B", remarque:"AMM hypoglycémie sévère — plus simple que l'injection IM → à délivrer et expliquer aux proches du patient"},
      {classe:"Sémaglutide oral", dci:["Sémaglutide 3–7–14mg/j"], specialites:["Rybelsus®"], couleur:"#1B6B52", remarque:"Conditions strictes : à jeun, avec ≤ 120 mL d'eau, 30 min avant tout médicament ou aliment. Non respect → perte d'efficacité totale"},
      {classe:"Insulines biosimilaires", dci:["Glargine biosimilaire","Lispro biosimilaire"], specialites:["Abasaglar®","Admelog®","Semglee®"], couleur:"#1E3A5F", remarque:"Substitution automatique INTERDITE en France (arrêté 2017) — mention obligatoire du biosimilaire sur l'ordonnance avec accord médecin"},
    ],
    interactions: [
      "Metformine + alcool : ↑ risque acidose lactique par augmentation de la production hépatique de lactate",
      "Sulfamides + miconazole (gel buccal) : CI absolue — inhibition CYP2C9 → hypoglycémie sévère (interaction documentée)",
      "SGLT2 + diurétiques de l'anse + AINS : triple whammy rénal (IRA) — surveiller créatinine et ionogramme",
    ],
    points_cles: [
      "Resucrage hypoglycémie : 15 g glucides rapides (3 morceaux de sucre ou 150 mL jus orange) → contrôle à 15 min → répéter si glycémie < 0,7 g/L",
      "Baqsimi® (glucagon nasal) : former systématiquement les proches — disponible sans ordonnance depuis 2021",
      "SGLT2 : suspendre 3–4 jours avant chirurgie, accouchement ou jeûne prolongé — signal ANSM 2023",
      "Biosimilaires insuline : non substituables automatiquement — écrire le nom du biosimilaire sur l'ordonnance avec accord médecin",
      "Automesure glycémique : expliquer les cibles (à jeun 0,8–1,3 g/L, 2 h post-prandial < 1,8 g/L) et la technique",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F5 — DOULEUR ARTHROSIQUE
   ════════════════════════════════════════════════════════ */
FN['douleur-arthrose'] = {
  n2: {
    saviez_vous: "La kinésithérapie et la perte de poids sont aussi efficaces que les AINS sur la douleur d'arthrose du genou (méta-analyses Cochrane). Perdre 5 kg réduit les symptômes de l'arthrose du genou d'environ 50 % — chaque kilogramme perdu réduit la charge sur le genou de 4 kg à chaque pas.",
    physiopatho: "L'arthrose est une défaillance de l'articulation entière : cartilage, os sous-chondral, synoviale et ligaments sont tous atteints.\n1. Déséquilibre anabolisme/catabolisme : ↑ métalloprotéases matricielles (MMP-1, MMP-3, MMP-13) → dégradation du collagène II et de l'aggrécane dans la matrice extracellulaire.\n2. Inflammation synoviale (synovite) : macrophages synoviaux → IL-1β et TNF-α → amplification de la dégradation cartilagineuse → épanchements articulaires douloureux.\n3. Remodelage de l'os sous-chondral : sclérose (éburnation) + ostéophytes (bec de perroquet) formés par la production anormale d'os en bordure articulaire.",
    mecanisme: "Paracétamol : mécanisme central — inhibition des voies descendantes sérotoninergiques (inhibition de la recapture de 5-HT dans la corne postérieure) + modulation des endocannabinoïdes. Analgésique sans effet anti-inflammatoire cliniquement significatif.\n\nAINS (ibuprofène, naproxène, diclofénac) : inhibition compétitive réversible des COX-1 et COX-2 → ↓ PGE2 (sensibilisation des nocicepteurs) et PGI2 (vasodilatatrice). COX-1 protège la muqueuse gastrique → son inhibition → risque ulcéreux.\n\nCoxibs (célécoxib, étoricoxib) : inhibition sélective COX-2 → même analgésie sans inhibition COX-1 → meilleure tolérance gastrique MAIS ↓ PGI2 vasculaire sans ↓ TXA2 plaquettaire → risque cardiovasculaire augmenté.",
    diagnostic: "Radiographie standard : réduction de l'interligne articulaire, ostéophytes, condensation sous-chondrale, géodes. Peu de corrélation radio-clinique (pas obligatoirement douloureux même si radio très abîmée). Score de Kellgren-Lawrence (0–4). IRM si suspicion de pathologie associée (ménisque, nécrose).",
    effets_secondaires: [
      {label:"Hépatotoxicité paracétamol si > 4 g/j, alcool, dénutrition ou inducteurs CYP2E1", niveau:"danger"},
      {label:"Ulcère gastrique + hémorragie digestive (AINS COX-1) — IPP systématique si > 65 ans", niveau:"danger"},
      {label:"IRA (AINS) : ↓ PGE2 rénale → ↓ vasodilatation afférente — CI si DFG < 30, IC, déshydratation", niveau:"danger"},
      {label:"Risque cardiovasculaire (coxibs, AINS sélectifs) — CI si ATCD infarctus ou AVC", niveau:"danger"},
    ],
    classes: [
      {classe:"Paracétamol — 1ère intention", dci:["Paracétamol 500mg–1g"], specialites:["Doliprane®","Efferalgan®","Dafalgan®"], couleur:"#1B6B52", remarque:"Max 4 g/j (3 g/j si sujet âgé ou alcoolisme). Souvent sous-dosé en pratique : 1 g × 4/j si besoin"},
      {classe:"AINS topiques — pour arthrose superficielle", dci:["Diclofénac gel 1%","Kétoprofène gel 2,5%"], specialites:["Voltarène Emulgel®","Ketum gel®"], couleur:"#1E3A5F", remarque:"Efficaces arthrose genou et main. Kétoprofène : CI exposition solaire sur la zone (photosensibilisation)"},
      {classe:"Duloxétine — composante centrale", dci:["Duloxétine 60mg/j"], specialites:["Cymbalta®"], couleur:"#6B2D5E", remarque:"AMM douleurs musculo-squelettiques chroniques — IRSNA → renforce les voies descendantes inhibitrices. Alternative si CI aux AINS"},
    ],
    interactions: [
      "AINS + anticoagulants (warfarine, AOD) : ↑ risque hémorragie digestive — éviter ou IPP systématique + surveillance",
      "AINS + IEC/sartans + diurétiques : triple whammy → IRA (CI si IRC ou déshydratation)",
      "Paracétamol + warfarine forte dose (≥ 4 cp/j pendant plusieurs jours) : ↑ INR — surveiller",
    ],
    points_cles: [
      "Paracétamol 1 g × 4/j = dose analgésique maximale — souvent sous-dosé en pratique officinale",
      "AINS = réservés aux poussées inflammatoires uniquement — cure ≤ 10 jours, toujours avec un repas",
      "Triple whammy rénal : AINS + IEC/ARA2 + diurétique = CI formelle — surveiller créatinine",
      "Coxibs : meilleure tolérance gastrique mais CI absolue si ATCD cardiovasculaire (infarctus, AVC)",
      "Kétoprofène gel : éviter l'exposition solaire sur la zone traitée (photosensibilisation possible)",
    ],
  },
  n3: {
    saviez_vous: "La glucosamine et la chondroïtine sont des agents anti-arthrosiques symptomatiques d'action lente (AASAL). Le délai d'action est de 3–6 mois — le patient doit être prévenu pour éviter l'abandon prématuré. L'essai GAIT (NEJM 2006, n=1583) a montré un bénéfice de l'association glucosamine + chondroïtine dans les arthoses modérées-sévères, mais pas légères.",
    physiopatho: "Sensibilisation centrale dans la douleur chronique arthrosique : la stimulation nociceptive prolongée provoque un 'wind-up' → sensibilisation des neurones de la corne postérieure (récepteurs NMDA activés, substance P libérée) → allodynie et hyperalgésie centrales. Cette composante centrale justifie l'utilisation de la duloxétine et explique pourquoi les AINS seuls sont insuffisants dans les formes sévères.\n\nFacteurs de progression : obésité (↑ stress mécanique + adipokines pro-inflammatoires — leptine, adiponectine), génétique (mutations du collagène II), désaxation mécanique (genu varum/valgum).",
    pharmacocinetique: "Ibuprofène : Tmax = 1–2 h, T½ = 1,8–2 h (action rapide mais courte → 3–4 prises/j), métabolisme CYP2C9. Adapté à la douleur aiguë.\n\nNaproxène : T½ = 12–17 h → 2 prises/j → meilleure observance dans la douleur chronique. Mais accumulation possible si IR → surveiller.\n\nCélécoxib : Tmax = 3 h, T½ = 11 h, métabolisme CYP2C9 (attention polymorphisme : métaboliseurs lents CYP2C9*3 → ↑ exposition × 4). Éliminé principalement par fèces (57 %).",
    cas_clinique: "Patient 72 ans, gonarthrose sévère. Sous ibuprofène 400 mg × 3/j depuis 3 mois. DFG = 45 mL/min, sous lisinopril 10 mg + furosémide 40 mg. Que faites-vous ?\n\nRaisonnement : triple whammy rénal (AINS + IEC + diurétique) → CI formelle chez ce patient avec IRC modérée. Arrêt immédiat des AINS. Alternatives : paracétamol 1 g × 4/j. Discuter avec le médecin : infiltration intra-articulaire (triamcinolone ou acide hyaluronique) ou duloxétine 60 mg/j si composante centrale. Surveillance créatinine.",
    effets_secondaires: [
      {label:"Thrombose artérielle (coxibs, AINS COX-2 forts) — risque infarctus du myocarde", niveau:"danger"},
      {label:"AINS + asthme à l'aspirine (AERD) : bronchospasme — CI tous inhibiteurs COX-1", niveau:"danger"},
      {label:"Célécoxib + fluconazole (CYP2C9 inhibiteur fort) : ↑ AUC célécoxib × 2 — réduire dose de moitié", niveau:"warning"},
      {label:"Gastrotoxicité AINS : risque relatif ulcère × 3–5 — IPP obligatoire si âge > 65 ans", niveau:"danger"},
    ],
    classes: [
      {classe:"AASAL — glucosamine + chondroïtine", dci:["Glucosamine 1500mg/j","Chondroïtine sulfate 800mg/j"], specialites:["Dolenio®","Structum®"], couleur:"#1B6B52", remarque:"Délai d'action 3–6 mois — prévenir le patient. Bénéfice modeste mais réel dans arthrose modérée-sévère. Non remboursés"},
      {classe:"Acide hyaluronique IA — viscosupplémentation", dci:["Acide hyaluronique IA"], specialites:["Synvisc®","Durolane®","Ostenil®"], couleur:"#1E3A5F", remarque:"1–5 injections IA genou. Bénéfice à 3–6 mois. EULAR recommande si AINS insuffisants ou CI"},
      {classe:"Corticoïdes IA — poussées inflammatoires", dci:["Triamcinolone 40mg IA","Méthylprednisolone 40mg IA"], specialites:["Hexatrione®","Depo-Medrol®"], couleur:"#B45309", remarque:"Soulagement rapide (1–2 semaines). MAX 3–4 infiltrations/an — ↑ dégradation cartilagineuse si trop fréquentes"},
    ],
    interactions: [
      "Naproxène + méthotrexate (polyarthrite rhumatoïde) : déplacement protéique → ↑ [MTX] → toxicité hématologique",
      "AINS + lithium : ↓ clairance rénale lithium → ↑ lithémie → toxicité (surveiller lithémie à 7 j)",
      "Kétoprofène gel + fluoroquinolones ou tétracyclines topiques : ↑ risque photodermatite",
    ],
    points_cles: [
      "Naproxène T½ longue (12–17 h) → 2 prises/j = meilleure observance pour la douleur arthrosique chronique",
      "AASAL (glucosamine, chondroïtine) : délai 3–6 mois → informer le patient pour éviter l'abandon prématuré",
      "Infiltration IA : max 3–4/an par articulation — risque d'accélération arthrosique si trop fréquente",
      "Sensibilisation centrale → duloxétine 60 mg/j : réduction douleur et catastrophisation dans l'arthrose sévère réfractaire",
      "Célécoxib + métaboliseurs lents CYP2C9 : exposition augmentée — commencer à dose faible",
    ],
  },
  n4: {
    saviez_vous: "Le surdosage en paracétamol est la 1ère cause d'hépatite aiguë médicamenteuse en France (plus de 500 hépatites sévères/an). L'antidote spécifique est la N-acétylcystéine IV (Fluimucil® injectable) selon le nomogramme de Rumack-Matthew — efficace uniquement dans les 24 h suivant l'ingestion.",
    physiopatho: "Modèle biopsychosocial de la douleur chronique : la douleur arthrosique chronique dépasse le simple mécanique. Les facteurs psychologiques (catastrophisation, kinésiophobie = peur du mouvement) et sociaux (isolement, sédentarité, chômage) amplifient la perception douloureuse via les voies descendantes facilitatrices. La dépression est présente dans 30–40 % des cas d'arthrose sévère. L'entretien motivationnel est aussi important que le traitement pharmacologique.",
    recommandations: "EULAR 2019 + ACR 2019 — Arthrose : paracétamol en 1ère intention (1 g × 4/j si besoin). AINS topiques > AINS systémiques pour les articulations superficielles. AINS systémiques : cures courtes si insuffisant. Glucosamine/chondroïtine recommandés par ESCEO (guidelines européens) si symptômes persistants. Duloxétine recommandée par ACR comme alternative si CI aux AINS. Opioïdes forts : non recommandés dans l'arthrose (balance bénéfice/risque défavorable).",
    situations_complexes: "CI aux AINS — alternatives selon profil :\n• IRC (DFG < 30) : paracétamol + infiltrations IA\n• ATCD cardiovasculaire : paracétamol, duloxétine — éviter tous AINS y compris célécoxib\n• Anticoagulation : paracétamol seul (risque hémorragique AINS +++)\n• Sujet âgé > 75 ans : éviter AINS systémiques (liste de Beers) — préférer AINS topiques\n• AERD (asthme à l'aspirine) : célécoxib utilisable (COX-2 sélectif) — débuter prudemment.",
    effets_secondaires: [
      {label:"Surdosage paracétamol → insuffisance hépatocellulaire fulminante → transplantation ou décès — orienter urgences même si asymptomatique", niveau:"danger"},
      {label:"Hémorragie digestive AINS : IPP obligatoire si > 65 ans ou ATCD ulcéreux ou anticoagulants", niveau:"danger"},
      {label:"Kétoprofène gel : photodermatite sévère (prudence — ANSM mise en garde)", niveau:"warning"},
      {label:"Tramadol + ISRS : syndrome sérotoninergique — surveiller si association", niveau:"danger"},
    ],
    classes: [
      {classe:"N-acétylcystéine IV (antidote surdosage paracétamol)", dci:["N-acétylcystéine"], specialites:["Fluimucil® injectable 200mg/mL"], couleur:"#C0392B", remarque:"Antidote spécifique paracétamol — efficace si < 10–24 h selon nomogramme Rumack-Matthew. Orienter en urgences"},
      {classe:"Tramadol (palier 2 — arthrose sévère réfractaire)", dci:["Tramadol LP 100–200mg/j"], specialites:["Topalgic LP®"], couleur:"#B45309", remarque:"CI épilepsie, IMAO. Interaction avec ISRS (syndrome sérotoninergique). Durée limitée. Risque dépendance (liste II)"},
      {classe:"Capsaïcine crème (analgésie locale)", dci:["Capsaïcine 0,025–0,075%"], specialites:["Zostrix®","Axsain®"], couleur:"#6B2D5E", remarque:"Épuise la substance P locale → analgésie. Brûlures initiales (prévenir le patient). Arthrose superficielle (main, genou)"},
    ],
    interactions: [
      "Paracétamol + isoniazide ou rifampicine (inducteurs CYP2E1) : ↑ NAPQI (métabolite toxique) → hépatotoxicité dès doses normales",
      "Tramadol + IMAO : CI absolue — syndrome sérotoninergique potentiellement fatal",
      "Célécoxib + furosémide + IEC : surveiller PA et créatinine — interaction pharmacodynamique (↓ effet diurétique et antihypertenseur)",
    ],
    points_cles: [
      "Entretien motivationnel : perte de 5–10 % du poids réduit la douleur de genou de 50 % — priorité non médicamenteuse",
      "IPP systématique si AINS + âge > 65 ans ou ATCD ulcéreux ou anticoagulants (recommandation HAS)",
      "Surdosage paracétamol : urgences même si asymptomatique — l'antidote est efficace seulement dans les premières 24 h",
      "Signal ANSM kétoprofène gel : informer systématiquement sur la photoprotection (protéger la zone 2 semaines après l'arrêt)",
      "Duloxétine 60 mg/j : alternative validée si CI aux AINS — efficacité sur la composante centrale de la douleur chronique",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F6 — ECZÉMA ATOPIQUE (DERMATITE ATOPIQUE)
   ════════════════════════════════════════════════════════ */
FN['eczema-atopique'] = {
  n2: {
    saviez_vous: "La règle du FTU (Finger Tip Unit) est l'outil clé pour doser les dermocorticoïdes : 1 FTU = la quantité de crème allant du bout du doigt à la première phalange = 0,5 g = couvre 2 paumes de main. Beaucoup de patients sous-dosent leurs dermocorticoïdes par crainte — c'est souvent la principale cause d'échec.",
    physiopatho: "Modèle 'outside-in' + 'inside-out' :\n• Déficit de la barrière cutanée : mutations du gène FLG (filaggrine) → réduction des céramides, acides gras libres et NMF (facteur naturel d'hydratation) → ↑ TEWL (perte en eau transépidermique) → peau sèche, craquelée, perméable aux allergènes et microbes.\n• Activation Th2 : cellules de Langerhans et dendritiques dermiques capturent les allergènes → activation LT CD4+ Th2 → IL-4, IL-13 (commutation IgE + ↑ mucus), IL-5 (éosinophiles), IL-31 (prurit +++).\n• Staphylococcus aureus : colonise 90 % des lésions de DA vs 20 % des sujets sains → entérotoxines staphylococciques = superantigènes → amplification Th2 → cercle vicieux inflammation–prurit–grattage.",
    mecanisme: "Dermocorticoïdes (DC) : classés en 4 niveaux (classe I = très forte → classe IV = faible en nomenclature française). Liaison aux récepteurs intracytoplasmiques GR → translocation nucléaire → transrépression de NF-κB → ↓ IL-4, IL-5, IL-13, IL-31, TNF-α → réduction de l'inflammation, du prurit et de l'épaississement cutané. La puissance dépend de la molécule ET de la formulation (pommade > crème > lotion > spray).\n\nTacrolimus (Protopic®) et pimécrolimus (Elidel®) : inhibiteurs topiques de la calcineurine (ICT). Bloquent la phosphatase calcineurine → aucune déphosphorylation de NFAT → pas de transcription d'IL-2, IL-4, IL-13. Avantage majeur sur les DC : pas d'atrophie cutanée → indiqués sur le visage et les plis.",
    diagnostic: "Critères de Hanifin et Rajka (simplifiés) : prurit + topographie caractéristique (plis de flexion chez l'adulte, visage et convexités chez l'enfant) + chronicité/récidives + antécédents atopiques. SCORAD > 50 = forme sévère, > 25 = modérée. Score EASI (Eczema Area and Severity Index) utilisé dans les essais cliniques.",
    effets_secondaires: [
      {label:"Atrophie cutanée, vergetures, télangiectasies (DC forts au long cours sur zones à risque)", niveau:"danger"},
      {label:"Surinfection cutanée (impétiginisation) — DC masquent les signes infectieux", niveau:"warning"},
      {label:"Syndrome de sevrage cortisonique cutané (Topical Steroid Withdrawal — TSW) si arrêt brutal après long cours", niveau:"warning"},
      {label:"Brûlures initiales tacrolimus (régressent en 1–2 semaines) — prévenir le patient", niveau:"info"},
      {label:"Conjonctivite (dupilumab) — 10–20 % des patients", niveau:"warning"},
    ],
    classes: [
      {classe:"DC classe IV (faible) — visage, plis, nourrisson", dci:["Hydrocortisone 1%","Désonide 0,05%"], specialites:["Hydrocortisone Bailleul®","Locapred®","Tridésonit®"], couleur:"#1B6B52", remarque:"Usage visage et plis uniquement — durée < 7 jours sur visage nourrisson"},
      {classe:"DC classe II (fort) — tronc et membres adulte", dci:["Bétaméthasone 0,05%","Mométasone 0,1%"], specialites:["Diprosone®","Elocom®"], couleur:"#B45309", remarque:"Pommade plus efficace que crème sur peau très sèche ou lichénifiée"},
      {classe:"ICT topiques — visage et plis sans atrophie", dci:["Tacrolimus 0,03% (enfant)","Tacrolimus 0,1% (adulte)","Pimécrolimus 1%"], specialites:["Protopic® 0,03 et 0,1%","Elidel®"], couleur:"#1E3A5F", remarque:"Pas d'atrophie cutanée → choix de référence sur visage et plis. Brûlures initiales : informer"},
    ],
    interactions: [
      "Tacrolimus topique + inhibiteurs CYP3A4 (kétoconazole oral) : absorption systémique tacrolimus augmentée si peau lésée étendue",
      "Dupilumab + vaccins vivants atténués : déconseillé — vacciner avant l'initiation si possible",
      "DC puissants + collyres cortisonés : risque cumulatif de glaucome et cataracte — surveiller la pression intraoculaire",
    ],
    points_cles: [
      "Règle d'or : émollient QUOTIDIEN sur toute la surface corporelle, même en phase calme (fondement du traitement de fond)",
      "FTU (Finger Tip Unit) : 1 phalangette = 0,5 g = couvre 2 paumes — enseigner systématiquement",
      "Puissance DC adaptée à la zone : jamais DC classe I ou II sur le visage ou les plis d'un nourrisson",
      "Tacrolimus/pimécrolimus = choix de référence sur visage et plis pour éviter l'atrophie cutanée",
      "Surinfection staphylococcique : croûtes mielleuses + suintement + érythème → médecin (antibiotiques ± DC)",
    ],
  },
  n3: {
    saviez_vous: "Le dupilumab (Dupixent®) cible le récepteur IL-4Rα commun aux voies IL-4 et IL-13 — en bloquant un seul récepteur, il inhibe simultanément deux cytokines clés de la voie Th2. Les essais SOLO 1&2 montrent une amélioration EASI-75 (≥ 75 % de réduction du score) chez 36–38 % des patients vs 8–10 % sous placebo.",
    physiopatho: "Endotypes immunologiques de la DA :\n• DA T2-high (80–90 % des adultes caucasiens) : IgE élevées, Th2 dominante (IL-4/IL-13/IL-31). Répondeur aux CSI topiques et aux biothérapies anti-T2.\n• DA adultes asiatiques et formes sévères : composante Th17/IL-22 plus importante → épaississement cutané marqué (lichénification).\n• DA adultes à début tardif (non-atopique) : moins d'IgE, davantage de Th1/Th22 → moins répondeur au dupilumab (profil intermédiaire).",
    pharmacocinetique: "Absorption transdermique des DC : varie selon la région anatomique (scrotum × 40, avant-bras × 1, paume × 0,83 par rapport au ventre). Augmente × 10 si peau lésée, × 10–100 sous occlusion, et significativement chez le nourrisson (↑ rapport surface/poids). La pommade absorbe 2–3× plus que la crème.\n\nTacrolimus topique : absorption systémique < 0,5 ng/mL (infra-thérapeutique) dans les conditions d'utilisation normales. Demi-vie locale estimée à 72–96 h après arrêt.\n\nDupilumab (IgG4, anti-IL-4Rα) : SC. Tmax = 7 jours, T½ = 26 jours → injection toutes les 2 semaines. Élimination par catabolisme protéique (pas d'interactions CYP).",
    cas_clinique: "Femme 28 ans, DA depuis l'enfance. SCORAD = 55 (sévère). Sous DC classe II + tacrolimus, 2 cures de ciclosporine sans bénéfice durable. IgE totales 1200 UI/mL. Éosinophiles 0,9 G/L. Que proposez-vous ?\n\nRaisonnement : DA sévère réfractaire → critères AMM dupilumab (DA sévère + échec/CI aux immunosuppresseurs systémiques). Bilan pré-thérapeutique : NFS, bilan hépatique, sérologies parasitaires (éliminer helminthiases — IL-4/IL-13 protègent contre les helminthes). Initiation dupilumab : 600 mg SC en dose de charge (2 injections × 300 mg) puis 300 mg/2 semaines.",
    effets_secondaires: [
      {label:"Freinage axe HHA (DC forts grande surface chez nourrisson) — surveiller croissance et cortisol", niveau:"danger"},
      {label:"Glaucome et cataracte (DC péri-oculaires au long cours)", niveau:"danger"},
      {label:"Pustulose variceliforme de Kaposi (eczéma herpéticum) — urgence absolue : fièvre + vésicules + DA", niveau:"danger"},
      {label:"Dupilumab : arthralgies, réaction injection, alopécie (effluvium télogène décrit)", niveau:"info"},
    ],
    classes: [
      {classe:"Dupilumab (anti-IL-4Rα)", dci:["Dupilumab 300mg SC/2 sem"], specialites:["Dupixent®"], couleur:"#991B1B", remarque:"AMM DA sévère adulte + enfant ≥ 6 mois (doses adaptées). EASI-75 chez 35–50 % (essais SOLO). Remboursé si SCORAD ≥ 25 + échec immunosuppresseurs"},
      {classe:"Tralokinumab (anti-IL-13 sélectif)", dci:["Tralokinumab 300mg SC/2 sem"], specialites:["Adtralza®"], couleur:"#6B2D5E", remarque:"AMM DA sévère adulte — cible spécifiquement IL-13 (pas IL-4). Profil EI légèrement différent du dupilumab"},
      {classe:"JAK inhibiteurs topiques (ruxolitinib)", dci:["Ruxolitinib 1,5%"], specialites:["Opzelura®"], couleur:"#B45309", remarque:"AMM DA légère-modérée adulte — inhibe JAK1/JAK2 → voies IL-4/IL-13/IL-31. Action rapide sur le prurit (< 1 semaine)"},
    ],
    interactions: [
      "Dupilumab + helminthiases préexistantes : risque de réactivation (IL-4/IL-13 ont un rôle protecteur contre les helminthes) — dépistage parasitaire préalable",
      "Ruxolitinib topique + surface > 20 % du corps : absorption systémique → surveiller si immunodépression ou médicaments cytotoxiques",
      "Ciclosporine + kétoconazole ou érythromycine : ↑ [ciclosporine] (inhibition CYP3A4 / P-gp) → toxicité rénale",
    ],
    points_cles: [
      "SCORAD > 50 (sévère) + échec traitements locaux → éligibilité biothérapie — adresser au dermatologue",
      "Dupilumab : bloque IL-4Rα (commun à IL-4 et IL-13) → inhibition simultanée des 2 cytokines Th2 majeures",
      "Tralokinumab : sélectif IL-13 uniquement → profil légèrement différent (moins d'effet sur IL-4 = moins sur la commutation IgE)",
      "Ruxolitinib topique : efficacité rapide sur le prurit — avantage majeur sur les ICT (action en jours plutôt que semaines)",
      "Kaposi-Juliusberg (eczéma herpéticum) : urgence → aciclovir IV — ne jamais sous DC seuls (masque l'infection)",
    ],
  },
  n4: {
    saviez_vous: "Les JAK inhibiteurs oraux (upadacitinib, abrocitinib) ont fait l'objet d'une mise en garde renforcée de l'EMA en 2023 concernant les risques thrombo-emboliques et cardiovasculaires — une analyse de classe identique à celle des JAK inhibiteurs dans la polyarthrite rhumatoïde. Ils sont contre-indiqués chez les patients avec antécédents cardiovasculaires, thromboemboliques ou de cancer.",
    physiopatho: "Microbiome cutané et DA : en DA, la diversité du microbiome cutané est réduite avec colonisation prédominante par S. aureus (90 % vs 20 % en peau saine). S. aureus produit des entérotoxines (TSST-1, SEB) agissant comme superantigènes → activation polyclonale des LT → amplification Th2 → ↑ IL-31 (prurit) → grattage → ↑ colonisation → cercle vicieux. Des traitements expérimentaux ciblant le microbiome (Roseomonas mucosa vivant, bactériophages anti-S. aureus) sont en cours d'essai.",
    recommandations: "EADV 2022 — Directives DA : émollients = traitement de base permanent (pas négociable). DC = poussées par paliers. ICT = visage/plis en entretien ou comme traitement de fond. JAK topiques = alternative aux ICT. Biothérapies (dupilumab, tralokinumab) = DA modérée-sévère réfractaire. JAK oraux (upadacitinib, abrocitinib) = alternative après bilan pré-thérapeutique complet et en l'absence de CI.",
    situations_complexes: "Grossesse : émollients sans restriction. DC classe III-IV (faibles/moyens) : autorisés, surface limitée. DC puissants : éviter T1, surface limitée aux autres trimestres. Dupilumab : données insuffisantes → arrêt préférable si possible (discuter au cas par cas). Allaitement : DC locaux OK (pas d'absorption systémique significative) — éviter application sur le sein.\n\nNourrisson < 3 mois : DC et ICT contre-indiqués → émollients seuls. > 3 mois : hydrocortisone 1 % sur 7 jours max. ICT : pimécrolimus dès 3 mois, tacrolimus 0,03 % dès 2 ans.\n\nDA et vaccinations : dupilumab + vaccins vivants → vacciner avant l'initiation si possible (rappels possibles sous dupilumab selon avis infectiologue).",
    effets_secondaires: [
      {label:"JAK oraux (upadacitinib, abrocitinib) : ↑ risque thrombo-embolique, infections graves, cancers — CI ATCD cardiovasculaires", niveau:"danger"},
      {label:"Abrocitinib : thrombopénie (5–10 %) — surveiller NFS mensuelle les 3 premiers mois", niveau:"danger"},
      {label:"Azathioprine + allopurinol : CI absolue — inhibition TPMT → myélosuppression sévère", niveau:"danger"},
      {label:"Ciclosporine long cours : HTA, néphrotoxicité cumulative, risque néoplasique (lymphomes)", niveau:"danger"},
    ],
    classes: [
      {classe:"Upadacitinib (JAK1 sélectif oral)", dci:["Upadacitinib 15–30mg/j"], specialites:["Rinvoq®"], couleur:"#991B1B", remarque:"AMM DA sévère adulte + adolescent ≥ 12 ans. Efficacité > dupilumab sur certains scores. CI ATCD CV/thrombose/cancer. Bilan pré-Rx complet"},
      {classe:"Abrocitinib (JAK1 sélectif oral)", dci:["Abrocitinib 100–200mg/j"], specialites:["Cibinqo®"], couleur:"#6B2D5E", remarque:"Action rapide sur le prurit (1–2 semaines). Surveiller NFS (thrombopénie). CI ATCD thromboembolique"},
      {classe:"Némolizumab (anti-IL-31Rα)", dci:["Némolizumab SC"], specialites:["Nemluvio® (AMM EU 2024)"], couleur:"#B45309", remarque:"Cible IL-31 = cytokine clé du prurit → efficacité remarquable sur le prurit DA. Complément ou alternative si composante prurigineuse dominante"},
    ],
    interactions: [
      "Upadacitinib + inhibiteurs CYP3A4 puissants (kétoconazole, clarithromycine) : ↑ exposition → réduire à 15 mg max",
      "Abrocitinib + inducteurs P-gp (rifampicine, carbamazépine) : ↓ exposition → perte d'efficacité",
      "Azathioprine + allopurinol : CI absolue et formelle — accumulation de 6-TGN → aplasie médullaire sévère",
    ],
    points_cles: [
      "ETP (Éducation Thérapeutique du Patient) : enseigner la technique d'application DC (FTU), les signes de surinfection, le plan de soins par phases",
      "JAK inhibiteurs oraux : bilan pré-thérapeutique obligatoire (NFS, lipides, créatinine, sérologies) + suivi mensuel les 3 premiers mois",
      "Signal EMA 2023 : JAK inhibiteurs systémiques — risque CV et thrombo-embolique — CI absolue si ATCD",
      "Délivrance biothérapies (dupilumab) : traçabilité n° de lot obligatoire + information conjonctivite (EI fréquent)",
      "Azathioprine : tester le génotype TPMT avant la prescription pour identifier les patients à risque d'aplasie",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F7 — GASTRO-ENTÉRITE AIGUË
   ════════════════════════════════════════════════════════ */
FN['gastro-enterite'] = {
  n2: {
    saviez_vous: "Les sodas (cola, limonade) et les jus de fruits sont CONTRE-INDIQUÉS dans la GEA : leur osmolarité élevée (400–600 mOsm/L) aggrave la diarrhée osmotique au lieu de la traiter. Seul le SRO (osmolarité réduite 245 mOsm/L selon OMS 2003) utilise le cotransporteur Na⁺/glucose encore fonctionnel pendant l'infection pour réhydrater efficacement.",
    physiopatho: "Mécanismes selon l'agent :\n• Norovirus (Calicivirus) : se lie aux antigènes du groupe sanguin (HBGA) des entérocytes du grêle → destruction des villosités → malabsorption + sécrétion d'eau (diarrhée osmotique + sécrétoire). Dose infectieuse extrêmement faible : 18–100 particules.\n• Rotavirus : entérotoxine NSP4 → ↑ Ca²⁺ intracellulaire → activation de la PKC → sécrétion de Cl⁻ et H2O (mécanisme sécrétoire).\n• Bactéries entérotoxinogènes (ETEC, S. aureus) : toxines préformées → activation de l'AMPc ou GMPc → sécrétion massive d'eau sans destruction cellulaire.\n• Bactéries invasives (Salmonella, Shigella, Campylobacter) : invasion de la paroi colique → inflammation → diarrhée glairo-sanglante + fièvre.",
    mecanisme: "SRO : le cotransporteur SGLT1 (Na⁺/glucose) reste fonctionnel même lors de l'infection → pour chaque glucose absorbé, 2 Na⁺ et de l'eau entrent dans l'entérocyte → réhydratation active. Composition OMS (osmolarité réduite 2003) : Na 75 + K 20 + Cl 65 + glucose 75 + citrate 10 mmol/L.\n\nRacécadotril (thiorphan) : prodrogue → convertie en thiorphan par les estérases → inhibition de l'enképhalinase (néprylysine) → ↑ enképhalines endogènes → activation récepteurs δ-opioïdes des entérocytes → ↓ AMPc → ↓ sécrétion de Cl⁻. Ne touche pas à la motricité (≠ lopéramide) → pas de risque de rétention.\n\nLopéramide : agoniste µ-opioïde intestinal → ↓ motricité. CI si fièvre, selles sanglantes, enfant < 2 ans (risque de mégacôlon toxique si E. coli O157:H7 ou Shigella).",
    diagnostic: "Coproculture : uniquement si selles sanglantes + fièvre élevée, terrain immunodéprimé, TIAC, ou retour de zone endémique. Évaluation de la déshydratation chez l'enfant : score WHO (yeux excavés + pli cutané + altération conscience). Ionogramme + urémie si déshydratation modérée-sévère.",
    effets_secondaires: [
      {label:"Arythmie cardiaque fatale (lopéramide en surdosage — signal ANSM/EMA 2016 — ne pas dépasser 8 mg/j)", niveau:"danger"},
      {label:"Mégacôlon toxique (lopéramide + bactérie invasive ECEH / Shigella)", niveau:"danger"},
      {label:"Hyponatrémie iatrogène (SRO mal préparé ou eau pure sans sel chez nourrisson)", niveau:"danger"},
      {label:"Constipation rebond (lopéramide)", niveau:"info"},
    ],
    classes: [
      {classe:"SRO — priorité absolue", dci:["Glucose 13,5g + NaCl 2,6g + KCl 1,5g + citrate trisodique 2,9g / litre d'eau"], specialites:["Hydrigoz®","Picolyte®","Adiaril®","GES 45®"], couleur:"#1B6B52", remarque:"Seul traitement qui change le pronostic. 50 mL/kg en 4 h si déshydratation légère (OMS plan A). Continuer l'allaitement"},
      {classe:"Racécadotril — antisécrétoire (enfant + adulte)", dci:["Racécadotril 10mg (nourrisson)","30mg (enfant)","100mg (adulte)"], specialites:["Tiorfan®","Hidrasec®"], couleur:"#1E3A5F", remarque:"Réduit le volume des selles de 40 % sans ralentir le transit — pas de risque de rétention"},
      {classe:"Lopéramide — ralentisseur de transit (adulte uniquement)", dci:["Lopéramide 2mg"], specialites:["Imodium®","Arestal®"], couleur:"#B45309", remarque:"Adulte uniquement. CI absolue : fièvre + sang dans les selles + enfant < 2 ans + MICI. Max 8 mg/j (signal pharmacovigilance)"},
    ],
    interactions: [
      "Lopéramide + quinidine ou ritonavir (inhibiteurs P-gp) : ↑ concentration plasmatique lopéramide → passage BHE → dépression respiratoire",
      "Lopéramide + médicaments allongeant le QT (azithromycine, halopéridol) : arythmies à fortes doses — signal pharmacovigilance",
      "Diosmectite (Smecta®) + médicaments oraux (antibiotiques, antiépileptiques) : adsorption → espacer de 2 h minimum",
    ],
    points_cles: [
      "SRO = seul traitement modifiant le pronostic. Sodas, jus de fruits et eau pure = CONTRE-INDIQUÉS",
      "Norovirus : résiste aux gels hydro-alcooliques → lavage au savon liquide obligatoire (30 secondes minimum)",
      "Racécadotril = antisécrétoire sans effet sur la motricité → pas de risque de rétention → sûr chez l'enfant",
      "CI lopéramide si fièvre + selles sanglantes → suspecter bactérie invasive → médecin",
      "Critères d'hospitalisation nourrisson : vomissements incoercibles, déshydratation > 10 %, trouble de la conscience",
    ],
  },
  n3: {
    saviez_vous: "Le Syndrome Hémolytique et Urémique (SHU) est une complication redoutable d'une GEA à E. coli O157:H7 (ECEH). Les Shiga-toxines inhibent la synthèse protéique des cellules endothéliales rénales et cérébrales → triade : anémie hémolytique microangiopathique + thrombopénie + IRA. Le lopéramide et les antibiotiques AUGMENTENT le risque de SHU en favorisant la libération et l'absorption des toxines.",
    physiopatho: "Transport épithélial intestinal au niveau moléculaire :\n• Canal CFTR (Cl⁻) apical : activé par l'AMPc (toxine cholérique, ETEC LT) ou GMPc (ETEC ST) → sécrétion massive de Cl⁻ → eau suit par osmose → diarrhée sécrétoire profuse.\n• Cotransporteur SGLT1 : Na⁺/glucose couplé → non affecté par les toxines → base d'action des SRO.\n• SHU : Shiga-toxines Stx1 et Stx2 → liaison au récepteur Gb3 (globotriaosylcéramide) sur endothélium rénal et cérébral → inhibition ribosomale (EF-2) → apoptose cellulaire → microangiopathie thrombotique.",
    pharmacocinetique: "Racécadotril : Tmax = 1 h (adulte), biodisponibilité ~85 %. Métabolisé par estérases plasmatiques en thiorphan puis acide thiophanrique. T½ = 3 h. Pas de métabolisme CYP → très peu d'interactions. Pas de passage systémique significatif à doses thérapeutiques.",
    cas_clinique: "Nourrisson 8 mois, GEA depuis 24 h. 8 selles liquides/j, vomissements. Poids actuel 7,5 kg (poids de forme 8 kg). Yeux légèrement excavés, soif. Que faites-vous ?\n\nRaisonnement : déshydratation de 6,25 % (≈ 6 %) → modérée. OMS Plan B : SRO 75 mL/kg en 4 h = 75 × 8 = 600 mL. Puis maintien : 10 mL/kg après chaque selle liquide. Racécadotril nourrisson 10 mg × 3/j (réduire volume des selles). Pas de lopéramide (< 2 ans). Réévaluation à 4 h — si aggravation → hospitalisation.",
    effets_secondaires: [
      {label:"Syndrome de Reye (aspirine + infection virale) : CI formelle aspirine < 18 ans dans les infections virales", niveau:"danger"},
      {label:"SHU : surveiller NFS + créatinine si diarrhée sanglante + fièvre (ECEH O157:H7 suspectée)", niveau:"danger"},
      {label:"Hypernatrémie iatrogène (SRO mal préparé — trop concentré) → convulsions", niveau:"danger"},
    ],
    classes: [
      {classe:"Probiotiques validés (réduction durée diarrhée)", dci:["Saccharomyces boulardii","Lactobacillus rhamnosus GG"], specialites:["Ultralevure®","Lacteol Fort®","Pedialac®"], couleur:"#1B6B52", remarque:"Méta-analyse 2020 : réduction de 24–30 h de la durée. S. boulardii résistant aux antibiotiques (utile si GEA sous ATB)"},
      {classe:"Diosmectite (Smecta®)", dci:["Diosmectite 3g"], specialites:["Smecta®","Imosmect®"], couleur:"#1E3A5F", remarque:"Adsorbe les toxines et pathogènes — peut ↓ absorption des médicaments co-administrés (espacer de 2 h)"},
      {classe:"Zinc (OMS pays à ressources limitées)", dci:["Zinc élémentaire 10–20mg/j pendant 10–14j"], specialites:["Supplément zinc (non disponible en France sous cette forme)"], couleur:"#6B2D5E", remarque:"Recommandé OMS dans GEA < 5 ans — réduit sévérité et durée. Non pratiqué systématiquement en France"},
    ],
    interactions: [
      "Diosmectite + antibiotiques oraux : adsorption → espacer de 2 h (ampicilline, érythromycine, kétoconazole)",
      "Saccharomyces boulardii + fluconazole systémique : ↓ viabilité du probiotique (levure sensible aux antifongiques)",
      "Racécadotril + aucune interaction cliniquement significative connue (pas de métabolisme CYP)",
    ],
    points_cles: [
      "CFTR = cible des toxines entérotoxinogènes (choléra, ETEC) → activation → sécrétion massive d'eau par voie chlorure",
      "SHU : ne JAMAIS donner lopéramide ni antibiotiques si ECEH O157:H7 suspecté (↑ libération Shiga-toxines)",
      "Déshydratation 5 % = modérée (traitement SRO à domicile) / > 10 % = sévère (hospitalisation + réhydratation IV)",
      "OMS 2003 : formule SRO osmolarité réduite 245 mOsm/L (ancienne 311 mOsm/L) — réduit le risque d'hypernatrémie",
      "Norovirus : incubation 12–48 h, durée 1–3 jours, très contagieux — protocole isolement en EHPAD dès le 1er cas",
    ],
  },
  n4: {
    saviez_vous: "La Toxi-Infection Alimentaire Collective (TIAC) est à déclaration obligatoire dès 2 cas groupés (Article L3114-5 du CSP). Le pharmacien a un rôle d'alerte : si des clients signalent des troubles digestifs après un même repas ou un même aliment, il doit les orienter vers leur médecin ET signaler à l'ARS via le signalement en ligne SIGNALEMENT-SANTE.GOUV.FR.",
    physiopatho: "Virulence des agents entéropathogènes : dose infectieuse (Norovirus 18–100, ECEH 10–100, Salmonella 10⁵–10⁸), invasivité muqueuse (Shigella, Campylobacter, Yersinia — diarrhée glairo-sanglante + fièvre ≥ 38,5 °C), et capacité toxinogène (S. aureus entérotoxines préformées — début en 1–6 h après ingestion). L'augmentation des résistances aux fluoroquinolones chez Salmonella et Campylobacter (> 20 % en France 2024) change la stratégie antibiotique.",
    recommandations: "HAS / SFMG 2024 — GEA adulte : pas d'antibiotiques systématiques. Indications ATB limitées : diarrhée glairo-sanglante sévère + fièvre ≥ 38,5 °C (dysenterie) ET/OU terrain immunodéprimé ET/OU retour de zone endémique. Bactéries traitables : Campylobacter → azithromycine 500 mg/j × 3 j (résistances fluoroquinolones ++) / Shigella → azithromycine ou fluoroquinolone selon antibiogramme / ECEH O157:H7 → NO antibiotiques (↑ risque SHU).",
    situations_complexes: "EHPAD et collectivités : protocole TIAC → déclaration ARS obligatoire dès 2 cas. Cohorting des résidents malades. Renforcement hygiène mains (eau + savon — Norovirus résiste aux SHA). Désinfection surfaces au chlore 0,5 % (5000 ppm).\n\nGrossesse : Listeria monocytogenes → forme particulièrement grave (avortement, prématurité, méningite néonatale) → orientation urgences si fièvre + troubles digestifs en fin de grossesse. ATB : amoxicilline + gentamicine IV.\n\nImmunocompromis (VIH, greffés) : Cryptosporidium, Microsporidies → diarrhées prolongées + altération profonde. Nitazoxanide (Cryptosporidium) ou albendazole (Microsporidies). GEA à Salmonella → bactériémie fréquente → fluoroquinolone systémique.",
    effets_secondaires: [
      {label:"Lopéramide surdosage (Imodium Instant® — pris par poignées) : arythmie ventriculaire mortelle (signal EMA 2016)", niveau:"danger"},
      {label:"Déshydratation sévère non prise en charge : mortalité nourrisson et sujet âgé — urgence vitale", niveau:"danger"},
      {label:"Azithromycine + médicaments allongeant le QT : risque synergique — vérifier l'ECG si cardiopathie", niveau:"warning"},
    ],
    classes: [
      {classe:"Azithromycine (turista + Campylobacter)", dci:["Azithromycine 500mg/j × 3j"], specialites:["Zithromax®"], couleur:"#1B6B52", remarque:"1ère ligne diarrhée du voyageur + Campylobacter (résistances FQ > 60 % — Thaïlande, Inde). 1 g dose unique ou 500 mg × 3j"},
      {classe:"Rifaximine (turista légère-modérée sans fièvre)", dci:["Rifaximine 200mg × 3/j × 3j"], specialites:["Normix® (hors AMM diarrhée voyageur en France)"], couleur:"#1E3A5F", remarque:"Non absorbée → action locale intestinale uniquement. Pas de résistances significatives (concentration fécale élevée)"},
      {classe:"Vaccin anticholérique oral", dci:["Vibrio cholerae O1 inactivé + sous-unité B"], specialites:["Dukoral®"], couleur:"#6B2D5E", remarque:"2 doses avant départ. Protection croisée partielle contre ETEC (diarrhée du voyageur) — recommandé si voyage zones à risque"},
    ],
    interactions: [
      "Azithromycine + halopéridol, amiodarone, fluconazole : allongement QT cumulatif — CI si cardiopathie ou QT long",
      "Nitazoxanide + warfarine : déplacement protéique → ↑ INR — surveiller si association",
      "Dukoral® + méfloquine : espacer de 8 h (interférence possible sur la réponse immunitaire muqueuse)",
    ],
    points_cles: [
      "TIAC : déclaration obligatoire dès 2 cas groupés → signaler à l'ARS — rôle actif du pharmacien d'officine",
      "Lopéramide : ne délivrer que la boîte de 10 comprimés (jamais grande quantité) — fortes doses = arythmie",
      "Grossesse + fièvre + troubles digestifs = Listeria possible → orientation urgences obstétricales sans délai",
      "Résistances Campylobacter aux fluoroquinolones > 60 % en Asie → azithromycine en 1ère ligne si voyage",
      "Norovirus EHPAD : Javel 0,5 % pour les surfaces (SHA insuffisant) + isolement entérique dès le 1er cas",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F8 — HYPERTENSION ARTÉRIELLE
   ════════════════════════════════════════════════════════ */
FN['hypertension'] = {
  n2: {
    saviez_vous: "L'ESH 2023 a abandonné la stratégie de monothérapie initiale : les nouvelles recommandations préconisent une association fixe IEC (ou sartan) + amlodipine d'emblée si la PA > 140/90 mmHg. L'association améliore l'observance (1 comprimé au lieu de 2) et réduit les événements cardiovasculaires de 20 % vs la monothérapie.",
    physiopatho: "La PA = Débit cardiaque × Résistances périphériques totales (loi de Poiseuille). Dans l'HTA essentielle (95 % des cas) :\n• Activation du SRAA : rénine → angiotensine I → ECA → angiotensine II (puissant vasoconstricteur + stimule l'aldostérone → rétention NaCl et eau → ↑ volémie → ↑ PA).\n• Activation sympathique : ↑ norAdrénaline → vasoconstriction α₁ + ↑ FC β₁ + rétention sodée rénale.\n• Dysfonction endothéliale : ↓ NO (vasodilatateur produit par la NO-synthase endothéliale, eNOS) + ↑ endothéline-1 → rigidité artérielle.\n• Remodelage vasculaire : hypertrophie des CML artérielles → ↑ résistances fixes irréversibles.",
    mecanisme: "IEC (ramipril, périndopril) : inhibent l'enzyme de conversion → pas de production d'angiotensine II → vasodilatation + ↓ aldostérone (↓ rétention sodée). Accumulation de bradykinine (substrat de l'ECA) → vasodilatation supplémentaire → mais toux sèche (15 %) et rare angioœdème.\n\nSartans/ARA2 (losartan, valsartan) : bloquent spécifiquement les récepteurs AT1 → mêmes effets sans accumulation de bradykinine → pas de toux.\n\nInhibiteurs calciques-DHP (amlodipine) : bloquent les canaux Ca²⁺ voltage-dépendants de type L dans les CML vasculaires → ↓ Ca²⁺ intracellulaire → vasodilatation. T½ amlodipine = 35–50 h → 1 prise/j → couverture homogène 24 h.\n\nDiurétiques thiazidiques (indapamide) : inhibent le cotransporteur NCC (Na⁺-Cl⁻) dans le TCD → natriurèse → ↓ volémie → ↓ PA. Propriétés vasodilatatrices directes à long terme.",
    diagnostic: "Confirmation HTA : ≥ 3 mesures élevées sur ≥ 2 consultations séparées OU AMPA (règle des 3 : 3 mesures matin + 3 mesures soir pendant 3 jours consécutifs — moyenne des 18 mesures). MAPA = gold standard. Bilan initial : ECG, créatinine, ionogramme, bandelette urinaire, glycémie, bilan lipidique.",
    effets_secondaires: [
      {label:"Toux sèche rebelle (IEC) : 10–15 % — mécanisme bradykinine → switch obligatoire vers sartan", niveau:"warning"},
      {label:"Angioœdème (IEC et rare sartan) : urgence vitale — arrêt définitif + adrénaline si laryngé", niveau:"danger"},
      {label:"Hyperkaliémie (IEC/ARA2 + diurétiques épargneurs de K⁺ ou AINS)", niveau:"danger"},
      {label:"Œdèmes des chevilles (inhibiteurs calciques DHP — jusqu'à 20 % dose-dépendant)", niveau:"info"},
      {label:"Hypokaliémie + hypomagnésémie (thiazidiques — surveiller ionogramme)", niveau:"warning"},
    ],
    classes: [
      {classe:"IEC — protection cardiaque et rénale", dci:["Ramipril 2,5–10mg","Périndopril 5–10mg","Énalapril 5–20mg"], specialites:["Triatec®","Coversyl®","Renitec®"], couleur:"#1B6B52", remarque:"Ramipril : données morbi-mortalité solides (HOPE trial, -22 % décès CV). Périndopril : remboursé 65 %"},
      {classe:"ARA2/Sartans — si intolérance IEC", dci:["Losartan 50–100mg","Valsartan 80–320mg","Candesartan 8–32mg","Olmesartan 20–40mg"], specialites:["Cozaar®","Tareg®","Atacand®","Olmetec®"], couleur:"#1E3A5F", remarque:"Olmésartan : attention entéropathie (analogie maladie cœliaque — décrit). Candesartan : données IC solides"},
      {classe:"Associations fixes — ESH 2023 recommande d'emblée", dci:["Périndopril + amlodipine","Valsartan + HCT"], specialites:["Coveram®","Cotareg®"], couleur:"#6B2D5E", remarque:"1 comprimé/j → observance ↑. Coveram® 5/5 ou 10/5 ou 10/10 selon palier"},
    ],
    interactions: [
      "IEC/ARA2 + AINS (ibuprofène, naproxène) : ↓ effet antihypertenseur + risque IRA (triple whammy si diurétique ajouté)",
      "IEC/ARA2 + suppléments potassium ou diurétiques épargneurs K⁺ (spironolactone) : hyperkaliémie potentiellement grave",
      "Inhibiteurs calciques + jus de pamplemousse (CYP3A4) : ↑ [amlodipine] légère (cliniquement peu significatif)",
    ],
    points_cles: [
      "ESH 2023 : association fixe IEC/ARA2 + amlodipine d'emblée si PA > 140/90 — plus de monothérapie initiale",
      "AMPA règle des 3 : 3 mesures matin + 3 mesures soir, pendant 3 jours → moyenne des 18 mesures = diagnostic",
      "Toux IEC = certaine (bradykinine) → switch sartan immédiat, jamais de réintroduction de l'IEC",
      "AINS en automédication = ennemi n°1 de l'HTA : ↓ effet des antihypertenseurs + rétention sodée",
      "Angioœdème IEC : arrêt définitif + épinéphrine si atteinte laryngée → SAMU 15 immédiatement",
    ],
  },
  n3: {
    saviez_vous: "L'HTA résistante (PA > 140/90 malgré 3 antihypertenseurs dont un diurétique à doses optimales) touche 10–15 % des hypertendus traités. Avant d'ajouter un 4e médicament, il faut éliminer les causes d'HTA pseudo-résistante : mauvaise observance (70 % des cas !), HTA blouse blanche, effet AINS/réglisse/pilule, et HTA secondaire non diagnostiquée.",
    physiopatho: "HTA secondaire (5 % des HTA) — causes à reconnaître :\n• Hyperaldostéronisme primaire (Conn) : adénome ou hyperplasie surrénalienne → aldostérone autonome → rétention sodée + kaliurèse → HTA + hypokaliémie spontanée. Dépistage : ratio aldostérone/rénine plasmatiques (> 20 avec aldo > 150 pg/mL).\n• HTA rénovasculaire : sténose de l'artère rénale → ischémie rénale → activation SRAA → HTA. Soufflet abdominal + écho-Doppler.\n• Phéochromocytome : sécrétion catécholamines → HTA paroxystique + triade céphalées-sueurs-palpitations. Dosage métanéphrines urinaires / plasmatiques.\n• SAOS : hypoxémie intermittente nocturne + ↑ SNS → HTA nocturne (non-dipper à la MAPA).",
    pharmacocinetique: "Ramipril : prodrogue hydrolysée en ramiprilate (actif) par les estérases hépatiques et intestinales. T½ ramiprilate = 13–17 h → couverture 24 h. Élimination rénale 60 % → adapter si DFG < 30 (commencer à 1,25 mg).\n\nAmlodipine : T½ = 35–50 h (la plus longue des DHP) → 1 prise/j. Métabolisme hépatique CYP3A4 (important) → interactions avec inhibiteurs puissants. Liaison protéique 98 %. Effet antihypertenseur progressif (2–4 semaines pour l'effet maximal).\n\nIndapamide LP 1,5 mg : biodisponibilité 93 %, T½ = 14–24 h. Propriétés calcium-antagonistes vasculaires partielles → profil métabolique meilleur que HCT (moins d'effet sur glycémie, moins de dyslipidémie).",
    cas_clinique: "Patient 52 ans, HTA sous IEC + amlodipine depuis 2 ans. AMPA = 158/95 mmHg malgré observance vérifiée. Ionogramme : K⁺ = 3,1 mmol/L (hypokaliémie spontanée). Pas d'AINS, pas de réglisse. Quelle investigation ?\n\nRaisonnement : HTA + hypokaliémie spontanée → suspecter hyperaldostéronisme primaire (syndrome de Conn). Bilan : ratio aldostérone/rénine plasmatiques (rapport > 20 = positif). Si positif → TDM surrénales (adénome unilatéral = chirurgie, bilatéral = spironolactone). NE PAS ajouter un diurétique thiazidique sans éliminer ce diagnostic (aggraverait l'hypokaliémie).",
    effets_secondaires: [
      {label:"IRA bilatérale (IEC + sténose artère rénale bilatérale) — arrêt + urgences", niveau:"danger"},
      {label:"Indapamide : hyponatrémie (surtout sujet âgé + chaleur) — surveiller ionogramme", niveau:"danger"},
      {label:"Spironolactone : gynécomastie douloureuse homme (anti-androgène) → switch éplérénone", niveau:"warning"},
      {label:"HTA résistante aux antihypertenseurs sous AINS — interaction pharmacodynamique", niveau:"warning"},
    ],
    classes: [
      {classe:"Spironolactone (4e ligne — HTA résistante / hyperaldostéronisme)", dci:["Spironolactone 25–100mg"], specialites:["Aldactone®","Spironone®"], couleur:"#991B1B", remarque:"Antagoniste aldostérone → hyperkaliémie (surveiller K⁺ à J7 et J30) + gynécomastie. 4e ligne ESH 2023"},
      {classe:"Éplérénone (anti-MR sélectif)", dci:["Éplérénone 25–50mg"], specialites:["Inspra®"], couleur:"#B45309", remarque:"Sélectif récepteur minéralocorticoïde → moins de gynécomastie. AMM IC post-IDM (données mortalité)"},
      {classe:"Indapamide LP (diurétique à profil vasculaire)", dci:["Indapamide LP 1,5mg"], specialites:["Fludex LP®","Natrilix SR®"], couleur:"#1E3A5F", remarque:"Préféré à HCT : propriétés vasodilatatrices + profil métabolique plus favorable (diabète, dyslipidémie)"},
    ],
    interactions: [
      "Spironolactone + IEC/ARA2 : hyperkaliémie sévère (surtout si IRC) — surveiller K⁺ à J7 et J30",
      "Amlodipine + simvastatine > 20 mg : inhibition CYP3A4 intestinal → ↑ exposition simvastatine → myopathie (FDA warning)",
      "Clarithromycine + amlodipine : ↑ AUC amlodipine × 3 → hypotension symptomatique — substituer par azithromycine",
    ],
    points_cles: [
      "HTA résistante : chercher l'hyperaldostéronisme primaire AVANT d'ajouter un 4e médicament (ratio aldo/rénine)",
      "Indapamide LP 1,5 mg : profil métabolique > HCT — préférer chez le diabétique ou le dyslipidémique",
      "MAPA : non-dipper (absence de ↓ PA nocturne > 10 %) = risque CV augmenté — charge nocturne à évaluer",
      "Sténose artère rénale bilatérale : CI absolue aux IEC/ARA2 (↓ pression de filtration → anurie)",
      "Observance : vérifier avant tout changement thérapeutique — 70 % des HTA pseudo-résistantes = mauvaise observance",
    ],
  },
  n4: {
    saviez_vous: "Les AINS en vente libre (ibuprofène, naproxène, kétoprofène) sont la cause la plus fréquente d'HTA médicamenteuse. Ils augmentent la PA de 3–5 mmHg en moyenne et peuvent provoquer des résistances aux antihypertenseurs. Le pharmacien doit systématiquement interroger le patient hypertendu sur sa consommation d'AINS avant toute délivrance.",
    physiopatho: "Variabilité tensionnelle et risque cardiovasculaire : la variabilité visite-à-visite de la PAS est un facteur de risque d'AVC indépendant (études de Rothwell, Lancet 2010). Les médicaments à longue T½ (amlodipine, périndopril) assurent une couverture homogène sur 24 h → moins de variabilité. Le phénomène de 'dipping' nocturne (↓ PA ≥ 10 % la nuit) est protecteur — les non-dippers ont un risque CV augmenté de 20–30 %.",
    recommandations: "ESH 2023 (European Society of Hypertension) : objectif PA < 130/80 si < 70 ans et toléré (< 140/80 chez > 70 ans). Stratégie : association fixe IEC/ARA2 + amlodipine d'emblée si PA > 140/90. Ajouter indapamide LP si insuffisant. Spironolactone 25–50 mg en 4e ligne si HTA résistante. ANSM 2023 : retrait pseudoéphédrine des décongestionnants nasaux oraux (risque d'AVC hémorragique).",
    situations_complexes: "Grossesse : antihypertenseurs autorisés → méthyldopa, labétalol, nifédipine LP. CI formelle : IEC et ARA2 aux 2e-3e trimestres (fœtotoxicité : anuries fœtales, malformations rénales, retard ossification). Prééclampsie : urgence obstétricale (nicardipine IV ou labétalol IV + sulfate de magnésium si risque éclampsie).\n\nSujet âgé (> 80 ans) : objectif PA < 150/80. Vérifier hypotension orthostatique (mesure couché → debout à 1 et 3 min). Éviter les diurétiques seuls (déshydratation, hyponatrémie).\n\nInsuffisance rénale : IEC/ARA2 = néphroprotecteurs (ralentissent la progression IRC) — créatinine peut ↑ de 30 % à l'initiation (acceptable si stable). Diurétiques de l'anse si DFG < 30 (thiazidiques inefficaces).\n\nHTA médicamenteuse : AINS, pilule estro-progestative, corticoïdes, décongestionnants, ciclosporine, érythropoïétine → chercher systématiquement.",
    effets_secondaires: [
      {label:"Angioœdème IEC héréditaire (déficit inhibiteur C1) : récidivant, bradykinine-médié → CI définitive IEC et ARA2", niveau:"danger"},
      {label:"Hypotension orthostatique (vasodilatateurs, α-bloquants) → risque de chute sujet âgé", niveau:"danger"},
      {label:"Rebond hypertensif (arrêt brutal β-bloquants) → crise hypertensive, angor — jamais d'arrêt brutal", niveau:"danger"},
      {label:"Lithium + diurétiques thiazidiques : ↓ clairance rénale du lithium → toxicité (lithémie)", niveau:"danger"},
    ],
    classes: [
      {classe:"Sacubitril/Valsartan (ARNI — IC + HTA)", dci:["Sacubitril 49mg + Valsartan 51mg"], specialites:["Entresto®"], couleur:"#991B1B", remarque:"AMM IC-FEr (pas HTA isolée). Inhibe la néprylysine (↑ BNP/ANP → vasodilatation). NE PAS associer à un IEC (angioœdème)"},
      {classe:"Méthyldopa (HTA grossesse)", dci:["Méthyldopa 250–500mg × 2–3/j"], specialites:["Aldomet®"], couleur:"#B45309", remarque:"α₂ agoniste central → ↓ tonus sympathique. Référence HTA grossesse (données sécurité les plus longues). Sédation, hépatite possible"},
      {classe:"Labétalol (β+α bloquant — urgence + grossesse)", dci:["Labétalol 100–400mg × 2/j oral ou IV"], specialites:["Trandate®"], couleur:"#1E3A5F", remarque:"Double blocage β et α₁ → ↓ FC + vasodilatation. AMM HTA grossesse + urgences hypertensives en IV"},
    ],
    interactions: [
      "Tacrolimus/ciclosporine + amlodipine : inhibition CYP3A4 → ↑ [amlodipine] + ↑ [immunosuppresseur] — surveiller PA et taux résiduels",
      "Rifampicine + amlodipine/losartan : induction CYP3A4/2C9 → ↓ efficacité antihypertensive — adapter les doses",
      "IEC/ARA2 + aliskiren (inhibiteur direct de la rénine) : double blocage SRAA — CI si DFG < 60 ou diabète (HAS/ESH)",
    ],
    points_cles: [
      "AMPA = outil clé : enseigner la règle des 3 à chaque consultation. Recommander un tensiomètre validé (liste SFHTA)",
      "AINS automédication : interroger systématiquement → cause majeure de résistance aux antihypertenseurs",
      "IEC/ARA2 : CI formelle grossesse → arrêt immédiat à la confirmation + alternative (méthyldopa ou labétalol)",
      "ESH 2023 : objectif < 130/80 si bien toléré chez < 70 ans — réévaluer si symptômes d'hypotension",
      "Pharmacovigilance : angioœdème sous IEC/ARA2 → déclaration ANSM et mention définitive sur le dossier patient",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F9 — INSOMNIE
   ════════════════════════════════════════════════════════ */
FN['insomnie'] = {
  n2: {
    saviez_vous: "Le daridorexant (Quviviq®), premier antagoniste des orexines disponible en France (AMM 2022), représente une alternative non addictive aux Z-drugs et benzodiazépines. Il agit en bloquant le signal d'éveil (orexines/hypocrétines) plutôt qu'en activant le GABA — le sommeil obtenu est plus naturel et sans dépendance physique.",
    physiopatho: "Deux processus régulent le sommeil :\n1. Processus S (homéostatique) : accumulation d'adénosine pendant l'éveil → inhibe les neurones d'éveil de l'hypothalamus → somnolence progressive. La caféine bloque les récepteurs A₁/A₂A de l'adénosine → maintien de l'éveil.\n2. Processus C (circadien) : le noyau suprachiasmatique (NSC) synchronisé par la lumière → glande pinéale → mélatonine entre 21 h et 4 h → facilite l'endormissement en inhibant les neurones d'éveil.\n3. Système orexinergique : neurones à orexines de l'hypothalamus latéral projettent vers tous les systèmes monoaminergiques d'éveil → maintien de l'état de vigilance le jour → bloqué la nuit.",
    mecanisme: "Z-drugs (zolpidem, zopiclone) : modulateurs allostériques positifs du récepteur GABA-A → ↑ fréquence d'ouverture du canal Cl⁻ → hyperpolarisation neuronale → sédation. Affinité préférentielle pour les sous-unités α1 (sédation) → moins d'anxiolyse et moins de myorelaxation que les BZD.\n\nMélatonine LP (Circadin® 2 mg) : se lie aux récepteurs MT1 (↓ activité neuronale du NSC → ↓ signal d'éveil) et MT2 (resynchronisation de la phase circadienne). Libération prolongée reproduit le profil naturel de sécrétion mélatonique. AMM adultes ≥ 55 ans.\n\nDaridorexant (Quviviq®) : antagoniste dual des récepteurs OX1R et OX2R des orexines → bloque le signal d'éveil → facilite l'endormissement naturel. Pas de dépendance physique décrite.",
    diagnostic: "Agenda du sommeil sur 2 semaines = outil de référence clinique. Score de Pittsburgh (PSQI > 5 = mauvais dormeur). Polysomnographie : uniquement si suspicion de SAOS, de mouvements périodiques des membres ou d'hypersomnie. L'insomnie chronique est définie par ≥ 3 nuits/semaine depuis ≥ 3 mois avec retentissement diurne.",
    effets_secondaires: [
      {label:"Dépendance physique et psychologique BZD/Z-drugs — survient en < 4 semaines de traitement continu", niveau:"danger"},
      {label:"Syndrome de sevrage BZD : convulsions si arrêt brutal — jamais d'arrêt sans sevrage progressif", niveau:"danger"},
      {label:"Comportements nocturnes complexes zolpidem (somnambulisme, conduite) — ANSM signal 2019", niveau:"danger"},
      {label:"Somnolence résiduelle diurne (BZD, doxylamine) : CI conduite le matin", niveau:"warning"},
      {label:"Confusion, chutes (antiH1 sédatifs sujet âgé — liste de Beers — CI absolue)", niveau:"danger"},
    ],
    classes: [
      {classe:"Mélatonine LP 2mg — 1ère intention ≥ 55 ans", dci:["Mélatonine LP 2mg"], specialites:["Circadin®"], couleur:"#1B6B52", remarque:"1–2 h avant le coucher. Pas de dépendance. Délai d'effet progressif (1–2 semaines). AMM ≥ 55 ans uniquement (UE)"},
      {classe:"Daridorexant — alternative non addictive", dci:["Daridorexant 25–50mg"], specialites:["Quviviq®"], couleur:"#6B2D5E", remarque:"AMM 2022 insomnie chronique adulte. Pas de dépendance physique (essais cliniques). CI si inhibiteurs CYP3A4 forts"},
      {classe:"Z-drugs — max 4 semaines", dci:["Zolpidem 10mg (5mg femme)","Zopiclone 7,5mg"], specialites:["Stilnox®","Imovane®"], couleur:"#C0392B", remarque:"Ordonnance sécurisée (zolpidem depuis 2017). Durée max 4 sem AMM. Dose minimale efficace toujours"},
    ],
    interactions: [
      "Z-drugs/BZD + alcool : potentialisation majeure sédation et dépression respiratoire — CI absolue",
      "Mélatonine + fluvoxamine (CYP1A2 inhibiteur) : ↑ AUC mélatonine × 12–17 → surdosage — CI",
      "Daridorexant + kétoconazole/clarithromycine (CYP3A4 forts) : CI absolue — ↑ exposition massive",
    ],
    points_cles: [
      "TCC-I = 1ère ligne recommandée (HAS, NICE, ACP) — efficacité supérieure aux hypnotiques à 6 mois et 1 an",
      "Zolpidem : ordonnance sécurisée obligatoire depuis 2017. Comportements nocturnes signalés → déclaration ANSM",
      "Doxylamine (Donormyl®) : CI sujet âgé (anticholinergique → confusion, rétention, chutes) — liste de Beers",
      "Daridorexant : mécanisme ciblé sur l'éveil (pas sur le GABA) → pas de dépendance physique, sommeil plus naturel",
      "Sevrage BZD/Z-drugs : réduction progressive 10 %/2 semaines — jamais d'arrêt brutal (convulsions)",
    ],
  },
  n3: {
    saviez_vous: "La restriction de sommeil, technique clé des TCC-I, consiste à réduire le temps passé au lit au temps réel dormi (minimum 5 h 30 min) pour consolider le sommeil et augmenter la pression homéostatique (accumulation d'adénosine). Cette technique contre-intuitive est la plus efficace des composantes des TCC-I — avec une efficacité à 6 semaines supérieure au zolpidem.",
    physiopatho: "Système orexinergique et éveil :\n• Les neurones à orexines (hypocrétines) de l'hypothalamus latéral projettent vers le locus cœruleus (noradrénaline), le raphé dorsal (sérotonine), les noyaux tubéromamillaires (histamine), l'aire tegmentale ventrale (dopamine) et le prosencéphale basal (acétylcholine) → maintien de l'éveil.\n• La narcolepsie de type 1 = perte auto-immune des neurones à orexines → cataplexie, paralysies du sommeil, hallucinations hypnagogiques.\n• Dans l'insomnie chronique = hyperéveil : cortisol nocturne ↑, métabolisme cérébral ↑ la nuit, hyperactivité de l'amygdale, ↑ fréquence cardiaque.",
    pharmacocinetique: "Zolpidem : Tmax = 1–2 h, T½ = 2,4 h (courte → pas de somnolence matinale à dose standard). Métabolisme CYP3A4 (70 %) + CYP2C9 (22 %). Femmes métabolisent 45 % plus lentement → ANSM 2019 recommande 5 mg chez la femme (vs 10 mg homme).\n\nZopiclone : T½ = 3,5–6,5 h (plus longue → somnolence matinale plus fréquente). Métabolisme CYP3A4 en N-desméthyl-zopiclone (actif). Goût métallique persistant (caractéristique).\n\nDaridorexant : Tmax = 1 h, T½ = 8 h, métabolisme CYP3A4. Substrat de la P-gp. Pas d'accumulation si usage chronique. Pas d'effet résiduel démontré sur la conduite à 25 mg.",
    cas_clinique: "Patient 70 ans, insomnie depuis 4 ans sous zopiclone 7,5 mg/j. Veut arrêter mais 'impossible de dormir sans'. ATCD de 2 chutes. Que proposez-vous ?\n\nRaisonnement : sujet âgé + chutes + zopiclone → arrêt impératif (chutes liées à la somnolence résiduelle). Plan de sevrage progressif : réduction 25 % d'abord puis 10 % / 2 semaines. En parallèle : TCC-I (programme numérique Sleepio® ou psychologue formé). Relais mélatonine LP 2 mg (AMM ≥ 55 ans). Discuter daridorexant 25 mg si insomnie persiste après sevrage.",
    effets_secondaires: [
      {label:"Rebond insomnie à l'arrêt des BZD/Z-drugs (plus sévère que l'insomnie initiale) — doit être anticipé", niveau:"warning"},
      {label:"Rebond de sommeil paradoxal (REM rebound) à l'arrêt : cauchemars intenses 1–2 semaines", niveau:"info"},
      {label:"Zolpidem + opioïdes : dépression respiratoire synergique — ANSM mise en garde 2015", niveau:"danger"},
      {label:"Daridorexant : céphalées premières semaines (10 %), somnolence dose-dépendante", niveau:"info"},
    ],
    classes: [
      {classe:"Lémborexant (DORA — non disponible France)", dci:["Lémborexant 5–10mg"], specialites:["Dayvigo® (AMM USA/Japon — informatif)"], couleur:"#555", remarque:"Même classe daridorexant. T½ = 17–19 h (plus longue → risque somnolence résiduelle à 10 mg). AMM USA 2019"},
      {classe:"Prégabaline (insomnie + douleur neuropathique / anxiété)", dci:["Prégabaline 25–75mg au coucher"], specialites:["Lyrica®"], couleur:"#B45309", remarque:"Hors AMM insomnie isolée — utile si comorbidité douleur/anxiété. Potentiel addictif (liste II). Interaction CNS dépresseurs"},
      {classe:"Mirtazapine (15mg — insomnie + dépression)", dci:["Mirtazapine 15mg au coucher"], specialites:["Norset®"], couleur:"#6B2D5E", remarque:"À 15 mg : effet H1 dominant → sédation. À 30–45 mg : effet NA ↑ → moins sédatif (paradoxe). Utile si DA + insomnie + anxiété"},
    ],
    interactions: [
      "Daridorexant + CYP3A4 modérés (fluconazole, érythromycine) : ↑ exposition → réduire à 25 mg max",
      "Mirtazapine + IMAO : CI absolue — risque syndrome sérotoninergique",
      "Mélatonine + contraceptifs oraux (inhibiteurs partiels CYP1A2) : légère ↑ mélatonine — peu significatif",
    ],
    points_cles: [
      "Daridorexant : antagoniste dual OX1R/OX2R → bloque le signal d'éveil → pas de dépendance physique",
      "Restriction de sommeil (TCC-I) : consolide le sommeil en augmentant la pression homéostatique (adénosine)",
      "Zolpidem femme : ANSM 2019 recommande 5 mg au lieu de 10 mg (métabolisme plus lent — T½ effective plus longue)",
      "SAOS non diagnostiqué : cause majeure d'insomnie réfractaire → interroger le partenaire de sommeil",
      "Tabac et mélatonine : le tabac induit CYP1A2 → ↑ métabolisme mélatonine → mélatonine endogène réduite chez les fumeurs",
    ],
  },
  n4: {
    saviez_vous: "Le programme de déprescription des benzodiazépines recommandé par la HAS (2017) prévoit une réduction de 25 % d'abord, puis de 10 % toutes les 2 semaines. En pratique, les patients ayant pris des BZD > 6 mois nécessitent souvent 6 mois à 1 an de sevrage. La clé : ne jamais dépasser l'inconfort tolérable et associer systématiquement une TCC-I.",
    physiopatho: "Dépendance aux BZD/Z-drugs — mécanisme moléculaire : lors d'un usage prolongé, les récepteurs GABA-A sont down-régulés (internalisés) et désensibilisés → l'efficacité du médicament diminue (tolérance) et une dose plus élevée est nécessaire. À l'arrêt : hyperexcitabilité neuronale (insuffisance GABA relative) → insomnie de rebond, anxiété, tremblements, et dans les cas sévères : convulsions. Le rebond de sommeil paradoxal (↑ temps de sommeil REM) provoque des cauchemars intenses pendant 1–2 semaines.",
    recommandations: "HAS 2017 — Bon usage des hypnotiques : prescrire la durée la plus courte possible (2–4 semaines max). Favoriser les TCC-I dès le départ. Déprescription systématique des BZD/Z-drugs chez le sujet âgé (liste STOPP). ANSM 2019 : zolpidem → ordonnance sécurisée + avertissement sur les comportements nocturnes complexes + réduction de la dose chez la femme à 5 mg. Signal ANSM 2023 : rappel sur les risques de toutes les BZD et Z-drugs chez le sujet âgé.",
    situations_complexes: "Grossesse : éviter tous les hypnotiques. BZD en fin de grossesse → syndrome de sevrage néonatal + hypotonie. Mélatonine : données limitées mais aucune tératogénicité animale. Doxylamine (Donormyl®) : données de sécurité en grossesse pour les nausées du 1er trimestre — prudence pour l'insomnie.\n\nSujet âgé : déprescription = objectif premier. Réduction progressive + TCC-I + traitement des causes sous-jacentes (douleur, SAOS, dépression). Les outils STOPP/START identifient les BZD comme médicaments à arrêter.\n\nInsomnie sous chimiothérapie : mélatonine (données oncologie positives), TCC-I adaptée, éviter BZD (immunosuppression potentielle).\n\nDépression + insomnie : traiter la dépression améliore souvent le sommeil. Mirtazapine 15 mg : sédatif le soir + antidépresseur.",
    effets_secondaires: [
      {label:"Convulsions de sevrage BZD (arrêt brutal après > 6 semaines de traitement) — urgence neurologique", niveau:"danger"},
      {label:"Zolpidem surdosage + alcool : coma, dépression respiratoire — antagoniste : flumazénil IV", niveau:"danger"},
      {label:"Daridorexant et conduite professionnelle : informer (délai 8 h minimum recommandé)", niveau:"warning"},
      {label:"Mélatonine + pilule : légère ↑ exposition mélatonine (inhibition CYP1A2 par les œstrogènes)", niveau:"info"},
    ],
    classes: [
      {classe:"Slenyto® (mélatonine LP pédiatrique — autisme)", dci:["Mélatonine LP 1–5mg"], specialites:["Slenyto®"], couleur:"#1B6B52", remarque:"AMM trouble du spectre autistique + Smith-Magenis syndrome, 2–18 ans. Remboursé. Libération prolongée sur 8–10 h"},
      {classe:"Trazodone (sédatif sans dépendance)", dci:["Trazodone 25–100mg au coucher"], specialites:["Trittico LP®"], couleur:"#6B2D5E", remarque:"Hors AMM insomnie — antagoniste 5-HT2A + antiH1 → sédatif. Pas de dépendance. Priapisme rare (CI hommes si ATCD)"},
      {classe:"Flumazénil (antagoniste BZD — urgence surdosage)", dci:["Flumazénil 0,2mg IV"], specialites:["Anexate®"], couleur:"#C0392B", remarque:"Antagoniste compétitif des récepteurs BZD. T½ courte (40–80 min) → risque de re-sédation si BZD à longue T½ → surveiller 6 h"},
    ],
    interactions: [
      "Trazodone + inhibiteurs CYP3A4 (kétoconazole, itraconazole) : ↑ [trazodone] → hypotension orthostatique",
      "Mirtazapine + ISRS (sérotonine) : légère synergie sérotoninergique — surveiller si association (généralement bien tolérée)",
      "Flumazénil + BZD chroniques : risque de précipiter un sevrage aigu (convulsions) — titrer doucement",
    ],
    points_cles: [
      "Protocole sevrage HAS : -25 % d'abord → puis -10 % / 2 semaines → durée totale proportionnelle à la durée de traitement",
      "TCC-I numérique (Sleepio®, Somryst®) : efficacité documentée comparable à la TCC en présentiel — orienter les patients",
      "Déprescription BZD sujet âgé = priorité absolue (liste STOPP) → réduire le risque de chutes et de démence",
      "Signal ANSM zolpidem : tous comportements nocturnes (somnambulisme, conduite) → déclaration pharmacovigilance",
      "Flumazénil : T½ courte → risque re-sédation si BZD à longue T½ → surveiller le patient 6 h minimum",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F10 — MIGRAINE
   ════════════════════════════════════════════════════════ */
FN['migraine'] = {
  n2: {
    saviez_vous: "La Céphalée par Abus Médicamenteux (CAM ou MOH) est la 3e cause mondiale de céphalée invalidante. Elle survient quand on prend des triptans > 10 jours/mois ou des antalgiques > 15 jours/mois pendant > 3 mois. Paradoxalement, plus on prend de médicaments contre la migraine, plus la tête fait mal — car les voies nociceptives centrales se sensibilisent.",
    physiopatho: "Trois phases de la crise migraineuse :\n1. Prodrome (heures avant) : fatigue, bâillements, photosensibilité, envies alimentaires → activation de l'hypothalamus (démontrée en TEP).\n2. Aura (30 % des migraineux, 20–30 min) : Dépolarisation Corticale Propagée (DCP) — onde d'activité électrique se propageant sur le cortex visuel à 3 mm/min → scotome scintillant, phosphènes.\n3. Céphalée : activation du nerf trijumeau → libération de CGRP (Calcitonin Gene-Related Peptide), substance P et PACAP → vasodilatation + inflammation neurogène des vaisseaux méningés → douleur pulsatile unilatérale intense.",
    mecanisme: "Triptans (sumatriptan, élétriptan, rizatriptan) : double mécanisme agoniste 5-HT1B + 5-HT1D.\n• 5-HT1B : vasoconstriction des vaisseaux méningés dilatés.\n• 5-HT1D : inhibition présynaptique de la libération de CGRP et substance P dans les terminaisons trigéminales + réduction de la transmission dans le noyau caudal du V.\n\nRimégépant (gépant) : antagoniste du récepteur CGRP → bloque la vasodilatation et l'inflammation neurogène sans vasoconstriction artérielle → intérêt si CI cardiovasculaires aux triptans. AMM traitement de crise ET prévention (1 comprimé tous les 2 jours en préventif).",
    diagnostic: "Critères ICHD-3 (International Headache Society) : ≥ 5 crises, durée 4–72 h non traitées, + 2 des 4 caractères (unilatérale, pulsatile, modérée-sévère, aggravée par activité physique) + nausées/vomissements OU photo/phonophobie. Score ID-Migraine (3 items) : photophobie + nausées + interférence avec activité → sensibilité 81 %.",
    effets_secondaires: [
      {label:"Oppression thoracique, sensation de serrement (triptans — effet 5-HT1B coronaire) → CI coronaropathie", niveau:"warning"},
      {label:"CI triptans : coronaropathie, ATCD AVC/AIT, HTA non contrôlée, Raynaud sévère, grossesse", niveau:"danger"},
      {label:"Céphalée par abus médicamenteux (MOH) : > 10 j/mois triptans ou > 15 j/mois antalgiques → chronicisation", niveau:"danger"},
      {label:"Flush, paresthésies transitoires (triptans — effet vasomoteur)", niveau:"info"},
    ],
    classes: [
      {classe:"Triptans — crise migraineuse", dci:["Sumatriptan 50–100mg oral / 20mg nasal / 6mg SC","Élétriptan 40mg","Rizatriptan 10mg"], specialites:["Imigrane®","Relpax®","Maxalt®"], couleur:"#C0392B", remarque:"Élétriptan = meilleur rapport efficacité/tolérance (méta-analyse). Rizatriptan = action la plus rapide (45 min). SC si vomissements"},
      {classe:"Rimégépant — crise + prévention", dci:["Rimégépant 75mg"], specialites:["Vydura®"], couleur:"#1B6B52", remarque:"AMM EU 2022 : 1 comprimé/crise (max 1/j) OU 1/2 jours en préventif. Pas de CI cardiovasculaires. CI grossesse (tératogène animal)"},
      {classe:"AINS + antiémétiques — migraine légère-modérée", dci:["Ibuprofène 400mg","Naproxène 550mg","Aspirine 1000mg + métoclopramide 10mg"], specialites:["Nurofen®","Apranax®","Migpriv®"], couleur:"#1E3A5F", remarque:"Migpriv® (aspirine + métoclopramide) : 1ère intention si triptans non disponibles ou migraine légère"},
    ],
    interactions: [
      "Triptans + IMAO irréversibles : CI absolue — inhibition MAO-A → accumulation 5-HT → syndrome sérotoninergique",
      "Triptans + ergotamine : CI — vasoconstriction cumulée → risque d'ischémie",
      "Rimégépant + inhibiteurs CYP3A4 forts (kétoconazole, clarithromycine) : CI — ↑ exposition massive",
    ],
    points_cles: [
      "Triptan : prendre le PLUS TÔT possible au début de la céphalée (pas pendant l'aura) → meilleure efficacité",
      "MOH (Céphalée par Abus Médicamenteux) : > 10 j/mois de triptans → dépistage systématique à l'officine",
      "> 4 crises/mois invalidantes → traitement préventif obligatoire (bêta-bloquants, topiramate, anti-CGRP)",
      "Rimégépant : double indication (crise ET prévention) — un seul médicament pour les deux usages",
      "Migraine avec aura + pilule estro-progestative + tabac = risque AVC × 8 → CI absolue des estroprogestatifs",
    ],
  },
  n3: {
    saviez_vous: "Les anticorps anti-CGRP (érénumab, frémanézumab, galcanézumab) sont la première classe thérapeutique développée SPÉCIFIQUEMENT pour la migraine. Ils réduisent les jours de migraine d'environ 50 % chez 40–60 % des patients réfractaires — avec des demi-vies de 28–31 jours permettant une injection mensuelle ou trimestrielle.",
    physiopatho: "CGRP et migraine : le CGRP est un neuropeptide vasoactif colocalisé avec la substance P dans les fibres C du nerf trijumeau. Lors de la crise, il est libéré dans le sang veineux jugulaire (mesurable — corrélé à la sévérité). Il se lie au récepteur CGRP (complexe CLR/RAMP1) sur les CML des artères méningées → vasodilatation + inflammation neurogène. L'érénumab cible le récepteur CGRP (RAMP1), alors que frémanézumab et galcanézumab ciblent le ligand CGRP lui-même.",
    pharmacocinetique: "Sumatriptan : Tmax oral 1–2 h (biodisponibilité 15 %, fort effet 1er passage MAO-A), SC Tmax 12 min (biodisponibilité 97 %). T½ = 2 h. Métabolisme MAO-A → acide indolacétique (MAO-A inhibe IMAO).\n\nÉlétriptan : biodisponibilité 50 %, T½ = 4 h, métabolisme CYP3A4. Plus lipophile → meilleure pénétration cérébrale → efficacité centrale supérieure.\n\nÉrénumab (IgG humaine anti-récepteur CGRP) : SC, Tmax = 6 j, T½ = 28 jours → injection mensuelle. Catabolisme protéique → pas d'interactions CYP → profil très favorable. Constipation modérée dans 3–4 % des cas.",
    cas_clinique: "Femme 38 ans, migraine depuis 15 ans (8–10 crises/mois malgré propranolol 80 mg/j + sumatriptan 100 mg). ATCD syndrome de Raynaud. PA = 95/60 mmHg. Que modifiez-vous ?\n\nRaisonnement : propranolol peu adapté (PA basse + Raynaud → vasoconstriction périphérique aggravée). Sumatriptan = CI relative si Raynaud sévère. Alternative prévention : topiramate 50–100 mg/j (mais CI grossesse à anticiper) ou amitriptyline 25 mg/j. Alternative crise : rimégépant 75 mg (pas de CI cardiovasculaires). Si > 3 échecs des préventifs classiques → anti-CGRP (frémanézumab ou galcanézumab).",
    effets_secondaires: [
      {label:"Érénumab : constipation (3–4 %) + légère ↑ PA — surveiller chez hypertendu", niveau:"warning"},
      {label:"Topiramate prévention : troubles cognitifs (mot manquant), paresthésies, lithiase rénale, TÉRATOGÈNE", niveau:"danger"},
      {label:"Valproate prévention : tératogène MAJEUR (spina bifida, malformations cardiaques) — CI femme en âge de procréer", niveau:"danger"},
      {label:"Amitriptyline : sédation, bouche sèche, constipation, CI glaucome à angle fermé", niveau:"warning"},
    ],
    classes: [
      {classe:"Anti-CGRP ligand (prévention migraine épisodique ou chronique)", dci:["Frémanézumab 225mg/mois ou 675mg/3 mois SC","Galcanézumab 120mg/mois SC"], specialites:["Ajovy®","Emgality®"], couleur:"#991B1B", remarque:"Réduction ≥ 50 % des crises chez 40–60 % des patients après échec ≥ 2 préventifs classiques"},
      {classe:"Anti-récepteur CGRP (érénumab)", dci:["Érénumab 70–140mg/mois SC"], specialites:["Aimovig®"], couleur:"#6B2D5E", remarque:"Cible le récepteur CGRP (RAMP1) plutôt que le ligand. Constipation plus fréquente. Légère ↑ PA possible"},
      {classe:"Topiramate (prévention orale — 1ère ligne)", dci:["Topiramate 50–100mg/j"], specialites:["Epitomax®"], couleur:"#B45309", remarque:"AMM prévention migraine adulte. Programme de prévention grossesse obligatoire (EMA — tératogène). Surveiller litho-rénale"},
    ],
    interactions: [
      "Topiramate + contraceptifs oraux : ↓ efficacité contraceptive (induction CYP3A4) → recommander contraception non hormonale",
      "Valproate + lamotrigine : ↑ [lamotrigine] × 2 (inhibition glucuronidation) → risque toxicité",
      "Anti-CGRP : pas d'interactions médicamenteuses connues (catabolisme protéique — pas de voie CYP)",
    ],
    points_cles: [
      "Érénumab cible le RÉCEPTEUR CGRP (RAMP1/CLR) ; frémanézumab et galcanézumab ciblent le LIGAND CGRP",
      "Topiramate : programme prévention grossesse (ASMR EMA) obligatoire + bilan rénal avant (lithiase)",
      "Valproate : INTERDIT en prévention de la migraine chez toute femme en âge de procréer (tératogène majeur)",
      "Sensibilisation centrale (allodynie cutanée) : prendre le triptan AVANT l'installation de l'allodynie → efficacité supérieure",
      "ACT score : évaluer le contrôle de la migraine → si > 4 crises/mois → intensifier ou initier prévention",
    ],
  },
  n4: {
    saviez_vous: "Le rimégépant (Vydura®) est le premier médicament de l'histoire à avoir deux indications simultanées dans la même maladie : traitement de la crise migraineuse ET prévention de la migraine. En préventif, il se prend 1 comprimé de 75 mg tous les 2 jours — ce qui en fait une option unique pour les patients ne supportant pas les préventifs classiques.",
    physiopatho: "Sensibilisation centrale et allodynie cutanée : après 1–2 h de crise non traitée, les neurones trigéminovasculaires du noyau caudal se sensibilisent → les stimuli normalement indolores (toucher des cheveux, brossage) deviennent douloureux (allodynie cutanée). Ce phénomène est le signe que la sensibilisation centrale est installée — le triptan sera alors MOINS efficace. D'où l'importance de le prendre dès les premiers signes de la céphalée, avant l'allodynie.",
    recommandations: "SFEMC 2024 (Société Française d'Étude des Migraines et Céphalées) : préventif si ≥ 4 crises/mois ou ≥ 8 jours de migraine/mois invalidants. Bêta-bloquants (propranolol, métoprolol) : 1ère ligne si pas de CI. Amitriptyline : si insomnie ou dépression associée. Topiramate : si surpoids (mais programme grossesse). Anti-CGRP : si échec de ≥ 2–3 préventifs classiques bien conduits.",
    situations_complexes: "Migraine et contraception : migraine avec aura + pilule estroprogestative = CI absolue (risque AVC × 8). Utiliser progestatif seul (désogestrel) ou DIU hormonal.\n\nMigraine menstruelle pure (crise liées aux règles) : naproxène 550 mg × 2/j 2 jours avant les règles + 5 jours = mini-prévention péri-menstruelle. Alternative : triptans en préventif périmenstruel (frovatriptan : T½ longue).\n\nGrossesse : sumatriptan (données rassurantes en 2e–3e trimestre). Paracétamol. Éviter AINS après 24 SA (risque fermeture prématurée du canal artériel). Si prévention nécessaire : propranolol ou métoprolol (à surveiller près du terme : bradycardie néonatale).\n\nStatus migrainosus (> 72 h) → urgences neurologiques : dexaméthasone IV 10 mg + métoclopramide IV + hydratation.",
    effets_secondaires: [
      {label:"Érénumab : constipation pouvant évoluer en sub-occlusion (rares cas — surveiller le transit)", niveau:"warning"},
      {label:"Galcanézumab : réaction au site d'injection, arthralgie dans 2–3 % des cas", niveau:"info"},
      {label:"MOH (Medication Overuse Headache) — fréquent non reconnu : interroger systématiquement la fréquence des prises", niveau:"danger"},
      {label:"Rimégépant : tératogène chez l'animal → CI grossesse et allaitement", niveau:"danger"},
    ],
    classes: [
      {classe:"Atogépant (anti-CGRP oral — prévention quotidienne)", dci:["Atogépant 10–60mg/j"], specialites:["Aquipta® (AMM EU 2023)"], couleur:"#1B6B52", remarque:"Prévention orale quotidienne — gépant à longue durée d'action. Réduction crises 56–61 % (essai ADVANCE). Substrat CYP3A4"},
      {classe:"Frovatriptan (T½ longue — prévention menstruelle)", dci:["Frovatriptan 2,5mg × 2/j pendant 6j"], specialites:["Tigreat®"], couleur:"#6B2D5E", remarque:"T½ = 26 h (la plus longue des triptans) → efficace en prévention péri-menstruelle. Démarrer 2 jours avant les règles"},
      {classe:"Eptinézumab (IV trimestriel — anti-CGRP ligand)", dci:["Eptinézumab 100–300mg IV/3 mois"], specialites:["Vyepti® (non disponible France)"], couleur:"#555", remarque:"Informationnel — efficacité dès J1 (injection IV → concentration thérapeutique immédiate). AMM USA 2020"},
    ],
    interactions: [
      "Atogépant + inhibiteurs CYP3A4 forts (kétoconazole) : réduire dose à 10 mg/j. Inducteurs (rifampicine) : ↑ dose à 60 mg/j",
      "Rimégépant + CYP3A4 modérés (fluconazole, érythromycine) : 1 comprimé maximum toutes les 48 h",
      "Anti-CGRP + β-bloquants ou topiramate : association possible (pas d'interactions connues — mécanismes différents)",
    ],
    points_cles: [
      "Dépister systématiquement le MOH : > 10 j/mois de triptans = MOH probable → réévaluation médicale urgente",
      "Migraine avec aura + pilule = CI absolue → proposer désogestrel ou DIU au lévonorgestrel",
      "Rimégépant double indication (crise ET prévention) : informer les patients sur les 2 modalités d'utilisation",
      "Prévention menstruelle : naproxène 550 mg × 2/j ou frovatriptan 2,5 mg × 2/j débutés 2 jours avant les règles",
      "Anti-CGRP : traçabilité n° de lot + déclaration pharmacovigilance si EI — remboursés en France depuis 2021",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F11 — RHINITE ALLERGIQUE
   ════════════════════════════════════════════════════════ */
FN['rhinite-allergique'] = {
  n2: {
    saviez_vous: "Le Dymista® (fluticasone + azélastine nasale) est supérieur aux deux composants en monothérapie sur la congestion nasale (étude MAXIS, JACI 2012). Cette supériorité est due à une synergie pharmacologique : le corticoïde réduit l'inflammation et l'azélastine bloque les récepteurs H1 et a des propriétés anti-leucotriènes. Il est remboursé depuis 2020 pour les rhinites modérées-sévères insuffisamment contrôlées.",
    physiopatho: "Rhinite allergique persistante vs saisonnière : la rhinite aux acariens (persistante toute l'année) entraîne un remodelage progressif de la muqueuse nasale si non traitée : hyperplasie des cellules caliciformes, fibrose sous-épithéliale, néovascularisation. Ce remodelage peut évoluer vers la polypose naso-sinusienne (PNS) — 25 % des rhinites allergiques sévères non traitées. Le même processus touche simultanément les bronches ('united airway disease') : 80 % des asthmatiques ont une RA.",
    mecanisme: "Corticoïdes nasaux (fluticasone furoate, mométasone) : transrépression de NF-κB dans les cellules épithéliales nasales → ↓ IL-4, IL-5, IL-13, éotaxine → réduction de l'infiltrat éosinophilique et de la sécrétion de mucus. Effet supérieur sur la congestion (PGD2 et bradykinine médiées) par rapport aux antiH1 seuls.\n\nAzélastine nasale (Allergodil®) : antiH1 topique à action rapide (15 min). Propriétés anti-leucotriènes et anti-cytokines propres → efficace sur l'ensemble des symptômes.\n\nAssociation fixe Dymista® (fluticasone 50 µg + azélastine 137 µg) : action synergique sur la congestion nasale > chaque composant seul.",
    diagnostic: "Classification ARIA en intermittente (< 4 j/sem ou < 4 sem/an) vs persistante (> 4 j/sem ET > 4 sem/an) × légère vs modérée-sévère. Prick-tests cutanés (référence) : positivité ≥ 3 mm. IgE spécifiques sériques si prick-tests impossibles. Nasofibroscopie si polypose ou complication suspectée.",
    effets_secondaires: [
      {label:"Épistaxis (corticoïdes nasaux) — mauvaise technique (orienté vers la cloison) — prévenir systématiquement", niveau:"info"},
      {label:"Perforation de la cloison nasale (usage prolongé bilatéral mal orienté — rare)", niveau:"warning"},
      {label:"Rhinite médicamenteuse (Jost) : décongestionnants > 5 jours → rebond vasodilatatoire — CI prolongation", niveau:"danger"},
      {label:"ANSM 2023 : pseudoéphédrine retirée du marché FR (risque AVC hémorragique)", niveau:"danger"},
    ],
    classes: [
      {classe:"Corticoïdes nasaux — 1ère intention sur congestion", dci:["Fluticasone furoate 27,5µg/bouffée","Mométasone 50µg/bouffée","Budésonide 32µg/bouffée"], specialites:["Avamys®","Nasonex®","Rhinocort®"], couleur:"#1B6B52", remarque:"Fluticasone furoate : biodisponibilité systémique < 0,01 % — le plus sûr pour un usage long terme"},
      {classe:"Association fixe corticoïde + antiH1 nasal", dci:["Fluticasone 50µg + Azélastine 137µg / bouffée"], specialites:["Dymista® (1 bouffée/narine × 2/j)"], couleur:"#6B2D5E", remarque:"Supérieur aux 2 composants en monothérapie sur la congestion. Remboursé RA modérée-sévère insuffisamment contrôlée"},
      {classe:"Décongestionnants nasaux locaux — max 5 jours", dci:["Xylométazoline 0,1%","Oxymétazoline 0,05%"], specialites:["Otrivine®","Vibrocil®"], couleur:"#B45309", remarque:"5 jours MAXIMUM — risque rhinite médicamenteuse au-delà. Jamais chez nourrisson sans avis médical"},
    ],
    interactions: [
      "Fluticasone nasale + kétoconazole oral systémique : ↑ légère exposition fluticasone (CYP3A4) — pertinent si forte dose ou long cours",
      "Azélastine nasale + sédatifs ou alcool : légère potentialisation (passage systémique minime — peu significatif cliniquement)",
      "Décongestionnants (phényléphrine) : potentialisation avec IMAO → HTA hypertensive (interaction classique)",
    ],
    points_cles: [
      "Technique spray nasal : tête penchée en avant, orienter vers l'EXTÉRIEUR de la narine (pas vers la cloison) → prévient épistaxis",
      "Pseudoéphédrine : retirée marché français novembre 2023 (ANSM) — orienter vers corticoïdes nasaux ou sérum hypertonique",
      "Dymista® : rembousé depuis 2020 pour RA modérée-sévère insuffisamment contrôlée par monothérapie",
      "'United airway disease' : dépister systématiquement l'asthme chez un rhinitique (80 % des asthmatiques ont une RA)",
      "Rhinite médicamenteuse : arrêt progressif décongestionnant + corticoïde nasal en relais immédiat",
    ],
  },
  n3: {
    saviez_vous: "L'immunothérapie allergénique sublinguale (SLIT) est plus pratique que la voie sous-cutanée (SCIT) car elle peut être auto-administrée à domicile après la 1ère dose supervisée. Pour les graminées, l'essai GT-08 (NEJM 2007) a démontré une réduction de 30 % des symptômes vs placebo. Pour les acariens, Acarizax® (1 comprimé/j sous la langue) est remboursé depuis 2019.",
    physiopatho: "Polypose naso-sinusienne (PNS) et RA sévère : la PNS est une inflammation Th2 chronique sévère de la muqueuse naso-sinusienne avec formation de polypes (tissu œdémateux riche en éosinophiles, IgE, mastocytes et IL-5). Elle s'accompagne fréquemment d'asthme, de RA et de la triade de Samter (PNS + asthme + intolérance à l'aspirine = NSAID-Exacerbated Respiratory Disease). Les polypes obstruent les ostiums sinusiens → sinusites chroniques récurrentes + anosmie (très pénalisante).",
    pharmacocinetique: "Mométasone furoate nasale : Cmax plasmatique < 0,05 ng/mL (infra-thérapeutique). Biodisponibilité systémique < 0,1 % — la plus faible des corticoïdes nasaux. Pas de suppression de l'axe HHA même à long terme.\n\nExtrait allergénique Acarizax® (SLIT acariens) : administration sublinguale → capturé par les cellules de Langerhans et les DC plasmacytoïdes → migration vers les ganglions cervicaux → induction des Treg (IL-10, TGF-β) → tolérance immunologique progressive. Dose cumulative sur 3 ans beaucoup plus élevée qu'en SCIT.",
    cas_clinique: "Patient 38 ans, RA aux acariens persistante sévère (ARIA grade 4), non contrôlée sous Dymista® 2 bouffées/narine × 2/j. Découverte de polypes nasaux bilatéraux. Anosmie partielle. Asthme léger concomitant. Quelle stratégie ?\n\nRaisonnement : RA + PNS + asthme → inflammation T2 systémique. 1ère étape : cure courte de corticoïdes oraux (prednisolone 0,5 mg/kg × 7 j) pour désobstruer + continuer corticoïde nasal fort. Bilan ORL + nasofibroscopie. Si PNS réfractaire → dupilumab (AMM PNS sévère réfractaire). Discuter ITA acariens (Acarizax®) pour modifier le cours naturel.",
    effets_secondaires: [
      {label:"PNS corticorésistante : récidive chirurgicale fréquente sans traitement de fond — biothérapie à discuter", niveau:"warning"},
      {label:"Dupilumab PNS : conjonctivite (10–15 %), réactions au site d'injection", niveau:"warning"},
      {label:"ITA SCIT : réaction systémique 1/1 000 000 d'injections — adrénaline et matériel d'urgence obligatoires", niveau:"danger"},
    ],
    classes: [
      {classe:"Dupilumab (anti-IL-4Rα) — RA + PNS sévère", dci:["Dupilumab 300mg SC/2 sem"], specialites:["Dupixent®"], couleur:"#991B1B", remarque:"AMM PNS sévère réfractaire ± asthme ± DA. Réduction polypes 80 % (SINUS-24). Remboursé FR 2021"},
      {classe:"Mépolizumab (anti-IL-5) — PNS éosinophilique", dci:["Mépolizumab 100mg SC/4 sem"], specialites:["Nucala®"], couleur:"#6B2D5E", remarque:"Extension AMM PNS éosinophilique sévère — réduit la charge polypeuse + améliore l'olfaction"},
      {classe:"ITA SLIT acariens", dci:["Extrait Dermatophagoides pt + df standardisé"], specialites:["Acarizax® (comprimé)","Actair® (comprimé)","Staloral® (gouttes)"], couleur:"#1B6B52", remarque:"Acarizax® : remboursé depuis 2019. 1 comprimé/j sous la langue, 3 ans de traitement minimum"},
    ],
    interactions: [
      "Dupilumab + vaccins vivants : vacciner avant l'initiation de préférence",
      "ITA (SCIT) + bêta-bloquants non sélectifs : CI — risque anaphylaxie réfractaire à l'adrénaline",
      "Mépolizumab : aucune interaction médicamenteuse connue (anticorps monoclonal)",
    ],
    points_cles: [
      "Triade de Samter : PNS + asthme + intolérance AINS → mécanisme COX-1 → utiliser célécoxib si AINS nécessaire",
      "Dupilumab PNS : réduit la nécessité de chirurgie de révision — économies médico-sociales importantes",
      "Acarizax® : 1 comprimé/j sous la langue à domicile après la 1ère dose supervisée — remboursé depuis 2019",
      "ARIA step-care : palier 1 (antiH1 ou corticoïde nasal) → 2 (combinaison) → 3 (ITA) → 4 (biothérapies si PNS)",
      "Éviction des acariens : housses anti-acariens + lavage 60°C + aspirateur HEPA = base de toute RA aux acariens",
    ],
  },
  n4: {
    saviez_vous: "La pseudoéphédrine a été retirée du marché français en novembre 2023 par l'ANSM en raison d'un risque d'accidents vasculaires cérébraux hémorragiques et d'ischémie cérébrale. Ce retrait concerne Actifed®, Rhinadvil®, Dolirhume® et une vingtaine d'autres spécialités. Les patients doivent être réorientés vers les corticoïdes nasaux, les antiH1 et les lavages salins.",
    physiopatho: "Mécanismes de la tolérance immunologique par l'ITA :\n1. Déviation Th1/Th2 → réorientation vers une réponse Th1 modérée (IFN-γ).\n2. Induction des LT régulateurs (Treg CD4+CD25+FoxP3+) → IL-10 et TGF-β → inhibition des mastocytes et basophiles.\n3. Production d'IgG4 'bloquants' → compétition avec les IgE pour la liaison à l'allergène → ↓ activation mastocytaire.\n4. ↑ Seuil de dégranulation des mastocytes et basophiles (désensibilisation cellulaire directe).\nCes 4 mécanismes expliquent pourquoi l'ITA est le seul traitement qui modifie l'histoire naturelle de la maladie.",
    recommandations: "ARIA 2022 — RA : algorithme digital mHealth (application MACVIA) pour le suivi du contrôle en temps réel. ITA : indication si RA allergique identifiée + insuffisamment contrôlée par pharmacothérapie + gêne persistante ≥ 2 ans. SCIT supervisée 30 min post-injection chez l'allergologue. SLIT plus accessible (officinale après la 1ère dose). ANSM 2023 : retrait pseudoéphédrine — informer les patients et proposer des alternatives.",
    situations_complexes: "Grossesse :\n• AntiH1 : loratadine ou cétirizine (données rassurantes). Éviter antiH1 1G.\n• Corticoïdes nasaux : mométasone ou budésonide (rassurantes). Éviter forte dose systémique T1.\n• ITA : ne pas initier pendant la grossesse (risque anaphylaxie lors des montées de doses). Si déjà en maintenance : continuer.\n• Décongestionnants : CI absolue (pseudoéphédrine retirée + phényléphrine → risque vasospasme utérin).\n\nPédiatrie :\n• ITA indiquée dès 5 ans (SCIT) ou selon l'AMM du produit (SLIT). Réduit la progression vers l'asthme de 30–50 % (ETAC study).\n• Corticoïdes nasaux < 4 ans : éviter (absorption systémique plus importante, rapport surface/poids défavorable).\n• Antihistaminiques < 2 ans : uniquement cétirizine gouttes dès 6 mois sous contrôle médical.",
    effets_secondaires: [
      {label:"Anaphylaxie SCIT (1/1 000 000 d'injections) — kit épinéphrine obligatoire en salle d'injection, surveillance 30 min", niveau:"danger"},
      {label:"Réactions locales SLIT buccales : prurit, œdème lingual (fréquentes, bénignes, régressent spontanément)", niveau:"info"},
      {label:"Corticoïdes nasaux haute dose + corticoïdes inhalés : additivité → surveiller si doses cumulées élevées", niveau:"warning"},
    ],
    classes: [
      {classe:"Cétirizine pédiatrique (sol. buvable)", dci:["Cétirizine 1mg/mL solution"], specialites:["Zyrtec® solution","Virlix® solution"], couleur:"#1B6B52", remarque:"AMM dès 2 ans. 0,25 mg/kg × 2/j chez 2–6 ans. Légère sédation possible (moins que l'hydroxyzine)"},
      {classe:"Omalizumab (anti-IgE) — RA + asthme allergique", dci:["Omalizumab SC/2–4 sem"], specialites:["Xolair®"], couleur:"#991B1B", remarque:"AMM RA allergique persistante sévère + asthme allergique sévère. Dose calculée selon poids et IgE totales (30–1500 UI/mL)"},
      {classe:"Tézépélumab (anti-TSLP) — RA + asthme (essais en cours)", dci:["Tézépélumab"], specialites:["Tezspire®"], couleur:"#555", remarque:"AMM actuelle : asthme sévère. Essais en cours pour RA sévère + PNS (cible l'alarmine TSLP en amont de toute la cascade Th2)"},
    ],
    interactions: [
      "ITA + bêta-bloquants non sélectifs : CI pour la SCIT (anaphylaxie réfractaire à l'adrénaline). SLIT : plus sûre, à discuter",
      "Omalizumab + vaccins vivants : espacer (recommandation générale biothérapies anti-IgE)",
      "Antihistaminiques 1G (hydroxyzine) + médicaments allongeant le QT : CI — allongement QT cumulatif (hydroxyzine listed by EMA)",
    ],
    points_cles: [
      "Délivrance ITA (SLIT) en officine : vérifier l'ordonnance allergologue, conservation au réfrigérateur 2–8°C, formation sur l'auto-injection",
      "ANSM 2023 : pseudoéphédrine retirée → orienter vers corticoïdes nasaux, antiH1, lavages salins hypertoniques",
      "ITA pédiatrique précoce (5–7 ans) : prévient la marche atopique RA → asthme dans 30–50 % des cas",
      "SCIT : kit épinéphrine obligatoire en salle d'attente + formation du personnel à l'anaphylaxie",
      "ARIA mHealth : application MACVIA disponible — orienter les patients pour le suivi du contrôle de la rhinite",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F12 — ACNÉ (dermato)
   ════════════════════════════════════════════════════════ */
FN['acne-legere'] = {
  n2: {
    saviez_vous: "Propionibacterium acnes a été renommé Cutibacterium acnes en 2016. Cette bactérie anaérobie vit naturellement dans les follicules pilo-sébacés de tous les humains — ce n'est pas une bactérie pathogène étrangère mais un commensal qui devient problématique quand le follicule est obstrué et l'environnement devient anaérobie.",
    physiopatho: "Quatre mécanismes interdépendants :\n1. Hyperséborrhée : ↑ sécrétion de sébum par les glandes sébacées (stimulées par les androgènes — DHT via 5α-réductase type 1) → sébum ↑ en acide linoléique → perte de la fluidité.\n2. Hyperkératose folliculaire : accumulation de kératinocytes dans l'infundibulum folliculaire → microcomédon → comédon ouvert (point noir, oxydation mélanine) ou fermé (point blanc).\n3. Prolifération de C. acnes : environnement anaérobie du comédon fermé → lipases bactériennes → acides gras libres irritants.\n4. Inflammation : lipases + peptidoglycanes bactériens → activation TLR2 des kératinocytes → IL-1α, IL-8, TNF-α → recrutement neutrophiles → papulo-pustules → lésions inflammatoires.",
    mecanisme: "Peroxyde de benzoyle (PBO) : libère de l'oxygène actif (O₂ radicalaire) → destruction des membranes bactériennes de C. acnes (bactéricide direct + kératolytique). Pas de résistance bactérienne (mécanisme non antibiotique). Blanchit les vêtements et tissus (prévenir le patient).\n\nRétinoïdes topiques (trétinoïne, adapalène) : se lient aux récepteurs RAR → normalisent la différenciation kératinocytaire → ↓ hyperkératose folliculaire → débouchage des comédons. Anti-comédogènes +++. Photosensibilisation.\n\nAntibiotiques topiques (clindamycine) : ↓ C. acnes + effet anti-inflammatoire direct. À combiner avec PBO (réduire la résistance). JAMAIS en monothérapie.",
    diagnostic: "Classification ECLA ou GEA : lésions rétentionnelles (comédons ouverts/fermés) + lésions inflammatoires (papules, pustules, nodules, kystes). Grade 1 (légère) : comédons + quelques papules. Grade 2–3 (modérée) : papulo-pustules. Grade 4 (sévère) : nodulo-kystique. La topographie (visage, dos, thorax) et l'atteinte psychologique guident l'intensité du traitement.",
    effets_secondaires: [
      {label:"Irritation, dessèchement (PBO, rétinoïdes topiques) — commencer à faible concentration", niveau:"info"},
      {label:"Photosensibilisation (rétinoïdes topiques, doxycycline) — crème solaire indispensable", niveau:"warning"},
      {label:"Résistance antibiotique de C. acnes (antibiotiques locaux en monothérapie) — CI monothérapie", niveau:"danger"},
      {label:"PBO : blanchit les tissus et vêtements — prévenir systématiquement", niveau:"info"},
    ],
    classes: [
      {classe:"Peroxyde de benzoyle (PBO) — pierre angulaire", dci:["PBO 2,5–5–10%"], specialites:["Cutacnyl®","Eclaran®","Brevoxyl®","Pannogel®"], couleur:"#1B6B52", remarque:"Bactéricide + kératolytique. Pas de résistance bactérienne. Toujours associer si antibiotique topique utilisé"},
      {classe:"Rétinoïdes topiques — anti-comédogènes", dci:["Adapalène 0,1–0,3%","Trétinoïne 0,025–0,05%"], specialites:["Differine®","Kétrel®","Locacid®"], couleur:"#B45309", remarque:"Commencer à faible concentration × 2–3/sem puis quotidien. Appliquer le soir (photosensibilité)"},
      {classe:"Association PBO + adapalène — optimale", dci:["Adapalène 0,1% + PBO 2,5%"], specialites:["Epiduo®"], couleur:"#6B2D5E", remarque:"Gold standard acné légère-modérée. Synergie : adapalène désengorge + PBO élimine C. acnes"},
    ],
    interactions: [
      "PBO + rétinoïdes topiques simultanés : inactivation du rétinoïde (oxydation) — appliquer à des moments différents (matin PBO / soir rétinoïde) ou utiliser Epiduo® (formulation stabilisée)",
      "Doxycycline + antiacides (calcium, magnésium, aluminium) : chélation → ↓ absorption — espacer 2 h",
      "Doxycycline + pilule : interaction non significative cliniquement (contrairement à la croyance populaire — études claires)",
    ],
    points_cles: [
      "4 mécanismes à combiner pour traiter l'acné : séborrhée (rétinoïdes) + kératose (PBO + rétinoïdes) + bactérie (PBO + ATB) + inflammation (ATB + rétinoïdes)",
      "Antibiotiques topiques : JAMAIS en monothérapie (résistances) → toujours associer PBO",
      "Epiduo® (adapalène + PBO) : gold standard acné légère-modérée — efficacité supérieure à chaque composant seul",
      "PBO : blanchit les tissus — informer et conseiller de laisser sécher avant de s'habiller",
      "Rétinoïdes topiques : appliquer le soir sur peau sèche (15 min après lavage) + crème solaire le matin",
    ],
  },
  n3: {
    saviez_vous: "L'isotrétinoïne orale (Curacné®, Contracné®) est l'unique traitement éradiquant définitivement l'acné dans 80 % des cas après une cure complète (0,5–1 mg/kg/j pendant 4–6 mois). Son mécanisme implique tous les 4 facteurs pathogéniques simultanément — mais sa tératogénicité exige un programme de prévention grossesse strict (PregnancyPrevention Programme, PPP).",
    physiopatho: "Récepteurs RAR et RXR dans l'acné : les rétinoïdes agissent via les récepteurs nucléaires RAR (Retinoic Acid Receptor α, β, γ) et RXR. L'adapalène est un agoniste sélectif des RARβ et RARγ (épidermiques) → normalise la différenciation kératinocytaire sans les effets systémiques de l'acide rétinoïque. L'isotrétinoïne (acide 13-cis-rétinoïque) active tous les RAR et RXR → effet pan-rétinoïdique → ↓ sécrétion sébacée (jusqu'à 90 %), normalisation de la kératinisation, effet anti-inflammatoire et antibactérien indirect.",
    pharmacocinetique: "Isotrétinoïne (Curacné®) : biodisponibilité 25 % à jeun, 50 % au cours d'un repas gras → TOUJOURS prendre avec un repas. T½ = 10–20 h (isotrétinoïne) + 20–29 h (4-oxo-isotrétinoïne, métabolite actif). Métabolisme hépatique (CYP2C8, CYP3A4). Élimination : fèces (66 %) et urine (22 %). Tératogène : passage placentaire élevé → malformations cardiaques, craniofaciales, SNC.",
    cas_clinique: "Femme 22 ans, acné nodulo-kystique sévère (grade 4) résistante à la doxycycline 100 mg/j (6 mois) + Epiduo®. Souhaite l'isotrétinoïne orale. Comment procédez-vous ?\n\nRaisonnement : indication isotrétinoïne confirmée (acné sévère réfractaire). PPP (Pregnancy Prevention Programme) obligatoire : contraception efficace (2 méthodes dont 1 mécanique) depuis 1 mois avant le début, pendant et 1 mois après. Test de grossesse négatif dans les 3 jours précédant la prescription (validé par le médecin). Prescription mensuelle limitée. Ordonnance sur formulaire spécial horodate. Le pharmacien ne délivre pas sans conformité complète.",
    effets_secondaires: [
      {label:"Tératogénicité isotrétinoïne orale : malformations sévères — PPP OBLIGATOIRE (contraception × 2 + test grossesse mensuel)", niveau:"danger"},
      {label:"Chéilite (95 % des patients), sécheresse muqueuses, épistaxis fréquents (quasi-constants)", niveau:"warning"},
      {label:"Hypertriglycéridémie (30 % des cas) — surveiller bilan lipidique à M1 et M3", niveau:"warning"},
      {label:"Syndrome dépressif (relation causale débattue mais signalée — informer le patient et ses proches)", niveau:"warning"},
    ],
    classes: [
      {classe:"Isotrétinoïne orale — acné sévère réfractaire", dci:["Isotrétinoïne 0,5–1mg/kg/j"], specialites:["Curacné®","Contracné®","Procuta®","Isotrétinoïne génériques"], couleur:"#C0392B", remarque:"Ordonnance spéciale horodatée mensuelle. PPP strict. Prise avec repas gras obligatoire. Durée cumulée totale selon dose"},
      {classe:"Doxycycline (acné modérée-sévère systémique)", dci:["Doxycycline 100mg/j"], specialites:["Tolexine®","Vibramycine®","Granudoxy®"], couleur:"#1E3A5F", remarque:"6 sem à 3 mois maximum + PBO local simultané. Prise le matin en position assise avec eau abondante (risque œsophagite)"},
      {classe:"Lymécycline (acné modérée — meilleure tolérance)", dci:["Lymécycline 300mg/j"], specialites:["Tetralysal 300®"], couleur:"#B45309", remarque:"Tétracycline de 2e génération. Meilleure tolérance digestive que doxycycline. Même CI (grossesse, < 8 ans)"},
    ],
    interactions: [
      "Isotrétinoïne + tétracyclines (doxycycline) : CI absolue — risque d'hypertension intracrânienne bénigne (pseudotumor cerebri)",
      "Isotrétinoïne + vitamine A : CI — toxicité additive (hypervitaminose A)",
      "Doxycycline + antiacides (calcium, magnésium, fer, zinc) : chélation → ↓ absorption jusqu'à 80 % — espacer de 3 h",
    ],
    points_cles: [
      "Isotrétinoïne : tératogène de classe X → PPP strict (2 contraceptions + test mensuel) — responsabilité médecin ET pharmacien",
      "Tétracyclines + isotrétinoïne = CI absolue (HIC — hypertension intracrânienne)",
      "Doxycycline : prendre avec 250 mL d'eau, assis ou debout, 30 min avant de se coucher (prévention œsophagite)",
      "Bilan lipidique sous isotrétinoïne : à J0, M1 et M3 (hypertriglycéridémie dans 30 % des cas)",
      "PPP délivrance officine : vérifier ordonnance horodatée + accord contraception + délai ≤ 7 jours",
    ],
  },
  n4: {
    saviez_vous: "Depuis 2021, la prescription d'isotrétinoïne est soumise en France au système GPIB (Guide de Prescription en cas d'Isotrétinoïne pour les femmes en âge de procréer) remplacé par le système de pharmacovigilance renforcée. La délivrance officinale doit être effectuée dans les 7 jours suivant la prescription et ne peut excéder 1 mois de traitement. Toute anomalie (ordonnance > 7 jours, pas de test grossesse daté) doit conduire à refuser la délivrance.",
    physiopatho: "Microbiome cutané et acné : des études récentes montrent que C. acnes comprend plusieurs lignées génétiques — la lignée IA1 est plus fréquemment associée à l'acné inflammatoire. Le microbiome cutané équilibré (avec Staphylococcus epidermidis et Cutibacterium avidum) serait protecteur contre la prolifération pathogène de C. acnes. L'utilisation abusive d'antibiotiques locaux perturbe cet équilibre — argument supplémentaire pour limiter leur utilisation dans le temps.",
    recommandations: "ANSM / SFD 2021 — Acné : traitement selon le grade. Grade 1 (légère) : Epiduo® ou PBO + rétinoïde topique. Grade 2 (modérée papulo-pustuleuse) : tétracycline orale 3 mois + Epiduo® topique. Grade 3 (sévère) : isotrétinoïne si 2 traitements systémiques insuffisants. Grade 4 (nodulo-kystique) : isotrétinoïne d'emblée.",
    situations_complexes: "Acné de la femme adulte (> 25 ans) : souvent hormonodépendante (poussées péri-menstruelles + localisée sur la mâchoire) → traitement anti-androgénique : pilule anti-androgénique (acétate de cyprotérone + éthinylestradiol = Diane 35®) — mais Diane 35® est prescrite avec des précautions particulières (ANSM) en raison du risque thromboembolique supérieur aux autres pilules.\n\nAcné kéloïde (cicatrices hypertrophiques) : prévenir dès le début du traitement — corticoïdes intra-lésionnels ou gel de silicone en prévention.\n\nAcné du nourrisson et de l'enfant prépubère : rare, évoquer une cause endocrinienne (hyperandrogénisme).",
    effets_secondaires: [
      {label:"Diane 35® : risque thromboembolique veineux × 4 vs pilule de référence — prescription strictement encadrée ANSM", niveau:"danger"},
      {label:"Isotrétinoïne : rhabdomyolyse (rare, signalée avec exercice intense — surveiller CPK si sportif)", niveau:"warning"},
      {label:"Doxycycline + photosensibilisation : coups de soleil sévères — photoprotection obligatoire tout le traitement", niveau:"warning"},
      {label:"Isotrétinoïne + don de sang : CI pendant le traitement et 1 mois après (sang tératogène)", niveau:"danger"},
    ],
    classes: [
      {classe:"Acétate de cyprotérone + EE (anti-androgénique)", dci:["Acétate de cyprotérone 2mg + Éthinylestradiol 35µg"], specialites:["Diane 35®","Holgyème®"], couleur:"#C0392B", remarque:"AMM acné androgéno-dépendante sévère femme + contraception. Risque TVP × 4 vs pilule norgestimate — prescription encadrée ANSM"},
      {classe:"Zinc gluconate oral (acné légère-modérée)", dci:["Zinc gluconate 13,2mg éq. Zn²⁺"], specialites:["Rubozinc®"], couleur:"#1B6B52", remarque:"Mécanisme : anti-inflammatoire + inhibition lipases bactériennes + ↓ DHT. Efficacité modeste mais bon profil sécurité"},
      {classe:"Spironolactone (acné femme adulte — hors AMM)", dci:["Spironolactone 25–100mg/j"], specialites:["Aldactone®"], couleur:"#6B2D5E", remarque:"Anti-androgénique puissant — hors AMM acné en France mais très utilisé (USA : AMM acné femme en cours). CI grossesse (féminisation fœtus masculin)"},
    ],
    interactions: [
      "Diane 35® + tabac : CI absolue > 35 ans (risque thromboembolique cumulatif)",
      "Spironolactone + IEC/ARA2 + potassium : hyperkaliémie — surveiller ionogramme",
      "Isotrétinoïne + don de sang : interdit pendant le traitement et 1 mois après — informer systématiquement",
    ],
    points_cles: [
      "Contrôle délivrance isotrétinoïne : ordonnance ≤ 7 jours + test grossesse daté ≤ 3 j + accord contraception — refuser si non conforme",
      "Diane 35® : risque TVP × 4 → prescrire uniquement si indication stricte (acné androgénique + contraception) et pas d'ATCD thromboembolique",
      "Zinc (Rubozinc®) : alternative sans ordonnance dans les acnés légères, bon profil sécurité, efficacité modeste",
      "Dépistage cicatrices dès J0 : orienter vers le dermatologue si tendance cicatricielle (chéloïdes, cicatrices hypertrophiques)",
      "Don de sang : informer chaque patient sous isotrétinoïne — interdit pendant le traitement et 1 mois après",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F13 — DERMITE SÉBORRHÉIQUE
   ════════════════════════════════════════════════════════ */
FN['dermite-seborrheique'] = {
  n2: {
    saviez_vous: "La dermite séborrhéique touche 5 % de la population générale mais jusqu'à 80 % des patients atteints de VIH/SIDA — son aggravation soudaine chez un patient jeune doit faire évoquer une immunodépression. Malassezia furfur (levure) est impliquée mais n'est pas la cause unique — la réponse inflammatoire de l'hôte joue un rôle majeur.",
    physiopatho: "Facteurs impliqués :\n1. Malassezia spp. (levures lipophiles commensales) : colonisent les zones riches en sébum (cuir chevelu, naso-labiales, sourcils, conduit auditif). Produisent des lipases → acides gras libres irritants → activation de la réponse inflammatoire.\n2. Séborrhée : ↑ production de sébum → substrat pour Malassezia (lipophile). Distribution des lésions suit les zones séborrhéiques.\n3. Réponse immunitaire : activation innée (TLR2) → IL-1β, IL-8 → inflammation cutanée. Les patients immunodéprimés font des formes extensives car la réponse Th17 protectrice est abolie.",
    mecanisme: "Kétoconazole 2 % (shampooing + crème) : inhibition de l'enzyme lanostérol-14α-déméthylase (CYP51A1 fongique) → ↓ synthèse d'ergostérol (composant essentiel de la membrane fongique) → mort cellulaire. Application topique uniquement — pas d'absorption systémique significative dans les formulations shampooing.\n\nCiclopirox olamine 1 % : anti-fongique topique à mécanisme différent — chélation des ions ferriques → perturbation des enzymes fer-dépendantes de Malassezia. Plus large spectre que le kétoconazole (aussi actif sur bactéries Gram+).\n\nDC de faible puissance (hydrocortisone 1 %) : anti-inflammatoires en traitement d'attaque des poussées sévères sur le visage. À éviter au long cours (atrophie).",
    diagnostic: "Clinique : érythème + desquamation grasse (squames jaunâtres, grasses) sur les zones séborrhéiques (sillon naso-labial, sourcils, glabelle, cuir chevelu, oreilles, milieu du thorax). Distinction avec psoriasis du cuir chevelu (squames sèches, épaisses, argentées + atteinte ongles ± rhumatisme). Distinction avec rosacée (érythème centrofacial sans desquamation grasse).",
    effets_secondaires: [
      {label:"Kétoconazole shampooing : irritation oculaire si contact — rincer abondamment", niveau:"info"},
      {label:"DC visage au long cours : atrophie, vergetures, télangiectasies — usage limité < 7 jours", niveau:"danger"},
      {label:"Ciclopirox : légère irritation initiale, pellicules paradoxales les 1ères applications", niveau:"info"},
    ],
    classes: [
      {classe:"Kétoconazole 2 % — traitement de référence", dci:["Kétoconazole 2%"], specialites:["Kétoderm® crème","Kétoconazole shampooing 2%"], couleur:"#1B6B52", remarque:"Crème 2× 4 sem (cuir chevelu) ou 4 sem (visage). Entretien : 1× / sem. CI kétoconazole oral systémique (hépatotoxicité)"},
      {classe:"Ciclopirox olamine 1 % — alternative ou résistance", dci:["Ciclopirox olamine 1%"], specialites:["Sebiprox® shampooing","Mycoster® crème 1%"], couleur:"#1E3A5F", remarque:"Large spectre anti-fongique + antibactérien. Shampooing 2× / sem pendant 4 sem puis 1× / sem en entretien"},
      {classe:"Sélénium sulfure 2,5 % — cuir chevelu résistant", dci:["Sélénium sulfure 2,5%"], specialites:["Selsun® shampooing"], couleur:"#B45309", remarque:"Anti-fongique + anti-séborrhéique direct. Contact 5–10 min avant rinçage. Colore les cheveux décolorés (prévenir)"},
    ],
    interactions: [
      "Kétoconazole crème : pas d'interactions systémiques significatives (absorption négligeable en topique)",
      "DC (hydrocortisone) + kétoconazole crème simultanés : acceptable en attaque si composante inflammatoire marquée",
    ],
    points_cles: [
      "Dermite séborrhéique = maladie chronique récidivante — expliquer qu'il n'y a pas de guérison mais un contrôle durable",
      "Kétoconazole shampooing 2 % : laisser poser 5 min avant de rincer — contact insuffisant si rincé immédiatement",
      "VIH/SIDA : dermite séborrhéique sévère ou inhabituelle = signe d'alerte d'immunodépression",
      "Entretien mensuel (1× / sem) : prévenir les rechutes qui surviennent invariablement à l'arrêt",
      "Distinction clinique psoriasis / DS : squames sèches épaisses argentées (psoriasis) vs squames grasses jaunâtres (DS)",
    ],
  },
  n3: {
    saviez_vous: "Malassezia restricta (espèce dominante dans la DS du cuir chevelu adulte) est une levure obligatoirement lipophile — elle ne peut pas synthétiser ses propres acides gras et dépend entièrement du sébum cutané. C'est pourquoi la DS récidive invariablement : dès que l'antifongique est arrêté, Malassezia recolonise rapidement les zones séborrhéiques.",
    physiopatho: "Mécanisme de virulence de Malassezia : les lipases sécrétées hydrolysent les triglycérides du sébum en acides gras libres (AGL) → AGL insaturés (acide oléique, acide linoléique) perturbent la barrière épidermique → pénétration des composants pariétaux de Malassezia (βD-glucane, zymosan) → activation TLR2 et Dectin-1 des kératinocytes → cascade NF-κB → IL-1α, IL-8, TNF-α → recrutement des neutrophiles → inflammation.",
    pharmacocinetique: "Kétoconazole 2 % (topique) : absorption cutanée < 1 % en peau normale, légèrement ↑ en peau enflammée. Concentration dans les couches supérieures de la peau (stratum corneum) → supérieure à la CMI pour Malassezia. Pas d'effet systémique aux doses topiques.",
    cas_clinique: "Patient 35 ans, DS du cuir chevelu et du visage évoluant depuis 2 ans. Kétoconazole shampooing 2× / sem insuffisant. Squames grasses abondantes + érythème sourcils. VIH : statut inconnu. Que proposez-vous ?\n\nRaisonnement : DS résistante ou insuffisamment contrôlée → 1. Vérifier la technique d'application (laisser poser 5 min). 2. Associer ciclopirox crème sur le visage + kétoconazole shampooing. 3. Si DS sévère et étendue chez un patient de 35 ans → évoquer VIH → orienter vers un médecin pour sérologie. Pas d'antifongique systémique en 1ère intention dans la DS (rapport bénéfice/risque défavorable).",
    effets_secondaires: [
      {label:"Kétoconazole oral systémique (contre-indiqué dans la DS — hépatotoxicité grave, interactions médicamenteuses)", niveau:"danger"},
      {label:"Sélénium sulfure : coloration des cheveux clairs ou décolorés en jaune-orangé", niveau:"info"},
      {label:"Pityriasis versicolor vs DS du thorax : différenciation par examen à la lampe de Wood (fluorescence jaune-dorée)", niveau:"info"},
    ],
    classes: [
      {classe:"Piroctone olamine (alternative à kétoconazole)", dci:["Piroctone olamine 1%"], specialites:["Présent dans de nombreux shampooings antipelliculaires cosmétiques"], couleur:"#1B6B52", remarque:"Moins puissant que kétoconazole mais utilisable en entretien long terme. Bien toléré"},
      {classe:"Huile de cade (antipelliculaire traditionnel)", dci:["Distillat de bois de cade"], specialites:["Caditar® shampooing"], couleur:"#555", remarque:"Kératolytique + antiseptique. Efficacité clinique modeste. Odeur forte — observance parfois difficile"},
    ],
    interactions: [
      "Ciclopirox + médicaments cytotoxiques ou immunosuppresseurs : pas d'interaction connue (topique — absorption négligeable)",
    ],
    points_cles: [
      "Malassezia : levure obligatoirement lipophile → recolonise dès l'arrêt de l'antifongique → traitement d'entretien mensuel OBLIGATOIRE",
      "DS sévère chez sujet jeune + immunodépression : évoquer VIH → orienter vers sérologie",
      "Kétoconazole systémique : CI dans la DS (hépatotoxicité + interactions CYP3A4 — rapport B/R défavorable vs topique)",
      "Lampe de Wood : fluorescence jaune-dorée = Malassezia (pityriasis versicolor) — utile pour différencier du psoriasis",
      "DS du conduit auditif : ciclopirox olamine ou kétoconazole crème 2 % en instillation douce — attention tympan perforé",
    ],
  },
  n4: {
    saviez_vous: "La dermite séborrhéique fait partie du spectre des maladies liées à Malassezia — qui inclut aussi le pityriasis versicolor, la folliculite à Malassezia, l'otite externe fongique et une forme d'eczéma atopique (DA malassezia-sensibilisée). Dans la DA avec sensibilisation à Malassezia (IgE anti-Malassezia positives), le kétoconazole topique apporte un bénéfice supplémentaire sur le contrôle des lésions.",
    physiopatho: "Lien DS et maladie de Parkinson : la DS est 3× plus fréquente dans la maladie de Parkinson que dans la population générale. L'α-synucléine parkinsonnienne altèrerait la fonction des cellules de Langerhans cutanées → réponse immunitaire diminuée → prolifération accrue de Malassezia. C'est un exemple de lien inattendu peau-cerveau (axe neurologique-cutané).",
    recommandations: "SFD 2019 — Dermite séborrhéique : kétoconazole 2 % (shampooing ou crème) = traitement de référence en attaque (4–6 semaines) puis entretien (1 application/semaine). Ciclopirox = alternative. DC de faible puissance (hydrocortisone 1 %) en association courte si composante inflammatoire marquée (maximum 2 semaines). Lithium gluconate 8 % gel (Lithioderm®) : anti-séborrhéique à mécanisme different (↓ sécrétion sébacée) — disponible mais peu utilisé.",
    situations_complexes: "DS et VIH : traitement identique mais souvent nécessité de traitement d'entretien plus fréquent (1–2×/semaine). Si DS très sévère → itraconazole oral 200 mg/j × 7 j en cure courte (efficacité prouvée mais risque hépatique — surveillance bilan hépatique).\n\nDS du nourrisson (chapeau du bébé ou croûtes de lait) : physiologique dans les 3 premiers mois (séborrhée néonatale passagère). Traitement : émollients + huile végétale avant shampooing doux. Pas d'antifongique en première intention.\n\nDS et rosacée : association fréquente (zones communes — centrofaciale). Traiter les deux composantes séparément.",
    effets_secondaires: [
      {label:"Itraconazole oral (DS sévère VIH) : hépatotoxicité, interactions CYP3A4 nombreuses — surveiller bilan hépatique", niveau:"danger"},
      {label:"Kétoconazole crème + zone étendue chez immunodéprimé : absorption légèrement augmentée — interactions théoriques", niveau:"info"},
    ],
    classes: [
      {classe:"Lithium gluconate 8 % (anti-séborrhéique)", dci:["Lithium gluconate 8%"], specialites:["Lithioderm® gel"], couleur:"#B45309", remarque:"Mécanisme : ↓ activité lipase Malassezia + effet anti-séborrhéique direct. Alternative pour les patients ne répondant pas aux azolés"},
      {classe:"Itraconazole oral (DS sévère résistante — VIH)", dci:["Itraconazole 200mg/j"], specialites:["Sporanox®"], couleur:"#C0392B", remarque:"Réservé aux DS sévères VIH ou résistantes. Surveiller bilan hépatique. Nombreuses interactions CYP3A4 — vérifier la liste"},
    ],
    interactions: [
      "Itraconazole oral + inhibiteurs pompe à protons (oméprazole) : ↓ absorption itraconazole (nécessite pH acide) — prendre à jeun avec boisson acide",
      "Itraconazole oral + statines (simvastatine, lovastatine) : inhibition CYP3A4 → ↑ statine → rhabdomyolyse — CI",
      "Itraconazole + amiodarone, quinidine, astemizole : CI — risque torsades de pointe",
    ],
    points_cles: [
      "DS = maladie chronique — éduquer sur le traitement d'entretien mensuel pour prévenir les rechutes",
      "DS sévère sujet jeune : orientation sérologie VIH — signes d'alerte d'immunodépression",
      "Croûtes de lait nourrisson (DS néonatale) : physiologique, traitement doux (huile végétale + shampooing doux) — pas d'antifongique",
      "DS + DA malassezia-sensibilisée (IgE anti-Malassezia+) : kétoconazole topique apporte un bénéfice supplémentaire",
      "Lithioderm® : option pour les patients ne répondant pas aux azolés — mécanisme différent (lithium inhibe la lipase de Malassezia)",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F14 — PSORIASIS
   ════════════════════════════════════════════════════════ */
FN['psoriasis'] = {
  n2: {
    saviez_vous: "Le psoriasis n'est pas qu'une maladie de peau : c'est une maladie inflammatoire systémique. 30 % des patients développent un rhumatisme psoriasique (atteinte articulaire), et le psoriasis sévère est associé à un risque cardiovasculaire augmenté de 50 % — comparable à celui du diabète. Le dermatologue doit dépister ces comorbidités, pas seulement traiter la peau.",
    physiopatho: "Axe IL-23/Th17 : des cellules dendritiques activées (par un trigger — stress, infection, traumatisme = phénomène de Koebner) sécrètent l'IL-23 → active les lymphocytes Th17 → sécrétion d'IL-17A, IL-17F, IL-22 → ces cytokines stimulent les kératinocytes :\n• ↑ Prolifération kératinocytaire (cycle cellulaire raccourci de 28 jours à 3-5 jours) → épaississement épidermique (squames).\n• ↑ Production de peptides antimicrobiens et chémokines → recrutement de neutrophiles (pustules de Munro dans l'épiderme).\n• Angiogenèse dermique → érythème caractéristique.",
    mecanisme: "Dermocorticoïdes (DC) forts : transrépression NF-κB → ↓ cytokines pro-inflammatoires → réduction de l'épaisseur des plaques. Utilisés en attaque, jamais en continu (tachyphylaxie + effet rebond à l'arrêt).\n\nAnalogues de la vitamine D (calcipotriol) : se lient au récepteur VDR → inhibent la prolifération kératinocytaire + favorisent la différenciation normale → normalisation de l'épiderme. Synergie avec les DC (association fixe).\n\nAssociation fixe calcipotriol + bétaméthasone (Daivobet®) : synergie pharmacologique démontrée — chacun potentialise l'autre, meilleure tolérance que chaque composant seul à dose équivalente.",
    diagnostic: "Clinique : plaques érythémato-squameuses bien limitées, squames blanches nacrées, sur les zones de frottement (coudes, genoux, cuir chevelu, région lombo-sacrée). Signe de la tache de bougie (grattage doux → squames blanchâtres) et signe de la rosée sanglante (Auspitz). PASI (Psoriasis Area and Severity Index) : score de sévérité utilisé dans les essais cliniques et pour orienter vers les biothérapies.",
    effets_secondaires: [
      {label:"Tachyphylaxie (DC forts long cours) — perte d'efficacité progressive", niveau:"warning"},
      {label:"Effet rebond à l'arrêt brutal des DC forts — peut déclencher un psoriasis pustuleux généralisé", niveau:"danger"},
      {label:"Hypercalcémie (calcipotriol si surface > 30 % du corps ou dose excessive)", niveau:"warning"},
      {label:"Atrophie cutanée, télangiectasies (DC forts au long cours sur zones fines : visage, plis)", niveau:"danger"},
    ],
    classes: [
      {classe:"Association fixe calcipotriol + bétaméthasone — 1ère intention", dci:["Calcipotriol 50µg/g + Bétaméthasone dipropionate 0,5mg/g"], specialites:["Daivobet®","Enstilar® (mousse)"], couleur:"#1B6B52", remarque:"1 application/j × 4 sem (attaque) puis entretien 2×/sem. Enstilar® mousse : meilleure pénétration cuir chevelu"},
      {classe:"DC forts seuls — zones spécifiques", dci:["Clobétasol propionate 0,05%","Bétaméthasone dipropionate 0,05%"], specialites:["Dermoval®","Diprolène®"], couleur:"#B45309", remarque:"Cuir chevelu (lotion), paumes/plantes (peau épaisse). Max 4 semaines continues"},
      {classe:"Kératolytiques — desquamation des plaques épaisses", dci:["Acide salicylique 5–10%","Urée 10%"], specialites:["Diprosalic® (+ bétaméthasone)","Kertyol P.S.O®"], couleur:"#1E3A5F", remarque:"Préparation avant traitement actif sur plaques très squameuses (cuir chevelu notamment)"},
    ],
    interactions: [
      "Calcipotriol + acide salicylique simultanés : inactivation du calcipotriol (instabilité en milieu acide) — espacer les applications",
      "DC forts + occlusion (pansement) : ↑ absorption systémique × 10-100 — surveiller si grande surface",
      "Calcipotriol + suppléments calcium/vitamine D oraux à forte dose : risque cumulé d'hypercalcémie (rare)",
    ],
    points_cles: [
      "Phénomène de Koebner : tout traumatisme cutané (griffure, tatouage, brûlure) peut déclencher une plaque de psoriasis au site",
      "Daivobet®/Enstilar® : 1ère intention — synergie calcipotriol + bétaméthasone supérieure à chaque composant seul",
      "Jamais de DC forts en continu > 4 semaines : tachyphylaxie + risque de rebond (parfois pustuleux généralisé)",
      "Rhumatisme psoriasique : dépister systématiquement (douleurs articulaires, raideur matinale) chez tout psoriasique",
      "Risque cardiovasculaire : psoriasis sévère = facteur de risque CV indépendant — comme un diabète",
    ],
  },
  n3: {
    saviez_vous: "Les biothérapies anti-IL-17 (sécukinumab, ixékizumab) et anti-IL-23 (guselkumab, risankizumab) ont révolutionné le traitement du psoriasis modéré-sévère : un PASI 90 (réduction de 90 % des lésions) est désormais atteint chez 70-80 % des patients sous anti-IL-23, contre seulement 20-30 % sous méthotrexate dans les années 2000.",
    physiopatho: "Cascade IL-23/IL-17 détaillée : l'IL-23 (hétérodimère p19/p40) est produite par les cellules dendritiques et les macrophages activés → se lie au récepteur IL-23R sur les Th17 → maintien et expansion de la population Th17 mémoire (la véritable cible thérapeutique du psoriasis chronique). Les Th17 sécrètent IL-17A/F qui se lient au récepteur IL-17RA des kératinocytes → activation NF-κB et MAPK → hyperprolifération + sécrétion de chémokines (CXCL1, CXCL8) → recrutement de neutrophiles formant les micro-abcès de Munro caractéristiques histologiquement.",
    pharmacocinetique: "Méthotrexate (psoriasis modéré-sévère, voie orale ou SC) : Tmax = 1-2 h, T½ = 3-10 h (dose-dépendante), élimination rénale principalement. Polyglutamation intracellulaire → forme de réserve active prolongée. Toxicité hépatique cumulative — dose cumulée à vie à surveiller.\n\nSécukinumab (anti-IL-17A) : SC, T½ = 27 jours (IgG1), Tmax = 6 jours. Catabolisme protéique. Dose de charge hebdomadaire puis mensuelle.\n\nApremilast (inhibiteur PDE4 oral) : Tmax = 2,5 h, T½ = 6-9 h, métabolisme CYP3A4 et CYP1A2. ↑ AMPc intracellulaire → ↓ production de cytokines pro-inflammatoires (TNF-α, IL-17, IL-23) de façon plus large mais moins puissante que les biothérapies ciblées.",
    cas_clinique: "Patient 45 ans, psoriasis en plaques touchant 25 % de la surface corporelle (PASI 18), échec du méthotrexate 15 mg/sem (hépatotoxicité légère) et de la photothérapie UVB. Pas d'atteinte articulaire. Que proposez-vous ?\n\nRaisonnement : psoriasis modéré-sévère (PASI > 10 ou surface > 10 %) en échec de 2 traitements systémiques conventionnels → indication biothérapie. Choix anti-IL-17 (sécukinumab) ou anti-IL-23 (guselkumab/risankizumab) — les anti-IL-23 ont un profil de sécurité à long terme excellent et un espacement d'injection plus large (q8-12 semaines vs q4 semaines pour l'anti-IL-17). Bilan pré-thérapeutique : sérologies hépatites, tuberculose (IDR ou test interféron), VIH.",
    effets_secondaires: [
      {label:"Méthotrexate : hépatotoxicité cumulative, pneumopathie interstitielle, cytopénies — bilan hépatique régulier", niveau:"danger"},
      {label:"Anti-IL-17 : candidoses mucocutanées (mécanisme classe — IL-17 protège contre Candida)", niveau:"warning"},
      {label:"Anti-TNF (si utilisé) : réactivation tuberculose latente — dépistage obligatoire avant initiation", niveau:"danger"},
      {label:"Apremilast : diarrhée, nausées (30 % — souvent transitoires en début de traitement)", niveau:"warning"},
    ],
    classes: [
      {classe:"Anti-IL-17A (biothérapie ciblée)", dci:["Sécukinumab 300mg SC","Ixékizumab 80mg SC"], specialites:["Cosentyx®","Taltz®"], couleur:"#991B1B", remarque:"PASI 90 chez 65-70 % à S16. Risque accru de candidoses (mécanisme classe IL-17)"},
      {classe:"Anti-IL-23 (p19) — efficacité et espacement supérieurs", dci:["Guselkumab 100mg SC","Risankizumab 150mg SC"], specialites:["Tremfya®","Skyrizi®"], couleur:"#6B2D5E", remarque:"PASI 90 chez 75-80 % à S16. Injection q8 (guselkumab) à q12 semaines (risankizumab) — excellente observance"},
      {classe:"Apremilast (inhibiteur PDE4 oral)", dci:["Apremilast 30mg × 2/j"], specialites:["Otezla®"], couleur:"#B45309", remarque:"Voie orale — alternative si refus des injections ou psoriasis modéré. Pas de bilan pré-thérapeutique lourd nécessaire"},
    ],
    interactions: [
      "Méthotrexate + AINS, triméthoprime-sulfaméthoxazole, IPP : ↑ toxicité méthotrexate (déplacement protéique, inhibition tubulaire)",
      "Méthotrexate + alcool : potentialisation hépatotoxicité — éviter ou limiter strictement",
      "Apremilast + inducteurs CYP3A4 forts (rifampicine) : ↓ exposition apremilast → perte d'efficacité",
    ],
    points_cles: [
      "PASI 90 = nouveau standard d'efficacité visé par les biothérapies modernes (vs PASI 75 historique)",
      "Anti-IL-23 : meilleur profil sécurité long terme + espacement d'injection (q8-12 sem) → excellente observance",
      "Bilan pré-biothérapie obligatoire : tuberculose latente, hépatites B/C, VIH avant toute initiation",
      "Anti-IL-17 : risque classe de candidoses mucocutanées (IL-17 a un rôle protecteur antifongique physiologique)",
      "Méthotrexate : supplémenter en acide folique (5 mg, 48h après la prise) pour réduire la toxicité digestive et hépatique",
    ],
  },
  n4: {
    saviez_vous: "Le psoriasis pustuleux généralisé de von Zumbusch est une urgence dermatologique potentiellement mortelle (fièvre élevée, pustules stériles confluentes, défaillance multiviscérale possible). Il peut être déclenché par l'arrêt brutal d'une corticothérapie systémique chez un psoriasique — règle absolue : ne jamais prescrire de corticoïdes oraux dans le psoriasis (sauf cas exceptionnels en milieu spécialisé).",
    physiopatho: "Comorbidités systémiques du psoriasis sévère : le psoriasis modéré-sévère partage des voies inflammatoires communes (TNF-α, IL-17, IL-23) avec l'athérosclérose → risque cardiovasculaire augmenté de 50 % (infarctus, AVC) indépendamment des facteurs de risque classiques. Syndrome métabolique 2× plus fréquent. La maladie de Crohn et le psoriasis partagent des loci génétiques de susceptibilité communs (IL-23R) — expliquant leur association épidémiologique fréquente.",
    recommandations: "HAS / SFD 2023 — Psoriasis : traitement topique (DC + analogues vitamine D) en 1ère intention si surface < 10 %. Photothérapie UVB à bande étroite si surface 10-30 % et échec topique. Traitements systémiques conventionnels (méthotrexate, ciclosporine, acitrétine) ou biothérapies si PASI > 10 ou surface > 10 % ou retentissement psychosocial majeur (même si surface limitée — visage, mains, organes génitaux). Dépistage systématique du rhumatisme psoriasique (questionnaire PEST) et du syndrome métabolique.",
    situations_complexes: "Grossesse : DC topiques de faible/moyenne puissance autorisés. Méthotrexate et acitrétine : CONTRE-INDICATION ABSOLUE (tératogènes majeurs) — contraception efficace obligatoire pendant et après (acitrétine : 3 ans après l'arrêt en raison de sa lipophilicité et stockage tissulaire). Biothérapies anti-TNF : certaines (certolizumab) ont un passage placentaire minimal et sont utilisables si nécessaire.\n\nPsoriasis et VIH : peut révéler ou s'aggraver avec l'infection VIH — formes sévères et atypiques. Bilan VIH à évoquer si psoriasis brutal et sévère chez un sujet à risque.\n\nPsoriasis unguéal isolé : souvent résistant aux topiques (mauvaise pénétration) — discuter biothérapie même si surface cutanée limitée si gêne fonctionnelle importante.",
    effets_secondaires: [
      {label:"Psoriasis pustuleux généralisé (von Zumbusch) après arrêt brutal de corticoïdes systémiques — urgence vitale", niveau:"danger"},
      {label:"Acitrétine : tératogène majeur — contraception obligatoire 3 ANS après l'arrêt (accumulation tissulaire)", niveau:"danger"},
      {label:"Ciclosporine long cours : néphrotoxicité cumulative, HTA — durée de traitement limitée dans le temps", niveau:"danger"},
      {label:"Anti-TNF : lupus induit, démyélinisation (rare) — surveiller signes neurologiques nouveaux", niveau:"warning"},
    ],
    classes: [
      {classe:"Acitrétine (rétinoïde oral — psoriasis pustuleux et érythrodermique)", dci:["Acitrétine 25-50mg/j"], specialites:["Soriatane®"], couleur:"#C0392B", remarque:"Tératogène majeur — contraception 3 ans après arrêt. Indication : formes pustuleuses, érythrodermiques, palmo-plantaires"},
      {classe:"Anti-TNF (alternative biothérapie historique)", dci:["Adalimumab 40mg SC","Étanercept 50mg SC"], specialites:["Humira® (+ biosimilaires)","Enbrel®"], couleur:"#1E3A5F", remarque:"Dépistage tuberculose latente obligatoire avant initiation. Efficacité PASI 75 chez 70 % — supplantés par anti-IL-17/23 en 1ère ligne biothérapie"},
      {classe:"Bimékizumab (double anti-IL-17A/F — nouvelle génération)", dci:["Bimékizumab 320mg SC"], specialites:["Bimzelx® (AMM EU 2021)"], couleur:"#991B1B", remarque:"Double blocage IL-17A et IL-17F → PASI 100 (clairance complète) chez plus de 60 % des patients — résultats parmi les meilleurs publiés"},
    ],
    interactions: [
      "Acitrétine + méthotrexate : CI absolue — toxicité hépatique cumulée sévère (hépatites fulminantes décrites)",
      "Acitrétine + tétracyclines : CI — risque d'hypertension intracrânienne bénigne (même mécanisme qu'isotrétinoïne)",
      "Anti-TNF + vaccins vivants : CI pendant le traitement — vacciner avant l'initiation",
    ],
    points_cles: [
      "Psoriasis pustuleux généralisé = urgence dermatologique — ne JAMAIS arrêter brutalement une corticothérapie systémique chez un psoriasique",
      "Acitrétine : contraception obligatoire jusqu'à 3 ANS après l'arrêt (très différent des 1 mois de l'isotrétinoïne)",
      "Dépistage systématique : rhumatisme psoriasique (PEST), syndrome métabolique, risque cardiovasculaire",
      "Bilan pré-biothérapie : tuberculose latente (IDR/IGRA), hépatites virales, VIH — avant toute initiation anti-TNF/IL-17/IL-23",
      "Psoriasis unguéal isolé invalidant : discuter biothérapie même si surface cutanée limitée (impact fonctionnel et psychologique)",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F15 — ROSACÉE
   ════════════════════════════════════════════════════════ */
FN['rosacee'] = {
  n2: {
    saviez_vous: "La rosacée a longtemps été appelée 'acné rosacée' mais n'a aucun lien physiopathologique avec l'acné — ce terme est aujourd'hui abandonné par les dermatologues. La consommation d'alcool ne CAUSE pas la rosacée (contrairement à la croyance populaire 'nez du buveur') mais peut déclencher des poussées de flush chez les personnes déjà atteintes, via une vasodilatation directe.",
    physiopatho: "Mécanismes principaux, souvent combinés selon le sous-type :\n1. Dysrégulation vasculaire : hyperréactivité des vaisseaux faciaux aux stimuli (chaleur, soleil, épices, alcool, stress) → flush répétés → télangiectasies permanentes par dilatation chronique.\n2. Inflammation immunitaire innée : ↑ expression de la cathélicidine (peptide antimicrobien) et de la kallicréine 5 → activation excessive du système immunitaire cutané → papulo-pustules inflammatoires.\n3. Demodex folliculorum : acarien commensal normalement présent en faible densité — surdensité chez les rosacéiques → rôle controversé mais traitement anti-Demodex efficace dans certaines formes.",
    mecanisme: "Métronidazole topique (0,75-1%) : mécanisme anti-inflammatoire direct (indépendant de son effet antiparasitaire classique) — inhibe la production de ROS (espèces réactives de l'oxygène) par les neutrophiles → ↓ inflammation papulo-pustuleuse. Pas d'effet sur l'érythème ou les télangiectasies.\n\nIvermectine topique (1%) : double action — anti-parasitaire sur Demodex (paralysie par hyperpolarisation des canaux chlorure glutamate-dépendants) + anti-inflammatoire propre. Supérieure au métronidazole dans les essais comparatifs directs (étude ATTRACT).\n\nBrimonidine gel (0,33%) : agoniste α2-adrénergique → vasoconstriction directe et puissante des vaisseaux dermiques superficiels → réduction immédiate de l'érythème (effet cosmétique, pas curatif — dure 8-12h).",
    diagnostic: "Classification en 4 sous-types (souvent associés) : érythémato-télangiectasique (flush + érythème permanent + télangiectasies), papulo-pustuleux (+ papules/pustules inflammatoires sans comédons — différence clé avec l'acné), phymateux (épaississement, rhinophyma), oculaire (blépharite, sécheresse, kératite). Topographie centrofaciale typique (joues, nez, menton, front) — épargne le pourtour (différence avec dermite séborrhéique).",
    effets_secondaires: [
      {label:"Brimonidine : effet rebond (érythème de rebond paradoxal après quelques heures) — phénomène décrit et fréquent", niveau:"warning"},
      {label:"Métronidazole topique : irritation légère, sécheresse (rare)", niveau:"info"},
      {label:"Doxycycline (forme inflammatoire) : photosensibilisation — protection solaire renforcée nécessaire", niveau:"warning"},
    ],
    classes: [
      {classe:"Métronidazole topique — papulo-pustules légères-modérées", dci:["Métronidazole 0,75-1%"], specialites:["Rozex® gel/crème","Rosiced®"], couleur:"#1B6B52", remarque:"1-2 applications/j. Délai d'action 3-4 semaines. Pas d'effet sur l'érythème de fond"},
      {classe:"Ivermectine topique — forme papulo-pustuleuse", dci:["Ivermectine 1%"], specialites:["Soolantra®"], couleur:"#1E3A5F", remarque:"1 application/j le soir. Supérieure au métronidazole (étude ATTRACT). Action anti-Demodex + anti-inflammatoire"},
      {classe:"Brimonidine gel — érythème (effet cosmétique)", dci:["Brimonidine tartrate 0,33%"], specialites:["Mirvaso®"], couleur:"#B45309", remarque:"Vasoconstricteur — effet sur 8-12h, pas curatif. Attention effet rebond possible en fin de journée"},
    ],
    interactions: [
      "Brimonidine + IMAO : CI théorique (potentialisation des effets adrénergiques) — vérifier les traitements concomitants",
      "Doxycycline + antiacides (calcium, fer, magnésium) : chélation → ↓ absorption — espacer de 2-3h",
      "Métronidazole topique : pas d'interaction systémique significative (absorption cutanée négligeable)",
    ],
    points_cles: [
      "Rosacée ≠ acné : pas de comédons dans la rosacée — différence clinique fondamentale pour le diagnostic",
      "Alcool ne cause pas la rosacée mais déclenche des flushs chez les personnes déjà atteintes",
      "Ivermectine topique > métronidazole en efficacité (étude comparative directe ATTRACT)",
      "Brimonidine = traitement symptomatique de l'érythème uniquement, effet temporaire (8-12h), pas curatif",
      "Éviction des déclencheurs : chaleur, soleil, épices, alcool, stress — counseling essentiel en complément du traitement",
    ],
  },
  n3: {
    saviez_vous: "Le laser à colorant pulsé (PDL) et la lumière pulsée intense (IPL) sont les traitements de référence pour les télangiectasies et l'érythème permanent de la rosacée — la pharmacothérapie topique n'a quasiment aucun effet sur les vaisseaux déjà dilatés de façon permanente, seulement sur la composante inflammatoire active.",
    physiopatho: "Rôle de la cathélicidine (LL-37) : chez les rosacéiques, la sérine protéase kallicréine 5 (KLK5) est anormalement activée dans l'épiderme → clive le précurseur de la cathélicidine (hCAP-18) en peptide LL-37 actif en excès → LL-37 a des propriétés pro-inflammatoires et pro-angiogéniques directes → recrutement de cellules inflammatoires + stimulation de la néoangiogenèse → explique à la fois les papulo-pustules ET les télangiectasies. C'est la cible moléculaire commune aux deux composantes de la maladie.",
    pharmacocinetique: "Ivermectine topique 1% : absorption systémique négligeable (< 0,1%) en application faciale aux doses recommandées. Pas d'interactions médicamenteuses systémiques cliniquement pertinentes contrairement à l'ivermectine orale (substrat P-gp et CYP3A4).\n\nDoxycycline sous-antimicrobienne (40mg LP, formulation spécifique Oracea® non disponible en France) : dose conçue pour obtenir l'effet anti-inflammatoire (inhibition des métalloprotéases matricielles) sans pression de sélection antibiotique — concept de 'dose sous-antimicrobienne'. En France, on utilise la doxycycline 100mg standard à visée anti-inflammatoire dans la rosacée papulo-pustuleuse modérée-sévère.",
    cas_clinique: "Femme 42 ans, rosacée érythémato-télangiectasique du visage depuis 5 ans, flush quotidiens déclenchés par le stress et la chaleur. Échec de la brimonidine (effet rebond gênant). Souhaite une solution durable. Que proposez-vous ?\n\nRaisonnement : la composante vasculaire fixe (télangiectasies) ne répond pas aux topiques — orienter vers un dermatologue pour laser à colorant pulsé ou lumière pulsée intense (3-5 séances, résultats durables sur les vaisseaux dilatés). En complément : éviction des déclencheurs identifiés (chaleur, stress) + photoprotection quotidienne (le soleil aggrave la composante vasculaire). La brimonidine reste une option ponctuelle pour les événements sociaux.",
    effets_secondaires: [
      {label:"Doxycycline dose anti-inflammatoire prolongée : photosensibilisation cumulative, candidoses (perturbation flore)", niveau:"warning"},
      {label:"Laser/IPL : hyperpigmentation post-inflammatoire transitoire (phototypes plus foncés)", niveau:"info"},
      {label:"Rosacée oculaire non traitée : kératite pouvant menacer la vision si sévère et négligée", niveau:"danger"},
    ],
    classes: [
      {classe:"Doxycycline dose anti-inflammatoire — papulo-pustuleuse modérée-sévère", dci:["Doxycycline 40-100mg/j"], specialites:["Tolexine®","Granudoxy®"], couleur:"#B45309", remarque:"Effet anti-métalloprotéase et anti-inflammatoire, indépendant de l'effet antibiotique. Cure 6-12 semaines"},
      {classe:"Acide azélaïque 15-20% — alternative topique", dci:["Acide azélaïque 15-20%"], specialites:["Skinoren® (hors indication officielle rosacée en France, AMM USA Finacea®)"], couleur:"#1B6B52", remarque:"Action anti-inflammatoire et anti-Demodex modérée. Alternative si intolérance au métronidazole/ivermectine"},
      {classe:"Cyclines naturelles (alternative si CI doxycycline)", dci:["Lymécycline 300mg/j"], specialites:["Tetralysal 300®"], couleur:"#1E3A5F", remarque:"Meilleure tolérance digestive que doxycycline standard. Même profil d'action anti-inflammatoire"},
    ],
    interactions: [
      "Doxycycline + rétinoïdes oraux (isotrétinoïne) : CI absolue — risque d'hypertension intracrânienne bénigne",
      "Acide azélaïque + autres topiques irritants (rétinoïdes) simultanés : risque de majoration de l'irritation cutanée",
    ],
    points_cles: [
      "Composante vasculaire fixe (télangiectasies) : ne répond pas à la pharmacothérapie — orienter vers laser/IPL",
      "Cathélicidine LL-37 : cible moléculaire commune expliquant à la fois l'inflammation et l'angiogenèse de la rosacée",
      "Doxycycline 'anti-inflammatoire' : effet indépendant de son action antibiotique (inhibition métalloprotéases)",
      "Rosacée oculaire : ne jamais négliger — orienter vers ophtalmologiste si symptômes oculaires (sécheresse, rougeur, gêne)",
      "Photoprotection quotidienne obligatoire : le soleil aggrave systématiquement toutes les composantes de la rosacée",
    ],
  },
  n4: {
    saviez_vous: "Le rhinophyma (épaississement et hypertrophie du nez par hyperplasie des glandes sébacées) est la complication la plus visible de la rosacée phymateuse, presque exclusivement chez l'homme. Contrairement à la croyance populaire, il n'est PAS lié à l'alcoolisme — cette association culturelle erronée a longtemps stigmatisé les patients. Le traitement est chirurgical (résection au laser CO2 ou électrochirurgie) une fois constitué — les topiques sont inefficaces sur le phyma établi.",
    physiopatho: "Lien rosacée et système nerveux : les neuropeptides (substance P, CGRP, VIP) libérés par les terminaisons nerveuses sensitives cutanées en réponse aux déclencheurs thermiques jouent un rôle central dans la vasodilatation et l'inflammation neurogène de la rosacée — expliquant pourquoi le stress et les variations thermiques (chaud/froid) sont des déclencheurs si constants. Cette composante neurovasculaire explique aussi la fréquente association avec la migraine et d'autres troubles neurovasculaires.",
    recommandations: "SFD 2023 — Rosacée : traitement selon le sous-type dominant. Érythémato-télangiectasique : brimonidine (érythème) + laser/IPL (télangiectasies) + photoprotection. Papulo-pustuleuse légère-modérée : ivermectine ou métronidazole topique. Papulo-pustuleuse sévère : doxycycline orale + topique. Phymateuse : chirurgie (laser CO2, électrochirurgie) si constituée. Oculaire : larmes artificielles + cyclines orales si sévère + avis ophtalmologique systématique.",
    situations_complexes: "Grossesse : métronidazole topique et azélaïque topique = sûrs. Doxycycline et autres cyclines : CONTRE-INDIQUÉES (coloration dentaire fœtale, toxicité osseuse). Privilégier métronidazole ou érythromycine topique si besoin d'un traitement systémique anti-inflammatoire (azithromycine alternative possible selon avis médical).\n\nRosacée et dermite péri-orale : association fréquente chez la femme jeune, souvent favorisée par l'usage prolongé de dermocorticoïdes sur le visage — piège classique : un patient avec rosacée traité par excès de DC peut développer une dermite péri-orale surajoutée, aggravant le tableau (cercle vicieux).\n\nRosacée fulminans (pyoderma faciale) : forme explosive, brutale, chez la femme jeune — corticothérapie orale courte initiale puis relais isotrétinoïne à faible dose sous stricte surveillance (CI grossesse).",
    effets_secondaires: [
      {label:"Usage prolongé de DC sur rosacée : aggravation paradoxale (rosacée cortico-induite) — piège diagnostique fréquent", niveau:"danger"},
      {label:"Rosacée fulminans non traitée : cicatrices définitives si retard de prise en charge", niveau:"warning"},
      {label:"Doxycycline grossesse : coloration dentaire définitive fœtale, toxicité osseuse — CI formelle", niveau:"danger"},
    ],
    classes: [
      {classe:"Isotrétinoïne faible dose (rosacée fulminans/phymateuse sévère)", dci:["Isotrétinoïne 0,1-0,3mg/kg/j"], specialites:["Curacné® (hors AMM officielle rosacée, usage spécialisé)"], couleur:"#C0392B", remarque:"Réservé aux formes sévères réfractaires en milieu spécialisé. Mêmes règles de contraception que dans l'acné"},
      {classe:"Laser CO2 / électrochirurgie — rhinophyma constitué", dci:["Traitement physique, non médicamenteux"], specialites:["Procédure chirurgicale dermatologique"], couleur:"#1E3A5F", remarque:"Seul traitement efficace une fois le phyma constitué — les topiques et antibiotiques sont inefficaces à ce stade"},
      {classe:"Cyclosporine collyre — rosacée oculaire sévère", dci:["Cyclosporine 0,05-0,1% collyre"], specialites:["Ikervis®"], couleur:"#6B2D5E", remarque:"AMM kératite sévère associée à la sécheresse oculaire — utilisée dans les rosacées oculaires sévères réfractaires"},
    ],
    interactions: [
      "Isotrétinoïne (rosacée) + tétracyclines : CI absolue — hypertension intracrânienne bénigne (même règle que dans l'acné)",
      "DC topiques chroniques sur rosacée : interaction physiopathologique (aggravation) plutôt que pharmacocinétique — à proscrire",
    ],
    points_cles: [
      "Piège majeur : ne JAMAIS prescrire de dermocorticoïdes sur une rosacée — aggravation paradoxale fréquente",
      "Rhinophyma : pas lié à l'alcool (idée reçue) — traitement uniquement chirurgical une fois constitué",
      "Doxycycline et cyclines : CI absolues en grossesse (coloration dentaire et toxicité osseuse fœtale)",
      "Rosacée fulminans : urgence dermatologique, prise en charge rapide pour limiter les cicatrices définitives",
      "Toute rosacée avec symptômes oculaires (sécheresse, rougeur, gêne) → avis ophtalmologique systématique",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F16 — MYCOSE CUTANÉE
   ════════════════════════════════════════════════════════ */
FN['mycose-cutanee'] = {
  n2: {
    saviez_vous: "Les dermatophytes (Trichophyton, Microsporum, Epidermophyton) sont des champignons kératinophiles — ils se nourrissent exclusivement de kératine et ne peuvent donc infecter que la peau, les cheveux/poils et les ongles, jamais les muqueuses. C'est l'inverse exact de Candida albicans, qui colonise préférentiellement les muqueuses humides.",
    physiopatho: "Les dermatophytes envahissent la couche cornée (kératine) via des enzymes kératinolytiques (kératinases) → digestion de la kératine → progression centrifuge caractéristique (bordure active, centre qui guérit) → lésion annulaire typique ('herpès circiné', terme historique trompeur car aucun lien avec le virus herpès). La réponse inflammatoire de l'hôte (lymphocytes T, éosinophiles) crée l'érythème et le prurit caractéristiques en bordure de lésion.",
    mecanisme: "Terbinafine topique : inhibe la squalène époxydase fongique (enzyme clé de la synthèse de l'ergostérol membranaire) → accumulation toxique de squalène + déficit en ergostérol → mort fongique (fongicide, pas seulement fongistatique). Activité spécifique sur les dermatophytes, moins efficace sur Candida.\n\nAzolés topiques (kétoconazole, éconazole) : inhibent la lanostérol 14α-déméthylase (CYP51 fongique) → blocage de la synthèse d'ergostérol → accumulation de précurseurs toxiques → fongistatique (large spectre : dermatophytes + Candida + Malassezia).\n\nCiclopirox : chélation des cations métalliques (Fe³⁺, Al³⁺) → inhibition des enzymes fer-dépendantes essentielles au métabolisme fongique → action fongicide à large spectre.",
    diagnostic: "Clinique : lésion annulaire à bordure érythémato-vésiculeuse active et centre plus clair (peau, dermatophytose 'classique'). Examen mycologique (prélèvement + culture) si doute diagnostique, échec thérapeutique, ou avant traitement systémique. Lampe de Wood : utile pour le pityriasis versicolor (fluorescence jaune-dorée à Malassezia) mais pas pour les dermatophytoses classiques.",
    effets_secondaires: [
      {label:"Irritation locale (azolés, terbinafine) — généralement légère et transitoire", niveau:"info"},
      {label:"Échec thérapeutique si arrêt prématuré (avant disparition complète + délai de sécurité)", niveau:"warning"},
      {label:"Surinfection bactérienne secondaire si grattage intense (lésions excoriées)", niveau:"warning"},
    ],
    classes: [
      {classe:"Terbinafine topique — dermatophytoses (référence)", dci:["Terbinafine 1%"], specialites:["Lamisil® crème/spray"], couleur:"#1B6B52", remarque:"1 application/j × 1-2 semaines (durée la plus courte de toutes les classes — fongicide puissant)"},
      {classe:"Azolés topiques — large spectre", dci:["Kétoconazole 2%","Éconazole 1%"], specialites:["Kétoderm®","Pevaryl®"], couleur:"#1E3A5F", remarque:"2 applications/j × 2-4 semaines. Actif aussi sur Candida si doute diagnostique"},
      {classe:"Ciclopirox — alternative large spectre", dci:["Ciclopirox 1%"], specialites:["Mycoster® crème"], couleur:"#B45309", remarque:"Action fongicide à large spectre, également antibactérien. 2 applications/j × 2-3 semaines"},
    ],
    interactions: [
      "Aucune interaction systémique significative pour les topiques (absorption cutanée négligeable aux doses recommandées)",
    ],
    points_cles: [
      "Dermatophytes = kératinophiles strict → infectent peau, cheveux, ongles, jamais les muqueuses (différence avec Candida)",
      "Terbinafine topique : durée de traitement la plus courte (1-2 semaines) car action fongicide puissante sur dermatophytes",
      "Toujours continuer le traitement quelques jours après disparition clinique apparente (prévention des récidives)",
      "Lésion annulaire à bordure active + centre clair = signe clinique caractéristique des dermatophytoses cutanées",
      "Diagnostic mycologique recommandé avant tout traitement systémique ou en cas d'échec d'un traitement topique bien conduit",
    ],
  },
  n3: {
    saviez_vous: "La transmission des dermatophytes suit 3 voies distinctes selon l'espèce : anthropophile (Trichophyton rubrum — transmission interhumaine, sols de piscine/vestiaires), zoophile (Microsporum canis — transmission par chats/chiens, lésions souvent plus inflammatoires chez l'homme car espèce non adaptée) et géophile (rare, contact avec sol contaminé). Cette distinction guide l'enquête épidémiologique en cas de récidive ou de cas groupés.",
    physiopatho: "Tinea capitis (teigne du cuir chevelu) : forme particulière où le dermatophyte envahit le cheveu lui-même (pas seulement la peau) → 2 types d'invasion : endothrix (l'arthrospore reste dans le cheveu — T. tonsurans, fréquent chez l'enfant d'origine africaine) ou ectothrix (gaine de spores autour du cheveu — Microsporum canis, fluorescence à la lampe de Wood). Cette distinction influence le choix de l'antifongique systémique car la pénétration capillaire diffère.",
    pharmacocinetique: "Terbinafine orale (réservée aux formes étendues ou résistantes au topique) : Tmax = 2h, forte liposolubilité → accumulation dans le tissu adipeux, la peau et les phanères (concentration cutanée 75× supérieure au plasma). T½ terminale très longue (200-400h) en raison du relargage tissulaire progressif — persistance de l'effet antifongique plusieurs semaines après l'arrêt. Métabolisme CYP2D6 principalement.\n\nGriséofulvine (historique, teigne de l'enfant) : nécessite un repas gras pour l'absorption (liposoluble). Se concentre spécifiquement dans la kératine en formation → mécanisme unique d'inhibition de la mitose fongique (liaison aux microtubules).",
    cas_clinique: "Enfant 6 ans, plaque alopécique du cuir chevelu avec cheveux cassés courts, squames, légère inflammation. Lampe de Wood négative. Contact avec un chat errant récemment recueilli. Quelle est votre conduite ?\n\nRaisonnement : suspicion de teigne (tinea capitis) — lampe de Wood négative oriente vers Trichophyton (endothrix, non fluorescent) plutôt que Microsporum canis (ectothrix, normalement fluorescent — mais le contact avec le chat reste un argument épidémiologique à ne pas négliger). Prélèvement mycologique avec culture indispensable avant traitement systémique. Traitement topique seul insuffisant dans la teigne (atteinte du cheveu) → antifongique oral nécessaire (terbinafine ou griséofulvine selon l'espèce identifiée) + éviction scolaire selon les recommandations.",
    effets_secondaires: [
      {label:"Terbinafine orale : hépatotoxicité (rare mais surveillée), troubles du goût (réversibles)", niveau:"warning"},
      {label:"Griséofulvine : photosensibilisation marquée, céphalées, interactions enzymatiques nombreuses (inducteur CYP)", niveau:"warning"},
      {label:"Teigne non traitée : alopécie cicatricielle définitive possible (kérion inflammatoire sévère)", niveau:"danger"},
    ],
    classes: [
      {classe:"Terbinafine orale — teigne et onychomycoses étendues", dci:["Terbinafine 250mg/j adulte (poids-adapté enfant)"], specialites:["Lamisil® comprimés"], couleur:"#1B6B52", remarque:"Durée 4-8 semaines (teigne) à plusieurs mois (ongles). Surveillance hépatique si traitement prolongé"},
      {classe:"Griséofulvine — alternative pédiatrique historique", dci:["Griséofulvine 10-20mg/kg/j"], specialites:["Griséfuline®"], couleur:"#B45309", remarque:"À prendre avec un repas gras. Photosensibilisation marquée. Inducteur enzymatique (interactions multiples, dont contraceptifs)"},
      {classe:"Itraconazole oral — alternative large spectre", dci:["Itraconazole 100-200mg/j"], specialites:["Sporanox®"], couleur:"#1E3A5F", remarque:"Actif sur dermatophytes ET levures. Nécessite milieu acide pour absorption (éviter IPP concomitants)"},
    ],
    interactions: [
      "Terbinafine + inhibiteurs CYP2D6 (fluoxétine, paroxétine) : ↑ concentration terbinafine — surveiller tolérance",
      "Griséofulvine + contraceptifs oraux : induction enzymatique → ↓ efficacité contraceptive — contraception alternative nécessaire",
      "Itraconazole + IPP/anti-H2 : ↓ absorption (besoin de milieu acide) — éviter l'association ou espacer largement",
    ],
    points_cles: [
      "Teigne du cuir chevelu = traitement systémique OBLIGATOIRE (le topique seul ne pénètre pas le cheveu infecté)",
      "Lampe de Wood : positive (fluorescence) pour Microsporum canis (ectothrix), négative pour Trichophyton (endothrix) le plus souvent",
      "Terbinafine orale : forte affinité tissulaire → effet persistant plusieurs semaines après l'arrêt du traitement",
      "Kérion (teigne inflammatoire sévère) non traité à temps : risque d'alopécie cicatricielle définitive",
      "Éviction scolaire et dépistage de l'entourage (animaux domestiques, contacts familiaux) systématiques en cas de teigne",
    ],
  },
  n4: {
    saviez_vous: "L'augmentation des résistances de Trichophyton indicum aux antifongiques azolés et à la terbinafine est devenue une préoccupation mondiale majeure depuis 2014, initialement décrite en Inde puis disséminée mondialement par les voyages — des mutations du gène squalène époxydase (SQLE) confèrent une résistance spécifique à la terbinafine, nécessitant alors le recours à des associations ou à l'itraconazole en 2e ligne.",
    physiopatho: "Mécanismes moléculaires de résistance émergente : les mutations ponctuelles du gène SQLE (codant la squalène époxydase, cible de la terbinafine) — notamment Leu393Phe et Phe397Leu — réduisent l'affinité de la terbinafine pour son enzyme cible sans affecter la fonction enzymatique normale du champignon → résistance spécifique sans perte de fitness fongique, favorisant la dissémination de ces souches résistantes notamment au sein de l'espèce émergente T. indotineae.",
    recommandations: "SFD / HAS — Mycoses cutanées : traitement topique en 1ère intention pour les formes localisées et non compliquées (durée adaptée à la classe pharmacologique). Traitement systémique réservé aux teignes, onychomycoses étendues, formes très extensives, échecs documentés du topique, ou immunodépression. En cas d'échec thérapeutique répété, examen mycologique avec antifongigramme recommandé pour rechercher une résistance acquise (T. indotineae).",
    situations_complexes: "Immunodépression (VIH, diabète mal contrôlé, corticothérapie au long cours, transplantation) : mycoses cutanées plus extensives, atypiques, récidivantes — seuil d'indication du traitement systémique abaissé, surveillance rapprochée, recherche systématique de candidoses associées (intrication fréquente).\n\nGrossesse : azolés topiques (éconazole, kétoconazole crème) = sûrs en application locale limitée. Antifongiques oraux (terbinafine, griséofulvine, itraconazole) : à éviter sauf nécessité absolue (teigne sévère) — discussion bénéfice/risque avec le spécialiste.\n\nDiabétique : mycoses des plis et des pieds plus fréquentes et plus difficiles à éradiquer (hyperglycémie favorise la croissance fongique) — éducation renforcée sur l'hygiène et le contrôle glycémique en parallèle du traitement antifongique.",
    effets_secondaires: [
      {label:"T. indotineae résistant : échec thérapeutique répété sous terbinafine et azolés classiques — signal mondial émergent", niveau:"danger"},
      {label:"Itraconazole systémique prolongé : interactions CYP3A4 multiples, hépatotoxicité — bilan hépatique si traitement long", niveau:"warning"},
      {label:"Mycose cutanée diabétique non traitée : porte d'entrée pour surinfection bactérienne et complications (pied diabétique)", niveau:"danger"},
    ],
    classes: [
      {classe:"Itraconazole — 2e ligne si résistance terbinafine suspectée", dci:["Itraconazole 200mg/j"], specialites:["Sporanox®"], couleur:"#1E3A5F", remarque:"Alternative en cas de souches résistantes à la terbinafine (mutations SQLE) — mécanisme d'action différent (CYP51 fongique)"},
      {classe:"Association topique renforcée — formes résistantes localisées", dci:["Azolé + kératolytique (urée 10%)"], specialites:["Préparations magistrales selon prescription"], couleur:"#B45309", remarque:"Améliore la pénétration de l'antifongique à travers une couche cornée épaissie — utile dans les formes chroniques résistantes"},
    ],
    interactions: [
      "Itraconazole + statines (simvastatine, lovastatine) : inhibition CYP3A4 → rhabdomyolyse — CI ou ajustement de dose impératif",
      "Itraconazole + anticoagulants oraux directs : ↑ exposition AOD (inhibition P-gp) — surveillance renforcée",
      "Itraconazole + IPP : ↓ absorption itraconazole (besoin de pH acide) — éviter l'association",
    ],
    points_cles: [
      "T. indotineae résistant : émergence mondiale préoccupante — envisager antifongigramme si échec thérapeutique répété et bien conduit",
      "Immunodépression : seuil d'indication du traitement systémique abaissé + surveillance rapprochée + recherche de candidoses associées",
      "Diabétique : éducation renforcée (hygiène, contrôle glycémique) en parallèle du traitement antifongique pour réduire les récidives",
      "Grossesse : azolés topiques sûrs en application locale, antifongiques oraux à éviter sauf nécessité absolue",
      "Surveillance hépatique recommandée si traitement antifongique systémique prolongé (> 4 semaines)",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F17 — URTICAIRE AIGUË
   ════════════════════════════════════════════════════════ */
FN['urticaire'] = {
  n2: {
    saviez_vous: "70 % des urticaires aiguës n'ont jamais de cause identifiée malgré un bilan exhaustif (urticaire idiopathique) — et ce n'est pas un échec diagnostique mais une réalité physiopathologique : le mastocyte peut se dégranuler par de multiples voies non-IgE (stress, infections virales banales, certains aliments histamino-libérateurs) sans qu'une allergie vraie soit en cause.",
    physiopatho: "Dégranulation mastocytaire — deux voies principales :\n1. Voie IgE-dépendante (allergie vraie) : pontage des IgE de surface par l'allergène → dégranulation immédiate → histamine, tryptase, leucotriènes, prostaglandines.\n2. Voie non-IgE (la plus fréquente dans l'urticaire aiguë) : activation directe du mastocyte par des stimuli physiques (pression, froid, chaleur, soleil), des aliments histamino-libérateurs (fraises, crustacés, fromages fermentés), des médicaments (AINS, codéine — libération directe sans IgE), ou des infections virales.\nL'histamine libérée se lie aux récepteurs H1 vasculaires → vasodilatation + ↑ perméabilité capillaire → œdème dermique superficiel (papule/plaque urticarienne, prurigineuse, fugace < 24h).",
    mecanisme: "AntiH1 2e génération à dose standard ou majorée : blocage compétitif des récepteurs H1 → ↓ vasodilatation et perméabilité capillaire → résolution des papules. L'urticaire répond généralement bien et rapidement aux antiH1, contrairement à l'angio-œdème profond qui peut nécessiter une prise en charge différente.\n\nCorticoïdes oraux (cure courte) : réservés aux formes très étendues ou avec composante angio-œdémateuse marquée — effet anti-inflammatoire global mais délai d'action plus long que les antiH1 (12-24h) donc jamais en 1ère intention seule pour l'urticaire simple.",
    diagnostic: "Clinique pure dans l'immense majorité des cas : papules ou plaques érythémateuses, prurigineuses, à bordure nette, fugaces (chaque lésion individuelle disparaît en moins de 24h sans laisser de trace — signe clé qui différencie de l'érythème polymorphe ou de la vasculite urticarienne). Pas de bilan allergologique systématique pour un épisode aigu isolé sans contexte évocateur. Bilan seulement si récidives, suspicion d'allergie alimentaire/médicamenteuse précise, ou signes de gravité.",
    effets_secondaires: [
      {label:"Angio-œdème associé (lèvres, paupières, langue) — peut précéder une atteinte laryngée grave", niveau:"danger"},
      {label:"Anaphylaxie (urticaire généralisée + atteinte respiratoire ou cardiovasculaire) — urgence vitale absolue", niveau:"danger"},
      {label:"Somnolence (antiH1 1G utilisés à tort — éviter, préférer 2G même à dose majorée)", niveau:"warning"},
    ],
    classes: [
      {classe:"AntiH1 2e génération — 1ère intention, dose standard à majorée", dci:["Cétirizine 10mg","Loratadine 10mg","Bilastine 20mg","Desloratadine 5mg"], specialites:["Zyrtec®","Clarityne®","Bilaska®","Aerius®"], couleur:"#1B6B52", remarque:"Possibilité de majorer jusqu'à 4× la dose standard si insuffisant (recommandation EAACI) avant d'associer un 2e traitement"},
      {classe:"Corticoïdes oraux — cure courte si urticaire très étendue", dci:["Prednisolone 0,5-1mg/kg/j"], specialites:["Solupred®","Cortancyl®"], couleur:"#B45309", remarque:"3-5 jours maximum. Ne remplace jamais l'antiH1, vient en complément si forme sévère ou angio-œdème associé"},
      {classe:"Adrénaline auto-injectable — si signes d'anaphylaxie associés", dci:["Adrénaline 0,15-0,3mg IM"], specialites:["Anapen®","Epipen®","Jext®"], couleur:"#C0392B", remarque:"Indiquée seulement si urticaire associée à des signes systémiques (dyspnée, hypotension, malaise) — pas pour l'urticaire isolée"},
    ],
    interactions: [
      "AntiH1 1G + alcool ou sédatifs : potentialisation de la sédation — éviter, préférer systématiquement les 2G",
      "Corticoïdes oraux cure courte : pas d'interaction majeure significative sur une durée si brève (< 5 jours)",
    ],
    points_cles: [
      "70 % des urticaires aiguës restent sans cause identifiée — c'est la norme, pas un échec diagnostique",
      "Lésion fugace < 24h = signature clinique de l'urticaire — différencie des autres dermatoses",
      "AntiH1 2G : possibilité de majorer la dose jusqu'à 4× avant de considérer un échec thérapeutique",
      "Signes de gravité à rechercher systématiquement : dyspnée, malaise, atteinte laryngée → urgences",
      "Pas de bilan allergologique systématique pour un épisode aigu isolé sans contexte évocateur clair",
    ],
  },
  n3: {
    saviez_vous: "L'urticaire chronique spontanée (> 6 semaines) est aujourd'hui comprise comme ayant souvent une composante auto-immune : 30-50 % des patients ont des auto-anticorps IgG anti-IgE ou anti-récepteur FcεRI qui activent directement les mastocytes — c'est l'urticaire auto-immune de type IIb, justifiant l'efficacité de l'omalizumab même en l'absence d'allergie identifiée.",
    physiopatho: "Voies de dégranulation mastocytaire non-IgE détaillées : les récepteurs MRGPRX2 (Mas-Related G Protein-coupled Receptor X2) récemment identifiés sur les mastocytes cutanés peuvent être activés directement par certains médicaments (opioïdes, fluoroquinolones, curares) sans intervention des IgE — expliquant les réactions urticariennes ou pseudo-allergiques à ces médicaments classées différemment des allergies IgE-médiées vraies. Ce récepteur est une découverte majeure de la dernière décennie en immuno-dermatologie.",
    pharmacocinetique: "Bilastine 20mg (urticaire chronique, dose majorée possible jusqu'à 80mg) : non métabolisée, substrat de la P-gp uniquement, élimination rénale et biliaire inchangée. Absence totale de métabolisme CYP → profil pharmacocinétique privilégié pour les majorations de dose nécessaires dans l'urticaire chronique réfractaire (pas d'accumulation de métabolites).\n\nOmalizumab (urticaire chronique spontanée réfractaire) : SC, T½ = 26 jours, dose fixe de 300mg/4 semaines dans cette indication (différente du calcul pondéral utilisé dans l'asthme). Délai de réponse clinique variable : certains répondeurs précoces (< 1 semaine), d'autres tardifs (jusqu'à 3 mois) — nécessite d'attendre avant de conclure à un échec.",
    cas_clinique: "Patiente 34 ans, urticaire quotidienne depuis 4 mois, papules généralisées prurigineuses, pas d'angio-œdème. Échec de bilastine 20mg puis 80mg/j pendant 4 semaines. Bilan allergologique négatif. Que proposez-vous ?\n\nRaisonnement : urticaire chronique spontanée (> 6 semaines) réfractaire à l'antiH1 2G à dose majorée (recommandation : attendre 2-4 semaines à dose maximale avant de conclure à l'échec, ce qui est fait ici) → indication à l'omalizumab 300mg SC/4 semaines (AMM spécifique urticaire chronique spontanée, indépendante du taux d'IgE contrairement à l'asthme). Pas de bilan auto-immun systématique nécessaire avant l'introduction — l'omalizumab est efficace que l'urticaire soit auto-immune ou non.",
    effets_secondaires: [
      {label:"Omalizumab urticaire : réactions au site d'injection, céphalées — profil de tolérance globalement bon", niveau:"info"},
      {label:"Ciclosporine (alternative si omalizumab indisponible/inefficace) : néphrotoxicité, HTA — surveillance rapprochée", niveau:"danger"},
      {label:"MRGPRX2-médiée : réactions à certains médicaments (opioïdes, fluoroquinolones) non prévisibles par les tests allergologiques classiques", niveau:"warning"},
    ],
    classes: [
      {classe:"Omalizumab — urticaire chronique spontanée réfractaire", dci:["Omalizumab 300mg SC/4 semaines"], specialites:["Xolair®"], couleur:"#991B1B", remarque:"AMM spécifique urticaire chronique spontanée — dose fixe indépendante du taux d'IgE (différent de l'asthme). Délai de réponse variable jusqu'à 3 mois"},
      {classe:"Ciclosporine — alternative 3e ligne", dci:["Ciclosporine 3-5mg/kg/j"], specialites:["Neoral®"], couleur:"#6B2D5E", remarque:"Si échec ou CI à l'omalizumab. Immunosuppresseur — surveillance rénale et tensionnelle stricte, durée limitée"},
      {classe:"Montélukast — add-on si urticaire avec composante retardée à la pression", dci:["Montélukast 10mg/j"], specialites:["Singulair®"], couleur:"#1B6B52", remarque:"Efficacité modeste, surtout utile en add-on dans certains sous-types d'urticaire chronique inductible"},
    ],
    interactions: [
      "Ciclosporine + AINS, aminosides : néphrotoxicité cumulée — éviter les associations néphrotoxiques",
      "Ciclosporine + kétoconazole, macrolides : inhibition CYP3A4 → ↑ concentration ciclosporine — ajustement nécessaire",
      "Omalizumab : aucune interaction médicamenteuse significative connue (catabolisme protéique)",
    ],
    points_cles: [
      "Urticaire chronique spontanée (> 6 sem) : composante auto-immune fréquente (IgG anti-IgE ou anti-FcεRI) chez 30-50 %",
      "MRGPRX2 : récepteur mastocytaire non-IgE expliquant certaines réactions pseudo-allergiques médicamenteuses",
      "Omalizumab urticaire : dose FIXE 300mg/4 semaines, indépendante du taux d'IgE (différence majeure avec l'asthme)",
      "Délai de réponse à l'omalizumab variable (jusqu'à 3 mois) : ne pas conclure prématurément à un échec",
      "Escalade thérapeutique urticaire chronique : antiH1 2G dose standard → dose ×4 → omalizumab → ciclosporine",
    ],
  },
  n4: {
    saviez_vous: "L'angio-œdème bradykinique (déficit héréditaire ou acquis en C1-inhibiteur, ou angio-œdème induit par les IEC) ne répond JAMAIS aux antiH1, aux corticoïdes ni à l'adrénaline — car il n'implique pas l'histamine mais la bradykinine. Confondre les deux mécanismes peut être fatal : le traitement spécifique (icatibant, concentré de C1-inhibiteur) doit être disponible en urgence pour ces patients identifiés.",
    physiopatho: "Distinction fondamentale angio-œdème histaminique vs bradykinique : l'angio-œdème histaminique (associé à l'urticaire classique) répond aux antiH1/corticoïdes/adrénaline. L'angio-œdème bradykinique (déficit C1-inhibiteur héréditaire — angio-œdème héréditaire AOH, ou acquis sous IEC) implique l'activation incontrôlée du système kallicréine-kinine → production excessive de bradykinine → vasodilatation et perméabilité capillaire SANS dégranulation mastocytaire ni histamine → totalement réfractaire aux traitements antihistaminiques classiques.",
    recommandations: "EAACI/GA²LEN 2022 — Urticaire : antiH1 2G dose standard 2-4 semaines, puis majoration jusqu'à 4× si insuffisant, puis omalizumab si échec à dose maximale après délai suffisant, puis ciclosporine en dernier recours. Toujours rechercher les signes d'alerte d'anaphylaxie ou d'angio-œdème bradykinique (notamment chez tout patient sous IEC présentant un angio-œdème isolé sans urticaire associée — signe distinctif clé).",
    situations_complexes: "Angio-œdème sous IEC : peut survenir à tout moment du traitement (même après des années d'utilisation sans problème), n'importe quel IEC, mécanisme bradykinique pur → arrêt DÉFINITIF de l'IEC (et prudence avec les ARA2, risque de récidive croisée bien que plus faible) — substitution par une autre classe d'antihypertenseur. Aucun antiH1 ni corticoïde efficace dans cette situation — traitement spécifique (icatibant) si disponible en urgence sévère.\n\nGrossesse : antiH1 2G (cétirizine, loratadine) utilisables avec les données de sécurité disponibles. Omalizumab : données limitées, discussion au cas par cas si urticaire chronique sévère réfractaire pendant la grossesse.\n\nUrticaire de contact au latex : penser systématiquement au risque de réaction croisée avec certains fruits (avocat, banane, kiwi, châtaigne — syndrome latex-fruits) chez les professionnels de santé exposés.",
    effets_secondaires: [
      {label:"Angio-œdème bradykinique : résistance totale aux antiH1/corticoïdes/adrénaline — piège diagnostique potentiellement fatal", niveau:"danger"},
      {label:"AOH (angio-œdème héréditaire) non diagnostiqué : risque d'atteinte laryngée mortelle par asphyxie", niveau:"danger"},
      {label:"Icatibant : douleur intense au site d'injection (fréquente, transitoire) — prévenir le patient", niveau:"info"},
    ],
    classes: [
      {classe:"Icatibant — angio-œdème bradykinique aigu", dci:["Icatibant 30mg SC"], specialites:["Firazyr®"], couleur:"#C0392B", remarque:"Antagoniste du récepteur B2 de la bradykinine — traitement spécifique de la crise d'AOH ou d'angio-œdème aux IEC. Inefficace sur l'urticaire histaminique"},
      {classe:"Concentré de C1-inhibiteur — AOH", dci:["C1-inhibiteur humain concentré"], specialites:["Berinert®","Cinryze®"], couleur:"#1E3A5F", remarque:"Traitement substitutif spécifique de l'angio-œdème héréditaire par déficit en C1-inhibiteur — à disposer en urgence pour les patients identifiés"},
      {classe:"Lanadélumab — prévention AOH", dci:["Lanadélumab SC/2 semaines"], specialites:["Takhzyro®"], couleur:"#6B2D5E", remarque:"Anticorps monoclonal anti-kallicréine plasmatique — prévention des crises d'angio-œdème héréditaire, traitement de fond"},
    ],
    interactions: [
      "Icatibant + IEC : pas d'interaction pharmacocinétique mais mécanisme d'action ciblé sur la cause si angio-œdème bradykinique aux IEC",
      "Aucune interaction significative connue pour le C1-inhibiteur concentré (produit biologique substitutif)",
    ],
    points_cles: [
      "Angio-œdème isolé (sans urticaire) sous IEC = penser systématiquement au mécanisme bradykinique → arrêt définitif de l'IEC",
      "AntiH1, corticoïdes et adrénaline sont INEFFICACES sur l'angio-œdème bradykinique — ne pas perdre de temps avec ces traitements",
      "AOH (angio-œdème héréditaire) : antécédents familiaux + épisodes récidivants depuis l'enfance → orientation spécialisée",
      "Patients AOH identifiés : doivent disposer d'un traitement d'urgence à domicile (icatibant ou C1-inhibiteur)",
      "Syndrome latex-fruits : penser à la réactivité croisée chez les professionnels de santé allergiques au latex",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F18 — ZONA
   ════════════════════════════════════════════════════════ */
FN['zona'] = {
  n2: {
    saviez_vous: "Le zona n'est pas une nouvelle infection mais la réactivation d'un virus déjà présent dans l'organisme depuis la varicelle initiale — le VZV (virus varicelle-zona) reste latent dans les ganglions sensitifs (rachidiens ou crâniens) pendant des décennies avant de se réactiver, généralement lors d'une baisse de l'immunité cellulaire (âge, stress, immunosuppression).",
    physiopatho: "Après la primo-infection (varicelle), le VZV remonte par voie axonale rétrograde jusqu'aux ganglions sensitifs (rachidiens postérieurs ou crâniens, notamment le ganglion de Gasser pour le trijumeau) où il reste en latence, contrôlé par l'immunité cellulaire T spécifique. Lorsque cette immunité décline (âge > 50 ans, stress, immunosuppression, certains traitements), le virus se réactive → réplication dans le ganglion → migration antérograde le long du nerf sensitif → éruption vésiculeuse strictement unilatérale dans le territoire du dermatome correspondant, précédée de douleurs neuropathiques (névralgie pré-éruptive caractéristique).",
    mecanisme: "Antiviraux (valaciclovir, famciclovir) : analogues nucléosidiques activés par la thymidine kinase virale puis les kinases cellulaires → forme triphosphate qui inhibe compétitivement l'ADN polymérase virale et s'incorpore dans l'ADN viral en cours de synthèse → arrêt de l'élongation (terminateur de chaîne) → blocage de la réplication virale. Efficacité maximale si débuté dans les 72h suivant le début de l'éruption — réduit la durée de l'éruption ET le risque de névralgie post-zostérienne.\n\nAntalgiques : la douleur du zona aigu est mixte (nociceptive inflammatoire + neuropathique précoce) → nécessite souvent une approche combinée dès le stade aigu pour limiter le risque de chronicisation en névralgie post-zostérienne.",
    diagnostic: "Clinique pathognomonique dans l'immense majorité des cas : éruption vésiculeuse en bouquet sur fond érythémateux, strictement unilatérale, limitée à un ou plusieurs dermatomes contigus, précédée de 2-4 jours de douleurs/paresthésies dans le même territoire. Le caractère unilatéral et métamérique est LA clé diagnostique (ne franchit jamais la ligne médiane, sauf rares exceptions chez l'immunodéprimé).",
    effets_secondaires: [
      {label:"Zona ophtalmique (V1) : risque de kératite et atteinte oculaire grave — urgence ophtalmologique", niveau:"danger"},
      {label:"Névralgie post-zostérienne : douleur neuropathique chronique > 3 mois après la guérison cutanée", niveau:"warning"},
      {label:"Surinfection bactérienne des vésicules (impétiginisation) — favorisée par le grattage", niveau:"warning"},
      {label:"Antiviraux : néphrotoxicité si insuffisance rénale et dose non adaptée — vérifier la fonction rénale", niveau:"warning"},
    ],
    classes: [
      {classe:"Valaciclovir — référence, meilleure biodisponibilité", dci:["Valaciclovir 1000mg × 3/j × 7 jours"], specialites:["Zelitrex®"], couleur:"#1B6B52", remarque:"Prodrogue de l'aciclovir, biodisponibilité orale 3-5× supérieure. Débuter idéalement dans les 72h suivant l'éruption"},
      {classe:"Famciclovir — alternative équivalente", dci:["Famciclovir 500mg × 3/j × 7 jours"], specialites:["Oravir®"], couleur:"#1E3A5F", remarque:"Prodrogue du penciclovir, efficacité comparable au valaciclovir. Adaptation posologique si insuffisance rénale"},
      {classe:"Antalgiques adaptés à la douleur mixte", dci:["Paracétamol + tramadol si besoin","Amitriptyline faible dose si composante neuropathique précoce"], specialites:["Topalgic®","Laroxyl®"], couleur:"#B45309", remarque:"Traiter la douleur dès la phase aiguë pour réduire le risque de chronicisation en névralgie post-zostérienne"},
    ],
    interactions: [
      "Valaciclovir/Famciclovir + probénécide : ↑ concentration de l'antiviral (compétition pour la sécrétion tubulaire rénale)",
      "Antiviraux + néphrotoxiques (AINS, aminosides) : majoration du risque néphrotoxique — prudence chez le sujet âgé",
      "Amitriptyline + autres sérotoninergiques : risque de syndrome sérotoninergique si association — surveiller",
    ],
    points_cles: [
      "Caractère unilatéral et métamérique = signature diagnostique absolue du zona (ne franchit pas la ligne médiane)",
      "Traitement antiviral à débuter idéalement dans les 72h pour réduire la durée ET le risque de névralgie post-zostérienne",
      "Zona ophtalmique (front, paupière, nez = territoire V1) → urgence ophtalmologique systématique",
      "Traiter la douleur précocement et activement dès la phase aiguë pour limiter le risque de chronicisation",
      "Sujet de plus de 50 ans avec zona : penser systématiquement à proposer la vaccination de prévention de la récidive",
    ],
  },
  n3: {
    saviez_vous: "La névralgie post-zostérienne (NPZ) touche jusqu'à 30 % des patients de plus de 60 ans après un zona, contre moins de 5 % chez les moins de 40 ans — l'âge est le facteur de risque prédictif le plus puissant. Cette douleur neuropathique chronique peut persister des années et représente l'une des douleurs les plus invalidantes en pratique clinique, justifiant la vaccination préventive chez le sujet âgé.",
    physiopatho: "Mécanisme de la névralgie post-zostérienne : la réplication virale dans le ganglion sensitif provoque des lésions neuronales directes (nécrose, démyélinisation) et une inflammation persistante → sensibilisation périphérique (hyperexcitabilité des nocicepteurs lésés, expression anormale de canaux sodiques) ET sensibilisation centrale (hyperexcitabilité des neurones de la corne dorsale, perte de l'inhibition GABAergique) → douleur neuropathique chronique qui persiste après la guérison cutanée complète, par des mécanismes désormais indépendants de toute réplication virale active.",
    pharmacocinetique: "Valaciclovir : biodisponibilité orale ~55% (vs 15-20% pour l'aciclovir), conversion rapide et complète en aciclovir par les estérases hépatiques et intestinales (effet de premier passage). T½ aciclovir actif = 2,5-3,3h. Élimination rénale principale → adaptation posologique stricte nécessaire si clairance créatinine < 50 mL/min pour éviter la néphrotoxicité (précipitation tubulaire de cristaux d'aciclovir si hydratation insuffisante).\n\nGabapentine/Prégabaline (traitement de la NPZ établie) : absorption par transporteur saturable (système L-amino-acide) → biodisponibilité décroissante avec l'augmentation de la dose pour la gabapentine (non-linéaire), contrairement à la prégabaline (absorption linéaire, meilleure prédictibilité).",
    cas_clinique: "Patient 72 ans, zona thoracique D6-D7 traité par valaciclovir débuté à J2. Trois mois après la guérison cutanée complète, persistance d'une douleur en brûlure intense avec allodynie au contact des vêtements dans le même territoire. Que proposez-vous ?\n\nRaisonnement : tableau typique de névralgie post-zostérienne constituée (douleur neuropathique > 3 mois post-éruption, avec allodynie caractéristique de la sensibilisation centrale). Traitement de 1ère ligne : gabapentine ou prégabaline (titration progressive pour limiter les effets sédatifs) ou antidépresseur tricyclique à faible dose (amitriptyline) si pas de contre-indication cardiaque. Alternative locale : patchs de lidocaïne 5% sur la zone allodynique. Capsaïcine haute concentration (8%) en patch sous supervision médicale si échec des traitements de 1ère ligne.",
    effets_secondaires: [
      {label:"Précipitation tubulaire d'aciclovir (IRA) si hydratation insuffisante et IV à forte dose — moins fréquent en oral", niveau:"danger"},
      {label:"Gabapentine/Prégabaline : sédation, vertiges, prise de poids — titration lente nécessaire", niveau:"warning"},
      {label:"Patch de capsaïcine 8% : douleur intense transitoire à l'application — prémédication antalgique recommandée", niveau:"warning"},
    ],
    classes: [
      {classe:"Gabapentine/Prégabaline — 1ère ligne NPZ établie", dci:["Gabapentine 300-3600mg/j (titration)","Prégabaline 150-600mg/j"], specialites:["Neurontin®","Lyrica®"], couleur:"#1B6B52", remarque:"Titration progressive obligatoire pour limiter la sédation. Prégabaline : absorption linéaire plus prévisible"},
      {classe:"Patchs de lidocaïne 5% — douleur localisée avec allodynie", dci:["Lidocaïne 5% patch topique"], specialites:["Versatis®"], couleur:"#1E3A5F", remarque:"Application 12h/24h sur la zone douloureuse. Excellent profil de tolérance (action locale, absorption systémique minime)"},
      {classe:"Capsaïcine 8% patch — 2e ligne sous supervision", dci:["Capsaïcine 179mg patch"], specialites:["Qutenza®"], couleur:"#B45309", remarque:"Application unique de 30-60 min en milieu médical (douleur intense à l'application). Effet prolongé plusieurs semaines à mois"},
    ],
    interactions: [
      "Gabapentine + opioïdes : potentialisation de la dépression respiratoire — association à surveiller étroitement",
      "Prégabaline + alcool, benzodiazépines : sédation accrue — informer le patient sur la conduite automobile",
      "Antiviraux IV (aciclovir) + médicaments néphrotoxiques : risque cumulé d'insuffisance rénale aiguë",
    ],
    points_cles: [
      "Âge > 60 ans = facteur de risque majeur de névralgie post-zostérienne (jusqu'à 30 % vs < 5 % chez les jeunes)",
      "NPZ = douleur neuropathique chronique indépendante de toute réplication virale active après guérison cutanée",
      "Gabapentine/Prégabaline = 1ère ligne, mais titration lente indispensable pour limiter les effets sédatifs",
      "Patch de lidocaïne 5% : excellent profil de tolérance pour les douleurs localisées avec allodynie de contact",
      "Adaptation posologique stricte des antiviraux si insuffisance rénale — risque de précipitation tubulaire",
    ],
  },
  n4: {
    saviez_vous: "La vaccination contre le zona avec Shingrix® (vaccin recombinant adjuvanté, non vivant) a révolutionné la prévention : son efficacité dépasse 90 % chez les plus de 50 ans, contre environ 50 % pour l'ancien vaccin vivant atténué Zostavax® (retiré du marché). Shingrix® peut être administré même chez les immunodéprimés, contrairement aux vaccins vivants — une avancée majeure pour cette population à haut risque de zona sévère.",
    physiopatho: "Immunosénescence et réactivation virale : le déclin progressif de l'immunité cellulaire T spécifique anti-VZV avec l'âge (immunosénescence) est le mécanisme central expliquant l'augmentation exponentielle de l'incidence du zona après 50 ans. Les lymphocytes T CD4+ et CD8+ mémoires spécifiques du VZV diminuent en nombre et en fonctionnalité avec le temps — la vaccination par Shingrix® vise précisément à restaurer une réponse immunitaire T robuste via son adjuvant spécifique (AS01B) qui stimule fortement l'immunité cellulaire, contrairement aux vaccins classiques centrés sur l'immunité humorale.",
    recommandations: "HAS 2024 — Vaccination zona : Shingrix® recommandé chez tous les adultes ≥ 65 ans (2 doses espacées de 2 mois), et chez les adultes ≥ 18 ans immunodéprimés ou à risque accru de zona (même schéma). Traitement de la phase aiguë : antiviral systématique si âge > 50 ans, zona ophtalmique, immunodépression, ou forme sévère, à débuter idéalement < 72h. Prise en charge précoce et agressive de la douleur dès la phase aiguë pour réduire le risque de chronicisation en NPZ.",
    situations_complexes: "Immunodépression sévère (greffe, chimiothérapie, biothérapies) : risque de zona disséminé (atteinte cutanée extensive multi-métamérique, voire généralisée) et de complications viscérales (pneumopathie, hépatite, encéphalite) → antiviral IV (aciclovir) souvent nécessaire plutôt que voie orale, hospitalisation à discuter selon la sévérité.\n\nZona chez la femme enceinte : rare (immunité généralement déjà acquise), mais si zona péri-partum proche du terme → risque de transmission au nouveau-né (zona néonatal) → prise en charge spécialisée et antiviral si nécessaire.\n\nGrossesse et vaccination : Shingrix® non recommandé pendant la grossesse par précaution (données insuffisantes), à proposer après l'accouchement si indication.",
    effets_secondaires: [
      {label:"Zona disséminé chez l'immunodéprimé sévère : risque vital, atteinte viscérale possible — hospitalisation et antiviral IV", niveau:"danger"},
      {label:"Shingrix® : réactions locales fréquentes et parfois intenses (douleur, érythème), syndrome pseudo-grippal 1-2 jours", niveau:"warning"},
      {label:"Zona ophtalmique non traité à temps : kératite, voire perte visuelle définitive — urgence absolue", niveau:"danger"},
    ],
    classes: [
      {classe:"Shingrix® — vaccin recombinant adjuvanté de référence", dci:["Glycoprotéine E recombinante + adjuvant AS01B"], specialites:["Shingrix®"], couleur:"#1B6B52", remarque:"2 doses IM espacées de 2 mois (jusqu'à 6 mois). Efficacité > 90 % chez les ≥ 50 ans. Utilisable chez l'immunodéprimé (non vivant)"},
      {classe:"Aciclovir IV — formes sévères/disséminées", dci:["Aciclovir 10mg/kg × 3/j IV"], specialites:["Zovirax® injectable"], couleur:"#C0392B", remarque:"Réservé aux formes graves : zona ophtalmique compliqué, zona disséminé, immunodépression sévère. Hydratation correcte impérative (prévention néphrotoxicité)"},
      {classe:"Antiviral collyre — zona ophtalmique avec atteinte cornéenne", dci:["Aciclovir pommade ophtalmique 3%"], specialites:["Zovirax® ophtalmique"], couleur:"#1E3A5F", remarque:"En complément du traitement systémique si atteinte cornéenne confirmée par l'ophtalmologiste — jamais en monothérapie"},
    ],
    interactions: [
      "Aciclovir IV + néphrotoxiques (aminosides, AINS, produits de contraste) : majoration du risque de précipitation tubulaire — éviter l'association",
      "Shingrix® + immunosuppresseurs : peut être administré, mais réponse immunitaire potentiellement moindre — pas de contre-indication formelle",
    ],
    points_cles: [
      "Shingrix® : vaccin recombinant non vivant → utilisable même chez l'immunodéprimé sévère (différence majeure avec Zostavax®)",
      "Recommandation HAS 2024 : vaccination systématique dès 65 ans, et dès 18 ans si immunodépression ou facteur de risque",
      "Immunosénescence T = mécanisme central expliquant l'augmentation du zona avec l'âge — justifie la stratégie vaccinale ciblée",
      "Zona disséminé chez l'immunodéprimé : urgence avec risque vital — antiviral IV et hospitalisation à discuter",
      "Toute suspicion de zona ophtalmique doit être adressée en urgence à l'ophtalmologiste, sans délai",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F19 — XÉROSE CUTANÉE
   ════════════════════════════════════════════════════════ */
FN['xerose'] = {
  n2: {
    saviez_vous: "Le facteur naturel d'hydratation (NMF) de la peau est composé à 40 % d'acides aminés libres et de leurs dérivés (notamment l'acide pyrrolidone carboxylique, PCA) issus de la dégradation de la filaggrine — une protéine clé qui, lorsqu'elle est déficitaire (mutations génétiques ou simplement avec l'âge), explique directement la sécheresse cutanée chronique de nombreux patients, bien au-delà de la simple déshydratation environnementale.",
    physiopatho: "La xérose résulte d'une altération de la fonction barrière du stratum corneum à plusieurs niveaux :\n1. Déficit lipidique : ↓ céramides (40-50 % des lipides intercornéocytaires), cholestérol et acides gras libres → désorganisation de la structure lamellaire qui scelle normalement la couche cornée.\n2. Déficit en NMF : ↓ acides aminés libres, urée, lactate issus de la dégradation de la filaggrine → ↓ capacité de rétention d'eau intracornéocytaire.\n3. Conséquence : ↑ perte insensible en eau (TEWL) → dessèchement, desquamation visible, fissures, prurit (les terminaisons nerveuses sensitives deviennent hyperexcitables sur une barrière altérée).",
    mecanisme: "Émollients (céramides, glycérol, urée) : restaurent la fonction barrière par 3 mécanismes complémentaires — occlusif (film lipidique limitant la TEWL), humectant (glycérol, urée à faible concentration : attirent et retiennent l'eau), et reconstituant (céramides de synthèse identiques aux céramides physiologiques : réintègrent directement la structure lamellaire lipidique).\n\nUrée à concentration croissante : à faible dose (5-10%) = humectant et hydratant ; à forte dose (10-30%) = kératolytique (rompt les ponts hydrogène de la kératine) → utile sur les zones très hyperkératosiques (talons, coudes) mais peut être irritant sur peau très sèche fissurée à trop forte concentration.",
    diagnostic: "Clinique : peau rugueuse, terne, avec fine desquamation (parfois invisible à l'œil nu mais perceptible au toucher), prurit possible, fissures dans les formes sévères (mains, talons). Diagnostic différentiel à évoquer si xérose très marquée et résistante : hypothyroïdie, carence en zinc ou en acides gras essentiels, ichtyose, ou dermatite atopique sous-jacente non diagnostiquée.",
    effets_secondaires: [
      {label:"Urée forte concentration sur peau fissurée : sensation de brûlure/picotement transitoire à l'application", niveau:"info"},
      {label:"Xérose sévère négligée : fissures profondes, porte d'entrée infectieuse (surtout talons, mains)", niveau:"warning"},
      {label:"Choix de produits moussants agressifs (savons classiques) : aggrave la xérose en éliminant le film lipidique résiduel", niveau:"warning"},
    ],
    classes: [
      {classe:"Émollients à base de céramides — restauration barrière", dci:["Céramides + cholestérol + acides gras"], specialites:["CeraVe®","Cicaplast Baume B5®","Xerand®"], couleur:"#1B6B52", remarque:"Application quotidienne, idéalement après la toilette sur peau encore légèrement humide pour optimiser l'absorption"},
      {classe:"Urée 5-10% — hydratant/humectant", dci:["Urée 5-10%"], specialites:["Akérat 10®","Xérial 10®"], couleur:"#1E3A5F", remarque:"Usage quotidien, bonne tolérance générale même sur peau sensible à cette concentration"},
      {classe:"Urée 20-30% — kératolytique, zones très hyperkératosiques", dci:["Urée 20-30%"], specialites:["Xérial 30®","Akérat 30®"], couleur:"#B45309", remarque:"Réservé aux zones très épaissies (talons, coudes) — éviter sur peau fissurée ou très inflammée (risque de brûlure)"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse systémique significative (produits topiques à action locale uniquement)",
    ],
    points_cles: [
      "Émollients = base du traitement, application quotidienne même en l'absence de symptômes visibles (prévention)",
      "Urée : effet dose-dépendant — humectant à faible concentration, kératolytique à forte concentration",
      "Toilette : préférer un nettoyant surgras ou une huile lavante aux savons classiques décapants",
      "Xérose sévère et résistante : éliminer une cause sous-jacente (hypothyroïdie, carence, dermatite atopique)",
      "Application après la toilette sur peau encore légèrement humide optimise l'efficacité de l'émollient",
    ],
  },
  n3: {
    saviez_vous: "Les céramides cutanés se déclinent en au moins 12 sous-types structurellement distincts (CER1 à CER12), chacun ayant un rôle architectural précis dans l'organisation lamellaire du stratum corneum — un déficit sélectif en céramide CER1 (qui contient un acide gras lié par liaison ester à l'acide linoléique) est spécifiquement impliqué dans la dermatite atopique, alors que la xérose simple du sujet âgé implique plutôt une réduction globale et non sélective de l'ensemble des céramides.",
    physiopatho: "Vieillissement cutané et xérose sénile : avec l'âge, plusieurs mécanismes convergent — ↓ activité des glandes sébacées (réduction du film hydrolipidique de surface), ↓ synthèse des céramides épidermiques (réduction de l'activité des enzymes de synthèse comme la sérine palmitoyltransférase), ↓ renouvellement cellulaire (ralentissement du turnover kératinocytaire de 28 jours à parfois plus de 40-45 jours) → accumulation de cornéocytes moins bien organisés et altération de la cohésion intercellulaire.",
    pharmacocinetique: "Pénétration cutanée des émollients : dépend de la taille moléculaire (les céramides de synthèse, molécules relativement grandes, agissent principalement en surface et dans les couches superficielles du stratum corneum plutôt que par pénétration profonde), de la formulation galénique (les baumes occlusifs riches en lipides limitent davantage la TEWL que les laits fluides, mais sont moins cosmétiquement acceptables), et de l'état initial de la barrière (paradoxalement, une barrière très altérée permet une pénétration accrue des actifs mais aussi une perte d'eau plus importante avant traitement).",
    cas_clinique: "Patiente 68 ans, xérose généralisée sévère résistante aux émollients usuels depuis plusieurs mois, fatigue associée, prise de poids récente. Que suspectez-vous et quelle est votre conduite ?\n\nRaisonnement : xérose sévère et résistante associée à fatigue et prise de poids → tableau évocateur d'hypothyroïdie (cause endocrinienne classique de xérose acquise par ralentissement du métabolisme cutané et réduction du renouvellement épidermique). Orientation vers le médecin pour bilan thyroïdien (TSH) avant d'intensifier davantage le traitement émollient local, qui ne résoudra pas la cause sous-jacente si elle est confirmée.",
    effets_secondaires: [
      {label:"Xérose résistante méconnue : retard diagnostique d'une pathologie sous-jacente (thyroïde, carence)", niveau:"warning"},
      {label:"Urée forte concentration répétée sur peau fragile sénile : risque d'irritation cumulative", niveau:"info"},
    ],
    classes: [
      {classe:"Émollients avec niacinamide — renforcement barrière", dci:["Niacinamide 2-5% + céramides"], specialites:["Formulations dermo-cosmétiques spécifiques (CeraVe®, La Roche-Posay Lipikar®)"], couleur:"#1B6B52", remarque:"Niacinamide stimule la synthèse endogène de céramides et améliore la fonction barrière en complément de l'apport exogène"},
      {classe:"Émollients à l'acide hyaluronique — xérose avec composante déshydratation", dci:["Acide hyaluronique haut et bas poids moléculaire"], specialites:["Diverses formulations dermo-cosmétiques"], couleur:"#1E3A5F", remarque:"Le bas poids moléculaire pénètre plus profondément, le haut poids moléculaire forme un film de surface — formulations combinées privilégiées"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse systémique pertinente pour ces produits à usage topique exclusif",
    ],
    points_cles: [
      "Xérose sénile = déficit global et non sélectif des céramides, contrairement au déficit sélectif en CER1 de la dermatite atopique",
      "Renouvellement cellulaire ralenti avec l'âge (jusqu'à 40-45 jours) → altération de la cohésion et de l'organisation cornéocytaire",
      "Xérose sévère + fatigue + prise de poids chez la femme âgée → toujours évoquer une hypothyroïdie sous-jacente",
      "Formulation galénique (baume vs lait) à adapter à la sévérité de la xérose et à l'acceptabilité cosmétique du patient",
      "Niacinamide : actif intéressant car stimule la synthèse endogène de céramides, en complément des apports exogènes",
    ],
  },
  n4: {
    saviez_vous: "L'ichtyose vulgaire (la plus fréquente des ichtyoses héréditaires, touchant environ 1 personne sur 250) est due à des mutations du gène de la filaggrine (FLG) — les mêmes mutations qui constituent le principal facteur de risque génétique de la dermatite atopique. Cette xérose extrême et héréditaire, présente dès l'enfance avec des squames fines généralisées, doit être distinguée d'une xérose acquise banale par son caractère précoce, familial et sa sévérité disproportionnée.",
    physiopatho: "Spectre des xéroses sévères et leurs causes : au-delà de la xérose sénile banale, il existe un spectre de xéroses sévères à explorer — ichtyoses héréditaires (mutations FLG ou autres gènes de la cornéification), carences nutritionnelles (zinc, acides gras essentiels, vitamine A — notamment chez les patients dénutris, alcooliques chroniques ou avec malabsorption digestive), causes endocriniennes (hypothyroïdie, diabète mal contrôlé), causes médicamenteuses (rétinoïdes oraux, diurétiques au long cours, statines parfois), et xérose paranéoplasique (rare mais à connaître — peut précéder de plusieurs mois le diagnostic d'un lymphome ou d'une autre néoplasie sous-jacente).",
    recommandations: "SFD — Xérose cutanée : émollients quotidiens systématiques en 1ère intention pour les formes communes. Recherche d'une cause sous-jacente si xérose sévère, résistante au traitement bien conduit, d'apparition récente chez l'adulte sans contexte évident, ou associée à des signes généraux (fatigue, amaigrissement, prurit généralisé sans lésion cutanée visible — qui doit faire rechercher une cause systémique incluant les pathologies hépatiques, rénales ou hématologiques).",
    situations_complexes: "Prurit sénile généralisé sans xérose majeure ni lésion cutanée primaire visible : toujours éliminer une cause systémique avant de conclure à un simple prurit sénile banal — bilan incluant fonction rénale (prurit urémique), bilan hépatique (cholestase), NFS et bilan martial (carence en fer, syndromes myéloprolifératifs, lymphomes), TSH.\n\nXérose post-chimiothérapie : fréquente avec certaines thérapies ciblées (notamment les inhibiteurs d'EGFR utilisés en oncologie) — prise en charge émolliente renforcée et précoce, parfois en prévention dès le début du traitement oncologique pour limiter la sévérité et l'impact sur la qualité de vie et l'observance du traitement anticancéreux.\n\nXérose et insuffisance rénale chronique : très fréquente et souvent sévère, liée à la fois à la rétention de toxines urémiques et aux troubles du métabolisme phosphocalcique — prise en charge émolliente intensive en complément du traitement néphrologique.",
    effets_secondaires: [
      {label:"Xérose paranéoplasique méconnue : retard diagnostique d'une pathologie maligne sous-jacente — vigilance si contexte atypique", niveau:"danger"},
      {label:"Prurit sénile sans cause identifiée et non exploré : peut masquer une pathologie systémique grave", niveau:"warning"},
      {label:"Xérose sous chimiothérapie négligée : impact sur l'observance du traitement oncologique et la qualité de vie", niveau:"warning"},
    ],
    classes: [
      {classe:"Émollients spécifiques ichtyose — kératolytiques à forte concentration encadrés", dci:["Urée 30-50% ou acide lactique 5-12%"], specialites:["Formulations spécialisées sur prescription dermatologique"], couleur:"#B45309", remarque:"Concentrations élevées réservées aux ichtyoses constituées, sous encadrement dermatologique, avec surveillance de la tolérance cutanée"},
      {classe:"Émollients préventifs anti-EGFR — oncodermatologie", dci:["Émollients réparateurs renforcés (céramides + niacinamide)"], specialites:["Protocoles spécifiques d'oncodermatologie hospitalière"], couleur:"#1E3A5F", remarque:"Application précoce et préventive dès le début des thérapies anti-EGFR pour limiter la sévérité de la xérose induite et préserver l'observance"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse systémique pertinente pour les émollients à usage topique exclusif",
    ],
    points_cles: [
      "Ichtyose vulgaire : mutation du gène FLG (filaggrine), même gène impliqué dans la dermatite atopique — xérose précoce, familiale, sévère",
      "Prurit généralisé sans lésion cutanée visible chez le sujet âgé : toujours rechercher une cause systémique avant de conclure à un prurit sénile banal",
      "Xérose paranéoplasique : rare mais à connaître, peut précéder le diagnostic d'une néoplasie sous-jacente de plusieurs mois",
      "Xérose sous anti-EGFR en oncologie : prise en charge émolliente précoce et préventive pour préserver l'observance du traitement",
      "Xérose et insuffisance rénale chronique : fréquente et sévère, prise en charge émolliente intensive en complément du suivi néphrologique",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F20 — BRONCHITE AIGUË
   ════════════════════════════════════════════════════════ */
FN['bronchite'] = {
  n2: {
    saviez_vous: "90 % des bronchites aiguës sont d'origine virale — pourtant elles représentent l'une des principales causes de prescription inappropriée d'antibiotiques en médecine ambulatoire. La toux peut persister 3 semaines en moyenne après une bronchite virale banale, ce qui inquiète souvent les patients à tort.",
    physiopatho: "Inflammation aiguë de la muqueuse bronchique, le plus souvent d'origine virale (rhinovirus, virus influenza, VRS, coronavirus saisonniers) : le virus infecte les cellules épithéliales ciliées des bronches → destruction cellulaire localisée + réponse inflammatoire (recrutement de neutrophiles, libération de cytokines IL-6, IL-8) → œdème muqueux + hypersécrétion de mucus → toux réflexe (stimulation des récepteurs tussigènes sous-épithéliaux) initialement sèche puis productive lors de la clairance mucociliaire de l'inflammation.",
    mecanisme: "Antitussifs antagonistes opiacés (codéine, pholcodine — pholcodine retirée du marché 2023) : agissent sur le centre de la toux bulbaire → ↓ réflexe tussigène. Réservés à la toux sèche très invalidante car ils peuvent gêner l'évacuation des sécrétions si toux productive.\n\nFluidifiants/mucolytiques (carbocistéine, acétylcystéine) : rompent les ponts disulfures des glycoprotéines du mucus → ↓ viscosité → facilite l'expectoration. Efficacité clinique modeste, controversée dans les méta-analyses récentes.\n\nBronchodilatateurs (β2-mimétiques) : utiles uniquement si composante bronchospastique associée (sibilants à l'auscultation) — pas systématiques dans la bronchite aiguë simple.",
    diagnostic: "Clinique : toux (initialement sèche puis productive), parfois fébricule, sans signe de gravité respiratoire. Auscultation : râles bronchiques diffus, parfois sibilants. Pas de foyer localisé (différencie de la pneumonie). Radiographie thoracique : non systématique, réservée si suspicion de pneumonie (fièvre élevée persistante, douleur thoracique, signes de gravité, terrain à risque).",
    effets_secondaires: [
      {label:"Codéine : risque de dépression respiratoire, surtout chez l'enfant et le sujet âgé — CI < 12 ans", niveau:"danger"},
      {label:"Antitussifs opiacés + toux productive : risque de stase des sécrétions et de surinfection", niveau:"warning"},
      {label:"Antibiothérapie inutile : participe à l'antibiorésistance sans bénéfice clinique démontré", niveau:"warning"},
    ],
    classes: [
      {classe:"Antitussifs non opiacés — toux sèche gênante", dci:["Oxomémazine","Pentoxyvérine"], specialites:["Toplexil®","Tussidane®"], couleur:"#1B6B52", remarque:"Préférés aux opiacés en 1ère intention pour la toux sèche invalidante sans composante productive"},
      {classe:"Mucolytiques — toux productive (efficacité débattue)", dci:["Carbocistéine","Acétylcystéine"], specialites:["Rhinathiol®","Mucomyst®"], couleur:"#1E3A5F", remarque:"Bénéfice clinique modeste selon les méta-analyses récentes — toujours associé à une bonne hydratation"},
      {classe:"Antalgiques/antipyrétiques — confort symptomatique", dci:["Paracétamol 1g × 3-4/j"], specialites:["Doliprane®","Dafalgan®"], couleur:"#B45309", remarque:"Pour la fièvre et les courbatures associées si présentes"},
    ],
    interactions: [
      "Codéine + autres dépresseurs du SNC (benzodiazépines, alcool) : potentialisation de la dépression respiratoire",
      "Antitussifs antihistaminiques (oxomémazine) + alcool : majoration de la sédation",
    ],
    points_cles: [
      "Bronchite aiguë = 90 % virale → pas d'antibiotique systématique, même si expectoration purulente (signe non spécifique de bactérie)",
      "Toux post-bronchite peut durer 3 semaines en moyenne — informer le patient pour éviter une consultation/prescription inutile",
      "Codéine contre-indiquée chez l'enfant de moins de 12 ans (risque de dépression respiratoire)",
      "Pas d'antitussif opiacé si toux productive — risque de rétention des sécrétions",
      "Radiographie thoracique réservée aux situations atypiques ou aux signes de gravité (suspicion de pneumonie)",
    ],
  },
  n3: {
    saviez_vous: "Les critères cliniques de Heckerling permettent d'évaluer la probabilité de pneumonie chez un patient présentant une toux fébrile (5 critères : température > 37,8°C, fréquence cardiaque > 100/min, crépitants, diminution du murmure vésiculaire, absence d'asthme) — un score élevé doit faire réaliser une radiographie thoracique avant de conclure à une simple bronchite.",
    physiopatho: "Hyperréactivité bronchique post-virale : après une bronchite aiguë virale, l'inflammation des voies aériennes peut persister plusieurs semaines même après la clairance virale complète → hyperréactivité bronchique transitoire expliquant la toux prolongée et parfois une légère composante sibilante résiduelle, sans qu'il s'agisse d'un asthme constitué. Ce phénomène est particulièrement fréquent après une infection à Mycoplasma pneumoniae ou Bordetella pertussis (coqueluche), pathogènes à évoquer si toux quinteuse prolongée > 2-3 semaines, notamment chez l'adulte jeune ou en contexte épidémique.",
    pharmacocinetique: "Carbocistéine : absorption orale rapide, métabolisme hépatique partiel, élimination principalement rénale. Pas de données pharmacocinétiques robustes justifiant un bénéfice clinique majeur — explique en partie la controverse sur son efficacité réelle dans les méta-analyses Cochrane récentes.",
    cas_clinique: "Patient 28 ans, toux quinteuse depuis 3 semaines, paroxystique, parfois suivie de vomissements, absence de fièvre. Contexte : collègue de travail avec toux similaire récente. Que suspectez-vous ?\n\nRaisonnement : toux quinteuse prolongée > 2-3 semaines + contexte de cas groupés en collectivité → évoquer fortement la coqueluche (Bordetella pertussis), de plus en plus fréquente chez l'adulte jeune en raison du déclin de l'immunité vaccinale avec le temps. Diagnostic : PCR sur prélèvement nasopharyngé si dans les 3 premières semaines. Traitement : macrolide (azithromycine) si diagnostiqué précocement (réduit la contagiosité mais peu d'effet sur la durée de la toux à ce stade tardif). Éviction et information de l'entourage proche (notamment nourrissons non vaccinés).",
    effets_secondaires: [
      {label:"Coqueluche non reconnue chez l'adulte : risque de transmission à un nourrisson non ou insuffisamment vacciné — gravité potentielle", niveau:"danger"},
      {label:"Toux persistante > 3 semaines non explorée : retard diagnostique d'une pathologie sous-jacente (asthme, RGO, coqueluche)", niveau:"warning"},
    ],
    classes: [
      {classe:"Azithromycine — coqueluche confirmée ou fortement suspectée", dci:["Azithromycine 500mg J1 puis 250mg J2-5"], specialites:["Zithromax®"], couleur:"#1B6B52", remarque:"Efficace sur la contagiosité si débuté précocement (< 3 semaines). Peu d'effet sur la durée de la toux à un stade avancé"},
      {classe:"Corticoïdes inhalés courte durée — hyperréactivité bronchique post-virale persistante", dci:["Béclométasone ou budésonide en cure courte"], specialites:["Selon prescription médicale"], couleur:"#1E3A5F", remarque:"Discuté au cas par cas si toux prolongée avec composante inflammatoire bronchique persistante documentée"},
    ],
    interactions: [
      "Azithromycine + médicaments allongeant le QT (antiarythmiques, certains antipsychotiques) : risque cumulé d'arythmie",
    ],
    points_cles: [
      "Critères de Heckerling : aide à distinguer bronchite simple de pneumonie débutante avant de décider d'une radiographie",
      "Toux quinteuse prolongée + contexte de cas groupés : toujours évoquer la coqueluche, même chez l'adulte vacciné enfant",
      "Coqueluche adulte : souvent atypique et sous-diagnostiquée, risque de transmission grave aux nourrissons non protégés",
      "Hyperréactivité bronchique post-virale : explique la toux prolongée après bronchite sans constituer un asthme",
      "Toux > 3 semaines : seuil au-delà duquel une exploration complémentaire doit être envisagée",
    ],
  },
  n4: {
    saviez_vous: "La HAS et la SPILF (Société de Pathologie Infectieuse de Langue Française) ont conjointement établi depuis plusieurs années des recommandations très strictes contre l'antibiothérapie systématique dans la bronchite aiguë de l'adulte sain — leur application a permis de réduire significativement les prescriptions inutiles d'antibiotiques en médecine de ville, contribuant à la lutte contre l'antibiorésistance à l'échelle nationale.",
    physiopatho: "Lien bronchite aiguë récidivante et BPCO débutante : chez le fumeur ou l'exposé professionnel, des épisodes répétés de bronchite aiguë (plus de 2-3 par an) doivent faire suspecter une BPCO débutante non encore diagnostiquée — l'inflammation chronique des voies aériennes liée au tabagisme rend la muqueuse bronchique plus vulnérable aux infections virales et bactériennes récurrentes, créant un cercle vicieux d'inflammation chronique et de dommages tissulaires progressifs.",
    recommandations: "HAS / SPILF — Bronchite aiguë adulte sain : pas d'antibiothérapie recommandée (origine virale dans 90% des cas, évolution spontanément favorable). Antibiothérapie à discuter uniquement si terrain fragile (BPCO sous-jacente, immunodépression, sujet âgé avec comorbidités) et signes faisant suspecter une surinfection bactérienne authentique. Traitement symptomatique : antipyrétique/antalgique si besoin, hydratation, pas de mucolytique ni antitussif systématique en dehors d'une gêne fonctionnelle significative.",
    situations_complexes: "BPCO et bronchite aiguë surajoutée : chez le patient BPCO connu, une exacerbation avec majoration de la toux et de l'expectoration (purulente) justifie davantage une antibiothérapie (critères d'Anthonisen) qu'chez le sujet sain — la distinction entre simple bronchite aiguë et exacerbation de BPCO est cruciale pour la décision thérapeutique.\n\nNourrisson et bronchiolite : la bronchite aiguë de l'adulte ne doit pas être confondue avec la bronchiolite du nourrisson (< 2 ans), entité distincte liée principalement au VRS et nécessitant une prise en charge spécifique (cf. fiche dédiée).\n\nSujet âgé fragile : seuil de vigilance plus bas — une bronchite apparemment banale peut décompenser plus rapidement une pathologie cardiorespiratoire sous-jacente, justifiant une surveillance plus rapprochée.",
    effets_secondaires: [
      {label:"Antibiothérapie inutile répétée : sélection de résistances bactériennes, dysbiose intestinale, coût sanitaire", niveau:"warning"},
      {label:"BPCO méconnue révélée par des bronchites récidivantes : retard diagnostique et de prise en charge", niveau:"danger"},
      {label:"Décompensation cardiorespiratoire sur bronchite apparemment banale chez le sujet âgé fragile", niveau:"danger"},
    ],
    classes: [
      {classe:"Amoxicilline — si surinfection bactérienne authentique sur terrain fragile", dci:["Amoxicilline 1g × 3/j"], specialites:["Clamoxyl®"], couleur:"#B45309", remarque:"Réservée aux situations avec terrain à risque et signes cliniques évocateurs de surinfection bactérienne, jamais en routine"},
      {classe:"Bronchodilatateurs courte durée — composante bronchospastique associée", dci:["Salbutamol à la demande"], specialites:["Ventoline®"], couleur:"#1E3A5F", remarque:"Utile uniquement si sibilants documentés à l'auscultation, pas systématique dans la bronchite aiguë simple"},
    ],
    interactions: [
      "Amoxicilline + méthotrexate : ↑ toxicité du méthotrexate par compétition pour l'élimination rénale — vigilance si association",
    ],
    points_cles: [
      "Recommandation HAS/SPILF : pas d'antibiothérapie dans la bronchite aiguë de l'adulte sain — origine virale dans 90 % des cas",
      "Bronchites récidivantes (> 2-3/an) chez le fumeur : signal d'alerte pour une BPCO débutante à explorer",
      "Distinguer la bronchite aiguë simple de l'exacerbation de BPCO connue, qui justifie une approche thérapeutique différente",
      "Sujet âgé fragile : seuil de vigilance abaissé, surveillance rapprochée même pour un tableau apparemment banal",
      "Lutte contre l'antibiorésistance : le pharmacien a un rôle pédagogique clé pour expliquer l'absence de besoin d'antibiotique",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F21 — BPCO
   ════════════════════════════════════════════════════════ */
FN['bpco'] = {
  n2: {
    saviez_vous: "La BPCO est sous-diagnostiquée dans environ 50 % des cas en France — de nombreux patients attribuent leur essoufflement progressif au 'vieillissement normal' ou à un 'manque de forme', alors qu'une simple spirométrie pourrait poser le diagnostic des années avant que la maladie ne devienne sévère et irréversible.",
    physiopatho: "La BPCO associe deux composantes à des degrés variables selon les patients :\n1. Bronchite chronique obstructive : inflammation chronique des bronches (principalement liée au tabagisme) → hypersécrétion de mucus, hypertrophie des glandes muqueuses, fibrose des petites voies aériennes → obstruction progressive et peu réversible (à la différence de l'asthme).\n2. Emphysème : destruction progressive des parois alvéolaires (déséquilibre protéases/antiprotéases, notamment élastase des neutrophiles non contrôlée par l'alpha-1-antitrypsine) → perte de la surface d'échange gazeux + perte de l'élasticité pulmonaire → piégeage aérien et distension thoracique.",
    mecanisme: "Bronchodilatateurs de longue durée d'action (LABA, LAMA) : pierre angulaire du traitement de fond de la BPCO, à la différence de l'asthme où les CSI sont centraux. Les LAMA (tiotropium) bloquent les récepteurs muscariniques M3 des muscles lisses bronchiques → ↓ tonus cholinergique bronchoconstricteur (mécanisme particulièrement actif dans la BPCO où le tonus vagal est prédominant). Les LABA (indacatérol, vilantérol) agissent par la voie β2-adrénergique classique avec une durée d'action prolongée (12-24h).\n\nCorticoïdes inhalés (CSI) : utilisés en association avec les bronchodilatateurs uniquement si exacerbations fréquentes et/ou éosinophilie sanguine élevée (> 300/µL) — contrairement à l'asthme, ils ne sont pas systématiques en 1ère intention dans la BPCO car moins efficaces sur l'inflammation neutrophilique prédominante.",
    diagnostic: "Spirométrie post-bronchodilatateur : VEMS/CVF < 0,70 de façon persistante (non réversible, à la différence de l'asthme) = critère diagnostique obligatoire de la BPCO selon GOLD. Classification GOLD en stades de sévérité (VEMS) ET en groupes (A à E) selon les symptômes et l'historique d'exacerbations, qui guident le choix thérapeutique.",
    effets_secondaires: [
      {label:"Pneumonie (CSI dans la BPCO) : risque accru documenté, contrairement à l'asthme — à mettre en balance avec le bénéfice", niveau:"danger"},
      {label:"Sécheresse buccale, rétention urinaire (LAMA — effet anticholinergique systémique possible si forte dose)", niveau:"warning"},
      {label:"Tachycardie, tremblements (LABA à dose élevée)", niveau:"info"},
    ],
    classes: [
      {classe:"LAMA — pierre angulaire du traitement de fond", dci:["Tiotropium 18µg/j","Glycopyrronium 50µg/j"], specialites:["Spiriva®","Seebri Breezhaler®"], couleur:"#1B6B52", remarque:"1ère intention en monothérapie si symptômes modérés et peu d'exacerbations (groupe A-B GOLD)"},
      {classe:"Association LABA/LAMA — symptômes plus marqués", dci:["Indacatérol/Glycopyrronium","Vilantérol/Uméclidinium"], specialites:["Ultibro Breezhaler®","Anoro Ellipta®"], couleur:"#1E3A5F", remarque:"Double bronchodilatation, supérieure à chaque composant seul sur la dyspnée et la fonction respiratoire"},
      {classe:"Trithérapie CSI/LABA/LAMA — exacerbations fréquentes + éosinophilie", dci:["Fluticasone/Vilantérol/Uméclidinium"], specialites:["Trelegy Ellipta®"], couleur:"#B45309", remarque:"Réservée aux patients avec exacerbations répétées malgré la bithérapie ET éosinophiles sanguins élevés (> 300/µL)"},
    ],
    interactions: [
      "LAMA + autres anticholinergiques (certains antidépresseurs, antihistaminiques 1G) : addition des effets anticholinergiques",
      "LABA + bêta-bloquants non cardiosélectifs : antagonisme pharmacodynamique direct — à éviter si possible",
    ],
    points_cles: [
      "BPCO sous-diagnostiquée dans 50 % des cas — toute dyspnée d'effort progressive chez un fumeur/ex-fumeur doit faire évoquer le diagnostic",
      "VEMS/CVF < 0,70 NON réversible après bronchodilatateur = critère diagnostique différenciant la BPCO de l'asthme",
      "LAMA = traitement de fond pivot dans la BPCO, à la différence de l'asthme où ce sont les CSI",
      "CSI dans la BPCO : pas systématiques, réservés aux exacerbations fréquentes + éosinophilie élevée (≠ asthme)",
      "Arrêt du tabac = seule intervention démontrée ralentissant le déclin de la fonction respiratoire dans la BPCO",
    ],
  },
  n3: {
    saviez_vous: "Le déficit en alpha-1-antitrypsine (DAAT) est une cause génétique sous-diagnostiquée de BPCO, représentant environ 1-2 % des cas mais responsable d'un emphysème précoce et sévère, parfois dès 30-40 ans chez des patients peu ou pas fumeurs — un diagnostic différentiel essentiel à évoquer devant une BPCO atypique par son âge de survenue.",
    physiopatho: "Déséquilibre protéases/antiprotéases dans l'emphysème : l'alpha-1-antitrypsine (A1AT) est le principal inhibiteur de l'élastase neutrophile, enzyme libérée lors de l'inflammation bronchique qui dégrade normalement les bactéries et débris cellulaires mais peut aussi détruire la matrice élastique alvéolaire si non contrôlée. Le tabagisme inactive partiellement l'A1AT (oxydation) ET augmente le recrutement neutrophilique → double mécanisme accélérant la destruction alvéolaire. Dans le déficit génétique en A1AT (mutations du gène SERPINA1, notamment l'allèle Z), cette protection est structurellement insuffisante dès la naissance, expliquant un emphysème précoce même chez le non-fumeur, et particulièrement sévère et rapide chez le fumeur porteur de la mutation.",
    pharmacocinetique: "Roflumilast (inhibiteur de la phosphodiestérase-4, traitement add-on de la BPCO sévère avec bronchite chronique et exacerbations fréquentes) : Tmax = 1h, fortement métabolisé par CYP3A4 et CYP1A2 en N-oxyde-roflumilast (métabolite actif contribuant significativement à l'effet pharmacologique global), T½ globale = 17h (molécule mère + métabolite actif). Élimination principalement urinaire sous forme de métabolites inactifs.",
    cas_clinique: "Patient 38 ans, non-fumeur, dyspnée d'effort progressive depuis 2 ans, VEMS/CVF = 0,65 non réversible à la spirométrie, emphysème basal prédominant au scanner thoracique. Antécédent familial de BPCO précoce chez le père. Quelle est votre démarche ?\n\nRaisonnement : BPCO chez un sujet jeune non-fumeur avec emphysème à prédominance basale (atypique, l'emphysème tabagique est classiquement plutôt apical) et contexte familial évocateur → forte suspicion de déficit en alpha-1-antitrypsine. Dosage de l'A1AT sérique et génotypage SERPINA1 à demander. Si déficit confirmé : éviction stricte du tabac et des expositions professionnelles irritantes, traitement bronchodilatateur standard, discussion d'un traitement substitutif par A1AT purifiée selon la sévérité et les recommandations en vigueur, dépistage familial à proposer.",
    effets_secondaires: [
      {label:"Roflumilast : perte de poids significative, troubles digestifs (diarrhée, nausées) fréquents en début de traitement", niveau:"warning"},
      {label:"Roflumilast : risque accru de troubles psychiatriques (anxiété, insomnie, rarement idées suicidaires) — surveillance", niveau:"danger"},
      {label:"DAAT non diagnostiqué : évolution vers une insuffisance respiratoire sévère précoce sans mesure de prévention adaptée", niveau:"danger"},
    ],
    classes: [
      {classe:"Roflumilast — BPCO sévère avec bronchite chronique, add-on", dci:["Roflumilast 500µg/j"], specialites:["Daxas®"], couleur:"#991B1B", remarque:"Réservé aux BPCO sévères avec exacerbations fréquentes malgré trithérapie inhalée bien conduite. Surveiller le poids et l'état psychique"},
      {classe:"Alpha-1-antitrypsine substitutive — déficit confirmé", dci:["A1AT humaine purifiée perfusion IV hebdomadaire"], specialites:["Prolastin®","Trypsone®"], couleur:"#1B6B52", remarque:"Traitement substitutif spécifique du déficit génétique confirmé, ralentit la progression de l'emphysème selon les critères d'éligibilité en vigueur"},
    ],
    interactions: [
      "Roflumilast + inhibiteurs CYP3A4/1A2 puissants (fluvoxamine, kétoconazole) : ↑ exposition significative au roflumilast — ajustement nécessaire",
      "Roflumilast + théophylline : pas d'interaction pharmacocinétique majeure mais addition possible des effets indésirables digestifs",
    ],
    points_cles: [
      "BPCO du sujet jeune non-fumeur avec emphysème atypique (basal) : évoquer systématiquement le déficit en alpha-1-antitrypsine",
      "Dosage A1AT sérique : examen simple et peu coûteux à proposer devant toute BPCO atypique par l'âge ou le terrain",
      "Roflumilast : surveiller étroitement le poids et l'état psychique, effets indésirables fréquents et potentiellement préoccupants",
      "Traitement substitutif A1AT : option spécifique selon sévérité et critères d'éligibilité, ralentit la progression de l'emphysème",
      "Dépistage familial recommandé en cas de déficit en A1AT confirmé chez un patient index",
    ],
  },
  n4: {
    saviez_vous: "L'oxygénothérapie de longue durée (OLD) est le seul traitement, avec l'arrêt du tabac, ayant démontré une réduction de la mortalité dans la BPCO sévère avec insuffisance respiratoire chronique — elle doit être prescrite à au moins 15h/24h (idéalement 18-24h/24h) pour obtenir ce bénéfice, une utilisation partielle ou nocturne seule étant insuffisante.",
    physiopatho: "Cœur pulmonaire chronique et BPCO sévère : l'hypoxémie chronique de la BPCO sévère provoque une vasoconstriction pulmonaire hypoxique réflexe (mécanisme normalement protecteur pour rediriger le flux sanguin vers les zones mieux ventilées, mais délétère s'il devient diffus et chronique) → hypertension artérielle pulmonaire progressive → hypertrophie puis dilatation du ventricule droit (cœur pulmonaire chronique) → insuffisance cardiaque droite avec œdèmes des membres inférieurs, hépatomégalie de stase, distension jugulaire — complication grave et de pronostic péjoratif de la BPCO évoluée.",
    recommandations: "GOLD 2024 — BPCO : stratégie thérapeutique selon le groupe (A, B, E selon symptômes et historique d'exacerbations). Groupe A : bronchodilatateur seul. Groupe B : bithérapie LABA/LAMA d'emblée. Groupe E (exacerbations fréquentes) : bithérapie LABA/LAMA, ajout CSI si éosinophiles ≥ 300/µL, trithérapie si exacerbations persistantes. Réhabilitation respiratoire recommandée à tous les stades symptomatiques. Vaccination antigrippale annuelle et anti-pneumococcique systématiquement recommandées.",
    situations_complexes: "Exacerbation aiguë de BPCO : intensification des bronchodilatateurs de courte durée, corticothérapie orale courte (5 jours) si exacerbation modérée à sévère, antibiothérapie selon critères d'Anthonisen (augmentation du volume ET de la purulence de l'expectoration, ou un seul critère + signe de gravité). Hospitalisation à discuter selon la sévérité (signes de détresse respiratoire, comorbidités, échec du traitement ambulatoire).\n\nBPCO et comorbidités cardiovasculaires : association très fréquente (tabagisme commun aux deux pathologies) — attention à la iatrogénie croisée (bêta-bloquants cardiosélectifs généralement tolérés mais à surveiller, AINS pouvant aggraver une rétention hydrosodée chez un patient avec cœur pulmonaire).\n\nSevrage tabagique : intervention la plus impactante sur le pronostic à tout stade de la maladie — substituts nicotiniques, varénicline ou bupropion à proposer systématiquement, accompagnement comportemental renforcé.",
    effets_secondaires: [
      {label:"Exacerbation sévère de BPCO non reconnue à temps : risque de détresse respiratoire aiguë et de décès — urgence vitale", niveau:"danger"},
      {label:"Cœur pulmonaire chronique décompensé : urgence cardiorespiratoire nécessitant une prise en charge hospitalière", niveau:"danger"},
      {label:"OLD mal observée (< 15h/jour) : perte du bénéfice démontré sur la mortalité — éducation thérapeutique essentielle", niveau:"warning"},
    ],
    classes: [
      {classe:"Corticothérapie orale courte — exacerbation modérée-sévère", dci:["Prednisolone 30-40mg/j × 5 jours"], specialites:["Solupred®","Cortancyl®"], couleur:"#B45309", remarque:"Cure courte standardisée à 5 jours selon les recommandations actuelles, sans dégression nécessaire sur une durée si brève"},
      {classe:"Antibiothérapie — exacerbation avec critères d'Anthonisen", dci:["Amoxicilline/acide clavulanique","Macrolide si allergie pénicilline"], specialites:["Augmentin®"], couleur:"#1E3A5F", remarque:"Réservée aux exacerbations avec signes francs de surinfection bactérienne selon les critères cliniques établis"},
      {classe:"Oxygénothérapie de longue durée — insuffisance respiratoire chronique", dci:["Oxygène médical à domicile"], specialites:["Prescription et prestataires spécialisés"], couleur:"#1B6B52", remarque:"Indiquée si PaO2 ≤ 55 mmHg (ou ≤ 60 mmHg avec signes de cœur pulmonaire) — utilisation ≥ 15h/jour pour bénéfice sur la mortalité"},
    ],
    interactions: [
      "Corticothérapie orale répétée + BPCO : risque cumulatif d'ostéoporose, de diabète et d'infections — limiter la fréquence des cures",
      "Antibiothérapie répétée pour exacerbations fréquentes : risque de sélection de résistances bactériennes locales",
    ],
    points_cles: [
      "OLD : seul traitement avec l'arrêt du tabac démontrant une réduction de mortalité — observance ≥ 15h/jour indispensable pour le bénéfice",
      "Cœur pulmonaire chronique : complication grave de la BPCO sévère évoluée, à dépister (œdèmes, distension jugulaire)",
      "Critères d'Anthonisen : guident la décision d'antibiothérapie lors d'une exacerbation de BPCO",
      "Vaccination antigrippale et antipneumococcique systématiquement recommandées chez tout patient BPCO",
      "Sevrage tabagique : intervention la plus impactante sur le pronostic à tous les stades — à proposer systématiquement et activement",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F22 — SINUSITE
   ════════════════════════════════════════════════════════ */
FN['sinusite'] = {
  n2: {
    saviez_vous: "La couleur jaune-verte des sécrétions nasales n'est PAS un signe fiable d'infection bactérienne — c'est un mythe très répandu. Cette coloration provient simplement de l'accumulation de neutrophiles et de leur myéloperoxydase, qui survient aussi bien dans les infections virales que bactériennes. Seule la durée d'évolution (> 10 jours) et l'aggravation secondaire orientent vers une surinfection bactérienne.",
    physiopatho: "La sinusite aiguë est le plus souvent une complication d'une rhinopharyngite virale : l'inflammation virale de la muqueuse nasale s'étend aux sinus para-nasaux via les ostiums de drainage (méat moyen notamment) → œdème muqueux → obstruction des ostiums → stase des sécrétions dans la cavité sinusienne → ces conditions favorisent dans 0,5-2 % des cas seulement une surinfection bactérienne secondaire (principalement Streptococcus pneumoniae, Haemophilus influenzae) lorsque la stase se prolonge suffisamment.",
    mecanisme: "Corticoïdes nasaux (mométasone, fluticasone) : réduisent l'œdème de la muqueuse sinusienne par leur action anti-inflammatoire locale → favorisent la réouverture des ostiums et le drainage naturel des sécrétions, accélérant la résolution même en l'absence d'antibiotique.\n\nLavages nasaux au sérum physiologique ou hypertonique : effet mécanique de drainage des sécrétions + effet osmotique (solution hypertonique) réduisant l'œdème muqueux par appel d'eau.\n\nAntibiotiques (amoxicilline) si indiqués : ciblent les germes les plus fréquemment impliqués dans la surinfection bactérienne authentique, mais ne sont justifiés que dans des situations cliniques précises (cf. critères diagnostiques).",
    diagnostic: "Critères orientant vers une sinusite bactérienne authentique (et non simplement une rhinosinusite virale prolongée) : persistance des symptômes > 10 jours sans amélioration, OU aggravation secondaire après une amélioration initiale ('double sickening'), OU fièvre élevée > 38,5°C avec douleur faciale unilatérale intense et rhinorrhée purulente d'apparition simultanée et sévère dès le début. En l'absence de ces critères, il s'agit très probablement d'une rhinosinusite virale simple ne nécessitant pas d'antibiotique.",
    effets_secondaires: [
      {label:"Antibiothérapie inutile en cas de sinusite virale : sélection de résistances sans bénéfice clinique", niveau:"warning"},
      {label:"Lavages nasaux hypertoniques : légère irritation possible chez certains patients sensibles", niveau:"info"},
      {label:"Décongestionnants oraux (pseudoéphédrine — retirée du marché FR 2023) : risque cardiovasculaire", niveau:"danger"},
    ],
    classes: [
      {classe:"Corticoïdes nasaux — réduction de l'œdème sinusien", dci:["Mométasone 50µg/bouffée","Fluticasone furoate 27,5µg/bouffée"], specialites:["Nasonex®","Avamys®"], couleur:"#1B6B52", remarque:"2 bouffées/narine × 2/j pendant la phase aiguë, favorise le drainage naturel des sinus"},
      {classe:"Lavages nasaux — geste de base systématique", dci:["Sérum physiologique ou hypertonique"], specialites:["Sterimar®","Physiomer®","Rhinomer®"], couleur:"#1E3A5F", remarque:"Plusieurs fois par jour, geste simple et sans risque, à recommander systématiquement même en l'absence d'autre traitement"},
      {classe:"Amoxicilline — si critères de sinusite bactérienne authentique", dci:["Amoxicilline 1g × 3/j × 7 jours"], specialites:["Clamoxyl®"], couleur:"#B45309", remarque:"Réservée aux situations répondant aux critères diagnostiques précis de surinfection bactérienne"},
    ],
    interactions: [
      "Amoxicilline + méthotrexate : ↑ toxicité du méthotrexate par réduction de sa clairance rénale — vigilance si association",
      "Décongestionnants locaux > 5 jours : rhinite médicamenteuse de rebond — limiter strictement la durée",
    ],
    points_cles: [
      "Couleur jaune-verte des sécrétions = mythe, pas un signe fiable d'infection bactérienne à elle seule",
      "Critères de surinfection bactérienne : durée > 10 jours, aggravation secondaire, ou tableau sévère d'emblée",
      "Lavages nasaux : geste de base à recommander systématiquement, simple et sans risque",
      "Corticoïdes nasaux : accélèrent la résolution en favorisant le drainage, même sans antibiotique",
      "0,5-2 % seulement des rhinosinusites virales évoluent vers une authentique surinfection bactérienne",
    ],
  },
  n3: {
    saviez_vous: "La sinusite maxillaire d'origine dentaire (odontogène) représente 10-12 % des sinusites maxillaires chroniques et est souvent méconnue — elle doit être systématiquement évoquée en cas de sinusite maxillaire unilatérale résistante au traitement standard, particulièrement si elle survient après un soin dentaire récent (extraction, traitement endodontique) du côté affecté.",
    physiopatho: "Anatomie et physiopathologie de la sinusite odontogène : les racines des molaires et prémolaires supérieures sont en rapport intime avec le plancher du sinus maxillaire (parfois séparées par seulement quelques millimètres d'os, voire en continuité directe chez certains patients) → une infection dentaire (granulome apical, parodontite) ou un acte dentaire (extraction avec communication bucco-sinusienne, déplacement de matériel d'obturation dans le sinus) peut directement contaminer la cavité sinusienne, créant une sinusite à germes mixtes souvent anaérobies, différente du profil bactérien habituel des sinusites d'origine rhinogène.",
    pharmacocinetique: "Amoxicilline/acide clavulanique (sinusite odontogène ou sinusite chronique avec suspicion d'anaérobies) : l'acide clavulanique inhibe les bêta-lactamases produites par de nombreuses bactéries anaérobies buccales et certaines souches d'Haemophilus et de Moraxella résistantes à l'amoxicilline seule — justifiant son utilisation préférentielle dans ce contexte par rapport à l'amoxicilline seule, habituellement suffisante pour les sinusites rhinogènes classiques.",
    cas_clinique: "Patient 45 ans, douleur sinusienne maxillaire droite isolée et persistante depuis 3 semaines, sans contexte de rhume préalable, antécédent d'extraction dentaire de la 16 (1ère molaire supérieure droite) un mois auparavant. Que suspectez-vous ?\n\nRaisonnement : sinusite maxillaire unilatérale sans contexte viral préalable + antécédent d'extraction dentaire récente du côté affecté → forte suspicion de sinusite odontogène, possiblement avec communication bucco-sinusienne. Orientation vers une imagerie (scanner des sinus) et avis conjoint ORL/stomatologue. Traitement : amoxicilline/acide clavulanique (couverture anaérobie) plutôt qu'amoxicilline seule, prise en charge de la cause dentaire sous-jacente indispensable pour la guérison complète.",
    effets_secondaires: [
      {label:"Sinusite odontogène méconnue : échecs thérapeutiques répétés tant que la cause dentaire n'est pas traitée", niveau:"warning"},
      {label:"Communication bucco-sinusienne non diagnostiquée : risque de chronicisation et de complications", niveau:"warning"},
    ],
    classes: [
      {classe:"Amoxicilline/acide clavulanique — sinusite odontogène ou suspicion d'anaérobies", dci:["Amoxicilline/Acide clavulanique 1g/125mg × 3/j"], specialites:["Augmentin®"], couleur:"#1B6B52", remarque:"Préférée à l'amoxicilline seule en cas de suspicion d'origine dentaire ou de sinusite chronique avec composante anaérobie"},
      {classe:"Corticoïdes oraux courte durée — sinusite chronique avec polypose associée", dci:["Prednisolone 0,5mg/kg/j × 5-7 jours"], specialites:["Solupred®"], couleur:"#B45309", remarque:"Utile en cure courte pour désobstruer en cas de composante polypeuse associée à la sinusite chronique"},
    ],
    interactions: [
      "Amoxicilline/acide clavulanique + méthotrexate : même précaution que l'amoxicilline seule, ↑ toxicité du méthotrexate",
      "Amoxicilline/acide clavulanique : risque accru de diarrhée par rapport à l'amoxicilline seule (effet de l'acide clavulanique sur le microbiote)",
    ],
    points_cles: [
      "Sinusite maxillaire unilatérale sans contexte viral + antécédent dentaire récent : toujours évoquer une origine odontogène",
      "Sinusite odontogène : germes souvent anaérobies, nécessitant amoxicilline/acide clavulanique plutôt qu'amoxicilline seule",
      "Traitement de la cause dentaire indispensable : l'antibiothérapie seule ne résout pas le problème de fond",
      "Sinusite chronique avec polypose : corticoïdes oraux en cure courte utiles pour la désobstruction",
      "Imagerie (scanner des sinus) recommandée en cas de sinusite atypique, unilatérale ou résistante au traitement standard",
    ],
  },
  n4: {
    saviez_vous: "Les complications orbitaires et intracrâniennes de la sinusite aiguë (cellulite orbitaire, abcès cérébral, thrombophlébite du sinus caverneux) sont rares mais représentent de véritables urgences neurochirurgicales/ophtalmologiques — elles surviennent plus fréquemment chez l'enfant en raison de la proximité anatomique des sinus ethmoïdaux avec l'orbite et de la finesse des parois osseuses séparant ces structures à cet âge.",
    physiopatho: "Voies de propagation des complications de la sinusite : la propagation peut se faire par contiguïté directe (érosion osseuse, notamment au niveau de la lamina papyracea séparant l'ethmoïde de l'orbite, particulièrement fine et vulnérable chez l'enfant) ou par voie vasculaire rétrograde (via les veines émissaires dépourvues de valvules reliant les sinus aux structures orbitaires et intracrâniennes, notamment le sinus caverneux) → ces voies anatomiques expliquent pourquoi une sinusite ethmoïdale ou frontale négligée peut évoluer rapidement vers une complication grave, justifiant une vigilance accrue devant tout signe d'alarme.",
    recommandations: "HAS / SPILF — Sinusite aiguë : pas d'antibiothérapie systématique pour la rhinosinusite aiguë virale simple. Antibiothérapie de 1ère intention (amoxicilline) si critères de surinfection bactérienne authentique réunis. Amoxicilline/acide clavulanique si échec de l'amoxicilline seule, terrain à risque, ou suspicion d'origine dentaire. Orientation en urgence ORL/ophtalmologique si signes de complication (œdème palpébral, exophtalmie, troubles visuels, signes neurologiques, fièvre élevée persistante malgré traitement bien conduit).",
    situations_complexes: "Enfant : signes d'alarme à connaître impérativement — œdème palpébral inflammatoire (cellulite orbitaire débutante), fièvre élevée persistante, altération de l'état général marquée → consultation en urgence sans délai, hospitalisation et imagerie en urgence souvent nécessaires en raison du risque évolutif rapide propre à cet âge.\n\nImmunodépression (diabète mal contrôlé, traitement immunosuppresseur) : risque de sinusite fongique invasive (mucormycose notamment), entité rare mais d'évolution potentiellement très rapide et grave — à évoquer devant une sinusite atypique, nécrosante, chez un patient à risque, nécessitant une prise en charge multidisciplinaire en urgence absolue.\n\nSinusite chronique de l'adulte : toujours rechercher une cause sous-jacente favorisante (polypose naso-sinusienne, déviation septale, intolérance à l'aspirine dans le cadre d'une triade de Samter, immunodépression).",
    effets_secondaires: [
      {label:"Cellulite orbitaire sur sinusite ethmoïdale négligée : urgence ophtalmologique, risque de perte visuelle", niveau:"danger"},
      {label:"Thrombophlébite du sinus caverneux : urgence neurochirurgicale, mortalité non négligeable si retard de prise en charge", niveau:"danger"},
      {label:"Sinusite fongique invasive chez l'immunodéprimé : évolution potentiellement très rapide et grave", niveau:"danger"},
    ],
    classes: [
      {classe:"Antibiothérapie IV à large spectre — complication orbitaire ou intracrânienne", dci:["Céphalosporine de 3e génération + métronidazole, selon avis spécialisé"], specialites:["Protocoles hospitaliers spécifiques"], couleur:"#C0392B", remarque:"Prise en charge hospitalière multidisciplinaire urgente (ORL, ophtalmologie, parfois neurochirurgie) en cas de complication avérée"},
      {classe:"Antifongiques systémiques — sinusite fongique invasive", dci:["Amphotéricine B liposomale selon protocole"], specialites:["Protocoles hospitaliers spécialisés"], couleur:"#991B1B", remarque:"Urgence absolue chez l'immunodéprimé avec sinusite nécrosante atypique, prise en charge multidisciplinaire immédiate"},
    ],
    interactions: [
      "Antibiothérapie IV à large spectre : interactions multiples selon les molécules utilisées, gestion hospitalière spécialisée",
    ],
    points_cles: [
      "Signes d'alarme à connaître impérativement : œdème palpébral, troubles visuels, signes neurologiques → urgence sans délai",
      "Enfant : risque de complication orbitaire plus élevé en raison de la finesse des parois osseuses séparant sinus et orbite",
      "Sinusite fongique invasive : à évoquer chez l'immunodéprimé devant un tableau atypique et nécrosant — urgence absolue",
      "Sinusite chronique de l'adulte : toujours rechercher une cause favorisante sous-jacente à traiter spécifiquement",
      "Le pharmacien doit orienter sans délai vers une consultation en urgence devant tout signe d'alarme évoqué par le patient",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F23 — ANGINE
   ════════════════════════════════════════════════════════ */
FN['angine'] = {
  n2: {
    saviez_vous: "Le Test de Diagnostic Rapide (TDR) du streptocoque disponible en pharmacie depuis 2024 a marqué une avancée majeure en France : il permet au pharmacien d'orienter directement la prise en charge sans consultation médicale systématique pour de nombreux patients, réduisant les délais de traitement et la pression sur les cabinets médicaux.",
    physiopatho: "70-90 % des angines de l'adulte sont d'origine virale (rhinovirus, adénovirus, virus d'Epstein-Barr notamment dans la mononucléose infectieuse) et ne nécessitent aucun antibiotique. Seul le streptocoque bêta-hémolytique du groupe A (SGA) justifie une antibiothérapie, en raison du risque (rare mais grave) de complications post-streptococciques : rhumatisme articulaire aigu (atteinte cardiaque valvulaire) et glomérulonéphrite aiguë post-streptococcique, conséquences de réactions immunitaires croisées entre antigènes streptococciques et tissus de l'hôte (mimétisme moléculaire).",
    mecanisme: "Pénicilline V (phénoxyméthylpénicilline) : antibiotique de référence historique pour l'angine streptococcique confirmée — inhibe la synthèse de la paroi bactérienne (transpeptidases) → bactéricide sur le streptocoque du groupe A, spectre étroit préservant le microbiote, sans résistance significative décrite à ce jour pour cette indication précise.\n\nAmoxicilline : alternative à spectre légèrement plus large, souvent préférée en pratique pour des raisons de simplicité de prise (meilleur goût, prise unique quotidienne possible selon les schémas) et de disponibilité, avec une efficacité comparable sur le streptocoque du groupe A.",
    diagnostic: "Score de Mac Isaac (clinique) : fièvre > 38°C, absence de toux, adénopathies cervicales sensibles, exsudat amygdalien, âge (bonus si 3-14 ans, malus si > 45 ans) — score ≥ 2 justifie un TDR. TDR positif = antibiothérapie justifiée. TDR négatif = traitement symptomatique uniquement (très haute valeur prédictive négative).",
    effets_secondaires: [
      {label:"Allergie à la pénicilline : éruption cutanée à choc anaphylactique selon la sévérité — toujours interroger sur les antécédents", niveau:"danger"},
      {label:"Antibiothérapie inutile sur angine virale : sélection de résistances sans bénéfice clinique", niveau:"warning"},
      {label:"Angine à streptocoque non traitée : risque rare mais grave de complications post-streptococciques", niveau:"danger"},
    ],
    classes: [
      {classe:"Pénicilline V — référence historique angine streptococcique", dci:["Phénoxyméthylpénicilline 1-2g/j"], specialites:["Oracilline®"], couleur:"#1B6B52", remarque:"Traitement de référence si TDR positif, spectre étroit préservant le microbiote, durée 6 jours selon les recommandations actualisées"},
      {classe:"Amoxicilline — alternative pratique", dci:["Amoxicilline 1g × 2-3/j"], specialites:["Clamoxyl®"], couleur:"#1E3A5F", remarque:"Alternative pratique à la pénicilline V, efficacité comparable, durée 6 jours selon les recommandations actuelles"},
      {classe:"Antalgiques/antipyrétiques — traitement symptomatique systématique", dci:["Paracétamol 1g × 3-4/j"], specialites:["Doliprane®","Dafalgan®"], couleur:"#B45309", remarque:"Systématique quelle que soit l'origine (virale ou bactérienne) pour le confort du patient, en attendant le résultat du TDR"},
    ],
    interactions: [
      "Pénicilline V/Amoxicilline + méthotrexate : ↑ toxicité du méthotrexate (réduction de la clairance rénale) — vigilance",
      "Pénicilline V/Amoxicilline + contraceptifs oraux : interaction classiquement évoquée mais non significative selon les données actuelles",
    ],
    points_cles: [
      "70-90 % des angines de l'adulte sont virales — TDR indispensable avant toute antibiothérapie",
      "Score de Mac Isaac : outil clinique simple pour décider de la réalisation d'un TDR",
      "TDR positif au SGA = antibiothérapie justifiée pour prévenir les rares mais graves complications post-streptococciques",
      "TDR négatif = traitement symptomatique seul, très haute valeur prédictive négative du test",
      "Le TDR en pharmacie permet désormais une orientation rapide sans consultation médicale systématique en France",
    ],
  },
  n3: {
    saviez_vous: "La mononucléose infectieuse (virus d'Epstein-Barr) peut mimer cliniquement une angine bactérienne sévère, avec un piège thérapeutique classique : l'administration d'amoxicilline chez un patient atteint de mononucléose provoque dans 80-90 % des cas une éruption cutanée maculo-papuleuse généralisée caractéristique, sans qu'il s'agisse pour autant d'une véritable allergie à la pénicilline — un point à connaître pour éviter une éviction injustifiée de cette classe d'antibiotiques à l'avenir.",
    physiopatho: "Mimétisme moléculaire dans le rhumatisme articulaire aigu (RAA) : certains antigènes de surface du streptocoque du groupe A (protéine M notamment) présentent une similitude structurelle avec des protéines cardiaques humaines (myosine, laminine des valves cardiaques) → la réponse immunitaire dirigée contre le streptocoque peut secondairement réagir de façon croisée contre les tissus cardiaques propres du patient → inflammation valvulaire pouvant évoluer vers des séquelles définitives (valvulopathies rhumatismales), mécanisme expliquant pourquoi le traitement antibiotique précoce de l'angine streptococcique vise avant tout la prévention de cette complication auto-immune retardée plutôt que le traitement de l'angine elle-même (qui guérit spontanément même sans antibiotique dans la majorité des cas).",
    pharmacocinetique: "Pénicilline V orale : biodisponibilité orale 60-70%, sensible à la dégradation par l'acidité gastrique (à prendre à distance des repas pour optimiser l'absorption), T½ courte (30 min) nécessitant plusieurs prises quotidiennes pour maintenir des concentrations efficaces, élimination rénale rapide.",
    cas_clinique: "Patient 19 ans, angine fébrile sévère avec exsudat important, adénopathies cervicales volumineuses bilatérales, asthénie marquée et splénomégalie palpable à l'examen. TDR streptocoque négatif. Que suspectez-vous et quelle est votre conduite ?\n\nRaisonnement : tableau évocateur de mononucléose infectieuse (asthénie marquée, splénomégalie, adénopathies généralisées, TDR négatif éliminant le streptocoque) plutôt qu'une angine bactérienne classique. Sérologie EBV (MNI-test rapide ou sérologie spécifique) à demander. Traitement symptomatique uniquement (paracétamol, repos). Éviter formellement l'amoxicilline (risque d'éruption cutanée caractéristique) et déconseiller le sport de contact pendant plusieurs semaines en raison du risque de rupture splénique sur une splénomégalie.",
    effets_secondaires: [
      {label:"Amoxicilline + mononucléose : éruption cutanée caractéristique dans 80-90 % des cas, sans lien avec une allergie vraie", niveau:"warning"},
      {label:"Splénomégalie sur mononucléose : risque de rupture splénique si traumatisme abdominal ou sport de contact", niveau:"danger"},
      {label:"RAA non prévenu : valvulopathie rhumatismale séquellaire définitive, complication grave à long terme", niveau:"danger"},
    ],
    classes: [
      {classe:"Traitement symptomatique seul — mononucléose infectieuse confirmée", dci:["Paracétamol, repos, hydratation"], specialites:["Doliprane®"], couleur:"#1B6B52", remarque:"Pas de traitement antiviral spécifique disponible en pratique courante, évolution spontanément favorable en quelques semaines"},
      {classe:"Corticoïdes courte durée — complications obstructives de la mononucléose", dci:["Prednisolone selon prescription médicale"], specialites:["Solupred®"], couleur:"#B45309", remarque:"Réservés aux formes avec hypertrophie amygdalienne majeure menaçant la liberté des voies aériennes, sur avis spécialisé"},
    ],
    interactions: [
      "Amoxicilline + mononucléose infectieuse : interaction non pharmacocinétique mais réaction cutanée caractéristique fréquente à connaître",
    ],
    points_cles: [
      "Mononucléose infectieuse : éviter l'amoxicilline (éruption cutanée fréquente, non allergique) en cas de suspicion",
      "Splénomégalie sur mononucléose : contre-indication temporaire au sport de contact (risque de rupture splénique)",
      "Mimétisme moléculaire : explique le RAA, complication auto-immune retardée justifiant le traitement antibiotique précoce",
      "TDR négatif + tableau atypique (asthénie, splénomégalie) : penser à la mononucléose infectieuse",
      "Le traitement antibiotique de l'angine streptococcique vise avant tout la prévention du RAA, pas la guérison de l'angine elle-même",
    ],
  },
  n4: {
    saviez_vous: "Le phlegmon péri-amygdalien, complication suppurative de l'angine, nécessite une prise en charge en urgence ORL pour drainage chirurgical — un signe clinique caractéristique permet de l'évoquer rapidement : la voix 'de patate chaude' (voix nasonnée et étouffée) associée à un trismus (difficulté à ouvrir la bouche) et une dysphagie intense unilatérale.",
    physiopatho: "Complications suppuratives de l'angine streptococcique : en l'absence de traitement adapté ou par évolution propre de l'infection, le streptocoque du groupe A peut diffuser au-delà de l'amygdale vers l'espace péri-amygdalien (phlegmon ou abcès péri-amygdalien) puis, plus rarement, vers les espaces profonds du cou (abcès rétropharyngé, médiastinite par diffusion descendante le long des fascias cervicaux) — complications nécessitant une prise en charge chirurgicale urgente en raison du risque vital (compression des voies aériennes, diffusion médiastinale).",
    recommandations: "HAS / SPILF — Angine : TDR systématique avant toute antibiothérapie chez l'enfant > 3 ans et l'adulte. Pénicilline V ou amoxicilline 6 jours si TDR positif. Pas d'antibiotique si TDR négatif. Orientation en urgence ORL si signes de complication locale (trismus, dysphagie intense unilatérale, voix modifiée) ou de sepsis associé.",
    situations_complexes: "Angine récidivante (> 5-7 épisodes/an) : discuter une amygdalectomie avec l'ORL si retentissement significatif sur la qualité de vie ou l'absentéisme scolaire/professionnel, après documentation rigoureuse de la fréquence et de la nature des épisodes.\n\nAngine de Vincent (angine ulcéro-nécrotique, association fuso-spirillaire) : tableau unilatéral avec ulcération amygdalienne nécrotique, contexte de mauvaise hygiène bucco-dentaire ou d'immunodépression — traitement par pénicilline ou métronidazole selon les germes en cause, à différencier d'une cause tumorale en cas de doute ou de non-réponse au traitement.\n\nDiphtérie (angine à fausses membranes) : devenue rarissime en France grâce à la vaccination mais à évoquer en cas de retour de zone d'endémie ou de statut vaccinal incertain, urgence infectieuse avec risque de complications cardiaques et neurologiques par la toxine diphtérique — déclaration obligatoire.",
    effets_secondaires: [
      {label:"Phlegmon péri-amygdalien non drainé : risque d'extension vers les espaces profonds du cou, urgence chirurgicale", niveau:"danger"},
      {label:"Médiastinite par diffusion descendante : complication rare mais gravissime, mortalité élevée si retard de prise en charge", niveau:"danger"},
      {label:"Diphtérie méconnue : complications cardiaques et neurologiques par la toxine, urgence infectieuse à déclaration obligatoire", niveau:"danger"},
    ],
    classes: [
      {classe:"Antibiothérapie IV + drainage chirurgical — phlegmon péri-amygdalien", dci:["Amoxicilline/Acide clavulanique IV selon protocole hospitalier"], specialites:["Prise en charge hospitalière ORL"], couleur:"#C0392B", remarque:"Urgence ORL avec drainage chirurgical systématique associé à l'antibiothérapie IV, hospitalisation nécessaire"},
      {classe:"Sérum antidiphtérique + antibiothérapie — diphtérie confirmée", dci:["Sérothérapie spécifique + pénicilline ou érythromycine"], specialites:["Protocoles spécialisés, déclaration obligatoire"], couleur:"#991B1B", remarque:"Urgence infectieuse rarissime en France, prise en charge spécialisée immédiate, déclaration obligatoire aux autorités sanitaires"},
    ],
    interactions: [
      "Antibiothérapie IV à large spectre pour complications : gestion hospitalière spécialisée selon les protocoles en vigueur",
    ],
    points_cles: [
      "Voix 'de patate chaude' + trismus + dysphagie unilatérale intense : évoquer un phlegmon péri-amygdalien, urgence ORL",
      "Angine récidivante fréquente : discuter l'amygdalectomie avec l'ORL après documentation rigoureuse des épisodes",
      "Angine de Vincent : tableau unilatéral ulcéro-nécrotique, différencier d'une cause tumorale en cas de doute",
      "Diphtérie : rarissime en France grâce à la vaccination mais à évoquer en contexte de retour de zone d'endémie",
      "Toute angine avec signe de gravité locale ou générale doit être orientée en urgence, sans délai d'attente",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F24 — INSUFFISANCE CARDIAQUE
   ════════════════════════════════════════════════════════ */
FN['insuffisance-cardiaque'] = {
  n2: {
    saviez_vous: "Les 4 classes de médicaments du 'Fantastic Four' (IEC/ARA2/ARNI, bêta-bloquants, antagonistes des récepteurs minéralocorticoïdes, et SGLT2 inhibiteurs) doivent désormais être introduites simultanément et rapidement dans l'insuffisance cardiaque à fraction d'éjection réduite — l'ancienne approche séquentielle (un médicament à la fois, titré lentement avant d'ajouter le suivant) est abandonnée car elle retardait inutilement l'accès aux bénéfices cumulés de ces 4 classes.",
    physiopatho: "Mécanismes compensateurs délétères de l'insuffisance cardiaque : face à la baisse du débit cardiaque, l'organisme active des mécanismes de compensation initialement protecteurs mais délétères à long terme — activation du système rénine-angiotensine-aldostérone (SRAA) → rétention hydrosodée et vasoconstriction, activation du système nerveux sympathique → tachycardie et vasoconstriction périphérique, remodelage cardiaque (hypertrophie puis dilatation ventriculaire) → ces mécanismes, bénéfiques à très court terme pour maintenir la perfusion d'organes, s'auto-entretiennent et aggravent progressivement la fonction cardiaque, justifiant le blocage thérapeutique de ces voies.",
    mecanisme: "IEC/ARA2/ARNI (sacubitril-valsartan) : bloquent le SRAA délétère, l'ARNI ajoutant l'inhibition de la néprilysine → ↑ peptides natriurétiques (BNP, ANP) endogènes → vasodilatation et natriurèse supplémentaires, supériorité démontrée sur les IEC seuls (étude PARADIGM-HF).\n\nBêta-bloquants spécifiques de l'IC (bisoprolol, carvédilol, métoprolol succinate) : bloquent l'activation sympathique délétère chronique → ↓ remodelage ventriculaire, ↓ arythmies, ↓ mortalité — introduction à très faible dose avec titration lente et progressive (risque de décompensation initiale si introduit trop rapidement).\n\nAntagonistes des récepteurs minéralocorticoïdes (spironolactone, éplérénone) : bloquent l'aldostérone → effet anti-fibrosant myocardique démontré au-delà du simple effet diurétique, bénéfice de mortalité indépendant.\n\nSGLT2 inhibiteurs (dapagliflozine, empagliflozine) : bénéfice cardiovasculaire dans l'IC indépendant du statut diabétique, mécanismes incluant la natriurèse osmotique et des effets myocardiques directs encore en cours d'élucidation complète.",
    diagnostic: "Échocardiographie : pierre angulaire du diagnostic, mesure la fraction d'éjection ventriculaire gauche (FEVG) qui classe l'IC en FEVG réduite (< 40%), légèrement réduite (40-49%) ou préservée (≥ 50%) — cette classification guide directement le choix thérapeutique. Dosage du BNP ou NT-proBNP : utile pour le diagnostic différentiel d'une dyspnée et le suivi évolutif, des taux élevés orientant fortement vers l'origine cardiaque d'une dyspnée.",
    effets_secondaires: [
      {label:"Hyperkaliémie (IEC/ARA2 + antagonistes minéralocorticoïdes associés) — surveillance biologique systématique", niveau:"danger"},
      {label:"Hypotension symptomatique (titration trop rapide des bêta-bloquants ou de l'ARNI)", niveau:"warning"},
      {label:"Décompensation aiguë (introduction trop rapide des bêta-bloquants sans précaution)", niveau:"danger"},
      {label:"Infections génitales mycosiques (SGLT2 — effet classe, généralement bien tolérées)", niveau:"info"},
    ],
    classes: [
      {classe:"ARNI — référence si toléré, supérieur aux IEC seuls", dci:["Sacubitril/Valsartan 24/26 à 97/103mg × 2/j"], specialites:["Entresto®"], couleur:"#1B6B52", remarque:"Supériorité démontrée sur l'IEC seul (PARADIGM-HF), nécessite une période de sevrage de 36h si switch depuis un IEC (risque d'angio-œdème)"},
      {classe:"Bêta-bloquants spécifiques IC", dci:["Bisoprolol 1,25-10mg/j","Carvédilol 3,125-25mg × 2/j"], specialites:["Cardensiel®","Kredex®"], couleur:"#1E3A5F", remarque:"Titration lente et progressive indispensable, démarrage à dose minimale, surveillance de la tolérance à chaque palier"},
      {classe:"SGLT2 inhibiteurs — bénéfice indépendant du diabète", dci:["Dapagliflozine 10mg/j","Empagliflozine 10mg/j"], specialites:["Forxiga®","Jardiance®"], couleur:"#6B2D5E", remarque:"AMM IC quelle que soit la FEVG et le statut diabétique, intégrés au traitement de fond systématique dès le diagnostic"},
    ],
    interactions: [
      "IEC/ARNI + antagonistes minéralocorticoïdes + suppléments potassium : risque cumulé d'hyperkaliémie sévère — surveillance étroite",
      "Bêta-bloquants + vérapamil/diltiazem : risque de bradycardie et de bloc auriculo-ventriculaire sévère — association à éviter",
      "ARNI + IEC simultanés : CI absolue (risque majeur d'angio-œdème) — respecter le délai de sevrage de 36h lors du switch",
    ],
    points_cles: [
      "'Fantastic Four' : les 4 classes doivent être introduites rapidement et simultanément, pas de façon séquentielle stricte",
      "ARNI supérieur aux IEC seuls (PARADIGM-HF) mais nécessite un délai de sevrage de 36h si switch depuis un IEC",
      "Bêta-bloquants : titration lente impérative, jamais d'introduction à dose forte d'emblée (risque de décompensation)",
      "SGLT2 inhibiteurs : bénéfice dans l'IC indépendant du statut diabétique, à intégrer systématiquement au traitement de fond",
      "FEVG : élément central classant l'IC et orientant directement la stratégie thérapeutique à privilégier",
    ],
  },
  n3: {
    saviez_vous: "L'insuffisance cardiaque à fraction d'éjection préservée (ICFEp), longtemps considérée comme un diagnostic d'exclusion sans traitement spécifique efficace, bénéficie désormais des SGLT2 inhibiteurs qui ont démontré une réduction significative des hospitalisations dans cette population spécifique (essais EMPEROR-Preserved et DELIVER) — une avancée majeure pour une entité qui représente près de la moitié des cas d'insuffisance cardiaque, en particulier chez la femme âgée hypertendue.",
    physiopatho: "Physiopathologie distincte de l'ICFEp : contrairement à l'IC à FEVG réduite (dysfonction systolique, défaut de contraction), l'ICFEp est caractérisée par une dysfonction diastolique (anomalie de la relaxation et du remplissage ventriculaire) liée à une rigidification myocardique progressive (fibrose interstitielle, hypertrophie des cardiomyocytes) souvent secondaire à une HTA chronique, un diabète, ou un vieillissement cardiovasculaire — un terrain inflammatoire systémique de bas grade (obésité, syndrome métabolique) est de plus en plus reconnu comme contribuant à cette physiopathologie, expliquant en partie l'efficacité plus large des SGLT2 dans cette présentation.",
    pharmacocinetique: "Sacubitril/Valsartan (ARNI) : le sacubitril est une prodrogue rapidement convertie en sacubitrilate (inhibiteur actif de la néprilysine), T½ sacubitrilate = 11,5h, T½ valsartan = 9,9h, élimination principalement biliaire/fécale pour le valsartan et rénale pour le sacubitrilate — la néprilysine dégradant à la fois les peptides natriurétiques bénéfiques ET l'angiotensine II délétère, l'association à un bloqueur du SRAA (valsartan dans l'ARNI) est indispensable pour ne pas exposer à un excès d'angiotensine II non dégradée.",
    cas_clinique: "Patiente 78 ans, dyspnée d'effort progressive, HTA ancienne mal contrôlée, diabète de type 2, échocardiographie montrant une FEVG = 58% avec hypertrophie ventriculaire gauche et dysfonction diastolique modérée. NT-proBNP élevé. Quelle est votre démarche thérapeutique ?\n\nRaisonnement : tableau typique d'insuffisance cardiaque à fraction d'éjection préservée (ICFEp) chez une patiente avec profil de risque classique (femme âgée, HTA, diabète). Introduction d'un SGLT2 inhibiteur (dapagliflozine ou empagliflozine), bénéfice démontré sur les hospitalisations dans cette population spécifique indépendamment du contrôle glycémique. Optimisation du contrôle tensionnel et glycémique en parallèle, les autres classes du 'Fantastic Four' n'ayant pas démontré le même niveau de bénéfice dans l'ICFEp comparé à l'IC à FEVG réduite.",
    effets_secondaires: [
      {label:"ARNI : angio-œdème (rare mais grave) — CI formelle d'association avec un IEC en raison de ce risque", niveau:"danger"},
      {label:"Hypotension symptomatique chez le sujet âgé sous ARNI ou bêta-bloquant — adapter la titration", niveau:"warning"},
      {label:"SGLT2 chez l'IC : déshydratation possible si association à des diurétiques, surveillance de la volémie", niveau:"warning"},
    ],
    classes: [
      {classe:"SGLT2 inhibiteurs — seule classe avec bénéfice démontré dans l'ICFEp", dci:["Dapagliflozine 10mg/j","Empagliflozine 10mg/j"], specialites:["Forxiga®","Jardiance®"], couleur:"#1B6B52", remarque:"Essais EMPEROR-Preserved et DELIVER : réduction significative des hospitalisations dans l'ICFEp, avancée majeure pour cette population"},
      {classe:"Antagonistes minéralocorticoïdes — bénéfice modeste dans l'ICFEp", dci:["Spironolactone selon prescription"], specialites:["Aldactone®"], couleur:"#B45309", remarque:"Bénéfice plus modeste que dans l'IC à FEVG réduite, à discuter au cas par cas selon le profil du patient"},
    ],
    interactions: [
      "ARNI + IEC : CI absolue formelle, risque majeur d'angio-œdème par double inhibition de la dégradation de la bradykinine",
      "SGLT2 + diurétiques de l'anse : risque cumulé de déshydratation et d'hypotension — ajuster les doses prudemment",
    ],
    points_cles: [
      "ICFEp : dysfonction diastolique plutôt que systolique, terrain typique = femme âgée, HTA, diabète, syndrome métabolique",
      "SGLT2 inhibiteurs : seule classe avec bénéfice solidement démontré sur les hospitalisations dans l'ICFEp",
      "ARNI et IEC : association formellement contre-indiquée en raison du risque d'angio-œdème par double mécanisme",
      "Près de la moitié des cas d'IC sont des ICFEp, longtemps sans option thérapeutique spécifique efficace",
      "Le contrôle des comorbidités (HTA, diabète, obésité) reste central dans la prise en charge globale de l'ICFEp",
    ],
  },
  n4: {
    saviez_vous: "Les dispositifs de monitoring hémodynamique implantables (capteurs de pression artérielle pulmonaire, type CardioMEMS) permettent une détection précoce de la décompensation cardiaque, parfois plusieurs jours avant l'apparition des symptômes cliniques — une innovation qui pourrait transformer la prise en charge de l'insuffisance cardiaque chronique sévère en permettant une adaptation thérapeutique anticipée plutôt que réactive.",
    physiopatho: "Cardiomyopathie induite par le stress chronique et axe cœur-rein : l'insuffisance cardiaque et l'insuffisance rénale chronique s'aggravent souvent mutuellement (syndrome cardio-rénal) — la baisse du débit cardiaque réduit la perfusion rénale → activation compensatrice du SRAA déjà délétère pour le cœur → rétention hydrosodée aggravant la congestion cardiaque → cercle vicieux nécessitant une approche thérapeutique intégrée tenant compte simultanément des deux organes, avec des arbitrages parfois complexes entre l'optimisation cardiaque (qui peut aggraver transitoirement la fonction rénale) et la préservation rénale.",
    recommandations: "ESC 2023 — Insuffisance cardiaque : introduction rapide et si possible simultanée des 4 classes du traitement de fond (ARNI ou IEC/ARA2, bêta-bloquant, antagoniste minéralocorticoïde, SGLT2 inhibiteur) dès le diagnostic d'IC à FEVG réduite, sans attendre une titration complète séquentielle. Optimisation à chaque consultation jusqu'aux doses cibles tolérées. Réévaluation régulière de la FEVG et du statut clinique pour ajuster la stratégie.",
    situations_complexes: "Décompensation cardiaque aiguë : diurétiques de l'anse IV (furosémide) en 1ère intention pour la congestion aiguë, surveillance stricte de la fonction rénale et de la kaliémie, reprise progressive du traitement de fond dès la stabilisation plutôt que son arrêt prolongé (sauf contre-indication transitoire formelle).\n\nIC et grossesse : situation à très haut risque nécessitant une prise en charge multidisciplinaire spécialisée, de nombreux traitements de l'IC sont contre-indiqués en grossesse (IEC/ARA2/ARNI formellement, certains bêta-bloquants à adapter) — décision de grossesse à discuter au préalable selon la sévérité de la cardiopathie sous-jacente.\n\nIC terminale réfractaire : discussion de l'assistance circulatoire mécanique ou de la transplantation cardiaque selon l'éligibilité, intégration précoce des soins palliatifs spécialisés en cardiologie pour la gestion des symptômes et l'accompagnement, sans opposition avec la poursuite de traitements actifs adaptés.",
    effets_secondaires: [
      {label:"Décompensation cardiaque aiguë non reconnue à temps : œdème pulmonaire aigu, urgence vitale", niveau:"danger"},
      {label:"Syndrome cardio-rénal : aggravation mutuelle des fonctions cardiaque et rénale, arbitrages thérapeutiques complexes", niveau:"danger"},
      {label:"IC et grossesse non planifiée chez une patiente sous traitement contre-indiqué : risque tératogène majeur (IEC/ARA2/ARNI)", niveau:"danger"},
    ],
    classes: [
      {classe:"Diurétiques de l'anse — décompensation aiguë", dci:["Furosémide IV ou oral selon la sévérité"], specialites:["Lasilix®"], couleur:"#C0392B", remarque:"Traitement de la congestion aiguë, surveillance rapprochée de la fonction rénale et de la kaliémie pendant l'ajustement"},
      {classe:"Vériciguat (stimulateur de la guanylate cyclase soluble)", dci:["Vériciguat 2,5-10mg/j"], specialites:["Verquvo®"], couleur:"#1E3A5F", remarque:"AMM récente add-on dans l'IC à FEVG réduite avec décompensation récente malgré traitement optimal, mécanisme distinct des 4 classes historiques"},
    ],
    interactions: [
      "Furosémide + AINS : antagonisme de l'effet diurétique et risque accru d'insuffisance rénale aiguë — association à éviter",
      "Vériciguat + dérivés nitrés ou inhibiteurs de la phosphodiestérase de type 5 : risque d'hypotension sévère — CI ou grande prudence",
    ],
    points_cles: [
      "ESC 2023 : introduction rapide et simultanée des 4 classes de traitement de fond, sans titration strictement séquentielle",
      "Syndrome cardio-rénal : approche intégrée nécessaire, arbitrages parfois complexes entre optimisation cardiaque et préservation rénale",
      "IEC/ARA2/ARNI : contre-indication formelle en grossesse, anticipation et contraception efficace indispensables chez la femme en âge de procréer",
      "Décompensation aiguë : reprise rapide du traitement de fond après stabilisation plutôt qu'arrêt prolongé",
      "Monitoring hémodynamique implantable : piste d'avenir pour une détection précoce et une adaptation thérapeutique anticipée",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F25 — HYPERCHOLESTÉROLÉMIE
   ════════════════════════════════════════════════════════ */
FN['hypercholesterolemie'] = {
  n2: {
    saviez_vous: "Le LDL-cholestérol n'a pas de seuil minimal en deçà duquel il deviendrait délétère — contrairement à de nombreux paramètres biologiques, plus le LDL est bas, mieux c'est pour la prévention cardiovasculaire, sans effet 'plancher' démontré jusqu'à des valeurs très basses (< 0,3 g/L) atteintes avec les traitements les plus puissants actuels.",
    physiopatho: "Athérogenèse et rôle du LDL : le LDL-cholestérol pénètre la paroi artérielle au niveau de l'intima → oxydation par les radicaux libres locaux → LDL oxydé capté par les macrophages via les récepteurs scavengers → formation de cellules spumeuses → accumulation progressive formant la strie lipidique puis la plaque d'athérome → cette plaque peut s'éroder ou se rompre, exposant son contenu thrombogène au sang circulant → formation d'un thrombus pouvant occlure l'artère (mécanisme de l'infarctus du myocarde ou de l'AVC ischémique).",
    mecanisme: "Statines (atorvastatine, rosuvastatine) : inhibent compétitivement l'HMG-CoA réductase, enzyme clé limitante de la synthèse hépatique du cholestérol → ↓ synthèse de cholestérol intra-hépatocytaire → ↑ expression compensatoire des récepteurs LDL à la surface des hépatocytes → ↑ captation du LDL circulant → ↓ LDL-cholestérol plasmatique. Effet dose-dépendant mais avec une relation non linéaire (chaque doublement de dose n'apporte qu'environ 6% de baisse supplémentaire du LDL).\n\nEzétimibe : inhibe spécifiquement l'absorption intestinale du cholestérol (alimentaire et biliaire) au niveau de la protéine NPC1L1 de la bordure en brosse intestinale → mécanisme complémentaire et synergique avec les statines (qui agissent sur la synthèse hépatique), permettant une association rationnelle en cas d'objectif non atteint sous statine seule.",
    diagnostic: "Bilan lipidique à jeun (ou non-jeun selon les recommandations actuelles, les deux étant désormais acceptés) : LDL-cholestérol, HDL-cholestérol, triglycérides, cholestérol total. Objectif de LDL-cholestérol fixé selon le niveau de risque cardiovasculaire global du patient (calculé selon des scores comme SCORE2), et non selon une valeur seuil unique pour tous — un même taux de LDL peut être acceptable chez un patient à bas risque mais nécessiter un traitement intensif chez un patient à très haut risque.",
    effets_secondaires: [
      {label:"Myalgies (statines) — effet indésirable le plus fréquemment rapporté, à différencier d'une rhabdomyolyse vraie", niveau:"warning"},
      {label:"Rhabdomyolyse (statines, rare mais grave) — CPK très élevées, douleurs musculaires intenses, urines foncées", niveau:"danger"},
      {label:"Cytolyse hépatique (statines) — surveillance biologique recommandée en début de traitement", niveau:"warning"},
      {label:"Légère augmentation du risque de diabète (statines, effet classe modeste mais réel)", niveau:"info"},
    ],
    classes: [
      {classe:"Statines de forte puissance — 1ère intention", dci:["Atorvastatine 10-80mg/j","Rosuvastatine 5-40mg/j"], specialites:["Tahor®","Crestor®"], couleur:"#1B6B52", remarque:"Choix de la puissance et de la dose selon l'objectif de LDL fixé en fonction du niveau de risque cardiovasculaire du patient"},
      {classe:"Ézétimibe — association si objectif non atteint", dci:["Ézétimibe 10mg/j"], specialites:["Ezetrol®"], couleur:"#1E3A5F", remarque:"Mécanisme complémentaire aux statines (absorption intestinale vs synthèse hépatique), association rationnelle et synergique"},
      {classe:"Association fixe statine + ézétimibe", dci:["Atorvastatine/Ézétimibe","Rosuvastatine/Ézétimibe"], specialites:["Diverses spécialités combinées"], couleur:"#6B2D5E", remarque:"Simplifie la prise et améliore l'observance par rapport à deux comprimés séparés"},
    ],
    interactions: [
      "Statines + jus de pamplemousse (inhibiteur CYP3A4) : ↑ concentration de certaines statines (atorvastatine, simvastatine) — éviter ou espacer largement",
      "Simvastatine + amlodipine forte dose : ↑ risque de myopathie — limiter la dose de simvastatine à 20mg si association",
      "Statines + macrolides (clarithromycine, érythromycine) : ↑ risque de rhabdomyolyse — suspendre temporairement la statine pendant la cure d'antibiotique si possible",
    ],
    points_cles: [
      "LDL-cholestérol : pas de seuil minimal délétère démontré, 'plus bas est meilleur' pour la prévention cardiovasculaire",
      "Objectif de LDL personnalisé selon le risque cardiovasculaire global du patient, pas une valeur unique pour tous",
      "Myalgies sous statines : très fréquentes et généralement bénignes, à différencier de la rhabdomyolyse vraie (CPK très élevées)",
      "Ézétimibe : mécanisme complémentaire aux statines, association rationnelle en cas d'objectif non atteint",
      "Interactions avec les inhibiteurs du CYP3A4 (macrolides, antifongiques azolés, jus de pamplemousse) : vigilance systématique",
    ],
  },
  n3: {
    saviez_vous: "Les inhibiteurs de PCSK9 (évolocumab, alirocumab) permettent d'obtenir des réductions de LDL-cholestérol de 50-60% supplémentaires même chez des patients déjà sous statine à dose maximale — une avancée majeure pour les patients à très haut risque cardiovasculaire n'atteignant pas leurs objectifs malgré un traitement oral optimal, avec un profil de tolérance remarquablement bon par rapport aux statines.",
    physiopatho: "Rôle de PCSK9 dans le métabolisme du LDL : la protéine PCSK9 (Proprotein Convertase Subtilisin/Kexin type 9), sécrétée principalement par le foie, se lie aux récepteurs LDL à la surface des hépatocytes et favorise leur dégradation intracellulaire après internalisation → moins de récepteurs LDL disponibles en surface → ↓ captation du LDL circulant → ↑ LDL-cholestérol plasmatique. Des mutations génétiques de PCSK9 (gain de fonction) sont une cause d'hypercholestérolémie familiale sévère, tandis que d'autres mutations (perte de fonction) sont associées à des taux de LDL très bas et une protection cardiovasculaire marquée — ces observations ont directement inspiré le développement des inhibiteurs thérapeutiques de PCSK9.",
    pharmacocinetique: "Évolocumab/Alirocumab (anticorps monoclonaux anti-PCSK9) : voie SC, T½ = 11-20 jours selon la molécule, catabolisme protéique sans métabolisme hépatique CYP → profil d'interactions médicamenteuses pratiquement nul, avantage majeur par rapport aux statines dont le métabolisme CYP3A4 est source de nombreuses interactions. Injection toutes les 2 semaines ou mensuelle selon la posologie choisie.\n\nInclisiran (siRNA anti-PCSK9, mécanisme différent des anticorps) : interfère directement avec l'ARN messager codant PCSK9 dans l'hépatocyte → ↓ synthèse de la protéine PCSK9 elle-même plutôt que blocage de la protéine déjà sécrétée → durée d'action remarquablement prolongée permettant une injection seulement 2 fois par an après les doses de charge initiales.",
    cas_clinique: "Patient 62 ans, antécédent d'infarctus du myocarde il y a 1 an, sous atorvastatine 80mg/j + ézétimibe 10mg/j, LDL-cholestérol = 1,1 g/L malgré ce traitement optimal et une bonne observance vérifiée, objectif fixé à 0,55 g/L en raison du très haut risque cardiovasculaire. Que proposez-vous ?\n\nRaisonnement : patient à très haut risque cardiovasculaire (antécédent d'infarctus) n'atteignant pas son objectif de LDL malgré un traitement oral optimal bien conduit et bien toléré → indication à l'ajout d'un inhibiteur de PCSK9 (évolocumab ou alirocumab), permettant une réduction supplémentaire de 50-60% du LDL et donc l'atteinte probable de l'objectif fixé. Bénéfice cardiovasculaire démontré dans cette population à très haut risque par les essais cliniques de référence (FOURIER, ODYSSEY OUTCOMES).",
    effets_secondaires: [
      {label:"Inhibiteurs de PCSK9 : réactions au site d'injection, généralement le seul effet indésirable notable rapporté", niveau:"info"},
      {label:"Inclisiran : effets indésirables comparables aux anticorps anti-PCSK9, profil de tolérance également favorable", niveau:"info"},
      {label:"Statine forte dose mal tolérée : myalgies invalidantes pouvant compromettre l'observance à long terme", niveau:"warning"},
    ],
    classes: [
      {classe:"Inhibiteurs de PCSK9 (anticorps monoclonaux)", dci:["Évolocumab 140mg/2 sem ou 420mg/mois SC","Alirocumab 75-150mg/2 sem SC"], specialites:["Repatha®","Praluent®"], couleur:"#991B1B", remarque:"Réduction LDL de 50-60% supplémentaire même sur statine à dose maximale, bénéfice cardiovasculaire démontré (FOURIER, ODYSSEY)"},
      {classe:"Inclisiran (siRNA anti-PCSK9)", dci:["Inclisiran 284mg SC"], specialites:["Leqvio®"], couleur:"#6B2D5E", remarque:"Mécanisme différent (interférence ARN), seulement 2 injections par an après les doses de charge, avancée en termes d'observance"},
      {classe:"Acide bempédoïque — alternative orale si statines mal tolérées", dci:["Acide bempédoïque 180mg/j"], specialites:["Nilemdo®"], couleur:"#1E3A5F", remarque:"Mécanisme distinct (inhibition de l'ATP-citrate lyase, en amont de l'HMG-CoA réductase), option orale pour les intolérants aux statines"},
    ],
    interactions: [
      "Inhibiteurs de PCSK9 : aucune interaction médicamenteuse cliniquement significative connue (anticorps monoclonaux, catabolisme protéique)",
      "Acide bempédoïque + statines : association possible et synergique, mécanismes complémentaires sur la voie du cholestérol",
    ],
    points_cles: [
      "PCSK9 : régule la dégradation des récepteurs LDL hépatiques, cible thérapeutique directement inspirée de mutations génétiques naturelles",
      "Inhibiteurs de PCSK9 : profil d'interactions quasi nul comparé aux statines, avantage majeur chez les patients polymédiqués",
      "Inclisiran : seulement 2 injections par an en entretien, avancée majeure en termes d'observance thérapeutique",
      "Bénéfice cardiovasculaire des anti-PCSK9 démontré spécifiquement chez les patients à très haut risque (FOURIER, ODYSSEY OUTCOMES)",
      "Acide bempédoïque : option orale intéressante en cas d'intolérance vraie aux statines, mécanisme d'action distinct",
    ],
  },
  n4: {
    saviez_vous: "L'hypercholestérolémie familiale (HF), maladie génétique sous-diagnostiquée touchant environ 1 personne sur 250-300 dans la population générale, multiplie le risque d'infarctus précoce par 10 à 20 si elle n'est pas traitée — un dépistage en cascade systématique de la famille d'un patient index identifié est recommandé, car chaque apparenté au premier degré a 50% de risque d'être également porteur de la mutation causale.",
    physiopatho: "Bases génétiques de l'hypercholestérolémie familiale : la forme la plus fréquente est due à des mutations du gène du récepteur LDL (LDLR) entraînant un défaut quantitatif ou qualitatif de ces récepteurs hépatiques → captation insuffisante du LDL circulant dès la naissance → exposition cumulative à des taux de LDL très élevés pendant des décennies → athérosclérose accélérée et infarctus pouvant survenir dès la 3e-4e décennie de vie chez les formes hétérozygotes non traitées, et dès l'enfance dans les rares formes homozygotes (très sévères, nécessitant des thérapeutiques spécifiques comme l'aphérèse des LDL).",
    recommandations: "ESC/EAS 2019 (actualisées) — Dyslipidémies : objectifs de LDL-cholestérol stratifiés selon le niveau de risque cardiovasculaire global (très haut risque < 0,55 g/L, haut risque < 0,70 g/L, risque modéré < 1,00 g/L). Statine de forte puissance à dose maximale tolérée en 1ère intention. Ajout d'ézétimibe si objectif non atteint. Ajout d'un inhibiteur de PCSK9 si objectif toujours non atteint malgré statine + ézétimibe chez les patients à haut ou très haut risque.",
    situations_complexes: "Hypercholestérolémie familiale : dépistage en cascade systématique de la famille recommandé dès qu'un cas index est identifié, traitement souvent nécessaire dès l'adolescence ou le jeune âge adulte en raison du risque cardiovasculaire précoce considérable, objectifs de LDL particulièrement stricts.\n\nGrossesse : statines formellement CONTRE-INDIQUÉES (tératogénicité, notamment effets sur le développement du système nerveux fœtal et la stéroïdogenèse) → arrêt impératif dès le projet de grossesse ou sa découverte, l'ézétimibe et les chélateurs des acides biliaires (résines) peuvent être des alternatives à discuter selon le contexte clinique et la sévérité.\n\nIntolérance vraie aux statines (myalgies invalidantes confirmées après réintroduction et test de plusieurs molécules différentes) : stratégie alternative combinant ézétimibe, acide bempédoïque, et inhibiteurs de PCSK9 selon le niveau de risque cardiovasculaire et l'objectif à atteindre.",
    effets_secondaires: [
      {label:"Hypercholestérolémie familiale homozygote non traitée : infarctus pouvant survenir dès l'enfance, forme très sévère", niveau:"danger"},
      {label:"Statines en grossesse : tératogénicité démontrée, arrêt impératif dès le projet de grossesse", niveau:"danger"},
      {label:"Rhabdomyolyse sévère sous statine : complication rare mais potentiellement fatale si non reconnue à temps", niveau:"danger"},
    ],
    classes: [
      {classe:"Aphérèse des LDL — formes homozygotes sévères", dci:["Technique d'épuration extracorporelle du LDL"], specialites:["Centres spécialisés"], couleur:"#C0392B", remarque:"Réservée aux formes homozygotes d'hypercholestérolémie familiale très sévères, séances régulières en centre spécialisé"},
      {classe:"Chélateurs des acides biliaires — alternative en grossesse", dci:["Colestyramine selon prescription"], specialites:["Questran®"], couleur:"#1E3A5F", remarque:"N'est pas absorbé systémiquement, option envisageable en grossesse si traitement hypolipémiant jugé nécessaire selon avis spécialisé"},
    ],
    interactions: [
      "Colestyramine + nombreux médicaments oraux : chélation digestive → ↓ absorption de nombreux traitements concomitants — espacer largement les prises",
      "Statines + ciclosporine (chez transplantés) : ↑ majeure du risque de myopathie — ajustement de dose impératif et surveillance rapprochée",
    ],
    points_cles: [
      "Hypercholestérolémie familiale : maladie génétique sous-diagnostiquée, dépistage en cascade familial recommandé dès un cas index identifié",
      "Objectifs de LDL stratifiés selon le risque cardiovasculaire global (ESC/EAS), pas une valeur unique pour tous les patients",
      "Statines : contre-indication formelle et absolue en grossesse, anticipation indispensable chez la femme en âge de procréer",
      "Stratégie en cas d'intolérance vraie aux statines : combinaison ézétimibe + acide bempédoïque + éventuellement anti-PCSK9",
      "Le pharmacien a un rôle clé dans le repérage des intolérances vraies vs effets nocebo, et dans l'orientation vers un dépistage familial",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F26 — GOUTTE
   ════════════════════════════════════════════════════════ */
FN['goutte'] = {
  n2: {
    saviez_vous: "Contrairement à une idée répandue, il ne faut JAMAIS débuter un traitement hypouricémiant (allopurinol) pendant une crise aiguë de goutte — cela peut paradoxalement prolonger ou aggraver la crise en raison de la mobilisation des cristaux d'urate lors de la baisse rapide de l'uricémie. Le traitement de fond se débute toujours à distance de la crise, une fois celle-ci résolue.",
    physiopatho: "La goutte résulte d'une hyperuricémie chronique (> 0,36 mmol/L) conduisant à la précipitation de cristaux d'urate de sodium dans les articulations et les tissus périarticulaires → ces cristaux sont reconnus par les macrophages synoviaux via le récepteur NLRP3 (inflammasome) → activation de la caspase-1 → clivage et libération massive d'IL-1β → recrutement de neutrophiles dans l'articulation → inflammation aiguë intense, douleur brutale, gonflement et rougeur caractéristiques de la crise de goutte, classiquement maximale dans les 24 premières heures.",
    mecanisme: "Colchicine : se lie à la tubuline → inhibe la polymérisation des microtubules → ↓ migration des neutrophiles vers le site inflammatoire + ↓ activation de l'inflammasome NLRP3 → réduction de l'inflammation aiguë. Marge thérapeutique étroite, fenêtre de tolérance réduite, à utiliser à dose réduite par rapport aux protocoles anciens (recommandations actualisées).\n\nAINS (indométacine, naproxène) : inhibition des COX → ↓ prostaglandines pro-inflammatoires → efficaces sur la douleur et l'inflammation de la crise aiguë, à utiliser à pleine dose dès le début de la crise pour une efficacité optimale.\n\nAllopurinol (traitement de fond, hors crise) : inhibe la xanthine oxydase → ↓ production d'acide urique à partir des purines → ↓ uricémie progressive, introduction à dose faible avec titration lente pour minimiser le risque de mobilisation cristalline déclenchant une crise.",
    diagnostic: "Diagnostic de certitude : ponction articulaire avec analyse du liquide synovial au microscope à lumière polarisée, mettant en évidence des cristaux d'urate de sodium typiques (forme d'aiguille, biréfringence négative) — geste de référence mais souvent remplacé en pratique par un diagnostic clinique de présomption (douleur brutale, monoarticulaire, souvent à la 1ère articulation métatarso-phalangienne du gros orteil = 'podagre', terrain à risque).",
    effets_secondaires: [
      {label:"Colchicine : diarrhée, douleurs abdominales — signes annonciateurs d'un surdosage à ne pas négliger", niveau:"warning"},
      {label:"Surdosage colchicine : toxicité hématologique et multiviscérale grave, marge thérapeutique très étroite", niveau:"danger"},
      {label:"AINS : CI ou prudence si insuffisance rénale, anticoagulants, antécédent ulcéreux", niveau:"danger"},
      {label:"Allopurinol débuté en crise aiguë : risque de prolongation ou d'aggravation de la crise", niveau:"warning"},
    ],
    classes: [
      {classe:"Colchicine — traitement de la crise aiguë, dose réduite actualisée", dci:["Colchicine 1mg puis 0,5mg 1h après, max 2mg J1"], specialites:["Colchicine Opocalcium®"], couleur:"#1B6B52", remarque:"Protocole actualisé à dose réduite par rapport aux anciennes pratiques, efficacité comparable avec moins d'effets indésirables digestifs"},
      {classe:"AINS — alternative ou association en crise aiguë", dci:["Indométacine 50mg × 3/j","Naproxène 500mg × 2/j"], specialites:["Indocid®","Apranax®"], couleur:"#1E3A5F", remarque:"Pleine dose dès le début de la crise pour une efficacité optimale, durée limitée à la crise aiguë"},
      {classe:"Allopurinol — traitement de fond, hors crise uniquement", dci:["Allopurinol 100-300mg/j, titration progressive"], specialites:["Zyloric®"], couleur:"#B45309", remarque:"Jamais débuté pendant une crise, introduction à dose faible avec titration lente, objectif uricémie < 0,36 mmol/L"},
    ],
    interactions: [
      "Colchicine + inhibiteurs puissants du CYP3A4/P-gp (clarithromycine, kétoconazole, ciclosporine) : ↑ toxicité majeure de la colchicine — association à proscrire ou ajustement strict",
      "Allopurinol + azathioprine ou 6-mercaptopurine : ↑ majeure de la toxicité hématologique (inhibition de leur dégradation) — réduction impérative de la dose de l'immunosuppresseur",
      "AINS + anticoagulants : ↑ risque hémorragique — prudence et surveillance accrue si association nécessaire",
    ],
    points_cles: [
      "Ne jamais débuter l'allopurinol pendant une crise aiguë — risque de prolongation ou d'aggravation de la crise",
      "Colchicine : marge thérapeutique étroite, protocole à dose réduite désormais recommandé, diarrhée = signe d'alerte de surdosage",
      "Diagnostic de certitude par ponction articulaire et cristaux d'urate, mais diagnostic clinique souvent suffisant en pratique",
      "Allopurinol + azathioprine : interaction majeure et potentiellement grave, à vérifier systématiquement avant association",
      "Objectif d'uricémie sous traitement de fond : < 0,36 mmol/L pour prévenir les récidives et les complications chroniques",
    ],
  },
  n3: {
    saviez_vous: "Le fébuxostat, alternative à l'allopurinol pour le traitement de fond de la goutte, a fait l'objet d'une mise en garde de sécurité cardiovasculaire (étude CARES) montrant un risque accru de mortalité cardiovasculaire par rapport à l'allopurinol chez les patients ayant des antécédents cardiovasculaires significatifs — une donnée essentielle orientant le choix entre ces deux options selon le profil de risque du patient.",
    physiopatho: "Tophus goutteux et goutte chronique : en l'absence de contrôle durable de l'uricémie, des dépôts d'urate de sodium s'accumulent progressivement dans les tissus mous périarticulaires et sous-cutanés, formant des tophus (nodules visibles et palpables, parfois ulcérés) → ces dépôts chroniques s'accompagnent d'une inflammation chronique de bas grade et peuvent éroder l'os sous-jacent, entraînant des déformations articulaires définitives et une atteinte fonctionnelle majeure si la goutte n'est pas contrôlée sur le long terme — démonstration que la goutte mal traitée n'est pas qu'une succession de crises douloureuses mais une maladie structurellement destructrice.",
    pharmacocinetique: "Allopurinol : métabolisé en oxypurinol (métabolite actif à demi-vie beaucoup plus longue, 15-30h, expliquant la possibilité d'une administration en une seule prise quotidienne malgré une T½ courte de la molécule mère elle-même, 1-3h), élimination rénale principalement → nécessité d'adapter la dose à la fonction rénale pour éviter l'accumulation et la toxicité.\n\nFébuxostat : métabolisme hépatique principalement (glucuronidation et oxydation), moins dépendant de la fonction rénale que l'allopurinol → alternative intéressante chez l'insuffisant rénal léger à modéré ne tolérant pas l'allopurinol, mais profil de risque cardiovasculaire à prendre en compte selon les antécédents du patient.",
    cas_clinique: "Patient 55 ans, goutte récidivante (4 crises dans l'année écoulée), tophus visible au niveau du coude, antécédent d'infarctus du myocarde il y a 3 ans, fonction rénale normale. Quel traitement de fond privilégier ?\n\nRaisonnement : patient avec goutte récidivante et tophus (indication formelle à un traitement de fond hypouricémiant) mais antécédent cardiovasculaire significatif (infarctus) → privilégier l'allopurinol plutôt que le fébuxostat en raison du signal de sécurité cardiovasculaire défavorable de ce dernier chez les patients à risque cardiovasculaire élevé (étude CARES). Introduction à dose faible avec titration progressive, objectif d'uricémie strict (< 0,36 mmol/L, voire < 0,30 mmol/L en présence de tophus) pour favoriser leur résorption progressive.",
    effets_secondaires: [
      {label:"Fébuxostat : risque accru de mortalité cardiovasculaire chez les patients à antécédents CV (étude CARES) — vigilance", niveau:"danger"},
      {label:"Syndrome d'hypersensibilité à l'allopurinol (DRESS) : rare mais potentiellement mortel, plus fréquent chez les porteurs de l'allèle HLA-B*5801 (notamment populations asiatiques)", niveau:"danger"},
      {label:"Tophus ulcéré : risque de surinfection bactérienne secondaire", niveau:"warning"},
    ],
    classes: [
      {classe:"Fébuxostat — alternative si intolérance allopurinol, prudence cardiovasculaire", dci:["Fébuxostat 80-120mg/j"], specialites:["Adénuric®"], couleur:"#B45309", remarque:"À éviter ou utiliser avec grande prudence chez les patients avec antécédents cardiovasculaires significatifs (signal CARES)"},
      {classe:"Probénécide — uricosurique, alternative ou association", dci:["Probénécide selon prescription"], specialites:["Bénémide®"], couleur:"#1E3A5F", remarque:"Mécanisme différent (↑ excrétion urinaire de l'acide urique plutôt que ↓ de sa production), à éviter en cas de lithiase urique"},
    ],
    interactions: [
      "Fébuxostat + azathioprine/6-mercaptopurine : même interaction majeure que l'allopurinol (inhibition de la xanthine oxydase) — CI",
      "Probénécide + pénicillines : ↑ concentration des pénicillines par réduction de leur sécrétion tubulaire rénale (interaction parfois recherchée)",
    ],
    points_cles: [
      "Fébuxostat : signal de sécurité cardiovasculaire (CARES) à prendre en compte, allopurinol préféré si antécédents CV significatifs",
      "Tophus goutteux : témoin d'une maladie structurellement destructrice, pas seulement de crises douloureuses isolées",
      "Allèle HLA-B*5801 : facteur de risque du syndrome d'hypersensibilité grave à l'allopurinol, particulièrement chez certaines populations",
      "Objectif d'uricémie plus strict (< 0,30 mmol/L) en présence de tophus pour favoriser leur résorption progressive",
      "Fébuxostat et allopurinol : même interaction majeure et dangereuse avec l'azathioprine/6-mercaptopurine à vérifier systématiquement",
    ],
  },
  n4: {
    saviez_vous: "La goutte est de plus en plus reconnue comme un marqueur de risque cardiovasculaire et métabolique global plutôt qu'une simple pathologie articulaire isolée — l'hyperuricémie chronique est associée de façon indépendante au syndrome métabolique, à l'insuffisance rénale chronique et aux événements cardiovasculaires, justifiant une évaluation et une prise en charge globale du patient goutteux au-delà du seul contrôle de l'uricémie.",
    physiopatho: "Lien entre hyperuricémie, syndrome métabolique et risque cardiovasculaire : l'acide urique en excès aurait des effets délétères directs sur l'endothélium vasculaire (stress oxydatif, dysfonction endothéliale) et sur le système rénine-angiotensine, contribuant potentiellement à l'hypertension artérielle et à l'athérosclérose au-delà de son simple rôle dans la précipitation cristalline articulaire — bien que la relation causale directe (versus simple association épidémiologique par facteurs de risque communs comme l'obésité et l'alimentation) reste débattue dans la littérature scientifique actuelle.",
    recommandations: "EULAR / SFR — Goutte : traitement de la crise aiguë par colchicine à dose réduite, AINS, ou corticoïdes selon le profil du patient et les contre-indications. Traitement de fond hypouricémiant indiqué dès la 2e crise, ou dès la 1ère crise si tophus, lithiase urique, ou insuffisance rénale chronique associée. Objectif d'uricémie < 0,36 mmol/L (< 0,30 mmol/L si tophus). Prophylaxie anti-inflammatoire (colchicine faible dose) recommandée les premiers mois suivant l'introduction du traitement hypouricémiant pour prévenir les crises de mobilisation.",
    situations_complexes: "Insuffisance rénale chronique : adaptation impérative des doses d'allopurinol et de colchicine à la fonction rénale (risque d'accumulation et de toxicité), fébuxostat parfois préféré en cas d'IRC légère-modérée mais avec la réserve cardiovasculaire mentionnée précédemment.\n\nGoutte et corticothérapie : les corticoïdes systémiques (cure courte) sont une alternative efficace pour la crise aiguë, particulièrement utile en cas de contre-indication à la colchicine et aux AINS (insuffisance rénale sévère, anticoagulation), mais leur usage répété expose aux effets indésirables propres à cette classe.\n\nHyperuricémie asymptomatique (sans antécédent de crise) : pas de traitement hypouricémiant systématique recommandé en l'absence de manifestation clinique, sauf situations particulières (avant chimiothérapie à haut risque de syndrome de lyse tumorale, par exemple) — distinction importante à faire avec la goutte symptomatique qui justifie, elle, un traitement de fond.",
    effets_secondaires: [
      {label:"DRESS syndrome sous allopurinol : urgence dermatologique et systémique grave, mortalité non négligeable", niveau:"danger"},
      {label:"Goutte non contrôlée au long cours : destruction articulaire progressive et tophus invalidants", niveau:"danger"},
      {label:"Corticothérapie répétée pour crises de goutte : effets indésirables cumulatifs propres à cette classe (ostéoporose, diabète)", niveau:"warning"},
    ],
    classes: [
      {classe:"Anakinra (anti-IL-1) — crise de goutte réfractaire ou CI aux traitements classiques", dci:["Anakinra SC selon prescription spécialisée"], specialites:["Kineret® (hors AMM officielle goutte en France, usage spécialisé)"], couleur:"#991B1B", remarque:"Cible directement l'IL-1β, cytokine centrale de la crise de goutte, réservé aux situations réfractaires ou avec contre-indications multiples"},
      {classe:"Pégloticase — goutte tophacée sévère réfractaire (USA, informatif)", dci:["Pégloticase IV"], specialites:["Krystexxa® (non disponible en France)"], couleur:"#555", remarque:"Informationnel — uricase recombinante pour les formes les plus sévères et réfractaires, dégrade directement l'acide urique"},
    ],
    interactions: [
      "Anakinra + autres biothérapies immunosuppressives : risque infectieux cumulé — association généralement évitée",
      "Allopurinol/Fébuxostat + théophylline : ↑ concentration de théophylline (inhibition de la xanthine oxydase) — surveillance si association",
    ],
    points_cles: [
      "Goutte : marqueur de risque cardiovasculaire et métabolique global, justifie une évaluation au-delà du seul contrôle de l'uricémie",
      "Prophylaxie anti-inflammatoire (colchicine faible dose) recommandée les premiers mois après introduction du traitement de fond",
      "Hyperuricémie asymptomatique : pas de traitement systématique en l'absence de manifestation clinique (sauf contextes spécifiques)",
      "DRESS syndrome sous allopurinol : urgence à reconnaître, particulièrement chez les patients à risque génétique (HLA-B*5801)",
      "Adaptation des doses à la fonction rénale impérative pour l'allopurinol et la colchicine, risque d'accumulation et de toxicité sinon",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F27 — RGO (REFLUX GASTRO-ŒSOPHAGIEN)
   ════════════════════════════════════════════════════════ */
FN['rgo'] = {
  n2: {
    saviez_vous: "Les inhibiteurs de la pompe à protons (IPP) sont l'une des classes médicamenteuses les plus prescrites au long cours en France, souvent au-delà de la durée réellement nécessaire — une réévaluation périodique de la nécessité de poursuivre le traitement est recommandée, le RGO simple ne justifiant pas systématiquement un traitement à vie une fois les symptômes contrôlés et les facteurs favorisants corrigés.",
    physiopatho: "Le RGO résulte d'une relaxation inappropriée et trop fréquente du sphincter inférieur de l'œsophage (SIO), structure musculaire normalement tonique empêchant la remontée du contenu gastrique acide vers l'œsophage → le contenu gastrique acide (pH 1-2) entre en contact avec la muqueuse œsophagienne, non protégée par les mécanismes de défense présents dans l'estomac (mucus, bicarbonates) → inflammation (œsophagite), sensation de brûlure rétrosternale (pyrosis) caractéristique → facteurs favorisants : hernie hiatale, obésité, grossesse, certains aliments (graisses, café, alcool, chocolat), certains médicaments relaxant le SIO.",
    mecanisme: "IPP (oméprazole, ésoméprazole, pantoprazole) : inhibent de façon irréversible la pompe à protons H+/K+-ATPase de la cellule pariétale gastrique → blocage de l'étape finale commune de la sécrétion acide quel que soit le stimulus initial (histamine, gastrine, acétylcholine) → inhibition puissante et durable de la sécrétion acide gastrique, permettant la cicatrisation des lésions œsophagiennes et le contrôle des symptômes. Nécessitent une prise à jeun (30 minutes avant le repas) pour une efficacité optimale, car ils n'agissent que sur les pompes activées par l'arrivée alimentaire.\n\nAlginates et antiacides : action locale et mécanique, formant un gel protecteur flottant à la surface du contenu gastrique (alginates) ou neutralisant directement l'acidité (antiacides) → soulagement rapide mais transitoire des symptômes, complémentaire des IPP pour les symptômes résiduels ou en traitement de l'épisode aigu ponctuel.",
    diagnostic: "Diagnostic clinique le plus souvent suffisant devant un pyrosis typique (brûlure rétrosternale ascendante, favorisée par la position allongée ou la flexion antérieure du tronc, soulagée par les antiacides). Endoscopie digestive haute recommandée si signes d'alarme (dysphagie, amaigrissement, anémie, hémorragie digestive, âge > 50 ans avec symptômes récents) ou en l'absence de réponse au traitement empirique bien conduit.",
    effets_secondaires: [
      {label:"IPP au long cours : carence en vitamine B12 et en fer possible (réduction de l'absorption liée à l'hypochlorhydrie)", niveau:"warning"},
      {label:"IPP au long cours : risque légèrement accru de fractures et d'infections digestives (Clostridioides difficile)", niveau:"warning"},
      {label:"RGO non traité et chronique : œsophagite érosive, sténose peptique, endobrachyœsophage (lésion précancéreuse)", niveau:"danger"},
    ],
    classes: [
      {classe:"IPP — traitement de référence", dci:["Oméprazole 20mg/j","Ésoméprazole 20-40mg/j","Pantoprazole 20-40mg/j"], specialites:["Mopral®","Inexium®","Eupantol®"], couleur:"#1B6B52", remarque:"Prise à jeun 30 minutes avant le repas pour une efficacité optimale, durée de traitement à réévaluer périodiquement"},
      {classe:"Alginates — soulagement symptomatique rapide", dci:["Alginate de sodium"], specialites:["Gaviscon®"], couleur:"#1E3A5F", remarque:"Action locale et mécanique, utile en complément des IPP pour les symptômes résiduels ou en traitement d'appoint ponctuel"},
      {classe:"Anti-H2 — alternative ou association", dci:["Famotidine selon prescription"], specialites:["Pepcidac® (selon disponibilité)"], couleur:"#B45309", remarque:"Mécanisme différent des IPP (blocage du récepteur H2 histaminique), parfois utile en association pour le contrôle nocturne des symptômes"},
    ],
    interactions: [
      "IPP + clopidogrel (notamment oméprazole) : ↓ activation du clopidogrel par compétition pour le CYP2C19 — préférer le pantoprazole si association nécessaire",
      "IPP + méthotrexate forte dose : ↑ toxicité du méthotrexate par réduction de sa clairance rénale — surveillance accrue si association",
      "IPP au long cours + magnésium : risque d'hypomagnésémie sur traitement très prolongé — surveillance biologique périodique",
    ],
    points_cles: [
      "IPP : prise à jeun 30 minutes avant le repas indispensable pour une efficacité optimale (n'agissent que sur les pompes actives)",
      "Réévaluation périodique de la nécessité du traitement IPP au long cours recommandée, pas systématiquement à vie",
      "Signes d'alarme (dysphagie, amaigrissement, anémie, âge > 50 ans) : indication à une endoscopie digestive haute",
      "IPP + clopidogrel : interaction à connaître, préférer le pantoprazole (moins d'interaction CYP2C19) si association indispensable",
      "Alginates : action locale rapide et complémentaire, utile en traitement d'appoint ponctuel des symptômes résiduels",
    ],
  },
  n3: {
    saviez_vous: "L'endobrachyœsophage (œsophage de Barrett), métaplasie de l'épithélium œsophagien en épithélium de type intestinal en réponse à l'agression acide chronique, constitue la principale lésion précancéreuse de l'adénocarcinome œsophagien — sa détection lors d'une endoscopie justifie une surveillance endoscopique régulière selon le degré de dysplasie associée, enjeu majeur de la prise en charge du RGO chronique non contrôlé.",
    physiopatho: "Mécanismes de la relaxation inappropriée du SIO : au-delà d'une simple hypotonie basale du sphincter, le RGO est le plus souvent lié à des épisodes de relaxation transitoire du SIO (RTSIO), phénomène réflexe normalement déclenché par la distension gastrique post-prandiale mais survenant de façon trop fréquente et excessive chez les patients atteints de RGO pathologique → ce mécanisme explique pourquoi le RGO peut survenir même en présence d'un tonus basal du SIO normal au repos, nuançant la vision simpliste d'une simple 'faiblesse' sphinctérienne.",
    pharmacocinetique: "Oméprazole : prodrogue activée uniquement en milieu acide (canalicules sécrétoires de la cellule pariétale) → liaison covalente irréversible à la pompe à protons → durée d'action prolongée malgré une T½ plasmatique courte (1h), car l'effet dépend du renouvellement des pompes (environ 24-48h pour un renouvellement significatif) plutôt que de la présence du médicament dans la circulation. Métabolisme principalement par le CYP2C19 (polymorphisme génétique influençant l'efficacité : les métaboliseurs lents ont une exposition plus importante et donc potentiellement une meilleure efficacité clinique à dose standard).",
    cas_clinique: "Patient 58 ans, RGO connu depuis 10 ans, traité de façon intermittente par IPP en automédication, jamais exploré par endoscopie. Présente désormais une dysphagie progressive aux solides depuis 2 mois. Quelle est votre conduite ?\n\nRaisonnement : dysphagie progressive chez un patient avec RGO ancien non exploré = signe d'alarme formel justifiant une endoscopie digestive haute en urgence relative, à la recherche d'une sténose peptique (complication bénigne mais nécessitant une dilatation) ou d'une complication plus grave (endobrachyœsophage avec dysplasie, voire adénocarcinome débutant). Ne pas se contenter de majorer empiriquement le traitement IPP sans exploration dans ce contexte de signe d'alarme.",
    effets_secondaires: [
      {label:"Sténose peptique œsophagienne : complication du RGO chronique non contrôlé, dysphagie progressive caractéristique", niveau:"warning"},
      {label:"Endobrachyœsophage avec dysplasie de haut grade : lésion précancéreuse nécessitant une surveillance ou un traitement endoscopique spécifique", niveau:"danger"},
      {label:"IPP au long cours + clopidogrel : risque accru d'événements cardiovasculaires par interaction pharmacocinétique (selon les données disponibles, controverse partiellement résolue avec le pantoprazole)", niveau:"warning"},
    ],
    classes: [
      {classe:"IPP forte dose — œsophagite sévère ou endobrachyœsophage", dci:["Ésoméprazole 40mg × 2/j selon sévérité"], specialites:["Inexium®"], couleur:"#1B6B52", remarque:"Doses plus élevées et parfois fractionnées en 2 prises pour les formes sévères d'œsophagite ou en présence d'endobrachyœsophage"},
      {classe:"Baclofène — RGO réfractaire avec composante de relaxations transitoires fréquentes", dci:["Baclofène faible dose selon prescription spécialisée"], specialites:["Liorésal® (hors AMM officielle RGO)"], couleur:"#6B2D5E", remarque:"Réduit la fréquence des relaxations transitoires du SIO, option spécialisée pour les formes réfractaires aux IPP bien conduits"},
    ],
    interactions: [
      "IPP + clopidogrel : interaction pharmacocinétique variable selon l'IPP utilisé, pantoprazole généralement préféré si association indispensable",
      "Baclofène + autres dépresseurs du SNC : potentialisation de la sédation — prudence et information du patient",
    ],
    points_cles: [
      "Endobrachyœsophage : principale lésion précancéreuse de l'adénocarcinome œsophagien, nécessite une surveillance endoscopique adaptée",
      "Dysphagie progressive sur RGO ancien non exploré : signe d'alarme formel justifiant une endoscopie sans délai",
      "Relaxations transitoires du SIO (RTSIO) : mécanisme principal du RGO, pas simplement une hypotonie sphinctérienne basale",
      "Polymorphisme CYP2C19 : influence l'efficacité des IPP, les métaboliseurs lents ayant une exposition et une efficacité accrues",
      "Ne jamais se contenter de majorer empiriquement un traitement IPP en présence d'un signe d'alarme sans exploration préalable",
    ],
  },
  n4: {
    saviez_vous: "Les manifestations extra-digestives du RGO (toux chronique inexpliquée, laryngite postérieure, asthme difficile à contrôler, érosions dentaires) sont fréquemment sous-reconnues — un RGO peut se présenter exclusivement par ces symptômes atypiques sans pyrosis associé, rendant le diagnostic difficile et nécessitant parfois une pH-métrie œsophagienne de 24h pour confirmer le lien causal avant d'envisager un traitement spécifique.",
    physiopatho: "Mécanismes des manifestations extra-œsophagiennes du RGO : deux mécanismes principaux sont proposés — le reflux direct de microgouttelettes acides jusqu'au niveau laryngé ou même dans l'arbre bronchique (théorie du reflux direct, expliquant laryngite postérieure et certaines formes d'asthme), et un mécanisme réflexe vagal indirect où l'acidification œsophagienne distale déclenche, via des afférences vagales communes, une bronchoconstriction ou une toux réflexe sans contact acide direct avec les voies aériennes supérieures (théorie réflexe) — ces deux mécanismes peuvent coexister chez un même patient, complexifiant l'évaluation diagnostique.",
    recommandations: "HAS / SNFGE — RGO : traitement empirique par IPP pendant 4-8 semaines en 1ère intention devant un tableau typique sans signe d'alarme. Endoscopie digestive haute si signes d'alarme, échec du traitement empirique bien conduit, ou symptômes atypiques/extra-digestifs nécessitant d'éliminer une autre cause. pH-métrie de 24h ou impédancemétrie utile pour confirmer le lien causal en cas de symptômes atypiques ou avant d'envisager un traitement chirurgical du RGO.",
    situations_complexes: "RGO réfractaire aux IPP à pleine dose bien pris : rechercher une mauvaise observance ou un mauvais timing de prise (cause la plus fréquente d'échec apparent), un RGO non acide ou faiblement acide (nécessitant une impédancemétrie plutôt qu'une simple pH-métrie pour être détecté), ou une autre pathologie associée ou confondante (troubles fonctionnels œsophagiens, œsophagite à éosinophiles).\n\nGrossesse : RGO très fréquent (relaxation hormonale du SIO sous progestérone, compression mécanique par l'utérus gravide) — mesures hygiéno-diététiques en 1ère intention, alginates et antiacides utilisables sans restriction, IPP utilisables si nécessaire (données de sécurité rassurantes disponibles pour l'oméprazole notamment).\n\nChirurgie anti-reflux (fundoplicature) : option à discuter chez les patients jeunes avec RGO sévère confirmé, dépendants des IPP à vie, ou présentant des manifestations extra-digestives confirmées par exploration fonctionnelle, après échec ou en alternative à un traitement médical au très long cours.",
    effets_secondaires: [
      {label:"Asthme réfractaire lié à un RGO méconnu : contrôle insuffisant malgré un traitement respiratoire optimal si la cause sous-jacente n'est pas traitée", niveau:"warning"},
      {label:"Laryngite postérieure chronique sur RGO méconnu : enrouement persistant, parfois pris à tort pour une cause ORL primitive", niveau:"warning"},
      {label:"Échec apparent des IPP : le plus souvent lié à une mauvaise observance ou un mauvais timing de prise plutôt qu'à une réelle résistance pharmacologique", niveau:"info"},
    ],
    classes: [
      {classe:"IPP à prise fractionnée — formes réfractaires avec bonne observance vérifiée", dci:["Ésoméprazole 40mg matin et soir avant les repas"], specialites:["Inexium®"], couleur:"#1B6B52", remarque:"Fractionnement de la dose pour optimiser le contrôle acide sur 24h en cas de symptômes réfractaires malgré une observance vérifiée"},
      {classe:"Traitement chirurgical (fundoplicature) — alternative au traitement médical au très long cours", dci:["Chirurgie anti-reflux selon indication spécialisée"], specialites:["Procédure chirurgicale"], couleur:"#6B2D5E", remarque:"Option à discuter selon le profil du patient, après confirmation du diagnostic par exploration fonctionnelle adaptée"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse spécifique supplémentaire pour les approches de cette section, au-delà de celles déjà mentionnées pour les IPP",
    ],
    points_cles: [
      "Manifestations extra-digestives du RGO (toux, laryngite, asthme) : à évoquer devant des symptômes atypiques résistant aux traitements spécifiques habituels",
      "Échec apparent des IPP : rechercher d'abord une mauvaise observance ou un mauvais timing de prise avant de conclure à une résistance vraie",
      "RGO non acide : nécessite une impédancemétrie plutôt qu'une simple pH-métrie pour être détecté chez les patients réfractaires",
      "Grossesse : RGO très fréquent, alginates et antiacides en 1ère intention, IPP utilisables si nécessaire avec bonnes données de sécurité",
      "Chirurgie anti-reflux : option à considérer chez les patients jeunes dépendants des IPP à vie ou avec manifestations extra-digestives confirmées",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F28 — HÉMORROÏDES
   ════════════════════════════════════════════════════════ */
FN['hemorrhoides'] = {
  n2: {
    saviez_vous: "Les hémorroïdes ne sont pas des veines pathologiques mais des structures vasculaires physiologiques présentes chez tout être humain dès la naissance, jouant un rôle dans la continence anale fine — la 'maladie hémorroïdaire' correspond uniquement à leur dilatation, prolapsus ou thrombose symptomatique, pas à leur simple présence anatomique normale.",
    physiopatho: "Les plexus hémorroïdaires (internes au-dessus de la ligne pectinée, externes en dessous) sont des structures vasculaires normales contribuant à l'étanchéité du canal anal. La maladie hémorroïdaire survient lorsque ces plexus se dilatent et se congestionnent de façon excessive, favorisée par : la constipation et les efforts de poussée répétés (hyperpression abdominale), la grossesse (compression mécanique + relaxation hormonale des tissus), la sédentarité, et une prédisposition individuelle (fragilité du tissu de soutien) → dilatation veineuse, congestion, parfois thrombose (caillot dans une hémorroïde externe, très douloureux) ou prolapsus (extériorisation d'une hémorroïde interne).",
    mecanisme: "Veinotoniques (diosmine, troxérutine) : renforcent le tonus de la paroi veineuse et réduisent la perméabilité capillaire → diminution de la congestion et de l'œdème hémorroïdaire, effet anti-inflammatoire associé démontré pour certaines molécules → utiles en traitement de la crise et en prévention des récidives.\n\nTopiques locaux (crèmes, suppositoires à base de corticoïdes faibles + anesthésiques locaux) : action anti-inflammatoire et antalgique locale rapide sur les symptômes (douleur, prurit, inflammation), sans effet sur la cause sous-jacente — traitement symptomatique de la crise, durée limitée en raison du risque d'atrophie locale si corticoïde topique prolongé.",
    diagnostic: "Diagnostic clinique le plus souvent évident à l'interrogatoire et à l'inspection (anuscopie si besoin de confirmation ou de classification du grade). Tout saignement rectal, même attribué à des hémorroïdes connues, doit faire l'objet d'une vigilance particulière chez un patient de plus de 50 ans ou avec facteurs de risque de cancer colorectal, pour ne pas méconnaître une autre cause de rectorragie sous couvert d'un diagnostic présumé d'hémorroïdes.",
    effets_secondaires: [
      {label:"Corticoïdes topiques locaux prolongés : atrophie cutanéo-muqueuse anale si usage au-delà de la durée recommandée", niveau:"warning"},
      {label:"Rectorragie attribuée par excès à des hémorroïdes : risque de retard diagnostique d'une autre pathologie (cancer colorectal notamment)", niveau:"danger"},
      {label:"Thrombose hémorroïdaire externe non traitée : douleur intense, parfois nécrose locale spontanée", niveau:"warning"},
    ],
    classes: [
      {classe:"Veinotoniques — traitement de la crise et prévention", dci:["Diosmine 500mg, dose renforcée en crise","Troxérutine"], specialites:["Daflon®","Veinamitol®"], couleur:"#1B6B52", remarque:"Dose renforcée pendant la crise aiguë (souvent 6 comprimés/j les premiers jours), puis dose d'entretien standard"},
      {classe:"Topiques locaux (corticoïde + anesthésique) — symptomatique de crise", dci:["Hydrocortisone + cinchocaïne ou lidocaïne"], specialites:["Titanoréine®","Sédorrhoïde®"], couleur:"#1E3A5F", remarque:"Durée limitée (généralement 7-10 jours maximum), application locale après la toilette"},
      {classe:"Laxatifs doux — prévention de la récidive par lutte contre la constipation", dci:["Macrogol selon besoin"], specialites:["Forlax®","Movicol®"], couleur:"#B45309", remarque:"Élément clé de la prévention des récidives, en réduisant les efforts de poussée à la défécation"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse systémique significative pour les traitements topiques locaux à action limitée",
    ],
    points_cles: [
      "Hémorroïdes = structures vasculaires physiologiques normales, la maladie correspond à leur dilatation/prolapsus symptomatique",
      "Tout saignement rectal chez un patient de plus de 50 ans doit être exploré, même en présence d'hémorroïdes connues",
      "Corticoïdes topiques anaux : durée limitée à respecter strictement (risque d'atrophie locale si usage prolongé)",
      "Lutte contre la constipation (laxatifs doux, hydratation, fibres) = élément clé de la prévention des récidives",
      "Veinotoniques : dose renforcée utile en phase de crise aiguë, puis dose d'entretien pour la prévention",
    ],
  },
  n3: {
    saviez_vous: "La classification de Goligher en 4 grades (selon le degré de prolapsus des hémorroïdes internes) guide directement le choix thérapeutique : grade I (pas de prolapsus visible) et II (prolapsus réductible spontanément) relèvent généralement du traitement médical, tandis que les grades III (prolapsus nécessitant une réduction manuelle) et IV (prolapsus permanent irréductible) orientent vers des traitements instrumentaux ou chirurgicaux.",
    physiopatho: "Mécanisme de la thrombose hémorroïdaire externe : contrairement aux hémorroïdes internes (au-dessus de la ligne pectinée, innervation végétative donc indolore même en cas de prolapsus), les hémorroïdes externes sont situées sous la ligne pectinée dans une zone richement innervée par des fibres sensitives somatiques → la formation d'un caillot sanguin (thrombose) dans cette localisation provoque une douleur intense et brutale, contrastant avec le caractère habituellement indolore du prolapsus hémorroïdaire interne pur — distinction anatomique essentielle expliquant pourquoi 'hémorroïdes' ne signifie pas systématiquement 'douleur' dans la pratique clinique.",
    pharmacocinetique: "Diosmine micronisée : la micronisation améliore significativement la biodisponibilité orale par rapport à la forme non micronisée, permettant une concentration tissulaire veineuse efficace plus rapidement atteinte — élément galénique important justifiant la préférence pour les formulations micronisées dans la pratique clinique actuelle, avec une meilleure réponse symptomatique observée.",
    cas_clinique: "Patiente 35 ans, grossesse à 32 semaines d'aménorrhée, thrombose hémorroïdaire externe très douloureuse depuis 48h, pas de saignement actif. Que proposez-vous ?\n\nRaisonnement : thrombose hémorroïdaire externe en fin de grossesse, situation fréquente liée à la compression mécanique utérine et aux modifications hormonales. Traitement local symptomatique (topique anesthésiant et anti-inflammatoire local de courte durée, compatible avec la grossesse), veinotoniques utilisables (diosmine généralement considérée comme sûre), mesures hygiéno-diététiques (lutte contre la constipation, bains de siège tièdes). Évolution généralement spontanément favorable en quelques jours à quelques semaines, exérèse chirurgicale du caillot rarement nécessaire sauf douleur très intense et persistante.",
    effets_secondaires: [
      {label:"Thrombose hémorroïdaire externe très algique : peut nécessiter une exérèse chirurgicale simple sous anesthésie locale si douleur intense persistante", niveau:"warning"},
      {label:"Hémorroïdes grade III-IV non traitées : retentissement majeur sur la qualité de vie, complications locales (incarcération, ulcération)", niveau:"warning"},
    ],
    classes: [
      {classe:"Diosmine micronisée — référence en formulation optimisée", dci:["Diosmine micronisée 500mg"], specialites:["Daflon® 500mg"], couleur:"#1B6B52", remarque:"Forme micronisée préférée pour une biodisponibilité optimale et une réponse symptomatique plus rapide"},
      {classe:"Sclérothérapie / Ligature élastique — hémorroïdes internes grade I-III réfractaires au traitement médical", dci:["Procédure instrumentale, non médicamenteuse"], specialites:["Réalisée en consultation de proctologie"], couleur:"#1E3A5F", remarque:"Alternative peu invasive à la chirurgie pour les grades intermédiaires ne répondant pas suffisamment au traitement médical seul"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse spécifique supplémentaire notable pour cette section",
    ],
    points_cles: [
      "Classification de Goligher (grades I à IV) : guide le choix entre traitement médical et options instrumentales/chirurgicales",
      "Hémorroïdes externes (sous la ligne pectinée) = douloureuses si thrombose, hémorroïdes internes pures = généralement indolores",
      "Diosmine micronisée : formulation à privilégier pour une biodisponibilité et une efficacité clinique optimales",
      "Grossesse : thrombose hémorroïdaire externe fréquente en fin de grossesse, évolution généralement spontanément favorable",
      "Ligature élastique et sclérothérapie : alternatives peu invasives pour les grades intermédiaires réfractaires au traitement médical",
    ],
  },
  n4: {
    saviez_vous: "Le pharmacien joue un rôle de premier filtre essentiel dans la maladie hémorroïdaire : devant toute demande de traitement pour des 'hémorroïdes' chez un patient n'ayant jamais consulté pour ce motif, ou en présence de tout signe atypique (rectorragie isolée sans douleur, modification récente du transit, amaigrissement), l'orientation vers une consultation médicale ou proctologique doit être systématique avant toute délivrance de traitement symptomatique seul.",
    physiopatho: "Diagnostics différentiels à ne pas méconnaître sous couvert d'hémorroïdes : fissure anale (douleur très intense à la défécation, souvent striée de sang rouge vif, mécanisme différent par déchirure de la muqueuse anale plutôt que congestion vasculaire), cancer anal ou rectal bas situé (à évoquer systématiquement chez le patient de plus de 50 ans avec symptômes récents ou modifiés), maladie inflammatoire chronique de l'intestin (Crohn périanal notamment, pouvant mimer ou s'associer à une pathologie hémorroïdaire) — la similitude des symptômes (douleur anale, saignement) justifie une vigilance diagnostique constante avant d'attribuer systématiquement ces symptômes aux hémorroïdes.",
    recommandations: "SNFCP (Société Nationale Française de Colo-Proctologie) — Maladie hémorroïdaire : traitement médical (veinotoniques, topiques, règles hygiéno-diététiques) en 1ère intention pour les grades I-II et les crises ponctuelles. Traitement instrumental (ligature élastique, sclérothérapie, photocoagulation) pour les grades II-III réfractaires au traitement médical. Chirurgie (hémorroïdectomie) réservée aux grades III-IV symptomatiques sévères ou en échec des traitements moins invasifs.",
    situations_complexes: "Hémorroïdes et anticoagulation : les patients sous anticoagulants ont un risque accru de saignement hémorroïdaire significatif, nécessitant parfois une prise en charge plus précoce et une vigilance accrue, sans pour autant justifier l'arrêt systématique de l'anticoagulation qui doit rester une décision multidisciplinaire pesant les risques respectifs.\n\nHémorroïdes et maladie inflammatoire chronique de l'intestin (MICI) : la prise en charge proctologique doit être coordonnée avec le gastro-entérologue référent, certains traitements topiques pouvant être moins bien tolérés ou nécessiter des précautions particulières en présence d'une atteinte périanale inflammatoire associée (notamment dans la maladie de Crohn).\n\nPost-partum : la maladie hémorroïdaire est très fréquente après l'accouchement (efforts expulsifs, compression pelvienne prolongée) — prise en charge symptomatique habituelle, évolution généralement favorable avec la régression des phénomènes de grossesse, allaitement à prendre en compte pour le choix des traitements topiques et systémiques.",
    effets_secondaires: [
      {label:"Confusion diagnostique hémorroïdes/cancer anal ou rectal : retard de prise en charge potentiellement grave si non vigilance", niveau:"danger"},
      {label:"Fissure anale prise à tort pour des hémorroïdes : traitement inadapté ne soulageant pas le patient", niveau:"warning"},
      {label:"Saignement hémorroïdaire significatif sous anticoagulant : anémie possible si saignements répétés et non surveillés", niveau:"warning"},
    ],
    classes: [
      {classe:"Hémorroïdectomie chirurgicale — grades III-IV sévères ou échec des traitements moins invasifs", dci:["Procédure chirurgicale selon technique choisie"], specialites:["Prise en charge en proctologie"], couleur:"#6B2D5E", remarque:"Réservée aux formes sévères et symptomatiques après échec des approches moins invasives, efficacité durable mais suites postopératoires parfois douloureuses"},
      {classe:"Photocoagulation infrarouge — alternative instrumentale aux grades I-II", dci:["Procédure instrumentale, non médicamenteuse"], specialites:["Réalisée en consultation de proctologie"], couleur:"#1E3A5F", remarque:"Technique peu invasive alternative à la ligature élastique pour certains grades précoces de la maladie hémorroïdaire"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse spécifique supplémentaire notable pour cette section",
    ],
    points_cles: [
      "Orientation systématique vers une consultation médicale devant tout signe atypique ou première demande de traitement sans antécédent connu",
      "Diagnostics différentiels essentiels à ne pas méconnaître : fissure anale, cancer anal/rectal, maladie de Crohn périanale",
      "Patients sous anticoagulants : vigilance accrue sur le risque hémorragique, sans arrêt systématique de l'anticoagulation",
      "Post-partum : maladie hémorroïdaire très fréquente, évolution généralement favorable, attention au choix des traitements si allaitement",
      "Rôle de premier filtre du pharmacien essentiel pour orienter les patients à risque avant toute délivrance de traitement symptomatique seul",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F29 — SYNDROME DE L'INTESTIN IRRITABLE (SII)
   ════════════════════════════════════════════════════════ */
FN['sii'] = {
  n2: {
    saviez_vous: "Le syndrome de l'intestin irritable touche environ 5-10 % de la population générale, avec une nette prédominance féminine, et représente l'un des motifs de consultation gastro-entérologique les plus fréquents — pourtant, c'est un diagnostic 'positif' basé sur des critères cliniques précis (critères de Rome IV), pas seulement un diagnostic d'exclusion porté faute d'avoir trouvé autre chose.",
    physiopatho: "Le SII résulte d'une interaction complexe entre plusieurs mécanismes : hypersensibilité viscérale (perception douloureuse exagérée de stimuli digestifs normaux, par sensibilisation des afférences sensitives viscérales), troubles de la motricité intestinale (accélération ou ralentissement du transit selon le sous-type, SII-diarrhée vs SII-constipation), dysbiose du microbiote intestinal (déséquilibre de la flore bactérienne colique, de plus en plus documenté), et axe intestin-cerveau perturbé (communication bidirectionnelle anormale entre système nerveux entérique et central, expliquant le lien fréquent avec l'anxiété et le stress, sans que le SII soit pour autant une simple manifestation psychosomatique).",
    mecanisme: "Antispasmodiques (phloroglucinol, mébévérine) : relâchent directement la musculature lisse intestinale par des mécanismes variés selon la molécule → réduction des spasmes douloureux caractéristiques du SII, traitement symptomatique de la composante douloureuse sans effet sur le transit lui-même.\n\nProbiotiques spécifiques : certaines souches (notamment certaines souches de Bifidobacterium et de Lactobacillus) ont démontré un bénéfice modeste mais significatif sur les symptômes globaux du SII dans des essais cliniques, probablement via une modulation du microbiote et de la perméabilité intestinale, bien que l'effet soit souche-spécifique et non généralisable à tous les probiotiques.",
    diagnostic: "Critères de Rome IV : douleur abdominale récurrente, au moins 1 jour par semaine en moyenne sur les 3 derniers mois, associée à au moins 2 des 3 critères suivants : en lien avec la défécation, associée à un changement de fréquence des selles, ou associée à un changement de consistance des selles. Sous-types selon la consistance prédominante des selles : SII-constipation, SII-diarrhée, SII-mixte. Signes d'alarme (amaigrissement, rectorragie, anémie, âge de début tardif) imposant des explorations complémentaires avant de retenir le diagnostic.",
    effets_secondaires: [
      {label:"Antispasmodiques : généralement bien tolérés, rares effets anticholinergiques selon la molécule", niveau:"info"},
      {label:"Retard diagnostique si signes d'alarme méconnus et attribués par excès au SII", niveau:"danger"},
      {label:"Anxiété et impact psychosocial du SII souvent sous-estimés dans la prise en charge globale", niveau:"warning"},
    ],
    classes: [
      {classe:"Antispasmodiques — traitement de la douleur abdominale", dci:["Phloroglucinol 80mg","Mébévérine 200mg"], specialites:["Spasfon®","Duspatalin®"], couleur:"#1B6B52", remarque:"À prendre au moment des douleurs ou en préventif avant les repas selon le profil du patient, bien tolérés généralement"},
      {classe:"Probiotiques spécifiques — bénéfice modeste sur les symptômes globaux", dci:["Souches spécifiques selon les études (Bifidobacterium infantis notamment)"], specialites:["Diverses spécialités selon souches"], couleur:"#1E3A5F", remarque:"Effet souche-spécifique, pas tous les probiotiques ne se valent pas pour cette indication, durée d'essai d'au moins 4 semaines recommandée"},
      {classe:"Régulateurs du transit selon le sous-type", dci:["Macrogol si SII-C","Lopéramide ponctuel si SII-D"], specialites:["Forlax®","Imodium®"], couleur:"#B45309", remarque:"Adapté au sous-type prédominant, à utiliser en fonction des symptômes prédominants du patient"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse systémique majeure pour les antispasmodiques d'action principalement locale",
    ],
    points_cles: [
      "SII : diagnostic positif basé sur des critères cliniques précis (Rome IV), pas uniquement un diagnostic d'exclusion",
      "Hypersensibilité viscérale, troubles de la motricité et dysbiose : trois mécanismes principaux interconnectés du SII",
      "Sous-typage selon la consistance des selles (constipation, diarrhée, mixte) guide le choix thérapeutique adapté",
      "Signes d'alarme (amaigrissement, rectorragie, anémie) : toujours à rechercher avant de retenir le diagnostic de SII",
      "Probiotiques : effet souche-spécifique démontré, pas un effet de classe généralisable à tous les produits",
    ],
  },
  n3: {
    saviez_vous: "Le régime pauvre en FODMAPs (oligosaccharides, disaccharides, monosaccharides et polyols fermentescibles) a démontré une efficacité significative sur les symptômes du SII dans plusieurs essais contrôlés, avec une amélioration chez 50-75% des patients qui le suivent rigoureusement — mais ce régime restrictif doit être mis en place avec l'accompagnement d'un diététicien spécialisé, en raison du risque de carences nutritionnelles s'il est poursuivi sans réintroduction progressive structurée.",
    physiopatho: "Mécanisme d'action du régime pauvre en FODMAPs : les FODMAPs sont des glucides à chaîne courte mal absorbés dans l'intestin grêle → ils arrivent intacts dans le côlon où ils sont rapidement fermentés par le microbiote → production de gaz (distension, ballonnements) et effet osmotique (attire l'eau dans la lumière intestinale, favorisant la diarrhée) → chez les patients SII présentant une hypersensibilité viscérale, cette distension et cette fermentation excessive génèrent une douleur disproportionnée par rapport à un sujet sans hypersensibilité, expliquant le bénéfice symptomatique de leur réduction alimentaire ciblée.",
    pharmacocinetique: "Lubiprostone et linaclotide (sécrétagogues intestinaux, SII-constipation) : action purement locale au niveau de la muqueuse intestinale (activation de canaux chlorure spécifiques), absorption systémique négligeable → profil de sécurité favorable avec peu d'effets systémiques, mécanisme entièrement distinct des laxatifs osmotiques classiques.\n\nÉluxadoline (SII-diarrhée, non disponible en France mais utilisé dans d'autres pays) : agoniste des récepteurs opioïdes µ et κ intestinaux + antagoniste des récepteurs δ → effet mixte ralentissant le transit tout en limitant le risque de constipation excessive, contrairement à un agoniste opioïde pur.",
    cas_clinique: "Patiente 32 ans, SII à prédominance diarrhéique depuis 3 ans, ballonnements importants après les repas, échec des antispasmodiques et d'un probiotique essayé 2 mois. Bilan de base déjà réalisé et normal (pas de maladie cœliaque, pas de MICI). Que proposez-vous ?\n\nRaisonnement : SII-diarrhée confirmé avec bilan organique déjà normal, échec des traitements symptomatiques de première ligne → orienter vers une diététicienne spécialisée pour la mise en place encadrée d'un régime pauvre en FODMAPs (phase d'exclusion stricte puis réintroduction progressive structurée pour identifier les aliments réellement responsables chez cette patiente). En parallèle, discuter d'un traitement médicamenteux ciblé sur la composante diarrhéique si le régime seul est insuffisant.",
    effets_secondaires: [
      {label:"Régime pauvre en FODMAPs prolongé sans réintroduction structurée : risque de carences nutritionnelles et d'appauvrissement du microbiote", niveau:"warning"},
      {label:"Éluxadoline (hors France) : pancréatite aiguë rapportée chez les patients sans vésicule biliaire — CI dans cette situation", niveau:"danger"},
    ],
    classes: [
      {classe:"Linaclotide — SII-constipation réfractaire", dci:["Linaclotide 290µg/j"], specialites:["Constella®"], couleur:"#1B6B52", remarque:"AMM SII-constipation, action locale sur la sécrétion intestinale, bénéfice également démontré sur la composante douloureuse"},
      {classe:"Rifaximine — SII-diarrhée avec suspicion de pullulation bactérienne", dci:["Rifaximine selon prescription spécialisée"], specialites:["Normix® (hors AMM officielle SII en France)"], couleur:"#6B2D5E", remarque:"Antibiotique non absorbé à action locale intestinale, utilisé hors AMM dans certaines formes de SII avec suspicion de SIBO (pullulation bactérienne du grêle)"},
    ],
    interactions: [
      "Linaclotide : pas d'interaction médicamenteuse significative connue (action purement locale)",
      "Rifaximine : peu d'interactions systémiques en raison de son absorption négligeable",
    ],
    points_cles: [
      "Régime pauvre en FODMAPs : efficacité démontrée mais nécessite un encadrement diététique structuré (exclusion puis réintroduction)",
      "FODMAPs : fermentation colique excessive génère gaz et effet osmotique, amplifiés par l'hypersensibilité viscérale du SII",
      "Linaclotide et lubiprostone : action locale spécifique sur la sécrétion intestinale, profil de sécurité favorable",
      "SIBO (pullulation bactérienne du grêle) : à évoquer dans certaines formes de SII-diarrhée réfractaires, traitement spécifique possible",
      "Toute approche diététique restrictive du SII doit être encadrée pour éviter les carences nutritionnelles à long terme",
    ],
  },
  n4: {
    saviez_vous: "L'axe intestin-cerveau bidirectionnel implique de façon croissante le microbiote intestinal comme acteur central, capable de produire des neurotransmetteurs (sérotonine notamment, dont 95% est produite au niveau intestinal) et de moduler l'inflammation systémique de bas grade — cette compréhension a ouvert la voie à des approches thérapeutiques psychologiques (hypnothérapie, thérapies cognitivo-comportementales) ayant démontré une efficacité comparable à certains traitements pharmacologiques dans le SII réfractaire.",
    physiopatho: "Inflammation de bas grade et SII post-infectieux : environ 10% des cas de SII surviennent après un épisode de gastro-entérite aiguë documentée (SII post-infectieux), suggérant qu'une inflammation intestinale initiale, même résolue cliniquement, peut laisser des séquelles fonctionnelles durables (modification de la perméabilité intestinale, persistance d'une inflammation de bas grade infraclinique, altération durable du microbiote) — ce sous-type illustre la possible composante organique sous-jacente du SII, nuançant la vision purement fonctionnelle et parfois injustement psychosomatique de cette pathologie.",
    recommandations: "SNFGE / HAS — SII : diagnostic positif sur les critères de Rome IV après élimination raisonnable des signes d'alarme. Mesures hygiéno-diététiques et antispasmodiques en 1ère intention. Régime pauvre en FODMAPs encadré, probiotiques spécifiques, ou traitements ciblés selon le sous-type (linaclotide, lubiprostone pour SII-C ; rifaximine, éluxadoline pour SII-D selon disponibilité) en 2e intention. Approches psychologiques (TCC, hypnothérapie digestive) à proposer notamment en cas de réfractarité ou de composante anxieuse marquée associée.",
    situations_complexes: "SII et maladie cœliaque : le chevauchement symptomatique peut être trompeur, la maladie cœliaque doit être systématiquement recherchée (sérologie anti-transglutaminase) devant un tableau évocateur de SII avant de retenir définitivement ce diagnostic, particulièrement en présence de SII-diarrhée.\n\nSII et MICI en rémission : certains patients avec maladie de Crohn ou rectocolite hémorragique en rémission endoscopique présentent des symptômes résiduels de type SII, complexifiant l'évaluation de l'activité réelle de la maladie inflammatoire sous-jacente et nécessitant une coordination étroite avec le gastro-entérologue référent.\n\nSII réfractaire sévère avec retentissement majeur sur la qualité de vie : prise en charge multidisciplinaire (gastro-entérologue, diététicien, psychologue/psychiatre) recommandée, les antidépresseurs à faible dose (tricycliques notamment) pouvant être utilisés pour leur effet sur la modulation de la douleur viscérale, indépendamment de toute indication pour une dépression associée.",
    effets_secondaires: [
      {label:"Confusion diagnostique SII / maladie cœliaque non recherchée : retard de prise en charge d'une pathologie organique traitable", niveau:"danger"},
      {label:"SII réfractaire sévère non pris en charge globalement : impact majeur et sous-estimé sur la qualité de vie", niveau:"warning"},
      {label:"Antidépresseurs tricycliques à faible dose pour la douleur viscérale : effets anticholinergiques à surveiller selon le terrain", niveau:"warning"},
    ],
    classes: [
      {classe:"Antidépresseurs tricycliques à faible dose — modulation de la douleur viscérale", dci:["Amitriptyline 10-25mg le soir"], specialites:["Laroxyl®"], couleur:"#B45309", remarque:"Utilisés pour leur effet modulateur sur la douleur viscérale, indépendamment d'une indication pour une dépression associée, dose nettement inférieure à celle utilisée en psychiatrie"},
      {classe:"Approches psychologiques structurées — hypnothérapie digestive, TCC", dci:["Prise en charge non médicamenteuse spécialisée"], specialites:["Programmes spécifiques selon disponibilité régionale"], couleur:"#1E3A5F", remarque:"Efficacité démontrée comparable à certains traitements pharmacologiques dans le SII réfractaire, intégrées dans une approche multidisciplinaire globale"},
    ],
    interactions: [
      "Amitriptyline faible dose + autres sérotoninergiques (tramadol, ISRS) : risque de syndrome sérotoninergique si association à surveiller",
      "Amitriptyline + anticholinergiques : addition des effets anticholinergiques, prudence notamment chez le sujet âgé",
    ],
    points_cles: [
      "SII post-infectieux : environ 10% des cas, illustre la possible composante organique sous-jacente du SII",
      "95% de la sérotonine corporelle est produite au niveau intestinal, soulignant le rôle central de l'axe intestin-cerveau",
      "Maladie cœliaque : à systématiquement éliminer devant un tableau évocateur de SII, particulièrement le sous-type diarrhéique",
      "Antidépresseurs tricycliques à faible dose : utilisés pour leur effet sur la douleur viscérale, pas uniquement comme antidépresseurs",
      "Approches psychologiques structurées (TCC, hypnothérapie) : efficacité démontrée, à intégrer dans une prise en charge multidisciplinaire",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F30 — LOMBALGIE
   ════════════════════════════════════════════════════════ */
FN['lombalgie'] = {
  n2: {
    saviez_vous: "Dans plus de 90% des cas, la lombalgie aiguë est dite 'commune' (non spécifique) : aucune cause précise et grave n'est identifiée, et surtout, l'imagerie systématique (radiographie, IRM) n'apporte aucun bénéfice et peut même être délétère en révélant des anomalies banales (discopathies, protrusions) présentes chez de nombreux sujets asymptomatiques, générant une anxiété et une focalisation inutiles sur la colonne vertébrale.",
    physiopatho: "La lombalgie commune résulte le plus souvent d'une sollicitation mécanique excessive ou inadaptée des structures vertébrales (disques, articulations postérieures, muscles et ligaments para-vertébraux) sans lésion structurelle grave identifiable → micro-traumatismes répétés, contractures musculaires réflexes, parfois associée à des facteurs posturaux, professionnels ou psychosociaux (stress, anxiété, insatisfaction professionnelle) qui jouent un rôle démontré dans la chronicisation, bien plus que la sévérité de l'atteinte structurelle initiale elle-même.",
    mecanisme: "Antalgiques (paracétamol, AINS) : traitement symptomatique de la douleur et de l'inflammation associée, à utiliser à dose efficace dès le début pour permettre le maintien d'une activité physique normale, élément clé du pronostic favorable.\n\nMyorelaxants (thiocolchicoside) : réduisent la contracture musculaire réflexe para-vertébrale souvent associée à la lombalgie aiguë, utilisation de courte durée (quelques jours) en raison du profil de tolérance et de l'absence de bénéfice démontré sur du long terme.\n\nMaintien de l'activité physique : contrairement à l'ancienne recommandation de repos strict au lit, le maintien d'une activité aussi normale que possible (adaptée à la douleur) est désormais reconnu comme accélérant la récupération et prévenant la chronicisation, changement de paradigme majeur dans la prise en charge.",
    diagnostic: "Diagnostic clinique dans l'immense majorité des cas, sans nécessité d'imagerie systématique pour une lombalgie commune typique. Recherche systématique des 'drapeaux rouges' (red flags) : traumatisme significatif, fièvre, amaigrissement inexpliqué, antécédent de cancer, déficit neurologique, âge < 20 ans ou > 50 ans avec lombalgie de novo, douleur non mécanique (nocturne, non calmée par le repos) — leur présence justifie une exploration complémentaire, leur absence rend l'imagerie inutile et potentiellement délétère.",
    effets_secondaires: [
      {label:"Thiocolchicoside : risque de troubles digestifs, et signal de génotoxicité ayant conduit à une réduction de la durée d'utilisation et de la posologie autorisée", niveau:"warning"},
      {label:"Repos strict au lit prolongé : retarde la récupération et favorise la chronicisation, contrairement à l'ancienne croyance", niveau:"warning"},
      {label:"Imagerie systématique inutile : peut générer une anxiété délétère par découverte d'anomalies banales sans lien causal", niveau:"warning"},
    ],
    classes: [
      {classe:"AINS — traitement de 1ère intention de la douleur lombaire aiguë", dci:["Ibuprofène 400mg × 3/j","Kétoprofène 100mg × 2/j"], specialites:["Nurofen®","Profénid®"], couleur:"#1B6B52", remarque:"Dose efficace dès le début pour permettre le maintien de l'activité physique, durée limitée à la phase aiguë"},
      {classe:"Myorelaxants — courte durée si contracture associée", dci:["Thiocolchicoside 4mg × 2/j, max 7 jours"], specialites:["Coltramyl®","Miorel®"], couleur:"#1E3A5F", remarque:"Durée et posologie réduites depuis la réévaluation de sécurité (signal de génotoxicité), à utiliser en association aux antalgiques si besoin"},
      {classe:"Paracétamol — alternative ou association", dci:["Paracétamol 1g × 3-4/j"], specialites:["Doliprane®"], couleur:"#B45309", remarque:"Alternative en cas de contre-indication aux AINS, efficacité modérée seule sur la lombalgie selon les données actuelles"},
    ],
    interactions: [
      "AINS + anticoagulants : ↑ risque hémorragique digestif — prudence et surveillance si association",
      "AINS + IEC/ARA2 + diurétiques : triple whammy rénal — vigilance particulière chez le sujet à risque",
    ],
    points_cles: [
      "Lombalgie commune (> 90% des cas) : pas d'imagerie systématique, diagnostic clinique suffisant",
      "Drapeaux rouges (red flags) : à rechercher systématiquement, leur absence rend l'exploration complémentaire inutile",
      "Maintien de l'activité physique adaptée : recommandation actuelle, contrairement à l'ancien repos strict au lit",
      "Thiocolchicoside : durée et posologie réduites depuis la réévaluation de sécurité par l'ANSM",
      "Facteurs psychosociaux : jouent un rôle démontré dans la chronicisation, au-delà de la seule sévérité structurelle",
    ],
  },
  n3: {
    saviez_vous: "Le concept de 'peur-évitement' (fear-avoidance) est aujourd'hui central dans la compréhension de la chronicisation de la lombalgie : la peur de bouger et d'aggraver la douleur conduit à un évitement progressif de l'activité physique, qui entraîne un déconditionnement musculaire, lequel favorise paradoxalement la persistance et l'aggravation de la douleur — créant un cercle vicieux que seule une approche active (kinésithérapie, reprise progressive de l'activité) peut rompre, contrairement à l'évitement protecteur intuitif mais délétère.",
    physiopatho: "Sensibilisation centrale dans la lombalgie chronique : au-delà de 12 semaines d'évolution, la douleur lombaire chronique implique de plus en plus une composante de sensibilisation centrale (modification de l'excitabilité des neurones de la corne dorsale, altération du contrôle inhibiteur descendant) qui rend la douleur partiellement ou totalement indépendante de la lésion structurelle initiale, expliquant pourquoi l'imagerie et les traitements ciblant exclusivement la structure vertébrale s'avèrent souvent insuffisants dans les formes chroniques, et justifiant une approche thérapeutique élargie incluant les dimensions cognitives et comportementales.",
    pharmacocinetique: "Duloxétine (lombalgie chronique, AMM douleurs musculo-squelettiques chroniques) : Tmax = 6h, métabolisme hépatique CYP1A2 et CYP2D6, T½ = 12h → modulation des voies descendantes inhibitrices de la douleur (action centrale sur la sérotonine et la noradrénaline), distincte des antalgiques périphériques classiques, intérêt particulier dans les formes chroniques avec composante de sensibilisation centrale.",
    cas_clinique: "Patient 45 ans, lombalgie évoluant depuis 4 mois, initialement déclenchée par un effort de soulèvement, sans drapeau rouge, ayant progressivement arrêté toute activité sportive et limité ses déplacements par crainte d'aggraver la douleur. Imagerie réalisée ailleurs montrant une discopathie L4-L5 modérée. Quelle est votre approche ?\n\nRaisonnement : lombalgie chronique (> 3 mois) avec comportement de peur-évitement manifeste, discopathie probablement incidentelle (très fréquente chez les sujets asymptomatiques du même âge) plutôt que cause directe expliquant l'intensité du tableau. Prise en charge : déconstruire les croyances erronées sur la gravité de l'imagerie, orientation vers kinésithérapie active (reconditionnement progressif, pas seulement passif), envisager une approche cognitivo-comportementale si le comportement d'évitement est très marqué, traitement médicamenteux en appoint (AINS ponctuels, discuter duloxétine si composante de sensibilisation centrale suspectée).",
    effets_secondaires: [
      {label:"Duloxétine : nausées, sécheresse buccale, plus rarement élévation tensionnelle — surveillance habituelle", niveau:"warning"},
      {label:"Peur-évitement non pris en charge : déconditionnement musculaire progressif et chronicisation de la douleur", niveau:"danger"},
      {label:"Sur-médicalisation par opioïdes forts dans la lombalgie chronique commune : bénéfice non démontré, risques importants", niveau:"danger"},
    ],
    classes: [
      {classe:"Duloxétine — lombalgie chronique avec composante centrale", dci:["Duloxétine 60mg/j"], specialites:["Cymbalta®"], couleur:"#1B6B52", remarque:"AMM douleurs musculo-squelettiques chroniques, action sur les voies descendantes inhibitrices, intérêt dans les formes avec sensibilisation centrale"},
      {classe:"Kinésithérapie active — pierre angulaire du traitement de la lombalgie chronique", dci:["Reconditionnement physique progressif, non médicamenteux"], specialites:["Prise en charge en kinésithérapie"], couleur:"#1E3A5F", remarque:"Approche active privilégiée sur l'approche passive seule (massages, électrothérapie), pour rompre le cercle de peur-évitement"},
    ],
    interactions: [
      "Duloxétine + tramadol ou autres sérotoninergiques : risque de syndrome sérotoninergique — association à éviter ou surveiller étroitement",
      "Duloxétine + AINS ou anticoagulants : ↑ risque hémorragique (effet sur l'agrégation plaquettaire) — prudence si association",
    ],
    points_cles: [
      "Peur-évitement : mécanisme central de la chronicisation, à identifier et déconstruire activement dans la prise en charge",
      "Discopathies à l'imagerie : très fréquentes chez les sujets asymptomatiques, souvent incidentelles plutôt que causales",
      "Sensibilisation centrale : explique l'insuffisance des traitements ciblant exclusivement la structure dans les formes chroniques",
      "Kinésithérapie active (reconditionnement) préférée à l'approche passive seule pour rompre le cercle vicieux du déconditionnement",
      "Opioïdes forts : pas de bénéfice démontré dans la lombalgie chronique commune, à éviter en l'absence d'indication spécifique",
    ],
  },
  n4: {
    saviez_vous: "Le syndrome de la queue de cheval, complication rare mais redoutable d'une hernie discale volumineuse comprimant les racines nerveuses sacrées, constitue une urgence chirurgicale absolue — les signes d'alarme (anesthésie en selle, troubles sphinctériens vésicaux ou anaux récents, déficit moteur bilatéral des membres inférieurs) doivent être systématiquement recherchés devant toute lombalgie, leur méconnaissance pouvant conduire à des séquelles neurologiques définitives et irréversibles si la décompression chirurgicale n'est pas réalisée en urgence.",
    physiopatho: "Lombalgie spécifique et causes à ne pas méconnaître : au-delà de la lombalgie commune, certaines causes spécifiques nécessitent une identification précoce — fracture vertébrale (notamment ostéoporotique chez le sujet âgé ou traumatique), infection (spondylodiscite, plus fréquente chez l'immunodéprimé ou le toxicomane IV), tumeur (primitive rachidienne ou métastatique, à évoquer devant une lombalgie de l'adulte de plus de 50 ans sans contexte traumatique avec amaigrissement associé), et bien sûr le syndrome de la queue de cheval sur hernie discale volumineuse — ces causes représentent une minorité des lombalgies mais leur identification précoce via les drapeaux rouges est cruciale pour le pronostic.",
    recommandations: "HAS 2019 (actualisée) — Lombalgie commune : pas d'imagerie systématique en l'absence de drapeau rouge. Maintien de l'activité physique adaptée recommandé en 1ère intention. Antalgiques de palier adapté à l'intensité de la douleur. Kinésithérapie active à privilégier sur les approches passives isolées. Approche biopsychosociale recommandée dès la phase subaiguë pour prévenir la chronicisation, intégrant les dimensions physiques, psychologiques et professionnelles.",
    situations_complexes: "Lombalgie chronique avec retentissement professionnel majeur : approche multidisciplinaire recommandée (médecin du travail, kinésithérapeute, parfois psychologue), restauration fonctionnelle au travail à privilégier sur l'arrêt de travail prolongé qui favorise paradoxalement la chronicisation et la désinsertion socio-professionnelle.\n\nLombalgie chez le sujet âgé : seuil de vigilance pour les drapeaux rouges abaissé (risque accru de fracture ostéoporotique, de tumeur), mais attention également au risque de sur-médicalisation et aux interactions médicamenteuses (AINS notamment, à utiliser avec prudence en raison du risque rénal et digestif accru à cet âge).\n\nLombo-sciatalgie (atteinte radiculaire associée) : à distinguer de la lombalgie pure, l'imagerie (IRM) devient pertinente si la douleur radiculaire est intense, persistante, ou associée à un déficit neurologique, en vue d'une éventuelle prise en charge spécifique (infiltration, chirurgie) si le traitement médical bien conduit est insuffisant.",
    effets_secondaires: [
      {label:"Syndrome de la queue de cheval méconnu : séquelles neurologiques définitives (incontinence, troubles sexuels, déficit moteur) si retard de prise en charge chirurgicale", niveau:"danger"},
      {label:"Spondylodiscite méconnue : évolution vers un abcès épidural ou une atteinte neurologique grave si retard diagnostique", niveau:"danger"},
      {label:"Fracture vertébrale ostéoporotique méconnue chez le sujet âgé : risque de déformation rachidienne et de complications respiratoires si multiples", niveau:"danger"},
    ],
    classes: [
      {classe:"Décompression chirurgicale en urgence — syndrome de la queue de cheval", dci:["Chirurgie de décompression en urgence absolue"], specialites:["Prise en charge neurochirurgicale d'urgence"], couleur:"#C0392B", remarque:"Urgence chirurgicale absolue, pronostic neurologique directement lié à la rapidité de la décompression"},
      {classe:"Infiltration épidurale de corticoïdes — lombo-sciatalgie réfractaire", dci:["Corticoïde injectable selon protocole spécialisé"], specialites:["Réalisée en milieu spécialisé (rhumatologie, radiologie interventionnelle)"], couleur:"#B45309", remarque:"Option pour les lombo-sciatalgies par hernie discale réfractaires au traitement médical bien conduit, avant d'envisager la chirurgie"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse spécifique supplémentaire notable pour cette section au-delà de celles déjà mentionnées",
    ],
    points_cles: [
      "Syndrome de la queue de cheval : urgence chirurgicale absolue, rechercher systématiquement anesthésie en selle et troubles sphinctériens récents",
      "Causes spécifiques de lombalgie (fracture, infection, tumeur) : minoritaires mais à ne pas méconnaître via les drapeaux rouges",
      "Approche biopsychosociale précoce : recommandée dès la phase subaiguë pour prévenir la chronicisation",
      "Restauration fonctionnelle au travail à privilégier sur l'arrêt prolongé, qui favorise la désinsertion socio-professionnelle",
      "Lombo-sciatalgie avec déficit neurologique ou douleur radiculaire intense persistante : justifie une imagerie et un avis spécialisé",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F31 — OSTÉOPOROSE
   ════════════════════════════════════════════════════════ */
FN['osteoporose'] = {
  n2: {
    saviez_vous: "L'ostéoporose est souvent appelée 'maladie silencieuse' car elle évolue sans symptôme jusqu'à la survenue d'une fracture, parfois pour des traumatismes minimes (chute de sa hauteur) — la première fracture ostéoporotique est elle-même un facteur de risque majeur de fracture ultérieure, justifiant une prise en charge thérapeutique systématique après une première fracture de fragilité, trop souvent négligée en pratique.",
    physiopatho: "L'os est un tissu vivant en perpétuel remodelage, résultant d'un équilibre entre résorption osseuse (ostéoclastes, cellules dégradant l'os ancien) et formation osseuse (ostéoblastes, cellules formant l'os nouveau) → l'ostéoporose résulte d'un déséquilibre en faveur de la résorption, notamment lié à la carence en estrogènes après la ménopause (les estrogènes ayant un rôle protecteur freinant l'activité des ostéoclastes) → diminution progressive de la densité minérale osseuse et altération de la microarchitecture osseuse → fragilité osseuse accrue et risque de fracture pour des traumatismes de faible énergie.",
    mecanisme: "Bisphosphonates (alendronate, risédronate) : se fixent sur l'hydroxyapatite osseuse au niveau des sites de résorption active → internalisés par les ostéoclastes lors de la résorption → inhibition de la farnésyl pyrophosphate synthase (voie du mévalonate) → perturbation du cytosquelette de l'ostéoclaste → apoptose → diminution de la résorption osseuse, permettant un regain progressif de densité minérale osseuse.\n\nDénosumab : anticorps monoclonal anti-RANKL → bloque la liaison de RANKL à son récepteur RANK à la surface des précurseurs ostéoclastiques → inhibition de la différenciation et de l'activation des ostéoclastes → puissante diminution de la résorption osseuse, mécanisme distinct des bisphosphonates (pas de fixation osseuse directe).\n\nCalcium et vitamine D : apport nécessaire en complément de tout traitement spécifique de l'ostéoporose, la vitamine D favorisant l'absorption intestinale du calcium et participant à la minéralisation osseuse adéquate.",
    diagnostic: "Ostéodensitométrie (DXA) : examen de référence mesurant la densité minérale osseuse, exprimée en T-score (comparaison à une population jeune de référence) — ostéoporose si T-score ≤ -2,5 DS, ostéopénie si T-score entre -1 et -2,5 DS. Score FRAX : outil complémentaire intégrant les facteurs de risque cliniques pour estimer le risque de fracture à 10 ans, aidant à la décision thérapeutique notamment dans les zones grises (ostéopénie avec facteurs de risque associés).",
    effets_secondaires: [
      {label:"Bisphosphonates oraux : œsophagite si mauvaise prise (à jeun, position assise/debout, grand verre d'eau) — règles de prise strictes", niveau:"warning"},
      {label:"Ostéonécrose de la mâchoire (bisphosphonates, dénosumab) : rare mais grave, facteurs de risque dentaires à éliminer avant traitement", niveau:"danger"},
      {label:"Fracture fémorale atypique (bisphosphonates au long cours) : rare, justifie une réévaluation périodique du traitement", niveau:"warning"},
      {label:"Hypocalcémie (dénosumab, notamment si insuffisance rénale ou carence vitaminique D non corrigée) — supplémentation préalable indispensable", niveau:"danger"},
    ],
    classes: [
      {classe:"Bisphosphonates oraux — traitement de référence", dci:["Alendronate 70mg/sem","Risédronate 35mg/sem"], specialites:["Fosamax®","Actonel®"], couleur:"#1B6B52", remarque:"Règles de prise strictes (à jeun, grand verre d'eau, rester debout/assis 30 min) indispensables pour la tolérance et l'efficacité"},
      {classe:"Dénosumab — alternative injectable", dci:["Dénosumab 60mg SC/6 mois"], specialites:["Prolia®"], couleur:"#1E3A5F", remarque:"Injection semestrielle, bonne observance facilitée, mais effet rebond marqué à l'arrêt nécessitant un relais thérapeutique impératif"},
      {classe:"Calcium + Vitamine D — complément systématique", dci:["Calcium 500-1000mg + Vitamine D3 800-1000 UI/j"], specialites:["Calcidose Vitamine D3®","Cacit Vitamine D3®"], couleur:"#B45309", remarque:"Apport complémentaire systématique en association à tout traitement spécifique de l'ostéoporose"},
    ],
    interactions: [
      "Bisphosphonates oraux + calcium, fer, antiacides : chélation → ↓ absorption majeure — espacer impérativement de plusieurs heures",
      "Dénosumab + corticothérapie au long cours : effet cumulé sur le métabolisme osseux à prendre en compte dans l'évaluation globale",
    ],
    points_cles: [
      "Ostéoporose : maladie silencieuse jusqu'à la fracture, première fracture de fragilité = facteur de risque majeur de récidive",
      "T-score ≤ -2,5 DS à la DXA = critère diagnostique de l'ostéoporose densitométrique",
      "Règles de prise des bisphosphonates oraux : à jeun strict, grand verre d'eau, position verticale 30 minutes — essentielles pour la tolérance",
      "Dénosumab : effet rebond marqué à l'arrêt, relais thérapeutique impératif pour éviter une perte osseuse rapide compensatoire",
      "Calcium/Vitamine D : complément systématique, mais espacement nécessaire avec la prise des bisphosphonates oraux",
    ],
  },
  n3: {
    saviez_vous: "Le tériparatide, hormone parathyroïdienne recombinante, est le seul traitement anabolique osseux disponible en France stimulant directement la formation osseuse plutôt que de seulement freiner la résorption — paradoxalement, c'est la même hormone dont l'excès chronique (hyperparathyroïdie) cause une déperdition osseuse, illustrant l'importance du mode d'administration (intermittent versus continu) dans la détermination de l'effet osseux final.",
    physiopatho: "Effet paradoxal de la PTH selon le mode d'exposition : une exposition continue et élevée à la parathormone (PTH), comme dans l'hyperparathyroïdie chronique, favorise la résorption osseuse nette (effet catabolique dominant). En revanche, une administration intermittente et pulsatile (une injection quotidienne de tériparatide) favorise paradoxalement la formation osseuse nette (effet anabolique dominant), car elle stimule préférentiellement l'activité des ostéoblastes par rapport aux ostéoclastes dans ce mode d'exposition spécifique — découverte physiologique ayant directement permis le développement de ce traitement anabolique osseux.",
    pharmacocinetique: "Tériparatide : injection SC quotidienne, Tmax = 30 minutes, T½ = 1h (très courte, expliquant l'effet anabolique pulsatile recherché plutôt qu'une exposition continue), durée de traitement maximale de 24 mois (cumul à vie limité par les données de sécurité disponibles), nécessitant un relais par un traitement anti-résorptif (bisphosphonate ou dénosumab) à l'arrêt pour consolider le gain de densité osseuse obtenu.",
    cas_clinique: "Patiente 72 ans, ostéoporose sévère avec 2 fractures vertébrales par fragilité récentes, T-score lombaire = -3,2 DS, sous calcium-vitamine D seul jusqu'alors. Quel traitement de fond proposer ?\n\nRaisonnement : ostéoporose sévère avec fractures vertébrales multiples récentes (très haut risque de fracture, notion de 'cascade fracturaire') → indication à un traitement anabolique osseux en 1ère intention plutôt qu'un simple anti-résorptif, le tériparatide étant supérieur aux bisphosphonates pour la prévention de nouvelles fractures dans ce contexte de risque très élevé. Traitement pour une durée maximale de 24 mois, puis relais impératif par un bisphosphonate ou un dénosumab pour consolider le gain osseux obtenu et éviter sa perte rapide à l'arrêt du tériparatide seul.",
    effets_secondaires: [
      {label:"Tériparatide : hypercalcémie transitoire possible, nausées, vertiges en début de traitement", niveau:"warning"},
      {label:"Arrêt du tériparatide sans relais anti-résorptif : perte rapide du gain de densité osseuse obtenu", niveau:"danger"},
      {label:"Romosozumab : signal de sécurité cardiovasculaire (événements ischémiques) ayant conduit à des restrictions d'usage chez les patients à haut risque CV", niveau:"danger"},
    ],
    classes: [
      {classe:"Tériparatide — traitement anabolique de référence", dci:["Tériparatide 20µg/j SC"], specialites:["Forsteo®"], couleur:"#991B1B", remarque:"Réservé à l'ostéoporose sévère avec fractures multiples, durée maximale 24 mois, relais anti-résorptif impératif à l'arrêt"},
      {classe:"Romosozumab — alternative anabolique récente", dci:["Romosozumab 210mg SC/mois × 12 mois"], specialites:["Evenity®"], couleur:"#B45309", remarque:"Mécanisme double (stimule la formation ET freine la résorption), mais restrictions d'usage liées au signal cardiovasculaire identifié"},
    ],
    interactions: [
      "Tériparatide + autres traitements modifiant le métabolisme calcique : surveillance de la calcémie recommandée en début de traitement",
      "Romosozumab : CI formelle en cas d'antécédent récent d'infarctus du myocarde ou d'AVC en raison du signal de sécurité",
    ],
    points_cles: [
      "Tériparatide : effet anabolique paradoxal lié au mode d'administration pulsatile, contrairement à l'effet catabolique de l'exposition continue à la PTH",
      "Cascade fracturaire : une fracture vertébrale augmente significativement le risque de fractures vertébrales ultérieures",
      "Tériparatide : durée maximale de 24 mois, relais anti-résorptif impératif à l'arrêt pour consolider le bénéfice",
      "Romosozumab : double mécanisme d'action mais restrictions liées à un signal de sécurité cardiovasculaire à respecter strictement",
      "Ostéoporose sévère avec fractures multiples récentes : indication privilégiée à un traitement anabolique plutôt qu'un anti-résorptif seul en 1ère intention",
    ],
  },
  n4: {
    saviez_vous: "Les fractures vertébrales ostéoporotiques sont largement sous-diagnostiquées car souvent asymptomatiques ou attribuées à tort à des 'douleurs de dos banales' — seules environ un tiers des fractures vertébrales radiologiquement identifiables sont cliniquement reconnues au moment où elles surviennent, un repérage radiologique systématique (vertebral fracture assessment) chez les patients à risque permettrait d'identifier précocement ces patients à très haut risque de fracture ultérieure et de les traiter avant la survenue d'une fracture plus grave (notamment fracture de hanche).",
    physiopatho: "Ostéoporose secondaire : au-delà de l'ostéoporose post-ménopausique 'primitive', de nombreuses causes secondaires doivent être systématiquement recherchées devant une ostéoporose, particulièrement chez l'homme ou la femme jeune — corticothérapie au long cours (cause iatrogène la plus fréquente, effet délétère direct sur les ostéoblastes et indirect par hypogonadisme induit), hyperthyroïdie, hyperparathyroïdie, hypogonadisme, malabsorption digestive (maladie cœliaque notamment), myélome multiple (à toujours évoquer devant une ostéoporose sévère et inexpliquée chez le sujet âgé) — leur identification permet un traitement étiologique complémentaire au traitement spécifique de l'ostéoporose.",
    recommandations: "GRIO (Groupe de Recherche et d'Information sur les Ostéoporoses) / HAS — Ostéoporose : traitement systématique recommandé après une première fracture de fragilité, quel que soit le T-score à la DXA (le contexte fracturaire suffisant à justifier le traitement). Bisphosphonates ou dénosumab en 1ère intention pour l'ostéoporose post-ménopausique commune. Tériparatide privilégié en 1ère intention si fractures vertébrales multiples ou ostéoporose particulièrement sévère. Réévaluation périodique de la nécessité de poursuivre le traitement, notamment pour les bisphosphonates (concept de 'pause thérapeutique' après plusieurs années selon le profil de risque).",
    situations_complexes: "Corticothérapie au long cours : ostéoporose cortico-induite à prévenir activement dès l'instauration d'une corticothérapie prévue pour plus de 3 mois à dose significative, supplémentation calcium-vitamine D systématique et discussion précoce d'un traitement spécifique de l'ostéoporose selon le niveau de risque évalué, sans attendre la survenue d'une fracture.\n\nHomme et ostéoporose : longtemps sous-diagnostiquée et sous-traitée car perçue comme une 'maladie de femme', l'ostéoporose masculine justifie pourtant la même rigueur diagnostique et thérapeutique, avec une recherche systématique de causes secondaires (hypogonadisme notamment) plus fréquente que chez la femme.\n\nOstéoporose et insuffisance rénale chronique sévère : les bisphosphonates sont contre-indiqués en deçà d'un certain seuil de fonction rénale, le dénosumab pouvant être utilisé avec une vigilance renforcée sur le risque d'hypocalcémie sévère dans ce contexte particulier.",
    effets_secondaires: [
      {label:"Fracture vertébrale méconnue et non traitée : risque majeur de fracture ultérieure, notamment de hanche, beaucoup plus grave en termes de morbi-mortalité", niveau:"danger"},
      {label:"Ostéoporose secondaire non recherchée (myélome notamment) : retard diagnostique d'une pathologie grave sous-jacente", niveau:"danger"},
      {label:"Dénosumab + insuffisance rénale sévère : risque accru d'hypocalcémie sévère, surveillance biologique renforcée nécessaire", niveau:"danger"},
    ],
    classes: [
      {classe:"Bisphosphonates injectables — alternative si intolérance orale", dci:["Acide zolédronique 5mg IV/an"], specialites:["Aclasta®"], couleur:"#1B6B52", remarque:"Administration annuelle, évite les contraintes de prise orale et le risque d'œsophagite, syndrome pseudo-grippal possible après la 1ère perfusion"},
      {classe:"Raloxifène — alternative chez la femme avec contre-indication aux bisphosphonates", dci:["Raloxifène 60mg/j"], specialites:["Optruma®","Evista®"], couleur:"#6B2D5E", remarque:"Modulateur sélectif des récepteurs aux estrogènes (SERM), effet osseux protecteur avec profil de sécurité mammaire favorable, mais risque thromboembolique veineux à prendre en compte"},
    ],
    interactions: [
      "Acide zolédronique IV + insuffisance rénale : CI si clairance très altérée, ajustement de dose selon la fonction rénale",
      "Raloxifène + anticoagulants oraux : interaction à surveiller en raison du risque thromboembolique propre au raloxifène lui-même",
    ],
    points_cles: [
      "Repérage radiologique systématique des fractures vertébrales : outil sous-utilisé pour identifier les patients à très haut risque",
      "Traitement systématique recommandé après une 1ère fracture de fragilité, indépendamment du résultat de la DXA",
      "Ostéoporose secondaire : à rechercher systématiquement, particulièrement chez l'homme ou en cas de présentation atypique/sévère",
      "Corticothérapie au long cours : prévention de l'ostéoporose cortico-induite à anticiper dès l'instauration du traitement",
      "Ostéoporose masculine : sous-diagnostiquée, justifie la même rigueur diagnostique avec recherche accrue de causes secondaires",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F32 — DÉPRESSION
   ════════════════════════════════════════════════════════ */
FN['depression'] = {
  n2: {
    saviez_vous: "Le délai d'action des antidépresseurs (2 à 4 semaines avant un effet clinique significatif) est l'une des principales causes d'arrêt prématuré du traitement — de nombreux patients arrêtent avant ce délai en pensant que le médicament 'ne marche pas', alors qu'il faut parfois attendre 6 à 8 semaines pour juger pleinement de l'efficacité d'une molécule à dose adaptée avant d'envisager un changement.",
    physiopatho: "L'hypothèse monoaminergique classique de la dépression postule un déficit fonctionnel en sérotonine, noradrénaline et/ou dopamine au niveau synaptique → mais cette théorie simple ne suffit pas à expliquer le délai d'action des traitements ni leur efficacité partielle : des modèles plus récents intègrent la neuroplasticité (la dépression s'accompagnerait d'une réduction du facteur neurotrophique BDNF et d'une atrophie de certaines structures comme l'hippocampe, partiellement réversible sous traitement efficace), l'inflammation de bas grade, et la dysrégulation de l'axe hypothalamo-hypophyso-surrénalien (hypercortisolisme chronique délétère pour les neurones).",
    mecanisme: "ISRS (Inhibiteurs Sélectifs de la Recapture de la Sérotonine — sertraline, escitalopram, paroxétine) : bloquent le transporteur de la sérotonine (SERT) au niveau présynaptique → ↑ concentration de sérotonine dans la fente synaptique → à long terme, adaptations réceptorielles (désensibilisation des récepteurs 5-HT1A auto-inhibiteurs présynaptiques) expliquant le délai d'action clinique malgré un effet pharmacologique immédiat sur la recapture.\n\nIRSNa (Inhibiteurs de la Recapture de la Sérotonine et de la Noradrénaline — venlafaxine, duloxétine) : double mécanisme, bloquent à la fois SERT et le transporteur de la noradrénaline (NET) → profil d'action plus large, parfois utile en cas de composante douloureuse associée ou de réponse insuffisante aux ISRS seuls.",
    diagnostic: "Critères du DSM-5 : au moins 5 symptômes parmi (humeur dépressive, perte d'intérêt/plaisir, modification du poids/appétit, troubles du sommeil, agitation ou ralentissement psychomoteur, fatigue, sentiment de dévalorisation/culpabilité, troubles de la concentration, idées de mort/suicidaires), présents presque tous les jours pendant au moins 2 semaines, avec retentissement fonctionnel significatif. Échelles d'évaluation (PHQ-9, échelle de Hamilton) utiles pour quantifier la sévérité et suivre l'évolution sous traitement.",
    effets_secondaires: [
      {label:"Risque suicidaire en début de traitement antidépresseur, particulièrement chez l'adolescent et le jeune adulte — surveillance rapprochée indispensable", niveau:"danger"},
      {label:"Syndrome sérotoninergique (association de sérotoninergiques) : agitation, hyperthermie, myoclonies — urgence si sévère", niveau:"danger"},
      {label:"Troubles digestifs, nausées (ISRS) en début de traitement, généralement transitoires", niveau:"info"},
      {label:"Dysfonction sexuelle (ISRS) : effet indésirable fréquent et souvent sous-rapporté spontanément par les patients", niveau:"warning"},
    ],
    classes: [
      {classe:"ISRS — 1ère intention, meilleur rapport efficacité/tolérance", dci:["Sertraline 50-200mg/j","Escitalopram 10-20mg/j"], specialites:["Zoloft®","Seroplex®"], couleur:"#1B6B52", remarque:"Délai d'action 2-4 semaines, ne jamais arrêter brutalement avant ce délai sans avoir évalué à dose adaptée"},
      {classe:"IRSNa — alternative ou 2e ligne", dci:["Venlafaxine 75-225mg/j","Duloxétine 60mg/j"], specialites:["Effexor®","Cymbalta®"], couleur:"#1E3A5F", remarque:"Profil d'action plus large, surveillance tensionnelle recommandée pour la venlafaxine à dose élevée"},
      {classe:"Antidépresseurs sédatifs — composante anxieuse ou insomnie associée", dci:["Mirtazapine 15-30mg le soir"], specialites:["Norset®"], couleur:"#B45309", remarque:"Effet sédatif utile si insomnie associée, prise de poids possible à surveiller"},
    ],
    interactions: [
      "ISRS/IRSNa + triptans : risque de syndrome sérotoninergique — prudence et information du patient sur les signes d'alerte",
      "ISRS + AINS ou anticoagulants : ↑ risque hémorragique digestif (effet sur l'agrégation plaquettaire) — vigilance si association",
      "IMAO + tout autre sérotoninergique : CI absolue formelle — délai de sevrage strict nécessaire avant tout switch",
    ],
    points_cles: [
      "Délai d'action de 2-4 semaines à expliquer systématiquement au patient pour prévenir un arrêt prématuré injustifié",
      "Risque suicidaire en début de traitement : surveillance rapprochée indispensable, particulièrement chez les sujets jeunes",
      "ISRS = 1ère intention pour le meilleur rapport efficacité/tolérance dans la majorité des cas de dépression",
      "Jamais d'arrêt brutal d'un antidépresseur : syndrome de sevrage possible, décroissance progressive toujours recommandée",
      "Dysfonction sexuelle sous ISRS : effet fréquent mais sous-rapporté, à explorer activement avec le patient",
    ],
  },
  n3: {
    saviez_vous: "La kétamine (en formulation eskétamine intranasale, Spravato®) représente une avancée majeure pour la dépression résistante : contrairement aux antidépresseurs classiques agissant sur les monoamines avec un délai de plusieurs semaines, son action sur les récepteurs NMDA glutamatergiques produit un effet antidépresseur rapide, parfois en quelques heures, avec un mécanisme entièrement distinct ouvrant une nouvelle voie thérapeutique pour les patients réfractaires aux traitements conventionnels.",
    physiopatho: "Dépression résistante et mécanismes glutamatergiques : environ 30% des patients dépressifs ne répondent pas de façon satisfaisante à au moins 2 antidépresseurs successifs bien conduits (dépression résistante) — les recherches récentes ont mis en évidence le rôle du système glutamatergique, notamment des récepteurs NMDA, dans la plasticité synaptique rapide sous-jacente à l'effet antidépresseur de la kétamine, ouvrant des perspectives thérapeutiques distinctes de l'hypothèse monoaminergique classique qui ne suffit pas à expliquer cette résistance ni cette nouvelle voie d'action.",
    pharmacocinetique: "Venlafaxine : prodrogue partiellement métabolisée par le CYP2D6 en O-desméthylvenlafaxine (métabolite actif contribuant significativement à l'effet pharmacologique global) → polymorphisme génétique du CYP2D6 influençant la proportion molécule mère/métabolite actif selon les individus. Effet dose-dépendant sur le profil pharmacologique : à faible dose, action principalement sérotoninergique ; à dose plus élevée (> 150mg/j), action noradrénergique significative s'ajoutant, justifiant la nécessité de titrer progressivement vers les doses efficaces.",
    cas_clinique: "Patiente 38 ans, épisode dépressif majeur sévère, échec de sertraline 200mg pendant 8 semaines puis de venlafaxine 225mg pendant 6 semaines, les deux à dose maximale bien tolérée et bien observées. Quelle est votre démarche ?\n\nRaisonnement : dépression résistante confirmée (échec de 2 antidépresseurs de classes différentes à dose adéquate et durée suffisante) → réévaluation diagnostique nécessaire (éliminer un trouble bipolaire méconnu, une comorbidité non traitée), discussion d'une stratégie de potentialisation (ajout d'un antipsychotique atypique à faible dose, ou de lithium) ou de switch vers une autre classe (antidépresseur tricyclique, IMAO selon le contexte), orientation vers un psychiatre spécialisé pour discuter d'options plus spécifiques (eskétamine intranasale, électroconvulsivothérapie selon la sévérité et les contre-indications).",
    effets_secondaires: [
      {label:"Eskétamine : dissociation, sédation transitoire — administration en milieu surveillé obligatoire avec surveillance post-dose", niveau:"warning"},
      {label:"Antipsychotiques atypiques en potentialisation : effets métaboliques (prise de poids, dyslipidémie) à surveiller au long cours", niveau:"warning"},
      {label:"Dépression résistante méconnue comme telle : persistance inutile sur une stratégie inefficace, retard à une prise en charge adaptée", niveau:"warning"},
    ],
    classes: [
      {classe:"Eskétamine intranasale — dépression résistante", dci:["Eskétamine 56-84mg intranasal, 2×/sem en milieu surveillé"], specialites:["Spravato®"], couleur:"#991B1B", remarque:"Réservée à la dépression résistante après échec de 2 antidépresseurs, administration en milieu médical avec surveillance post-dose obligatoire"},
      {classe:"Potentialisation par antipsychotique atypique à faible dose", dci:["Aripiprazole 2-5mg/j en add-on"], specialites:["Abilify®"], couleur:"#6B2D5E", remarque:"Stratégie de potentialisation reconnue en cas de réponse partielle à l'antidépresseur seul, dose nettement inférieure à celle utilisée en psychose"},
      {classe:"Antidépresseurs tricycliques — alternative en dépression résistante", dci:["Clomipramine 75-150mg/j"], specialites:["Anafranil®"], couleur:"#B45309", remarque:"Efficacité parfois supérieure dans les formes résistantes mais profil de tolérance moins favorable (anticholinergique, cardiovasculaire)"},
    ],
    interactions: [
      "Eskétamine + autres dépresseurs du SNC : potentialisation de la sédation, surveillance renforcée nécessaire en milieu adapté",
      "Antidépresseurs tricycliques + autres sérotoninergiques : risque de syndrome sérotoninergique, association à surveiller étroitement",
    ],
    points_cles: [
      "Dépression résistante : environ 30% des patients, après échec de 2 antidépresseurs de classes différentes à dose et durée adéquates",
      "Eskétamine : mécanisme glutamatergique distinct, effet antidépresseur rapide, réservée à un usage en milieu surveillé",
      "Toute dépression résistante doit faire reconsidérer le diagnostic initial (trouble bipolaire méconnu notamment)",
      "Stratégies de potentialisation (antipsychotique faible dose, lithium) : options reconnues avant de changer complètement de molécule",
      "Polymorphisme CYP2D6 : influence le métabolisme de plusieurs antidépresseurs, source de variabilité de réponse interindividuelle",
    ],
  },
  n4: {
    saviez_vous: "L'électroconvulsivothérapie (ECT), souvent perçue négativement par méconnaissance ou stigmatisation, reste le traitement le plus efficace de la dépression sévère, notamment avec caractéristiques mélancoliques ou psychotiques, ou en situation d'urgence vitale (risque suicidaire majeur, refus alimentaire mettant en jeu le pronostic vital) — réalisée sous anesthésie générale courte avec une sécurité bien établie, elle reste sous-utilisée en pratique en raison de représentations négatives largement dépassées par les données actuelles.",
    physiopatho: "Neuroplasticité et dépression : au-delà des mécanismes monoaminergiques et glutamatergiques, la dépression chronique non traitée s'accompagne de modifications structurelles cérébrales documentées en imagerie (réduction du volume hippocampique, altérations de la connectivité préfronto-limbique) — ces modifications seraient partiellement réversibles sous traitement efficace et précoce, mais pourraient devenir plus difficilement réversibles en cas d'évolution chronique non traitée, argument supplémentaire en faveur d'une prise en charge rapide et adaptée dès le diagnostic posé plutôt qu'un attentisme prolongé.",
    recommandations: "HAS / Fédération Française de Psychiatrie — Dépression : antidépresseur de 1ère intention (ISRS généralement) associé à une psychothérapie selon la sévérité et la préférence du patient pour les formes légères à modérées. Réévaluation à 4-6 semaines à dose adéquate avant de conclure à un échec. Switch ou potentialisation en cas d'échec d'un 1er antidépresseur bien conduit. Orientation spécialisée et discussion d'options comme l'eskétamine ou l'ECT en cas de résistance ou de sévérité/urgence particulière.",
    situations_complexes: "Dépression du post-partum : à distinguer du 'baby blues' bénin et transitoire des premiers jours, nécessite une prise en charge spécifique et rapide en raison de l'impact potentiel sur le lien mère-enfant, certains antidépresseurs (sertraline notamment) considérés comme ayant un profil de sécurité plus favorable pendant l'allaitement.\n\nDépression et trouble bipolaire méconnu : tout épisode dépressif doit faire rechercher activement des antécédents d'épisodes hypomaniaques ou maniaques (souvent non spontanément rapportés par le patient car vécus positivement) avant l'instauration d'un antidépresseur, le risque de virage maniaque ou hypomaniaque sous antidépresseur seul étant significatif chez un patient bipolaire non identifié comme tel.\n\nDépression chez le sujet âgé : présentation parfois atypique (plaintes somatiques au premier plan, troubles cognitifs pouvant mimer ou s'associer à un début de démence — 'pseudo-démence dépressive'), prudence accrue sur les interactions médicamenteuses et la tolérance (hyponatrémie sous ISRS notamment, plus fréquente à cet âge).",
    effets_secondaires: [
      {label:"Virage maniaque sous antidépresseur chez un patient bipolaire non identifié : aggravation du pronostic à long terme si méconnu", niveau:"danger"},
      {label:"Hyponatrémie sous ISRS chez le sujet âgé : confusion, chutes — surveillance biologique recommandée en début de traitement à cet âge", niveau:"danger"},
      {label:"Dépression sévère avec risque suicidaire non traitée en urgence : pronostic vital engagé, nécessite une prise en charge immédiate", niveau:"danger"},
    ],
    classes: [
      {classe:"Électroconvulsivothérapie — dépression sévère, mélancolique, ou urgence vitale", dci:["ECT sous anesthésie générale courte, plusieurs séances selon protocole"], specialites:["Prise en charge hospitalière psychiatrique spécialisée"], couleur:"#C0392B", remarque:"Traitement le plus efficace de la dépression sévère, sécurité bien établie, réservé aux situations spécifiques selon avis psychiatrique spécialisé"},
      {classe:"Sertraline — antidépresseur de référence en post-partum/allaitement", dci:["Sertraline 50-150mg/j"], specialites:["Zoloft®"], couleur:"#1B6B52", remarque:"Profil de sécurité considéré comme plus favorable pendant l'allaitement parmi les ISRS, à privilégier dans ce contexte spécifique"},
    ],
    interactions: [
      "ECT + traitements concomitants : évaluation anesthésique préalable systématique, certains traitements (notamment certains psychotropes) nécessitant des ajustements péri-procéduraux",
      "ISRS + sujet âgé : surveillance accrue de la natrémie en début de traitement, risque d'hyponatrémie plus fréquent à cet âge",
    ],
    points_cles: [
      "ECT : traitement le plus efficace de la dépression sévère, sous-utilisé par méconnaissance malgré une sécurité bien établie",
      "Tout épisode dépressif doit faire rechercher activement des antécédents d'hypomanie/manie avant l'introduction d'un antidépresseur",
      "Dépression du post-partum : à distinguer du baby blues bénin, prise en charge spécifique rapide nécessaire",
      "Sujet âgé : présentation parfois atypique, vigilance sur l'hyponatrémie sous ISRS et les interactions médicamenteuses",
      "Neuroplasticité : argument en faveur d'une prise en charge rapide et adaptée dès le diagnostic, plutôt qu'un attentisme prolongé",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F33 — ANXIÉTÉ (TROUBLE ANXIEUX GÉNÉRALISÉ)
   ════════════════════════════════════════════════════════ */
FN['anxiete'] = {
  n2: {
    saviez_vous: "Les benzodiazépines, bien qu'efficaces rapidement sur les symptômes anxieux aigus, ne sont recommandées qu'en traitement court (quelques semaines maximum) dans le trouble anxieux généralisé — les antidépresseurs (ISRS/IRSNa), bien que d'action plus lente, sont le traitement de fond de référence car ils n'exposent pas au risque de dépendance et de tolérance propre aux benzodiazépines lors d'un usage prolongé.",
    physiopatho: "Le trouble anxieux généralisé implique une dysrégulation de plusieurs circuits neuronaux : hyperactivité de l'amygdale (structure centrale du traitement de la peur et des menaces perçues), hypoactivité relative du cortex préfontal (normalement impliqué dans la régulation descendante et l'inhibition des réponses émotionnelles excessives), et déséquilibre des systèmes de neurotransmission GABAergique (inhibiteur, déficitaire en activité fonctionnelle) et sérotoninergique → ces anomalies se traduisent cliniquement par une inquiétude excessive et incontrôlable, des symptômes physiques associés (tension musculaire, troubles du sommeil, irritabilité) sur une durée prolongée.",
    mecanisme: "Benzodiazépines (bromazépam, alprazolam) : potentialisent l'action du GABA sur son récepteur GABA-A (modulateurs allostériques positifs) → ↑ fréquence d'ouverture du canal chlorure → hyperpolarisation neuronale → effet anxiolytique rapide, mais développement de tolérance et de dépendance avec l'usage prolongé, limitant leur utilisation à des cures courtes ou des situations ponctuelles.\n\nISRS/IRSNa (paroxétine, venlafaxine — AMM spécifique trouble anxieux généralisé pour certaines molécules) : même mécanisme que dans la dépression, délai d'action similaire (2-4 semaines), mais sans risque de dépendance physique, constituant le traitement de fond de référence pour un usage prolongé et sécurisé.",
    diagnostic: "Critères du DSM-5 pour le trouble anxieux généralisé : inquiétude excessive et difficile à contrôler, concernant plusieurs domaines de la vie, présente plus de jours qu'absente pendant au moins 6 mois, associée à au moins 3 symptômes parmi (agitation, fatigabilité, difficultés de concentration, irritabilité, tension musculaire, troubles du sommeil), avec retentissement fonctionnel significatif. Échelle GAD-7 utile pour le dépistage et le suivi de la sévérité.",
    effets_secondaires: [
      {label:"Benzodiazépines : dépendance physique et psychologique en cas d'usage prolongé, syndrome de sevrage à l'arrêt brutal", niveau:"danger"},
      {label:"Benzodiazépines + sujet âgé : risque de chutes, confusion, troubles mnésiques accrus — prudence renforcée à cet âge", niveau:"danger"},
      {label:"ISRS/IRSNa : majoration transitoire possible de l'anxiété en début de traitement avant l'effet bénéfique — anticiper et informer le patient", niveau:"warning"},
    ],
    classes: [
      {classe:"ISRS/IRSNa — traitement de fond de référence", dci:["Paroxétine 20-50mg/j","Venlafaxine 75-225mg/j"], specialites:["Deroxat®","Effexor®"], couleur:"#1B6B52", remarque:"AMM spécifique trouble anxieux généralisé pour certaines molécules, traitement de fond sans risque de dépendance"},
      {classe:"Benzodiazépines — usage court terme uniquement", dci:["Bromazépam 6mg/j","Alprazolam 0,5-2mg/j"], specialites:["Lexomil®","Xanax®"], couleur:"#C0392B", remarque:"Durée limitée à quelques semaines maximum, utile en transition avant l'efficacité de l'antidépresseur ou en situation aiguë ponctuelle"},
      {classe:"Prégabaline — alternative non benzodiazépine", dci:["Prégabaline 150-600mg/j"], specialites:["Lyrica®"], couleur:"#B45309", remarque:"AMM trouble anxieux généralisé dans certains pays européens, alternative intéressante mais potentiel addictif propre à surveiller également"},
    ],
    interactions: [
      "Benzodiazépines + alcool ou autres dépresseurs du SNC : potentialisation majeure de la sédation et du risque de dépression respiratoire",
      "ISRS/IRSNa + triptans ou tramadol : risque de syndrome sérotoninergique — vigilance et information du patient",
    ],
    points_cles: [
      "Benzodiazépines : traitement court terme uniquement dans le TAG, en raison du risque de dépendance et de tolérance à l'usage prolongé",
      "ISRS/IRSNa : traitement de fond de référence, sans risque de dépendance physique, malgré un délai d'action de 2-4 semaines",
      "Sujet âgé : prudence renforcée avec les benzodiazépines, risque accru de chutes et de troubles cognitifs",
      "GAD-7 : échelle simple et utile pour le dépistage et le suivi de la sévérité du trouble anxieux généralisé",
      "Majoration transitoire de l'anxiété en début de traitement ISRS/IRSNa : à anticiper et expliquer pour prévenir un arrêt prématuré",
    ],
  },
  n3: {
    saviez_vous: "La thérapie cognitivo-comportementale (TCC) a démontré une efficacité comparable, voire supérieure à long terme, aux traitements pharmacologiques dans le trouble anxieux généralisé — avec l'avantage majeur de maintenir ses bénéfices après l'arrêt de la thérapie (effet préventif sur les rechutes), contrairement aux traitements médicamenteux dont l'effet ne persiste généralement pas après leur interruption.",
    physiopatho: "Modèle cognitif de l'anxiété généralisée et intolérance à l'incertitude : un mécanisme cognitif central identifié dans le TAG est l'intolérance à l'incertitude — une tendance à percevoir et interpréter les situations incertaines comme menaçantes et inacceptables, générant un besoin compulsif de contrôle et d'anticipation par l'inquiétude (l'inquiétude étant paradoxalement perçue inconsciemment par le patient comme une stratégie de protection ou de préparation, renforçant son maintien malgré son caractère envahissant et son inefficacité réelle pour résoudre les problèmes anticipés) — ce mécanisme cognitif spécifique est directement ciblé par les techniques de TCC adaptées au TAG.",
    pharmacocinetique: "Prégabaline : absorption par transporteur saturable (système L-amino-acide), biodisponibilité linéaire contrairement à la gabapentine, Tmax = 1h, élimination rénale exclusive sans métabolisme hépatique → profil pharmacocinétique prévisible mais nécessitant un ajustement systématique selon la fonction rénale, sans interaction CYP significative contrairement à de nombreux psychotropes.",
    cas_clinique: "Patient 29 ans, trouble anxieux généralisé depuis 2 ans, inquiétudes envahissantes concernant le travail, la santé et les relations, refus de prendre un traitement médicamenteux par crainte de dépendance, fortement motivé pour une approche non pharmacologique. Que proposez-vous ?\n\nRaisonnement : patient avec TAG sans comorbidité sévère associée, motivation forte pour une approche non médicamenteuse, crainte légitime de dépendance (notamment vis-à-vis des benzodiazépines) → orientation vers une TCC spécialisée dans le TAG, ciblant notamment l'intolérance à l'incertitude et les stratégies d'évitement cognitif (inquiétude comme fausse stratégie de contrôle), avec une efficacité démontrée comparable aux traitements pharmacologiques et un bénéfice qui se maintient après la fin de la thérapie, contrairement à un traitement médicamenteux seul.",
    effets_secondaires: [
      {label:"Prégabaline : sédation, vertiges, prise de poids — titration progressive nécessaire pour limiter ces effets", niveau:"warning"},
      {label:"Potentiel addictif de la prégabaline : signalé et surveillé, notamment chez les patients aux antécédents de trouble addictif", niveau:"warning"},
      {label:"TAG non traité au long cours : retentissement fonctionnel majeur, comorbidités fréquentes (dépression, autres troubles anxieux)", niveau:"warning"},
    ],
    classes: [
      {classe:"TCC spécialisée trouble anxieux généralisé — approche non pharmacologique de référence", dci:["Thérapie structurée, plusieurs séances selon protocole"], specialites:["Prise en charge par psychologue/psychiatre formé"], couleur:"#1B6B52", remarque:"Efficacité comparable aux traitements pharmacologiques, bénéfice maintenu après l'arrêt de la thérapie contrairement aux médicaments seuls"},
      {classe:"Buspirone — alternative non benzodiazépine, mécanisme distinct", dci:["Buspirone selon prescription"], specialites:["Buspar® (selon disponibilité)"], couleur:"#1E3A5F", remarque:"Agoniste partiel des récepteurs 5-HT1A, pas de risque de dépendance, efficacité modérée mais profil de sécurité favorable"},
    ],
    interactions: [
      "Prégabaline + opioïdes ou benzodiazépines : potentialisation de la sédation et du risque de dépression respiratoire — vigilance accrue",
      "Buspirone + IMAO : CI — risque de crise hypertensive",
    ],
    points_cles: [
      "TCC : efficacité comparable voire supérieure à long terme aux traitements pharmacologiques, bénéfice maintenu après l'arrêt",
      "Intolérance à l'incertitude : mécanisme cognitif central du TAG, directement ciblé par les techniques de TCC adaptées",
      "Prégabaline : alternative non benzodiazépine mais potentiel addictif propre à surveiller, particulièrement chez les patients à risque",
      "L'inquiétude dans le TAG est paradoxalement perçue comme une fausse stratégie de protection, renforçant son maintien malgré son inefficacité",
      "Approche non pharmacologique à privilégier en 1ère intention chez les patients motivés et sans comorbidité sévère associée",
    ],
  },
  n4: {
    saviez_vous: "Le trouble anxieux généralisé est fréquemment sous-diagnostiqué car il se présente souvent au premier plan par des symptômes somatiques (troubles digestifs, tensions musculaires, fatigue chronique) plutôt que par la plainte anxieuse elle-même — de nombreux patients consultent d'abord en médecine générale ou aux urgences pour ces symptômes physiques avant qu'un diagnostic de TAG ne soit finalement posé, parfois après plusieurs années d'errance diagnostique et d'explorations somatiques répétées et négatives.",
    physiopatho: "Comorbidités et trajectoire du trouble anxieux généralisé : le TAG est rarement isolé — il coexiste fréquemment avec un trouble dépressif (comorbidité très fréquente, parfois plus de 50% des cas selon les séries), d'autres troubles anxieux (phobie sociale, trouble panique), et des troubles liés à l'usage de substances (alcool notamment, utilisé par certains patients comme stratégie d'auto-médication anxiolytique délétère à long terme) — cette comorbidité fréquente complexifie la prise en charge et justifie une évaluation diagnostique globale plutôt que focalisée sur un seul trouble.",
    recommandations: "HAS / Fédération Française de Psychiatrie — Trouble anxieux généralisé : TCC et/ou ISRS-IRSNa en 1ère intention selon la sévérité et la préférence du patient. Benzodiazépines réservées à un usage court terme en cas de composante aiguë sévère ou en transition. Réévaluation régulière de l'efficacité et de la nécessité de poursuivre le traitement. Dépistage systématique des comorbidités (dépression, autres troubles anxieux, usage de substances) à chaque évaluation.",
    situations_complexes: "TAG et grossesse : benzodiazépines à éviter autant que possible (risque de syndrome de sevrage néonatal et de floppy infant syndrome en fin de grossesse), ISRS utilisables avec discussion bénéfice/risque individualisée (certaines molécules ayant des données de sécurité plus rassurantes que d'autres), TCC à privilégier en 1ère intention dans ce contexte spécifique en raison de l'absence de risque médicamenteux.\n\nTAG chez le sujet âgé : présentation parfois atypique avec prédominance de plaintes somatiques, prudence accrue avec les benzodiazépines (risque de chutes et de troubles cognitifs), privilégier les approches non pharmacologiques et les antidépresseurs à profil de tolérance favorable à cet âge.\n\nSevrage de benzodiazépines au long cours chez un patient anxieux : décroissance très progressive indispensable (sur plusieurs mois si usage prolongé), relais par TCC et/ou antidépresseur pour gérer l'anxiété sous-jacente pendant le sevrage, accompagnement rapproché pour prévenir l'épuisement et l'abandon du sevrage.",
    effets_secondaires: [
      {label:"TAG méconnu et non traité : errance diagnostique prolongée, explorations somatiques répétées et coûteuses, retentissement majeur sur la qualité de vie", niveau:"warning"},
      {label:"Auto-médication par l'alcool dans le TAG non traité : risque de développement d'un trouble lié à l'usage d'alcool surajouté", niveau:"danger"},
      {label:"Benzodiazépines en fin de grossesse : syndrome de sevrage néonatal et floppy infant syndrome possibles", niveau:"danger"},
    ],
    classes: [
      {classe:"Hydroxyzine — alternative anxiolytique non benzodiazépine, usage ponctuel", dci:["Hydroxyzine 25-100mg/j"], specialites:["Atarax®"], couleur:"#B45309", remarque:"Antihistaminique à propriétés anxiolytiques, pas de risque de dépendance mais allongement du QT à surveiller (mise en garde EMA), sédation fréquente"},
      {classe:"TCC adaptée à la grossesse — approche privilégiée dans ce contexte", dci:["Thérapie structurée, sans risque médicamenteux"], specialites:["Prise en charge par psychologue/psychiatre formé"], couleur:"#1B6B52", remarque:"À privilégier en 1ère intention chez la femme enceinte en raison de l'absence de risque médicamenteux associé"},
    ],
    interactions: [
      "Hydroxyzine + autres médicaments allongeant le QT : risque cumulé d'arythmie — vigilance particulière selon les traitements concomitants",
      "Hydroxyzine + alcool ou autres sédatifs : potentialisation de la sédation",
    ],
    points_cles: [
      "TAG : fréquemment masqué par des symptômes somatiques au premier plan, source d'errance diagnostique prolongée",
      "Comorbidité avec la dépression : très fréquente (> 50% des cas selon les séries), nécessite une évaluation diagnostique globale",
      "Grossesse : TCC à privilégier en 1ère intention, benzodiazépines à éviter notamment en fin de grossesse",
      "Sevrage de benzodiazépines au long cours : décroissance très progressive sur plusieurs mois, accompagnement rapproché indispensable",
      "Auto-médication par l'alcool : risque fréquent et délétère dans le TAG non traité, à rechercher systématiquement",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F34 — CYSTITE
   ════════════════════════════════════════════════════════ */
FN['cystite'] = {
  n2: {
    saviez_vous: "La fosfomycine-trométamol en dose unique est devenue le traitement de première intention de la cystite aiguë simple en France — un seul sachet suffit, avec une excellente observance garantie par cette prise unique, contrairement aux anciens schémas de plusieurs jours d'antibiotiques qui exposaient davantage à l'antibiorésistance par traitement incomplet ou mal suivi.",
    physiopatho: "La cystite aiguë simple résulte le plus souvent d'une colonisation ascendante de la vessie par des bactéries d'origine digestive (Escherichia coli dans 70-80% des cas), favorisée par la proximité anatomique entre urètre et anus chez la femme (urètre court, environ 4 cm) et les rapports sexuels (facteur mécanique favorisant la migration bactérienne) → adhésion bactérienne à l'urothélium via des adhésines spécifiques (fimbriae de type 1 notamment) → colonisation et inflammation de la paroi vésicale → symptômes caractéristiques (brûlures mictionnelles, pollakiurie, urgenturie).",
    mecanisme: "Fosfomycine-trométamol : inhibe la première étape de la synthèse du peptidoglycane bactérien (enzyme MurA) → bactéricide à large spectre, particulièrement actif sur E. coli, avec une concentration urinaire élevée et prolongée après une dose unique orale, expliquant l'efficacité de ce schéma simplifié en dose unique pour la cystite simple non complexe.\n\nNitrofurantoïne (alternative) : mécanisme multimodal complexe altérant plusieurs systèmes enzymatiques bactériens, faible taux de résistance acquise malgré une utilisation ancienne et répandue, concentration efficace essentiellement urinaire (peu utile pour les infections systémiques) ce qui en fait un bon choix pour la cystite simple en épargnant le spectre d'autres antibiotiques à plus large usage.",
    diagnostic: "Diagnostic clinique le plus souvent suffisant chez la femme jeune sans facteur de risque devant l'association brûlures mictionnelles + pollakiurie + urgenturie sans fièvre ni douleur lombaire (qui orienteraient vers une pyélonéphrite). Bandelette urinaire utile pour orienter (leucocytes et nitrites positifs) mais pas indispensable si le tableau clinique est typique. ECBU (examen cytobactériologique des urines) réservé aux situations atypiques, récidivantes, ou à risque de complication.",
    effets_secondaires: [
      {label:"Fosfomycine-trométamol : généralement très bien tolérée, rares troubles digestifs transitoires", niveau:"info"},
      {label:"Pyélonéphrite méconnue derrière un tableau initial pris à tort pour une simple cystite : risque de complication rénale", niveau:"danger"},
      {label:"Cystites récidivantes négligées : impact significatif sur la qualité de vie si non explorées et prises en charge spécifiquement", niveau:"warning"},
    ],
    classes: [
      {classe:"Fosfomycine-trométamol — 1ère intention, dose unique", dci:["Fosfomycine-trométamol 3g, dose unique"], specialites:["Monuril®","Uridoz®"], couleur:"#1B6B52", remarque:"Traitement de référence de la cystite simple, excellente observance par la prise unique, à prendre à distance des repas"},
      {classe:"Pivmécillinam — alternative de 1ère intention", dci:["Pivmécillinam 400mg × 2/j × 5 jours"], specialites:["Selexid®"], couleur:"#1E3A5F", remarque:"Alternative recommandée en 1ère intention selon les recommandations actuelles, durée de 5 jours"},
      {classe:"Nitrofurantoïne — alternative si besoin", dci:["Nitrofurantoïne 100mg × 3/j × 5 jours"], specialites:["Furadantine®"], couleur:"#B45309", remarque:"Spectre limité préservant les antibiotiques à plus large usage, durée de traitement de 5 jours"},
    ],
    interactions: [
      "Nitrofurantoïne + antiacides à base de magnésium : ↓ absorption de la nitrofurantoïne — espacer les prises",
      "Aucune interaction majeure significative pour la fosfomycine-trométamol en dose unique",
    ],
    points_cles: [
      "Fosfomycine-trométamol en dose unique : traitement de référence de la cystite aiguë simple, excellente observance garantie",
      "E. coli responsable de 70-80% des cystites, colonisation ascendante favorisée par la proximité anatomique chez la femme",
      "ECBU non systématique si tableau clinique typique chez la femme jeune sans facteur de risque associé",
      "Fièvre ou douleur lombaire associée aux symptômes urinaires : orientent vers une pyélonéphrite, pas une simple cystite",
      "Choix de l'antibiotique en 1ère intention guidé par la préservation du spectre antibiotique global (épargne des fluoroquinolones notamment)",
    ],
  },
  n3: {
    saviez_vous: "Les cystites récidivantes (≥ 4 épisodes par an) touchent environ 20-30% des femmes ayant déjà eu une cystite, et la canneberge (cranberry), bien que largement utilisée en prévention, n'a démontré qu'une efficacité modeste et controversée dans les méta-analyses les plus récentes et rigoureuses — son mécanisme proposé (inhibition de l'adhésion bactérienne à l'urothélium via les proanthocyanidines) reste pertinent mais l'effet clinique global est plus limité qu'initialement supposé.",
    physiopatho: "Facteurs de risque et mécanismes des cystites récidivantes : au-delà des facteurs anatomiques classiques, certaines femmes présentent une susceptibilité accrue liée à des variations génétiques de l'expression des récepteurs d'adhésion urothéliaux (augmentant la capacité de fixation bactérienne), à une colonisation vaginale par des souches uropathogènes particulièrement virulentes, ou à des facteurs comportementaux (rétention urinaire volontaire prolongée, hygiène inadaptée) — chez la femme ménopausée, la carence estrogénique locale (atrophie vulvo-vaginale) modifie l'écosystème vaginal et favorise la colonisation par des entérobactéries, expliquant la fréquence accrue des cystites récidivantes à cette période de la vie.",
    pharmacocinetique: "Fosfomycine-trométamol : biodisponibilité orale d'environ 40%, Tmax = 2-2,5h, concentration urinaire maximale atteinte vers 4h et maintenue à des taux bactéricides pendant plus de 48h grâce à une élimination rénale lente sous forme inchangée → explique l'efficacité d'une dose unique malgré une demi-vie plasmatique relativement courte, propriété pharmacocinétique spécifique à cette molécule justifiant son intérêt particulier dans cette indication précise.",
    cas_clinique: "Femme 58 ans, ménopausée depuis 5 ans, 5 épisodes de cystite dans l'année écoulée, chaque épisode traité efficacement par antibiotique en dose unique mais récidive systématique dans les semaines suivantes. Pas d'anomalie à l'échographie des voies urinaires. Quelle est votre démarche ?\n\nRaisonnement : cystites récidivantes chez une femme ménopausée sans anomalie anatomique identifiée → évoquer la composante hormonale (atrophie vulvo-vaginale post-ménopausique favorisant la colonisation par des entérobactéries) → discuter un traitement estrogénique local (crème ou ovule vaginal à base d'estriol), option de prévention efficace dans ce contexte spécifique, en complément des mesures hygiéno-diététiques habituelles (hydratation, mictions non retenues, mictions post-coïtales si pertinent).",
    effets_secondaires: [
      {label:"Estrogènes locaux vaginaux : généralement bien tolérés à doses faibles utilisées en application locale, risque systémique minime", niveau:"info"},
      {label:"Cystites récidivantes non explorées chez la femme ménopausée : retard à l'identification d'une cause hormonale traitable", niveau:"warning"},
      {label:"Antibioprophylaxie au long cours répétée : risque de sélection de résistances si utilisée sans discernement", niveau:"warning"},
    ],
    classes: [
      {classe:"Estrogènes locaux vaginaux — prévention chez la femme ménopausée", dci:["Estriol crème ou ovule vaginal"], specialites:["Gydrelle®","Trophicrème®"], couleur:"#1B6B52", remarque:"Restaure l'écosystème vaginal physiologique, option de prévention efficace spécifiquement chez la femme ménopausée avec cystites récidivantes"},
      {classe:"Antibioprophylaxie post-coïtale ou continue — cas sélectionnés de cystites récidivantes", dci:["Fosfomycine-trométamol en prise post-coïtale ou triméthoprime faible dose en continu selon le profil"], specialites:["Selon protocole adapté au profil du patient"], couleur:"#B45309", remarque:"Réservée aux cas bien sélectionnés après échec des mesures non médicamenteuses et hormonales si pertinentes, durée limitée et réévaluée"},
    ],
    interactions: [
      "Estrogènes locaux vaginaux : peu d'interactions systémiques significatives en raison de l'absorption limitée à dose adaptée",
    ],
    points_cles: [
      "Canneberge : efficacité modeste et controversée selon les méta-analyses récentes, malgré un mécanisme d'action plausible",
      "Atrophie vulvo-vaginale post-ménopausique : facteur favorisant majeur des cystites récidivantes chez la femme ménopausée",
      "Estrogènes locaux vaginaux : option de prévention efficace et spécifique dans ce contexte hormonal particulier",
      "Mictions post-coïtales et hydratation adaptée : mesures hygiéno-diététiques de base à recommander systématiquement",
      "Antibioprophylaxie : réservée aux cas sélectionnés après échec des mesures non médicamenteuses, durée limitée et réévaluée",
    ],
  },
  n4: {
    saviez_vous: "L'antibiorésistance croissante d'E. coli, notamment la production de bêta-lactamases à spectre étendu (BLSE), complexifie de plus en plus la prise en charge des infections urinaires, particulièrement chez les patients ayant des facteurs de risque spécifiques (voyage récent en zone à forte prévalence de résistance, antibiothérapie récente, hospitalisation récente, sondage urinaire) — ces situations nécessitent une adaptation de la stratégie antibiotique empirique et parfois le recours à un ECBU systématique avant traitement.",
    physiopatho: "Pyélonéphrite et risque de complication : la progression d'une cystite simple non traitée ou insuffisamment traitée vers une pyélonéphrite aiguë (infection du parenchyme rénal) survient par migration ascendante des bactéries le long de l'uretère jusqu'au bassinet et au parenchyme rénal → inflammation et œdème du parenchyme rénal, risque de complications locales (abcès rénal) et systémiques (sepsis, choc septique) si non traitée rapidement et adéquatement — distinction clinique essentielle avec la cystite simple par la présence de fièvre, frissons, douleur lombaire unilatérale, parfois altération de l'état général.",
    recommandations: "SPILF 2018 (actualisée) — Infections urinaires : fosfomycine-trométamol ou pivmécillinam en 1ère intention pour la cystite simple. ECBU systématique avant traitement en cas de cystite à risque de complication (grossesse, homme, anomalie urologique, immunodépression) ou de pyélonéphrite. Antibiothérapie probabiliste adaptée au contexte épidémiologique local et aux facteurs de risque de résistance, avec réévaluation systématique selon les résultats de l'antibiogramme dès qu'il est disponible.",
    situations_complexes: "Cystite chez l'homme : toujours considérée comme une infection urinaire 'à risque de complication' en raison de la fréquence des anomalies urologiques sous-jacentes (notamment prostatiques chez l'homme âgé) — ECBU systématique recommandé, durée de traitement plus longue que chez la femme, recherche d'une cause favorisante (hypertrophie bénigne de la prostate notamment) à envisager si épisodes répétés.\n\nCystite et grossesse : toute infection urinaire pendant la grossesse, y compris la bactériurie asymptomatique, doit être traitée en raison du risque accru de pyélonéphrite gravidique et de complications obstétricales (accouchement prématuré notamment) — choix de l'antibiotique adapté à la grossesse (éviter certaines classes contre-indiquées comme les fluoroquinolones), ECBU de contrôle après traitement systématiquement recommandé dans ce contexte.\n\nInfection urinaire à BLSE : nécessite souvent le recours à des antibiotiques de réserve (notamment certains carbapénèmes en cas d'infection sévère), illustrant l'enjeu de la préservation de l'efficacité des antibiotiques de 1ère ligne par un usage raisonné et adapté en pratique courante.",
    effets_secondaires: [
      {label:"Pyélonéphrite non reconnue et non traitée : risque de sepsis, choc septique, complications rénales définitives", niveau:"danger"},
      {label:"Bactériurie asymptomatique non traitée pendant la grossesse : risque accru de pyélonéphrite gravidique et de complications obstétricales", niveau:"danger"},
      {label:"Infection urinaire à BLSE non identifiée : échec thérapeutique sous antibiotique de 1ère ligne, retard à l'adaptation thérapeutique", niveau:"danger"},
    ],
    classes: [
      {classe:"Céphalosporines de 3e génération ou fluoroquinolones — pyélonéphrite simple", dci:["Ceftriaxone IV ou ciprofloxacine orale selon la sévérité"], specialites:["Rocéphine®","Ciflox®"], couleur:"#B45309", remarque:"Traitement de la pyélonéphrite, durée 7-10 jours selon la molécule et la sévérité, adaptation selon l'antibiogramme dès disponible"},
      {classe:"Carbapénèmes — infection sévère à BLSE confirmée", dci:["Méropénème ou imipénème selon protocole hospitalier"], specialites:["Prise en charge hospitalière spécialisée"], couleur:"#C0392B", remarque:"Antibiotique de réserve pour les infections sévères à bactéries multirésistantes, usage hospitalier encadré pour préserver son efficacité"},
    ],
    interactions: [
      "Fluoroquinolones + AINS : ↑ risque de convulsions (potentialisation) — prudence si association nécessaire",
      "Fluoroquinolones + anticoagulants oraux : ↑ effet anticoagulant — surveillance accrue de l'INR si association",
    ],
    points_cles: [
      "Antibiorésistance croissante (BLSE) : nécessite une adaptation de la stratégie selon les facteurs de risque individuels du patient",
      "Cystite chez l'homme : toujours à risque de complication, ECBU systématique et recherche d'une cause urologique sous-jacente",
      "Bactériurie asymptomatique en grossesse : traitement systématique en raison du risque de pyélonéphrite gravidique",
      "Pyélonéphrite : fièvre + douleur lombaire associées aux symptômes urinaires, distinction clinique essentielle avec la cystite simple",
      "Préservation des antibiotiques de réserve (carbapénèmes) : enjeu majeur face à la diffusion des bactéries multirésistantes",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F35 — GRIPPE
   ════════════════════════════════════════════════════════ */
FN['grippe'] = {
  n2: {
    saviez_vous: "La grippe et le rhume sont souvent confondus, mais la grippe se distingue par un début brutal et une intensité des symptômes nettement supérieure (fièvre élevée d'apparition soudaine, courbatures intenses, fatigue marquée) — cette présentation clinique caractéristique permet souvent un diagnostic présomptif fiable sans nécessité systématique de test diagnostique en période épidémique, sauf situations particulières.",
    physiopatho: "Le virus influenza (types A et B principalement responsables des épidémies saisonnières) infecte les cellules épithéliales respiratoires via la liaison de son hémagglutinine de surface aux récepteurs à acide sialique → pénétration virale et réplication intracellulaire intense → destruction des cellules épithéliales ciliées respiratoires → altération de la clairance mucociliaire normale, facilitant les surinfections bactériennes secondaires → la réponse immunitaire systémique massive (libération de cytokines pro-inflammatoires) explique les symptômes généraux intenses caractéristiques (fièvre élevée, courbatures, asthénie marquée), contrastant avec la symptomatologie plus modérée et localisée du rhume banal.",
    mecanisme: "Antiviraux inhibiteurs de la neuraminidase (oseltamivir) : bloquent l'enzyme neuraminidase virale nécessaire au relargage des nouvelles particules virales depuis les cellules infectées → limitation de la propagation virale et réduction de la durée et de la sévérité des symptômes si débuté précocement (idéalement dans les 48h suivant le début des symptômes), efficacité plus modeste si débuté plus tardivement.\n\nVaccination antigrippale : stimule une réponse immunitaire (anticorps neutralisants principalement dirigés contre l'hémagglutinine) protectrice contre les souches virales incluses dans le vaccin de l'année, nécessité d'une mise à jour annuelle en raison de la variabilité antigénique importante du virus influenza (dérive antigénique).",
    diagnostic: "Diagnostic clinique de présomption fiable en période épidémique devant un tableau typique (début brutal, fièvre élevée, courbatures, asthénie). Test de diagnostic rapide (TDR) ou PCR disponibles, utiles notamment chez les patients à risque de complication ou en cas de doute diagnostique, ou pour des raisons de surveillance épidémiologique en milieu hospitalier ou collectif.",
    effets_secondaires: [
      {label:"Grippe chez le sujet à risque (âgé, comorbidités, femme enceinte) : risque accru de complications graves (pneumopathie, décompensation cardiorespiratoire)", niveau:"danger"},
      {label:"Oseltamivir : nausées, vomissements — généralement transitoires et bien tolérés à la dose recommandée", niveau:"info"},
      {label:"Syndrome de Reye (association aspirine + infection virale chez l'enfant) : CI formelle de l'aspirine chez l'enfant en contexte viral", niveau:"danger"},
    ],
    classes: [
      {classe:"Oseltamivir — antiviral de référence si débuté précocement", dci:["Oseltamivir 75mg × 2/j × 5 jours"], specialites:["Tamiflu®"], couleur:"#1B6B52", remarque:"Efficacité optimale si débuté dans les 48h suivant le début des symptômes, réservé essentiellement aux patients à risque de complication"},
      {classe:"Vaccination antigrippale — prévention annuelle", dci:["Vaccin inactivé, mise à jour annuelle selon les souches circulantes"], specialites:["Influvac Tetra®","Vaxigrip Tetra®","Efluelda®"], couleur:"#1E3A5F", remarque:"Recommandée annuellement chez les populations à risque (âgés, comorbidités, professionnels de santé, femmes enceintes)"},
      {classe:"Traitement symptomatique — base de la prise en charge ambulatoire", dci:["Paracétamol 1g × 3-4/j, hydratation, repos"], specialites:["Doliprane®"], couleur:"#B45309", remarque:"Traitement de référence pour la majorité des grippes simples sans facteur de risque associé, AINS et aspirine à éviter chez l'enfant"},
    ],
    interactions: [
      "Aspirine + infection virale chez l'enfant : risque de syndrome de Reye, CI formelle à respecter systématiquement",
      "Oseltamivir : peu d'interactions médicamenteuses significatives connues",
    ],
    points_cles: [
      "Début brutal et intensité des symptômes (fièvre élevée, courbatures) : signature clinique distinguant la grippe du rhume banal",
      "Oseltamivir : efficacité optimale si débuté dans les 48h, réservé essentiellement aux patients à risque de complication",
      "Vaccination antigrippale : mise à jour annuelle indispensable en raison de la variabilité antigénique du virus",
      "Syndrome de Reye : CI absolue de l'aspirine chez l'enfant en contexte d'infection virale, y compris la grippe",
      "Populations à risque de complication (âgés, comorbidités, femmes enceintes) : cible prioritaire de la vaccination et de la vigilance clinique",
    ],
  },
  n3: {
    saviez_vous: "Le phénomène de dérive antigénique (mutations ponctuelles progressives de l'hémagglutinine et de la neuraminidase virales) explique pourquoi l'immunité acquise lors d'une grippe ou d'une vaccination antérieure ne protège que partiellement contre les souches circulant les années suivantes — distinct du phénomène plus rare de cassure antigénique (réassortiment génétique majeur, parfois entre virus humain et animal) potentiellement à l'origine de pandémies grippales, comme celle de 2009 (virus H1N1).",
    physiopatho: "Mécanismes des complications grippales sévères : la pneumopathie grippale primaire (atteinte virale directe du parenchyme pulmonaire, plus fréquente et sévère chez les patients à risque) doit être distinguée de la pneumopathie bactérienne secondaire (surinfection, le plus souvent à Streptococcus pneumoniae ou Staphylococcus aureus, favorisée par la destruction de l'épithélium respiratoire cilié et l'altération des défenses immunitaires locales induites par l'infection virale initiale) — cette distinction guide la prise en charge thérapeutique (antiviral seul versus association à une antibiothérapie en cas de surinfection bactérienne documentée ou fortement suspectée).",
    pharmacocinetique: "Oseltamivir : prodrogue, hydrolysée par les estérases hépatiques en oseltamivir carboxylate (métabolite actif), biodisponibilité orale d'environ 80%, T½ du métabolite actif = 6-10h, élimination rénale prédominante nécessitant un ajustement posologique en cas d'insuffisance rénale (clairance créatinine < 60 mL/min) pour éviter une accumulation et une toxicité accrue.",
    cas_clinique: "Patient 75 ans, BPCO connue, grippe confirmée par TDR depuis 24h, fièvre à 39°C, aggravation de la dyspnée habituelle. Quelle est votre démarche ?\n\nRaisonnement : patient à très haut risque de complication (âge, BPCO sous-jacente) avec grippe confirmée récente (< 48h, fenêtre d'efficacité optimale de l'antiviral) et signes d'aggravation respiratoire → initiation rapide d'oseltamivir, surveillance clinique rapprochée pour dépister une éventuelle surinfection bactérienne ou une décompensation de la BPCO sous-jacente nécessitant une prise en charge hospitalière, seuil d'hospitalisation abaissé chez ce patient à très haut risque par rapport à un sujet jeune sans comorbidité.",
    effets_secondaires: [
      {label:"Pneumopathie grippale primaire sévère : détresse respiratoire aiguë possible, notamment chez les patients à très haut risque", niveau:"danger"},
      {label:"Surinfection bactérienne secondaire à Staphylococcus aureus : forme particulièrement sévère et rapide, notamment chez l'enfant et l'adulte jeune", niveau:"danger"},
      {label:"Décompensation de comorbidités préexistantes (BPCO, insuffisance cardiaque) sous l'effet du stress infectieux grippal", niveau:"danger"},
    ],
    classes: [
      {classe:"Antibiothérapie — surinfection bactérienne documentée ou fortement suspectée", dci:["Amoxicilline/Acide clavulanique ou selon documentation microbiologique"], specialites:["Augmentin®"], couleur:"#B45309", remarque:"Réservée aux situations de surinfection bactérienne avérée ou fortement suspectée, pas systématique dans la grippe simple non compliquée"},
      {classe:"Zanamivir inhalé — alternative à l'oseltamivir", dci:["Zanamivir inhalé 10mg × 2/j × 5 jours"], specialites:["Relenza®"], couleur:"#1E3A5F", remarque:"Voie inhalée, alternative en cas d'intolérance ou de contre-indication à l'oseltamivir, CI relative si pathologie respiratoire sous-jacente sévère"},
    ],
    interactions: [
      "Oseltamivir : ajustement posologique nécessaire selon la fonction rénale (clairance créatinine), pas d'interaction CYP significative",
      "Zanamivir inhalé : risque de bronchospasme chez les patients avec pathologie respiratoire sous-jacente sévère, prudence d'usage",
    ],
    points_cles: [
      "Dérive antigénique : explique la nécessité de mise à jour vaccinale annuelle, distincte de la cassure antigénique pandémique plus rare",
      "Pneumopathie grippale primaire vs surinfection bactérienne secondaire : distinction guidant la prise en charge thérapeutique adaptée",
      "Patients à très haut risque (âgés, comorbidités) : seuil d'hospitalisation abaissé devant tout signe d'aggravation",
      "Oseltamivir : ajustement posologique nécessaire en cas d'insuffisance rénale pour éviter l'accumulation et la toxicité",
      "Antibiothérapie : pas systématique dans la grippe simple, réservée à la surinfection bactérienne documentée ou fortement suspectée",
    ],
  },
  n4: {
    saviez_vous: "La surveillance épidémiologique mondiale du virus influenza, coordonnée par l'OMS via un réseau de centres de référence, permet de sélectionner chaque année les souches à inclure dans le vaccin de la saison suivante — un processus complexe réalisé plusieurs mois avant le pic épidémique, expliquant pourquoi l'efficacité vaccinale peut varier d'une année à l'autre selon la précision de cette prédiction face à l'évolution virale réelle observée lors de la saison.",
    physiopatho: "Tempête de cytokines et grippe sévère : dans les formes graves de grippe (notamment lors de certaines souches comme le H5N1 aviaire ou certains variants pandémiques), une réponse immunitaire systémique excessive et dérégulée (tempête de cytokines, avec libération massive de TNF-α, IL-6 et autres médiateurs pro-inflammatoires) peut elle-même contribuer aux dommages tissulaires pulmonaires et à la défaillance multiviscérale, indépendamment de la charge virale elle-même — ce mécanisme explique pourquoi certaines formes graves surviennent paradoxalement chez des sujets jeunes et immunocompétents, dont la réponse immunitaire vigoureuse devient elle-même délétère.",
    recommandations: "HAS / Santé publique France — Grippe : vaccination annuelle recommandée pour les populations à risque (≥ 65 ans, comorbidités chroniques, femmes enceintes, professionnels de santé, entourage de nourrissons à risque). Oseltamivir réservé aux patients à risque de complication ou aux formes sévères, débuté idéalement dans les 48h. Mesures barrières (hygiène des mains, port du masque en période épidémique pour les sujets symptomatiques) recommandées pour limiter la transmission communautaire.",
    situations_complexes: "Grippe chez la femme enceinte : risque accru de complications graves (notamment au 2e-3e trimestre), vaccination antigrippale fortement recommandée pendant la grossesse (sécurité bien établie, bénéfice démontré pour la mère et protection passive du nourrisson dans les premiers mois de vie), oseltamivir utilisable si nécessaire avec un rapport bénéfice/risque favorable dans ce contexte d'infection grippale confirmée.\n\nGrippe pandémique : situation distincte de la grippe saisonnière, liée à l'émergence d'un nouveau sous-type viral contre lequel la population n'a pas d'immunité préexistante (cassure antigénique), nécessitant une réponse de santé publique spécifique (vaccination ciblée si disponible rapidement, mesures de distanciation sociale renforcées, antiviraux en traitement et parfois en prophylaxie post-exposition).\n\nGrippe nosocomiale en collectivité de personnes âgées (EHPAD) : risque de diffusion rapide et de mortalité accrue dans cette population vulnérable, mesures de prévention renforcées recommandées (vaccination du personnel et des résidents, isolement des cas, antiviraux en prophylaxie post-exposition pour les résidents non vaccinés ou immunodéprimés en cas de cas groupés confirmés).",
    effets_secondaires: [
      {label:"Tempête de cytokines dans la grippe sévère : peut toucher des sujets jeunes et immunocompétents, mécanisme distinct de la simple charge virale", niveau:"danger"},
      {label:"Grippe pandémique : absence d'immunité préexistante dans la population, risque de diffusion rapide et de formes sévères à plus large échelle", niveau:"danger"},
      {label:"Grippe en EHPAD non maîtrisée : mortalité accrue dans cette population vulnérable si mesures de prévention insuffisantes", niveau:"danger"},
    ],
    classes: [
      {classe:"Oseltamivir en prophylaxie post-exposition — situations de cas groupés en collectivité", dci:["Oseltamivir 75mg/j en prophylaxie selon protocole"], specialites:["Tamiflu®"], couleur:"#1E3A5F", remarque:"Indication spécifique en cas groupés en collectivité (EHPAD notamment), schéma posologique différent du traitement curatif"},
      {classe:"Vaccination antigrippale en grossesse — sécurité et bénéfice bien établis", dci:["Vaccin inactivé, recommandé à tout moment de la grossesse"], specialites:["Vaxigrip Tetra®","Influvac Tetra®"], couleur:"#1B6B52", remarque:"Fortement recommandée pendant la grossesse, protection de la mère et protection passive transmise au nourrisson dans les premiers mois"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse spécifique supplémentaire notable pour cette section au-delà de celles déjà mentionnées",
    ],
    points_cles: [
      "Surveillance épidémiologique mondiale OMS : base de la sélection annuelle des souches vaccinales, processus complexe expliquant la variabilité d'efficacité",
      "Tempête de cytokines : mécanisme pouvant expliquer des formes graves chez des sujets jeunes et immunocompétents",
      "Vaccination antigrippale en grossesse : sécurité bien établie, bénéfice démontré pour la mère et protection passive du nourrisson",
      "Grippe pandémique : distincte de la grippe saisonnière, nécessite une réponse de santé publique spécifique adaptée",
      "EHPAD : mesures de prévention renforcées indispensables (vaccination, isolement, prophylaxie post-exposition) en cas de cas groupés",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F36 — HERPÈS LABIAL
   ════════════════════════════════════════════════════════ */
FN['herpes-labial'] = {
  n2: {
    saviez_vous: "Plus de 60-70% de la population adulte est porteuse du virus HSV-1 (souvent acquis dès l'enfance par contact salivaire), mais seule une minorité de ces porteurs présentera des récurrences cliniques symptomatiques (boutons de fièvre) — le virus reste latent dans le ganglion trigéminal chez tous les porteurs, mais les facteurs déclenchant la réactivation clinique varient considérablement d'un individu à l'autre.",
    physiopatho: "Après la primo-infection (souvent asymptomatique ou peu symptomatique dans l'enfance), le virus HSV-1 remonte par voie axonale rétrograde jusqu'au ganglion trigéminal où il établit une latence à vie, échappant à la clairance immunitaire complète → des facteurs déclenchants variés (exposition solaire intense, stress, fièvre, fatigue, traumatisme local, immunodépression transitoire) peuvent réactiver le virus → migration antérograde le long du nerf → réplication virale cutanéo-muqueuse au niveau labial → vésicules groupées en bouquet sur fond érythémateux, précédées d'un prodrome caractéristique (picotements, brûlure) quelques heures avant l'éruption visible.",
    mecanisme: "Aciclovir crème (5%) : analogue nucléosidique activé spécifiquement dans les cellules infectées par la thymidine kinase virale → inhibition de l'ADN polymérase virale → blocage de la réplication virale locale, efficacité optimale si appliqué dès le stade de prodrome (picotements) avant l'apparition des vésicules, action plus limitée une fois les vésicules déjà constituées.\n\nPatchs hydrocolloïdes : action mécanique et protectrice (barrière physique limitant la dissémination du virus et la contamination de l'entourage, protection contre les agressions extérieures favorisant une guérison plus rapide et plus discrète), sans action antivirale propre mais bénéfice démontré sur la cicatrisation et le confort.",
    diagnostic: "Diagnostic clinique évident dans l'immense majorité des cas devant le prodrome caractéristique suivi de vésicules groupées en bouquet sur la lèvre ou la zone péribuccale, évoluant en quelques jours vers la croûte puis la guérison spontanée. Pas d'examen complémentaire nécessaire pour les récurrences typiques chez un patient déjà connu porteur du virus.",
    effets_secondaires: [
      {label:"Herpès oculaire (auto-inoculation par contact main-œil) : risque de kératite herpétique grave — éviter le contact avec les yeux", niveau:"danger"},
      {label:"Surinfection bactérienne locale si grattage ou manipulation des lésions", niveau:"warning"},
      {label:"Transmission à l'entourage (contact direct, partage d'objets contaminés) particulièrement en phase vésiculeuse active", niveau:"warning"},
    ],
    classes: [
      {classe:"Aciclovir crème — traitement de référence si débuté au stade de prodrome", dci:["Aciclovir 5% crème"], specialites:["Zovirax® crème"], couleur:"#1B6B52", remarque:"Application dès les premiers picotements (prodrome), 5 fois par jour pendant 4-5 jours, efficacité limitée si débuté après l'apparition des vésicules"},
      {classe:"Patchs hydrocolloïdes — alternative ou complément", dci:["Patch hydrocolloïde transparent"], specialites:["Compeed® bouton de fièvre"], couleur:"#1E3A5F", remarque:"Action mécanique protectrice, limite la dissémination et favorise une cicatrisation discrète, utilisable dès l'apparition des vésicules"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse systémique significative pour l'aciclovir crème (absorption cutanée négligeable)",
    ],
    points_cles: [
      "Application de l'aciclovir crème dès le stade de prodrome (picotements) pour une efficacité optimale, avant l'apparition des vésicules",
      "60-70% de la population est porteuse du virus HSV-1, mais seule une minorité présente des récurrences cliniques symptomatiques",
      "Herpès oculaire par auto-inoculation : urgence ophtalmologique à prévenir par une hygiène des mains rigoureuse",
      "Phase vésiculeuse active = période de transmissibilité maximale, éviter les contacts directs et le partage d'objets",
      "Patchs hydrocolloïdes : alternative pratique avec bénéfice démontré sur la discrétion et la cicatrisation des lésions",
    ],
  },
  n3: {
    saviez_vous: "Le valaciclovir oral en traitement court (1 jour, 2g matin et soir) a démontré une efficacité comparable aux schémas plus longs pour les récurrences d'herpès labial chez l'adulte immunocompétent — ce schéma simplifié améliore considérablement l'observance par rapport aux applications répétées de crème pendant plusieurs jours, à condition d'être débuté également au stade de prodrome pour une efficacité optimale.",
    physiopatho: "Facteurs déclenchants et neuro-immunologie de la réactivation herpétique : l'exposition aux rayons ultraviolets est un déclencheur particulièrement bien documenté de la réactivation du HSV-1 latent — les UV provoquent une immunosuppression locale transitoire de la peau (notamment une altération de la fonction des cellules de Langerhans et une libération de médiateurs inflammatoires comme les prostaglandines) qui favoriserait l'échappement viral au contrôle immunitaire local maintenant habituellement la latence, expliquant la fréquence des récurrences after exposition solaire intense (vacances, sports de montagne) chez les patients sensibles.",
    pharmacocinetique: "Valaciclovir : prodrogue de l'aciclovir avec une biodisponibilité orale nettement supérieure (environ 55% versus 15-20% pour l'aciclovir oral direct), conversion rapide et quasi complète en aciclovir actif par les estérases hépatiques et intestinales lors du premier passage → permet d'atteindre des concentrations plasmatiques et tissulaires efficaces avec un schéma posologique simplifié (prises moins fréquentes) par rapport à l'aciclovir oral classique.",
    cas_clinique: "Patiente 28 ans, récurrences fréquentes d'herpès labial (environ 6-8 par an), toujours précédées d'un prodrome qu'elle reconnaît bien, traitement local par crème jugé peu pratique et peu efficace selon elle. Que proposez-vous ?\n\nRaisonnement : patiente avec récurrences fréquentes, bonne reconnaissance du prodrome (élément clé pour l'efficacité du traitement précoce), insatisfaction vis-à-vis du traitement local → proposer le valaciclovir oral en traitement court (2g matin et soir, 1 seul jour) à débuter dès les premiers signes de prodrome, schéma simplifié à forte observance attendue. Discuter également, si les récurrences restent très fréquentes et invalidantes, l'intérêt d'un traitement antiviral suppressif au long cours (faible dose quotidienne continue) pour réduire la fréquence des épisodes.",
    effets_secondaires: [
      {label:"Valaciclovir oral : généralement bien toléré, rares céphalées ou troubles digestifs transitoires", niveau:"info"},
      {label:"Récurrences très fréquentes non explorées : pourraient révéler un terrain d'immunodépression sous-jacente à investiguer si contexte évocateur", niveau:"warning"},
    ],
    classes: [
      {classe:"Valaciclovir oral — traitement court de la récurrence", dci:["Valaciclovir 2g matin et soir, 1 seul jour"], specialites:["Zelitrex®"], couleur:"#1B6B52", remarque:"Schéma simplifié à débuter dès le prodrome, efficacité comparable aux schémas plus longs avec une meilleure observance"},
      {classe:"Aciclovir/Valaciclovir — traitement suppressif au long cours", dci:["Aciclovir 400mg × 2/j ou valaciclovir 500mg/j en continu"], specialites:["Zovirax®","Zelitrex®"], couleur:"#1E3A5F", remarque:"Réservé aux récurrences très fréquentes et invalidantes, réduit significativement la fréquence des épisodes en traitement continu"},
    ],
    interactions: [
      "Valaciclovir + probénécide : ↑ concentration de l'antiviral par compétition pour la sécrétion tubulaire rénale",
      "Aucune interaction majeure significative avec les autres traitements courants",
    ],
    points_cles: [
      "Valaciclovir oral en traitement court (1 jour) : schéma simplifié à forte observance, efficacité comparable aux schémas plus longs",
      "Exposition aux UV : déclencheur particulièrement documenté de la réactivation herpétique, par immunosuppression locale transitoire",
      "Reconnaissance précoce du prodrome par le patient : élément clé pour l'efficacité optimale de tout traitement antiviral",
      "Traitement suppressif au long cours : option pour les récurrences très fréquentes et invalidantes, à discuter au cas par cas",
      "Biodisponibilité supérieure du valaciclovir par rapport à l'aciclovir oral : permet un schéma posologique simplifié",
    ],
  },
  n4: {
    saviez_vous: "L'herpès néonatal, bien que rare, constitue une urgence pédiatrique potentiellement gravissime — la transmission se fait le plus souvent lors de l'accouchement par voie basse chez une mère présentant une primo-infection herpétique génitale (pas labiale) en fin de grossesse, situation où le risque de transmission est maximal en l'absence d'anticorps maternels protecteurs déjà transmis au fœtus, contrairement à une récurrence chez une mère déjà connue porteuse où le risque est nettement plus faible.",
    physiopatho: "Immunodépression et herpès sévère ou disséminé : chez les patients immunodéprimés (VIH avancé, transplantation, chimiothérapie, corticothérapie au long cours à forte dose), l'herpès labial peut prendre des formes inhabituelles — lésions plus étendues, plus profondes, à cicatrisation plus lente, parfois dissémination cutanéo-muqueuse extensive ou atteinte viscérale (œsophagite herpétique, hépatite, pneumopathie dans les formes les plus sévères) — ces formes atypiques et sévères nécessitent souvent un traitement antiviral systémique à dose plus élevée et parfois par voie intraveineuse, contrairement aux formes habituelles de l'immunocompétent qui guérissent spontanément ou avec un traitement local/oral simple.",
    recommandations: "SFD / Recommandations spécialisées — Herpès labial : traitement local (aciclovir crème) ou oral court (valaciclovir) débuté au stade de prodrome pour les récurrences simples de l'immunocompétent. Traitement suppressif au long cours à discuter si récurrences très fréquentes (> 6/an) et impact significatif sur la qualité de vie. Vigilance accrue et orientation spécialisée chez l’immunodéprimé pour toute lésion atypique, extensive, ou ne cicatrisant pas dans les délais habituels.",
    situations_complexes: "Grossesse et herpès labial : pas de risque direct pour le fœtus en cas de récurrence labiale simple chez la mère (différent de l'herpès génital), mais vigilance sur l'hygiène des mains pour éviter toute auto-inoculation génitale ou transmission au nouveau-né après la naissance par contact direct (notamment baiser) si lésion active au moment de l'accouchement ou dans les premiers jours de vie du nourrisson.\n\nEczéma herpeticum (surinfection herpétique d'une dermatite atopique) : urgence dermatologique chez l'enfant atopique, le virus HSV profite de la barrière cutanée altérée par l'eczéma sous-jacent pour se disséminer de façon extensive sur les zones eczémateuses → traitement antiviral systémique urgent nécessaire, risque de complication systémique si non traité rapidement et adéquatement.\n\nHerpès néonatal : urgence pédiatrique absolue devant tout signe évocateur (vésicules cutanées, altération de l'état général, convulsions) chez un nouveau-né, traitement antiviral IV à forte dose en urgence, pronostic directement lié à la rapidité de la prise en charge.",
    effets_secondaires: [
      {label:"Eczéma herpeticum chez l'enfant atopique : dissémination extensive et risque de complication systémique si non traité en urgence", niveau:"danger"},
      {label:"Herpès néonatal : urgence pédiatrique absolue, pronostic vital et neurologique engagé selon la rapidité de prise en charge", niveau:"danger"},
      {label:"Herpès disséminé chez l'immunodéprimé sévère : atteinte viscérale possible (œsophagite, hépatite, pneumopathie), urgence thérapeutique", niveau:"danger"},
    ],
    classes: [
      {classe:"Aciclovir IV — formes sévères, disséminées, ou herpès néonatal", dci:["Aciclovir IV à dose adaptée selon le contexte et l'âge"], specialites:["Zovirax® injectable"], couleur:"#C0392B", remarque:"Urgence thérapeutique pour les formes sévères, disséminées chez l'immunodéprimé, ou suspicion d'herpès néonatal — hospitalisation systématique"},
      {classe:"Aciclovir oral à dose renforcée — eczéma herpeticum modéré chez l'enfant", dci:["Aciclovir oral adapté au poids selon prescription pédiatrique spécialisée"], specialites:["Zovirax® comprimés/suspension"], couleur:"#991B1B", remarque:"Traitement urgent à initier rapidement devant toute suspicion d'eczéma herpeticum chez l'enfant atopique, orientation spécialisée recommandée"},
    ],
    interactions: [
      "Aciclovir IV + médicaments néphrotoxiques : majoration du risque néphrotoxique — hydratation correcte et surveillance rénale impératives",
    ],
    points_cles: [
      "Herpès néonatal : urgence pédiatrique absolue, transmission le plus souvent lors d'une primo-infection génitale maternelle en fin de grossesse",
      "Eczéma herpeticum : urgence dermatologique chez l'enfant atopique, traitement antiviral systémique urgent nécessaire",
      "Immunodépression sévère : formes d'herpès atypiques, extensives ou disséminées, nécessitant souvent un traitement systémique renforcé",
      "Hygiène des mains rigoureuse en cas de lésion herpétique labiale active : prévention de l'auto-inoculation et de la transmission à l'entourage",
      "Toute lésion herpétique atypique, extensive, ou ne cicatrisant pas dans les délais habituels : orientation spécialisée à envisager",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F37 — COVID-19
   ════════════════════════════════════════════════════════ */
FN['covid'] = {
  n2: {
    saviez_vous: "Le SARS-CoV-2 continue d'évoluer avec l'émergence régulière de nouveaux variants, nécessitant une mise à jour périodique de la composition vaccinale (similaire au principe de la grippe) — contrairement à l'idée initiale d'une pandémie ponctuelle suivie d'une immunité durable acquise, la circulation du virus s'inscrit désormais dans une dynamique plus proche d'une infection respiratoire saisonnière récurrente pour la majorité de la population.",
    physiopatho: "Le SARS-CoV-2 pénètre les cellules de l'épithélium respiratoire via la liaison de sa protéine Spike au récepteur ACE2 cellulaire, facilitée par le clivage protéolytique par la protéase TMPRSS2 → réplication virale intracellulaire → dans les formes sévères, une réponse immunitaire dérégulée (orage cytokinique avec libération excessive d'IL-6, TNF-α) contribue aux dommages tissulaires pulmonaires au-delà de l'effet cytopathique viral direct → cette composante inflammatoire explique l'intérêt des traitements immunomodulateurs dans les formes sévères, en complément ou à la place des antiviraux selon le stade évolutif de la maladie.",
    mecanisme: "Antiviraux oraux (nirmatrelvir/ritonavir) : le nirmatrelvir inhibe spécifiquement la protéase virale 3CL (essentielle au clivage des protéines virales précurseurs nécessaires à la réplication) ; le ritonavir, dépourvu d'activité antivirale propre dans cette association, agit comme un inhibiteur puissant du CYP3A4 permettant de ralentir le métabolisme du nirmatrelvir et de maintenir des concentrations plasmatiques efficaces plus longtemps (effet 'booster' pharmacocinétique) → efficacité démontrée pour réduire le risque d'hospitalisation si débuté précocement chez les patients à risque de forme sévère.\n\nVaccination à ARNm : l'ARN messager encapsulé dans des nanoparticules lipidiques pénètre les cellules hôtes et dirige la synthèse transitoire de la protéine Spike virale → présentation de cet antigène au système immunitaire → développement d'une réponse immunitaire protectrice (anticorps neutralisants et immunité cellulaire) sans exposition au virus réel, l'ARNm étant rapidement dégradé après avoir délivré son information.",
    diagnostic: "Test antigénique rapide ou PCR nasopharyngée pour la confirmation diagnostique, particulièrement utile pour orienter la prise en charge (notamment l'éligibilité à un traitement antiviral précoce chez les patients à risque) et pour les mesures de prévention de la transmission (isolement, information de l'entourage). Présentation clinique variable, allant de l'infection asymptomatique aux formes respiratoires sévères, en passant par un tableau pseudo-grippal avec parfois anosmie/agueusie caractéristique (bien que moins fréquente avec les variants plus récents qu'avec les souches initiales).",
    effets_secondaires: [
      {label:"Forme sévère chez les patients à risque (âgés, comorbidités, immunodépression) : risque de pneumopathie hypoxémiante grave", niveau:"danger"},
      {label:"Covid long : symptômes persistants (fatigue, troubles cognitifs, dyspnée) pouvant durer plusieurs mois après l'infection initiale", niveau:"warning"},
      {label:"Myocardite/péricardite (rare, davantage associée à la vaccination chez certains sous-groupes, mais aussi possible lors de l'infection elle-même)", niveau:"warning"},
    ],
    classes: [
      {classe:"Nirmatrelvir/Ritonavir — antiviral oral si débuté précocement chez les patients à risque", dci:["Nirmatrelvir/Ritonavir selon schéma posologique"], specialites:["Paxlovid®"], couleur:"#1B6B52", remarque:"Réservé aux patients à risque de forme sévère, débuté idéalement dans les 5 jours suivant le début des symptômes, nombreuses interactions médicamenteuses à vérifier"},
      {classe:"Vaccination à ARNm — prévention, mise à jour selon les variants circulants", dci:["Vaccin à ARNm adapté aux variants en circulation"], specialites:["Comirnaty®","Spikevax®"], couleur:"#1E3A5F", remarque:"Recommandation de rappel périodique selon les populations à risque et l'évolution épidémiologique, similaire au principe de la vaccination grippale"},
      {classe:"Traitement symptomatique — formes légères ambulatoires", dci:["Paracétamol, hydratation, repos"], specialites:["Doliprane®"], couleur:"#B45309", remarque:"Traitement de référence pour la majorité des formes légères chez les patients sans facteur de risque associé"},
    ],
    interactions: [
      "Nirmatrelvir/Ritonavir + nombreux médicaments métabolisés par le CYP3A4 (statines, certains anticoagulants, immunosuppresseurs) : interactions multiples et potentiellement graves — vérification systématique indispensable avant prescription",
      "Aucune interaction significative pour le vaccin à ARNm avec les traitements courants",
    ],
    points_cles: [
      "Évolution variantielle continue du SARS-CoV-2 : justifie une mise à jour vaccinale périodique, approche similaire à la grippe saisonnière",
      "Nirmatrelvir/Ritonavir : nombreuses interactions médicamenteuses via le CYP3A4, vérification systématique indispensable avant délivrance",
      "Orage cytokinique : composante inflammatoire dérégulée contribuant aux formes sévères, au-delà du seul effet viral direct",
      "Covid long : symptômes persistants possibles après l'infection initiale, à reconnaître et orienter vers une prise en charge adaptée",
      "Test diagnostique : utile pour orienter l'éligibilité à un traitement antiviral précoce et pour les mesures de prévention de la transmission",
    ],
  },
  n3: {
    saviez_vous: "Le mécanisme du 'booster pharmacocinétique' utilisé dans le Paxlovid® (ritonavir potentialisant le nirmatrelvir) est directement hérité des stratégies développées dans le traitement antirétroviral du VIH — illustrant comment des connaissances pharmacologiques acquises dans un domaine thérapeutique peuvent être rapidement transposées et adaptées pour répondre à une urgence sanitaire émergente comme la pandémie de COVID-19.",
    physiopatho: "Covid long et mécanismes physiopathologiques proposés : plusieurs hypothèses, non exclusives, sont avancées pour expliquer la persistance de symptômes après la clairance virale apparente — persistance virale résiduelle dans certains réservoirs tissulaires (intestinal notamment), dysrégulation immunitaire persistante avec inflammation de bas grade chronique, phénomènes auto-immuns déclenchés par l'infection initiale (mimétisme moléculaire), et dysfonction microvasculaire et endothéliale persistante — la compréhension de ces mécanismes reste en évolution active et aucune cause unique ne semble expliquer la totalité des présentations cliniques très hétérogènes du covid long.",
    pharmacocinetique: "Nirmatrelvir : sans le boost par le ritonavir, le nirmatrelvir seul serait rapidement métabolisé par le CYP3A4, limitant son exposition plasmatique efficace — le ritonavir, par son inhibition puissante et quasi complète de ce cytochrome, permet de multiplier significativement l'exposition au nirmatrelvir et de maintenir des concentrations suffisantes pour une efficacité antivirale optimale sur la durée du traitement (5 jours), illustrant un exemple pharmacologique classique de potentialisation par inhibition enzymatique délibérée.",
    cas_clinique: "Patient 68 ans, diabétique de type 2, sous statine et IEC, test antigénique positif au COVID-19 depuis 24h, symptômes modérés sans détresse respiratoire. Souhaite savoir s'il peut bénéficier d'un traitement antiviral. Que vérifiez-vous avant de répondre ?\n\nRaisonnement : patient à risque de forme sévère (âge, diabète) dans la fenêtre d'éligibilité au nirmatrelvir/ritonavir (< 5 jours de symptômes) → vérification impérative des interactions médicamenteuses avant prescription, notamment avec la statine (certaines statines nécessitent une interruption temporaire pendant le traitement en raison du risque de myopathie par inhibition du CYP3A4) — orientation vers le médecin prescripteur pour évaluer l'ensemble du traitement habituel et adapter si besoin (suspension temporaire de certains médicaments incompatibles pendant la durée du traitement antiviral).",
    effets_secondaires: [
      {label:"Nirmatrelvir/Ritonavir + statines métabolisées par CYP3A4 : risque de myopathie sévère par inhibition de leur métabolisme — interruption temporaire souvent nécessaire", niveau:"danger"},
      {label:"Covid long : présentation clinique très hétérogène, parfois difficile à différencier d'autres pathologies chroniques préexistantes", niveau:"warning"},
      {label:"Rebond symptomatique après traitement par nirmatrelvir/ritonavir : phénomène décrit chez certains patients, généralement bénin et transitoire", niveau:"info"},
    ],
    classes: [
      {classe:"Remdesivir IV — alternative si CI au nirmatrelvir/ritonavir", dci:["Remdesivir IV selon protocole, 3 jours"], specialites:["Veklury®"], couleur:"#1E3A5F", remarque:"Antiviral par voie IV, alternative pour les patients avec contre-indications ou interactions majeures empêchant l'usage du nirmatrelvir/ritonavir, nécessite une administration en milieu de soins"},
      {classe:"Corticothérapie — formes sévères avec besoin en oxygène", dci:["Dexaméthasone 6mg/j selon protocole hospitalier"], specialites:["Prise en charge hospitalière"], couleur:"#B45309", remarque:"Indiquée dans les formes sévères nécessitant une oxygénothérapie, bénéfice démontré sur la mortalité dans ce contexte spécifique, pas dans les formes légères ambulatoires"},
    ],
    interactions: [
      "Nirmatrelvir/Ritonavir + simvastatine, lovastatine : CI formelle — interruption indispensable pendant la durée du traitement antiviral",
      "Nirmatrelvir/Ritonavir + anticoagulants oraux directs : ↑ exposition de l'anticoagulant par inhibition du CYP3A4/P-gp — ajustement ou surveillance accrue nécessaire",
    ],
    points_cles: [
      "Booster pharmacocinétique (ritonavir) : stratégie héritée du traitement antirétroviral du VIH, transposée à la COVID-19",
      "Vérification systématique des interactions médicamenteuses avant toute prescription de nirmatrelvir/ritonavir, notamment avec les statines",
      "Covid long : mécanismes physiopathologiques multiples et non exclusifs, compréhension encore en évolution active",
      "Corticothérapie : bénéfice démontré uniquement dans les formes sévères nécessitant une oxygénothérapie, pas dans les formes légères",
      "Remdesivir IV : alternative pour les patients avec contre-indications majeures au traitement antiviral oral de référence",
    ],
  },
  n4: {
    saviez_vous: "La surveillance génomique continue du SARS-CoV-2 à l'échelle mondiale a permis d'identifier rapidement les variants d'intérêt et de préoccupation successifs, guidant l'adaptation des stratégies vaccinales et thérapeutiques — cette infrastructure de surveillance, largement renforcée et internationalement coordonnée depuis le début de la pandémie, constitue désormais un outil de veille sanitaire précieux applicable potentiellement à d'autres menaces infectieuses émergentes futures.",
    physiopatho: "Évolution virale et échappement immunitaire : les mutations successives de la protéine Spike, cible principale de la réponse immunitaire vaccinale et naturelle, peuvent conférer un avantage sélectif au virus en réduisant partiellement la neutralisation par les anticorps préexistants (qu'ils soient d'origine vaccinale ou liés à une infection antérieure) → ce phénomène d'échappement immunitaire partiel explique pourquoi l'immunité acquise, bien que toujours protectrice contre les formes sévères dans la grande majorité des cas, offre une protection moins complète contre l'infection elle-même au fil de l'évolution virale, justifiant les stratégies de mise à jour vaccinale régulière ciblant les variants dominants en circulation.",
    recommandations: "HAS / Santé publique France — COVID-19 : vaccination recommandée selon les populations à risque et l'évolution épidémiologique, avec mise à jour périodique de la composition vaccinale. Traitement antiviral précoce (nirmatrelvir/ritonavir) réservé aux patients à risque de forme sévère, débuté rapidement après vérification systématique des interactions médicamenteuses. Prise en charge symptomatique pour la majorité des formes légères sans facteur de risque. Orientation hospitalière pour les formes avec critères de gravité respiratoire ou systémique.",
    situations_complexes: "COVID-19 et grossesse : risque accru de formes sévères, notamment au 3e trimestre, vaccination recommandée pendant la grossesse (données de sécurité rassurantes disponibles), surveillance rapprochée en cas d'infection confirmée chez la femme enceinte avec facteurs de risque associés.\n\nCOVID-19 chez l'immunodéprimé sévère : réponse vaccinale potentiellement diminuée nécessitant parfois des schémas vaccinaux renforcés ou des doses supplémentaires selon les recommandations spécifiques à cette population, vigilance accrue sur le risque de forme prolongée ou sévère, traitement antiviral à envisager plus largement dans ce contexte à très haut risque.\n\nCovid long pédiatrique : entité reconnue bien que moins fréquente et généralement moins sévère que chez l'adulte, présentation parfois différente (fatigue, troubles de la concentration scolaire), nécessitant une prise en charge adaptée et multidisciplinaire si symptômes invalidants et persistants au-delà de plusieurs semaines.",
    effets_secondaires: [
      {label:"Forme sévère chez l'immunodéprimé : risque accru malgré une vaccination à jour, en raison d'une réponse immunitaire potentiellement diminuée", niveau:"danger"},
      {label:"COVID-19 sévère en grossesse, notamment 3e trimestre : risque accru de complications maternelles et obstétricales", niveau:"danger"},
      {label:"Covid long pédiatrique non reconnu : impact sur la scolarité et le développement si non pris en charge de façon adaptée", niveau:"warning"},
    ],
    classes: [
      {classe:"Schémas vaccinaux renforcés — immunodépression sévère", dci:["Doses additionnelles selon recommandations spécifiques à cette population"], specialites:["Comirnaty®","Spikevax®"], couleur:"#1B6B52", remarque:"Adaptation du schéma vaccinal standard chez les patients immunodéprimés sévères en raison d'une réponse immunitaire potentiellement diminuée"},
      {classe:"Anticorps monoclonaux — prophylaxie pré-exposition chez l'immunodéprimé sévère (selon disponibilité et variants circulants)", dci:["Selon disponibilité et adaptation aux variants en circulation"], specialites:["Disponibilité variable selon l'évolution virale et les autorisations en vigueur"], couleur:"#6B2D5E", remarque:"Option pour les patients ne développant pas de réponse vaccinale suffisante, efficacité dépendante de l'activité contre les variants circulants au moment de l'utilisation"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse spécifique supplémentaire notable pour cette section au-delà de celles déjà mentionnées",
    ],
    points_cles: [
      "Surveillance génomique mondiale du SARS-CoV-2 : infrastructure précieuse, applicable potentiellement à d'autres menaces infectieuses futures",
      "Échappement immunitaire partiel : explique la protection moins complète contre l'infection au fil de l'évolution virale, justifiant la mise à jour vaccinale",
      "Immunodépression sévère : schémas vaccinaux renforcés et vigilance accrue sur le risque de forme prolongée ou sévère",
      "Grossesse : risque accru de formes sévères notamment au 3e trimestre, vaccination recommandée avec données de sécurité rassurantes",
      "Covid long pédiatrique : entité reconnue, présentation parfois différente de l'adulte, nécessitant une prise en charge adaptée si persistant",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F38 — BRONCHIOLITE
   ════════════════════════════════════════════════════════ */
FN['bronchiolite'] = {
  n2: {
    saviez_vous: "Le nirsévimab, anticorps monoclonal anti-VRS administré en injection unique à tous les nourrissons avant leur première saison épidémique, a été introduit en France et a démontré une réduction spectaculaire des hospitalisations pour bronchiolite sévère — une avancée majeure car contrairement à un vaccin classique, il agit par immunisation passive immédiate (apport direct d'anticorps protecteurs) sans nécessiter de réponse immunitaire active du nourrisson, encore immature à cet âge.",
    physiopatho: "La bronchiolite aiguë du nourrisson (< 2 ans) est due le plus souvent au virus respiratoire syncytial (VRS, responsable de 60-80% des cas) → infection des bronchioles (petites voies aériennes distales) → inflammation, œdème de la paroi bronchiolaire et hypersécrétion de mucus → chez le nourrisson, dont les voies aériennes sont anatomiquement très étroites, cette obstruction même modérée a un impact proportionnellement beaucoup plus important sur la résistance au flux aérien (loi de Poiseuille : la résistance varie en fonction inverse de la puissance 4 du rayon) qu'elle n'en aurait chez l'adulte ou l'enfant plus grand, expliquant la sévérité potentielle de cette pathologie à cet âge précis.",
    mecanisme: "Lavage nasal au sérum physiologique : geste de base essentiel, élimine les sécrétions obstruant les voies aériennes supérieures du nourrisson (respirateur nasal exclusif jusqu'à plusieurs mois), facilite la prise alimentaire et améliore le confort respiratoire global, à réaliser avant chaque repas et autant que nécessaire.\n\nKinésithérapie respiratoire : les techniques actuelles recommandées (désencombrement rhinopharyngé) diffèrent des anciennes techniques de clapping/vibration désormais abandonnées par manque de preuve d'efficacité et risque de complications, l'accent étant mis sur le désencombrement des voies aériennes supérieures plutôt que sur des manœuvres thoraciques agressives.",
    diagnostic: "Diagnostic clinique : toux, polypnée, sibilants et/ou crépitants à l'auscultation, dans un contexte épidémique hivernal typique chez un nourrisson de moins de 2 ans. Évaluation systématique des signes de gravité (fréquence respiratoire, signes de lutte respiratoire, saturation en oxygène, capacité à s'alimenter, état d'hydratation) guidant la décision d'orientation ambulatoire ou hospitalière.",
    effets_secondaires: [
      {label:"Signes de gravité à rechercher systématiquement : apnées, cyanose, difficultés alimentaires majeures, épuisement respiratoire — urgence hospitalière", niveau:"danger"},
      {label:"Déshydratation par difficultés alimentaires associées à l'encombrement et à la polypnée", niveau:"warning"},
      {label:"Surinfection bactérienne secondaire (otite moyenne aiguë notamment, fréquemment associée)", niveau:"warning"},
    ],
    classes: [
      {classe:"Nirsévimab — prévention par immunisation passive", dci:["Nirsévimab, injection unique avant la saison VRS"], specialites:["Beyfortus®"], couleur:"#1B6B52", remarque:"Recommandé pour tous les nourrissons avant leur première saison épidémique de VRS, réduction démontrée des hospitalisations sévères"},
      {classe:"Sérum physiologique — geste de base systématique", dci:["Lavage nasal au sérum physiologique"], specialites:["Sterimar®","Physiomer® nourrisson"], couleur:"#1E3A5F", remarque:"Avant chaque repas et autant que nécessaire, geste simple et essentiel pour le confort respiratoire et alimentaire"},
      {classe:"Pas de bronchodilatateurs ni corticoïdes systématiques", dci:["Non recommandés en routine selon les données actuelles"], specialites:["Sauf situations particulières sur avis médical"], couleur:"#B45309", remarque:"Efficacité non démontrée dans la bronchiolite simple du nourrisson, contrairement à l'asthme du grand enfant ou de l'adulte"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse pertinente pour le lavage nasal au sérum physiologique",
    ],
    points_cles: [
      "Nirsévimab : avancée majeure en prévention, immunisation passive immédiate par injection unique avant la saison épidémique",
      "VRS responsable de 60-80% des bronchiolites, pic épidémique hivernal caractéristique",
      "Lavage nasal au sérum physiologique : geste de base essentiel avant chaque repas, pierre angulaire de la prise en charge ambulatoire",
      "Bronchodilatateurs et corticoïdes : non recommandés systématiquement, contrairement à une pratique parfois encore observée par habitude",
      "Signes de gravité (apnées, cyanose, épuisement) : à rechercher systématiquement, urgence hospitalière si présents",
    ],
  },
  n3: {
    saviez_vous: "Les nourrissons les plus à risque de bronchiolite sévère (anciens prématurés, cardiopathie congénitale, pathologie respiratoire chronique) bénéficiaient historiquement d'une prophylaxie mensuelle par palivizumab (anticorps monoclonal anti-VRS de courte durée d'action) pendant toute la saison épidémique — le nirsévimab, à durée d'action beaucoup plus longue (une seule injection couvrant toute la saison), a largement remplacé cette approche plus contraignante, tout en élargissant désormais la protection à l'ensemble des nourrissons et non plus seulement aux populations à très haut risque.",
    physiopatho: "Particularités anatomiques et physiologiques du nourrisson expliquant la sévérité de la bronchiolite : au-delà de l'étroitesse des voies aériennes (loi de Poiseuille), le nourrisson présente une compliance thoracique élevée (cage thoracique souple) associée à des muscles respiratoires encore peu développés et facilement épuisables, une respiration nasale quasi exclusive dans les premiers mois de vie (toute obstruction nasale majore considérablement le travail respiratoire), et une fréquence respiratoire de base déjà élevée limitant les capacités de compensation supplémentaire en cas d'obstruction des voies aériennes — l'ensemble de ces particularités physiologiques explique la vulnérabilité spécifique de cette tranche d'âge face à une pathologie qui resterait bénigne chez un enfant plus grand ou un adulte.",
    pharmacocinetique: "Nirsévimab : anticorps monoclonal à demi-vie prolongée (environ 71 jours grâce à une modification structurale spécifique de la région Fc augmentant sa persistance plasmatique), permettant une protection efficace pendant toute la durée d'une saison épidémique de VRS (5-6 mois) après une seule injection intramusculaire, contrairement au palivizumab qui nécessitait des injections mensuelles répétées en raison d'une demi-vie plasmatique standard beaucoup plus courte.",
    cas_clinique: "Nourrisson de 6 semaines, né à terme, présentant depuis 2 jours une rhinorrhée puis une toux avec polypnée modérée (FR = 55/min), sibilants discrets à l'auscultation, alimentation conservée à environ 80% des apports habituels, pas de signe de lutte respiratoire ni de cyanose. Quelle est votre conduite ?\n\nRaisonnement : bronchiolite débutante sans signe de gravité chez un nourrisson par ailleurs sain, prise en charge ambulatoire appropriée : lavages nasaux réguliers avant les repas, surveillance de l'alimentation et de l'hydratation, fractionnement des repas si besoin, éducation des parents sur les signes d'alerte nécessitant une réévaluation urgente (aggravation de la polypnée, apparition de signes de lutte, refus alimentaire, somnolence anormale). Pas d'indication à un traitement médicamenteux spécifique dans ce tableau non sévère.",
    effets_secondaires: [
      {label:"Aggravation secondaire possible dans les 48-72h suivant le début des symptômes : pic de sévérité classique de la bronchiolite à anticiper", niveau:"warning"},
      {label:"Réévaluation médicale nécessaire en cas d'aggravation des signes respiratoires ou de difficultés alimentaires croissantes", niveau:"warning"},
    ],
    classes: [
      {classe:"Palivizumab — historique, populations à très haut risque (avant généralisation du nirsévimab)", dci:["Palivizumab, injections mensuelles pendant la saison"], specialites:["Synagis®"], couleur:"#555", remarque:"Approche historique nécessitant des injections mensuelles répétées, largement supplantée par le nirsévimab à action prolongée"},
      {classe:"Désobstruction rhinopharyngée — geste de base répété", dci:["Lavage nasal au sérum physiologique avant chaque repas"], specialites:["Sterimar® nourrisson"], couleur:"#1B6B52", remarque:"Pierre angulaire de la prise en charge ambulatoire, à répéter aussi souvent que nécessaire pour le confort respiratoire et alimentaire"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse pertinente pour cette section",
    ],
    points_cles: [
      "Particularités anatomiques et physiologiques du nourrisson : expliquent la vulnérabilité spécifique face à la bronchiolite à cet âge",
      "Nirsévimab : demi-vie prolongée permettant une protection sur toute la saison épidémique en une seule injection",
      "Pic de sévérité classique dans les 48-72h suivant le début des symptômes : à anticiper et expliquer aux parents",
      "Éducation parentale sur les signes d'alerte : élément essentiel de la prise en charge ambulatoire de la bronchiolite simple",
      "Palivizumab : approche historique pour les populations à très haut risque, largement remplacée par le nirsévimab",
    ],
  },
  n4: {
    saviez_vous: "Les recommandations françaises actualisées ont fait évoluer significativement la prise en charge de la bronchiolite, en supprimant la kinésithérapie respiratoire systématique (anciennement très répandue) après que plusieurs études robustes n'ont pas démontré de bénéfice sur l'évolution clinique, voire ont suggéré un possible inconfort ou risque sans bénéfice prouvé — un exemple parlant de la médecine factuelle (evidence-based medicine) modifiant des pratiques pourtant largement ancrées depuis des décennies.",
    physiopatho: "Lien entre bronchiolite sévère et risque ultérieur d'asthme : plusieurs études épidémiologiques de cohorte suggèrent une association entre bronchiolite sévère (notamment à VRS) dans la petite enfance et un risque accru de développer un asthme ou des sibilances récurrentes dans l'enfance ultérieure — la relation causale exacte reste débattue (la bronchiolite sévère pourrait être un marqueur d'une prédisposition préexistante plutôt qu'une cause directe de l'asthme futur, ou les deux mécanismes pourraient coexister), mais cette association justifie une surveillance respiratoire à plus long terme chez les enfants ayant présenté une bronchiolite sévère dans leurs premiers mois de vie.",
    recommandations: "HAS 2019 (actualisée) — Bronchiolite : pas de kinésithérapie respiratoire systématique (techniques de clapping/vibration abandonnées par manque de preuve d'efficacité). Pas de bronchodilatateurs ni corticoïdes en routine. Lavage nasal et surveillance clinique (signes de gravité, alimentation, hydratation) comme piliers de la prise en charge ambulatoire. Nirsévimab recommandé pour tous les nourrissons avant leur première saison épidémique de VRS. Hospitalisation si signes de gravité ou facteurs de risque spécifiques (prématurité, cardiopathie, âge < 6 semaines).",
    situations_complexes: "Bronchiolite chez l'ancien prématuré ou avec cardiopathie congénitale sous-jacente : seuil d'hospitalisation abaissé en raison du risque accru de décompensation et de formes sévères, surveillance plus rapprochée même devant un tableau initialement modéré.\n\nBronchiolites récidivantes : à distinguer de l'asthme du nourrisson qui peut se présenter de façon similaire avec des épisodes récurrents de sibilances, l'évaluation allergologique et le suivi pneumo-pédiatrique pouvant être pertinents en cas de récidives fréquentes pour orienter la prise en charge à plus long terme.\n\nOxygénothérapie et ventilation non invasive en cas de forme sévère hospitalisée : selon le degré de détresse respiratoire et la saturation en oxygène, recours à une oxygénothérapie simple, parfois à une assistance ventilatoire non invasive (lunettes à haut débit, CPAP) dans les formes les plus sévères nécessitant une surveillance en unité spécialisée.",
    effets_secondaires: [
      {label:"Bronchiolite sévère chez l'ancien prématuré ou cardiopathe : risque accru de décompensation et de forme grave nécessitant l'hospitalisation", niveau:"danger"},
      {label:"Forme très sévère nécessitant une assistance ventilatoire : pronostic généralement favorable avec une prise en charge adaptée en milieu spécialisé", niveau:"warning"},
      {label:"Bronchiolites récidivantes méconnues comme possible asthme du nourrisson : retard à une prise en charge spécifique adaptée si pertinente", niveau:"warning"},
    ],
    classes: [
      {classe:"Oxygénothérapie / Ventilation non invasive — formes sévères hospitalisées", dci:["Selon le degré de détresse respiratoire et la saturation"], specialites:["Prise en charge hospitalière pédiatrique spécialisée"], couleur:"#C0392B", remarque:"Réservée aux formes sévères nécessitant une hospitalisation, surveillance en unité spécialisée selon le degré de gravité"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse spécifique supplémentaire notable pour cette section",
    ],
    points_cles: [
      "Kinésithérapie respiratoire systématique : abandonnée par manque de preuve d'efficacité, exemple de médecine factuelle modifiant les pratiques établies",
      "Bronchiolite sévère et risque ultérieur d'asthme : association documentée mais relation causale exacte encore débattue",
      "Seuil d'hospitalisation abaissé chez l'ancien prématuré ou le cardiopathe congénital, même devant un tableau initialement modéré",
      "Bronchiolites récidivantes : à distinguer de l'asthme du nourrisson, évaluation spécialisée pertinente en cas de récidives fréquentes",
      "Prise en charge ambulatoire reposant essentiellement sur la surveillance clinique et le lavage nasal, sans traitement médicamenteux systématique",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F39 — FIÈVRE DE L'ENFANT
   ════════════════════════════════════════════════════════ */
FN['fievre-enfant'] = {
  n2: {
    saviez_vous: "La fièvre chez l'enfant n'est pas une maladie en elle-même mais un symptôme témoignant d'une réponse immunitaire normale de l'organisme face à une infection (le plus souvent virale et bénigne) — l'objectif du traitement n'est pas de faire systématiquement baisser la température à tout prix mais d'améliorer le confort de l'enfant lorsque la fièvre s'accompagne d'un inconfort significatif, distinction importante souvent mal comprise par les parents.",
    physiopatho: "La fièvre résulte d'une élévation régulée du point de consigne thermique hypothalamique en réponse à des pyrogènes endogènes (notamment l'IL-1, l'IL-6 et le TNF-α, libérés par les cellules immunitaires activées face à une infection ou une inflammation) → ces cytokines stimulent la production de prostaglandines E2 au niveau hypothalamique → élévation du point de consigne → l'organisme déclenche des mécanismes physiologiques (vasoconstriction périphérique, frissons) pour atteindre cette nouvelle consigne thermique plus élevée, processus actif et régulé distinct d'une simple 'panne' du système de thermorégulation.",
    mecanisme: "Paracétamol : mécanisme d'action exact encore partiellement débattu, impliquant probablement une inhibition centrale de la synthèse des prostaglandines (action préférentiellement centrale plutôt que périphérique, contrairement aux AINS) → effet antipyrétique et antalgique sans action anti-inflammatoire périphérique significative, profil de tolérance favorable aux doses recommandées en faisant le traitement de référence chez l'enfant.\n\nIbuprofène (alternative ou en cas d'inefficacité du paracétamol seul) : inhibition des cyclo-oxygénases (COX-1 et COX-2) → réduction de la synthèse des prostaglandines à la fois centrale et périphérique → effet antipyrétique, antalgique et anti-inflammatoire, mais profil de tolérance digestive et rénale à surveiller, notamment en cas de déshydratation associée.",
    diagnostic: "Mesure de la température rectale (référence chez le jeune nourrisson) ou auriculaire/axillaire selon l'âge, fièvre définie par une température ≥ 38°C. L'évaluation clinique globale de l'enfant (état général, comportement, capacité à interagir, signes de déshydratation, recherche d'un foyer infectieux) est plus importante que la valeur chiffrée de température elle-même pour évaluer la gravité potentielle.",
    effets_secondaires: [
      {label:"Aspirine chez l'enfant en contexte viral : CI formelle, risque de syndrome de Reye potentiellement fatal", niveau:"danger"},
      {label:"Surdosage en paracétamol (erreur de dosage fréquente, notamment confusion entre formes pédiatriques) : hépatotoxicité grave", niveau:"danger"},
      {label:"Convulsions fébriles (chez l'enfant prédisposé) : généralement bénignes mais impressionnantes pour l'entourage", niveau:"warning"},
    ],
    classes: [
      {classe:"Paracétamol — traitement de référence", dci:["Paracétamol 15mg/kg/prise, max 4 prises/j, dose pondérale stricte"], specialites:["Doliprane®","Dafalgan®"], couleur:"#1B6B52", remarque:"Dose calculée strictement selon le poids de l'enfant, vérifier systématiquement la concentration de la forme galénique utilisée pour éviter les erreurs de dosage"},
      {classe:"Ibuprofène — alternative selon contexte clinique", dci:["Ibuprofène 7,5-10mg/kg/prise, max 3 prises/j"], specialites:["Advil®","Nurofen® enfant"], couleur:"#1E3A5F", remarque:"À éviter en cas de varicelle (risque accru de complications cutanées bactériennes graves) et de déshydratation significative"},
      {classe:"Mesures non médicamenteuses — confort de l'enfant", dci:["Hydratation, vêtements légers, pièce non surchauffée"], specialites:["Non médicamenteux"], couleur:"#B45309", remarque:"Éviter le découvrement excessif ou les bains froids brutaux, privilégier des mesures douces et progressives"},
    ],
    interactions: [
      "Paracétamol + ibuprofène en alternance : pratique non recommandée en routine, complexité et risque accru d'erreur de dosage sans bénéfice clinique démontré",
      "Aspirine + infection virale chez l'enfant : CI absolue formelle (syndrome de Reye)",
    ],
    points_cles: [
      "Fièvre = symptôme d'une réponse immunitaire normale, pas une maladie en soi : objectif = confort, pas normalisation systématique de la température",
      "Dose de paracétamol strictement pondérale (15mg/kg/prise) : vérifier systématiquement la concentration de la forme utilisée",
      "Ibuprofène à éviter en cas de varicelle : risque accru de complications cutanées bactériennes graves démontré",
      "Aspirine formellement contre-indiquée chez l'enfant en contexte viral : risque de syndrome de Reye",
      "Évaluation clinique globale de l'enfant plus importante que la valeur chiffrée de température pour juger de la gravité potentielle",
    ],
  },
  n3: {
    saviez_vous: "Les convulsions fébriles simples (généralisées, brèves, sans déficit neurologique post-critique, chez un enfant entre 6 mois et 5 ans sans antécédent neurologique) ont un excellent pronostic et ne nécessitent généralement pas d'exploration approfondie systématique au-delà de la recherche de la cause de la fièvre elle-même — un point essentiel à expliquer aux parents souvent très inquiets devant cet événement impressionnant mais habituellement bénin dans ce contexte précis.",
    physiopatho: "Mécanisme des convulsions fébriles : le cerveau immature de l'enfant entre 6 mois et 5 ans présente un seuil épileptogène physiologiquement plus bas que celui de l'enfant plus grand ou de l'adulte, le rendant plus susceptible aux décharges neuronales paroxystiques en cas d'élévation thermique rapide (la vitesse d'ascension thermique semble jouer un rôle au moins aussi important que la valeur absolue de température atteinte) → cette susceptibilité diminue progressivement avec la maturation cérébrale, expliquant la raréfaction de ces convulsions au-delà de 5 ans, sans qu'il s'agisse pour la grande majorité des cas d'un authentique trouble épileptique sous-jacent.",
    pharmacocinetique: "Paracétamol pédiatrique : absorption orale rapide, métabolisme hépatique principalement par glucuronoconjugaison et sulfoconjugaison chez l'enfant (voies de maturation différente de celle de l'adulte, avec une moindre contribution de la voie oxydative CYP2E1 génératrice du métabolite toxique NAPQI à dose thérapeutique), élimination rénale des métabolites — la marge de sécurité est bonne aux doses recommandées mais se réduit fortement en cas de surdosage, le risque hépatotoxique restant bien réel si la dose pondérale n'est pas respectée.",
    cas_clinique: "Enfant de 18 mois, fièvre à 39,5°C depuis 6h, présente une crise convulsive généralisée tonico-clonique durant environ 2 minutes, résolution spontanée, retour à un état de conscience normal en quelques minutes sans déficit neurologique apparent. Premier épisode de ce type. Quelle est votre conduite et information aux parents ?\n\nRaisonnement : tableau typique de convulsion fébrile simple (généralisée, brève, résolution spontanée sans séquelle, tranche d'âge typique). Orientation pour un avis médical afin de rechercher la cause de la fièvre et confirmer le caractère simple de la convulsion, rassurer les parents sur l'excellent pronostic de ce type d'épisode dans ce contexte, expliquer les mesures de sécurité en cas de récidive (mettre l'enfant en position latérale de sécurité, ne pas tenter d'introduire quoi que ce soit dans la bouche), pas d'indication à un traitement antiépileptique préventif au long cours pour une convulsion fébrile simple isolée.",
    effets_secondaires: [
      {label:"Convulsion fébrile complexe (durée > 15 min, focale, récidive dans les 24h, déficit post-critique) : nécessite une exploration plus approfondie", niveau:"warning"},
      {label:"Anxiété parentale majeure souvent associée à cet événement, nécessitant une information rassurante et claire", niveau:"info"},
      {label:"Récidive de convulsions fébriles : possible chez environ 30% des enfants ayant présenté un premier épisode, sans gravité accrue pour autant", niveau:"info"},
    ],
    classes: [
      {classe:"Diazépam intrarectal — convulsion fébrile prolongée (> 5 minutes)", dci:["Diazépam intrarectal selon poids, en cas de convulsion prolongée"], specialites:["Valium® intrarectal"], couleur:"#B45309", remarque:"Indication si la convulsion se prolonge au-delà de 5 minutes, à utiliser selon un protocole établi avec les parents si récidives connues"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse spécifique pertinente pour cette section",
    ],
    points_cles: [
      "Convulsion fébrile simple : excellent pronostic, ne nécessite pas d'exploration approfondie systématique au-delà de la cause de la fièvre",
      "Seuil épileptogène physiologiquement plus bas chez le jeune enfant : explique la susceptibilité particulière à cette tranche d'âge",
      "Vitesse d'ascension thermique : pourrait jouer un rôle au moins aussi important que la valeur absolue de température",
      "Pas de traitement antiépileptique préventif au long cours pour une convulsion fébrile simple isolée",
      "Information et réassurance parentale : élément essentiel de la prise en charge devant cet événement impressionnant mais généralement bénin",
    ],
  },
  n4: {
    saviez_vous: "Les outils d'aide à la décision clinique (comme l'échelle NICE 'traffic light system') permettent une évaluation structurée et standardisée du risque de pathologie grave sous-jacente chez l'enfant fébrile, classant les signes cliniques en zones vert/jaune/rouge selon leur valeur prédictive — ces outils, bien que ne remplaçant jamais le jugement clinique global, contribuent à harmoniser et sécuriser la décision d'orientation (surveillance ambulatoire versus exploration ou hospitalisation) face à un symptôme aussi fréquent mais potentiellement révélateur d'une pathologie grave dans une minorité de cas.",
    physiopatho: "Spécificités de la fièvre selon l'âge et risque de pathologie bactérienne sévère : chez le nourrisson de moins de 3 mois, le risque d'infection bactérienne sévère (méningite, infection urinaire haute, bactériémie) est proportionnellement plus élevé et la présentation clinique souvent plus pauvre et moins spécifique que chez l'enfant plus grand (le système immunitaire encore immature et l'absence de localisation symptomatique claire rendant l'évaluation clinique seule moins fiable à cet âge) → ce constat justifie un seuil d'exploration et d'hospitalisation nettement plus bas chez le très jeune nourrisson fébrile par rapport à l'enfant plus grand présentant un tableau similaire.",
    recommandations: "HAS / SFP (Société Française de Pédiatrie) — Fièvre de l'enfant : paracétamol en 1ère intention si inconfort associé à la fièvre, dose strictement pondérale. Pas d'alternance systématique paracétamol-ibuprofène en routine. Évaluation clinique structurée (utilisant des outils comme l'échelle NICE) pour orienter la décision de surveillance ambulatoire versus exploration complémentaire. Seuil d'exploration et d'hospitalisation abaissé chez le nourrisson de moins de 3 mois, en raison du risque proportionnellement plus élevé d'infection bactérienne sévère à cet âge.",
    situations_complexes: "Fièvre chez le nourrisson de moins de 3 mois : seuil de vigilance maximal, toute fièvre à cet âge justifie une évaluation médicale rapide en raison du risque accru d'infection bactérienne sévère et de la difficulté d'évaluation clinique à cet âge précoce, bilan complémentaire (notamment bilan sanguin, examen des urines) souvent nécessaire selon le contexte et l'âge précis.\n\nFièvre persistante ou récurrente sans cause identifiée : au-delà d'une certaine durée d'évolution sans diagnostic, orientation pédiatrique spécialisée pour rechercher une cause sous-jacente moins fréquente (maladie inflammatoire, néoplasie, cause infectieuse atypique) après avoir éliminé les causes les plus fréquentes et bénignes.\n\nFièvre chez l'enfant drépanocytaire ou immunodéprimé : seuil de vigilance et d'exploration également abaissé en raison du risque accru de complications infectieuses sévères (notamment infections à germes encapsulés chez le drépanocytaire en raison de l'asplénie fonctionnelle associée), prise en charge souvent plus rapide et plus invasive que pour un enfant sans cette comorbidité.",
    effets_secondaires: [
      {label:"Infection bactérienne sévère méconnue chez le nourrisson de moins de 3 mois : retard diagnostique potentiellement grave (méningite, bactériémie)", niveau:"danger"},
      {label:"Fièvre chez l'enfant drépanocytaire non explorée rapidement : risque accru de complications infectieuses sévères liées à l'asplénie fonctionnelle", niveau:"danger"},
      {label:"Sur-médicalisation et anxiété excessive devant une fièvre bénigne banale chez l'enfant plus grand sans signe de gravité", niveau:"info"},
    ],
    classes: [
      {classe:"Bilan infectieux complémentaire — nourrisson de moins de 3 mois fébrile", dci:["Bilan sanguin, examen des urines selon protocole"], specialites:["Évaluation hospitalière ou pédiatrique spécialisée"], couleur:"#C0392B", remarque:"Souvent nécessaire à cet âge en raison du risque accru d'infection bactérienne sévère et de la difficulté d'évaluation clinique seule"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse spécifique supplémentaire notable pour cette section",
    ],
    points_cles: [
      "Échelle NICE (traffic light system) : outil structuré d'aide à la décision, ne remplaçant jamais le jugement clinique global",
      "Nourrisson de moins de 3 mois fébrile : seuil d'exploration et d'hospitalisation nettement plus bas en raison du risque accru d'infection sévère",
      "Présentation clinique souvent pauvre et peu spécifique de l'infection bactérienne sévère chez le très jeune nourrisson",
      "Enfant drépanocytaire fébrile : seuil de vigilance abaissé en raison du risque accru de complications infectieuses liées à l'asplénie fonctionnelle",
      "Fièvre persistante sans cause identifiée au-delà d'une durée raisonnable : orientation pédiatrique spécialisée pour exploration approfondie",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F40 — VARICELLE
   ════════════════════════════════════════════════════════ */
FN['varicelle'] = {
  n2: {
    saviez_vous: "L'ibuprofène et les AINS en général sont formellement déconseillés en cas de varicelle, en raison d'un risque significativement accru de complications cutanées bactériennes sévères (dermohypodermite, fasciite nécrosante) — un message essentiel à transmettre systématiquement aux parents demandant un antipyrétique pour un enfant varicelleux fébrile, le paracétamol restant le traitement de référence dans ce contexte précis.",
    physiopatho: "Le virus varicelle-zona (VZV) se transmet par voie aérienne (gouttelettes respiratoires) ou par contact direct avec les lésions cutanées → après une incubation de 10-21 jours, virémie et dissémination cutanée généralisée → éruption vésiculeuse prurigineuse évoluant par poussées successives sur plusieurs jours, donnant l'aspect caractéristique de lésions d'âges différents coexistant simultanément (macules, papules, vésicules, croûtes) → après la guérison clinique, le virus reste latent dans les ganglions sensitifs rachidiens et crâniens, pouvant se réactiver des décennies plus tard sous forme de zona.",
    mecanisme: "Antihistaminiques (pour le prurit associé) : blocage des récepteurs H1 périphériques → réduction du prurit souvent intense et invalidant associé à l'éruption, utile pour le confort de l'enfant et la prévention du grattage qui favorise la surinfection bactérienne secondaire des lésions.\n\nParacétamol (antipyrétique de référence) : à privilégier formellement par rapport à l'ibuprofène dans ce contexte précis, en raison du risque accru de complications cutanées bactériennes sévères démontré avec les AINS lors de la varicelle.",
    diagnostic: "Diagnostic clinique évident dans l'immense majorité des cas devant l'éruption caractéristique (lésions d'âges différents coexistant, prurigineuses, touchant le cuir chevelu, le tronc, puis les membres de façon centrifuge) associée à une fébricule modérée, dans un contexte épidémique ou de contage connu. Pas d'examen complémentaire nécessaire pour les formes typiques non compliquées chez l'enfant immunocompétent.",
    effets_secondaires: [
      {label:"Ibuprofène/AINS : risque accru de complications cutanées bactériennes sévères (dermohypodermite, fasciite nécrosante) — CI formelle", niveau:"danger"},
      {label:"Aspirine : CI absolue (syndrome de Reye), comme pour toute infection virale chez l'enfant", niveau:"danger"},
      {label:"Surinfection bactérienne des lésions de grattage : complication la plus fréquente, favorisée par le prurit intense", niveau:"warning"},
    ],
    classes: [
      {classe:"Paracétamol — antipyrétique de référence", dci:["Paracétamol 15mg/kg/prise selon poids"], specialites:["Doliprane®","Dafalgan®"], couleur:"#1B6B52", remarque:"À privilégier formellement par rapport à l'ibuprofène en cas de varicelle, en raison du risque accru de complications cutanées"},
      {classe:"Antihistaminiques — confort, réduction du prurit", dci:["Cétirizine ou desloratadine selon l'âge"], specialites:["Zyrtec®","Aerius®"], couleur:"#1E3A5F", remarque:"Utile pour limiter le grattage et le risque de surinfection bactérienne secondaire des lésions, antiH1 2G préférés"},
      {classe:"Antiseptiques locaux doux — hygiène des lésions", dci:["Chlorhexidine aqueuse diluée ou solution antiseptique douce"], specialites:["Diverses formulations adaptées à l'enfant"], couleur:"#B45309", remarque:"Toilette douce quotidienne avec un antiseptique adapté, éviter le talc et les produits asséchants agressifs"},
    ],
    interactions: [
      "Ibuprofène/AINS + varicelle : interaction physiopathologique délétère (pas pharmacocinétique) à connaître et expliquer systématiquement",
    ],
    points_cles: [
      "Ibuprofène et AINS formellement déconseillés en cas de varicelle : risque accru de complications cutanées bactériennes sévères",
      "Paracétamol = antipyrétique de référence systématique en cas de varicelle, message essentiel à transmettre aux parents",
      "Lésions d'âges différents coexistant simultanément : signature clinique caractéristique de l'éruption varicelleuse",
      "Prurit intense à traiter activement (antihistaminiques) pour limiter le grattage et le risque de surinfection",
      "Éviction scolaire recommandée jusqu'à la guérison complète des lésions (stade croûteux sec) selon les recommandations en vigueur",
    ],
  },
  n3: {
    saviez_vous: "La varicelle de l'adulte, plus rare car la grande majorité contracte la maladie dans l'enfance, est significativement plus sévère que chez l'enfant — avec un risque accru de pneumopathie varicelleuse, complication potentiellement grave nécessitant parfois une hospitalisation et un traitement antiviral systémique, contrairement à la forme habituellement bénigne et spontanément résolutive de l'enfant immunocompétent.",
    physiopatho: "Varicelle chez la femme enceinte : risque variable selon le trimestre de survenue — au 1er trimestre, risque (bien que faible, environ 1-2%) de syndrome de varicelle congénitale (malformations cutanées, oculaires, neurologiques et squelettiques) lié au passage transplacentaire du virus pendant l'organogenèse ; en période périnatale (5 jours avant à 2 jours après l'accouchement), risque de varicelle néonatale sévère car le nouveau-né ne bénéficie pas du transfert protecteur des anticorps maternels habituellement acquis si l'infection maternelle est suffisamment ancienne avant l'accouchement pour permettre ce transfert.",
    pharmacocinetique: "Aciclovir oral chez l'enfant (varicelle compliquée ou terrain à risque) : biodisponibilité orale limitée (15-20%), nécessitant des doses répétées (5 prises/jour) pour maintenir des concentrations efficaces, métabolisme minime, élimination rénale prédominante sous forme inchangée → ajustement nécessaire en cas d'insuffisance rénale, profil pharmacocinétique similaire chez l'enfant et l'adulte avec adaptation posologique au poids.",
    cas_clinique: "Femme de 28 ans, enceinte de 32 semaines d'aménorrhée, non immunisée contre la varicelle (sérologie négative documentée en début de grossesse), contact rapproché avec un enfant varicelleux il y a 48h. Que proposez-vous ?\n\nRaisonnement : femme enceinte non immune avec contage récent (< 96h, fenêtre d'efficacité optimale) à un stade de grossesse où le risque materno-fœtal de varicelle périnatale n'est pas encore concerné (trop précoce par rapport au terme) mais où une varicelle maternelle sévère reste possible → discussion en urgence avec l'obstétricien/infectiologue pour une prophylaxie post-exposition par immunoglobulines spécifiques anti-VZV si disponibles et dans les délais, ou surveillance rapprochée avec aciclovir précoce en cas de développement de symptômes, en raison du risque de pneumopathie varicelleuse maternelle sévère possible à cet âge gestationnel.",
    effets_secondaires: [
      {label:"Pneumopathie varicelleuse de l'adulte (notamment femme enceinte) : complication grave nécessitant souvent une hospitalisation", niveau:"danger"},
      {label:"Syndrome de varicelle congénitale (1er trimestre) : malformations potentiellement sévères et définitives", niveau:"danger"},
      {label:"Varicelle néonatale périnatale : forme potentiellement très sévère par absence de transfert protecteur d'anticorps maternels", niveau:"danger"},
    ],
    classes: [
      {classe:"Immunoglobulines spécifiques anti-VZV — prophylaxie post-exposition chez la femme enceinte non immune", dci:["Immunoglobulines anti-VZV selon protocole spécialisé"], specialites:["Varitect® ou équivalent selon disponibilité"], couleur:"#991B1B", remarque:"À administrer rapidement après un contage chez la femme enceinte non immune, selon avis spécialisé obstétrico-infectiologique"},
      {classe:"Aciclovir oral — varicelle de l'adulte ou terrain à risque", dci:["Aciclovir 800mg × 5/j selon prescription"], specialites:["Zovirax® comprimés"], couleur:"#1B6B52", remarque:"Indiqué chez l'adulte (risque de forme plus sévère), la femme enceinte symptomatique, ou l'enfant à risque de complication, débuté précocement"},
    ],
    interactions: [
      "Aciclovir oral + néphrotoxiques : majoration du risque néphrotoxique, hydratation correcte recommandée pendant le traitement",
    ],
    points_cles: [
      "Varicelle de l'adulte : significativement plus sévère que chez l'enfant, risque accru de pneumopathie varicelleuse",
      "Varicelle en grossesse : risque variable selon le trimestre, syndrome de varicelle congénitale au 1er trimestre, varicelle néonatale en période périnatale",
      "Immunoglobulines spécifiques anti-VZV : option de prophylaxie post-exposition chez la femme enceinte non immune après contage récent",
      "Aciclovir oral : indiqué chez l'adulte, la femme enceinte symptomatique, ou l'enfant à risque, à débuter précocement pour une efficacité optimale",
      "Vérification du statut immunitaire (sérologie) recommandée en début de grossesse pour anticiper la conduite à tenir en cas de contage",
    ],
  },
  n4: {
    saviez_vous: "La vaccination contre la varicelle, bien que disponible et efficace, n'est pas recommandée systématiquement pour tous les enfants en France (contrairement à certains pays comme les États-Unis) — elle est ciblée sur des populations spécifiques (adolescents et adultes non immuns à risque d'exposition, personnel de santé non immun, contacts de personnes immunodéprimées), une stratégie différente de vaccination universelle reflétant des choix de santé publique distincts selon les pays, fondés sur des analyses bénéfice-risque populationnelles différentes.",
    physiopatho: "Varicelle chez l'enfant immunodéprimé : risque de forme grave et disséminée (atteinte cutanée extensive, complications viscérales potentielles incluant pneumopathie, hépatite, encéphalite) en raison de l'incapacité du système immunitaire affaibli à contrôler efficacement la dissémination virale initiale, contrairement à l'enfant immunocompétent chez qui l'infection reste habituellement localisée à la peau et aux muqueuses avec une évolution spontanément favorable — cette vulnérabilité particulière justifie une prise en charge proactive et souvent un traitement antiviral systémique précoce chez tout enfant immunodéprimé exposé ou infecté.",
    recommandations: "HAS / Calendrier vaccinal — Varicelle : vaccination ciblée recommandée pour les adolescents (12-18 ans) et adultes non immuns à risque d'exposition (notamment professionnels en contact avec la petite enfance, personnel de santé, femmes en âge de procréer sans antécédent de varicelle après vérification sérologique), contacts familiaux de personnes immunodéprimées non immuns. Pas de vaccination universelle systématique de tous les nourrissons en France, à la différence de la stratégie adoptée dans d'autres pays.",
    situations_complexes: "Varicelle chez l'enfant immunodéprimé (chimiothérapie, corticothérapie au long cours, déficit immunitaire congénital) : traitement antiviral systémique précoce systématique dès la suspicion clinique, sans attendre la confirmation, en raison du risque de forme grave et disséminée, hospitalisation à discuter selon la sévérité et le contexte d'immunodépression.\n\nExposition d'un enfant immunodéprimé non immun à un cas de varicelle : immunoglobulines spécifiques anti-VZV en prophylaxie post-exposition à discuter rapidement avec le spécialiste référent, en raison du risque élevé de forme grave en l'absence de cette protection.\n\nVaccination contre le zona chez l'adulte ayant eu la varicelle dans l'enfance : distincte de la vaccination contre la varicelle elle-même, recommandée chez les personnes âgées ou à risque selon les recommandations spécifiques (cf. fiche zona), visant à prévenir la réactivation du virus resté latent depuis la varicelle initiale.",
    effets_secondaires: [
      {label:"Varicelle disséminée chez l'enfant immunodéprimé : pronostic vital potentiellement engagé sans traitement antiviral précoce", niveau:"danger"},
      {label:"Encéphalite varicelleuse (rare mais grave) : complication neurologique possible, notamment chez l'immunodéprimé", niveau:"danger"},
      {label:"Exposition non protégée d'un immunodéprimé non immun : risque élevé de forme grave si pas de prophylaxie rapide", niveau:"danger"},
    ],
    classes: [
      {classe:"Aciclovir IV — varicelle grave ou disséminée chez l'immunodéprimé", dci:["Aciclovir IV à dose adaptée selon le poids et la fonction rénale"], specialites:["Zovirax® injectable"], couleur:"#C0392B", remarque:"Traitement systématique et précoce dès suspicion clinique chez l'enfant immunodéprimé, hospitalisation à discuter selon la sévérité"},
      {classe:"Vaccin varicelle — vaccination ciblée selon les populations à risque", dci:["Vaccin vivant atténué, 2 doses"], specialites:["Varivax®","Varilrix®"], couleur:"#1B6B52", remarque:"Réservé aux populations cibles spécifiques (adolescents/adultes non immuns à risque), CI formelle chez l'immunodéprimé (vaccin vivant)"},
    ],
    interactions: [
      "Vaccin varicelle (vivant atténué) + immunodépression : CI formelle, comme tout vaccin vivant chez cette population à risque",
      "Aciclovir IV + autres néphrotoxiques : majoration du risque néphrotoxique, surveillance rénale et hydratation adaptée nécessaires",
    ],
    points_cles: [
      "Vaccination varicelle : ciblée sur des populations spécifiques en France, pas universelle contrairement à d'autres pays",
      "Enfant immunodéprimé exposé ou infecté : traitement antiviral systémique précoce et systématique, sans attendre la confirmation",
      "Vaccin varicelle vivant atténué : contre-indication formelle chez l'immunodéprimé, alternative par immunoglobulines en post-exposition",
      "Encéphalite varicelleuse : complication rare mais grave, à évoquer devant tout signe neurologique associé à une varicelle",
      "Distinction entre vaccination varicelle (prévention de la primo-infection) et vaccination zona (prévention de la réactivation) chez l'adulte",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F41 — PIQÛRE DE MOUSTIQUE
   ════════════════════════════════════════════════════════ */
FN['piqure-moustique'] = {
  n2: {
    saviez_vous: "Les répulsifs anti-moustiques à base de DEET (N,N-diéthyl-m-toluamide) restent les plus efficaces et les plus largement étudiés sur le plan de la sécurité parmi toutes les substances disponibles, malgré une image parfois négative auprès du grand public — leur usage est cependant encadré par des règles de concentration et d'âge précises, notamment chez l'enfant et la femme enceinte, pour un rapport bénéfice-risque optimal.",
    physiopatho: "La réaction cutanée à la piqûre de moustique résulte d'une réponse immunitaire locale à la salive injectée lors de la piqûre (contenant des protéines anticoagulantes et vasodilatatrices facilitant le repas sanguin du moustique) → reconnaissance de ces protéines étrangères par le système immunitaire local → dégranulation mastocytaire avec libération d'histamine → vasodilatation, œdème localisé et prurit caractéristiques de la papule prurigineuse classique, dont l'intensité varie selon le degré de sensibilisation immunitaire individuelle (certaines personnes étant beaucoup plus réactives que d'autres à un nombre identique de piqûres).",
    mecanisme: "Antihistaminiques topiques ou oraux : blocage des récepteurs H1 → réduction du prurit et de l'inflammation locale associés à la piqûre, traitement symptomatique de référence pour le confort, particulièrement utile en cas de réactions locales importantes ou multiples piqûres.\n\nRépulsifs cutanés (DEET, icaridine, IR3535) : agissent en perturbant la détection olfactive du moustique vis-à-vis des composés volatils émis par la peau humaine (notamment l'acide lactique et le CO2 expiré), créant une barrière chimique répulsive plutôt qu'insecticide, efficacité et durée d'action variables selon la concentration et la molécule utilisée.",
    diagnostic: "Diagnostic clinique évident devant la papule prurigineuse typique apparaissant après exposition. Distinction à faire avec une réaction allergique plus importante (œdème extensif, urticaire généralisée) qui peut nécessiter un traitement plus spécifique, et avec une surinfection bactérienne secondaire favorisée par le grattage (érythème extensif, chaleur locale, écoulement purulent).",
    effets_secondaires: [
      {label:"Surinfection bactérienne secondaire (impétiginisation) favorisée par le grattage intense des lésions", niveau:"warning"},
      {label:"Réaction allergique locale importante (œdème extensif au-delà de la simple papule) chez les sujets sensibilisés", niveau:"warning"},
      {label:"DEET concentré : irritation cutanée ou oculaire possible en cas d'usage inapproprié ou de concentration excessive selon l'âge", niveau:"info"},
    ],
    classes: [
      {classe:"Antihistaminiques topiques — traitement symptomatique de la piqûre", dci:["Diphenhydramine ou autre antihistaminique topique"], specialites:["Diverses formulations en gel ou crème"], couleur:"#1B6B52", remarque:"Application locale pour réduire le prurit et l'inflammation, efficacité généralement satisfaisante pour les réactions simples"},
      {classe:"Antihistaminiques oraux — réactions plus marquées ou multiples piqûres", dci:["Cétirizine, desloratadine selon l'âge"], specialites:["Zyrtec®","Aerius®"], couleur:"#1E3A5F", remarque:"Utile en cas de prurit important ou de réactions multiples, antiH1 2G préférés pour le profil de tolérance"},
      {classe:"Répulsifs cutanés — prévention", dci:["DEET 20-50% selon l'âge","Icaridine 20-25%","IR3535"], specialites:["Diverses marques selon la substance active"], couleur:"#B45309", remarque:"Concentration et molécule à adapter selon l'âge (enfant, femme enceinte) et la zone géographique d'exposition (risque vectoriel local)"},
    ],
    interactions: [
      "Répulsifs cutanés + écrans solaires : appliquer l'écran solaire en premier, puis le répulsif environ 20 minutes après, pour ne pas diluer l'efficacité de chacun",
    ],
    points_cles: [
      "DEET : répulsif le plus efficace et le plus étudié, usage encadré par des règles de concentration et d'âge précises",
      "Réaction cutanée = réponse immunitaire à la salive du moustique injectée lors de la piqûre, intensité variable selon la sensibilisation individuelle",
      "Antihistaminiques (topiques ou oraux) : traitement symptomatique de référence pour le prurit et l'inflammation locale",
      "Surinfection bactérienne secondaire : complication la plus fréquente, favorisée par le grattage des lésions",
      "Ordre d'application important si écran solaire et répulsif utilisés ensemble : écran solaire en premier, répulsif environ 20 minutes après",
    ],
  },
  n3: {
    saviez_vous: "Le risque vectoriel des moustiques varie considérablement selon les espèces et les zones géographiques — le moustique tigre (Aedes albopictus), désormais bien implanté dans plusieurs régions de France métropolitaine, est un vecteur potentiel de la dengue, du chikungunya et du Zika, justifiant une vigilance épidémiologique accrue et des mesures de lutte anti-vectorielle spécifiques dans les zones où sa présence est confirmée, bien différentes de la simple gêne occasionnée par les piqûres de moustiques communs.",
    physiopatho: "Réactions cutanées sévères aux piqûres de moustiques (syndrome de Skeeter) : certains individus, notamment les enfants jeunes ou les personnes nouvellement exposées à une espèce de moustique non rencontrée auparavant (voyage dans une zone géographique différente), peuvent développer des réactions locales exagérées (œdème important, parfois fébricule associée, vésiculo-bulles) liées à une hypersensibilité accrue plutôt qu'à une simple réaction histaminique standard — ce tableau, bien que impressionnant, reste généralement bénin et régresse avec un traitement symptomatique adapté, mais peut nécessiter une distinction attentive avec une authentique cellulite infectieuse bactérienne.",
    pharmacocinetique: "DEET : absorption cutanée variable selon la concentration et la formulation (environ 5-15% de la dose appliquée), métabolisme hépatique partiel, élimination rénale principalement — l'absorption systémique aux concentrations et fréquences d'application recommandées reste dans une marge de sécurité acceptable selon les études de toxicologie disponibles, justifiant son large usage encadré malgré des inquiétudes parfois disproportionnées du grand public.",
    cas_clinique: "Enfant de 3 ans présentant après un voyage en zone tropicale une réaction cutanée importante au site de plusieurs piqûres de moustiques : œdème significatif, légère fébricule à 37,8°C, sans signe d'infection bactérienne franche (pas de chaleur intense localisée ni d'écoulement purulent). Que suspectez-vous et que proposez-vous ?\n\nRaisonnement : tableau évocateur d'un syndrome de Skeeter (réaction d'hypersensibilité exagérée aux piqûres de moustiques, fréquente chez l'enfant notamment lors d'une exposition à une espèce non rencontrée auparavant) plutôt qu'une cellulite infectieuse bactérienne authentique. Traitement symptomatique par antihistaminique oral et application locale de corticoïde faible si besoin, surveillance de l'évolution dans les 24-48h pour s'assurer de l'absence de signe de surinfection bactérienne secondaire qui justifierait alors une réévaluation et un traitement antibiotique adapté.",
    effets_secondaires: [
      {label:"Syndrome de Skeeter : impressionnant mais généralement bénin, à distinguer attentivement d'une cellulite infectieuse bactérienne authentique", niveau:"warning"},
      {label:"Risque vectoriel de maladies transmises (dengue, chikungunya, Zika) dans les zones où le moustique tigre est implanté", niveau:"danger"},
      {label:"Réaction allergique sévère (anaphylaxie) aux piqûres de moustiques : rare mais possible chez les sujets très sensibilisés", niveau:"danger"},
    ],
    classes: [
      {classe:"Dermocorticoïdes faibles — réaction locale importante", dci:["Hydrocortisone 1% en application locale courte"], specialites:["Hydracort®"], couleur:"#1B6B52", remarque:"Utile en cas de réaction locale importante (syndrome de Skeeter notamment), durée limitée à quelques jours"},
      {classe:"Mesures de lutte anti-vectorielle — zones à risque (moustique tigre)", dci:["Élimination des eaux stagnantes, répulsifs renforcés, moustiquaires"], specialites:["Mesures non médicamenteuses spécifiques"], couleur:"#B45309", remarque:"Recommandées dans les zones où le moustique tigre est implanté, en complément des répulsifs cutanés individuels classiques"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse spécifique supplémentaire notable pour cette section",
    ],
    points_cles: [
      "Moustique tigre (Aedes albopictus) : vecteur potentiel de maladies (dengue, chikungunya, Zika), implanté dans plusieurs régions françaises",
      "Syndrome de Skeeter : réaction d'hypersensibilité exagérée, fréquente chez l'enfant, à distinguer d'une cellulite infectieuse bactérienne",
      "DEET : marge de sécurité acceptable aux concentrations et fréquences recommandées selon les données toxicologiques disponibles",
      "Vigilance épidémiologique accrue nécessaire dans les zones d'implantation du moustique tigre, au-delà de la simple gêne des piqûres",
      "Surveillance de l'évolution recommandée en cas de réaction locale importante pour détecter une éventuelle surinfection bactérienne secondaire",
    ],
  },
  n4: {
    saviez_vous: "La résistance croissante des moustiques aux insecticides classiques dans certaines régions du monde complexifie les stratégies de lutte anti-vectorielle à l'échelle globale, en particulier pour le contrôle des maladies vectorielles majeures comme le paludisme, la dengue ou le chikungunya — cette problématique de santé publique mondiale dépasse largement le cadre de la simple gêne individuelle liée aux piqûres et nécessite des approches intégrées combinant lutte chimique, biologique et environnementale.",
    physiopatho: "Paludisme et prévention chez le voyageur en zone d'endémie : transmis par les moustiques du genre Anopheles (piquant principalement entre le coucher et le levé du soleil, contrairement à de nombreux autres moustiques actifs en journée), le parasite Plasmodium injecté lors de la piqûre infecte d'abord les hépatocytes puis les globules rouges → la prévention combine impérativement des mesures de protection anti-vectorielle (répulsifs, moustiquaires imprégnées, vêtements couvrants) ET une chimioprophylaxie médicamenteuse adaptée à la zone de destination et au profil du voyageur, ces deux approches étant complémentaires et non substituables l'une à l'autre.",
    recommandations: "HAS / Recommandations sanitaires aux voyageurs — Prévention des piqûres et maladies vectorielles : répulsifs cutanés à base de DEET, icaridine ou IR3535 selon l'âge et le contexte, à concentration adaptée. Vêtements couvrants et imprégnés d'insecticide en zone à haut risque. Moustiquaires imprégnées pour le sommeil en zone d'endémie palustre. Chimioprophylaxie antipaludique spécifique selon la zone de destination, à discuter avec un médecin ou en centre de vaccinations internationales avant le départ.",
    situations_complexes: "Femme enceinte voyageant en zone d'endémie palustre : situation à très haut risque (paludisme plus sévère pendant la grossesse, risque pour le fœtus), report du voyage à privilégier si possible, sinon prophylaxie antipaludique adaptée à la grossesse et mesures de protection renforcées indispensables.\n\nEnfant en bas âge et répulsifs : règles d'âge et de concentration spécifiques à respecter strictement (certaines concentrations de DEET déconseillées avant un âge donné), privilégier les moustiquaires et vêtements couvrants en complément ou en alternative selon l'âge.\n\nVoyageur de retour de zone d'endémie avec fièvre : toute fièvre au retour d'une zone tropicale doit faire évoquer systématiquement un paludisme jusqu'à preuve du contraire, urgence diagnostique et thérapeutique en raison du risque d'évolution rapide vers une forme grave (notamment paludisme à Plasmodium falciparum), consultation médicale urgente indispensable sans délai.",
    effets_secondaires: [
      {label:"Paludisme méconnu au retour de voyage : urgence diagnostique, risque d'évolution rapide vers une forme grave potentiellement mortelle", niveau:"danger"},
      {label:"Paludisme chez la femme enceinte : forme plus sévère, risque materno-fœtal accru nécessitant une prévention renforcée", niveau:"danger"},
      {label:"Résistance croissante des moustiques aux insecticides : complexifie les stratégies de lutte anti-vectorielle à l'échelle mondiale", niveau:"warning"},
    ],
    classes: [
      {classe:"Chimioprophylaxie antipaludique — selon la zone de destination", dci:["Atovaquone-proguanil, doxycycline, ou autre selon la zone et le profil"], specialites:["Malarone®","Doxypalu®"], couleur:"#C0392B", remarque:"Choix de la molécule selon la zone de résistance locale, le profil du voyageur, et la durée du séjour, prescription médicale indispensable avant le départ"},
      {classe:"Moustiquaires imprégnées d'insecticide — prévention en zone d'endémie", dci:["Perméthrine ou autre insecticide d'imprégnation"], specialites:["Diverses marques de moustiquaires imprégnées"], couleur:"#1B6B52", remarque:"Mesure de protection essentielle pour le sommeil en zone d'endémie palustre, à utiliser en complément de la chimioprophylaxie"},
    ],
    interactions: [
      "Doxycycline (chimioprophylaxie) + photosensibilisation : protection solaire renforcée nécessaire pendant la durée du traitement",
      "Atovaquone-proguanil + certains antiacides : possible interaction sur l'absorption, à prendre en compte selon le contexte",
    ],
    points_cles: [
      "Toute fièvre au retour d'une zone d'endémie palustre = urgence diagnostique jusqu'à preuve du contraire",
      "Chimioprophylaxie antipaludique et mesures de protection anti-vectorielle : approches complémentaires et non substituables",
      "Femme enceinte en zone d'endémie palustre : situation à très haut risque, report du voyage à privilégier si possible",
      "Moustiques Anopheles (paludisme) : piquent principalement entre le coucher et le levé du soleil, contrairement à de nombreux autres moustiques",
      "Résistance croissante aux insecticides : enjeu de santé publique mondiale dépassant la simple gêne individuelle des piqûres",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F42 — POUX (PÉDICULOSE)
   ════════════════════════════════════════════════════════ */
FN['poux'] = {
  n2: {
    saviez_vous: "Contrairement à une idée répandue, les poux de tête préfèrent les cheveux propres aux cheveux sales — ils n'ont aucun lien avec l'hygiène personnelle, leur prolifération dépendant uniquement de la proximité physique entre les têtes (contacts directs, échange de bonnets, brosses), ce qui explique leur diffusion fréquente en milieu scolaire indépendamment du niveau d'hygiène des enfants concernés.",
    physiopatho: "Le pou de tête (Pediculus humanus capitis) est un parasite strictement humain, hématophage obligatoire, qui se fixe aux cheveux près du cuir chevelu et pond ses œufs (lentes) fermement collés à la base du cheveu grâce à une substance cimentante résistante → les piqûres répétées pour se nourrir de sang provoquent une réaction inflammatoire locale avec libération d'histamine, responsable du prurit caractéristique du cuir chevelu, qui peut n'apparaître que plusieurs semaines après l'infestation initiale (délai de sensibilisation), expliquant pourquoi certains enfants restent longtemps porteurs sans le savoir avant l'apparition des premiers symptômes.",
    mecanisme: "Insecticides topiques (perméthrine, pyréthrines) : agissent sur les canaux sodiques voltage-dépendants des membranes neuronales des poux → blocage de la repolarisation neuronale → paralysie puis mort du parasite, nécessitent un temps de pose suffisant et souvent une seconde application à J7-J10 pour éliminer les poux issus des lentes ayant résisté au premier traitement (les lentes étant généralement moins sensibles aux insecticides que les poux adultes).\n\nDiméticone (silicone, action physique non insecticide) : recouvre et asphyxie mécaniquement le pou par occlusion de ses voies respiratoires externes, sans mécanisme de résistance possible contrairement aux insecticides chimiques classiques, alternative intéressante face à l'émergence de résistances aux pyréthrines dans certaines populations de poux.",
    diagnostic: "Diagnostic par inspection minutieuse du cuir chevelu à la recherche de lentes (œufs blanchâtres fermement fixés à la base des cheveux, à différencier des pellicules qui se détachent facilement) et de poux vivants (plus difficiles à observer car mobiles et fuyant la lumière), peigne fin à utiliser systématiquement sur cheveux mouillés pour faciliter la détection et le traitement mécanique complémentaire.",
    effets_secondaires: [
      {label:"Surinfection bactérienne du cuir chevelu favorisée par le grattage intense des lésions prurigineuses", niveau:"warning"},
      {label:"Échec thérapeutique fréquent par traitement incomplet (oubli de la 2e application à J7-J10, ou application insuffisante)", niveau:"warning"},
      {label:"Résistance croissante aux pyréthrines dans certaines populations de poux, expliquant certains échecs thérapeutiques répétés", niveau:"warning"},
    ],
    classes: [
      {classe:"Diméticone — action physique, sans résistance possible", dci:["Diméticone application locale"], specialites:["Pouxit®","Parasidose®"], couleur:"#1B6B52", remarque:"Action mécanique par asphyxie, pas de risque de résistance, alternative de choix face à l'augmentation des résistances aux insecticides classiques"},
      {classe:"Perméthrine/Pyréthrines — insecticides topiques classiques", dci:["Perméthrine 1%"], specialites:["Para Plus®","Itax®"], couleur:"#1E3A5F", remarque:"2e application systématique à J7-J10 indispensable pour éliminer les poux issus des lentes ayant résisté au 1er traitement"},
      {classe:"Peigne fin — traitement mécanique complémentaire systématique", dci:["Peignage mécanique sur cheveux mouillés"], specialites:["Dispositif non médicamenteux"], couleur:"#B45309", remarque:"Complément indispensable à tout traitement topique, à répéter plusieurs jours de suite pour une élimination mécanique complète"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse systémique significative pour les traitements topiques à action locale uniquement",
    ],
    points_cles: [
      "Poux de tête : aucun lien avec l'hygiène personnelle, préfèrent même les cheveux propres, diffusion par proximité physique",
      "2e application à J7-J10 systématique et indispensable, quelle que soit la molécule utilisée, pour éliminer les poux issus des lentes résistantes",
      "Diméticone : action physique par asphyxie, sans risque de résistance, alternative intéressante aux insecticides chimiques classiques",
      "Peigne fin sur cheveux mouillés : complément mécanique indispensable à tout traitement topique pour une élimination complète",
      "Délai de sensibilisation avant l'apparition du prurit : explique le portage prolongé possible sans symptôme avant le diagnostic",
    ],
  },
  n3: {
    saviez_vous: "Les mutations kdr (knockdown resistance) des canaux sodiques neuronaux des poux, conférant une résistance aux pyréthrines, sont désormais largement répandues dans de nombreuses populations de poux à travers le monde, y compris en France — cette résistance acquise explique une part significative des échecs thérapeutiques apparents avec les insecticides classiques, justifiant le recours croissant aux alternatives à action physique (diméticone) dépourvues de ce mécanisme de résistance.",
    physiopatho: "Cycle de vie du pou et implications thérapeutiques : l'œuf (lente) éclot en 7-10 jours en condition favorable (température et humidité du cuir chevelu), donnant naissance à une larve qui devient pou adulte capable de se reproduire en environ 9-12 jours supplémentaires — cette chronologie précise explique pourquoi un traitement insecticide unique, actif principalement sur les formes mobiles (poux adultes et parfois larves) mais peu actif sur les œufs déjà pondus, doit impérativement être répété à J7-J10 pour traiter les nouveaux poux ayant éclos depuis la 1ère application, avant qu'ils n'atteignent eux-mêmes la maturité reproductive.",
    pharmacocinetique: "Diméticone : silicone de haute viscosité à action purement physique et locale, absence totale d'absorption systémique significative (molécule inerte non métabolisée), profil de sécurité excellent permettant son utilisation même chez le très jeune enfant et la femme enceinte, contrairement à certains insecticides chimiques nécessitant davantage de précautions d'usage selon l'âge et le contexte physiologique.",
    cas_clinique: "Enfant de 7 ans, 3e épisode de pédiculose dans l'année malgré des traitements par perméthrine correctement appliqués à 2 reprises chacun (J0 et J7-J10), école avec plusieurs cas signalés simultanément. Que proposez-vous ?\n\nRaisonnement : échecs thérapeutiques répétés malgré une application correcte du protocole standard avec un insecticide classique → évoquer une possible résistance aux pyréthrines (mutation kdr), de plus en plus fréquente → proposer un changement de stratégie thérapeutique vers le diméticone (action physique sans possibilité de résistance), associé à un peignage mécanique rigoureux et répété, information de la collectivité scolaire pour un dépistage et un traitement simultané des autres cas afin de limiter les réinfestations croisées répétées.",
    effets_secondaires: [
      {label:"Résistance aux pyréthrines (mutation kdr) : explique de nombreux échecs thérapeutiques apparents malgré une application correcte", niveau:"warning"},
      {label:"Réinfestations croisées répétées en collectivité si traitement non simultané de tous les cas identifiés", niveau:"warning"},
    ],
    classes: [
      {classe:"Diméticone haute viscosité — alternative en cas de résistance suspectée", dci:["Diméticone application locale, temps de pose prolongé selon produit"], specialites:["Pouxit Lotion®","Parasidose®"], couleur:"#1B6B52", remarque:"Alternative de choix en cas d'échec répété aux insecticides classiques, sans risque de résistance, profil de sécurité excellent"},
      {classe:"Malathion — alternative en cas d'échec multiple (sur prescription)", dci:["Malathion 0,5% lotion"], specialites:["Prioderm® (selon disponibilité)"], couleur:"#B45309", remarque:"Réservé aux échecs répétés des autres traitements, mécanisme d'action différent, contraintes d'usage à respecter strictement"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse systémique significative pour ces traitements à action locale",
    ],
    points_cles: [
      "Mutations kdr : résistance aux pyréthrines largement répandue, explique de nombreux échecs thérapeutiques apparents",
      "Cycle de vie du pou (éclosion 7-10j, maturité 9-12j supplémentaires) : justifie scientifiquement la 2e application à J7-J10",
      "Diméticone : profil de sécurité excellent, utilisable même chez le très jeune enfant et la femme enceinte",
      "Information et traitement simultané de la collectivité : essentiel pour limiter les réinfestations croisées répétées",
      "Échecs thérapeutiques répétés malgré application correcte : évoquer une résistance et changer de stratégie thérapeutique",
    ],
  },
  n4: {
    saviez_vous: "Bien que les poux de tête ne transmettent pas de maladie grave (contrairement aux poux de corps qui peuvent transmettre certaines maladies infectieuses dans des contextes spécifiques de précarité ou de promiscuité extrême), l'impact psychosocial de la pédiculose (stigmatisation, exclusion scolaire informelle, anxiété parentale) est souvent disproportionné par rapport à la bénignité médicale réelle de cette parasitose, justifiant une approche pédagogique rassurante et dédramatisante de la part des professionnels de santé.",
    physiopatho: "Distinction entre les trois espèces de poux humains : le pou de tête (Pediculus humanus capitis, le plus fréquent, limité au cuir chevelu), le pou de corps (Pediculus humanus corporis, vivant dans les vêtements et se nourrissant sur la peau, associé à des conditions de grande précarité et promiscuité, et pouvant transmettre certaines maladies bactériennes comme le typhus épidémique ou la fièvre des tranchées dans des contextes spécifiques) et le pou du pubis ou morpion (Phthirus pubis, transmis principalement par contact sexuel, touchant la zone pubienne et parfois les cils) — ces trois espèces, bien que phylogénétiquement proches, ont des implications épidémiologiques et de prise en charge très différentes.",
    recommandations: "HAS / Recommandations sanitaires scolaires — Pédiculose : traitement topique (diméticone ou insecticide classique selon le contexte de résistance local) avec 2e application systématique à J7-J10. Peignage mécanique complémentaire sur cheveux mouillés. Pas d'éviction scolaire obligatoire stricte en France pour la pédiculose simple (contrairement à certaines idées reçues), mais information et traitement de l'entourage proche recommandés pour limiter la diffusion.",
    situations_complexes: "Pédiculose du cils et des sourcils chez l'enfant : situation particulière nécessitant un traitement adapté différent du cuir chevelu (vaseline ou produits spécifiques ophtalmologiques sur avis médical), à distinguer d'une possible transmission par contact avec un adulte infesté par le pou du pubis, situation rare mais à considérer dans un contexte de suspicion de maltraitance si présente chez le jeune enfant.\n\nPou du pubis (morpion) chez l'adulte : transmission principalement sexuelle, traitement topique spécifique (perméthrine ou autre insecticide adapté à cette localisation), recherche systématique d'autres infections sexuellement transmissibles associées et information/traitement du ou des partenaires.\n\nPou de corps en contexte de grande précarité : situation différente de la pédiculose de tête classique, associée à des conditions d'hygiène et de promiscuité extrêmes, nécessitant une prise en charge globale incluant le changement et le traitement des vêtements (lavage à haute température ou traitement insecticide spécifique des textiles) en plus du traitement cutané.",
    effets_secondaires: [
      {label:"Pou de corps en contexte de grande précarité : risque de transmission de maladies bactériennes spécifiques (typhus, fièvre des tranchées) dans ces contextes particuliers", niveau:"danger"},
      {label:"Pou du pubis chez l'enfant : à considérer dans un contexte de suspicion de maltraitance si présent chez le jeune enfant", niveau:"danger"},
      {label:"Stigmatisation et impact psychosocial disproportionné de la pédiculose de tête simple par rapport à sa bénignité médicale réelle", niveau:"warning"},
    ],
    classes: [
      {classe:"Vaseline ou produits spécifiques — pédiculose des cils", dci:["Vaseline application locale ou produit ophtalmologique spécifique"], specialites:["Selon prescription médicale adaptée à cette localisation"], couleur:"#1E3A5F", remarque:"Traitement adapté différent du cuir chevelu en raison de la proximité oculaire, avis médical recommandé pour cette localisation particulière"},
      {classe:"Perméthrine adaptée — pou du pubis (morpion)", dci:["Perméthrine ou insecticide adapté à cette localisation"], specialites:["Selon prescription adaptée"], couleur:"#B45309", remarque:"Traitement spécifique de cette localisation, recherche systématique d'autres IST associées et information/traitement des partenaires"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse spécifique supplémentaire notable pour cette section",
    ],
    points_cles: [
      "Trois espèces distinctes de poux humains : tête, corps, pubis — implications épidémiologiques et prise en charge très différentes",
      "Pas d'éviction scolaire obligatoire stricte en France pour la pédiculose de tête simple, contrairement à certaines idées reçues",
      "Pou du pubis chez l'enfant : à considérer dans un contexte de suspicion de maltraitance si présent à cet âge",
      "Pou de corps : associé à la grande précarité, risque de transmission de maladies bactériennes spécifiques dans ces contextes",
      "Impact psychosocial souvent disproportionné de la pédiculose simple : approche pédagogique rassurante essentielle de la part des professionnels",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F43 — OTITE
   ════════════════════════════════════════════════════════ */
FN['otite'] = {
  n2: {
    saviez_vous: "L'otite moyenne aiguë (OMA) congestive simple, sans otorrhée ni perforation, guérit spontanément dans la majorité des cas sans antibiotique chez l'enfant de plus de 2 ans — les recommandations actuelles privilégient une approche d'attente vigilante (antalgique seul avec réévaluation à 48-72h) pour de nombreuses formes non sévères, contrairement à l'ancienne pratique d'antibiothérapie quasi systématique.",
    physiopatho: "L'otite moyenne aiguë résulte d'une inflammation et infection de l'oreille moyenne, le plus souvent secondaire à une infection virale des voies aériennes supérieures (rhinopharyngite) → l'inflammation de la trompe d'Eustache (reliant le nasopharynx à l'oreille moyenne) entraîne son dysfonctionnement et son obstruction → accumulation de sécrétions dans la caisse du tympan, normalement ventilée et drainée par cette trompe → surinfection bactérienne secondaire possible (Streptococcus pneumoniae, Haemophilus influenzae principalement) sur ce terrain de stase, expliquant la fréquence des OMA dans les suites immédiates d'un épisode viral ORL, particulièrement chez le jeune enfant dont la trompe d'Eustache est anatomiquement plus courte et plus horizontale, favorisant ce dysfonctionnement.",
    mecanisme: "Antalgiques (paracétamol, ibuprofène) : traitement de la douleur otalgique souvent intense associée à l'OMA, à utiliser systématiquement quelle que soit la décision concernant l'antibiothérapie, car le soulagement de la douleur reste une priorité indépendamment de l'origine virale ou bactérienne de l'épisode.\n\nAmoxicilline (si antibiothérapie indiquée) : inhibition de la synthèse de la paroi bactérienne, efficace sur les germes les plus fréquemment impliqués dans l'OMA bactérienne, traitement de référence en 1ère intention lorsque l'antibiothérapie est jugée nécessaire selon les critères cliniques actualisés.",
    diagnostic: "Otoscopie : examen de référence, recherche d'un tympan bombé, inflammatoire, opaque (signes évocateurs d'une authentique OMA bactérienne) versus un tympan simplement congestif sans bombement (plus évocateur d'une otite congestive virale simple). Cette distinction otoscopique guide directement la décision thérapeutique (antibiothérapie immédiate versus attente vigilante avec antalgique seul et réévaluation).",
    effets_secondaires: [
      {label:"Otite congestive simple traitée par antibiotique à tort : exposition inutile aux effets indésirables et à la sélection de résistances", niveau:"warning"},
      {label:"Perforation tympanique spontanée : généralement bénigne, soulage souvent la douleur par décompression de la caisse", niveau:"info"},
      {label:"OMA non traitée chez le très jeune enfant (< 2 ans) : risque de complication plus élevé à cet âge qu'chez l'enfant plus grand", niveau:"warning"},
    ],
    classes: [
      {classe:"Antalgiques — systématiques quelle que soit la décision d'antibiothérapie", dci:["Paracétamol ou ibuprofène selon poids"], specialites:["Doliprane®","Advil®"], couleur:"#1B6B52", remarque:"Priorité au soulagement de la douleur otalgique, à utiliser systématiquement indépendamment de la décision concernant l'antibiotique"},
      {classe:"Amoxicilline — si antibiothérapie indiquée", dci:["Amoxicilline 80-90mg/kg/j selon poids"], specialites:["Clamoxyl®"], couleur:"#1E3A5F", remarque:"Traitement de référence en 1ère intention de l'OMA bactériologiquement évocatrice, durée adaptée à l'âge selon les recommandations"},
      {classe:"Attente vigilante — OMA congestive simple sans signe de gravité", dci:["Antalgique seul, réévaluation à 48-72h"], specialites:["Approche thérapeutique, non médicamenteuse spécifique"], couleur:"#B45309", remarque:"Approche privilégiée chez l'enfant de plus de 2 ans sans facteur de risque, devant un tableau non sévère"},
    ],
    interactions: [
      "Amoxicilline + méthotrexate : ↑ toxicité du méthotrexate par réduction de sa clairance rénale — vigilance si association",
    ],
    points_cles: [
      "OMA congestive simple : guérison spontanée fréquente, attente vigilante avec antalgique seul privilégiée chez l'enfant de plus de 2 ans",
      "Otoscopie : examen de référence distinguant le tympan bombé/inflammatoire (OMA bactérienne probable) du tympan simplement congestif",
      "Antalgiques : systématiques pour soulager la douleur, indépendamment de la décision concernant l'antibiothérapie",
      "Amoxicilline : traitement de référence en 1ère intention lorsque l'antibiothérapie est jugée nécessaire",
      "Perforation tympanique spontanée : généralement bénigne, peut même soulager la douleur par décompression",
    ],
  },
  n3: {
    saviez_vous: "Les critères d'âge sont déterminants dans la décision d'antibiothérapie de l'OMA : chez l'enfant de moins de 2 ans, l'antibiothérapie est recommandée d'emblée en raison d'un risque de complication plus élevé et d'une évolution spontanée moins favorable à cet âge, contrairement à l'enfant plus grand chez qui une attente vigilante est davantage envisageable pour les formes non sévères — cette distinction selon l'âge est un point clé souvent mal connu en pratique.",
    physiopatho: "Otite séromuqueuse (OSM) chronique et ses conséquences : à distinguer de l'OMA aiguë, l'OSM correspond à une accumulation chronique de liquide dans l'oreille moyenne sans signe d'infection aiguë (pas de douleur ni de fièvre), souvent secondaire à des épisodes répétés d'OMA ou à une hypertrophie des végétations adénoïdes obstruant chroniquement l'orifice pharyngé de la trompe d'Eustache → cette accumulation chronique de liquide peut entraîner une hypoacousie de transmission significative chez l'enfant, avec un retentissement potentiel sur le développement du langage si elle persiste sans prise en charge, justifiant une surveillance et parfois une intervention spécifique (pose d'aérateurs transtympaniques) en cas de persistance prolongée.",
    pharmacocinetique: "Amoxicilline à forte dose (80-90mg/kg/j) dans l'OMA : la dose plus élevée que dans d'autres indications infectieuses vise spécifiquement à obtenir des concentrations suffisantes dans l'oreille moyenne pour traiter efficacement le pneumocoque, y compris les souches à sensibilité diminuée à la pénicilline, de plus en plus fréquentes — cette adaptation posologique spécifique illustre l'importance de respecter les doses recommandées propres à chaque indication plutôt que d'extrapoler depuis d'autres contextes infectieux.",
    cas_clinique: "Enfant de 4 ans, antécédent de 3 OMA dans les 6 derniers mois, présente actuellement une hypoacousie progressive signalée par l'institutrice, sans douleur ni fièvre actuelles, tympan terne et rétracté à l'otoscopie sans signe d'inflammation aiguë. Que suspectez-vous ?\n\nRaisonnement : tableau évocateur d'otite séromuqueuse chronique (OSM) plutôt qu'une nouvelle OMA aiguë, dans un contexte d'OMA récidivantes antérieures favorisant cette évolution chronique. Orientation vers un ORL pour évaluation audiométrique et discussion d'une éventuelle pose d'aérateurs transtympaniques si l'hypoacousie est confirmée et significative, en raison du retentissement potentiel sur le développement du langage et les apprentissages scolaires si la situation persiste sans prise en charge adaptée.",
    effets_secondaires: [
      {label:"OSM non diagnostiquée : retentissement sur le développement du langage et les apprentissages scolaires si hypoacousie significative et prolongée", niveau:"warning"},
      {label:"OMA récidivantes (> 3-4 épisodes/6 mois) : favorisent l'évolution vers une OSM chronique", niveau:"warning"},
      {label:"Amoxicilline à dose standard insuffisante face à un pneumocoque à sensibilité diminuée : risque d'échec thérapeutique", niveau:"warning"},
    ],
    classes: [
      {classe:"Amoxicilline forte dose — référence pour cibler le pneumocoque à sensibilité diminuée", dci:["Amoxicilline 80-90mg/kg/j"], specialites:["Clamoxyl®"], couleur:"#1B6B52", remarque:"Dose spécifiquement adaptée pour obtenir des concentrations efficaces dans l'oreille moyenne contre le pneumocoque, y compris les souches à sensibilité diminuée"},
      {classe:"Aérateurs transtympaniques — OSM chronique avec hypoacousie significative", dci:["Pose chirurgicale sous anesthésie selon avis ORL"], specialites:["Procédure ORL spécialisée"], couleur:"#6B2D5E", remarque:"Discutée en cas d'OSM persistante avec hypoacousie significative et retentissement sur le développement, après évaluation audiométrique"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse spécifique supplémentaire notable pour cette section",
    ],
    points_cles: [
      "Enfant de moins de 2 ans : antibiothérapie recommandée d'emblée en raison du risque de complication plus élevé à cet âge",
      "OSM chronique : à distinguer de l'OMA aiguë, accumulation de liquide sans signe d'infection aiguë, risque d'hypoacousie",
      "Amoxicilline forte dose (80-90mg/kg/j) : adaptation posologique spécifique pour cibler le pneumocoque à sensibilité diminuée",
      "OMA récidivantes : favorisent l'évolution vers une OSM chronique, à surveiller particulièrement chez l'enfant concerné",
      "Hypoacousie persistante chez l'enfant : orientation ORL pour évaluation audiométrique, retentissement possible sur le développement du langage",
    ],
  },
  n4: {
    saviez_vous: "La mastoïdite aiguë, complication rare mais potentiellement grave de l'OMA, se manifeste par un décollement caractéristique du pavillon de l'oreille associé à une tuméfaction rétro-auriculaire douloureuse — sa reconnaissance précoce est essentielle car elle nécessite une prise en charge hospitalière en urgence (antibiothérapie IV, parfois drainage chirurgical) en raison du risque d'extension vers des complications intracrâniennes graves si elle n'est pas traitée rapidement et adéquatement.",
    physiopatho: "Voies de complication de l'OMA non traitée ou résistante : au-delà de la mastoïdite (extension de l'infection aux cellules mastoïdiennes adjacentes à l'oreille moyenne), d'autres complications plus rares mais graves sont possibles par contiguïté anatomique — labyrinthite (extension à l'oreille interne, avec risque de vertiges et de surdité), paralysie faciale périphérique (atteinte du nerf facial dans son trajet à travers l'os temporal), et complications intracrâniennes (méningite, abcès cérébral, thrombophlébite du sinus latéral) par propagation directe à travers les structures osseuses fines séparant l'oreille moyenne des structures intracrâniennes adjacentes — ces complications, bien que devenues rares depuis l'usage généralisé des antibiotiques, restent à connaître et à évoquer devant tout signe d'alarme.",
    recommandations: "HAS / SPILF — OMA : antibiothérapie d'emblée recommandée chez l'enfant de moins de 2 ans, ou devant des signes de sévérité (fièvre élevée, otalgie intense, otorrhée). Attente vigilante envisageable chez l'enfant de plus de 2 ans sans signe de sévérité, avec réévaluation à 48-72h. Amoxicilline forte dose en 1ère intention si antibiothérapie indiquée. Orientation ORL/hospitalière en urgence devant tout signe de complication (mastoïdite, paralysie faciale, signes neurologiques).",
    situations_complexes: "OMA récidivante (≥ 4 épisodes en 6 mois ou ≥ 6 épisodes en 1 an) : orientation ORL pour discussion d'une stratégie préventive spécifique, recherche d'une cause favorisante (hypertrophie des végétations adénoïdes notamment, exposition à la fumée de tabac, fréquentation précoce de collectivité), pose d'aérateurs transtympaniques parfois discutée en complément de l'adénoïdectomie selon le contexte.\n\nOtite chez le nourrisson de moins de 3 mois : seuil de vigilance maximal en raison du risque accru de complication et de la difficulté d'évaluation clinique à cet âge, orientation pédiatrique systématique recommandée plutôt qu'une prise en charge purement ambulatoire.\n\nÉchec thérapeutique de l'amoxicilline forte dose (persistance des symptômes après 48-72h de traitement bien conduit) : évoquer un pneumocoque hautement résistant ou une autre bactérie productrice de bêta-lactamases (Haemophilus influenzae, Moraxella catarrhalis) → switch vers amoxicilline/acide clavulanique ou une céphalosporine de 2e/3e génération selon les recommandations en vigueur.",
    effets_secondaires: [
      {label:"Mastoïdite aiguë : urgence ORL, risque d'extension vers des complications intracrâniennes graves si retard de prise en charge", niveau:"danger"},
      {label:"Paralysie faciale périphérique sur OMA compliquée : urgence ORL nécessitant une prise en charge rapide et spécialisée", niveau:"danger"},
      {label:"Complications intracrâniennes (méningite, abcès cérébral) : rares mais gravissimes, pronostic directement lié à la rapidité de prise en charge", niveau:"danger"},
    ],
    classes: [
      {classe:"Amoxicilline/Acide clavulanique — échec de l'amoxicilline seule", dci:["Amoxicilline/Acide clavulanique 80mg/kg/j (composant amoxicilline)"], specialites:["Augmentin®"], couleur:"#B45309", remarque:"Indiquée en cas d'échec de l'amoxicilline seule après 48-72h de traitement bien conduit, couverture des bêta-lactamases"},
      {classe:"Antibiothérapie IV + prise en charge chirurgicale — mastoïdite confirmée", dci:["Céphalosporine IV selon protocole hospitalier + drainage si nécessaire"], specialites:["Prise en charge hospitalière ORL d'urgence"], couleur:"#C0392B", remarque:"Urgence ORL hospitalière, antibiothérapie IV systématique, drainage chirurgical selon la sévérité et l'évolution"},
    ],
    interactions: [
      "Amoxicilline/Acide clavulanique : risque accru de diarrhée par rapport à l'amoxicilline seule (effet sur le microbiote)",
    ],
    points_cles: [
      "Mastoïdite aiguë : décollement du pavillon de l'oreille + tuméfaction rétro-auriculaire douloureuse, urgence ORL à reconnaître",
      "Antibiothérapie d'emblée recommandée chez l'enfant de moins de 2 ans, attente vigilante envisageable au-delà sans signe de sévérité",
      "OMA récidivante : orientation ORL pour recherche d'une cause favorisante et discussion d'une stratégie préventive spécifique",
      "Échec de l'amoxicilline seule à 48-72h : switch vers amoxicilline/acide clavulanique pour couvrir les germes producteurs de bêta-lactamases",
      "Tout signe de complication (paralysie faciale, signes neurologiques, mastoïdite) : orientation hospitalière urgente sans délai",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F44 — CONJONCTIVITE
   ════════════════════════════════════════════════════════ */
FN['conjonctivite'] = {
  n2: {
    saviez_vous: "La majorité des conjonctivites aiguës sont virales ou allergiques, et non bactériennes — pourtant les collyres antibiotiques restent largement surprescrits, alors qu'un signe simple permet souvent d'orienter le diagnostic : les sécrétions purulentes franches collant les paupières au réveil orientent vers une origine bactérienne, tandis qu'un larmoiement clair avec prurit oriente vers une origine allergique ou virale.",
    physiopatho: "La conjonctivite correspond à une inflammation de la conjonctive (membrane recouvrant le blanc de l'œil et l'intérieur des paupières), pouvant être d'origine virale (adénovirus le plus souvent, très contagieuse, transmission par contact direct ou objets contaminés), bactérienne (Staphylococcus aureus, Streptococcus pneumoniae, Haemophilus influenzae notamment), ou allergique (réaction d'hypersensibilité de type I aux allergènes environnementaux, souvent associée à une rhinite allergique dans le cadre d'une allergie respiratoire plus globale) → chaque étiologie a une présentation clinique et une prise en charge propres, bien que le chevauchement symptomatique initial puisse parfois compliquer le diagnostic différentiel précis.",
    mecanisme: "Collyres antibiotiques (si origine bactérienne suspectée ou confirmée) : action antibactérienne locale ciblant les germes les plus fréquemment impliqués, à réserver aux tableaux cliniquement évocateurs d'une origine bactérienne (sécrétions purulentes franches) plutôt qu'à une prescription systématique devant toute rougeur oculaire.\n\nCollyres antihistaminiques ou stabilisateurs de mastocytes (conjonctivite allergique) : blocage des récepteurs H1 locaux ou stabilisation membranaire mastocytaire → réduction du prurit et de l'inflammation allergique locale, traitement de référence de la composante allergique, souvent associé à un traitement de la rhinite allergique concomitante.",
    diagnostic: "Diagnostic clinique principalement, orienté par le type de sécrétions (purulentes = bactérien probable, claires avec prurit = allergique ou viral probable), le caractère uni ou bilatéral (la conjonctivite allergique est généralement bilatérale d'emblée, la virale peut débuter unilatéralement puis se bilatéraliser en quelques jours), et le contexte (épidémie virale ORL concomitante, contexte allergique saisonnier connu). Tout œil rouge douloureux avec baisse de l'acuité visuelle ou photophobie marquée doit faire évoquer une autre pathologie oculaire plus grave qu'une simple conjonctivite.",
    effets_secondaires: [
      {label:"Œil rouge douloureux avec baisse d'acuité visuelle ou photophobie marquée : signe d'alarme, ne pas se limiter au diagnostic de conjonctivite simple", niveau:"danger"},
      {label:"Conjonctivite virale très contagieuse : transmission facile par contact direct ou objets contaminés (serviettes, oreillers)", niveau:"warning"},
      {label:"Antibiotiques locaux prescrits à tort sur une conjonctivite virale ou allergique : absence de bénéfice et sélection de résistances inutile", niveau:"warning"},
    ],
    classes: [
      {classe:"Collyres antibiotiques — conjonctivite bactérienne évocatrice", dci:["Azithromycine collyre","Rifamycine collyre"], specialites:["Azyter®","Rifamycine Chibret®"], couleur:"#1B6B52", remarque:"Réservés aux tableaux cliniquement évocateurs d'origine bactérienne (sécrétions purulentes franches), durée courte de traitement"},
      {classe:"Collyres antihistaminiques — conjonctivite allergique", dci:["Azelastine collyre","Lévocabastine collyre"], specialites:["Allergodil®","Levophta®"], couleur:"#1E3A5F", remarque:"Traitement de référence de la composante allergique, souvent associé à un traitement de la rhinite allergique concomitante"},
      {classe:"Larmes artificielles — confort, toutes étiologies", dci:["Solution de lavage oculaire ou larmes artificielles"], specialites:["Diverses formulations sans conservateur si usage fréquent"], couleur:"#B45309", remarque:"Utile en complément pour le confort et le nettoyage des sécrétions, quelle que soit l'étiologie de la conjonctivite"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse systémique significative pour les collyres à action locale",
    ],
    points_cles: [
      "Type de sécrétions : élément clé d'orientation diagnostique — purulentes franches (bactérien) versus claires avec prurit (allergique/viral)",
      "Conjonctivite virale : très contagieuse, mesures d'hygiène (lavage des mains, éviter le partage d'objets) essentielles",
      "Collyres antibiotiques : à réserver aux tableaux évocateurs d'origine bactérienne, pas une prescription systématique",
      "Œil rouge douloureux avec baisse d'acuité visuelle ou photophobie : signe d'alarme nécessitant une orientation ophtalmologique",
      "Conjonctivite allergique : généralement bilatérale d'emblée, souvent associée à une rhinite allergique concomitante",
    ],
  },
  n3: {
    saviez_vous: "La kérato-conjonctivite épidémique à adénovirus, forme particulièrement contagieuse et parfois sévère de conjonctivite virale, peut s'accompagner d'une atteinte cornéenne associée (kératite) responsable d'une photophobie et d'un inconfort visuel prolongé pouvant persister plusieurs semaines après la résolution de la conjonctivite elle-même — une complication à connaître pour ne pas sous-estimer la durée d'évolution possible de cette forme virale spécifique.",
    physiopatho: "Conjonctivite à Chlamydia trachomatis (conjonctivite à inclusions de l'adulte) : transmise par auto-inoculation à partir d'une infection génitale à Chlamydia (souvent asymptomatique chez le porteur), se présente comme une conjonctivite folliculaire chronique résistante aux traitements antibiotiques topiques classiques en raison du caractère intracellulaire obligatoire de cette bactérie atypique, nécessitant un traitement antibiotique systémique adapté (azithromycine orale) plutôt qu'un simple collyre, et justifiant une recherche et un traitement de l'infection génitale sous-jacente ainsi que du ou des partenaires.",
    pharmacocinetique: "Azithromycine collyre (azithromycine 1,5%) : concentration locale très élevée au site d'action avec une diffusion systémique négligeable, permettant un schéma posologique court (2 fois par jour pendant 3 jours) contrairement aux autres antibiotiques topiques nécessitant des applications plus fréquentes et prolongées, avantage pratique significatif en termes d'observance pour le traitement de la conjonctivite bactérienne simple.",
    cas_clinique: "Patient 32 ans, conjonctivite unilatérale évoluant depuis 3 semaines, sécrétions modérées non franchement purulentes, traitement par collyre antibiotique classique sans amélioration. Que suspectez-vous ?\n\nRaisonnement : conjonctivite chronique résistante aux antibiotiques topiques classiques chez un adulte jeune → évoquer une conjonctivite à Chlamydia trachomatis (conjonctivite à inclusions), particulièrement si contexte sexuel à risque ou partenaire avec symptômes génitaux. Orientation pour prélèvement conjonctival avec recherche spécifique de Chlamydia, traitement par azithromycine orale (et non simplement topique) si confirmé, recherche et traitement d'une possible infection génitale associée ainsi que du ou des partenaires.",
    effets_secondaires: [
      {label:"Conjonctivite à Chlamydia non diagnostiquée : résistance aux traitements topiques classiques, évolution chronique prolongée", niveau:"warning"},
      {label:"Kérato-conjonctivite épidémique à adénovirus : atteinte cornéenne associée possible, photophobie prolongée au-delà de la conjonctivite elle-même", niveau:"warning"},
      {label:"Infection génitale à Chlamydia non dépistée chez le partenaire : risque de réinfection et de complications génitales propres", niveau:"warning"},
    ],
    classes: [
      {classe:"Azithromycine orale — conjonctivite à Chlamydia confirmée", dci:["Azithromycine 1g dose unique"], specialites:["Zithromax® monodose"], couleur:"#1B6B52", remarque:"Traitement systémique nécessaire en raison du caractère intracellulaire obligatoire de Chlamydia, recherche et traitement de l'infection génitale associée"},
      {classe:"Collyres corticoïdes — kératite associée sous avis ophtalmologique strict", dci:["Corticoïde collyre selon prescription spécialisée"], specialites:["Selon prescription ophtalmologique"], couleur:"#6B2D5E", remarque:"Réservés à une prescription ophtalmologique stricte, jamais en automédication en raison du risque sur une kératite herpétique méconnue"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse systémique majeure pour les collyres à action locale standard",
    ],
    points_cles: [
      "Conjonctivite à Chlamydia trachomatis : à évoquer devant une conjonctivite chronique résistante aux antibiotiques topiques classiques",
      "Traitement systémique (azithromycine orale) nécessaire pour la conjonctivite à Chlamydia, pas un simple collyre",
      "Kérato-conjonctivite épidémique à adénovirus : atteinte cornéenne possible, photophobie pouvant persister plusieurs semaines",
      "Collyres corticoïdes : jamais en automédication, réservés à une prescription ophtalmologique stricte (risque sur kératite herpétique méconnue)",
      "Conjonctivite à Chlamydia : toujours rechercher et traiter l'infection génitale sous-jacente et informer le ou les partenaires",
    ],
  },
  n4: {
    saviez_vous: "La kératite herpétique, à ne jamais confondre avec une simple conjonctivite virale banale, constitue une urgence ophtalmologique pouvant menacer la vision si elle n'est pas reconnue et traitée rapidement — un signe d'orientation important est la diminution de la sensibilité cornéenne (hypoesthésie cornéenne) caractéristique de cette pathologie, contrairement à la conjonctivite virale simple où la cornée n'est pas concernée.",
    physiopatho: "Conjonctivite du nouveau-né (ophtalmie néonatale) : entité spécifique nécessitant une vigilance particulière, pouvant être due à différents agents transmis lors de l'accouchement par voie basse — Chlamydia trachomatis (apparition entre J5 et J14, conjonctivite à inclusions néonatale pouvant évoluer vers une pneumopathie si non traitée), Neisseria gonorrhoeae (apparition plus précoce, dans les 24-48h suivant la naissance, forme potentiellement plus sévère avec risque de perforation cornéenne rapide si non traitée en urgence) — ces deux étiologies bactériennes spécifiques nécessitent une identification rapide et un traitement systémique adapté en milieu pédiatrique spécialisé, bien différent de la prise en charge d'une conjonctivite banale de l'adulte ou de l'enfant plus grand.",
    recommandations: "HAS / Société Française d'Ophtalmologie — Conjonctivite : traitement étiologique selon l'origine suspectée (antibiotique topique si bactérien évocateur, antihistaminique si allergique, mesures symptomatiques et d'hygiène si viral). Orientation ophtalmologique urgente devant tout signe d'alarme (baisse d'acuité visuelle, douleur intense, photophobie marquée, antécédent d'herpès oculaire). Vigilance particulière chez le nouveau-né en raison du risque d'étiologies spécifiques nécessitant une prise en charge urgente et adaptée.",
    situations_complexes: "Conjonctivite chez le porteur de lentilles de contact : seuil de vigilance abaissé en raison du risque accru de kératite bactérienne (notamment à Pseudomonas aeruginosa, germe particulièrement agressif pour la cornée), arrêt impératif du port de lentilles et orientation ophtalmologique rapide recommandée devant toute symptomatologie oculaire chez cette population, même en apparence banale initialement.\n\nKératite herpétique méconnue : risque de cicatrice cornéenne définitive avec baisse d'acuité visuelle séquellaire si traitement antiviral spécifique non instauré rapidement, distinction essentielle avec la conjonctivite virale banale à adénovirus qui ne nécessite pas ce type de traitement spécifique.\n\nConjonctivite néonatale à Neisseria gonorrhoeae : urgence pédiatrique et ophtalmologique absolue en raison du risque de perforation cornéenne rapide, traitement antibiotique systémique en urgence en milieu hospitalier spécialisé, dépistage et traitement systématique de la mère et du partenaire.",
    effets_secondaires: [
      {label:"Kératite herpétique méconnue et non traitée : risque de cicatrice cornéenne définitive avec baisse d'acuité visuelle séquellaire", niveau:"danger"},
      {label:"Conjonctivite néonatale à Neisseria gonorrhoeae non traitée en urgence : risque de perforation cornéenne rapide", niveau:"danger"},
      {label:"Kératite à Pseudomonas chez le porteur de lentilles : germe particulièrement agressif, évolution rapide possible vers une complication cornéenne grave", niveau:"danger"},
    ],
    classes: [
      {classe:"Antiviral topique/systémique — kératite herpétique confirmée", dci:["Aciclovir pommade ophtalmique ou voie orale selon sévérité"], specialites:["Zovirax® ophtalmique"], couleur:"#C0392B", remarque:"Traitement spécifique urgent sur avis ophtalmologique, jamais de corticoïde associé sans certitude diagnostique en raison du risque d'aggravation"},
      {classe:"Antibiothérapie systémique en urgence — conjonctivite néonatale à Neisseria gonorrhoeae", dci:["Céphalosporine de 3e génération selon protocole néonatal"], specialites:["Prise en charge hospitalière pédiatrique d'urgence"], couleur:"#991B1B", remarque:"Urgence néonatale absolue, traitement systémique en milieu hospitalier spécialisé, dépistage et traitement parental systématique"},
    ],
    interactions: [
      "Corticoïdes topiques oculaires + kératite herpétique non diagnostiquée : risque majeur d'aggravation, CI en l'absence de certitude diagnostique",
    ],
    points_cles: [
      "Kératite herpétique : urgence ophtalmologique, hypoesthésie cornéenne caractéristique, à ne jamais confondre avec une conjonctivite virale banale",
      "Conjonctivite néonatale : vigilance particulière sur les étiologies spécifiques (Chlamydia, Neisseria gonorrhoeae) nécessitant un traitement systémique urgent",
      "Porteur de lentilles de contact : seuil de vigilance abaissé, risque accru de kératite bactérienne agressive (Pseudomonas notamment)",
      "Jamais de collyre corticoïde en automédication : risque majeur d'aggravation en cas de kératite herpétique méconnue sous-jacente",
      "Tout signe d'alarme oculaire (baisse d'acuité visuelle, douleur intense, photophobie) : orientation ophtalmologique urgente systématique",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F45 — ACNÉ (formes modérées à sévères, complémentaire à acne-legere)
   ════════════════════════════════════════════════════════ */
FN['acne'] = {
  n2: {
    saviez_vous: "L'acné nodulaire et l'acné conglobata, formes sévères touchant principalement le tronc et le dos en plus du visage, peuvent laisser des cicatrices définitives si elles ne sont pas traitées rapidement et efficacement — contrairement à l'acné légère, ces formes nécessitent souvent un traitement systémique d'emblée plutôt qu'une simple escalade thérapeutique topique progressive, l'enjeu cicatriciel justifiant une prise en charge plus rapide et plus intensive.",
    schema: `<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:500px;font-family:sans-serif">
      <rect width="500" height="200" rx="12" fill="#FDF0EF"/>
      <!-- Etape 1: Follicule normal -->
      <g transform="translate(20,35)">
        <ellipse cx="45" cy="65" rx="40" ry="60" fill="white" stroke="#1B6B52" stroke-width="2"/>
        <rect x="38" y="10" width="14" height="55" rx="6" fill="#F5D98A"/>
        <text x="45" y="138" text-anchor="middle" font-size="10" fill="#1B6B52" font-weight="600">Follicule</text>
        <text x="45" y="150" text-anchor="middle" font-size="9" fill="#666">sébacé normal</text>
      </g>
      <line x1="110" y1="100" x2="142" y2="100" stroke="#999" stroke-width="2" marker-end="url(#arrA)"/>
      <!-- Etape 2: Obstruction -->
      <g transform="translate(145,35)">
        <ellipse cx="45" cy="65" rx="40" ry="60" fill="white" stroke="#B45309" stroke-width="2"/>
        <rect x="32" y="5" width="26" height="62" rx="10" fill="#92400E"/>
        <text x="45" y="138" text-anchor="middle" font-size="10" fill="#B45309" font-weight="600">Hyperkératose</text>
        <text x="45" y="150" text-anchor="middle" font-size="9" fill="#666">+ hyperséborrhée</text>
      </g>
      <line x1="235" y1="100" x2="267" y2="100" stroke="#999" stroke-width="2" marker-end="url(#arrA)"/>
      <!-- Etape 3: Rupture + inflammation -->
      <g transform="translate(270,35)">
        <ellipse cx="45" cy="65" rx="40" ry="60" fill="#FDF0EF" stroke="#C0392B" stroke-width="2"/>
        <circle cx="30" cy="50" r="7" fill="#C0392B"/>
        <circle cx="58" cy="60" r="6" fill="#C0392B"/>
        <circle cx="42" cy="78" r="6" fill="#C0392B"/>
        <text x="45" y="20" text-anchor="middle" font-size="14">💥</text>
        <text x="45" y="138" text-anchor="middle" font-size="10" fill="#C0392B" font-weight="600">Rupture folliculaire</text>
        <text x="45" y="150" text-anchor="middle" font-size="9" fill="#666">+ inflammation profonde</text>
      </g>
      <line x1="360" y1="100" x2="392" y2="100" stroke="#999" stroke-width="2" marker-end="url(#arrA)"/>
      <!-- Etape 4: Cicatrice -->
      <g transform="translate(395,35)">
        <rect x="5" y="20" width="80" height="90" rx="8" fill="white" stroke="#6B2D5E" stroke-width="2"/>
        <path d="M20,40 Q45,55 30,75 Q50,85 40,100" fill="none" stroke="#6B2D5E" stroke-width="3" stroke-linecap="round"/>
        <text x="45" y="138" text-anchor="middle" font-size="10" fill="#6B2D5E" font-weight="600">Cicatrice</text>
        <text x="45" y="150" text-anchor="middle" font-size="9" fill="#666">si non traité à temps</text>
      </g>
      <defs><marker id="arrA" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker></defs>
    </svg>`,
    physiopatho: "Dans les formes sévères d'acné, au-delà des mécanismes communs avec l'acné légère (hyperséborrhée, hyperkératinisation folliculaire, Cutibacterium acnes, inflammation), une réponse inflammatoire particulièrement intense et profonde caractérise les nodules et l'acné conglobata → rupture folliculaire profonde avec dissémination du contenu folliculaire dans le derme → réaction inflammatoire granulomateuse à corps étranger → destruction tissulaire pouvant atteindre l'hypoderme → cicatrices définitives (hypertrophiques, chéloïdiennes ou plus souvent atrophiques) si le contrôle inflammatoire n'est pas obtenu rapidement.",
    mecanisme: "Isotrétinoïne orale : dérivé de la vitamine A agissant simultanément sur les 4 mécanismes physiopathologiques de l'acné — réduction drastique de la production de sébum (jusqu'à 90%), normalisation de la kératinisation folliculaire, réduction indirecte de C. acnes (par modification de l'environnement folliculaire), et effet anti-inflammatoire propre → seul traitement permettant une rémission prolongée, voire définitive, après une cure complète, contrairement aux traitements topiques ou aux antibiotiques qui ne traitent que partiellement les mécanismes en jeu.\n\nAntibiotiques oraux (doxycycline, lymécycline) : utilisés en association aux topiques dans les formes modérées avant d'envisager l'isotrétinoïne, action anti-inflammatoire et antibactérienne sur C. acnes, durée limitée (3 mois maximum) pour limiter la pression de sélection de résistances.",
    diagnostic: "Classification de sévérité (échelle GEA ou équivalent) distinguant l'acné légère (comédons, quelques papulo-pustules) de l'acné modérée (papulo-pustules plus nombreuses) et sévère (nodules, kystes, conglobata) — cette gradation guide directement l'escalade thérapeutique, les formes sévères ou très inflammatoires justifiant une orientation dermatologique rapide plutôt qu'une simple poursuite des topiques en automédication.",
    effets_secondaires: [
      {label:"Isotrétinoïne : tératogénicité majeure — programme de prévention de grossesse strict obligatoire chez la femme en âge de procréer", niveau:"danger"},
      {label:"Isotrétinoïne : sécheresse cutanéo-muqueuse intense (lèvres, yeux, nez), à anticiper systématiquement", niveau:"warning"},
      {label:"Cicatrices définitives si traitement retardé sur une acné sévère évolutive : enjeu esthétique et psychologique majeur", niveau:"danger"},
    ],
    classes: [
      {classe:"Isotrétinoïne orale — référence formes sévères/nodulaires", dci:["Isotrétinoïne 0,5-1mg/kg/j, cure de plusieurs mois"], specialites:["Curacné®","Procuta®"], couleur:"#C0392B", remarque:"Programme de prévention de la grossesse obligatoire, bilan biologique de surveillance (lipides, transaminases), seul traitement à visée curative durable"},
      {classe:"Cyclines orales — association aux topiques en formes modérées", dci:["Doxycycline 100mg/j","Lymécycline 300mg/j"], specialites:["Tolexine®","Tetralysal 300®"], couleur:"#1E3A5F", remarque:"Durée limitée à 3 mois maximum, toujours associées à un traitement topique (jamais en monothérapie prolongée)"},
    ],
    interactions: [
      "Isotrétinoïne + cyclines : CI absolue (risque d'hypertension intracrânienne bénigne)",
      "Isotrétinoïne + vitamine A ou rétinoïdes topiques associés : risque de surdosage en vitamine A — à éviter",
    ],
    points_cles: [
      "Acné nodulaire/conglobata : risque de cicatrices définitives, justifie une prise en charge rapide et intensive",
      "Isotrétinoïne : seul traitement à visée curative durable, agissant sur les 4 mécanismes physiopathologiques simultanément",
      "Programme de prévention de la grossesse : obligatoire et strict sous isotrétinoïne chez la femme en âge de procréer",
      "Cyclines orales : toujours en association aux topiques, jamais en monothérapie, durée limitée à 3 mois",
      "Orientation dermatologique rapide recommandée devant toute acné sévère ou très inflammatoire pour limiter le risque cicatriciel",
    ],
  },
  n3: {
    saviez_vous: "Le mécanisme exact de la tératogénicité de l'isotrétinoïne reste partiellement débattu mais implique une perturbation de la signalisation par l'acide rétinoïque, essentielle au développement embryonnaire normal — le risque concerne une fenêtre précise de la grossesse (organogenèse), expliquant l'exigence d'une contraception efficace débutée avant le traitement et poursuivie un mois après son arrêt.",
    physiopatho: "Acné de la femme adulte et hyperandrogénie : contrairement à l'acné de l'adolescent, l'acné persistante ou d'apparition tardive chez la femme adulte (notamment à prédominance mandibulaire et associée à des signes d'hyperandrogénie comme l'hirsutisme ou des troubles du cycle) doit faire évoquer un syndrome des ovaires polykystiques (SOPK) ou une autre cause d'hyperandrogénie, justifiant une exploration hormonale (testostérone, SDHEA) avant d'orienter le traitement, qui peut alors bénéficier d'une approche hormonale spécifique (contraception anti-androgénique) en complément du traitement dermatologique classique.",
    pharmacocinetique: "Isotrétinoïne : forte liposolubilité, accumulation tissulaire (notamment adipeuse) expliquant une élimination prolongée après l'arrêt du traitement, biodisponibilité augmentée significativement par la prise concomitante d'un repas gras (jusqu'à doubler l'absorption) — élément pratique important pour optimiser l'efficacité du traitement à dose égale.",
    cas_clinique: "Femme 26 ans, acné inflammatoire prédominant sur la mandibule et le menton depuis 2 ans, irrégularités menstruelles associées, légère hyperpilosité faciale. Quelle est votre démarche ?\n\nRaisonnement : tableau évocateur d'acné liée à une hyperandrogénie (topographie mandibulaire, signes associés) → bilan hormonal à proposer (recherche de SOPK notamment) avant d'orienter le traitement, qui pourrait bénéficier d'une contraception à effet anti-androgénique en complément du traitement topique/systémique dermatologique classique, plutôt qu'une simple escalade thérapeutique dermatologique isolée sans recherche de la cause hormonale sous-jacente.",
    effets_secondaires: [
      {label:"Isotrétinoïne + repas gras : interaction pharmacocinétique positive recherchée (↑ absorption), à ne pas confondre avec une interaction délétère", niveau:"info"},
      {label:"SOPK méconnu derrière une acné de la femme adulte : retard diagnostique d'une pathologie endocrinienne avec d'autres implications (fertilité, métabolisme)", niveau:"warning"},
    ],
    classes: [
      {classe:"Contraception anti-androgénique — acné avec hyperandrogénie associée", dci:["Éthinylestradiol + acétate de cyprotérone ou drospirénone"], specialites:["Diane 35®","Jasmine®"], couleur:"#6B2D5E", remarque:"Option thérapeutique en cas d'acné liée à une hyperandrogénie confirmée, en complément du traitement dermatologique classique"},
    ],
    interactions: [
      "Isotrétinoïne + alcool : ↑ risque d'hépatotoxicité cumulée — limiter la consommation pendant le traitement",
    ],
    points_cles: [
      "Acné de la femme adulte à topographie mandibulaire avec signes d'hyperandrogénie : rechercher un SOPK sous-jacent",
      "Isotrétinoïne : absorption optimisée par la prise au cours d'un repas gras, élément pratique à connaître",
      "Contraception anti-androgénique : option complémentaire intéressante en cas d'acné liée à une hyperandrogénie confirmée",
      "Fenêtre tératogène de l'isotrétinoïne : justifie la contraception efficace avant, pendant, et 1 mois après le traitement",
      "Bilan hormonal : à proposer devant toute acné atypique de la femme adulte avec signes d'hyperandrogénie associés",
    ],
  },
  n4: {
    saviez_vous: "Le programme de prévention de la grossesse sous isotrétinoïne, encadré strictement en France (carnet patient, accord de soins, tests de grossesse mensuels), illustre une approche réglementaire rigoureuse face à un risque tératogène majeur et bien documenté — ce dispositif, bien que parfois perçu comme contraignant par les patientes, reste indispensable au regard de la gravité potentielle des malformations en cause en cas d'exposition fœtale.",
    physiopatho: "Acné fulminans : forme exceptionnelle et gravissime d'acné, survenant brutalement chez l'adolescent (généralement masculin), associant une éruption nodulo-ulcéreuse extensive et hémorragique à des signes systémiques sévères (fièvre élevée, douleurs articulaires, altération de l'état général) — cette forme nécessite une prise en charge hospitalière en urgence avec corticothérapie systémique initiale avant l'introduction prudente et retardée de l'isotrétinoïne, contrairement aux formes sévères habituelles où l'isotrétinoïne peut être introduite directement.",
    recommandations: "SFD — Acné : traitement topique en 1ère intention pour les formes légères-modérées. Cyclines orales associées aux topiques pour les formes modérées résistantes. Isotrétinoïne orale pour les formes sévères, nodulaires, ou résistantes aux traitements précédents bien conduits, avec programme de prévention de grossesse strict si patiente en âge de procréer. Recherche d'une cause hormonale sous-jacente devant toute acné atypique de la femme adulte.",
    situations_complexes: "Acné fulminans : urgence dermatologique, hospitalisation et corticothérapie systémique initiale avant introduction très prudente et retardée de l'isotrétinoïne, sous peine d'aggravation paradoxale en début de traitement.\n\nIsotrétinoïne et risque psychiatrique : un signal de pharmacovigilance concernant un risque possible de troubles de l'humeur (dépression, plus rarement idées suicidaires) a conduit à une surveillance renforcée de l'état psychique pendant le traitement, sans que la causalité soit définitivement établie, mais justifiant une vigilance et une information du patient et de son entourage.\n\nAcné cicatricielle constituée : au-delà du traitement de l'acné active, des techniques dermatologiques spécifiques (laser, peeling, micro-needling) peuvent être proposées secondairement pour atténuer les cicatrices déjà constituées, après contrôle de la phase inflammatoire active.",
    effets_secondaires: [
      {label:"Acné fulminans : urgence dermatologique avec signes systémiques sévères, hospitalisation nécessaire", niveau:"danger"},
      {label:"Isotrétinoïne : signal de pharmacovigilance sur le risque de troubles de l'humeur, surveillance psychique renforcée recommandée", niveau:"warning"},
      {label:"Exposition fœtale à l'isotrétinoïne : malformations majeures (craniofaciales, cardiaques, neurologiques) en cas de grossesse non prévenue", niveau:"danger"},
    ],
    classes: [
      {classe:"Corticothérapie systémique initiale — acné fulminans", dci:["Prednisolone selon prescription spécialisée"], specialites:["Solupred®"], couleur:"#991B1B", remarque:"Phase initiale obligatoire avant introduction prudente et retardée de l'isotrétinoïne dans cette forme exceptionnelle et sévère"},
    ],
    interactions: [
      "Isotrétinoïne + corticothérapie dans l'acné fulminans : association initiale nécessaire selon un protocole spécifique encadré",
    ],
    points_cles: [
      "Programme de prévention de la grossesse sous isotrétinoïne : encadrement strict et indispensable au regard du risque tératogène majeur",
      "Acné fulminans : forme exceptionnelle et gravissime, hospitalisation et corticothérapie initiale avant isotrétinoïne",
      "Surveillance de l'état psychique recommandée sous isotrétinoïne, en raison d'un signal de pharmacovigilance non définitivement causal",
      "Techniques dermatologiques spécifiques (laser, peeling) : pour les cicatrices déjà constituées, après contrôle de la phase active",
      "Le pharmacien a un rôle clé dans l'accompagnement et la vérification du respect du programme de prévention de grossesse",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F46 — BRÛLURES D'ESTOMAC (épisode ponctuel, complémentaire au RGO chronique)
   ════════════════════════════════════════════════════════ */
FN['brulures-estomac-rgo'] = {
  n2: {
    saviez_vous: "Une brûlure d'estomac occasionnelle après un repas copieux, épicé ou arrosé n'est pas synonyme de RGO pathologique — c'est un phénomène physiologique fréquent chez la majorité des personnes en bonne santé, ne nécessitant qu'un traitement symptomatique ponctuel, à bien différencier du RGO chronique qui se définit par la récurrence et la fréquence des symptômes dans le temps.",
    physiopatho: "La brûlure d'estomac ponctuelle résulte d'une remontée transitoire de contenu gastrique acide, favorisée par des facteurs déclenchants identifiables et souvent évitables : repas copieux ou riche en graisses (ralentit la vidange gastrique et favorise les relaxations transitoires du sphincter inférieur de l'œsophage), alcool et excès de café (relaxation directe du SIO), position allongée précoce après le repas, certains aliments épicés ou acides irritant directement la muqueuse — contrairement au RGO chronique, ces épisodes restent isolés et ne traduisent pas un dysfonctionnement structurel ou fonctionnel durable du système anti-reflux.",
    mecanisme: "Antiacides (hydroxyde d'aluminium/magnésium) : neutralisation chimique directe et immédiate de l'acidité gastrique au contact, action rapide mais de courte durée (30-60 minutes), adaptés au traitement symptomatique ponctuel d'un épisode isolé plutôt qu'à un traitement de fond prolongé.\n\nAlginates : formation d'un gel visqueux flottant à la surface du contenu gastrique, créant une barrière mécanique physique limitant la remontée du contenu acide vers l'œsophage lors des épisodes de reflux, action complémentaire aux antiacides, particulièrement utile en prise après le repas ou au coucher en cas de symptômes positionnels.",
    diagnostic: "Diagnostic purement clinique et contextuel : brûlure rétrosternale survenant dans les heures suivant un repas identifié comme déclenchant, épisode isolé ou occasionnel (quelques fois par mois maximum), sans autre symptôme associé. Aucune exploration nécessaire pour ce tableau typique et ponctuel, à distinguer du RGO chronique (symptômes fréquents et récurrents sur plusieurs semaines) qui justifie une prise en charge différente.",
    effets_secondaires: [
      {label:"Automédication répétée et prolongée par antiacides sans réévaluation : pourrait masquer un RGO chronique sous-jacent non identifié comme tel", niveau:"warning"},
      {label:"Antiacides à base de magnésium : effet laxatif possible à forte dose ou usage répété", niveau:"info"},
      {label:"Antiacides à base d'aluminium : effet constipant possible à forte dose ou usage répété", niveau:"info"},
    ],
    classes: [
      {classe:"Antiacides — traitement symptomatique immédiat", dci:["Hydroxyde d'aluminium/magnésium"], specialites:["Maalox®","Phosphalugel®"], couleur:"#1B6B52", remarque:"Action rapide et de courte durée, adapté à l'épisode ponctuel, à prendre au moment de la gêne ou en prévention avant un repas identifié comme déclenchant"},
      {classe:"Alginates — barrière mécanique complémentaire", dci:["Alginate de sodium"], specialites:["Gaviscon®"], couleur:"#1E3A5F", remarque:"Particulièrement utile après le repas ou au coucher en cas de symptômes positionnels, action complémentaire aux antiacides"},
    ],
    interactions: [
      "Antiacides + de nombreux médicaments oraux (certains antibiotiques, lévothyroxine, bisphosphonates) : chélation et ↓ absorption — espacer systématiquement de 2h",
    ],
    points_cles: [
      "Brûlure d'estomac occasionnelle ≠ RGO pathologique : phénomène physiologique fréquent ne nécessitant qu'un traitement ponctuel",
      "Facteurs déclenchants identifiables (repas copieux, alcool, café, position allongée précoce) : à reconnaître et éviter en prévention",
      "Antiacides et alginates : traitement de l'épisode ponctuel, action rapide mais de courte durée, pas un traitement de fond",
      "Espacement systématique de 2h avec de nombreux autres médicaments oraux en raison du risque de chélation et de malabsorption",
      "Récurrence ou fréquence croissante des épisodes : signal devant faire reconsidérer le diagnostic vers un authentique RGO chronique",
    ],
  },
  n3: {
    saviez_vous: "Le seuil de fréquence à partir duquel des brûlures d'estomac occasionnelles doivent être reconsidérées comme un authentique RGO nécessitant une évaluation médicale et un traitement de fond est généralement fixé à environ 2 épisodes par semaine sur une durée prolongée — un repère pratique utile pour orienter le conseil pharmaceutique entre simple automédication ponctuelle et nécessité d'orientation médicale.",
    physiopatho: "Rôle du tissu adipeux abdominal dans les brûlures d'estomac post-prandiales : l'excès de graisse abdominale (notamment viscérale) augmente la pression intra-abdominale de façon chronique, favorisant à la fois une hernie hiatale et des relaxations transitoires plus fréquentes du SIO après les repas — ce mécanisme mécanique explique la fréquence accrue de brûlures d'estomac post-prandiales chez les personnes en surpoids ou obèses, même en l'absence de RGO structurellement établi, et justifie le conseil de perte de poids comme mesure préventive de première intention dans ce contexte précis.",
    pharmacocinetique: "Antiacides à base d'aluminium/magnésium : action purement locale dans la lumière gastrique, absorption systémique minime aux doses usuelles ponctuelles mais à surveiller en cas d'usage répété et prolongé chez l'insuffisant rénal (risque d'accumulation d'aluminium ou de magnésium dans ce contexte spécifique), justifiant une prudence accrue dans cette population particulière même pour un usage apparemment ponctuel.",
    cas_clinique: "Patient 45 ans, surpoids modéré (IMC 28), consulte le pharmacien pour des brûlures d'estomac survenant 2 à 3 fois par semaine depuis 2 mois, après les repas du soir notamment. Que conseillez-vous ?\n\nRaisonnement : fréquence des épisodes (2-3 fois/semaine sur plusieurs semaines) dépassant le cadre de l'épisode ponctuel isolé et orientant vers un authentique RGO débutant plutôt qu'une simple brûlure occasionnelle → conseil de mesures hygiéno-diététiques (perte de poids, éviter les repas tardifs et copieux le soir, surélévation de la tête de lit), orientation vers une consultation médicale pour évaluation et discussion d'un traitement de fond par IPP si les symptômes persistent malgré ces mesures, plutôt que la poursuite d'une automédication par antiacides ponctuels qui ne résoudrait pas la cause sous-jacente.",
    effets_secondaires: [
      {label:"Surpoids et brûlures d'estomac post-prandiales fréquentes : lien mécanique direct par augmentation de la pression intra-abdominale", niveau:"info"},
      {label:"Automédication prolongée par antiacides au-delà du seuil de fréquence évocateur de RGO : retarde une prise en charge adaptée", niveau:"warning"},
    ],
    classes: [
      {classe:"Mesures hygiéno-diététiques — 1ère intention si fréquence croissante", dci:["Perte de poids, éviter repas tardifs/copieux, surélévation tête de lit"], specialites:["Non médicamenteux"], couleur:"#1B6B52", remarque:"À recommander systématiquement avant ou en complément de tout traitement médicamenteux en cas de fréquence croissante des épisodes"},
      {classe:"Orientation vers IPP de courte durée — si persistance malgré mesures hygiéno-diététiques", dci:["IPP 20mg/j, courte durée, sur avis médical"], specialites:["Mopral®","Inexium®"], couleur:"#1E3A5F", remarque:"À discuter avec le médecin si les épisodes deviennent fréquents et récurrents malgré les mesures hygiéno-diététiques, distinct de l'automédication par antiacides ponctuels"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse spécifique supplémentaire notable pour cette section au-delà de celles déjà mentionnées",
    ],
    points_cles: [
      "Seuil de fréquence (environ 2 épisodes/semaine sur durée prolongée) : repère pratique pour orienter entre automédication et avis médical",
      "Surpoids abdominal : facteur mécanique direct des brûlures d'estomac post-prandiales par augmentation de la pression intra-abdominale",
      "Perte de poids : mesure préventive de 1ère intention chez le patient en surpoids avec brûlures d'estomac fréquentes",
      "Prudence avec les antiacides chez l'insuffisant rénal, même pour un usage apparemment ponctuel, en raison du risque d'accumulation",
      "Rôle du pharmacien : orienter vers une consultation médicale si la fréquence dépasse le cadre de l'épisode ponctuel isolé",
    ],
  },
  n4: {
    saviez_vous: "Certains médicaments largement utilisés peuvent eux-mêmes provoquer ou aggraver des brûlures d'estomac par irritation directe de la muqueuse œso-gastrique ou par relaxation du sphincter inférieur de l'œsophage — une cause iatrogène souvent négligée qu'il convient de rechercher systématiquement devant des brûlures d'estomac d'apparition récente chez un patient ayant débuté un nouveau traitement, avant d'attribuer par défaut les symptômes à un RGO primitif.",
    physiopatho: "Médicaments favorisant les brûlures d'estomac par mécanismes distincts : les AINS et l'aspirine irritent directement la muqueuse gastrique (inhibition des prostaglandines protectrices) ; les inhibiteurs calciques, les dérivés nitrés, et certains anticholinergiques relaxent le sphincter inférieur de l'œsophage, favorisant le reflux ; les bisphosphonates oraux peuvent provoquer une œsophagite directe par contact prolongé s'ils ne sont pas pris selon les règles strictes recommandées (position verticale, grand verre d'eau) — cette diversité de mécanismes explique l'importance d'une anamnèse médicamenteuse rigoureuse devant toute brûlure d'estomac d'apparition récente ou inhabituelle.",
    recommandations: "SNFGE — Brûlures d'estomac occasionnelles : antiacides ou alginates en traitement symptomatique ponctuel pour les épisodes isolés et peu fréquents. Mesures hygiéno-diététiques systématiquement recommandées (poids, alimentation, position). Orientation médicale si fréquence ≥ 2 fois/semaine sur plusieurs semaines, signes d'alarme associés, ou échec des mesures simples, pour réévaluation diagnostique et discussion d'un traitement de fond adapté (IPP) si un authentique RGO chronique est confirmé.",
    situations_complexes: "Brûlures d'estomac sous AINS au long cours : situation fréquente nécessitant une réévaluation de la nécessité du traitement AINS lui-même, association possible d'un IPP protecteur gastrique si l'AINS reste indispensable, plutôt qu'un simple traitement symptomatique des brûlures sans s'attaquer à la cause médicamenteuse sous-jacente.\n\nBrûlures d'estomac et grossesse : très fréquentes en raison des modifications hormonales et mécaniques de la grossesse, antiacides et alginates utilisables sans restriction majeure en 1ère intention, orientation vers un IPP si nécessaire selon les données de sécurité disponibles en cas de symptômes plus fréquents ou intenses.\n\nBrûlures d'estomac persistantes malgré IPP bien pris à dose adaptée : ne pas se contenter de majorer indéfiniment la dose d'antiacide ou d'alginate en automédication, réorienter vers une réévaluation médicale pour rechercher une cause alternative ou une véritable résistance au traitement nécessitant une exploration spécifique.",
    effets_secondaires: [
      {label:"AINS et brûlures d'estomac : irritation directe de la muqueuse, à reconnaître comme cause iatrogène avant d'attribuer par défaut à un RGO primitif", niveau:"warning"},
      {label:"Bisphosphonates oraux mal pris : œsophagite directe par contact prolongé, règles de prise strictes à respecter impérativement", niveau:"warning"},
      {label:"Persistance des brûlures malgré automédication bien conduite : signal devant motiver une réorientation médicale plutôt qu'une escalade en autonomie", niveau:"warning"},
    ],
    classes: [
      {classe:"IPP protecteur gastrique — association systématique si AINS indispensable au long cours", dci:["Oméprazole 20mg/j en association"], specialites:["Mopral®"], couleur:"#B45309", remarque:"Protection gastrique systématique chez les patients sous AINS au long cours, particulièrement si facteurs de risque associés (âge, antécédent ulcéreux)"},
    ],
    interactions: [
      "AINS + brûlures d'estomac récurrentes : signal d'alerte à ne pas négliger, réévaluation de la nécessité du traitement AINS recommandée",
      "Bisphosphonates oraux + non-respect des règles de prise : risque d'œsophagite directe, éducation systématique du patient indispensable",
    ],
    points_cles: [
      "Cause iatrogène : à rechercher systématiquement devant des brûlures d'estomac d'apparition récente après un nouveau traitement",
      "AINS, inhibiteurs calciques, dérivés nitrés, bisphosphonates : médicaments fréquemment impliqués par des mécanismes distincts",
      "Protection gastrique par IPP : à associer systématiquement chez les patients sous AINS au long cours avec facteurs de risque",
      "Grossesse : brûlures d'estomac très fréquentes, antiacides et alginates utilisables en 1ère intention sans restriction majeure",
      "Persistance malgré automédication bien conduite : signal devant motiver une réorientation médicale plutôt qu'une escalade autonome",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F47 — STRESS (réaction aiguë, complémentaire au trouble anxieux généralisé chronique)
   ════════════════════════════════════════════════════════ */
FN['stress-anxiete'] = {
  n2: {
    saviez_vous: "Le stress aigu, réaction physiologique normale et adaptative face à une situation perçue comme menaçante ou exigeante (examen, entretien, événement de vie ponctuel), doit être distingué du trouble anxieux généralisé chronique — contrairement à ce dernier qui persiste indépendamment du contexte, le stress aigu est temporellement lié à un déclencheur identifiable et se résout généralement spontanément une fois la situation passée, ne nécessitant le plus souvent qu'une prise en charge symptomatique ponctuelle plutôt qu'un traitement de fond.",
    physiopatho: "Le stress aigu active l'axe hypothalamo-hypophyso-surrénalien et le système nerveux sympathique → libération de cortisol et de catécholamines (adrénaline, noradrénaline) → réponse physiologique adaptative de type 'combat-fuite' (accélération du rythme cardiaque, tension musculaire, hypervigilance, mobilisation énergétique) → cette réponse, bénéfique et adaptative à court terme pour faire face à une situation exigeante ponctuelle, devient inconfortable si elle est disproportionnée par rapport à l'enjeu réel ou si elle se prolonge au-delà de la résolution de la situation déclenchante.",
    mecanisme: "Phytothérapie anxiolytique douce (valériane, passiflore, aubépine) : mécanismes d'action variés et moins puissants que les anxiolytiques classiques (modulation GABAergique modeste pour la valériane notamment), profil de tolérance favorable, intérêt pour les manifestations de stress léger à modéré sans risque de dépendance ni de sédation excessive, alternative de première intention pour de nombreuses situations de stress ponctuel ne justifiant pas un traitement médicamenteux anxiolytique classique.\n\nMagnésium : cofacteur de nombreuses réactions enzymatiques impliquées dans la régulation neuromusculaire et la transmission nerveuse, une carence relative pouvant majorer la sensibilité au stress et les manifestations physiques associées (tensions musculaires, fatigue), supplémentation parfois proposée en cas de stress chronique avec apports alimentaires possiblement insuffisants.",
    diagnostic: "Diagnostic essentiellement clinique et contextuel : symptômes (tension, irritabilité, troubles du sommeil transitoires, difficultés de concentration) clairement rattachés à un événement ou une période identifiable, sans les critères de durée et de généralisation du trouble anxieux généralisé (qui nécessite une présence quasi quotidienne pendant au moins 6 mois sur plusieurs domaines de vie). La distinction avec un authentique trouble anxieux est essentielle pour adapter la prise en charge et éviter une médicalisation excessive d'une réaction normale et transitoire.",
    effets_secondaires: [
      {label:"Stress aigu mal géré et répété : peut, à terme, favoriser l'émergence d'un trouble anxieux généralisé ou d'un épuisement professionnel (burn-out)", niveau:"warning"},
      {label:"Phytothérapie anxiolytique : généralement bien tolérée, rares somnolences avec certaines plantes à dose élevée", niveau:"info"},
      {label:"Confusion entre stress ponctuel et trouble anxieux chronique : risque de sous-traitement d'un authentique trouble ou de sur-médicalisation d'une réaction normale", niveau:"warning"},
    ],
    classes: [
      {classe:"Phytothérapie anxiolytique douce — stress léger à modéré", dci:["Valériane, passiflore, aubépine"], specialites:["Euphytose®","Sympathyl®"], couleur:"#1B6B52", remarque:"Profil de tolérance favorable, sans risque de dépendance, adapté aux manifestations de stress ponctuel léger à modéré"},
      {classe:"Magnésium — complément en cas de stress avec tensions associées", dci:["Magnésium 300mg/j"], specialites:["Magné B6®","Granions de Magnésium®"], couleur:"#1E3A5F", remarque:"Intérêt notamment en cas de carence relative et de manifestations physiques de tension musculaire associées au stress"},
      {classe:"Benzodiazépines à très courte durée — situation aiguë ponctuelle exceptionnelle", dci:["Selon prescription médicale, durée très limitée"], specialites:["Selon prescription"], couleur:"#B45309", remarque:"Réservées à des situations aiguës très ponctuelles et exceptionnelles sur prescription médicale, jamais en automédication ni en usage répété"},
    ],
    interactions: [
      "Phytothérapie anxiolytique + alcool ou sédatifs : potentialisation possible de la sédation, prudence et information du patient",
      "Magnésium + certains antibiotiques (cyclines, fluoroquinolones) : chélation et ↓ absorption de l'antibiotique — espacer les prises",
    ],
    points_cles: [
      "Stress aigu : réaction physiologique normale et adaptative, à distinguer du trouble anxieux généralisé chronique",
      "Lien temporel avec un déclencheur identifiable et résolution spontanée attendue : caractéristiques distinctives du stress aigu",
      "Phytothérapie anxiolytique douce : option de 1ère intention pour le stress léger à modéré, sans risque de dépendance",
      "Stress aigu répété et mal géré : peut à terme favoriser un trouble anxieux généralisé ou un épuisement professionnel",
      "Éviter la médicalisation excessive d'une réaction de stress normale et transitoire tout en restant vigilant sur son évolution",
    ],
  },
  n3: {
    saviez_vous: "Le concept de 'stress allostatique' décrit l'usure physiologique cumulative résultant d'une exposition répétée ou chronique à des facteurs de stress, même de faible intensité individuelle — ce mécanisme explique comment des stress répétés apparemment anodins peuvent, à terme, contribuer au développement de pathologies somatiques (cardiovasculaires, métaboliques) bien au-delà du simple inconfort psychologique initialement ressenti.",
    physiopatho: "Distinction entre stress aigu adaptatif et stress chronique délétère : le stress aigu ponctuel, par son caractère limité dans le temps, permet une récupération complète des systèmes physiologiques activés (cortisol, système sympathique) une fois la situation résolue. En revanche, l'exposition répétée ou prolongée à des facteurs de stress (même d'intensité modérée mais répétés) ne permet pas cette récupération complète entre les épisodes → maintien d'une activation physiologique de bas grade chronique → dysrégulation progressive de l'axe hypothalamo-hypophyso-surrénalien (parfois avec un profil de cortisol matinal aplati, signature biologique du stress chronique) → ce mécanisme distingue fondamentalement le stress chronique du simple stress aigu répété sans cumul délétère.",
    pharmacocinetique: "Extraits de valériane : composés actifs multiples (acides valéréniques, valépotriates) dont les mécanismes d'action exacts restent partiellement élucidés, action présumée sur les récepteurs GABA-A avec une affinité plus faible que les benzodiazépines classiques, expliquant un effet anxiolytique modéré sans les risques de dépendance et de tolérance propres aux benzodiazépines, délai d'action généralement progressif sur plusieurs jours d'utilisation régulière plutôt qu'un effet immédiat ponctuel.",
    cas_clinique: "Cadre 38 ans, stress professionnel intense depuis plusieurs mois en raison d'une surcharge de travail persistante, troubles du sommeil, irritabilité, fatigue croissante, sans inquiétude excessive généralisée à d'autres domaines de vie. Que proposez-vous ?\n\nRaisonnement : tableau de stress chronique professionnel (durée prolongée, contexte spécifique identifié plutôt qu'une inquiétude généralisée à tous les domaines de vie comme dans le TAG) avec risque d'évolution vers un épuisement professionnel si la situation persiste sans intervention → conseil de mesures d'hygiène de vie (sommeil, activité physique), phytothérapie anxiolytique douce en soutien symptomatique, mais surtout orientation vers une réflexion sur l'organisation du travail et éventuellement un accompagnement par la médecine du travail ou un psychologue, la cause structurelle (surcharge professionnelle) nécessitant une approche allant au-delà du simple traitement symptomatique.",
    effets_secondaires: [
      {label:"Stress chronique professionnel non pris en charge : risque d'évolution vers un épuisement professionnel (burn-out) ou un authentique trouble anxieux/dépressif", niveau:"danger"},
      {label:"Profil de cortisol matinal aplati : signature biologique du stress chronique, témoin d'une dysrégulation physiologique prolongée", niveau:"warning"},
    ],
    classes: [
      {classe:"Extraits de valériane à dose régulière — stress chronique modéré", dci:["Valériane extrait sec 300-600mg/j"], specialites:["Euphytose®","Spécialités à base de valériane seule"], couleur:"#1B6B52", remarque:"Effet anxiolytique modéré se développant progressivement sur plusieurs jours d'utilisation régulière plutôt qu'effet immédiat"},
      {classe:"Accompagnement par la médecine du travail — stress professionnel chronique", dci:["Prise en charge non médicamenteuse spécifique"], specialites:["Service de santé au travail"], couleur:"#1E3A5F", remarque:"Approche essentielle pour s'attaquer à la cause structurelle (organisation du travail) plutôt que seulement aux symptômes"},
    ],
    interactions: [
      "Valériane + autres sédatifs : addition possible des effets sédatifs, prudence en cas d'association",
    ],
    points_cles: [
      "Stress allostatique : usure physiologique cumulative du stress répété, pouvant contribuer à des pathologies somatiques à terme",
      "Stress chronique : maintien d'une activation physiologique de bas grade par absence de récupération complète entre les épisodes",
      "Profil de cortisol matinal aplati : signature biologique witnessing la dysrégulation du stress chronique prolongé",
      "Stress professionnel chronique : nécessite une approche allant au-delà du symptomatique, incluant l'organisation du travail",
      "Évolution possible vers un épuisement professionnel ou un authentique trouble anxieux/dépressif si non pris en charge",
    ],
  },
  n4: {
    saviez_vous: "Le burn-out (épuisement professionnel), bien que ne constituant pas une entité diagnostique formelle dans les classifications psychiatriques internationales actuelles, est désormais reconnu par l'Organisation Mondiale de la Santé comme un 'phénomène lié au travail' caractérisé par trois dimensions spécifiques (épuisement émotionnel, dépersonnalisation/cynisme, sentiment d'inefficacité professionnelle) — sa distinction d'avec un trouble dépressif caractérisé reste parfois complexe en pratique clinique, nécessitant une évaluation attentive du contexte et de la spécificité professionnelle des symptômes.",
    physiopatho: "Mécanismes neurobiologiques du stress chronique et risque cardiovasculaire/métabolique : l'exposition prolongée à un excès de cortisol (hypercortisolisme chronique relatif) favorise une résistance à l'insuline, une accumulation de tissu adipeux viscéral, et une inflammation systémique de bas grade — ces mécanismes convergent pour expliquer le lien épidémiologique documenté entre stress chronique professionnel ou psychosocial et risque accru d'événements cardiovasculaires, de syndrome métabolique et de diabète de type 2, faisant du stress chronique un véritable facteur de risque pour la santé somatique et non un simple inconfort psychologique isolé.",
    recommandations: "HAS / Médecine du travail — Stress et risques psychosociaux : approche combinant prise en charge individuelle (mesures hygiéno-diététiques, phytothérapie ou anxiolytiques selon la sévérité, psychothérapie si besoin) et action sur les facteurs organisationnels lorsque le stress est d'origine professionnelle. Distinction essentielle entre stress aigu ponctuel (prise en charge symptomatique simple) et stress chronique ou burn-out (approche multidisciplinaire incluant potentiellement un arrêt de travail et un accompagnement spécialisé).",
    situations_complexes: "Burn-out avéré : nécessite souvent un arrêt de travail pour permettre une récupération physiologique et psychologique, accompagnement par un médecin du travail et parfois un psychiatre/psychologue, réflexion sur les conditions de retour au travail (aménagement, changement de poste si nécessaire) pour éviter une rechute à la reprise.\n\nStress chronique avec somatisation marquée (douleurs diverses, troubles digestifs fonctionnels, fatigue chronique) sans cause organique identifiée : approche bio-psycho-sociale recommandée, évitant à la fois la négation de la souffrance réelle et la sur-médicalisation par explorations complémentaires répétées et négatives.\n\nStress post-traumatique (après un événement de vie soudain et grave) : à distinguer du stress aigu banal par l'intensité de l'événement déclenchant et la persistance de symptômes spécifiques (reviviscences, évitement, hypervigilance) au-delà d'un mois, nécessitant une orientation spécialisée rapide pour une prise en charge adaptée (thérapies spécifiques validées comme l'EMDR ou la TCC centrée sur le trauma).",
    effets_secondaires: [
      {label:"Stress chronique professionnel non reconnu : risque accru démontré d'événements cardiovasculaires et de syndrome métabolique à long terme", niveau:"danger"},
      {label:"Burn-out non pris en charge : risque d'évolution vers un trouble dépressif caractérisé authentique", niveau:"danger"},
      {label:"Stress post-traumatique méconnu : persistance de symptômes invalidants, retentissement majeur sur la qualité de vie si non traité spécifiquement", niveau:"danger"},
    ],
    classes: [
      {classe:"Prise en charge psychothérapeutique spécifique — burn-out et stress post-traumatique", dci:["TCC, EMDR selon l'indication, non médicamenteux"], specialites:["Prise en charge par psychologue/psychiatre spécialisé"], couleur:"#1B6B52", remarque:"Approche de référence pour le burn-out avéré et le stress post-traumatique, en complément des mesures d'accompagnement professionnel si pertinent"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse spécifique supplémentaire notable pour cette section",
    ],
    points_cles: [
      "Burn-out : reconnu par l'OMS comme phénomène lié au travail, distinct mais parfois proche cliniquement d'un trouble dépressif caractérisé",
      "Stress chronique : véritable facteur de risque cardiovasculaire et métabolique, pas seulement un inconfort psychologique isolé",
      "Burn-out avéré : nécessite souvent un arrêt de travail et une réflexion sur les conditions de retour pour éviter la rechute",
      "Stress post-traumatique : à distinguer du stress aigu banal par l'intensité du déclencheur et la persistance de symptômes spécifiques",
      "Approche bio-psycho-sociale recommandée pour le stress chronique avec somatisation, évitant négation et sur-médicalisation",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F48 — FATIGUE / ASTHÉNIE
   ════════════════════════════════════════════════════════ */
FN['fatigue-asthenie'] = {
  n2: {
    saviez_vous: "La fatigue, motif de consultation extrêmement fréquent en pharmacie et en médecine générale, a des causes très diverses allant de la simple fatigue physiologique (manque de sommeil, surmenage transitoire) à des pathologies organiques significatives (anémie, hypothyroïdie, diabète) — un interrogatoire structuré sur la durée, le caractère et le contexte d'apparition de la fatigue permet souvent d'orienter utilement la conduite à tenir avant de proposer un simple complément fortifiant.",
    physiopatho: "La fatigue physiologique résulte d'un déséquilibre temporaire entre les sollicitations de l'organisme (activité physique, intellectuelle, stress) et les capacités de récupération (sommeil, repos, alimentation adaptée) → restauration des réserves énergétiques cellulaires (ATP, glycogène) et élimination des métabolites de fatigue lors du repos → contrairement à la fatigue physiologique qui répond au repos, la fatigue pathologique (carence, maladie chronique, trouble du sommeil non traité) persiste ou s'aggrave malgré un repos apparemment suffisant, signal important orientant vers une cause sous-jacente à explorer.",
    mecanisme: "Vitamines du groupe B (B1, B6, B12) : cofacteurs essentiels du métabolisme énergétique cellulaire (cycle de Krebs, synthèse de neurotransmetteurs) → une carence, même légère, peut contribuer à une fatigue, bien que la supplémentation chez un sujet non carencé n'apporte généralement pas de bénéfice démontré au-delà d'un possible effet placebo.\n\nFer (en cas de carence martiale confirmée) : cofacteur essentiel de l'hémoglobine et de nombreuses enzymes du métabolisme énergétique cellulaire, la fatigue liée à une carence martiale (avec ou sans anémie constituée) répond généralement bien à une supplémentation adaptée une fois la cause de la carence elle-même identifiée et si possible traitée.",
    diagnostic: "Interrogatoire structuré : durée (aiguë < 1 mois, persistante 1-6 mois, chronique > 6 mois), caractère (physique, psychique, ou mixte), contexte (stress, manque de sommeil identifié, ou apparition sans cause évidente), symptômes associés (amaigrissement, fièvre, troubles du transit, palpitations) orientant vers une cause organique à explorer. Toute fatigue persistante sans cause évidente, ou associée à des symptômes d'alarme, justifie une orientation médicale avec bilan biologique de base (NFS, ferritine, TSH, glycémie notamment).",
    effets_secondaires: [
      {label:"Fatigue persistante non explorée : risque de retard diagnostique d'une cause organique sous-jacente (anémie, hypothyroïdie, diabète)", niveau:"warning"},
      {label:"Compléments fortifiants délivrés sans recherche de cause : masque potentiellement un symptôme d'alerte sans le traiter réellement", niveau:"warning"},
      {label:"Fatigue avec amaigrissement ou fièvre associée : signes d'alarme nécessitant une orientation médicale rapide", niveau:"danger"},
    ],
    classes: [
      {classe:"Vitamines du groupe B — complément en cas de fatigue physiologique simple", dci:["Vitamines B1, B6, B12 associées"], specialites:["Bion® 3 Fatigue","Diverses associations vitaminiques"], couleur:"#1B6B52", remarque:"Intérêt principal en cas de carence avérée ou suspectée, bénéfice non démontré au-delà chez le sujet non carencé"},
      {classe:"Fer — si carence martiale confirmée", dci:["Fer sulfate ou fumarate selon prescription"], specialites:["Tardyferon®","Fumafer®"], couleur:"#1E3A5F", remarque:"Supplémentation après confirmation biologique de la carence (ferritine), recherche de la cause de la carence indispensable en parallèle"},
      {classe:"Mesures hygiéno-diététiques — base de la prise en charge", dci:["Sommeil suffisant, activité physique régulière, alimentation équilibrée"], specialites:["Non médicamenteux"], couleur:"#B45309", remarque:"Pierre angulaire de la prise en charge de la fatigue physiologique simple, à recommander systématiquement avant tout complément"},
    ],
    interactions: [
      "Fer oral + thé, café, antiacides : ↓ absorption du fer — espacer les prises de plusieurs heures",
      "Fer oral + tétracyclines, fluoroquinolones : chélation réciproque réduisant l'absorption des deux — espacer impérativement",
    ],
    points_cles: [
      "Interrogatoire structuré sur durée, caractère et contexte : élément clé pour orienter la conduite à tenir devant une fatigue",
      "Fatigue pathologique : persiste ou s'aggrave malgré un repos suffisant, contrairement à la fatigue physiologique qui répond au repos",
      "Signes d'alarme (amaigrissement, fièvre, palpitations) associés à la fatigue : orientation médicale rapide nécessaire",
      "Compléments fortifiants : intérêt principal en cas de carence avérée, pas de bénéfice démontré systématique chez le sujet non carencé",
      "Toute fatigue persistante > 1 mois sans cause évidente : bilan biologique de base recommandé (NFS, ferritine, TSH, glycémie)",
    ],
  },
  n3: {
    saviez_vous: "Le syndrome de fatigue chronique (encéphalomyélite myalgique), entité reconnue mais encore mal comprise sur le plan physiopathologique, se définit par une fatigue invalidante persistant plus de 6 mois, non expliquée par un effort et non améliorée par le repos, associée à une intolérance à l'effort caractéristique (malaise post-effort, aggravation des symptômes après un effort même modéré) — ce tableau spécifique nécessite une prise en charge adaptée, différente de la simple fatigue chronique banale, après avoir éliminé les causes organiques plus fréquentes.",
    physiopatho: "Fatigue et troubles du sommeil non diagnostiqués : le syndrome d'apnées obstructives du sommeil (SAOS), souvent méconnu, est une cause fréquente et sous-diagnostiquée de fatigue diurne chronique, particulièrement chez les patients en surpoids ou présentant un ronflement important signalé par l'entourage — les apnées répétées pendant le sommeil fragmentent l'architecture normale du sommeil (réduction du sommeil profond réparateur) sans que le patient en ait nécessairement conscience, expliquant une fatigue diurne disproportionnée par rapport à un temps de sommeil apparemment suffisant en durée.",
    pharmacocinetique: "Fer oral : absorption intestinale active régulée par l'hepcidine (hormone régulatrice du métabolisme du fer, augmentée en cas d'inflammation chronique ce qui réduit l'absorption du fer oral dans ce contexte spécifique) → explique pourquoi certaines carences martiales associées à une inflammation chronique (maladie inflammatoire intestinale notamment) répondent mal à la supplémentation orale standard et peuvent nécessiter un fer injectable pour contourner ce mécanisme de régulation négative.",
    cas_clinique: "Patient 52 ans, surpoids (IMC 31), fatigue diurne majeure depuis plusieurs mois malgré un temps de sommeil de 7-8h par nuit, ronflements importants signalés par son épouse, somnolence au volant à plusieurs reprises. Que suspectez-vous ?\n\nRaisonnement : tableau évocateur d'un syndrome d'apnées obstructives du sommeil (surpoids, ronflements, fatigue diurne disproportionnée par rapport au temps de sommeil, somnolence au volant préoccupante pour la sécurité) → orientation vers une consultation spécialisée (pneumologue ou centre du sommeil) pour réalisation d'une polysomnographie diagnostique, plutôt qu'une simple prescription de compléments fortifiants qui ne traiterait pas la cause sous-jacente et laisserait persister un risque significatif (accidents de la route notamment) lié à la somnolence diurne.",
    effets_secondaires: [
      {label:"SAOS non diagnostiqué : risque accru d'accidents de la route liés à la somnolence diurne, et de complications cardiovasculaires à long terme", niveau:"danger"},
      {label:"Fer oral en contexte inflammatoire chronique : absorption réduite par l'hepcidine, pouvant nécessiter un fer injectable", niveau:"warning"},
      {label:"Syndrome de fatigue chronique méconnu : errance diagnostique fréquente avant identification du tableau spécifique", niveau:"warning"},
    ],
    classes: [
      {classe:"Polysomnographie diagnostique — suspicion de SAOS", dci:["Exploration du sommeil, non médicamenteuse"], specialites:["Centre du sommeil ou pneumologie spécialisée"], couleur:"#1B6B52", remarque:"Examen de référence pour confirmer le diagnostic de SAOS avant d'envisager un traitement spécifique (appareillage par pression positive continue notamment)"},
      {classe:"Fer injectable — carence martiale en contexte inflammatoire chronique", dci:["Fer carboxymaltose ou autre formulation IV"], specialites:["Ferinject®"], couleur:"#1E3A5F", remarque:"Alternative au fer oral en cas de mauvaise réponse liée à un contexte inflammatoire chronique réduisant l'absorption digestive"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse spécifique supplémentaire notable pour cette section",
    ],
    points_cles: [
      "SAOS : cause fréquente et sous-diagnostiquée de fatigue diurne, particulièrement chez les patients en surpoids avec ronflements importants",
      "Somnolence au volant associée à la fatigue : signal de sécurité important à explorer rapidement",
      "Hepcidine : régulateur de l'absorption du fer, expliquant la mauvaise réponse au fer oral en contexte inflammatoire chronique",
      "Syndrome de fatigue chronique : entité spécifique avec intolérance à l'effort caractéristique, à différencier de la fatigue chronique banale",
      "Polysomnographie : examen de référence pour confirmer un SAOS suspecté avant d'envisager un traitement spécifique adapté",
    ],
  },
  n4: {
    saviez_vous: "La fatigue peut être le symptôme révélateur initial de nombreuses pathologies graves (cancers, maladies auto-immunes, insuffisance surrénalienne) bien avant l'apparition d'autres symptômes plus spécifiques — cette absence de spécificité, bien que pouvant rendre le diagnostic difficile dans les phases initiales, justifie une vigilance particulière et un bilan biologique systématique devant toute fatigue chronique inexpliquée, même en l'absence d'autre symptôme associé évocateur.",
    physiopatho: "Insuffisance surrénalienne et fatigue chronique : l'insuffisance surrénalienne chronique (maladie d'Addison ou insuffisance surrénalienne secondaire à un arrêt brutal d'une corticothérapie au long cours) se manifeste par une fatigue chronique profonde, souvent associée à une hypotension orthostatique, des troubles digestifs et, dans la forme primaire, une hyperpigmentation cutanée caractéristique — cette pathologie rare mais potentiellement grave (risque d'insuffisance surrénalienne aiguë en situation de stress, urgence vitale) doit être évoquée devant une fatigue chronique inexpliquée avec ces signes associés, nécessitant un bilan hormonal spécifique pour confirmation.",
    recommandations: "HAS — Fatigue chronique de l'adulte : bilan biologique de 1ère intention systématique devant toute fatigue persistante > 1 mois sans cause évidente (NFS, ferritine, TSH, glycémie, ionogramme, bilan hépatique). Recherche orientée selon le contexte clinique de causes plus spécifiques (SAOS, dépression, syndrome de fatigue chronique, insuffisance surrénalienne) si le bilan de 1ère intention est normal et la fatigue persiste ou s'aggrave. Mesures hygiéno-diététiques systématiquement associées quelle que soit la cause identifiée ou non.",
    situations_complexes: "Arrêt brutal d'une corticothérapie au long cours : risque d'insuffisance surrénalienne aiguë (urgence vitale), décroissance toujours progressive indispensable pour les traitements corticoïdes prolongés, fatigue intense pouvant être un signe précoce de ce phénomène à surveiller attentivement lors de toute décroissance.\n\nFatigue chronique inexpliquée persistant malgré un bilan de 1ère intention normal : orientation spécialisée (médecine interne, endocrinologie selon le contexte) pour bilan de 2e intention plus approfondi, en gardant à l'esprit la possibilité d'un syndrome de fatigue chronique si les critères spécifiques sont réunis après élimination des causes organiques plus fréquentes.\n\nFatigue chez le patient cancéreux (pendant ou après traitement) : entité spécifique reconnue (fatigue liée au cancer), multifactorielle (effet direct de la maladie, traitements, anémie, troubles du sommeil, composante psychologique), nécessitant une approche globale et multidisciplinaire adaptée à ce contexte particulier.",
    effets_secondaires: [
      {label:"Insuffisance surrénalienne méconnue : risque d'insuffisance surrénalienne aiguë en situation de stress (infection, chirurgie), urgence vitale", niveau:"danger"},
      {label:"Fatigue révélatrice d'un cancer sous-jacent méconnue : retard diagnostique potentiellement grave si signes d'alarme négligés", niveau:"danger"},
      {label:"Arrêt brutal de corticothérapie prolongée : risque d'insuffisance surrénalienne aiguë, décroissance progressive impérative", niveau:"danger"},
    ],
    classes: [
      {classe:"Hydrocortisone substitutive — insuffisance surrénalienne confirmée", dci:["Hydrocortisone selon prescription spécialisée, dose adaptée au stress"], specialites:["Hydrocortisone®"], couleur:"#C0392B", remarque:"Traitement substitutif à vie si insuffisance surrénalienne confirmée, adaptation de dose impérative en situation de stress (infection, chirurgie)"},
    ],
    interactions: [
      "Hydrocortisone substitutive + situations de stress physiologique (infection, chirurgie) : nécessite une adaptation de dose, éducation thérapeutique indispensable du patient",
    ],
    points_cles: [
      "Fatigue : symptôme non spécifique pouvant révéler de nombreuses pathologies graves, justifie une vigilance et un bilan systématique si chronique",
      "Insuffisance surrénalienne : cause rare mais potentiellement grave de fatigue chronique, à évoquer avec les signes associés spécifiques",
      "Bilan biologique de 1ère intention systématique devant toute fatigue persistante > 1 mois sans cause évidente",
      "Décroissance progressive obligatoire de toute corticothérapie prolongée : prévention de l'insuffisance surrénalienne aiguë",
      "Fatigue liée au cancer : entité spécifique multifactorielle nécessitant une approche globale et multidisciplinaire adaptée",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F49 — TOUX
   ════════════════════════════════════════════════════════ */
FN['toux'] = {
  n2: {
    saviez_vous: "La toux est un réflexe de protection essentiel des voies aériennes, permettant l'évacuation des sécrétions, particules ou corps étrangers — la supprimer systématiquement par un antitussif n'est donc pas toujours souhaitable, en particulier en cas de toux productive (grasse) où l'expectoration joue un rôle protecteur qu'il ne faut pas entraver sans raison précise.",
    physiopatho: "Le réflexe tussigène est déclenché par la stimulation de récepteurs sensitifs situés le long de l'arbre respiratoire (larynx, trachée, bronches) et même au niveau de structures extra-respiratoires (oreille, œsophage, dans certains cas plus rares) → l'influx nerveux est transmis via le nerf vague jusqu'au centre bulbaire de la toux → déclenchement d'une séquence motrice coordonnée (inspiration profonde, fermeture glottique, contraction expiratoire forcée, ouverture brutale de la glotte) générant un flux expiratoire à haute vitesse permettant l'expulsion des sécrétions ou particules irritantes des voies aériennes.",
    mecanisme: "Antitussifs opiacés (codéine, pholcodine — pholcodine retirée du marché 2023) ou non opiacés (oxomémazine, pentoxyvérine) : action centrale sur le centre bulbaire de la toux → élévation du seuil de déclenchement du réflexe tussigène → réduction de la fréquence et de l'intensité de la toux, réservés à la toux sèche invalidante (notamment nocturne perturbant le sommeil) sans bénéfice attendu sur la toux productive où ils peuvent même être délétères en favorisant la stase des sécrétions.\n\nMucolytiques/expectorants : action variable selon la molécule sur la viscosité ou le volume des sécrétions bronchiques, efficacité clinique modeste et controversée selon les méta-analyses les plus récentes, intérêt principalement symptomatique pour faciliter le confort lors de l'expectoration.",
    diagnostic: "Caractérisation essentielle de la toux : sèche versus productive (grasse), aiguë (< 3 semaines, le plus souvent infectieuse virale) versus chronique (> 8 semaines, nécessitant une exploration spécifique), contexte associé (fièvre, dyspnée, douleur thoracique) orientant vers une cause sous-jacente à explorer plutôt qu'un simple traitement symptomatique de la toux elle-même.",
    effets_secondaires: [
      {label:"Antitussif opiacé sur toux productive : risque de rétention des sécrétions, contre-productif et potentiellement délétère", niveau:"warning"},
      {label:"Codéine chez l'enfant de moins de 12 ans : CI formelle, risque de dépression respiratoire", niveau:"danger"},
      {label:"Toux chronique > 8 semaines non explorée : retard diagnostique d'une cause sous-jacente nécessitant une prise en charge spécifique", niveau:"warning"},
    ],
    classes: [
      {classe:"Antitussifs non opiacés — toux sèche gênante", dci:["Oxomémazine","Pentoxyvérine"], specialites:["Toplexil®","Tussidane®"], couleur:"#1B6B52", remarque:"Réservés à la toux sèche invalidante, particulièrement utile pour le confort nocturne, à éviter en cas de toux productive"},
      {classe:"Mucolytiques — toux productive, efficacité modeste", dci:["Carbocistéine","Acétylcystéine"], specialites:["Rhinathiol®","Mucomyst®"], couleur:"#1E3A5F", remarque:"Bénéfice clinique modeste selon les données actuelles, toujours associé à une bonne hydratation pour optimiser la fluidification"},
      {classe:"Miel — alternative naturelle, efficacité documentée chez l'enfant", dci:["Miel naturel, non médicamenteux"], specialites:["Non médicamenteux, CI formelle avant 1 an (botulisme infantile)"], couleur:"#B45309", remarque:"Efficacité modeste mais réelle démontrée dans certaines études sur la toux nocturne de l'enfant de plus de 1 an, alternative simple et peu coûteuse"},
    ],
    interactions: [
      "Codéine + autres dépresseurs du SNC : potentialisation de la dépression respiratoire, particulièrement chez les sujets à risque",
      "Antitussifs antihistaminiques + alcool : majoration de la sédation",
    ],
    points_cles: [
      "Toux = réflexe protecteur essentiel, ne pas supprimer systématiquement, en particulier si productive (rôle d'évacuation des sécrétions)",
      "Antitussifs : réservés à la toux sèche invalidante, à éviter formellement en cas de toux productive",
      "Codéine : CI formelle chez l'enfant de moins de 12 ans, risque de dépression respiratoire",
      "Toux chronique > 8 semaines : nécessite une exploration spécifique, ne pas se contenter d'un traitement symptomatique prolongé",
      "Miel : alternative simple et documentée chez l'enfant de plus de 1 an, CI formelle avant cet âge (risque de botulisme infantile)",
    ],
  },
  n3: {
    saviez_vous: "Les inhibiteurs de l'enzyme de conversion (IEC), largement prescrits dans l'hypertension et l'insuffisance cardiaque, provoquent une toux sèche chronique chez environ 10-15% des patients traités, par accumulation de bradykinine au niveau des voies respiratoires — cette toux iatrogène, souvent méconnue comme telle par les patients et parfois même par les prescripteurs, régresse généralement en quelques jours à quelques semaines après l'arrêt du traitement, élément diagnostique différentiel essentiel devant toute toux chronique inexpliquée chez un patient sous IEC.",
    physiopatho: "Toux chronique et triade étiologique principale chez l'adulte non-fumeur sans anomalie radiographique : trois causes représentent la grande majorité des toux chroniques dans cette population spécifique — le RGO (toux par micro-inhalation ou par réflexe vagal, parfois sans pyrosis associé), l'asthme (notamment sa forme particulière dite 'toux équivalente d'asthme' où la toux est le symptôme quasi exclusif sans sibilants ni dyspnée francs), et le syndrome de toux des voies aériennes supérieures (anciennement appelé 'rhinite postérieure', lié à un écoulement nasal postérieur chronique irritant les voies aériennes) — l'identification de la cause prédominante guide directement le traitement spécifique à proposer plutôt qu'un traitement symptomatique non ciblé.",
    pharmacocinetique: "Carbocistéine : peu de données pharmacocinétiques robustes disponibles justifiant un mécanisme d'action cliniquement significatif au-delà d'un effet modeste sur la viscosité du mucus — cette incertitude pharmacologique relative explique en partie la controverse persistante sur l'utilité clinique réelle de cette classe thérapeutique largement prescrite par habitude plus que par preuve solide d'efficacité.",
    cas_clinique: "Patient 58 ans, sous IEC depuis 3 mois pour une hypertension artérielle, toux sèche persistante depuis 6 semaines, sans autre symptôme associé, bilan respiratoire normal. Quelle est votre démarche ?\n\nRaisonnement : toux sèche chronique chez un patient récemment mis sous IEC, délai compatible (la toux iatrogène aux IEC peut apparaître dans les semaines à mois suivant l'introduction) → forte suspicion de toux iatrogène liée à l'IEC plutôt qu'une autre cause de toux chronique. Discussion avec le médecin prescripteur d'un switch vers un ARA2 (antagoniste des récepteurs de l'angiotensine 2, n'entraînant pas cet effet indésirable par un mécanisme différent en aval de la bradykinine), avec attente de la régression de la toux dans les semaines suivant le changement de traitement avant d'envisager d'autres explorations si la toux persistait malgré ce changement.",
    effets_secondaires: [
      {label:"Toux aux IEC méconnue comme telle : exploration inutile pour une cause iatrogène simplement réversible par switch thérapeutique", niveau:"warning"},
      {label:"Toux équivalente d'asthme méconnue : retard diagnostique et thérapeutique d'un authentique asthme se présentant atypiquement", niveau:"warning"},
    ],
    classes: [
      {classe:"ARA2 — alternative en cas de toux aux IEC", dci:["Losartan, valsartan, ou autre ARA2 selon prescription"], specialites:["Cozaar®","Tareg®"], couleur:"#1B6B52", remarque:"Switch thérapeutique de référence en cas de toux iatrogène confirmée aux IEC, mécanisme différent en aval de la bradykinine"},
      {classe:"Bronchodilatateurs d'épreuve — suspicion de toux équivalente d'asthme", dci:["Salbutamol à la demande, à visée diagnostique et thérapeutique"], specialites:["Ventoline®"], couleur:"#1E3A5F", remarque:"Test thérapeutique pertinent en cas de suspicion de toux équivalente d'asthme, amélioration sous traitement renforçant cette hypothèse diagnostique"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse spécifique supplémentaire notable pour cette section",
    ],
    points_cles: [
      "Toux aux IEC : touche 10-15% des patients traités, par accumulation de bradykinine, régresse à l'arrêt en quelques jours à semaines",
      "Triade étiologique principale de la toux chronique : RGO, asthme (toux équivalente), syndrome de toux des voies aériennes supérieures",
      "Switch vers un ARA2 : option de référence en cas de toux iatrogène confirmée aux IEC, mécanisme d'action différent",
      "Toux équivalente d'asthme : forme particulière où la toux est le symptôme quasi exclusif, sans sibilants ni dyspnée francs",
      "Identification de la cause prédominante de la toux chronique : guide directement vers un traitement spécifique ciblé",
    ],
  },
  n4: {
    saviez_vous: "L'hypersensibilité du réflexe tussigène (cough hypersensitivity syndrome), concept relativement récent en pneumologie, décrit un abaissement pathologique du seuil de déclenchement de la toux face à des stimuli normalement insuffisants pour la provoquer — ce mécanisme central, distinct des causes périphériques classiques (RGO, asthme, rhinite), expliquerait certaines toux chroniques réfractaires aux traitements ciblant les causes habituelles, ouvrant la voie à des approches thérapeutiques plus récentes ciblant spécifiquement cette hypersensibilité neuronale.",
    physiopatho: "Mécanismes de l'hypersensibilité tussigène chronique : une exposition répétée ou prolongée à des stimuli irritants ou inflammatoires peut entraîner une sensibilisation des fibres nerveuses sensitives impliquées dans le réflexe tussigène (notamment via une expression accrue de certains canaux ioniques comme TRPV1, impliqués dans la détection de stimuli irritants) → ce phénomène de sensibilisation neuronale périphérique et centrale peut perdurer même après résolution de la cause initiale, expliquant la persistance de certaines toux chroniques au-delà du traitement apparemment adéquat de la cause sous-jacente identifiée, et justifiant l'émergence de traitements ciblant spécifiquement les récepteurs purinergiques P2X3 impliqués dans cette hypersensibilité.",
    recommandations: "SPLF (Société de Pneumologie de Langue Française) — Toux chronique : démarche diagnostique structurée recherchant systématiquement les causes les plus fréquentes (RGO, asthme, syndrome de toux des voies aériennes supérieures, toux iatrogène aux IEC) avant d'envisager des explorations plus poussées. Traitement ciblé sur la cause identifiée plutôt qu'un traitement symptomatique non spécifique prolongé. Orientation pneumologique spécialisée si toux chronique réfractaire malgré une démarche diagnostique et thérapeutique bien conduite.",
    situations_complexes: "Toux chronique réfractaire malgré traitement bien conduit des causes habituelles : penser à l'hypersensibilité tussigène chronique comme entité à part, discussion de traitements plus récents (notamment antagonistes des récepteurs P2X3 comme le gefapixant, disponibilité variable selon les pays) en milieu spécialisé pneumologique.\n\nToux chronique avec signes d'alarme (hémoptysie, amaigrissement, fièvre prolongée, tabagisme important) : exploration urgente (imagerie thoracique notamment) pour éliminer une cause grave (cancer bronchique, tuberculose) avant de poursuivre une démarche diagnostique standard pour toux chronique banale.\n\nToux chronique chez l'enfant : étiologies différentes de l'adulte à considérer (corps étranger inhalé méconnu notamment si toux chronique brutale et inexpliquée, coqueluche, malformations bronchiques rares), démarche diagnostique adaptée à cette population spécifique plutôt qu'une simple extrapolation des causes de l'adulte.",
    effets_secondaires: [
      {label:"Toux chronique avec signes d'alarme méconnue : retard diagnostique d'un cancer bronchique ou d'une tuberculose, urgence diagnostique", niveau:"danger"},
      {label:"Corps étranger inhalé méconnu chez l'enfant : toux chronique persistante pouvant masquer cette cause spécifique à cet âge", niveau:"danger"},
      {label:"Hypersensibilité tussigène chronique non reconnue : persistance invalidante de la toux malgré un traitement apparemment adéquat des causes habituelles", niveau:"warning"},
    ],
    classes: [
      {classe:"Antagonistes des récepteurs P2X3 — toux chronique réfractaire (disponibilité variable)", dci:["Gefapixant selon disponibilité et prescription spécialisée"], specialites:["Selon autorisation locale"], couleur:"#6B2D5E", remarque:"Approche thérapeutique récente ciblant spécifiquement l'hypersensibilité tussigène chronique, réservée aux formes réfractaires en milieu spécialisé"},
      {classe:"Imagerie thoracique urgente — toux chronique avec signes d'alarme", dci:["Radiographie ou scanner thoracique selon le contexte"], specialites:["Exploration radiologique"], couleur:"#C0392B", remarque:"À réaliser en urgence devant toute toux chronique avec signe d'alarme (hémoptysie, amaigrissement, tabagisme important)"},
    ],
    interactions: [
      "Gefapixant : altération du goût rapportée comme effet indésirable fréquent selon les données disponibles",
    ],
    points_cles: [
      "Hypersensibilité tussigène chronique : mécanisme central distinct des causes périphériques classiques, explique certaines toux réfractaires",
      "Démarche diagnostique structurée : recherche systématique des causes fréquentes avant explorations plus poussées",
      "Signes d'alarme associés à la toux chronique (hémoptysie, amaigrissement, tabagisme) : exploration urgente impérative",
      "Toux chronique de l'enfant : étiologies différentes de l'adulte à considérer, notamment le corps étranger inhalé méconnu",
      "Antagonistes des récepteurs P2X3 : approche thérapeutique récente pour les formes réfractaires d'hypersensibilité tussigène",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F50 — COUP DE SOLEIL
   ════════════════════════════════════════════════════════ */
FN['coup-de-soleil'] = {
  n2: {
    saviez_vous: "Le coup de soleil n'est pas qu'un inconfort passager : chaque épisode, même léger, contribue cumulativement au risque de cancer cutané à long terme par l'accumulation de dommages à l'ADN des cellules cutanées exposées — un message de prévention essentiel à transmettre, particulièrement pour les coups de soleil de l'enfance qui représentent un facteur de risque particulièrement important pour le mélanome futur.",
    physiopatho: "Le coup de soleil résulte d'une exposition excessive aux rayons ultraviolets (UVB principalement, mais aussi UVA à un degré moindre) dépassant les capacités de protection naturelle de la peau (mélanine notamment) → dommages directs à l'ADN des kératinocytes (formation de dimères de pyrimidine) → réponse inflammatoire locale (libération de prostaglandines, cytokines pro-inflammatoires) → vasodilatation cutanée (érythème), douleur, et dans les formes plus sévères, formation de phlyctènes (cloques) témoignant d'une atteinte plus profonde de l'épiderme avec décollement dermo-épidermique.",
    mecanisme: "Émollients apaisants après-soleil (aloe vera, panthénol) : action hydratante et apaisante locale, ne réparent pas directement les dommages cellulaires mais améliorent le confort symptomatique (sensation de chaleur, tiraillement cutané) pendant la phase de cicatrisation naturelle de l'épiderme.\n\nAINS topiques ou oraux (selon la sévérité) : réduction de l'inflammation et de la douleur associées au coup de soleil par inhibition de la synthèse des prostaglandines, utiles notamment dans les premières 24-48h pour le confort, sans effet sur la prévention des dommages cellulaires déjà constitués.",
    diagnostic: "Diagnostic clinique évident : érythème douloureux sur les zones exposées au soleil, apparaissant généralement quelques heures après l'exposition et atteignant son maximum d'intensité vers 24h, pouvant s'accompagner de phlyctènes dans les formes plus sévères (coup de soleil du 2e degré). Évaluation de la surface atteinte et de la présence de signes généraux associés (fièvre, frissons, malaise) orientant vers une forme plus sévère nécessitant une prise en charge médicale.",
    effets_secondaires: [
      {label:"Coup de soleil étendu avec signes généraux (fièvre, frissons, malaise) : forme sévère nécessitant une évaluation médicale", niveau:"danger"},
      {label:"Phlyctènes (cloques) : risque de surinfection bactérienne si rupture et soins locaux inadaptés", niveau:"warning"},
      {label:"Coups de soleil répétés, particulièrement dans l'enfance : facteur de risque cumulatif majeur pour le mélanome à long terme", niveau:"danger"},
    ],
    classes: [
      {classe:"Émollients apaisants — confort symptomatique", dci:["Aloe vera, panthénol, glycérine"], specialites:["Biafine®","Diverses crèmes après-soleil"], couleur:"#1B6B52", remarque:"Application répétée pour le confort, n'accélère pas la guérison mais améliore significativement le ressenti symptomatique"},
      {classe:"AINS — douleur et inflammation associées", dci:["Ibuprofène oral ou AINS topique selon la sévérité"], specialites:["Nurofen®","Flector® gel"], couleur:"#1E3A5F", remarque:"Utiles dans les premières 24-48h pour le confort, particulièrement en cas de coup de soleil douloureux et étendu"},
      {classe:"Hydratation renforcée — systématique", dci:["Eau, boissons, en cas de surface étendue"], specialites:["Non médicamenteux"], couleur:"#B45309", remarque:"Particulièrement important en cas de coup de soleil étendu, compensant la perte hydrique cutanée associée à l'inflammation"},
    ],
    interactions: [
      "AINS topiques + exposition solaire (même protégée) : certains AINS topiques sont eux-mêmes photosensibilisants — éviter toute nouvelle exposition pendant le traitement",
    ],
    points_cles: [
      "Coup de soleil : contribue cumulativement au risque de cancer cutané à long terme, particulièrement préoccupant dans l'enfance",
      "Dommages directs à l'ADN cutané (dimères de pyrimidine) : mécanisme central expliquant le lien avec le risque carcinologique futur",
      "Phlyctènes (cloques) : témoignent d'une atteinte plus profonde, risque de surinfection bactérienne si rupture mal gérée",
      "Signes généraux associés (fièvre, frissons) : orientent vers une forme sévère nécessitant une évaluation médicale",
      "Prévention (protection solaire adaptée) : message essentiel, particulièrement important à transmettre pour les enfants",
    ],
  },
  n3: {
    saviez_vous: "La photoprotection adéquate (indice de protection adapté, renouvellement régulier, vêtements couvrants, éviction aux heures de forte intensité UV) reste, malgré l'efficacité démontrée des crèmes solaires modernes, insuffisamment suivie en pratique — les études montrent que la quantité de crème solaire réellement appliquée par les utilisateurs est souvent largement inférieure à celle utilisée lors des tests d'homologation, réduisant significativement la protection réelle obtenue par rapport à l'indice affiché sur le produit.",
    physiopatho: "Différence entre UVB et UVA dans les dommages cutanés : les UVB (longueurs d'onde plus courtes, énergie plus élevée) sont les principaux responsables du coup de soleil aigu par dommage direct à l'ADN épidermique superficiel, tandis que les UVA (longueurs d'onde plus longues, pénétration dermique plus profonde) contribuent davantage au vieillissement cutané chronique (photovieillissement) et participent également, via un stress oxydatif indirect, au risque carcinologique cutané à long terme — cette distinction justifie l'importance de choisir une protection solaire à large spectre couvrant à la fois les UVB et les UVA, et pas seulement l'indice de protection UVB classiquement affiché.",
    pharmacocinetique: "AINS topiques (gel anti-inflammatoire local) : absorption cutanée variable selon la molécule et l'état de la barrière cutanée (potentiellement augmentée sur une peau lésée par le coup de soleil lui-même), concentration locale généralement suffisante pour un effet anti-inflammatoire topique avec une exposition systémique limitée par rapport à la voie orale, mais photosensibilisation propre à certains AINS topiques (kétoprofène notamment) justifiant une protection stricte de la zone traitée vis-à-vis de toute nouvelle exposition solaire.",
    cas_clinique: "Patient 30 ans, coup de soleil important sur les épaules et le dos après une journée de plage, douleur intense, quelques phlyctènes de petite taille, pas de fièvre ni de signe général. Quelle prise en charge proposez-vous ?\n\nRaisonnement : coup de soleil du 2e degré superficiel (phlyctènes) sans signe de gravité générale → prise en charge ambulatoire avec antalgique adapté (paracétamol ou AINS oral selon tolérance), émollient apaisant, hydratation renforcée, conseil de ne pas percer les phlyctènes (protection naturelle contre la surinfection) et de les protéger par un pansement non adhérent si elles se rompent spontanément, photoprotection stricte de la zone pendant la cicatrisation, et conseil de prévention pour les expositions futures (crème solaire à large spectre, renouvelée régulièrement, vêtements couvrants).",
    effets_secondaires: [
      {label:"Application insuffisante de crème solaire en pratique réelle : protection effective souvent inférieure à l'indice affiché sur le produit", niveau:"warning"},
      {label:"AINS topiques photosensibilisants (kétoprofène) : protection stricte de la zone traitée nécessaire vis-à-vis de toute nouvelle exposition", niveau:"warning"},
      {label:"Phlyctènes percées prématurément : risque accru de surinfection bactérienne par perte de la protection naturelle", niveau:"warning"},
    ],
    classes: [
      {classe:"Crème solaire à large spectre — prévention", dci:["Filtres UVB + UVA, indice adapté au phototype"], specialites:["Diverses marques avec mention 'large spectre'"], couleur:"#1B6B52", remarque:"Application généreuse et renouvelée toutes les 2h, en quantité suffisante (souvent sous-estimée par les utilisateurs en pratique réelle)"},
      {classe:"Pansements non adhérents — phlyctènes rompues", dci:["Pansement gras non adhérent"], specialites:["Jelonet®","Diverses marques"], couleur:"#1E3A5F", remarque:"Protection des phlyctènes rompues pour limiter le risque de surinfection bactérienne secondaire"},
    ],
    interactions: [
      "Kétoprofène gel + exposition solaire : photosensibilisation propre à cette molécule, protection stricte de la zone traitée indispensable",
    ],
    points_cles: [
      "Quantité de crème solaire réellement appliquée : souvent insuffisante en pratique, réduisant la protection effective par rapport à l'indice affiché",
      "UVB (coup de soleil aigu) versus UVA (photovieillissement, contribution carcinologique) : justifie le choix d'une protection à large spectre",
      "Phlyctènes : ne pas percer prématurément, protection naturelle contre la surinfection, pansement non adhérent si rupture spontanée",
      "Kétoprofène gel : photosensibilisant propre à cette molécule, protection stricte de la zone traitée nécessaire",
      "Prévention : renouvellement régulier de la crème solaire (toutes les 2h) et quantité généreuse, messages essentiels à transmettre",
    ],
  },
  n4: {
    saviez_vous: "Le coup de chaleur, à ne pas confondre avec le simple coup de soleil cutané, constitue une urgence médicale potentiellement mortelle liée à une élévation excessive de la température corporelle centrale (souvent associée à une exposition solaire prolongée mais par un mécanisme systémique distinct de l'atteinte cutanée locale) — la distinction entre ces deux entités, bien que pouvant coexister chez un même patient exposé au soleil, est essentielle car leur prise en charge et leur gravité potentielle diffèrent radicalement.",
    physiopatho: "Photodermatoses et réactions de photosensibilisation distinctes du simple coup de soleil : certaines réactions cutanées après exposition solaire ne sont pas de simples coups de soleil mais des réactions de photosensibilisation spécifiques, soit médicamenteuses (de nombreux médicaments, dont certains antibiotiques comme les cyclines et fluoroquinolones, certains diurétiques, et certains AINS, peuvent provoquer des réactions cutanées exagérées lors de l'exposition solaire par un mécanisme phototoxique ou photoallergique), soit liées à des pathologies dermatologiques spécifiques (lucite estivale bénigne, porphyries) — ces diagnostics différentiels doivent être évoqués devant une réaction cutanée solaire disproportionnée par rapport à l'exposition réelle ou de présentation atypique (topographie, délai d'apparition, morphologie des lésions).",
    recommandations: "Société Française de Dermatologie — Photoprotection : crème solaire à large spectre (UVB et UVA), indice adapté au phototype et à l'intensité de l'exposition prévue, application généreuse et renouvelée toutes les 2h ou après chaque baignade. Vêtements couvrants et chapeau recommandés en complément, particulièrement chez l'enfant. Éviction de l'exposition aux heures de plus forte intensité UV (généralement 12h-16h en été). Vigilance accrue chez l'enfant en raison d'une plus grande vulnérabilité cutanée et d'un risque cumulatif à long terme particulièrement préoccupant.",
    situations_complexes: "Coup de soleil très étendu (> 15-20% de la surface corporelle) ou avec signes généraux marqués (fièvre élevée, déshydratation, malaise important) : nécessite une prise en charge médicale, voire hospitalière dans les formes les plus sévères, en raison du risque de déshydratation significative et de complications systémiques liées à l'inflammation cutanée étendue.\n\nRéaction de photosensibilisation médicamenteuse : nécessite l'identification du médicament responsable et sa réévaluation (substitution si possible, ou renforcement majeur de la photoprotection si le traitement reste indispensable), distinction importante avec un simple coup de soleil par exposition excessive isolée.\n\nLucite estivale bénigne : éruption prurigineuse récidivante apparaissant dans les premiers jours d'exposition solaire intense saisonnière (printemps-été), touchant principalement les zones découvertes hors visage, à distinguer du simple coup de soleil par son caractère prurigineux et sa récidive saisonnière caractéristique, traitement préventif spécifique possible (photoprotection renforcée, parfois caroténoïdes ou bêta-carotène en prévention selon les recommandations dermatologiques).",
    effets_secondaires: [
      {label:"Coup de chaleur associé à une exposition solaire : urgence médicale potentiellement mortelle, distincte du simple coup de soleil cutané", niveau:"danger"},
      {label:"Coup de soleil très étendu avec signes généraux marqués : risque de déshydratation significative et de complications systémiques", niveau:"danger"},
      {label:"Réaction de photosensibilisation médicamenteuse méconnue : persistance ou récidive de réactions cutanées disproportionnées à chaque exposition", niveau:"warning"},
    ],
    classes: [
      {classe:"Réhydratation et refroidissement — coup de chaleur associé", dci:["Mesures de refroidissement actif et réhydratation, prise en charge médicale urgente"], specialites:["Urgence médicale"], couleur:"#C0392B", remarque:"Urgence médicale à distinguer du simple traitement local du coup de soleil cutané, prise en charge hospitalière souvent nécessaire"},
      {classe:"Caroténoïdes/Bêta-carotène — prévention de la lucite estivale bénigne", dci:["Bêta-carotène en cure préventive avant exposition saisonnière"], specialites:["Phytobeta Carotene® ou équivalent"], couleur:"#1B6B52", remarque:"Option préventive à débuter avant la période d'exposition solaire intense chez les patients sujets aux lucites estivales bénignes récidivantes"},
    ],
    interactions: [
      "Médicaments photosensibilisants (cyclines, fluoroquinolones, certains diurétiques) + exposition solaire : réaction cutanée exagérée, photoprotection renforcée indispensable",
    ],
    points_cles: [
      "Coup de chaleur : urgence médicale distincte du simple coup de soleil cutané, à ne pas confondre malgré une possible coexistence",
      "Photosensibilisation médicamenteuse : à évoquer devant une réaction cutanée solaire disproportionnée chez un patient sous traitement à risque",
      "Lucite estivale bénigne : éruption prurigineuse récidivante saisonnière, à distinguer du simple coup de soleil par sa morphologie et sa récidive",
      "Coup de soleil très étendu avec signes généraux : nécessite une prise en charge médicale, voire hospitalière selon la sévérité",
      "Vigilance particulière chez l'enfant : vulnérabilité cutanée accrue et risque cumulatif à long terme préoccupant pour le mélanome futur",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F51 — ECZÉMA (formes de contact/non-atopiques, complémentaire à eczéma-atopique)
   ════════════════════════════════════════════════════════ */
FN['eczema'] = {
  n2: {
    saviez_vous: "L'eczéma de contact, contrairement à l'eczéma atopique d'origine constitutionnelle, résulte d'une exposition à une substance précise (allergène ou irritant) et reste le plus souvent localisé à la zone de contact — son identification précise par interrogatoire minutieux et parfois par tests épicutanés (patch-tests) est essentielle, car l'éviction de l'agent causal est le seul traitement véritablement curatif, contrairement à l'eczéma atopique chronique nécessitant une prise en charge au long cours.",
    physiopatho: "Deux mécanismes distincts sous-tendent l'eczéma de contact : la dermite d'irritation (mécanisme toxique direct, non immunologique, lié à une agression répétée de la barrière cutanée par des substances irritantes comme les détergents, l'eau fréquente, certains produits chimiques — dose-dépendante et touchant potentiellement n'importe qui en cas d'exposition suffisante) et l'eczéma de contact allergique (réaction d'hypersensibilité retardée de type IV, médiée par les lymphocytes T, nécessitant une sensibilisation préalable à un allergène spécifique comme le nickel, certains parfums, ou des conservateurs cosmétiques — ne touchant que les sujets sensibilisés, mais avec une réaction qui peut être déclenchée par une quantité minime de l'allergène en cause une fois la sensibilisation établie).",
    mecanisme: "Dermocorticoïdes : action anti-inflammatoire locale par transrépression de gènes pro-inflammatoires → réduction de l'inflammation et du prurit de la phase aiguë, traitement de référence quelle que soit la cause (irritative ou allergique) une fois l'éviction de l'agent causal mise en place, puissance et durée adaptées à la localisation et à la sévérité de l'atteinte.\n\nÉmollients : restauration de la fonction barrière cutanée altérée par l'inflammation et l'agression répétée, complément indispensable au traitement anti-inflammatoire et à l'éviction de la cause, particulièrement important dans les dermites d'irritation chronique liées à une exposition professionnelle répétée (eau, détergents).",
    diagnostic: "Interrogatoire minutieux essentiel : profession, loisirs, produits cosmétiques ou ménagers utilisés, bijoux portés, topographie précise des lésions (souvent très évocatrice de la cause : lobes des oreilles pour le nickel des bijoux fantaisie, mains pour les irritants professionnels, paupières pour certains cosmétiques ou allergènes aéroportés) — les patch-tests (tests épicutanés) en milieu spécialisé permettent de confirmer un allergène de contact suspecté en cas de doute diagnostique ou de récidives malgré une éviction présumée.",
    effets_secondaires: [
      {label:"Poursuite de l'exposition à l'allergène ou l'irritant méconnu : échec thérapeutique malgré un traitement anti-inflammatoire bien conduit", niveau:"warning"},
      {label:"Dermite d'irritation professionnelle chronique non prise en charge : peut devenir invalidante et nécessiter un reclassement professionnel", niveau:"warning"},
      {label:"Eczéma de contact généralisé ou très inflammatoire : peut nécessiter une corticothérapie orale de courte durée dans les formes sévères", niveau:"warning"},
    ],
    classes: [
      {classe:"Dermocorticoïdes — traitement de référence de la phase inflammatoire", dci:["Selon la puissance adaptée à la localisation et la sévérité"], specialites:["Diprosone®","Betneval®","Tridesonit®"], couleur:"#1B6B52", remarque:"Puissance et durée adaptées à la localisation (visage : faible puissance, mains/corps : puissance plus forte possible), éviction de la cause indispensable en parallèle"},
      {classe:"Émollients — restauration de la barrière cutanée", dci:["Émollients sans parfum ni conservateur sensibilisant"], specialites:["Diverses formulations hypoallergéniques"], couleur:"#1E3A5F", remarque:"Choix de formulations pauvres en allergènes potentiels, particulièrement important en cas d'eczéma de contact aux cosmétiques"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse systémique significative pour les traitements topiques à action locale",
    ],
    points_cles: [
      "Éviction de l'agent causal : seul traitement véritablement curatif de l'eczéma de contact, à identifier précisément",
      "Dermite d'irritation (non immunologique, dose-dépendante) versus eczéma allergique (immunologique, sensibilisation préalable) : deux mécanismes distincts",
      "Topographie des lésions : souvent très évocatrice de la cause (nickel, cosmétiques, irritants professionnels)",
      "Patch-tests : examen de référence pour confirmer un allergène de contact suspecté en cas de doute ou de récidive",
      "Dermocorticoïdes : traitement de référence de la phase inflammatoire, toujours associés à l'éviction de la cause identifiée",
    ],
  },
  n3: {
    saviez_vous: "L'allergie au nickel, l'une des allergies de contact les plus fréquentes en population générale (touchant davantage les femmes en raison du port de bijoux fantaisie), peut se manifester par un eczéma à distance du site de contact direct (réaction systémique) chez les sujets très sensibilisés ingérant des aliments riches en nickel (chocolat, fruits secs, certains légumes) — un phénomène moins connu mais à considérer en cas d'eczéma de contact au nickel résistant malgré une éviction cutanée apparemment correcte.",
    physiopatho: "Mécanisme immunologique de l'eczéma de contact allergique en détail : lors du premier contact avec l'allergène (phase de sensibilisation), celui-ci se lie à des protéines cutanées formant un complexe haptène-protéine reconnu par les cellules de Langerhans épidermiques qui migrent vers les ganglions lymphatiques locorégionaux et présentent cet antigène aux lymphocytes T naïfs → différenciation en lymphocytes T mémoires spécifiques de l'allergène, sans manifestation clinique à ce stade → lors d'une exposition ultérieure (phase de révélation), ces lymphocytes mémoires, désormais présents dans la peau et la circulation, sont rapidement réactivés au contact de l'allergène → libération de cytokines pro-inflammatoires → eczéma clinique apparaissant typiquement 24-72h après ce contact ultérieur, délai caractéristique de cette hypersensibilité retardée de type IV.",
    pharmacocinetique: "Dermocorticoïdes selon la puissance : la classification en 4 classes de puissance (très forte, forte, modérée, faible) guide le choix selon la localisation (zones fines comme le visage et les plis nécessitant une puissance plus faible en raison d'une absorption cutanée naturellement plus importante à ces sites) et la sévérité de l'eczéma, principe pharmacologique fondamental pour optimiser l'efficacité tout en minimisant le risque d'effets indésirables locaux (atrophie cutanée notamment).",
    cas_clinique: "Patiente 35 ans, eczéma chronique des lobes d'oreilles et autour du cou depuis plusieurs mois, port fréquent de bijoux fantaisie, échec d'un traitement par dermocorticoïde seul sans éviction associée. Que proposez-vous ?\n\nRaisonnement : tableau très évocateur d'allergie de contact au nickel (topographie typique des lobes d'oreilles, bijoux fantaisie) avec échec thérapeutique probablement lié à la persistance de l'exposition plutôt qu'à une réelle résistance au traitement anti-inflammatoire → conseil d'éviction stricte des bijoux fantaisie (privilégier l'acier inoxydable, l'or, le titane, moins sensibilisants), confirmation possible par patch-test au nickel en cas de doute, traitement dermocorticoïde associé à cette éviction pour traiter l'inflammation déjà présente, information sur le risque de réactions systémiques à distance en cas d'ingestion d'aliments riches en nickel si l'eczéma persiste malgré l'éviction cutanée stricte.",
    effets_secondaires: [
      {label:"Allergie systémique au nickel par voie alimentaire : à considérer en cas de persistance malgré éviction cutanée stricte", niveau:"warning"},
      {label:"Dermocorticoïde inadapté à la localisation (trop puissant sur peau fine) : risque d'atrophie cutanée locale", niveau:"warning"},
    ],
    classes: [
      {classe:"Dermocorticoïdes de puissance adaptée à la localisation fine", dci:["Hydrocortisone ou désonide pour les zones fines"], specialites:["Locapred®","Tridesonit®"], couleur:"#1B6B52", remarque:"Puissance plus faible nécessaire sur les zones fines (visage, oreilles, plis) en raison d'une absorption cutanée naturellement plus importante"},
      {classe:"Bijoux hypoallergéniques — prévention des récidives", dci:["Acier inoxydable, titane, or, non médicamenteux"], specialites:["Conseil de prévention"], couleur:"#1E3A5F", remarque:"Substitution des bijoux fantaisie contenant du nickel, mesure préventive essentielle en complément du traitement curatif"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse spécifique supplémentaire notable pour cette section",
    ],
    points_cles: [
      "Allergie au nickel : l'une des plus fréquentes en population générale, prédominance féminine liée au port de bijoux fantaisie",
      "Réaction systémique au nickel par voie alimentaire : à considérer en cas de persistance malgré éviction cutanée stricte",
      "Délai de 24-72h après le contact : caractéristique de l'hypersensibilité retardée de type IV de l'eczéma de contact allergique",
      "Classification des dermocorticoïdes en 4 classes de puissance : guide le choix selon la localisation et la sévérité",
      "Substitution par des bijoux hypoallergéniques (acier inoxydable, titane, or) : mesure préventive essentielle des récidives",
    ],
  },
  n4: {
    saviez_vous: "L'eczéma de contact professionnel représente l'une des principales causes de maladie professionnelle reconnue en dermatologie, particulièrement dans certains secteurs à forte exposition (coiffure, santé, bâtiment, agroalimentaire) — sa reconnaissance comme maladie professionnelle peut ouvrir droit à une prise en charge spécifique et parfois à un reclassement professionnel, justifiant une orientation vers la médecine du travail dès la suspicion d'une origine professionnelle.",
    physiopatho: "Eczéma de contact systémique : phénomène où un allergène, initialement responsable d'une sensibilisation cutanée de contact, déclenche secondairement une réaction eczémateuse généralisée ou à distance lorsqu'il est introduit par une autre voie (orale, inhalée, ou par voie systémique médicamenteuse) — ce mécanisme, bien documenté pour le nickel mais aussi décrit pour d'autres allergènes (certains parfums, conservateurs), illustre la possible interconnexion entre sensibilisation cutanée de contact et réactivité systémique ultérieure, complexifiant parfois la prise en charge des patients très sensibilisés à un allergène ubiquitaire.",
    recommandations: "Société Française de Dermatologie / Médecine du travail — Eczéma de contact : identification précise de la cause par interrogatoire et patch-tests si nécessaire, éviction stricte de l'allergène ou de l'irritant identifié, traitement anti-inflammatoire local (dermocorticoïdes) adapté à la sévérité et à la localisation. Orientation vers la médecine du travail si origine professionnelle suspectée ou confirmée, pour évaluation du poste de travail et discussion de mesures de protection ou de reclassement si nécessaire.",
    situations_complexes: "Eczéma de contact professionnel chronique invalidant : peut nécessiter un changement de poste ou une reconversion professionnelle si les mesures de protection (gants, produits de substitution) s'avèrent insuffisantes pour permettre la poursuite de l'activité dans des conditions compatibles avec la santé cutanée du travailleur.\n\nEczéma de contact aux dispositifs médicaux (pansements adhésifs, certains matériaux de prothèses ou implants) : situation particulière nécessitant une identification précise du matériau en cause, parfois complexe lorsque le dispositif est indispensable au patient (recherche d'alternatives compatibles avec le profil de sensibilisation identifié).\n\nDermite de contact aux protections périodiques ou couches (nourrisson, incontinence) : eczéma de contact spécifique lié à l'occlusion et à l'humidité prolongée plutôt qu'à un véritable allergène dans la majorité des cas, prise en charge par changes fréquents et produits barrières adaptés plutôt qu'une éviction d'allergène spécifique.",
    effets_secondaires: [
      {label:"Eczéma de contact professionnel chronique non pris en charge : peut conduire à une invalidité professionnelle nécessitant un reclassement", niveau:"warning"},
      {label:"Eczéma systémique par sensibilisation ubiquitaire (nickel notamment) : complexité de prise en charge si l'allergène est très répandu dans l'environnement", niveau:"warning"},
      {label:"Allergie de contact à un dispositif médical indispensable : nécessite une recherche complexe d'alternatives compatibles", niveau:"warning"},
    ],
    classes: [
      {classe:"Produits barrières — dermite de contact par occlusion (couches, incontinence)", dci:["Crèmes barrières à base d'oxyde de zinc notamment"], specialites:["Mitosyl®","Bepanthen®"], couleur:"#1B6B52", remarque:"Prise en charge spécifique de la dermite par occlusion, distincte de l'éviction d'un allergène spécifique"},
      {classe:"Gants de protection adaptés — eczéma professionnel par irritants/allergènes", dci:["Gants selon le type d'exposition professionnelle (nitrile, vinyle selon le contexte)"], specialites:["Équipements de protection individuelle"], couleur:"#1E3A5F", remarque:"Mesure de protection essentielle en milieu professionnel, choix du matériau adapté selon l'allergène ou l'irritant identifié (certains gants en latex pouvant eux-mêmes être sensibilisants)"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse spécifique supplémentaire notable pour cette section",
    ],
    points_cles: [
      "Eczéma de contact professionnel : cause majeure de maladie professionnelle reconnue, orientation vers la médecine du travail recommandée",
      "Eczéma de contact systémique : un allergène cutané peut déclencher une réaction généralisée par une autre voie d'exposition",
      "Dermite de contact aux dispositifs médicaux : recherche complexe d'alternatives si le dispositif est indispensable au patient",
      "Dermite par occlusion (couches, incontinence) : prise en charge par changes fréquents et produits barrières plutôt qu'éviction d'allergène",
      "Reclassement professionnel : à discuter en cas d'eczéma professionnel chronique invalidant malgré les mesures de protection",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F52 — ENTORSE
   ════════════════════════════════════════════════════════ */
FN['entorse'] = {
  n2: {
    saviez_vous: "Le protocole RICE (Repos, Ice/Glace, Compression, Élévation), longtemps enseigné comme référence absolue pour l'entorse, a évolué vers le concept PEACE & LOVE qui réintroduit une mobilisation précoce et progressive plutôt qu'un repos strict prolongé — la glace elle-même, bien qu'utile pour l'antalgie initiale, ne semble plus avoir l'effet anti-inflammatoire bénéfique qu'on lui attribuait, l'inflammation initiale faisant partie du processus normal de cicatrisation tissulaire.",
    physiopatho: "L'entorse résulte d'une élongation ou d'une rupture partielle ou complète d'un ou plusieurs ligaments, le plus souvent au niveau de la cheville (ligament latéral externe, particulièrement le faisceau talo-fibulaire antérieur) suite à un mouvement forcé dépassant l'amplitude physiologique normale de l'articulation (typiquement un mouvement d'inversion forcée du pied) → selon la sévérité, on distingue l'entorse simple ou bénigne (élongation sans rupture, ligament fonctionnel), l'entorse moyenne (rupture partielle), et l'entorse grave (rupture complète, instabilité articulaire associée) — cette gradation guide directement la prise en charge et le pronostic de récupération.",
    mecanisme: "Antalgiques/AINS : réduction de la douleur et de l'inflammation locale associées au traumatisme ligamentaire, utiles pour le confort et permettre une mobilisation plus précoce, sans accélérer la cicatrisation ligamentaire elle-même qui suit son propre processus biologique de réparation.\n\nMobilisation précoce et progressive (approche actuelle) : contrairement à l'immobilisation stricte prolongée auparavant privilégiée, la mobilisation précoce dans les limites de la douleur favoriserait une meilleure récupération fonctionnelle et un retour plus rapide à l'activité, en stimulant une cicatrisation ligamentaire de meilleure qualité architecturale.",
    diagnostic: "Règles d'Ottawa : outil clinique validé permettant de déterminer la nécessité d'une radiographie de cheville ou de pied après un traumatisme, basé sur la présence ou l'absence de douleur à la palpation de points osseux précis et la capacité à porter le poids du corps — ces règles permettent d'éviter de nombreuses radiographies inutiles tout en ne manquant pas les fractures associées qui nécessiteraient une prise en charge spécifique différente de la simple entorse ligamentaire.",
    effets_secondaires: [
      {label:"Entorse grave méconnue (rupture complète) : risque d'instabilité chronique de l'articulation si non diagnostiquée et prise en charge spécifiquement", niveau:"warning"},
      {label:"Immobilisation stricte prolongée et excessive : peut retarder la récupération fonctionnelle par rapport à une mobilisation précoce adaptée", niveau:"warning"},
      {label:"Fracture associée méconnue sous couvert d'une simple entorse : retard de prise en charge adaptée si non recherchée selon les règles d'Ottawa", niveau:"warning"},
    ],
    classes: [
      {classe:"AINS — antalgie et anti-inflammation de la phase aiguë", dci:["Ibuprofène","Kétoprofène"], specialites:["Nurofen®","Profénid®"], couleur:"#1B6B52", remarque:"Utiles pour le confort et permettre une mobilisation plus précoce, durée limitée à la phase aiguë"},
      {classe:"Contention souple (strapping, orthèse) — selon la sévérité", dci:["Bande de contention ou orthèse stabilisatrice"], specialites:["Diverses orthèses de cheville"], couleur:"#1E3A5F", remarque:"Adaptée selon le grade de l'entorse, permet une mobilisation protégée plutôt qu'une immobilisation stricte"},
      {classe:"Protocole PEACE & LOVE — approche actuelle privilégiée", dci:["Mobilisation précoce et progressive, non médicamenteux"], specialites:["Approche thérapeutique actualisée"], couleur:"#B45309", remarque:"Remplace progressivement le RICE classique, favorise une récupération fonctionnelle de meilleure qualité"},
    ],
    interactions: [
      "AINS + anticoagulants : ↑ risque hémorragique — prudence si association nécessaire",
    ],
    points_cles: [
      "Protocole PEACE & LOVE : évolution du RICE classique, réintroduit une mobilisation précoce et progressive plutôt qu'un repos strict",
      "Glace : utile pour l'antalgie initiale mais sans l'effet anti-inflammatoire bénéfique qu'on lui attribuait auparavant",
      "Règles d'Ottawa : outil clinique validé pour déterminer la nécessité d'une radiographie après un traumatisme de cheville",
      "Gradation de l'entorse (simple, moyenne, grave) : guide directement la prise en charge et le pronostic de récupération",
      "Mobilisation précoce dans les limites de la douleur : favorise une meilleure récupération fonctionnelle que l'immobilisation stricte",
    ],
  },
  n3: {
    saviez_vous: "L'instabilité chronique de cheville, complication possible d'une entorse mal prise en charge ou récidivante, touche jusqu'à 20-40% des patients ayant présenté une entorse de cheville selon les études — ce risque significatif justifie une rééducation proprioceptive systématique après la phase aiguë, particulièrement chez les sportifs ou les patients ayant des antécédents d'entorses répétées du même côté.",
    physiopatho: "Mécanismes de l'instabilité chronique de cheville : au-delà de la simple laxité mécanique résiduelle (ligament cicatrisé mais distendu), un déficit proprioceptif persistant (altération de la perception de la position et du mouvement de l'articulation, liée à une atteinte des récepteurs sensitifs ligamentaires lors du traumatisme initial) contribue significativement à l'instabilité fonctionnelle ressentie par le patient, expliquant pourquoi certains patients avec une laxité mécanique modérée présentent une instabilité fonctionnelle importante (et inversement) — ce constat justifie l'importance de la rééducation proprioceptive spécifique, au-delà du simple renforcement musculaire, pour restaurer le contrôle neuromusculaire de l'articulation.",
    pharmacocinetique: "AINS topiques (gel anti-inflammatoire local) : concentration tissulaire locale significative au site d'application avec une exposition systémique nettement réduite par rapport à la voie orale, alternative intéressante pour limiter les effets indésirables systémiques (notamment digestifs) tout en conservant un effet antalgique et anti-inflammatoire local appréciable pour les entorses simples à modérées.",
    cas_clinique: "Patient 24 ans, sportif amateur, 3e entorse de cheville droite en 18 mois, sensation de 'cheville qui lâche' lors de la pratique sportive, examen clinique entre les épisodes ne retrouvant qu'une laxité ligamentaire modérée. Quelle est votre démarche ?\n\nRaisonnement : tableau évocateur d'instabilité chronique de cheville avec composante fonctionnelle (sensation subjective d'instabilité) probablement disproportionnée par rapport à la laxité mécanique objective mesurée → orientation vers un programme de rééducation proprioceptive spécifique (travail de l'équilibre, plateaux instables, renforcement musculaire ciblé) plutôt qu'une simple poursuite d'orthèses de contention sans rééducation active, pour restaurer le contrôle neuromusculaire déficitaire à l'origine de la récidive et de l'instabilité fonctionnelle ressentie.",
    effets_secondaires: [
      {label:"Instabilité chronique non rééduquée : risque de récidives répétées d'entorses, cercle vicieux délétère pour l'articulation à long terme", niveau:"warning"},
      {label:"Déficit proprioceptif persistant méconnu : explique l'échec d'approches purement mécaniques (orthèses seules) sans rééducation active associée", niveau:"warning"},
    ],
    classes: [
      {classe:"Rééducation proprioceptive — prévention de l'instabilité chronique", dci:["Programme de rééducation spécifique, non médicamenteux"], specialites:["Prise en charge en kinésithérapie"], couleur:"#1B6B52", remarque:"Essentielle après une entorse, particulièrement en cas de récidives, restaure le contrôle neuromusculaire déficitaire"},
      {classe:"AINS topiques — alternative limitant l'exposition systémique", dci:["Kétoprofène gel","Diclofénac gel"], specialites:["Flector®","Voltarène® gel"], couleur:"#1E3A5F", remarque:"Alternative intéressante pour les entorses simples à modérées, exposition systémique limitée par rapport à la voie orale"},
    ],
    interactions: [
      "AINS topiques + exposition solaire : photosensibilisation possible selon la molécule (kétoprofène notamment), protection de la zone traitée recommandée",
    ],
    points_cles: [
      "Instabilité chronique de cheville : touche 20-40% des patients après une entorse, justifie une rééducation proprioceptive systématique",
      "Déficit proprioceptif : contribue à l'instabilité fonctionnelle indépendamment de la laxité mécanique objective mesurée",
      "Rééducation proprioceptive : essentielle au-delà du simple renforcement musculaire, restaure le contrôle neuromusculaire articulaire",
      "Entorses récidivantes : signal devant motiver une prise en charge rééducative active plutôt qu'une simple contention répétée",
      "AINS topiques : alternative intéressante limitant l'exposition systémique pour les entorses simples à modérées",
    ],
  },
  n4: {
    saviez_vous: "La fracture de Maisonneuve, lésion rare mais grave associant une fracture du col de la fibula (péroné) à une lésion ligamentaire complexe de la cheville, peut être totalement méconnue si l'examen clinique se limite à la cheville elle-même sans palpation systématique de la fibula proximale — un piège diagnostique classique soulignant l'importance d'un examen clinique complet de tout le membre lors de l'évaluation d'un traumatisme de cheville apparemment simple.",
    physiopatho: "Lésions associées à ne pas méconnaître derrière une 'simple entorse' : au-delà de la fracture de Maisonneuve, d'autres lésions peuvent accompagner ou mimer une entorse de cheville — fracture-tassement ostéochondral du dôme talien (lésion cartilagineuse pouvant passer inaperçue sur les radiographies standard, nécessitant parfois une IRM pour confirmation en cas de douleur persistante malgré une prise en charge adaptée), rupture du tendon péronier associée, ou syndrome du sinus du tarse (douleur résiduelle chronique après une entorse apparemment bien prise en charge) — ces diagnostics différentiels doivent être évoqués devant une évolution atypique ou une persistance de la douleur au-delà du délai habituel de guérison d'une entorse simple.",
    recommandations: "HAS / Médecine du sport — Entorse de cheville : règles d'Ottawa pour orienter la nécessité d'imagerie. Protocole PEACE & LOVE privilégiant une mobilisation précoce et progressive. Contention adaptée à la sévérité (simple : peu ou pas de contention, moyenne à grave : orthèse stabilisatrice). Rééducation proprioceptive systématique après la phase aiguë, particulièrement importante en cas d'antécédents d'entorses répétées ou de pratique sportive régulière.",
    situations_complexes: "Entorse grave avec instabilité majeure d'emblée (suspicion de rupture ligamentaire complète) : orientation chirurgicale à discuter selon le profil du patient (sportif de haut niveau notamment), en alternative à un traitement fonctionnel bien conduit qui reste souvent privilégié même dans les formes graves chez le patient non sportif de compétition.\n\nDouleur persistante au-delà de 6-8 semaines malgré une prise en charge adaptée d'une entorse apparemment simple : réévaluation nécessaire à la recherche d'une lésion associée méconnue (lésion ostéochondrale, syndrome du sinus du tarse), imagerie complémentaire (IRM) à discuter si la simple radiographie initiale était normale.\n\nEntorse chez l'enfant en période de croissance : vigilance particulière sur la possibilité d'une atteinte du cartilage de croissance (épiphysiolyse) pouvant mimer une simple entorse, mécanisme et localisation de la douleur à analyser avec attention dans cette population spécifique en raison des implications potentielles sur la croissance osseuse future.",
    effets_secondaires: [
      {label:"Fracture de Maisonneuve méconnue : lésion grave nécessitant une prise en charge spécifique différente d'une simple entorse de cheville", niveau:"danger"},
      {label:"Lésion ostéochondrale du dôme talien méconnue : évolution vers une arthrose précoce de la cheville si non diagnostiquée et traitée", niveau:"danger"},
      {label:"Épiphysiolyse méconnue chez l'enfant : risque de trouble de croissance si confondue avec une simple entorse", niveau:"danger"},
    ],
    classes: [
      {classe:"Prise en charge chirurgicale — entorse grave sélectionnée, sportif de haut niveau", dci:["Réparation ligamentaire chirurgicale selon indication spécialisée"], specialites:["Procédure chirurgicale orthopédique"], couleur:"#6B2D5E", remarque:"Option à discuter selon le profil sportif et la sévérité de l'instabilité, alternative au traitement fonctionnel privilégié dans la majorité des cas"},
      {classe:"IRM — exploration complémentaire si douleur persistante atypique", dci:["Imagerie par résonance magnétique"], specialites:["Exploration radiologique spécialisée"], couleur:"#1E3A5F", remarque:"Indiquée en cas de persistance de la douleur au-delà du délai habituel ou de suspicion de lésion associée non visible sur la radiographie standard"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse spécifique supplémentaire notable pour cette section",
    ],
    points_cles: [
      "Fracture de Maisonneuve : piège diagnostique classique, nécessite une palpation systématique de la fibula proximale lors de l'examen",
      "Lésions associées (ostéochondrale, syndrome du sinus du tarse) : à évoquer devant une évolution atypique ou une douleur persistante",
      "Entorse grave avec instabilité majeure : prise en charge chirurgicale à discuter selon le profil sportif du patient",
      "Épiphysiolyse chez l'enfant en croissance : vigilance particulière pour ne pas la confondre avec une simple entorse",
      "Examen clinique complet du membre : essentiel pour ne pas méconnaître une lésion associée à la simple entorse de cheville",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F53 — TENDINITE
   ════════════════════════════════════════════════════════ */
FN['tendinite'] = {
  n2: {
    saviez_vous: "Le terme 'tendinite' (suffixe -ite évoquant une inflammation) est en réalité souvent impropre sur le plan histologique : la majorité des atteintes tendineuses chroniques correspondent davantage à une tendinopathie dégénérative (désorganisation du collagène, néovascularisation anormale) qu'à une authentique inflammation aiguë — cette distinction terminologique a des implications thérapeutiques importantes, notamment sur la place réelle des anti-inflammatoires dans la prise en charge des formes chroniques.",
    physiopatho: "La tendinopathie résulte le plus souvent d'une sollicitation mécanique répétée et excessive d'un tendon dépassant ses capacités d'adaptation et de réparation physiologique → microtraumatismes répétés du collagène tendineux → dans les phases initiales (réactives), une véritable réaction inflammatoire peut être présente, mais dans les formes chroniques installées, le tableau histologique évolue vers une désorganisation structurelle du collagène (perte de l'architecture fibrillaire normale) associée à une néovascularisation anormale et une prolifération de fibroblastes, sans inflammation cellulaire significative — expliquant pourquoi les anti-inflammatoires, efficaces sur la douleur à court terme, n'agissent pas sur le processus de dégénérescence structurelle sous-jacent dans les formes chroniques.",
    mecanisme: "AINS : efficaces sur la composante douloureuse et inflammatoire de la phase aiguë initiale, mais efficacité plus limitée et controversée dans les tendinopathies chroniques installées où la composante inflammatoire est moins prédominante par rapport au processus dégénératif structurel.\n\nRepos relatif et adaptation de l'activité (plutôt que repos strict) : élément central de la prise en charge, visant à réduire la sollicitation mécanique excessive responsable du dépassement des capacités d'adaptation tendineuses, sans pour autant supprimer toute activité qui pourrait elle-même nuire à la qualité de la cicatrisation tendineuse par déconditionnement.",
    diagnostic: "Diagnostic clinique principalement : douleur mécanique (apparaissant ou s'aggravant à l'effort sollicitant le tendon concerné, soulagée par le repos), souvent localisée précisément sur le trajet tendineux ou son insertion osseuse, parfois associée à un gonflement local discret. L'échographie peut confirmer le diagnostic et évaluer la sévérité des lésions structurelles (épaisseur tendineuse, présence de néovascularisation, fissures) en cas de doute diagnostique ou de persistance malgré un traitement initial bien conduit.",
    effets_secondaires: [
      {label:"AINS au long cours dans une tendinopathie chronique : bénéfice limité sur le processus dégénératif, effets indésirables systémiques cumulés sans gain proportionnel", niveau:"warning"},
      {label:"Repos strict prolongé excessif : peut favoriser un déconditionnement tendineux délétère pour la qualité de cicatrisation à terme", niveau:"warning"},
      {label:"Rupture tendineuse (complication possible d'une tendinopathie sévère négligée) : urgence orthopédique selon le tendon concerné", niveau:"danger"},
    ],
    classes: [
      {classe:"AINS — phase aiguë initiale uniquement", dci:["Ibuprofène","Kétoprofène"], specialites:["Nurofen®","Profénid®"], couleur:"#1B6B52", remarque:"Efficacité principalement démontrée dans la phase aiguë initiale, bénéfice plus limité dans les tendinopathies chroniques installées"},
      {classe:"AINS topiques — alternative limitant l'exposition systémique", dci:["Diclofénac gel","Kétoprofène gel"], specialites:["Voltarène® gel","Flector®"], couleur:"#1E3A5F", remarque:"Intérêt particulier pour les tendinopathies superficiellement accessibles, exposition systémique réduite"},
      {classe:"Repos relatif et adaptation de l'activité", dci:["Modification de l'activité sollicitant le tendon, non médicamenteux"], specialites:["Approche thérapeutique de base"], couleur:"#B45309", remarque:"Élément central de la prise en charge, à privilégier sur un repos strict qui peut être délétère à terme"},
    ],
    interactions: [
      "AINS + anticoagulants : ↑ risque hémorragique — prudence si association nécessaire",
    ],
    points_cles: [
      "Tendinopathie chronique : davantage une dégénérescence structurelle qu'une authentique inflammation, malgré le terme 'tendinite' couramment utilisé",
      "AINS : efficaces sur la phase aiguë, bénéfice plus limité dans les formes chroniques où la composante inflammatoire est moins prédominante",
      "Repos relatif et adaptation de l'activité : à privilégier sur un repos strict prolongé, potentiellement délétère pour la qualité de cicatrisation",
      "Échographie : utile pour confirmer le diagnostic et évaluer la sévérité structurelle en cas de doute ou de persistance malgré traitement",
      "Rupture tendineuse : complication possible d'une tendinopathie sévère négligée, urgence orthopédique selon le tendon concerné",
    ],
  },
  n3: {
    saviez_vous: "Les exercices excentriques (contraction musculaire avec allongement simultané du muscle, par exemple la descente contrôlée d'un mollet sur une marche pour le tendon d'Achille) ont démontré une efficacité supérieure aux approches passives dans le traitement des tendinopathies chroniques — ce paradoxe apparent (solliciter activement un tendon douloureux plutôt que le mettre au repos) s'explique par la stimulation d'un remodelage structurel bénéfique du collagène tendineux sous l'effet de cette charge mécanique spécifique et progressive.",
    physiopatho: "Mécanisme du remodelage tendineux sous charge excentrique : la sollicitation mécanique contrôlée et progressive du tendon stimule les ténocytes (cellules tendineuses) à produire un collagène de meilleure qualité architecturale et à réorganiser la matrice extracellulaire désorganisée caractéristique de la tendinopathie chronique → ce processus d'adaptation mécanobiologique, distinct d'un simple effet antalgique symptomatique, expliquerait l'efficacité structurelle démontrée des protocoles d'exercices excentriques au-delà du simple soulagement temporaire de la douleur obtenu par d'autres approches passives.",
    pharmacocinetique: "Infiltrations de corticoïdes (tendinopathies réfractaires sélectionnées) : action anti-inflammatoire locale puissante et rapide, mais à utiliser avec prudence et parcimonie dans les tendinopathies (contrairement à d'autres indications rhumatologiques) en raison d'un risque de fragilisation structurelle du tendon et de rupture tendineuse secondaire si répétées ou injectées directement dans la substance tendineuse plutôt qu'en périphérie, limitant leur usage à des situations bien sélectionnées et à un nombre restreint d'injections.",
    cas_clinique: "Patient 45 ans, tendinopathie d'Achille chronique évoluant depuis 4 mois, échec d'un traitement par AINS et repos relatif, douleur persistante limitant la pratique sportive. Que proposez-vous ?\n\nRaisonnement : tendinopathie chronique installée avec échec d'une approche initiale standard (AINS, repos relatif) → orientation vers un programme structuré d'exercices excentriques spécifiques (protocole de renforcement progressif du tendon d'Achille), approche ayant démontré une efficacité structurelle supérieure aux traitements passifs dans cette indication précise, encadrement par un kinésithérapeute formé à ce type de protocole recommandé pour une progression adaptée et sécurisée, plutôt qu'une simple poursuite indéfinie d'anti-inflammatoires dont l'efficacité est limitée dans ce contexte chronique.",
    effets_secondaires: [
      {label:"Infiltrations de corticoïdes répétées dans la substance tendineuse : risque de fragilisation structurelle et de rupture tendineuse secondaire", niveau:"danger"},
      {label:"Programme d'exercices excentriques mal encadré ou trop intense d'emblée : risque d'aggravation transitoire si progression inadaptée", niveau:"warning"},
    ],
    classes: [
      {classe:"Exercices excentriques — référence dans les tendinopathies chroniques", dci:["Protocole de renforcement excentrique spécifique, non médicamenteux"], specialites:["Prise en charge en kinésithérapie spécialisée"], couleur:"#1B6B52", remarque:"Efficacité structurelle démontrée supérieure aux approches passives, encadrement professionnel recommandé pour une progression adaptée"},
      {classe:"Infiltrations de corticoïdes péri-tendineuses — sélectionnées et limitées", dci:["Corticoïde injectable, nombre limité d'infiltrations"], specialites:["Réalisées en milieu spécialisé"], couleur:"#B45309", remarque:"À utiliser avec prudence et parcimonie en raison du risque de fragilisation structurelle, réservées aux situations bien sélectionnées"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse spécifique supplémentaire notable pour cette section",
    ],
    points_cles: [
      "Exercices excentriques : efficacité supérieure aux approches passives dans les tendinopathies chroniques, paradoxe apparent mais bien démontré",
      "Remodelage structurel du collagène sous charge mécanique progressive : mécanisme expliquant l'efficacité de cette approche active",
      "Infiltrations de corticoïdes : à utiliser avec prudence dans les tendinopathies, risque de fragilisation et de rupture secondaire",
      "Tendinopathie chronique réfractaire aux approches passives : orientation vers un programme structuré d'exercices excentriques",
      "Encadrement kinésithérapique recommandé pour une progression adaptée et sécurisée du protocole d'exercices excentriques",
    ],
  },
  n4: {
    saviez_vous: "Les fluoroquinolones, classe d'antibiotiques largement utilisée, sont associées à un risque accru de tendinopathie et même de rupture tendineuse (notamment du tendon d'Achille), particulièrement chez le sujet âgé, le patient sous corticothérapie associée, ou le transplanté — ce risque iatrogène, bien documenté par les agences de pharmacovigilance, justifie une vigilance particulière et l'arrêt immédiat du traitement antibiotique devant l'apparition de toute douleur tendineuse pendant ou après une cure de fluoroquinolone.",
    physiopatho: "Mécanisme de la toxicité tendineuse des fluoroquinolones : ces antibiotiques auraient un effet délétère direct sur le métabolisme du collagène tendineux (inhibition de la prolifération des ténocytes et altération de la synthèse du collagène) ainsi qu'un possible effet chélateur du magnésium, cofacteur essentiel de nombreuses enzymes impliquées dans la synthèse et la réparation du collagène → ces mécanismes combinés fragiliseraient la structure tendineuse, expliquant le risque accru de tendinopathie et de rupture, particulièrement marqué pour le tendon d'Achille en raison de sa vascularisation relativement pauvre et de sa sollicitation mécanique importante au quotidien.",
    recommandations: "HAS / ANSM — Tendinopathie : repos relatif et adaptation de l'activité en phase aiguë, AINS de courte durée si besoin pour le confort. Programme d'exercices excentriques en kinésithérapie pour les formes chroniques installées, approche de référence avec la meilleure preuve d'efficacité structurelle. Infiltrations de corticoïdes réservées à des situations sélectionnées avec prudence. Vigilance et information systématique sur le risque tendineux des fluoroquinolones, particulièrement chez les populations à risque accru.",
    situations_complexes: "Tendinopathie sous fluoroquinolone : arrêt immédiat de l'antibiotique dès l'apparition de symptômes tendineux, substitution par une autre classe d'antibiotique si le traitement antibiotique reste indispensable, information systématique du patient sur ce risque lors de la délivrance de fluoroquinolones, particulièrement chez les populations à risque accru (sujet âgé, corticothérapie associée, transplanté).\n\nRupture tendineuse confirmée (notamment tendon d'Achille ou de la coiffe des rotateurs) : prise en charge chirurgicale à discuter selon le tendon concerné, l'âge et le niveau d'activité du patient, alternative au traitement fonctionnel orthopédique selon les cas, rééducation prolongée systématique après la phase initiale quelle que soit l'option choisie.\n\nTendinopathie calcifiante de l'épaule : entité particulière liée à des dépôts calciques au sein du tendon (notamment supra-épineux), pouvant se manifester par des épisodes de douleur aiguë intense lors de la phase de résorption calcique, traitement spécifique parfois nécessaire (ponction-lavage du dépôt calcique, ondes de choc extracorporelles) en cas de symptômes invalidants persistants.",
    effets_secondaires: [
      {label:"Rupture tendineuse sous fluoroquinolone : risque iatrogène bien documenté, particulièrement chez le sujet âgé ou sous corticothérapie associée", niveau:"danger"},
      {label:"Rupture tendineuse négligée (coiffe des rotateurs, Achille) : retentissement fonctionnel majeur si prise en charge tardive ou inadaptée", niveau:"danger"},
      {label:"Tendinopathie calcifiante avec épisode de résorption aiguë : douleur intense impressionnante mais généralement spontanément résolutive", niveau:"warning"},
    ],
    classes: [
      {classe:"Ondes de choc extracorporelles — tendinopathie calcifiante ou chronique réfractaire", dci:["Technique non médicamenteuse spécifique"], specialites:["Réalisée en centre spécialisé de médecine du sport ou rhumatologie"], couleur:"#1E3A5F", remarque:"Option pour les tendinopathies chroniques réfractaires aux approches conservatrices classiques ou les tendinopathies calcifiantes symptomatiques"},
      {classe:"Réparation chirurgicale — rupture tendineuse confirmée selon le contexte", dci:["Chirurgie orthopédique selon le tendon et le profil du patient"], specialites:["Procédure chirurgicale spécialisée"], couleur:"#6B2D5E", remarque:"À discuter selon le tendon concerné, l'âge et le niveau d'activité, alternative au traitement fonctionnel selon les cas"},
    ],
    interactions: [
      "Fluoroquinolones + corticothérapie associée : risque cumulé majeur de tendinopathie et de rupture, vigilance particulière indispensable",
      "Fluoroquinolones chez le sujet âgé ou transplanté : risque accru de toxicité tendineuse, information systématique nécessaire",
    ],
    points_cles: [
      "Fluoroquinolones : risque iatrogène bien documenté de tendinopathie et de rupture tendineuse, arrêt immédiat si symptôme tendineux",
      "Populations à risque accru de toxicité tendineuse aux fluoroquinolones : sujet âgé, corticothérapie associée, transplanté",
      "Tendinopathie calcifiante de l'épaule : épisodes de douleur aiguë intense lors de la résorption calcique, généralement spontanément résolutifs",
      "Ondes de choc extracorporelles : option pour les tendinopathies chroniques réfractaires aux approches conservatrices classiques",
      "Rupture tendineuse confirmée : prise en charge chirurgicale à discuter selon le tendon, l'âge et le niveau d'activité du patient",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F54 — ULCÈRE GASTRIQUE
   ════════════════════════════════════════════════════════ */
FN['ulcere-gastrique'] = {
  n2: {
    saviez_vous: "La découverte qu'Helicobacter pylori est responsable de la majorité des ulcères gastro-duodénaux (et non le stress ou l'alimentation épicée comme on le pensait auparavant) a valu à ses découvreurs le prix Nobel de médecine en 2005 — cette découverte a révolutionné la prise en charge de l'ulcère, transformant une maladie chronique nécessitant un traitement à vie en une pathologie curable par une antibiothérapie ciblée d'éradication bactérienne.",
    physiopatho: "L'ulcère gastro-duodénal résulte d'un déséquilibre entre les facteurs agressifs (acide chlorhydrique, pepsine, Helicobacter pylori, AINS) et les facteurs protecteurs de la muqueuse gastro-duodénale (mucus, bicarbonates, flux sanguin muqueux, prostaglandines protectrices) → Helicobacter pylori, bactérie adaptée à survivre dans l'environnement acide gastrique grâce à son uréase (clivant l'urée en ammoniac neutralisant localement l'acidité), colonise la muqueuse et provoque une inflammation chronique (gastrite) fragilisant la barrière protectrice → cette fragilisation, associée parfois à une hypersécrétion acide réactionnelle, favorise la formation de l'ulcère, lésion creusante atteignant au moins la sous-muqueuse.",
    mecanisme: "Trithérapie d'éradication d'Helicobacter pylori (IPP + 2 antibiotiques) : l'IPP réduit la sécrétion acide gastrique, optimisant l'activité des antibiotiques associés (généralement moins efficaces en milieu très acide) tout en favorisant la cicatrisation muqueuse ; les antibiotiques (amoxicilline, clarithromycine, métronidazole selon le schéma choisi) éradiquent directement la bactérie → traitement curatif visant l'éradication complète plutôt qu'un simple contrôle symptomatique, avec vérification de l'éradication recommandée après le traitement.",
    diagnostic: "Endoscopie digestive haute avec biopsies : examen de référence visualisant directement l'ulcère et permettant la recherche d'Helicobacter pylori (test rapide à l'uréase sur biopsie, examen histologique). Test respiratoire à l'urée marquée (non invasif) : alternative pour la recherche ou le contrôle d'éradication d'Helicobacter pylori, particulièrement utile pour vérifier le succès du traitement sans nouvelle endoscopie.",
    effets_secondaires: [
      {label:"Ulcère hémorragique : complication la plus fréquente, signes d'alarme (méléna, hématémèse, anémie) à reconnaître", niveau:"danger"},
      {label:"Perforation ulcéreuse : urgence chirurgicale, douleur abdominale brutale et intense avec contracture, signes de péritonite", niveau:"danger"},
      {label:"Échec de l'éradication d'Helicobacter pylori : résistance antibiotique croissante (notamment à la clarithromycine), nécessitant parfois un schéma alternatif", niveau:"warning"},
    ],
    classes: [
      {classe:"Trithérapie d'éradication — référence si Helicobacter pylori confirmé", dci:["IPP + Amoxicilline + Clarithromycine ou Métronidazole, 10-14 jours"], specialites:["Schéma combiné selon protocole"], couleur:"#1B6B52", remarque:"Vérification de l'éradication recommandée par test respiratoire à l'urée marquée après la fin du traitement"},
      {classe:"IPP — cicatrisation et protection en l'absence ou en complément de l'éradication", dci:["Oméprazole 20-40mg/j","Ésoméprazole 40mg/j"], specialites:["Mopral®","Inexium®"], couleur:"#1E3A5F", remarque:"Durée prolongée (4-8 semaines) pour favoriser la cicatrisation complète de l'ulcère, au-delà de la simple phase d'éradication antibiotique"},
    ],
    interactions: [
      "Clarithromycine + statines métabolisées par CYP3A4 : ↑ risque de myopathie — interruption temporaire de la statine souvent nécessaire",
      "Métronidazole + alcool : effet antabuse (nausées, vomissements, malaise) — éviction stricte de l'alcool pendant le traitement",
    ],
    points_cles: [
      "Helicobacter pylori : responsable de la majorité des ulcères gastro-duodénaux, découverte ayant révolutionné la prise en charge",
      "Trithérapie d'éradication : traitement curatif visant l'élimination complète de la bactérie, pas un simple contrôle symptomatique",
      "Vérification de l'éradication recommandée après traitement par test respiratoire à l'urée marquée",
      "Ulcère hémorragique et perforation : complications graves à reconnaître, urgences nécessitant une prise en charge immédiate",
      "Endoscopie digestive haute : examen de référence pour le diagnostic et la recherche d'Helicobacter pylori par biopsies",
    ],
  },
  n3: {
    saviez_vous: "La résistance croissante d'Helicobacter pylori à la clarithromycine (atteignant des taux significatifs dans plusieurs régions, y compris en France) a conduit à reconsidérer les schémas thérapeutiques de 1ère intention — la quadrithérapie bismuthée ou la quadrithérapie concomitante sont désormais privilégiées dans certaines situations à risque de résistance plutôt que la trithérapie classique à base de clarithromycine, illustrant l'adaptation continue des protocoles face à l'évolution des résistances bactériennes.",
    physiopatho: "Ulcère gastrique versus ulcère duodénal : bien que partageant des mécanismes physiopathologiques communs, ces deux localisations présentent des nuances cliniques distinctes — l'ulcère duodénal est généralement plus fréquent, soulagé typiquement par l'alimentation (la douleur apparaissant souvent à distance des repas, parfois nocturne), tandis que l'ulcère gastrique peut au contraire être aggravé par l'alimentation et nécessite systématiquement des biopsies multiples lors de l'endoscopie pour éliminer une transformation maligne (le risque néoplasique étant spécifique à la localisation gastrique et quasi inexistant pour l'ulcère duodénal simple) — cette distinction influence directement la rigueur du suivi endoscopique recommandé.",
    pharmacocinetique: "IPP dans le traitement de l'ulcère : nécessité de doses parfois plus élevées ou de durées plus prolongées que dans le simple RGO, en raison de la sévérité de l'atteinte muqueuse à cicatriser, avec une attention particulière à l'observance et au respect du timing de prise (à jeun, 30 minutes avant le repas) pour optimiser l'inhibition de la sécrétion acide pendant la phase critique de cicatrisation.",
    cas_clinique: "Patient 60 ans, ulcère gastrique antral découvert à l'endoscopie, biopsies en cours d'analyse, recherche d'Helicobacter pylori positive. Antécédent d'allergie à la pénicilline documentée. Quel schéma thérapeutique proposer ?\n\nRaisonnement : ulcère gastrique avec Helicobacter pylori confirmé, mais allergie à la pénicilline excluant l'amoxicilline du schéma classique → adaptation du protocole d'éradication en remplaçant l'amoxicilline par une autre molécule compatible (généralement métronidazole en association avec la clarithromycine et l'IPP, ou schéma quadruple bismuthé selon les recommandations locales et le profil de résistance régional), suivi systématique des résultats des biopsies (en raison de la localisation gastrique nécessitant d'éliminer formellement une composante néoplasique associée), vérification de l'éradication après traitement.",
    effets_secondaires: [
      {label:"Ulcère gastrique non biopsié de façon adéquate : risque de méconnaître une transformation maligne associée", niveau:"danger"},
      {label:"Résistance à la clarithromycine : échec thérapeutique de la trithérapie classique, nécessitant un schéma alternatif adapté", niveau:"warning"},
      {label:"Allergie à la pénicilline non prise en compte : choix inadapté du schéma d'éradication avec risque de réaction allergique", niveau:"danger"},
    ],
    classes: [
      {classe:"Quadrithérapie bismuthée — alternative en cas de résistance suspectée ou allergie", dci:["IPP + Bismuth + Métronidazole + Tétracycline, 10-14 jours"], specialites:["Pylera® (association fixe) + IPP"], couleur:"#B45309", remarque:"Alternative privilégiée en cas de résistance à la clarithromycine suspectée ou d'allergie à la pénicilline excluant l'amoxicilline"},
      {classe:"Biopsies multiples systématiques — ulcère gastrique (pas duodénal)", dci:["Geste endoscopique diagnostique"], specialites:["Réalisé lors de l'endoscopie initiale"], couleur:"#1E3A5F", remarque:"Indispensable pour éliminer une transformation maligne, spécifique à la localisation gastrique contrairement à l'ulcère duodénal simple"},
    ],
    interactions: [
      "Tétracycline (quadrithérapie bismuthée) : CI chez l'enfant et la femme enceinte (coloration dentaire, toxicité osseuse)",
      "Bismuth + autres traitements oraux : peut interférer avec l'absorption de certains médicaments — espacer les prises si besoin",
    ],
    points_cles: [
      "Résistance croissante à la clarithromycine : justifie l'adaptation des schémas thérapeutiques selon le profil de résistance local",
      "Ulcère gastrique : nécessite systématiquement des biopsies multiples pour éliminer une transformation maligne, contrairement au duodénal",
      "Quadrithérapie bismuthée : alternative privilégiée en cas de résistance suspectée ou d'allergie à la pénicilline",
      "Ulcère duodénal : généralement soulagé par l'alimentation, risque néoplasique quasi inexistant contrairement à l'ulcère gastrique",
      "Suivi des résultats de biopsies indispensable pour tout ulcère gastrique, au-delà du simple traitement d'éradication antibiotique",
    ],
  },
  n4: {
    saviez_vous: "L'infection à Helicobacter pylori est classée comme cancérigène de groupe 1 par l'OMS (même catégorie que le tabac), responsable d'une fraction significative des cancers gastriques à l'échelle mondiale — cette reconnaissance a renforcé l'importance de la stratégie d'éradication, non seulement pour traiter l'ulcère actif mais aussi pour réduire le risque de transformation néoplasique à long terme, particulièrement chez les patients ayant des antécédents familiaux de cancer gastrique.",
    physiopatho: "Cascade de Correa et carcinogenèse gastrique liée à Helicobacter pylori : l'infection chronique non traitée peut évoluer selon une séquence progressive bien documentée — gastrite chronique superficielle → gastrite atrophique → métaplasie intestinale → dysplasie → adénocarcinome gastrique, processus se déroulant typiquement sur plusieurs décennies et expliquant l'intérêt d'une éradication précoce de la bactérie pour interrompre cette cascade avant l'installation de lésions précancéreuses potentiellement moins réversibles aux stades plus avancés (l'atrophie et la métaplasie intestinale étant considérées comme partiellement irréversibles même après éradication réussie à un stade avancé).",
    recommandations: "HAS / SNFGE — Ulcère gastro-duodénal : recherche systématique d'Helicobacter pylori devant tout ulcère diagnostiqué. Éradication par trithérapie ou quadrithérapie selon le contexte et le profil de résistance local. IPP prolongé pour la cicatrisation complète, particulièrement pour l'ulcère gastrique nécessitant un contrôle endoscopique de cicatrisation. Vérification systématique de l'éradication après traitement par test respiratoire à l'urée marquée.",
    situations_complexes: "Ulcère sous AINS au long cours (sans Helicobacter pylori associé) : arrêt de l'AINS si possible, ou protection gastrique systématique par IPP si l'AINS reste indispensable, mécanisme distinct de l'ulcère lié à Helicobacter pylori nécessitant une approche préventive différente (protection continue plutôt qu'éradication ponctuelle).\n\nUlcère gastrique avec contrôle endoscopique de cicatrisation incomplète malgré traitement bien conduit : suspicion accrue de composante néoplasique sous-jacente, nouvelles biopsies systématiques et orientation vers une prise en charge oncologique spécialisée si confirmée.\n\nÉchec répété de l'éradication d'Helicobacter pylori malgré plusieurs schémas thérapeutiques successifs : orientation vers un antibiogramme spécifique sur biopsie (culture avec test de sensibilité) pour guider un traitement de rattrapage personnalisé selon le profil de résistance individuel de la souche bactérienne en cause.",
    effets_secondaires: [
      {label:"Cascade de Correa non interrompue : évolution potentielle vers un adénocarcinome gastrique sur plusieurs décennies si infection chronique non traitée", niveau:"danger"},
      {label:"Ulcère gastrique avec cicatrisation incomplète au contrôle : suspicion accrue de composante néoplasique sous-jacente à explorer", niveau:"danger"},
      {label:"Échecs répétés d'éradication : nécessitent une approche personnalisée par antibiogramme plutôt qu'une répétition empirique des schémas standards", niveau:"warning"},
    ],
    classes: [
      {classe:"Traitement de rattrapage personnalisé — échecs répétés d'éradication", dci:["Selon antibiogramme spécifique sur biopsie"], specialites:["Schéma adapté au profil de résistance individuel"], couleur:"#6B2D5E", remarque:"Approche personnalisée nécessaire après plusieurs échecs, guidée par une culture avec test de sensibilité antibiotique de la souche en cause"},
      {classe:"Protection gastrique continue — ulcère sous AINS au long cours sans Helicobacter pylori", dci:["IPP en association continue avec l'AINS"], specialites:["Mopral®","Inexium®"], couleur:"#1E3A5F", remarque:"Approche préventive continue distincte de l'éradication ponctuelle, nécessaire tant que l'AINS reste indispensable"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse spécifique supplémentaire notable pour cette section au-delà de celles déjà mentionnées",
    ],
    points_cles: [
      "Helicobacter pylori : cancérigène de groupe 1 selon l'OMS, justifiant l'éradication au-delà du seul traitement de l'ulcère actif",
      "Cascade de Correa : séquence progressive vers l'adénocarcinome gastrique, éradication précoce essentielle pour l'interrompre",
      "Atrophie et métaplasie intestinale : partiellement irréversibles même après éradication réussie à un stade avancé",
      "Ulcère gastrique avec cicatrisation incomplète : suspicion accrue de néoplasie sous-jacente, nouvelles biopsies indispensables",
      "Échecs répétés d'éradication : nécessitent une approche personnalisée par antibiogramme plutôt qu'une répétition empirique",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F55 — ÉPILEPSIE
   ════════════════════════════════════════════════════════ */
FN['epilepsie'] = {
  n2: {
    saviez_vous: "Une seule crise convulsive isolée ne suffit pas à poser le diagnostic d'épilepsie — celui-ci nécessite soit au moins 2 crises non provoquées espacées de plus de 24h, soit une crise unique associée à un risque de récidive élevé (anomalie structurelle ou électroencéphalographique spécifique) selon les critères actualisés de la Ligue Internationale Contre l'Épilepsie, distinction essentielle évitant un diagnostic et un traitement prématurés après un épisode convulsif isolé.",
    physiopatho: "L'épilepsie résulte d'une décharge neuronale excessive et synchrone, liée à un déséquilibre entre l'excitation neuronale (notamment médiée par le glutamate) et l'inhibition (médiée par le GABA) → selon la zone cérébrale impliquée et l'étendue de la propagation de cette décharge anormale, les crises peuvent être focales (limitées à une zone cérébrale spécifique, avec des manifestations cliniques correspondant à la fonction de cette zone) ou généralisées (impliquant d'emblée les deux hémisphères cérébraux, avec perte de conscience caractéristique dans la plupart des formes).",
    mecanisme: "Antiépileptiques de référence (valproate, lamotrigine, lévétiracétam selon le type de crise) : mécanismes d'action variés selon la molécule (blocage des canaux sodiques voltage-dépendants, potentialisation du GABA, modulation de canaux calciques ou de protéines synaptiques spécifiques selon la molécule) convergeant vers une réduction de l'excitabilité neuronale excessive → prévention de la récidive des crises plutôt que traitement curatif de la cause sous-jacente lorsque celle-ci est identifiable.",
    diagnostic: "Électroencéphalogramme (EEG) : examen de référence recherchant des anomalies paroxystiques (pointes, pointes-ondes) caractéristiques, bien qu'un EEG normal entre les crises n'élimine pas formellement le diagnostic (sensibilité imparfaite de l'examen standard réalisé en dehors d'une crise). IRM cérébrale : recherche d'une cause structurelle sous-jacente (malformation, séquelle, tumeur), particulièrement importante pour les épilepsies focales d'apparition récente ou résistantes au traitement initial.",
    effets_secondaires: [
      {label:"Valproate : tératogénicité majeure — CI quasi absolue chez la femme en âge de procréer en raison du risque malformatif et neurodéveloppemental", niveau:"danger"},
      {label:"État de mal épileptique (crise prolongée > 5 minutes ou crises répétées sans récupération de conscience) : urgence vitale absolue", niveau:"danger"},
      {label:"Arrêt brutal d'un traitement antiépileptique : risque de rebond de crises, parfois plus sévères qu'initialement", niveau:"danger"},
    ],
    classes: [
      {classe:"Lévétiracétam — large spectre, profil de tolérance favorable", dci:["Lévétiracétam 500-1500mg × 2/j"], specialites:["Keppra®"], couleur:"#1B6B52", remarque:"Large spectre d'action sur de nombreux types de crises, peu d'interactions médicamenteuses, profil de tolérance globalement favorable"},
      {classe:"Lamotrigine — alternative, notamment chez la femme en âge de procréer", dci:["Lamotrigine, titration progressive lente"], specialites:["Lamictal®"], couleur:"#1E3A5F", remarque:"Titration très progressive indispensable (risque de syndrome de Stevens-Johnson si introduction trop rapide), profil de sécurité plus favorable en grossesse que le valproate"},
      {classe:"Valproate — efficace mais tératogène, à éviter chez la femme en âge de procréer", dci:["Valproate de sodium selon prescription"], specialites:["Dépakine®"], couleur:"#C0392B", remarque:"Très efficace sur de nombreux types de crises mais CI quasi absolue chez la femme en âge de procréer en raison de la tératogénicité majeure"},
    ],
    interactions: [
      "Valproate + lamotrigine : ↑ concentration de la lamotrigine (inhibition de sa métabolisation) — ajustement de dose nécessaire si association",
      "Antiépileptiques inducteurs enzymatiques (carbamazépine, phénytoïne) + contraceptifs oraux : ↓ efficacité contraceptive — alternative contraceptive à discuter",
    ],
    points_cles: [
      "Diagnostic d'épilepsie : nécessite au moins 2 crises non provoquées, ou 1 crise avec risque de récidive élevé documenté",
      "Valproate : CI quasi absolue chez la femme en âge de procréer en raison de la tératogénicité majeure démontrée",
      "État de mal épileptique : urgence vitale absolue, crise prolongée ou crises répétées sans récupération de conscience",
      "Lévétiracétam : large spectre et peu d'interactions, souvent privilégié en 1ère intention pour ces raisons pratiques",
      "Jamais d'arrêt brutal d'un traitement antiépileptique : risque de rebond de crises, décroissance toujours progressive si arrêt envisagé",
    ],
  },
  n3: {
    saviez_vous: "Les crises focales avec altération de la conscience (anciennement appelées crises partielles complexes) peuvent se manifester par des comportements automatiques complexes (mâchonnements, déambulation, gestes répétitifs) sans réelle perte de connaissance au sens strict, mais avec une altération de la conscience et une amnésie de l'épisode — ce tableau, parfois confondu avec un trouble psychiatrique ou comportemental par méconnaissance, nécessite une analyse sémiologique précise pour orienter vers le diagnostic épileptique correct.",
    physiopatho: "Épilepsie temporale et son substrat anatomique fréquent : la sclérose hippocampique (atrophie et gliose du hippocampe, souvent secondaire à des crises fébriles complexes prolongées dans la petite enfance) constitue la cause la plus fréquente d'épilepsie temporale pharmacorésistante de l'adulte — ce lien entre un événement initial dans l'enfance (souvent oublié ou minimisé) et l'épilepsie de l'adulte illustre l'importance d'un interrogatoire rétrospectif minutieux recherchant des antécédents de convulsions fébriles complexes, particulièrement en cas d'épilepsie focale résistante au traitement médicamenteux standard.",
    pharmacocinetique: "Lamotrigine : métabolisme hépatique principalement par glucuronoconjugaison (UGT), sans passage significatif par le cytochrome P450, ce qui limite certaines interactions médicamenteuses par rapport à d'autres antiépileptiques plus anciens, mais nécessite une titration particulièrement progressive et lente (sur plusieurs semaines) en raison du risque de réactions cutanées sévères (syndrome de Stevens-Johnson, syndrome de Lyell) significativement accru en cas d'augmentation de dose trop rapide.",
    cas_clinique: "Patient 28 ans, épisodes répétés depuis 6 mois d'arrêt brutal de l'activité avec regard fixe, mâchonnements automatiques, durée environ 1-2 minutes, amnésie complète de l'épisode rapporté par l'entourage, antécédent de convulsions fébriles prolongées à l'âge de 2 ans. Que suspectez-vous ?\n\nRaisonnement : tableau évocateur de crises focales avec altération de la conscience d'origine temporale (automatismes oro-alimentaires caractéristiques, amnésie de l'épisode), antécédent de convulsions fébriles complexes dans l'enfance orientant fortement vers une possible sclérose hippocampique sous-jacente → orientation vers un bilan spécialisé (EEG, IRM cérébrale à la recherche de cette sclérose hippocampique), discussion d'un traitement antiépileptique adapté à ce type de crise focale, en gardant à l'esprit le risque de pharmacorésistance plus élevé dans ce contexte étiologique spécifique pouvant justifier, en cas d'échec médicamenteux, une discussion chirurgicale spécialisée.",
    effets_secondaires: [
      {label:"Crises focales avec altération de la conscience méconnues : confusion possible avec un trouble psychiatrique ou comportemental", niveau:"warning"},
      {label:"Lamotrigine : risque de syndrome de Stevens-Johnson si titration trop rapide, vigilance cutanée systématique en début de traitement", niveau:"danger"},
      {label:"Épilepsie temporale sur sclérose hippocampique : risque de pharmacorésistance plus élevé qu'd'autres formes d'épilepsie focale", niveau:"warning"},
    ],
    classes: [
      {classe:"Antiépileptiques ciblés crises focales", dci:["Lamotrigine, lévétiracétam, ou carbamazépine selon le profil"], specialites:["Lamictal®","Keppra®","Tégrétol®"], couleur:"#1B6B52", remarque:"Choix selon le profil du patient et la tolérance, titration progressive systématique pour la lamotrigine et la carbamazépine"},
    ],
    interactions: [
      "Lamotrigine + valproate : ↑ significative de la concentration de lamotrigine, ajustement posologique impératif si association",
      "Carbamazépine (inducteur enzymatique) + nombreux médicaments : interactions multiples à vérifier systématiquement avant association",
    ],
    points_cles: [
      "Crises focales avec altération de la conscience : automatismes complexes, amnésie de l'épisode, parfois confondues avec un trouble psychiatrique",
      "Sclérose hippocampique : cause fréquente d'épilepsie temporale pharmacorésistante, souvent liée à des convulsions fébriles complexes anciennes",
      "Lamotrigine : titration très progressive indispensable, risque de réactions cutanées sévères si augmentation de dose trop rapide",
      "Interrogatoire rétrospectif minutieux : essentiel pour rechercher des antécédents de convulsions fébriles complexes dans l'enfance",
      "Pharmacorésistance : à évoquer en cas d'échec de plusieurs antiépileptiques bien conduits, orientation chirurgicale spécialisée possible",
    ],
  },
  n4: {
    saviez_vous: "La chirurgie de l'épilepsie, option thérapeutique pour les épilepsies focales pharmacorésistantes bien sélectionnées (notamment la chirurgie de l'épilepsie temporale sur sclérose hippocampique), permet d'obtenir une guérison ou une réduction majeure des crises dans une proportion significative de patients soigneusement évalués — cette option, encore insuffisamment proposée en pratique selon certaines données, devrait être systématiquement discutée après l'échec de 2 antiépileptiques bien conduits, conformément à la définition de la pharmacorésistance.",
    physiopatho: "État de mal épileptique : urgence neurologique absolue définie par une crise prolongée au-delà de 5 minutes ou des crises répétées sans récupération complète de la conscience entre elles → au-delà de ce délai, le risque de lésion neuronale excitotoxique (liée à l'activité électrique excessive et prolongée) augmente significativement, et la réponse aux traitements antiépileptiques de 1ère ligne diminue progressivement avec la durée de l'état de mal non contrôlé, justifiant une escalade thérapeutique rapide et protocolisée (benzodiazépine puis antiépileptique IV de 2e ligne puis anesthésie générale si réfractaire) plutôt qu'une attente prolongée entre chaque étape.",
    recommandations: "Ligue Française Contre l'Épilepsie / HAS — Épilepsie : traitement antiépileptique adapté au type de crise et au profil du patient (notamment éviter le valproate chez la femme en âge de procréer). Discussion de la chirurgie de l'épilepsie après échec de 2 antiépileptiques bien conduits à dose adéquate (définition de la pharmacorésistance). Protocole d'urgence standardisé pour l'état de mal épileptique. Programme de prévention de grossesse pour les antiépileptiques tératogènes chez la femme en âge de procréer.",
    situations_complexes: "Épilepsie et grossesse : nécessite une planification anticipée avec adaptation du traitement avant la conception si possible (substitution du valproate par une alternative moins tératogène), supplémentation systématique en acide folique à dose adaptée, surveillance rapprochée pendant la grossesse en raison des modifications pharmacocinétiques de plusieurs antiépileptiques liées aux changements physiologiques gravidiques.\n\nÉpilepsie et conduite automobile : réglementation spécifique nécessitant une période sans crise documentée avant l'autorisation de conduire, variable selon le type d'épilepsie et le contexte, information systématique du patient sur ces obligations réglementaires et leurs implications pratiques.\n\nÉtat de mal épileptique réfractaire aux traitements de 1ère et 2e ligne : nécessite une anesthésie générale en réanimation avec monitoring EEG continu, situation rare mais associée à une morbi-mortalité significative justifiant une prise en charge en milieu spécialisé sans délai.",
    effets_secondaires: [
      {label:"État de mal épileptique non traité rapidement : risque de lésion neuronale excitotoxique et de mortalité significative", niveau:"danger"},
      {label:"Épilepsie pharmacorésistante non orientée vers la chirurgie quand indiquée : perte d'une opportunité thérapeutique potentiellement curative", niveau:"warning"},
      {label:"Grossesse non planifiée sous antiépileptique tératogène : risque malformatif majeur si traitement non adapté en amont", niveau:"danger"},
    ],
    classes: [
      {classe:"Benzodiazépines IV — 1ère ligne de l'état de mal épileptique", dci:["Diazépam ou clonazépam IV selon protocole d'urgence"], specialites:["Valium®","Rivotril®"], couleur:"#C0392B", remarque:"Traitement de 1ère ligne de l'état de mal épileptique, escalade rapide vers un antiépileptique IV de 2e ligne si inefficace"},
      {classe:"Chirurgie de l'épilepsie — pharmacorésistance bien sélectionnée", dci:["Résection chirurgicale du foyer épileptogène selon bilan spécialisé"], specialites:["Prise en charge neurochirurgicale spécialisée"], couleur:"#6B2D5E", remarque:"Option à discuter systématiquement après échec de 2 antiépileptiques bien conduits, particulièrement efficace pour l'épilepsie temporale sur sclérose hippocampique"},
    ],
    interactions: [
      "Benzodiazépines IV + autres dépresseurs du SNC : risque de dépression respiratoire cumulée, surveillance rapprochée en milieu hospitalier",
    ],
    points_cles: [
      "Pharmacorésistance : définie après échec de 2 antiépileptiques bien conduits, doit faire discuter systématiquement la chirurgie",
      "État de mal épileptique : urgence neurologique absolue, escalade thérapeutique rapide et protocolisée indispensable",
      "Chirurgie de l'épilepsie temporale sur sclérose hippocampique : option potentiellement curative encore insuffisamment proposée en pratique",
      "Grossesse et épilepsie : planification anticipée essentielle, adaptation du traitement avant la conception si possible",
      "Réglementation de la conduite automobile : période sans crise documentée nécessaire, information systématique du patient indispensable",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F56 — MALADIE DE PARKINSON
   ════════════════════════════════════════════════════════ */
FN['parkinson'] = {
  n2: {
    saviez_vous: "Au moment du diagnostic clinique de la maladie de Parkinson, environ 60-80% des neurones dopaminergiques de la substance noire ont déjà disparu — cette perte neuronale silencieuse pendant des années avant l'apparition des premiers symptômes moteurs explique pourquoi la recherche de biomarqueurs précoces (troubles olfactifs, troubles du sommeil paradoxal) suscite un intérêt croissant pour un diagnostic plus précoce, potentiellement avant l'installation de lésions neuronales aussi étendues.",
    physiopatho: "La maladie de Parkinson résulte d'une dégénérescence progressive des neurones dopaminergiques de la substance noire (structure du tronc cérébral), avec accumulation intracellulaire d'agrégats anormaux de la protéine alpha-synucléine (corps de Lewy) → la déplétion en dopamine au niveau du striatum (structure des noyaux gris centraux normalement régulée par cette voie dopaminergique) perturbe le contrôle moteur fin → triade clinique caractéristique associant tremblement de repos, rigidité (akinésie/hypertonie) et bradykinésie (lenteur des mouvements), classiquement asymétrique au début de la maladie.",
    mecanisme: "Lévodopa (précurseur de la dopamine, toujours associée à un inhibiteur de la dopa-décarboxylase périphérique comme la carbidopa ou le bensérazide) : traverse la barrière hémato-encéphalique (contrairement à la dopamine elle-même) puis est convertie en dopamine active au niveau cérébral par les neurones dopaminergiques restants → traitement le plus efficace sur les symptômes moteurs, mais associé à terme à des fluctuations motrices et des dyskinésies liées à la stimulation pulsatile non physiologique des récepteurs dopaminergiques.\n\nAgonistes dopaminergiques (pramipexole, ropinirole) : stimulation directe des récepteurs dopaminergiques post-synaptiques, sans nécessiter de conversion par les neurones dopaminergiques déficitaires, parfois privilégiés en 1ère intention chez le patient jeune pour retarder l'introduction de la lévodopa et ses complications motrices à long terme.",
    diagnostic: "Diagnostic essentiellement clinique, basé sur la triade motrice caractéristique (tremblement de repos, rigidité, bradykinésie) et la réponse positive à un traitement dopaminergique d'épreuve, qui constitue un argument diagnostique important. L'imagerie fonctionnelle (DAT-scan, scintigraphie de transporteur de la dopamine) peut être utile dans les cas atypiques ou pour différencier d'un tremblement essentiel ou d'un syndrome parkinsonien d'une autre origine.",
    effets_secondaires: [
      {label:"Lévodopa au long cours : fluctuations motrices (effet on-off) et dyskinésies, complications motrices tardives fréquentes", niveau:"warning"},
      {label:"Agonistes dopaminergiques : troubles du contrôle des impulsions (jeu pathologique, hypersexualité, achats compulsifs) — signal d'alarme à rechercher activement", niveau:"danger"},
      {label:"Arrêt brutal d'un traitement dopaminergique : syndrome malin des neuroleptiques-like, urgence potentielle", niveau:"danger"},
    ],
    classes: [
      {classe:"Lévodopa/Inhibiteur de la dopa-décarboxylase — traitement le plus efficace", dci:["Lévodopa/Carbidopa","Lévodopa/Bensérazide"], specialites:["Sinemet®","Modopar®"], couleur:"#1B6B52", remarque:"Traitement de référence sur l'efficacité motrice, complications motrices à long terme à anticiper et surveiller"},
      {classe:"Agonistes dopaminergiques — alternative, notamment patient jeune", dci:["Pramipexole","Ropinirole"], specialites:["Sifrol®","Requip®"], couleur:"#1E3A5F", remarque:"Surveillance systématique des troubles du contrôle des impulsions, effet indésirable spécifique à rechercher activement"},
    ],
    interactions: [
      "Lévodopa + neuroleptiques classiques (antagonistes dopaminergiques) : antagonisme pharmacologique direct — CI ou grande prudence",
      "Lévodopa + protéines alimentaires : compétition d'absorption intestinale — espacer la prise des repas riches en protéines pour optimiser l'efficacité",
    ],
    points_cles: [
      "60-80% des neurones dopaminergiques déjà détruits au moment du diagnostic clinique : explique l'intérêt des biomarqueurs précoces",
      "Triade motrice caractéristique : tremblement de repos, rigidité, bradykinésie, classiquement asymétrique au début",
      "Lévodopa : traitement le plus efficace mais complications motrices à long terme (fluctuations, dyskinésies) à anticiper",
      "Troubles du contrôle des impulsions sous agonistes dopaminergiques : effet indésirable spécifique à rechercher systématiquement",
      "Jamais d'arrêt brutal d'un traitement dopaminergique : risque de syndrome potentiellement grave",
    ],
  },
  n3: {
    saviez_vous: "Les symptômes non moteurs de la maladie de Parkinson (troubles du sommeil, constipation, troubles olfactifs, dépression, troubles cognitifs) précèdent souvent les symptômes moteurs de plusieurs années, voire de plus d'une décennie pour certains d'entre eux — cette phase prodromique, de mieux en mieux caractérisée, ouvre des perspectives pour un diagnostic plus précoce et potentiellement, à l'avenir, pour des stratégies de neuroprotection avant l'installation des lésions motrices.",
    physiopatho: "Hypothèse de Braak et propagation de la pathologie synucléinopathique : selon ce modèle, les agrégats pathologiques d'alpha-synucléine débuteraient dans des structures périphériques ou des noyaux du tronc cérébral inférieur (notamment le bulbe olfactif et le système nerveux entérique intestinal) avant de progresser de façon ascendante et stéréotypée vers la substance noire puis le cortex cérébral → cette hypothèse, bien que débattue et non universellement validée pour tous les patients, expliquerait l'apparition précoce de symptômes non moteurs (troubles olfactifs, constipation) avant même l'atteinte de la substance noire responsable des symptômes moteurs caractéristiques.",
    pharmacocinetique: "Lévodopa : absorption intestinale par un transporteur d'acides aminés neutres saturable, partagé avec les acides aminés alimentaires (protéines), expliquant la compétition d'absorption avec les repas protéinés → T½ courte (1-2h) nécessitant des prises répétées et expliquant en partie les fluctuations motrices qui apparaissent avec la progression de la maladie (stimulation dopaminergique de moins en moins continue à mesure que les neurones dopaminergiques restants, capables de stocker et libérer la dopamine de façon tamponnée, diminuent en nombre).",
    cas_clinique: "Patient 68 ans, diagnostic de maladie de Parkinson il y a 8 ans, sous lévodopa, présente désormais des fluctuations motrices marquées avec des périodes 'off' (blocage moteur) survenant avant chaque prise médicamenteuse et des dyskinésies en période 'on' (pic d'effet). Quelle est votre démarche ?\n\nRaisonnement : complications motrices tardives typiques de la lévodopathérapie prolongée (fluctuations on-off, dyskinésies de pic de dose) → discussion avec le neurologue de stratégies d'optimisation (fractionnement des prises pour lisser l'effet, ajout d'un agoniste dopaminergique ou d'un inhibiteur de la COMT/MAO-B pour prolonger l'effet de chaque prise de lévodopa, voire discussion de thérapies plus avancées comme la stimulation cérébrale profonde ou les pompes à lévodopa/apomorphine en cas de fluctuations très invalidantes malgré l'optimisation médicamenteuse orale).",
    effets_secondaires: [
      {label:"Fluctuations motrices (on-off) : complication fréquente après plusieurs années de lévodopathérapie, impact majeur sur la qualité de vie", niveau:"warning"},
      {label:"Dyskinésies de pic de dose : mouvements involontaires souvent perçus comme moins gênants par le patient que le blocage moteur, mais socialement visibles", niveau:"warning"},
      {label:"Troubles non moteurs sous-estimés (constipation, troubles du sommeil) : impact significatif sur la qualité de vie souvent négligé au profit du seul contrôle moteur", niveau:"warning"},
    ],
    classes: [
      {classe:"Inhibiteurs de la COMT — prolongation de l'effet de la lévodopa", dci:["Entacapone en association à chaque prise de lévodopa"], specialites:["Comtan®"], couleur:"#1B6B52", remarque:"Prolonge la durée d'action de chaque prise de lévodopa en bloquant sa dégradation périphérique, utile en cas de fluctuations motrices"},
      {classe:"Stimulation cérébrale profonde — fluctuations sévères réfractaires", dci:["Neurostimulation des noyaux sous-thalamiques, technique chirurgicale"], specialites:["Prise en charge neurochirurgicale spécialisée"], couleur:"#6B2D5E", remarque:"Option pour les patients bien sélectionnés avec fluctuations motrices sévères malgré une optimisation médicamenteuse orale maximale"},
    ],
    interactions: [
      "Entacapone + lévodopa : interaction recherchée (prolongation de l'effet), coloration des urines possible (orangée), sans gravité",
    ],
    points_cles: [
      "Symptômes non moteurs : précèdent souvent les symptômes moteurs de plusieurs années, intérêt croissant pour le diagnostic précoce",
      "Hypothèse de Braak : propagation ascendante stéréotypée de la pathologie, du tronc cérébral inférieur vers le cortex",
      "Fluctuations motrices et dyskinésies : complications tardives fréquentes de la lévodopathérapie prolongée",
      "Inhibiteurs de la COMT/MAO-B : stratégies d'optimisation pour prolonger l'effet de chaque prise de lévodopa",
      "Stimulation cérébrale profonde : option pour les fluctuations sévères réfractaires chez les patients bien sélectionnés",
    ],
  },
  n4: {
    saviez_vous: "Les syndromes parkinsoniens atypiques (atrophie multisystématisée, paralysie supranucléaire progressive, dégénérescence cortico-basale) partagent certaines caractéristiques cliniques avec la maladie de Parkinson idiopathique mais s'en distinguent par une évolution plus rapide, une moins bonne réponse à la lévodopa, et des signes cliniques additionnels spécifiques — leur identification précoce est importante car le pronostic et certaines stratégies thérapeutiques diffèrent significativement de la maladie de Parkinson classique.",
    physiopatho: "Mécanismes de la démence associée à la maladie de Parkinson évoluée : au-delà de l'atteinte dopaminergique de la substance noire, la progression de la pathologie synucléinopathique vers des structures corticales plus étendues (selon l'hypothèse de Braak) contribue à l'apparition de troubles cognitifs pouvant évoluer vers une authentique démence chez une proportion significative de patients après plusieurs années d'évolution, entité à distinguer de la démence à corps de Lewy (où les troubles cognitifs et les hallucinations précèdent ou apparaissent simultanément aux symptômes moteurs, contrairement à la démence parkinsonienne où les symptômes moteurs précèdent significativement les troubles cognitifs).",
    recommandations: "HAS / Société Française de Neurologie — Maladie de Parkinson : lévodopa ou agonistes dopaminergiques selon l'âge et le profil du patient en 1ère intention. Surveillance systématique des complications motrices (fluctuations, dyskinésies) et non motrices (troubles du contrôle des impulsions, troubles cognitifs, troubles du sommeil). Stratégies d'optimisation médicamenteuse (inhibiteurs de la COMT/MAO-B, fractionnement) en cas de fluctuations. Options chirurgicales (stimulation cérébrale profonde) à discuter pour les formes avec fluctuations sévères réfractaires chez les patients bien sélectionnés.",
    situations_complexes: "Maladie de Parkinson et troubles psychiatriques associés : la dépression est très fréquente (parfois symptôme prodromique précédant les signes moteurs), les hallucinations peuvent survenir notamment sous traitement dopaminergique à dose élevée ou en cas d'évolution vers une démence associée, nécessitant un équilibre délicat entre contrôle moteur et gestion de ces symptômes psychiatriques associés.\n\nChirurgie chez le patient parkinsonien : risque accru de complications périopératoires (notamment confusion postopératoire), nécessité d'une gestion rigoureuse du traitement dopaminergique en période périopératoire (éviter les interruptions prolongées qui peuvent précipiter un syndrome malin des neuroleptiques-like), coordination anesthésie-neurologie recommandée pour les interventions chirurgicales programmées.\n\nSyndromes parkinsoniens atypiques : évolution plus rapide et pronostic généralement moins favorable que la maladie de Parkinson idiopathique, réponse à la lévodopa souvent décevante ou transitoire, signes cliniques additionnels (troubles oculomoteurs dans la paralysie supranucléaire progressive, dysautonomie sévère précoce dans l'atrophie multisystématisée) orientant vers ces diagnostics différentiels.",
    effets_secondaires: [
      {label:"Démence parkinsonienne évoluée : impact majeur sur l'autonomie, nécessite une adaptation globale de la prise en charge", niveau:"danger"},
      {label:"Syndromes parkinsoniens atypiques méconnus : pronostic moins favorable, stratégies thérapeutiques à adapter en conséquence", niveau:"warning"},
      {label:"Interruption périopératoire prolongée du traitement dopaminergique : risque de syndrome malin des neuroleptiques-like", niveau:"danger"},
    ],
    classes: [
      {classe:"Antipsychotiques atypiques spécifiques — hallucinations parkinsoniennes", dci:["Quétiapine ou clozapine à faible dose selon prescription spécialisée"], specialites:["Xeroquel®","Leponex®"], couleur:"#B45309", remarque:"Choix restreint d'antipsychotiques compatibles (les antipsychotiques classiques aggravant le syndrome parkinsonien par antagonisme dopaminergique), prescription spécialisée nécessaire"},
      {classe:"Inhibiteurs de la cholinestérase — démence parkinsonienne associée", dci:["Rivastigmine selon prescription"], specialites:["Exelon®"], couleur:"#1E3A5F", remarque:"AMM spécifique pour la démence associée à la maladie de Parkinson, bénéfice modeste mais démontré sur les fonctions cognitives"},
    ],
    interactions: [
      "Antipsychotiques classiques + maladie de Parkinson : CI relative ou grande prudence en raison de l'aggravation du syndrome parkinsonien par antagonisme dopaminergique",
      "Inhibiteurs de la cholinestérase + anticholinergiques (parfois utilisés pour le tremblement) : antagonisme pharmacologique à éviter",
    ],
    points_cles: [
      "Syndromes parkinsoniens atypiques : évolution plus rapide, moins bonne réponse à la lévodopa, signes additionnels spécifiques à rechercher",
      "Démence parkinsonienne : à distinguer de la démence à corps de Lewy par la chronologie d'apparition des symptômes moteurs et cognitifs",
      "Gestion périopératoire rigoureuse du traitement dopaminergique : essentielle pour éviter les complications, notamment confusion et syndrome malin",
      "Antipsychotiques classiques : à éviter formellement chez le patient parkinsonien, aggravation du syndrome moteur par antagonisme dopaminergique",
      "Dépression : très fréquente dans la maladie de Parkinson, parfois symptôme prodromique précédant les signes moteurs eux-mêmes",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F57 — MALADIE D'ALZHEIMER
   ════════════════════════════════════════════════════════ */
FN['alzheimer'] = {
  n2: {
    saviez_vous: "Les anticholinestérasiques (donépézil, rivastigmine, galantamine), traitements historiques de la maladie d'Alzheimer, n'ont jamais démontré de capacité à ralentir la progression de la maladie elle-même — leur effet, modeste et purement symptomatique, vise uniquement à compenser transitoirement le déficit cholinergique, sans modifier l'évolution naturelle de la dégénérescence neuronale sous-jacente, distinction importante à expliquer aux familles pour calibrer les attentes vis-à-vis du traitement.",
    physiopatho: "La maladie d'Alzheimer se caractérise par deux lésions histologiques cardinales : les plaques amyloïdes (agrégats extracellulaires de peptide bêta-amyloïde, issu d'un clivage anormal de la protéine précurseur de l'amyloïde) et les dégénérescences neurofibrillaires (agrégats intracellulaires de protéine Tau hyperphosphorylée, normalement impliquée dans la stabilisation des microtubules neuronaux) → ces lésions s'accumulent progressivement, débutant typiquement dans l'hippocampe (structure clé de la mémoire) avant de s'étendre à d'autres régions corticales → mort neuronale progressive et déficit notamment du système cholinergique, expliquant la prédominance initiale des troubles mnésiques dans le tableau clinique.",
    mecanisme: "Anticholinestérasiques (donépézil, rivastigmine, galantamine) : inhibition de l'acétylcholinestérase, enzyme dégradant l'acétylcholine dans la fente synaptique → augmentation de la disponibilité du neurotransmetteur restant dans les synapses cholinergiques partiellement préservées → amélioration symptomatique modeste mais cliniquement perceptible de certaines fonctions cognitives, sans effet sur la progression de la maladie sous-jacente.\n\nMémantine (stades modérés à sévères) : antagoniste non compétitif des récepteurs NMDA au glutamate → réduction de l'excitotoxicité glutamatergique chronique (l'excès de glutamate étant délétère pour les neurones déjà fragilisés), mécanisme distinct des anticholinestérasiques, parfois utilisé en association dans les stades plus avancés.",
    diagnostic: "Diagnostic basé sur une évaluation cognitive structurée (MMSE — Mini Mental State Examination, et tests neuropsychologiques plus approfondis), associée à une imagerie cérébrale (IRM) recherchant une atrophie hippocampique caractéristique et éliminant d'autres causes de troubles cognitifs (cause vasculaire, tumorale). Les biomarqueurs spécifiques (dosage du peptide bêta-amyloïde et de la protéine Tau dans le liquide céphalo-rachidien, ou imagerie TEP amyloïde) permettent désormais, dans certains contextes spécialisés, une confirmation diagnostique plus précoce et plus précise.",
    effets_secondaires: [
      {label:"Anticholinestérasiques : troubles digestifs (nausées, diarrhée), bradycardie possible — surveillance cardiaque recommandée", niveau:"warning"},
      {label:"Mémantine : généralement bien tolérée, vertiges possibles en début de traitement", niveau:"info"},
      {label:"Diagnostic tardif de la maladie : retarde la mise en place d'un accompagnement et d'une planification adaptée pour le patient et son entourage", niveau:"warning"},
    ],
    classes: [
      {classe:"Anticholinestérasiques — stades légers à modérés", dci:["Donépézil 5-10mg/j","Rivastigmine 4,6-13,3mg/24h (patch)","Galantamine 8-24mg/j"], specialites:["Aricept®","Exelon®","Reminyl®"], couleur:"#1B6B52", remarque:"Effet symptomatique modeste, sans effet sur la progression de la maladie, surveillance cardiaque (bradycardie) recommandée"},
      {classe:"Mémantine — stades modérés à sévères", dci:["Mémantine 20mg/j, titration progressive"], specialites:["Ebixa®"], couleur:"#1E3A5F", remarque:"Mécanisme distinct des anticholinestérasiques, parfois utilisée en association dans les stades plus avancés"},
    ],
    interactions: [
      "Anticholinestérasiques + bêta-bloquants ou autres bradycardisants : risque cumulé de bradycardie significative — surveillance accrue",
      "Anticholinestérasiques + anticholinergiques (souvent utilisés pour d'autres indications chez le sujet âgé) : antagonisme pharmacologique direct à éviter",
    ],
    points_cles: [
      "Anticholinestérasiques : effet purement symptomatique et modeste, sans ralentissement démontré de la progression de la maladie",
      "Plaques amyloïdes et dégénérescences neurofibrillaires (Tau) : deux lésions histologiques cardinales de la maladie d'Alzheimer",
      "Atteinte hippocampique précoce : explique la prédominance initiale des troubles mnésiques dans le tableau clinique",
      "Surveillance cardiaque (bradycardie) recommandée sous anticholinestérasiques, particulièrement chez le sujet âgé polypathologique",
      "Mémantine : mécanisme distinct (antagoniste NMDA), utilisée pour les stades modérés à sévères, parfois en association",
    ],
  },
  n3: {
    saviez_vous: "Les anticorps monoclonaux anti-amyloïdes de nouvelle génération (lécanémab, donanémab), bien qu'ayant démontré pour la première fois un ralentissement modeste mais statistiquement significatif du déclin cognitif dans les essais cliniques, soulèvent des questions importantes sur leur rapport bénéfice-risque en pratique clinique réelle, en raison notamment du risque d'œdème ou d'hémorragie cérébrale associé (ARIA — Amyloid-Related Imaging Abnormalities) nécessitant une surveillance IRM rapprochée pendant le traitement.",
    physiopatho: "Continuum physiopathologique et phase prodromique de la maladie d'Alzheimer : les lésions amyloïdes et tau commenceraient à s'accumuler 15 à 20 ans avant l'apparition des premiers symptômes cliniques détectables (phase préclinique), suivie d'une phase de trouble cognitif léger (MCI — Mild Cognitive Impairment) où des déficits cognitifs mesurables sont présents sans retentissement significatif sur l'autonomie, avant l'évolution vers la démence avérée avec impact fonctionnel — cette compréhension du continuum a des implications majeures pour le développement de traitements visant à intervenir le plus précocement possible, avant l'installation de lésions neuronales irréversibles trop étendues.",
    pharmacocinetique: "Donépézil : longue demi-vie (environ 70h) permettant une administration en une seule prise quotidienne, métabolisme hépatique par les CYP2D6 et CYP3A4 → sources d'interactions potentielles avec les inhibiteurs ou inducteurs de ces cytochromes, profil pharmacocinétique distinct de la rivastigmine (T½ courte mais inhibition enzymatique prolongée par liaison covalente, expliquant la possibilité d'administration en patch transdermique pour une libération continue).",
    cas_clinique: "Patiente 72 ans, troubles de mémoire progressifs depuis 18 mois, MMSE = 24/30, autonomie globalement préservée pour les activités de la vie quotidienne, bilan d'imagerie montrant une atrophie hippocampique modérée. Quelle est votre démarche thérapeutique ?\n\nRaisonnement : tableau évocateur d'un trouble cognitif léger à très léger d'origine probablement Alzheimer (atrophie hippocampique compatible), autonomie encore préservée → discussion avec le neurologue de l'indication d'un traitement anticholinestérasique pour un effet symptomatique modeste, mais surtout mise en place d'un accompagnement global précoce (information de la patiente et de la famille, anticipation des aspects sociaux et juridiques, stimulation cognitive) — à ce stade précoce, discuter également de l'éligibilité éventuelle à un traitement anti-amyloïde de nouvelle génération si accessible et pertinent selon le profil de la patiente, après évaluation rigoureuse du rapport bénéfice-risque.",
    effets_secondaires: [
      {label:"Anticorps anti-amyloïdes : risque d'ARIA (œdème ou hémorragie cérébrale), surveillance IRM rapprochée indispensable pendant le traitement", niveau:"danger"},
      {label:"Trouble cognitif léger non accompagné précocement : retarde l'anticipation des aspects sociaux et juridiques importants pour la suite", niveau:"warning"},
    ],
    classes: [
      {classe:"Anticorps monoclonaux anti-amyloïdes — stades précoces sélectionnés", dci:["Lécanémab, donanémab selon disponibilité et éligibilité"], specialites:["Selon autorisation et disponibilité locale"], couleur:"#6B2D5E", remarque:"Première classe ayant démontré un ralentissement modeste du déclin cognitif, surveillance IRM rapprochée indispensable (risque d'ARIA)"},
    ],
    interactions: [
      "Donépézil + inhibiteurs/inducteurs du CYP2D6/3A4 : sources d'interactions potentielles à vérifier selon les traitements concomitants",
      "Anticorps anti-amyloïdes + anticoagulants : prudence accrue en raison du risque hémorragique cérébral associé (ARIA)",
    ],
    points_cles: [
      "Continuum physiopathologique : accumulation des lésions 15-20 ans avant les premiers symptômes cliniques détectables",
      "Trouble cognitif léger (MCI) : phase intermédiaire avec déficits mesurables sans retentissement significatif sur l'autonomie",
      "Anticorps anti-amyloïdes de nouvelle génération : premier ralentissement modeste mais démontré du déclin cognitif",
      "ARIA (œdème ou hémorragie cérébrale) : risque spécifique des anticorps anti-amyloïdes, surveillance IRM rapprochée indispensable",
      "Accompagnement global précoce : essentiel dès le diagnostic, au-delà du seul traitement médicamenteux symptomatique",
    ],
  },
  n4: {
    saviez_vous: "La présence de l'allèle APOE ε4 constitue le facteur de risque génétique le plus important de la maladie d'Alzheimer sporadique (forme la plus fréquente, non héréditaire au sens strict), multipliant le risque par 3 à 4 chez les hétérozygotes et jusqu'à 10-15 fois chez les homozygotes — contrairement aux formes héréditaires rares à transmission autosomique dominante (mutations PSEN1, PSEN2, APP) responsables de formes précoces et systématiquement transmises, cet allèle n'est qu'un facteur de susceptibilité, ne garantissant ni ne déterminant à lui seul le développement de la maladie.",
    physiopatho: "Comorbidités cognitives et démence mixte : chez de nombreux patients âgés, la pathologie Alzheimer pure coexiste avec une composante vasculaire cérébrale (lésions ischémiques, leucoaraïose) ou avec d'autres pathologies neurodégénératives associées (corps de Lewy notamment) → cette fréquente coexistence (démence mixte) complexifie le diagnostic différentiel précis et explique pourquoi la présentation clinique et l'évolution peuvent varier significativement d'un patient à l'autre malgré un diagnostic principal commun de maladie d'Alzheimer, nécessitant une prise en charge globale tenant compte de l'ensemble des facteurs contributifs identifiés.",
    recommandations: "HAS / Plan national maladies neurodégénératives — Maladie d'Alzheimer : diagnostic précoce recommandé pour permettre une planification et un accompagnement adaptés. Anticholinestérasiques ou mémantine selon le stade, avec information claire sur le caractère symptomatique et modeste de ces traitements. Approche non médicamenteuse systématiquement associée (stimulation cognitive, activité physique, prise en charge des troubles du comportement). Accompagnement structuré du patient et de l'aidant, anticipation des aspects sociaux, juridiques et éthiques (protection juridique, directives anticipées).",
    situations_complexes: "Troubles du comportement associés (agitation, agressivité, troubles du sommeil) aux stades modérés à sévères : approche non médicamenteuse à privilégier en 1ère intention (environnement adapté, routine structurée), traitement médicamenteux symptomatique (antipsychotiques à très faible dose) réservé aux situations sévères et réfractaires en raison du risque accru d'effets indésirables graves chez cette population (notamment risque cardiovasculaire et de mortalité accrue documenté sous antipsychotiques chez le sujet âgé dément).\n\nÉpuisement de l'aidant familial : reconnu comme un enjeu de santé publique majeur, nécessitant un repérage actif et une orientation vers des dispositifs de soutien spécifiques (accueil de jour, séjours de répit, associations de soutien aux aidants), l'épuisement de l'aidant pouvant lui-même devenir un facteur d'aggravation de la prise en charge globale du patient.\n\nFormes précoces héréditaires (mutations PSEN1, PSEN2, APP) : transmission autosomique dominante, conseil génétique recommandé pour les familles concernées, implications spécifiques pour la descendance et la planification familiale à discuter dans ce contexte rare mais bien caractérisé.",
    effets_secondaires: [
      {label:"Antipsychotiques chez le sujet âgé dément : risque accru de mortalité et d'événements cardiovasculaires documenté, usage à limiter strictement", niveau:"danger"},
      {label:"Épuisement de l'aidant non repéré : peut compromettre la qualité de la prise en charge globale et la propre santé de l'aidant", niveau:"danger"},
      {label:"Démence mixte non reconnue comme telle : approche thérapeutique potentiellement incomplète si la composante vasculaire n'est pas prise en compte", niveau:"warning"},
    ],
    classes: [
      {classe:"Antipsychotiques à très faible dose — troubles du comportement sévères réfractaires uniquement", dci:["Rispéridone à très faible dose selon prescription spécialisée"], specialites:["Risperdal®"], couleur:"#C0392B", remarque:"Usage limité strictement aux situations sévères et réfractaires, en raison du risque accru de mortalité et d'événements cardiovasculaires chez cette population"},
      {classe:"Dispositifs de soutien aux aidants — accompagnement structuré", dci:["Accueil de jour, séjours de répit, non médicamenteux"], specialites:["Structures dédiées selon disponibilité locale"], couleur:"#1B6B52", remarque:"Essentiel pour prévenir l'épuisement de l'aidant, enjeu de santé publique reconnu dans la prise en charge globale de la maladie"},
    ],
    interactions: [
      "Antipsychotiques + anticholinestérasiques : antagonisme pharmacologique partiel à prendre en compte dans l'évaluation globale du traitement",
    ],
    points_cles: [
      "Allèle APOE ε4 : facteur de risque génétique le plus important de la forme sporadique, mais simple facteur de susceptibilité, pas déterministe",
      "Formes héréditaires précoces (PSEN1, PSEN2, APP) : rares, transmission autosomique dominante, conseil génétique recommandé",
      "Démence mixte (Alzheimer + composante vasculaire) : fréquente chez le sujet âgé, complexifie le diagnostic différentiel précis",
      "Antipsychotiques chez le sujet âgé dément : risque accru de mortalité documenté, usage à limiter strictement aux situations réfractaires",
      "Épuisement de l'aidant : enjeu de santé publique majeur, repérage actif et orientation vers des dispositifs de soutien essentiels",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F58 — HBP (HYPERTROPHIE BÉNIGNE DE LA PROSTATE)
   ════════════════════════════════════════════════════════ */
FN['hbp-prostate'] = {
  n2: {
    saviez_vous: "La taille de la prostate à l'échographie ne corrèle que faiblement avec l'intensité des symptômes urinaires ressentis par le patient — certains hommes avec une prostate modérément augmentée présentent des symptômes très invalidants, tandis que d'autres avec une hypertrophie plus marquée restent peu symptomatiques, expliquant pourquoi la décision thérapeutique repose davantage sur le retentissement fonctionnel et la gêne ressentie que sur la simple mesure du volume prostatique.",
    physiopatho: "L'hypertrophie bénigne de la prostate résulte d'une prolifération progressive du tissu glandulaire et stromal de la zone transitionnelle prostatique (entourant l'urètre), sous l'influence des androgènes (notamment la dihydrotestostérone, métabolite actif de la testostérone) au fil du vieillissement → cette croissance progressive comprime mécaniquement l'urètre prostatique et peut également générer une composante dynamique (hypertonie du muscle lisse prostatique et du col vésical, riche en récepteurs alpha-adrénergiques) → obstruction sous-vésicale responsable des symptômes urinaires caractéristiques (dysurie, jet faible, pollakiurie, nycturie, sensation de vidange incomplète).",
    mecanisme: "Alpha-bloquants (tamsulosine, alfuzosine) : blocage des récepteurs alpha-1 adrénergiques du muscle lisse prostatique et du col vésical → relaxation de cette composante dynamique → amélioration rapide (quelques jours) des symptômes obstructifs, sans réduction du volume prostatique lui-même.\n\nInhibiteurs de la 5-alpha-réductase (finastéride, dutastéride) : blocage de la conversion de la testostérone en dihydrotestostérone (forme la plus active sur la prostate) → réduction progressive (sur plusieurs mois) du volume prostatique lui-même, action plus lente mais agissant sur la composante structurelle de l'hypertrophie plutôt que sur la seule composante dynamique.",
    diagnostic: "Score IPSS (International Prostate Symptom Score) : questionnaire standardisé évaluant la sévérité des symptômes urinaires et leur retentissement sur la qualité de vie, outil de référence guidant la décision thérapeutique et le suivi de l'efficacité du traitement. Toucher rectal et dosage du PSA (antigène prostatique spécifique) : éléments de l'évaluation initiale permettant notamment d'éliminer une suspicion de cancer prostatique associé, diagnostic différentiel important à ne pas méconnaître devant des symptômes urinaires du sujet âgé.",
    effets_secondaires: [
      {label:"Alpha-bloquants : hypotension orthostatique, particulièrement chez le sujet âgé ou en début de traitement", niveau:"warning"},
      {label:"Inhibiteurs de la 5-alpha-réductase : troubles de la fonction sexuelle (libido, dysfonction érectile), à anticiper et discuter avec le patient", niveau:"warning"},
      {label:"Rétention aiguë d'urine : complication possible de l'HBP non traitée ou aggravée, urgence urologique nécessitant un sondage", niveau:"danger"},
    ],
    classes: [
      {classe:"Alpha-bloquants — action rapide sur la composante dynamique", dci:["Tamsulosine 0,4mg/j","Alfuzosine 10mg/j"], specialites:["Josir®","Xatral®"], couleur:"#1B6B52", remarque:"Amélioration rapide des symptômes (quelques jours), sans effet sur le volume prostatique, prise le soir pour limiter l'hypotension"},
      {classe:"Inhibiteurs de la 5-alpha-réductase — action sur le volume prostatique", dci:["Finastéride 5mg/j","Dutastéride 0,5mg/j"], specialites:["Chibro-Proscar®","Avodart®"], couleur:"#1E3A5F", remarque:"Action plus lente (plusieurs mois), réduit le volume prostatique, modifie le dosage du PSA (à diviser par 2 environ pour l'interprétation)"},
    ],
    interactions: [
      "Alpha-bloquants + autres antihypertenseurs : risque cumulé d'hypotension — prudence et surveillance accrue si association",
      "Inhibiteurs de la 5-alpha-réductase + dosage du PSA : interprétation à corriger (PSA artificiellement diminué sous traitement)",
    ],
    points_cles: [
      "Taille de la prostate : corrélation faible avec l'intensité symptomatique, décision thérapeutique basée sur le retentissement fonctionnel",
      "Score IPSS : outil de référence standardisé pour évaluer la sévérité et guider la décision thérapeutique",
      "Alpha-bloquants : action rapide sur la composante dynamique, inhibiteurs de la 5-alpha-réductase : action lente sur le volume",
      "PSA sous inhibiteur de la 5-alpha-réductase : à corriger lors de l'interprétation (valeur artificiellement diminuée)",
      "Toucher rectal et PSA : éléments essentiels pour éliminer une suspicion de cancer prostatique associé",
    ],
  },
  n3: {
    saviez_vous: "L'association d'un alpha-bloquant et d'un inhibiteur de la 5-alpha-réductase, bien que plus coûteuse et exposant à davantage d'effets indésirables cumulés, a démontré une efficacité supérieure à chaque monothérapie pour prévenir la progression de la maladie (notamment le risque de rétention aiguë d'urine et de recours à la chirurgie) chez les patients avec une prostate de volume important — une option à discuter spécifiquement dans cette population à plus haut risque de progression plutôt qu'une généralisation systématique de la bithérapie à tous les patients.",
    physiopatho: "Vessie de lutte et conséquences de l'obstruction sous-vésicale chronique non traitée : face à l'obstruction prostatique progressive, le muscle vésical (détrusor) développe initialement une hypertrophie compensatrice pour maintenir une vidange efficace malgré la résistance accrue à l'écoulement urinaire → à terme, cette hypersollicitation chronique peut évoluer vers une décompensation vésicale (vessie de lutte devenant hypoactive, incapable de se contracter efficacement) → rétention chronique avec résidu post-mictionnel important, pouvant elle-même favoriser des infections urinaires récidivantes et, dans les formes les plus sévères et prolongées, un retentissement sur la fonction rénale par reflux et dilatation des voies urinaires hautes.",
    pharmacocinetique: "Tamsulosine : sélectivité relative pour le sous-type de récepteur alpha-1A (prédominant au niveau prostatique et vésical) par rapport aux sous-types alpha-1B (prédominant au niveau vasculaire périphérique) → cette sélectivité pharmacologique relative explique un profil de tolérance cardiovasculaire généralement plus favorable (moins d'hypotension) par rapport à des alpha-bloquants moins sélectifs, bien qu'un risque résiduel d'hypotension orthostatique persiste, particulièrement en début de traitement.",
    cas_clinique: "Patient 65 ans, HBP avec volume prostatique important (80g à l'échographie), IPSS sévère (score 22/35), sous tamsulosine depuis 6 mois avec amélioration symptomatique seulement partielle. Que proposez-vous ?\n\nRaisonnement : volume prostatique important avec réponse seulement partielle à la monothérapie alpha-bloquante → profil correspondant à la population bénéficiant le plus démontré de la bithérapie (volume prostatique important, risque de progression) → discussion de l'ajout d'un inhibiteur de la 5-alpha-réductase en association à la tamsulosine, avec information sur le délai d'action plus long de cette molécule (plusieurs mois pour un effet optimal sur le volume) et sur les effets indésirables sexuels potentiels à anticiper et discuter avec le patient avant l'introduction.",
    effets_secondaires: [
      {label:"Vessie de lutte décompensée : rétention chronique avec résidu post-mictionnel important, risque infectieux et rénal à terme", niveau:"danger"},
      {label:"Bithérapie alpha-bloquant + inhibiteur 5-alpha-réductase : cumul des effets indésirables propres à chaque classe", niveau:"warning"},
    ],
    classes: [
      {classe:"Bithérapie alpha-bloquant + inhibiteur de la 5-alpha-réductase — prostate volumineuse à risque de progression", dci:["Tamsulosine + Dutastéride, association"], specialites:["Combodart® (association fixe)"], couleur:"#B45309", remarque:"Efficacité supérieure démontrée pour prévenir la progression chez les patients à prostate volumineuse, à discuter spécifiquement dans cette population"},
    ],
    interactions: [
      "Tamsulosine + autres alpha-bloquants (notamment ceux utilisés pour l'HTA) : cumul de l'effet hypotenseur — éviter la redondance thérapeutique",
    ],
    points_cles: [
      "Bithérapie : efficacité supérieure pour prévenir la progression chez les patients à prostate volumineuse, pas une généralisation systématique",
      "Vessie de lutte : hypertrophie compensatrice initiale du détrusor, pouvant évoluer vers une décompensation à terme si obstruction non traitée",
      "Sélectivité alpha-1A de la tamsulosine : profil de tolérance cardiovasculaire généralement plus favorable que les alpha-bloquants moins sélectifs",
      "Délai d'action des inhibiteurs de la 5-alpha-réductase : plusieurs mois pour un effet optimal sur le volume prostatique",
      "Information préalable sur les effets sexuels potentiels : essentielle avant l'introduction d'un inhibiteur de la 5-alpha-réductase",
    ],
  },
  n4: {
    saviez_vous: "La résection trans-urétrale de la prostate (RTUP), longtemps considérée comme le traitement chirurgical de référence de l'HBP, est de plus en plus concurrencée par des techniques moins invasives (vaporisation laser, énucléation endoscopique) offrant une efficacité comparable avec une morbidité périopératoire réduite (notamment moins de saignement) — l'évolution des techniques chirurgicales de l'HBP illustre la recherche constante d'un meilleur compromis entre efficacité et tolérance pour cette pathologie fréquente du vieillissement masculin.",
    physiopatho: "Lien entre HBP, cancer de la prostate et dosage du PSA : bien que l'HBP et le cancer de la prostate soient deux entités distinctes (l'HBP n'étant pas un facteur de risque direct démontré de cancer prostatique), elles peuvent coexister chez un même patient et toutes deux peuvent élever le PSA, complexifiant l'interprétation de ce marqueur chez l'homme âgé symptomatique — cette ambiguïté diagnostique justifie une évaluation combinée (toucher rectal, PSA, parfois IRM prostatique multiparamétrique) plutôt qu'une interprétation isolée du seul dosage du PSA pour orienter la décision de biopsie prostatique en cas de suspicion.",
    recommandations: "Association Française d'Urologie / HAS — HBP : alpha-bloquant en 1ère intention pour le contrôle symptomatique rapide. Inhibiteur de la 5-alpha-réductase en monothérapie ou en association selon le volume prostatique et le risque de progression. Surveillance régulière (score IPSS, débitmétrie, résidu post-mictionnel) pour adapter la stratégie thérapeutique. Options chirurgicales (RTUP, techniques laser) à discuter en cas d'échec du traitement médical bien conduit ou de complications (rétention récidivante, infections urinaires à répétition, retentissement rénal).",
    situations_complexes: "Rétention aiguë d'urine sur HBP : urgence urologique nécessitant un sondage vésical en urgence pour lever l'obstacle, suivi d'une évaluation pour déterminer la nécessité d'un traitement définitif (médicamenteux optimisé ou chirurgical) afin de prévenir la récidive de cet épisode souvent très douloureux et anxiogène pour le patient.\n\nHBP et anticoagulation : la prise en charge périopératoire chirurgicale de l'HBP nécessite une gestion rigoureuse de l'anticoagulation, le risque hémorragique étant une préoccupation importante pour les techniques chirurgicales classiques (RTUP), argument supplémentaire en faveur des techniques laser moins hémorragiques chez ces patients à risque hémorragique particulier.\n\nHBP avec retentissement sur la fonction rénale (dilatation des voies urinaires hautes, insuffisance rénale obstructive) : situation plus sévère nécessitant souvent une prise en charge plus urgente et active (sondage, voire dérivation urinaire temporaire) avant d'envisager un traitement définitif de l'obstacle prostatique, pronostic rénal directement lié à la rapidité de la levée de l'obstruction.",
    effets_secondaires: [
      {label:"Rétention aiguë d'urine : urgence urologique douloureuse, nécessite un sondage en urgence pour lever l'obstacle", niveau:"danger"},
      {label:"HBP avec retentissement rénal obstructif : situation sévère nécessitant une prise en charge urgente et active", niveau:"danger"},
      {label:"Confusion HBP/cancer de la prostate dans l'interprétation du PSA : nécessite une évaluation combinée pour orienter correctement la décision de biopsie", niveau:"warning"},
    ],
    classes: [
      {classe:"Techniques laser (vaporisation, énucléation) — alternative chirurgicale à morbidité réduite", dci:["Procédure chirurgicale endoscopique selon technique"], specialites:["Prise en charge urologique spécialisée"], couleur:"#1B6B52", remarque:"Efficacité comparable à la RTUP classique avec morbidité périopératoire réduite, particulièrement intéressant chez les patients sous anticoagulants"},
      {classe:"Sondage vésical d'urgence — rétention aiguë d'urine", dci:["Sondage urétral ou sus-pubien selon le contexte"], specialites:["Geste d'urgence"], couleur:"#C0392B", remarque:"Geste d'urgence indispensable pour lever l'obstacle, suivi d'une évaluation pour déterminer la nécessité d'un traitement définitif"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse spécifique supplémentaire notable pour cette section au-delà de celles déjà mentionnées",
    ],
    points_cles: [
      "Techniques laser : efficacité comparable à la RTUP classique avec morbidité périopératoire réduite, notamment moins de saignement",
      "HBP et cancer de la prostate : entités distinctes pouvant coexister, complexifiant l'interprétation isolée du PSA chez l'homme âgé",
      "Rétention aiguë d'urine : urgence urologique nécessitant un sondage immédiat, suivie d'une évaluation pour le traitement définitif",
      "Retentissement rénal obstructif de l'HBP : situation sévère nécessitant une prise en charge urgente, pronostic lié à la rapidité de la levée d'obstacle",
      "Gestion périopératoire de l'anticoagulation : argument en faveur des techniques laser moins hémorragiques chez les patients à risque",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F59 — ENDOMÉTRIOSE
   ════════════════════════════════════════════════════════ */
FN['endometriose'] = {
  n2: {
    saviez_vous: "Le délai diagnostique moyen de l'endométriose reste préoccupant, souvent estimé entre 7 et 10 ans entre les premiers symptômes et le diagnostic confirmé — ce retard considérable s'explique en partie par une banalisation persistante des douleurs menstruelles intenses ('c'est normal d'avoir mal pendant les règles'), un message de sensibilisation important à délivrer pour encourager une consultation précoce devant des douleurs menstruelles invalidantes.",
    physiopatho: "L'endométriose se caractérise par la présence de tissu endométrial (normalement présent uniquement à l'intérieur de la cavité utérine) en dehors de cette cavité, le plus souvent au niveau pelvien (ovaires, péritoine, ligaments utéro-sacrés, parfois vessie ou intestin) → ce tissu ectopique reste sensible aux variations hormonales du cycle menstruel et saigne de façon cyclique comme l'endomètre normal, mais sans possibilité d'évacuation naturelle → inflammation locale chronique, formation d'adhérences et de kystes (endométriomes ovariens notamment) → douleur pelvienne chronique et cyclique, dysménorrhée intense, parfois infertilité associée selon l'étendue et la localisation des lésions.",
    mecanisme: "Contraception œstroprogestative en continu (sans interruption) : suppression de la cyclicité hormonale normale → réduction des saignements menstruels et donc des saignements du tissu endométrial ectopique → diminution de l'inflammation et de la douleur associées, traitement de 1ère intention largement utilisé pour le contrôle symptomatique de l'endométriose.\n\nProgestatifs seuls (diénogest notamment) : action anti-proliférative directe sur le tissu endométrial ectopique et suppression de l'activité ovarienne cyclique, AMM spécifique pour l'endométriose, alternative ou complément à la contraception œstroprogestative selon le profil de la patiente.",
    diagnostic: "Diagnostic souvent suspecté cliniquement devant une dysménorrhée intense et invalidante, parfois associée à des douleurs pelviennes chroniques, une dyspareunie (douleur lors des rapports), ou des troubles digestifs/urinaires cycliques selon la localisation des lésions. L'échographie pelvienne (notamment endovaginale) et l'IRM pelvienne permettent de visualiser certaines lésions (endométriomes notamment), mais la laparoscopie diagnostique reste l'examen de référence pour la confirmation et la classification précise de l'étendue de la maladie, bien que de moins en moins systématique au profit d'un diagnostic clinique et radiologique pour de nombreuses prises en charge initiales.",
    effets_secondaires: [
      {label:"Retard diagnostique fréquent et préoccupant : banalisation des douleurs menstruelles intenses retardant la prise en charge adaptée", niveau:"warning"},
      {label:"Endométriose non traitée évolutive : risque d'infertilité associée selon l'étendue et la localisation des lésions", niveau:"warning"},
      {label:"Endométriomes ovariens volumineux : risque de torsion ou de rupture, situation nécessitant parfois une prise en charge chirurgicale", niveau:"danger"},
    ],
    classes: [
      {classe:"Contraception œstroprogestative en continu — 1ère intention", dci:["Éthinylestradiol + progestatif, prise continue sans interruption"], specialites:["Diverses spécialités selon le progestatif associé"], couleur:"#1B6B52", remarque:"Suppression de la cyclicité hormonale pour réduire les saignements du tissu ectopique, traitement de 1ère intention largement utilisé"},
      {classe:"Diénogest — progestatif spécifique de l'endométriose", dci:["Diénogest 2mg/j en continu"], specialites:["Visanne®"], couleur:"#1E3A5F", remarque:"AMM spécifique pour l'endométriose, action anti-proliférative directe sur le tissu endométrial ectopique"},
      {classe:"Antalgiques (AINS notamment) — traitement symptomatique de la douleur", dci:["Ibuprofène, naproxène selon prescription"], specialites:["Nurofen®","Apranax®"], couleur:"#B45309", remarque:"Utiles pour le contrôle de la douleur, particulièrement la dysménorrhée, en complément du traitement hormonal de fond"},
    ],
    interactions: [
      "Contraception œstroprogestative + médicaments inducteurs enzymatiques (certains antiépileptiques) : ↓ efficacité contraceptive — alternative à discuter",
    ],
    points_cles: [
      "Délai diagnostique moyen de 7-10 ans : préoccupant, lié à la banalisation persistante des douleurs menstruelles intenses",
      "Tissu endométrial ectopique : sensible aux variations hormonales, saigne cycliquement sans possibilité d'évacuation naturelle",
      "Contraception œstroprogestative en continu : traitement de 1ère intention pour réduire les saignements et l'inflammation associée",
      "Laparoscopie diagnostique : examen de référence pour la confirmation, mais diagnostic clinique et radiologique souvent suffisant initialement",
      "Endométriomes ovariens : risque de torsion ou de rupture si volumineux, nécessitant parfois une prise en charge chirurgicale",
    ],
  },
  n3: {
    saviez_vous: "L'endométriose profonde, forme la plus sévère touchant des organes au-delà du péritoine superficiel (rectum, vessie, uretères, cloison recto-vaginale), peut entraîner des symptômes digestifs ou urinaires cycliques souvent attribués à tort à d'autres pathologies (syndrome de l'intestin irritable, cystite récidivante) — cette errance diagnostique fréquente souligne l'importance de rechercher systématiquement une cyclicité menstruelle des symptômes digestifs ou urinaires chez une femme en âge de procréer avant de conclure à un trouble fonctionnel isolé.",
    physiopatho: "Mécanismes de l'infertilité associée à l'endométriose : plusieurs mécanismes contribuent à l'infertilité observée chez une proportion significative de patientes atteintes d'endométriose — facteurs anatomiques (adhérences pelviennes perturbant la captation ovocytaire par les trompes, distorsion de l'anatomie pelvienne normale), facteurs inflammatoires (l'environnement pelvien inflammatoire chronique pourrait altérer la qualité ovocytaire et la réceptivité endométriale même en l'absence de lésion anatomique majeure), et facteurs ovariens directs (endométriomes pouvant altérer la réserve ovarienne, particulièrement après une chirurgie d'exérèse de ces kystes) — cette multiplicité de mécanismes explique la complexité de la prise en charge de l'infertilité liée à l'endométriose, nécessitant souvent une approche combinée médico-chirurgicale et parfois un recours à l'assistance médicale à la procréation.",
    pharmacocinetique: "Agonistes de la GnRH (leuproréline notamment, traitement de 2e intention) : stimulation initiale puis désensibilisation des récepteurs hypophysaires à la GnRH par administration continue → suppression de la sécrétion de FSH/LH → état d'hypoestrogénie profonde similaire à une ménopause artificielle réversible → régression des lésions endométriosiques par privation hormonale, mais effets indésirables liés à cette hypoestrogénie profonde (bouffées de chaleur, risque de déminéralisation osseuse) limitant la durée d'utilisation, nécessitant souvent une add-back therapy (hormonothérapie de complément à faible dose) pour limiter ces effets indésirables sur une utilisation prolongée.",
    cas_clinique: "Patiente 29 ans, douleurs pelviennes chroniques cycliques, troubles digestifs (douleurs abdominales, alternance diarrhée-constipation) s'aggravant nettement pendant les règles, traitée jusqu'alors pour un syndrome de l'intestin irritable sans amélioration significative. Que suspectez-vous ?\n\nRaisonnement : cyclicité menstruelle nette des symptômes digestifs (aggravation pendant les règles), échec du traitement symptomatique du SII présumé → forte suspicion d'endométriose, possiblement de localisation digestive profonde (atteinte rectale ou recto-sigmoïdienne) → orientation vers une évaluation gynécologique spécialisée avec imagerie ciblée (IRM pelvienne, échographie endorectale selon disponibilité) à la recherche de lésions d'endométriose profonde, plutôt qu'une simple poursuite du traitement symptomatique du SII qui ne traiterait pas la cause sous-jacente probable.",
    effets_secondaires: [
      {label:"Endométriose profonde méconnue sous couvert de SII ou de cystite récidivante : retard diagnostique et thérapeutique prolongé", niveau:"warning"},
      {label:"Agonistes de la GnRH : hypoestrogénie profonde avec risque de déminéralisation osseuse si utilisation prolongée sans add-back therapy", niveau:"warning"},
      {label:"Endométriomes et chirurgie d'exérèse : risque d'altération de la réserve ovarienne, à discuter avec la patiente avant l'intervention", niveau:"warning"},
    ],
    classes: [
      {classe:"Agonistes de la GnRH — 2e intention, formes sévères ou réfractaires", dci:["Leuproréline avec add-back therapy"], specialites:["Enantone®"], couleur:"#B45309", remarque:"Hypoestrogénie thérapeutique réversible, add-back therapy nécessaire pour limiter les effets indésirables sur utilisation prolongée"},
      {classe:"Antagonistes de la GnRH oraux — alternative plus récente", dci:["Élagolix ou relugolix selon disponibilité"], specialites:["Selon autorisation locale"], couleur:"#6B2D5E", remarque:"Action plus rapide et réversible que les agonistes injectables, voie orale facilitant l'utilisation pratique"},
    ],
    interactions: [
      "Agonistes de la GnRH + add-back therapy : association recherchée pour limiter les effets indésirables de l'hypoestrogénie profonde",
    ],
    points_cles: [
      "Endométriose profonde : peut toucher rectum, vessie, uretères — symptômes digestifs/urinaires cycliques souvent attribués à tort à d'autres causes",
      "Cyclicité menstruelle des symptômes digestifs/urinaires : élément clé à rechercher avant de conclure à un trouble fonctionnel isolé",
      "Infertilité associée à l'endométriose : mécanismes multiples (anatomiques, inflammatoires, ovariens), prise en charge complexe",
      "Agonistes de la GnRH : hypoestrogénie thérapeutique réversible, add-back therapy nécessaire pour limiter les effets indésirables prolongés",
      "Chirurgie d'exérèse des endométriomes : risque d'altération de la réserve ovarienne, à discuter avec la patiente avant l'intervention",
    ],
  },
  n4: {
    saviez_vous: "La recherche sur l'endométriose a longtemps souffert d'un sous-financement relatif par rapport à sa prévalence et à son impact sur la qualité de vie (touchant environ 10% des femmes en âge de procréer) — une prise de conscience récente a conduit à un investissement accru dans la recherche de biomarqueurs diagnostiques non invasifs et de nouvelles approches thérapeutiques, dans un contexte de reconnaissance croissante de cette pathologie comme un enjeu de santé publique majeur plutôt qu'une simple 'douleur de règles' à minimiser.",
    physiopatho: "Théories étiologiques de l'endométriose : plusieurs hypothèses, non mutuellement exclusives, tentent d'expliquer l'origine de cette pathologie — la théorie de la menstruation rétrograde (reflux de sang menstruel contenant des cellules endométriales viables par les trompes vers la cavité pelvienne, mécanisme le plus largement accepté mais n'expliquant pas pourquoi seules certaines femmes développent la maladie alors que ce reflux serait présent chez la majorité), la théorie métaplasique (transformation directe de cellules péritonéales en tissu de type endométrial), et des facteurs immunologiques et génétiques (terrain favorisant l'implantation et la persistance du tissu ectopique, expliquant l'agrégation familiale parfois observée) — la compréhension multifactorielle actuelle souligne la complexité de cette pathologie au-delà d'un mécanisme unique simple.",
    recommandations: "HAS / CNGOF (Collège National des Gynécologues et Obstétriciens Français) — Endométriose : suspicion clinique devant une dysménorrhée intense et invalidante, recherche systématique d'une cyclicité des symptômes digestifs/urinaires associés. Imagerie ciblée (échographie endovaginale, IRM pelvienne) pour orienter le diagnostic et planifier la prise en charge. Traitement hormonal de 1ère intention (contraception en continu, diénogest). Prise en charge chirurgicale ou agonistes/antagonistes de la GnRH pour les formes sévères ou réfractaires. Coordination avec l'assistance médicale à la procréation en cas de désir de grossesse et d'infertilité associée.",
    situations_complexes: "Endométriose et désir de grossesse : la prise en charge diffère significativement de l'approche purement symptomatique, nécessitant une coordination avec un centre d'assistance médicale à la procréation si la conception spontanée n'est pas obtenue dans un délai raisonnable, la chirurgie pouvant être discutée dans certaines situations spécifiques pour améliorer les chances de conception selon le type et l'étendue des lésions.\n\nEndométriose et ménopause : généralement associée à une régression spontanée des symptômes liée à la chute physiologique des estrogènes, mais un traitement hormonal substitutif de la ménopause chez une femme aux antécédents d'endométriose nécessite une réflexion particulière (risque théorique de réactivation des lésions résiduelles), à discuter au cas par cas selon le contexte.\n\nAdénomyose (présence de tissu endométrial au sein du myomètre utérin lui-même) : entité distincte de l'endométriose pelvienne classique mais partageant certains mécanismes physiopathologiques et approches thérapeutiques, à évoquer devant une dysménorrhée intense associée à un utérus globuleux et augmenté de volume à l'examen ou à l'imagerie.",
    effets_secondaires: [
      {label:"Endométriose sévère non prise en charge : impact majeur et cumulatif sur la qualité de vie, la fertilité, et la santé mentale de la patiente", niveau:"danger"},
      {label:"Réactivation de l'endométriose sous traitement hormonal substitutif de la ménopause : risque théorique à discuter au cas par cas", niveau:"warning"},
      {label:"Adénomyose méconnue : peut coexister avec l'endométriose pelvienne ou être confondue avec elle, nécessitant une évaluation spécifique", niveau:"warning"},
    ],
    classes: [
      {classe:"Chirurgie d'exérèse des lésions profondes — formes sévères ou réfractaires", dci:["Chirurgie laparoscopique spécialisée selon l'étendue des lésions"], specialites:["Prise en charge en centre spécialisé endométriose"], couleur:"#6B2D5E", remarque:"Réservée aux formes sévères, réfractaires au traitement médical, ou en cas de désir de grossesse selon le contexte, équipe multidisciplinaire spécialisée recommandée"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse spécifique supplémentaire notable pour cette section au-delà de celles déjà mentionnées",
    ],
    points_cles: [
      "Endométriose : touche environ 10% des femmes en âge de procréer, longtemps sous-reconnue comme enjeu de santé publique majeur",
      "Théorie de la menstruation rétrograde : mécanisme le plus accepté mais n'expliquant pas seul la survenue de la maladie chez certaines femmes",
      "Désir de grossesse et endométriose : nécessite une coordination avec l'assistance médicale à la procréation si conception spontanée non obtenue",
      "Ménopause : régression spontanée généralement attendue, réflexion particulière nécessaire pour le traitement hormonal substitutif",
      "Adénomyose : entité distincte mais proche de l'endométriose pelvienne, à évoquer devant un utérus globuleux et une dysménorrhée intense",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F60 — SPM (SYNDROME PRÉMENSTRUEL)
   ════════════════════════════════════════════════════════ */
FN['spm'] = {
  n2: {
    saviez_vous: "Le syndrome prémenstruel doit être distingué de sa forme la plus sévère, le trouble dysphorique prémenstruel (TDPM), qui touche environ 3-8% des femmes et se caractérise par une intensité des symptômes psychiques (irritabilité majeure, tristesse intense, anxiété) suffisamment sévère pour avoir un retentissement significatif sur le fonctionnement social, professionnel ou relationnel — cette distinction guide directement la prise en charge thérapeutique, le TDPM nécessitant parfois un traitement médicamenteux spécifique au-delà des simples mesures hygiéno-diététiques.",
    physiopatho: "Le syndrome prémenstruel survient durant la phase lutéale du cycle menstruel (entre l'ovulation et les règles) et résulterait d'une sensibilité individuelle accrue aux fluctuations physiologiques normales des hormones sexuelles (progestérone et ses métabolites neuroactifs notamment, comme l'allopregnanolone qui module les récepteurs GABA-A cérébraux) plutôt que d'une anomalie du taux hormonal lui-même (les taux d'hormones sexuelles étant généralement normaux chez les femmes atteintes) → cette sensibilité accrue, dont les déterminants exacts restent partiellement compris, expliquerait la survenue cyclique des symptômes physiques (tension mammaire, ballonnements, céphalées) et psychiques (irritabilité, labilité émotionnelle, fatigue) caractéristiques.",
    mecanisme: "Mesures hygiéno-diététiques (réduction de la caféine, du sel, activité physique régulière) : approche de 1ère intention pour les formes légères à modérées, sans mécanisme pharmacologique spécifique mais bénéfice symptomatique rapporté dans plusieurs études, à recommander systématiquement avant d'envisager un traitement médicamenteux.\n\nAINS : utiles pour la composante douloureuse (tension mammaire, céphalées, douleurs pelviennes) par inhibition de la synthèse des prostaglandines, traitement symptomatique ponctuel pendant la phase prémenstruelle.",
    diagnostic: "Diagnostic essentiellement clinique, basé sur la cyclicité caractéristique des symptômes (apparaissant durant la phase lutéale, résolutifs avec l'arrivée des règles ou dans les jours suivants), idéalement confirmée par un calendrier symptomatique tenu sur au moins 2 cycles consécutifs pour objectiver cette relation temporelle avec le cycle menstruel et différencier d'un trouble psychique chronique simplement aggravé en période prémenstruelle.",
    effets_secondaires: [
      {label:"AINS : à utiliser ponctuellement pendant la phase symptomatique, pas en traitement continu prolongé sans réévaluation", niveau:"info"},
      {label:"SPM sévère non reconnu comme tel : confusion possible avec un trouble psychique chronique simplement exacerbé en période prémenstruelle", niveau:"warning"},
    ],
    classes: [
      {classe:"Mesures hygiéno-diététiques — 1ère intention", dci:["Réduction caféine/sel, activité physique régulière, sommeil adapté"], specialites:["Non médicamenteux"], couleur:"#1B6B52", remarque:"À recommander systématiquement avant tout traitement médicamenteux pour les formes légères à modérées"},
      {classe:"AINS — composante douloureuse", dci:["Ibuprofène, naproxène selon prescription"], specialites:["Nurofen®","Apranax®"], couleur:"#1E3A5F", remarque:"Traitement symptomatique ponctuel de la douleur (tension mammaire, céphalées) pendant la phase prémenstruelle"},
      {classe:"Compléments en magnésium ou vitamine B6 — soutien symptomatique", dci:["Magnésium, vitamine B6"], specialites:["Diverses formulations associées"], couleur:"#B45309", remarque:"Données d'efficacité limitées mais profil de tolérance favorable, option de soutien pour les formes légères"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse majeure pour les mesures hygiéno-diététiques et compléments mentionnés",
    ],
    points_cles: [
      "TDPM (forme sévère, 3-8% des femmes) : à distinguer du SPM classique par l'intensité du retentissement psychique et fonctionnel",
      "Symptômes liés à une sensibilité individuelle accrue aux fluctuations hormonales normales, pas à une anomalie du taux hormonal lui-même",
      "Calendrier symptomatique sur au moins 2 cycles : outil diagnostique de référence pour objectiver la cyclicité caractéristique",
      "Mesures hygiéno-diététiques : 1ère intention systématique avant tout traitement médicamenteux pour les formes légères à modérées",
      "AINS : traitement symptomatique ponctuel de la composante douloureuse, pas un traitement continu prolongé",
    ],
  },
  n3: {
    saviez_vous: "Les ISRS, traditionnellement utilisés pour la dépression avec un délai d'action de plusieurs semaines, agissent paradoxalement de façon beaucoup plus rapide dans le trouble dysphorique prémenstruel — certains schémas thérapeutiques utilisent même une prise uniquement pendant la phase lutéale (et non en continu sur tout le cycle), avec un effet bénéfique observable dès le premier ou le deuxième cycle de traitement, contrairement au délai habituel de 2-4 semaines observé dans la dépression.",
    physiopatho: "Mécanisme d'action rapide des ISRS dans le TDPM : l'efficacité particulièrement rapide des ISRS dans cette indication s'expliquerait par un mécanisme distinct de leur action antidépressive classique — plutôt qu'un effet sur la recapture de la sérotonine nécessitant des adaptations réceptorielles lentes, les ISRS pourraient moduler directement et rapidement la synthèse de l'allopregnanolone (métabolite neuroactif de la progestérone) ou son interaction avec les récepteurs GABA-A, mécanisme distinct expliquant cette rapidité d'action inhabituelle pour cette classe médicamenteuse et justifiant des schémas d'administration spécifiques limités à la phase lutéale plutôt qu'une prise continue sur tout le cycle.",
    pharmacocinetique: "Schéma d'administration intermittente des ISRS dans le TDPM (phase lutéale uniquement, généralement les 14 derniers jours du cycle) : approche pharmacologique originale tirant parti de la rapidité d'action spécifique à cette indication, permettant de limiter l'exposition médicamenteuse continue et certains effets indésirables associés à un traitement antidépresseur classique au long cours, tout en conservant l'efficacité symptomatique recherchée pendant la période concernée.",
    cas_clinique: "Patiente 32 ans, symptômes prémenstruels sévères depuis plusieurs années (irritabilité majeure, tristesse intense, conflits relationnels récurrents en période prémenstruelle), calendrier symptomatique sur 2 cycles confirmant la cyclicité stricte avec résolution complète à l'arrivée des règles, mesures hygiéno-diététiques insuffisantes. Quelle est votre démarche ?\n\nRaisonnement : tableau confirmé de trouble dysphorique prémenstruel (sévérité psychique marquée, retentissement relationnel significatif, cyclicité confirmée par calendrier) résistant aux mesures de 1ère intention → discussion d'un traitement par ISRS, avec possibilité d'un schéma intermittent limité à la phase lutéale plutôt qu'une prise continue, en expliquant à la patiente la rapidité d'action attendue dans cette indication spécifique (contrairement au délai habituel connu pour la dépression), avec réévaluation après 2-3 cycles de traitement pour juger de l'efficacité.",
    effets_secondaires: [
      {label:"TDPM non traité : retentissement relationnel et professionnel significatif, impact cumulatif sur la qualité de vie", niveau:"warning"},
      {label:"ISRS en schéma intermittent : généralement bien toléré, profil d'effets indésirables similaire à l'usage continu mais exposition limitée", niveau:"info"},
    ],
    classes: [
      {classe:"ISRS — traitement de référence du TDPM", dci:["Sertraline, fluoxétine, schéma continu ou intermittent phase lutéale"], specialites:["Zoloft®","Prozac®"], couleur:"#1B6B52", remarque:"Efficacité rapide spécifique à cette indication, schéma intermittent limité à la phase lutéale possible, à discuter selon la préférence de la patiente"},
    ],
    interactions: [
      "ISRS + triptans ou autres sérotoninergiques : risque de syndrome sérotoninergique, vigilance comme pour toute prescription d'ISRS",
    ],
    points_cles: [
      "ISRS dans le TDPM : effet rapide dès le 1er-2e cycle, contrairement au délai habituel de 2-4 semaines dans la dépression",
      "Mécanisme distinct : modulation de l'allopregnanolone et des récepteurs GABA-A plutôt que la seule recapture sérotoninergique classique",
      "Schéma intermittent (phase lutéale uniquement) : option spécifique à cette indication, limitant l'exposition médicamenteuse continue",
      "TDPM : nécessite un retentissement fonctionnel significatif pour justifier ce diagnostic, au-delà du SPM classique",
      "Calendrier symptomatique : confirmation indispensable de la cyclicité avant d'orienter vers un traitement spécifique du TDPM",
    ],
  },
  n4: {
    saviez_vous: "Certaines femmes présentant un TDPM sévère et réfractaire aux traitements de 1ère et 2e intention peuvent bénéficier d'une suppression complète de l'activité ovarienne (par agonistes de la GnRH avec add-back therapy, voire ovariectomie bilatérale dans des situations exceptionnelles et bien réfléchies) — cette option radicale, bien qu'efficace pour supprimer la cyclicité hormonale responsable des symptômes, illustre la sévérité que peut atteindre cette pathologie chez une minorité de femmes et la nécessité d'options thérapeutiques échelonnées selon la sévérité.",
    physiopatho: "TDPM et vulnérabilité neurobiologique spécifique : les recherches actuelles suggèrent que les femmes atteintes de TDPM présenteraient une vulnérabilité neurobiologique spécifique et probablement en partie génétiquement déterminée à l'action de l'allopregnanolone sur les récepteurs GABA-A cérébraux, plutôt qu'une simple anomalie de production hormonale — cette vulnérabilité individuelle, encore incomplètement caractérisée sur le plan moléculaire, expliquerait pourquoi seule une minorité de femmes développe cette forme sévère malgré des fluctuations hormonales physiologiques communes à toutes les femmes en période d'activité ovarienne.",
    recommandations: "HAS / Recommandations gynécologiques — SPM et TDPM : mesures hygiéno-diététiques en 1ère intention pour les formes légères à modérées. ISRS (continu ou intermittent phase lutéale) en 1ère intention médicamenteuse pour le TDPM confirmé. Contraception œstroprogestative à discuter en option pour certaines patientes. Options plus invasives (agonistes de la GnRH avec add-back therapy) réservées aux formes sévères et réfractaires après échec des approches précédentes bien conduites.",
    situations_complexes: "TDPM réfractaire aux ISRS et à la contraception œstroprogestative bien conduits : discussion d'agonistes de la GnRH avec add-back therapy pour supprimer la cyclicité hormonale responsable, approche réservée aux formes sévères et invalidantes après échec documenté des traitements de 1ère et 2e intention, en raison des contraintes et effets indésirables propres à cette option (cf. fiche endométriose pour les détails sur cette classe).\n\nSPM et comorbidités psychiatriques préexistantes : une dépression ou un trouble anxieux préexistant peut être significativement aggravé pendant la phase prémenstruelle (exacerbation prémenstruelle d'un trouble psychiatrique sous-jacent), distinct du TDPM proprement dit où les symptômes sont normalement absents ou minimes en phase folliculaire — distinction importante influençant la stratégie thérapeutique globale.\n\nSPM en période périménopausique : les fluctuations hormonales erratiques caractéristiques de cette transition peuvent majorer ou modifier la présentation symptomatique habituelle, complexifiant parfois l'évaluation et nécessitant une réadaptation de la stratégie thérapeutique antérieurement efficace.",
    effets_secondaires: [
      {label:"TDPM sévère réfractaire non pris en charge de façon échelonnée : retentissement majeur et prolongé sur la qualité de vie", niveau:"danger"},
      {label:"Exacerbation prémenstruelle d'un trouble psychiatrique sous-jacent méconnue comme telle : prise en charge incomplète si seul le versant cyclique est traité", niveau:"warning"},
      {label:"Agonistes de la GnRH au long cours sans add-back therapy : risque de déminéralisation osseuse significative", niveau:"danger"},
    ],
    classes: [
      {classe:"Agonistes de la GnRH avec add-back therapy — TDPM sévère réfractaire", dci:["Leuproréline + add-back therapy hormonale"], specialites:["Enantone® + traitement de complément"], couleur:"#991B1B", remarque:"Réservé aux formes sévères et réfractaires après échec des traitements de 1ère et 2e intention bien conduits"},
    ],
    interactions: [
      "Agonistes de la GnRH + add-back therapy : association nécessaire pour limiter les effets indésirables de l'hypoestrogénie profonde prolongée",
    ],
    points_cles: [
      "Vulnérabilité neurobiologique spécifique : probablement en partie génétique, à l'action de l'allopregnanolone sur les récepteurs GABA-A",
      "Options thérapeutiques échelonnées : des mesures hygiéno-diététiques aux agonistes de la GnRH selon la sévérité du TDPM",
      "Exacerbation prémenstruelle d'un trouble psychiatrique préexistant : à distinguer du TDPM proprement dit, stratégie thérapeutique différente",
      "Agonistes de la GnRH avec add-back therapy : option pour les formes sévères réfractaires, supprime la cyclicité hormonale responsable",
      "Période périménopausique : fluctuations hormonales erratiques pouvant complexifier l'évaluation et la prise en charge du SPM/TDPM",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F61 — MYCOSE VAGINALE
   ════════════════════════════════════════════════════════ */
FN['mycose-vaginale'] = {
  n2: {
    saviez_vous: "Environ 75% des femmes présenteront au moins un épisode de mycose vaginale (candidose vulvo-vaginale) au cours de leur vie, Candida albicans étant responsable de 80-90% des cas — un épisode isolé, typique et non récidivant peut généralement être traité efficacement par automédication en pharmacie après vérification de l'absence de signes atypiques, sans nécessiter systématiquement une consultation médicale préalable.",
    physiopatho: "Candida albicans est un champignon commensal normalement présent en faible quantité dans la flore vaginale de nombreuses femmes sans causer de symptôme → un déséquilibre de l'écosystème vaginal (notamment une perturbation de la flore de Döderlein protectrice, composée principalement de lactobacilles) favorise sa prolifération excessive et symptomatique → facteurs favorisants classiques : antibiothérapie récente (destruction de la flore protectrice), grossesse (modifications hormonales et du pH vaginal), diabète mal contrôlé, immunodépression, certains contraceptifs hormonaux → inflammation locale responsable des symptômes caractéristiques (prurit intense, leucorrhées blanchâtres grumeleuses, brûlures).",
    mecanisme: "Antifongiques azolés locaux (clotrimazole, miconazole) : inhibition de la synthèse de l'ergostérol (composant essentiel de la membrane fongique) par blocage d'une enzyme du cytochrome P450 fongique → altération de la perméabilité membranaire et mort du champignon, traitement de référence en 1ère intention pour l'épisode simple et isolé.\n\nFluconazole oral (dose unique) : alternative orale par voie systémique, même mécanisme d'action (inhibition de la synthèse de l'ergostérol), praticité d'une prise unique appréciée par de nombreuses patientes par rapport au traitement local de plusieurs jours.",
    diagnostic: "Diagnostic clinique le plus souvent suffisant devant le tableau typique (prurit vulvo-vaginal intense, leucorrhées blanchâtres grumeleuses sans odeur particulière, érythème vulvaire). Toute mycose atypique (leucorrhées malodorantes, colorées, fièvre associée, douleur pelvienne) ou récidivante (≥ 4 épisodes/an) doit faire l'objet d'une consultation médicale pour confirmation diagnostique (prélèvement vaginal) et recherche d'une cause favorisante ou d'un diagnostic différentiel (vaginose bactérienne notamment, mécanisme et traitement différents).",
    effets_secondaires: [
      {label:"Automédication répétée sans diagnostic confirmé : risque de masquer une autre cause de leucorrhées (vaginose bactérienne, IST)", niveau:"warning"},
      {label:"Antifongiques azolés locaux : généralement bien tolérés, rare irritation locale", niveau:"info"},
      {label:"Mycoses récidivantes (≥ 4 épisodes/an) non explorées : retard à l'identification d'une cause favorisante traitable", niveau:"warning"},
    ],
    classes: [
      {classe:"Antifongiques azolés locaux — traitement de référence épisode simple", dci:["Clotrimazole","Miconazole"], specialites:["Gyno-Pevaryl®","Gyno-Daktarin®"], couleur:"#1B6B52", remarque:"Traitement de référence pour l'épisode simple et isolé, durée variable selon la formulation (1 à 7 jours)"},
      {classe:"Fluconazole oral — alternative en dose unique", dci:["Fluconazole 150mg, dose unique"], specialites:["Triflucan®"], couleur:"#1E3A5F", remarque:"Praticité d'une prise unique, alternative au traitement local pour les patientes préférant la voie orale"},
    ],
    interactions: [
      "Fluconazole + statines métabolisées par CYP3A4 : ↑ risque de myopathie par inhibition de leur métabolisme — prudence si association",
      "Fluconazole + anticoagulants oraux : ↑ effet anticoagulant — surveillance de l'INR si association ponctuelle",
    ],
    points_cles: [
      "75% des femmes présenteront au moins un épisode de mycose vaginale au cours de leur vie, Candida albicans responsable de 80-90% des cas",
      "Facteurs favorisants classiques : antibiothérapie récente, grossesse, diabète mal contrôlé, immunodépression",
      "Mycose typique et isolée : automédication possible en pharmacie après vérification de l'absence de signes atypiques",
      "Mycose atypique ou récidivante : consultation médicale nécessaire pour confirmation diagnostique et recherche de cause favorisante",
      "Fluconazole oral en dose unique : alternative pratique et appréciée au traitement local de plusieurs jours",
    ],
  },
  n3: {
    saviez_vous: "La candidose vulvo-vaginale récidivante (≥ 4 épisodes documentés par an) nécessite une stratégie thérapeutique différente de l'épisode isolé — un traitement d'attaque suivi d'un traitement d'entretien prolongé (plusieurs mois) par fluconazole hebdomadaire est désormais recommandé dans cette situation spécifique, contrairement à la répétition de traitements courts itératifs à chaque récidive qui ne permet pas de rompre le cycle de récidive.",
    physiopatho: "Mécanismes de la candidose récidivante : au-delà des facteurs favorisants classiques de l'épisode isolé, la candidose récidivante pourrait impliquer une réponse immunitaire locale spécifique anormale (hypersensibilité immunitaire locale à Candida plutôt qu'un simple déséquilibre de la flore), expliquant pourquoi certaines femmes développent des récidives fréquentes malgré une éradication apparente de chaque épisode aigu — cette compréhension immunologique justifie l'approche thérapeutique prolongée visant non seulement à traiter chaque épisode mais à interrompre durablement ce cycle de récidive par un traitement d'entretien.",
    pharmacocinetique: "Fluconazole en traitement d'entretien hebdomadaire (candidose récidivante) : profil pharmacocinétique permettant une administration hebdomadaire grâce à sa demi-vie longue (environ 30h), maintenant des concentrations suffisantes pour prévenir la prolifération fongique excessive sur l'intervalle entre les prises, schéma habituellement poursuivi pendant 6 mois avant réévaluation de la nécessité de prolonger ou d'arrêter ce traitement d'entretien.",
    cas_clinique: "Patiente 34 ans, 5e épisode de mycose vaginale dans l'année, chaque épisode traité efficacement par antifongique local ou fluconazole en dose unique mais récidive systématique dans les semaines suivantes, pas de diabète ni d'immunodépression identifiés. Quelle stratégie proposez-vous ?\n\nRaisonnement : candidose vulvo-vaginale récidivante confirmée (≥ 4 épisodes/an) sans cause favorisante identifiée par le bilan habituel → orientation vers une stratégie de traitement d'entretien plutôt qu'une répétition de traitements courts itératifs : traitement d'attaque initial puis fluconazole 150mg en prise hebdomadaire pendant 6 mois, avec réévaluation à l'issue de cette période pour juger de la nécessité de poursuivre, contrairement à l'approche répétitive habituelle qui ne permet pas de rompre durablement le cycle de récidive.",
    effets_secondaires: [
      {label:"Candidose récidivante traitée par épisodes courts répétés sans stratégie d'entretien : échec à rompre durablement le cycle de récidive", niveau:"warning"},
      {label:"Fluconazole en traitement d'entretien prolongé : surveillance hépatique recommandée sur un usage de plusieurs mois", niveau:"warning"},
    ],
    classes: [
      {classe:"Fluconazole — traitement d'entretien candidose récidivante", dci:["Fluconazole 150mg/semaine pendant 6 mois"], specialites:["Triflucan®"], couleur:"#1B6B52", remarque:"Stratégie de référence pour rompre le cycle de récidive, à différencier du traitement ponctuel de l'épisode isolé"},
    ],
    interactions: [
      "Fluconazole en usage prolongé + statines/anticoagulants : interactions identiques à l'usage ponctuel mais surveillance accrue sur la durée",
    ],
    points_cles: [
      "Candidose récidivante (≥ 4 épisodes/an) : stratégie d'entretien prolongé nécessaire, distincte du traitement de l'épisode isolé",
      "Hypersensibilité immunitaire locale anormale à Candida : mécanisme possible expliquant les récidives fréquentes malgré éradication apparente",
      "Fluconazole hebdomadaire pendant 6 mois : schéma de référence pour rompre durablement le cycle de récidive",
      "Traitements courts répétés à chaque récidive : approche insuffisante ne permettant pas de rompre le cycle, contrairement au traitement d'entretien",
      "Réévaluation à 6 mois : nécessaire pour juger de la poursuite ou de l'arrêt du traitement d'entretien selon l'évolution",
    ],
  },
  n4: {
    saviez_vous: "Certaines espèces de Candida non-albicans (notamment Candida glabrata) sont naturellement moins sensibles, voire résistantes, aux antifongiques azolés classiquement utilisés en 1ère intention — leur identification par prélèvement vaginal avec culture devient essentielle en cas d'échec thérapeutique répété malgré un traitement bien conduit, situation où la simple répétition du même traitement azolé serait vouée à l'échec sans adaptation de la stratégie selon l'espèce et sa sensibilité documentée.",
    physiopatho: "Candidose vulvo-vaginale et grossesse : la grossesse constitue un facteur de risque bien documenté de candidose vaginale en raison des modifications hormonales (taux élevés d'œstrogènes favorisant la prolifération de Candida) et de l'acidification du pH vaginal — le traitement de la candidose pendant la grossesse repose préférentiellement sur les antifongiques locaux plutôt que sur le fluconazole oral, en raison de données de sécurité plus limitées et d'un signal de risque tératogène potentiel rapporté avec le fluconazole à dose répétée ou élevée pendant la grossesse, particulièrement au 1er trimestre.",
    recommandations: "HAS / CNGOF — Candidose vulvo-vaginale : antifongique azolé local en 1ère intention pour l'épisode simple, fluconazole oral en alternative pratique chez la femme non enceinte. Antifongiques locaux préférés pendant la grossesse en raison du profil de sécurité plus rassurant. Traitement d'entretien prolongé par fluconazole hebdomadaire pour la candidose récidivante confirmée. Prélèvement vaginal avec culture et identification de l'espèce en cas d'échec thérapeutique répété, pour adapter le traitement selon le profil de résistance.",
    situations_complexes: "Candidose vaginale chez la femme enceinte : antifongiques locaux à privilégier systématiquement, fluconazole oral à éviter ou réservé à des situations exceptionnelles après discussion bénéfice-risque spécifique en raison du signal de risque tératogène potentiel rapporté, particulièrement préoccupant au 1er trimestre.\n\nCandidose à Candida glabrata ou autre espèce résistante aux azolés : nécessite une adaptation thérapeutique spécifique (traitements alternatifs comme l'acide borique en application locale sous prescription spécialisée, ou d'autres antifongiques non azolés selon le profil de sensibilité), situation à orienter vers un avis gynécologique spécialisé en cas d'échecs répétés.\n\nCandidose vaginale et diabète mal contrôlé : facteur favorisant fréquent et parfois méconnu, l'optimisation du contrôle glycémique fait partie intégrante de la stratégie thérapeutique pour prévenir les récidives, au même titre que le traitement antifongique lui-même, sans quoi les récidives persisteront malgré un traitement antifongique bien conduit.",
    effets_secondaires: [
      {label:"Fluconazole pendant la grossesse, particulièrement au 1er trimestre : signal de risque tératogène potentiel, à éviter ou réserver à des situations exceptionnelles", niveau:"danger"},
      {label:"Candida glabrata résistant aux azolés méconnu : échecs thérapeutiques répétés sans adaptation appropriée de la stratégie", niveau:"warning"},
      {label:"Diabète mal contrôlé non optimisé en parallèle du traitement antifongique : récidives persistantes malgré traitement bien conduit", niveau:"warning"},
    ],
    classes: [
      {classe:"Antifongiques azolés locaux — traitement de référence en grossesse", dci:["Clotrimazole, miconazole en application locale"], specialites:["Gyno-Pevaryl®","Gyno-Daktarin®"], couleur:"#1B6B52", remarque:"Préférés au fluconazole oral pendant la grossesse en raison du profil de sécurité plus rassurant"},
      {classe:"Acide borique — alternative pour Candida résistant aux azolés", dci:["Acide borique en capsule vaginale, selon prescription spécialisée"], specialites:["Préparation magistrale selon prescription"], couleur:"#6B2D5E", remarque:"Option pour les espèces résistantes (Candida glabrata notamment), sous prescription et suivi spécialisés"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse spécifique supplémentaire notable pour cette section au-delà de celles déjà mentionnées",
    ],
    points_cles: [
      "Candida glabrata : résistance naturelle aux azolés classiques, à rechercher par culture en cas d'échec thérapeutique répété",
      "Grossesse : antifongiques locaux à privilégier, fluconazole oral à éviter en raison du signal de risque tératogène potentiel",
      "Diabète mal contrôlé : facteur favorisant fréquent, optimisation glycémique indispensable en parallèle du traitement antifongique",
      "Acide borique : option spécialisée pour les espèces résistantes aux azolés, sous prescription et suivi adaptés",
      "Échecs thérapeutiques répétés : justifient systématiquement un prélèvement avec culture pour identifier l'espèce et son profil de sensibilité",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F62 — CRAMPES MUSCULAIRES
   ════════════════════════════════════════════════════════ */
FN['crampes-musculaires'] = {
  n2: {
    saviez_vous: "Contrairement à une croyance répandue, l'efficacité de la supplémentation en magnésium pour prévenir les crampes musculaires nocturnes idiopathiques n'est pas clairement démontrée par les études les plus rigoureuses récentes — l'étirement régulier des muscles concernés (mollets notamment) avant le coucher reste la mesure préventive la mieux étayée pour cette plainte fréquente et généralement bénigne.",
    physiopatho: "La crampe musculaire correspond à une contraction involontaire, soudaine et douloureuse d'un muscle ou d'un groupe musculaire, le plus souvent les mollets, résultant d'une hyperexcitabilité transitoire de la jonction neuromusculaire ou des motoneurones → plusieurs facteurs peuvent favoriser cette hyperexcitabilité : déshydratation, déséquilibre électrolytique transitoire (notamment après un effort physique intense avec sudation importante), position prolongée inhabituelle, fatigue musculaire, ou simplement sans cause identifiable particulière dans de nombreux cas (crampes idiopathiques, notamment nocturnes chez le sujet âgé).",
    mecanisme: "Étirement musculaire passif : action mécanique directe sur le muscle contracté, interrompt la crampe en cours en étirant le muscle en contraction, geste simple et immédiatement efficace pour la crise aiguë.\n\nQuinine (anciennement largement utilisée) : mécanisme d'action sur l'excitabilité de la jonction neuromusculaire, mais profil de tolérance défavorable (risque de thrombopénie sévère, troubles du rythme cardiaque) ayant conduit à un usage désormais très restreint et encadré, réservé à des situations spécifiques après échec des mesures non médicamenteuses.",
    diagnostic: "Diagnostic clinique évident devant la contraction musculaire douloureuse soudaine, généralement nocturne pour les crampes idiopathiques du mollet. Recherche de facteurs favorisants ou de causes sous-jacentes (médicaments, pathologie associée) si les crampes sont fréquentes, intenses, ou associées à d'autres symptômes neuromusculaires, orientant alors vers une exploration complémentaire plutôt qu'une simple prise en charge symptomatique.",
    effets_secondaires: [
      {label:"Crampes très fréquentes ou intenses, ou associées à une faiblesse musculaire : signal devant motiver une exploration complémentaire", niveau:"warning"},
      {label:"Quinine : risque de thrombopénie sévère et de troubles du rythme cardiaque — usage désormais très restreint", niveau:"danger"},
      {label:"Déshydratation et déséquilibre électrolytique après effort intense : facteur favorisant fréquent et facilement corrigible", niveau:"info"},
    ],
    classes: [
      {classe:"Étirement musculaire — traitement de la crise aiguë", dci:["Étirement passif du muscle concerné, non médicamenteux"], specialites:["Geste simple"], couleur:"#1B6B52", remarque:"Action mécanique immédiate et efficace, geste de référence pour interrompre une crampe en cours"},
      {classe:"Hydratation et apports électrolytiques adaptés — prévention post-effort", dci:["Eau, boissons isotoniques selon le contexte sportif"], specialites:["Non médicamenteux"], couleur:"#1E3A5F", remarque:"Particulièrement important après un effort physique intense avec sudation importante"},
      {classe:"Quinine — usage très restreint, après échec des mesures simples", dci:["Quinine selon prescription médicale stricte"], specialites:["Hexaquine® (selon disponibilité)"], couleur:"#C0392B", remarque:"Réservée à des situations spécifiques après échec des mesures non médicamenteuses, en raison du profil de tolérance défavorable"},
    ],
    interactions: [
      "Quinine + anticoagulants : interactions potentielles à vérifier, prudence en cas d'association",
    ],
    points_cles: [
      "Étirement musculaire passif : geste de référence et immédiatement efficace pour interrompre une crampe en cours",
      "Efficacité du magnésium pour les crampes idiopathiques : non clairement démontrée par les études récentes les plus rigoureuses",
      "Crampes fréquentes ou associées à une faiblesse musculaire : signal devant motiver une exploration complémentaire",
      "Quinine : usage désormais très restreint en raison du risque de thrombopénie sévère et de troubles du rythme cardiaque",
      "Hydratation et apports électrolytiques : mesure préventive importante après un effort physique intense",
    ],
  },
  n3: {
    saviez_vous: "Certains médicaments largement utilisés peuvent favoriser ou aggraver les crampes musculaires par des mécanismes variés — les diurétiques (par déséquilibre électrolytique, notamment l'hypokaliémie), les statines (par un mécanisme encore débattu lié à leur effet sur le métabolisme musculaire), et certains bronchodilatateurs bêta-2 agonistes sont des causes iatrogènes fréquentes à rechercher systématiquement devant des crampes d'apparition récente chez un patient sous traitement.",
    physiopatho: "Crampes musculaires et grossesse : très fréquentes, particulièrement au 2e et 3e trimestre, leur mécanisme exact reste débattu (hypothèses impliquant une compression vasculaire ou nerveuse par l'utérus gravide, des modifications du métabolisme du calcium et du magnésium, ou simplement une sensibilité accrue liée aux modifications physiologiques de la grossesse) — cette fréquence élevée chez la femme enceinte justifie une réassurance sur le caractère généralement bénin de ce symptôme tout en proposant des mesures simples (étirement, hydratation, position de sommeil adaptée) pour en limiter la fréquence et l'intensité.",
    pharmacocinetique: "Statines et crampes/myalgies : le mécanisme exact reliant les statines aux symptômes musculaires (allant de simples myalgies sans élévation enzymatique à la rhabdomyolyse sévère dans les formes les plus graves) impliquerait une perturbation du métabolisme énergétique mitochondrial musculaire via la réduction de la synthèse du coenzyme Q10 (dont la voie de synthèse partage des étapes communes avec celle du cholestérol bloquée par les statines), bien que cette hypothèse reste débattue et ne soit probablement pas le seul mécanisme en jeu.",
    cas_clinique: "Patient 58 ans, sous statine depuis 2 mois pour une hypercholestérolémie, présente des crampes musculaires nocturnes fréquentes des mollets et des cuisses depuis le début du traitement, sans élévation significative des CPK au bilan biologique. Que proposez-vous ?\n\nRaisonnement : crampes musculaires temporellement liées à l'introduction de la statine, sans élévation enzymatique significative (myalgie simple plutôt qu'une atteinte musculaire plus sévère) → discussion avec le médecin prescripteur d'une possible relation causale, options à considérer : changement de statine (certaines molécules étant mieux tolérées sur le plan musculaire que d'autres), réduction de dose, ou supplémentation en coenzyme Q10 (bénéfice non formellement démontré mais parfois proposé en pratique), tout en réévaluant le bénéfice cardiovasculaire global du traitement avant d'envisager un arrêt complet qui pourrait être délétère sur le plan cardiovasculaire si le traitement est par ailleurs justifié.",
    effets_secondaires: [
      {label:"Statines et myalgies/crampes : effet indésirable fréquent, mécanisme exact débattu, à ne pas négliger malgré l'absence d'élévation enzymatique systématique", niveau:"warning"},
      {label:"Diurétiques et hypokaliémie : facteur favorisant fréquent de crampes, à rechercher et corriger si pertinent", niveau:"warning"},
      {label:"Arrêt intempestif d'une statine pour crampes simples sans réévaluation du bénéfice cardiovasculaire : risque de perte d'un bénéfice thérapeutique important", niveau:"warning"},
    ],
    classes: [
      {classe:"Coenzyme Q10 — soutien en cas de myalgies sous statine", dci:["Coenzyme Q10 en complément"], specialites:["Diverses formulations de complément alimentaire"], couleur:"#B45309", remarque:"Bénéfice non formellement démontré par les études rigoureuses mais parfois proposé en pratique clinique en cas de myalgies sous statine"},
      {classe:"Changement de statine ou réduction de dose — myalgies sous statine confirmées", dci:["Switch vers une autre statine ou ajustement posologique selon prescription"], specialites:["Selon la molécule choisie"], couleur:"#1E3A5F", remarque:"Certaines statines mieux tolérées sur le plan musculaire que d'autres, à discuter avec le prescripteur avant tout arrêt complet"},
    ],
    interactions: [
      "Diurétiques + hypokaliémie : facteur favorisant de crampes, supplémentation potassique ou diurétique épargneur de potassium à discuter selon le contexte",
    ],
    points_cles: [
      "Diurétiques, statines, bêta-2 agonistes : causes iatrogènes fréquentes de crampes à rechercher systématiquement",
      "Crampes en grossesse : très fréquentes notamment au 2e-3e trimestre, mécanisme débattu, généralement bénignes",
      "Statines et crampes : mécanisme possiblement lié à la réduction du coenzyme Q10, bien que débattu",
      "Ne jamais arrêter intempestivement une statine pour crampes simples sans réévaluer le bénéfice cardiovasculaire global",
      "Changement de molécule ou ajustement de dose : options à privilégier avant un arrêt complet du traitement par statine",
    ],
  },
  n4: {
    saviez_vous: "Des crampes musculaires fréquentes et sévères, particulièrement si associées à une faiblesse musculaire progressive, des fasciculations (petites contractions musculaires visibles sous la peau), ou une atteinte évolutive, doivent faire évoquer une pathologie neuromusculaire sous-jacente plus rare mais sérieuse (maladie du motoneurone notamment) — bien que la grande majorité des crampes restent bénignes et idiopathiques, cette vigilance est essentielle pour ne pas méconnaître les rares situations nécessitant une exploration neurologique spécialisée urgente.",
    physiopatho: "Crampes et pathologies métaboliques ou endocriniennes sous-jacentes : l'hypothyroïdie, l'insuffisance rénale chronique (par troubles électrolytiques associés, notamment du calcium et du phosphore), et certaines neuropathies périphériques (notamment d'origine diabétique) peuvent se manifester par des crampes musculaires fréquentes parmi d'autres symptômes — ces causes sous-jacentes doivent être recherchées devant des crampes inhabituellement fréquentes, sévères, ou résistantes aux mesures simples, particulièrement en présence d'autres symptômes systémiques associés évoquant ces pathologies.",
    recommandations: "HAS / Recommandations de bonne pratique — Crampes musculaires : étirement et mesures non médicamenteuses en 1ère intention pour les crampes idiopathiques bénignes. Recherche systématique de causes iatrogènes (statines, diurétiques) ou de facteurs favorisants (déshydratation, grossesse) devant des crampes fréquentes. Exploration complémentaire (bilan métabolique, électromyogramme) si crampes sévères, résistantes, ou associées à des signes neuromusculaires d'alarme (faiblesse, fasciculations, atrophie).",
    situations_complexes: "Crampes et insuffisance rénale chronique (notamment chez les patients dialysés) : fréquentes, liées aux troubles électrolytiques associés à cette pathologie, nécessitant une optimisation du traitement de l'insuffisance rénale et des troubles électrolytiques sous-jacents plutôt qu'un simple traitement symptomatique isolé des crampes elles-mêmes.\n\nCrampes avec fasciculations et faiblesse musculaire progressive : signal d'alarme neurologique nécessitant une orientation neurologique spécialisée urgente pour rechercher une maladie du motoneurone (sclérose latérale amyotrophique notamment), diagnostic différentiel rare mais grave à ne pas méconnaître devant ce tableau spécifique distinct des crampes bénignes habituelles.\n\nCrampes professionnelles liées à une sollicitation musculaire répétitive spécifique (crampe de l'écrivain, du musicien) : entité particulière (dystonie focale d'effort) distincte des crampes musculaires classiques par son mécanisme (trouble du contrôle moteur fin plutôt qu'une simple hyperexcitabilité musculaire), nécessitant une prise en charge spécifique différente (rééducation spécialisée, parfois toxine botulique localisée).",
    effets_secondaires: [
      {label:"Crampes avec fasciculations et faiblesse progressive : signal d'alarme neurologique nécessitant une orientation spécialisée urgente", niveau:"danger"},
      {label:"Crampes liées à une insuffisance rénale chronique non optimisée : persistance malgré tout traitement symptomatique isolé des crampes", niveau:"warning"},
      {label:"Dystonie focale d'effort méconnue : prise en charge inadaptée si confondue avec une simple crampe musculaire classique", niveau:"warning"},
    ],
    classes: [
      {classe:"Exploration neurologique spécialisée — crampes avec signes d'alarme associés", dci:["Électromyogramme et consultation neurologique selon le contexte"], specialites:["Prise en charge neurologique spécialisée"], couleur:"#C0392B", remarque:"Indispensable devant des crampes associées à une faiblesse musculaire progressive ou des fasciculations, pour rechercher une pathologie neuromusculaire sous-jacente"},
      {classe:"Toxine botulique localisée — dystonie focale d'effort sélectionnée", dci:["Injection de toxine botulique selon indication spécialisée"], specialites:["Botox® (usage thérapeutique spécialisé)"], couleur:"#6B2D5E", remarque:"Option pour la dystonie focale d'effort (crampe de l'écrivain notamment), entité distincte des crampes musculaires classiques"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse spécifique supplémentaire notable pour cette section",
    ],
    points_cles: [
      "Fasciculations et faiblesse musculaire progressive associées aux crampes : signal d'alarme neurologique nécessitant une exploration urgente",
      "Insuffisance rénale chronique : cause fréquente de crampes par troubles électrolytiques, nécessite une optimisation globale du traitement",
      "Dystonie focale d'effort (crampe de l'écrivain) : entité distincte des crampes musculaires classiques, mécanisme et traitement différents",
      "Hypothyroïdie et neuropathies périphériques : causes sous-jacentes possibles à rechercher devant des crampes inhabituelles ou sévères",
      "La grande majorité des crampes restent bénignes et idiopathiques, mais une vigilance s'impose devant des signes d'alarme associés",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F63 — MYCOSE DU PIED (PIED D'ATHLÈTE)
   ════════════════════════════════════════════════════════ */
FN['mycose-pied'] = {
  n2: {
    saviez_vous: "Le 'pied d'athlète' (tinea pedis) ne touche pas que les sportifs, contrairement à ce que suggère son nom — il s'agit de l'infection fongique la plus fréquente au monde, favorisée par tout environnement chaud et humide prolongé (chaussures fermées, piscines, vestiaires collectifs), expliquant sa fréquence aussi bien chez les sportifs que chez toute personne exposée à ces conditions favorisantes au quotidien.",
    physiopatho: "La mycose du pied résulte le plus souvent d'une infection par des dermatophytes (champignons filamenteux kératinophiles, se nourrissant de la kératine cutanée, notamment Trichophyton rubrum largement majoritaire) → ces champignons prolifèrent particulièrement bien dans un environnement chaud, humide et macéré (espaces interdigitaux notamment, zone la plus fréquemment touchée) → invasion de la couche cornée de l'épiderme → desquamation, fissures, prurit caractéristiques, avec un risque de transmission interhumaine par contact direct ou via des surfaces contaminées (sols de piscines, vestiaires, tapis de salle de sport).",
    mecanisme: "Antifongiques topiques azolés ou autres classes (terbinafine topique) : action directe sur la paroi ou la membrane fongique selon la classe (inhibition de la synthèse de l'ergostérol pour les azolés, inhibition de la squalène époxydase pour la terbinafine) → éradication locale du champignon, traitement de référence pour la forme interdigitale simple, durée de traitement variable selon la molécule (de quelques jours à plusieurs semaines).",
    diagnostic: "Diagnostic clinique le plus souvent suffisant devant l'aspect typique (desquamation, fissures, prurit dans les espaces interdigitaux, notamment entre le 4e et 5e orteil). Examen mycologique (prélèvement avec examen direct et culture) utile en cas de doute diagnostique, d'échec thérapeutique, ou avant un traitement systémique pour confirmer l'origine fongique et identifier l'espèce en cause.",
    effets_secondaires: [
      {label:"Mycose du pied non traitée : porte d'entrée possible pour une surinfection bactérienne (érysipèle notamment) par les fissures cutanées", niveau:"warning"},
      {label:"Transmission interhumaine fréquente : par contact direct ou surfaces contaminées (piscines, vestiaires)", niveau:"warning"},
      {label:"Atteinte unguéale associée (onychomycose) : plus difficile à traiter, nécessite souvent un traitement plus prolongé et parfois systémique", niveau:"info"},
    ],
    classes: [
      {classe:"Antifongiques azolés topiques — traitement de référence", dci:["Clotrimazole","Éconazole"], specialites:["Mycohydralin®","Pevaryl®"], couleur:"#1B6B52", remarque:"Traitement de référence pour la forme interdigitale simple, durée habituelle de 2-4 semaines selon la formulation"},
      {classe:"Terbinafine topique — alternative, durée plus courte", dci:["Terbinafine crème"], specialites:["Lamisil®"], couleur:"#1E3A5F", remarque:"Durée de traitement souvent plus courte (1 semaine) que les azolés classiques, efficacité comparable"},
      {classe:"Mesures d'hygiène — prévention et complément indispensable", dci:["Séchage soigneux des espaces interdigitaux, chaussures aérées"], specialites:["Non médicamenteux"], couleur:"#B45309", remarque:"Élément essentiel en complément du traitement antifongique, prévention des récidives par limitation de l'humidité locale"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse systémique significative pour les antifongiques topiques à action locale",
    ],
    points_cles: [
      "Pied d'athlète : infection fongique la plus fréquente au monde, ne touche pas que les sportifs malgré son nom",
      "Trichophyton rubrum : dermatophyte largement majoritaire responsable de la mycose du pied",
      "Espaces interdigitaux (notamment 4e-5e orteil) : localisation la plus fréquente en raison de l'environnement chaud et humide",
      "Mesures d'hygiène (séchage soigneux, chaussures aérées) : complément indispensable au traitement antifongique pour prévenir les récidives",
      "Surinfection bactérienne (érysipèle) : complication possible par les fissures cutanées de la mycose non traitée",
    ],
  },
  n3: {
    saviez_vous: "L'onychomycose (mycose de l'ongle), souvent associée ou consécutive à une mycose cutanée du pied non traitée, nécessite une approche thérapeutique très différente en raison de la difficulté de pénétration des antifongiques topiques à travers la kératine unguéale épaisse — un traitement systémique (terbinafine orale notamment) est souvent nécessaire pour une efficacité satisfaisante, contrairement à la mycose cutanée simple généralement bien contrôlée par un traitement topique seul.",
    physiopatho: "Mécanismes de la chronicité et de la récidive de la mycose du pied : la persistance de squames contaminées dans les chaussures, les chaussettes, ou sur les surfaces du domicile (tapis de salle de bain notamment) constitue une source fréquente de réinfection après un traitement apparemment efficace mais incomplet sur le plan de la décontamination de l'environnement → cette réinfection environnementale, distincte d'un échec thérapeutique proprement dit, explique de nombreuses récidives apparentes et justifie des mesures de décontamination de l'environnement (lavage à haute température du linge, traitement antifongique des chaussures) en complément du traitement cutané lui-même.",
    pharmacocinetique: "Terbinafine orale (onychomycose) : forte lipophilie et affinité kératinique permettant une concentration élevée et prolongée dans la kératine unguéale après administration orale, persistance de concentrations efficaces dans l'ongle plusieurs semaines après l'arrêt du traitement (du fait de la croissance lente de l'ongle et de l'incorporation du médicament dans la kératine en formation), expliquant pourquoi la durée de traitement orale (plusieurs semaines à mois) est plus courte que le temps de guérison clinique apparente complète de l'ongle (qui nécessite la croissance complète d'un ongle sain, plusieurs mois supplémentaires).",
    cas_clinique: "Patient 52 ans, onychomycose du gros orteil évoluant depuis plus d'un an, épaississement et coloration jaunâtre de l'ongle, échec de traitements topiques antifongiques en vente libre répétés. Que proposez-vous ?\n\nRaisonnement : onychomycose chronique avec échec des traitements topiques (pénétration insuffisante à travers la kératine unguéale épaisse pour ce type d'atteinte) → orientation vers un prélèvement mycologique pour confirmer le diagnostic et l'espèce en cause avant traitement systémique, discussion d'un traitement par terbinafine orale (plusieurs semaines à mois selon l'ongle concerné), information sur le délai de guérison clinique apparente (plusieurs mois supplémentaires après la fin du traitement, correspondant au temps de croissance complète d'un ongle sain), mesures de décontamination de l'environnement (chaussures, chaussettes) en complément pour limiter le risque de réinfection.",
    effets_secondaires: [
      {label:"Terbinafine orale : hépatotoxicité possible, bilan hépatique parfois recommandé avant et pendant un traitement prolongé", niveau:"warning"},
      {label:"Onychomycose non traitée par voie systémique malgré une indication : persistance et extension possible à d'autres ongles", niveau:"warning"},
      {label:"Réinfection environnementale (chaussures, chaussettes contaminées) méconnue : explique de nombreuses récidives apparentes après traitement", niveau:"warning"},
    ],
    classes: [
      {classe:"Terbinafine orale — onychomycose confirmée", dci:["Terbinafine 250mg/j, plusieurs semaines à mois selon l'ongle"], specialites:["Lamisil® comprimés"], couleur:"#1B6B52", remarque:"Concentration élevée et prolongée dans la kératine unguéale, durée de traitement plus courte que le délai de guérison clinique apparente complète"},
      {classe:"Décontamination de l'environnement — complément indispensable", dci:["Lavage à haute température, traitement antifongique des chaussures"], specialites:["Mesures non médicamenteuses spécifiques"], couleur:"#1E3A5F", remarque:"Prévention de la réinfection environnementale, complément essentiel au traitement médicamenteux pour éviter les récidives apparentes"},
    ],
    interactions: [
      "Terbinafine + certains antidépresseurs (inhibiteurs du CYP2D6) : interactions possibles à vérifier selon le profil médicamenteux du patient",
    ],
    points_cles: [
      "Onychomycose : nécessite souvent un traitement systémique en raison de la difficulté de pénétration topique à travers la kératine unguéale",
      "Terbinafine orale : forte affinité kératinique, persistance prolongée dans l'ongle après l'arrêt du traitement",
      "Délai de guérison clinique apparente : plusieurs mois après la fin du traitement, correspondant au temps de croissance complète de l'ongle",
      "Réinfection environnementale (chaussures, chaussettes) : source fréquente de récidive apparente, distincte d'un échec thérapeutique",
      "Décontamination de l'environnement : mesure complémentaire indispensable au traitement médicamenteux pour prévenir les récidives",
    ],
  },
  n4: {
    saviez_vous: "Chez le patient diabétique, la mycose du pied n'est jamais anodine — les fissures cutanées qu'elle provoque constituent une porte d'entrée potentielle pour des infections bactériennes graves pouvant évoluer vers un pied diabétique infecté, complication redoutée pouvant aller jusqu'à l'amputation dans les formes les plus sévères, justifiant un dépistage et un traitement précoce et rigoureux de toute mycose du pied chez cette population à risque spécifique.",
    physiopatho: "Spécificités du pied diabétique et risque infectieux : la neuropathie périphérique diabétique (réduction de la sensibilité protectrice) associée à l'artériopathie diabétique (réduction de la vascularisation et donc de la capacité de défense immunitaire locale et de cicatrisation) créent un terrain particulièrement propice à la complication infectieuse de toute lésion cutanée, même mineure en apparence comme une fissure mycosique interdigitale → cette vulnérabilité accrue explique pourquoi une simple mycose du pied, bénigne chez le sujet non diabétique, peut constituer le point de départ d'une infection grave (cellulite, ostéite) chez le patient diabétique, particulièrement en cas de mauvais contrôle glycémique associé.",
    recommandations: "HAS / Podologie diabétique — Mycose du pied : traitement antifongique précoce et rigoureux systématique chez tout patient diabétique, en raison du risque accru de complication infectieuse. Surveillance régulière des pieds recommandée chez le patient diabétique (auto-examen quotidien, consultation podologique régulière). Mesures d'hygiène et de prévention renforcées (séchage soigneux, chaussures adaptées, éviter la marche pieds nus dans les lieux collectifs) particulièrement importantes dans cette population à risque.",
    situations_complexes: "Mycose du pied chez le patient diabétique avec signes de surinfection (rougeur extensive, chaleur, écoulement, fièvre) : urgence relative nécessitant une prise en charge rapide (antibiothérapie systémique, évaluation de l'atteinte vasculaire et neurologique associée) en raison du risque évolutif vers une infection grave du pied diabétique pouvant menacer le membre.\n\nMycose du pied chez l'immunodéprimé : risque accru de forme extensive ou de surinfection, vigilance accrue et traitement précoce recommandés, seuil d'orientation spécialisée abaissé par rapport au sujet immunocompétent.\n\nDermatophytide (réaction d'hypersensibilité à distance du foyer mycosique, notamment aux mains en réaction à une mycose du pied) : entité particulière où une éruption peut apparaître à distance du foyer infectieux initial par mécanisme immunologique plutôt que par dissémination directe du champignon, à reconnaître pour éviter un traitement antifongique inapproprié de la zone à distance qui ne contient pas réellement le champignon.",
    effets_secondaires: [
      {label:"Pied diabétique infecté à point de départ mycosique : complication grave pouvant évoluer vers une ostéite ou nécessiter une amputation", niveau:"danger"},
      {label:"Mycose du pied chez l'immunodéprimé : risque accru de forme extensive, seuil d'orientation spécialisée abaissé", niveau:"danger"},
      {label:"Dermatophytide méconnue : traitement antifongique inapproprié d'une zone ne contenant pas réellement le champignon", niveau:"warning"},
    ],
    classes: [
      {classe:"Antibiothérapie systémique — surinfection bactérienne du pied diabétique", dci:["Selon documentation microbiologique et protocole spécialisé"], specialites:["Prise en charge spécialisée podologie diabétique"], couleur:"#C0392B", remarque:"Urgence relative en cas de signes de surinfection chez le patient diabétique, évaluation vasculaire et neurologique associée systématique"},
      {classe:"Surveillance podologique régulière — prévention chez le diabétique", dci:["Consultation podologique régulière, non médicamenteux"], specialites:["Suivi spécialisé recommandé"], couleur:"#1B6B52", remarque:"Recommandée systématiquement chez le patient diabétique pour la détection précoce de toute lésion, y compris mycosique"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse spécifique supplémentaire notable pour cette section",
    ],
    points_cles: [
      "Mycose du pied chez le diabétique : jamais anodine, porte d'entrée potentielle pour une infection grave du pied diabétique",
      "Neuropathie et artériopathie diabétiques : terrain particulièrement propice à la complication infectieuse de toute lésion cutanée",
      "Signes de surinfection chez le diabétique : urgence relative nécessitant une prise en charge rapide et spécialisée",
      "Dermatophytide : réaction d'hypersensibilité à distance, à distinguer d'une dissémination directe pour éviter un traitement inapproprié",
      "Surveillance podologique régulière : recommandée systématiquement chez le patient diabétique pour la détection précoce des lésions",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F64 — ANGINE STREPTOCOCCIQUE (complémentaire à angine générale f23)
   ════════════════════════════════════════════════════════ */
FN['angine-streptococcique'] = {
  n2: {
    saviez_vous: "Le streptocoque bêta-hémolytique du groupe A (SGA) n'est responsable que d'environ 20-30% des angines chez l'enfant et 10-25% chez l'adulte — la majorité des angines restent d'origine virale, mais cette minorité bactérienne nécessite une identification précise car elle seule justifie une antibiothérapie, le test de diagnostic rapide (TDR) permettant cette distinction en quelques minutes directement au cabinet ou en pharmacie selon les habilitations.",
    physiopatho: "L'angine à streptocoque du groupe A résulte d'une infection bactérienne directe de la muqueuse pharyngée et des amygdales par cette bactérie, productrice de plusieurs toxines et facteurs de virulence (streptolysines, protéine M notamment) → la réponse inflammatoire locale intense explique la sévérité souvent plus marquée de l'angine streptococcique par rapport à l'angine virale (fièvre plus élevée, douleur pharyngée plus intense, adénopathies cervicales sensibles plus marquées) → au-delà des symptômes locaux, certains antigènes streptococciques peuvent déclencher, chez des sujets génétiquement prédisposés, une réponse immunitaire croisée responsable des complications post-streptococciques retardées (rhumatisme articulaire aigu, glomérulonéphrite post-streptococcique).",
    mecanisme: "Test de diagnostic rapide (TDR) à streptocoque : détection directe des antigènes de paroi du streptocoque du groupe A sur un prélèvement pharyngé, résultat en quelques minutes, permettant de différencier l'angine bactérienne (TDR positif, justifiant une antibiothérapie) de l'angine virale (TDR négatif, traitement symptomatique seul) sans attendre les résultats d'une culture bactérienne classique plus longue.\n\nAmoxicilline (traitement de référence) : inhibition de la synthèse de la paroi bactérienne, efficace sur le streptocoque du groupe A, traitement de 1ère intention visant non seulement le confort symptomatique mais surtout la prévention des complications post-streptococciques retardées par éradication bactérienne complète.",
    diagnostic: "Score de Mac Isaac (chez l'adulte) ou critères cliniques chez l'enfant orientant la probabilité d'une origine streptococcique avant réalisation du TDR, qui reste l'examen de référence pour la confirmation diagnostique avant toute décision d'antibiothérapie. Le TDR est recommandé systématiquement devant toute angine de l'enfant de plus de 3 ans (en deçà, l'angine streptococcique étant rare) et selon le score clinique chez l'adulte.",
    effets_secondaires: [
      {label:"Rhumatisme articulaire aigu : complication post-streptococcique retardée, devenue rare en France grâce à l'antibiothérapie précoce mais possible si non traitée", niveau:"danger"},
      {label:"Glomérulonéphrite post-streptococcique : autre complication retardée possible, atteinte rénale par mécanisme immunologique croisé", niveau:"danger"},
      {label:"Angine virale traitée par antibiotique à tort (TDR négatif non réalisé ou ignoré) : exposition inutile aux effets indésirables et aux résistances", niveau:"warning"},
    ],
    classes: [
      {classe:"Amoxicilline — traitement de référence", dci:["Amoxicilline 50mg/kg/j (enfant) ou 2g/j (adulte), 6 jours"], specialites:["Clamoxyl®"], couleur:"#1B6B52", remarque:"Traitement de 1ère intention si TDR positif, durée courte de 6 jours désormais recommandée (contre 10 jours auparavant)"},
      {classe:"Test de diagnostic rapide (TDR) — étape diagnostique indispensable", dci:["Prélèvement pharyngé, lecture en quelques minutes"], specialites:["Disponible en pharmacie selon habilitation, ou cabinet médical"], couleur:"#1E3A5F", remarque:"Indispensable avant toute décision d'antibiothérapie pour une angine, permet d'éviter une antibiothérapie inutile si négatif"},
    ],
    interactions: [
      "Amoxicilline + méthotrexate : ↑ toxicité du méthotrexate par réduction de sa clairance rénale — vigilance si association",
    ],
    points_cles: [
      "Streptocoque du groupe A : responsable de seulement 20-30% des angines chez l'enfant, 10-25% chez l'adulte",
      "TDR : examen de référence indispensable avant toute décision d'antibiothérapie, résultat en quelques minutes",
      "Amoxicilline 6 jours : traitement de référence désormais recommandé en durée courte si TDR positif",
      "Antibiothérapie : vise non seulement le confort symptomatique mais surtout la prévention des complications post-streptococciques",
      "Rhumatisme articulaire aigu et glomérulonéphrite : complications retardées devenues rares grâce à l'antibiothérapie précoce et adaptée",
    ],
  },
  n3: {
    saviez_vous: "Le rhumatisme articulaire aigu (RAA), quasiment disparu en France grâce à la généralisation de l'antibiothérapie précoce des angines streptococciques, reste un problème de santé publique majeur dans certains pays en développement où l'accès aux soins et aux antibiotiques est limité — cette différence épidémiologique illustre concrètement l'impact en santé publique d'une prise en charge antibiotique adaptée et accessible des infections streptococciques.",
    physiopatho: "Mécanisme du rhumatisme articulaire aigu : mimétisme moléculaire entre certains antigènes streptococciques (notamment la protéine M de paroi) et des protéines humaines présentes au niveau cardiaque (notamment valvulaire), articulaire, et parfois cérébral → chez des sujets génétiquement prédisposés, la réponse immunitaire dirigée contre le streptocoque peut secondairement attaquer ces tissus humains par réaction croisée, expliquant l'atteinte cardiaque (cardite, pouvant laisser des séquelles valvulaires définitives), articulaire (polyarthrite migratrice), et plus rarement neurologique (chorée de Sydenham) caractéristiques de cette complication retardée, survenant typiquement 2-3 semaines après l'épisode angineux initial.",
    pharmacocinetique: "Amoxicilline dans l'angine streptococcique : la durée de traitement courte (6 jours) désormais recommandée, contrairement aux 10 jours historiquement préconisés, repose sur des données démontrant une efficacité équivalente sur l'éradication bactérienne et la prévention des complications avec cette durée réduite, tout en limitant l'exposition antibiotique globale et la pression de sélection de résistances, illustrant l'évolution des recommandations vers des durées de traitement optimisées plutôt que systématiquement prolongées.",
    cas_clinique: "Enfant de 7 ans, angine fébrile avec TDR positif au streptocoque du groupe A, traité par amoxicilline. Les parents demandent si une consultation de contrôle est nécessaire après la fin du traitement. Que répondez-vous ?\n\nRaisonnement : angine streptococcique traitée précocement et adéquatement par amoxicilline → pas de consultation de contrôle systématique nécessaire en l'absence de symptôme persistant ou de complication, l'antibiothérapie bien conduite réduisant très significativement le risque de complications post-streptococciques retardées → conseil de surveillance des symptômes (résolution attendue en quelques jours) et d'orientation médicale rapide uniquement en cas de réapparition de fièvre, douleurs articulaires, ou autres symptômes inhabituels dans les semaines suivant l'épisode, évocateurs d'une complication retardée bien que devenue rare.",
    effets_secondaires: [
      {label:"Chorée de Sydenham : complication neurologique rare du RAA, mouvements involontaires caractéristiques pouvant apparaître plusieurs mois après l'épisode initial", niveau:"warning"},
      {label:"Cardite rhumatismale : peut laisser des séquelles valvulaires définitives si le RAA n'est pas traité précocement", niveau:"danger"},
      {label:"Durée de traitement antibiotique trop courte ou mal observée : risque théorique de réduction de l'effet préventif sur les complications", niveau:"warning"},
    ],
    classes: [
      {classe:"Amoxicilline 6 jours — schéma optimisé actuel", dci:["Amoxicilline 50mg/kg/j (enfant) ou 2g/j (adulte)"], specialites:["Clamoxyl®"], couleur:"#1B6B52", remarque:"Durée optimisée par rapport aux 10 jours historiques, efficacité équivalente démontrée sur l'éradication et la prévention des complications"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse spécifique supplémentaire notable pour cette section",
    ],
    points_cles: [
      "RAA : quasiment disparu en France, reste un problème de santé publique majeur dans les pays à accès limité aux soins",
      "Mimétisme moléculaire : mécanisme du RAA, réaction immunitaire croisée entre antigènes streptococciques et tissus humains",
      "Chorée de Sydenham : complication neurologique rare, mouvements involontaires pouvant apparaître plusieurs mois après l'épisode",
      "Durée de traitement courte (6 jours) : efficacité équivalente démontrée par rapport aux 10 jours historiques, limite l'exposition antibiotique",
      "Pas de consultation de contrôle systématique nécessaire après angine streptococcique bien traitée et sans symptôme persistant",
    ],
  },
  n4: {
    saviez_vous: "Le syndrome de choc toxique streptococcique, complication rare mais potentiellement gravissime de l'infection invasive à streptocoque du groupe A, illustre que cette bactérie habituellement responsable d'infections bénignes (angine, scarlatine) peut exceptionnellement provoquer des tableaux systémiques sévères avec défaillance multiviscérale — bien que ce tableau ne soit pas une complication directe de l'angine simple bien traitée, il souligne la virulence potentielle de cette bactérie dans des contextes spécifiques rares.",
    physiopatho: "Glomérulonéphrite post-streptococcique : mécanisme immunologique distinct du RAA, impliquant le dépôt de complexes immuns (antigènes streptococciques-anticorps) au niveau des glomérules rénaux → inflammation glomérulaire aiguë → syndrome néphritique aigu caractéristique (hématurie, œdèmes, hypertension artérielle, parfois insuffisance rénale aiguë), survenant typiquement 1-3 semaines après l'épisode infectieux streptococcique initial (angine ou infection cutanée), avec un pronostic généralement favorable chez l'enfant mais pouvant être plus réservé chez l'adulte.",
    recommandations: "SPILF / HAS — Angine streptococcique : TDR systématique avant toute antibiothérapie. Amoxicilline 6 jours en 1ère intention si TDR positif. Pas d'antibiothérapie si TDR négatif (traitement symptomatique seul). Vigilance sur les signes de complications post-streptococciques retardées (douleurs articulaires, signes cardiaques, œdèmes) dans les semaines suivant l'épisode, bien que devenues rares grâce à l'antibiothérapie précoce généralisée.",
    situations_complexes: "Scarlatine (toxine érythrogène du streptocoque du groupe A) : forme particulière d'infection streptococcique associant l'angine à une éruption cutanée scarlatiniforme caractéristique (érythème diffus à prédominance des plis), traitement antibiotique identique à l'angine streptococcique simple (amoxicilline), éviction scolaire recommandée pendant les 24-48 premières heures du traitement antibiotique.\n\nAngine streptococcique récidivante : situation parfois rencontrée, à distinguer du simple portage chronique asymptomatique de streptocoque (ne nécessitant pas de traitement répété), orientation ORL à discuter en cas de récidives fréquentes et documentées pour évaluer l'indication d'une amygdalectomie selon les critères spécifiques.\n\nSyndrome de choc toxique streptococcique : urgence réanimatoire rare mais gravissime, nécessitant une prise en charge hospitalière immédiate (antibiothérapie IV à forte dose, immunoglobulines IV dans certains protocoles, traitement symptomatique du choc), à distinguer formellement de l'angine streptococcique simple par la sévérité systémique du tableau clinique.",
    effets_secondaires: [
      {label:"Glomérulonéphrite post-streptococcique : syndrome néphritique aigu, pronostic généralement favorable chez l'enfant mais plus réservé chez l'adulte", niveau:"danger"},
      {label:"Syndrome de choc toxique streptococcique : urgence réanimatoire rare mais gravissime, défaillance multiviscérale possible", niveau:"danger"},
      {label:"Portage chronique asymptomatique de streptocoque confondu avec une récidive vraie : traitement antibiotique répété inutile si simple portage", niveau:"warning"},
    ],
    classes: [
      {classe:"Amygdalectomie — angines streptococciques récidivantes documentées sélectionnées", dci:["Chirurgie ORL selon critères spécifiques de récidive"], specialites:["Prise en charge chirurgicale ORL"], couleur:"#6B2D5E", remarque:"Option à discuter selon des critères de fréquence et de sévérité des récidives bien définis, après exclusion d'un simple portage chronique"},
      {classe:"Antibiothérapie IV + immunoglobulines — syndrome de choc toxique streptococcique", dci:["Prise en charge réanimatoire spécialisée selon protocole"], specialites:["Urgence hospitalière"], couleur:"#C0392B", remarque:"Urgence réanimatoire rare mais gravissime, prise en charge hospitalière immédiate indispensable"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse spécifique supplémentaire notable pour cette section au-delà de celles déjà mentionnées",
    ],
    points_cles: [
      "Glomérulonéphrite post-streptococcique : syndrome néphritique aigu, mécanisme distinct du RAA, survenant 1-3 semaines après l'infection",
      "Scarlatine : forme particulière avec éruption caractéristique, traitement identique à l'angine streptococcique simple",
      "Portage chronique asymptomatique : à distinguer d'une authentique récidive, ne nécessite pas de traitement antibiotique répété",
      "Syndrome de choc toxique streptococcique : urgence réanimatoire rare mais gravissime, à bien distinguer de l'angine simple",
      "Amygdalectomie : option pour les récidives fréquentes et documentées selon des critères spécifiques, après exclusion du simple portage",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F65 — ECZÉMA DES MAINS (forme spécifique, complémentaire à atopique et contact)
   ════════════════════════════════════════════════════════ */
FN['eczema-mains'] = {
  n2: {
    saviez_vous: "L'eczéma des mains est rarement de cause unique : il combine fréquemment plusieurs facteurs contributifs (terrain atopique constitutionnel, irritation professionnelle répétée par l'eau et les détergents, et parfois allergie de contact surajoutée) — cette origine souvent multifactorielle explique pourquoi l'identification d'une seule cause et son éviction isolée ne suffisent pas toujours à résoudre complètement le problème, nécessitant une approche globale combinant plusieurs mesures.",
    physiopatho: "Les mains sont particulièrement exposées aux agressions répétées de l'environnement (lavages fréquents, eau, détergents, solvants, port de gants occlusifs prolongé) sur une peau déjà naturellement plus fine et moins riche en glandes sébacées protectrices au niveau du dos des mains → cette exposition répétée fragilise progressivement la fonction barrière cutanée, même chez des sujets sans terrain atopique particulier → un cercle vicieux peut s'installer où l'altération de la barrière favorise la pénétration d'irritants ou d'allergènes, qui à leur tour aggravent l'inflammation et la dysfonction barrière, expliquant la chronicité fréquente de cette localisation particulière.",
    mecanisme: "Dermocorticoïdes adaptés à la paume (zone de peau épaisse) : nécessitent souvent une puissance plus forte que pour d'autres localisations en raison de l'épaisseur cutanée palmaire (contrairement au dos de la main, peau plus fine nécessitant une puissance plus modérée), illustrant l'importance d'adapter la puissance du dermocorticoïde non seulement à la sévérité mais aussi à la zone anatomique précise traitée au sein même de la main.\n\nÉmollients réparateurs renforcés : restauration de la fonction barrière palmo-dorsale, application répétée tout au long de la journée (notamment après chaque lavage des mains), élément central et quotidien de la prise en charge au-delà du seul traitement anti-inflammatoire ponctuel.",
    diagnostic: "Interrogatoire orienté sur le contexte professionnel (métiers à risque : santé, coiffure, restauration, nettoyage), les habitudes de lavage des mains, le terrain atopique personnel ou familial, et la chronologie d'apparition (amélioration le week-end ou en congés orientant vers une composante professionnelle/irritative). Topographie des lésions (paumes versus dos des mains versus espaces interdigitaux) pouvant orienter vers différents mécanismes contributifs.",
    effets_secondaires: [
      {label:"Eczéma des mains chronique non pris en charge globalement : impact fonctionnel et professionnel significatif (gestes du quotidien, manipulation d'objets)", niveau:"warning"},
      {label:"Lavages fréquents et excessifs des mains (notamment en milieu professionnel de santé) : aggravation de l'altération barrière malgré une intention hygiénique légitime", niveau:"warning"},
      {label:"Surinfection bactérienne ou fissures profondes douloureuses : complication possible d'un eczéma des mains sévère et négligé", niveau:"warning"},
    ],
    classes: [
      {classe:"Dermocorticoïdes puissance adaptée à la zone", dci:["Puissance forte pour les paumes, plus modérée pour le dos des mains"], specialites:["Diprosone®","Betneval®"], couleur:"#1B6B52", remarque:"Adaptation de la puissance selon la zone précise traitée (paume épaisse versus dos de main plus fin), élément souvent négligé"},
      {classe:"Émollients réparateurs renforcés — usage quotidien répété", dci:["Émollients riches, application après chaque lavage"], specialites:["Diverses formulations adaptées à la sévérité"], couleur:"#1E3A5F", remarque:"Élément central et quotidien de la prise en charge, à appliquer systématiquement après chaque contact avec l'eau"},
      {classe:"Gants de protection adaptés — milieu professionnel à risque", dci:["Gants en coton sous gants imperméables si besoin"], specialites:["Équipement de protection"], couleur:"#B45309", remarque:"Protection lors des tâches à risque (eau, détergents), gants en coton intérieurs pour absorber la transpiration et limiter l'occlusion délétère"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse systémique significative pour les traitements topiques à action locale",
    ],
    points_cles: [
      "Eczéma des mains : origine souvent multifactorielle (atopie, irritation professionnelle, allergie surajoutée), nécessite une approche globale",
      "Cercle vicieux barrière-inflammation : altération barrière favorisant la pénétration d'irritants, qui aggravent à leur tour l'inflammation",
      "Puissance du dermocorticoïde : à adapter selon la zone précise (paume épaisse versus dos de main plus fin)",
      "Émollients après chaque lavage : élément central et quotidien, au-delà du seul traitement anti-inflammatoire ponctuel",
      "Amélioration le week-end ou en congés : élément d'orientation important vers une composante professionnelle/irritative",
    ],
  },
  n3: {
    saviez_vous: "L'eczéma chronique des mains constitue l'une des principales causes de maladie professionnelle reconnue dans certains secteurs (santé, coiffure, restauration, nettoyage industriel), avec un impact économique et humain significatif — la prévention en milieu professionnel (protocoles de lavage adaptés, émollients à disposition, gants appropriés) constitue un enjeu de santé publique au travail, au-delà de la simple prise en charge thérapeutique individuelle de chaque cas.",
    physiopatho: "Dyshidrose (ou eczéma dyshidrosique) : forme particulière d'eczéma des mains (et parfois des pieds) caractérisée par de petites vésicules profondément enchâssées dans l'épiderme, très prurigineuses, touchant typiquement les faces latérales des doigts et les paumes — son mécanisme exact reste incomplètement élucidé, possiblement lié à une dysrégulation de la fonction des glandes sudorales palmo-plantaires associée à un terrain atopique ou à des facteurs déclenchants spécifiques (stress, certains aliments riches en nickel par voie systémique, exposition fongique à distance) plutôt qu'un authentique trouble de la sudation comme le suggérait son nom historique.",
    pharmacocinetique: "Dermocorticoïdes très puissants sous occlusion (paumes des mains, technique thérapeutique spécifique) : l'occlusion (pansement ou gant après application) augmente significativement la pénétration et l'efficacité du dermocorticoïde au niveau des paumes (zone de peau épaisse naturellement moins perméable), technique réservée aux formes sévères et résistantes en raison du risque accru d'effets indésirables locaux (atrophie) associé à cette majoration de pénétration, nécessitant une durée d'utilisation limitée et un encadrement médical.",
    cas_clinique: "Infirmière 35 ans, eczéma chronique des mains depuis plusieurs mois, lavages fréquents et utilisation répétée de solution hydroalcoolique dans le cadre professionnel, terrain atopique personnel connu dans l'enfance. Que proposez-vous ?\n\nRaisonnement : eczéma des mains multifactoriel évident (composante professionnelle irritative majeure par lavages répétés et solution hydroalcoolique, terrain atopique constitutionnel sous-jacent) → approche combinée nécessaire : dermocorticoïde adapté pour contrôler la poussée inflammatoire actuelle, émollients renforcés en application systématique après chaque lavage et solution hydroalcoolique, discussion avec la médecine du travail sur les protocoles d'hygiène des mains alternatifs (solutions moins irritantes si disponibles, gants appropriés pour certains gestes), reconnaissance éventuelle en maladie professionnelle si le retentissement est significatif et la composante professionnelle bien documentée.",
    effets_secondaires: [
      {label:"Dyshidrose : vésicules profondes très prurigineuses, mécanisme incomplètement élucidé, peut être très invalidante au quotidien", niveau:"warning"},
      {label:"Dermocorticoïdes très puissants sous occlusion répétés ou prolongés : risque accru d'atrophie cutanée locale", niveau:"warning"},
      {label:"Solution hydroalcoolique répétée en milieu professionnel : facteur irritant majeur, aggravation possible malgré l'intention hygiénique légitime", niveau:"warning"},
    ],
    classes: [
      {classe:"Dermocorticoïdes très puissants sous occlusion — formes sévères et résistantes des paumes", dci:["Clobétasol sous occlusion, durée limitée et encadrée"], specialites:["Dermoval®"], couleur:"#B45309", remarque:"Technique réservée aux formes sévères résistantes, durée limitée en raison du risque accru d'atrophie cutanée associé à l'occlusion"},
      {classe:"Protocoles d'hygiène des mains adaptés — milieu professionnel de santé", dci:["Solutions alternatives moins irritantes, émollients à disposition"], specialites:["Mesures organisationnelles en médecine du travail"], couleur:"#1E3A5F", remarque:"Discussion avec la médecine du travail pour adapter les protocoles d'hygiène tout en maintenant l'efficacité de la prévention infectieuse"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse spécifique supplémentaire notable pour cette section",
    ],
    points_cles: [
      "Eczéma chronique des mains : cause majeure de maladie professionnelle reconnue dans plusieurs secteurs à risque",
      "Dyshidrose : forme particulière avec vésicules profondes prurigineuses, mécanisme incomplètement élucidé",
      "Dermocorticoïdes sous occlusion : technique pour les formes sévères résistantes des paumes, durée limitée en raison du risque d'atrophie",
      "Solutions hydroalcooliques répétées : facteur irritant majeur en milieu professionnel de santé, malgré leur nécessité hygiénique",
      "Médecine du travail : interlocuteur essentiel pour adapter les protocoles d'hygiène en cas d'eczéma professionnel des mains",
    ],
  },
  n4: {
    saviez_vous: "Le pronostic professionnel de l'eczéma chronique des mains sévère et réfractaire peut nécessiter, dans les cas les plus invalidants, une reconversion professionnelle complète — une situation difficile sur le plan humain et social qui souligne l'importance d'une prise en charge précoce et préventive avant l'installation de lésions chroniques sévères, plutôt qu'une gestion tardive une fois la situation devenue critique pour le maintien dans l'emploi.",
    physiopatho: "Eczéma chronique des mains et altération durable de la barrière cutanée : au-delà d'un certain stade de chronicité, l'eczéma des mains peut s'accompagner d'une altération structurelle durable de la fonction barrière cutanée (même en l'absence de poussée inflammatoire active visible), avec une sensibilité accrue et persistante aux irritants même mineurs → ce phénomène, parfois qualifié de 'mémoire' de la peau lésée, explique pourquoi certains patients avec un eczéma chronique sévère des mains restent fragilisés au long cours même après contrôle apparent de l'inflammation, nécessitant une protection et des soins préventifs prolongés bien après la résolution clinique apparente.",
    recommandations: "HAS / Médecine du travail — Eczéma chronique des mains : approche multifactorielle systématique (recherche de composantes atopique, irritative, allergique). Dermocorticoïdes adaptés à la zone et la sévérité pour les poussées. Émollients renforcés en application quotidienne répétée comme socle de la prise en charge. Orientation vers la médecine du travail pour adaptation du poste si composante professionnelle significative. Discussion d'options systémiques (alitrétinoïne notamment, AMM spécifique) pour les formes sévères chroniques réfractaires aux traitements topiques bien conduits.",
    situations_complexes: "Eczéma chronique des mains sévère réfractaire aux traitements topiques bien conduits : discussion d'un traitement systémique spécifique (alitrétinoïne, rétinoïde ayant une AMM dédiée à cette indication précise) ou d'autres options systémiques (immunosuppresseurs, voire biothérapies plus récentes selon les recommandations actualisées) en milieu dermatologique spécialisé.\n\nReconversion professionnelle pour eczéma des mains invalidant : situation extrême mais réelle pour certains métiers à très forte exposition (santé, coiffure notamment), nécessitant un accompagnement médico-social spécifique (médecine du travail, parfois reconnaissance en maladie professionnelle ouvrant des droits spécifiques) au-delà du seul traitement dermatologique.\n\nEczéma des mains chez l'enfant et impact scolaire : bien que moins fréquemment évoqué que la composante professionnelle de l'adulte, l'eczéma des mains chez l'enfant peut avoir un impact sur les activités scolaires (écriture, activités manuelles, piscine) et sociales, justifiant une prise en charge active et une communication avec le milieu scolaire si nécessaire.",
    effets_secondaires: [
      {label:"Eczéma des mains chronique sévère réfractaire : peut nécessiter une reconversion professionnelle dans les cas les plus invalidants", niveau:"danger"},
      {label:"Altération durable de la barrière cutanée ('mémoire' de la peau lésée) : fragilité persistante même après contrôle apparent de l'inflammation", niveau:"warning"},
      {label:"Alitrétinoïne : tératogénicité, programme de prévention de grossesse nécessaire chez la femme en âge de procréer, comme pour l'isotrétinoïne", niveau:"danger"},
    ],
    classes: [
      {classe:"Alitrétinoïne — formes sévères chroniques réfractaires aux topiques", dci:["Alitrétinoïne 10-30mg/j selon prescription spécialisée"], specialites:["Toctino®"], couleur:"#C0392B", remarque:"AMM spécifique pour l'eczéma chronique des mains sévère réfractaire, programme de prévention de grossesse nécessaire (tératogénicité)"},
      {classe:"Accompagnement médico-social — situations professionnelles invalidantes", dci:["Médecine du travail, reconnaissance en maladie professionnelle si pertinent"], specialites:["Dispositifs d'accompagnement spécifiques"], couleur:"#1E3A5F", remarque:"Au-delà du seul traitement dermatologique, accompagnement essentiel dans les situations professionnelles les plus invalidantes"},
    ],
    interactions: [
      "Alitrétinoïne + autres rétinoïdes ou vitamine A : risque de surdosage en vitamine A — à éviter en association",
    ],
    points_cles: [
      "Eczéma chronique des mains sévère réfractaire : peut nécessiter une reconversion professionnelle dans les situations les plus invalidantes",
      "Altération durable de la barrière cutanée : fragilité persistante possible même après contrôle apparent de l'inflammation",
      "Alitrétinoïne : AMM spécifique pour les formes sévères chroniques réfractaires, programme de prévention de grossesse nécessaire",
      "Prise en charge précoce et préventive : essentielle avant l'installation de lésions chroniques sévères et leurs conséquences professionnelles",
      "Impact scolaire chez l'enfant : à considérer également, au-delà de la composante professionnelle classiquement évoquée chez l'adulte",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F66 — PEAU SENSIBLE
   ════════════════════════════════════════════════════════ */
FN['peau-sensible'] = {
  n2: {
    saviez_vous: "La 'peau sensible', motif de consultation cosmétique extrêmement fréquent (touchant selon les études jusqu'à 50-60% des femmes et 30-40% des hommes se déclarant concernés), n'est pas une entité dermatologique unique et bien définie sur le plan médical — elle correspond davantage à un syndrome subjectif regroupant des sensations désagréables (picotements, tiraillements, échauffement) en réponse à des facteurs habituellement bien tolérés, sans toujours de signe visible objectif associé.",
    physiopatho: "La peau sensible résulterait d'une altération, souvent subtile, de la fonction barrière cutanée (réduction du film hydrolipidique protecteur, légère augmentation de la perte insensible en eau) associée à une hyperréactivité des terminaisons nerveuses sensitives cutanées (notamment via certains récepteurs comme TRPV1, impliqués dans la perception de stimuli thermiques et chimiques) → cette combinaison abaisserait le seuil de déclenchement de sensations désagréables face à des stimuli variés (eau, certains cosmétiques, vent, variations de température) habituellement bien tolérés par une peau à fonction barrière normale.",
    mecanisme: "Émollients et produits dermo-cosmétiques formulés pour peaux sensibles (sans parfum, sans conservateur sensibilisant, formules minimalistes) : restauration et renforcement de la fonction barrière cutanée, réduction du nombre d'ingrédients potentiellement irritants ou sensibilisants → diminution de la fréquence et de l'intensité des sensations désagréables ressenties, approche essentiellement préventive et de soutien plutôt qu'un traitement curatif d'une pathologie définie.",
    diagnostic: "Diagnostic purement déclaratif et subjectif dans la majorité des cas, basé sur le ressenti rapporté par la personne elle-même, sans corrélation obligatoire avec des signes visibles à l'examen clinique. Il est essentiel d'éliminer une authentique pathologie dermatologique sous-jacente (rosacée, dermite séborrhéique, eczéma) qui pourrait expliquer une sensibilité cutanée réellement liée à une inflammation objectivable plutôt qu'à ce syndrome subjectif isolé.",
    effets_secondaires: [
      {label:"Multiplication de produits cosmétiques en réponse à la sensibilité ressentie : risque paradoxal d'aggravation par cumul d'ingrédients potentiellement irritants", niveau:"warning"},
      {label:"Pathologie dermatologique sous-jacente méconnue derrière une 'peau sensible' déclarée : retard diagnostique d'une cause objectivable et traitable", niveau:"warning"},
    ],
    classes: [
      {classe:"Émollients formulés peaux sensibles — soin de base quotidien", dci:["Formules minimalistes, sans parfum ni conservateur sensibilisant"], specialites:["Diverses gammes dermo-cosmétiques dédiées"], couleur:"#1B6B52", remarque:"Restauration de la fonction barrière, approche préventive de soutien plutôt qu'un traitement curatif d'une pathologie définie"},
      {classe:"Simplification de la routine cosmétique — conseil de base", dci:["Réduction du nombre de produits utilisés simultanément"], specialites:["Conseil non médicamenteux"], couleur:"#1E3A5F", remarque:"Permet d'identifier plus facilement un éventuel produit responsable d'une aggravation et de limiter le cumul d'ingrédients potentiellement irritants"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse pertinente pour cette section",
    ],
    points_cles: [
      "Peau sensible : syndrome subjectif fréquent, pas une entité dermatologique unique et bien définie sur le plan médical",
      "Altération barrière + hyperréactivité nerveuse sensitive : mécanismes combinés proposés pour expliquer ce syndrome",
      "Diagnostic déclaratif : essentiellement basé sur le ressenti rapporté, sans corrélation obligatoire avec des signes visibles",
      "Élimination d'une pathologie sous-jacente (rosacée, dermite séborrhéique) : étape essentielle avant de conclure à une simple peau sensible",
      "Simplification de la routine cosmétique : conseil de base utile pour limiter le cumul d'ingrédients potentiellement irritants",
    ],
  },
  n3: {
    saviez_vous: "Les tests de provocation cutanée utilisés en recherche dermatologique (notamment le test à l'acide lactique, substance provoquant une sensation de picotement chez les sujets ayant une peau réactive) ont permis d'objectiver scientifiquement l'existence d'une hyperréactivité cutanée mesurable chez certains sujets se déclarant 'peau sensible' — apportant une validation scientifique partielle à ce syndrome longtemps considéré comme purement subjectif et difficile à quantifier objectivement.",
    physiopatho: "Rôle du microbiome cutané dans la sensibilité cutanée : des recherches récentes suggèrent qu'un déséquilibre du microbiome cutané (diversité réduite, prolifération relative de certaines espèces bactériennes ou fongiques au détriment d'autres) pourrait contribuer à l'altération de la fonction barrière et à l'inflammation de bas grade associées à la peau sensible, ouvrant des perspectives pour des approches cosmétiques ciblant spécifiquement la restauration de l'équilibre du microbiome cutané (prébiotiques, postbiotiques topiques) en complément des approches barrière plus classiques.",
    pharmacocinetique: "Pénétration cutanée différentielle selon l'état de la barrière : chez les sujets à peau sensible avec altération barrière documentée, la pénétration de principes actifs topiques peut être modifiée (parfois augmentée pour certaines molécules en raison de la perméabilité accrue) par rapport à une peau à fonction barrière normale, élément à prendre en compte lors du choix et de la formulation de produits topiques chez cette population, justifiant des formulations spécifiquement adaptées plutôt qu'une simple réduction du nombre d'ingrédients.",
    cas_clinique: "Patiente 27 ans, sensation de picotement et d'échauffement du visage depuis plusieurs mois, aggravée par l'eau du robinet et certains cosmétiques, sans rougeur ni lésion visible à l'examen, plusieurs produits 'apaisants' essayés sans réelle amélioration. Que proposez-vous ?\n\nRaisonnement : tableau évocateur de peau sensible au sens syndromique (sensations subjectives sans signe objectif visible), échec de plusieurs produits essayés isolément → conseil de simplification radicale de la routine cosmétique (réduction au strict minimum : nettoyant doux, émollient formulé peau sensible, protection solaire adaptée), introduction progressive d'un seul produit à la fois pour identifier une éventuelle source d'aggravation, réévaluation après plusieurs semaines de cette approche simplifiée avant d'envisager des produits plus spécifiques ciblant le microbiome cutané si l'approche barrière simple s'avère insuffisante.",
    effets_secondaires: [
      {label:"Multiplication de produits 'apaisants' sans simplification de la routine globale : peut perpétuer le problème plutôt que le résoudre", niveau:"warning"},
      {label:"Déséquilibre du microbiome cutané : piste de recherche récente pouvant contribuer à la sensibilité cutanée chez certains sujets", niveau:"info"},
    ],
    classes: [
      {classe:"Produits ciblant le microbiome cutané — approche complémentaire émergente", dci:["Prébiotiques/postbiotiques topiques selon formulation"], specialites:["Gammes dermo-cosmétiques spécifiques émergentes"], couleur:"#6B2D5E", remarque:"Approche complémentaire aux soins barrière classiques, intérêt émergent mais données encore limitées sur l'efficacité comparative"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse pertinente pour cette section",
    ],
    points_cles: [
      "Test à l'acide lactique : objective scientifiquement l'hyperréactivité cutanée chez certains sujets à peau sensible déclarée",
      "Microbiome cutané : piste de recherche récente pour expliquer la sensibilité cutanée, ouvrant des perspectives thérapeutiques nouvelles",
      "Pénétration cutanée modifiée chez la peau sensible : à prendre en compte dans le choix des formulations topiques",
      "Simplification radicale de la routine : approche de référence avant d'envisager des produits plus spécifiques et ciblés",
      "Introduction progressive d'un seul produit à la fois : méthode utile pour identifier une éventuelle source d'aggravation",
    ],
  },
  n4: {
    saviez_vous: "La distinction entre 'peau sensible' (syndrome subjectif sans lésion visible) et rosacée débutante (pathologie dermatologique objectivable avec érythème et parfois papulo-pustules) peut être délicate aux stades les plus précoces de la rosacée, où l'érythème peut être discret et intermittent — cette zone grise diagnostique justifie une réévaluation dermatologique en cas de persistance ou d'aggravation des symptômes malgré une prise en charge cosmétique adaptée de la 'peau sensible' présumée.",
    physiopatho: "Sensibilité cutanée et inflammation neurogène : au-delà de la simple hyperréactivité des terminaisons nerveuses sensitives, certains chercheurs proposent un mécanisme d'inflammation neurogène où l'activation répétée de ces terminaisons nerveuses (via la libération de neuropeptides comme la substance P) entretiendrait elle-même une inflammation de bas grade locale, créant un cercle vicieux entre hyperréactivité nerveuse et inflammation cutanée subclinique — ce mécanisme, encore en cours de caractérisation, pourrait expliquer le chevauchement physiopathologique partiel observé entre peau sensible et certaines pathologies inflammatoires cutanées comme la rosacée.",
    recommandations: "Société Française de Dermatologie / Cosmétologie — Peau sensible : élimination systématique d'une pathologie dermatologique sous-jacente objectivable (rosacée, dermite séborrhéique, eczéma) avant de conclure à une simple peau sensible syndromique. Simplification de la routine cosmétique et utilisation de formulations adaptées (sans parfum, minimalistes) en 1ère intention. Réévaluation dermatologique recommandée en cas de persistance ou d'aggravation malgré une prise en charge cosmétique adaptée, pour ne pas méconnaître une authentique pathologie sous-jacente émergente.",
    situations_complexes: "Peau sensible et rosacée débutante : zone grise diagnostique aux stades précoces, nécessitant une réévaluation dermatologique en cas de doute persistant, particulièrement si un érythème, même discret et intermittent, devient progressivement plus visible ou permanent.\n\nPeau sensible chez l'enfant : à distinguer d'une authentique dermatite atopique débutante, où la sécheresse cutanée et les sensations désagréables peuvent être les premiers signes avant l'apparition de lésions eczémateuses plus typiques, justifiant une vigilance particulière chez l'enfant à terrain atopique familial.\n\nPeau sensible et exposition professionnelle (cosmétologie, coiffure, santé) : composante irritative professionnelle à rechercher systématiquement dans ce contexte, distincte d'une simple sensibilité cutanée constitutionnelle, pouvant nécessiter une approche combinée incluant des mesures de protection professionnelle spécifiques au-delà des seuls soins cosmétiques.",
    effets_secondaires: [
      {label:"Rosacée débutante méconnue sous couvert de 'peau sensible' : retard diagnostique et thérapeutique d'une pathologie dermatologique objectivable", niveau:"warning"},
      {label:"Dermatite atopique débutante chez l'enfant confondue avec une simple peau sensible : retard de prise en charge spécifique adaptée", niveau:"warning"},
      {label:"Composante professionnelle irritative non identifiée : persistance des symptômes malgré une prise en charge cosmétique isolée bien conduite", niveau:"warning"},
    ],
    classes: [
      {classe:"Réévaluation dermatologique spécialisée — persistance ou aggravation malgré prise en charge cosmétique", dci:["Consultation dermatologique pour diagnostic différentiel précis"], specialites:["Prise en charge spécialisée"], couleur:"#1E3A5F", remarque:"Recommandée en cas de doute diagnostique persistant, pour ne pas méconnaître une pathologie sous-jacente objectivable émergente"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse pertinente pour cette section",
    ],
    points_cles: [
      "Rosacée débutante : peut être confondue avec une simple peau sensible aux stades précoces, zone grise diagnostique à surveiller",
      "Inflammation neurogène : mécanisme proposé créant un cercle vicieux entre hyperréactivité nerveuse et inflammation cutanée subclinique",
      "Dermatite atopique débutante chez l'enfant : à distinguer d'une simple peau sensible, vigilance particulière si terrain atopique familial",
      "Composante professionnelle irritative : à rechercher systématiquement, distincte d'une sensibilité cutanée purement constitutionnelle",
      "Réévaluation dermatologique : recommandée en cas de persistance ou d'aggravation malgré une prise en charge cosmétique adaptée",
    ],
  },
};

/* ════════════════════════════════════════════════════════
   F67 — CICATRICES ET VERGETURES
   ════════════════════════════════════════════════════════ */
FN['cicatrices-vergetures'] = {
  n2: {
    saviez_vous: "Les vergetures ne sont pas de simples 'cicatrices d'étirement' comme on le pense souvent, mais résultent d'une véritable rupture des fibres de collagène et d'élastine du derme profond face à un étirement cutané rapide dépassant les capacités d'adaptation de la peau — une fois constituées, elles ne peuvent pas être totalement effacées par les traitements actuellement disponibles, ce qui rend la prévention, lorsqu'elle est possible, particulièrement précieuse.",
    physiopatho: "Les vergetures résultent d'un étirement cutané rapide (croissance pubertaire rapide, grossesse, prise de poids importante en peu de temps, certains traitements corticoïdes au long cours) dépassant la capacité d'adaptation du derme → rupture des fibres de collagène et d'élastine dans le derme profond → initialement, une phase inflammatoire (vergetures rouges ou violacées, parfois prurigineuses) correspond à une néovascularisation réactionnelle au niveau de la zone lésée, puis évolution progressive vers une phase atrophique définitive (vergetures blanches nacrées) où le tissu cicatriciel remplace définitivement le derme normal, sans possibilité de régénération complète des fibres initiales.",
    mecanisme: "Crèmes hydratantes et émollients (prévention) : maintien d'une bonne élasticité cutanée par hydratation optimale, bénéfice principalement préventif lors des périodes à risque (grossesse, croissance) plutôt qu'un effet curatif sur des vergetures déjà constituées, l'efficacité préventive elle-même restant débattue selon les études les plus rigoureuses.\n\nLaser vasculaire (vergetures rouges récentes) : cible la composante vasculaire de la phase inflammatoire initiale, traitement plus efficace sur les vergetures récentes encore rouges/violacées que sur les formes anciennes déjà blanches et atrophiques où la composante vasculaire active a disparu.",
    diagnostic: "Diagnostic clinique évident devant l'aspect typique des stries cutanées, initialement rouges/violacées puis évoluant en plusieurs mois vers une coloration blanche nacrée définitive. Localisation préférentielle selon le contexte (abdomen et seins en cas de grossesse, cuisses et fesses lors de croissance pubertaire rapide, zones d'application en cas de corticothérapie topique prolongée).",
    effets_secondaires: [
      {label:"Vergetures multiples et extensives sous corticothérapie (topique ou systémique au long cours) : signal d'un possible surdosage ou usage inapproprié à réévaluer", niveau:"warning"},
      {label:"Vergetures blanches atrophiques constituées : ne peuvent pas être totalement effacées, traitement visant essentiellement l'atténuation", niveau:"info"},
    ],
    classes: [
      {classe:"Crèmes hydratantes — prévention pendant les périodes à risque", dci:["Émollients riches, application régulière pendant la grossesse ou la croissance"], specialites:["Diverses gammes dédiées prévention vergetures"], couleur:"#1B6B52", remarque:"Bénéfice préventif débattu selon les études les plus rigoureuses, mais geste simple et sans risque à recommander pendant les périodes à risque"},
      {classe:"Laser vasculaire — vergetures rouges récentes", dci:["Laser ciblant la composante vasculaire, séances multiples"], specialites:["Réalisé en milieu dermatologique spécialisé"], couleur:"#1E3A5F", remarque:"Plus efficace sur les vergetures récentes encore rouges que sur les formes anciennes blanches atrophiques"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse pertinente pour les soins topiques préventifs habituels",
    ],
    points_cles: [
      "Vergetures : rupture véritable des fibres de collagène et d'élastine, pas de simples marques d'étirement superficielles",
      "Phase rouge/violacée initiale puis blanche nacrée définitive : évolution typique sur plusieurs mois, traduisant la cicatrisation atrophique",
      "Vergetures blanches constituées : ne peuvent pas être totalement effacées par les traitements actuellement disponibles",
      "Laser vasculaire : plus efficace sur les vergetures récentes encore rouges que sur les formes anciennes blanches",
      "Vergetures multiples extensives sous corticothérapie : signal d'un possible surdosage ou usage inapproprié à réévaluer",
    ],
  },
  n3: {
    saviez_vous: "La microneedling (induction percutanée de collagène par micro-perforations contrôlées) et certains lasers fractionnés non ablatifs ont montré une efficacité modeste mais documentée pour atténuer l'aspect des cicatrices et des vergetures anciennes, par stimulation d'un processus de remodelage du collagène dermique — ces techniques, bien que ne permettant jamais un effacement complet, représentent une avancée par rapport aux options purement cosmétiques topiques pour les lésions déjà constituées et anciennes.",
    physiopatho: "Cicatrices hypertrophiques et chéloïdes : à distinguer des cicatrices normales par une prolifération excessive et anarchique du tissu cicatriciel (fibroblastique principalement), les cicatrices hypertrophiques restant limitées aux contours de la lésion initiale et pouvant régresser partiellement avec le temps, tandis que les chéloïdes s'étendent au-delà des limites de la lésion initiale et ne régressent généralement pas spontanément — cette distinction est importante car elle conditionne le pronostic et la stratégie thérapeutique, certaines zones anatomiques (sternum, épaules, lobes d'oreilles) et certains terrains génétiques (peau plus pigmentée notamment) étant plus à risque de développer ces formes excessives de cicatrisation.",
    pharmacocinetique: "Corticoïdes intralésionnels (cicatrices hypertrophiques/chéloïdes) : injection directe dans le tissu cicatriciel permettant une concentration locale très élevée avec une diffusion systémique minime, mécanisme d'action anti-fibroblastique et anti-inflammatoire réduisant la prolifération excessive du tissu cicatriciel, traitement de référence pour ces formes excessives de cicatrisation mais nécessitant souvent plusieurs séances espacées pour un résultat optimal.",
    cas_clinique: "Patiente 24 ans, cicatrice chéloïde sur le lobe de l'oreille suite à un piercing il y a 1 an, lésion volumineuse, ferme, dépassant largement les limites du piercing initial, sans tendance à la régression spontanée. Que proposez-vous ?\n\nRaisonnement : tableau typique de chéloïde (extension au-delà des limites de la lésion initiale, absence de régression spontanée, localisation classique du lobe de l'oreille) → orientation vers un traitement spécifique (corticoïdes intralésionnels en 1ère intention, plusieurs séances espacées généralement nécessaires), information sur le risque de récidive même après traitement (les chéloïdes ayant une tendance récidivante propre), discussion d'options complémentaires (pression locale, silicone topique) en prévention de récidive après traitement initial, plutôt qu'une simple attente d'une régression spontanée qui ne survient généralement pas pour ce type de cicatrisation excessive.",
    effets_secondaires: [
      {label:"Chéloïdes : tendance récidivante propre même après traitement bien conduit, nécessitant souvent des mesures préventives complémentaires", niveau:"warning"},
      {label:"Corticoïdes intralésionnels répétés : risque d'atrophie cutanée locale ou de dépigmentation au site d'injection si usage excessif", niveau:"warning"},
    ],
    classes: [
      {classe:"Corticoïdes intralésionnels — cicatrices hypertrophiques/chéloïdes", dci:["Triamcinolone intralésionnelle, plusieurs séances espacées"], specialites:["Kenacort® retard injectable"], couleur:"#1B6B52", remarque:"Traitement de référence pour réduire le volume des cicatrices excessives, plusieurs séances généralement nécessaires"},
      {classe:"Plaques de silicone — prévention et traitement complémentaire", dci:["Application locale prolongée, plusieurs mois"], specialites:["Diverses gammes dédiées cicatrices"], couleur:"#1E3A5F", remarque:"Utile en prévention des cicatrices hypertrophiques/chéloïdes après chirurgie ou plaie, et en complément après traitement intralésionnel"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse systémique significative pour ces traitements à action locale",
    ],
    points_cles: [
      "Cicatrices hypertrophiques versus chéloïdes : distinction importante par l'extension au-delà des limites de la lésion initiale",
      "Chéloïdes : tendance récidivante propre, ne régressent généralement pas spontanément contrairement aux hypertrophiques",
      "Corticoïdes intralésionnels : traitement de référence pour réduire le volume des cicatrices excessives, plusieurs séances nécessaires",
      "Terrains à risque (peau plus pigmentée, certaines zones anatomiques) : prédisposition à développer ces formes excessives de cicatrisation",
      "Microneedling et lasers fractionnés : efficacité modeste mais documentée pour les cicatrices et vergetures anciennes déjà constituées",
    ],
  },
  n4: {
    saviez_vous: "La prévention des cicatrices pathologiques (hypertrophiques, chéloïdes) commence dès la prise en charge initiale de la plaie elle-même — une fermeture chirurgicale soigneuse sans tension excessive, une protection solaire rigoureuse de la cicatrice en formation, et l'application précoce de silicone topique chez les patients à terrain prédisposé connu peuvent réduire significativement le risque de développer ces complications cicatricielles, justifiant une anticipation dès la phase aiguë plutôt qu'une prise en charge uniquement réactive une fois la cicatrice pathologique constituée.",
    physiopatho: "Mécanismes moléculaires de la fibrose cicatricielle excessive : la prolifération fibroblastique anormale des chéloïdes et cicatrices hypertrophiques impliquerait une dérégulation de la voie de signalisation du TGF-bêta (facteur de croissance transformant, impliqué normalement dans la régulation de la cicatrisation), avec une production excessive et prolongée de collagène par les fibroblastes, ainsi qu'une résistance accrue à l'apoptose normale de ces fibroblastes en fin de processus de cicatrisation physiologique → cette compréhension moléculaire ouvre des perspectives pour des traitements ciblés plus spécifiques (anti-TGF-bêta notamment) actuellement en cours de développement, au-delà des traitements symptomatiques actuels (corticoïdes, chirurgie).",
    recommandations: "Société Française de Dermatologie / Chirurgie plastique — Cicatrices pathologiques et vergetures : prévention dès la prise en charge initiale de toute plaie (fermeture soigneuse, protection solaire, silicone topique précoce si terrain à risque connu). Corticoïdes intralésionnels en 1ère intention pour les cicatrices hypertrophiques/chéloïdes constituées. Laser vasculaire pour les vergetures récentes encore rouges. Information systématique sur les limites des traitements disponibles pour les lésions anciennes déjà constituées (absence d'effacement complet possible).",
    situations_complexes: "Chirurgie programmée chez un patient à terrain prédisposé aux chéloïdes (antécédent personnel ou familial documenté) : discussion préopératoire de mesures préventives renforcées (technique chirurgicale adaptée, silicone topique précoce post-opératoire, parfois corticothérapie intralésionnelle préventive selon le contexte), anticipation essentielle plutôt qu'une gestion uniquement réactive après constitution de la cicatrice pathologique.\n\nVergetures et grossesse chez une patiente très préoccupée esthétiquement : information honnête sur les limites de l'efficacité préventive démontrée des crèmes hydratantes, sans pour autant décourager leur utilisation (geste simple et sans risque), tout en évitant de créer des attentes irréalistes quant à une prévention garantie.\n\nCicatrices chéloïdes récidivantes malgré traitements répétés : orientation vers des approches combinées multimodales (corticoïdes intralésionnels associés à la cryothérapie ou au laser, parfois exérèse chirurgicale suivie immédiatement de mesures préventives renforcées) en milieu dermatologique ou chirurgical spécialisé, reconnaissant la difficulté thérapeutique de ces formes récidivantes.",
    effets_secondaires: [
      {label:"Chéloïdes récidivantes multiples malgré traitements répétés : situation thérapeutiquement difficile nécessitant une approche combinée spécialisée", niveau:"warning"},
      {label:"Absence de prévention chez un patient à terrain prédisposé connu avant une chirurgie programmée : risque accru de cicatrice pathologique évitable", niveau:"warning"},
    ],
    classes: [
      {classe:"Approche combinée multimodale — chéloïdes récidivantes réfractaires", dci:["Corticoïdes intralésionnels + cryothérapie ou laser selon protocole spécialisé"], specialites:["Prise en charge dermatologique/chirurgicale spécialisée"], couleur:"#6B2D5E", remarque:"Réservée aux formes récidivantes malgré traitements répétés, reconnaissant la difficulté thérapeutique propre à ces situations"},
      {classe:"Silicone topique précoce préventif — terrain prédisposé identifié", dci:["Application dès la cicatrisation initiale chez les patients à risque connu"], specialites:["Diverses gammes dédiées"], couleur:"#1B6B52", remarque:"Mesure préventive à anticiper dès la prise en charge de la plaie chez les patients à terrain prédisposé documenté"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse spécifique supplémentaire notable pour cette section",
    ],
    points_cles: [
      "Prévention des cicatrices pathologiques : commence dès la prise en charge initiale de la plaie, anticipation essentielle chez le terrain prédisposé",
      "Voie de signalisation du TGF-bêta : dérégulation impliquée dans la fibrose cicatricielle excessive, perspective pour des traitements ciblés futurs",
      "Terrain prédisposé connu avant chirurgie programmée : justifie des mesures préventives renforcées anticipées",
      "Information honnête sur les limites des traitements préventifs (crèmes hydratantes pour les vergetures) : importante pour éviter des attentes irréalistes",
      "Chéloïdes récidivantes réfractaires : approche combinée multimodale en milieu spécialisé, reconnaissant la difficulté thérapeutique propre",
    ],
  },
};

FN['mal-de-gorge'] = {
  n2: {
    saviez_vous: "La grande majorité des maux de gorge (pharyngites) sont d'origine virale (70-90% selon les études), et seule une minorité est due au streptocoque du groupe A — distinction essentielle car elle conditionne directement la pertinence (ou non) d'une antibiothérapie, trop souvent prescrite par excès de précaution alors que les scores cliniques validés (score de Mac Isaac) permettent une orientation fiable sans recours systématique aux antibiotiques.",
    physiopatho: "Inflammation de la muqueuse pharyngée (et souvent amygdalienne associée) déclenchée le plus souvent par une infection virale (rhinovirus, adénovirus, virus de la grippe, coronavirus saisonniers...) → réaction inflammatoire locale avec œdème et hyperhémie de la muqueuse → stimulation des récepteurs sensitifs locaux expliquant la douleur, parfois associée à une réaction ganglionnaire cervicale satellite selon l'agent causal.",
    mecanisme: "Antalgiques locaux (anesthésiques type lidocaïne, antiseptiques type chlorhexidine ou hexétidine en pastilles/sprays) : action directe sur la muqueuse pharyngée, effet symptomatique de surface sans action sur la cause sous-jacente, intérêt principalement pour le confort en attendant la résolution spontanée dans les formes virales.\n\nAINS locaux (flurbiprofène en pastilles) : action anti-inflammatoire locale, efficacité symptomatique démontrée sur la douleur à très court terme, à utiliser sur une durée limitée.",
    diagnostic: "Score de Mac Isaac (fièvre, absence de toux, adénopathies cervicales sensibles, exsudat amygdalien, âge) : outil clinique simple permettant d'estimer la probabilité d'une origine streptococcique et d'orienter vers la réalisation ou non d'un test de diagnostic rapide (TDR) en pharmacie ou chez le médecin avant d'envisager une antibiothérapie — démarche qui limite le recours inutile aux antibiotiques dans les formes virales très majoritaires.",
    effets_secondaires: [
      {label:"Antibiothérapie systématique sans TDR ni score clinique : surprescription fréquente alors que la cause est très majoritairement virale", niveau:"warning"},
      {label:"Anesthésiques locaux chez le jeune enfant : risque de fausse route par diminution de la sensibilité pharyngée si dose excessive", niveau:"warning"},
      {label:"Aspirine chez l'enfant/adolescent en contexte viral : CI formelle (syndrome de Reye)", niveau:"danger"},
    ],
    classes: [
      {classe:"Antalgiques locaux — confort symptomatique", dci:["Lidocaïne","Hexétidine","Chlorhexidine"], specialites:["Strepsils®","Drill®","Eludril®"], couleur:"#1B6B52", remarque:"Action de surface, plusieurs prises par jour, intérêt principalement sur le confort en attendant la résolution spontanée"},
      {classe:"AINS locaux — douleur pharyngée", dci:["Flurbiprofène"], specialites:["Strepfen®"], couleur:"#1E3A5F", remarque:"Efficacité démontrée à court terme, durée d'utilisation limitée, mêmes précautions que les AINS systémiques bien que la résorption soit faible"},
      {classe:"Antalgique systémique de 1ère intention", dci:["Paracétamol"], specialites:["Doliprane®","Efferalgan®"], couleur:"#B45309", remarque:"Antalgique de référence pour la douleur pharyngée associée à la fièvre, bien toléré chez l'enfant comme l'adulte"},
    ],
    interactions: [
      "AINS locaux + AINS ou aspirine systémiques : risque cumulatif d'effets indésirables digestifs malgré la faible résorption locale",
    ],
    points_cles: [
      "70-90% des maux de gorge sont viraux : pas d'antibiothérapie systématique nécessaire",
      "Score de Mac Isaac : outil simple pour orienter vers un TDR avant d'envisager une antibiothérapie",
      "Antalgiques/antiseptiques locaux : confort symptomatique, pas d'action sur la cause virale",
      "Aspirine CI formelle chez l'enfant/adolescent en contexte viral (syndrome de Reye)",
      "Difficulté à avaler la salive ou la respiration : signe d'alerte nécessitant une consultation urgente",
    ],
  },
  n3: {
    saviez_vous: "La mononucléose infectieuse (virus EBV) doit être évoquée devant une pharyngite très inflammatoire avec exsudat important, associée à une asthénie marquée et des adénopathies diffuses (pas seulement cervicales) chez l'adolescent ou le jeune adulte — un piège classique est la prescription d'amoxicilline devant ce tableau pris à tort pour une angine streptococcique, l'amoxicilline pouvant alors déclencher une éruption cutanée caractéristique (rash) qui, bien que non allergique au sens strict, est souvent interprétée comme telle et étiquette à tort le patient comme allergique à la pénicilline.",
    physiopatho: "Pharyngite à streptocoque du groupe A : adhésion bactérienne facilitée par des protéines de surface (protéine M notamment), production de toxines pouvant être responsables du tableau de scarlatine dans certains sérotypes, réaction inflammatoire locale intense expliquant l'érythème et l'exsudat amygdalien caractéristiques de cette étiologie bactérienne par rapport aux formes virales généralement moins exsudatives.",
    pharmacocinetique: "Amoxicilline (traitement de référence de l'angine streptococcique confirmée) : bonne biodisponibilité orale, durée de traitement courte (6 jours selon les recommandations actuelles françaises, par rapport aux 10 jours historiques), permettant une meilleure observance tout en maintenant l'efficacité clinique démontrée par les études de non-infériorité.",
    cas_clinique: "Adolescent 16 ans, mal de gorge depuis 4 jours, fièvre 38,8°C, fatigue importante depuis une semaine, amygdales très inflammatoires avec dépôts blanchâtres, ganglions cervicaux ET axillaires palpables. TDR streptococcique positif. Le médecin a prescrit de l'amoxicilline. Qu'évoquez-vous ?\n\nRaisonnement : le tableau (asthénie marquée depuis une semaine, adénopathies diffuses non limitées à la sphère cervicale) doit faire évoquer une possible mononucléose infectieuse associée ou plutôt qu'une simple angine streptococcique isolée — un TDR positif n'exclut pas une co-infection ou un portage asymptomatique de streptocoque chez un patient ayant en réalité une MNI. Si l'amoxicilline est prise dans ce contexte de MNI, un rash cutané peut apparaître, à ne pas confondre avec une authentique allergie à la pénicilline. Vigilance et information du patient/des parents sur ce point avant la délivrance.",
    effets_secondaires: [
      {label:"Rash à l'amoxicilline en contexte de MNI méconnue : faussement étiqueté comme allergie à la pénicilline, restriction thérapeutique ultérieure injustifiée", niveau:"warning"},
      {label:"Pharyngite streptococcique non traitée : risque rare mais réel de complications post-streptococciques (RAA, glomérulonéphrite)", niveau:"warning"},
    ],
    classes: [
      {classe:"Antibiothérapie de l'angine streptococcique confirmée", dci:["Amoxicilline (6 jours)"], specialites:["Clamoxyl®"], couleur:"#1B6B52", remarque:"Traitement de référence si TDR positif, durée courte de 6 jours selon les recommandations actuelles françaises"},
      {classe:"Alternative si allergie à la pénicilline documentée", dci:["Céphalosporine de 2e/3e génération ou macrolide selon profil"], specialites:["Selon prescription"], couleur:"#1E3A5F", remarque:"À réserver aux authentiques allergies documentées, ne pas confondre avec un rash en contexte de MNI"},
    ],
    interactions: [
      "Amoxicilline + contraception orale œstroprogestative : interaction classiquement enseignée mais actuellement débattue, prudence informative néanmoins habituelle",
    ],
    points_cles: [
      "MNI à évoquer devant pharyngite très inflammatoire + asthénie marquée + adénopathies diffuses chez l'adolescent/jeune adulte",
      "Rash à l'amoxicilline en contexte de MNI : ne pas l'interpréter à tort comme une allergie vraie à la pénicilline",
      "Antibiothérapie de l'angine streptococcique confirmée : amoxicilline 6 jours en 1ère intention en France actuellement",
      "TDR positif n'exclut pas une co-infection ou un portage asymptomatique associé à une autre cause (virale notamment MNI)",
      "Complications post-streptococciques (RAA, glomérulonéphrite) : rares mais justifient le traitement de l'angine streptococcique confirmée",
    ],
  },
  n4: {
    saviez_vous: "Le syndrome de PFAPA (Periodic Fever, Aphthous stomatitis, Pharyngitis, Adenitis), bien que rare, doit être évoqué chez l'enfant présentant des épisodes récurrents et stéréotypés de fièvre associée à une pharyngite, des aphtes et des adénopathies cervicales, suivis d'un intervalle totalement asymptomatique — diagnostic clinique d'élimination après avoir écarté les causes infectieuses récurrentes plus classiques, orientant vers une prise en charge spécialisée pédiatrique différente d'une simple succession de pharyngites virales banales.",
    physiopatho: "Pharyngites récidivantes chez l'enfant : au-delà des causes infectieuses classiques (virales itératives, streptococciques récidivantes), penser aux causes non infectieuses récurrentes (PFAPA, certaines fièvres périodiques génétiques rares) lorsque le tableau clinique présente une périodicité stéréotypée inhabituelle pour de simples infections itératives banales, justifiant une orientation spécialisée pédiatrique pour exploration approfondie.",
    recommandations: "HAS — Angine de l'enfant et de l'adulte : démarche diagnostique structurée par le score de Mac Isaac puis TDR si score favorable, antibiothérapie réservée aux formes streptococciques confirmées avec une durée de traitement raccourcie (6 jours pour l'amoxicilline) par rapport aux recommandations historiques, dans un objectif de réduction de la pression de sélection antibiotique à l'échelle populationnelle.",
    situations_complexes: "Pharyngites récidivantes inexpliquées chez l'enfant avec périodicité stéréotypée : penser au syndrome de PFAPA, orientation spécialisée pédiatrique pour confirmation diagnostique et discussion thérapeutique adaptée (corticothérapie courte lors des poussées dans certains protocoles).\n\nAngine streptococcique à répétition avec complications locales (phlegmon péri-amygdalien récidivant) : discussion d'une amygdalectomie en milieu ORL spécialisé selon la fréquence et la sévérité des épisodes.\n\nPharyngite chez l'immunodéprimé ou avec signes systémiques marqués inexpliqués : élargir la démarche diagnostique au-delà des causes habituelles, orientation spécialisée rapide.",
    effets_secondaires: [
      {label:"PFAPA méconnu : succession de prescriptions antibiotiques inutiles pour des épisodes en réalité non infectieux", niveau:"warning"},
      {label:"Phlegmon péri-amygdalien méconnu ou traité tardivement : risque de complication locale grave nécessitant un drainage chirurgical", niveau:"danger"},
    ],
    classes: [
      {classe:"Corticothérapie courte — poussées de PFAPA en milieu spécialisé", dci:["Prednisone ou équivalent, protocole spécialisé"], specialites:["Prise en charge pédiatrique spécialisée"], couleur:"#6B2D5E", remarque:"Réservée aux formes confirmées de PFAPA suivies en milieu spécialisé, efficacité souvent spectaculaire sur les poussées"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse spécifique supplémentaire notable pour cette section",
    ],
    points_cles: [
      "PFAPA : à évoquer devant pharyngites récidivantes stéréotypées avec fièvre, aphtes, adénopathies et intervalles libres complets",
      "Réduction de la durée d'antibiothérapie de l'angine streptococcique (6 jours) : objectif de limitation de la pression de sélection antibiotique",
      "Phlegmon péri-amygdalien récidivant : discussion d'amygdalectomie en milieu ORL spécialisé",
      "Pharyngite chez l'immunodéprimé : démarche diagnostique élargie au-delà des causes virales/streptococciques habituelles",
      "PFAPA méconnu : risque de prescriptions antibiotiques répétées inutiles pour une cause non infectieuse",
    ],
  },
};

FN['toux-grasse'] = {
  n2: {
    saviez_vous: "Contrairement à une idée reçue très répandue, supprimer une toux grasse avec un antitussif n'est pas un service rendu au patient : cette toux a un rôle protecteur d'évacuation des sécrétions bronchiques, et la bloquer favorise leur stagnation, augmentant le risque de surinfection — c'est pourquoi les antitussifs sont contre-indiqués en cas de toux productive, contrairement à la toux sèche où ils peuvent être utiles au confort.",
    physiopatho: "La toux grasse (productive) résulte d'une hypersécrétion bronchique (le plus souvent d'origine virale en phase aiguë) stimulant les récepteurs tussigènes pour évacuer les sécrétions accumulées dans l'arbre bronchique → mécanisme protecteur naturel visant à maintenir la perméabilité des voies aériennes, par opposition à la toux sèche qui résulte d'une irritation directe sans hypersécrétion associée.",
    mecanisme: "Mucolytiques/expectorants (carbocistéine, acétylcystéine) : action revendiquée sur la viscosité des sécrétions bronchiques pour en faciliter l'évacuation, efficacité clinique modeste et débattue selon les méta-analyses récentes, intérêt principalement sur le confort lors de l'expectoration plutôt qu'un bénéfice majeur démontré sur la durée de la toux.\n\nHydratation et humidification de l'air : mesures non médicamenteuses contribuant à fluidifier naturellement les sécrétions, souvent sous-estimées par rapport aux traitements médicamenteux alors qu'elles ont un rôle réel.",
    diagnostic: "Distinction toux grasse versus toux sèche : élément clé orientant la conduite à tenir, en particulier sur la pertinence ou non d'un antitussif (contre-indiqué en cas de toux grasse). Évaluation de la durée (aiguë < 3 semaines, le plus souvent virale, versus chronique nécessitant une exploration) et de la présence de signes associés (fièvre, dyspnée) orientant vers une cause sous-jacente potentielle.",
    effets_secondaires: [
      {label:"Antitussif prescrit ou pris en automédication sur une toux grasse : favorise la rétention des sécrétions, contre-productif", niveau:"danger"},
      {label:"Mucolytiques chez le nourrisson : certaines molécules déconseillées en raison du risque d'encombrement paradoxal", niveau:"warning"},
      {label:"Toux grasse fébrile persistante non explorée : retard diagnostique d'une surinfection bronchique ou pneumonie", niveau:"warning"},
    ],
    classes: [
      {classe:"Mucolytiques/expectorants — efficacité modeste mais usage répandu", dci:["Carbocistéine","Acétylcystéine"], specialites:["Rhinathiol®","Mucomyst®","Exomuc®"], couleur:"#1E3A5F", remarque:"Toujours associés à une bonne hydratation pour optimiser l'effet recherché, bénéfice clinique débattu selon les études récentes"},
      {classe:"Expectorant d'origine végétale — alternative douce", dci:["Lierre grimpant (feuille)"], specialites:["Prospan®","Bronchokod®"], couleur:"#1B6B52", remarque:"Souvent utilisé en pédiatrie, profil de tolérance favorable, efficacité clinique modérée mais réelle selon certaines études"},
      {classe:"Mesures non médicamenteuses essentielles", dci:["Hydratation, humidification de l'air"], specialites:["Non médicamenteux"], couleur:"#B45309", remarque:"Souvent sous-estimées, contribuent réellement à la fluidification des sécrétions et au confort respiratoire global"},
    ],
    interactions: [
      "Mucolytiques + antitussifs : association déconseillée par incohérence pharmacologique (l'un favorise l'expectoration, l'autre la supprime)",
    ],
    points_cles: [
      "Toux grasse = mécanisme protecteur d'évacuation des sécrétions, à ne jamais bloquer par un antitussif",
      "Antitussifs (codéine, pholcodine, dextromethorphane) : contre-indiqués formellement en cas de toux productive",
      "Mucolytiques/expectorants : efficacité clinique modeste, toujours associés à une bonne hydratation",
      "Hydratation et humidification de l'air : mesures simples mais réellement utiles, souvent sous-estimées",
      "Toux grasse fébrile persistante : signe d'alerte nécessitant une consultation pour écarter une surinfection",
    ],
  },
  n3: {
    saviez_vous: "La bronchiolite du nourrisson, cause très fréquente de toux grasse chez l'enfant de moins de 2 ans en période hivernale, a vu sa prise en charge profondément modifiée par les recommandations récentes de la HAS : les mucolytiques, antitussifs et la kinésithérapie respiratoire systématique ne sont plus recommandés en routine dans les formes simples, la prise en charge reposant désormais essentiellement sur le désencombrement nasal et la surveillance des signes de gravité, un changement de pratique majeur encore mal intégré par certains professionnels et parents habitués aux pratiques antérieures.",
    physiopatho: "Bronchiolite aiguë du nourrisson (virus respiratoire syncytial principalement) : inflammation et obstruction des petites voies aériennes par œdème, hypersécrétion et desquamation épithéliale → toux grasse caractéristique associée à une polypnée et parfois des sibilants/crépitants à l'auscultation, tableau clinique distinct de la toux grasse simple de l'adulte par le risque spécifique de détresse respiratoire chez le tout-petit.",
    pharmacocinetique: "Absence de traitement pharmacologique spécifique recommandé en routine dans la bronchiolite simple du nourrisson : les bronchodilatateurs, corticoïdes et antibiotiques n'ont pas démontré de bénéfice dans les formes non compliquées, contrairement à des pratiques antérieures parfois encore répandues, la prise en charge reposant sur des mesures de soutien (hydratation, désencombrement nasal, surveillance).",
    cas_clinique: "Nourrisson 4 mois, toux grasse depuis 2 jours, polypnée modérée, prend bien ses biberons, pas de signe de détresse respiratoire, température 37,8°C. Les parents demandent un sirop pour 'dégager les bronches'. Que répondez-vous ?\n\nRaisonnement : tableau évocateur de bronchiolite simple sans signe de gravité (alimentation conservée, pas de détresse respiratoire franche). Conformément aux recommandations actuelles, pas de mucolytique ni d'antitussif à proposer — orientation vers les mesures de soutien (désencombrement nasal au sérum physiologique, fractionnement des repas si besoin, surveillance de l'évolution). Explication aux parents du changement de pratique par rapport aux habitudes antérieures, avec critères de surveillance clairs justifiant une consultation si aggravation (refus de boire, détresse respiratoire, fièvre élevée persistante).",
    effets_secondaires: [
      {label:"Prescription ou délivrance de mucolytique/antitussif dans une bronchiolite simple : non conforme aux recommandations actuelles, sans bénéfice démontré", niveau:"warning"},
      {label:"Méconnaissance des signes de détresse respiratoire du nourrisson par l'entourage : retard à la consultation en cas d'aggravation", niveau:"danger"},
    ],
    classes: [
      {classe:"Mesures de soutien — bronchiolite simple du nourrisson", dci:["Désencombrement nasal au sérum physiologique, hydratation, fractionnement des repas"], specialites:["Non médicamenteux"], couleur:"#1B6B52", remarque:"Pilier de la prise en charge actuelle des formes simples, en remplacement des approches médicamenteuses antérieures non soutenues par les preuves"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse spécifique supplémentaire notable pour cette section",
    ],
    points_cles: [
      "Bronchiolite du nourrisson : mucolytiques, antitussifs et kinésithérapie respiratoire systématique non recommandés en routine selon la HAS",
      "Prise en charge actuelle : désencombrement nasal, hydratation, surveillance — changement de pratique important par rapport aux habitudes antérieures",
      "Signes de gravité à connaître et expliquer aux parents : refus de boire, détresse respiratoire, altération de l'état général",
      "Toux grasse du nourrisson : tableau clinique distinct de l'adulte par le risque spécifique de détresse respiratoire propre à cet âge",
      "Information des parents sur le changement de pratique : élément important de l'accompagnement pharmaceutique dans ce contexte",
    ],
  },
  n4: {
    saviez_vous: "La toux grasse chronique chez l'adulte fumeur de longue date doit systématiquement faire évoquer la possibilité d'une BPCO sous-jacente non encore diagnostiquée — la toux matinale productive ('toux du fumeur'), souvent banalisée par les patients eux-mêmes comme normale, est en réalité un signe d'alerte précoce trop souvent ignoré jusqu'à un stade avancé de la maladie, soulignant l'intérêt d'un dépistage spirométrique proactif chez ce terrain à risque plutôt que d'attendre les signes de dyspnée plus tardifs.",
    physiopatho: "Toux grasse chronique du fumeur : hypersécrétion bronchique chronique liée à l'inflammation et au remodelage des voies aériennes induits par le tabagisme prolongé, mécanisme initialement réversible à l'arrêt du tabac dans les phases précoces mais pouvant évoluer vers des altérations structurelles irréversibles (BPCO constituée) en cas de poursuite du tabagisme, justifiant l'intérêt d'une intervention précoce sur ce terrain.",
    recommandations: "HAS — Bronchiolite du nourrisson (2019) : recommandations ayant marqué un changement de pratique majeur, déconseillant les mucolytiques, antitussifs et la kinésithérapie respiratoire de désencombrement systématique dans les formes simples, recentrant la prise en charge sur les mesures de soutien et la surveillance des signes de gravité.\n\nGOLD Guidelines — BPCO : la toux productive chronique associée à un tabagisme significatif justifie une exploration spirométrique pour rechercher une BPCO sous-jacente, indépendamment de la présence ou non d'une dyspnée déjà ressentie par le patient.",
    situations_complexes: "Toux grasse chronique chez le fumeur sans dyspnée ressentie : ne pas se rassurer par l'absence de dyspnée, proposer une orientation vers une exploration spirométrique pour dépister une BPCO à un stade encore précoce où l'arrêt du tabac a le plus de bénéfice attendu.\n\nToux grasse chez l'immunodéprimé avec expectoration purulente abondante : élargir la démarche diagnostique (recherche de pathogènes atypiques, bilan d'imagerie), ne pas se limiter à une simple surinfection bronchique banale.\n\nToux grasse chronique avec bronchorrhée très abondante (> plusieurs centaines de mL/jour) : évoquer une dilatation des bronches (bronchectasies) sous-jacente, orientation pneumologique spécialisée pour exploration et prise en charge adaptée à cette pathologie structurelle distincte d'une simple toux grasse banale.",
    effets_secondaires: [
      {label:"Toux du fumeur banalisée comme 'normale' par le patient : retard de dépistage d'une BPCO constituée à un stade où l'intervention est moins bénéfique", niveau:"warning"},
      {label:"Bronchectasies méconnues devant une bronchorrhée abondante chronique : prise en charge inadaptée d'une pathologie structurelle spécifique", niveau:"warning"},
    ],
    classes: [
      {classe:"Sevrage tabagique — intervention prioritaire sur ce terrain", dci:["Substituts nicotiniques, varénicline selon profil"], specialites:["Nicopatch®","Champix®"], couleur:"#1B6B52", remarque:"Intervention la plus bénéfique sur ce terrain, à proposer systématiquement indépendamment du stade de toux/dyspnée déjà constaté"},
    ],
    interactions: [
      "Aucune interaction médicamenteuse spécifique supplémentaire notable pour cette section",
    ],
    points_cles: [
      "Toux grasse chronique du fumeur ('toux du fumeur') : signe d'alerte précoce de BPCO, ne pas banaliser comme normal",
      "Dépistage spirométrique proactif chez le fumeur avec toux productive chronique : pertinent même sans dyspnée ressentie",
      "Bronchectasies à évoquer devant une bronchorrhée chronique très abondante, pathologie structurelle distincte nécessitant une prise en charge spécialisée",
      "Recommandations HAS 2019 sur la bronchiolite : changement de pratique majeur, désencombrement et surveillance plutôt que traitements médicamenteux systématiques",
      "Sevrage tabagique : intervention la plus bénéfique chez le fumeur avec toux grasse chronique, à proposer systématiquement",
    ],
  },
};
