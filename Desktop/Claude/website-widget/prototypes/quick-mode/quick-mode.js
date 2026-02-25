// SMC Widget - Quick Mode Prototype JavaScript

let currentScreen = 1;
const screens = {
  1: document.getElementById('screen1'),
  2: document.getElementById('screen2'),
  3: document.getElementById('screen3'),
  loading: document.getElementById('screenLoading'),
  confirmation: document.getElementById('screenConfirmation')
};

// Show specific screen
function showScreen(screenId) {
  Object.values(screens).forEach(screen => {
    if (screen) screen.classList.add('smc-hidden');
  });

  if (screens[screenId]) {
    screens[screenId].classList.remove('smc-hidden');
    currentScreen = screenId;
  }
}

// Vehicle form submission
document.getElementById('vehicleForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const vin = document.getElementById('vinInput').value.trim();
  const state = document.getElementById('stateSelect').value;
  const mileage = document.getElementById('mileageInput').value.trim();

  // Simple validation
  if (!vin || !state || !mileage) {
    alert('Please fill in all required fields');
    return;
  }

  // Show loading
  showScreen('loading');

  // Simulate API call
  setTimeout(() => {
    showScreen(2);
  }, 2000);
});

// Condition selector
document.querySelectorAll('.smc-condition-option').forEach(option => {
  option.addEventListener('click', function() {
    document.querySelectorAll('.smc-condition-option').forEach(opt => {
      opt.classList.remove('selected');
    });
    this.classList.add('selected');
  });
});

// Navigation buttons
document.getElementById('backBtn2').addEventListener('click', () => showScreen(1));
document.getElementById('continueBtn2').addEventListener('click', () => showScreen(3));
document.getElementById('backBtn3').addEventListener('click', () => showScreen(2));

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const firstName = document.getElementById('firstNameInput').value.trim();
  const lastName = document.getElementById('lastNameInput').value.trim();
  const email = document.getElementById('emailInput').value.trim();
  const phone = document.getElementById('phoneInput').value.trim();

  // Simple validation
  if (!firstName || !lastName || !email || !phone) {
    alert('Please fill in all required fields');
    return;
  }

  // Show loading
  showScreen('loading');

  // Simulate API call
  setTimeout(() => {
    showScreen('confirmation');
  }, 1500);
});

// Initialize
showScreen(1);
