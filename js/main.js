/**
 * =============================================================================
 * ROCHESTER HAULING BROTHERS - MAIN APPLICATION
 * =============================================================================
 */

(function () {
  'use strict';

  function initApp() {
    if (!window.SITE_CONFIG) {
      console.error('SITE_CONFIG is missing!');
      return;
    }

    hydrateConfigValues();
    renderTrustPoints();
    renderAboutSection();
    renderWhatWeTakeLists();
    renderFAQSection();
    bindFAQAccordion();
  }

  function hydrateConfigValues() {
    const config = window.SITE_CONFIG;

    if (config.company && config.company.name) {
      document.title = `${config.company.name} | Junk Removal & Hauling in Rochester, NY`;
    }

    document.querySelectorAll('[data-config]').forEach((el) => {
      const path = el.getAttribute('data-config');
      const val = getNestedValue(config, path);
      if (val !== undefined && val !== null) {
        el.textContent = val;
      }
    });

    document.querySelectorAll('[data-config-href]').forEach((el) => {
      const raw = el.getAttribute('data-config-href');
      const parts = raw.split(':');
      const prefix = parts[0];
      const path = parts[1];

      const val = getNestedValue(config, path);
      if (val) {
        el.setAttribute('href', `${prefix}:${val}`);
      }
    });

    const yearEl = document.getElementById('current-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
  }

  function renderTrustPoints() {
    const container = document.getElementById('hero-trust-row');
    const points = (window.SITE_CONFIG.company && window.SITE_CONFIG.company.trustPoints) || [];

    if (!container || !points.length) return;

    container.innerHTML = points
      .map((text) => `<span class="trust-item">${text}</span>`)
      .join('');
  }

  function renderAboutSection() {
    const { aboutUs } = window.SITE_CONFIG;
    if (!aboutUs) return;

    const paragraphsContainer = document.getElementById('about-paragraphs');
    if (paragraphsContainer && aboutUs.paragraphs) {
      paragraphsContainer.innerHTML = aboutUs.paragraphs
        .map((p) => `<p>${p}</p>`)
        .join('');
    }

    const brother1Name = document.getElementById('brother1-name');
    const brother1Role = document.getElementById('brother1-role');
    const brother1Img = document.getElementById('brother1-img');

    if (brother1Name && aboutUs.brother1) brother1Name.textContent = aboutUs.brother1.name;
    if (brother1Role && aboutUs.brother1) brother1Role.textContent = aboutUs.brother1.role;
    if (brother1Img && aboutUs.brother1 && aboutUs.brother1.image) {
      brother1Img.src = aboutUs.brother1.image;
      brother1Img.alt = `${aboutUs.brother1.name}`;
    }

    const brother2Name = document.getElementById('brother2-name');
    const brother2Role = document.getElementById('brother2-role');
    const brother2Img = document.getElementById('brother2-img');

    if (brother2Name && aboutUs.brother2) brother2Name.textContent = aboutUs.brother2.name;
    if (brother2Role && aboutUs.brother2) brother2Role.textContent = aboutUs.brother2.role;
    if (brother2Img && aboutUs.brother2 && aboutUs.brother2.image) {
      brother2Img.src = aboutUs.brother2.image;
      brother2Img.alt = `${aboutUs.brother2.name}`;
    }
  }

  function renderWhatWeTakeLists() {
    const { whatWeTake, whatWeDontTake } = window.SITE_CONFIG;

    const takeContainer = document.getElementById('what-we-take-list');
    if (takeContainer && whatWeTake) {
      takeContainer.innerHTML = whatWeTake
        .map((item) => `<li class="take-item-row">• ${item}</li>`)
        .join('');
    }

    const dontTakeContainer = document.getElementById('what-we-dont-take-list');
    if (dontTakeContainer && whatWeDontTake) {
      dontTakeContainer.innerHTML = whatWeDontTake
        .map((item) => `<li class="take-item-row">• ${item}</li>`)
        .join('');
    }
  }

  function renderFAQSection() {
    const { faqs } = window.SITE_CONFIG;
    const container = document.getElementById('faq-container');
    if (!container || !faqs) return;

    container.innerHTML = faqs
      .map(
        (faq, idx) => `
        <div class="faq-box ${idx === 0 ? 'active' : ''}">
          <button class="faq-toggle" type="button" aria-expanded="${idx === 0 ? 'true' : 'false'}">
            <span>${faq.question}</span>
            <span class="faq-sign">+</span>
          </button>
          <div class="faq-body">
            <p>${faq.answer}</p>
          </div>
        </div>
      `
      )
      .join('');
  }

  function bindFAQAccordion() {
    const container = document.getElementById('faq-container');
    if (!container) return;

    container.addEventListener('click', (e) => {
      const button = e.target.closest('.faq-toggle');
      if (!button) return;

      const box = button.closest('.faq-box');
      const wasActive = box.classList.contains('active');

      container.querySelectorAll('.faq-box').forEach((it) => {
        it.classList.remove('active');
        const btn = it.querySelector('.faq-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      if (!wasActive) {
        box.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
