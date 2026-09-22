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
        leadForm.style.display = 'none';
        document.getElementById('lead-form-success').classList.add('is-visible');
      });
    }
  }

})();
