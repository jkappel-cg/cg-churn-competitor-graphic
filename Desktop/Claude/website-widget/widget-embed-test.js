/**
 * CarGurus SMC Widget Embed Script - TEST VERSION
 * This version loads the actual demo-full-flow widget
 */

(function() {
  'use strict';

  const scriptTag = document.currentScript;
  const config = {
    dealerId: scriptTag.getAttribute('data-dealer-id') || '',
    dealerName: scriptTag.getAttribute('data-dealer-name') || 'Your Dealership',
    theme: scriptTag.getAttribute('data-theme') || 'dark',
    flow: scriptTag.getAttribute('data-flow') || 'detailed',
    containerId: scriptTag.getAttribute('data-container') || 'cargurus-smc-widget',
    mode: scriptTag.getAttribute('data-mode') || 'inline',
    buttonText: scriptTag.getAttribute('data-button-text') || 'Get An Offer'
  };

  function createWidget() {
    const container = document.getElementById(config.containerId);

    if (!container) {
      console.error('CarGurus SMC Widget: Container not found:', config.containerId);
      return;
    }

    if (config.mode === 'modal') {
      createModalWidget(container);
    } else {
      createInlineWidget(container);
    }
  }

  function createInlineWidget(container) {
    // Create the widget directly in the page
    const widgetHTML = `
      <div class="smc-widget-blade theme-${config.theme}" style="width: 100%;">
        <div class="smc-widget-container">
          <div id="widget-screens-embedded"></div>
        </div>
      </div>
    `;

    container.innerHTML = widgetHTML;

    // Load the widget screens
    loadWidgetScreens('widget-screens-embedded');
  }

  function createModalWidget(container) {
    // Create trigger button
    const button = document.createElement('button');
    button.className = 'cargurus-smc-trigger';
    button.textContent = config.buttonText;
    button.style.cssText = `
      background: #2E5ED6;
      color: white;
      padding: 14px 28px;
      font-size: 16px;
      font-weight: 600;
      border: none;
      border-radius: 28px;
      cursor: pointer;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      transition: all 0.2s;
    `;

    button.addEventListener('mouseenter', () => {
      button.style.background = '#2451C5';
      button.style.transform = 'translateY(-2px)';
      button.style.boxShadow = '0 8px 16px rgba(46, 94, 214, 0.3)';
    });

    button.addEventListener('mouseleave', () => {
      button.style.background = '#2E5ED6';
      button.style.transform = 'translateY(0)';
      button.style.boxShadow = 'none';
    });

    container.appendChild(button);

    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.id = 'cargurus-smc-modal-overlay';
    overlay.style.cssText = `
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      z-index: 999999;
      align-items: center;
      justify-content: center;
      padding: 20px;
      overflow-y: auto;
    `;

    const modalContainer = document.createElement('div');
    modalContainer.style.cssText = `
      background: ${config.theme === 'dark' ? '#05317b' : '#F9FAFB'};
      border-radius: 16px;
      max-width: 900px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      margin: auto;
    `;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
      position: absolute;
      top: 20px;
      right: 20px;
      background: white;
      border: none;
      font-size: 32px;
      cursor: pointer;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      z-index: 10;
      line-height: 32px;
      padding: 0;
    `;

    const widgetWrapper = document.createElement('div');
    widgetWrapper.style.padding = '48px 40px';
    widgetWrapper.innerHTML = `<div id="widget-screens-modal"></div>`;

    modalContainer.appendChild(closeBtn);
    modalContainer.appendChild(widgetWrapper);
    overlay.appendChild(modalContainer);
    document.body.appendChild(overlay);

    // Event listeners
    button.addEventListener('click', () => {
      overlay.style.display = 'flex';
      loadWidgetScreens('widget-screens-modal');
    });

    closeBtn.addEventListener('click', () => {
      overlay.style.display = 'none';
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.style.display = 'none';
      }
    });
  }

  function loadWidgetScreens(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Check if screens are already loaded
    if (container.innerHTML.trim() !== '') return;

    // Import screens from demo-full-flow.js
    if (typeof quickFlowScreens === 'undefined' || typeof screenTemplates === 'undefined') {
      // Load the required CSS and JS if not already loaded
      loadStylesheet('assets/css/widget-v2.css');
      loadStylesheet('assets/css/widget-full-flow.css');
      loadScript('demo-full-flow.js', () => {
        injectScreens(containerId);
      });
    } else {
      injectScreens(containerId);
    }
  }

  function injectScreens(containerId) {
    const container = document.getElementById(containerId);
    const flows = config.flow === 'quick' ? quickFlowScreens : screenTemplates;

    if (config.flow === 'quick') {
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

    // Setup navigation
    setupWidgetNavigation(container);
  }

  function setupWidgetNavigation(container) {
    // Form submissions
    container.addEventListener('submit', function(e) {
      if (e.target.classList.contains('screen-form')) {
        e.preventDefault();
        const currentScreen = e.target.closest('.smc-screen');
        const screenNum = parseInt(currentScreen.dataset.screen);

        showScreenInContainer(container, 'loading');

        setTimeout(() => {
          showScreenInContainer(container, screenNum + 1);
        }, 1500);
      }
    });

    // Back/Next buttons
    container.addEventListener('click', function(e) {
      if (e.target.classList.contains('back-btn')) {
        const currentScreen = e.target.closest('.smc-screen');
        const screenNum = parseInt(currentScreen.dataset.screen);
        showScreenInContainer(container, screenNum - 1);
      }

      if (e.target.classList.contains('next-btn')) {
        const currentScreen = e.target.closest('.smc-screen');
        const screenNum = parseInt(currentScreen.dataset.screen);
        showScreenInContainer(container, screenNum + 1);
      }

      // Condition cards
      const card = e.target.closest('.smc-condition-card');
      if (card) {
        const grid = card.parentElement;
        grid.querySelectorAll('.smc-condition-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
      }
    });
  }

  function showScreenInContainer(container, screenNum) {
    const screens = container.querySelectorAll('.smc-screen');
    screens.forEach(screen => screen.classList.remove('active'));

    const targetScreen = container.querySelector(`[data-screen="${screenNum}"]`);
    if (targetScreen) {
      targetScreen.classList.add('active');
    }
  }

  function loadStylesheet(href) {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }

  function loadScript(src, callback) {
    if (document.querySelector(`script[src="${src}"]`)) {
      if (callback) callback();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createWidget);
  } else {
    createWidget();
  }

})();
