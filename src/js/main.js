/* ============================================
   AVIS HARDMETAL — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSmoothScroll();
  initScrollAnimations();
  initMobileMenu();
});

/* --- Sticky Navbar with scroll effect --- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const heroSection = document.querySelector('.hero');

  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    updateActiveLink();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Initialize on load
}

/* --- Smooth scroll for anchor links --- */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);

      if (target) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        closeMobileMenu();
      }
    });
  });
}

/* --- Update active navigation link --- */
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__link, .navbar__mobile-link');
  const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;

  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - navbarHeight - 100;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

/* --- Scroll-triggered fade-in animations --- */
function initScrollAnimations() {
  // ── Auto-assign cool animation classes to photo items ──
  const photoAnimations = ['slide-in-left', 'slide-in-right']; // alternating

  document.querySelectorAll('.product-grid').forEach(grid => {
    const items = grid.querySelectorAll('.product-grid__item');
    items.forEach((item, i) => {
      // Remove old generic class
      item.classList.remove('fade-in-zoom', 'fade-in');
      // Alternate left-right, 3rd item gets flip-up for variety
      if (i % 3 === 2) {
        item.classList.add('flip-up', 'img-animate');
      } else {
        item.classList.add(photoAnimations[i % 2], 'img-animate');
      }
      // Stagger: 150ms between each item
      item.style.setProperty('--delay', `${i * 150}ms`);
    });
  });

  // Lab images: zoom-pop with stagger
  document.querySelectorAll('.about__lab-images').forEach(container => {
    const imgs = container.querySelectorAll('.about__lab-img');
    imgs.forEach((img, i) => {
      img.classList.remove('fade-in-zoom', 'fade-in');
      img.classList.add('zoom-pop', 'img-animate');
      img.style.setProperty('--delay', `${i * 200}ms`);
    });
  });

  // About factory image: slide from right
  document.querySelectorAll('.about__image').forEach(img => {
    img.classList.remove('fade-in-right', 'fade-in');
    img.classList.add('slide-in-right', 'img-animate');
  });

  // ── Observe ALL animated elements ──
  const animatedElements = document.querySelectorAll(
    '.fade-in, .fade-in-left, .fade-in-right, .fade-in-zoom, ' +
    '.slide-in-left, .slide-in-right, .flip-up, .zoom-pop'
  );

  if (!animatedElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    }
  );

  animatedElements.forEach(el => observer.observe(el));
}

/* --- Mobile hamburger menu --- */
function initMobileMenu() {
  const toggle = document.querySelector('.navbar__toggle');
  const mobileMenu = document.querySelector('.navbar__mobile-menu');

  if (!toggle || !mobileMenu) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
}

function closeMobileMenu() {
  const toggle = document.querySelector('.navbar__toggle');
  const mobileMenu = document.querySelector('.navbar__mobile-menu');

  if (toggle && mobileMenu) {
    toggle.classList.remove('open');
    mobileMenu.classList.remove('open');
  }
}
