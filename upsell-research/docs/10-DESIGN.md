---
version: alpha
name: Uplayer
description: |
  UpLayer's design system embodies a modern, sophisticated aesthetic rooted in
  technology and innovation. The visual language is defined by sharp, orthogonal
  forms—zero border radius on interactive elements creates a technical,
  forward-thinking feel. The palette combines vibrant primary accents with deep,
  neutral surfaces, reinforced by carefully layered micro-shadows that provide
  subtle depth without visual clutter. Decorative gradients and radial patterns
  underscore sections with soft, blurred blue tonalities, suggesting AI and
  intelligence. The typography system uses contemporary geometric sans-serifs
  (Stack Sans family variants) with generous scale jumps, emphasizing hierarchy
  through size and weight rather than color contrast. Overall, the system feels
  ambitious and premium, designed to convey trustworthiness and cutting-edge
  capability.
source:
  url: "https://uplayer.agency"
  pagesAnalyzed: 1
  extractedAt: 2026-10-07
  tokensMeasured: true
colors:
  primary: "#FF9E00"
  accent: "#334155"
  canvas: "#FFFFFF"
  surface: "#F0F4FF"
  surface-alt: "#020617"
  on-primary: "#222222"
  ink: "#0F172A"
  body: "#334155"
  muted: "#64748B"
  hairline: "#0F65F4"
  success: "#00B894"
  accent-1: "#0B3DA8"
  accent-2: "#14B8A6"
  accent-3: "#5A9AFF"
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
    fontSize: 96px
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: -2.4px
  display-lg:
    fontFamily: "Stack Sans Notch"
    fontSize: 84.816px
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: 0px
  display-md:
    fontFamily: "Stack Sans Notch"
    fontSize: 72px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0px
  display-sm:
    fontFamily: "Stack Sans Notch"
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0px
  display-sm-capitalize:
    fontFamily: "Stack Sans Notch"
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0px
    textTransform: capitalize
  heading-xl:
    fontFamily: "Stack Sans Headline"
    fontSize: 36px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0px
  heading-lg:
    fontFamily: "Stack Sans Notch"
    fontSize: 30px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0px
  heading-lg-strong:
    fontFamily: "Stack Sans Headline"
    fontSize: 30px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0px
  heading-md:
    fontFamily: "Stack Sans Headline"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0px
  heading-sm:
    fontFamily: "Stack Sans Headline"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0px
  heading-xs:
    fontFamily: "Stack Sans Headline"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0px
  body-lg:
    fontFamily: "Stack Sans Text"
    fontSize: 18px
    fontWeight: 300
    lineHeight: 1.56
    letterSpacing: 0px
  body-lg-loose:
    fontFamily: "Stack Sans Text"
    fontSize: 18px
    fontWeight: 300
    lineHeight: 1.63
    letterSpacing: 0px
  body-md:
    fontFamily: "Stack Sans Text"
    fontSize: 16px
    fontWeight: 300
    lineHeight: 1.5
    letterSpacing: 0px
  body-md-strong:
    fontFamily: "Stack Sans Text"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0px
  body-sm:
    fontFamily: "Stack Sans Text"
    fontSize: 14px
    fontWeight: 300
    lineHeight: 1.43
    letterSpacing: 0px
  body-sm-strong:
    fontFamily: "Stack Sans Text"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.38
    letterSpacing: 0px
    textTransform: capitalize
  nav:
    fontFamily: "Stack Sans Text"
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.33
    letterSpacing: 0px
  button:
    fontFamily: "Stack Sans Text"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: 0px
  label:
    fontFamily: "Stack Sans Text"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.43
    letterSpacing: 0px
rounded:
  none: 0px
  full: 9999px
spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 20px
  xl: 24px
  xxl: 32px
  xxxl: 40px
  section: 48px
  band: 64px
borderWidths:
  thin: 1px
shadows:
  sm: "oklab(0.999994 0.0000455678 0.0000200868 / 0.2) 0px 0px 0px 1px, oklab(0.553484 -0.0356502 -0.22454 / 0.4) 0px 10px 15px -3px, oklab(0.553484 -0.0356502 -0.22454 / 0.4) 0px 4px 6px -4px"
  md: "oklab(0.553484 -0.0356502 -0.22454 / 0.25) 0px 10px 15px -3px, oklab(0.553484 -0.0356502 -0.22454 / 0.25) 0px 4px 6px -4px"
  lg: "rgba(15, 23, 42, 0.06) 0px 8px 24px 0px"
