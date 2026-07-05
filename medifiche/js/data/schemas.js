/* MediFiche — SCHEMAS SVG */

'use strict';

// Schémas SVG pédagogiques pour chaque pathologie
const SCHEMAS = {

  allergie: `<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:500px;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#F2FAF6"/>
    <!-- Pollen -->
    <circle cx="50" cy="100" r="28" fill="#F5D98A" stroke="#B45309" stroke-width="2"/>
    <text x="50" y="95" text-anchor="middle" font-size="18">🌿</text>
    <text x="50" y="140" text-anchor="middle" font-size="10" fill="#666">Pollen</text>
    <!-- Flèche -->
    <line x1="82" y1="100" x2="118" y2="100" stroke="#999" stroke-width="2" marker-end="url(#arr)"/>
    <!-- IgE / Mastocyte -->
    <circle cx="150" cy="100" r="28" fill="#E4F4EE" stroke="#1B6B52" stroke-width="2"/>
    <text x="150" y="95" text-anchor="middle" font-size="16">🛡️</text>
    <text x="150" y="140" text-anchor="middle" font-size="10" fill="#666">Mastocyte</text>
    <text x="150" y="152" text-anchor="middle" font-size="10" fill="#666">+ IgE</text>
    <!-- Flèche -->
    <line x1="182" y1="100" x2="218" y2="100" stroke="#999" stroke-width="2" marker-end="url(#arr)"/>
    <!-- Dégranulation -->
    <circle cx="250" cy="100" r="28" fill="#FDF0EF" stroke="#C0392B" stroke-width="2"/>
    <text x="250" y="95" text-anchor="middle" font-size="16">💥</text>
    <text x="250" y="140" text-anchor="middle" font-size="10" fill="#666">Dégranulation</text>
    <!-- Flèche -->
    <line x1="282" y1="100" x2="318" y2="100" stroke="#999" stroke-width="2" marker-end="url(#arr)"/>
    <!-- Histamine -->
    <circle cx="350" cy="100" r="28" fill="#FDF6E8" stroke="#B45309" stroke-width="2"/>
    <text x="350" y="95" text-anchor="middle" font-size="14">H₁</text>
    <text x="350" y="140" text-anchor="middle" font-size="10" fill="#666">Histamine</text>
    <!-- Flèche -->
    <line x1="382" y1="100" x2="418" y2="100" stroke="#999" stroke-width="2" marker-end="url(#arr)"/>
    <!-- Symptômes -->
    <rect x="420" y="72" width="68" height="56" rx="8" fill="#FDF0EF" stroke="#C0392B" stroke-width="2"/>
    <text x="454" y="93" text-anchor="middle" font-size="10" fill="#C0392B" font-weight="600">Rhinite</text>
    <text x="454" y="107" text-anchor="middle" font-size="10" fill="#C0392B">Prurit</text>
    <text x="454" y="121" text-anchor="middle" font-size="10" fill="#C0392B">Larmes</text>
    <defs><marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker></defs>
  </svg>`,

  asthme: `<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:500px;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#F0F7FF"/>
    <!-- Bronche normale -->
    <g transform="translate(60,40)">
      <ellipse cx="70" cy="70" rx="55" ry="70" fill="white" stroke="#1E3A5F" stroke-width="2"/>
      <ellipse cx="70" cy="70" rx="35" ry="50" fill="#E4F4EE" stroke="#1B6B52" stroke-width="1.5"/>
      <text x="70" y="35" text-anchor="middle" font-size="11" fill="#1E3A5F" font-weight="600">Normale</text>
      <text x="70" y="165" text-anchor="middle" font-size="10" fill="#1B6B52">Air passe bien</text>
    </g>
    <!-- VS -->
    <text x="250" y="105" text-anchor="middle" font-size="20" fill="#999">VS</text>
    <!-- Bronche asthmatique -->
    <g transform="translate(270,40)">
      <ellipse cx="70" cy="70" rx="55" ry="70" fill="white" stroke="#C0392B" stroke-width="2"/>
      <ellipse cx="70" cy="70" rx="55" ry="70" fill="#FDF0EF" stroke="#C0392B" stroke-width="1"/>
      <!-- Épaississement muqueuse -->
      <ellipse cx="70" cy="70" rx="25" ry="35" fill="#E4F4EE" stroke="#1B6B52" stroke-width="1"/>
      <text x="70" y="35" text-anchor="middle" font-size="11" fill="#C0392B" font-weight="600">Asthme</text>
      <text x="70" y="152" text-anchor="middle" font-size="10" fill="#C0392B">Inflammation</text>
      <text x="70" y="165" text-anchor="middle" font-size="10" fill="#C0392B">Bronchospasme</text>
    </g>
    <!-- Légende -->
    <rect x="10" y="175" width="12" height="12" fill="#FDF0EF" stroke="#C0392B"/>
    <text x="26" y="185" font-size="10" fill="#666">Muqueuse enflammée</text>
    <rect x="150" y="175" width="12" height="12" fill="#E4F4EE" stroke="#1B6B52"/>
    <text x="166" y="185" font-size="10" fill="#666">Lumière réduite</text>
  </svg>`,

  diabete: `<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:500px;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#FFF8E8"/>
    <!-- Pancréas -->
    <ellipse cx="80" cy="80" rx="55" ry="35" fill="#FDF6E8" stroke="#B45309" stroke-width="2"/>
    <text x="80" y="76" text-anchor="middle" font-size="11" fill="#B45309" font-weight="600">Pancréas</text>
    <text x="80" y="90" text-anchor="middle" font-size="18">🏭</text>
    <text x="80" y="130" text-anchor="middle" font-size="10" fill="#666">Épuisé</text>
    <!-- Insuline -->
    <circle cx="200" cy="80" r="22" fill="#FDF0EF" stroke="#C0392B" stroke-width="2"/>
    <text x="200" y="76" text-anchor="middle" font-size="14">🔑</text>
    <text x="200" y="92" text-anchor="middle" font-size="9" fill="#C0392B">Insuline</text>
    <text x="200" y="130" text-anchor="middle" font-size="10" fill="#666">insuffisante</text>
    <!-- Cellule résistante -->
    <rect x="300" y="40" width="100" height="80" rx="12" fill="white" stroke="#C0392B" stroke-width="2"/>
    <text x="350" y="60" text-anchor="middle" font-size="14">🚪</text>
    <text x="350" y="78" text-anchor="middle" font-size="9" fill="#C0392B" font-weight="600">Cellule</text>
    <text x="350" y="90" text-anchor="middle" font-size="9" fill="#C0392B">résistante</text>
    <text x="350" y="104" text-anchor="middle" font-size="9" fill="#C0392B">à l'insuline</text>
    <text x="350" y="140" text-anchor="middle" font-size="10" fill="#666">Porte fermée</text>
    <!-- Glucose dans le sang -->
    <text x="250" y="175" text-anchor="middle" font-size="12" fill="#B45309" font-weight="600">→ Glucose reste dans le sang → Hyperglycémie chronique</text>
    <!-- Flèches -->
    <line x1="135" y1="80" x2="175" y2="80" stroke="#B45309" stroke-width="2" marker-end="url(#arr2)"/>
    <line x1="223" y1="80" x2="297" y2="80" stroke="#C0392B" stroke-width="2" stroke-dasharray="5,3" marker-end="url(#arr2)"/>
    <defs><marker id="arr2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#B45309"/></marker></defs>
  </svg>`,

  hta: `<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:500px;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#FFF0F0"/>
    <!-- Cœur -->
    <text x="60" y="90" text-anchor="middle" font-size="40">❤️</text>
    <text x="60" y="115" text-anchor="middle" font-size="10" fill="#666">Pompe</text>
    <!-- Artère normale -->
    <g transform="translate(110,20)">
      <rect x="0" y="40" width="100" height="40" rx="20" fill="white" stroke="#1B6B52" stroke-width="2"/>
      <rect x="10" y="50" width="80" height="20" rx="10" fill="#E4F4EE"/>
      <text x="50" y="25" text-anchor="middle" font-size="10" fill="#1B6B52" font-weight="600">Normale</text>
      <text x="50" y="100" text-anchor="middle" font-size="10" fill="#1B6B52">Paroi souple</text>
    </g>
    <!-- Artère HTA -->
    <g transform="translate(270,20)">
      <rect x="0" y="40" width="100" height="40" rx="5" fill="#FDF0EF" stroke="#C0392B" stroke-width="2.5"/>
      <rect x="18" y="53" width="64" height="14" rx="7" fill="white"/>
      <text x="50" y="25" text-anchor="middle" font-size="10" fill="#C0392B" font-weight="600">HTA</text>
      <text x="50" y="100" text-anchor="middle" font-size="10" fill="#C0392B">Paroi rigide</text>
      <text x="50" y="113" text-anchor="middle" font-size="10" fill="#C0392B">Lumière réduite</text>
    </g>
    <!-- Conséquences -->
    <text x="250" y="150" text-anchor="middle" font-size="11" fill="#C0392B" font-weight="600">AVC · Infarctus · Insuffisance rénale · Rétinopathie</text>
    <text x="250" y="168" text-anchor="middle" font-size="10" fill="#666">Le cœur pompe contre une résistance trop élevée → s'épuise</text>
    <!-- Flèches -->
    <line x1="90" y1="80" x2="108" y2="80" stroke="#C0392B" stroke-width="2" marker-end="url(#arr3)"/>
    <defs><marker id="arr3" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#C0392B"/></marker></defs>
  </svg>`,

  arthrose: `<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:500px;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#FFF8F0"/>
    <!-- Articulation normale -->
    <g transform="translate(60,20)">
      <rect x="20" y="0" width="80" height="40" rx="4" fill="#E8E0D0" stroke="#888" stroke-width="1.5"/>
      <rect x="20" y="40" width="80" height="14" rx="7" fill="#C8E6C9" stroke="#4CAF50" stroke-width="1.5"/>
      <rect x="20" y="54" width="80" height="14" rx="7" fill="#C8E6C9" stroke="#4CAF50" stroke-width="1.5"/>
      <rect x="20" y="68" width="80" height="40" rx="4" fill="#E8E0D0" stroke="#888" stroke-width="1.5"/>
      <text x="60" y="125" text-anchor="middle" font-size="10" fill="#1B6B52" font-weight="600">Normale</text>
      <text x="60" y="140" text-anchor="middle" font-size="10" fill="#1B6B52">Cartilage intact</text>
    </g>
    <!-- VS -->
    <text x="250" y="80" text-anchor="middle" font-size="20" fill="#999">VS</text>
    <!-- Articulation arthrosique -->
    <g transform="translate(285,20)">
      <rect x="20" y="0" width="80" height="40" rx="4" fill="#E8E0D0" stroke="#888" stroke-width="1.5"/>
      <!-- Ostéophytes -->
      <polygon points="15,38 25,20 35,38" fill="#D2B48C" stroke="#888"/>
      <polygon points="85,38 95,20 105,38" fill="#D2B48C" stroke="#888"/>
      <!-- Cartilage abîmé -->
      <rect x="20" y="40" width="80" height="6" rx="2" fill="#FFCDD2" stroke="#C0392B" stroke-width="1"/>
      <rect x="20" y="62" width="80" height="6" rx="2" fill="#FFCDD2" stroke="#C0392B" stroke-width="1"/>
      <!-- Synovite -->
      <ellipse cx="60" cy="55" rx="25" ry="9" fill="#FDF6E8" stroke="#B45309" stroke-width="1"/>
      <rect x="20" y="68" width="80" height="40" rx="4" fill="#E8E0D0" stroke="#888" stroke-width="1.5"/>
      <text x="60" y="125" text-anchor="middle" font-size="10" fill="#C0392B" font-weight="600">Arthrose</text>
      <text x="60" y="140" text-anchor="middle" font-size="10" fill="#C0392B">Cartilage érodé</text>
    </g>
    <text x="250" y="175" text-anchor="middle" font-size="10" fill="#666">Os exposé + ostéophytes + synovite réactionnelle → douleur</text>
  </svg>`,

  eczema: `<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:500px;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#FFF5F5"/>
    <!-- Peau normale -->
    <g transform="translate(30,20)">
      <text x="85" y="18" text-anchor="middle" font-size="11" fill="#1B6B52" font-weight="600">Peau normale</text>
      <rect x="0" y="25" width="170" height="20" rx="0" fill="#F5DEB3"/>
      <text x="85" y="38" text-anchor="middle" font-size="9" fill="#666">Cornée (barrière = mur serré)</text>
      <rect x="0" y="45" width="170" height="30" rx="0" fill="#FFE0B2"/>
      <text x="85" y="63" text-anchor="middle" font-size="9" fill="#666">Épiderme</text>
      <rect x="0" y="75" width="170" height="40" rx="0" fill="#FFCCBC"/>
      <text x="85" y="98" text-anchor="middle" font-size="9" fill="#666">Derme (vaisseaux, nerfs)</text>
      <!-- Allergènes bloqués -->
      <text x="20" y="18" font-size="14">🚫</text>
      <text x="140" y="18" font-size="14">🚫</text>
      <text x="5" y="145" font-size="9" fill="#1B6B52">Allergènes bloqués ✓</text>
    </g>
    <!-- VS -->
    <text x="250" y="90" text-anchor="middle" font-size="20" fill="#999">VS</text>
    <!-- Peau atopique -->
    <g transform="translate(270,20)">
      <text x="90" y="18" text-anchor="middle" font-size="11" fill="#C0392B" font-weight="600">Dermatite atopique</text>
      <rect x="0" y="25" width="190" height="20" rx="0" fill="#FFCDD2"/>
      <!-- Trous dans la barrière -->
      <line x1="30" y1="25" x2="30" y2="45" stroke="white" stroke-width="4"/>
      <line x1="80" y1="25" x2="80" y2="45" stroke="white" stroke-width="4"/>
      <line x1="130" y1="25" x2="130" y2="45" stroke="white" stroke-width="4"/>
      <text x="95" y="38" text-anchor="middle" font-size="9" fill="#C0392B">Barrière percée (filaggrine ↓)</text>
      <rect x="0" y="45" width="190" height="30" rx="0" fill="#FFECEC"/>
      <rect x="0" y="75" width="190" height="40" rx="0" fill="#FFD0D0"/>
      <!-- Inflammation -->
      <text x="95" y="98" text-anchor="middle" font-size="9" fill="#C0392B">Inflammation Th2 ++</text>
      <!-- Allergènes qui rentrent -->
      <text x="15" y="18" font-size="10">⬇️</text>
      <text x="65" y="18" font-size="10">⬇️</text>
      <text x="115" y="18" font-size="10">⬇️</text>
      <text x="5" y="145" font-size="9" fill="#C0392B">Allergènes pénètrent → IgE</text>
    </g>
  </svg>`,

  gastro: `<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:500px;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#FFF5F5"/>
    <!-- Intestin grêle en coupe -->
    <text x="250" y="25" text-anchor="middle" font-size="12" fill="#C0392B" font-weight="600">Mécanisme de la diarrhée virale</text>
    <!-- Cellule normale -->
    <g transform="translate(50,50)">
      <rect x="0" y="0" width="80" height="100" rx="8" fill="#E4F4EE" stroke="#1B6B52" stroke-width="2"/>
      <text x="40" y="20" text-anchor="middle" font-size="10" fill="#1B6B52" font-weight="600">Entérocyte</text>
      <text x="40" y="35" text-anchor="middle" font-size="18">😊</text>
      <text x="40" y="58" text-anchor="middle" font-size="9" fill="#1B6B52">Absorbe</text>
      <text x="40" y="70" text-anchor="middle" font-size="9" fill="#1B6B52">Na+ Glucose</text>
      <text x="40" y="82" text-anchor="middle" font-size="9" fill="#1B6B52">Eau →</text>
      <text x="40" y="118" text-anchor="middle" font-size="9" fill="#1B6B52">Cellule saine</text>
    </g>
    <!-- Flèche virus -->
    <text x="175" y="95" text-anchor="middle" font-size="22">🦠</text>
    <line x1="195" y1="100" x2="215" y2="100" stroke="#C0392B" stroke-width="2" marker-end="url(#arr4)"/>
    <!-- Cellule infectée -->
    <g transform="translate(220,50)">
      <rect x="0" y="0" width="80" height="100" rx="8" fill="#FDF0EF" stroke="#C0392B" stroke-width="2"/>
      <text x="40" y="20" text-anchor="middle" font-size="10" fill="#C0392B" font-weight="600">Infecté</text>
      <text x="40" y="35" text-anchor="middle" font-size="18">😵</text>
      <text x="40" y="58" text-anchor="middle" font-size="9" fill="#C0392B">Sécrète</text>
      <text x="40" y="70" text-anchor="middle" font-size="9" fill="#C0392B">eau + électrolytes</text>
      <text x="40" y="82" text-anchor="middle" font-size="9" fill="#C0392B">→ Lumière</text>
      <text x="40" y="118" text-anchor="middle" font-size="9" fill="#C0392B">Diarrhée sécrétoire</text>
    </g>
    <!-- Solution SRO -->
    <g transform="translate(360,50)">
      <rect x="0" y="0" width="110" height="100" rx="8" fill="#E4F4EE" stroke="#1B6B52" stroke-width="2"/>
      <text x="55" y="20" text-anchor="middle" font-size="10" fill="#1B6B52" font-weight="600">Solution SRO</text>
      <text x="55" y="38" text-anchor="middle" font-size="24">💧</text>
      <text x="55" y="60" text-anchor="middle" font-size="9" fill="#1B6B52">Cotransport</text>
      <text x="55" y="72" text-anchor="middle" font-size="9" fill="#1B6B52">Na+/Glucose intact</text>
      <text x="55" y="84" text-anchor="middle" font-size="9" fill="#1B6B52">→ Réhydrate</text>
      <text x="55" y="118" text-anchor="middle" font-size="9" fill="#1B6B52">✅ Traitement n°1</text>
    </g>
    <defs><marker id="arr4" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#C0392B"/></marker></defs>
  </svg>`,

  insomnie: `<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:500px;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#F0F0FF"/>
    <!-- Cerveau / Horloge circadienne -->
    <text x="250" y="22" text-anchor="middle" font-size="12" fill="#1E3A5F" font-weight="600">Régulation du sommeil</text>
    <!-- Horloge interne -->
    <circle cx="100" cy="100" r="50" fill="white" stroke="#1E3A5F" stroke-width="2"/>
    <text x="100" y="80" text-anchor="middle" font-size="22">🕐</text>
    <text x="100" y="100" text-anchor="middle" font-size="11" fill="#1E3A5F" font-weight="600">Horloge</text>
    <text x="100" y="114" text-anchor="middle" font-size="10" fill="#1E3A5F">circadienne</text>
    <text x="100" y="128" text-anchor="middle" font-size="10" fill="#6B2D5E">Mélatonine</text>
    <text x="100" y="165" text-anchor="middle" font-size="9" fill="#666">Lumière bleue → bloque</text>
    <!-- Plus -->
    <text x="185" y="105" text-anchor="middle" font-size="24" fill="#1E3A5F">+</text>
    <!-- Pression homéostatique -->
    <circle cx="260" cy="100" r="50" fill="white" stroke="#6B2D5E" stroke-width="2"/>
    <text x="260" y="80" text-anchor="middle" font-size="22">💤</text>
    <text x="260" y="100" text-anchor="middle" font-size="11" fill="#6B2D5E" font-weight="600">Adénosine</text>
    <text x="260" y="114" text-anchor="middle" font-size="10" fill="#6B2D5E">Pression sommeil</text>
    <text x="260" y="128" text-anchor="middle" font-size="10" fill="#6B2D5E">s'accumule</text>
    <text x="260" y="165" text-anchor="middle" font-size="9" fill="#666">Caféine → bloque</text>
    <!-- Égale -->
    <text x="345" y="105" text-anchor="middle" font-size="24" fill="#1E3A5F">=</text>
    <!-- Sommeil -->
    <circle cx="425" cy="100" r="50" fill="#1E3A5F"/>
    <text x="425" y="85" text-anchor="middle" font-size="22">😴</text>
    <text x="425" y="108" text-anchor="middle" font-size="11" fill="white" font-weight="600">Sommeil</text>
    <text x="425" y="165" text-anchor="middle" font-size="9" fill="#666">Insomnie = hyperéveil</text>
  </svg>`,

  migraine: `<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:500px;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#FFF5F5"/>
    <text x="250" y="20" text-anchor="middle" font-size="12" fill="#C0392B" font-weight="600">Mécanisme de la crise migraineuse</text>
    <!-- Étape 1 Cortex -->
    <circle cx="60" cy="100" r="42" fill="#FDF6E8" stroke="#B45309" stroke-width="2"/>
    <text x="60" y="82" text-anchor="middle" font-size="16">🧠</text>
    <text x="60" y="98" text-anchor="middle" font-size="9" fill="#B45309" font-weight="600">1. Cortex</text>
    <text x="60" y="110" text-anchor="middle" font-size="9" fill="#B45309">Hyperexcitable</text>
    <text x="60" y="122" text-anchor="middle" font-size="9" fill="#B45309">→ Aura</text>
    <!-- Flèche -->
    <line x1="103" y1="100" x2="130" y2="100" stroke="#C0392B" stroke-width="2" marker-end="url(#arr5)"/>
    <!-- Étape 2 Trijumeau -->
    <circle cx="185" cy="100" r="42" fill="#FDF0EF" stroke="#C0392B" stroke-width="2"/>
    <text x="185" y="82" text-anchor="middle" font-size="16">⚡</text>
    <text x="185" y="98" text-anchor="middle" font-size="9" fill="#C0392B" font-weight="600">2. Trijumeau</text>
    <text x="185" y="110" text-anchor="middle" font-size="9" fill="#C0392B">Activé</text>
    <text x="185" y="122" text-anchor="middle" font-size="9" fill="#C0392B">→ CGRP libéré</text>
    <!-- Flèche -->
    <line x1="228" y1="100" x2="255" y2="100" stroke="#C0392B" stroke-width="2" marker-end="url(#arr5)"/>
    <!-- Étape 3 Vaisseaux -->
    <circle cx="310" cy="100" r="42" fill="#FDF0EF" stroke="#C0392B" stroke-width="2.5"/>
    <text x="310" y="82" text-anchor="middle" font-size="16">🩸</text>
    <text x="310" y="98" text-anchor="middle" font-size="9" fill="#C0392B" font-weight="600">3. Vaisseaux</text>
    <text x="310" y="110" text-anchor="middle" font-size="9" fill="#C0392B">Dilatés + inflam.</text>
    <text x="310" y="122" text-anchor="middle" font-size="9" fill="#C0392B">Méninges</text>
    <!-- Flèche -->
    <line x1="353" y1="100" x2="378" y2="100" stroke="#C0392B" stroke-width="2" marker-end="url(#arr5)"/>
    <!-- Étape 4 Douleur -->
    <circle cx="432" cy="100" r="42" fill="#C0392B"/>
    <text x="432" y="82" text-anchor="middle" font-size="16">😖</text>
    <text x="432" y="98" text-anchor="middle" font-size="9" fill="white" font-weight="600">4. Douleur</text>
    <text x="432" y="110" text-anchor="middle" font-size="9" fill="white">Pulsatile</text>
    <text x="432" y="122" text-anchor="middle" font-size="9" fill="white">Unilatérale</text>
    <!-- Triptans -->
    <text x="250" y="170" text-anchor="middle" font-size="10" fill="#1B6B52" font-weight="600">💊 Triptans → bloquent étapes 2 et 3 → fin de la crise</text>
    <text x="250" y="185" text-anchor="middle" font-size="10" fill="#6B2D5E" font-weight="600">💊 Anti-CGRP → bloquent directement le médiateur clé</text>
    <defs><marker id="arr5" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#C0392B"/></marker></defs>
  </svg>`,

  rhinite: `<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:500px;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#F2FAF6"/>
    <text x="250" y="20" text-anchor="middle" font-size="12" fill="#1E3A5F" font-weight="600">United Airway Disease — Une seule muqueuse</text>
    <!-- Tête en coupe schématique -->
    <ellipse cx="150" cy="100" rx="80" ry="90" fill="white" stroke="#1E3A5F" stroke-width="2"/>
    <!-- Fosses nasales -->
    <rect x="100" y="55" width="30" height="30" rx="8" fill="#E4F4EE" stroke="#1B6B52" stroke-width="1.5"/>
    <rect x="140" y="55" width="30" height="30" rx="8" fill="#E4F4EE" stroke="#1B6B52" stroke-width="1.5"/>
    <text x="150" y="48" text-anchor="middle" font-size="9" fill="#1B6B52">Fosses nasales</text>
    <!-- Trachée -->
    <rect x="135" y="95" width="30" height="25" fill="#E4F4EE" stroke="#1B6B52" stroke-width="1.5"/>
    <!-- Bronches -->
    <path d="M135,120 L110,150 M165,120 L190,150" stroke="#1B6B52" stroke-width="2" fill="none"/>
    <ellipse cx="110" cy="160" rx="20" ry="12" fill="#E4F4EE" stroke="#1B6B52" stroke-width="1.5"/>
    <ellipse cx="190" cy="160" rx="20" ry="12" fill="#E4F4EE" stroke="#1B6B52" stroke-width="1.5"/>
    <text x="150" y="186" text-anchor="middle" font-size="9" fill="#1B6B52">Bronches</text>
    <!-- Connexion / flèche -->
    <text x="270" y="80" font-size="13" fill="#C0392B" font-weight="600">80% des asthmatiques</text>
    <text x="270" y="96" font-size="13" fill="#C0392B" font-weight="600">ont une rhinite !</text>
    <text x="270" y="125" font-size="11" fill="#1E3A5F">Traiter la rhinite</text>
    <text x="270" y="140" font-size="11" fill="#1E3A5F">améliore souvent</text>
    <text x="270" y="155" font-size="11" fill="#1E3A5F">l'asthme associé.</text>
    <text x="270" y="178" font-size="10" fill="#6B2D5E" font-weight="600">→ Désensibilisation = seul traitement</text>
    <text x="270" y="190" font-size="10" fill="#6B2D5E" font-weight="600">   qui modifie la maladie</text>
  </svg>`,

  constipation: `<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:500px;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#FFF8E8"/>
    <text x="250" y="22" text-anchor="middle" font-size="12" fill="#B45309" font-weight="600">Transit normal vs Constipation</text>
    <!-- Côlon normal -->
    <g transform="translate(30,40)">
      <path d="M20,0 Q60,-20 100,0 Q140,20 180,0 Q180,40 140,60 Q100,80 60,60 Q20,80 20,40 Z" fill="#E4F4EE" stroke="#1B6B52" stroke-width="2" opacity="0.7"/>
      <text x="100" y="35" text-anchor="middle" font-size="10" fill="#1B6B52" font-weight="600">Transit normal</text>
      <text x="100" y="50" text-anchor="middle" font-size="9" fill="#1B6B52">24-72h de transit</text>
      <text x="100" y="100" text-anchor="middle" font-size="9" fill="#1B6B52">Selles molles ✓</text>
    </g>
    <!-- Côlon constipé -->
    <g transform="translate(270,40)">
      <path d="M20,0 Q60,-20 100,0 Q140,20 180,0 Q180,40 140,60 Q100,80 60,60 Q20,80 20,40 Z" fill="#FDF6E8" stroke="#B45309" stroke-width="2.5" opacity="0.8"/>
      <!-- Selles dures symbolisées -->
      <circle cx="60" cy="30" r="12" fill="#D2B48C" stroke="#8B6914" stroke-width="1.5"/>
      <circle cx="100" cy="25" r="12" fill="#D2B48C" stroke="#8B6914" stroke-width="1.5"/>
      <circle cx="140" cy="30" r="12" fill="#D2B48C" stroke="#8B6914" stroke-width="1.5"/>
      <text x="100" y="65" text-anchor="middle" font-size="10" fill="#B45309" font-weight="600">Constipation</text>
      <text x="100" y="100" text-anchor="middle" font-size="9" fill="#B45309">Selles dures — eau absorbée ↑</text>
    </g>
    <text x="250" y="170" text-anchor="middle" font-size="10" fill="#1E3A5F" font-weight="600">Macrogol → attire l'eau → selles + molles + volume → péristaltisme</text>
    <text x="250" y="185" text-anchor="middle" font-size="10" fill="#666">Fibres + eau → gonfle → pression mécanique → transit stimulé</text>
  </svg>`,

  acne: `<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:500px;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#FFF0F0"/>
    <text x="250" y="18" text-anchor="middle" font-size="11" fill="#C0392B" font-weight="600">4 mécanismes de l'acné</text>
    <!-- Mécanisme 1 -->
    <g transform="translate(20,30)">
      <circle cx="55" cy="55" r="45" fill="#FDF6E8" stroke="#B45309" stroke-width="2"/>
      <text x="55" y="30" text-anchor="middle" font-size="18">🏭</text>
      <text x="55" y="50" text-anchor="middle" font-size="9" fill="#B45309" font-weight="600">1. Hyperséborrhée</text>
      <text x="55" y="63" text-anchor="middle" font-size="9" fill="#B45309">Androgènes →</text>
      <text x="55" y="75" text-anchor="middle" font-size="9" fill="#B45309">trop de sébum</text>
      <text x="55" y="120" text-anchor="middle" font-size="10" fill="#B45309" font-weight="600">Point noir</text>
    </g>
    <!-- Mécanisme 2 -->
    <g transform="translate(130,30)">
      <circle cx="55" cy="55" r="45" fill="#FDF0EF" stroke="#C0392B" stroke-width="2"/>
      <text x="55" y="30" text-anchor="middle" font-size="18">🔒</text>
      <text x="55" y="50" text-anchor="middle" font-size="9" fill="#C0392B" font-weight="600">2. Comédon</text>
      <text x="55" y="63" text-anchor="middle" font-size="9" fill="#C0392B">Bouchon cornéen</text>
      <text x="55" y="75" text-anchor="middle" font-size="9" fill="#C0392B">dans le follicule</text>
      <text x="55" y="120" text-anchor="middle" font-size="10" fill="#C0392B" font-weight="600">Point blanc</text>
    </g>
    <!-- Mécanisme 3 -->
    <g transform="translate(240,30)">
      <circle cx="55" cy="55" r="45" fill="#FFF0F5" stroke="#8B0050" stroke-width="2"/>
      <text x="55" y="30" text-anchor="middle" font-size="18">🦠</text>
      <text x="55" y="50" text-anchor="middle" font-size="9" fill="#8B0050" font-weight="600">3. C. acnes</text>
      <text x="55" y="63" text-anchor="middle" font-size="9" fill="#8B0050">Prolifère dans</text>
      <text x="55" y="75" text-anchor="middle" font-size="9" fill="#8B0050">le follicule</text>
      <text x="55" y="120" text-anchor="middle" font-size="10" fill="#8B0050" font-weight="600">Pustule</text>
    </g>
    <!-- Mécanisme 4 -->
    <g transform="translate(350,30)">
      <circle cx="55" cy="55" r="45" fill="#FDF0EF" stroke="#C0392B" stroke-width="2.5"/>
      <text x="55" y="30" text-anchor="middle" font-size="18">🔥</text>
      <text x="55" y="50" text-anchor="middle" font-size="9" fill="#C0392B" font-weight="600">4. Inflammation</text>
      <text x="55" y="63" text-anchor="middle" font-size="9" fill="#C0392B">Réponse immune</text>
      <text x="55" y="75" text-anchor="middle" font-size="9" fill="#C0392B">périfolliculaire</text>
      <text x="55" y="120" text-anchor="middle" font-size="10" fill="#C0392B" font-weight="600">Nodule/kyste</text>
    </g>
    <text x="250" y="170" text-anchor="middle" font-size="10" fill="#1B6B52" font-weight="600">Isotrétinoïne orale = seul traitement agissant sur les 4 mécanismes simultanément</text>
  </svg>`,

  ds: `<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:500px;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#FFF8F0"/>
    <text x="250" y="20" text-anchor="middle" font-size="12" fill="#B45309" font-weight="600">Rôle de Malassezia dans la DS</text>
    <!-- Peau saine -->
    <g transform="translate(40,40)">
      <rect x="0" y="0" width="130" height="110" rx="10" fill="white" stroke="#1B6B52" stroke-width="2"/>
      <text x="65" y="20" text-anchor="middle" font-size="10" fill="#1B6B52" font-weight="600">Peau saine</text>
      <text x="65" y="45" text-anchor="middle" font-size="22">🍄</text>
      <text x="65" y="65" text-anchor="middle" font-size="9" fill="#1B6B52">Malassezia</text>
      <text x="65" y="77" text-anchor="middle" font-size="9" fill="#1B6B52">commensale</text>
      <text x="65" y="89" text-anchor="middle" font-size="9" fill="#1B6B52">(normale, équilibrée)</text>
      <text x="65" y="130" text-anchor="middle" font-size="9" fill="#1B6B52">Pas de symptôme</text>
    </g>
    <!-- Flèche déclencheurs -->
    <text x="210" y="75" text-anchor="middle" font-size="9" fill="#B45309">Stress</text>
    <text x="210" y="88" text-anchor="middle" font-size="9" fill="#B45309">Immunité ↓</text>
    <text x="210" y="101" text-anchor="middle" font-size="9" fill="#B45309">Hormones</text>
    <line x1="175" y1="90" x2="240" y2="90" stroke="#B45309" stroke-width="2" marker-end="url(#arr6)"/>
    <!-- DS active -->
    <g transform="translate(250,40)">
      <rect x="0" y="0" width="200" height="110" rx="10" fill="#FDF6E8" stroke="#C0392B" stroke-width="2"/>
      <text x="100" y="20" text-anchor="middle" font-size="10" fill="#C0392B" font-weight="600">Dermite séborrhéique</text>
      <text x="100" y="42" text-anchor="middle" font-size="20">🍄🍄🍄</text>
      <text x="100" y="62" text-anchor="middle" font-size="9" fill="#C0392B">Malassezia prolifère</text>
      <text x="100" y="74" text-anchor="middle" font-size="9" fill="#C0392B">→ Lipases → acides gras irritants</text>
      <text x="100" y="86" text-anchor="middle" font-size="9" fill="#C0392B">→ Inflammation → squames grasses</text>
      <text x="100" y="130" text-anchor="middle" font-size="9" fill="#C0392B">Rougeurs + pellicules + prurit</text>
    </g>
    <text x="250" y="175" text-anchor="middle" font-size="10" fill="#1B6B52" font-weight="600">Kétoconazole → inhibe l'ergostérol de Malassezia → mort de la levure</text>
    <defs><marker id="arr6" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#B45309"/></marker></defs>
  </svg>`,

  psoriasis: `<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:500px;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#EEF4FB"/>
    <text x="250" y="20" text-anchor="middle" font-size="12" fill="#1E3A5F" font-weight="600">Turnover cellulaire : Normal vs Psoriasis</text>
    <!-- Normal -->
    <g transform="translate(30,35)">
      <rect x="0" y="0" width="180" height="120" rx="10" fill="white" stroke="#1B6B52" stroke-width="2"/>
      <text x="90" y="20" text-anchor="middle" font-size="10" fill="#1B6B52" font-weight="600">Peau normale</text>
      <!-- Couches -->
      <rect x="10" y="30" width="160" height="16" rx="3" fill="#F5DEB3" opacity="0.7"/>
      <rect x="10" y="50" width="160" height="16" rx="3" fill="#FFE0B2" opacity="0.8"/>
      <rect x="10" y="70" width="160" height="16" rx="3" fill="#FFCCBC" opacity="0.9"/>
      <rect x="10" y="90" width="160" height="20" rx="3" fill="#FFAB91"/>
      <text x="90" y="42" text-anchor="middle" font-size="9" fill="#555">Cornée</text>
      <text x="90" y="62" text-anchor="middle" font-size="9" fill="#555">Granuleuse</text>
      <text x="90" y="82" text-anchor="middle" font-size="9" fill="#555">Épineuse</text>
      <text x="90" y="104" text-anchor="middle" font-size="9" fill="#555">Basale (cellules souches)</text>
      <text x="90" y="135" text-anchor="middle" font-size="10" fill="#1B6B52" font-weight="600">28 jours ✓</text>
    </g>
    <!-- VS -->
    <text x="255" y="100" text-anchor="middle" font-size="24" fill="#999">⚡</text>
    <!-- Psoriasis -->
    <g transform="translate(280,35)">
      <rect x="0" y="0" width="200" height="120" rx="10" fill="white" stroke="#C0392B" stroke-width="2.5"/>
      <text x="100" y="20" text-anchor="middle" font-size="10" fill="#C0392B" font-weight="600">Psoriasis</text>
      <!-- Couches épaisses -->
      <rect x="10" y="28" width="180" height="28" rx="3" fill="#FFCDD2" opacity="0.9"/>
      <rect x="10" y="28" width="180" height="28" rx="3" fill="none" stroke="#C0392B" stroke-width="1" stroke-dasharray="4,2"/>
      <rect x="10" y="60" width="180" height="18" rx="3" fill="#FFAB91" opacity="0.9"/>
      <rect x="10" y="82" width="180" height="28" rx="3" fill="#FF8A65"/>
      <text x="100" y="47" text-anchor="middle" font-size="9" fill="#C0392B" font-weight="600">Squames ++ (épaississement)</text>
      <text x="100" y="73" text-anchor="middle" font-size="9" fill="#555">Épiderme hyperplasique</text>
      <text x="100" y="100" text-anchor="middle" font-size="9" fill="#555">Inflammation Th17 ↑↑</text>
      <text x="100" y="135" text-anchor="middle" font-size="10" fill="#C0392B" font-weight="600">4-7 jours ⚡ (× 7 trop rapide)</text>
    </g>
    <text x="250" y="178" text-anchor="middle" font-size="10" fill="#1E3A5F" font-weight="600">IL-17 + IL-23 → cibles des biothérapies → taux de blanchiment > 90%</text>
  </svg>`,

  rosacee: `<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:500px;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#FFF5F5"/>
    <text x="250" y="20" text-anchor="middle" font-size="12" fill="#8B0050" font-weight="600">Triple mécanisme de la rosacée</text>
    <!-- Mécanisme 1 Vaisseaux -->
    <g transform="translate(20,40)">
      <rect x="0" y="0" width="140" height="110" rx="10" fill="white" stroke="#C0392B" stroke-width="2"/>
      <text x="70" y="20" text-anchor="middle" font-size="10" fill="#C0392B" font-weight="600">1. Vaisseaux</text>
      <text x="70" y="50" text-anchor="middle" font-size="28">🌡️</text>
      <text x="70" y="72" text-anchor="middle" font-size="9" fill="#C0392B">Réactifs et dilatés</text>
      <text x="70" y="84" text-anchor="middle" font-size="9" fill="#C0392B">→ Érythrose</text>
      <text x="70" y="96" text-anchor="middle" font-size="9" fill="#C0392B">→ Couperose</text>
      <text x="70" y="125" text-anchor="middle" font-size="9" fill="#C0392B">Déclencheurs : soleil</text>
      <text x="70" y="137" text-anchor="middle" font-size="9" fill="#C0392B">alcool, épices, froid</text>
    </g>
    <!-- Mécanisme 2 Peptides -->
    <g transform="translate(180,40)">
      <rect x="0" y="0" width="140" height="110" rx="10" fill="white" stroke="#6B2D5E" stroke-width="2"/>
      <text x="70" y="20" text-anchor="middle" font-size="10" fill="#6B2D5E" font-weight="600">2. Inflammation</text>
      <text x="70" y="50" text-anchor="middle" font-size="28">🧬</text>
      <text x="70" y="72" text-anchor="middle" font-size="9" fill="#6B2D5E">LL-37 (catélicidines)</text>
      <text x="70" y="84" text-anchor="middle" font-size="9" fill="#6B2D5E">surproduites</text>
      <text x="70" y="96" text-anchor="middle" font-size="9" fill="#6B2D5E">→ Inflammation</text>
      <text x="70" y="125" text-anchor="middle" font-size="9" fill="#6B2D5E">Acide azélaïque</text>
      <text x="70" y="137" text-anchor="middle" font-size="9" fill="#6B2D5E">réduit les LL-37</text>
    </g>
    <!-- Mécanisme 3 Demodex -->
    <g transform="translate(340,40)">
      <rect x="0" y="0" width="140" height="110" rx="10" fill="white" stroke="#B45309" stroke-width="2"/>
      <text x="70" y="20" text-anchor="middle" font-size="10" fill="#B45309" font-weight="600">3. Demodex</text>
      <text x="70" y="50" text-anchor="middle" font-size="28">🐛</text>
      <text x="70" y="72" text-anchor="middle" font-size="9" fill="#B45309">Acarien commensale</text>
      <text x="70" y="84" text-anchor="middle" font-size="9" fill="#B45309">× 10-18 chez</text>
      <text x="70" y="96" text-anchor="middle" font-size="9" fill="#B45309">les rosacéiques</text>
      <text x="70" y="125" text-anchor="middle" font-size="9" fill="#B45309">Ivermectine →</text>
      <text x="70" y="137" text-anchor="middle" font-size="9" fill="#B45309">élimine Demodex</text>
    </g>
  </svg>`,

  mycose: `<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:500px;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#F5FFF5"/>
    <text x="250" y="20" text-anchor="middle" font-size="12" fill="#1B6B52" font-weight="600">Azolés vs Allylamines : mécanismes</text>
    <!-- Membrane fongique -->
    <text x="250" y="48" text-anchor="middle" font-size="11" fill="#555">Membrane du champignon — synthèse de l'ergostérol</text>
    <!-- Voie de synthèse -->
    <rect x="30" y="65" width="80" height="35" rx="6" fill="#E4F4EE" stroke="#1B6B52" stroke-width="1.5"/>
    <text x="70" y="78" text-anchor="middle" font-size="9" fill="#1B6B52" font-weight="600">Squalène</text>
    <text x="70" y="92" text-anchor="middle" font-size="9" fill="#1B6B52">(précurseur)</text>
    <!-- Flèche Squalène époxydase (bloquée par terbinafine) -->
    <line x1="112" y1="82" x2="148" y2="82" stroke="#1B6B52" stroke-width="2" marker-end="url(#arr7)"/>
    <text x="130" y="72" text-anchor="middle" font-size="8" fill="#C0392B">Terbinafine</text>
    <text x="130" y="62" text-anchor="middle" font-size="8" fill="#C0392B">🚫</text>
    <rect x="150" y="65" width="100" height="35" rx="6" fill="#FDF6E8" stroke="#B45309" stroke-width="1.5"/>
    <text x="200" y="78" text-anchor="middle" font-size="9" fill="#B45309" font-weight="600">Squalène époxyde</text>
    <text x="200" y="92" text-anchor="middle" font-size="9" fill="#B45309">(s'accumule → toxique)</text>
    <!-- Flèche CYP51 (bloquée par azolés) -->
    <line x1="252" y1="82" x2="288" y2="82" stroke="#1B6B52" stroke-width="2" marker-end="url(#arr7)"/>
    <text x="270" y="72" text-anchor="middle" font-size="8" fill="#1E3A5F">Azolés</text>
    <text x="270" y="62" text-anchor="middle" font-size="8" fill="#1E3A5F">🚫</text>
    <rect x="290" y="65" width="90" height="35" rx="6" fill="#E4F4EE" stroke="#1B6B52" stroke-width="1.5"/>
    <text x="335" y="82" text-anchor="middle" font-size="9" fill="#1B6B52">Lanostérol</text>
    <line x1="382" y1="82" x2="418" y2="82" stroke="#1B6B52" stroke-width="2" marker-end="url(#arr7)"/>
    <rect x="420" y="65" width="60" height="35" rx="6" fill="#1B6B52"/>
    <text x="450" y="78" text-anchor="middle" font-size="9" fill="white" font-weight="600">Ergostérol</text>
    <text x="450" y="92" text-anchor="middle" font-size="9" fill="white">(membrane)</text>
    <!-- Résultat -->
    <rect x="30" y="125" width="200" height="45" rx="8" fill="#C0392B"/>
    <text x="130" y="143" text-anchor="middle" font-size="10" fill="white" font-weight="600">Terbinafine → Fongicide</text>
    <text x="130" y="158" text-anchor="middle" font-size="9" fill="white">Accumulation squalène toxique</text>
    <text x="130" y="168" text-anchor="middle" font-size="9" fill="white">→ Traitement COURT (1-2 semaines)</text>
    <rect x="270" y="125" width="200" height="45" rx="8" fill="#1E3A5F"/>
    <text x="370" y="143" text-anchor="middle" font-size="10" fill="white" font-weight="600">Azolés → Fongistatique</text>
    <text x="370" y="158" text-anchor="middle" font-size="9" fill="white">Déficit en ergostérol</text>
    <text x="370" y="168" text-anchor="middle" font-size="9" fill="white">→ Traitement LONG (4 semaines)</text>
    <defs><marker id="arr7" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1B6B52"/></marker></defs>
  </svg>`,

  urticaire: `<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:500px;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#FFF5F5"/>
    <text x="250" y="20" text-anchor="middle" font-size="12" fill="#C0392B" font-weight="600">Dégranulation du mastocyte</text>
    <!-- Mastocyte -->
    <circle cx="160" cy="100" r="65" fill="#FDF0EF" stroke="#C0392B" stroke-width="2.5"/>
    <text x="160" y="80" text-anchor="middle" font-size="24">🛡️</text>
    <text x="160" y="100" text-anchor="middle" font-size="11" fill="#C0392B" font-weight="600">Mastocyte</text>
    <text x="160" y="115" text-anchor="middle" font-size="10" fill="#C0392B">IgE fixées</text>
    <!-- Allergène -->
    <circle cx="55" cy="65" r="20" fill="#FDF6E8" stroke="#B45309" stroke-width="2"/>
    <text x="55" y="62" text-anchor="middle" font-size="14">⚡</text>
    <text x="55" y="76" text-anchor="middle" font-size="9" fill="#B45309">Allergène</text>
    <line x1="74" y1="72" x2="94" y2="85" stroke="#B45309" stroke-width="1.5" marker-end="url(#arr8)"/>
    <!-- Histamine libérée -->
    <text x="270" y="45" font-size="24">💥</text>
    <text x="295" y="45" text-anchor="middle" font-size="10" fill="#C0392B" font-weight="600">Histamine</text>
    <text x="295" y="60" text-anchor="middle" font-size="10" fill="#C0392B">→ Prurit</text>
    <text x="295" y="75" text-anchor="middle" font-size="10" fill="#C0392B">→ Vasodilatation</text>
    <text x="295" y="90" text-anchor="middle" font-size="10" fill="#C0392B">→ Œdème</text>
    <text x="295" y="105" text-anchor="middle" font-size="10" fill="#C0392B">→ Papule urticarienne</text>
    <!-- Traitement -->
    <rect x="265" y="125" width="215" height="55" rx="8" fill="#E4F4EE" stroke="#1B6B52" stroke-width="1.5"/>
    <text x="373" y="145" text-anchor="middle" font-size="10" fill="#1B6B52" font-weight="600">AntiH1 bloquent les récepteurs</text>
    <text x="373" y="160" text-anchor="middle" font-size="9" fill="#1B6B52">→ Histamine ne peut plus se fixer</text>
    <text x="373" y="173" text-anchor="middle" font-size="9" fill="#1B6B52">→ Suppression des symptômes</text>
    <defs><marker id="arr8" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#B45309"/></marker></defs>
  </svg>`,

  zona: `<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:500px;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#FFF5F5"/>
    <text x="250" y="18" text-anchor="middle" font-size="12" fill="#C0392B" font-weight="600">Réactivation du VZV</text>
    <!-- Timeline -->
    <line x1="40" y1="95" x2="465" y2="95" stroke="#ddd" stroke-width="2"/>
    <!-- Étape 1 Varicelle -->
    <circle cx="80" cy="95" r="30" fill="#E4F4EE" stroke="#1B6B52" stroke-width="2"/>
    <text x="80" y="80" text-anchor="middle" font-size="16">🐔</text>
    <text x="80" y="96" text-anchor="middle" font-size="9" fill="#1B6B52" font-weight="600">Varicelle</text>
    <text x="80" y="108" text-anchor="middle" font-size="9" fill="#1B6B52">Enfance</text>
    <text x="80" y="140" text-anchor="middle" font-size="9" fill="#666">VZV entre</text>
    <!-- Étape 2 Latence -->
    <circle cx="220" cy="95" r="30" fill="#FDF6E8" stroke="#B45309" stroke-width="2"/>
    <text x="220" y="80" text-anchor="middle" font-size="16">😴</text>
    <text x="220" y="96" text-anchor="middle" font-size="9" fill="#B45309" font-weight="600">Latence</text>
    <text x="220" y="108" text-anchor="middle" font-size="9" fill="#B45309">Des années</text>
    <text x="220" y="140" text-anchor="middle" font-size="9" fill="#666">VZV dort dans</text>
    <text x="220" y="152" text-anchor="middle" font-size="9" fill="#666">les ganglions</text>
    <!-- Étape 3 Réactivation -->
    <circle cx="360" cy="95" r="30" fill="#FDF0EF" stroke="#C0392B" stroke-width="2"/>
    <text x="360" y="80" text-anchor="middle" font-size="16">⚡</text>
    <text x="360" y="96" text-anchor="middle" font-size="9" fill="#C0392B" font-weight="600">Réactivation</text>
    <text x="360" y="108" text-anchor="middle" font-size="9" fill="#C0392B">Âge, stress</text>
    <text x="360" y="140" text-anchor="middle" font-size="9" fill="#666">VZV descend</text>
    <text x="360" y="152" text-anchor="middle" font-size="9" fill="#666">le nerf → zona</text>
    <!-- Étape 4 Traitement -->
    <circle cx="460" cy="95" r="30" fill="#E4F4EE" stroke="#1B6B52" stroke-width="2.5"/>
    <text x="460" y="80" text-anchor="middle" font-size="16">💊</text>
    <text x="460" y="96" text-anchor="middle" font-size="9" fill="#1B6B52" font-weight="600">< 72h</text>
    <text x="460" y="108" text-anchor="middle" font-size="9" fill="#1B6B52">Antiviral!</text>
    <text x="250" y="180" text-anchor="middle" font-size="10" fill="#C0392B" font-weight="600">⚠️ Sans traitement < 72h → risque majeur de douleurs chroniques post-zostériennes</text>
  </svg>`,

  xerose: `<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:500px;font-family:sans-serif">
    <rect width="500" height="200" rx="12" fill="#FFF8F0"/>
    <text x="250" y="20" text-anchor="middle" font-size="12" fill="#B45309" font-weight="600">Barrière cutanée : normale vs xérose</text>
    <!-- Peau normale -->
    <g transform="translate(20,35)">
      <text x="110" y="0" text-anchor="middle" font-size="11" fill="#1B6B52" font-weight="600">Peau normale</text>
      <!-- Cornée avec lipides -->
      <rect x="0" y="10" width="220" height="50" rx="4" fill="#F5DEB3" stroke="#8B6914" stroke-width="1.5"/>
      <!-- Briques et mortier -->
      <rect x="10" y="18" width="40" height="14" rx="2" fill="#E8D5A3"/>
      <rect x="58" y="18" width="40" height="14" rx="2" fill="#E8D5A3"/>
      <rect x="106" y="18" width="40" height="14" rx="2" fill="#E8D5A3"/>
      <rect x="154" y="18" width="40" height="14" rx="2" fill="#E8D5A3"/>
      <rect x="34" y="36" width="40" height="14" rx="2" fill="#E8D5A3"/>
      <rect x="82" y="36" width="40" height="14" rx="2" fill="#E8D5A3"/>
      <rect x="130" y="36" width="40" height="14" rx="2" fill="#E8D5A3"/>
      <!-- Lipides entre les briques (vert) -->
      <text x="110" y="70" text-anchor="middle" font-size="8" fill="#1B6B52">Céramides ✓ Acides gras ✓ Cholestérol ✓</text>
      <!-- Eau retenue -->
      <text x="110" y="90" text-anchor="middle" font-size="10" fill="#1B6B52">💧 TEWL basse → Eau retenue ✓</text>
      <text x="110" y="110" text-anchor="middle" font-size="10" fill="#1B6B52">Peau souple et hydratée</text>
    </g>
    <!-- Peau xérose -->
    <g transform="translate(260,35)">
      <text x="110" y="0" text-anchor="middle" font-size="11" fill="#C0392B" font-weight="600">Xérose (peau sèche)</text>
      <!-- Cornée avec trous -->
      <rect x="0" y="10" width="220" height="50" rx="4" fill="#FFECDC" stroke="#C0392B" stroke-width="1.5"/>
      <rect x="10" y="18" width="40" height="14" rx="2" fill="#E8D5A3"/>
      <rect x="58" y="18" width="40" height="14" rx="2" fill="#E8D5A3"/>
      <rect x="106" y="18" width="40" height="14" rx="2" fill="#E8D5A3"/>
      <rect x="154" y="18" width="40" height="14" rx="2" fill="#E8D5A3"/>
      <rect x="34" y="36" width="40" height="14" rx="2" fill="#E8D5A3"/>
      <rect x="82" y="36" width="40" height="14" rx="2" fill="#E8D5A3"/>
      <rect x="130" y="36" width="40" height="14" rx="2" fill="#E8D5A3"/>
      <!-- Trous dans le mortier -->
      <line x1="52" y1="18" x2="56" y2="52" stroke="white" stroke-width="5"/>
      <line x1="100" y1="18" x2="104" y2="52" stroke="white" stroke-width="5"/>
      <line x1="148" y1="18" x2="152" y2="52" stroke="white" stroke-width="5"/>
      <text x="110" y="70" text-anchor="middle" font-size="8" fill="#C0392B">Céramides ↓ Lipides manquants ↓</text>
      <!-- Eau qui s'échappe -->
      <text x="110" y="90" text-anchor="middle" font-size="10" fill="#C0392B">💨 TEWL haute → Eau s'échappe</text>
      <text x="110" y="110" text-anchor="middle" font-size="10" fill="#C0392B">Peau sèche, tiraille, gratte</text>
    </g>
    <text x="250" y="178" text-anchor="middle" font-size="10" fill="#1B6B52" font-weight="600">Émollient → remplace les lipides → bouche les trous → réduit TEWL</text>
  </svg>`,
};