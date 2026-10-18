/**
 * =============================================================================
 * JUNK REMOVAL BROS - ESTIMATOR ENGINE
 * =============================================================================
 */

(function () {
  'use strict';

  const QUICK_PICK_IDS = [
    { id: 'couch_standard', label: 'Couch / Sofa' },
    { id: 'mattress_only', label: 'Mattress' },
    { id: 'refrigerator', label: 'Refrigerator' },
    { id: 'washer_dryer', label: 'Washer / Dryer' },
    { id: 'dresser', label: 'Dresser' },
    { id: 'trash_bags_pile', label: 'Trash Bags (5-8)' }
  ];

  const state = {
    selectedItems: {}, // { itemId: quantity }
    selectedTerrain: new Set()
  };

  let elements = {};

  function initCalculator() {
    if (!window.SITE_CONFIG) {
      console.error('SITE_CONFIG not found!');
      return;
    }

    cacheDOMElements();
    renderQuickPicks();
    populateDropdownSelect();
    renderTerrainOptions();
    bindEvents();
    renderSelectedItemsList();
    recalculateEstimate();
  }

  function cacheDOMElements() {
    elements = {
      quickPicks: document.getElementById('calc-quick-picks'),
      itemSelect: document.getElementById('calc-item-select'),
      selectedItemsContainer: document.getElementById('calc-selected-items-list'),
      terrainGrid: document.getElementById('calc-terrain-grid'),
      priceDisplay: document.getElementById('calc-price-display'),
      estimateHint: document.getElementById('calc-estimate-hint'),
      btnProceed: document.getElementById('calc-btn-proceed'),
      btnSms: document.getElementById('calc-btn-sms'),
      attachedEstimateBox: document.getElementById('attached-estimate-box'),
      attachedEstimateText: document.getElementById('attached-estimate-text'),
      formEstimateDataInput: document.getElementById('form-estimate-summary')
    };
  }

  function renderQuickPicks() {
    if (!elements.quickPicks) return;
    elements.quickPicks.innerHTML = QUICK_PICK_IDS.map((qp) => {
      const count = state.selectedItems[qp.id] || 0;
      return `
        <button type="button" class="quick-pick-chip ${count > 0 ? 'active' : ''}" data-item-id="${qp.id}">
          <span>+ ${qp.label}</span>
          ${count > 0 ? `<span class="quick-pick-badge">${count}</span>` : ''}
        </button>
      `;
    }).join('');
  }

  function populateDropdownSelect() {
    const { itemCatalog } = window.SITE_CONFIG;
    if (!elements.itemSelect || !itemCatalog) return;

    let optionsHTML = `<option value="" selected>+ Browse all items to add (furniture, appliances, yard debris...)</option>`;

    itemCatalog.forEach((cat) => {
      optionsHTML += `<optgroup label="${cat.category}">`;
      cat.items.forEach((item) => {
        optionsHTML += `<option value="${item.id}">${item.name} ($${item.minPrice}–$${item.maxPrice})</option>`;
      });
      optionsHTML += `</optgroup>`;
    });

    elements.itemSelect.innerHTML = optionsHTML;
  }

  function renderTerrainOptions() {
    const { terrainModifiers } = window.SITE_CONFIG.pricing;
    if (!elements.terrainGrid || !terrainModifiers) return;

    elements.terrainGrid.innerHTML = terrainModifiers
      .filter((mod) => mod.fee > 0)
      .map((mod) => {
        const isChecked = state.selectedTerrain.has(mod.id);
        return `
          <button type="button" class="terrain-chip ${isChecked ? 'selected' : ''}" data-terrain-id="${mod.id}" aria-pressed="${isChecked}">
            <span>${mod.name}</span>
            <span class="terrain-pill">+$${mod.fee}</span>
          </button>
        `;
      })
      .join('');
  }

  function renderSelectedItemsList() {
    if (!elements.selectedItemsContainer) return;

    const { itemCatalog } = window.SITE_CONFIG;
    const itemLookup = {};
    itemCatalog.forEach((cat) => {
      cat.items.forEach((item) => {
        itemLookup[item.id] = item;
      });
    });

    const entries = Object.entries(state.selectedItems).filter(([_, qty]) => qty > 0);

    if (entries.length === 0) {
      elements.selectedItemsContainer.style.display = 'none';
      elements.selectedItemsContainer.innerHTML = '';
      renderQuickPicks();
      return;
    }

    elements.selectedItemsContainer.style.display = 'block';
    elements.selectedItemsContainer.innerHTML = `
      <div class="selected-items-header">
        <span>Selected Items (${entries.reduce((sum, [_, q]) => sum + q, 0)})</span>
        <button type="button" class="clear-items-btn" id="calc-clear-all">Clear all</button>
      </div>
      <div class="items-table">
        ${entries
          .map(([itemId, qty]) => {
            const item = itemLookup[itemId];
            if (!item) return '';
            const minSub = item.minPrice * qty;
            const maxSub = item.maxPrice * qty;
            return `
              <div class="item-row" data-item-id="${itemId}">
                <div class="item-row-left">
                  <span class="item-row-title">${item.name}</span>
                  <span class="item-row-price">$${minSub}–$${maxSub}</span>
                </div>
                <div class="item-row-actions">
                  <div class="stepper-mini">
                    <button type="button" class="stepper-btn minus" data-item-id="${itemId}" aria-label="Decrease quantity">&minus;</button>
                    <span class="stepper-count">${qty}</span>
                    <button type="button" class="stepper-btn plus" data-item-id="${itemId}" aria-label="Increase quantity">+</button>
                  </div>
                  <button type="button" class="row-delete-btn" data-item-id="${itemId}" title="Remove item">&times;</button>
                </div>
              </div>
            `;
          })
          .join('')}
      </div>
    `;
    renderQuickPicks();
  }

  function addItemById(itemId, qty = 1) {
    if (!itemId) return;
    state.selectedItems[itemId] = (state.selectedItems[itemId] || 0) + qty;
    renderSelectedItemsList();
    recalculateEstimate();
  }

  function bindEvents() {
    if (elements.quickPicks) {
      elements.quickPicks.addEventListener('click', (e) => {
        const chip = e.target.closest('.quick-pick-chip');
        if (!chip) return;
        const itemId = chip.getAttribute('data-item-id');
        addItemById(itemId, 1);
      });
    }

    if (elements.itemSelect) {
      elements.itemSelect.addEventListener('change', () => {
        const itemId = elements.itemSelect.value;
        if (!itemId) return;
        addItemById(itemId, 1);
        elements.itemSelect.value = '';
      });
    }

    if (elements.selectedItemsContainer) {
      elements.selectedItemsContainer.addEventListener('click', (e) => {
        if (e.target.closest('#calc-clear-all')) {
          state.selectedItems = {};
          renderSelectedItemsList();
          recalculateEstimate();
          return;
        }

        const plusBtn = e.target.closest('.stepper-btn.plus');
        const minusBtn = e.target.closest('.stepper-btn.minus');
        const deleteBtn = e.target.closest('.row-delete-btn');

        if (plusBtn) {
          const itemId = plusBtn.getAttribute('data-item-id');
          state.selectedItems[itemId] = (state.selectedItems[itemId] || 0) + 1;
          renderSelectedItemsList();
          recalculateEstimate();
        } else if (minusBtn) {
          const itemId = minusBtn.getAttribute('data-item-id');
          if (state.selectedItems[itemId] > 1) {
            state.selectedItems[itemId] -= 1;
          } else {
            delete state.selectedItems[itemId];
          }
          renderSelectedItemsList();
          recalculateEstimate();
        } else if (deleteBtn) {
          const itemId = deleteBtn.getAttribute('data-item-id');
          delete state.selectedItems[itemId];
          renderSelectedItemsList();
          recalculateEstimate();
        }
      });
    }

    if (elements.terrainGrid) {
      elements.terrainGrid.addEventListener('click', (e) => {
        const chip = e.target.closest('.terrain-chip');
        if (!chip) return;

        const terrainId = chip.getAttribute('data-terrain-id');
        if (state.selectedTerrain.has(terrainId)) {
          state.selectedTerrain.delete(terrainId);
          chip.classList.remove('selected');
          chip.setAttribute('aria-pressed', 'false');
        } else {
          state.selectedTerrain.add(terrainId);
          chip.classList.add('selected');
          chip.setAttribute('aria-pressed', 'true');
        }

        recalculateEstimate();
      });
    }

    if (elements.btnProceed) {
      elements.btnProceed.addEventListener('click', () => {
        syncEstimateToForm();
        const formSec = document.getElementById('quote-form-section');
        if (formSec) {
          formSec.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  function recalculateEstimate() {
    const { pricing, itemCatalog } = window.SITE_CONFIG;
    let itemsMin = 0;
    let itemsMax = 0;
    let totalCount = 0;

    const itemLookup = {};
    itemCatalog.forEach((cat) => {
      cat.items.forEach((item) => {
        itemLookup[item.id] = item;
      });
    });

    Object.entries(state.selectedItems).forEach(([itemId, qty]) => {
      const item = itemLookup[itemId];
      if (item && qty > 0) {
        itemsMin += item.minPrice * qty;
        itemsMax += item.maxPrice * qty;
        totalCount += qty;
      }
    });

    let terrainTotal = 0;
    const terrainLookup = {};
    pricing.terrainModifiers.forEach((m) => {
      terrainLookup[m.id] = m;
    });

    state.selectedTerrain.forEach((id) => {
      const mod = terrainLookup[id];
      if (mod && mod.fee) {
        terrainTotal += mod.fee;
      }
    });

    let finalMin = 0;
    let finalMax = 0;

    if (totalCount > 0) {
      finalMin = itemsMin + terrainTotal;
      finalMax = itemsMax + terrainTotal;

      if (finalMin < pricing.minimumJobPrice) finalMin = pricing.minimumJobPrice;
      if (finalMax < pricing.minimumJobPrice) finalMax = pricing.minimumJobPrice + 25;
    }

    if (elements.priceDisplay) {
      if (totalCount === 0) {
        elements.priceDisplay.innerHTML = `$0 <span style="font-size: 0.9rem; color: #94a3b8; font-weight: normal;">(Select items above)</span>`;
      } else {
        elements.priceDisplay.innerHTML = `$${finalMin} – $${finalMax}`;
      }
    }

    if (elements.estimateHint) {
      elements.estimateHint.textContent =
        'Ballpark estimate assumes standard curbside or ground-floor access. Final quotes confirmed before lifting based on truck volume and material weight.';
    }

    state.lastCalculated = {
      totalCount,
      finalMin,
      finalMax,
      itemsMin,
      itemsMax,
      terrainTotal
    };

    syncEstimateToForm();
  }

  function syncEstimateToForm() {
    const calc = state.lastCalculated;
    const smsNum = (window.SITE_CONFIG.company && window.SITE_CONFIG.company.smsNumber) || '15856994762';
    const defaultSmsHref = `sms:${smsNum}?&body=Hi%20Junk%20Removal%20Brothers!%20I'd%20like%20a%20quote.%20Here%20is%20what%20I%20have%20and%20my%20town:`;

    if (!calc || calc.totalCount === 0) {
      if (elements.attachedEstimateBox) {
        elements.attachedEstimateBox.style.display = 'none';
      }
      if (elements.formEstimateDataInput) {
        elements.formEstimateDataInput.value = 'No calculator items pre-selected';
      }
      if (elements.btnSms) {
        elements.btnSms.href = defaultSmsHref;
        elements.btnSms.textContent = 'Text Photos for a Fast Quote';
      }
      return;
    }

    const { itemCatalog, pricing } = window.SITE_CONFIG;
    const itemLookup = {};
    itemCatalog.forEach((cat) => {
      cat.items.forEach((item) => {
        itemLookup[item.id] = item;
      });
    });

    const itemListStrings = [];
    Object.entries(state.selectedItems).forEach(([itemId, qty]) => {
      const item = itemLookup[itemId];
      if (item && qty > 0) {
        itemListStrings.push(`${qty}x ${item.name}`);
      }
    });

    const terrainStrings = [];
    pricing.terrainModifiers.forEach((m) => {
      if (state.selectedTerrain.has(m.id) && m.fee > 0) {
        terrainStrings.push(m.name);
      }
    });

    const summaryText = `Estimated Range: $${calc.finalMin} - $${calc.finalMax} | Items: ${itemListStrings.join(', ')}${terrainStrings.length ? ' | Access: ' + terrainStrings.join(', ') : ''}`;

    if (elements.attachedEstimateBox && elements.attachedEstimateText) {
      elements.attachedEstimateBox.style.display = 'flex';
      elements.attachedEstimateText.innerHTML = `
        <strong>Attached Estimate: $${calc.finalMin} – $${calc.finalMax}</strong>
        <span>${itemListStrings.join(', ')}${terrainStrings.length ? ' (' + terrainStrings.join(', ') + ')' : ''}</span>
      `;
    }

    if (elements.formEstimateDataInput) {
      elements.formEstimateDataInput.value = summaryText;
    }

    if (elements.btnSms) {
      const smsBody = encodeURIComponent(
        `Hi Junk Removal Brothers! I'd like a quote. Here is what I have (${itemListStrings.join(', ')}${terrainStrings.length ? ', ' + terrainStrings.join(', ') : ''} — Est: $${calc.finalMin}-$${calc.finalMax}) and my town:`
      );
      elements.btnSms.href = `sms:${smsNum}?&body=${smsBody}`;
      elements.btnSms.textContent = 'Text This Estimate';
    }
  }

  window.QuoteCalculator = {
    init: initCalculator,
    getState: () => state,
    recalculate: recalculateEstimate,
    syncToForm: syncEstimateToForm
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalculator);
  } else {
    initCalculator();
  }
})();
