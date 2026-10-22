import { content } from '../data/content.js';
import { setModuleTitle } from './app.js';

export function renderDashboard(container = document.getElementById('main-content')) {
  setModuleTitle('CORE DASHBOARD');
  
  container.innerHTML = `
    <div class="view-enter">
      <div class="hud-card mb-6" style="margin-bottom: 24px; text-align: center; border-color: var(--accent-teal);">
        <h1 class="title-lg" style="font-size: 2rem;">PARENTERAL & OPHTHALMIC PREPARATIONS</h1>
        <p class="text-muted">Interactive Formulation & Quality-Control Learning System</p>
      </div>
      
      <div class="grid-2">
        <!-- Parenteral Card -->
        <div class="hud-card">
          <div class="corner-tl"></div><div class="corner-tr"></div>
          <div class="corner-bl"></div><div class="corner-br"></div>
          <div class="scan-line"></div>
          
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
            <i data-lucide="syringe" style="color: var(--accent-cyan); width: 32px; height: 32px;"></i>
            <h2 class="title-lg" style="margin: 0;">PARENTERAL PREPARATIONS</h2>
          </div>
          
          <ul class="text-muted" style="list-style: none; margin-bottom: 24px; display: flex; flex-direction: column; gap: 8px;">
            <li><i data-lucide="check-circle" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle;"></i> Sterile pharmaceutical preparations</li>
            <li><i data-lucide="check-circle" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle;"></i> Injection / infusion</li>
            <li><i data-lucide="check-circle" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle;"></i> Formulation & Manufacturing</li>
            <li><i data-lucide="check-circle" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle;"></i> Sterility & Quality Control</li>
          </ul>
          
          <button class="hud-button primary w-full" onclick="document.querySelector('.nav-item[data-target=\\'parenteral\\']').click()" style="width: 100%;">
            INITIALIZE MODULE
          </button>
        </div>
        
        <!-- Ophthalmic Card -->
        <div class="hud-card">
          <div class="corner-tl"></div><div class="corner-tr"></div>
          <div class="corner-bl"></div><div class="corner-br"></div>
          
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
            <i data-lucide="eye" style="color: var(--accent-teal); width: 32px; height: 32px;"></i>
            <h2 class="title-lg" style="margin: 0; color: var(--accent-teal);">OPHTHALMIC PREPARATIONS</h2>
          </div>
          
          <ul class="text-muted" style="list-style: none; margin-bottom: 24px; display: flex; flex-direction: column; gap: 8px;">
            <li><i data-lucide="check-circle" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle; color: var(--accent-teal);"></i> Sterile eye preparations</li>
            <li><i data-lucide="check-circle" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle; color: var(--accent-teal);"></i> Clarity & Comfort</li>
            <li><i data-lucide="check-circle" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle; color: var(--accent-teal);"></i> pH & Tonicity</li>
            <li><i data-lucide="check-circle" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle; color: var(--accent-teal);"></i> Preservation & Stability</li>
          </ul>
          
          <button class="hud-button w-full" onclick="document.querySelector('.nav-item[data-target=\\'ophthalmic\\']').click()" style="width: 100%; border-color: var(--accent-teal); color: var(--accent-teal);">
            INITIALIZE MODULE
          </button>
        </div>
      </div>
      
      <!-- Stats -->
      <div class="grid-4" style="margin-top: 24px;">
        <div class="hud-card" style="text-align: center; padding: 16px;">
          <div class="text-muted" style="font-size: 0.8rem; letter-spacing: 1px;">MODULES</div>
          <div style="font-family: var(--font-mono); font-size: 2rem; color: var(--accent-cyan);">02</div>
        </div>
        <div class="hud-card" style="text-align: center; padding: 16px;">
          <div class="text-muted" style="font-size: 0.8rem; letter-spacing: 1px;">FORMULATION NODES</div>
          <div style="font-family: var(--font-mono); font-size: 2rem; color: var(--accent-cyan);">06+</div>
        </div>
        <div class="hud-card" style="text-align: center; padding: 16px;">
          <div class="text-muted" style="font-size: 0.8rem; letter-spacing: 1px;">QC NODES</div>
          <div style="font-family: var(--font-mono); font-size: 2rem; color: var(--accent-cyan);">06</div>
        </div>
        <div class="hud-card" style="text-align: center; padding: 16px;">
          <div class="text-muted" style="font-size: 0.8rem; letter-spacing: 1px;">PROCESS NODES</div>
          <div style="font-family: var(--font-mono); font-size: 2rem; color: var(--accent-cyan);">14</div>
        </div>
      </div>
    </div>
  `;
  if (window.lucide) window.lucide.createIcons();
}

