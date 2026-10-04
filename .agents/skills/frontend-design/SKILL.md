---
name: frontend-design
description: Engineering and architectural design standards for world-class Next.js/React frontend applications, layout systems, component composition, motion choreography, and sensory interactions.
---

# Frontend Design Skill

This skill governs high-craft web engineering, component ergonomics, responsive fluid design, micro-interactions, and multi-sensory feedback.

## 1. Component Architecture & State Modeling
- Clean decoupling between stateful layout controllers and presentational tactile components.
- Fluid transitions between viewpoints (e.g. Hero Overview ↔ Open Physical Book ↔ Interactive Cartography).
- Persisted state for user exploration history, completed quizzes, unlocked badges via `localStorage` with SSR-safe hydration.

## 2. Sensory Feedback & Dynamic Motion
- **Physics-driven transitions**: Use cubic-bezier curves mimicking natural mass and damping (`cubic-bezier(0.2, 0.8, 0.2, 1)`).
- **Web Audio Soundscapes**: Generative, non-blocking pentatonic synthesized audio for cultural resonance (bamboo flute, mountain breeze).
- **Voice Synthesis**: Web Speech API for native Vietnamese spoken narration with pitch and rate modulation.
- **Autonomous & Draggable Guide Agents**: Fluid drag physics with bounds checking, waypoint navigation, and dynamic thought bubbles.

## 3. Open Source Iconography
- Consistently utilize professional open-source iconography (`lucide-react`) across all states and categories.
- Replace any unstyled unicode emojis with accessible, scaled SVG icons.

## 4. Responsive Adaptation
- Fluid layout breakpoints: Mobile (<768px), Tablet (768px - 1024px), Desktop (>1024px).
- On mobile/small screens, convert double-page book spreads into smooth stacked or swipable vertical spreads while preserving spine and paper textures.
