---
name: heritage-ui-craft
description: Professional workflow and guidelines for crafting hyper-realistic vintage heritage notebooks, tactile paper textures, and culturally authentic Northwest Vietnam UI components.
---

# Heritage UI Craft Skill

This skill defines the technical, aesthetic, and cultural standards for developing interactive heritage applications and tactile editorial journals.

## 1. Visual & Tactile Principles
- **Natural Materials**: Base surfaces on real materials: Dó paper (Giấy Dó), Xuan paper, aged parchment, embossed calfskin leather, hand-carved cinnabar woodblock seals.
- **Color Philosophy**:
  - Avoid stark white (`#ffffff`) or pure black (`#000000`).
  - Use ivory parchment (`#faf6ee`, `#f4ecdc`), warm aged paper (`#ece1cc`).
  - Deep natural ink (`#382823`, `#5c443b`).
  - Cinnabar red (`#a6382a`) for historical seals and stamps.
  - Antiqued brass & leaf gold (`#b58c49`, `#d4af6d`).
  - Muted forest/sage greens (`#456d4e`, `#5e7a63`).
- **Physical Depth**:
  - Center gutter book spine shadow with bi-directional gradient.
  - Real stitched leather borders and brass corner clasps.
  - Page curl illusions on right-hand page bottoms.

## 2. Iconography Standards
- Use open-source SVG icon systems exclusively (e.g. `lucide-react`).
- Prohibit generic system emojis for core navigation or academic labels.
- Standard mappings:
  - History & Antiquity: `Landmark`, `Scroll`, `Hourglass`
  - Geography & Landscape: `Mountain`, `Trees`, `Compass`
  - Culture & Education: `GraduationCap`, `Flame`, `BookMarked`
  - Challenge & Assessment: `Pencil`, `HelpCircle`, `CheckCircle2`
  - Trivia & Discoveries: `Lightbulb`, `Sparkles`, `Info`
  - Badges & Passport: `Compass`, `Scroll`, `Crown`, `Award`

## 3. Interactive Agentic Guide Integration
- Virtual guides must feature contextual autonomy:
  - Guided Tour Mode with waypoint transitions.
  - Speech synthesis via Web Speech API in native Vietnamese.
  - Reactive dialogue triggers corresponding to active page state.
