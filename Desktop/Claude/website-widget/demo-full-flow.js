// SMC Widget - Complete Flow Demo

// Quick Flow Screens (2-3 screens)
window.quickFlowScreens = {
  screen1: `
    <div class="smc-screen active" data-screen="1">
      <div style="max-width: 700px; margin: 0 auto; text-align: center;">
        <h1 class="smc-widget-headline">Sell your car for the best price</h1>
        <p class="smc-widget-subheadline">Get an instant offer in under 2 minutes.</p>
      </div>
      <div class="smc-form" style="max-width: 700px; margin: 40px auto 0;">
        <form class="screen-form">
          <div class="smc-form-grid smc-form-grid-3">
            <div class="smc-form-field">
              <label class="smc-form-label">License plate or VIN</label>
              <input type="text" class="smc-form-input" placeholder="5N1AL0MM0GC520681" required>
            </div>
            <div class="smc-form-field">
              <label class="smc-form-label">State</label>
              <select class="smc-form-select" required>
                <option value="">Select state</option>
                <option value="MA">Massachusetts</option>
                <option value="CA">California</option>
              </select>
            </div>
            <div class="smc-form-field">
              <label class="smc-form-label">Mileage</label>
              <input type="number" class="smc-form-input" placeholder="45000" required>
            </div>
          </div>
          <button type="submit" class="smc-btn smc-btn-primary smc-btn-full">Get My Offer</button>
        </form>
        <div class="smc-powered-by" style="justify-content: center; margin-top: 24px; color: #6B7280;">
          <span>Powered by</span> <strong style="color: #2E5ED6;">CarGurus</strong>
        </div>
      </div>
    </div>
  `,

  loading: `
    <div class="smc-screen" data-screen="loading">
      <div class="smc-form" style="max-width: 700px; margin: 40px auto 0;">
        <div class="smc-loading">
          <div class="smc-spinner"></div>
          <p class="smc-loading-text">Calculating your offer...</p>
        </div>
      </div>
    </div>
  `,

  screen2: `
    <div class="smc-screen" data-screen="2">
      <div style="max-width: 700px; margin: 0 auto; text-align: center;">
        <h1 class="smc-widget-headline">Your offer is ready</h1>
        <p class="smc-widget-subheadline">Confirm your vehicle condition</p>
      </div>
      <div class="smc-form" style="max-width: 700px; margin: 40px auto 0;">
        <div class="smc-vehicle-card">
          <img src="data:image/svg+xml,%3Csvg width='120' height='90' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='120' height='90' fill='%23ccc'/%3E%3Ctext x='60' y='50' text-anchor='middle' fill='%23666' font-size='12'%3EVehicle%3C/text%3E%3C/svg%3E" class="smc-vehicle-image">
          <div class="smc-vehicle-details">
            <div class="smc-vehicle-name">2016 INFINITI QX60</div>
            <div class="smc-vehicle-vin">5N1AL0MM0GC520681</div>
          </div>
        </div>

        <div class="smc-offer-card">
          <div class="smc-offer-label">Offer from Riverside Motors</div>
          <div class="smc-offer-amount">$24,900</div>
        </div>

        <form class="screen-form">
          <div class="smc-form-field">
            <label class="smc-form-label">What's your car's condition?</label>
            <div class="smc-condition-grid">
              <div class="smc-condition-card" data-condition="excellent">
                <div class="smc-condition-title">Excellent</div>
                <div class="smc-condition-desc">Like new</div>
              </div>
              <div class="smc-condition-card selected" data-condition="good">
                <div class="smc-condition-title">Good</div>
                <div class="smc-condition-desc">Minor wear</div>
              </div>
              <div class="smc-condition-card" data-condition="fair">
                <div class="smc-condition-title">Fair</div>
                <div class="smc-condition-desc">Needs work</div>
              </div>
            </div>
          </div>

          <div class="smc-button-group">
            <button type="button" class="smc-btn smc-btn-secondary back-btn">Back</button>
            <button type="submit" class="smc-btn smc-btn-primary">Continue</button>
          </div>
        </form>
      </div>
    </div>
  `,

  screen3: `
    <div class="smc-screen" data-screen="3">
      <div style="max-width: 700px; margin: 0 auto; text-align: center;">
        <h1 class="smc-widget-headline">Almost there!</h1>
        <p class="smc-widget-subheadline">How should we contact you?</p>
      </div>
      <div class="smc-form" style="max-width: 700px; margin: 40px auto 0;">
        <div class="smc-offer-card" style="margin-bottom: 32px;">
          <div class="smc-offer-label">Your offer</div>
          <div class="smc-offer-amount">$24,900</div>
        </div>

        <form class="screen-form">
          <div class="smc-form-grid smc-form-grid-2">
            <div class="smc-form-field">
              <label class="smc-form-label">First Name</label>
              <input type="text" class="smc-form-input" placeholder="John" required>
            </div>
            <div class="smc-form-field">
              <label class="smc-form-label">Last Name</label>
              <input type="text" class="smc-form-input" placeholder="Smith" required>
            </div>
          </div>
          <div class="smc-form-field">
            <label class="smc-form-label">Email</label>
            <input type="email" class="smc-form-input" placeholder="john@example.com" required>
          </div>
          <div class="smc-form-field">
            <label class="smc-form-label">Phone</label>
            <input type="tel" class="smc-form-input" placeholder="(555) 123-4567" required>
          </div>

          <div class="smc-button-group">
            <button type="button" class="smc-btn smc-btn-secondary back-btn">Back</button>
            <button type="submit" class="smc-btn smc-btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  `,

  confirmation: `
    <div class="smc-screen" data-screen="confirmation">
      <div class="smc-form" style="max-width: 700px; margin: 40px auto 0;">
        <div class="smc-confirmation">
          <div class="smc-confirmation-icon">✓</div>
          <h2 class="smc-confirmation-title">We've received your information!</h2>
          <p class="smc-confirmation-message">
            Riverside Motors will contact you shortly about your <strong>$24,900</strong> offer.
          </p>
          <div class="smc-confirmation-details">
            <p style="margin-bottom: 8px;"><strong>Need to reach them sooner?</strong></p>
            <p style="font-size: 16px; color: #2E5ED6; font-weight: 600;">Call: (555) 555-5555</p>
          </div>
        </div>
      </div>
    </div>
  `
};

