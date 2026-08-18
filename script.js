// 進場動畫：區塊與面板逐行浮現。
(function () {
  var year = document.getElementById('year');
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var targets = document.querySelectorAll(
    '.section__head, .about, .card, .quote, .contact, .panel'
  );

  targets.forEach(function (el) {
    el.classList.add('reveal');
  });

  var lines = document.querySelectorAll('.panel__line');

  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-in'); });
    lines.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add('is-in');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(function (el) { observer.observe(el); });

  // 面板的四行依序亮起，錯開時間製造「逐行輸出」的感覺。
  lines.forEach(function (line, i) {
    window.setTimeout(function () {
      line.classList.add('is-in');
    }, 420 + i * 180);
  });
}());
