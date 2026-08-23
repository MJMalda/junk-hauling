/**
 * =============================================================================
 * ROCHESTER HAULING BROTHERS - ESTIMATOR ENGINE
 * =============================================================================
 */

(function () {
  'use strict';

  const state = {
    selectedItems: {}, // { itemId: quantity }
    selectedTerrain: new Set(['ground_floor'])
  };

  let elements = {};

  function initCalculator() {
    if (!window.SITE_CONFIG) {
      console.error('SITE_CONFIG not found!');
      return;
    }

    cacheDOMElements();
    populateDropdownSelect();
    renderTerrainOptions();
    bindEvents();
    renderSelectedItemsList();
    recalculateEstimate();
  }

  function cacheDOMElements() {
    elements = {
      itemSelect: document.getElementById('calc-item-select'),
      itemQtyInput: document.getElementById('calc-item-qty'),
      btnAddItem: document.getElementById('calc-btn-add-item'),
      selectedItemsContainer: document.getElementById('calc-selected-items-list'),
      terrainGrid: document.getElementById('calc-terrain-grid'),
      priceDisplay: document.getElementById('calc-price-display'),
      estimateHint: document.getElementById('calc-estimate-hint'),
      btnProceed: document.getElementById('calc-btn-proceed'),
      attachedEstimateText: document.getElementById('attached-estimate-text'),
      formEstimateDataInput: document.getElementById('form-estimate-summary')
    };
  }

  function populateDropdownSelect() {
    const { itemCatalog } = window.SITE_CONFIG;
    if (!elements.itemSelect || !itemCatalog) return;

    let optionsHTML = `<option value="" disabled selected>-- Select an item to add (e.g. Sofa, Refrigerator, Mattress) --</option>`;

    itemCatalog.forEach((cat) => {
      optionsHTML += `<optgroup label="${cat.category}">`;
      cat.items.forEach((item) => {
        optionsHTML += `<option value="${item.id}">${item.name} ($${item.minPrice} - $${item.maxPrice})</option>`;
      });
      optionsHTML += `</optgroup>`;
    });

    elements.itemSelect.innerHTML = optionsHTML;
  }

  function renderTerrainOptions() {
    const { terrainModifiers } = window.SITE_CONFIG.pricing;
    if (!elements.terrainGrid || !terrainModifiers) return;

    elements.terrainGrid.innerHTML = terrainModifiers
      .map((mod) => {
        const isChecked = state.selectedTerrain.has(mod.id);
        const feeLabel = mod.fee === 0 ? 'Standard ($0)' : `+$${mod.fee}`;
        return `
          <label class="terrain-item ${isChecked ? 'selected' : ''}" data-terrain-id="${mod.id}">
            <input type="checkbox" class="terrain-checkbox" value="${mod.id}" ${isChecked ? 'checked' : ''}>
            <div class="terrain-text-col">
              <div class="terrain-name-row">
                <span class="terrain-name">${mod.name}</span>
                <span class="terrain-pill">${feeLabel}</span>
              </div>
              <div class="terrain-desc">${mod.description}</div>
            </div>
          </label>
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
      elements.selectedItemsContainer.innerHTML = `
        <div class="empty-items-text">
          No items selected yet. Choose an item above and click "Add Item".
        </div>
      `;
      return;
    }

    elements.selectedItemsContainer.innerHTML = `
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
                  <div>
                    <div class="item-row-title">${item.name}</div>
                    <div class="item-row-price">Est. $${minSub} - $${maxSub}</div>
                  </div>
                </div>
                <div class="item-row-actions">
                  <div class="stepper-mini">
                    <button type="button" class="stepper-btn minus" data-item-id="${itemId}" aria-label="Decrease quantity">-</button>
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
  }

  function bindEvents() {
    if (elements.btnAddItem && elements.itemSelect) {
      elements.btnAddItem.addEventListener('click', () => {
        const itemId = elements.itemSelect.value;
        if (!itemId) {
          alert('Please select an item from the menu first.');
          return;
        }

        const qty = parseInt(elements.itemQtyInput.value, 10) || 1;
        state.selectedItems[itemId] = (state.selectedItems[itemId] || 0) + qty;

        elements.itemSelect.value = '';
        elements.itemQtyInput.value = '1';

        renderSelectedItemsList();
        recalculateEstimate();
      });
    }

    if (elements.selectedItemsContainer) {
      elements.selectedItemsContainer.addEventListener('click', (e) => {
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
      elements.terrainGrid.addEventListener('change', (e) => {
        const checkbox = e.target.closest('.terrain-checkbox');
        if (!checkbox) return;

        const item = checkbox.closest('.terrain-item');
        const terrainId = checkbox.value;

        if (checkbox.checked) {
          state.selectedTerrain.add(terrainId);
          item.classList.add('selected');
        } else {
          state.selectedTerrain.delete(terrainId);
          item.classList.remove('selected');
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
        elements.priceDisplay.innerHTML = `$0 <span style="font-size: 0.9rem; color: #94a3b8; font-weight: normal;">(Add items above)</span>`;
      } else {
        elements.priceDisplay.innerHTML = `$${finalMin} - $${finalMax}`;
      }
    }

    if (elements.estimateHint) {
      if (totalCount === 0) {
        elements.estimateHint.textContent = 'Add items above to see an estimated price range.';
      } else {
        elements.estimateHint.textContent = `Includes ${totalCount} item${totalCount === 1 ? '' : 's'} and selected access conditions.`;
      }
    }

    state.lastCalculated = {
      totalCount,
      finalMin,
      finalMax,
      itemsMin,
      itemsMax,
      terrainTotal
    };
  }

  function syncEstimateToForm() {
    const calc = state.lastCalculated;
    if (!calc || calc.totalCount === 0) {
      if (elements.attachedEstimateText) {
        elements.attachedEstimateText.innerHTML = `
          <strong>No items selected in calculator</strong>
          <span>You can still request a quote or attach photos below.</span>
        `;
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

    if (elements.attachedEstimateText) {
      elements.attachedEstimateText.innerHTML = `
        <strong>Estimated Range: $${calc.finalMin} - $${calc.finalMax}</strong>
        <span>${calc.totalCount} item${calc.totalCount === 1 ? '' : 's'} (${itemListStrings.slice(0, 3).join(', ')}${itemListStrings.length > 3 ? '...' : ''})</span>
      `;
    }

    if (elements.formEstimateDataInput) {
      elements.formEstimateDataInput.value = summaryText;
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
