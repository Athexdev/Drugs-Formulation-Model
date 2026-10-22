import { renderDashboard, renderParenteral, renderOphthalmic, renderManufacturing, renderAseptic, renderPowders, renderContainers } from './modules.js';
import { renderFormulation } from './formulation.js';
import { renderQC, renderComparison } from './qc-simulator.js';
import { renderQuiz } from './quiz.js';

export function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const mainContent = document.getElementById('main-content');
  const btnSearch = document.getElementById('btn-search');
  const commandPalette = document.getElementById('command-palette');
  const commandInput = document.getElementById('command-input');
  const commandResults = document.getElementById('command-results');
  
  // Sidebar Navigation
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      // Remove active class from all
      navItems.forEach(nav => nav.classList.remove('active'));
      // Add active to clicked
      e.currentTarget.classList.add('active');
      
      const target = e.currentTarget.getAttribute('data-target');
      loadView(target);
      
      // On mobile, close sidebar (if open)
      const sidebar = document.querySelector('.sidebar');
      if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
      }
    });
  });

  // Command Palette Logic
  const openCommandPalette = () => {
    commandPalette.classList.remove('hidden');
    commandInput.focus();
    commandInput.value = '';
    commandResults.innerHTML = '';
  };

  const closeCommandPalette = () => {
    commandPalette.classList.add('hidden');
    commandInput.blur();
  };

  btnSearch.addEventListener('click', openCommandPalette);

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openCommandPalette();
    }
    if (e.key === 'Escape' && !commandPalette.classList.contains('hidden')) {
      closeCommandPalette();
    }
  });

  commandPalette.addEventListener('click', (e) => {
    if (e.target === commandPalette) closeCommandPalette();
  });
  
  // Basic search functionality for the palette
  const searchableItems = [
    { name: "Parenteral Sterility", target: "parenteral" },
    { name: "Ophthalmic Sterility", target: "ophthalmic" },
    { name: "Sterility Test", target: "qc" },
    { name: "Aseptic Processing", target: "aseptic" },
    { name: "Lyophilisation", target: "powders" },
    { name: "Containers", target: "containers" },
    { name: "Quiz", target: "quiz" },
    { name: "Dashboard", target: "dashboard" }
  ];

  commandInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    commandResults.innerHTML = '';
    if (!query) return;

    const filtered = searchableItems.filter(item => item.name.toLowerCase().includes(query));
    
    filtered.forEach(item => {
      const el = document.createElement('div');
      el.className = 'command-item';
      el.innerHTML = `<i data-lucide="arrow-right"></i> <span>${item.name}</span>`;
      el.addEventListener('click', () => {
        closeCommandPalette();
        // Trigger click on corresponding nav item
        const navTarget = document.querySelector(`.nav-item[data-target="${item.target}"]`);
        if (navTarget) navTarget.click();
      });
      commandResults.appendChild(el);
    });
    
    if (window.lucide) window.lucide.createIcons();
  });
}

function loadView(target) {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = ''; // Clear current
  
  // Simple router
  switch(target) {
    case 'dashboard':
      renderDashboard(mainContent);
      break;
    case 'formulation':
      renderFormulation(mainContent);
      break;
    case 'parenteral':
      renderParenteral(mainContent);
      break;
    case 'ophthalmic':
      renderOphthalmic(mainContent);
      break;
    case 'manufacturing':
      renderManufacturing(mainContent);
      break;
    case 'aseptic':
      renderAseptic(mainContent);
      break;
    case 'powders':
      renderPowders(mainContent);
      break;
    case 'containers':
      renderContainers(mainContent);
      break;
    case 'qc':
      renderQC(mainContent);
      break;
    case 'comparison':
      renderComparison(mainContent);
      break;
    case 'quiz':
      renderQuiz(mainContent);
      break;
    case 'summary':
      renderSummary(mainContent);
      break;
    default:
      mainContent.innerHTML = `<h2 class="title-lg">MODULE OFFLINE</h2><p class="text-muted">Content not available.</p>`;
  }
}

