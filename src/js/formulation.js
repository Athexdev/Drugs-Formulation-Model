import { setModuleTitle } from './app.js';

export function renderFormulation(container) {
  setModuleTitle('FORMULATION MODEL');
  
  // Internal State
  const state = {
    mode: null, // 'parenteral' or 'ophthalmic'
    factorTab: 'solubility',
    workflowProgress: -1,
    selectedComponents: new Set(),
    sectionsExplored: new Set()
  };

  // Re-render functions for specific sections
  const renderWorkspace = () => {
    const ws = document.getElementById('formulation-workspace');
    if(!ws) return;
    
    if(!state.mode) {
      ws.innerHTML = `<div class="text-muted" style="text-align:center; padding: 40px; font-style: italic;">Select a formulation mode above to initialize the workspace.</div>`;
      return;
    }

    const isParenteral = state.mode === 'parenteral';
    const coreTitle = isParenteral ? 'PARENTERAL<br>FORMULATION MATRIX' : 'OPHTHALMIC<br>FORMULATION MATRIX';
    const coreName = isParenteral ? 'FORMULATION<br>CORE' : 'OCULAR<br>FORMULATION<br>CORE';
    
    const nodes = isParenteral ? [
      { id: 'api', name: 'API / ACTIVE DRUG', role: 'Provides the therapeutic active component of the preparation.' },
      { id: 'vehicle', name: 'VEHICLE', role: 'Acts as the formulation medium; aqueous vehicles are commonly used for parenteral preparations.' },
      { id: 'buffer', name: 'BUFFER', role: 'Helps control formulation pH.' },
      { id: 'antioxidant', name: 'ANTIOXIDANT', role: 'Used where required to help address oxidative stability.' },
      { id: 'preservative', name: 'PRESERVATIVE', role: 'Used where appropriate in formulations where preservation is required.' },
      { id: 'tonicity', name: 'TONICITY AGENT', role: 'Used to adjust tonicity where required.' },
      { id: 'solubility', name: 'SOLUBILITY / SOLUBILIZER', role: 'Ensures the active component can be incorporated appropriately into the formulation.' },
      { id: 'compatibility', name: 'COMPATIBILITY', role: 'Considers compatibility among formulation components and the container/closure system.' },
      { id: 'stability', name: 'STABILITY', role: 'Considers chemical, physical and microbiological stability throughout the intended shelf life.' },
      { id: 'sterility', name: 'STERILITY', role: 'A critical requirement for parenteral preparations.' }
    ] : [
      { id: 'api', name: 'ACTIVE DRUG', role: 'Provides the therapeutic active component.' },
      { id: 'vehicle', name: 'VEHICLE', role: 'Aqueous vehicles must be compatible with tear fluid.' },
      { id: 'preservative', name: 'PRESERVATIVE', role: 'Required for multiple-dose containers (e.g. Benzalkonium chloride).' },
      { id: 'buffer', name: 'BUFFER', role: 'Maintains ideal pH for comfort (ideally 7.4).' },
      { id: 'tonicity', name: 'TONICITY MODIFIER', role: 'Ensures preparation is isotonic with tears to prevent irritation.' },
      { id: 'viscosity', name: 'VISCOSITY MODIFIER', role: 'Increases contact time in the eye.' },
      { id: 'ph', name: 'pH', role: 'Must be controlled to avoid tissue irritation.' },
      { id: 'clarity', name: 'CLARITY', role: 'Must be completely free from foreign particles.' },
      { id: 'sterility', name: 'STERILITY', role: 'Absolute requirement to prevent ocular infections.' },
      { id: 'stability', name: 'STABILITY', role: 'Ensures the physical and chemical integrity over the shelf life.' }
    ];

    ws.innerHTML = `
      <h3 class="title-lg" style="text-align: center; margin-bottom: 30px; font-size: 1.2rem; color: var(--accent-cyan);">${coreTitle}</h3>
      <div class="workspace-arena" style="position: relative; height: 500px; display: flex; align-items: center; justify-content: center; overflow: hidden; padding: 20px;">
        
        <!-- Core -->
        <div id="workspace-core" class="hud-card" style="position: absolute; width: 140px; height: 140px; border-radius: 50%; display: flex; align-items: center; justify-content: center; text-align: center; border-color: var(--accent-${isParenteral ? 'cyan' : 'teal'}); box-shadow: 0 0 30px rgba(${isParenteral ? '0,243,255' : '0,255,170'}, 0.3); z-index: 10;">
          <div style="font-family: var(--font-mono); font-weight: bold; font-size: 0.9rem; color: var(--accent-${isParenteral ? 'cyan' : 'teal'}); line-height: 1.4;">${coreName}</div>
        </div>

        <!-- Nodes -->
        ${nodes.map((n, i) => {
          const angle = (i / nodes.length) * 2 * Math.PI - Math.PI / 2;
          const radius = 200; // px
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return `
            <div class="workspace-node" data-id="${n.id}" data-role="${n.role}" style="position: absolute; transform: translate(${x}px, ${y}px); z-index: 20; cursor: pointer;">
              <div class="badge" style="padding: 8px 12px; font-size: 0.8rem; border-color: var(--border-light); background: var(--bg-deep); transition: all 0.3s ease;">${n.name}</div>
            </div>
          `;
        }).join('')}
        
        <!-- SVG Connections -->
        <svg style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; pointer-events: none; z-index: 1;">
          <g transform="translate(50%, 50%)">
            ${nodes.map((n, i) => {
              const angle = (i / nodes.length) * 2 * Math.PI - Math.PI / 2;
              const radius = 180;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              return `<line id="line-${n.id}" x1="0" y1="0" x2="${x}" y2="${y}" stroke="var(--border-light)" stroke-width="1" stroke-dasharray="4" style="transition: all 0.3s ease;" />`;
            }).join('')}
          </g>
        </svg>

        <!-- Information Panel overlay -->
        <div id="node-info-panel" class="hud-card hidden" style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); width: 80%; max-width: 400px; z-index: 30; text-align: center; border-color: var(--accent-cyan);">
          <h4 id="node-info-title" style="color: var(--accent-cyan); font-family: var(--font-mono); margin-bottom: 8px;">NODE NAME</h4>
          <p id="node-info-role" class="text-muted" style="font-size: 0.85rem;">Role description goes here.</p>
        </div>
      </div>
    `;

    // Attach node interactions
    ws.querySelectorAll('.workspace-node').forEach(node => {
      node.addEventListener('click', (e) => {
        markSectionExplored('CORE CONCEPTS');
        // Reset all nodes
        ws.querySelectorAll('.workspace-node .badge').forEach(b => {
          b.style.borderColor = 'var(--border-light)';
          b.style.color = 'var(--text-primary)';
          b.style.boxShadow = 'none';
        });
        ws.querySelectorAll('line').forEach(l => {
          l.setAttribute('stroke', 'var(--border-light)');
          l.setAttribute('stroke-width', '1');
        });

        // Highlight clicked
        const badge = e.currentTarget.querySelector('.badge');
        badge.style.borderColor = `var(--accent-${isParenteral ? 'cyan' : 'teal'})`;
        badge.style.color = `var(--accent-${isParenteral ? 'cyan' : 'teal'})`;
        badge.style.boxShadow = `0 0 15px rgba(${isParenteral ? '0,243,255' : '0,255,170'}, 0.4)`;

        const id = e.currentTarget.getAttribute('data-id');
        const line = ws.querySelector(`#line-${id}`);
        if(line) {
          line.setAttribute('stroke', `var(--accent-${isParenteral ? 'cyan' : 'teal'})`);
          line.setAttribute('stroke-width', '2');
        }

        // Show info
        const infoPanel = document.getElementById('node-info-panel');
        document.getElementById('node-info-title').textContent = badge.textContent;
        document.getElementById('node-info-role').textContent = e.currentTarget.getAttribute('data-role');
        infoPanel.classList.remove('hidden');
      });
    });
  };

  const renderFactorAnalyzer = () => {
    const analyzer = document.getElementById('factor-analyzer-content');
    if(!analyzer) return;
    
    const factors = {
      solubility: { name: 'SOLUBILITY', why: 'Ensures uniform dosing and appropriate incorporation of the active drug.', consideration: 'Aqueous vehicles are most common; solubilizers may be required for poorly soluble drugs.', type: 'Both' },
      stability: { name: 'STABILITY', why: 'Maintains product integrity over shelf-life.', consideration: 'Chemical, physical, and microbiological stability must be ensured. Antioxidants or buffers may be needed.', type: 'Both' },
      ph: { name: 'pH', why: 'Minimizes tissue irritation and optimizes drug stability.', consideration: 'Ideally matched to physiological pH (e.g., tear fluid pH 7.4 for ophthalmic).', type: 'Both' },
      tonicity: { name: 'TONICITY', why: 'Prevents pain, hemolysis, or ocular irritation.', consideration: 'Formulation should be isotonic with physiological fluids (blood or tears).', type: 'Both' },
      sterility: { name: 'STERILITY', why: 'Prevents life-threatening or severe infections.', consideration: 'Absolute requirement. Achieved via aseptic processing, filtration, or terminal sterilization.', type: 'Both (Critical)' },
      compatibility: { name: 'COMPATIBILITY', why: 'Prevents precipitation or degradation.', consideration: 'Excipients and container/closure system must not interact physically or chemically with the API.', type: 'Parenteral primarily, but applicable to both' },
      preservation: { name: 'PRESERVATION', why: 'Inhibits microbial growth in multi-dose containers.', consideration: 'Antimicrobial preservatives (e.g., Benzalkonium chloride) are used when appropriate.', type: 'Both' },
      packaging: { name: 'PACKAGING', why: 'Protects the formulation from environment and ensures safe delivery.', consideration: 'Glass vials, ampoules, or suitable plastics (e.g., eye drop bottles).', type: 'Both' }
    };

    const factor = factors[state.factorTab];
    
    analyzer.innerHTML = `
      <div class="hud-card" style="min-height: 200px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
          <h4 style="color: var(--accent-cyan); font-family: var(--font-mono); font-size: 1.2rem;">${factor.name}</h4>
          <div class="badge" style="border-color: var(--accent-teal); color: var(--accent-teal);">ACTIVE ANALYSIS</div>
        </div>
        
        <div class="grid-2" style="gap: 20px;">
          <div>
            <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 4px; font-family: var(--font-mono);">WHY IT MATTERS</div>
            <p class="text-primary" style="font-size: 0.95rem;">${factor.why}</p>
          </div>
          <div>
            <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 4px; font-family: var(--font-mono);">FORMULATION CONSIDERATION</div>
            <p class="text-primary" style="font-size: 0.95rem;">${factor.consideration}</p>
          </div>
        </div>
        <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid var(--border-light);">
          <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 4px; font-family: var(--font-mono);">APPLICABLE PREPARATION</div>
          <div class="badge">${factor.type}</div>
        </div>
      </div>
    `;
    markSectionExplored('FORMULATION FACTORS');
  };

  const renderDecisionFlow = () => {
    const flowContainer = document.getElementById('decision-flow-container');
    const steps = [
      "START", "SELECT PREPARATION", "SELECT ACTIVE DRUG", "ASSESS SOLUBILITY",
      "SELECT VEHICLE", "CONSIDER pH", "CONSIDER TONICITY", "ASSESS STABILITY",
      "CHECK COMPATIBILITY", "CONSIDER PRESERVATION", "STERILITY", "CONTAINER / CLOSURE", "FORMULATION READY"
    ];
    
    let html = `<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">`;
    steps.forEach((step, i) => {
      const isActive = i <= state.workflowProgress;
      const isCurrent = i === state.workflowProgress;
      
      html += `
        <div class="flow-step" data-index="${i}" style="
          padding: 10px 20px; 
          border: 1px solid ${isActive ? 'var(--accent-cyan)' : 'var(--border-light)'}; 
          border-radius: 4px; 
          background: ${isActive ? 'rgba(0, 243, 255, 0.1)' : 'var(--bg-deep)'};
          color: ${isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)'};
          cursor: pointer;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          width: 250px;
          text-align: center;
          transition: all 0.3s ease;
          box-shadow: ${isCurrent ? '0 0 15px rgba(0, 243, 255, 0.4)' : 'none'};
        ">${step}</div>
      `;
      if(i < steps.length - 1) {
        html += `<div style="height: 20px; width: 2px; background: ${isActive ? 'var(--accent-cyan)' : 'var(--border-light)'}; transition: all 0.3s ease;"></div>`;
      }
    });
    html += `</div>`;
    
    // Progress bar
    const pct = steps.length > 1 ? Math.round((Math.max(0, state.workflowProgress) / (steps.length - 1)) * 100) : 0;
    
    html = `
      <div style="margin-bottom: 24px; background: var(--bg-deep); padding: 16px; border: 1px solid var(--border-light); border-radius: 8px;">
        <div style="display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 0.8rem; margin-bottom: 8px; color: var(--accent-cyan);">
          <span>FORMULATION PROGRESS</span>
          <span>${pct}%</span>
        </div>
        <div style="height: 4px; background: var(--border-light); border-radius: 2px; overflow: hidden;">
          <div style="height: 100%; width: ${pct}%; background: var(--accent-cyan); transition: width 0.3s ease;"></div>
        </div>
      </div>
      <div style="max-height: 400px; overflow-y: auto; padding: 10px;">
        ${html}
      </div>
    `;
    
    flowContainer.innerHTML = html;
    
    flowContainer.querySelectorAll('.flow-step').forEach(el => {
      el.addEventListener('click', (e) => {
        state.workflowProgress = parseInt(e.currentTarget.getAttribute('data-index'));
        markSectionExplored('PROCESS FLOW');
        renderDecisionFlow();
      });
    });
  };

  const renderComponentSimulation = () => {
    const sim = document.getElementById('component-simulation');
    if(!sim) return;
    
    const allComponents = ["ACTIVE DRUG", "VEHICLE", "BUFFER", "TONICITY AGENT", "PRESERVATIVE", "ANTIOXIDANT", "VISCOSITY MODIFIER"];
    
    let html = `
      <div class="grid-2" style="gap: 30px;">
        <div>
          <h4 style="font-family: var(--font-mono); color: var(--text-secondary); margin-bottom: 16px; font-size: 0.9rem;">AVAILABLE COMPONENTS</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 12px;">
            ${allComponents.map(c => {
              const isSelected = state.selectedComponents.has(c);
              return `
                <div class="hud-button sim-comp-btn ${isSelected ? 'primary' : ''}" data-comp="${c}" style="font-size: 0.8rem; padding: 8px 12px; ${isSelected ? 'opacity: 0.5; cursor: default;' : ''}">
                  <i data-lucide="${isSelected ? 'check' : 'plus'}" style="width: 14px; height: 14px;"></i> ${c}
                </div>
              `;
            }).join('')}
          </div>
        </div>
        
        <div class="hud-card" style="display: flex; flex-direction: column; align-items: center; border-color: var(--accent-teal);">
          <div style="font-family: var(--font-mono); color: var(--accent-teal); margin-bottom: 16px; width: 100%; display: flex; justify-content: space-between;">
            <span>SELECTED COMPONENTS:</span>
            <span>${state.selectedComponents.size}</span>
          </div>
          
          <div style="flex: 1; width: 100%; display: flex; flex-direction: column; gap: 8px; align-items: center; justify-content: center; min-height: 150px; background: rgba(0,0,0,0.2); border-radius: 8px; padding: 16px;">
            ${state.selectedComponents.size === 0 ? '<span class="text-muted" style="font-style: italic;">No components selected.</span>' : ''}
            ${Array.from(state.selectedComponents).map(c => `
              <div class="badge" style="border-color: var(--accent-teal); color: var(--accent-teal); background: rgba(0, 255, 170, 0.1); width: 80%; text-align: center;">${c}</div>
            `).join('')}
          </div>
          
          <button id="btn-sim-reset" class="hud-button mt-4" style="border-color: var(--error-red); color: var(--error-red); width: 100%;">
            <i data-lucide="rotate-ccw" style="width: 14px; height: 14px;"></i> RESET FORMULATION
          </button>
        </div>
      </div>
    `;
    
    sim.innerHTML = html;
    if(window.lucide) window.lucide.createIcons();
    
    sim.querySelectorAll('.sim-comp-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const c = e.currentTarget.getAttribute('data-comp');
        if(!state.selectedComponents.has(c)) {
          state.selectedComponents.add(c);
          markSectionExplored('COMPONENTS');
          renderComponentSimulation();
        }
      });
    });
    
    document.getElementById('btn-sim-reset').addEventListener('click', () => {
      state.selectedComponents.clear();
      renderComponentSimulation();
    });
  };

  const markSectionExplored = (sectionName) => {
    if(!state.sectionsExplored.has(sectionName)) {
      state.sectionsExplored.add(sectionName);
      updateCompletionUI();
    }
  };

  const updateCompletionUI = () => {
    const total = 5; // CORE CONCEPTS, COMPONENTS, FORMULATION FACTORS, PROCESS FLOW, QUALITY CONSIDERATIONS
    const pct = Math.round((state.sectionsExplored.size / total) * 100);
    
    const pBar = document.getElementById('form-comp-bar');
    const pText = document.getElementById('form-comp-text');
    if(pBar) pBar.style.width = `${pct}%`;
    if(pText) pText.textContent = `${pct}%`;
    
    const statusText = document.getElementById('form-status-text');
    if(statusText) {
      if(pct === 100) {
        statusText.innerHTML = `
          <div style="color: var(--accent-teal); margin-bottom: 8px;">✓ FORMULATION ANALYSIS COMPLETE</div>
          <div style="font-size: 1.2rem; color: var(--text-primary);">LIVE INTERACTIVE FORMULATION MODEL<br>ANALYSIS COMPLETE</div>
          <div style="font-size: 0.9rem; color: var(--accent-cyan); margin-top: 4px;">by Tulasi Devi Dutta Das</div>
        `;
        document.getElementById('form-completion-card').style.borderColor = 'var(--accent-teal)';
      }
    }
  };

  // Main Container HTML structure
  container.innerHTML = `
    <div class="view-enter" style="padding-bottom: 60px;">
      
      <!-- Top Title Bar -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; border-bottom: 1px solid var(--border-light); padding-bottom: 16px;">
        <div>
          <h2 class="title-lg" style="font-size: 2rem; margin-bottom: 8px;">FORMULATION MODEL</h2>
          <p class="text-muted">Interactive Formulation Analysis — Parenteral & Ophthalmic Preparations</p>
        </div>
        <div style="text-align: right;">
          <div class="system-title" style="font-size: 1rem; color: var(--accent-cyan);">LIVE INTERACTIVE FORMULATION MODEL</div>
          <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 8px;">by Tulasi Devi Dutta Das</div>
          <div class="badge">INDUSTRIAL PHARMACY • UNIT 4</div>
        </div>
      </div>

      <!-- Formulation Overview Hero -->
      <div class="hud-card mb-6" style="text-align: center; border-color: var(--accent-cyan); background: rgba(0, 243, 255, 0.05); padding: 40px 20px;">
        <h3 class="title-lg" style="font-size: 1.5rem; color: var(--accent-cyan); margin-bottom: 16px;">FORMULATION ANALYSIS CORE</h3>
        <p class="text-primary" style="max-width: 800px; margin: 0 auto; font-size: 1.1rem; line-height: 1.6; font-style: italic;">
          "Formulation involves selecting and combining appropriate components to achieve the required pharmaceutical preparation while considering stability, compatibility, sterility, pH, tonicity and other formulation requirements."
        </p>
        
        <div style="display: flex; justify-content: center; gap: 20px; margin-top: 32px; flex-wrap: wrap;">
          <button id="btn-mode-parenteral" class="hud-button large" style="width: 280px; font-size: 1rem;">
            <i data-lucide="syringe" style="margin-right: 8px;"></i> PARENTERAL FORMULATION
          </button>
          <button id="btn-mode-ophthalmic" class="hud-button large" style="width: 280px; font-size: 1rem;">
            <i data-lucide="eye" style="margin-right: 8px;"></i> OPHTHALMIC FORMULATION
          </button>
        </div>
      </div>

      <!-- Workspace Area -->
      <div id="formulation-workspace" class="mb-6" style="border: 1px solid var(--border-light); border-radius: 8px; background: var(--bg-surface);">
        <div class="text-muted" style="text-align:center; padding: 40px; font-style: italic;">Select a formulation mode above to initialize the workspace.</div>
      </div>

      <!-- Component Selection Simulation -->
      <h3 class="title-lg mt-8" style="font-size: 1.2rem; margin-bottom: 16px;">BUILD YOUR FORMULATION</h3>
      <div id="component-simulation" class="mb-6" style="padding: 20px; border: 1px solid var(--border-light); border-radius: 8px; background: var(--bg-surface);"></div>

      <!-- Formulation Factor Analyzer -->
      <h3 class="title-lg mt-8" style="font-size: 1.2rem; margin-bottom: 16px;">FORMULATION FACTOR ANALYZER</h3>
      <div class="mb-6">
        <div class="tabs-container" style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;">
          ${['solubility', 'stability', 'ph', 'tonicity', 'sterility', 'compatibility', 'preservation', 'packaging'].map(tab => `
            <button class="hud-button factor-tab-btn ${tab === state.factorTab ? 'primary' : ''}" data-tab="${tab}" style="font-size: 0.8rem; padding: 8px 16px;">
              ${tab.toUpperCase()}
            </button>
          `).join('')}
        </div>
        <div id="factor-analyzer-content"></div>
      </div>

      <!-- Decision Flow and Difference Matrix -->
      <div class="grid-2 mb-6" style="gap: 24px;">
        <div>
          <h3 class="title-lg" style="font-size: 1.2rem; margin-bottom: 16px;">FORMULATION DECISION FLOW</h3>
          <div id="decision-flow-container" style="border: 1px solid var(--border-light); border-radius: 8px; background: var(--bg-surface); padding: 20px;"></div>
        </div>
        <div>
          <h3 class="title-lg" style="font-size: 1.2rem; margin-bottom: 16px;">FORMULATION DIFFERENCE MATRIX</h3>
          <div class="hud-card" style="padding: 0; overflow: hidden;">
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.85rem;">
              <thead>
                <tr style="background: rgba(255,255,255,0.05); border-bottom: 1px solid var(--border-light);">
                  <th style="padding: 12px; font-family: var(--font-mono); color: var(--text-secondary);">FACTOR</th>
                  <th style="padding: 12px; font-family: var(--font-mono); color: var(--accent-cyan);">PARENTERAL</th>
                  <th style="padding: 12px; font-family: var(--font-mono); color: var(--accent-teal);">OPHTHALMIC</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid var(--border-light); cursor: pointer;" title="Primary application route">
                  <td style="padding: 12px; font-weight: bold;">Application</td>
                  <td style="padding: 12px; color: var(--text-muted);">Injection / Infusion</td>
                  <td style="padding: 12px; color: var(--text-muted);">Application to the eye</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-light); cursor: pointer;" title="Both strictly require sterility">
                  <td style="padding: 12px; font-weight: bold;">Sterility</td>
                  <td style="padding: 12px; color: var(--text-muted);">Required</td>
                  <td style="padding: 12px; color: var(--text-muted);">Required</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-light); cursor: pointer;" title="pH considerations">
                  <td style="padding: 12px; font-weight: bold;">pH</td>
                  <td style="padding: 12px; color: var(--text-muted);">Physiological preferred</td>
                  <td style="padding: 12px; color: var(--text-muted);">Ideally 7.4 (Tear fluid)</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-light); cursor: pointer;" title="Osmotic pressure adjustments">
                  <td style="padding: 12px; font-weight: bold;">Tonicity</td>
                  <td style="padding: 12px; color: var(--text-muted);">Isotonic (critical for LVP)</td>
                  <td style="padding: 12px; color: var(--text-muted);">Isotonic with tears</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-light); cursor: pointer;" title="Use of preservatives">
                  <td style="padding: 12px; font-weight: bold;">Preservation</td>
                  <td style="padding: 12px; color: var(--text-muted);">Multiple-dose containers</td>
                  <td style="padding: 12px; color: var(--text-muted);">Multiple-dose (e.g. Benzalkonium chloride)</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-light); cursor: pointer;" title="Visual clarity requirements">
                  <td style="padding: 12px; font-weight: bold;">Clarity</td>
                  <td style="padding: 12px; color: var(--text-muted);">Free of particulates</td>
                  <td style="padding: 12px; color: var(--text-muted);">Strictly free from foreign particles</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-light); cursor: pointer;" title="Viscosity considerations">
                  <td style="padding: 12px; font-weight: bold;">Viscosity</td>
                  <td style="padding: 12px; color: var(--text-muted);">Varies (often low for IV)</td>
                  <td style="padding: 12px; color: var(--text-muted);">Increased for longer contact time</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Knowledge Graph -->
      <h3 class="title-lg mt-8" style="font-size: 1.2rem; margin-bottom: 16px;">FORMULATION KNOWLEDGE GRAPH</h3>
      <div class="hud-card mb-6" style="padding: 40px; text-align: center; overflow: hidden; display: flex; flex-direction: column; align-items: center;" onclick="document.getElementById('kg-hint').style.display='none';">
        <div id="kg-hint" class="text-muted" style="margin-bottom: 20px; font-style: italic; font-size: 0.85rem;">Interactive graph representation of formulation factors.</div>
        
        <div style="position: relative; width: 100%; max-width: 600px; height: 300px; display: flex; align-items: center; justify-content: center;">
          <div class="badge" style="position: absolute; z-index: 10; font-size: 1rem; padding: 10px 20px; background: var(--bg-deep); border-color: var(--accent-cyan); color: var(--accent-cyan);">FORMULATION</div>
          
          <svg style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; pointer-events: none; z-index: 1;">
            <g transform="translate(50%, 50%)">
              <line x1="0" y1="0" x2="-150" y2="-80" stroke="var(--border-light)" />
              <line x1="0" y1="0" x2="0" y2="-120" stroke="var(--border-light)" />
              <line x1="0" y1="0" x2="150" y2="-80" stroke="var(--border-light)" />
              
              <line x1="0" y1="0" x2="-180" y2="20" stroke="var(--border-light)" />
              <line x1="0" y1="0" x2="180" y2="20" stroke="var(--border-light)" />
              
              <line x1="0" y1="0" x2="-150" y2="100" stroke="var(--border-light)" />
              <line x1="0" y1="0" x2="0" y2="120" stroke="var(--border-light)" />
              <line x1="0" y1="0" x2="150" y2="100" stroke="var(--border-light)" />
            </g>
          </svg>
          
          <!-- Nodes -->
          <div class="badge" style="position: absolute; transform: translate(-150px, -80px); background: var(--bg-deep);">ACTIVE DRUG</div>
          <div class="badge" style="position: absolute; transform: translate(0px, -120px); background: var(--bg-deep);">VEHICLE</div>
          <div class="badge" style="position: absolute; transform: translate(150px, -80px); background: var(--bg-deep);">pH</div>
          
          <div class="badge" style="position: absolute; transform: translate(-180px, 20px); background: var(--bg-deep);">TONICITY</div>
          <div class="badge" style="position: absolute; transform: translate(180px, 20px); background: var(--bg-deep);">STABILITY</div>
          
          <div class="badge" style="position: absolute; transform: translate(-150px, 100px); background: var(--bg-deep);">STERILITY</div>
          <div class="badge" style="position: absolute; transform: translate(0px, 120px); background: var(--bg-deep);">PRESERVATION</div>
          <div class="badge" style="position: absolute; transform: translate(150px, 100px); background: var(--bg-deep);">COMPATIBILITY</div>
        </div>
      </div>

      <!-- Completion System -->
      <h3 class="title-lg mt-8" style="font-size: 1.2rem; margin-bottom: 16px;">FORMULATION ANALYSIS STATUS</h3>
      <div id="form-completion-card" class="hud-card mb-8" style="text-align: center; padding: 30px; transition: all 0.5s ease;">
        <div style="font-family: var(--font-mono); font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 16px; display: flex; justify-content: space-between; max-width: 600px; margin-left: auto; margin-right: auto;">
          <span>MODULE COMPLETION</span>
          <span id="form-comp-text">0%</span>
        </div>
        
        <div style="height: 6px; background: var(--bg-deep); border: 1px solid var(--border-light); border-radius: 3px; max-width: 600px; margin: 0 auto 24px auto; overflow: hidden;">
          <div id="form-comp-bar" style="height: 100%; width: 0%; background: var(--accent-cyan); transition: width 0.5s ease;"></div>
        </div>
        
        <div id="form-status-text" style="font-family: var(--font-mono); font-size: 0.9rem; color: var(--text-secondary);">
          Explore sections to complete analysis.
        </div>
      </div>

    </div>
  `;

  // Attach event listeners for dynamic UI sections
  
  // Mode Selectors
  document.getElementById('btn-mode-parenteral').addEventListener('click', (e) => {
    state.mode = 'parenteral';
    e.currentTarget.classList.add('primary');
    e.currentTarget.style.borderColor = 'var(--accent-cyan)';
    document.getElementById('btn-mode-ophthalmic').classList.remove('primary');
    document.getElementById('btn-mode-ophthalmic').style.borderColor = 'var(--border-light)';
    renderWorkspace();
  });
  
  document.getElementById('btn-mode-ophthalmic').addEventListener('click', (e) => {
    state.mode = 'ophthalmic';
    e.currentTarget.classList.add('primary');
    e.currentTarget.style.borderColor = 'var(--accent-teal)';
    document.getElementById('btn-mode-parenteral').classList.remove('primary');
    document.getElementById('btn-mode-parenteral').style.borderColor = 'var(--border-light)';
    renderWorkspace();
  });

  // Factor tabs
  container.querySelectorAll('.factor-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      container.querySelectorAll('.factor-tab-btn').forEach(b => b.classList.remove('primary'));
      e.currentTarget.classList.add('primary');
      state.factorTab = e.currentTarget.getAttribute('data-tab');
      renderFactorAnalyzer();
    });
  });

  // Initialize interactive sections
  renderFactorAnalyzer();
  renderDecisionFlow();
  renderComponentSimulation();
  
  // Add completion listener to matrix table
  const tableRows = container.querySelectorAll('tbody tr');
  tableRows.forEach(tr => {
    tr.addEventListener('mouseenter', () => {
      markSectionExplored('QUALITY CONSIDERATIONS');
    });
  });
  
  if (window.lucide) window.lucide.createIcons();
}
