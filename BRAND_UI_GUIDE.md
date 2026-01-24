# 🎨 CxE Americas Step Tracker – Brand & UI Guide

> **Version:** 2.4.0  
> **Last Updated:** January 23, 2026

This document defines the visual identity, design tokens, and UI standards for the CxE Americas Step Tracker application.

---

## 🎨 Color Palette

### Primary Colors (Microsoft-Inspired)
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **MS Blue** | `#0078d4` | `0, 120, 212` | Primary actions, links, focus states |
| **MS Blue Dark** | `#106ebe` | `16, 110, 190` | Hover states, gradients |
| **MS Purple** | `#5c2d91` | `92, 45, 145` | Accents, gradients |
| **MS Teal** | `#008272` | `0, 130, 114` | Success accents |
| **MS Green** | `#107c10` | `16, 124, 16` | Success states |
| **MS Orange** | `#ff8c00` | `255, 140, 0` | Warnings |
| **MS Red** | `#d13438` | `209, 52, 56` | Errors, destructive actions |

### Neutral Colors (Gray Scale)
| Name | Hex | Usage |
|------|-----|-------|
| `--ms-gray-50` | `#faf9f8` | Subtle backgrounds |
| `--ms-gray-100` | `#f3f2f1` | Card backgrounds (alt) |
| `--ms-gray-200` | `#edebe9` | Borders, dividers |
| `--ms-gray-300` | `#e1dfdd` | Default borders |
| `--ms-gray-400` | `#d2d0ce` | Disabled states |
| `--ms-gray-500` | `#b3b0ad` | Placeholder text |
| `--ms-gray-600` | `#8a8886` | Secondary text |
| `--ms-gray-700` | `#605e5c` | Tertiary text |
| `--ms-gray-800` | `#3b3a39` | Dark backgrounds |
| `--ms-gray-900` | `#323130` | Primary text |

### Semantic Colors
```css
--bg-card: white;
--bg-hover: rgba(0, 120, 212, 0.1);
--text-primary: var(--ms-gray-900);
--text-secondary: var(--ms-gray-600);
--border-color: var(--ms-gray-300);
```

---

## 🌈 Gradients

### Primary Gradient
```css
background: linear-gradient(135deg, var(--ms-blue), var(--ms-purple));
```

### Success Gradient
```css
background: linear-gradient(135deg, var(--ms-green), var(--ms-teal));
```

### Rainbow Accent (Headers)
```css
background: linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4, #10b981, #f59e0b);
```

### Background Gradient (Page)
```css
background: linear-gradient(135deg, #0078d4, #5c2d91);
```

---

## 📐 Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | `0.25rem` (4px) | Tight spacing |
| `sm` | `0.5rem` (8px) | Compact elements |
| `md` | `1rem` (16px) | Default spacing |
| `lg` | `1.5rem` (24px) | Section spacing |
| `xl` | `2rem` (32px) | Large sections |
| `2xl` | `2.5rem` (40px) | Hero sections |

---

## 🔤 Typography

### Font Family
```css
font-family: 'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
```

### Font Weights
| Weight | Value | Usage |
|--------|-------|-------|
| Light | `300` | Large display text |
| Regular | `400` | Body text |
| Medium | `500` | Labels, buttons |
| Semi-bold | `600` | Headings, emphasis |
| Bold | `700` | Titles, strong emphasis |

### Font Sizes
| Name | Size | Line Height | Usage |
|------|------|-------------|-------|
| `xs` | `0.75rem` | 1.4 | Captions, badges |
| `sm` | `0.875rem` | 1.5 | Helper text, small labels |
| `base` | `1rem` | 1.6 | Body text |
| `lg` | `1.125rem` | 1.5 | Subheadings |
| `xl` | `1.25rem` | 1.4 | Section titles |
| `2xl` | `1.5rem` | 1.3 | Page titles |
| `3xl` | `1.875rem` | 1.2 | Hero text |

---

## 🔲 Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `sm` | `0.5rem` (8px) | Buttons, inputs |
| `md` | `0.75rem` (12px) | Cards, dropdowns |
| `lg` | `1rem` (16px) | Modals, large cards |
| `xl` | `1.5rem` (24px) | Hero cards, welcome screen |
| `full` | `50%` | Avatars, icons |

---

## 🌑 Shadows

### Card Shadow
```css
box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.15),
    0 10px 20px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
```

### Button Shadow (Primary)
```css
box-shadow: 0 4px 12px rgba(0, 120, 212, 0.25);
```

### Hover Shadow
```css
box-shadow: 0 6px 16px rgba(0, 120, 212, 0.35);
```

### Flyout/Modal Shadow
```css
box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.2),
    0 15px 35px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
```

---

## 🔘 Button Styles

