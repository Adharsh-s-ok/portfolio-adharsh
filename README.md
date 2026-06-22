# portfolio-adharsh

High-end personal portfolio built with React, GSAP, and Three.js WebGL.

## ✨ Features

- **Galaxy particle system** — custom GLSL vertex/fragment shaders with mouse parallax and spiral rotation
- **Bloom post-processing** — WebGL glow effect via `@react-three/postprocessing`
- **Floating 3D geometry** — distorted icosahedron with spring physics
- **Magnetic cursor** — dot + ring with magnetic pull on interactive elements
- **GSAP preloader** — staggered panel exit + animated counter
- **SplitType text reveals** — per-character and per-line scroll animations
- **Lenis smooth scroll** — connected to GSAP ScrollTrigger
- **Editorial typography** — Cormorant Garamond serif + DM Sans sans
- **Hover transitions** — sliding nav links, work item reveals, underline grow

## 🛠 Stack

| Tool | Use |
|------|-----|
| React 18 + Vite | App foundation |
| Three.js + R3F | WebGL / 3D rendering |
| GSAP + ScrollTrigger | Animations |
| Lenis | Smooth scroll |
| SplitType | Text splitting |
| vite-plugin-glsl | Import .vert / .frag shaders |

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## 📁 Structure

```
src/
├── canvas/
│   ├── Experience.jsx        # Three.js scene (galaxy + orb)
│   └── shaders/
│       ├── galaxy.vert       # GLSL vertex shader
│       └── galaxy.frag       # GLSL fragment shader
├── components/
│   ├── Cursor/               # Magnetic custom cursor
│   ├── Loader/               # Animated preloader
│   ├── Nav/                  # Fixed navigation
│   ├── Hero/                 # WebGL hero section
│   ├── About/                # About + skills
│   ├── Work/                 # Project showcase
│   └── Contact/              # Contact + footer
└── App.jsx                   # Lenis + GSAP root
```

## 🎨 Design Tokens

```css
--bg:      #050505   /* deep black */
--fg:      #f0ede8   /* warm white */
--accent:  #c8a96e   /* gold */
--font-serif: 'Cormorant Garamond'
--font-sans:  'DM Sans'
```

---

Built by [Adharsh S](https://github.com/Adharsh-s-ok)
