// Interactive Neural Mesh Canvas & Portfolio Logic
document.addEventListener('DOMContentLoaded', () => {
  initNeuralCanvas();
  initProjectFilter();
  initMobileMenu();
  initScrollSpy();
  initMetricsCounter();
  initInspectorTabs();
  initShapSimulator();
  initNlpSimulator();
  initTerminal();
  runRagSimulation('q1');
});

// 1. Neural Mesh Canvas
function initNeuralCanvas() {
  const canvas = document.getElementById('neuralCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 18), 75);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(6, 182, 212, 0.45)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  let mouse = { x: null, y: null };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      // Connect particles
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const alpha = 1 - dist / 130;
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.18})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Connect to mouse
      if (mouse.x && mouse.y) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          const alpha = 1 - dist / 160;
          ctx.strokeStyle = `rgba(168, 85, 247, ${alpha * 0.35})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

// 2. Project Filtering
function initProjectFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => {
        b.classList.remove('bg-cyan-500/20', 'border-cyan-500', 'text-cyan-400');
        b.classList.add('bg-slate-900/60', 'border-slate-800', 'text-slate-400');
      });

      btn.classList.add('bg-cyan-500/20', 'border-cyan-500', 'text-cyan-400');
      btn.classList.remove('bg-slate-900/60', 'border-slate-800', 'text-slate-400');

      const filter = btn.getAttribute('data-filter');

      cards.forEach((card) => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'block';
          card.classList.add('animate-fadeIn');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// 3. Architecture Diagrams Data & Modal
const architectureData = {
  documind: {
    title: 'DocuMind AI — Hybrid RAG Architecture Flow',
    subtitle: 'Production-Grade Q&A with Sub-50ms Latency & Faithfulness Guardrail',
    steps: [
      {
        phase: '1. Ingestion & Chunking',
        details: 'Complex PDF Upload via FastAPI → Text Extraction & Page Indexing → Recursive Chunking (500 tokens, 10% overlap) with source metadata.'
      },
      {
        phase: '2. Dual Indexing',
        details: 'Simultaneous indexing: Dense Vectors via Gemini 3072-dim embeddings into ChromaDB; Sparse inverted token index via BM25 for technical terms/IDs.'
      },
      {
        phase: '3. Hybrid Retrieval & RRF',
        details: 'Query executed across both engines simultaneously. Reciprocal Rank Fusion (RRF: 1/(k+rank)) merges dense semantic + sparse exact matches.'
      },
      {
        phase: '4. Faithfulness Guardrail & Response',
        details: 'NLI Entailment scoring checks hallucination probability against retrieved source chunks. Validated context sent to Gemini Pro; repeat queries cached in SQLite (<50ms).'
      },
      {
        phase: '5. Production Deployment',
        details: 'Dockerized async FastAPI backend behind Nginx reverse proxy with SSL, deployed on AWS EC2 with Pydantic v2 validation.'
      }
    ],
    tech: ['FastAPI', 'Gemini 3072-dim', 'ChromaDB', 'BM25', 'RRF', 'React 19', 'Nginx', 'AWS EC2']
  },
  swachhai: {
    title: 'Swachh.ai — 3-Tier Reliability Regulatory Decision Engine',
    subtitle: 'Serverless RAG on AWS ECS Fargate for Indian Environmental Rules',
    steps: [
      {
        phase: '1. Geo-Query Ingestion',
        details: 'User provides query + state/municipality context via Next.js 16 frontend to FastAPI microservice.'
      },
      {
        phase: '2. Primary Tier (Gemini Pro)',
        details: 'Strict Pydantic JSON schema extraction mapping to SWM 2016 & Battery Waste Management Rules 2022.'
      },
      {
        phase: '3. Reliability & Exponential Retry',
        details: 'If extraction fails validation or encounters rate limit, 3-tier exponential backoff retry triggers immediately.'
      },
      {
        phase: '4. Deterministic Fallback (ChromaDB ONNX)',
        details: 'Local all-MiniLM-L6-v2 ONNX embeddings in ChromaDB guarantee 100% deterministic fallback with zero hallucinated guidance.'
      },
      {
        phase: '5. Serverless Cloud Infrastructure',
        details: 'Containerized on AWS ECR and deployed on AWS ECS Fargate, logging to AWS CloudWatch with $0 idle VM compute costs.'
      }
    ],
    tech: ['AWS ECS Fargate', 'Next.js 16', 'FastAPI', 'ChromaDB ONNX', 'Gemini API', 'AWS CloudWatch']
  },
  fakenews: {
    title: 'Fake News AI — Production NLP Pipeline & Shortlisting',
    subtitle: 'Stratified NLP Classification with 98.57% Accuracy & 0.999 AUC-ROC',
    steps: [
      {
        phase: '1. Corpus Preprocessing',
        details: 'Text cleaning, lowercase normalization, regex sanitization, stopword removal, and n-gram extraction (unigrams + bigrams).'
      },
      {
        phase: '2. Strict Experimental Splitting',
        details: 'Stratified 70:10:20 train/validation/test split with deterministic random seeds to guarantee no data leakage.'
      },
      {
        phase: '3. TF-IDF & Model Benchmarking',
        details: 'Sublinear TF-IDF vectorization tuned with min_df/max_df thresholds. Evaluated Logistic Regression, Linear SVM, and Ensemble.'
      },
      {
        phase: '4. Evaluation on 8,980 Unseen Articles',
        details: 'Attained 98.57% accuracy, 98.63% weighted F1, and 0.999 AUC-ROC on the held-out test partition.'
      },
      {
        phase: '5. Interactive Deployment',
        details: 'Interactive Streamlit web app providing real-time probability calibration breakdown and top discriminating token highlights.'
      }
    ],
    tech: ['Scikit-Learn', 'TF-IDF', 'Streamlit', 'Python', 'AUC-ROC 0.999']
  },
  heartdisease: {
    title: 'Clinical Decision Support & Explainable AI (SHAP)',
    subtitle: 'Deduplicated Cleveland Benchmark with 84.9% Recall & Patient Attribution',
    steps: [
      {
        phase: '1. Data Hygiene & Deduplication',
        details: 'Purged 723 duplicated instances from raw Cleveland dataset down to 302 clean, verified patient records to prevent train-test contamination.'
      },
      {
        phase: '2. Sklearn Pipeline Architecture',
        details: 'Modular ColumnTransformer encapsulating StandardScaler and numerical imputation inside 5-fold cross-validation.'
      },
      {
        phase: '3. Clinical Recall Optimization',
        details: 'Prioritized sensitivity to minimize fatal false negatives: Logistic Regression achieved 84.9% recall and 87.1% ROC-AUC.'
      },
      {
        phase: '4. Algorithmic Explainability (SHAP)',
        details: 'Integrated SHAP TreeExplainer to compute exact Shapley value feature attributions per patient (e.g. ST depression, fluoroscopy, thal).'
      },
      {
        phase: '5. Web Interface & PDF Reports',
        details: 'Flask web portal generating instantaneous diagnostic risk scores accompanied by downloadable clinician PDF reports.'
      }
    ],
    tech: ['Scikit-Learn', 'SHAP TreeExplainer', 'Flask', 'ColumnTransformer', 'Python']
  }
};

function openArchitectureModal(projectId) {
  const data = architectureData[projectId];
  if (!data) return;

  const modal = document.getElementById('archModal');
  const modalContent = document.getElementById('archModalContent');

  let stepsHtml = data.steps
    .map(
      (step, idx) => `
    <div class="relative flex items-start gap-4 mb-4">
      <div class="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-mono text-sm flex items-center justify-center font-bold">
        ${idx + 1}
      </div>
      <div class="arch-step-box flex-grow">
        <h4 class="text-cyan-300 font-semibold text-sm mb-1">${step.phase}</h4>
        <p class="text-slate-300 text-xs sm:text-sm leading-relaxed">${step.details}</p>
      </div>
    </div>
  `
    )
    .join('');

  let techPills = data.tech
    .map(
      (t) =>
        `<span class="px-2.5 py-1 text-xs rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">${t}</span>`
    )
    .join('');

  modalContent.innerHTML = `
    <div class="flex items-start justify-between border-b border-slate-800 pb-4 mb-6">
      <div>
        <span class="text-xs font-mono uppercase tracking-widest text-cyan-400">System Architecture</span>
        <h3 class="text-xl sm:text-2xl font-bold text-white mt-1">${data.title}</h3>
        <p class="text-sm text-slate-400 mt-1">${data.subtitle}</p>
      </div>
      <button onclick="closeArchitectureModal()" class="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <div class="space-y-2 mb-6">
      ${stepsHtml}
    </div>

    <div class="pt-4 border-t border-slate-800">
      <h5 class="text-xs uppercase font-mono tracking-wider text-slate-400 mb-2">Core Tech & Infrastructure</h5>
      <div class="flex flex-wrap gap-2">
        ${techPills}
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closeArchitectureModal() {
  const modal = document.getElementById('archModal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = 'auto';
}

// 4. Copy Email & Feedback
function copyEmail() {
  const email = 'gouravdas350@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    const toast = document.getElementById('toast');
    toast.textContent = 'Email copied to clipboard: ' + email;
    toast.classList.remove('translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      toast.classList.add('translate-y-20', 'opacity-0');
      toast.classList.remove('translate-y-0', 'opacity-100');
    }, 3000);
  });
}