elevationStrategy: layered-micro
themes:
  derived: dark   # the other theme is the site's measured palette
  light:
    bg: "#FFFFFF"
    surface: "#F0F4FF"
    surfaceRaised: "#E7EBF6"
    text: "#0F172A"
    textMuted: "#334155"
    border: "#0F65F4"
    accent: "#C27800"
    accentFg: "#000000"
    focusRing: "#FF9E00"
    elevation: shadow
  dark:
    bg: "#161109"
    surface: "#241F18"
    surfaceRaised: "#302B24"
    text: "#FFFBF5"
    textMuted: "#A6A29B"
    border: "#3B3730"
    accent: "#FF9E00"
    accentFg: "#0B0B0C"
    focusRing: "#FF9E00"
    elevation: "border+surface"
gradients:
  - context: hero
    kind: radial
    value: "radial-gradient(circle, rgb(209, 211, 215) 1.25px, rgba(0, 0, 0, 0) 1.25px)"
  - context: hero
    kind: radial
    value: "radial-gradient(rgba(15, 101, 244, 0.18), rgba(0, 0, 0, 0) 70%)"
    filter: "blur(40px)"
  - context: section
    kind: linear
    value: "linear-gradient(to right in oklab, rgb(1, 132, 248) 0%, rgb(27, 73, 241) 100%)"
  - context: section
    kind: radial
    value: "radial-gradient(rgba(15, 101, 244, 0.16), rgba(90, 154, 255, 0.07) 45%, rgba(0, 0, 0, 0) 72%)"
    filter: "blur(64px)"
  - context: section
    kind: linear
    value: "linear-gradient(90deg, rgb(71, 175, 255) 0%, rgb(27, 73, 241) 100%)"
  - context: section
    kind: radial
    value: "radial-gradient(60% 100% at 50% 0px, rgba(255, 255, 255, 0.14), rgba(0, 0, 0, 0) 72%)"
components:
  button-outline:
    typography: "{typography.body-md-strong}"
    textColor: "{colors.canvas}"
    border: "1px solid oklab(0.999994 0.0000455678 0.0000200868 / 0.1)"
    height: 70px
    padding: "12px 32px 12px 12px"
    backgroundColor: "oklab(0.999994 0.0000455678 0.0000200868 / 0.05)"
  button-outline-sm:
    typography: "{typography.body-md-strong}"
    textColor: "oklab(0.999994 0.0000455677 0.0000200868 / 0.8)"
    border: "1px solid oklab(0.999994 0.0000455678 0.0000200868 / 0.1)"
    height: 42px
    padding: "8px 12px 8px 12px"
    backgroundColor: "oklab(0.999994 0.0000455678 0.0000200868 / 0.05)"
  button-icon:
    typography: "{typography.body-md-strong}"
    textColor: "{colors.ink}"
    height: 40px
    backgroundColor: "oklab(0.999994 0.0000455678 0.0000200868 / 0.9)"
  navigation:
    typography: "{typography.body-md-strong}"
    textColor: "{colors.body}"
    height: 72px
  footer:
    typography: "{typography.body-md-strong}"
    textColor: "{colors.canvas}"
    backgroundColor: "{colors.surface-alt}"
  link:
    typography: "{typography.body-md-strong}"
    textColor: "{colors.body}"
    backgroundColor: "{colors.surface-alt}"
  link-sm:
    typography: "{typography.body-md-strong}"
    textColor: "{colors.body}"
    padding: "16px 0px 16px 0px"
states:
  other-hover:
    target: other
    state: hover
    borderColor: "{colors.hairline}"
  other-focus:
    target: other
    state: focus
    borderColor: "{colors.hairline}"
  other-focus-visible:
    target: other
    state: focus-visible
    borderColor: "lab(45.5239 21.4305 -79.4599 / 0.15)"
breakpoints:
  - width: 375
    containerWidth: 343
    gridColumns: 4
    navLinksVisible: 10
    menuToggleVisible: true
    headingPx: 36
    bodyPx: 16
    sectionPaddingX: 0
  - width: 768
    containerWidth: 720
    gridColumns: 4
    navLinksVisible: 10
    menuToggleVisible: true
    headingPx: 48
    bodyPx: 16
    sectionPaddingX: 0
  - width: 1024
    containerWidth: 976
    gridColumns: 6
    navLinksVisible: 17
    menuToggleVisible: true
    headingPx: 48
    bodyPx: 16
    sectionPaddingX: 0
  - width: 1280
    containerWidth: 1280
    gridColumns: 6
    navLinksVisible: 17
    menuToggleVisible: false
    headingPx: 48
    bodyPx: 16
    sectionPaddingX: 0
  - width: 1440
    containerWidth: 1280
    gridColumns: 6
    navLinksVisible: 17
    menuToggleVisible: false
    headingPx: 48
    bodyPx: 16
    sectionPaddingX: 0
coverage:
  statesFound: 61
  gradientsFound: 8
  rolesUnassigned: 4
  archetypesUnnamed: 0
  archetypesDetected: 0
  responsiveMeasured: true
  stylesheetsBlocked: true
  semanticRampDeclared: true