function renderSummary(container) {
  const titleEl = document.getElementById('top-current-module');
  if (titleEl) titleEl.textContent = 'SYSTEM SUMMARY';
  
  container.innerHTML = `
    <div class="view-enter" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center;">
      <h2 class="title-lg mb-6" style="font-size: 2rem;">SYSTEM SUMMARY</h2>
      
      <div class="node-container" style="margin: 40px 0; justify-content: center;">
        <div class="process-node" style="width: 100px; height: 100px; border-color: var(--accent-teal); color: var(--accent-teal); box-shadow: 0 0 15px rgba(0,255,170,0.2);">FORMULATION</div>
        <div class="connector-line active" style="background: var(--accent-teal);"></div>
        <div class="process-node" style="width: 100px; height: 100px; border-color: var(--accent-teal); color: var(--accent-teal); box-shadow: 0 0 15px rgba(0,255,170,0.2);">STERILITY</div>
        <div class="connector-line active" style="background: var(--accent-teal);"></div>
        <div class="process-node" style="width: 100px; height: 100px; border-color: var(--accent-teal); color: var(--accent-teal); box-shadow: 0 0 15px rgba(0,255,170,0.2);">STABILITY</div>
        <div class="connector-line active" style="background: var(--accent-teal);"></div>
        <div class="process-node" style="width: 100px; height: 100px; border-color: var(--accent-teal); color: var(--accent-teal); box-shadow: 0 0 15px rgba(0,255,170,0.2);">QUALITY</div>
      </div>
      
      <h3 style="font-family: var(--font-mono); font-size: 1.5rem; color: var(--accent-cyan); margin-bottom: 32px; letter-spacing: 2px;" class="typing">JARVIS SYSTEM: COMPLETE</h3>
      
      <button class="hud-button primary large" onclick="document.querySelector('.nav-item[data-target=\\'dashboard\\']').click()">RETURN TO CORE</button>

      <hr style="border: none; border-top: 1px solid var(--border-light); margin: 60px 0; width: 100%;">

      <!-- Technology Used Section -->
      <div style="text-align: center; margin-bottom: 40px;">
        <h2 class="title-lg" style="font-size: 2rem;">TECHNOLOGY USED</h2>
        <p class="text-muted">Technology & Architecture Behind the Interactive Model</p>
      </div>

      <div class="grid-3 mb-6" style="text-align: left;">
        <!-- Tech Cards -->
        <div class="hud-card">
          <i data-lucide="file-code-2" style="color: #E34F26; margin-bottom: 16px; width: 32px; height: 32px;"></i>
          <h4 style="font-family: var(--font-mono); margin-bottom: 8px;">HTML5</h4>
          <div class="badge mb-2" style="font-size: 0.7rem; border-color: #E34F26; color: #E34F26;">STRUCTURE</div>
          <p class="text-muted" style="font-size: 0.85rem;">Semantic HTML5 provides the structural foundation of the interactive application.</p>
        </div>
        <div class="hud-card">
          <i data-lucide="paintbrush" style="color: #1572B6; margin-bottom: 16px; width: 32px; height: 32px;"></i>
          <h4 style="font-family: var(--font-mono); margin-bottom: 8px;">CSS3</h4>
          <div class="badge mb-2" style="font-size: 0.7rem; border-color: #1572B6; color: #1572B6;">VISUAL SYSTEM</div>
          <p class="text-muted" style="font-size: 0.85rem;">Custom CSS powers the glassmorphism interface, responsive layouts, animations, HUD effects and visual hierarchy.</p>
        </div>
        <div class="hud-card">
          <i data-lucide="file-json" style="color: #F7DF1E; margin-bottom: 16px; width: 32px; height: 32px;"></i>
          <h4 style="font-family: var(--font-mono); margin-bottom: 8px;">JAVASCRIPT</h4>
          <div class="badge mb-2" style="font-size: 0.7rem; border-color: #F7DF1E; color: #F7DF1E;">INTERACTION ENGINE</div>
          <p class="text-muted" style="font-size: 0.85rem;">JavaScript manages navigation, dynamic content, formulation interactions, quiz logic, progress tracking and application state.</p>
        </div>
        <div class="hud-card">
          <i data-lucide="hexagon" style="color: #F472B6; margin-bottom: 16px; width: 32px; height: 32px;"></i>
          <h4 style="font-family: var(--font-mono); margin-bottom: 8px;">LUCIDE</h4>
          <div class="badge mb-2" style="font-size: 0.7rem; border-color: #F472B6; color: #F472B6;">ICON SYSTEM</div>
          <p class="text-muted" style="font-size: 0.85rem;">Lucide icons provide a consistent, lightweight icon language throughout the interface.</p>
        </div>
        <div class="hud-card">
          <i data-lucide="layers" style="color: var(--accent-cyan); margin-bottom: 16px; width: 32px; height: 32px;"></i>
          <h4 style="font-family: var(--font-mono); margin-bottom: 8px;">RADIX UI</h4>
          <div class="badge mb-2" style="font-size: 0.7rem; border-color: var(--accent-cyan); color: var(--accent-cyan);">INTERACTION PRIMITIVES</div>
          <p class="text-muted" style="font-size: 0.85rem;">Radix-inspired accessible interaction patterns are used for dialogs, tabs, tooltips and other interface behaviors.</p>
        </div>
        <div class="hud-card">
          <i data-lucide="layout-template" style="color: var(--text-primary); margin-bottom: 16px; width: 32px; height: 32px;"></i>
          <h4 style="font-family: var(--font-mono); margin-bottom: 8px;">SHADCN/UI</h4>
          <div class="badge mb-2" style="font-size: 0.7rem; border-color: var(--text-primary); color: var(--text-primary);">COMPONENT DESIGN</div>
          <p class="text-muted" style="font-size: 0.85rem;">shadcn/ui-inspired component patterns provide a clean, reusable and consistent interface system.</p>
        </div>
        <div class="hud-card">
          <i data-lucide="droplets" style="color: rgba(255,255,255,0.7); margin-bottom: 16px; width: 32px; height: 32px;"></i>
          <h4 style="font-family: var(--font-mono); margin-bottom: 8px;">GLASSMORPHISM</h4>
          <div class="badge mb-2" style="font-size: 0.7rem; border-color: rgba(255,255,255,0.3); color: rgba(255,255,255,0.7);">VISUAL LANGUAGE</div>
          <p class="text-muted" style="font-size: 0.85rem;">Glassmorphism creates translucent surfaces, backdrop blur, subtle borders and depth.</p>
        </div>
        <div class="hud-card">
          <i data-lucide="database" style="color: var(--accent-teal); margin-bottom: 16px; width: 32px; height: 32px;"></i>
          <h4 style="font-family: var(--font-mono); margin-bottom: 8px;">LOCALSTORAGE</h4>
          <div class="badge mb-2" style="font-size: 0.7rem; border-color: var(--accent-teal); color: var(--accent-teal);">PERSISTENCE</div>
          <p class="text-muted" style="font-size: 0.85rem;">Browser localStorage can preserve appropriate user progress and interaction state between sessions.</p>
        </div>
        <div class="hud-card">
          <i data-lucide="smartphone" style="color: #A78BFA; margin-bottom: 16px; width: 32px; height: 32px;"></i>
          <h4 style="font-family: var(--font-mono); margin-bottom: 8px;">RESPONSIVE DESIGN</h4>
          <div class="badge mb-2" style="font-size: 0.7rem; border-color: #A78BFA; color: #A78BFA;">MULTI-DEVICE EXPERIENCE</div>
          <p class="text-muted" style="font-size: 0.85rem;">The interface adapts to desktop, tablet and mobile screen sizes.</p>
        </div>
      </div>

      <!-- Architecture Visual -->
      <div class="hud-card mb-8" style="display: flex; flex-direction: column; align-items: center; padding: 40px; border-color: var(--border-light); width: 100%;">
        <h4 style="font-family: var(--font-mono); color: var(--text-secondary); margin-bottom: 32px;">SYSTEM ARCHITECTURE</h4>
        
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; width: 100%; max-width: 400px;">
          <div class="badge" style="width: 100%; text-align: center; padding: 12px; font-size: 0.9rem; background: rgba(255,255,255,0.05);">USER</div>
          <div style="height: 20px; width: 2px; background: var(--accent-cyan);"></div>
          <div class="badge" style="width: 100%; text-align: center; padding: 12px; font-size: 0.9rem; border-color: var(--accent-cyan); color: var(--accent-cyan);">INTERACTIVE UI</div>
          <div style="height: 20px; width: 2px; background: var(--accent-cyan);"></div>
          <div class="badge" style="width: 100%; text-align: center; padding: 12px; font-size: 0.9rem;">HTML5 STRUCTURE</div>
          <div style="height: 20px; width: 2px; background: var(--border-light);"></div>
          <div class="badge" style="width: 100%; text-align: center; padding: 12px; font-size: 0.9rem;">CSS3 / GLASSMORPHISM</div>
          <div style="height: 20px; width: 2px; background: var(--border-light);"></div>
          <div class="badge" style="width: 100%; text-align: center; padding: 12px; font-size: 0.9rem; border-color: #F7DF1E; color: #F7DF1E;">JAVASCRIPT INTERACTION ENGINE</div>
          <div style="height: 20px; width: 2px; background: #F7DF1E;"></div>
          <div class="badge" style="width: 100%; text-align: center; padding: 12px; font-size: 0.9rem;">APPLICATION STATE</div>
          <div style="height: 20px; width: 2px; background: var(--border-light);"></div>
          <div class="badge" style="width: 100%; text-align: center; padding: 12px; font-size: 0.9rem; border-color: var(--accent-teal); color: var(--accent-teal);">FORMULATION / EDUCATIONAL MODULES</div>
        </div>
      </div>

      <!-- Developer / Author Card -->
      <div class="hud-card" style="text-align: center; padding: 40px; background: linear-gradient(135deg, rgba(0,243,255,0.05) 0%, rgba(0,255,170,0.05) 100%); border-color: var(--accent-cyan); width: 100%;">
        <i data-lucide="flask-conical" style="color: var(--accent-teal); width: 48px; height: 48px; margin-bottom: 24px;"></i>
        <h3 style="font-family: var(--font-mono); font-size: 1.5rem; color: var(--text-primary); margin-bottom: 8px;">LIVE INTERACTIVE<br>FORMULATION MODEL</h3>
        <p class="text-muted" style="margin-bottom: 24px; font-size: 0.9rem;">Developed / Presented by</p>
        <h2 style="font-size: 2rem; color: var(--accent-cyan); margin-bottom: 16px; letter-spacing: 1px;">TULASI DEVI DUTTA DAS</h2>
        <div class="badge" style="font-size: 1rem; padding: 8px 16px; border-color: var(--accent-teal); color: var(--accent-teal);">INDUSTRIAL PHARMACY — UNIT 4</div>
      </div>
    </div>
  `;
}
