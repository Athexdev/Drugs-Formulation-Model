import { content } from '../data/content.js';
import { setModuleTitle } from './app.js';

export function renderQuiz(container) {
  setModuleTitle('KNOWLEDGE CHECK');
  
  // Try to load previous state
  let savedState = null;
  try { savedState = JSON.parse(localStorage.getItem('jarvis_quiz_state')); } catch(e){}
  
  const quizData = content.quiz;
  let currentQ = savedState?.currentQ || 0;
  let score = savedState?.score || 0;
  let finished = savedState?.finished || false;
  
  const renderState = () => {
    if (finished) {
      container.innerHTML = `
        <div class="view-enter" style="text-align: center; max-width: 600px; margin: 0 auto;">
          <h2 class="title-lg" style="margin-bottom: 24px;">JARVIS KNOWLEDGE SCORE</h2>
          <div class="hud-card" style="padding: 40px;">
            <div style="font-family: var(--font-mono); font-size: 4rem; color: var(--accent-cyan); text-shadow: 0 0 20px rgba(0,243,255,0.4); margin-bottom: 16px;">
              ${Math.round((score / quizData.length) * 100)}%
            </div>
            <div style="display: flex; justify-content: space-around; margin-bottom: 32px;">
              <div>
                <div class="text-muted" style="font-size: 0.8rem;">CORRECT</div>
                <div style="font-family: var(--font-mono); font-size: 1.5rem; color: var(--accent-teal);">${score}</div>
              </div>
              <div>
                <div class="text-muted" style="font-size: 0.8rem;">INCORRECT</div>
                <div style="font-family: var(--font-mono); font-size: 1.5rem; color: var(--accent-alert);">${quizData.length - score}</div>
              </div>
            </div>
            <p class="text-muted" style="margin-bottom: 24px;">Topics to revisit based on your performance...</p>
            <button id="btn-restart-quiz" class="hud-button primary">RESTART ASSESSMENT</button>
          </div>
        </div>
      `;
      
      document.getElementById('btn-restart-quiz').addEventListener('click', () => {
        localStorage.removeItem('jarvis_quiz_state');
        currentQ = 0; score = 0; finished = false;
        renderState();
      });
      return;
    }
    
    const q = quizData[currentQ];
    
    container.innerHTML = `
      <div class="view-enter" style="max-width: 800px; margin: 0 auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h2 class="title-lg" style="margin: 0;">KNOWLEDGE CHECK</h2>
          <div style="font-family: var(--font-mono); color: var(--text-secondary);">QUESTION ${(currentQ + 1).toString().padStart(2, '0')} / ${quizData.length.toString().padStart(2, '0')}</div>
        </div>
        
        <div class="progress-bar-container" style="margin-bottom: 32px;">
          <div class="progress-bar-fill" style="width: ${(currentQ / quizData.length) * 100}%"></div>
        </div>
        
        <div class="hud-card" style="padding: 32px;">
          <p style="font-size: 1.2rem; margin-bottom: 32px;">${q.question}</p>
          
          <div id="quiz-options" style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px;">
            ${q.options.map((opt, i) => `
              <button class="hud-button" style="justify-content: flex-start; text-transform: none; font-family: var(--font-ui); font-size: 1rem; padding: 16px; border-color: rgba(255,255,255,0.1); color: var(--text-primary);" data-idx="${i}">
                <span style="font-family: var(--font-mono); color: var(--accent-cyan); margin-right: 16px;">${String.fromCharCode(65 + i)}.</span> ${opt}
              </button>
            `).join('')}
          </div>
          
          <div id="quiz-feedback" style="display: none; padding: 16px; border-radius: 4px; font-size: 0.95rem; margin-bottom: 24px;"></div>
          
          <div style="text-align: right;">
            <button id="btn-next-question" class="hud-button primary" style="display: none;">${currentQ === quizData.length - 1 ? 'FINISH' : 'NEXT QUESTION'}</button>
          </div>
        </div>
      </div>
    `;
    
    const options = document.querySelectorAll('#quiz-options button');
    const feedback = document.getElementById('quiz-feedback');
    const btnNext = document.getElementById('btn-next-question');
    
    let answered = false;
    
    options.forEach(opt => {
      opt.addEventListener('click', (e) => {
        if (answered) return;
        answered = true;
        
        const selectedIdx = parseInt(e.currentTarget.getAttribute('data-idx'));
        const isCorrect = selectedIdx === q.answer;
        
        if (isCorrect) score++;
        
        options.forEach((o, i) => {
          if (i === q.answer) {
            o.style.borderColor = 'var(--accent-teal)';
            o.style.color = 'var(--accent-teal)';
            o.style.background = 'rgba(0, 255, 170, 0.1)';
          } else if (i === selectedIdx && !isCorrect) {
            o.style.borderColor = 'var(--accent-alert)';
            o.style.color = 'var(--accent-alert)';
            o.style.background = 'rgba(255, 42, 42, 0.1)';
          } else {
            o.style.opacity = '0.5';
          }
        });
        
        feedback.style.display = 'block';
        feedback.style.background = isCorrect ? 'rgba(0, 255, 170, 0.1)' : 'rgba(255, 42, 42, 0.1)';
        feedback.style.borderLeft = `4px solid ${isCorrect ? 'var(--accent-teal)' : 'var(--accent-alert)'}`;
        feedback.innerHTML = `<strong style="color: ${isCorrect ? 'var(--accent-teal)' : 'var(--accent-alert)'}">${isCorrect ? 'CORRECT' : 'INCORRECT'}</strong> - ${q.explanation}`;
        
        btnNext.style.display = 'inline-flex';
        
        // Save state
        localStorage.setItem('jarvis_quiz_state', JSON.stringify({ currentQ, score, finished }));
      });
    });
    
    btnNext.addEventListener('click', () => {
      currentQ++;
      if (currentQ >= quizData.length) {
        finished = true;
      }
      localStorage.setItem('jarvis_quiz_state', JSON.stringify({ currentQ, score, finished }));
      renderState();
    });
  };
  
  renderState();
}
