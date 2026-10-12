(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.getElementById('nav-toggle');
    const siteNav = document.getElementById('site-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && siteNav) {
      function closeMenu() {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }

      function openMenu() {
        siteNav.classList.add('is-open');
        navToggle.setAttribute('aria-expanded', 'true');
      }

      navToggle.addEventListener('click', function () {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        if (expanded) {
          closeMenu();
        } else {
          openMenu();
        }
      });

      navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
          closeMenu();
        });
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && siteNav.classList.contains('is-open')) {
          closeMenu();
          navToggle.focus();
        }
      });
    }

    // IntersectionObserver for active section highlight
    const sections = document.querySelectorAll('section[id]');
    if ('IntersectionObserver' in window && sections.length > 0) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute('id');
              navLinks.forEach(function (link) {
                const targetId = link.getAttribute('href');
                if (targetId === '#' + id) {
                  link.classList.add('active');
                } else {
                  link.classList.remove('active');
                }
              });
            }
          });
        },
        {
          rootMargin: '-30% 0px -60% 0px',
          threshold: 0
        }
      );

      sections.forEach(function (section) {
        observer.observe(section);
      });
    }
  });
})();
