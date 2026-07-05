/* MediFiche — FORMATION_DB */

'use strict';

const FORMATION_DB = [
  {
    id:'f1', slug:'allergie-pollen', nom:'Allergie au pollen', icone:'/icons/pathologie/allergie-au-pollen.svg', categorie:'pathologie',
    cest_quoi: "Votre système immunitaire confond le pollen avec un envahisseur dangereux et déclenche une alerte générale — alors qu'il est en réalité totalement inoffensif. C'est cette fausse alerte qui provoque les éternuements, le nez qui coule et les yeux qui piquent.",
    saviez_vous: "1 Français sur 4 est allergique au pollen. Le rhume des foins n'existe pas — c'est une rhinite allergique déclenchée par le pollen, pas par le foin !",
    schema_id: 'allergie',
    physiopatho_court: "Le système immunitaire reconnaît à tort le pollen comme un ennemi. Il fabrique des anticorps IgE qui se fixent sur des cellules (mastocytes). Au prochain contact, ces cellules explosent et libèrent de l'histamine → rhinorrhée, prurit, larmoiements.",
    mecanisme_court: "Les antihistaminiques bloquent les récepteurs à l'histamine → plus de signal → plus de symptômes. Les corticoïdes nasaux réduisent l'inflammation globale de la muqueuse — plus puissants sur la congestion.",
    consequences: ["Risque d'évolution vers l'asthme (marche atopique)", "Sinusite chronique si non traité", "Altération du sommeil et des performances"],
    effets_secondaires: [
      {label:"Somnolence (antiH1 1G)", niveau:"danger"},
      {label:"Sécheresse buccale (antiH1 1G)", niveau:"warning"},
      {label:"Épistaxis (corticoïdes nasaux)", niveau:"info"},
      {label:"Céphalées légères (antiH1 2G)", niveau:"info"},
    ],
    classes_pharmacologiques: [
      {classe:"AntiH1 — 2e génération", dci:["Cétirizine","Loratadine","Bilastine"], specialites:["Zyrtec®","Clarityne®","Bilaska®"], couleur:"#1B6B52", remarque:"1ère intention — peu sédatifs"},
      {classe:"AntiH1 — 1e génération", dci:["Prométhazine","Dexchlorphéniramine"], specialites:["Phénergan®","Polaramine®"], couleur:"#B45309", remarque:"Sédatifs — usage très limité"},
      {classe:"Corticoïdes nasaux", dci:["Budésonide","Fluticasone","Mométasone"], specialites:["Rhinocort®","Avamys®","Nasonex®"], couleur:"#1E3A5F", remarque:"Supérieurs sur la congestion"},
      {classe:"Cromoglicate", dci:["Cromoglicate de sodium"], specialites:["Lomusol®","Cromo-Comod®"], couleur:"#6B2D5E", remarque:"Préventif — avant la saison"},
    ],
    points_cles:["AntiH1 2G = 1ère intention", "Cétirizine plus sédative que loratadine", "Corticoïde nasal > antiH1 sur la congestion", "Cromoglicate = préventif, débuter avant la saison", "Penser aura oculaire si yeux dominants"],
  },
  {
    id:'f2', slug:'asthme', nom:'Asthme', icone:'/icons/pathologie/asthme.svg', categorie:'pathologie',
    cest_quoi: "Vos bronches sont comme des tuyaux qui s'irritent facilement et se resserrent au moindre déclencheur (pollen, froid, effort, stress). L'air a alors du mal à passer — d'où l'essoufflement, les sifflements et la sensation d'oppression dans la poitrine.",
    saviez_vous: "L'asthme touche 4 millions de Français. David Beckham, Jesse Owens et Leonard DiCaprio sont asthmatiques. Le sport de haut niveau est tout à fait compatible avec un asthme bien contrôlé !",
    schema_id: 'asthme',
    physiopatho_court: "L'asthme repose sur 3 mécanismes : inflammation chronique de la bronche → œdème de la muqueuse, hyperréactivité bronchique → bronchospasme excessif, et remodelage à long terme si non traité. Résultat : tuyaux qui se ferment → dyspnée, sibilances, toux.",
    mecanisme_court: "Les β2-agonistes relaxent les muscles lisses bronchiques en quelques minutes (SABA = secours). Les corticoïdes inhalés réduisent l'inflammation chronique — traitement de FOND indispensable même sans symptômes. C'est comme éteindre le feu vs ouvrir une fenêtre.",
    consequences: ["Remodelage bronchique irréversible si non contrôlé", "Crises graves pouvant être mortelles", "Limitation des activités physiques", "Asthme chronique sévère"],
    effets_secondaires: [
      {label:"Candidose buccale (CSI)", niveau:"warning"},
      {label:"Tachycardie, tremblements (β2-agonistes)", niveau:"warning"},
      {label:"Dysphonie (CSI)", niveau:"info"},
      {label:"Hypokaliémie à fortes doses (β2)", niveau:"danger"},
    ],
    classes_pharmacologiques: [
      {classe:"β2-agonistes courte durée (SABA)", dci:["Salbutamol","Terbutaline"], specialites:["Ventoline®","Bricanyl®"], couleur:"#C0392B", remarque:"🚨 Traitement de secours uniquement"},
      {classe:"Corticoïdes inhalés (CSI)", dci:["Béclométasone","Budésonide","Fluticasone"], specialites:["Becotide®","Pulmicort®","Flixotide®"], couleur:"#1B6B52", remarque:"Traitement de fond essentiel"},
      {classe:"β2-agonistes longue durée (LABA)", dci:["Formotérol","Salmétérol"], specialites:["Foradil®","Serevent®"], couleur:"#1E3A5F", remarque:"Toujours associé aux CSI"},
      {classe:"Association CSI+LABA", dci:["Budésonide/formotérol","Fluticasone/salmétérol"], specialites:["Symbicort®","Seretide®"], couleur:"#6B2D5E", remarque:"Simplifie l'observance"},
      {classe:"Anti-leucotriènes", dci:["Montélukast"], specialites:["Singulair®"], couleur:"#B45309", remarque:"Asthme + rhinite associée"},
    ],
    points_cles:["Vérifier la technique d'inhalation à CHAQUE délivrance","SABA > 2×/semaine = asthme non contrôlé → médecin","CSI = traitement de fond, même sans symptômes","Bêta-bloquants absolument contre-indiqués (y compris collyres)","Rincer la bouche après CSI → prévention candidose"],
  },
  {
    id:'f3', slug:'constipation', nom:'Constipation', icone:'/icons/pathologie/constipation.svg', categorie:'pathologie',
    cest_quoi: "Vos intestins font transiter les selles trop lentement, qui s'asséchent et deviennent dures à évacuer — un peu comme une route où la circulation est ralentie et tout s'accumule. Sédentarité, manque d'eau ou de fibres sont les causes les plus fréquentes.",
    saviez_vous: "En France, 1 adulte sur 5 souffre de constipation. C'est la 2ème raison de consultation en gastro-entérologie après les douleurs abdominales. Les femmes sont 2× plus touchées que les hommes.",
    schema_id: 'constipation',
    physiopatho_court: "Le côlon absorbe trop d'eau sur des selles qui transitent trop lentement → selles dures et déshydratées difficiles à évacuer. Causes principales : sédentarité, déshydratation, manque de fibres, et souvent des médicaments (opioïdes, anticholinergiques, fer).",
    mecanisme_court: "Les laxatifs osmotiques (macrogol) attirent l'eau dans le côlon → selles plus molles. Les laxatifs stimulants activent directement les nerfs du côlon → mouvements plus fréquents. Le psyllium gonfle et augmente le volume des selles → péristaltisme stimulé.",
    consequences: ["Fécalome → urgence médicale chez le sujet âgé", "Hémorroïdes et fissures anales", "Douleurs abdominales chroniques", "Altération de la qualité de vie"],
    effets_secondaires: [
      {label:"Ballonnements, flatulences (macrogol/lactulose)", niveau:"info"},
      {label:"Crampes abdominales (stimulants)", niveau:"warning"},
      {label:"Hypokaliémie (stimulants au long cours)", niveau:"danger"},
      {label:"Malabsorption vitamines (paraffine)", niveau:"warning"},
    ],
    classes_pharmacologiques: [
      {classe:"Laxatifs osmotiques (PEG)", dci:["Macrogol 4000"], specialites:["Forlax®","Movicol®"], couleur:"#1B6B52", remarque:"1ère intention — très bien toléré"},
      {classe:"Laxatifs osmotiques sucrés", dci:["Lactulose"], specialites:["Duphalac®"], couleur:"#1E3A5F", remarque:"Ballonnements fréquents"},
      {classe:"Laxatifs stimulants", dci:["Bisacodyl","Séné"], specialites:["Dulcolax®","Tamarine®"], couleur:"#B45309", remarque:"Max 10 jours — pas au long cours"},
      {classe:"Laxatifs de lest", dci:["Psyllium"], specialites:["Métamucil®","Spagulax®"], couleur:"#6B2D5E", remarque:"Eau +++ obligatoire"},
    ],
    points_cles:["Macrogol = 1ère intention — efficace et bien toléré","Psyllium sans eau suffisante = aggrave la constipation","Stimulants réservés aux cures courtes < 10 jours","Chercher toujours une cause médicamenteuse","Alerte > 50 ans avec constipation récente → coloscopie"],
  },
  {
    id:'f4', slug:'diabete-type-2', nom:'Diabète type 2', icone:'/icons/dispositif/lecteur-de-glycemie.svg', categorie:'pathologie',
    cest_quoi: "Le sucre s'accumule dans votre sang au lieu d'entrer dans vos cellules pour les nourrir — comme une clé (l'insuline) qui ouvre de moins en moins bien la porte. Résultat : trop de sucre circule, ce qui abîme petit à petit les vaisseaux et les organes sur le long terme.",
    saviez_vous: "Le diabète type 2 représente 92% des diabètes. Il y a 4,5 millions de Français diabétiques — et 1 million qui s'ignorent. La metformine, découverte dans les années 50, reste le traitement de référence.",
    schema_id: 'diabete',
    physiopatho_court: "Double anomalie : les cellules deviennent résistantes à l'insuline (insulinorésistance) ET le pancréas s'épuise à produire de plus en plus d'insuline. Résultat : le sucre reste dans le sang → hyperglycémie chronique → lésions des vaisseaux.",
    mecanisme_court: "La metformine réduit la production de glucose par le foie — sans risque d'hypoglycémie. Les SGLT2 font pipi le sucre en excès dans les urines — avec un bonus cardiovasculaire. Les GLP-1 stimulent l'insuline uniquement quand la glycémie est haute — et coupe-faim.",
    consequences: ["Rétinopathie → risque de cécité", "Néphropathie → insuffisance rénale", "Neuropathie → douleurs, plaies chroniques", "Infarctus × 2-4, AVC × 1,5-3"],
    effets_secondaires: [
      {label:"Troubles digestifs (metformine)", niveau:"info"},
      {label:"Hypoglycémies (sulfamides, insuline)", niveau:"danger"},
      {label:"Infections urinaires/génitales (SGLT2)", niveau:"warning"},
      {label:"Nausées début de traitement (GLP-1)", niveau:"info"},
    ],
    classes_pharmacologiques: [
      {classe:"Biguanides", dci:["Metformine"], specialites:["Glucophage®","Stagid®"], couleur:"#1B6B52", remarque:"1ère intention — pas d'hypoglycémie"},
      {classe:"SGLT2 (gliflozines)", dci:["Dapagliflozine","Empagliflozine"], specialites:["Forxiga®","Jardiance®"], couleur:"#1E3A5F", remarque:"Bénéfice CV et rénal prouvé"},
      {classe:"GLP-1 analogues", dci:["Liraglutide","Sémaglutide"], specialites:["Victoza®","Ozempic®"], couleur:"#6B2D5E", remarque:"Perte de poids associée"},
      {classe:"Sulfamides", dci:["Glibenclamide","Gliclazide"], specialites:["Daonil®","Diamicron®"], couleur:"#B45309", remarque:"⚠️ Risque hypoglycémie"},
      {classe:"Gliptines (DPP-4)", dci:["Sitagliptine","Vildagliptine"], specialites:["Januvia®","Galvus®"], couleur:"#555", remarque:"Neutres sur le poids"},
    ],
    points_cles:["Metformine = toujours 1ère intention (sauf CI)","Resucrage hypoglycémie : 15g glucides rapides → répéter si besoin","Suspendre metformine si produit de contraste ou déshydratation","SGLT2 = bénéfice cardiovasculaire et rénal indépendant","Soins des pieds quotidiens — prévention ulcère diabétique"],
  },
  {
    id:'f5', slug:'douleur-arthrose', nom:'Douleur arthrosique', icone:'/icons/pathologie/douleur-arthrosique.svg', categorie:'pathologie',
    cest_quoi: "Le cartilage qui protège vos articulations s'use avec le temps, un peu comme les patins d'une voiture qui s'amincissent à l'usage. Les os finissent par frotter davantage entre eux, ce qui provoque la douleur et la raideur, surtout après l'effort ou au réveil.",
    saviez_vous: "L'arthrose est la maladie articulaire la plus fréquente au monde. Elle touche 10 millions de Français. Contrairement aux idées reçues, le sport pratiqué modérément PROTÈGE le cartilage — c'est l'inactivité qui l'abîme !",
    schema_id: 'arthrose',
    physiopatho_court: "Le cartilage (tissu sans vaisseaux ni nerfs) se dégrade progressivement — fissures, érosions → l'os sous-chondral se retrouve exposé. La douleur vient de la capsule articulaire et de l'os (pas du cartilage). La synovite réactionnelle aggrave l'inflammation.",
    mecanisme_court: "Le paracétamol bloque la synthèse des prostaglandines au niveau central → antalgique. Les AINS bloquent les COX-1 et COX-2 → anti-inflammatoire + antalgique mais avec des risques digestifs et rénaux. À utiliser en cure courte lors des poussées.",
    consequences: ["Limitation progressive jusqu'au handicap", "Indication prothétique (genou, hanche)", "Dépression par douleur chronique", "Chutes chez le sujet âgé"],
    effets_secondaires: [
      {label:"Troubles digestifs (AINS)", niveau:"warning"},
      {label:"Insuffisance rénale aiguë (AINS)", niveau:"danger"},
      {label:"Risque cardiovasculaire (AINS)", niveau:"danger"},
      {label:"Hépatotoxicité si surdosage (paracétamol)", niveau:"danger"},
    ],
    classes_pharmacologiques: [
      {classe:"Paracétamol (palier 1)", dci:["Paracétamol"], specialites:["Doliprane®","Efferalgan®"], couleur:"#1B6B52", remarque:"1ère intention — max 4g/jour"},
      {classe:"AINS non sélectifs", dci:["Ibuprofène","Kétoprofène","Naproxène"], specialites:["Nurofen®","Bi-Profénid®","Apranax®"], couleur:"#B45309", remarque:"Cure courte — avec repas"},
      {classe:"Coxibs (AINS sélectifs COX-2)", dci:["Célécoxib","Étoricoxib"], specialites:["Celebrex®","Arcoxia®"], couleur:"#1E3A5F", remarque:"Meilleure tolérance digestive"},
      {classe:"Opioïdes faibles (palier 2)", dci:["Tramadol","Codéine"], specialites:["Topalgic®","Codoliprane®"], couleur:"#6B2D5E", remarque:"Si échec palier 1"},
    ],
    points_cles:["Paracétamol = base antalgique — souvent sous-dosé en pratique","AINS = poussées uniquement, courte durée","Kinésithérapie aussi efficace que les médicaments","AINS contre-indiqués si IRC, insuffisance cardiaque, ulcère","Seuil prothétique = fonctionnel (pas radiologique)"],
  },
  {
    id:'f7', slug:'gastro-enterite', nom:'Gastro-entérite aiguë', icone:'/icons/pathologie/gastro.svg', categorie:'pathologie',
    cest_quoi: "Un virus (ou parfois une bactérie) s'attaque à la paroi de votre intestin, qui réagit en accélérant le transit pour s'en débarrasser au plus vite — d'où les diarrhées et parfois les vomissements. C'est désagréable mais en général réglé en 2 à 3 jours.",
    saviez_vous: "En France, 2 à 3 millions de Français sont touchés chaque hiver. Le Norovirus est si résistant qu'il survit sur les surfaces jusqu'à 7 jours et que 10 à 100 particules virales suffisent à infecter une personne. Le gel hydroalcoolique est peu efficace contre lui — préférer le lavage au savon.",
    schema_id: 'gastro',
    physiopatho_court: "Le virus (Norovirus à 90%) détruit les entérocytes de l'intestin grêle → les cellules malades sécrètent de l'eau et des électrolytes dans la lumière intestinale au lieu de les absorber → diarrhée profuse. La déshydratation est le seul vrai danger.",
    mecanisme_court: "Les SRO profitent du cotransport Na+/glucose (intact même lors de l'infection) pour faire rentrer l'eau dans le corps — c'est le seul traitement vraiment essentiel. Le racécadotril réduit la sécrétion intestinale sans bloquer le transit. Le lopéramide bloque la motricité — utile mais dangereux si infection bactérienne.",
    consequences: ["Déshydratation sévère → choc hypovolémique", "SHU (E. coli producteur de Shiga-toxines)", "Contagion familiale massive", "Troubles fonctionnels post-infectieux"],
    effets_secondaires: [
      {label:"Constipation (lopéramide)", niveau:"info"},
      {label:"Arythmie si surdosage (lopéramide)", niveau:"danger"},
      {label:"Mégacôlon si bactérie invasive (lopéramide)", niveau:"danger"},
      {label:"SRO : excellente tolérance", niveau:"info"},
    ],
    classes_pharmacologiques: [
      {classe:"Sels de Réhydratation Orale", dci:["Glucose + Na + K + Cl"], specialites:["Hydrigoz®","Picolyte®","Adiaril®"], couleur:"#1B6B52", remarque:"PRIORITÉ ABSOLUE — commencer immédiatement"},
      {classe:"Antisécrétoires intestinaux", dci:["Racécadotril"], specialites:["Tiorfan®","Hidrasec®"], couleur:"#1E3A5F", remarque:"1ère intention si diarrhée profuse"},
      {classe:"Ralentisseurs du transit", dci:["Lopéramide"], specialites:["Imodium®"], couleur:"#B45309", remarque:"CI si fièvre, sang, enfant < 2 ans"},
      {classe:"Adsorbants", dci:["Diosmectite"], specialites:["Smecta®"], couleur:"#6B2D5E", remarque:"Bien toléré — nourrissons"},
      {classe:"Probiotiques", dci:["Saccharomyces boulardii"], specialites:["Ultralevure®"], couleur:"#555", remarque:"Réduit durée d'environ 1 jour"},
    ],
    points_cles:["SRO = traitement unique urgent → AVANT tout le reste","Soda et jus de fruit aggravent la diarrhée osmotique — jamais à la place des SRO","Reprendre l'alimentation dès que possible — ne pas jeûner","Antibiotiques inutiles sur 90% des GEA virales","Nourrisson déshydraté = urgence médicale"],
  },
  {
    id:'f8', slug:'hypertension', nom:'Hypertension artérielle', icone:'/icons/pathologie/hypertension.svg', categorie:'pathologie',
    cest_quoi: "Le sang circule dans vos artères avec une pression trop élevée en permanence — comme un tuyau d'arrosage où l'on aurait trop ouvert le robinet. Sur le long terme, cette pression excessive fatigue et abîme silencieusement le cœur, les artères et les reins.",
    saviez_vous: "L'HTA est surnommée le 'tueur silencieux' car elle est asymptomatique pendant des années. En France, 1 adulte sur 3 est hypertendu. Plus de 50% des hypertendus sous traitement n'ont pas leur tension contrôlée — principalement par manque d'observance.",
    schema_id: 'hta',
    physiopatho_court: "La pression dans les artères est trop élevée de façon permanente. Cela abîme les parois artérielles → athérosclérose, et fatigue le cœur qui doit pomper contre une résistance trop forte → hypertrophie ventriculaire gauche → risque d'insuffisance cardiaque.",
    mecanisme_court: "Les IEC bloquent la fabrication d'angiotensine II (vasoconstriction) → les vaisseaux se dilatent. Les sartans bloquent son récepteur → même effet sans la toux. Les inhibiteurs calciques détendent directement les muscles des artères. Les diurétiques réduisent le volume sanguin.",
    consequences: ["AVC ischémique ou hémorragique", "Insuffisance cardiaque", "Insuffisance rénale chronique", "Rétinopathie hypertensive"],
    effets_secondaires: [
      {label:"Toux sèche (IEC)", niveau:"warning"},
      {label:"Œdèmes chevilles (inhibiteurs calciques)", niveau:"info"},
      {label:"Hypokaliémie (diurétiques thiazidiques)", niveau:"warning"},
      {label:"Angio-œdème (IEC) — rare mais grave", niveau:"danger"},
    ],
    classes_pharmacologiques: [
      {classe:"IEC", dci:["Ramipril","Périndopril","Énalapril"], specialites:["Triatec®","Coversyl®","Renitec®"], couleur:"#1B6B52", remarque:"1ère intention — bénéfice rénal"},
      {classe:"ARA2 / Sartans", dci:["Losartan","Valsartan","Irbésartan"], specialites:["Cozaar®","Tareg®","Aprovel®"], couleur:"#1E3A5F", remarque:"Si toux sous IEC"},
      {classe:"Inhibiteurs calciques", dci:["Amlodipine","Félodipine"], specialites:["Amlor®","Flodil®"], couleur:"#6B2D5E", remarque:"Efficaces sur TA systolique"},
      {classe:"Diurétiques thiazidiques", dci:["Hydrochlorothiazide","Indapamide"], specialites:["Esidrex®","Fludex®"], couleur:"#B45309", remarque:"Souvent en association"},
      {classe:"Bêta-bloquants", dci:["Bisoprolol","Métoprolol","Aténolol"], specialites:["Cardensiel®","Seloken®","Ténormine®"], couleur:"#555", remarque:"Cardioprotecteurs"},
    ],
    points_cles:["Automesure tensionnelle règle des 3 : 3 mesures, 3 jours, matin + soir","Toux sous IEC → switch vers sartan — légitime","AINS en automédication réduisent l'efficacité des antihypertenseurs","Traitement asymptomatique → risque d'arrêt → éducation ++","Vérifier PA debout chez le sujet âgé (hypotension orthostatique)"],
  },
  {
    id:'f9', slug:'insomnie', nom:'Insomnie', icone:'/icons/pathologie/insomnie.svg', categorie:'pathologie',
    cest_quoi: "Votre cerveau a du mal à \"lâcher prise\" pour basculer en mode sommeil — souvent à cause du stress, des écrans, ou d'habitudes qui dérèglent l'horloge interne. Le corps reste en alerte alors qu'il devrait se mettre en veille.",
    saviez_vous: "Un Français sur 3 se plaint de troubles du sommeil. La dette de sommeil cumulative augmente le risque d'obésité, de diabète et de maladies cardiovasculaires. Dormir moins de 6h par nuit réduit les performances cognitives autant que 48h sans dormir.",
    schema_id: 'insomnie',
    physiopatho_court: "Le sommeil est régulé par 2 systèmes : l'horloge interne (mélatonine le soir) + l'accumulation d'adénosine pendant la journée (pression de sommeil). L'insomnie = un état d'hyperéveil chronique : le cerveau ne peut pas se 'éteindre'. La lumière bleue des écrans bloque la mélatonine.",
    mecanisme_court: "Les benzodiazépines potentialisent le GABA (frein cérébral) → sommeil mais dépendance et rebond. La mélatonine resynchronise l'horloge biologique → endormissement plus facile, sans dépendance. Les antihistaminiques sédatifs (doxylamine) bloquent l'histamine éveillante → somnolence.",
    consequences: ["Accidents de la route × 7 (somnolence)", "Dépression et anxiété", "Risque cardiovasculaire et métabolique augmenté", "Dépendance aux somnifères"],
    effets_secondaires: [
      {label:"Dépendance et rebond (BZD/Z-drugs)", niveau:"danger"},
      {label:"Somnolence résiduelle (BZD)", niveau:"warning"},
      {label:"Confusion, chutes (doxylamine sujet âgé)", niveau:"danger"},
      {label:"Céphalées légères (mélatonine)", niveau:"info"},
    ],
    classes_pharmacologiques: [
      {classe:"Mélatonine", dci:["Mélatonine"], specialites:["Circadin®","Mélatonine Pileje®"], couleur:"#1B6B52", remarque:"Sans dépendance — 1ère intention OTC"},
      {classe:"Antihistaminiques sédatifs", dci:["Doxylamine"], specialites:["Donormyl®"], couleur:"#B45309", remarque:"OTC — max 2 semaines, CI sujet âgé"},
      {classe:"Z-drugs (apparentés BZD)", dci:["Zopiclone","Zolpidem"], specialites:["Imovane®","Stilnox®"], couleur:"#C0392B", remarque:"Max 4 semaines — risque dépendance"},
      {classe:"Benzodiazépines hypnotiques", dci:["Nitrazépam","Lormétazépam"], specialites:["Mogadon®","Noctamide®"], couleur:"#7D0000", remarque:"Éviter si possible"},
    ],
    points_cles:["TCC-I = traitement de 1ère ligne (plus efficace que les médicaments à long terme)","Mélatonine = OTC sans dépendance — meilleur choix en officine","Doxylamine contre-indiquée chez le sujet âgé (confusion, chutes)","Jamais d'arrêt brutal d'une benzodiazépine → risque de crise","Somnifères ≠ solution → éducation aux règles d'hygiène du sommeil"],
  },
  {
    id:'f10', slug:'migraine', nom:'Migraine', icone:'/icons/pathologie/migraine.svg', categorie:'pathologie',
    cest_quoi: "Les vaisseaux sanguins du cerveau se dilatent et irritent les nerfs autour — provoquant cette douleur pulsatile, souvent d'un seul côté, parfois précédée de troubles visuels. Le bruit et la lumière deviennent insupportables car le cerveau est en hypersensibilité temporaire.",
    saviez_vous: "La migraine est la 2ème cause de handicap mondiale selon l'OMS. Elle touche 3× plus les femmes que les hommes (hormones). Elvis Presley, Napoléon, Freud et Darwin étaient tous migraineux. La migraine n'est PAS un simple mal de tête — c'est une maladie neurologique.",
    schema_id: 'migraine',
    physiopatho_court: "La crise démarre par une hyperexcitabilité du cortex → onde de dépolarisation (aura). Puis le nerf trijumeau s'active → libère du CGRP → vaisseaux méningés se dilatent et s'enflamment → douleur pulsatile intense. La sensibilisation centrale explique l'allodynie (la peau fait mal au toucher).",
    mecanisme_court: "Les triptans activent les récepteurs 5-HT1B/1D → vaisseaux méningés se contractent + le CGRP cesse d'être libéré → fin de la crise. Les anti-CGRP (nouvelle génération) bloquent directement ce médiateur → révolution thérapeutique. Prendre le triptan le plus tôt possible !",
    consequences: ["Invalidité majeure — 2ème cause de handicap mondial", "Céphalée de rebond si abus d'antalgiques > 10j/mois", "Migraine chronique > 15 jours/mois", "AVC (migraine avec aura + pilule + tabac)"],
    effets_secondaires: [
      {label:"Oppression thoracique, flush (triptans)", niveau:"warning"},
      {label:"Troubles digestifs (AINS)", niveau:"info"},
      {label:"Bradycardie, asthénie (propranolol)", niveau:"warning"},
      {label:"Céphalée de rebond (abus antalgiques)", niveau:"danger"},
    ],
    classes_pharmacologiques: [
      {classe:"Triptans (traitement de crise)", dci:["Sumatriptan","Élétriptan","Rizatriptan"], specialites:["Imigrane®","Relpax®","Maxalt®"], couleur:"#C0392B", remarque:"Référence des crises modérées à sévères"},
      {classe:"AINS (traitement de crise)", dci:["Ibuprofène","Naproxène","Aspirine"], specialites:["Nurofen®","Apranax®","Aspégic®"], couleur:"#B45309", remarque:"Crises légères — prendre tôt"},
      {classe:"Bêta-bloquants (prévention)", dci:["Propranolol","Métoprolol"], specialites:["Avlocardyl®","Seloken®"], couleur:"#1B6B52", remarque:"1ère ligne prévention — CI asthme"},
      {classe:"Anticorps anti-CGRP (prévention)", dci:["Érenumab","Frémanézumab","Galcanézumab"], specialites:["Aimovig®","Ajovy®","Emgality®"], couleur:"#1E3A5F", remarque:"Révolution — migraine chronique sévère"},
    ],
    points_cles:["Triptan = prendre le PLUS TÔT possible au début de la crise","Limiter antalgiques à < 10 jours/mois pour éviter le rebond","> 4 crises/mois → traitement préventif à envisager","CI triptans : coronaropathie, AVC, HTA non contrôlée","Journal de céphalées → identifier les déclencheurs personnels"],
  },
  {
    id:'f11', slug:'rhinite-allergique', nom:'Rhinite allergique', icone:'/icons/pathologie/sinusite aigue.svg', categorie:'pathologie',
    cest_quoi: "La muqueuse de votre nez réagit de façon excessive à un élément normalement inoffensif (pollen, acariens, poils d'animaux) en s'enflammant et en produisant trop de mucus. C'est cette inflammation qui bouche le nez et déclenche les éternuements en chaîne.",
    saviez_vous: "La rhinite allergique et l'asthme sont souvent associés : 80% des asthmatiques ont une rhinite allergique. On parle de 'united airway disease' — une seule muqueuse des fosses nasales aux bronches. Traiter la rhinite améliore souvent l'asthme !",
    schema_id: 'rhinite',
    physiopatho_court: "Même mécanisme que l'allergie au pollen mais avec une composante chronique plus marquée. La muqueuse nasale est constamment infiltrée d'éosinophiles et de mastocytes → inflammation permanente → remodelage → polypose possible dans les cas sévères.",
    mecanisme_court: "Les corticoïdes nasaux réduisent l'inflammation globale (éosinophiles, mastocytes, cytokines) → supérieurs aux antihistaminiques sur la congestion nasale. La désensibilisation (immunothérapie) induit une tolérance immunitaire réelle → seul traitement modificateur de la maladie.",
    consequences: ["Sinusite chronique et otite moyenne", "Polypose naso-sinusienne", "Asthme dans 20-40% des cas", "Hyposmie voire anosmie"],
    effets_secondaires: [
      {label:"Épistaxis légères (corticoïdes nasaux)", niveau:"info"},
      {label:"Effet rebond à l'arrêt (décongestionnants)", niveau:"danger"},
      {label:"Somnolence légère (cétirizine)", niveau:"info"},
      {label:"HTA, palpitations (pseudoéphédrine) — RETIRÉ", niveau:"danger"},
    ],
    classes_pharmacologiques: [
      {classe:"Corticoïdes nasaux", dci:["Budésonide","Fluticasone","Mométasone"], specialites:["Rhinocort®","Avamys®","Nasonex®"], couleur:"#1B6B52", remarque:"Traitement de fond le plus efficace"},
      {classe:"AntiH1 oraux 2G", dci:["Cétirizine","Fexofénadine","Bilastine"], specialites:["Zyrtec®","Telfast®","Bilaska®"], couleur:"#1E3A5F", remarque:"Traitement systémique de fond"},
      {classe:"Décongestionnants topiques", dci:["Xylométazoline","Oxymétazoline"], specialites:["Otrivine®","Pernazène®"], couleur:"#B45309", remarque:"Max 5 jours — rebond"},
      {classe:"Désensibilisation (ITA)", dci:["Extraits polliniques","Extraits acariens"], specialites:["Staloral®","Grazax®","Actair®"], couleur:"#6B2D5E", remarque:"Seul traitement modificateur"},
    ],
    points_cles:["Corticoïdes nasaux → appliquer vers l'extérieur de la narine (pas vers la cloison)","Pseudoéphédrine RETIRÉE du marché en France en 2023","Désensibilisation = seul traitement qui modifie la maladie → en parler","Rhinite + asthme = très fréquent — chercher systématiquement","Décongestionnants nasaux max 5 jours → risque rhinite médicamenteuse"],
  },

  // DERMATOLOGIE
  {
    id:'f13', slug:'dermite-seborrheique', nom:'Dermite séborrhéique', icone:'/icons/dermatologie/dermite-seborrheique.svg', categorie:'dermato',
    cest_quoi: "Un champignon naturellement présent sur votre peau (Malassezia) profite d'un excès de sébum pour proliférer davantage, ce qui irrite la peau et provoque rougeurs et petites peaux qui pèlent — typiquement sur le cuir chevelu, le visage ou les sourcils.",
    saviez_vous: "La dermite séborrhéique touche 2 à 5% de la population générale mais jusqu'à 80% des patients VIH+ ! Malassezia, la levure responsable, est présente chez TOUT le monde — c'est notre réponse immunitaire qui diffère.",
    schema_id: 'ds',
    physiopatho_court: "La levure Malassezia (normalement commensale) prolifère dans les zones riches en sébum → produit des acides gras irritants → réponse inflammatoire → rougeurs et squames grasses. Le stress, l'immunodépression et les variations hormonales déclenchent les poussées.",
    mecanisme_court: "Les antifongiques azolés (kétoconazole) inhibent la synthèse de l'ergostérol (membrane de Malassezia) → mort de la levure → réduction de l'inflammation. La pyrithione de zinc et le sulfure de sélénium ont un effet antifongique + antiprolifératif.",
    consequences: ["Évolution chronique avec poussées récurrentes", "Impact cosmétique et social", "Possible association psoriasis (sebopsoriasis)", "Surinfection bactérienne possible"],
    effets_secondaires: [
      {label:"Irritation légère du cuir chevelu (shampooings)", niveau:"info"},
      {label:"Décoloration cheveux clairs (sulfure sélénium)", niveau:"warning"},
      {label:"Atrophie cutanée (dermocorticoïdes visage)", niveau:"danger"},
    ],
    classes_pharmacologiques: [
      {classe:"Azolés antifongiques", dci:["Kétoconazole 2%"], specialites:["Kétoderm®"], couleur:"#1B6B52", remarque:"Référence visage et cuir chevelu"},
      {classe:"Ciclopiroxolamine", dci:["Ciclopiroxolamine"], specialites:["Mycoster®","Sebiprox®"], couleur:"#1E3A5F", remarque:"Large spectre antifongique"},
      {classe:"Shampooings antipelliculaires", dci:["Pyrithione zinc","Sulfure sélénium"], specialites:["Stieprox®","Selsun®"], couleur:"#6B2D5E", remarque:"Entretien et prévention"},
      {classe:"Dermocorticoïdes", dci:["Désonide","Bétaméthasone valerate"], specialites:["Locapred®","Betneval®"], couleur:"#B45309", remarque:"En association — max 2 sem visage"},
    ],
    points_cles:["DS = chronique et récidivante — pas de guérison définitive","Kétoconazole shampooing s'applique aussi sur le visage","Ne jamais utiliser dermocorticoïdes seuls sans antifongique sur le visage","Laisser poser le shampooing actif 5 minutes avant de rincer","Expliquer que le shampooing s'applique sur tout le visage (sourcils, sillons naso-labiaux)"],
  },
  {
    id:'f14', slug:'psoriasis', nom:'Psoriasis', icone:'/icons/dermatologie/psoriasis.svg', categorie:'dermato',
    cest_quoi: "Votre système immunitaire s'emballe et accélère anormalement le renouvellement de la peau — celle-ci se régénère en quelques jours au lieu de plusieurs semaines. Les cellules s'accumulent en surface avant d'avoir eu le temps de mûrir, formant les plaques épaisses et qui pèlent caractéristiques.",
    saviez_vous: "Le psoriasis touche 2 à 3% de la population mondiale. C'est une maladie systémique — pas seulement cutanée. Kim Kardashian, Cara Delevingne et le Tsar Nicolas II en souffraient. Le mot vient du grec 'psora' qui signifie 'démangeaison'.",
    schema_id: 'psoriasis',
    physiopatho_court: "Les lymphocytes T suractivés libèrent des cytokines (IL-17, IL-23, TNF-α) → les kératinocytes prolifèrent à une vitesse folle (4-7 jours au lieu de 28 jours normalement) → peau qui s'empile → plaques épaisses squameuses. C'est une maladie inflammatoire systémique.",
    mecanisme_court: "Le calcipotriol (analogue vitamine D3) normalise la prolifération des kératinocytes sans atrophie. Les dermocorticoïdes réduisent l'inflammation. Les biothérapies anti-IL-17 et anti-IL-23 ciblent spécifiquement les cytokines responsables → taux de blanchiment > 90% chez certains patients.",
    consequences: ["Arthrite psoriasique dans 20-30% des cas", "Risque cardiovasculaire augmenté", "Impact psychologique majeur", "Psoriasis érythrodermique → urgence vitale"],
    effets_secondaires: [
      {label:"Hypercalcémie si > 100g/sem (calcipotriol)", niveau:"warning"},
      {label:"Tératogène, sécheresse (acitrétine)", niveau:"danger"},
      {label:"Infections, réactivation TB (biothérapies)", niveau:"danger"},
      {label:"Hépatotoxicité (méthotrexate)", niveau:"danger"},
    ],
    classes_pharmacologiques: [
      {classe:"Dermocorticoïdes", dci:["Clobétasol","Bétaméthasone"], specialites:["Dermoval®","Diprosone®"], couleur:"#B45309", remarque:"Poussées en association"},
      {classe:"Analogues vitamine D3", dci:["Calcipotriol","Calcitriol"], specialites:["Daivonex®","Silkis®"], couleur:"#1B6B52", remarque:"Entretien — sans atrophie"},
      {classe:"Association fixe DCI+BM", dci:["Calcipotriol + Bétaméthasone"], specialites:["Daivobet®","Xamiol®"], couleur:"#1E3A5F", remarque:"Référence traitement local"},
      {classe:"Anti-IL-17", dci:["Sécukinumab","Ixékizumab"], specialites:["Cosentyx®","Taltz®"], couleur:"#6B2D5E", remarque:"Efficacité supérieure aux anti-TNF"},
      {classe:"Anti-IL-23", dci:["Guselkumab","Risankizumab"], specialites:["Tremfya®","Skyrizi®"], couleur:"#555", remarque:"Dernière génération — blanchiment ++"},
    ],
    points_cles:["Avant toute biothérapie : dépistage tuberculose IGRA + sérologies VHB, VHC","Phénomène de Koebner → éviter traumatismes cutanés","Psoriasis = maladie systémique — chercher arthrite psoriasique","Daivobet® = traitement local de référence (CSI + calcipotriol)","Impact psychologique souvent sous-estimé → prendre le temps d'écouter"],
  },
  {
    id:'f15', slug:'rosacee', nom:'Rosacée', icone:'/icons/dermatologie/rosacee.svg', categorie:'dermato',
    cest_quoi: "Les petits vaisseaux sanguins de votre visage se dilatent trop facilement et restent dilatés plus longtemps que la normale, donnant ces rougeurs persistantes — souvent déclenchées ou aggravées par le soleil, le stress, l'alcool ou les plats épicés.",
    saviez_vous: "La rosacée est souvent confondue avec de l'acné — mais le traitement est très différent ! Elle touche 3% des adultes, surtout les peaux claires et les femmes de 30-50 ans. Le Président Bill Clinton, Oliver Hardy et le peintre Rembrandt en souffraient.",
    schema_id: 'rosacee',
    physiopatho_court: "Triple dysfonction : vaisseaux réactifs et dilatés (flush, couperose) + inflammation médiée par des peptides antimicrobiens (LL-37 produits en excès) + l'acarien Demodex folliculorum (commensale qui prolifère chez les patients rosacée). Résultat : rougeurs chroniques et papulo-pustules.",
    mecanisme_court: "L'ivermectine topique élimine les Demodex et réduit l'inflammation → supérieure au métronidazole. La brimonidine contracte les petits vaisseaux → rougeur disparaît en 30 min mais revient par rebond. L'acide azélaïque réduit les peptides LL-37 → moins d'inflammation.",
    consequences: ["Rhinophyma (nez bulbeux hypertrophique)", "Atteinte oculaire dans 50% des cas", "Évolution chronique et récidivante", "Impact psychologique — visage toujours visible"],
    effets_secondaires: [
      {label:"Brûlures transitoires initiales (ivermectine)", niveau:"info"},
      {label:"Rougeur paradoxale en rebond (brimonidine)", niveau:"warning"},
      {label:"Photosensibilisation (doxycycline)", niveau:"warning"},
    ],
    classes_pharmacologiques: [
      {classe:"Antiparasitaire topique", dci:["Ivermectine 1%"], specialites:["Soolantra®"], couleur:"#1B6B52", remarque:"Anti-Demodex + anti-inflammatoire"},
      {classe:"Imidazolés topiques", dci:["Métronidazole 0,75-1%"], specialites:["Rozex®","Metrogel®"], couleur:"#1E3A5F", remarque:"Traitement de fond classique"},
      {classe:"Acide azélaïque", dci:["Acide azélaïque 15%"], specialites:["Finacea®"], couleur:"#6B2D5E", remarque:"Anti-inflammatoire + antibactérien"},
      {classe:"Alpha-2 agoniste topique", dci:["Brimonidine 0,33%"], specialites:["Mirvaso®"], couleur:"#B45309", remarque:"Érythème → effet immédiat temporaire"},
      {classe:"Antibiotiques oraux (anti-inflam)", dci:["Doxycycline 40mg LP"], specialites:["Efracea®"], couleur:"#555", remarque:"Dose anti-inflammatoire — pas antibiotique"},
    ],
    points_cles:["SPF 50+ QUOTIDIEN — le soleil est le déclencheur n°1","Ivermectine topique aujourd'hui supérieure au métronidazole","Brimonidine : risque de rebond — expliquer au patient","Rechercher systématiquement une rosacée oculaire (sécheresse, brûlures)","Alcool, épices, boissons chaudes = déclencheurs principaux → journal"],
  },
  {
    id:'f16', slug:'mycose-cutanee', nom:"Mycose Cutanée / Pied d'athlète", icone:'/icons/dermatologie/mycose-cutanee---pied-dathelete.svg', categorie:'dermato',
    cest_quoi: "Un champignon microscopique colonise les zones chaudes et humides de la peau (entre les orteils, les plis) et s'y nourrit de kératine. La chaleur et l'humidité (chaussures fermées, piscine, vestiaires) sont son terrain de jeu favori.",
    saviez_vous: "Le pied d'athlète (tinea pedis) est la mycose cutanée la plus fréquente au monde. Elle touche 15% de la population. Le nom 'pied d'athlète' vient des vestiaires sportifs — mais on peut l'attraper dans n'importe quelle douche publique.",
    schema_id: 'mycose',
    physiopatho_court: "Les dermatophytes (champignons kératinophiles) digèrent la kératine de la peau, des ongles et des cheveux à l'aide d'enzymes (kérasines) → inflammation locale. Ils adorent la chaleur, l'humidité et l'obscurité → pieds dans les chaussures fermées = paradis pour eux.",
    mecanisme_court: "Les azolés (clotrimazole, kétoconazole) bloquent la synthèse de l'ergostérol → mort lente du champignon (fongistatique). La terbinafine accumule du squalène toxique + prive le champignon d'ergostérol → mort rapide (fongicide) → traitement plus court (1 semaine vs 4 semaines).",
    consequences: ["Extension aux ongles (onychomycose) — traitement 6-12 mois", "Récidives fréquentes si facteurs non corrigés", "Contagion familiale", "Surinfection bactérienne des lésions"],
    effets_secondaires: [
      {label:"Légère irritation locale (azolés)", niveau:"info"},
      {label:"Troubles digestifs (terbinafine orale)", niveau:"info"},
      {label:"Hépatotoxicité (terbinafine orale > 4 sem)", niveau:"warning"},
      {label:"Interactions CYP3A4 (itraconazole)", niveau:"danger"},
    ],
    classes_pharmacologiques: [
      {classe:"Allylamines topiques", dci:["Terbinafine"], specialites:["Lamisil® crème/spray"], couleur:"#1B6B52", remarque:"Fongicide — 1 semaine pied d'athlète"},
      {classe:"Azolés topiques", dci:["Clotrimazole","Éconazole","Kétoconazole"], specialites:["Mycohydralin®","Pévaryl®","Kétoderm®"], couleur:"#1E3A5F", remarque:"Fongistatique — 4 semaines"},
      {classe:"Ciclopiroxolamine", dci:["Ciclopiroxolamine"], specialites:["Mycoster®"], couleur:"#6B2D5E", remarque:"Large spectre + antibactérien"},
      {classe:"Allylamines orales", dci:["Terbinafine 250mg"], specialites:["Lamisil® comprimés"], couleur:"#B45309", remarque:"Onychomycose — 6 semaines à 3 mois"},
      {classe:"Vernis antifongique", dci:["Amorolfine 5%"], specialites:["Locéryl®"], couleur:"#555", remarque:"Onychomycose légère — 1×/semaine"},
    ],
    points_cles:["Terbinafine crème = traitement le plus rapide (fongicide vs fongistatique des azolés)","Toujours traiter la durée COMPLÈTE même si amélioration rapide — récidive sinon","Onychomycose → confirmation mycologique avant traitement (toujours)","Traiter les chaussures avec poudre antifongique pour éviter la réinfection","Terbinafine orale CI en insuffisance hépatique → vérifier"],
  },
  {
    id:'f17', slug:'urticaire', nom:'Urticaire aiguë', icone:'/icons/dermatologie/urticaire.svg', categorie:'dermato',
    cest_quoi: "Votre peau libère brusquement de l'histamine en réaction à un déclencheur (aliment, médicament, stress, parfois sans cause identifiée), provoquant ces plaques qui démangent et apparaissent et disparaissent rapidement — un peu comme une piqûre d'ortie qui se déplacerait sur le corps.",
    saviez_vous: "Le nom 'urticaire' vient du latin 'urtica' (ortie) car les lésions ressemblent aux traces laissées par l'ortie. 20% des personnes feront au moins un épisode d'urticaire dans leur vie. Dans 50% des urticaires chroniques, aucune cause n'est jamais trouvée.",
    schema_id: 'urticaire',
    physiopatho_court: "Les mastocytes du derme se dégranulent → libèrent histamine, tryptase, prostaglandines → vasodilatation + perméabilité capillaire accrue → œdème dermique → papule urticarienne. L'angioedème = même phénomène dans le derme profond et l'hypoderme.",
    mecanisme_court: "Les antihistaminiques H1 de 2e génération bloquent les récepteurs H1 → suppression de la réaction urticarienne. En cas d'anaphylaxie, l'adrénaline contracte les vaisseaux + dilate les bronches → seul traitement d'urgence efficace.",
    consequences: ["Anaphylaxie → urgence vitale → adrénaline", "Angioedème laryngé → asphyxie", "Urticaire chronique → altération qualité de vie", "Anxiété anticipatoire des crises"],
    effets_secondaires: [
      {label:"Somnolence légère (cétirizine)", niveau:"info"},
      {label:"Sécheresse buccale, rétention (antiH1 1G)", niveau:"warning"},
      {label:"Palpitations, HTA (adrénaline)", niveau:"info"},
    ],
    classes_pharmacologiques: [
      {classe:"AntiH1 2G", dci:["Cétirizine","Loratadine","Desloratadine"], specialites:["Zyrtec®","Clarityne®","Aérius®"], couleur:"#1B6B52", remarque:"1ère intention — jusqu'à 4× dose standard si nécessaire"},
      {classe:"Corticoïdes systémiques", dci:["Méthylprednisolone","Prednisolone"], specialites:["Médrol®","Solupred®"], couleur:"#B45309", remarque:"Formes sévères — courte durée"},
      {classe:"Anti-IgE", dci:["Omalizumab"], specialites:["Xolair®"], couleur:"#1E3A5F", remarque:"Urticaire chronique résistante aux antiH1"},
      {classe:"Adrénaline auto-injectable", dci:["Épinéphrine"], specialites:["Anapen®","EpiPen®"], couleur:"#C0392B", remarque:"Anaphylaxie — urgence vitale"},
    ],
    points_cles:["Signes anaphylaxie (dyspnée, hypotension) → SAMU 15 immédiat","AINS et aspirine peuvent déclencher ou aggraver l'urticaire","Urticaire chronique > 6 semaines = bilan allergologique","Patients avec antécédent d'anaphylaxie = trousse d'urgence obligatoire","Dans 50% des urticaires chroniques : aucune cause trouvée → rassurer"],
  },
  {
    id:'f18', slug:'zona', nom:'Zona', icone:'/icons/dermatologie/zona.svg', categorie:'dermato',
    cest_quoi: "Le virus de la varicelle, attrapé enfant, ne quitte jamais vraiment le corps — il reste endormi dans un nerf. À la faveur d'une fatigue ou d'un coup de moins bien immunitaire, il se réveille et suit le trajet du nerf, provoquant cette éruption douloureuse et localisée d'un seul côté.",
    saviez_vous: "Le virus du zona (VZV) reste dormant toute la vie dans les ganglions nerveux après la varicelle. 1 personne sur 3 fera un zona dans sa vie. Le risque de douleurs post-zostériennes chroniques est de 30% après 60 ans — d'où l'importance de la vaccination.",
    schema_id: 'zona',
    physiopatho_court: "Après la varicelle, le VZV se 'cache' dans les ganglions sensitifs. Quand l'immunité baisse (âge, stress, immunodépression), il se réveille et descend le long d'un nerf → détruit le ganglion et le nerf au passage → douleurs intenses AVANT l'éruption, puis vésicules en bande.",
    mecanisme_court: "Les antiviraux (valaciclovir) sont des leurres pour le virus : ils ressemblent à des briques d'ADN mais bloquent sa réplication. Plus on les donne tôt (< 72h), plus on limite les dégâts nerveux → moins de risque de douleurs chroniques post-zostériennes.",
    consequences: ["Douleurs post-zostériennes dans 10-20% (> 60 ans)", "Zona ophtalmique → cécité possible", "Syndrome de Ramsay Hunt → paralysie faciale", "Zona disséminé chez l'immunodéprimé → urgence"],
    effets_secondaires: [
      {label:"Nausées, céphalées (valaciclovir)", niveau:"info"},
      {label:"Néphrotoxicité (aciclovir IV)", niveau:"warning"},
      {label:"Encéphalopathie si surdosage (aciclovir IV)", niveau:"danger"},
    ],
    classes_pharmacologiques: [
      {classe:"Antiviraux oraux", dci:["Valaciclovir","Aciclovir","Famciclovir"], specialites:["Zelitrex®","Zovirax®","Oravir®"], couleur:"#C0392B", remarque:"URGENCE — débuter dans les 72h"},
      {classe:"Antalgiques palier 1", dci:["Paracétamol"], specialites:["Doliprane®","Efferalgan®"], couleur:"#1B6B52", remarque:"Antalgie de base"},
      {classe:"Antalgiques palier 2", dci:["Tramadol","Codéine"], specialites:["Topalgic®","Codoliprane®"], couleur:"#B45309", remarque:"Douleur aiguë modérée à sévère"},
      {classe:"Antiépileptiques antalgiques", dci:["Gabapentine","Prégabaline"], specialites:["Neurontin®","Lyrica®"], couleur:"#1E3A5F", remarque:"Douleurs post-zostériennes chroniques"},
    ],
    points_cles:["72h = fenêtre thérapeutique → urgence médicale absolue","Valaciclovir préféré à l'aciclovir (posologie simplifiée : 3×1g/j)","Ne pas sous-traiter la douleur aiguë → risque de DPZ augmenté","Zona ophtalmique → ophtalmologue EN URGENCE le jour même","Vaccin Shingrix® dès 65 ans → recommandé (très efficace)"],
  },
  {
    id:'f19', slug:'xerose', nom:'Xérose cutanée', icone:'/icons/dermatologie/xerose - peau seche.svg', categorie:'dermato',
    cest_quoi: "La barrière protectrice de votre peau (le film hydrolipidique) s'affaiblit et laisse l'eau s'évaporer trop facilement — comme un mur dont le crépi s'effrite et qui devient poreux. La peau tiraille, devient rugueuse et parfois se craquèle.",
    saviez_vous: "La peau d'un adulte perd environ 0,5L d'eau par jour par transpiration insensible. En hiver, avec le chauffage, cette perte peut doubler. Les dermatologues estiment que 80% des problèmes de peau sèche pourraient être résolus avec un seul bon émollient appliqué correctement.",
    schema_id: 'xerose',
    physiopatho_court: "La peau sèche = une barrière cutanée qui fuit. Les lipides intercornéocytaires (céramides, acides gras, cholestérol) se raréfient → l'eau s'échappe trop facilement (perte transépidermique en eau = TEWL élevée). Le résultat : stratum corneum déshydraté → peau squameuse, qui tiraille, qui démange.",
    mecanisme_court: "Les émollients remplacent les lipides manquants → bouchent les 'trous' de la barrière → réduisent la TEWL. L'urée retient l'eau en hygroscopie + légère action kératolytique à forte concentration. Les céramides reconstituent le ciment intercornéocytaire.",
    consequences: ["Prurit chronique → perturbation du sommeil", "Porte d'entrée aux infections cutanées", "Aggravation de l'eczéma atopique", "Crevasses et fissures douloureuses"],
    effets_secondaires: [
      {label:"Brûlures légères si urée > 10% sur peau lésée", niveau:"info"},
      {label:"Allergie aux conservateurs (rare)", niveau:"info"},
      {label:"Effet comédogène sur peau acnéique", niveau:"warning"},
    ],
    classes_pharmacologiques: [
      {classe:"Émollients humectants", dci:["Urée 5-10%","Glycérine","Acide hyaluronique"], specialites:["Dexeryl®","Lipikar®"], couleur:"#1B6B52", remarque:"Hydratation et rétention d'eau"},
      {classe:"Émollients occlusifs", dci:["Vaseline","Paraffine"], specialites:["Vaseline Filante®","Cold Cream®"], couleur:"#1E3A5F", remarque:"Film protecteur anti-TEWL"},
      {classe:"Céramides topiques", dci:["Céramides NP, AP, EOP"], specialites:["CeraVe®","Exomega Control®"], couleur:"#6B2D5E", remarque:"Reconstruction barrière cutanée"},
      {classe:"Kératolytiques", dci:["Urée 20-40%","Acide salicylique"], specialites:["Kératosane®","Callusol®"], couleur:"#B45309", remarque:"Peaux très sèches hyperkératosiques"},
    ],
    points_cles:["Appliquer sur peau HUMIDE dans les 3 minutes après la douche → efficacité maximale","Eau chaude détruit le film hydrolipidique → eau tiède + douche courte","Urée 10% peut piquer sur peau lésée → prévenir le patient","Biquotidien obligatoire pour la xérose sénile — insister sur la régularité","L'émollient réduit la consommation de dermocorticoïdes → argument fort"],
  },

  { id:'dermato', label:'Dermatologie', icone:'🧴' },
  {
    id:'f67', slug:'cicatrice', nom:'Cicatrice hypertrophique / chéloïde', icone:'/icons/dermatologie/cicatrice.svg', categorie:'dermato',
    cest_quoi: "Lors de la réparation d'une plaie, votre peau a produit trop de collagène — comme un maçon qui en mettrait trop pour reboucher un trou, laissant une bosse au lieu d'une surface plane. Résultat : une cicatrice épaisse, parfois rouge et qui peut continuer à grossir (chéloïde).",
    saviez_vous:"Le silicone est le seul traitement topique validé par les recommandations internationales pour les cicatrices hypertrophiques (grade A). Appliqué 12-24h/jour pendant minimum 3 mois, il réduit l'épaisseur et l'érythème cicatriciel de 30 à 60 %. La prévention précoce (dès la fermeture de la plaie) est bien plus efficace que le traitement curatif.",
    schema_id:'cicatrice',
    physiopatho_court:"Cicatrisation normale : inflammation → prolifération (J3-J21) → remodelage (jusqu'à 2 ans). Cicatrice hypertrophique : surproduction de collagène III dans les limites de la plaie → relief élevé, érythème, prurit. Chéloïde : dépasse les marges de la lésion initiale, récidive après exérèse simple, prédisposition génétique (peaux mates ++).",
    mecanisme_court:"Silicone occlusif : crée un milieu humide qui régule l'activité des fibroblastes → ↓ synthèse collagène excessif + ↓ vascularisation + ↑ hydratation du stratum corneum. Corticoïde intralésionnel (triamcinolone) : ↓ activité fibroblastique + ↓ VEGF → aplatissement cicatriciel. Laser fractionnel : remodelage du collagène via chaleur contrôlée.",
    consequences:["Douleur et prurit chroniques sur cicatrice active","Rétraction cicatricielle avec limitation fonctionnelle (zones articulaires)","Récidive systématique des chéloïdes après chirurgie seule","Impact psychologique et qualité de vie (zones exposées)"],
    effets_secondaires:[
      {label:"Corticoïde intralésionnel : atrophie cutanée locale, dépigmentation, télangiectasies", niveau:"warning"},
      {label:"Trétinoïne topique : photosensibilisation, irritation — CI absolue grossesse", niveau:"warning"},
      {label:"Cryothérapie : dépigmentation, douleur (mal tolérée zones sensibles)", niveau:"info"},
    ],
    classes_pharmacologiques:[
      {classe:"Silicone topique (gold standard — 1re ligne)", dci:["Gel de silicone","Plaque de silicone"], specialites:["Kelo-cote® gel","Mepiform® plaque","Dermatix® Ultra","Cicatryl® silicone"], couleur:"#1B6B52", remarque:"2×/jour, 12-24h/j, ≥ 3 mois — dès fermeture de la plaie"},
      {classe:"Corticoïde intralésionnel (chéloïdes / hypertrophiques résistantes)", dci:["Triamcinolone acétonide"], specialites:["Kenacort® A 40 mg/mL"], couleur:"#C0392B", remarque:"Injection dermatologue — séries espacées de 4-6 semaines"},
      {classe:"Rétinoïdes topiques (cicatrices récentes)", dci:["Trétinoïne 0,025-0,05%"], specialites:["Ketrel® 0,05%"], couleur:"#B45309", remarque:"Prescription — CI grossesse absolue, SPF 50 obligatoire"},
    ],
    points_cles:["Silicone = 1re ligne validée (HAS/SFED) — commencer dès J21 après fermeture","Cicatrice hypertrophique ≠ chéloïde : la chéloïde dépasse les marges et récidive","Chéloïde : ne pas opérer seul → récidive quasi constante sans corticoïde adjuvant","Photoprotection SPF 50+ impérative sur toute cicatrice < 2 ans (hyperpigmentation)","Massage cicatriciel 2×/jour dès J21 : améliore souplesse et résorption"],
  }

];


const CATEGORIES_FORMATION = [
  { id:'all', label:'Toutes les fiches', icone:'📚' },
  { id:'pathologie', label:'Pathologies générales', icone:'🏥' },
  { id:'dermato', label:'Dermatologie', icone:'🧴' },

];

/* Normalisation des champs de recherche, mémoïsée sur l'objet au premier accès — calcul paresseux
   (et non fait une fois pour toutes ici) car formation-extra.js ajoute des entrées à FORMATION_DB
   après ce script : un pré-calcul global ici les manquerait. Utilisé par Search.suggest() dans ui.js. */
function getFormationSearchIndex(f) {
  if (!f._searchIndex) {
    const norm = s => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    f._searchIndex = { nom: norm(f.nom) };
  }
  return f._searchIndex;
}

const FormationAPI = {
  async getAll()            { return [...FORMATION_DB]; },
  async getByCategorie(cat) { return cat === 'all' ? [...FORMATION_DB] : FORMATION_DB.filter(f => f.categorie === cat); },
  async getBySlug(slug)     { return FORMATION_DB.find(f => f.slug === slug) || null; },
  getCategories()           { return CATEGORIES_FORMATION; }
};
window.FORMATION_DB = FORMATION_DB;
window.FormationAPI = FormationAPI;