// Detailed Flow Screens (5 screens)
window.screenTemplates = {
  // Screen 1: Entry
  screen1: `
    <div class="smc-screen active" data-screen="1">
      <div style="max-width: 700px; margin: 0 auto; text-align: center;">
        <h1 class="smc-widget-headline">Sell your car for the best price</h1>
        <p class="smc-widget-subheadline">Get an instant offer from Riverside Motors in under 2 minutes.</p>
      </div>
      <div class="smc-form" style="max-width: 700px; margin: 40px auto 0;">
        <div class="smc-progress">
          <div class="smc-progress-bar" style="width: 20%"></div>
        </div>
        <div class="smc-step-text">Step 1 of 5</div>

        <form class="screen-form">
          <div class="smc-form-grid smc-form-grid-3">
            <div class="smc-form-field">
              <label class="smc-form-label">License plate or VIN</label>
              <input type="text" class="smc-form-input" placeholder="5N1AL0MM0GC520681" required>
            </div>
            <div class="smc-form-field">
              <label class="smc-form-label">State</label>
              <select class="smc-form-select" required>
                <option value="">Select state</option>
                <option value="MA">Massachusetts</option>
                <option value="CA">California</option>
              </select>
            </div>
            <div class="smc-form-field">
              <label class="smc-form-label">Mileage</label>
              <input type="number" class="smc-form-input" placeholder="45000" required>
            </div>
          </div>
          <button type="submit" class="smc-btn smc-btn-primary smc-btn-full">Get started</button>
        </form>
        <div class="smc-powered-by" style="justify-content: center; margin-top: 24px; color: #6B7280;">
          <span>Powered by</span> <strong style="color: #2E5ED6;">CarGurus</strong>
        </div>
      </div>
    </div>
  `,

  // Loading screen
  loading: `
    <div class="smc-screen" data-screen="loading">
      <div class="smc-form" style="max-width: 700px; margin: 40px auto 0;">
        <div class="smc-loading">
          <div class="smc-spinner"></div>
          <p class="smc-loading-text">Finding your vehicle...</p>
        </div>
      </div>
    </div>
  `,

  // Screen 2: Confirm Vehicle
  screen2: `
    <div class="smc-screen" data-screen="2">
      <div style="max-width: 700px; margin: 0 auto; text-align: center;">
        <h1 class="smc-widget-headline">Confirm the details</h1>
        <p class="smc-widget-subheadline">The VIN was a match. Add what's missing.</p>
      </div>
      <div class="smc-form" style="max-width: 700px; margin: 40px auto 0;">
        <div class="smc-progress">
          <div class="smc-progress-bar" style="width: 40%"></div>
        </div>
        <div class="smc-step-text">Step 2 of 5</div>

        <div class="smc-vehicle-card">
          <img src="data:image/svg+xml,%3Csvg width='120' height='90' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='120' height='90' fill='%23ccc'/%3E%3Ctext x='60' y='50' text-anchor='middle' fill='%23666' font-size='12'%3EVehicle%3C/text%3E%3C/svg%3E" class="smc-vehicle-image">
          <div class="smc-vehicle-details">
            <div class="smc-vehicle-name">2016 INFINITI QX60</div>
            <div class="smc-vehicle-vin">5N1AL0MM0GC520681</div>
          </div>
        </div>

        <form class="screen-form">
          <div class="smc-form-field">
            <label class="smc-form-label">Trim</label>
            <select class="smc-form-select">
              <option>Select trim</option>
              <option selected>Base</option>
            </select>
            <div class="smc-help-text">
              <a href="#" class="smc-help-link">How do I find the trim?</a>
            </div>
          </div>

          <div class="smc-button-group">
            <button type="button" class="smc-btn smc-btn-secondary back-btn">Back</button>
            <button type="submit" class="smc-btn smc-btn-primary">Continue</button>
          </div>
        </form>
      </div>
    </div>
  `,

  // Screen 3: Details & Condition
  screen3: `
    <div class="smc-screen" data-screen="3">
      <div style="max-width: 700px; margin: 0 auto; text-align: center;">
        <h1 class="smc-widget-headline">Share more details</h1>
        <p class="smc-widget-subheadline">We'll use this to get you real offers</p>
      </div>
      <div class="smc-form" style="max-width: 700px; margin: 40px auto 0;">
        <div class="smc-progress">
          <div class="smc-progress-bar" style="width: 60%"></div>
        </div>
        <div class="smc-step-text">Step 3 of 5</div>

        <form class="screen-form">
          <div class="smc-form-field">
            <label class="smc-form-label">What's your car's condition?</label>
            <div class="smc-condition-grid">
              <div class="smc-condition-card" data-condition="excellent">
                <div class="smc-condition-title">Excellent</div>
                <div class="smc-condition-desc">Runs perfectly and looks new. No dents.</div>
              </div>
              <div class="smc-condition-card selected" data-condition="good">
                <div class="smc-condition-title">Good</div>
                <div class="smc-condition-desc">A few minor issues, but still with no major repairs needed.</div>
              </div>
              <div class="smc-condition-card" data-condition="fair">
                <div class="smc-condition-title">Fair</div>
                <div class="smc-condition-desc">It needs work, repairs, but it still runs.</div>
              </div>
            </div>
          </div>

          <div class="smc-button-group">
            <button type="button" class="smc-btn smc-btn-secondary back-btn">Back</button>
            <button type="submit" class="smc-btn smc-btn-primary">Continue</button>
          </div>
        </form>
      </div>
    </div>
  `,

  // Screen 4: Offer
  screen4: `
    <div class="smc-screen" data-screen="4">
      <div style="max-width: 700px; margin: 0 auto; text-align: center;">
        <h1 class="smc-widget-headline">Here's your offer</h1>
      </div>
      <div class="smc-form" style="max-width: 700px; margin: 40px auto 0;">
        <div class="smc-progress">
          <div class="smc-progress-bar" style="width: 80%"></div>
        </div>
        <div class="smc-step-text">Step 4 of 5</div>

        <div class="smc-offer-card">
          <div class="smc-offer-label">Offer from Riverside Motors</div>
          <div class="smc-offer-amount">$24,900</div>
          <div class="smc-offer-disclaimer">
            Based on your vehicle details and current market data.<br>
            Subject to in-person inspection.
          </div>
        </div>

        <div class="smc-button-group">
          <button type="button" class="smc-btn smc-btn-secondary back-btn">Back</button>
          <button type="button" class="smc-btn smc-btn-primary next-btn">Accept Offer</button>
        </div>
      </div>
    </div>
  `,

  // Screen 5: Contact Info
  screen5: `
    <div class="smc-screen" data-screen="5">
      <div style="max-width: 700px; margin: 0 auto; text-align: center;">
        <h1 class="smc-widget-headline">Almost done!</h1>
        <p class="smc-widget-subheadline">How should we contact you?</p>
      </div>
      <div class="smc-form" style="max-width: 700px; margin: 40px auto 0;">
        <div class="smc-progress">
          <div class="smc-progress-bar" style="width: 100%"></div>
        </div>
        <div class="smc-step-text">Step 5 of 5</div>

        <form class="screen-form">
          <div class="smc-form-grid smc-form-grid-2">
            <div class="smc-form-field">
              <label class="smc-form-label">First Name</label>
              <input type="text" class="smc-form-input" placeholder="John" required>
            </div>
            <div class="smc-form-field">
              <label class="smc-form-label">Last Name</label>
              <input type="text" class="smc-form-input" placeholder="Smith" required>
            </div>
          </div>
          <div class="smc-form-field">
            <label class="smc-form-label">Email</label>
            <input type="email" class="smc-form-input" placeholder="john@example.com" required>
          </div>
          <div class="smc-form-field">
            <label class="smc-form-label">Phone</label>
            <input type="tel" class="smc-form-input" placeholder="(555) 123-4567" required>
          </div>

          <div class="smc-button-group">
            <button type="button" class="smc-btn smc-btn-secondary back-btn">Back</button>
            <button type="submit" class="smc-btn smc-btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  `,

  // Confirmation
  confirmation: `
    <div class="smc-screen" data-screen="confirmation">
      <div class="smc-form" style="max-width: 700px; margin: 40px auto 0;">
        <div class="smc-confirmation">
          <div class="smc-confirmation-icon">✓</div>
          <h2 class="smc-confirmation-title">We've received your information!</h2>
          <p class="smc-confirmation-message">
            Riverside Motors will contact you shortly to schedule an inspection and finalize your offer of <strong>$24,900</strong>.
          </p>
          <div class="smc-confirmation-details">
            <p style="margin-bottom: 8px;"><strong>Need to reach them sooner?</strong></p>
            <p style="font-size: 16px; color: #2E5ED6; font-weight: 600;">Call: (555) 555-5555</p>
          </div>
        </div>
      </div>
    </div>
  `
};

