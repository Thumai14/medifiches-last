/* MediFiche — Backup */

var Backup = {
  /* Export unifié via MF.Store v2 */
  exportData: function() {
    try {
      var payload = window.MF
        ? MF.Store.exportAll()
        : Backup._legacyExport();
      var count = Object.keys(payload.data || {}).length;
      var blob = new Blob([JSON.stringify(payload, null, 2)], {type:'application/json'});
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'medifiche-backup-' + payload.date + '.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      Backup._toast('Export OK — ' + count + ' personnalisation(s)');
    } catch(err) {
      Backup._toast('Erreur export : ' + err.message);
    }
  },

  _legacyExport: function() {
    var data = {};
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      if (key && (key.indexOf('mf_') === 0 || key.indexOf('mf-') === 0)) {
        try { data[key] = JSON.parse(localStorage.getItem(key)); }
        catch(e) { data[key] = localStorage.getItem(key); }
      }
    }
    return { version: 2, date: new Date().toISOString().slice(0,10), data: data };
  },

  importData: function(input) {
    var file = input.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(e) {
      try {
        var json = JSON.parse(e.target.result);
        var entries = (json && json.data !== undefined) ? json.data : json;
        if (!entries || typeof entries !== 'object') {
          Backup._toast('Fichier invalide — structure incorrecte.');
          input.value = ''; return;
        }
        // Accepter v1 (mf_) et v2 (mf_) et legacy (mf-)
        var mfKeys = Object.keys(entries).filter(function(k) {
          return k.indexOf('mf_') === 0 || k.indexOf('mf-') === 0;
        });
        var isMediFiche = json.version >= 1 || mfKeys.length > 0;
        if (!isMediFiche || mfKeys.length === 0) {
          Backup._toast("Ce fichier n'est pas un backup MediFiche valide.");
          input.value = ''; return;
        }
        // Confirmer via dialog non-bloquant (remplace confirm())
        Backup._confirm(
          'Importer ' + mfKeys.length + ' personnalisation(s) ?',
          function() {
            if (window.MF) {
              MF.Store.importAll(entries);
            } else {
              mfKeys.forEach(function(k) {
                localStorage.setItem(k, JSON.stringify(entries[k]));
              });
            }
            input.value = '';
            Backup._toast(mfKeys.length + ' personnalisation(s) restaurée(s)');
            setTimeout(function() { location.reload(); }, 1800);
          },
          function() { input.value = ''; }
        );
      } catch(err) {
        Backup._toast('Erreur : ' + err.message);
        input.value = '';
      }
    };
    reader.readAsText(file);
  },

  /* Dialogue de confirmation non-bloquant (remplace confirm() natif) */
  _confirm: function(message, onOk, onCancel) {
    if (!window.MF) { if (confirm(message)) onOk(); else if (onCancel) onCancel(); return; }
    var html = '<div style="padding:var(--space-8)">'
      + '<p style="margin-bottom:var(--space-6);font-size:1rem">' + MF.esc(message) + '</p>'
      + '<div style="display:flex;gap:var(--space-3);justify-content:flex-end">'
      + '<button id="mf-confirm-cancel" class="btn btn--ghost">Annuler</button>'
      + '<button id="mf-confirm-ok" class="btn btn--primary">Confirmer</button>'
      + '</div></div>';
    var box = MF.modal({ id: 'mf-confirm-dialog', content: html, width: '400px' });
    box.querySelector('#mf-confirm-ok').onclick = function() {
      MF.closeModal('mf-confirm-dialog');
      onOk();
    };
    box.querySelector('#mf-confirm-cancel').onclick = function() {
      MF.closeModal('mf-confirm-dialog');
      if (onCancel) onCancel();
    };
  },

  _toast: function(msg) {
    var t = document.createElement('div');
    t.className = 'customizer-toast';
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(function() { t.classList.add('show'); });
    setTimeout(function() { t.classList.remove('show'); setTimeout(function() { t.remove(); }, 300); }, 3000);
  }
};
window.Backup = Backup;

/* ─── BOUTON SCROLL HAUT/BAS ─── */
(function() {
  var fab = document.getElementById('scroll-fab');
  if (!fab) return;
  var ticking = false;
  window.addEventListener('scroll', function() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function() {
      fab.classList.toggle('visible', window.scrollY > 200);
      ticking = false;
    });
  }, { passive: true });
})();