---

# Design System Inspired by UpLayer

## 1. Visual Theme & Atmosphere

UpLayer's design system embodies a modern, sophisticated aesthetic rooted in technology and innovation. The visual language is defined by sharp, orthogonal forms—zero border radius on interactive elements creates a technical, forward-thinking feel. The palette combines vibrant primary accents with deep, neutral surfaces, reinforced by carefully layered micro-shadows that provide subtle depth without visual clutter. Decorative gradients and radial patterns underscore sections with soft, blurred blue tonalities, suggesting AI and intelligence. The typography system uses contemporary geometric sans-serifs (Stack Sans family variants) with generous scale jumps, emphasizing hierarchy through size and weight rather than color contrast. Overall, the system feels ambitious and premium, designed to convey trustworthiness and cutting-edge capability.

**Key Characteristics**
- Sharp, orthogonal component corners (0px border radius on buttons, inputs, images)
- Layered micro-shadow elevation strategy for subtle, barely-there depth
- Bold, oversized display typography with aggressive negative letter-spacing on hero scales
- Vibrant primary accent (`{colors.primary}` — `#FF9E00`) paired with deep, dark surfaces
- Decorative gradient backgrounds using blue and purple hues on alternating sections
- Generous whitespace and breathing room between sections
- Minimal color blocking; depth achieved through surface color shifts and shadow layering

## 2. Color Palette & Roles

### Primary
- **Brand Accent** (`{colors.primary}` — `#FF9E00`): Primary call-to-action fills, brand mark highlight, active state indicators, and focal accents throughout the interface.

### Accent Colors
- **Decorative Accent A** (`{colors.accent-1}` — `#0B3DA8`): Decorative element; no assigned functional role.
- **Decorative Accent B** (`{colors.accent-2}` — `#14B8A6`): Decorative element; no assigned functional role.
- **Decorative Accent C** (`{colors.accent-3}` — `#5A9AFF`): Decorative element; no assigned functional role.
- **Secondary Accent** (`{colors.accent}` — `#334155`): Secondary accent used in hero bands, body copy emphasis, and decorative text overlays.

### Interactive
- **Link Interaction** (`{colors.hairline}` — `#0F65F4`): Primary link color, form focus states, and interactive border indicators.

### Neutral Scale
- **Canvas** (`{colors.canvas}` — `#FFFFFF`): Default page background and light card surfaces.
- **Surface** (`{colors.surface}` — `#F0F4FF`): Secondary card and panel backgrounds; light blue tint for subtle differentiation.
- **Surface Alt** (`{colors.surface-alt}` — `#020617`): Dark alternating section bands and footer backgrounds.
- **Ink** (`{colors.ink}` — `#0F172A`): Primary heading and body text color; highest contrast against light surfaces.
- **Muted** (`{colors.muted}` — `#64748B`): Secondary text, captions, metadata, and reduced-emphasis copy.
- **On Primary** (`{colors.on-primary}` — `#222222`): Label and text color applied over brand-colored surfaces.
- **Neutral Divider** (`{colors.neutral-1}` — `#D1D3D7`): Subtle border and divider strokes.

### Semantic / Status
- **Success** (`{colors.success}` — `#00B894`): Success states, confirmation indicators, and positive feedback.

## 3. Typography Rules

