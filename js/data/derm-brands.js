/* MediFiche — Catalogue parapharmacie dermatologie
   22 laboratoires · structure : Marque → Gamme → Produits
   Les prix sont stockés dans MF.Store par clé "derm_brand_price::marque::gamme::produit"
   Source : catalogue interne officine */

'use strict';

const DERM_BRANDS_DB = [
  {
    marque: 'La Roche-Posay',
    gammes: [
      { nom: 'Lipikar', produits: ['Lipikar Syndet AP+','Lipikar Huile Lavante AP+','Lipikar Baume AP+M','Lipikar Lait','Lipikar Xerand Mains'] },
      { nom: 'Effaclar', produits: ['Effaclar Gel moussant','Effaclar Gel moussant +M','Effaclar Duo+','Effaclar Duo+ M','Effaclar Ultra Concentré Sérum','Effaclar H Iso-Biome Crème lavante','Effaclar H Iso-Biome Soin','Effaclar Mat'] },
      { nom: 'Cicaplast', produits: ['Cicaplast Baume B5+','Cicaplast Gel B5','Cicaplast Lèvres','Cicaplast Mains','Cicaplast Spray B5'] },
      { nom: 'Toleriane', produits: ['Toleriane Dermo-Nettoyant','Toleriane Sensitive Crème','Toleriane Sensitive Fluide','Toleriane Dermallergo Crème','Toleriane Dermallergo Nuit','Toleriane Dermallergo Yeux'] },
      { nom: 'Anthelios', produits: ['Anthelios UVMune 400 Fluide Invisible SPF50+','Anthelios UVMune 400 Crème SPF50+','Anthelios Oil Correct SPF50+','Anthelios Spray Invisible SPF50+','Anthelios Dermo-Pediatrics Spray SPF50+'] },
      { nom: 'Sérums Anti-Âge', produits: ['Hyalu B5 Sérum','Vitamin C10 Sérum','Pure Niacinamide 10 Sérum','Retinol B3 Sérum','Mela B3 Sérum'] },
    ]
  },
  {
    marque: 'Avène',
    gammes: [
      { nom: 'XeraCalm A.D', produits: ['XeraCalm A.D Huile lavante relipidante','XeraCalm A.D Crème relipidante','XeraCalm A.D Baume relipidante','XeraCalm A.D Concentré apaisant'] },
      { nom: 'Cicalfate+', produits: ['Cicalfate+ Crème protectrice réparatrice','Cicalfate+ Gel cicatrice','Cicalfate+ Spray asséchant réparateur','Cicalfate+ Lèvres baume','Cicalfate+ Mains crème'] },
      { nom: 'Hydrance', produits: ['Hydrance Légère émulsion','Hydrance Riche crème','Hydrance Aqua-Gel','Hydrance UV Légère','Hydrance UV Riche'] },
      { nom: 'Cleanance', produits: ['Cleanance Gel nettoyant','Cleanance Comedomed','Cleanance Hydra Crème lavante','Cleanance Hydra Crème apaisante','Cleanance MAT Émulsion','Cleanance Women Soin nuit lissant','Cleanance Solaire SPF 50+'] },
      { nom: 'Tolérance CONTROL', produits: ['Tolérance CONTROL Crème apaisante restauratrice','Tolérance CONTROL Baume apaisant restaurateur','Tolérance CONTROL Lotion nettoyante gélifiée'] },
      { nom: 'Antirougeurs', produits: ['Antirougeurs JOUR Crème apaisante','Antirougeurs JOUR Émulsion','Antirougeurs CALM Masque','Antirougeurs CLEAN Lotion'] },
      { nom: 'Solaires', produits: ['Solaires Crème Sans Parfum SPF 50+','Solaires Fluide Ultra-Léger SPF 50+','Solaires Spray Enfant SPF 50+','Solaires Lait Réparateur Après-Solaire'] },
      { nom: 'Hyaluron Activ B3', produits: ['Hyaluron Activ B3 Crème régénération cellulaire','Hyaluron Activ B3 Aqua gel-crème régénérant','Hyaluron Activ B3 Sérum concentré repulpant','Hyaluron Activ B3 Soin regard triple correction','Hyaluron Activ B3 Crème de nuit multi-intensive'] },
    ]
  },
  {
    marque: 'Bioderma',
    gammes: [
      { nom: 'Sensibio', produits: ['Sensibio H2O Solution micellaire','Sensibio H2O Yeux','Sensibio Gel moussant','Sensibio Defensive','Sensibio Defensive Rich','Sensibio Fort','Sensibio Yeux'] },
      { nom: 'Atoderm', produits: ['Atoderm Huile de douche','Atoderm Gel douche','Atoderm Intensive Baume','Atoderm Crème Ultra','Atoderm Stick lèvres','Atoderm Main & Ongle'] },
      { nom: 'Sébium', produits: ['Sébium H2O','Sébium Gel moussant','Sébium Gel moussant actif','Sébium Kerato+','Sébium Pore Refiner','Sébium Sensitive','Sébium Hydra'] },
      { nom: 'Cicabio', produits: ['Cicabio Crème','Cicabio Pommade','Cicabio Lotion Spray','Cicabio SPF 50+'] },
      { nom: 'Photoderm', produits: ['Photoderm Aquafluide SPF50+','Photoderm Crème SPF50+','Photoderm M SPF50+','Photoderm Kid Spray SPF50+','Photoderm Après-soleil'] },
      { nom: 'Hydrabio', produits: ['Hydrabio H2O','Hydrabio Sérum','Hydrabio Crème'] },
    ]
  },
  {
    marque: 'CeraVe',
    gammes: [
      { nom: 'Nettoyants', produits: ['Crème Lavante Hydratante','Gel Moussant','Huile Lavante Moussante Hydratante','Gel Nettoyant Anti-Rugosités','Gel Nettoyant Anti-Imperfections'] },
      { nom: 'Hydratants', produits: ['Baume Hydratant','Lait Hydratant','Crème Hydratante Visage','Crème Hydratante Visage SPF 25','Crème Hydratante Visage SPF 30','Crème Hydratante Visage SPF 50','Crème Anti-Rugosités'] },
      { nom: 'Anti-Imperfections', produits: ['Gel Anti-Imperfections','Sérum Rétinol Anti-Marques'] },
      { nom: 'Soins Spécifiques', produits: ['Crème Réparatrice Mains','Crème Régénérante Pieds','Crème Contour des Yeux Hydratante'] },
    ]
  },
  {
    marque: 'SVR',
    gammes: [
      { nom: 'Topialyse', produits: ['Topialyse Huile Lavante','Topialyse Gel Lavant','Topialyse Baume Intensif','Topialyse Crème','Topialyse Palpebral Crème','Topialyse Palpebral CC'] },
      { nom: 'Sebiaclear', produits: ['Sebiaclear Gel Moussant','Sebiaclear Eau Micellaire','Sebiaclear Active Gel','Sebiaclear Active Teinté','Sebiaclear Serum','Sebiaclear Hydra','Sebiaclear Ampoule Flash'] },
      { nom: 'Ampoules', produits: ['Ampoule Lift [A]','Ampoule Hydra [B3]','Ampoule Anti-Ox [C]','Ampoule Protect SPF30'] },
      { nom: 'Clairial', produits: ['Clairial Serum','Clairial Day SPF30','Clairial Night Peel','Clairial Ampoule'] },
      { nom: 'Sun Secure', produits: ['Sun Secure Fluide SPF50+','Sun Secure Crème SPF50+','Sun Secure Brume SPF50+','Sun Secure Extreme Gel SPF50+','Sun Secure Après-Solaire'] },
      { nom: 'Densenitium', produits: ['Densitium Crème','Densitium Rose Éclat','Densitium Crème Riche','Densitium Baume Nuit','Densitium Contour des Yeux','Densitium Bi-Sérum'] },
    ]
  },
  {
    marque: 'Eucerin',
    gammes: [
      { nom: 'Hyaluron-Filler + 3x Effect', produits: ['Hyaluron-Filler Soin Jour Peau Normale à Mixte','Hyaluron-Filler Soin Jour Peau Sèche','Hyaluron-Filler Soin de Nuit','Hyaluron-Filler Soin Contour des Yeux','Hyaluron-Filler Booster d\'Hydratation'] },
      { nom: 'Hyaluron-Filler + Elasticity', produits: ['Hyaluron-Filler Elasticity Soin Jour SPF 15','Hyaluron-Filler Elasticity Soin Jour SPF 30','Hyaluron-Filler Elasticity Soin de Nuit','Hyaluron-Filler Elasticity Sérum 3D'] },
      { nom: 'Anti-Pigment', produits: ['Anti-Pigment Sérum Éclat','Anti-Pigment Sérum Duo','Anti-Pigment Soin Jour SPF 30','Anti-Pigment Soin de Nuit','Anti-Pigment Correcteur de Taches'] },
      { nom: 'DermoPure', produits: ['DermoPure Gel Nettoyant','DermoPure Eau Micellaire','DermoPure K10 Soin Rénovateur','DermoPure Fluide Matifiant','DermoPure Sérum Triple Action'] },
      { nom: 'UreaRepair PLUS', produits: ['UreaRepair Émulsion 5% Urée','UreaRepair Émulsion 10% Urée','UreaRepair Crème Mains 5% Urée','UreaRepair Crème Pieds 10% Urée'] },
      { nom: 'Sun Protection', produits: ['Sun Oil Control Gel-Crème SPF 50+','Sun Photoaging Control Fluide SPF 50','Sun Pigment Control Fluide SPF 50'] },
    ]
  },
  {
    marque: 'Uriage',
    gammes: [
      { nom: 'Bariéderm-CICA', produits: ['Bariéderm Cica-Crème','Bariéderm Cica-Spray','Bariéderm Cica-Lèvres','Bariéderm Cica-Mains','Bariéderm Fissures Crevasses'] },
      { nom: 'Xémose', produits: ['Xémose Huile Nettoyante Apaisante','Xémose Syndet Nettoyant','Xémose Crème Relipidante','Xémose Cerat','Xémose Stick Lèvres'] },
      { nom: 'Hyséac', produits: ['Hyséac Gel Nettoyant','Hyséac Pâte SOS','Hyséac 3-Regul','Hyséac Serum Peau Neuve','Hyséac Fluide SPF50+'] },
      { nom: 'Age Lift', produits: ['Age Lift Crème Lissante','Age Lift Fluide Matifiant','Age Lift Intensive Sérum','Age Lift Contour des Yeux'] },
      { nom: 'Bariésun', produits: ['Bariésun Fluide Ultra-Léger SPF50+','Bariésun Crème SPF50+','Bariésun Spray SPF50+','Bariésun Brume Sèche SPF50+'] },
      { nom: 'Bébé 1ère Gamme', produits: ['1ère Eau Nettoyante','1er Shampoing','1ère Crème Change','1er Lait Hydratant','1er Lavant Huile'] },
    ]
  },
  {
    marque: 'Vichy',
    gammes: [
      { nom: 'Liftactiv', produits: ['Liftactiv Collagen Specialist Jour','Liftactiv Collagen Specialist Nuit','Liftactiv Serum B3 Anti-Taches','Liftactiv Retinol Specialist Serum','Liftactiv Supreme Yeux'] },
      { nom: 'Mineral 89', produits: ['Mineral 89 Booster Quotidien','Mineral 89 Crème Boost d\'Hydratation','Mineral 89 Soin Yeux'] },
      { nom: 'Normaderm', produits: ['Normaderm Phytosolution Gel Purifiant','Normaderm Probio-BHA Serum','Normaderm Phytosolution Soin Double-Correction'] },
      { nom: 'Neovadiol', produits: ['Neovadiol Meno 5 Bi-Sérum','Neovadiol Péri-Ménopause Crème Redensifiante','Neovadiol Post-Ménopause Crème Relipidante'] },
      { nom: 'Capital Soleil', produits: ['Capital Soleil UV-Clear SPF50+','Capital Soleil UV-Age Daily SPF50+','Capital Soleil Cell Protect Spray SPF50+','Capital Soleil Lait Apaisant Après-Soleil'] },
    ]
  },
  {
    marque: 'Ducray',
    gammes: [
      { nom: 'Dexyane', produits: ['Dexyane MeD Crème Réparatrice Apaisante','Dexyane Crème Émolliente Anti-grattage'] },
      { nom: 'Keracnyl', produits: ['Keracnyl Gel moussant','Keracnyl PP+ Crème','Keracnyl Glycolic+ Crème','Keracnyl Serum'] },
      { nom: 'Ictyane', produits: ['Ictyane Émollient Hydratant Corps','Ictyane Crème Lavante','Ictyane Eau Micellaire'] },
      { nom: 'Melascreen', produits: ['Melascreen Protective Anti-spots Cream SPF50+','Melascreen Anti-spots Concentrate','Melascreen Photo-aging Global Serum'] },
      { nom: 'Anacaps / Anaphase', produits: ['Anaphase+ Shampoing Anti-chute','Anaphase+ Après-shampoing','Anacaps Expert','Anacaps Tri-Activ','Anacaps Reactiv'] },
      { nom: 'Kelual DS', produits: ['Kelual DS Shampoing','Kelual DS Crème apaisante','Kelual Émulsion croûtes de lait'] },
    ]
  },
  {
    marque: 'A-Derma',
    gammes: [
      { nom: 'Exomega Control', produits: ['Exomega Control Huile Lavante Émolliente','Exomega Control Gel Moussant Émollient','Exomega Control Crème Émolliente','Exomega Control Baume Émollient','Exomega Control Spray Émollient'] },
      { nom: 'Biology', produits: ['Biology Eau Micellaire Dermatologique','Biology Lait Démaquillant','Biology Crème Hydratante Légère','Biology Crème Hydratante Riche','Biology AR Anti-Rougeurs','Biology AC Gel Moussant','Biology AC Global'] },
      { nom: 'Epitheliale A.H', produits: ['Epitheliale A.H Ultra Crème Réparatrice','Epitheliale A.H Duo','Epitheliale A.H Lèvres'] },
      { nom: 'Dermalibour+', produits: ['Dermalibour+ Crème Réparatrice Cu-Zn','Dermalibour+ Gel Moussant','Dermalibour+ Stick'] },
      { nom: 'Protect', produits: ['Protect Fluide SPF50+','Protect Crème SPF50+','Protect AH Lait Après-Solaire'] },
    ]
  },
  {
    marque: 'Nuxe',
    gammes: [
      { nom: 'Huile Prodigieuse', produits: ['Huile Prodigieuse Classique','Huile Prodigieuse Florale','Huile Prodigieuse Or','Huile Prodigieuse Or Florale','Huile Prodigieuse Riche','Huile Prodigieuse Néroli'] },
      { nom: 'Rêve de Miel', produits: ['Rêve de Miel Baume Lèvres Ultra-Nourrissant','Rêve de Miel Stick Lèvres Hydratant','Rêve de Miel Gel Lavant Surgras','Rêve de Miel Crème Visage Ultra-Réconfortante','Rêve de Miel Crème Mains et Ongles'] },
      { nom: 'Nuxuriance Ultra', produits: ['Nuxuriance Ultra Crème Anti-Âge Global','Nuxuriance Ultra Crème Riche Anti-Âge','Nuxuriance Ultra Crème Nuit Anti-Âge','Nuxuriance Ultra Sérum Anti-Âge','Nuxuriance Ultra Soin Ciblé Regard & Lèvres'] },
      { nom: 'Merveillance Lift', produits: ['Merveillance Lift Crème Poudrée','Merveillance Lift Crème Bonne Mine','Merveillance Lift Crème Concentrée de Nuit','Merveillance Lift Sérum-en-Huile','Merveillance Lift Soin Regard'] },
      { nom: 'Nuxe Sun', produits: ['Nuxe Sun Crème Fondante Visage SPF30','Nuxe Sun Crème Fondante Visage SPF50','Nuxe Sun Fluide Léger SPF50','Nuxe Sun Lait Délicieux SPF30','Nuxe Sun Lait Délicieux SPF50','Nuxe Sun Lait Fraîcheur Après-Solaire'] },
    ]
  },
  {
    marque: 'Caudalie',
    gammes: [
      { nom: 'Vinoperfect', produits: ['Vinoperfect Sérum Éclat Anti-taches','Vinoperfect Crème Nuit Glycolique','Vinoperfect Crème Éclat Anti-taches','Vinoperfect Essence Glycolique Concentrée'] },
      { nom: 'Resveratrol-Lift', produits: ['Resveratrol-Lift Sérum Liftant Fermeté','Resveratrol-Lift Crème Cachemire Redensifiante','Resveratrol-Lift Fluide Cachemire','Resveratrol-Lift Crème Tisane de Nuit','Resveratrol-Lift Soin Regard'] },
      { nom: 'Vinosource-Hydra', produits: ['Vinosource Sérum SOS Réhydratant','Vinosource Gelée Eau Raisin Hydratante','Vinosource Crème SOS Hydratation Intense','Vinosource Crème Sorbet Hydratante'] },
      { nom: 'Vinopure', produits: ['Vinopure Gelée Nettoyante Purifiante','Vinopure Lotion Tonique Purifiante','Vinopure Sérum Salicylique Anti-imperfections','Vinopure Fluide Hydratant Mattifiant'] },
      { nom: 'Premier Cru', produits: ['Premier Cru La Crème','Premier Cru La Crème Riche','Premier Cru Le Sérum','Premier Cru La Crème Yeux'] },
    ]
  },
  {
    marque: 'Klorane',
    gammes: [
      { nom: 'Capillaire Avoine', produits: ['Shampoing Ultra-Doux à l\'Avoine','Après-Shampoing à l\'Avoine','Lait Sans Rinçage à l\'Avoine'] },
      { nom: 'Capillaire Quinine & Bétel', produits: ['Shampoing à la Quinine et B6','Après-Shampoing à la Quinine','Sérum Anti-chute à la Quinine'] },
      { nom: 'Capillaire Mangue', produits: ['Shampoing Nourrissant à la Mangue','Après-Shampoing à la Mangue','Crème de Jour à la Mangue'] },
      { nom: 'Shampoings Secs', produits: ['Shampoing Sec à l\'Avoine','Shampoing Sec à l\'Ortie','Shampoing Sec Aquaquentin'] },
      { nom: 'Soin Visage au Bleuet', produits: ['Eau Micellaire au Bleuet','Crème d\'Eau de Bleuet','Bain de Minuit Hydratant'] },
      { nom: 'Bébé', produits: ['Klorane Bébé Gel Lavant Doux','Klorane Bébé Crème Hydratante','Klorane Bébé Eau Nettoyante Micellaire','Klorane Bébé Pommade de Change'] },
    ]
  },
  {
    marque: 'Weleda',
    gammes: [
      { nom: 'Skin Food', produits: ['Skin Food Crème Originale','Skin Food Light','Skin Food Beurre Corporel','Skin Food Soin Lèvres'] },
      { nom: 'Bébé au Calendula', produits: ['Weleda Bébé Crème Lavante Corps et Cheveux','Weleda Bébé Crème Change au Calendula','Weleda Bébé Lait Corporel au Calendula','Weleda Bébé Huile de Massage Calendula'] },
      { nom: 'Huiles de Massage', produits: ['Huile de Massage à l\'Arnica','Huile de Massage Minceur au Bouleau','Huile de Massage Relaxante à la Lavande','Huile Capillaire Nourrissante'] },
      { nom: 'Gammes Visage', produits: ['Grenade Crème de Jour Raffermissante','Grenade Crème de Nuit','Rose Musquée Crème Hydratante'] },
    ]
  },
  {
    marque: 'Mustela',
    gammes: [
      { nom: 'Peau Normale Bébé', produits: ['Mustela Gel Lavant Doux','Mustela Hydra Bébé Crème Visage','Mustela Hydra Bébé Lait Corps','Mustela Eau Rafraîchissante','Mustela Shampoing Mousse Nouveau-Né'] },
      { nom: 'Stelatopia', produits: ['Stelatopia Huile de Douche','Stelatopia Crème Émolliente','Stelatopia Baume Émollient'] },
      { nom: 'Soin du Change', produits: ['Mustela Crème Change 1 2 3','Mustela Liniment Oléo-Calcaire'] },
      { nom: 'Maternité', produits: ['Mustela Crème Vergetures','Mustela Huile Vergetures','Mustela Sérum Vergetures'] },
      { nom: 'Solaire', produits: ['Mustela Spray Solaire SPF50+','Mustela Lait Solaire SPF50+'] },
    ]
  },
  {
    marque: 'MKL Green Nature',
    gammes: [
      { nom: 'Gels Douche', produits: ['Gel Douche Aloé Vera','Gel Douche Amande Douce','Gel Douche Huile d\'Argan','Gel Douche Lait d\'Ânesse','Crème de Douche Monoï'] },
      { nom: 'Soins Aloé Vera', produits: ['Gel Natif Aloé Vera','Crème Visage Hydratante Aloé Vera','Lait Corps Aloé Vera'] },
      { nom: 'Huiles Végétales', produits: ['Huile de Ricin','Huile d\'Amande Douce','Huile de Jojoba','Huile d\'Argan'] },
      { nom: 'Soin des Mains & Lèvres', produits: ['Crème Mains Amande Douce','Stick Lèvres Hydratant'] },
    ]
  },
  {
    marque: 'Lierac',
    gammes: [
      { nom: 'Lift Integral', produits: ['Lift Integral Crème Lift Remodelante','Lift Integral Crème Nuit Lift Sculptante','Lift Integral Sérum Lift Booster','Lift Integral Soin Lift Regard'] },
      { nom: 'Hydragenist', produits: ['Hydragenist Crème Réhydratante Éclat','Hydragenist Gel-Crème Réhydratant','Hydragenist Sérum Réhydratant','Hydragenist Soin Yeux Réhydratant'] },
      { nom: 'Premium', produits: ['Premium La Crème Voluptueuse','Premium La Crème Soyeuse','Premium Le Sérum Absolu','Premium La Crème Regard'] },
      { nom: 'Phytolastil', produits: ['Phytolastil Soluté Correction des Vergetures','Phytolastil Gel Prévention des Vergetures'] },
    ]
  },
  {
    marque: 'Topicrem',
    gammes: [
      { nom: 'UH Ultra-Hydratant', produits: ['UH Lait Corps','UH Crème Visage','UH Sérum','UH Gel Douche'] },
      { nom: 'DA Dermatologie Atopie', produits: ['DA Huile Émolliente','DA Baume Émollient','DA Gel Nettoyant Ultra-Riche'] },
      { nom: 'UR Urée Anti-Rugosités', produits: ['UR-10 Crème Lissante Anti-Rugosités','UR-30 Crème Zones Rugueuses'] },
      { nom: 'MELA', produits: ['MELA Lait Éclaircissant Ultra-Hydratant','MELA Sérum Éclat Anti-Taches','MELA Crème Jour Anti-Taches SPF50+'] },
      { nom: 'AC', produits: ['AC Gel Nettoyant Purifiant','AC Soin Matifiant','AC Crème Compensatrice Hydratante'] },
    ]
  },
  {
    marque: 'Dr. Hauschka',
    gammes: [
      { nom: 'Soins de Base Visage', produits: ['Crème de Jour à la Rose','Crème de Jour à la Rose Légère','Crème de Jour au Coing','Crème de Jour à la Mélisse','Crème Purifiante pour le Visage','Lotion Tonifiante'] },
      { nom: 'Soins Régénérants', produits: ['Crème de Jour Régénérante','Sérum Régénérant','Crème Contour des Yeux Régénérante'] },
      { nom: 'Soins Corps', produits: ['Lait Crème pour le Corps Coing','Huile de Soin Rose et Tourbe','Lait Crème pour le Corps Amande'] },
    ]
  },
  {
    marque: 'Gilbert',
    gammes: [
      { nom: 'Physiodose', produits: ['Physiodose Sérum Physiologique Unidoses','Physiodose Spray Micro-diffusion','Physiodose Mouche-Bébé'] },
      { nom: 'Soins Bébé', produits: ['Gilbert Liniment Oléo-Calcaire Stabilisé','Gilbert Dolodent Solution Gingivale'] },
      { nom: 'Le Comptoir Aroma', produits: ['Spray Assainissant Habitacle','Huile Essentielle Ravintsara','Huile Essentielle Tea Tree'] },
    ]
  },
  {
    marque: 'Hydralin',
    gammes: [
      { nom: 'Hygiène Intime Quotidienne', produits: ['Hydralin Gyn Gel Lavant','Hydralin Quotidien Gel Lavant','Hydralin Mademoiselle'] },
      { nom: 'Soins Spécifiques Intimes', produits: ['Hydralin Gyn Irritations','Hydralin Balance Gel Vaginal'] },
    ]
  },
];

window.DERM_BRANDS_DB = DERM_BRANDS_DB;
