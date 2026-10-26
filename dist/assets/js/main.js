/* Captain Code — Captain Command Centre
   Minimal: nav state, scroll reveals, no dependencies. */

(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- scroll reveals ------------------------------------------------ */
  var targets = document.querySelectorAll(
    '.card, .steps > li, .oath__item, .shot, .readout li, .deploy__actions, .cols > *'
  );

  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );
    targets.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.setProperty('--reveal-delay', (i % 6) * 45 + 'ms');
      io.observe(el);
    });

    /* Safety net: never let a section stay invisible if the observer misses it. */
    window.setTimeout(function () {
      targets.forEach(function (el) { el.classList.add('is-in'); });
    }, 1400);
  }

  /* --- nav active state ---------------------------------------------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  function setActive() {
    var y = window.scrollY + 120;
    var current = sections[0];
    sections.forEach(function (s) { if (s.offsetTop <= y) current = s; });
    links.forEach(function (a) {
      a.style.borderBottomColor = a.getAttribute('href') === '#' + current.id
        ? 'var(--ink)'
        : 'transparent';
    });
  }

  if (sections.length) {
    window.addEventListener('scroll', setActive, { passive: true });
    setActive();
  }

  /* --- hero art tilt -------------------------------------------------- */
  var art = document.querySelector('.hero__artframe');
  if (art && !reduce) {
    var frame = art.parentElement;
    frame.addEventListener('mousemove', function (e) {
      var r = frame.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      art.style.transform = 'rotate(' + (x * 4 - 0.6) + 'deg) translateY(' + (y * -4) + 'px)';
    });
    frame.addEventListener('mouseleave', function () {
      art.style.transform = 'rotate(1.1deg)';
    });
  }
})();
