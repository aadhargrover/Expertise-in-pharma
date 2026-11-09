/* ==========================================================================
   ExpertiseInPharma — shared behavior
   Nav scroll state, mobile drawer, scroll-reveal, spotlight hover, section rail.
   Page-specific behavior (hero carousel, stat rings, flip cards, wizards,
   tab syncing, filters) lives inline in each page.
   ========================================================================== */
(function(){

  // ---- nav scroll shrink ----
  var nav = document.getElementById('site-nav');
  if (nav){
    function onScroll(){
      if (window.scrollY > 60) nav.classList.add('nav--scrolled');
      else nav.classList.remove('nav--scrolled');
    }
    window.addEventListener('scroll', onScroll, { passive:true });
    onScroll();
  }

  // ---- mobile drawer ----
  var menuBtn = document.getElementById('mobile-menu-btn');
  var drawer = document.getElementById('mobile-drawer');
  if (menuBtn && drawer){
    menuBtn.addEventListener('click', function(){
      var open = menuBtn.classList.toggle('is-open');
      drawer.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    drawer.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        menuBtn.classList.remove('is-open');
        drawer.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- scroll reveal: elements marked [data-reveal="up"|"scale"], optional [data-reveal-group] ----
  var groupCounts = {};
  document.querySelectorAll('[data-reveal]').forEach(function(el){
    el.classList.add(el.getAttribute('data-reveal') === 'scale' ? 'reveal-scale' : 'reveal');
    var g = el.getAttribute('data-reveal-group');
    if (g){
      groupCounts[g] = groupCounts[g] || 0;
      el.style.transitionDelay = (Math.min(groupCounts[g], 5) * 0.09) + 's';
      groupCounts[g]++;
    }
  });
  var revealTargets = document.querySelectorAll('.reveal, .reveal-scale');
  if ('IntersectionObserver' in window){
    var revealObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold:0.12, rootMargin:'0px 0px -60px 0px' });
    revealTargets.forEach(function(el){ revealObserver.observe(el); });
  } else {
    revealTargets.forEach(function(el){ el.classList.add('is-visible'); });
  }

  // ---- spotlight hover: [data-spotlight] ----
  document.querySelectorAll('[data-spotlight]').forEach(function(el){
    el.addEventListener('mousemove', function(e){
      var r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  // ---- lead-capture modal ----
  var leadModal = document.getElementById('lead-modal');
  window.openLeadModal = function(source){
    if (!leadModal) return;
    leadModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    var srcField = document.getElementById('lead-source');
    if (srcField) srcField.value = source || '';
  };
  window.closeLeadModal = function(){
    if (!leadModal) return;
    leadModal.classList.remove('is-open');
    document.body.style.overflow = '';
  };
  if (leadModal){
    leadModal.addEventListener('click', function(e){
      if (e.target === leadModal) window.closeLeadModal();
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape') window.closeLeadModal();
    });
    var leadForm = document.getElementById('lead-form');
    if (leadForm){
      leadForm.addEventListener('submit', function(e){
        e.preventDefault();
        if (!leadForm.checkValidity()){ leadForm.reportValidity(); return; }
        window.eipSubmit(leadForm, 'Lead modal', function(){
          leadForm.style.display = 'none';
          document.getElementById('lead-form-success').classList.add('is-visible');
        });
      });
    }
  }

  // ---- current page: highlight matching nav / mega / drawer / sidebar links ----
  var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var groups = {};
  document.querySelectorAll('#site-nav a, #mobile-drawer a, .svc-nav a').forEach(function(a){
    if ((a.getAttribute('href') || '').toLowerCase() !== page) return;
    a.classList.add('is-current');
    var g = a.getAttribute('data-nav-group');
    if (g) groups[g] = true;
  });
  Object.keys(groups).forEach(function(g){
    document.querySelectorAll('.nav-link[data-nav-group="' + g + '"]').forEach(function(a){ a.classList.add('is-current'); });
  });

  // ---- tabs: [data-tabs] > .tabs-btn[aria-controls] + .tab-panel ----
  document.querySelectorAll('[data-tabs]').forEach(function(root){
    var btns = root.querySelectorAll('.tabs-btn');
    btns.forEach(function(btn){
      btn.addEventListener('click', function(){
        btns.forEach(function(b){
          var on = b === btn;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-selected', on ? 'true' : 'false');
          var panel = document.getElementById(b.getAttribute('aria-controls'));
          if (panel) panel.classList.toggle('is-active', on);
        });
      });
    });
  });

  // ---- on-page subnav: <body data-subnav="Label"> builds a sticky bar from each section's "NN — Label" eyebrow ----
  var subLabel = document.body.getAttribute('data-subnav');
  var hero = document.querySelector('.page-hero');
  if (subLabel && hero){
    var targets = [];
    document.querySelectorAll('.sec-eyebrow').forEach(function(eb){
      var m = eb.textContent.match(/^\s*\d+\s*[—–-]\s*(.+)$/);
      if (!m || eb.closest('.cta-band, .cta-sec, footer')) return;
      var host = eb.closest('.svc-block') || eb.closest('section');
      if (!host || targets.some(function(t){ return t.el === host; })) return;
      if (!host.id) host.id = 'sec-' + m[1].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      host.setAttribute('data-subnav-target', '');
      targets.push({ el:host, label:m[1].trim() });
    });
    if (targets.length >= 3){
      var bar = document.createElement('nav');
      bar.className = 'subnav'; bar.setAttribute('aria-label', 'On this page');
      bar.innerHTML = '<div class="wrap"><span class="subnav-label">' + subLabel + '</span></div><span class="subnav-progress"></span>';
      var row = bar.firstChild;
      targets.forEach(function(t){
        var a = document.createElement('a');
        a.href = '#' + t.el.id; a.textContent = t.label; t.link = a; row.appendChild(a);
      });
      hero.parentNode.insertBefore(bar, hero.nextSibling);
      var prog = bar.querySelector('.subnav-progress'), lastActive;
      function onSubScroll(){
        var y = window.scrollY, heroEnd = hero.offsetTop + hero.offsetHeight - 90;
        bar.classList.toggle('is-shown', y > heroEnd);
        var active = null;
        targets.forEach(function(t){ if (t.el.getBoundingClientRect().top < 200) active = t; });
        if (active !== lastActive){
          lastActive = active;
          targets.forEach(function(t){ t.link.classList.toggle('is-active', t === active); });
          if (active) row.scrollTo({ left:Math.max(0, active.link.offsetLeft - 120), behavior:'smooth' });
        }
        var doc = document.documentElement, max = doc.scrollHeight - window.innerHeight;
        prog.style.width = (max > 0 ? Math.min(100, (y / max) * 100) : 0) + '%';
      }
      window.addEventListener('scroll', onSubScroll, { passive:true });
      onSubScroll();
    }
  }

  // ---- mobile sticky CTA bar (phones): appears after the hero, hides near the footer ----
  if (document.getElementById('lead-modal')){
    var mcta = document.createElement('div');
    mcta.className = 'm-cta';
    mcta.innerHTML = '<button type="button">Talk to our team</button><a href="mailto:contact@sipedtech.com" aria-label="Email us">Email</a>';
    mcta.querySelector('button').addEventListener('click', function(){ window.openLeadModal('mobile-bar'); });
    document.body.appendChild(mcta);
    var foot = document.querySelector('footer');
    function onMctaScroll(){
      var nearEnd = foot && foot.getBoundingClientRect().top < window.innerHeight + 40;
      mcta.classList.toggle('is-shown', window.scrollY > 520 && !nearEnd);
    }
    window.addEventListener('scroll', onMctaScroll, { passive:true });
    onMctaScroll();
  }

  // ---- count-up: [data-count="5000"] — the number is pre-filled so it reads correctly without JS ----
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    var countObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (!entry.isIntersecting) return;
        countObserver.unobserve(entry.target);
        var el = entry.target, target = parseInt(el.getAttribute('data-count'), 10) || 0, start = null;
        function step(ts){
          if (!start) start = ts;
          var p = Math.min((ts - start) / 1600, 1);
          el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target).toLocaleString('en-US');
          if (p < 1) requestAnimationFrame(step); else el.textContent = target.toLocaleString('en-US');
        }
        requestAnimationFrame(step);
      });
    }, { threshold:0.4 });
    counters.forEach(function(el){ countObserver.observe(el); });
  }

})();