export function renderParenteral(container) {
  setModuleTitle('PARENTERAL MODULE');
  
  container.innerHTML = `
    <div class="view-enter">
      <h2 class="title-lg">PARENTERAL PREPARATIONS</h2>
      <p class="text-muted mb-6" style="margin-bottom: 32px; font-style: italic;">“${content.parenteral.definition}”</p>
      
      <h3 class="title-lg" style="font-size: 1.1rem; margin-bottom: 16px;">Classification by Volume</h3>
      <div class="grid-2 mb-6" style="margin-bottom: 32px;">
        <div class="hud-card" id="card-svp" style="cursor: pointer;">
          <h4 style="color: var(--accent-cyan); font-family: var(--font-mono);">SVP</h4>
          <p class="text-muted">≤ 100 mL</p>
          <div class="detail-panel hidden" style="margin-top: 16px; border-top: 1px solid var(--border-light); padding-top: 12px; display: none;">
            <p class="text-muted" style="font-size: 0.85rem;">Examples: ${content.parenteral.classification.volume.svp.examples.join(', ')}</p>
          </div>
        </div>
        <div class="hud-card" id="card-lvp" style="cursor: pointer;">
          <h4 style="color: var(--accent-cyan); font-family: var(--font-mono);">LVP</h4>
          <p class="text-muted">> 100 mL</p>
          <div class="detail-panel hidden" style="margin-top: 16px; border-top: 1px solid var(--border-light); padding-top: 12px; display: none;">
            <p class="text-muted" style="font-size: 0.85rem;">Examples: ${content.parenteral.classification.volume.lvp.examples.join(', ')}</p>
          </div>
        </div>
      </div>
      
      <h3 class="title-lg" style="font-size: 1.1rem; margin-bottom: 16px;">Preformulation Target Analysis</h3>
      <div class="grid-3">
        ${content.parenteral.preformulation.map(node => `
          <div class="hud-card preform-node" style="cursor: pointer;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <i data-lucide="target" style="width: 16px; height: 16px; color: var(--accent-teal);"></i>
              <h4 style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--accent-teal);">${node.name}</h4>
            </div>
            <p class="text-muted" style="font-size: 0.8rem; display: none;">${node.desc}</p>
          </div>
        `).join('')}
      </div>
      <h3 class="title-lg" style="font-size: 1.1rem; margin-top: 32px; margin-bottom: 16px;">JARVIS Formulation Component Matrix</h3>
      <div class="node-container mb-6" style="margin-bottom: 32px;">
        <div class="hud-card" style="border-radius: 50%; width: 140px; height: 140px; display: flex; align-items: center; justify-content: center; border-color: var(--accent-cyan); box-shadow: 0 0 20px rgba(0, 243, 255, 0.2);">
          <div style="text-align: center;">
            <i data-lucide="cpu" style="color: var(--accent-cyan); margin-bottom: 8px;"></i>
            <div style="font-family: var(--font-mono); font-size: 0.8rem; font-weight: bold;">CORE</div>
          </div>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 12px; max-width: 500px; justify-content: center;">
          ${content.parenteral.components.map(comp => `
            <div class="badge component-badge" style="cursor: pointer; padding: 8px 12px; font-size: 0.85rem;" data-name="${comp}">${comp}</div>
          `).join('')}
        </div>
      </div>
      
      <h3 class="title-lg" style="font-size: 1.1rem; margin-bottom: 16px;">Additives Module</h3>
      <div class="grid-3">
        ${content.parenteral.additives.map((add, i) => `
          <div class="hud-card additive-card">
            <h4 style="color: var(--accent-teal); font-family: var(--font-mono); margin-bottom: 8px;">${add.name}</h4>
            <div class="scan-container hidden" style="display: none; margin-bottom: 8px;">
              <div class="scan-line" style="display: block; position: relative; width: 100%; height: 2px; margin-bottom: 8px;"></div>
              <p class="text-muted" style="font-size: 0.8rem; font-family: var(--font-mono); color: var(--accent-cyan);">SCANNING...</p>
            </div>
            <p class="text-muted additive-desc hidden" style="display: none; font-size: 0.85rem;">${add.desc}</p>
            <button class="hud-button primary w-full mt-2 btn-scan" style="width: 100%; margin-top: 12px;">SCAN</button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  // Interactions
  ['svp', 'lvp'].forEach(type => {
    document.getElementById(`card-${type}`).addEventListener('click', (e) => {
      const panel = e.currentTarget.querySelector('.detail-panel');
      panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    });
  });
  
  document.querySelectorAll('.preform-node').forEach(node => {
    node.addEventListener('click', (e) => {
      const desc = e.currentTarget.querySelector('p');
      desc.style.display = desc.style.display === 'none' ? 'block' : 'none';
      e.currentTarget.style.borderColor = desc.style.display === 'block' ? 'var(--accent-teal)' : 'var(--border-light)';
    });
  });

  document.querySelectorAll('.component-badge').forEach(badge => {
    badge.addEventListener('click', (e) => {
      document.querySelectorAll('.component-badge').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
    });
  });

  document.querySelectorAll('.additive-card').forEach(card => {
    const btn = card.querySelector('.btn-scan');
    btn.addEventListener('click', () => {
      btn.style.display = 'none';
      const scanContainer = card.querySelector('.scan-container');
      scanContainer.style.display = 'block';
      setTimeout(() => {
        scanContainer.style.display = 'none';
        card.querySelector('.additive-desc').style.display = 'block';
      }, 1500);
    });
  });
  
  if (window.lucide) window.lucide.createIcons();
}

