/* ==========================================================================
   Form delivery — sends every site form to a Google Apps Script web app,
   which appends a row to the client's Google Sheet and emails a notification.
   Setup: see HANDOVER.md → "Forms". Paste the deployed web-app URL below.
   ========================================================================== */
var EIP_FORM_ENDPOINT = '';           // e.g. 'https://script.google.com/macros/s/XXXX/exec'
var EIP_FALLBACK_EMAIL = 'contact@sipedtech.com';
var EIP_MAX_FILE_BYTES = 5 * 1024 * 1024;

(function(){
  function cleanLabel(text){
    return (text || '').replace(/\*/g, '').replace(/\(optional\)/i, '').replace(/\s+/g, ' ').trim();
  }

  // Readable column name for a field: data-label, else its <label>, else its id.
  function fieldLabel(el){
    if (el.dataset.label) return el.dataset.label;
    if (el.id){
      var forLabel = document.querySelector('label[for="' + el.id + '"]');
      if (forLabel) return cleanLabel(forLabel.textContent);
    }
    var field = el.closest('.field');
    var lbl = field && field.querySelector('label');
    if (lbl) return cleanLabel(lbl.textContent);
    return el.id || el.name || 'Field';
  }

  function readFile(file){
    return new Promise(function(resolve, reject){
      var r = new FileReader();
      r.onload = function(){ resolve({ name:file.name, type:file.type, data:String(r.result).split(',')[1] }); };
      r.onerror = reject;
      r.readAsDataURL(file);
    });
  }

  /* eipSubmit(form, formName, onSuccess) — validates files, posts, then calls onSuccess. */
  window.eipSubmit = function(form, formName, onSuccess){
    var fields = {}, filePromises = [];
    var els = form.querySelectorAll('input, select, textarea');
    for (var i = 0; i < els.length; i++){
      var el = els[i], key = fieldLabel(el);
      if (el.type === 'submit' || el.type === 'button') continue;
      if (el.type === 'file'){
        var f = el.files && el.files[0];
        if (el.hasAttribute('data-required') && !f){ alert('Please attach your ' + key.toLowerCase() + '.'); return; }
        if (f && f.size > EIP_MAX_FILE_BYTES){ alert(key + ' is larger than 5 MB. Please attach a smaller file.'); return; }
        if (f) filePromises.push(readFile(f).then(function(k){ return function(d){ d.field = k; return d; }; }(key)));
        continue;
      }
      var val = el.type === 'checkbox' ? (el.checked ? 'Yes' : 'No') : el.value.trim();
      while (fields.hasOwnProperty(key)) key += ' ';   // keep duplicate labels distinct
      fields[key] = val;
    }

    var btn = form.querySelector('[type="submit"]');
    var btnHTML = btn && btn.innerHTML;
    if (btn){ btn.disabled = true; btn.textContent = 'Sending…'; }
    function restore(){ if (btn){ btn.disabled = false; btn.innerHTML = btnHTML; } }

    if (!EIP_FORM_ENDPOINT){
      console.warn('EIP_FORM_ENDPOINT is not set — submission not delivered.', formName, fields);
      restore(); onSuccess(); return;
    }

    Promise.all(filePromises).then(function(files){
      return fetch(EIP_FORM_ENDPOINT, {
        method: 'POST',
        // text/plain avoids a CORS preflight, which Apps Script cannot answer
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ form: formName, page: location.pathname, fields: fields, files: files })
      });
    }).then(function(res){ return res.json(); })
      .then(function(out){
        if (!out || !out.ok) throw new Error(out && out.error || 'Unknown error');
        restore(); onSuccess();
      })
      .catch(function(err){
        console.error('Form submission failed:', err);
        restore();
        alert('Sorry, your message could not be sent. Please try again, or email us at ' + EIP_FALLBACK_EMAIL + '.');
      });
  };
})();