// Current flow mode
let currentFlow = 'detailed';
let currentPattern = 'standalone';
let currentTheme = 'dark';

// Initialize
function init() {
  loadFlow('detailed');

  // Setup event listeners
  setupNavigation();
  setupConditionCards();
  setupPatternToggle();
  setupFlowToggle();
  setupThemeToggle();
  setupModal();
}

// Load flow screens
function loadFlow(flowType) {
  currentFlow = flowType;
  const flows = flowType === 'quick' ? window.quickFlowScreens : window.screenTemplates;

  ['standalone', 'blade', 'modal'].forEach(pattern => {
    const container = document.getElementById('screens-' + pattern);
    if (container) {
      if (flowType === 'quick') {
        container.innerHTML = flows.screen1 +
                             flows.loading +
                             flows.screen2 +
                             flows.screen3 +
                             flows.confirmation;
      } else {
        container.innerHTML = flows.screen1 +
                             flows.loading +
                             flows.screen2 +
                             flows.screen3 +
                             flows.screen4 +
                             flows.screen5 +
                             flows.confirmation;
      }
    }
  });
}

// Setup navigation
function setupNavigation() {
  document.addEventListener('submit', function(e) {
    if (e.target.classList.contains('screen-form')) {
      e.preventDefault();
      const currentScreen = e.target.closest('.smc-screen');
      const screenNum = parseInt(currentScreen.dataset.screen);

      // Show loading
      showScreen(currentScreen.parentElement, 'loading');

      // Navigate to next screen after delay
      setTimeout(() => {
        showScreen(currentScreen.parentElement, screenNum + 1);
      }, 1500);
    }
  });

  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('back-btn')) {
      const currentScreen = e.target.closest('.smc-screen');
      const screenNum = parseInt(currentScreen.dataset.screen);
      showScreen(currentScreen.parentElement, screenNum - 1);
    }

    if (e.target.classList.contains('next-btn')) {
      const currentScreen = e.target.closest('.smc-screen');
      const screenNum = parseInt(currentScreen.dataset.screen);
      showScreen(currentScreen.parentElement, screenNum + 1);
    }
  });
}

