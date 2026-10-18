---
version: 2.0-alpha
name: Upsell-experience
description: |
  UpLayer's design system projects modern efficiency and hospitality-focused
  clarity through a crisp, minimalist aesthetic. The interface balances warm,
  inviting moments—evident in the coral accent tones and rounded typography—with
  clean, professional structure that speaks to enterprise software reliability.
  The primary blue (#0F65F4) serves as the dominant brand voice, anchoring trust
  and action throughout. Subtle depth emerges from carefully layered
  micro-shadows and refined color blocking rather than dramatic elevation
  changes. The system favors generous whitespace, sharp geometric forms (zero
  border radius throughout), and a restrained, purposeful palette that
  prioritizes clarity for booking and hospitality workflows.
source:
  url: "https://upsell-experience.uplayer.agency"
  pagesAnalyzed: 1
  extractedAt: 2026-10-18
  tokensMeasured: true
colors:
  primary: "#0F65F4"
  accent: "#FF9E00"
  canvas: "#FFFFFF"
  surface: "#0A1430"
  surface-alt: "#020617"
  on-primary: "#FFFFFF"
  ink: "#334155"
  body: "#64748B"
  muted: "#CFE0FF"
  hairline: "#DBE7FB"
  success: "#00B894"
  accent-1: "#475569"
  accent-2: "#0B1B3A"
  accent-3: "#1E293B"
  accent-4: "#A8B6CC"
  accent-5: "#8FA6CE"
  accent-6: "#5A9AFF"
  neutral-1: "#D1D3D7"
typography:
  display-xxl:
    fontFamily: "Stack Sans Notch"
    fontSize: 302.4px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -7.56px
  display-xl:
    fontFamily: "Stack Sans Notch"
    fontSize: 72px
    fontWeight: 500
    lineHeight: 0.92
    letterSpacing: 0px
  display-xl-strong:
    fontFamily: "Stack Sans Notch"
    fontSize: 72px
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: 0px
  display-lg:
    fontFamily: "Stack Sans Notch"
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0px
  display-lg-tight:
    fontFamily: "Stack Sans Notch"
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0px
  display-lg-2:
    fontFamily: "Stack Sans Notch"
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: 0px
  heading-md:
    fontFamily: "Bricolage Grotesque"
    fontSize: 30px
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: 0px
  heading-sm:
    fontFamily: "Stack Sans Headline"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0px
  heading-xs:
    fontFamily: "Stack Sans Headline"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0px
  quote:
    fontFamily: "Bricolage Grotesque"
    fontSize: 30px
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: 0px
  body-lg:
    fontFamily: "Stack Sans Text"
    fontSize: 18px
    fontWeight: 300
    lineHeight: 1.6
    letterSpacing: 0px
  body-lg-strong:
    fontFamily: "Stack Sans Headline"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.56
    letterSpacing: 0px
  body-md:
    fontFamily: "Stack Sans Text"
    fontSize: 16px
    fontWeight: 300
    lineHeight: 1.5
    letterSpacing: 0px
  body-md-strong:
    fontFamily: "Stack Sans Headline"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: 0px
  body-md-tight:
    fontFamily: "Stack Sans Text"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.38
    letterSpacing: 0px
  body-sm:
    fontFamily: "Stack Sans Text"
    fontSize: 15px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0px
  button-md:
    fontFamily: "Stack Sans Text"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0px
  button-md-strong:
    fontFamily: "Stack Sans Text"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0px
  label-sm:
    fontFamily: "Stack Sans Text"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.43
    letterSpacing: 0px
  label-sm-strong:
    fontFamily: "Stack Sans Text"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: 0px
  caption:
    fontFamily: "Stack Sans Text"
    fontSize: 12px
    fontWeight: 300
    lineHeight: 1.33
    letterSpacing: 1.2px
    textTransform: uppercase
rounded:
  none: 0px
spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 20px
  xl: 24px
  xxl: 32px
  xxxl: 36px
  section: 40px
  band: 48px
borderWidths:
  thin: 1px
  medium: 2px
shadows:
  sm: "rgba(15, 23, 42, 0.45) 0px 24px 48px -12px"
  md: "rgba(15, 23, 42, 0.28) 0px 24px 48px -16px"
  lg: "rgba(15, 23, 42, 0.35) 0px 20px 40px -16px"
  xl: "rgba(15, 23, 42, 0.35) 0px 16px 32px -14px"
elevationStrategy: layered-micro
themes:
  derived: dark   # the other theme is the site's measured palette
  light:
    bg: "#FFFFFF"
    surface: "#0A1430"
    surfaceRaised: "#0C1631"
    text: "#334155"
    textMuted: "#64748B"
    border: "#DBE7FB"
    accent: "#0F65F4"
    accentFg: "#FFFFFF"
    focusRing: "#0F65F4"
    elevation: shadow
  dark:
    bg: "#090D16"
    surface: "#181C24"
    surfaceRaised: "#242830"
    text: "#F5F9FF"
    textMuted: "#9B9FA6"
    border: "#30343B"
    accent: "#367EF6"
    accentFg: "#0B0B0C"
    focusRing: "#0F65F4"
    elevation: "border+surface"
  contrastFailures:
    - "light: text on surface = 1.75:1 (needs 4.5:1)"
gradients:
  - context: hero
    kind: radial
    value: "radial-gradient(circle, rgb(209, 211, 215) 1.25px, rgba(0, 0, 0, 0) 1.25px)"
  - context: hero
    kind: radial
    value: "radial-gradient(rgba(15, 101, 244, 0.18), rgba(0, 0, 0, 0) 70%)"
    filter: "blur(40px)"
  - context: hero
    kind: radial
    value: "radial-gradient(rgba(15, 101, 244, 0.14), rgba(90, 154, 255, 0.06) 45%, rgba(0, 0, 0, 0) 72%)"
    filter: "blur(64px)"
  - context: hero
    kind: radial
    value: "radial-gradient(rgba(15, 101, 244, 0.22), rgba(90, 154, 255, 0.08) 50%, rgba(0, 0, 0, 0) 75%)"
    filter: "blur(64px)"
  - context: section
    kind: linear
    value: "linear-gradient(90deg, rgb(71, 175, 255) 0%, rgb(27, 73, 241) 100%)"
  - context: section
    kind: linear
    value: "linear-gradient(to right in oklab, rgb(1, 132, 248) 0%, rgb(27, 73, 241) 100%)"
components:
  button-filled:
    textColor: "{colors.accent-3}"
    border: "1px solid rgb(59, 130, 246)"
    height: 56px
    padding: "0px 20px 0px 20px"
    fontSize: 18px
    fontFamily: "Stack Sans Text"
    fontWeight: 500
    lineHeight: 1.56
    backgroundColor: "rgb(239, 246, 255)"
  button-filled-2:
    textColor: "{colors.accent-3}"
    height: 56px
    padding: "0px 20px 0px 20px"
    fontSize: 18px
    fontFamily: "Stack Sans Text"
    fontWeight: 400
    lineHeight: 1.56
    backgroundColor: "rgb(245, 245, 245)"
  button-text:
    typography: "{typography.label-sm}"
    textColor: "{colors.on-primary}"
    height: 32px
    backgroundColor: "oklab(0.999994 0.0000455678 0.0000200868 / 0.1)"
  button-primary:
    textColor: "{colors.on-primary}"
    height: 40px
    padding: "0px 16px 0px 16px"
    fontSize: 14px
    fontFamily: "Stack Sans Text"
    fontWeight: 600
    lineHeight: 1.43
    backgroundColor: "{colors.primary}"
  button-outline:
    typography: "{typography.button-md-strong}"
    textColor: "{colors.primary}"
    border: "2px solid {colors.primary}"
    height: 56px
    padding: "0px 28px 0px 28px"
  button-outline-sm:
    typography: "{typography.button-md-strong}"
    textColor: "{colors.on-primary}"
    border: "2px solid {colors.canvas}"
    height: 48px
    padding: "0px 20px 0px 20px"
  input:
    textColor: "{colors.accent-2}"
    height: 34px
    padding: "0px 6px 0px 6px"
    fontSize: 14px
    fontFamily: "Stack Sans Text"
    fontWeight: 600
    lineHeight: 1.43
  card:
    typography: "{typography.button-md}"
    textColor: "{colors.ink}"
  navigation:
    typography: "{typography.button-md}"
    textColor: "{colors.ink}"
    height: 72px
  footer:
    typography: "{typography.button-md}"
    textColor: "{colors.on-primary}"
    backgroundColor: "{colors.surface-alt}"
  link:
    typography: "{typography.button-md}"
    textColor: "oklab(0.999994 0.0000455677 0.0000200868 / 0.7)"
    border: "1px solid oklab(0.999994 0.0000455678 0.0000200868 / 0.15)"
    backgroundColor: "oklab(0.999994 0.0000455678 0.0000200868 / 0.05)"
  link-lg:
    typography: "{typography.button-md-strong}"
    textColor: "{colors.on-primary}"
    border: "1px solid rgb(38, 55, 95)"
    padding: "0px 16px 0px 16px"
states:
  other-hover:
    target: other
    state: hover
    backgroundColor: "rgb(148, 163, 184)"
  other-focus:
    target: other
    state: focus
    borderColor: "{colors.primary}"
  other-disabled:
    target: other
    state: disabled
    opacity: 0.4
breakpoints:
  - width: 375
    containerWidth: 375
    gridColumns: 7
    navLinksVisible: 1
    menuToggleVisible: true
    headingPx: 42
    bodyPx: 16
    sectionPaddingX: 0
  - width: 768
    containerWidth: 768
    gridColumns: 7
    navLinksVisible: 1
    menuToggleVisible: true
    headingPx: 60
    bodyPx: 16
    sectionPaddingX: 0
  - width: 1024
    containerWidth: 1024
    gridColumns: 7
    navLinksVisible: 8
    menuToggleVisible: false
    headingPx: 72
    bodyPx: 16
    sectionPaddingX: 0
  - width: 1280
    containerWidth: 1280
    gridColumns: 7
    navLinksVisible: 8
    menuToggleVisible: false
    headingPx: 72
    bodyPx: 16
    sectionPaddingX: 0
  - width: 1440
    containerWidth: 1280
    gridColumns: 7
    navLinksVisible: 8
    menuToggleVisible: false
    headingPx: 72
    bodyPx: 16
    sectionPaddingX: 0
coverage:
  statesFound: 37
  gradientsFound: 8
  rolesUnassigned: 7
  archetypesUnnamed: 0
  archetypesDetected: 0
  responsiveMeasured: true
  stylesheetsBlocked: true
  semanticRampDeclared: true
---

# Design System Inspired by UpLayer

> **v2.0** — re-measured from `upsell-experience.uplayer.agency` (2026-10-18),
> replacing the v1 extraction of `uplayer.agency` (2026-10-07). Headline change:
> the primary brand color moves from amber `#FF9E00` to blue `#0F65F4`; amber is
> demoted to the secondary accent (highlights and decorative emphasis only).

## 1. Visual Theme & Atmosphere

UpLayer's design system projects modern efficiency and hospitality-focused clarity through a crisp, minimalist aesthetic. The interface balances warm, inviting moments—evident in the coral accent tones and rounded typography—with clean, professional structure that speaks to enterprise software reliability. The primary blue (`{colors.primary}` — `#0F65F4`) serves as the dominant brand voice, anchoring trust and action throughout. Subtle depth emerges from carefully layered micro-shadows and refined color blocking rather than dramatic elevation changes. The system favors generous whitespace, sharp geometric forms (zero border radius throughout), and a restrained, purposeful palette that prioritizes clarity for booking and hospitality workflows.

**Key Characteristics**
- Sharp, geometric form language — no border radius on core interactive components
- Micro-layered shadow elevation strategy for subtle depth without visual noise
- Restrained, semantic color palette with strategic brand blue activation
- Generous whitespace and breathing room between sections
- Clean, sans-serif typography hierarchy supporting rapid scanning
- Hospitality-centric messaging paired with enterprise-grade structure

## 2. Color Palette & Roles

### Primary
- **Primary / Brand** (`{colors.primary}` — `#0F65F4`): Primary CTA buttons, active states, brand mark, link highlights, and key interactive affordances
- **Accent** (`{colors.accent}` — `#FF9E00`): Secondary accent for hero bands, highlights, and decorative emphasis

### Interactive
- **Success** (`{colors.success}` — `#00B894`): Confirmation, approval, and positive completion states

### Neutral Scale
- **Canvas** (`{colors.canvas}` — `#FFFFFF`): Default page background and label color on brand surfaces
- **Ink** (`{colors.ink}` — `#334155`): Primary heading and text color, high contrast
- **Body** (`{colors.body}` — `#64748B`): Body copy and secondary text
- **Muted** (`{colors.muted}` — `#CFE0FF`): Captions, secondary text, and reduced-emphasis labels

### Surface & Borders
- **Surface** (`{colors.surface}` — `#0A1430`): Card and panel backgrounds, dark theme containers
- **Surface Alt** (`{colors.surface-alt}` — `#020617`): Alternating section bands and footer
- **Hairline** (`{colors.hairline}` — `#DBE7FB`): 1px borders, dividers, and subtle separation
- **Neutral Secondary** (`{colors.neutral-1}` — `#D1D3D7`): Additional neutral surface role

### Decorative
- **Accent Slate** (`{colors.accent-1}` — `#475569`): Decorative use only
- **Accent Navy Dark** (`{colors.accent-2}` — `#0B1B3A`): Decorative use only
- **Accent Slate Dark** (`{colors.accent-3}` — `#1E293B`): Decorative use only
- **Accent Periwinkle Light** (`{colors.accent-4}` — `#A8B6CC`): Decorative use only
- **Accent Periwinkle** (`{colors.accent-5}` — `#8FA6CE`): Decorative use only
- **Accent Blue** (`{colors.accent-6}` — `#5A9AFF`): Decorative use only

## 3. Typography Rules

### Font Family

**Primary (Display & Headlines):** Stack Sans Notch, Stack Sans Headline, sans-serif
**Secondary (Body & UI):** Stack Sans Text, sans-serif
**Display Alt:** Bricolage Grotesque, sans-serif

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display XXL | Stack Sans Notch | 302px | 600 | 1.0 | -7.56px | Hero scale, extreme letter-spacing compression |
| Display XL Strong | Stack Sans Notch | 72px | 700 | 1.08 | 0px | Largest standard heading |
| Display XL | Stack Sans Notch | 72px | 500 | 0.92 | 0px | Hero headings |
| Display LG | Stack Sans Notch | 48px | 600 | 1.25 | 0px | Major section headings |
| Display LG Tight | Stack Sans Notch | 48px | 600 | 1.2 | 0px | Compressed variant |
| Display LG 2 | Stack Sans Notch | 48px | 600 | 1.15 | 0px | Alternate tight variant |
| Heading MD | Bricolage Grotesque | 30px | 600 | 1.35 | 0px | Secondary heading size |
| Heading SM | Stack Sans Headline | 20px | 600 | 1.25 | 0px | Card titles, subsections |
| Heading XS | Stack Sans Headline | 18px | 600 | 1.25 | 0px | Small section headers |
| Body LG | Stack Sans Text | 18px | 300 | 1.6 | 0px | Large body text |
| Body LG Strong | Stack Sans Headline | 18px | 600 | 1.56 | 0px | Emphasized large body |
| Body MD | Stack Sans Text | 16px | 300 | 1.5 | 0px | Primary body copy |
| Body MD Strong | Stack Sans Headline | 16px | 600 | 1.5 | 0px | Bold body text |
| Body MD Tight | Stack Sans Text | 16px | 600 | 1.38 | 0px | Condensed body variant |
| Body SM | Stack Sans Text | 15px | 500 | 1.5 | 0px | Secondary body text |
| Button MD | Stack Sans Text | 16px | 400 | 1.5 | 0px | Standard button label |
| Button MD Strong | Stack Sans Text | 16px | 500 | 1.5 | 0px | Emphasized button label |
| Label SM | Stack Sans Text | 14px | 500 | 1.43 | 0px | Form labels, captions |
| Label SM Strong | Stack Sans Text | 14px | 600 | 1.5 | 0px | Strong form labels |
| Caption | Stack Sans Text | 12px | 300 | 1.33 | 1.2px | Uppercase metadata, text-transform applied |
| Quote | Bricolage Grotesque | 30px | 400 | 1.35 | 0px | Pull quotes, testimonials |

### Principles
- Display sizes compress with negative letter-spacing (up to `-7.56px` on hero scales) to create visual impact
- Body copy uses generous line heights (1.5–1.6) for readability at runtime
- Serif-free stack; all fonts are geometric sans-serif for contemporary clarity
- Heading weights start at 600, climbing to 700 for maximum emphasis
- Caption styling applies `text-transform: uppercase` with tracking of `1.2px`
- Font stack falls back to system sans-serif; Google Fonts are loaded asynchronously

## 4. Component Stylings

### Buttons

**Primary**
- Background: `{colors.primary}` (`#0F65F4`)
- Text Color: `{colors.canvas}` (`#FFFFFF`)
- Font: `{typography.button-md-strong}` (16px, weight 600)
- Padding: `0px 16px`
- Height: 40px
- Width: auto
- Border: none
- Border Radius: `{rounded.none}` (0px)
- Box Shadow: none

**Outline (Large)**
- Background: transparent
- Text Color: `{colors.primary}` (`#0F65F4`)
- Font: `{typography.body-sm}` (15px, weight 500)
- Padding: `0px 28px`
- Height: 56px
- Width: auto
- Border: 2px solid `{colors.primary}` (`#0F65F4`)
- Border Radius: `{rounded.none}` (0px)
- Box Shadow: none
- Hover: Border color becomes `#0F65F4`, background lightens to blue tint

**Outline Small (White)**
- Background: transparent
- Text Color: `{colors.canvas}` (`#FFFFFF`)
- Font: `{typography.body-md}` (16px, weight 500)
- Padding: `0px 20px`
- Height: 48px
- Width: auto
- Border: 2px solid `{colors.canvas}` (`#FFFFFF`)
- Border Radius: `{rounded.none}` (0px)
- Box Shadow: none

**Filled Light**
- Background: `#EFF6FF`
- Text Color: `#1E293B`
- Font: `{typography.button-md-strong}` (16px, weight 500)
- Padding: `0px 20px`
- Height: 56px
- Width: auto
- Border: 1px solid `#3B82F6`
- Border Radius: `{rounded.none}` (0px)
- Box Shadow: none

**Filled Neutral**
- Background: `#F5F5F5`
- Text Color: `#1E293B`
- Font: `{typography.button-md}` (16px, weight 400)
- Padding: `0px 20px`
- Height: 56px
- Width: auto
- Border: 1px solid transparent
- Border Radius: `{rounded.none}` (0px)
- Box Shadow: none

**Text (White Transparent)**
- Background: `rgba(255, 255, 255, 0.1)`
- Text Color: `{colors.canvas}` (`#FFFFFF`)
- Font: `{typography.label-sm-strong}` (14px, weight 600)
- Padding: `0px`
- Height: 32px
- Width: auto
- Border: none
- Border Radius: `{rounded.none}` (0px)
- Box Shadow: none
- Hover: Opacity increases to 1

### Inputs & Forms

**Default**
- Background: transparent
- Text Color: `#0B1B3A`
- Font: `{typography.label-sm-strong}` (14px, weight 600)
- Padding: `0px 6px`
- Height: 34px
- Border: 1px solid transparent (or context-dependent)
- Border Radius: `{rounded.none}` (0px)
- Focus: Border color becomes `{colors.primary}` (`#0F65F4`), outline applied
- Disabled: Opacity reduced to 0.4

### Cards & Containers

**Default**
- Background: transparent or context-inherited
- Text Color: `{colors.ink}` (`#334155`)
- Font: `{typography.body-md}` (16px, weight 400)
- Padding: `0px` (layout dependent)
- Border: none (or 1px context-dependent)
- Border Radius: `{rounded.none}` (0px)
- Box Shadow: depth applied via elevation scale (see Section 6)

**Surface Card (Dark)**
- Background: `{colors.surface}` (`#0A1430`)
- Text Color: `{colors.canvas}` (`#FFFFFF`)
- Border Radius: `{rounded.none}` (0px)
- Box Shadow: `rgba(15, 23, 42, 0.45) 0px 24px 48px -12px` (sm level)

### Navigation

**Header Default**
- Background: `{colors.canvas}` (`#FFFFFF`)
- Text Color: `{colors.ink}` (`#334155`)
- Font: `{typography.body-md}` (16px, weight 400)
- Padding: varies by screen
- Height: 72px (desktop)
- Border: none
- Box Shadow: none

**Navigation Links**
- Text Color: `{colors.ink}` (`#334155`)
- Font: `{typography.body-md}` (16px, weight 400)
- Hover: Text color becomes `{colors.primary}` (`#0F65F4`)

### Footer

**Default**
- Background: `{colors.surface-alt}` (`#020617`)
- Text Color: `{colors.canvas}` (`#FFFFFF`)
- Font: `{typography.button-md}` (16px, weight 400)
- Padding: section-based spacing
- Border: none
- Box Shadow: none

## 5. Layout Principles

### Spacing System

Base unit: `{spacing.xs}` (8px)

**Full Scale:**
- `{spacing.xxs}` (4px) — Micro-spacing between inline elements
- `{spacing.xs}` (8px) — Tight element grouping
- `{spacing.sm}` (12px) — Compact sections
- `{spacing.md}` (16px) — Standard content padding and gaps
- `{spacing.lg}` (20px) — Medium section separation
- `{spacing.xl}` (24px) — Large feature padding
- `{spacing.xxl}` (32px) — Major section breaks
- `{spacing.xxxl}` (36px) — Large breathing room
- `{spacing.section}` (40px) — Section vertical rhythm
- `{spacing.band}` (48px) — Hero/band padding, maximum separation

**Usage Context:**
- Button padding: `{spacing.md}` (16px)
- Card padding: `{spacing.xl}` to `{spacing.xxl}` (24–32px)
- Section vertical padding: `{spacing.section}` to `{spacing.band}` (40–48px)
- Inline gaps: `{spacing.xs}` to `{spacing.md}` (8–16px)

### Grid & Container

- Max width: 1280px on 1440px+ viewports; full bleed below
- Column count: 7 columns across all breakpoints (measured)
- Section padding (horizontal): 0px (full-width sections, internal padding managed by containers)
- Standard gutter: `{spacing.md}` (16px) between grid items
- Hero sections: full viewport width with internal content centering

### Whitespace Philosophy

Whitespace is treated as a primary design tool. Large sections breathe with `{spacing.band}` (48px) vertical padding. Body copy sits in generously padded containers with minimum `{spacing.xl}` (24px) margins. Hero messaging floats center with substantial top and bottom clearance. Navigation and footers use compact `{spacing.md}` (16px) padding, maintaining visual hierarchy without overwhelming the page.

### Border Radius Scale

- `{rounded.none}` (0px) — Applied to all interactive components: buttons, inputs, cards, images

The system uses sharp, geometric forms throughout. No pill-shaped or rounded corners exist in the core component library. This creates a contemporary, structured aesthetic that reinforces enterprise reliability.

## 6. Depth & Elevation

Elevation is achieved through color blocking and micro-layered shadows rather than dramatic dimensional changes.

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | No shadow, background only | Base page, surfaces at rest |
| SM | `rgba(15, 23, 42, 0.45) 0px 24px 48px -12px` | Floating cards, hover modals, primary floating elements |
| MD | `rgba(15, 23, 42, 0.28) 0px 24px 48px -16px` | Secondary floating cards, popovers |
| LG | `rgba(15, 23, 42, 0.35) 0px 20px 40px -16px` | Tertiary elevation, tooltips |
| XL | `rgba(15, 23, 42, 0.35) 0px 16px 32px -14px` | Maximum elevation for modals, overlays |

**Shadow Philosophy:**

All shadows use a single offset-shadow layer (negative vertical offset with blur/spread) applied over transparent placeholder layers. This creates a barely-perceptible lift without volumetric depth. The darkened shadow color (`rgba(15, 23, 42, ...)`) is calibrated to feel like soft ambient shadow rather than hard drop-shadow. Opacity values range from 0.28 to 0.45, ensuring shadows never dominate the interface.

### Opacity Levels

- 20% (`0.20`) — Very subtle transparency, almost imperceptible
- 40% (`0.40`) — Disabled state background tint or overlay filter
- 45% (`0.45`) — Shadow ambient transparency
- 55% (`0.55`) — Medium transparency for hover overlays
- 70% (`0.70`) — Reduced opacity for secondary elements
- 75% (`0.75`) — Slightly transparent interactive states

### Z-index / Layering

The stacking context follows a flat but purposeful layering model:

- **Base** (`1–4`) — Content layers, stacking order within a section
- **Dropdown** (`10–40`) — Menu drops, popovers, floating panels

No z-index values exceed 40 in the measured extract. Layers are kept close to avoid visual confusion.

## 7. Do's and Don'ts

### Do
- Use `{colors.primary}` (`#0F65F4`) for all primary CTAs and high-emphasis interactive elements
- Apply `{rounded.none}` (0px) border radius to maintain the sharp, structured aesthetic
- Follow the typography hierarchy exactly: use `{typography.display-xl-strong}` for hero headings, `{typography.body-md}` for runtime copy
- Preserve negative letter-spacing on display sizes (e.g., `-7.56px` on hero scales) for visual impact
- Build depth through shadow micro-layers and color blocking, not border or stroke weight
- Group related actions horizontally with `{spacing.md}` (16px) gaps
- Use `{colors.hairline}` (`#DBE7FB`) for subtle 1px dividers and section borders
- Reserve `{colors.canvas}` (`#FFFFFF`) as the default background; nest surfaces in `{colors.surface}` (`#0A1430`) for dark containers
- Apply 40–48px vertical padding (`{spacing.section}` to `{spacing.band}`) between major sections for breathing room

### Don't
- Round corners on any interactive component; maintain sharp geometry throughout
- Apply multiple box-shadow layers; use the single-layer shadow scale (sm, md, lg, xl)
- Overuse accent colors; `{colors.accent}` (`#FF9E00`) is for secondary emphasis only, not runtime CTAs
- Increase padding beyond `{spacing.band}` (48px) without reason; respect the rhythm
- Use colors outside the measured palette; all UI colors are semantic and studied
- Apply letter-spacing other than the specified values; typography spacing is intentional
- Mix border styles; use none or 1–2px solid only
- Layer more than 4 z-index stacks within a viewport; keep the hierarchy flat
- Hide heading hierarchy information; always use proper semantic sizing

## 8. Responsive Behavior

### Breakpoints

| Viewport | Content Width | Grid Columns | Nav Links Visible | Menu Toggle | Display Heading | Body Text | Section Padding X |
|----------|---------------|--------------|-------------------|-------------|-----------------|-----------|-------------------|
| 375px (Mobile) | 375px | 7 | 0 | Yes | 42px (`{typography.display-lg-tight}`) | 16px | 0px |
| 768px (Tablet) | 768px | 7 | 0 | Yes | 60px (compressed) | 16px | 0px |
| 1024px (Desktop) | 1024px | 7 | 8 | No | 72px (`{typography.display-xl}`) | 16px | 0px |
| 1280px (Desktop HD) | 1280px | 7 | 8 | No | 72px (`{typography.display-xl}`) | 16px | 0px |
| 1440px (Wide) | 1280px (capped) | 7 | 8 | No | 72px (`{typography.display-xl}`) | 16px | 0px |

**Collapse Point:** Navigation menu collapses and toggle button appears between 768px and 1024px viewports. All body text remains 16px across all breakpoints.

### Touch Targets

- Minimum interactive element size: 40px (buttons, links, inputs)
- Desktop-optimized sizes: 48–56px for primary actions
- Spacing between touch targets: minimum `{spacing.md}` (16px)

### Collapsing Strategy

- **Mobile (375px–768px):** Full-width layouts with zero horizontal padding; content spans edge-to-edge. Navigation hides behind toggle. Display heading shrinks to 42–60px. All buttons scale to fit container width.
- **Desktop (1024px+):** Max-width container of 1280px centers on the viewport. Display heading expands to 72px. Navigation becomes horizontal menu bar. Sections gain left/right margins as needed.
- **Grid Stability:** 7-column grid is consistent; no reflow between breakpoints, layout remains mathematically rigid.

## 9. Agent Prompt Guide

### Quick Color Reference

Implement UI elements using these semantic color assignments:

- **Primary CTA:** `{colors.primary}` (`#0F65F4`) — All primary action buttons, active navigation, key links
- **Background (default):** `{colors.canvas}` (`#FFFFFF`) — Page base, light surfaces
- **Background (dark):** `{colors.surface}` (`#0A1430`) — Card/panel containers, dark sections
- **Heading Text:** `{colors.ink}` (`#334155`) — All h1–h5 and semantic headings
- **Body Text:** `{colors.body}` (`#64748B`) — Runtime paragraph copy
- **Borders & Dividers:** `{colors.hairline}` (`#DBE7FB`) — 1px lines, subtle separation
- **Secondary Accent:** `{colors.accent}` (`#FF9E00`) — Highlight, hero bands, non-primary emphasis
- **Success State:** `{colors.success}` (`#00B894`) — Confirmations, checkmarks, positive outcomes

### Iteration Guide

1. **Start with structure:** All interactive components use `{rounded.none}` (0px). No exceptions.
2. **Establish hierarchy:** Headings scale from `{typography.heading-xs}` (18px) to `{typography.display-xl-strong}` (72px). Body text is `{typography.body-md}` (16px, weight 300).
3. **Apply primary blue:** `{colors.primary}` (`#0F65F4`) is the dominant brand. Use it for CTAs, focus states, and key interactive feedback.
4. **Space generously:** Sections use `{spacing.section}` to `{spacing.band}` (40–48px) vertical padding. Cards use `{spacing.xl}` to `{spacing.xxl}` (24–32px) internal padding.
5. **Use shadows for depth:** Apply the sm–xl shadow scale (`{colors.surface}` cards with sm shadow). Never invent shadows; use the measured scale only.
6. **Respect typography negatives:** Display sizes compress with negative letter-spacing (down to `-7.56px`). This is intentional and brands the hero.
7. **Test responsive:** Mobile layout (375px) hides navigation and uses 42px display heading. Desktop (1024px+) shows full nav and 72px heading.
8. **Color-block over emboss:** Depth comes from background colors and shadows, not borders or texture.

## 10. Known Gaps

- **Interaction states not captured:** The extraction measured `:hover`, `:focus`, and `:disabled` states in abstract terms (opacity/color changes) but did not capture specific component-level interactivity (e.g., focused button appearance, disabled input styling, active link indicators). Implement interaction states conservatively using the provided opacity levels (0.4, 0.7 for disabled; 0.75–1 for hover).
- **Decorative color roles:** 7 accent colors (`{colors.accent-1}` through `{colors.accent-6}`) were measured but lack assigned semantic roles. They appear in gradients and hero decorative patterns only; do not repurpose them for UI elements.
- **Unobserved surfaces:** The extraction was limited to publicly accessible pages. Authentication gates, admin dashboards, and logged-in experiences were not analyzed.
- **Animation and transition:** No animation durations, easing curves, or transition timings were extracted. The document addresses static appearance only.
- **Adaptive color themes:** No dark mode, light mode toggling, or system preference detection was measured. All colors reflect the single measured theme.
- **Cross-origin stylesheets:** Some imported stylesheets may have been inaccessible during extraction, potentially missing supplemental component states or utility classes.
- **Advanced component variants:** Modals, popovers, tooltips, and complex form states may exist but were not fully captured. Implement using the shadow and color scales provided.
- **Accessibility tokens:** No ARIA labels, focus management, or keyboard navigation specifics were extracted. Implement semantic HTML and standard focus rings following WCAG 2.1 AA.

---

**Document Version**: 2.0
**Last Analyzed**: upsell-experience.uplayer.agency (homepage)
**Extraction Scope**: Single page; public-facing surfaces only.
