import { content } from '../data/content.js';
import { setModuleTitle } from './app.js';

export function renderQC(container) {
  setModuleTitle('QUALITY CONTROL COMMAND CENTER');
  
  container.innerHTML = `
    <div class="view-enter" style="display: flex; flex-direction: column; align-items: center;">
      <h2 class="title-lg mb-6">QUALITY CONTROL COMMAND CENTER</h2>
      
      <div style="position: relative; width: 600px; height: 600px; margin-top: 40px; display: flex; align-items: center; justify-content: center;">
        
        <!-- Central Release Gate -->
        <div id="qc-gate" style="width: 180px; height: 180px; border-radius: 50%; border: 2px dashed var(--accent-alert); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 10; background: var(--bg-deep); transition: var(--transition);">
          <i data-lucide="lock" id="gate-icon" style="color: var(--accent-alert); width: 40px; height: 40px; margin-bottom: 8px;"></i>
          <span style="font-family: var(--font-mono); font-size: 0.9rem; color: var(--text-primary); text-align: center;" id="gate-text">QC RELEASE<br>GATE</span>
          <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent-alert); margin-top: 8px;" id="gate-status">LOCKED</span>
        </div>
        
        <!-- QC Nodes Circle -->
        ${content.qc.map((test, i) => {
          const angle = (i / content.qc.length) * 2 * Math.PI - Math.PI / 2;
          const radius = 240;
          const left = 300 + radius * Math.cos(angle) - 60; // 60 is half width
          const top = 300 + radius * Math.sin(angle) - 60;
          
          return `
            <div class="process-node qc-node" data-index="${i}" style="position: absolute; left: ${left}px; top: ${top}px; border-color: var(--border-light); padding: 12px; text-align: center;">
              <i data-lucide="flask-conical" style="margin-bottom: 4px; color: var(--text-secondary);"></i>
              <span style="font-size: 0.75rem; font-family: var(--font-mono); color: var(--text-primary);">${test.name.replace(' TEST','')}</span>
              <div class="status-dot" style="background: var(--text-secondary); margin-top: 4px;"></div>
            </div>
            
            <!-- Connection Line (visual only, simplified with SVG) -->
          `;
        }).join('')}
        
        <svg style="position: absolute; inset: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none;">
          ${content.qc.map((_, i) => {
            const angle = (i / content.qc.length) * 2 * Math.PI - Math.PI / 2;
            const radius = 240;
            const x2 = 300 + radius * Math.cos(angle);
            const y2 = 300 + radius * Math.sin(angle);
            return `<line x1="300" y1="300" x2="${x2}" y2="${y2}" stroke="var(--border-light)" stroke-width="1" class="qc-line qc-line-${i}" stroke-dasharray="4 4" />`;
          }).join('')}
        </svg>
      </div>
      
      <p class="text-muted" style="margin-top: 32px; font-family: var(--font-mono); font-size: 0.85rem;">CLICK EACH NODE TO RUN DIAGNOSTICS</p>
    </div>
    
    <!-- QC Diagnostic Panel (Modal) -->
    <div id="qc-modal" class="modal-overlay hidden">
      <div class="command-dialog glass-panel" style="max-width: 500px; padding: 24px;">
        <h3 id="qc-modal-title" class="title-lg" style="margin-bottom: 16px;">TEST</h3>
        <p id="qc-modal-purpose" class="text-muted" style="margin-bottom: 16px; font-style: italic;"></p>
        <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-cyan); margin-bottom: 8px;">WORKFLOW:</div>
        <ul id="qc-modal-workflow" style="list-style: none; padding-left: 0; margin-bottom: 24px; font-size: 0.85rem; display: flex; flex-direction: column; gap: 8px;"></ul>
        <button id="btn-qc-complete" class="hud-button primary w-full" style="width: 100%;">MARK VERIFIED</button>
      </div>
    </div>
  `;
  
  if (window.lucide) window.lucide.createIcons();
  
  const nodes = document.querySelectorAll('.qc-node');
  const modal = document.getElementById('qc-modal');
  const btnComplete = document.getElementById('btn-qc-complete');
  let activeNodeIndex = null;
  let completedNodes = new Set();
  
  nodes.forEach((node, idx) => {
    node.addEventListener('click', () => {
      if (completedNodes.has(idx)) return; // Already done
      activeNodeIndex = idx;
      const test = content.qc[idx];
      document.getElementById('qc-modal-title').textContent = test.name;
      document.getElementById('qc-modal-purpose').textContent = "PURPOSE: " + test.purpose;
      document.getElementById('qc-modal-workflow').innerHTML = test.workflow.map(step => `<li><i data-lucide="chevron-right" style="width: 12px; height: 12px; display: inline-block;"></i> ${step}</li>`).join('');
      if (window.lucide) window.lucide.createIcons();
      modal.classList.remove('hidden');
    });
  });
  
  btnComplete.addEventListener('click', () => {
    if (activeNodeIndex !== null) {
      completedNodes.add(activeNodeIndex);
      const node = document.querySelector(`.qc-node[data-index="${activeNodeIndex}"]`);
      node.style.borderColor = 'var(--accent-teal)';
      node.style.boxShadow = '0 0 15px rgba(0, 255, 170, 0.3)';
      node.querySelector('i').style.color = 'var(--accent-teal)';
      node.querySelector('.status-dot').style.background = 'var(--accent-teal)';
      
      const line = document.querySelector(`.qc-line-${activeNodeIndex}`);
      line.style.stroke = 'var(--accent-teal)';
      line.style.strokeWidth = '2';
      line.style.strokeDasharray = 'none';
      
      checkGate();
    }
    modal.classList.add('hidden');
  });
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });
  
  function checkGate() {
    if (completedNodes.size === content.qc.length) {
      const gate = document.getElementById('qc-gate');
      gate.style.borderColor = 'var(--accent-teal)';
      gate.style.borderStyle = 'solid';
      gate.style.boxShadow = '0 0 30px rgba(0, 255, 170, 0.4)';
      
      const icon = document.getElementById('gate-icon');
      icon.setAttribute('data-lucide', 'unlock');
      icon.style.color = 'var(--accent-teal)';
      
      document.getElementById('gate-status').textContent = 'VERIFIED';
      document.getElementById('gate-status').style.color = 'var(--accent-teal)';
      
      if (window.lucide) window.lucide.createIcons();
    }
  }
}