// Setup condition cards
function setupConditionCards() {
  document.addEventListener('click', function(e) {
    const card = e.target.closest('.smc-condition-card');
    if (card) {
      const grid = card.parentElement;
      grid.querySelectorAll('.smc-condition-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    }
  });
}

// Show specific screen
function showScreen(container, screenNum) {
  const screens = container.querySelectorAll('.smc-screen');
  screens.forEach(screen => screen.classList.remove('active'));

  const targetScreen = container.querySelector(`[data-screen="${screenNum}"]`);
  if (targetScreen) {
    targetScreen.classList.add('active');
  }
}

// Pattern toggle
function setupPatternToggle() {
  document.querySelectorAll('.pattern-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.pattern-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const pattern = this.dataset.pattern;
      currentPattern = pattern;
      document.querySelectorAll('.pattern').forEach(p => p.classList.remove('active'));
      document.getElementById('pattern-' + pattern).classList.add('active');

      updateEmbedCode();
    });
  });
}

// Flow toggle
function setupFlowToggle() {
  document.querySelectorAll('.flow-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.flow-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const flow = this.dataset.flow;
      currentFlow = flow;
      loadFlow(flow);

      // Re-setup navigation after loading new screens
      setupNavigation();
      setupConditionCards();

      updateEmbedCode();
    });
  });
}

