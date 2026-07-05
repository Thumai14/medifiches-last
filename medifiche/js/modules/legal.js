/* MediFiches — LegalPages */

'use strict';

/* ═══════════════════════════════════════════════════
   LegalPages — Pages légales MediFiches
   Navigation par hash URL (#cgu, #cgv, etc.)
   Contenu conforme droit français (juin 2026)
   ═══════════════════════════════════════════════════ */

const LegalPages = (() => {

  const PAGES = {

    /* ── MENTIONS LÉGALES ── */
    'mentions-legales': {
      title: 'Mentions légales',
      hash: '#mentions-legales',
      content: `
        <h2>Éditeur du site</h2>
        <p><strong>Dénomination sociale :</strong> MediFiches</p>
        <p><strong>Statut juridique :</strong> Entrepreneur individuel (micro-entreprise)</p>
        <p><strong>Nom :</strong> BAZRAFKAN Nima</p>
        <p><strong>SIREN :</strong> En cours d'attribution</p>
        <p><strong>Adresse du siège :</strong> 12 Allée du Vieux Clos Herbert, 14000 Caen, France</p>
        <p><strong>Responsable de la publication :</strong> BAZRAFKAN Nima</p>
        <p><strong>Contact :</strong> <a href="mailto:nb.medifiches@gmail.com">nb.medifiches@gmail.com</a></p>

        <h2>Hébergeur</h2>
        <p><strong>Nom :</strong> Cloudflare Pages</p>
        <p><strong>Adresse :</strong> 101 Townsend St, San Francisco, CA 94107, États-Unis</p>
        <p><strong>Site web :</strong> <a href="https://pages.cloudflare.com" target="_blank" rel="noopener">pages.cloudflare.com</a></p>
        <h2>Base de données</h2>
        <p><strong>Nom :</strong> Supabase</p>
        <p><strong>Région :</strong> eu-west-3 (Paris, France)</p>
        <p><strong>Site web :</strong> <a href="https://supabase.com" target="_blank" rel="noopener">supabase.com</a></p>

        <h2>Propriété intellectuelle</h2>
        <p>L'ensemble des éléments constituant le site MediFiches (structure, textes, logiciels, icônes, base de données médicale) est la propriété exclusive de l'éditeur et est protégé par le droit de la propriété intellectuelle français.</p>
        <p>Toute reproduction, représentation, diffusion ou utilisation, même partielle, du contenu de ce site sans autorisation préalable et écrite est strictement interdite.</p>

        <h2>Données de santé</h2>
        <div class="legal-info-box">
          Les informations médicales présentes sur MediFiches sont issues de référentiels validés (HAS, ANSM) et sont destinées à des professionnels de santé (préparateurs en pharmacie, pharmaciens). Elles ne constituent pas un avis médical individuel et ne remplacent en aucun cas l'évaluation clinique d'un professionnel de santé qualifié.
        </div>

        <h2>Droit applicable</h2>
        <p>Le présent site est soumis au droit français. Tout litige relatif à son utilisation sera soumis à la compétence des tribunaux français.</p>
      `
    },

    /* ── CGU ── */
    'cgu': {
      title: "Conditions Générales d'Utilisation",
      hash: '#cgu',
      content: `
        <p class="legal-info-box">Dernière mise à jour : juin 2026 · En vigueur à compter de la mise en ligne du service.</p>

        <h2>1. Objet du service</h2>
        <p>MediFiches est une application web destinée aux <strong>préparateurs en pharmacie et aux pharmaciens</strong>. Elle fournit une aide documentaire au conseil officinal : fiches pathologies, matériel médical, dermatologie, et ressources de formation.</p>
        <p>MediFiches est un outil d'aide à la décision professionnelle. Elle ne se substitue pas au jugement clinique du professionnel de santé ni à l'ordonnance médicale.</p>

        <h2>2. Accès au service</h2>
        <p>L'accès à MediFiches est conditionné à la création d'un compte et à la souscription d'un abonnement payant, après expiration d'une période d'essai gratuite de <strong>30 jours</strong>.</p>
        <p>L'accès est réservé aux professionnels de santé exerçant en pharmacie d'officine. L'éditeur se réserve le droit de vérifier la qualité de professionnel de santé et de refuser ou résilier tout accès en cas d'usage non conforme.</p>
        <p>Le service est accessible 24h/24, 7j/7, sauf interruption pour maintenance. L'éditeur ne garantit pas une disponibilité continue et peut suspendre l'accès sans préavis pour des raisons techniques ou de sécurité.</p>

        <h2>3. Comptes utilisateurs</h2>
        <p>Chaque utilisateur est responsable de la confidentialité de ses identifiants de connexion. En cas de compromission, l'utilisateur doit en informer immédiatement l'éditeur à l'adresse <a href="mailto:nb.medifiches@gmail.com">nb.medifiches@gmail.com</a>.</p>
        <p>Un compte est strictement personnel et ne peut être partagé entre plusieurs utilisateurs ou officines. Pour un usage multi-poste, un abonnement dédié est disponible.</p>

        <h2>4. Propriété intellectuelle</h2>
        <p>L'ensemble du contenu de MediFiches (base de données médicale, interfaces, textes, algorithmes) est protégé par le droit de la propriété intellectuelle. L'abonnement confère à l'utilisateur un droit d'usage personnel, non exclusif et non transférable.</p>
        <p>Il est notamment interdit de : reproduire, extraire, redistribuer ou revendre tout ou partie du contenu ; d'utiliser le service pour entraîner un modèle d'intelligence artificielle ; d'effectuer un scraping automatisé des données.</p>

        <h2>5. Responsabilités</h2>
        <p><strong>Responsabilité de l'éditeur :</strong> L'éditeur s'engage à maintenir le contenu médical à jour selon les recommandations HAS/ANSM en vigueur. Cependant, l'éditeur ne peut être tenu responsable d'une décision médicale ou pharmaceutique prise sur la base des informations fournies.</p>
        <p><strong>Responsabilité de l'utilisateur :</strong> L'utilisateur reste seul responsable de l'utilisation des informations dans le cadre de son exercice professionnel. Il s'engage à signaler toute erreur ou inexactitude à l'éditeur.</p>
        <div class="legal-info-box">
          MediFiches n'est pas un dispositif médical au sens du Règlement (UE) 2017/745 et n'est pas destinée à poser des diagnostics médicaux.
        </div>

        <h2>6. Résiliation</h2>
        <p>L'utilisateur peut résilier son abonnement à tout moment depuis son espace personnel, avec effet à la fin de la période d'abonnement en cours.</p>
        <p>L'éditeur se réserve le droit de résilier un compte en cas de violation des présentes CGU, sans remboursement de la période restante.</p>

        <h2>7. Modification des CGU</h2>
        <p>L'éditeur peut modifier les présentes CGU à tout moment. Les modifications entrent en vigueur dès leur publication. L'utilisateur sera informé par e-mail de toute modification substantielle.</p>

        <h2>8. Droit applicable et juridiction</h2>
        <p>Les présentes CGU sont soumises au droit français. En cas de litige, les parties s'engagent à rechercher une solution amiable avant tout recours judiciaire. À défaut, les tribunaux compétents seront ceux du ressort du siège de l'éditeur (Normandie, France).</p>
      `
    },

    /* ── CGV ── */
    'cgv': {
      title: 'Conditions Générales de Vente',
      hash: '#cgv',
      content: `
        <p class="legal-info-box">Dernière mise à jour : juin 2026 · Applicable à tout abonnement souscrit à compter de cette date.</p>

        <h2>1. Prix et formules d'abonnement</h2>
        <p>MediFiches propose les formules suivantes (prix HT, TVA 20% applicable) :</p>
        <ul>
          <li><strong>Découverte (1 poste) :</strong> 19 € HT/mois — soit 179 € HT/an (−21%)</li>
          <li><strong>Officine (jusqu'à 4 postes) :</strong> 39 € HT/mois — soit 349 € HT/an (−25%)</li>
          <li><strong>Grande officine (postes illimités) :</strong> 69 € HT/mois — soit 659 € HT/an (−20%)</li>
        </ul>
        <p><strong>Offre Fondateur (10 premières officines) :</strong> −30% sur le tarif annuel à vie.</p>
        <p>Une <strong>période d'essai gratuite de 30 jours</strong> est proposée à tout nouvel utilisateur, sans carte bancaire requise. À l'issue de l'essai, un abonnement payant est nécessaire pour continuer à accéder au service.</p>
        <p>Les prix peuvent être révisés à tout moment. L'utilisateur sera informé 30 jours avant toute modification tarifaire affectant son abonnement en cours.</p>

        <h2>2. Modalités d'abonnement</h2>
        <p>L'abonnement prend effet à compter de la date de souscription et de validation du paiement. Il donne accès à l'ensemble des fonctionnalités de MediFiches selon la formule choisie.</p>
        <p>Les personnalisations et données enregistrées dans MediFiches (fiches, modifications) restent accessibles pendant toute la durée de l'abonnement actif.</p>

        <h2>3. Paiement</h2>
        <p>Le paiement est effectué en ligne par carte bancaire via un prestataire de paiement sécurisé (Stripe ou équivalent certifié PCI-DSS). MediFiches ne stocke aucune donnée bancaire.</p>
        <p>En cas d'échec de paiement, l'accès au service sera suspendu après un délai de grâce de 7 jours, avec notification par e-mail.</p>

        <h2>4. Renouvellement</h2>
        <p>L'abonnement est renouvelé <strong>automatiquement</strong> à son échéance (mensuelle ou annuelle), par prélèvement automatique sur le moyen de paiement enregistré.</p>
        <p>L'utilisateur peut désactiver le renouvellement automatique à tout moment depuis son espace personnel, au moins 24 heures avant la date d'échéance.</p>

        <h2>5. Résiliation et remboursement</h2>
        <p><strong>Résiliation à l'initiative de l'utilisateur :</strong> L'utilisateur peut résilier son abonnement à tout moment en contactant l'éditeur. La résiliation prend effet à la fin de la période en cours. <strong>Aucun remboursement n'est accordé</strong> après la période d'essai gratuite de 30 jours.</p>
        <p><strong>Droit de rétractation :</strong> Conformément à l'article L.221-28 du Code de la consommation, le droit de rétractation de 14 jours ne s'applique pas aux contenus numériques fournis immédiatement après la souscription, si l'utilisateur a expressément renoncé à ce droit lors de la commande. La période d'essai gratuite de 30 jours se substitue à ce droit de rétractation.</p>
        <p><strong>Remboursement exceptionnel :</strong> En cas d'indisponibilité prolongée du service (plus de 72h consécutives imputable à l'éditeur), un remboursement prorata pourra être accordé sur demande à <a href="mailto:nb.medifiches@gmail.com">nb.medifiches@gmail.com</a>.</p>

        <h2>6. Résiliation par l'éditeur</h2>
        <p>L'éditeur peut résilier un abonnement en cas de violation des CGU, sans remboursement de la période restante. En cas de cessation d'activité du service, les utilisateurs seront prévenus avec un préavis minimum de 30 jours et remboursés du prorata non consommé.</p>

        <h2>7. Droit applicable</h2>
        <p>Les présentes CGV sont soumises au droit français (Code de la consommation, Code de commerce). Pour tout litige, les tribunaux français sont compétents.</p>
      `
    },

    /* ── POLITIQUE DE CONFIDENTIALITÉ ── */
    'confidentialite': {
      title: 'Politique de confidentialité',
      hash: '#confidentialite',
      content: `
        <p class="legal-info-box">Dernière mise à jour : juin 2026 · MediFiches s'engage à protéger les données personnelles de ses utilisateurs conformément au RGPD (Règlement UE 2016/679) et à la loi Informatique et Libertés.</p>

        <h2>1. Responsable du traitement</h2>
        <p>Le responsable du traitement des données personnelles est l'éditeur de MediFiches, joignable à <a href="mailto:nb.medifiches@gmail.com">nb.medifiches@gmail.com</a>.</p>

        <h2>2. Données collectées</h2>
        <h3>Données de compte</h3>
        <ul>
          <li>Nom, prénom, adresse e-mail professionnelle</li>
          <li>Nom de l'officine et adresse professionnelle</li>
          <li>Numéro d'inscription à l'Ordre des pharmaciens (optionnel, pour vérification)</li>
        </ul>
        <h3>Données d'utilisation</h3>
        <ul>
          <li>Personnalisations enregistrées dans MediFiches (fiches modifiées, notes) — stockées localement dans votre navigateur (localStorage)</li>
          <li>Données de connexion : adresse IP, horodatage, type de navigateur</li>
          <li>Données de navigation agrégées et anonymisées (pages consultées, durée de session)</li>
        </ul>
        <h3>Données de paiement</h3>
        <p>Les données bancaires sont traitées exclusivement par notre prestataire de paiement (Stripe). MediFiches ne conserve aucune donnée de carte bancaire.</p>
        <div class="legal-info-box">
          <strong>Important :</strong> Les personnalisations que vous saisissez dans MediFiches (notes, fiches modifiées) sont stockées uniquement dans le localStorage de votre navigateur. Elles ne sont jamais transmises à nos serveurs. Elles restent sur votre poste de travail.
        </div>

        <h2>3. Cookies</h2>
        <p>MediFiches utilise uniquement des cookies strictement nécessaires au fonctionnement du service (session d'authentification, préférences d'affichage). Aucun cookie publicitaire ni de traçage tiers n'est déposé.</p>
        <ul>
          <li><strong>mf_theme</strong> : préférence de thème clair/sombre (localStorage, local uniquement)</li>
          <li><strong>Session cookie</strong> : maintien de la connexion (durée : session)</li>
        </ul>
        <p>Le bandeau de consentement aux cookies n'est pas requis pour les cookies strictement nécessaires.</p>

        <h2>4. Finalités et base légale</h2>
        <ul>
          <li><strong>Gestion du compte et de l'abonnement</strong> — base légale : exécution du contrat</li>
          <li><strong>Fourniture du service MediFiches</strong> — base légale : exécution du contrat</li>
          <li><strong>Amélioration du service</strong> (statistiques anonymisées) — base légale : intérêt légitime</li>
          <li><strong>Obligations légales et comptables</strong> — base légale : obligation légale</li>
        </ul>

        <h2>5. Durée de conservation</h2>
        <ul>
          <li><strong>Données de compte actif :</strong> durée de l'abonnement + 3 ans (délai de prescription légale)</li>
          <li><strong>Données de facturation :</strong> 10 ans (obligation comptable)</li>
          <li><strong>Logs de connexion :</strong> 12 mois</li>
          <li><strong>Données après résiliation :</strong> suppression dans les 90 jours suivant la demande</li>
        </ul>

        <h2>6. Vos droits RGPD</h2>
        <p>Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :</p>
        <ul>
          <li><strong>Droit d'accès</strong> — obtenir une copie de vos données</li>
          <li><strong>Droit de rectification</strong> — corriger des données inexactes</li>
          <li><strong>Droit à l'effacement</strong> — demander la suppression de vos données</li>
          <li><strong>Droit à la portabilité</strong> — recevoir vos données dans un format structuré</li>
          <li><strong>Droit d'opposition</strong> — vous opposer à certains traitements</li>
          <li><strong>Droit de limitation</strong> — limiter le traitement de vos données</li>
        </ul>
        <p>Pour exercer ces droits, contactez-nous à <a href="mailto:nb.medifiches@gmail.com">nb.medifiches@gmail.com</a>. Nous répondrons dans un délai d'un mois. En cas de réponse insatisfaisante, vous pouvez saisir la <strong>CNIL</strong> (<a href="https://www.cnil.fr" target="_blank" rel="noopener">cnil.fr</a>).</p>

        <h2>7. Transferts de données</h2>
        <p>MediFiches est hébergée sur Netlify (États-Unis). Ce transfert est encadré par les Clauses Contractuelles Types de la Commission européenne. Aucune autre donnée n'est transférée hors de l'Union européenne.</p>

        <h2>8. Sécurité</h2>
        <p>MediFiches met en œuvre des mesures techniques et organisationnelles appropriées : HTTPS, chiffrement des mots de passe, accès restreint aux données, sauvegardes régulières.</p>
      `
    },

    /* ── CONTACT ── */
    'contact': {
      title: 'Contact',
      hash: '#contact',
      content: `
        <h2>Nous contacter</h2>
        <div class="legal-contact-block">
          <p><strong>MediFiches</strong></p>
          <p>Normandie, France</p>
          <p>📧 <a href="mailto:nb.medifiches@gmail.com">nb.medifiches@gmail.com</a></p>
          <p style="margin-top:var(--space-4);font-size:13px;color:var(--text-3)">Nous répondons généralement sous 48h ouvrées.</p>
        </div>

        <h2>Demandes spécifiques</h2>
        <ul>
          <li><strong>Support technique</strong> — dysfonctionnement, bug, question sur l'application : <a href="mailto:support@medifiches.fr">support@medifiches.fr</a></li>
          <li><strong>Abonnement et facturation</strong> — modification, résiliation, facture : <a href="mailto:nb.medifiches@gmail.com">nb.medifiches@gmail.com</a></li>
          <li><strong>Droits RGPD</strong> — accès, rectification, suppression de vos données : <a href="mailto:nb.medifiches@gmail.com">nb.medifiches@gmail.com</a> (objet : « Demande RGPD »)</li>
          <li><strong>Partenariat / presse</strong> : <a href="mailto:nb.medifiches@gmail.com">nb.medifiches@gmail.com</a></li>
        </ul>

        <h2>Signaler une erreur médicale</h2>
        <div class="legal-info-box">
          Vous avez identifié une information médicale inexacte ou obsolète dans MediFiches ? Merci de nous le signaler à <a href="mailto:nb.medifiches@gmail.com">nb.medifiches@gmail.com</a> avec l'objet « Erreur contenu ». Nous procédons à la vérification et à la correction sous 5 jours ouvrés.
        </div>

        <h2>Adresse légale</h2>
        <div class="legal-contact-block">
          <p><strong>MediFiches</strong> — Entreprise individuelle</p>
          <p>Normandie, France</p>
          <p>SIREN : en cours d'attribution</p>
        </div>
      `
    }
  };

  // ── API publique ──

  function open(pageId) {
    const page = PAGES[pageId];
    if (!page) return;

    const overlay = document.getElementById('legal-overlay');
    const titleEl = document.getElementById('legal-page-title');
    const bodyEl  = document.getElementById('legal-body');

    if (!overlay || !titleEl || !bodyEl) return;

    titleEl.textContent = page.title;
    bodyEl.innerHTML = page.content;
    overlay.classList.add('active');
    overlay.scrollTop = 0;
    document.body.style.overflow = 'hidden';

    // Hash URL pour partageabilité (no-op dans iframe sandbox)
    try { history.pushState({ legal: pageId }, page.title, page.hash); } catch(e) {}

    // Fermeture clavier (Escape)
    overlay._keyHandler = e => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', overlay._keyHandler);
  }

  function close() {
    const overlay = document.getElementById('legal-overlay');
    if (!overlay) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';

    if (overlay._keyHandler) {
      document.removeEventListener('keydown', overlay._keyHandler);
      overlay._keyHandler = null;
    }

    // Restaurer l'URL propre
    try { history.pushState({}, document.title, window.location.pathname); } catch(e) {}
  }

  // Gestion du bouton Retour navigateur
  window.addEventListener('popstate', e => {
    const overlay = document.getElementById('legal-overlay');
    if (overlay?.classList.contains('active')) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Ouvrir automatiquement si hash présent au chargement
  document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.replace('#', '');
    if (PAGES[hash]) open(hash);
  });

  return { open, close, PAGES };
})();

window.LegalPages = LegalPages;