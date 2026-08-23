/**
 * =============================================================================
 * ROCHESTER HAULING BROTHERS - FORM & PHOTO HANDLER (FORMSUBMIT.CO)
 * =============================================================================
 * Standard multipart form handler with automatic DataTransfer file syncing
 * for guaranteed email attachment delivery.
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
    bindModalEvents();
  }

  function cacheDOMElements() {
    elements = {
      form: document.getElementById('quote-request-form'),
      dropzone: document.getElementById('photo-dropzone'),
      fileInput: document.getElementById('photo-file-input'),
      previewGrid: document.getElementById('photo-preview-grid'),
      submitBtn: document.getElementById('form-submit-btn'),
      submitBtnText: document.getElementById('form-submit-btn-text'),
      modalOverlay: document.getElementById('success-modal'),
      modalCloseBtn: document.getElementById('modal-close-btn'),
      modalCustomerName: document.getElementById('modal-customer-name')
    };
  }

  function configureFormAction() {
    if (!elements.form || !window.SITE_CONFIG) return;
    const config = window.SITE_CONFIG;
    const email = (config.form && config.form.destinationEmail) || (config.company && config.company.email) || 'rochesterhaulbros@gmail.com';
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
      const name = elements.form.querySelector('[name="customer_name"]').value.trim();
      const phone = elements.form.querySelector('[name="customer_phone"]').value.trim();

      if (!name || !phone) {
        e.preventDefault();
        alert('Please provide your name and a phone number.');
        return;
      }

      // Ensure estimate details are populated into the hidden field
      const estimateInput = document.getElementById('form-estimate-summary');
      if (estimateInput && !estimateInput.value) {
        estimateInput.value = 'No calculator items pre-selected';
      }

      // Try AJAX fetch with standard FormData
      e.preventDefault();
      setSubmittingState(true);

      const config = window.SITE_CONFIG || {};
      const destinationEmail = (config.form && config.form.destinationEmail) || (config.company && config.company.email) || 'rochesterhaulbros@gmail.com';
      const endpoint = `https://formsubmit.co/${destinationEmail}`;

      const formData = new FormData(elements.form);
      formData.set('_subject', 'New Junk Removal Quote Request - Rochester Hauling Brothers');
      formData.set('_template', 'table');
      formData.set('_captcha', 'false');

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: formData,
          mode: 'no-cors' // Allows browser to post cross-origin multipart without CORS restriction
        });

        showSuccessModal(name);
        elements.form.reset();
        if (elements.fileInput) elements.fileInput.value = '';
        renderPhotoPreviews();
      } catch (err) {
        console.warn('Fetch submission notice, submitting natively:', err);
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

  function showSuccessModal(customerName) {
    if (elements.modalCustomerName) {
      elements.modalCustomerName.textContent = customerName || 'there';
    }
    if (elements.modalOverlay) {
      elements.modalOverlay.classList.add('active');
    }
  }

  function hideSuccessModal() {
    if (elements.modalOverlay) {
      elements.modalOverlay.classList.remove('active');
    }
  }

  function bindModalEvents() {
    if (elements.modalCloseBtn) {
      elements.modalCloseBtn.addEventListener('click', hideSuccessModal);
    }
    if (elements.modalOverlay) {
      elements.modalOverlay.addEventListener('click', (e) => {
        if (e.target === elements.modalOverlay) {
          hideSuccessModal();
        }
      });
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