export function renderComparison(container) {
  setModuleTitle('COMPARISON MODE');
  container.innerHTML = `
    <div class="view-enter">
      <h2 class="title-lg">PARENTERAL VS OPHTHALMIC</h2>
      <p class="text-muted" style="margin-bottom: 32px;">Interactive Comparison Matrix</p>
      
      <div class="hud-card" style="padding: 0; overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-light); background: rgba(0, 243, 255, 0.05);">
              <th style="padding: 16px; font-family: var(--font-mono); color: var(--accent-cyan); width: 20%;">ATTRIBUTE</th>
              <th style="padding: 16px; font-family: var(--font-mono); color: var(--accent-cyan); width: 40%;">PARENTERAL</th>
              <th style="padding: 16px; font-family: var(--font-mono); color: var(--accent-teal); width: 40%;">OPHTHALMIC</th>
            </tr>
          </thead>
          <tbody>
            <tr class="comp-row" style="border-bottom: 1px solid rgba(255, 255, 255, 0.05); transition: var(--transition);">
              <td style="padding: 16px; font-family: var(--font-mono); font-size: 0.85rem;">Sterility</td>
              <td style="padding: 16px; font-size: 0.85rem;">Absolute sterility required. Aseptic processing or terminal sterilization.</td>
              <td style="padding: 16px; font-size: 0.85rem;">Absolute sterility required to prevent ocular infections.</td>
            </tr>
            <tr class="comp-row" style="border-bottom: 1px solid rgba(255, 255, 255, 0.05); transition: var(--transition);">
              <td style="padding: 16px; font-family: var(--font-mono); font-size: 0.85rem;">pH</td>
              <td style="padding: 16px; font-size: 0.85rem;">Physiological pH preferred to prevent pain and tissue damage, though ranges vary by route.</td>
              <td style="padding: 16px; font-size: 0.85rem;">Ideally matched to tear fluid (pH 7.4) to maximize comfort and prevent tearing.</td>
            </tr>
            <tr class="comp-row" style="border-bottom: 1px solid rgba(255, 255, 255, 0.05); transition: var(--transition);">
              <td style="padding: 16px; font-family: var(--font-mono); font-size: 0.85rem;">Tonicity</td>
              <td style="padding: 16px; font-size: 0.85rem;">Isotonicity critical (esp. IV/SC) to prevent hemolysis.</td>
              <td style="padding: 16px; font-size: 0.85rem;">Isotonic with tears essential to avoid irritation.</td>
            </tr>
            <tr class="comp-row" style="border-bottom: 1px solid rgba(255, 255, 255, 0.05); transition: var(--transition);">
              <td style="padding: 16px; font-family: var(--font-mono); font-size: 0.85rem;">Preservatives</td>
              <td style="padding: 16px; font-size: 0.85rem;">Required for multiple-dose containers (e.g., vials). Not used in LVP.</td>
              <td style="padding: 16px; font-size: 0.85rem;">Required for multiple-dose eye drops (e.g., Benzalkonium chloride).</td>
            </tr>
            <tr class="comp-row" style="border-bottom: 1px solid rgba(255, 255, 255, 0.05); transition: var(--transition);">
              <td style="padding: 16px; font-family: var(--font-mono); font-size: 0.85rem;">Clarity / Particles</td>
              <td style="padding: 16px; font-size: 0.85rem;">Must be free of particulate matter.</td>
              <td style="padding: 16px; font-size: 0.85rem;">Must be free of foreign particles (Clarity test).</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
  
  // Add hover effect
  document.querySelectorAll('.comp-row').forEach(row => {
    row.addEventListener('mouseenter', () => row.style.background = 'rgba(0, 243, 255, 0.05)');
    row.addEventListener('mouseleave', () => row.style.background = 'transparent');
  });
}
