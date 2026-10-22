import { content } from '../data/content.js';
import { renderDashboard } from './modules.js';

export function initBootSequence() {
  const bootOverlay = document.getElementById('boot-sequence');
  const checksContainer = document.getElementById('boot-checks');
  const bootStatus = document.getElementById('boot-status');
  const btnStart = document.getElementById('btn-start-system');
  const appContainer = document.getElementById('app');

  const checks = [
    "✓ FORMULATION DATABASE",
    "✓ PHARMACEUTICAL MODULES",
    "✓ QUALITY CONTROL ENGINE",
    "✓ KNOWLEDGE GRAPH",
    "✓ INTERACTION ENGINE"
  ];

  let delay = 1000;

  checks.forEach((checkText, index) => {
    setTimeout(() => {
      const checkEl = document.createElement('div');
      checkEl.className = 'check-item';
      checkEl.textContent = checkText;
      checksContainer.appendChild(checkEl);
    }, delay + (index * 400));
  });

  setTimeout(() => {
    bootStatus.style.display = 'block';
    btnStart.style.display = 'inline-flex';
  }, delay + (checks.length * 400) + 400);

  btnStart.addEventListener('click', () => {
    bootOverlay.style.opacity = '0';
    setTimeout(() => {
      bootOverlay.style.display = 'none';
      appContainer.style.opacity = '1';
      renderDashboard(); // Render initial dashboard view
    }, 1000);
  });
}

// Global utility for updating current module title
export function setModuleTitle(title) {
  const titleEl = document.getElementById('top-current-module');
  if (titleEl) {
    titleEl.textContent = title.toUpperCase();
  }
}