export function renderOphthalmic(container) {
  setModuleTitle('OPHTHALMIC MODULE');
  container.innerHTML = `
    <div class="view-enter">
      <h2 class="title-lg">OPHTHALMIC PREPARATIONS</h2>
      <p class="text-muted mb-6" style="margin-bottom: 32px; font-style: italic;">“${content.ophthalmic.definition}”</p>
      
      <h3 class="title-lg" style="font-size: 1.1rem; margin-bottom: 16px;">Ophthalmic Requirements Analysis</h3>
      <div class="grid-3" style="margin-bottom: 40px;">
        ${content.ophthalmic.requirements.map(req => `
          <div class="hud-card oph-req-node" style="cursor: pointer; text-align: center;">
            <i data-lucide="scan-eye" style="color: var(--accent-teal); margin-bottom: 8px;"></i>
            <h4 style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--accent-teal);">${req.name}</h4>
            <p class="text-muted" style="font-size: 0.8rem; display: none; margin-top: 12px; text-align: left;">${req.desc}</p>
          </div>
        `).join('')}
      </div>
      
      <h3 class="title-lg" style="font-size: 1.1rem; margin-bottom: 16px;">Eye Drop Formulation Matrix</h3>
      <div class="node-container mb-6" style="margin-bottom: 32px;">
        <div class="hud-card" style="border-radius: 50%; width: 140px; height: 140px; display: flex; align-items: center; justify-content: center; border-color: var(--accent-teal); box-shadow: 0 0 20px rgba(0, 255, 170, 0.2);">
          <div style="text-align: center;">
            <i data-lucide="eye" style="color: var(--accent-teal); margin-bottom: 8px;"></i>
            <div style="font-family: var(--font-mono); font-size: 0.8rem; font-weight: bold; color: var(--accent-teal);">OCULAR<br>CORE</div>
          </div>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 12px; max-width: 500px; justify-content: center;">
          ${content.ophthalmic.components.map(comp => `
            <div class="badge" style="cursor: pointer; padding: 8px 12px; font-size: 0.85rem;" onmouseover="this.style.background='rgba(0, 255, 170, 0.1)'" onmouseout="this.style.background='transparent'">${comp}</div>
          `).join('')}
        </div>
      </div>
      
      <div class="grid-2">
        <!-- Ointments -->
        <div class="hud-card">
          <h4 style="color: var(--accent-cyan); font-family: var(--font-mono); margin-bottom: 16px;">EYE OINTMENTS</h4>
          <div style="margin-bottom: 16px;">
            <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 8px;">BASE SYSTEM:</div>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${content.ophthalmic.ointments.bases.map(b => `
                <div class="badge ${b.emphasis ? 'active' : ''}">${b.name}</div>
              `).join('')}
            </div>
          </div>
          <div>
            <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 8px;">MANUFACTURING FLOW:</div>
            <ol style="padding-left: 16px; font-size: 0.85rem; color: var(--text-primary); display: flex; flex-direction: column; gap: 4px;">
              ${content.ophthalmic.ointments.process.map(p => `<li>${p}</li>`).join('')}
            </ol>
          </div>
        </div>
        
        <!-- Lotions -->
        <div class="hud-card">
          <h4 style="color: var(--accent-cyan); font-family: var(--font-mono); margin-bottom: 16px;">EYE LOTIONS</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
            ${content.ophthalmic.lotions.map(l => `
              <li class="text-muted" style="display: flex; align-items: flex-start; gap: 8px; font-size: 0.85rem;">
                <i data-lucide="droplet" style="width: 14px; height: 14px; flex-shrink: 0; margin-top: 2px;"></i>
                <span>${l}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;
  
  document.querySelectorAll('.oph-req-node').forEach(node => {
    node.addEventListener('click', (e) => {
      const desc = e.currentTarget.querySelector('p');
      desc.style.display = desc.style.display === 'none' ? 'block' : 'none';
      e.currentTarget.style.borderColor = desc.style.display === 'block' ? 'var(--accent-teal)' : 'var(--border-light)';
    });
  });
  
  if (window.lucide) window.lucide.createIcons();
}