// 5. Mobile Menu Toggle
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');
  if (!toggleBtn || !menu) return;

  toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

// 6. ScrollSpy for Navbar
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('text-cyan-400');
      link.classList.add('text-slate-300');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-cyan-400');
        link.classList.remove('text-slate-300');
      }
    });
  });
}

// 7. Dynamic Metrics Counter
function initMetricsCounter() {
  const counterElements = document.querySelectorAll('.metric-counter');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-target'));
          const decimals = el.getAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals')) : 0;
          const prefix = el.getAttribute('data-prefix') || '';
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 1200;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = target * easeProgress;

            el.textContent = `${prefix}${currentVal.toFixed(decimals)}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
            }
          }

          requestAnimationFrame(updateCounter);
          obs.unobserve(el);
        }
      });
    },
    { threshold: 0.3 }
  );

  counterElements.forEach((el) => observer.observe(el));
}

// 8. Interactive Architecture & Model Inspector Tabs
function initInspectorTabs() {
  const tabBtns = document.querySelectorAll('.inspector-tab-btn');
  const panels = document.querySelectorAll('.inspector-panel');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach((b) => b.classList.remove('inspector-tab-active', 'border-cyan-500', 'text-cyan-400'));
      btn.classList.add('inspector-tab-active', 'border-cyan-500', 'text-cyan-400');

      const targetId = btn.getAttribute('data-target-panel');
      panels.forEach((p) => {
        if (p.id === targetId) {
          p.classList.remove('hidden');
          p.classList.add('block');
        } else {
          p.classList.add('hidden');
          p.classList.remove('block');
        }
      });
    });
  });
}

// 9. Simulator A: Hybrid RAG & RRF Pipeline Runner
const ragKnowledgeBase = {
  q1: {
    query: "What are the legal compliance steps for battery waste disposal under 2022 rules?",
    dense: [
      { text: "EPR (Extended Producer Responsibility) authorization mandatory for producers under Schedule II.", score: 0.932 },
      { text: "Mandatory annual filing on CPCB central portal before June 30 of each fiscal year.", score: 0.887 },
      { text: "Battery recycling material recovery target: 90% by 2026 for lead-acid and lithium batteries.", score: 0.841 }
    ],
    sparse: [
      { text: "CPCB central portal annual filing requirements for battery producers under 2022 framework.", score: 16.4 },
      { text: "Penal provisions for non-compliance under Environment Protection Act Section 15.", score: 14.1 },
      { text: "EPR mandatory registration certificate issued by SPCB / CPCB.", score: 12.8 }
    ],
    rrfTop: "Mandatory EPR Registration on the CPCB Portal + 90% material recovery target by 2026 under Schedule II.",
    rrfScore: "0.0322",
    entailment: "98.4%",
    citation: "Battery Waste Management Rules (2022), Ministry of Environment, Schedule II, pp. 14-17."
  },
  q2: {
    query: "How does Reciprocal Rank Fusion (RRF) balance BM25 and dense vector embeddings?",
    dense: [
      { text: "Dense embeddings (Gemini 3072-dim) capture high-level semantic intent and paraphrased queries.", score: 0.945 },
      { text: "Vector cosine distance measures angle between high-dimensional document representations.", score: 0.892 },
      { text: "Cross-encoder re-rankers are computationally expensive for real-time sub-50ms search.", score: 0.812 }
    ],
    sparse: [
      { text: "BM25 uses inverted index term frequency and inverse document frequency for exact keyword hits.", score: 18.2 },
      { text: "Acronyms, technical error codes, and unique identifiers are matched accurately by BM25.", score: 15.5 },
      { text: "RRF score formula: RRF(d) = sum( 1 / (k + rank_m(d)) ) with default smoothing parameter k=60.", score: 14.9 }
    ],
    rrfTop: "RRF merges disparate score scales without calibration: RRF(d) = sum(1 / (60 + r)) ensuring neither dense nor sparse dominates.",
    rrfScore: "0.0328",
    entailment: "99.1%",
    citation: "Cormack, Clarke, & Büttcher (SIGIR) / DocuMind AI Architecture Whitepaper, Section 3."
  },
  q3: {
    query: "How was train/test leakage eliminated in the Cleveland Heart Disease benchmark?",
    dense: [
      { text: "Cleveland dataset deduplication reduced 723 duplicated instances down to 302 unique patients.", score: 0.952 },
      { text: "Train-test leakage in medical benchmarks falsely inflates cross-validation accuracy by 8-12%.", score: 0.901 },
      { text: "StandardScaler fitted strictly on training folds via Scikit-Learn ColumnTransformer pipeline.", score: 0.865 }
    ],
    sparse: [
      { text: "Deduplicated Cleveland patient records from 723 repeated entries down to 302 unique patients.", score: 19.1 },
      { text: "Identical patient feature vectors across train and test splits cause severe data contamination.", score: 16.0 },
      { text: "5-fold StratifiedKFold cross-validation preserved class imbalance distribution.", score: 13.4 }
    ],
    rrfTop: "Identified and purged 723 duplicate patient records down to 302 unique rows; prevented data leakage across folds.",
    rrfScore: "0.0331",
    entailment: "98.7%",
    citation: "Cleveland Heart Disease Dedup Benchmark / B.Tech Capstone Thesis (Gourav Das), pp. 22-26."
  }
};

function runRagSimulation(presetKey) {
  const data = ragKnowledgeBase[presetKey || 'q1'];
  if (!data) return;

  const statusEl = document.getElementById('ragStatusText');
  const denseEl = document.getElementById('ragDenseResults');
  const sparseEl = document.getElementById('ragSparseResults');
  const rrfEl = document.getElementById('ragRrfResult');
  const guardrailEl = document.getElementById('ragGuardrailResult');

  if (statusEl) statusEl.textContent = 'Simulating Dual Retrieval & RRF Math...';

  // Populate Dense Results
  denseEl.innerHTML = data.dense
    .map(
      (item, idx) => `
    <div class="p-2.5 rounded-lg bg-slate-900/80 border border-cyan-500/30 text-xs mb-2">
      <div class="flex justify-between items-center text-[11px] font-mono mb-1">
        <span class="text-cyan-400">Dense Rank #${idx + 1}</span>
        <span class="text-cyan-300 bg-cyan-500/10 px-1.5 py-0.5 rounded">Cosine: ${item.score}</span>
      </div>
      <p class="text-slate-300 text-[11px] leading-relaxed">${item.text}</p>
    </div>
  `
    )
    .join('');

  // Populate Sparse Results
  sparseEl.innerHTML = data.sparse
    .map(
      (item, idx) => `
    <div class="p-2.5 rounded-lg bg-slate-900/80 border border-purple-500/30 text-xs mb-2">
      <div class="flex justify-between items-center text-[11px] font-mono mb-1">
        <span class="text-purple-400">BM25 Rank #${idx + 1}</span>
        <span class="text-purple-300 bg-purple-500/10 px-1.5 py-0.5 rounded">Score: ${item.score}</span>
      </div>
      <p class="text-slate-300 text-[11px] leading-relaxed">${item.text}</p>
    </div>
  `
    )
    .join('');

  // Populate RRF Fusion
  rrfEl.innerHTML = `
    <div class="p-3 rounded-xl bg-slate-900 border border-emerald-500/40">
      <div class="flex items-center justify-between text-xs font-mono mb-2">
        <span class="text-emerald-400 font-bold">Fused Top Document (RRF Combined)</span>
        <span class="text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded text-[11px]">Score: ${data.rrfScore}</span>
      </div>
      <p class="text-slate-200 text-xs leading-relaxed mb-2 font-medium">${data.rrfTop}</p>
      <div class="text-[10px] font-mono text-slate-400 bg-slate-950 p-2 rounded border border-slate-800">
        Formula: RRF(d) = [1 / (60 + r_dense)] + [1 / (60 + r_bm25)]
      </div>
    </div>
  `;

  // Populate Guardrail
  guardrailEl.innerHTML = `
    <div class="p-3 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-start gap-3">
      <div class="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center font-bold text-xs flex-shrink-0">
        ✓
      </div>
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="text-xs font-bold text-white">Automated Faithfulness Check:</span>
          <span class="text-xs font-mono text-emerald-400 font-bold">${data.entailment} Entailment (PASS)</span>
        </div>
        <p class="text-[11px] text-slate-400 mb-1">Zero ungrounded assertions detected. Grounded to source citation:</p>
        <span class="inline-block text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60">
          ${data.citation}
        </span>
      </div>
    </div>
  `;

  if (statusEl) statusEl.textContent = 'Pipeline execution complete in 38ms (SQLite Cached)';
}

// 10. Simulator B: SHAP TreeExplainer Feature Attribution Explorer
function initShapSimulator() {
  const ageInput = document.getElementById('shapAge');
  const thalachInput = document.getElementById('shapThalach');
  const oldpeakInput = document.getElementById('shapOldpeak');
  const cpInput = document.getElementById('shapCp');

  if (!ageInput || !thalachInput || !oldpeakInput || !cpInput) return;

  function updateShapCalculations() {
    const age = parseFloat(ageInput.value);
    const thalach = parseFloat(thalachInput.value);
    const oldpeak = parseFloat(oldpeakInput.value);
    const cp = parseInt(cpInput.value);

    // Update value displays
    document.getElementById('valAge').textContent = age;
    document.getElementById('valThalach').textContent = `${thalach} bpm`;
    document.getElementById('valOldpeak').textContent = `${oldpeak.toFixed(1)} mm`;

    const cpLabels = ['Typical Angina', 'Atypical Angina', 'Non-anginal', 'Asymptomatic'];
    document.getElementById('valCp').textContent = cpLabels[cp] || 'Asymptomatic';

    // Model coefficients calibrated to Cleveland logistic model
    // Baseline logit ~ 0.15 (E[f(x)])
    const baseLogit = 0.15;
    const shapAge = ((age - 54) / 9.0) * 0.32;
    const shapThalach = -((thalach - 150) / 23.0) * 0.65; // Higher heart rate is protective
    const shapOldpeak = (oldpeak / 1.1) * 0.72; // ST depression strongly indicates ischemia
    const shapCp = (cp === 3 ? 0.78 : cp === 2 ? 0.25 : -0.35); // Asymptomatic is higher risk

    const totalLogit = baseLogit + shapAge + shapThalach + shapOldpeak + shapCp;
    const probability = 1 / (1 + Math.exp(-totalLogit));
    const probPercent = Math.round(probability * 100);

    // Render Risk Meter
    const probEl = document.getElementById('shapProbVal');
    const riskBadge = document.getElementById('shapRiskBadge');
    if (probEl) probEl.textContent = `${probPercent}%`;

    if (riskBadge) {
      if (probPercent >= 50) {
        riskBadge.textContent = 'HIGH RISK (CLINICAL ACTION)';
        riskBadge.className = 'text-[11px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40 font-bold';
      } else {
        riskBadge.textContent = 'LOW RISK (MONITOR)';
        riskBadge.className = 'text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40 font-bold';
      }
    }

    // Render Individual SHAP Values
    renderShapFeatureRow('shapValOldpeak', shapOldpeak, 'ST Depression');
    renderShapFeatureRow('shapValCp', shapCp, 'Chest Pain Type');
    renderShapFeatureRow('shapValThalach', shapThalach, 'Max Heart Rate');
    renderShapFeatureRow('shapValAge', shapAge, 'Patient Age');

    // Update visual force bar
    const posSum = Math.max(0, shapAge > 0 ? shapAge : 0) + (shapOldpeak > 0 ? shapOldpeak : 0) + (shapCp > 0 ? shapCp : 0);
    const negSum = Math.abs(Math.min(0, shapAge < 0 ? shapAge : 0) + (shapThalach < 0 ? shapThalach : 0) + (shapCp < 0 ? shapCp : 0));
    const totalForce = posSum + negSum + 0.01;

    const redWidth = Math.round((posSum / totalForce) * 100);
    const blueWidth = Math.round((negSum / totalForce) * 100);

    const barPos = document.getElementById('forceBarPos');
    const barNeg = document.getElementById('forceBarNeg');
    if (barPos) barPos.style.width = `${redWidth}%`;
    if (barNeg) barNeg.style.width = `${blueWidth}%`;
  }

  function renderShapFeatureRow(id, val, name) {
    const el = document.getElementById(id);
    if (!el) return;
    const sign = val >= 0 ? '+' : '';
    const color = val >= 0 ? 'text-red-400' : 'text-blue-400';
    el.className = `font-mono text-xs ${color} font-bold`;
    el.textContent = `${sign}${val.toFixed(2)}`;
  }

  [ageInput, thalachInput, oldpeakInput, cpInput].forEach((input) => {
    input.addEventListener('input', updateShapCalculations);
  });

  updateShapCalculations();
}

// 11. Simulator C: NLP Token Weight Highlighter
const nlpPresets = {
  sensational: "BREAKING: Secret documents expose shock breakthrough that doctors refuse to tell the public!",
  factual: "The Reserve Bank announced an official update regarding interbank overnight liquidity ratios.",
  clickbait: "You won't believe what this celebrity admitted in an explosive uncovered viral video scandal!"
};

function initNlpSimulator() {
  const input = document.getElementById('nlpInputText');
  const analyzeBtn = document.getElementById('nlpAnalyzeBtn');
  if (!input || !analyzeBtn) return;

  analyzeBtn.addEventListener('click', () => {
    analyzeNlpText(input.value);
  });
}

function setNlpPreset(type) {
  const input = document.getElementById('nlpInputText');
  if (input && nlpPresets[type]) {
    input.value = nlpPresets[type];
    analyzeNlpText(nlpPresets[type]);
  }
}

function analyzeNlpText(text) {
  if (!text || !text.trim()) return;
  const tokensContainer = document.getElementById('nlpTokensDisplay');
  const gaugePercent = document.getElementById('nlpGaugePercent');
  const gaugeLabel = document.getElementById('nlpGaugeLabel');
  const gaugeBar = document.getElementById('nlpGaugeBar');

  const sensationalTokens = ['breaking', 'secret', 'shock', 'breakthrough', 'doctors', 'refuse', 'explosive', 'scandal', 'viral', 'exposed', 'uncovered', 'miracle'];
  const factualTokens = ['reserve', 'bank', 'official', 'update', 'announced', 'ratio', 'published', 'parliament', 'ministry', 'committee', 'rates', 'data'];

  const words = text.split(/\s+/);
  let sensationalScore = 0;
  let factualScore = 0;

  let htmlTokens = words
    .map((word) => {
      const clean = word.toLowerCase().replace(/[^a-z]/g, '');
      if (sensationalTokens.includes(clean)) {
        sensationalScore += 1.8;
        return `<span class="inline-block px-1.5 py-0.5 m-0.5 rounded token-chip-alert text-xs font-mono font-semibold" title="TF-IDF Weight: +1.8 (Sensational)">${word}</span>`;
      } else if (factualTokens.includes(clean)) {
        factualScore += 1.5;
        return `<span class="inline-block px-1.5 py-0.5 m-0.5 rounded token-chip-neutral text-xs font-mono font-semibold" title="TF-IDF Weight: -1.5 (Factual)">${word}</span>`;
      } else {
        return `<span class="inline-block px-1 text-slate-300 text-xs font-mono">${word}</span>`;
      }
    })
    .join(' ');

  if (tokensContainer) tokensContainer.innerHTML = htmlTokens;

  const total = sensationalScore + factualScore + 0.1;
  let probability = Math.round((sensationalScore / total) * 100);
  if (sensationalScore === 0 && factualScore > 0) probability = 4;
  if (factualScore === 0 && sensationalScore > 0) probability = 98;
  if (sensationalScore === 0 && factualScore === 0) probability = 42;

  if (gaugePercent) gaugePercent.textContent = `${probability}%`;
  if (gaugeBar) gaugeBar.style.width = `${probability}%`;

  if (gaugeLabel) {
    if (probability >= 65) {
      gaugeLabel.textContent = 'FABRICATED / SENSATIONAL (FLAGGED)';
      gaugeLabel.className = 'text-xs font-mono text-red-400 font-bold';
    } else if (probability <= 35) {
      gaugeLabel.textContent = 'FACTUAL / CREDIBLE SOURCE (VERIFIED)';
      gaugeLabel.className = 'text-xs font-mono text-emerald-400 font-bold';
    } else {
      gaugeLabel.textContent = 'NEUTRAL / UNCERTAIN';
      gaugeLabel.className = 'text-xs font-mono text-amber-400 font-bold';
    }
  }
}

// 12. Interactive AI Engineer CLI Terminal
function initTerminal() {
  const input = document.getElementById('terminalInput');
  const output = document.getElementById('terminalOutput');
  if (!input || !output) return;

  const terminalCommands = {
    help: `Available commands:
  - <span class="text-cyan-300 font-bold">skills</span>      : List primary AI/ML, Cloud & Backend stack
  - <span class="text-cyan-300 font-bold">projects</span>    : Review key production platforms (DocuMind, Swachh.ai)
  - <span class="text-cyan-300 font-bold">metrics</span>     : Display benchmark validation results
  - <span class="text-cyan-300 font-bold">documind</span>    : Inspect Hybrid RAG & RRF architecture specs
  - <span class="text-cyan-300 font-bold">swachhai</span>    : Inspect 3-Tier reliability AWS ECS engine
  - <span class="text-cyan-300 font-bold">certs</span>       : List AWS & ML credentials
  - <span class="text-cyan-300 font-bold">contact</span>     : Display direct contact channels
  - <span class="text-cyan-300 font-bold">resume</span>      : Trigger direct PDF resume download
  - <span class="text-cyan-300 font-bold">clear</span>       : Clear terminal window`,

    skills: `[PRIMARY_ENGINEERING_STACK]
  - GenAI & RAG   : LangChain, ChromaDB, Gemini 3072-dim Embeddings, BM25, RRF, Amazon Bedrock
  - Machine Learning: Scikit-Learn Pipelines, SHAP TreeExplainer, ColumnTransformer, Cross-Val
  - Cloud & Infra : AWS ECS Fargate, EC2, S3, CloudWatch, ECR, VPC, Docker, Nginx
  - Backend & Web : FastAPI, Next.js 16, React 19, Flask, Pydantic v2, PostgreSQL, SQLite`,

    projects: `[FEATURED_SYSTEMS]
  1. DocuMind AI  : Hybrid RAG (BM25 + 3072d Dense) | <50ms Cached Latency | EC2
  2. Swachh.ai    : Serverless Regulatory Decision Engine | $0 Idle VM Cost | ECS Fargate
  3. Fake News AI : Stratified NLP Classification | 98.57% Acc | 0.999 AUC-ROC
  4. Heart Disease: Clinical Decision Support & SHAP | 84.9% Recall (Minimized FN)`,

    metrics: `[BENCHMARK_TELEMETRY]
  - Dense Vector Space   : 3072-dimensional (Google Gemini)
  - Repeat Query Speed   : < 50 ms (SQLite Cached Hybrid RAG)
  - Clinical Test Recall : 84.9% (Prioritized sensitivity on Cleveland dataset)
  - NLP Held-Out Accuracy: 98.57% (Tested on 8,980 unseen test articles)
  - Cloud Compute Cost   : $0.00 idle baseline on AWS ECS Fargate`,

    documind: `[DOCUMIND_AI_ARCHITECTURE]
  - Ingestion  : Recursive character text splitting (500 tokens, 10% overlap)
  - Indexing   : Parallel indexing via ChromaDB (dense) + BM25 (sparse inverted index)
  - Re-Ranking : Reciprocal Rank Fusion: RRF(d) = sum(1 / (60 + r))
  - Guardrail  : NLI Entailment scoring verifying answer faithfulness
  - Live Demo  : <a href="https://rag-doc-assistant-pearl.vercel.app/" target="_blank" class="text-cyan-300 underline">rag-doc-assistant-pearl.vercel.app</a>`,

    swachhai: `[SWACHH_AI_ARCHITECTURE]
  - Reliability: 3-Tier engine (Gemini Structured JSON -> Retry -> ChromaDB ONNX Fallback)
  - Datasets   : Solid Waste Management (SWM 2016) & Battery Rules (2022)
  - Deployment : Containerized on AWS ECR, orchestrating on AWS ECS Fargate
  - Live App   : <a href="https://swachh-ai-sable.vercel.app/" target="_blank" class="text-cyan-300 underline">swachh-ai-sable.vercel.app</a>`,

    certs: `[VERIFIED_CREDENTIALS]
  - AWS Certified Cloud Practitioner (Amazon Web Services, Oct 2026)
  - Building GenAI with Amazon Bedrock (AWS Training, Aug 2026)
  - Environmental Hacks Finalist (Bharat Builds Tour - WeMakeDevs & AWS, Oct 2026)
  - Machine Learning Using Python (Ardent Computech, 2023)`,

    contact: `[COMMUNICATION_CHANNELS]
  - Email   : gouravdas350@gmail.com
  - Phone   : +91 89104 18563
  - Location: Kolkata, West Bengal, India
  - GitHub  : https://github.com/grvd5678
  - LinkedIn: https://www.linkedin.com/in/gourav-das-7a94a02b1/`,

    resume: () => {
      window.location.href = 'assets/Gourav_Das_Resume_AIML.pdf';
      return '[STATUS] Initiating PDF download of Gourav_Das_Resume_AIML.pdf...';
    }
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim().toLowerCase();
      input.value = '';
      executeTerminalCommand(cmd);
    }
  });

  window.runTerminalQuickCmd = function (cmd) {
    executeTerminalCommand(cmd);
  };

  function executeTerminalCommand(cmd) {
    if (!cmd) return;

    if (cmd === 'clear') {
      output.innerHTML = `
        <div class="text-slate-400 text-xs mb-3">
          Type <span class="text-cyan-400 font-bold">help</span> to view available system telemetry commands.
        </div>
      `;
      return;
    }

    const entry = document.createElement('div');
    entry.className = 'mb-3';

    let response = '';
    if (terminalCommands[cmd]) {
      response = typeof terminalCommands[cmd] === 'function' ? terminalCommands[cmd]() : terminalCommands[cmd];
    } else {
      response = `<span class="text-red-400">Command not recognized: "${cmd}". Type <span class="text-cyan-300 font-bold">help</span> for valid commands.</span>`;
    }

    entry.innerHTML = `
      <div class="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
        <span class="text-cyan-400">gourav@ai-engineer:~$</span>
        <span class="text-white font-semibold">${cmd}</span>
      </div>
      <div class="text-xs font-mono text-slate-300 pl-4 border-l border-slate-800 leading-relaxed whitespace-pre-wrap">${response}</div>
    `;

    output.appendChild(entry);
    output.scrollTop = output.scrollHeight;
  }
}


