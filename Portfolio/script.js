/* ═════════════════════════════════════════════════════════
   SHASHANK SETH — PORTFOLIO JAVASCRIPT
   ═════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAVBAR SCROLL & ACTIVE TRACKING ── */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function handleNavbar() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let currentSection = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleNavbar, { passive: true });
  handleNavbar();

  /* ── MOBILE MENU TOGGLE ── */
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });
  }

  /* ── TYPING EFFECT (Genuine BCA & Skills) ── */
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const roles = [
      'BCA Student @ MGKVP Varanasi (July 2027)',
      'Chrome Extension Dev (Manifest v3)',
      'Python & Desktop Voice Automation',
      'AI & LLM Integration Builder',
      'JavaScript & Modern Web Frontends'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 75;

    function runTyping() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeDelay = 35;
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeDelay = 70;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typeDelay = 2200; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeDelay = 400;
      }

      setTimeout(runTyping, typeDelay);
    }

    runTyping();
  }

  /* ── SMOOTH SCROLL FOR IN-PAGE ANCHORS ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ── CONTACT FORM HANDLING ── */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.', 'error');
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending message...';
      submitBtn.disabled = true;

      // Simulated clean response
      setTimeout(() => {
        showToast(`Thank you, ${name}! Your message has been received.`, 'success');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1200);
    });
  }

  /* ── TOAST NOTIFICATION ── */
  function showToast(message, type = 'success') {
    const existing = document.querySelector('.custom-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `custom-toast toast-${type}`;
    toast.innerHTML = `
      <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
      <span>${message}</span>
    `;

    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '1.75rem',
      right: '1.75rem',
      padding: '0.85rem 1.4rem',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '0.65rem',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '0.88rem',
      fontWeight: '600',
      zIndex: '99999',
      background: type === 'success' ? '#0f172a' : '#2d1515',
      color: type === 'success' ? '#38bdf8' : '#f87171',
      border: `1px solid ${type === 'success' ? 'rgba(56, 189, 248, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`,
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      transition: 'all 0.3s ease',
      opacity: '0',
      transform: 'translateY(15px)'
    });

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px)';
      setTimeout(() => toast.remove(), 350);
    }, 3500);
  }

});