export function renderManufacturing(container) {
  setModuleTitle('MANUFACTURING FLOW');
  container.innerHTML = `
    <div class="view-enter">
      <h2 class="title-lg">MANUFACTURING PROCESS</h2>
      <p class="text-muted" style="margin-bottom: 24px;">Interactive Process Timeline</p>
      
      <div style="display: flex; align-items: center; margin-bottom: 32px;">
        <div style="font-family: var(--font-mono); color: var(--accent-cyan); margin-right: 16px;">PROGRESS:</div>
        <div class="progress-bar-container" style="flex: 1;">
          <div class="progress-bar-fill" id="mfg-progress"></div>
        </div>
        <div style="font-family: var(--font-mono); color: var(--accent-cyan); margin-left: 16px;" id="mfg-percent">0%</div>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 8px; max-height: 500px; overflow-y: auto; padding-right: 12px; position: relative;">
        <!-- Vertical Timeline Line -->
        <div style="position: absolute; left: 24px; top: 0; bottom: 0; width: 2px; background: var(--border-light); z-index: 1;"></div>
        
        ${content.parenteral.manufacturingFlow.map((step, i) => `
          <div class="mfg-step" data-index="${i}" style="display: flex; align-items: flex-start; gap: 24px; cursor: pointer; position: relative; z-index: 2;">
            <div class="step-indicator" style="width: 50px; height: 50px; border-radius: 50%; background: var(--bg-deep); border: 2px solid var(--border-light); display: flex; align-items: center; justify-content: center; font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-secondary); transition: var(--transition);">
              ${(i + 1).toString().padStart(2, '0')}
            </div>
            <div class="hud-card flex-1 step-detail" style="flex: 1; padding: 16px; margin-top: 2px; opacity: 0.6; transition: var(--transition);">
              <h4 style="color: var(--text-primary); font-family: var(--font-mono);">${step}</h4>
              <p class="text-muted step-desc hidden" style="display: none; margin-top: 8px; font-size: 0.85rem;">Execute process stage ${(i + 1).toString().padStart(2, '0')}. Ensure all SOPs are followed.</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  const steps = document.querySelectorAll('.mfg-step');
  const progressFill = document.getElementById('mfg-progress');
  const progressPercent = document.getElementById('mfg-percent');
  
  steps.forEach((stepEl, idx) => {
    stepEl.addEventListener('click', () => {
      // Complete all steps up to this one
      steps.forEach((s, i) => {
        const ind = s.querySelector('.step-indicator');
        const det = s.querySelector('.step-detail');
        const desc = s.querySelector('.step-desc');
        
        if (i <= idx) {
          ind.style.borderColor = 'var(--accent-teal)';
          ind.style.color = 'var(--accent-teal)';
          ind.style.boxShadow = '0 0 10px rgba(0, 255, 170, 0.4)';
          det.style.opacity = '1';
          det.style.borderColor = 'var(--accent-teal)';
          if (i === idx) desc.style.display = 'block';
          else desc.style.display = 'none';
        } else {
          ind.style.borderColor = 'var(--border-light)';
          ind.style.color = 'var(--text-secondary)';
          ind.style.boxShadow = 'none';
          det.style.opacity = '0.6';
          det.style.borderColor = 'var(--border-light)';
          desc.style.display = 'none';
        }
      });
      
      const percent = Math.round(((idx + 1) / steps.length) * 100);
      progressFill.style.width = `${percent}%`;
      progressPercent.textContent = `${percent}%`;
    });
  });
}

