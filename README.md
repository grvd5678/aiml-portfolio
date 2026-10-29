# Gourav Das — AI/ML & GenAI Engineer Portfolio

A responsive, high-performance web portfolio engineered for **AI/ML & GenAI Engineering roles**.

Built with a dark-mode **"Neural Mesh"** design aesthetic, featuring interactive architecture pipeline flows, live project categorization, metric callouts, and an interactive skills matrix.

---

## ⚡ Quick Start

### 1. View Locally
Simply double-click [`index.html`](file:///d:/Python/ai-ml%20portfolio/index.html) to open the portfolio directly in any modern web browser (Chrome, Edge, Firefox, Brave, Safari).

Alternatively, launch a lightweight local server:
```bash
# Using Python
python -m http.server 3000
```
Then navigate to `http://localhost:3000`.

---

## 🚀 Key Features

- **Neural Mesh Interactive Canvas**: Dynamic HTML5 particle-link canvas connecting nodes based on proximity and mouse interaction.
- **Hero & Identity**: Professional portrait, verified AWS Cloud Practitioner badge, and AI/ML specialization pills.
- **Interactive Project Filtering**: Instant categorization across `All`, `GenAI & RAG`, `ML & XAI`, and `Cloud & Serverless`.
- **🧪 Interactive Model & Architecture Inspector**:
  - **1. Hybrid RAG & RRF Simulator (DocuMind AI)**: Tests live queries, demonstrates Gemini 3072-dim Cosine vector search vs BM25 sparse keyword matches, calculates mathematical Reciprocal Rank Fusion ($1/(60+r)$), and validates automated NLI entailment faithfulness guardrails.
  - **2. SHAP Feature Attribution Explorer (Heart Disease XAI)**: Dynamic clinical parameter sliders (Age, Max Heart Rate, ST Depression, Chest Pain) driving real-time SHAP force plots with protective vs pathological directional values.
  - **3. NLP Token Influence & Calibration (Fake News AI)**: In-browser token discrimination weights using TF-IDF sublinear vectorizer with confidence probability gauge.
  - **4. AI Engineer CLI Terminal**: Embedded retro-futuristic shell (`help`, `metrics`, `documind`, `swachhai`, `certs`, `resume`, `contact`).
- **Telemetry Counter Animations**: Key engineering metrics (`3072-dim`, `<50ms`, `98.57%`, `84.9%`) animate smoothly once when scrolled into view.
- **System Architecture Modals**: Click **"View Architecture Flow"** on any project to inspect the multi-tier engineering pipelines:
  - **DocuMind AI**: Hybrid RAG (BM25 + Gemini 3072-dim vectors + Reciprocal Rank Fusion + Faithfulness Guardrail + <50ms SQLite Cache).
  - **Swachh.ai**: 3-tier regulatory decision engine on AWS ECS Fargate with deterministic ChromaDB ONNX fallback.
  - **Fake News Detection AI**: Stratified 70:10:20 NLP pipeline with 98.57% accuracy & 0.999 AUC-ROC on 8,980 unseen test samples.
  - **Explainable Heart Disease System**: Deduplicated Cleveland dataset (723 duplicates removed to 302 patients), 84.9% clinical recall, and SHAP TreeExplainer patient attribution.
- **Engineering Skill Matrix**: Categorized technical capabilities across GenAI, Applied ML, Backend/APIs, and AWS Cloud.
- **Experience Timeline & Certifications**: Detailed breakdown of LearnDepth Academy internship, Tata Strive AWS training, NIELIT Big Data bootcamp, and MAKAUT degree.
- **One-Click Actions**:
  - Direct PDF Resume download (`assets/Gourav_Das_Resume_AIML.pdf`).
  - Copy email to clipboard with animated toast notification.
  - Direct mailto contact trigger.

---

## 🌐 Live Deployed Applications & Links

| Application / Profile | Live Deployed Link | Tech Stack |
| :--- | :--- | :--- |
| **DocuMind AI** | [rag-doc-assistant-pearl.vercel.app](https://rag-doc-assistant-pearl.vercel.app/) | FastAPI, React 19, LangChain, ChromaDB, Gemini |
| **Swachh.ai** | [swachh-ai-sable.vercel.app](https://swachh-ai-sable.vercel.app/) | AWS ECS Fargate, Next.js 16, FastAPI, ChromaDB ONNX |
| **Fake News Detection AI** | [fake-news-detection.streamlit.app](https://fake-news-detection-ffbj9xbmxayxmkifc8fyje.streamlit.app/) | Scikit-Learn, TF-IDF, Streamlit |
| **Explainable Heart Disease** | [heart-disease-predictor.onrender.com](https://heart-disease-predictor-1j4t.onrender.com/) | Scikit-Learn, SHAP TreeExplainer, Flask |
| **LearnDepth ML API** | [ml-t2-090-model-complexity.onrender.com](https://ml-t2-090-model-complexity.onrender.com/) | Flask, Scikit-Learn ColumnTransformer REST API |
| **GitHub** | [github.com/grvd5678](https://github.com/grvd5678) | Open Source Repositories |
| **LinkedIn** | [linkedin.com/in/gourav-das-7a94a02b1](https://www.linkedin.com/in/gourav-das-7a94a02b1/) | Professional Network |

---

## 📂 Project Structure

```text
ai-ml portfolio/
├── assets/
│   ├── profile.jpg                      # Headshot portrait
│   └── Gourav_Das_Resume_AIML.pdf       # Downloadable resume
├── index.html                           # Main portfolio single-page application
├── style.css                            # Glassmorphism, animations, glow effects
├── script.js                            # Canvas animation, filtering, modal state
├── README.md                            # Documentation and guide
├── Gourav_Das_Resume_AIML_Only.pdf      # Source resume
└── WhatsApp Image 2026-06-16...jpeg     # Source image
```

---

## 🌐 Deploy to GitHub Pages / Vercel

### Deploying on GitHub Pages:
1. Initialize a git repository:
   ```bash
   git init
   git add .
   git commit -m "feat: initial ai-ml portfolio release"
   ```
2. Push to your GitHub repository and go to **Settings > Pages > Branch: main / root**.
3. Your portfolio will be live at `https://<username>.github.io/<repo-name>/`.

