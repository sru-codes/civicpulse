# CivicPulse BRICS — AI Digital Public Infrastructure Platform

> **A Digital Public Good aggregating multilingual citizen development requests across BRICS nations, triangulating demographic data, infrastructure deficit indices, and capital investment plans to surface demand hotspots and recommend high-priority projects for national policymakers.**

---

## Architecture Overview

CivicPulse BRICS operates as a sovereign Decision Support System (DSS) conforming to the **Digital Public Goods Standard (DPGA)** and the **New Development Bank (NDB) Interoperability Framework**.

### Key Subsystems:

1. **4-Way Triangulation Engine**
   - **Citizen Demand Density**: Aggregates localized grievances from IVR and messaging rails.
   - **Infrastructure Deficit Indices**: Quantitative benchmarks for potable water access, grid stability, all-weather road connectivity, and broadband coverage.
   - **Demographic Vulnerability**: Census data integration, Multidimensional Poverty Index (MPI), youth ratios, and rural-urban splits.
   - **CapEx Budget Shortfall**: Real-time deficit gap calculations surfacing misaligned allocations.

2. **Decentralized Multilingual Citizen Intake Rails**
   - Spoken IVR voice recording simulation in native dialects (Hindi, isiXhosa, Portuguese, Mandarin, Russian, Oromo).
   - WhatsApp and WeChat conversational bots with automated AI triage and SLA tracking codes (`CIT-XX-XXXXX`).

3. **Digital Twin Telemetry Grid**
   - Real-time condition assessment of municipal pumping stations, rural distribution substations, flood-prone culverts, and mountain broadband towers.

4. **AI Bankable Pipeline Recommender**
   - Synthesizes validated civic demand into procurement-ready infrastructure packages.
   - Transparent, non-opaque Explainable AI factor weights:
     - 30% Citizen Demand Density
     - 25% Infrastructure Deficit Gap
     - 20% Population Vulnerability
     - 15% CapEx Misalignment
     - 10% Climate & Urgency Risk

5. **Capital Allocation Sandbox**
   - Interactive fiscal simulator ($50M to $600M) allowing ministers to model cross-sector distributions and forecast deficit reduction curves and sovereign ESG co-financing ROI.

---

## Design System & Standards Compliance

- **Zero Emojis**: Complies with rigorous institutional standards using strictly vector SVG iconography from [Tabler Icons](https://github.com/tabler/tabler-icons.git).
- **React-Bits Micro-Animations**: Interactive components inspired by [React-Bits](https://github.com/DavidHDev/react-bits.git) (`ShinyText`, `CountUp`, `SpotlightCard`, `TrueFocus`, `DecryptedText`, `Magnet`).
- **WCAG AAA Compliance**: Tri-mode color system with high-contrast accessibility mode, government emerald light theme, and obsidian dark theme.

---

## How to Push this Repository to GitHub

### Step 1: Create a Repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Name your repository (e.g. `civicpulse-brics` or `civicpulser`).
3. Leave it empty (without initializing README, .gitignore, or license).

### Step 2: Push Local Commits
In your terminal, run:

```bash
# Add your GitHub remote
git remote add origin https://github.com/<YOUR-GITHUB-USERNAME>/<YOUR-REPO-NAME>.git

# Ensure main branch
git branch -M main

# Push code to GitHub
git push -u origin main
```

*(Note: If prompted for password, generate and use a GitHub **Personal Access Token (classic)** with `repo` scope from GitHub Settings -> Developer Settings -> Personal access tokens).*

---

## Local Development

```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Build for production
npm run build
```

---

## License

Licensed under the **Apache License, Version 2.0** (Digital Public Good compliant).
