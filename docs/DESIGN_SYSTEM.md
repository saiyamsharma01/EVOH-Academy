# EVOH Academy - Design System & Creative Direction

> **Brand Personality**: Intelligent, premium, calm, academic, modern, precise, trustworthy, aspirational.  
> **Aesthetic Philosophy**: Editorial elegance inspired by premium science publications, mathematical rigor, and art-directed academic journals. Avoids generic AI landing page clichés, purple-blue gradient soup, and placeholder templates.

---

## 1. Color Palette & Dynamic CSS Tokens

All colors are mapped to CSS variables originating from `SiteSetting.theme`, enabling dynamic brand customization with automated WCAG AA contrast verification.

### 1.1 Core Swatches

| Role | Color Name | Hex Code | HSL / CSS Variable | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Surface / Light** | Warm Ivory | `#FDFBF7` | `--surface-base: 40 40% 98%` | Primary background, clean and easy on eyes |
| **Surface / Muted** | Editorial Parchment | `#F4F0E8` | `--surface-muted: 40 25% 93%` | Cards, secondary panels, bordered containers |
| **Contrast / Dark** | Deep Midnight Navy | `#0B132B` | `--surface-dark: 224 59% 11%` | Hero canvas, footer, science visualization sections |
| **Contrast / Accent** | Slate Navy | `#1C2541` | `--surface-dark-card: 226 40% 18%` | Cards and elevated containers within dark sections |
| **Primary Accent** | Academic Cobalt | `#1D4ED8` | `--primary: 224 76% 48%` | Primary CTAs, active links, key highlights |
| **Primary Hover** | Electric Cobalt | `#2563EB` | `--primary-hover: 221 83% 53%` | Hover and focus rings |
| **Interactive Glow**| Quantum Cyan | `#06B6D4` | `--accent-cyan: 189 94% 43%` | Scientific notation, orbital particle details, 3D accents |
| **Secondary Accent**| Restrained Violet | `#6366F1` | `--accent-violet: 239 84% 67%` | Subject tags, formula badges, subtle highlights |
| **Text Primary** | Deep Ink Charcoal | `#0F172A` | `--text-primary: 222 47% 11%` | High contrast editorial body and headings |
| **Text Muted** | Slate Graphite | `#475569` | `--text-muted: 215 16% 47%` | Subtitles, meta info, secondary copy |
| **Border / Rule** | Scientific Grid Line | `rgba(15, 23, 42, 0.08)` | `--border-subtle` | Elegant structural hairline dividing lines |

---

## 2. Typography Scale & Editorial Rhythm

- **Display & Headings**: `Manrope` or `Plus Jakarta Sans` (`font-display`). Crisp, geometric, authoritative.
- **Body & Prose**: `Inter` (`font-sans`). Exceptional legibility across small mobile screens and high-density retina displays.
- **Formulas & Science Accents**: `JetBrains Mono` / `KaTeX` notation styling for scientific rigor.

| Scale Token | Font Size | Line Height | Tracking | Recommended Usage |
| :--- | :--- | :--- | :--- | :--- |
| `display-2xl` | 3.75rem (60px) | 1.1 | -0.025em | Main Hero headline |
| `display-xl` | 3.00rem (48px) | 1.15 | -0.02em | Section titles, major category portals |
| `display-lg` | 2.25rem (36px) | 1.25 | -0.015em | Resource detail titles, page headers |
| `heading-md` | 1.50rem (24px) | 1.35 | -0.01em | Card headers, chapter titles |
| `heading-sm` | 1.125rem (18px)| 1.4 | 0 | Sub-elements, block subtitles |
| `body-base` | 1.00rem (16px) | 1.65 | 0 | Standard editorial paragraphs (max 65-75 ch) |
| `body-sm` | 0.875rem (14px)| 1.5 | +0.01em | Metadata, tag chips, price footnotes |
| `caption` | 0.75rem (12px) | 1.4 | +0.02em | Micro labels, timestamps, version tags |

---

## 3. Scientific Visual Elements & 3D Integration

### 3.1 Hero 3D Scene (`R3F + Drei`)
- **Theme**: Quantum Orbital & Molecular Crystal Lattice.
- **Geometry**: Custom procedural nodes with interactive gravitational response to subtle mouse movement.
- **Fallback**: Pre-rendered vector SVG illustration seamlessly displayed when WebGL is unavailable, reduced motion is requested, or on low-power devices.
- **Performance Budget**: Initial JS excluding 3D < 200 KB gzipped; 3D chunk < 250 KB gzipped; framerate-monitored.

### 3.2 Subject Visual Language
- **Physics**: Wave mechanics, electromagnetic field vectors, kinetic paths.
- **Chemistry**: Molecular orbital hybridization, periodic crystalline lattices.
- **Mathematics**: Calabi-Yau surface projections, hyperbolic curves, coordinate manifolds.

---

## 4. Component Inventory & Geometry

1. **Buttons**:
   - `Primary`: Cobalt fill, slight inner bevel, subtle hover translation (-1px), solid contrast.
   - `Secondary / Outline`: Transparent surface with crisp 1px border (`--border-subtle`), hover parchment tint.
   - `Ghost`: Minimalist icon + text, high accessibility tap target (min 44px).
2. **Resource Cards**:
   - Clean editorial border, clear class/subject badges, thumbnail cover with sample watermark, transparent pricing display (discounted strike-through only if genuine active discount exists).
3. **Dynamic Page Blocks**:
   - Modally editable from Admin, fully responsive, zero layout shift (CLS < 0.1).
4. **Dev Component Gallery**:
   - Available in development at `/_design` to inspect all tokens, buttons, cards, states, and responsive breakpoints.
