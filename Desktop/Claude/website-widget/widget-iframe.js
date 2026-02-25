// Widget iframe controller
(function() {
  'use strict';

  // Parse URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const config = {
    dealerId: urlParams.get('dealerId') || '',
    dealerName: urlParams.get('dealerName') || 'Your Dealership',
    theme: urlParams.get('theme') || 'dark',
    flow: urlParams.get('flow') || 'detailed',
    mode: urlParams.get('mode') || 'inline'
  };

  // Load appropriate screens based on flow
  function loadScreens() {
    const container = document.getElementById('widget-screens');
    const widget = document.getElementById('widget');

    // Apply theme
    widget.classList.add('theme-' + config.theme);

    // Load screens (simplified - would load from demo-full-flow.js screens)
    container.innerHTML = getScreensHTML();

    // Setup navigation
    setupNavigation();
    setupConditionCards();

    // Auto-resize for parent
    if (config.mode === 'inline') {
      resizeIframe();
      window.addEventListener('resize', resizeIframe);
    }
  }

  function getScreensHTML() {
    // This would import from the main flow file
    // For now, simplified version
    return '<div class="smc-screen active" data-screen="1">Loading...</div>';
  }

  function setupNavigation() {
    // Navigation logic here
  }

  function setupConditionCards() {
    // Condition card logic here
  }

  function resizeIframe() {
    const height = document.body.scrollHeight;
    window.parent.postMessage({
      type: 'cargurus-smc-resize',
      height: height
    }, '*');
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', loadScreens);

})();
