/**
 * CarGurus SMC Widget Embed Script
 * Version: 1.0.0
 *
 * Usage:
 * <div id="cargurus-smc-widget"></div>
 * <script src="https://widgets.cargurus.com/smc/widget-embed.js"
 *         data-dealer-id="12345"
 *         data-theme="dark"
 *         data-flow="detailed">
 * </script>
 */

(function() {
  'use strict';

  // Get script tag and read configuration
  const scriptTag = document.currentScript;
  const config = {
    dealerId: scriptTag.getAttribute('data-dealer-id') || '',
    dealerName: scriptTag.getAttribute('data-dealer-name') || 'Your Dealership',
    theme: scriptTag.getAttribute('data-theme') || 'dark', // 'dark' or 'light'
    flow: scriptTag.getAttribute('data-flow') || 'detailed', // 'detailed' or 'quick'
    containerId: scriptTag.getAttribute('data-container') || 'cargurus-smc-widget',
    apiEndpoint: scriptTag.getAttribute('data-api-endpoint') || 'https://api.cargurus.com/smc',
    mode: scriptTag.getAttribute('data-mode') || 'inline' // 'inline' or 'modal'
  };

  // Widget base URL (in production, this would be CDN)
  const WIDGET_BASE_URL = window.location.origin;

  // Create iframe container
  function createWidget() {
    const container = document.getElementById(config.containerId);

    if (!container) {
      console.error('CarGurus SMC Widget: Container element not found:', config.containerId);
      return;
    }

    if (config.mode === 'modal') {
      createModalWidget(container);
    } else {
      createInlineWidget(container);
    }
  }

  // Create inline widget
  function createInlineWidget(container) {
    const iframe = document.createElement('iframe');
    iframe.id = 'cargurus-smc-iframe';
    iframe.style.width = '100%';
    iframe.style.border = 'none';
    iframe.style.minHeight = '600px';
    iframe.style.overflow = 'hidden';

    // Build widget URL with config
    const widgetUrl = buildWidgetUrl('inline');
    iframe.src = widgetUrl;

    // Auto-resize iframe based on content
    window.addEventListener('message', function(event) {
      if (event.data && event.data.type === 'cargurus-smc-resize') {
        iframe.style.height = event.data.height + 'px';
      }
    });

    container.appendChild(iframe);
  }

  // Create modal widget
  function createModalWidget(container) {
    // Create trigger button if not exists
    if (!container.querySelector('.cargurus-smc-trigger')) {
      const trigger = document.createElement('button');
      trigger.className = 'cargurus-smc-trigger';
      trigger.textContent = scriptTag.getAttribute('data-button-text') || 'Get An Offer';
      trigger.style.cssText = `
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

      trigger.addEventListener('mouseenter', () => {
        trigger.style.background = '#2451C5';
        trigger.style.transform = 'translateY(-2px)';
        trigger.style.boxShadow = '0 8px 16px rgba(46, 94, 214, 0.3)';
      });

      trigger.addEventListener('mouseleave', () => {
        trigger.style.background = '#2E5ED6';
        trigger.style.transform = 'translateY(0)';
        trigger.style.boxShadow = 'none';
      });

      container.appendChild(trigger);
    }

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
    `;

    const modalContainer = document.createElement('div');
    modalContainer.style.cssText = `
      background: white;
      border-radius: 16px;
      max-width: 900px;
      width: 100%;
      max-height: 90vh;
      overflow: hidden;
      position: relative;
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

    const iframe = document.createElement('iframe');
    iframe.style.cssText = `
      width: 100%;
      height: 90vh;
      border: none;
    `;
    iframe.src = buildWidgetUrl('modal');

    modalContainer.appendChild(closeBtn);
    modalContainer.appendChild(iframe);
    overlay.appendChild(modalContainer);
    document.body.appendChild(overlay);

    // Event listeners
    container.querySelector('.cargurus-smc-trigger').addEventListener('click', () => {
      overlay.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
      overlay.style.display = 'none';
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.style.display = 'none';
      }
    });

    // Close on completion message
    window.addEventListener('message', function(event) {
      if (event.data && event.data.type === 'cargurus-smc-complete') {
        setTimeout(() => {
          overlay.style.display = 'none';
        }, 3000);
      }
    });
  }

  // Build widget URL with configuration
  function buildWidgetUrl(mode) {
    const params = new URLSearchParams({
      dealerId: config.dealerId,
      dealerName: config.dealerName,
      theme: config.theme,
      flow: config.flow,
      mode: mode,
      embedded: 'true'
    });

    return `${WIDGET_BASE_URL}/widget-iframe.html?${params.toString()}`;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createWidget);
  } else {
    createWidget();
  }

})();