export function renderAseptic(container) {
  setModuleTitle('ASEPTIC PROCESSING');
  container.innerHTML = `
    <div class="view-enter">
      <h2 class="title-lg">ASEPTIC PROCESSING</h2>
      <p class="text-muted" style="margin-bottom: 32px;">Sterilization and Aseptic Sequence</p>
      
      <div style="text-align: center; margin-bottom: 40px;">
        <div class="badge" id="aseptic-status" style="font-size: 1rem; padding: 8px 16px;">STERILITY CONTROL: INACTIVE</div>
      </div>
      
      <div class="node-container" style="flex-direction: column; gap: 0;">
        ${content.parenteral.asepticProcessing.map((step, i) => `
          <div style="display: flex; flex-direction: column; align-items: center;">
            <div class="process-node aseptic-node" data-index="${i}" style="width: auto; height: auto; border-radius: 8px; padding: 16px 24px; min-width: 300px;">
              <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-cyan); margin-bottom: 4px;">STEP ${step.step}</div>
              <h4 style="color: var(--text-primary); margin-bottom: 8px;">${step.name}</h4>
              <p class="text-muted" style="font-size: 0.8rem;">${step.desc}</p>
            </div>
            ${i < content.parenteral.asepticProcessing.length - 1 ? `<div class="connector-line vertical" style="width: 2px; height: 40px; margin: 8px 0; background: var(--border-light);"></div>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  const nodes = document.querySelectorAll('.aseptic-node');
  const status = document.getElementById('aseptic-status');
  const lines = document.querySelectorAll('.connector-line.vertical');
  
  nodes.forEach((node, idx) => {
    node.addEventListener('click', () => {
      nodes.forEach((n, i) => {
        if (i <= idx) n.classList.add('completed');
        else n.classList.remove('completed');
      });
      lines.forEach((l, i) => {
        if (i < idx) {
          l.style.background = 'var(--accent-teal)';
          l.style.boxShadow = '0 0 8px var(--accent-teal)';
        } else {
          l.style.background = 'var(--border-light)';
          l.style.boxShadow = 'none';
        }
      });
      
      if (idx === nodes.length - 1) {
        status.textContent = 'STERILITY CONTROL: ACTIVE';
        status.classList.add('active');
      } else {
        status.textContent = 'STERILITY CONTROL: IN PROGRESS';
        status.classList.remove('active');
        status.style.color = 'var(--accent-cyan)';
        status.style.borderColor = 'var(--accent-cyan)';
      }
    });
  });
}

export function renderPowders(container) {
  setModuleTitle('STERILE POWDERS');
  container.innerHTML = `
    <div class="view-enter">
      <h2 class="title-lg">STERILE POWDERS + LYOPHILISATION</h2>
      <p class="text-muted" style="margin-bottom: 32px;">Dry-product systems for unstable formulations.</p>
      
      <div class="grid-3 mb-6" style="margin-bottom: 40px;">
        ${content.parenteral.dryProducts.methods.map(method => `
          <div class="hud-card" style="text-align: center;">
            <i data-lucide="snowflake" style="width: 24px; height: 24px; color: var(--accent-cyan); margin-bottom: 8px;"></i>
            <h4 style="font-family: var(--font-mono); font-size: 0.9rem;">${method}</h4>
          </div>
        `).join('')}
      </div>
      
      <h3 class="title-lg" style="font-size: 1.1rem; margin-bottom: 24px; text-align: center;">Lyophilisation Process</h3>
      
      <div class="node-container" style="justify-content: center;">
        <div class="process-node lyo-node" id="lyo-1">
          <i data-lucide="thermometer-snowflake" style="margin-bottom: 4px;"></i>
          <span style="font-size: 0.8rem; font-family: var(--font-mono); text-align: center;">FREEZING</span>
        </div>
        <div class="connector-line lyo-line" id="lyo-line-1"></div>
        <div class="process-node lyo-node" id="lyo-2">
          <i data-lucide="wind" style="margin-bottom: 4px;"></i>
          <span style="font-size: 0.8rem; font-family: var(--font-mono); text-align: center;">PRIMARY<br>DRYING</span>
        </div>
        <div class="connector-line lyo-line" id="lyo-line-2"></div>
        <div class="process-node lyo-node" id="lyo-3">
          <i data-lucide="package-check" style="margin-bottom: 4px;"></i>
          <span style="font-size: 0.8rem; font-family: var(--font-mono); text-align: center;">SECONDARY<br>DRYING</span>
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 32px;">
        <button class="hud-button primary" id="btn-lyo-simulate">SIMULATE PROCESS</button>
      </div>
    </div>
  `;
  
  if (window.lucide) window.lucide.createIcons();
  
  document.getElementById('btn-lyo-simulate').addEventListener('click', (e) => {
    e.target.disabled = true;
    e.target.textContent = 'SIMULATING...';
    const nodes = [document.getElementById('lyo-1'), document.getElementById('lyo-2'), document.getElementById('lyo-3')];
    const lines = [document.getElementById('lyo-line-1'), document.getElementById('lyo-line-2')];
    
    nodes.forEach(n => n.classList.remove('completed'));
    lines.forEach(l => l.classList.remove('active'));
    
    setTimeout(() => { nodes[0].classList.add('completed'); }, 500);
    setTimeout(() => { lines[0].classList.add('active'); }, 1000);
    setTimeout(() => { nodes[1].classList.add('completed'); }, 1500);
    setTimeout(() => { lines[1].classList.add('active'); }, 2000);
    setTimeout(() => { 
      nodes[2].classList.add('completed'); 
      e.target.textContent = 'PROCESS COMPLETE';
      e.target.classList.remove('primary');
      e.target.style.color = 'var(--accent-teal)';
      e.target.style.borderColor = 'var(--accent-teal)';
    }, 2500);
  });
}

export function renderContainers(container) {
  setModuleTitle('CONTAINERS & CLOSURES');
  container.innerHTML = `
    <div class="view-enter">
      <h2 class="title-lg">CONTAINERS + CLOSURES</h2>
      <p class="text-muted" style="margin-bottom: 32px;">Materials Analysis Interface</p>
      
      <div class="grid-3">
        <div class="hud-card">
          <h4 style="color: var(--accent-cyan); font-family: var(--font-mono); margin-bottom: 16px;"><i data-lucide="flask-round"></i> GLASS</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
            ${content.parenteral.containers.glass.map(item => `<li class="text-muted" style="display: flex; align-items: center; gap: 8px;"><div class="status-dot"></div> ${item}</li>`).join('')}
          </ul>
        </div>
        <div class="hud-card">
          <h4 style="color: var(--accent-cyan); font-family: var(--font-mono); margin-bottom: 16px;"><i data-lucide="cylinder"></i> PLASTICS</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
            ${content.parenteral.containers.plastics.map(item => `<li class="text-muted" style="display: flex; align-items: center; gap: 8px;"><div class="status-dot"></div> ${item}</li>`).join('')}
          </ul>
        </div>
        <div class="hud-card">
          <h4 style="color: var(--accent-cyan); font-family: var(--font-mono); margin-bottom: 16px;"><i data-lucide="circle-dashed"></i> CLOSURES + SEALS</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
            ${content.parenteral.containers.closures.map(item => `<li class="text-muted" style="display: flex; align-items: center; gap: 8px;"><div class="status-dot"></div> ${item}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;
  if (window.lucide) window.lucide.createIcons();
}