// Theme toggle
function setupThemeToggle() {
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const theme = this.dataset.theme;
      currentTheme = theme;

      // Update blade themes
      document.querySelectorAll('.smc-widget-blade').forEach(blade => {
        blade.classList.remove('theme-dark', 'theme-light');
        blade.classList.add('theme-' + theme);
      });

      // Update modal theme
      const modalContainer = document.querySelector('.modal-container');
      if (modalContainer) {
        modalContainer.classList.remove('modal-theme-dark', 'modal-theme-light');
        modalContainer.classList.add('modal-theme-' + theme);
      }

      updateEmbedCode();
    });
  });

  // Initialize modal with dark theme
  const modalContainer = document.querySelector('.modal-container');
  if (modalContainer) {
    modalContainer.classList.add('modal-theme-dark');
  }
}

// Modal
function setupModal() {
  const modalOverlay = document.getElementById('modalOverlay');
  const closeBtn = document.getElementById('closeModal');

  document.querySelectorAll('.trigger-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      modalOverlay.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }
}

// Embed code management
function setupEmbedCode() {
  const toggleBtn = document.getElementById('toggleEmbedCode');
  const panel = document.getElementById('embedCodePanel');
  const arrow = document.getElementById('embedArrow');
  const copyBtn = document.getElementById('copyEmbedBtn');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      panel.classList.toggle('active');
      arrow.textContent = panel.classList.contains('active') ? '▲' : '▼';
      if (panel.classList.contains('active')) {
        updateEmbedCode();
      }
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const code = document.getElementById('embedCodeDisplay').textContent;
      navigator.clipboard.writeText(code).then(() => {
        copyBtn.textContent = '✓ Copied!';
        setTimeout(() => {
          copyBtn.textContent = 'Copy Code';
        }, 2000);
      });
    });
  }

  // Initial embed code
  updateEmbedCode();
}

function updateEmbedCode() {
  const codeDisplay = document.getElementById('embedCodeDisplay');
  const noteDisplay = document.getElementById('embedNote');

  if (!codeDisplay) return;

  let code = '';
  let note = '';

  // Generate code based on current pattern
  if (currentPattern === 'standalone') {
    code = `<!-- Full standalone page -->
<!-- This should be the only content on /sell-your-car page -->

<div id="cargurus-smc-widget"></div>

<script src="https://widgets.cargurus.com/smc/widget-embed.js"
        data-dealer-id="YOUR_DEALER_ID"
        data-dealer-name="Your Dealership Name"
        data-theme="${currentTheme}"
        data-flow="${currentFlow}">
</script>`;
    note = 'For standalone pages: Create a dedicated /sell-your-car page with just this widget code.';

  } else if (currentPattern === 'blade') {
    code = `<!-- Embedded blade section -->
<!-- Place this where you want the widget to appear on your page -->

<div id="cargurus-smc-widget"></div>

<script src="https://widgets.cargurus.com/smc/widget-embed.js"
        data-dealer-id="YOUR_DEALER_ID"
        data-dealer-name="Your Dealership Name"
        data-theme="${currentTheme}"
        data-flow="${currentFlow}"
        data-mode="inline">
</script>`;
    note = 'For embedded blade: Place this code in your homepage, footer, or any page section.';

  } else if (currentPattern === 'modal') {
    code = `<!-- Modal popup trigger -->
<!-- Place this where you want the button to appear -->

<div id="cargurus-smc-widget"></div>

<script src="https://widgets.cargurus.com/smc/widget-embed.js"
        data-dealer-id="YOUR_DEALER_ID"
        data-dealer-name="Your Dealership Name"
        data-mode="modal"
        data-button-text="Get An Offer"
        data-theme="${currentTheme}"
        data-flow="${currentFlow}">
</script>`;
    note = 'For modal popup: Button appears inline, clicking opens widget in overlay. Great for navigation bars.';
  }

  codeDisplay.textContent = code;
  if (noteDisplay) {
    noteDisplay.textContent = note;
  }
}

// Start
document.addEventListener('DOMContentLoaded', () => {
  init();
  setupEmbedCode();
});
