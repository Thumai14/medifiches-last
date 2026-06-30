/* MediFiche — FicheDocuments
   Gestion des documents annexes par fiche (pathologie, dispositif, dermatologie)
   Stockage : Supabase Storage · bucket 'fiche-documents'
   Chemin   : {user_id}/{module}/{slug}/{filename}
   Limite   : MAX_DOCS fichiers par fiche */

'use strict';

const FicheDocuments = (() => {

  const MAX_DOCS = 4;
  const BUCKET   = 'fiche-documents';

  /* ── Helpers Supabase ── */
  function getClient() { return window._supabase || null; }

  async function getUserId() {
    const client = getClient();
    if (!client) return null;
    const { data: { session } } = await client.auth.getSession();
    return session?.user?.id || null;
  }

  function storagePath(userId, module, slug, filename) {
    const safe = s => s.replace(/[^a-zA-Z0-9._-]/g, '_');
    return `${userId}/${safe(module)}/${safe(slug)}/${safe(filename)}`;
  }

  /* ── Lister les fichiers d'une fiche ── */
  async function listFiles(userId, module, slug) {
    const client = getClient();
    if (!client) return [];
    const prefix = `${userId}/${module.replace(/[^a-zA-Z0-9._-]/g,'_')}/${slug.replace(/[^a-zA-Z0-9._-]/g,'_')}`;
    const { data, error } = await client.storage.from(BUCKET).list(prefix);
    if (error || !data) return [];
    return data.filter(f => f.name && !f.name.startsWith('.')).map(f => ({
      name: f.name,
      size: f.metadata?.size || 0,
      path: prefix + '/' + f.name,
      created: f.created_at
    }));
  }

  /* ── URL de téléchargement signé (1h) ── */
  async function getSignedUrl(path) {
    const client = getClient();
    if (!client) return null;
    const { data, error } = await client.storage.from(BUCKET).createSignedUrl(path, 3600);
    return error ? null : data?.signedUrl;
  }

  /* ── Upload ── */
  async function uploadFile(userId, module, slug, file) {
    const client = getClient();
    if (!client) return { error: 'Client Supabase non disponible' };
    const path = storagePath(userId, module, slug, file.name);
    const { error } = await client.storage.from(BUCKET).upload(path, file, { upsert: true });
    return error ? { error: error.message } : { path };
  }

  /* ── Supprimer ── */
  async function deleteFile(path) {
    const client = getClient();
    if (!client) return;
    await client.storage.from(BUCKET).remove([path]);
  }

  /* ── Icône selon l'extension ── */
  function fileIcon(name) {
    const ext = name.split('.').pop().toLowerCase();
    if (['pdf'].includes(ext))                         return '📄';
    if (['jpg','jpeg','png','gif','webp'].includes(ext)) return '🖼️';
    if (['doc','docx'].includes(ext))                  return '📝';
    if (['xls','xlsx','csv'].includes(ext))            return '📊';
    if (['ppt','pptx'].includes(ext))                  return '📋';
    return '📎';
  }

  function formatSize(bytes) {
    if (!bytes) return '';
    if (bytes < 1024) return bytes + ' o';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' Ko';
    return (bytes / (1024 * 1024)).toFixed(1) + ' Mo';
  }

  /* ── Panel UI ── */
  let _currentPanel = null;

  async function open(module, slug, triggerEl) {
    // Toggle : si le panel est déjà ouvert sur CETTE fiche → fermer et sortir
    if (_currentPanel) {
      const wasSameSlug = _currentPanel._slug === slug;
      _currentPanel.remove();
      _currentPanel = null;
      if (wasSameSlug) return;
    }

    const userId = await getUserId();
    if (!userId) {
      MF.modal?.('<p>Connexion requise pour accéder aux documents.</p>');
      return;
    }

    // Construire le panel
    const panel = document.createElement('div');
    panel.className = 'fdoc-panel';
    panel._slug = slug;
    _currentPanel = panel;

    // Insérer après le hero dans le .pf-card ou le conteneur de détail
    const hero = triggerEl.closest('.fiche-hero');
    const container = hero?.parentElement;
    if (!container) return;
    hero.after(panel);
    // Stopper la propagation depuis le panel vers les parents (évite toggle intempestif)
    panel.addEventListener('click', e => e.stopPropagation());

    await render(panel, userId, module, slug);
  }

  async function render(panel, userId, module, slug) {
    panel.innerHTML = '<div class="fdoc-loading">Chargement…</div>';
    const files = await listFiles(userId, module, slug);
    // Synchroniser le badge du bouton trombone juste au-dessus
    const hero = panel.previousElementSibling;
    const docsBtn = hero?.querySelector?.('.fiche-hero__docs');
    if (docsBtn) {
      let badge = docsBtn.querySelector('.fiche-hero__docs-badge');
      if (files.length > 0) {
        if (!badge) { badge = document.createElement('span'); badge.className = 'fiche-hero__docs-badge'; docsBtn.appendChild(badge); }
        badge.textContent = files.length;
      } else if (badge) badge.remove();
    }

    panel.innerHTML = `
      <div class="fdoc-inner">
        <div class="fdoc-header">
          <span class="fdoc-title">📎 Documents annexes</span>
          <span class="fdoc-count">${files.length}/${MAX_DOCS}</span>
          <button class="fdoc-close" onclick="FicheDocuments.close()" title="Fermer">✕</button>
        </div>
        <div class="fdoc-list" id="fdoc-list-${slug.replace(/[^a-z0-9]/gi,'_')}">
          ${files.length === 0
            ? '<div class="fdoc-empty">Aucun document · déposez un fichier ci-dessous</div>'
            : files.map(f => fileRow(f)).join('')}
        </div>
        ${files.length < MAX_DOCS ? `
        <div class="fdoc-upload-zone" id="fdoc-drop-${slug.replace(/[^a-z0-9]/gi,'_')}">
          <input type="file" id="fdoc-input-${slug.replace(/[^a-z0-9]/gi,'_')}"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx,.csv,.ppt,.pptx"
            style="display:none"
            onchange="FicheDocuments._handleUpload('${module}','${slug}',this)">
          <label for="fdoc-input-${slug.replace(/[^a-z0-9]/gi,'_')}" class="fdoc-upload-label">
            <span class="fdoc-upload-icon">⬆️</span>
            <span>Déposer ou cliquer pour ajouter un fichier</span>
            <span class="fdoc-upload-hint">PDF, image, Word, Excel · max 10 Mo</span>
          </label>
        </div>` : `<div class="fdoc-limit">Limite de ${MAX_DOCS} fichiers atteinte</div>`}
        ${panel._error ? `<div class="fdoc-error">${panel._error}</div>` : ''}
      </div>`;

    // Drag & drop
    const zone = panel.querySelector('.fdoc-upload-zone');
    if (zone) {
      zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('fdoc-dragover'); });
      zone.addEventListener('dragleave', () => zone.classList.remove('fdoc-dragover'));
      zone.addEventListener('drop', e => {
        e.preventDefault(); zone.classList.remove('fdoc-dragover');
        const file = e.dataTransfer.files[0];
        if (file) FicheDocuments._doUpload(module, slug, file, panel, userId);
      });
    }
  }

  function fileRow(f) {
    const safe = f.path.replace(/'/g, "\\'");
    return `<div class="fdoc-file" data-path="${f.path}">
      <span class="fdoc-file-icon">${fileIcon(f.name)}</span>
      <span class="fdoc-file-name" title="Ouvrir ${f.name}" onclick="FicheDocuments._openFile('${safe}')">${f.name}</span>
      <span class="fdoc-file-size">${formatSize(f.size)}</span>
      <button class="fdoc-file-del" onclick="FicheDocuments._deleteFile('${safe}',this)" title="Supprimer">✕</button>
    </div>`;
  }

  /* ── Actions ── */
  async function _handleUpload(module, slug, input) {
    const file = input.files[0];
    if (!file) return;
    input.value = '';
    const userId = await getUserId();
    if (!userId) return;
    await _doUpload(module, slug, file, _currentPanel, userId);
  }

  async function _doUpload(module, slug, file, panel, userId) {
    if (file.size > 10 * 1024 * 1024) {
      panel._error = 'Fichier trop volumineux (max 10 Mo)';
      await render(panel, userId, module, slug);
      return;
    }
    const files = await listFiles(userId, module, slug);
    if (files.length >= MAX_DOCS) {
      panel._error = `Limite de ${MAX_DOCS} fichiers atteinte`;
      await render(panel, userId, module, slug);
      return;
    }
    // Indicateur de chargement
    const list = panel.querySelector('[id^="fdoc-list-"]');
    if (list) list.insertAdjacentHTML('beforeend',
      `<div class="fdoc-file fdoc-file--uploading">⏳ Upload de ${file.name}…</div>`);
    const result = await uploadFile(userId, module, slug, file);
    if (result.error) {
      panel._error = 'Erreur upload : ' + result.error;
    } else {
      panel._error = null;
    }
    await render(panel, userId, module, slug);
  }

  async function _openFile(path) {
    const url = await getSignedUrl(path);
    if (url) window.open(url, '_blank');
    else alert('Impossible d\'ouvrir le fichier.');
  }

  async function _deleteFile(path, btn) {
    if (!confirm('Supprimer ce document ?')) return;
    btn.textContent = '…';
    await deleteFile(path);
    const row = btn.closest('.fdoc-file');
    const panel = btn.closest('.fdoc-panel');
    const userId = await getUserId();
    // Récupérer module/slug depuis le path : userId/module/slug/filename
    const parts = path.split('/');
    const module = parts[1], slug = parts[2];
    if (userId) await render(panel, userId, module, slug);
  }

  function close() {
    if (_currentPanel) { _currentPanel.remove(); _currentPanel = null; }
  }

  /* ── Badge indicateur (nombre de docs) sur le bouton 📎 ──
     À appeler après l'injection du hero dans le DOM. */
  async function refreshBadge(module, slug, containerEl) {
    const btn = containerEl?.querySelector('.fiche-hero__docs');
    if (!btn) return;
    const userId = await getUserId();
    if (!userId) return;
    const files = await listFiles(userId, module, slug);
    let badge = btn.querySelector('.fiche-hero__docs-badge');
    if (files.length > 0) {
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'fiche-hero__docs-badge';
        btn.appendChild(badge);
      }
      badge.textContent = files.length;
    } else if (badge) {
      badge.remove();
    }
  }

  return { open, close, refreshBadge, _handleUpload, _doUpload, _openFile, _deleteFile };

})();

window.FicheDocuments = FicheDocuments;
