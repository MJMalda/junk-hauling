/**
 * =============================================================================
 * JUNK REMOVAL BROS - FORM & PHOTO HANDLER (FORMSUBMIT.CO)
 * =============================================================================
 * Delivers full quote requests and photo attachments directly to your email
 * address for 100% free with clean inline confirmation messages.
 */

(function () {
  'use strict';

  const state = {
    isSubmitting: false
  };

  let elements = {};

  function initFormHandler() {
    cacheDOMElements();
    configureFormAction();
    bindDropzoneEvents();
    bindFormEvents();
  }

  function cacheDOMElements() {
    elements = {
      form: document.getElementById('quote-request-form'),
      dropzone: document.getElementById('photo-dropzone'),
      fileInput: document.getElementById('photo-file-input'),
      previewGrid: document.getElementById('photo-preview-grid'),
      submitBtn: document.getElementById('form-submit-btn'),
      submitBtnText: document.getElementById('form-submit-btn-text'),
      successBanner: document.getElementById('form-success-banner'),
      successCustomerName: document.getElementById('success-customer-name')
    };
  }

  function configureFormAction() {
    if (!elements.form || !window.SITE_CONFIG) return;
    const config = window.SITE_CONFIG;
    const email = (config.form && config.form.destinationEmail) || (config.company && config.company.email) || 'f13f4498a5103e0f70db326088276b1f';
    elements.form.action = `https://formsubmit.co/${email}`;
  }

  // ---------------------------------------------------------------------------
  // PHOTO DROPZONE & PREVIEW
  // ---------------------------------------------------------------------------
  function bindDropzoneEvents() {
    if (!elements.dropzone || !elements.fileInput) return;

    elements.dropzone.addEventListener('click', () => {
      elements.fileInput.click();
    });

    elements.fileInput.addEventListener('change', () => {
      renderPhotoPreviews();
    });

    ['dragenter', 'dragover'].forEach((eventName) => {
      elements.dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        elements.dropzone.classList.add('drag-over');
      });
    });

    ['dragleave', 'drop'].forEach((eventName) => {
      elements.dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        elements.dropzone.classList.remove('drag-over');
      });
    });

    elements.dropzone.addEventListener('drop', (e) => {
      if (e.dataTransfer && e.dataTransfer.files) {
        elements.fileInput.files = e.dataTransfer.files;
        renderPhotoPreviews();
      }
    });

    if (elements.previewGrid) {
      elements.previewGrid.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.thumb-delete');
        if (!removeBtn) return;

        const idx = parseInt(removeBtn.getAttribute('data-index'), 10);
        removeFileAtIndex(idx);
      });
    }
  }

  function removeFileAtIndex(indexToRemove) {
    if (!elements.fileInput || !elements.fileInput.files) return;

    const dt = new DataTransfer();
    Array.from(elements.fileInput.files).forEach((file, idx) => {
      if (idx !== indexToRemove) {
        dt.items.add(file);
      }
    });
    elements.fileInput.files = dt.files;
    renderPhotoPreviews();
  }

  function renderPhotoPreviews() {
    if (!elements.previewGrid || !elements.fileInput) return;
    const files = elements.fileInput.files;

    if (!files || files.length === 0) {
      elements.previewGrid.innerHTML = '';
      elements.previewGrid.style.display = 'none';
      return;
    }

    elements.previewGrid.style.display = 'grid';
    elements.previewGrid.innerHTML = '';

    Array.from(files).forEach((file, idx) => {
      if (!file.type.startsWith('image/')) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const thumbDiv = document.createElement('div');
        thumbDiv.className = 'preview-thumb';
        thumbDiv.innerHTML = `
          <img src="${e.target.result}" alt="Attached photo ${idx + 1}" />
          <button type="button" class="thumb-delete" data-index="${idx}" title="Remove photo">&times;</button>
        `;
        elements.previewGrid.appendChild(thumbDiv);
      };
      reader.readAsDataURL(file);
    });
  }

  // ---------------------------------------------------------------------------
  // FORM SUBMISSION (DIRECT MULTIPART ENCODED)
  // ---------------------------------------------------------------------------
  function bindFormEvents() {
    if (!elements.form) return;

    elements.form.addEventListener('submit', async (e) => {
      const nameInput = elements.form.querySelector('[name="Customer Name"]');
      const phoneInput = elements.form.querySelector('[name="Phone Number"]');
      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';

      if (!name || !phone) {
        e.preventDefault();
        alert('Please provide your name and a phone number.');
        return;
      }

      // Guarantee quote estimate is synced right now before grabbing FormData
      if (window.QuoteCalculator && typeof window.QuoteCalculator.syncToForm === 'function') {
        window.QuoteCalculator.syncToForm();
      }

      e.preventDefault();
      setSubmittingState(true);

      const config = window.SITE_CONFIG || {};
      const destinationEmail = (config.form && config.form.destinationEmail) || (config.company && config.company.email) || 'f13f4498a5103e0f70db326088276b1f';
      const subject = (config.form && config.form.notificationSubject) || 'New Junk Removal Quote Request - Junk Removal Brothers';
      const endpoint = `https://formsubmit.co/${destinationEmail}`;

      const formData = new FormData(elements.form);
      formData.set('_subject', subject);
      formData.set('_template', 'table');
      formData.set('_captcha', 'false');
      
      // Explicitly pass the full page URL to FormSubmit
      formData.set('_url', window.location.href);
      formData.set('_next', window.location.href);

      try {
        await fetch(endpoint, {
          method: 'POST',
          body: formData,
          mode: 'no-cors'
        });

        displayInlineSuccess(name);
        elements.form.reset();
        if (elements.fileInput) elements.fileInput.value = '';
        renderPhotoPreviews();
      } catch (err) {
        console.warn('Fetch notice, submitting natively:', err);
        elements.form.submit();
      } finally {
        setSubmittingState(false);
      }
    });
  }

  function setSubmittingState(isSubmitting) {
    state.isSubmitting = isSubmitting;
    if (elements.submitBtn) {
      elements.submitBtn.disabled = isSubmitting;
    }
    if (elements.submitBtnText) {
      elements.submitBtnText.textContent = isSubmitting
        ? 'Sending Quote & Photos...'
        : 'Submit Quote Request';
    }
  }

  function displayInlineSuccess(customerName) {
    if (elements.successCustomerName) {
      elements.successCustomerName.textContent = customerName || 'there';
    }
    if (elements.successBanner) {
      elements.successBanner.style.display = 'flex';
      elements.successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  window.FormHandler = {
    init: initFormHandler,
    getState: () => state
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFormHandler);
  } else {
    initFormHandler();
  }
})();