### Font Family
- **Primary Display & Headlines**: Stack Sans Headline, Stack Sans Notch (https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..700&family=Stack+Sans+Headline:wght@200..700&family=Stack+Sans+Notch:wght@200..700&family=Stack+Sans+Text:wght@200..700&display=swap)
- **Body & UI Text**: Stack Sans Text (https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..700&family=Stack+Sans+Headline:wght@200..700&family=Stack+Sans+Notch:wght@200..700&family=Stack+Sans+Text:wght@200..700&display=swap)
- **Fallback**: `-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|---|---|---|---|---|---|---|
| **Display XXL** | Stack Sans Notch | 302px | 600 | 1.00 | −7.56px | Ultra-large hero display; aggressive negative tracking |
| **Display XL** | Stack Sans Notch | 96px | 600 | 0.95 | −2.4px | Large hero headlines with tight tracking |
| **Display LG** | Stack Sans Notch | 84px | 600 | 1.06 | 0px | Large display headlines |
| **Display MD** | Stack Sans Notch | 72px | 600 | 1.00 | 0px | Medium display headlines |
| **Display SM** | Stack Sans Notch | 48px | 600 | 1.25 | 0px | Small display headlines |
| **Heading XL** | Stack Sans Headline | 36px | 600 | 1.25 | 0px | Primary section heading |
| **Heading LG Strong** | Stack Sans Headline | 30px | 600 | 1.25 | 0px | Strong subsection heading |
| **Heading LG** | Stack Sans Notch | 30px | 500 | 1.20 | 0px | Medium subsection heading |
| **Heading MD** | Stack Sans Headline | 24px | 600 | 1.25 | 0px | Card or panel title |
| **Heading SM** | Stack Sans Headline | 20px | 600 | 1.25 | 0px | Small card heading |
| **Heading XS** | Stack Sans Headline | 16px | 600 | 1.25 | 0px | Minimal heading or label emphasis |
| **Body LG Loose** | Stack Sans Text | 18px | 300 | 1.63 | 0px | Large body copy with generous spacing |
| **Body LG** | Stack Sans Text | 18px | 300 | 1.56 | 0px | Large body copy |
| **Body MD Strong** | Stack Sans Text | 16px | 400 | 1.50 | 0px | Medium body copy, emphasized |
| **Body MD** | Stack Sans Text | 16px | 300 | 1.50 | 0px | Standard body copy |
| **Button** | Stack Sans Text | 14px | 400 | 1.43 | 0px | Button and CTA text |
| **Label** | Stack Sans Text | 14px | 500 | 1.43 | 0px | Form label and small emphasis |
| **Body SM Strong** | Stack Sans Text | 14px | 400 | 1.38 | 0px | Small copy, emphasized (uppercase capable) |
| **Body SM** | Stack Sans Text | 14px | 300 | 1.43 | 0px | Small body copy and captions |
| **Navigation** | Stack Sans Text | 24px | 400 | 1.33 | 0px | Primary navigation links |

### Principles
- **Geometric Sans Serif Foundation**: All typography uses Stack Sans family variants, creating a cohesive, modern, tech-forward identity.
- **Aggressive Negative Tracking on Display**: Ultra-large hero sizes (`{typography.display-xxl}` at −7.56px letter-spacing; `{typography.display-xl}` at −2.4px) create bold, compact headlines that demand attention.
- **Weight as Hierarchy**: Heading hierarchy relies on size and weight jumps (500–600 weight), not color variation, maintaining contrast accessibility.
- **Generous Line Heights**: Body copy and large text use 1.50–1.63 line height, enhancing readability and air in the design.
- **Neutral Letter-Spacing**: Body and interface text use 0px letter-spacing for clarity; negative tracking is reserved for display scales only.

## 4. Component Stylings

### Buttons

#### Primary (Solid)
- **Background**: `{colors.primary}` (`#FF9E00`)
- **Text Color**: `{colors.on-primary}` (`#222222`)
- **Padding**: `{spacing.sm}` `{spacing.xl}` (12px 24px)
- **Font Size**: `{typography.button}` (14px)
- **Font Weight**: 400
- **Line Height**: 1.43
- **Border Radius**: `{rounded.none}` (0px)
- **Border**: none
- **Min Height**: 42px

#### Outline
- **Background**: `rgba(158, 158, 158, 0.05)` (light gray overlay)
- **Text Color**: `{colors.canvas}` (`#FFFFFF`)
- **Padding**: 12px 32px
- **Font Size**: 16px
- **Font Weight**: 400
- **Line Height**: 1.5
- **Border Radius**: `{rounded.none}` (0px)
- **Border**: 1px solid `rgba(255, 255, 255, 0.10)`
- **Height**: 70px
- **Box Shadow**: none
- **Hover State**: Border color shifts to `{colors.hairline}` (`#0F65F4`); text opacity increases.

#### Outline Small
- **Background**: `rgba(158, 158, 158, 0.05)`
- **Text Color**: `rgba(255, 255, 255, 0.80)`
- **Padding**: 8px 12px
- **Font Size**: 16px
- **Font Weight**: 400
- **Line Height**: 1.5
- **Border Radius**: `{rounded.none}` (0px)
- **Border**: 1px solid `rgba(255, 255, 255, 0.10)`
- **Height**: 42px
- **Box Shadow**: none

#### Ghost (Icon Button)
- **Background**: `rgba(255, 255, 255, 0.90)`
- **Text Color**: `{colors.ink}` (`#0F172A`)
- **Padding**: 0px
- **Width / Height**: 40px (square)
- **Font Size**: 16px
- **Font Weight**: 400
- **Border Radius**: `{rounded.none}` (0px)
- **Border**: none
- **Box Shadow**: none

### Cards & Containers

#### Default Card
- **Background**: `{colors.surface}` (`#F0F4FF`)
- **Border**: 1px solid `{colors.hairline}` (`#0F65F4`)
- **Border Radius**: `{rounded.none}` (0px)
- **Padding**: `{spacing.md}` (16px) to `{spacing.lg}` (20px)
- **Box Shadow**: `{shadow.sm}` (custom oklab with micro-layering)
- **Text Color**: `{colors.ink}` (`#0F172A`)

