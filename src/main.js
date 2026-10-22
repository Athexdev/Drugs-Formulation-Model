import { initBootSequence } from './js/app.js';
import { initNavigation } from './js/navigation.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Start Boot Sequence
  initBootSequence();

  // Initialize Navigation & Core
  initNavigation();
});
