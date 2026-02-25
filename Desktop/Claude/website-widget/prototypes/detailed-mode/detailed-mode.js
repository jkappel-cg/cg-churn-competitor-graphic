// SMC Widget - Detailed Mode JavaScript

function showScreen(screenNum) {
  document.querySelectorAll('.smc-widget-screen').forEach(s => s.classList.add('smc-hidden'));
  const screen = screenNum === 'loading' ? document.getElementById('loading') :
                 screenNum === 'confirmation' ? document.getElementById('confirmation') :
                 document.getElementById('screen' + screenNum);
  if (screen) screen.classList.remove('smc-hidden');
}

// Form handlers
document.getElementById('vinForm').addEventListener('submit', (e) => {
  e.preventDefault();
  showScreen('loading');
  setTimeout(() => showScreen(2), 1500);
});

document.getElementById('confirmForm').addEventListener('submit', (e) => {
  e.preventDefault();
  showScreen(3);
});

document.getElementById('detailsForm').addEventListener('submit', (e) => {
  e.preventDefault();
  showScreen('loading');
  setTimeout(() => showScreen(4), 1500);
});

document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  showScreen('loading');
  setTimeout(() => showScreen('confirmation'), 1500);
});

// Condition selector
document.querySelectorAll('.smc-condition-option').forEach(opt => {
  opt.addEventListener('click', function() {
    this.parentElement.querySelectorAll('.smc-condition-option').forEach(o => o.classList.remove('selected'));
    this.classList.add('selected');
  });
});

showScreen(1);