#### Section Band (Dark)
- **Background**: `{colors.surface-alt}` (`#020617`)
- **Text Color**: `{colors.canvas}` (`#FFFFFF`)
- **Padding**: `{spacing.band}` (64px) on block axis
- **Border Radius**: `{rounded.none}` (0px)

### Inputs & Forms

#### Text Input
- **Background**: `rgba(255, 255, 255, 0.05)` (light overlay on dark; `{colors.canvas}` on light)
- **Text Color**: `{colors.ink}` (`#0F172A`)
- **Padding**: `{spacing.md}` (16px)
- **Font Size**: `{typography.body-md}` (16px)
- **Border**: 1px solid `{colors.neutral-1}` (`#D1D3D7`) or `rgba(255, 255, 255, 0.10)` on dark
- **Border Radius**: `{rounded.none}` (0px)
- **Line Height**: 1.50
- **Focus State**: Border color becomes `{colors.hairline}` (`#0F65F4`); box shadow applied.
- **Placeholder Color**: `{colors.muted}` (`#64748B`)

#### Label
- **Font Size**: `{typography.label}` (14px)
- **Font Weight**: 500
- **Color**: `{colors.ink}` (`#0F172A`)
- **Line Height**: 1.43
- **Margin Bottom**: `{spacing.xs}` (8px)

### Navigation

#### Primary Navigation Bar
- **Background**: `{colors.canvas}` (`#FFFFFF`) or transparent
- **Text Color**: `{colors.accent}` (`#334155`)
- **Padding**: 0px (relies on container padding)
- **Height**: 72px
- **Font Size**: `{typography.nav}` (24px)
- **Font Weight**: 400
- **Border**: none
- **Display**: Horizontal flex; collapses to hamburger toggle on mobile.

#### Navigation Link (Hover)
- **Text Color**: `{colors.hairline}` (`#0F65F4`)
- **Transition**: smooth color change
- **Underline**: optional accent underline on hover

### Footer

#### Footer Container
- **Background**: `{colors.surface-alt}` (`#020617`)
- **Text Color**: `{colors.canvas}` (`#FFFFFF`)
- **Padding**: `{spacing.band}` (64px) on block axis
- **Font Size**: `{typography.body-md}` (16px)
- **Font Weight**: 400
- **Border**: none
- **Border Radius**: `{rounded.none}` (0px)

#### Footer Link
- **Text Color**: `{colors.canvas}` (`#FFFFFF`)
- **Text Decoration**: none
- **Hover State**: Opacity to 0.70 or color shifts to `{colors.primary}` (`#FF9E00`)

## 5. Layout Principles

### Spacing System

UpLayer employs a modular spacing scale derived from a `{spacing.xxs}` (4px) base unit, scaling by factors of 2 and 1.5 to create visual rhythm and breathing room.

- `{spacing.xxs}` = 4px — Minimal gaps between adjacent elements
- `{spacing.xs}` = 8px — Tight spacing within component groups
- `{spacing.sm}` = 12px — Small internal padding
- `{spacing.md}` = 16px — Default body copy line-height offset; general padding
- `{spacing.lg}` = 20px — Spacious internal padding; heading bottom margin
- `{spacing.xl}` = 24px — Large component spacing; button padding
- `{spacing.xxl}` = 32px — Inter-component gaps
- `{spacing.xxxl}` = 40px — Large section dividers
- `{spacing.section}` = 48px — Primary section block padding (top/bottom)
- `{spacing.band}` = 64px — Hero and major section spacing; full-width band padding

**Usage Context:**
- Buttons and small inputs: `{spacing.sm}` to `{spacing.md}` internal padding.
- Cards and containers: `{spacing.md}` to `{spacing.lg}` padding.
- Section spacing (vertical): `{spacing.section}` to `{spacing.band}` as block-axis padding.
- Gap between blocks (horizontal flex): `{spacing.xl}` to `{spacing.xxl}`.

### Grid & Container

- **Max Width**: 1280px (enforced at 1280px+ breakpoints; 100% below).
- **Content Column Width**: 1280px at 1280px+ breakpoint; 976px at 1024px; 720px at 768px; 343px at 375px.
- **Column Count**: 6 columns (measured at 1024px+); 4 columns (at 375–768px).
- **Section Padding**: 0px horizontal padding at all breakpoints; whitespace managed via max-width container.
- **Grid Approach**: CSS Grid or flex-based layout with responsive column collapse; 6-column grid on desktop, 4-column on tablet, 1–2 column on mobile.

### Whitespace Philosophy

The system prioritizes generous breathing room, achieved through:
- Large block-axis spacing between sections (`{spacing.section}` to `{spacing.band}`).
- Minimal horizontal padding on sections (0px), relying on max-width constraints.
- Adequate line-height on body copy (1.50–1.63) for visual rest.
- Decorative gradients and blurred overlays used sparingly to avoid visual clutter.
- Contrast through color blocking (dark vs. light sections) rather than dense borders or dividers.

