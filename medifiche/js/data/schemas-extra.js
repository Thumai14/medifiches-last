/* MediFiche — SCHEMAS supplémentaires */

'use strict';

// Schémas supplémentaires
const SCHEMAS_EXTRA = {

  bronchite:`<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#F0F7FF"/>
    <text x="250" y="20" text-anchor="middle" font-size="12" fill="#1E3A5F" font-weight="600">Bronchite : toux productive = mécanisme de défense !</text>
    <g transform="translate(30,40)">
      <ellipse cx="70" cy="60" rx="55" ry="45" fill="#E4F4EE" stroke="#1B6B52" stroke-width="2"/>
      <text x="70" y="45" text-anchor="middle" font-size="11" fill="#1B6B52" font-weight="600">Bronche normale</text>
      <ellipse cx="70" cy="62" rx="30" ry="25" fill="white"/>
      <text x="70" y="72" text-anchor="middle" font-size="9" fill="#666">Air libre</text>
      <text x="70" y="125" text-anchor="middle" font-size="9" fill="#1B6B52">Muqueuse saine ✓</text>
    </g>
    <g transform="translate(175,40)">
      <ellipse cx="70" cy="60" rx="55" ry="45" fill="#FDF0EF" stroke="#C0392B" stroke-width="2"/>
      <text x="70" y="45" text-anchor="middle" font-size="11" fill="#C0392B" font-weight="600">Bronchite</text>
      <ellipse cx="70" cy="62" rx="55" ry="45" fill="#FFECDC" stroke="#C0392B" stroke-width="1" opacity="0.7"/>
      <ellipse cx="70" cy="62" rx="22" ry="18" fill="white"/>
      <text x="70" y="66" text-anchor="middle" font-size="9" fill="#666">Mucus ↑</text>
      <text x="70" y="125" text-anchor="middle" font-size="9" fill="#C0392B">Inflammation + sécrétions</text>
    </g>
    <g transform="translate(330,40)">
      <rect x="0" y="30" width="140" height="60" rx="10" fill="#E4F4EE" stroke="#1B6B52" stroke-width="2"/>
      <text x="70" y="52" text-anchor="middle" font-size="10" fill="#1B6B52" font-weight="600">Toux productive</text>
      <text x="70" y="67" text-anchor="middle" font-size="9" fill="#1B6B52">= mécanisme de</text>
      <text x="70" y="80" text-anchor="middle" font-size="9" fill="#1B6B52">nettoyage bronchique</text>
      <text x="70" y="125" text-anchor="middle" font-size="9" fill="#1B6B52">Ne pas bloquer ! ✓</text>
    </g>
    <text x="250" y="175" text-anchor="middle" font-size="10" fill="#C0392B" font-weight="600">90% des bronchites sont virales → antibiotiques INUTILES</text>
  </svg>`,

  bpco:`<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#FFF5F0"/>
    <text x="250" y="18" text-anchor="middle" font-size="12" fill="#C0392B" font-weight="600">BPCO : destruction progressive et irréversible</text>
    <g transform="translate(20,35)">
      <rect x="0" y="0" width="130" height="110" rx="8" fill="white" stroke="#1B6B52" stroke-width="2"/>
      <text x="65" y="18" text-anchor="middle" font-size="10" fill="#1B6B52" font-weight="600">Poumon normal</text>
      <circle cx="40" cy="55" r="18" fill="#E4F4EE" stroke="#1B6B52" stroke-width="1"/>
      <circle cx="90" cy="55" r="18" fill="#E4F4EE" stroke="#1B6B52" stroke-width="1"/>
      <circle cx="40" cy="88" r="18" fill="#E4F4EE" stroke="#1B6B52" stroke-width="1"/>
      <circle cx="90" cy="88" r="18" fill="#E4F4EE" stroke="#1B6B52" stroke-width="1"/>
      <text x="65" y="128" text-anchor="middle" font-size="9" fill="#1B6B52">Alvéoles intactes ✓</text>
    </g>
    <g transform="translate(195,35)">
      <rect x="0" y="0" width="130" height="110" rx="8" fill="white" stroke="#C0392B" stroke-width="2"/>
      <text x="65" y="18" text-anchor="middle" font-size="10" fill="#C0392B" font-weight="600">Emphysème</text>
      <ellipse cx="45" cy="60" rx="32" ry="22" fill="#FDF0EF" stroke="#C0392B" stroke-width="1.5"/>
      <ellipse cx="88" cy="65" rx="28" ry="20" fill="#FDF0EF" stroke="#C0392B" stroke-width="1.5"/>
      <text x="65" y="100" text-anchor="middle" font-size="9" fill="#C0392B">Alvéoles fusionnées</text>
      <text x="65" y="128" text-anchor="middle" font-size="9" fill="#C0392B">Destruction irréversible</text>
    </g>
    <g transform="translate(360,35)">
      <rect x="0" y="0" width="130" height="110" rx="8" fill="#FDF6E8" stroke="#B45309" stroke-width="2"/>
      <text x="65" y="18" text-anchor="middle" font-size="10" fill="#B45309" font-weight="600">Seul traitement</text>
      <text x="65" y="42" text-anchor="middle" font-size="28">🚭</text>
      <text x="65" y="70" text-anchor="middle" font-size="10" fill="#B45309">Arrêt du tabac</text>
      <text x="65" y="85" text-anchor="middle" font-size="9" fill="#B45309">= ralentit l'évolution</text>
      <text x="65" y="100" text-anchor="middle" font-size="9" fill="#B45309">Aucun médicament</text>
      <text x="65" y="128" text-anchor="middle" font-size="9" fill="#B45309">ne guérit la BPCO</text>
    </g>
    <text x="250" y="178" text-anchor="middle" font-size="10" fill="#1E3A5F" font-weight="600">SpO2 < 90% → SAMU 15 | Vaccin grippe + pneumocoque = OBLIGATOIRES</text>
  </svg>`,

  sinusite:`<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#F0F7FF"/>
    <text x="250" y="18" text-anchor="middle" font-size="12" fill="#1E3A5F" font-weight="600">Anatomie des sinus et obstruction</text>
    <ellipse cx="155" cy="95" rx="110" ry="80" fill="#FFE8E0" stroke="#1E3A5F" stroke-width="1.5" opacity="0.3"/>
    <text x="155" y="25" text-anchor="middle" font-size="10" fill="#1E3A5F" font-weight="600">Coupe frontale</text>
    <rect x="110" y="35" width="30" height="25" rx="5" fill="#E4F4EE" stroke="#1B6B52" stroke-width="1.5"/>
    <rect x="155" y="35" width="30" height="25" rx="5" fill="#E4F4EE" stroke="#1B6B52" stroke-width="1.5"/>
    <text x="155" y="30" text-anchor="middle" font-size="9" fill="#1B6B52">Sinus frontaux</text>
    <rect x="100" y="80" width="45" height="35" rx="8" fill="#FDF0EF" stroke="#C0392B" stroke-width="2"/>
    <rect x="155" y="80" width="45" height="35" rx="8" fill="#FDF0EF" stroke="#C0392B" stroke-width="2"/>
    <text x="123" y="100" text-anchor="middle" font-size="9" fill="#C0392B" font-weight="600">Sinus</text>
    <text x="123" y="110" text-anchor="middle" font-size="9" fill="#C0392B">maxillaires</text>
    <text x="177" y="100" text-anchor="middle" font-size="9" fill="#C0392B" font-weight="600">obstrués</text>
    <text x="177" y="110" text-anchor="middle" font-size="9" fill="#C0392B">↑ pression</text>
    <line x1="122" y1="115" x2="122" y2="135" stroke="#C0392B" stroke-width="1.5" stroke-dasharray="3,2"/>
    <text x="122" y="148" text-anchor="middle" font-size="9" fill="#C0392B">Douleur faciale</text>
    <g transform="translate(300,30)">
      <rect x="0" y="0" width="180" height="145" rx="10" fill="white" stroke="#1E3A5F" stroke-width="1.5"/>
      <text x="90" y="18" text-anchor="middle" font-size="10" fill="#1E3A5F" font-weight="600">Critères antibiotique</text>
      <text x="15" y="38" font-size="9" fill="#C0392B">✓ Fièvre + douleur intense unilatérale</text>
      <text x="15" y="52" font-size="9" fill="#C0392B">✓ + sécrétions purulentes</text>
      <text x="15" y="66" font-size="9" fill="#C0392B">✓ + durée > 7 jours sans amélioration</text>
      <line x1="10" y1="76" x2="170" y2="76" stroke="#ddd" stroke-width="1"/>
      <text x="90" y="92" text-anchor="middle" font-size="10" fill="#1B6B52" font-weight="600">Traitement de base</text>
      <text x="15" y="108" font-size="9" fill="#1B6B52">💧 Lavage NaCl hypertonique</text>
      <text x="15" y="122" font-size="9" fill="#1B6B52">🌿 Sinupret® (phytothérapie)</text>
      <text x="15" y="136" font-size="9" fill="#1B6B52">🚿 Décongestionnants max 5j</text>
    </g>
    <text x="155" y="185" text-anchor="middle" font-size="9" fill="#666">Ostiums (ouvertures) bloqués = accumulation + pression + douleur</text>
  </svg>`,

  angine:`<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#FFF5F5"/>
    <text x="250" y="18" text-anchor="middle" font-size="12" fill="#C0392B" font-weight="600">Angine : TDR = clé du bon usage des antibiotiques</text>
    <g transform="translate(20,35)">
      <rect x="0" y="0" width="145" height="120" rx="8" fill="white" stroke="#1B6B52" stroke-width="2"/>
      <text x="72" y="18" text-anchor="middle" font-size="10" fill="#1B6B52" font-weight="600">Angine virale (80%)</text>
      <text x="72" y="48" text-anchor="middle" font-size="24">🔴</text>
      <text x="72" y="68" text-anchor="middle" font-size="9" fill="#666">Gorge rouge diffuse</text>
      <text x="72" y="80" text-anchor="middle" font-size="9" fill="#666">Pas de pus</text>
      <text x="72" y="95" text-anchor="middle" font-size="9" fill="#1B6B52" font-weight="600">TDR négatif</text>
      <text x="72" y="108" text-anchor="middle" font-size="9" fill="#1B6B52">→ Pas d'antibiotique</text>
      <text x="72" y="135" text-anchor="middle" font-size="9" fill="#1B6B52">Antalgiques + repos</text>
    </g>
    <g transform="translate(180,35)">
      <rect x="0" y="0" width="145" height="120" rx="8" fill="white" stroke="#C0392B" stroke-width="2"/>
      <text x="72" y="18" text-anchor="middle" font-size="10" fill="#C0392B" font-weight="600">Angine SGA (20%)</text>
      <text x="72" y="48" text-anchor="middle" font-size="24">🔴🟡</text>
      <text x="72" y="68" text-anchor="middle" font-size="9" fill="#666">Amygdales avec pus</text>
      <text x="72" y="80" text-anchor="middle" font-size="9" fill="#666">Fièvre élevée</text>
      <text x="72" y="95" text-anchor="middle" font-size="9" fill="#C0392B" font-weight="600">TDR positif</text>
      <text x="72" y="108" text-anchor="middle" font-size="9" fill="#C0392B">→ Amoxicilline 6j</text>
      <text x="72" y="135" text-anchor="middle" font-size="9" fill="#C0392B">Prévention RAA</text>
    </g>
    <g transform="translate(345,35)">
      <rect x="0" y="0" width="145" height="120" rx="8" fill="#FDF6E8" stroke="#B45309" stroke-width="2"/>
      <text x="72" y="18" text-anchor="middle" font-size="10" fill="#B45309" font-weight="600">TDR en officine</text>
      <text x="72" y="42" text-anchor="middle" font-size="26">🧪</text>
      <text x="72" y="62" text-anchor="middle" font-size="9" fill="#B45309">Résultat en 5 min</text>
      <text x="72" y="76" text-anchor="middle" font-size="9" fill="#B45309">Remboursé</text>
      <text x="72" y="90" text-anchor="middle" font-size="9" fill="#B45309">depuis 2022</text>
      <text x="72" y="108" text-anchor="middle" font-size="9" fill="#B45309">Réduit de 30%</text>
      <text x="72" y="135" text-anchor="middle" font-size="9" fill="#B45309">les antibiotiques inutiles</text>
    </g>
    <text x="250" y="178" text-anchor="middle" font-size="10" fill="#1E3A5F" font-weight="600">RAA (Rhumatisme Articulaire Aigu) = complication grave du streptocoque non traité</text>
  </svg>`,

  insuffisance_cardiaque:`<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#FFF0F0"/>
    <text x="250" y="18" text-anchor="middle" font-size="12" fill="#C0392B" font-weight="600">Insuffisance cardiaque : le cercle vicieux</text>
    <circle cx="250" cy="105" r="35" fill="#C0392B"/>
    <text x="250" y="100" text-anchor="middle" font-size="14">❤️</text>
    <text x="250" y="116" text-anchor="middle" font-size="9" fill="white" font-weight="600">Cœur</text>
    <text x="250" y="128" text-anchor="middle" font-size="9" fill="white">défaillant</text>
    <path d="M230,72 Q180,40 120,60" stroke="#C0392B" stroke-width="2" fill="none" marker-end="url(#icArr)"/>
    <rect x="30" y="35" width="90" height="40" rx="8" fill="#FDF0EF" stroke="#C0392B" stroke-width="1.5"/>
    <text x="75" y="52" text-anchor="middle" font-size="9" fill="#C0392B" font-weight="600">Débit cardiaque↓</text>
    <text x="75" y="65" text-anchor="middle" font-size="9" fill="#C0392B">Rein hypoperfusé</text>
    <path d="M120,105 Q60,105 75,80" stroke="#C0392B" stroke-width="2" fill="none" marker-end="url(#icArr)"/>
    <rect x="20" y="118" width="100" height="40" rx="8" fill="#FDF6E8" stroke="#B45309" stroke-width="1.5"/>
    <text x="70" y="134" text-anchor="middle" font-size="9" fill="#B45309" font-weight="600">SRAA activé</text>
    <text x="70" y="148" text-anchor="middle" font-size="9" fill="#B45309">Rétention eau+sel</text>
    <path d="M119,143 Q185,155 215,130" stroke="#B45309" stroke-width="2" fill="none" marker-end="url(#icArr)"/>
    <path d="M270,72 Q320,40 380,60" stroke="#C0392B" stroke-width="2" fill="none" marker-end="url(#icArr)"/>
    <rect x="375" y="35" width="100" height="40" rx="8" fill="#FDF0EF" stroke="#C0392B" stroke-width="1.5"/>
    <text x="425" y="52" text-anchor="middle" font-size="9" fill="#C0392B" font-weight="600">Œdèmes</text>
    <text x="425" y="65" text-anchor="middle" font-size="9" fill="#C0392B">Dyspnée</text>
    <path d="M380,105 Q440,105 425,80" stroke="#C0392B" stroke-width="2" fill="none" marker-end="url(#icArr)"/>
    <rect x="375" y="118" width="100" height="40" rx="8" fill="#E4F4EE" stroke="#1B6B52" stroke-width="1.5"/>
    <text x="425" y="134" text-anchor="middle" font-size="9" fill="#1B6B52" font-weight="600">Surveillance</text>
    <text x="425" y="148" text-anchor="middle" font-size="9" fill="#1B6B52">Pesée quotidienne</text>
    <text x="250" y="178" text-anchor="middle" font-size="10" fill="#1B6B52" font-weight="600">+2 kg en 48h = décompensation → appel médecin | AINS formellement CI</text>
    <defs><marker id="icArr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#C0392B"/></marker></defs>
  </svg>`,

  cholesterol:`<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#FFF8F0"/>
    <text x="250" y="18" text-anchor="middle" font-size="12" fill="#B45309" font-weight="600">Formation de la plaque d'athérome</text>
    <g transform="translate(20,35)">
      <ellipse cx="90" cy="65" rx="75" ry="40" fill="white" stroke="#1B6B52" stroke-width="2"/>
      <ellipse cx="90" cy="65" rx="45" ry="22" fill="#E4F4EE"/>
      <text x="90" y="25" text-anchor="middle" font-size="10" fill="#1B6B52" font-weight="600">Artère normale</text>
      <text x="90" y="68" text-anchor="middle" font-size="9" fill="#1B6B52">Lumière libre</text>
      <text x="90" y="125" text-anchor="middle" font-size="9" fill="#1B6B52">LDL = transport correct</text>
    </g>
    <g transform="translate(185,35)">
      <ellipse cx="90" cy="65" rx="75" ry="40" fill="white" stroke="#C0392B" stroke-width="2"/>
      <path d="M20,45 Q90,25 155,45 Q160,65 155,85 Q90,105 20,85 Z" fill="#FFECDC"/>
      <ellipse cx="90" cy="65" rx="30" ry="15" fill="#E4F4EE"/>
      <text x="90" y="25" text-anchor="middle" font-size="10" fill="#C0392B" font-weight="600">Plaque formée</text>
      <text x="90" y="68" text-anchor="middle" font-size="9" fill="#C0392B">Lumière réduite</text>
      <text x="90" y="125" text-anchor="middle" font-size="9" fill="#C0392B">LDL oxydé + inflammation</text>
    </g>
    <g transform="translate(355,35)">
      <ellipse cx="65" cy="65" rx="60" ry="40" fill="white" stroke="#C0392B" stroke-width="3"/>
      <path d="M10,40 Q65,10 120,40 Q130,65 120,90 Q65,120 10,90 Z" fill="#FFCCCC"/>
      <ellipse cx="65" cy="65" rx="15" ry="8" fill="#E4F4EE"/>
      <text x="65" y="22" text-anchor="middle" font-size="10" fill="#C0392B" font-weight="600">Occlusion</text>
      <text x="65" y="68" text-anchor="middle" font-size="9" fill="#C0392B">Infarctus</text>
      <text x="65" y="125" text-anchor="middle" font-size="9" fill="#C0392B">ou AVC</text>
    </g>
    <text x="250" y="165" text-anchor="middle" font-size="10" fill="#1E3A5F" font-weight="600">Statines → ↓ production LDL → ↓ formation plaque</text>
    <text x="250" y="180" text-anchor="middle" font-size="10" fill="#C0392B" font-weight="600">Pamplemousse + statines → CI absolue (CYP3A4)</text>
  </svg>`,

  goutte:`<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#F5FFF5"/>
    <text x="250" y="18" text-anchor="middle" font-size="12" fill="#1B6B52" font-weight="600">Physiopathologie de la goutte</text>
    <circle cx="80" cy="90" r="45" fill="#FDF6E8" stroke="#B45309" stroke-width="2"/>
    <text x="80" y="72" text-anchor="middle" font-size="9" fill="#B45309" font-weight="600">Hyperuricémie</text>
    <text x="80" y="85" text-anchor="middle" font-size="18">⚗️</text>
    <text x="80" y="105" text-anchor="middle" font-size="9" fill="#B45309">Acide urique</text>
    <text x="80" y="118" text-anchor="middle" font-size="9" fill="#B45309">> 360 µmol/L</text>
    <line x1="126" y1="90" x2="163" y2="90" stroke="#B45309" stroke-width="2" marker-end="url(#gArr)"/>
    <rect x="165" y="65" width="110" height="50" rx="8" fill="#FDF0EF" stroke="#C0392B" stroke-width="2"/>
    <text x="220" y="83" text-anchor="middle" font-size="9" fill="#C0392B" font-weight="600">Cristaux urate</text>
    <text x="220" y="96" text-anchor="middle" font-size="9" fill="#C0392B">se précipitent dans</text>
    <text x="220" y="109" text-anchor="middle" font-size="9" fill="#C0392B">les articulations</text>
    <line x1="276" y1="90" x2="313" y2="90" stroke="#C0392B" stroke-width="2" marker-end="url(#gArr)"/>
    <circle cx="360" cy="90" r="45" fill="#C0392B"/>
    <text x="360" y="78" text-anchor="middle" font-size="16">🦶</text>
    <text x="360" y="96" text-anchor="middle" font-size="9" fill="white" font-weight="600">Crise de goutte</text>
    <text x="360" y="108" text-anchor="middle" font-size="9" fill="white">Douleur INTENSE</text>
    <line x1="406" y1="90" x2="440" y2="90" stroke="#1B6B52" stroke-width="2" marker-end="url(#gArr2)"/>
    <rect x="440" y="72" width="55" height="36" rx="6" fill="#E4F4EE" stroke="#1B6B52" stroke-width="2"/>
    <text x="468" y="87" text-anchor="middle" font-size="9" fill="#1B6B52" font-weight="600">Allopurinol</text>
    <text x="468" y="100" text-anchor="middle" font-size="8" fill="#1B6B52">↓ uricémie</text>
    <text x="250" y="155" text-anchor="middle" font-size="10" fill="#1B6B52" font-weight="600">Colchicine = traitement de la crise | Allopurinol = prévention au long cours</text>
    <text x="250" y="170" text-anchor="middle" font-size="10" fill="#B45309" font-weight="600">NE PAS démarrer l'allopurinol EN CRISE (aggrave) — attendre la rémission</text>
    <text x="250" y="185" text-anchor="middle" font-size="9" fill="#666">Cerises + eau de Vichy = réduction naturelle prouvée des crises</text>
    <defs>
      <marker id="gArr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#B45309"/></marker>
      <marker id="gArr2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1B6B52"/></marker>
    </defs>
  </svg>`,

  rgo:`<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#FFF5F0"/>
    <text x="250" y="18" text-anchor="middle" font-size="12" fill="#C0392B" font-weight="600">Mécanisme du reflux gastro-œsophagien</text>
    <path d="M130,40 Q160,60 160,100 Q160,140 130,155" stroke="#1E3A5F" stroke-width="15" fill="none" stroke-linecap="round"/>
    <text x="100" y="30" text-anchor="middle" font-size="10" fill="#1E3A5F">Œsophage</text>
    <ellipse cx="230" cy="140" rx="60" ry="40" fill="#FDF6E8" stroke="#B45309" stroke-width="2"/>
    <text x="230" y="138" text-anchor="middle" font-size="10" fill="#B45309" font-weight="600">Estomac</text>
    <text x="230" y="152" text-anchor="middle" font-size="9" fill="#B45309">pH = 1-2</text>
    <ellipse cx="165" cy="102" rx="12" ry="8" fill="#C0392B" stroke="#C0392B" stroke-width="1"/>
    <text x="215" y="100" text-anchor="middle" font-size="9" fill="#C0392B" font-weight="600">SOI défaillant</text>
    <text x="215" y="113" text-anchor="middle" font-size="9" fill="#C0392B">(sphincter ouvert)</text>
    <path d="M165,93 Q145,70 140,50" stroke="#C0392B" stroke-width="3" fill="none" stroke-dasharray="4,2" marker-end="url(#rArr)"/>
    <text x="115" y="65" font-size="9" fill="#C0392B" font-weight="600">Reflux acide</text>
    <text x="115" y="78" font-size="9" fill="#C0392B">→ brûlures</text>
    <g transform="translate(300,35)">
      <rect x="0" y="0" width="185" height="130" rx="10" fill="white" stroke="#1B6B52" stroke-width="1.5"/>
      <text x="92" y="18" text-anchor="middle" font-size="10" fill="#1B6B52" font-weight="600">Mesures efficaces</text>
      <text x="15" y="36" font-size="9" fill="#1B6B52">🛏️ Surélever tête de lit 15-20cm</text>
      <text x="15" y="50" font-size="9" fill="#1B6B52">⏰ Pas de repas dans les 3h avant coucher</text>
      <text x="15" y="64" font-size="9" fill="#1B6B52">⚖️ Perte de poids si IMC élevé</text>
      <text x="15" y="78" font-size="9" fill="#B45309">❌ Café, alcool, chocolat, menthe</text>
      <text x="15" y="92" font-size="9" fill="#1B6B52">💊 IPP 30 min AVANT le repas</text>
      <text x="15" y="106" font-size="9" fill="#1B6B52">🌊 Gaviscon® barrière physique post-repas</text>
      <text x="15" y="120" font-size="9" fill="#666" font-style="italic">IPP = 30 min avant pour efficacité max</text>
    </g>
    <defs><marker id="rArr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#C0392B"/></marker></defs>
  </svg>`,

  hemorrhoides:`<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#FFF5F0"/>
    <text x="250" y="18" text-anchor="middle" font-size="12" fill="#B45309" font-weight="600">Hémorroïdes : traitement de la cause avant tout</text>
    <circle cx="140" cy="100" r="70" fill="#FDF0EF" stroke="#C0392B" stroke-width="2"/>
    <text x="140" y="55" text-anchor="middle" font-size="9" fill="#C0392B" font-weight="600">Plexus hémorroïdaires</text>
    <ellipse cx="140" cy="80" rx="20" ry="14" fill="#C0392B" stroke="#8B0000" stroke-width="1"/>
    <ellipse cx="115" cy="105" rx="18" ry="12" fill="#C0392B" stroke="#8B0000" stroke-width="1"/>
    <ellipse cx="165" cy="105" rx="18" ry="12" fill="#C0392B" stroke="#8B0000" stroke-width="1"/>
    <ellipse cx="140" cy="128" rx="20" ry="13" fill="#C0392B" stroke="#8B0000" stroke-width="1"/>
    <text x="140" y="155" text-anchor="middle" font-size="9" fill="#C0392B">Congestion veineuse</text>
    <g transform="translate(255,30)">
      <rect x="0" y="0" width="220" height="55" rx="8" fill="#FDF0EF" stroke="#C0392B" stroke-width="1.5"/>
      <text x="110" y="16" text-anchor="middle" font-size="10" fill="#C0392B" font-weight="600">Facteurs aggravants</text>
      <text x="15" y="32" font-size="9" fill="#C0392B">⬛ Constipation + efforts poussée</text>
      <text x="15" y="46" font-size="9" fill="#C0392B">⬛ Station assise prolongée · Grossesse · Alcool</text>
    </g>
    <g transform="translate(255,100)">
      <rect x="0" y="0" width="220" height="75" rx="8" fill="#E4F4EE" stroke="#1B6B52" stroke-width="1.5"/>
      <text x="110" y="16" text-anchor="middle" font-size="10" fill="#1B6B52" font-weight="600">Traitement</text>
      <text x="15" y="32" font-size="9" fill="#1B6B52">✓ Fibres + eau → selles molles (priorité)</text>
      <text x="15" y="46" font-size="9" fill="#1B6B52">✓ Bains de siège eau tiède 3×/jour</text>
      <text x="15" y="60" font-size="9" fill="#1B6B52">✓ Daflon® (diosmine) — veinotonique</text>
    </g>
    <text x="250" y="188" text-anchor="middle" font-size="10" fill="#666">Saignements → éliminer cancer colorectal avant de traiter des hémorroïdes</text>
  </svg>`,

  sii:`<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#F5FFF5"/>
    <text x="250" y="18" text-anchor="middle" font-size="12" fill="#1B6B52" font-weight="600">Axe intestin-cerveau dans le SII</text>
    <circle cx="100" cy="90" r="55" fill="#E4F4EE" stroke="#1B6B52" stroke-width="2"/>
    <text x="100" y="68" text-anchor="middle" font-size="18">🧠</text>
    <text x="100" y="88" text-anchor="middle" font-size="10" fill="#1B6B52" font-weight="600">Cerveau</text>
    <text x="100" y="102" text-anchor="middle" font-size="9" fill="#1B6B52">Stress, anxiété</text>
    <text x="100" y="115" text-anchor="middle" font-size="9" fill="#1B6B52">→ somatisation</text>
    <path d="M155,80 Q220,50 255,80" stroke="#1B6B52" stroke-width="2" fill="none" marker-end="url(#siiArr)"/>
    <path d="M255,100 Q220,130 155,105" stroke="#6B2D5E" stroke-width="2" fill="none" marker-end="url(#siiArr2)"/>
    <text x="210" y="62" text-anchor="middle" font-size="9" fill="#1B6B52">axe cérébro-intestinal</text>
    <text x="210" y="135" text-anchor="middle" font-size="9" fill="#6B2D5E">axe intestino-cérébral</text>
    <circle cx="320" cy="90" r="55" fill="#FDF6E8" stroke="#B45309" stroke-width="2"/>
    <text x="320" y="68" text-anchor="middle" font-size="18">🦠</text>
    <text x="320" y="88" text-anchor="middle" font-size="10" fill="#B45309" font-weight="600">Intestin</text>
    <text x="320" y="102" text-anchor="middle" font-size="9" fill="#B45309">Dysbiose, hypersensibilité</text>
    <text x="320" y="115" text-anchor="middle" font-size="9" fill="#B45309">viscérale, FODMAPs</text>
    <text x="250" y="162" text-anchor="middle" font-size="10" fill="#1E3A5F" font-weight="600">Menthe poivrée gélule gastro-résistante = traitement prouvé des douleurs</text>
    <text x="250" y="177" text-anchor="middle" font-size="10" fill="#6B2D5E" font-weight="600">Régime pauvre en FODMAPs : efficace dans 75% des cas</text>
    <text x="250" y="192" text-anchor="middle" font-size="9" fill="#666">Alarme : sang, amaigrissement, > 50 ans → coloscopie</text>
    <defs>
      <marker id="siiArr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1B6B52"/></marker>
      <marker id="siiArr2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#6B2D5E"/></marker>
    </defs>
  </svg>`,

  lombalgie:`<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#FFF8F0"/>
    <text x="250" y="18" text-anchor="middle" font-size="12" fill="#B45309" font-weight="600">Lombalgie : le repos au lit est contre-productif !</text>
    <g transform="translate(20,35)">
      <rect x="0" y="0" width="140" height="120" rx="8" fill="#FDF0EF" stroke="#C0392B" stroke-width="2"/>
      <text x="70" y="18" text-anchor="middle" font-size="10" fill="#C0392B" font-weight="600">Repos au lit</text>
      <text x="70" y="45" text-anchor="middle" font-size="28">🛏️</text>
      <text x="70" y="72" text-anchor="middle" font-size="9" fill="#C0392B">Muscles s'atrophient</text>
      <text x="70" y="85" text-anchor="middle" font-size="9" fill="#C0392B">Disques se déshydratent</text>
      <text x="70" y="98" text-anchor="middle" font-size="9" fill="#C0392B">Psychologie négative</text>
      <text x="70" y="113" text-anchor="middle" font-size="9" fill="#C0392B" font-weight="600">→ Chronicisation !</text>
    </g>
    <text x="210" y="95" text-anchor="middle" font-size="28" fill="#999">VS</text>
    <g transform="translate(250,35)">
      <rect x="0" y="0" width="230" height="120" rx="8" fill="#E4F4EE" stroke="#1B6B52" stroke-width="2"/>
      <text x="115" y="18" text-anchor="middle" font-size="10" fill="#1B6B52" font-weight="600">Maintien activité physique</text>
      <text x="115" y="43" text-anchor="middle" font-size="26">🚶</text>
      <text x="115" y="68" text-anchor="middle" font-size="9" fill="#1B6B52">Muscles restent toniques</text>
      <text x="115" y="81" text-anchor="middle" font-size="9" fill="#1B6B52">Disques restent hydratés</text>
      <text x="115" y="94" text-anchor="middle" font-size="9" fill="#1B6B52">Récupération accélérée</text>
      <text x="115" y="110" text-anchor="middle" font-size="9" fill="#1B6B52" font-weight="600">90% guérison en 6 semaines ✓</text>
    </g>
    <text x="250" y="175" text-anchor="middle" font-size="10" fill="#C0392B" font-weight="600">⚠️ Drapeaux rouges : déficit neuro, fièvre, perte de poids → médecin urgent</text>
    <text x="250" y="190" text-anchor="middle" font-size="9" fill="#1B6B52">Harpagophytum 2400mg = anti-inflammatoire naturel prouvé dans la lombalgie</text>
  </svg>`,

  osteoporose:`<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#F5F5FF"/>
    <text x="250" y="18" text-anchor="middle" font-size="12" fill="#1E3A5F" font-weight="600">Remodelage osseux : équilibre normal vs ostéoporose</text>
    <g transform="translate(20,40)">
      <rect x="0" y="0" width="200" height="110" rx="8" fill="white" stroke="#1B6B52" stroke-width="2"/>
      <text x="100" y="18" text-anchor="middle" font-size="10" fill="#1B6B52" font-weight="600">Os normal</text>
      <rect x="20" y="28" width="70" height="70" rx="5" fill="#E8D5A3" stroke="#8B6914" stroke-width="1"/>
      <circle cx="35" cy="45" r="6" fill="white"/>
      <circle cx="55" cy="42" r="6" fill="white"/>
      <circle cx="70" cy="48" r="6" fill="white"/>
      <circle cx="42" cy="62" r="6" fill="white"/>
      <circle cx="62" cy="65" r="6" fill="white"/>
      <circle cx="78" cy="55" r="7" fill="white"/>
      <text x="55" y="115" text-anchor="middle" font-size="9" fill="#1B6B52">Travées osseuses épaisses</text>
      <rect x="110" y="28" width="80" height="70" rx="5" fill="#E4F4EE" stroke="#1B6B52" stroke-width="1"/>
      <text x="150" y="48" text-anchor="middle" font-size="9" fill="#1B6B52">Ostéoclastes</text>
      <text x="150" y="60" text-anchor="middle" font-size="9" fill="#1B6B52">(destruction)</text>
      <line x1="150" y1="68" x2="150" y2="75" stroke="#555" stroke-width="1"/>
      <text x="150" y="85" text-anchor="middle" font-size="9" fill="#1B6B52">Ostéoblastes</text>
      <text x="150" y="95" text-anchor="middle" font-size="9" fill="#1B6B52">(construction)</text>
      <text x="150" y="115" text-anchor="middle" font-size="9" fill="#1B6B52">Équilibre ✓</text>
    </g>
    <g transform="translate(270,40)">
      <rect x="0" y="0" width="210" height="110" rx="8" fill="white" stroke="#C0392B" stroke-width="2"/>
      <text x="105" y="18" text-anchor="middle" font-size="10" fill="#C0392B" font-weight="600">Ostéoporose</text>
      <rect x="10" y="28" width="80" height="70" rx="5" fill="#FFECDC" stroke="#C0392B" stroke-width="1"/>
      <circle cx="25" cy="45" r="9" fill="white"/>
      <circle cx="50" cy="40" r="10" fill="white"/>
      <circle cx="72" cy="50" r="8" fill="white"/>
      <circle cx="38" cy="68" r="9" fill="white"/>
      <circle cx="65" cy="72" r="8" fill="white"/>
      <text x="50" y="115" text-anchor="middle" font-size="9" fill="#C0392B">Travées amincies</text>
      <rect x="105" y="28" width="95" height="70" rx="5" fill="#FDF0EF" stroke="#C0392B" stroke-width="1"/>
      <text x="152" y="48" text-anchor="middle" font-size="9" fill="#C0392B">Ostéoclastes ↑↑</text>
      <text x="152" y="60" text-anchor="middle" font-size="9" fill="#C0392B">(destruction ++)</text>
      <text x="152" y="80" text-anchor="middle" font-size="9" fill="#666">Ostéoblastes</text>
      <text x="152" y="92" text-anchor="middle" font-size="9" fill="#666">(insuffisants)</text>
      <text x="152" y="115" text-anchor="middle" font-size="9" fill="#C0392B">Déséquilibre !</text>
    </g>
    <text x="250" y="172" text-anchor="middle" font-size="10" fill="#1B6B52" font-weight="600">Bisphosphonates → inhibent les ostéoclastes | Calcium+VitD+K2 = socle</text>
    <text x="250" y="187" text-anchor="middle" font-size="9" fill="#B45309">Bisphosphonate oral = à jeun + eau + rester debout 30 min (risque œsophagite)</text>
  </svg>`,

  depression:`<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#F5F0FF"/>
    <text x="250" y="18" text-anchor="middle" font-size="12" fill="#6B2D5E" font-weight="600">Dépression : synapse sérotoninergique</text>
    <g transform="translate(30,35)">
      <rect x="0" y="0" width="200" height="130" rx="8" fill="white" stroke="#1B6B52" stroke-width="2"/>
      <text x="100" y="18" text-anchor="middle" font-size="10" fill="#1B6B52" font-weight="600">Synapse normale</text>
      <rect x="25" y="28" width="150" height="30" rx="5" fill="#E4F4EE" stroke="#1B6B52"/>
      <text x="100" y="47" text-anchor="middle" font-size="9" fill="#1B6B52">Neurone pré-synaptique</text>
      <circle cx="55" cy="78" r="8" fill="#6B2D5E"/>
      <circle cx="85" cy="72" r="8" fill="#6B2D5E"/>
      <circle cx="115" cy="78" r="8" fill="#6B2D5E"/>
      <circle cx="145" cy="72" r="8" fill="#6B2D5E"/>
      <text x="100" y="94" text-anchor="middle" font-size="9" fill="#6B2D5E">Sérotonine (5-HT)</text>
      <rect x="25" y="100" width="150" height="25" rx="5" fill="#E4F4EE" stroke="#1B6B52"/>
      <text x="100" y="116" text-anchor="middle" font-size="9" fill="#1B6B52">Neurone post-synaptique</text>
    </g>
    <g transform="translate(270,35)">
      <rect x="0" y="0" width="210" height="130" rx="8" fill="white" stroke="#C0392B" stroke-width="2"/>
      <text x="105" y="18" text-anchor="middle" font-size="10" fill="#C0392B" font-weight="600">Dépression + ISRS</text>
      <rect x="25" y="28" width="160" height="30" rx="5" fill="#FDF0EF" stroke="#C0392B"/>
      <text x="105" y="47" text-anchor="middle" font-size="9" fill="#C0392B">Neurone pré-synaptique</text>
      <circle cx="55" cy="78" r="8" fill="#6B2D5E"/>
      <circle cx="85" cy="72" r="8" fill="#6B2D5E"/>
      <circle cx="115" cy="78" r="8" fill="#6B2D5E"/>
      <circle cx="145" cy="72" r="8" fill="#6B2D5E"/>
      <rect x="48" y="93" width="110" height="10" rx="3" fill="#1B6B52" opacity="0.8"/>
      <text x="105" y="102" text-anchor="middle" font-size="8" fill="white">ISRS bloque recaptage</text>
      <rect x="25" y="108" width="160" height="25" rx="5" fill="#E4F4EE" stroke="#1B6B52"/>
      <text x="105" y="120" text-anchor="middle" font-size="9" fill="#1B6B52">Plus de sérotonine disponible ✓</text>
    </g>
    <text x="250" y="182" text-anchor="middle" font-size="10" fill="#6B2D5E" font-weight="600">Efficacité après 2-4 semaines — ne jamais arrêter brutalement</text>
    <text x="250" y="196" text-anchor="middle" font-size="9" fill="#1B6B52">Exercice physique = aussi efficace qu'un antidépresseur dans les formes légères</text>
  </svg>`,

  anxiete:`<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#F0F5FF"/>
    <text x="250" y="18" text-anchor="middle" font-size="12" fill="#1E3A5F" font-weight="600">Cohérence cardiaque : outil de régulation de l'anxiété</text>
    <path d="M30,100 Q60,40 90,100 Q120,160 150,100 Q180,40 210,100 Q240,160 270,100 Q300,40 330,100 Q360,160 390,100 Q420,40 450,100" stroke="#1E3A5F" stroke-width="3" fill="none"/>
    <text x="90" y="140" text-anchor="middle" font-size="9" fill="#1B6B52">Inspiration</text>
    <text x="90" y="153" text-anchor="middle" font-size="9" fill="#1B6B52">5 secondes</text>
    <text x="210" y="130" text-anchor="middle" font-size="9" fill="#C0392B">Expiration</text>
    <text x="210" y="143" text-anchor="middle" font-size="9" fill="#C0392B">5 secondes</text>
    <text x="250" y="175" text-anchor="middle" font-size="11" fill="#1E3A5F" font-weight="600">5 min · 3 fois/jour → ↓ cortisol de 20%</text>
    <rect x="20" y="15" width="80" height="25" rx="5" fill="#E4F4EE" stroke="#1B6B52"/>
    <text x="60" y="30" text-anchor="middle" font-size="9" fill="#1B6B52">Systeme parasympathique ↑</text>
    <rect x="400" y="15" width="85" height="25" rx="5" fill="#FDF0EF" stroke="#C0392B"/>
    <text x="442" y="30" text-anchor="middle" font-size="9" fill="#C0392B">Système sympathique ↓</text>
    <text x="250" y="190" text-anchor="middle" font-size="10" fill="#6B2D5E" font-weight="600">BZD max 12 semaines | TCC = traitement de 1ère ligne | Magnésium 400mg</text>
  </svg>`,

  cystite:`<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#F5FFF5"/>
    <text x="250" y="18" text-anchor="middle" font-size="12" fill="#1B6B52" font-weight="600">Mécanisme de la cystite à E. coli</text>
    <circle cx="120" cy="95" r="40" fill="#FDF6E8" stroke="#B45309" stroke-width="2"/>
    <text x="120" y="78" text-anchor="middle" font-size="14">🦠</text>
    <text x="120" y="96" text-anchor="middle" font-size="9" fill="#B45309" font-weight="600">E. coli</text>
    <text x="120" y="108" text-anchor="middle" font-size="9" fill="#B45309">Fimbriae</text>
    <text x="120" y="120" text-anchor="middle" font-size="9" fill="#B45309">(ventouses)</text>
    <line x1="162" y1="95" x2="200" y2="95" stroke="#C0392B" stroke-width="2" marker-end="url(#cArr)"/>
    <rect x="200" y="65" width="100" height="60" rx="8" fill="#FDF0EF" stroke="#C0392B" stroke-width="2"/>
    <text x="250" y="85" text-anchor="middle" font-size="9" fill="#C0392B" font-weight="600">Urothélium</text>
    <text x="250" y="100" text-anchor="middle" font-size="9" fill="#C0392B">vessie</text>
    <text x="250" y="115" text-anchor="middle" font-size="9" fill="#C0392B">colonisé</text>
    <circle cx="350" cy="95" r="35" fill="#E4F4EE" stroke="#1B6B52" stroke-width="2"/>
    <text x="350" y="80" text-anchor="middle" font-size="14">🍬</text>
    <text x="350" y="98" text-anchor="middle" font-size="9" fill="#1B6B52" font-weight="600">D-mannose</text>
    <text x="350" y="110" text-anchor="middle" font-size="9" fill="#1B6B52">E. coli se fixe</text>
    <text x="350" y="122" text-anchor="middle" font-size="9" fill="#1B6B52">dessus → éliminée</text>
    <text x="430" y="95" text-anchor="middle" font-size="24">🚽</text>
    <text x="430" y="120" text-anchor="middle" font-size="9" fill="#1B6B52">Éliminée</text>
    <line x1="302" y1="95" x2="312" y2="95" stroke="#1B6B52" stroke-width="2" marker-end="url(#cArr2)"/>
    <line x1="387" y1="95" x2="408" y2="95" stroke="#1B6B52" stroke-width="2" marker-end="url(#cArr2)"/>
    <text x="250" y="155" text-anchor="middle" font-size="10" fill="#1B6B52" font-weight="600">Bandelette urinaire AVANT l'antibiotique | Fosfomycine = dose unique</text>
    <text x="250" y="170" text-anchor="middle" font-size="10" fill="#6B2D5E" font-weight="600">D-mannose 2g/jour = prévention récidives à E. coli (prouvé)</text>
    <text x="250" y="185" text-anchor="middle" font-size="9" fill="#C0392B">Cystite chez l'homme = TOUJOURS médecin (jamais banale)</text>
    <defs>
      <marker id="cArr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#C0392B"/></marker>
      <marker id="cArr2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1B6B52"/></marker>
    </defs>
  </svg>`,

  grippe:`<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#FFF0F5"/>
    <text x="250" y="18" text-anchor="middle" font-size="12" fill="#C0392B" font-weight="600">Influenza : fenêtre thérapeutique des antiviraux</text>
    <line x1="30" y1="110" x2="470" y2="110" stroke="#ddd" stroke-width="2"/>
    <line x1="30" y1="110" x2="30" y2="30" stroke="#ddd" stroke-width="1.5"/>
    <text x="20" y="115" font-size="8" fill="#666">J0</text>
    <text x="98" y="115" font-size="8" fill="#666">J2</text>
    <text x="168" y="115" font-size="8" fill="#666">J4</text>
    <text x="238" y="115" font-size="8" fill="#666">J7</text>
    <text x="308" y="115" font-size="8" fill="#666">J10</text>
    <path d="M30,105 Q80,40 140,35 Q200,30 260,60 Q320,90 380,105 Q420,108 470,110" stroke="#C0392B" stroke-width="2.5" fill="none"/>
    <text x="140" y="28" text-anchor="middle" font-size="9" fill="#C0392B" font-weight="600">Pic viral</text>
    <rect x="30" y="118" width="140" height="20" rx="4" fill="#C0392B" opacity="0.2"/>
    <text x="100" y="130" text-anchor="middle" font-size="9" fill="#C0392B" font-weight="600">Tamiflu® efficace (48h)</text>
    <line x1="170" y1="110" x2="170" y2="80" stroke="#C0392B" stroke-width="2" stroke-dasharray="4,2"/>
    <text x="172" y="75" font-size="9" fill="#C0392B" font-weight="600">48h = limite</text>
    <circle cx="50" cy="105" r="6" fill="#C0392B"/>
    <text x="50" y="150" text-anchor="middle" font-size="9" fill="#B45309">Symptômes</text>
    <text x="50" y="163" text-anchor="middle" font-size="9" fill="#B45309">débuten</text>
    <text x="250" y="178" text-anchor="middle" font-size="10" fill="#1B6B52" font-weight="600">Aspirine CI < 15 ans | Vaccin annuel = meilleure protection</text>
    <text x="250" y="193" text-anchor="middle" font-size="9" fill="#6B2D5E">Sureau noir (Sambucol®) = antiviral naturel prouvé contre influenza A et B</text>
  </svg>`,

  herpes:`<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#FFF5F5"/>
    <text x="250" y="18" text-anchor="middle" font-size="12" fill="#C0392B" font-weight="600">Cycle du virus herpès (HSV-1)</text>
    <line x1="30" y1="150" x2="470" y2="150" stroke="#ddd" stroke-width="2"/>
    <circle cx="80" cy="100" r="32" fill="#E4F4EE" stroke="#1B6B52" stroke-width="2"/>
    <text x="80" y="88" text-anchor="middle" font-size="16">🧒</text>
    <text x="80" y="108" text-anchor="middle" font-size="9" fill="#1B6B52" font-weight="600">Primo-infection</text>
    <text x="80" y="120" text-anchor="middle" font-size="9" fill="#1B6B52">Varicelle</text>
    <text x="80" y="165" text-anchor="middle" font-size="9" fill="#1B6B52">Enfance</text>
    <line x1="113" y1="100" x2="147" y2="100" stroke="#666" stroke-width="2" marker-end="url(#hArr)"/>
    <circle cx="180" cy="100" r="32" fill="#FDF6E8" stroke="#B45309" stroke-width="2"/>
    <text x="180" y="88" text-anchor="middle" font-size="16">😴</text>
    <text x="180" y="105" text-anchor="middle" font-size="9" fill="#B45309" font-weight="600">Latence</text>
    <text x="180" y="118" text-anchor="middle" font-size="9" fill="#B45309">Ganglion</text>
    <text x="180" y="165" text-anchor="middle" font-size="9" fill="#B45309">Toute la vie</text>
    <line x1="213" y1="100" x2="247" y2="100" stroke="#666" stroke-width="2" marker-end="url(#hArr)"/>
    <circle cx="280" cy="100" r="32" fill="#FDF0EF" stroke="#C0392B" stroke-width="2.5"/>
    <text x="280" y="88" text-anchor="middle" font-size="16">⚡</text>
    <text x="280" y="105" text-anchor="middle" font-size="9" fill="#C0392B" font-weight="600">Réactivation</text>
    <text x="280" y="118" text-anchor="middle" font-size="9" fill="#C0392B">Stress, UV, fièvre</text>
    <text x="280" y="165" text-anchor="middle" font-size="9" fill="#C0392B">Prodromes !</text>
    <line x1="313" y1="100" x2="347" y2="100" stroke="#1B6B52" stroke-width="2" marker-end="url(#hArr2)"/>
    <circle cx="400" cy="100" r="42" fill="#E4F4EE" stroke="#1B6B52" stroke-width="2"/>
    <text x="400" y="82" text-anchor="middle" font-size="16">💊</text>
    <text x="400" y="100" text-anchor="middle" font-size="9" fill="#1B6B52" font-weight="600">Aciclovir crème</text>
    <text x="400" y="113" text-anchor="middle" font-size="9" fill="#1B6B52">DÈS LES PRODROMES</text>
    <text x="400" y="126" text-anchor="middle" font-size="9" fill="#1B6B52">(fourmillements)</text>
    <text x="400" y="165" text-anchor="middle" font-size="9" fill="#1B6B52">Inutile après vésicules</text>
    <defs>
      <marker id="hArr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#666"/></marker>
      <marker id="hArr2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1B6B52"/></marker>
    </defs>
  </svg>`,

  covid:`<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#F5F0FF"/>
    <text x="250" y="18" text-anchor="middle" font-size="12" fill="#6B2D5E" font-weight="600">SARS-CoV-2 : mécanisme d'infection et surveillance</text>
    <circle cx="100" cy="90" r="40" fill="#FDF0EF" stroke="#C0392B" stroke-width="2"/>
    <text x="100" y="75" text-anchor="middle" font-size="18">🦠</text>
    <text x="100" y="95" text-anchor="middle" font-size="9" fill="#C0392B" font-weight="600">SARS-CoV-2</text>
    <text x="100" y="108" text-anchor="middle" font-size="9" fill="#C0392B">Protéine Spike</text>
    <line x1="141" y1="90" x2="175" y2="90" stroke="#C0392B" stroke-width="2" marker-end="url(#cvArr)"/>
    <rect x="175" y="65" width="100" height="50" rx="8" fill="#FDF6E8" stroke="#B45309" stroke-width="2"/>
    <text x="225" y="83" text-anchor="middle" font-size="9" fill="#B45309" font-weight="600">Récepteur ACE2</text>
    <text x="225" y="97" text-anchor="middle" font-size="9" fill="#B45309">Cellule pulmonaire</text>
    <text x="225" y="109" text-anchor="middle" font-size="9" fill="#B45309">→ Infection</text>
    <g transform="translate(320,40)">
      <rect x="0" y="0" width="170" height="115" rx="8" fill="white" stroke="#1E3A5F" stroke-width="1.5"/>
      <text x="85" y="16" text-anchor="middle" font-size="10" fill="#1E3A5F" font-weight="600">Surveillance domicile</text>
      <text x="85" y="35" text-anchor="middle" font-size="22">🩺</text>
      <text x="15" y="58" font-size="9" fill="#C0392B" font-weight="600">SpO2 &lt; 94% → médecin</text>
      <text x="15" y="72" font-size="9" fill="#C0392B" font-weight="600">SpO2 &lt; 90% → SAMU 15</text>
      <line x1="10" y1="80" x2="160" y2="80" stroke="#ddd"/>
      <text x="15" y="94" font-size="9" fill="#1B6B52">Sujets à risque → Paxlovid®</text>
      <text x="15" y="107" font-size="9" fill="#1B6B52">dans les 5 jours</text>
    </g>
    <text x="250" y="170" text-anchor="middle" font-size="10" fill="#6B2D5E" font-weight="600">Paxlovid® = interactions CYP3A4 majeures → VÉRIFIER toutes les ordonnances</text>
    <text x="250" y="185" text-anchor="middle" font-size="9" fill="#1E3A5F">Vaccin annuel recommandé pour sujets à risque | COVID long → consultation spécialisée</text>
    <defs><marker id="cvArr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#C0392B"/></marker></defs>
  </svg>`,

  bronchiolite_nrs:`<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#FFF5F5"/>
    <text x="250" y="18" text-anchor="middle" font-size="12" fill="#C0392B" font-weight="600">Bronchiolite : DRP = seul traitement prouvé</text>
    <g transform="translate(20,40)">
      <rect x="0" y="0" width="200" height="120" rx="8" fill="white" stroke="#C0392B" stroke-width="2"/>
      <text x="100" y="18" text-anchor="middle" font-size="10" fill="#C0392B" font-weight="600">Bronchiole obstruée</text>
      <ellipse cx="100" cy="65" rx="75" ry="40" fill="#FDF0EF" stroke="#C0392B" stroke-width="1"/>
      <ellipse cx="100" cy="65" rx="20" ry="10" fill="white"/>
      <text x="100" y="50" text-anchor="middle" font-size="9" fill="#C0392B">Mucus VRS</text>
      <text x="100" y="70" text-anchor="middle" font-size="8" fill="#555">Peu d'air</text>
      <text x="100" y="100" text-anchor="middle" font-size="9" fill="#C0392B">Sifflements · Tirage</text>
      <text x="100" y="113" text-anchor="middle" font-size="9" fill="#C0392B">SpO2 ↓</text>
    </g>
    <text x="250" y="98" text-anchor="middle" font-size="20">→</text>
    <g transform="translate(280,40)">
      <rect x="0" y="0" width="200" height="120" rx="8" fill="#E4F4EE" stroke="#1B6B52" stroke-width="2"/>
      <text x="100" y="18" text-anchor="middle" font-size="10" fill="#1B6B52" font-weight="600">DRP sérum physiologique</text>
      <text x="100" y="42" text-anchor="middle" font-size="26">💧</text>
      <text x="100" y="65" text-anchor="middle" font-size="9" fill="#1B6B52">6 fois par jour</text>
      <text x="100" y="78" text-anchor="middle" font-size="9" fill="#1B6B52">avant chaque biberon</text>
      <text x="100" y="91" text-anchor="middle" font-size="9" fill="#1B6B52">+ avant le coucher</text>
      <text x="100" y="107" text-anchor="middle" font-size="9" fill="#1B6B52" font-weight="600">= SEUL traitement prouvé</text>
    </g>
    <rect x="20" y="170" width="460" height="22" rx="6" fill="#C0392B"/>
    <text x="250" y="183" text-anchor="middle" font-size="10" fill="white" font-weight="600">Antitussifs · Bronchodilatateurs · Antibiotiques = CONTRE-INDIQUÉS | Nirsévimab (Beyfortus®) = prévention VRS</text>
  </svg>`,

  fievre:`<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#FFF5F0"/>
    <text x="250" y="18" text-anchor="middle" font-size="12" fill="#B45309" font-weight="600">Fièvre = mécanisme de défense (traiter si inconfort)</text>
    <circle cx="130" cy="95" r="65" fill="#FDF6E8" stroke="#B45309" stroke-width="2"/>
    <text x="130" y="55" text-anchor="middle" font-size="9" fill="#B45309" font-weight="600">Pathogène</text>
    <text x="130" y="70" text-anchor="middle" font-size="9" fill="#B45309">↓ Cytokines</text>
    <text x="130" y="85" text-anchor="middle" font-size="9" fill="#B45309">(IL-1, IL-6, TNF)</text>
    <text x="130" y="100" text-anchor="middle" font-size="9" fill="#B45309">↓ Hypothalamus</text>
    <text x="130" y="115" text-anchor="middle" font-size="9" fill="#B45309">↓ Prostaglandines E2</text>
    <text x="130" y="130" text-anchor="middle" font-size="9" fill="#C0392B" font-weight="600">↓ FIÈVRE</text>
    <text x="130" y="145" text-anchor="middle" font-size="9" fill="#1B6B52">Inhibe bactéries ✓</text>
    <g transform="translate(230,30)">
      <rect x="0" y="0" width="250" height="140" rx="8" fill="white" stroke="#1E3A5F" stroke-width="1.5"/>
      <text x="125" y="18" text-anchor="middle" font-size="10" fill="#1E3A5F" font-weight="600">Traitement adapté à l'âge</text>
      <text x="15" y="36" font-size="9" fill="#C0392B" font-weight="600">⚠️ &lt; 3 mois : urgences pédiatriques</text>
      <line x1="10" y1="44" x2="240" y2="44" stroke="#ddd"/>
      <text x="15" y="58" font-size="9" fill="#1B6B52">Paracétamol 15 mg/kg/prise (toutes les 6h)</text>
      <text x="15" y="72" font-size="9" fill="#1E3A5F">Ibuprofène 10 mg/kg/prise (> 3 mois)</text>
      <line x1="10" y1="80" x2="240" y2="80" stroke="#ddd"/>
      <text x="15" y="94" font-size="9" fill="#C0392B" font-weight="600">JAMAIS d'aspirine &lt; 15 ans</text>
      <text x="15" y="108" font-size="9" fill="#666">(syndrome de Reye — encéphalopathie)</text>
      <line x1="10" y1="116" x2="240" y2="116" stroke="#ddd"/>
      <text x="15" y="130" font-size="9" fill="#B45309">Purpura qui ne s'efface pas → SAMU 15</text>
    </g>
    <text x="250" y="186" text-anchor="middle" font-size="9" fill="#1E3A5F">Convulsions fébriles → SAMU 15 (bénignes dans 95% des cas mais terrifiantes)</text>
  </svg>`,

  varicelle:`<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#FFF5F5"/>
    <text x="250" y="18" text-anchor="middle" font-size="12" fill="#C0392B" font-weight="600">Varicelle : contagiosité et précautions</text>
    <line x1="30" y1="120" x2="470" y2="120" stroke="#ddd" stroke-width="2"/>
    <rect x="30" y="80" width="80" height="38" rx="6" fill="#FDF6E8" stroke="#B45309" stroke-width="1.5"/>
    <text x="70" y="97" text-anchor="middle" font-size="9" fill="#B45309" font-weight="600">J-2 à J0</text>
    <text x="70" y="110" text-anchor="middle" font-size="9" fill="#B45309">Contagieux</text>
    <text x="70" y="135" text-anchor="middle" font-size="9" fill="#666">Avant l'éruption</text>
    <rect x="120" y="55" width="90" height="63" rx="6" fill="#FDF0EF" stroke="#C0392B" stroke-width="2"/>
    <text x="165" y="73" text-anchor="middle" font-size="9" fill="#C0392B" font-weight="600">J1 à J7</text>
    <text x="165" y="87" text-anchor="middle" font-size="9" fill="#C0392B">Éruption</text>
    <text x="165" y="100" text-anchor="middle" font-size="9" fill="#C0392B">+ contagieux</text>
    <text x="165" y="135" text-anchor="middle" font-size="9" fill="#C0392B">Éviction scolaire</text>
    <rect x="220" y="70" width="80" height="48" rx="6" fill="#FDF6E8" stroke="#B45309" stroke-width="1.5"/>
    <text x="260" y="88" text-anchor="middle" font-size="9" fill="#B45309" font-weight="600">J7 à J10</text>
    <text x="260" y="101" text-anchor="middle" font-size="9" fill="#B45309">Croûtes</text>
    <text x="260" y="135" text-anchor="middle" font-size="9" fill="#666">Encore contagieux</text>
    <rect x="310" y="88" width="80" height="30" rx="6" fill="#E4F4EE" stroke="#1B6B52" stroke-width="1.5"/>
    <text x="350" y="106" text-anchor="middle" font-size="9" fill="#1B6B52" font-weight="600">Non contagieux</text>
    <text x="350" y="135" text-anchor="middle" font-size="9" fill="#1B6B52">Retour école ✓</text>
    <rect x="20" y="158" width="460" height="35" rx="8" fill="#C0392B"/>
    <text x="250" y="173" text-anchor="middle" font-size="9" fill="white" font-weight="600">Ibuprofène CI en varicelle (fascéite nécrosante) | Aspirine CI &lt; 15 ans</text>
    <text x="250" y="186" text-anchor="middle" font-size="9" fill="white">Lotion calamine = antiprurigineux de référence | Ongles courts = prévention surinfection</text>
  </svg>`,
};

// Fusionner avec SCHEMAS existant
Object.assign(SCHEMAS, SCHEMAS_EXTRA);