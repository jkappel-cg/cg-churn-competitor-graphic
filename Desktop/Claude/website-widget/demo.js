// Demo page controller

// Pattern switching
document.querySelectorAll('.pattern-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    // Update button states
    document.querySelectorAll('.pattern-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');

    // Show selected pattern
    const pattern = this.dataset.pattern;
    document.querySelectorAll('.pattern').forEach(p => p.classList.remove('active'));
    document.getElementById('pattern-' + pattern).classList.add('active');
  });
});

// Theme switching
document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');

    const theme = this.dataset.theme;
    document.querySelectorAll('.smc-widget-blade').forEach(blade => {
      blade.classList.remove('theme-dark', 'theme-light');
      blade.classList.add('theme-' + theme);
    });
  });
});

// Modal triggers
const modalOverlay = document.getElementById('modalOverlay');
const closeModal = document.getElementById('closeModal');
const triggerModal = document.getElementById('triggerModal');
const triggerModal2 = document.getElementById('triggerModal2');

if (triggerModal) {
  triggerModal.addEventListener('click', () => {
    modalOverlay.classList.add('active');
  });
}

if (triggerModal2) {
  triggerModal2.addEventListener('click', () => {
    modalOverlay.classList.add('active');
  });
}

if (closeModal) {
  closeModal.addEventListener('click', () => {
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