### Border Radius Scale

UpLayer employs a minimal, binary border-radius strategy:

- `{rounded.none}` = 0px — **All interactive components** (buttons, inputs, cards, images). Creates a technical, sharp aesthetic.
- `{rounded.full}` = 9999px — Reserved for edge cases; not used on primary UI components.

**Component-Specific Application:**
- Buttons (all variants): 0px
- Input fields: 0px
- Cards: 0px
- Images: 0px
- Decorative shapes: 9999px (pills or circles where applicable).

### Border Widths

- **Thin** (`{border-width-thin}` = 1px): Applied to button outlines, card borders, input field borders, and divider lines.
- No thicker borders are employed in the primary component palette; shadows and color blocking provide depth instead.

## 6. Depth & Elevation

UpLayer employs a **layered-micro elevation strategy**, using multiple translucent shadow layers to create subtle, barely-there depth. Shadows are custom, using `oklab` color space and opacity blending for precise control.

| Level | Treatment | Use |
|---|---|---|
| **Flat** | No shadow | Backgrounds, cards on `{colors.surface}` without lift |
| **Micro (SM)** | `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, oklab(0.999994 0.0000455678 0.0000200868 / 0.2) 0px 0px 0px 1px, oklab(0.553484 -0.0356502 -0.22454 / 0.4) 0px 10px 15px -3px, oklab(0.553484 -0.0356502 -0.22454 / 0.4) 0px 4px 6px -4px` | Primary cards and interactive surfaces; minimal lift |
| **Micro (MD)** | `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, oklab(0.553484 -0.0356502 -0.22454 / 0.25) 0px 10px 15px -3px, oklab(0.553484 -0.0356502 -0.22454 / 0.25) 0px 4px 6px -4px` | Secondary cards and containers; reduced shadow intensity |
| **Micro (LG)** | `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(15, 23, 42, 0.06) 0px 8px 24px 0px` | Elevated surfaces, modals, overlays; most visible shadow tier |

**Shadow Philosophy:**
The system avoids bold drop shadows in favor of multiple thin layers using `oklab` color space. This creates depth through light diffusion and soft focus rather than hard contrast, maintaining visual refinement while indicating elevation. The micro-layering approach ensures that depth is felt rather than seen, preserving the clean, technical aesthetic.

### Opacity Levels

UpLayer defines specific opacity values for interactive states and overlays:

- 0.15 — Minimal overlay; ghost button backgrounds
- 0.20 — Light disabled state; hover backgrounds
- 0.55 — Medium opacity; secondary interactive states
- 0.60 — Moderate opacity; hover and focus enhancements
- 0.80 — High visibility; button text on light backgrounds
- 0.90 — Near-full opacity; light button fills

These values are applied to interactive state changes (hover, focus, disabled) and overlay backgrounds layered over other content.

### Z-index / Layering

UpLayer employs a structured z-index scale to manage layer stacking:

- **Base** (z-index: 0): Default page content and sections
- **Dropdown / Menu** (z-index: 10–20): Navigation dropdowns and contextual menus
- **Sticky / Fixed** (z-index: 50–60): Sticky headers, fixed navigation bars, persistent UI
- **Modal** (z-index: 9999): Full-screen modals, dialogs, overlays requiring highest precedence

This scale prevents z-index conflicts and maintains predictable stacking behavior across interactive scenarios.

## 7. Do's and Don'ts

### Do
- Use sharp, 0px border radius on all interactive components (buttons, inputs, cards) to maintain the technical, orthogonal aesthetic.
- Apply `{colors.primary}` (`#FF9E00`) sparingly for CTAs and focal accents; reserve it for high-priority actions.
- Layer micro-shadows using `oklab` color space for depth without visual clutter; avoid harsh drop shadows.
- Employ generous `{spacing.band}` (64px) and `{spacing.section}` (48px) for breathing room between major sections.
- Use negative letter-spacing (−7.56px to −2.4px) only on display-scale typography (96px+) for dramatic, compact headlines.
- Maintain high contrast between `{colors.ink}` (`#0F172A`) and `{colors.canvas}` (`#FFFFFF`) for accessibility on body copy.
- Group related inputs and buttons using tight spacing (`{spacing.xs}` to `{spacing.sm}`) within containers.
- Apply color blocking (dark vs. light sections) to differentiate content zones instead of relying on borders alone.
- Scale typography responsively: 48px heading at 768px+ breakpoints; down-scale appropriately on mobile.
- Test hover and focus states explicitly; ensure `{colors.hairline}` (`#0F65F4`) border highlights are visible on all interactive elements.

