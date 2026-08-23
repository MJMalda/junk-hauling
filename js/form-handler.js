/**
 * =============================================================================
 * ROCHESTER HAULING BROTHERS - FORM & PHOTO HANDLER
 * =============================================================================
 */

(function () {
  'use strict';

  const state = {
    uploadedFiles: [],
    isSubmitting: false
  };

  let elements = {};

  function initFormHandler() {
    cacheDOMElements();
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

  function bindDropzoneEvents() {
    if (!elements.dropzone || !elements.fileInput) return;

    elements.dropzone.addEventListener('click', () => {
      elements.fileInput.click();
    });

    elements.fileInput.addEventListener('change', (e) => {
      handleFilesSelected(e.target.files);
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
        handleFilesSelected(e.dataTransfer.files);
      }
    });

    if (elements.previewGrid) {
      elements.previewGrid.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.thumb-delete');
        if (!removeBtn) return;

        const idx = parseInt(removeBtn.getAttribute('data-index'), 10);
        state.uploadedFiles.splice(idx, 1);
        renderPhotoPreviews();
      });
    }
  }

  function handleFilesSelected(fileList) {
    if (!fileList || fileList.length === 0) return;

    Array.from(fileList).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        alert(`"${file.name}" is not an image file.`);
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert(`"${file.name}" exceeds the 10MB limit.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        state.uploadedFiles.push({
          file,
          name: file.name,
          dataUrl: e.target.result
        });
        renderPhotoPreviews();
      };
      reader.readAsDataURL(file);
    });
  }

  function renderPhotoPreviews() {
    if (!elements.previewGrid) return;

    if (state.uploadedFiles.length === 0) {
      elements.previewGrid.innerHTML = '';
      elements.previewGrid.style.display = 'none';
      return;
    }

    elements.previewGrid.style.display = 'grid';
    elements.previewGrid.innerHTML = state.uploadedFiles
      .map(
        (item, idx) => `
        <div class="preview-thumb">
          <img src="${item.dataUrl}" alt="Attached photo ${idx + 1}" />
          <button type="button" class="thumb-delete" data-index="${idx}" title="Remove photo">&times;</button>
        </div>
      `
      )
      .join('');
  }

  function bindFormEvents() {
    if (!elements.form) return;

    elements.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (state.isSubmitting) return;

      const name = elements.form.querySelector('[name="customer_name"]').value.trim();
      const phone = elements.form.querySelector('[name="customer_phone"]').value.trim();
      const email = elements.form.querySelector('[name="customer_email"]').value.trim();
      const address = elements.form.querySelector('[name="pickup_address"]').value.trim();
      const date = elements.form.querySelector('[name="preferred_date"]').value.trim();
      const notes = elements.form.querySelector('[name="customer_notes"]').value.trim();
      const estimateSummary = document.getElementById('form-estimate-summary').value.trim() || 'No calculator estimate pre-selected';

      if (!name || !phone) {
        alert('Please provide your name and a contact phone number.');
        return;
      }

      setSubmittingState(true);

      const formData = {
        name,
        phone,
        email,
        address,
        preferred_date: date,
        notes,
        estimate_summary: estimateSummary,
        photos_attached_count: state.uploadedFiles.length
      };

      try {
        await dispatchFormSubmission(formData);
        showSuccessModal(name);
        elements.form.reset();
        state.uploadedFiles = [];
        renderPhotoPreviews();
      } catch (err) {
        console.error('Submission error:', err);
        triggerFallbackDispatch(formData);
        showSuccessModal(name);
      } finally {
        setSubmittingState(false);
      }
    });
  }

  async function dispatchFormSubmission(data) {
    const config = window.SITE_CONFIG || {};
    const formConfig = config.form || {};

    if (
      formConfig.service === 'web3forms' &&
      formConfig.web3formsAccessKey &&
      formConfig.web3formsAccessKey !== 'YOUR_WEB3FORMS_ACCESS_KEY_HERE'
    ) {
      const payload = new FormData();
      payload.append('access_key', formConfig.web3formsAccessKey);
      payload.append('subject', formConfig.notificationSubject || 'New Junk Removal Quote Request');
      payload.append('from_name', `${data.name} (Rochester Quote)`);
      payload.append('Name', data.name);
      payload.append('Phone', data.phone);
      payload.append('Email', data.email || 'Not provided');
      payload.append('Pickup Location', data.address || 'Not provided');
      payload.append('Preferred Timing', data.preferred_date || 'Flexible');
      payload.append('Estimate Details', data.estimate_summary);
      payload.append('Customer Notes', data.notes || 'None');

      state.uploadedFiles.forEach((item, i) => {
        payload.append(`photo_${i + 1}`, item.file);
      });

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: payload
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || 'Submission failed');
      }
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  function triggerFallbackDispatch(data) {
    const config = window.SITE_CONFIG || {};
    const companyEmail = (config.company && config.company.email) || 'contact@rochesterhaulingbrothers.com';

    const subject = encodeURIComponent(`Junk Removal Quote Request from ${data.name}`);
    const body = encodeURIComponent(
      `Hello,\n\n` +
      `Here are the details for my hauling request:\n\n` +
      `Name: ${data.name}\n` +
      `Phone: ${data.phone}\n` +
      `Email: ${data.email || 'N/A'}\n` +
      `Address/Town: ${data.address || 'N/A'}\n` +
      `Preferred Timing: ${data.preferred_date || 'Flexible'}\n\n` +
      `Estimate Details:\n${data.estimate_summary}\n\n` +
      `Notes: ${data.notes || 'None'}\n\n` +
      `Attached Photos: ${data.photos_attached_count} image(s)`
    );

    window.open(`mailto:${companyEmail}?subject=${subject}&body=${body}`, '_blank');
  }

  function setSubmittingState(isSubmitting) {
    state.isSubmitting = isSubmitting;
    if (elements.submitBtn) {
      elements.submitBtn.disabled = isSubmitting;
    }
    if (elements.submitBtnText) {
      elements.submitBtnText.textContent = isSubmitting
        ? 'Submitting...'
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