### Primary Button
```css
.btn-primary {
    background: linear-gradient(135deg, var(--ms-blue), var(--ms-blue-dark));
    border: none;
    color: white;
    padding: 0.75rem 1.25rem;
    border-radius: 0.75rem;
    font-weight: 500;
    font-size: 0.95rem;
    min-height: 44px; /* Touch target */
    box-shadow: 0 4px 12px rgba(0, 120, 212, 0.25);
    transition: all 0.2s ease;
}

.btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 120, 212, 0.35);
}
```

### Secondary Button
```css
.btn-secondary {
    background: var(--bg-card);
    border: 2px solid var(--border-color);
    color: var(--text-primary);
    padding: 0.75rem 1.25rem;
    border-radius: 0.75rem;
    font-weight: 500;
    min-height: 44px;
    transition: all 0.2s ease;
}

.btn-secondary:hover {
    border-color: var(--ms-blue);
    background: var(--bg-hover);
}
```

---

## 📦 Card Patterns

### Standard Card
```css
.card {
    background: var(--bg-card);
    border-radius: 1rem;
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    padding: 1.5rem;
}
```

### Premium Card (with accent)
```css
.card-premium {
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    border: 1px solid rgba(0, 120, 212, 0.15);
    border-radius: 1rem;
    position: relative;
    overflow: hidden;
}

.card-premium::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--ms-blue), var(--ms-purple), var(--ms-teal));
}
```

---

## 📱 Form Elements

### Input Field
```css
input, select {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 2px solid var(--border-color);
    border-radius: 0.75rem;
    font-size: 1rem;
    background: var(--bg-card);
    color: var(--text-primary);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input:focus, select:focus {
    outline: none;
    border-color: var(--ms-blue);
    box-shadow: 0 0 0 3px rgba(0, 120, 212, 0.15);
}
```

### Labels
```css
label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--text-primary);
    font-size: 0.95rem;
}
```

---

## 🎭 Dark Theme

### Background
```css
[data-theme="dark"] {
    --bg-card: #1f2937;
    --bg-hover: rgba(59, 130, 246, 0.1);
    --text-primary: #f9fafb;
    --text-secondary: #d1d5db;
    --border-color: #4b5563;
}
```

### Card Adjustments
```css
[data-theme="dark"] .card {
    background: linear-gradient(135deg, rgba(31, 41, 55, 0.8) 0%, rgba(55, 65, 81, 0.6) 100%);
    border-color: rgba(96, 165, 250, 0.2);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
```

---

## ⚡ Animations & Transitions

### Standard Transition
```css
transition: all 0.2s ease;
```

### Smooth Transition
```css
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

### Hover Lift
```css
:hover {
    transform: translateY(-2px);
}
```

### Rainbow Shimmer (Accent Bars)
```css
@keyframes rainbowShimmer {
    0%, 100% { background-position: 300% 0; }
    50% { background-position: -100% 0; }
}

.accent-bar {
    background-size: 300% 100%;
    animation: rainbowShimmer 4s ease-in-out infinite;
}
```

---

## ♿ Accessibility

### Touch Targets
- Minimum size: **44px × 44px**
- Buttons, links, and interactive elements must meet this minimum

### Focus States
```css
:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 120, 212, 0.4);
}
```

### Color Contrast
- Text on light background: minimum **4.5:1** ratio
- Large text: minimum **3:1** ratio
- Use `--text-primary` for body text, `--text-secondary` for supplementary

### ARIA Attributes
- Use `aria-label` for icon-only buttons
- Use `aria-expanded` for expandable elements
- Use `role="dialog"` and `aria-modal="true"` for modals

---

## 📱 Responsive Breakpoints

| Name | Width | Usage |
|------|-------|-------|
| `sm` | `480px` | Small phones |
| `md` | `640px` | Large phones |
| `lg` | `768px` | Tablets |
| `xl` | `1024px` | Laptops |
| `2xl` | `1280px` | Desktops |

---

## 🧩 Component Library

### Icons
- **Library:** Font Awesome 6
- **Style:** Solid (`fas`) for primary, Brand (`fab`) for logos
- **Size:** `1rem` default, `1.25rem` for buttons

### Flyout/Modal Pattern
- Full-screen overlay: `rgba(0, 0, 0, 0.4)`
- Centered card with `max-width: 380px`
- Close button top-right
- Focus trap for accessibility

---

## 📁 File References

| File | Purpose |
|------|---------|
| `styles.css` | All CSS custom properties and components |
| `script.js` | Dark mode toggle, UI interactions |
| `index.html` | Main app structure |
| `manifest.json` | PWA theme colors |

---

## ✅ Checklist for New Components

- [ ] Uses CSS custom properties (no hardcoded colors)
- [ ] Has dark theme variant
- [ ] Touch target ≥ 44px
- [ ] Focus state defined
- [ ] Hover state with subtle lift/shadow
- [ ] Border-radius from scale
- [ ] Shadows from defined patterns
- [ ] Transitions are smooth (0.2s–0.3s)
- [ ] ARIA attributes for accessibility

---

*Maintained by CxE Americas Team*