### Don't
- Never use rounded corners (9999px) on buttons, inputs, or primary cards; maintain 0px radius throughout the UI.
- Don't overuse `{colors.primary}` (`#FF9E00`); reserve it for primary CTAs, brand marks, and focal accents only.
- Avoid multiple decoration layers (overlaid gradients, patterns, and blurs) on the same section; max two gradient overlays per hero.
- Don't apply negative letter-spacing to body copy or headings below 72px; use 0px tracking for standard hierarchy.
- Never stack more than two shadow layers on a single component; rely on surface color and micro-layering instead.
- Don't reduce line-height below 1.25 on headings or 1.50 on body copy; maintain readability and visual rest.
- Avoid high-saturation accent colors outside the approved palette; stick to `{colors.accent-1}` (teal), `{colors.accent-2}`, and `{colors.accent-3}` for decorative use only.
- Don't disable form labels or reduce their visual prominence; always maintain label–input hierarchy.
- Never apply opacity below 0.15 to interactive elements; ensure disabled states remain visually distinct and accessible.
- Don't collapse the navigation menu toggle until 1024px breakpoint; maintain visible nav links up to 1024px viewport width.

## 8. Responsive Behavior

### Breakpoints

| Breakpoint | Viewport Width | Content Width | Grid Columns | Nav Visible | Menu Toggle | Display Heading | Body Font | Section Padding X |
|---|---|---|---|---|---|---|---|---|
| Mobile | 375px | 343px | 4 | 10 links | Yes | 36px | 16px | 0px |
| Tablet | 768px | 720px | 4 | 10 links | Yes | 48px | 16px | 0px |
| Desktop Small | 1024px | 976px | 6 | 17 links | Yes | 48px | 16px | 0px |
| Desktop Large | 1280px | 1280px | 6 | 17 links | No | 48px | 16px | 0px |
| Desktop XL | 1440px | 1280px | 6 | 17 links | No | 48px | 16px | 0px |

**Key Transition Points:**
- **375px → 768px**: Column count remains 4; content width scales from 343px to 720px.
- **768px → 1024px**: Column count increases to 6; content width grows to 976px; menu toggle remains visible.
- **1024px → 1280px**: Content width reaches max 1280px; nav menu toggle hidden; full nav links displayed (17 visible).
- **1280px+**: Content width caps at 1280px; grid and typography remain stable.

### Touch Targets

Minimum interactive element sizes for mobile usability:

- **Button Height**: 42px minimum (outline-small variant); 70px on larger CTAs.
- **Button Width**: Contextual; minimum 40px for icon buttons (`{rounded.none}` square).
- **Input Fields**: 42px minimum height.
- **Navigation Link Padding**: `{spacing.md}` (16px) horizontal; `{spacing.sm}` (12px) vertical.
- **Link Hit Area**: 44px × 44px minimum (WCAG recommendation); adjust padding to meet this on small screens.

### Collapsing Strategy

- **Navigation**: At 1024px and below, hamburger menu toggle appears (z-index: 60); full horizontal nav hidden. At 1280px+, toggle hidden; full nav displayed inline.
- **Grid Layout**: 4-column layout on mobile (375–768px); transitions to 6-column on desktop (1024px+). Adjust card width and padding per breakpoint.
- **Typography**: Display heading scales down from 72px (1024px+) to 48px (768px) to 36px (375px). Body copy remains 16px across all breakpoints.
- **Section Padding**: Block-axis spacing scales: `{spacing.section}` (48px) on desktop; reduce to `{spacing.lg}` (20px) on mobile for compact layouts.
- **Hero Image/Decoration**: Right-side decorative 3D element (hero star, gradient shapes) hidden on mobile (< 768px); visible on tablet+.
- **Multi-Column Cards**: Cards stack vertically (1 column) on mobile; 2 columns on tablet (768px+); 3+ columns on desktop (1024px+).

## 9. Agent Prompt Guide

### Quick Color Reference

When implementing UpLayer-inspired components, use these semantic mappings:

- **Primary CTA Button**: Brand Accent (`{colors.primary}` — `#FF9E00`)
- **Page Background**: Canvas (`{colors.canvas}` — `#FFFFFF`)
- **Card Background**: Surface (`{colors.surface}` — `#F0F4FF`)
- **Dark Section Band**: Surface Alt (`{colors.surface-alt}` — `#020617`)
- **Primary Heading Text**: Ink (`{colors.ink}` — `#0F172A`)
- **Secondary / Body Text**: Accent (`{colors.accent}` — `#334155`)
- **Caption / Muted Text**: Muted (`{colors.muted}` — `#64748B`)
- **Link / Focus State**: Hairline (`{colors.hairline}` — `#0F65F4`)
- **Success State**: Success (`{colors.success}` — `#00B894`)
- **Button Border (Outline)**: Neutral Divider (`{colors.neutral-1}` — `#D1D3D7`) or white with low opacity
- **Text on Primary**: On Primary (`{colors.on-primary}` — `#222222`)

### Iteration Guide

1. **Start with typography hierarchy**: Use Stack Sans family variants; apply aggressive negative letter-spacing (−7.56px to −2.4px) only to display sizes (96px+). Maintain 0px tracking on all body and heading copy below 72px.

2. **Apply zero border radius consistently**: All interactive components (buttons, inputs, cards, images) use `{rounded.none}` (0px). Do not round any primary UI elements; maintain the sharp, orthogonal aesthetic.

3. **Layer depth with micro-shadows**: Use multi-layer `oklab`-based shadows; never apply a single hard drop shadow. Reference the three shadow tiers (sm, md, lg) for appropriate elevation on cards, buttons, and sections.

4. **Color block sections instead of adding borders**: Alternate `{colors.canvas}` (`#FFFFFF`) and `{colors.surface-alt}` (`#020617`) sections to define zones. Use `{colors.surface}` (`#F0F4FF`) for secondary card backgrounds. Avoid excessive divider lines.

5. **Reserve `{colors.primary}` for focal accents**: Only apply `#FF9E00` to primary CTAs, brand marks, and active states. Use `{colors.accent}` (`#334155`) and `{colors.accent-1}` to `{colors.accent-3}` for secondary and decorative purposes.

6. **Implement responsive grid collapse at 1024px**: Desktop (1024px+) uses 6-column grid; tablet (768px) uses 4-column; mobile (375px) uses 1–2 column layouts. Nav menu toggle appears below 1024px.

7. **Ensure high contrast for accessibility**: Maintain WCAG AA contrast (4.5:1+) between `{colors.ink}` and `{colors.canvas}` for body text. Test all link colors against background surfaces.

8. **Emphasize hover states with color and opacity shifts**: On interactive elements, shift border color to `{colors.hairline}` (`#0F65F4`) and increase text opacity (e.g., 0.80 → 1.00). Reference hover state data for exact color and opacity shifts per component.

9. **Scale spacing with the modular scale**: Use multiples of `{spacing.md}` (16px) for consistency. Section spacing: `{spacing.section}` (48px) typical; `{spacing.band}` (64px) for hero/major sections. Component internal padding: `{spacing.sm}` to `{spacing.lg}`.

10. **Test all interactive states explicitly**: Verify button hover, focus, and disabled states. Confirm input focus borders appear in `{colors.hairline}` (`#0F65F4`). Validate z-index stacking (dropdowns at 10–20; modals at 9999) in overlapping scenarios.

## 10. Known Gaps

- **Interaction States (Limited Coverage)**: Extraction captured raw hover state CSS, but interaction state design (hover, active, focus, disabled, visited) is not uniformly documented. Only :hover and :focus-visible CSS rules were extracted; other interaction variants (`:active`, `:disabled`, `:visited`) may exist but were not measured. Implementers should test all interactive states explicitly.

- **Decorative Accent Colors (Unassigned Role)**: Four extracted accent colors (`{colors.accent-1}` `#0B3DA8`, `{colors.accent-2}` `#14B8A6`, `{colors.accent-3}` `#5A9AFF`) have no measured functional role. These appear decorative (in gradients, overlays, or illustrations). No evidence of their use in UI components was observed.

- **Dark Mode / Derived Theme**: The extracted tokens include only a single, measured theme. Any dark-mode behavior (if present on the live site) was not explicitly observed or measured during extraction. Do not assume a light/dark mode system exists beyond what is documented here.

- **Limited Component Coverage**: Extraction measured buttons (3 variants), navigation, footer, and links. Other components (modals, tooltips, popovers, date pickers, tabs, breadcrumbs, pagination) were not present on the analyzed page(s) or were not extractable. Their styling is not documented here.

- **Cross-Origin Stylesheets**: Some stylesheets may have been cross-origin or blocked during extraction, resulting in incomplete CSS coverage. Custom CSS-in-JS or dynamically injected styles may not be fully captured.

- **Surfaces Behind Authentication**: The analyzed page is public-facing (homepage). Any authenticated or paywalled surfaces were not visited, so design tokens for those areas are not available.

- **Micro-Animation & Transition Timing**: No duration, easing function, or animation timing data was extracted. Transitions and animations visible on the live site are not documented in this design system.

- **Video / Media Background Handling**: Hero section contains video/animated content (loading spinner observed in screenshot). No design data for video playback controls, fallback states, or loading states was extracted.

- **Print Styles & Accessibility (ARIA)**: No print media queries or ARIA-specific styling was measured. Ensure print styles and accessible naming conventions are added during implementation.

---

**Document Version**: 1.0  
**Last Analyzed**: UpLayer.agency (homepage)  
**Extraction Scope**: Single page; public-facing surfaces only.