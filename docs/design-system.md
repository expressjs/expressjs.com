# Design System

Primitive components, tokens, and patterns used across the Express.js website.

All components are imported from `@components/primitives`.

## Typography

**Fonts:** Helvetica Neue for body and headings, JetBrains Mono for code, Inter (bold) for OG images.

**Headings:** `H1` (page titles), `H2` (sections), `H3` (subsections), `H4` (minor), `H5` (lead text).

**Body:** `Body` (default), `BodyMd` (secondary content), `BodySm` (captions/metadata), `BodyXs` (fine print).

**Code:** `Code` for inline code blocks.

**Weights:** `light` (300), `normal` (400), `medium` (500), `semibold` (600), `bold` (700).

All typography components support `as` prop for polymorphic rendering (e.g., `<H1 as="h2">`).

## Iconography

Uses `astro-icon` with [Fluent Icons](https://icon-sets.iconify.design/fluent/) (prefix `fluent:`).

```astro
import {Icon} from "astro-icon/components";
<Icon name="fluent:airplane-24-regular" size="24" />
```

## Color Tokens

**Primitives:** `--white`, `--black`, `--gray-{50-950}`, `--sky-{50,500,700,800}`, `--green-{50,300,500,700,900}`, `--amber-{50,300,500,600,700,900}`, `--red-{50,300,500,600,700,900}`.

**Semantic (light / dark):**

| Token                      | Light                 | Dark                  |
| -------------------------- | --------------------- | --------------------- |
| `--color-bg-primary`       | `--white` #FFFFFF     | `--black` #000000     |
| `--color-bg-secondary`     | `--gray-50` #FAFAFA   | `--gray-900` #141414  |
| `--color-bg-tertiary`      | `--gray-150` #EEEEEE  | `--gray-800` #262626  |
| `--color-bg-inverse`       | `--gray-900` #141414  | `--gray-100` #F6F6F6  |
| `--color-bg-mute`          | `--gray-200` #E5E5E5  | `--gray-600` #525252  |
| `--color-bg-success`       | `--green-50` #F0FDF4  | `--green-950` #052E16 |
| `--color-bg-warning`       | `--amber-50` #FFFBEB  | `--amber-950` #451A03 |
| `--color-bg-error`         | `--red-50` #FEF2F2    | `--red-950` #450A0A   |
| `--color-text-primary`     | `--gray-900` #141414  | `--gray-100` #F6F6F6  |
| `--color-text-secondary`   | `--gray-600` #525252  | `--gray-150` #EEEEEE  |
| `--color-text-tertiary`    | `--gray-500` #737373  | `--gray-500` #737373  |
| `--color-text-inverse`     | `--gray-100` #F6F6F6  | `--gray-900` #141414  |
| `--color-text-mute`        | `--gray-500` #737373  | `--gray-500` #737373  |
| `--color-text-success`     | `--green-700` #15803D | `--green-400` #4ADE80 |
| `--color-text-warning`     | `--amber-700` #B45309 | `--amber-400` #FBBF24 |
| `--color-text-error`       | `--red-700` #B91C1C   | `--red-400` #F87171   |
| `--color-border-primary`   | `--gray-300` #D4D4D4  | `--gray-500` #737373  |
| `--color-border-secondary` | `--gray-200` #E5E5E5  | `--gray-800` #262626  |
| `--color-border-tertiary`  | `--gray-400` #A3A3A3  | `--gray-400` #A3A3A3  |
| `--color-border-inverse`   | `--gray-700` #404040  | `--gray-200` #E5E5E5  |
| `--color-border-mute`      | `--gray-300` #D4D4D4  | `--gray-700` #404040  |
| `--color-border-success`   | `--green-200` #BBF7D0 | `--green-800` #166534 |
| `--color-border-warning`   | `--amber-200` #FDE68A | `--amber-800` #92400E |
| `--color-border-error`     | `--red-200` #FECACA   | `--red-800` #991B1B   |

Colors are defined using OKLCH color space with `light-dark()` for theme switching.

## Spacing

`--space-{0.5,1,2,3,4,6,8,12,16}` mapping to `2px` through `64px`.

## Type Scale

`--font-size-{xs,sm,base,lg,xl,2xl,3xl,4xl,5xl,6xl}` mapping to `12px` through `54px`.

## Buttons

`<Button>` supports `variant` (`primary`, `secondary`), `size` (`md`, `sm`, `xs`), `ghost` (transparent bg), `disabled`, and `as="a"` for links.

## Form Elements

`<Select>` — custom dropdown with WAI-ARIA support. Variants: `default`, `ghost`, `minimal`, `icon`. Sizes: `sm`, `md`, `lg`. Emits `select-change` event.

## Grid & Layout

- `<Grid>` + `<Col>` — 12-column responsive grid. Props: `xs`, `md`, `lg`, `gap`.
- `<Flex>` + `<FlexItem>` — Flexbox layouts. Props: `direction`, `gap`, `justify`, `align`, `grow`, `basis`.
- `<Container>` — Centered wrapper (`max-width: 1440px`).

## Breakpoints

| Name | Range          | Media query            |
| ---- | -------------- | ---------------------- |
| `xs` | < 768px        | `--xs-only`            |
| `md` | 768px – 1439px | `--md-only`, `--md-up` |
| `lg` | >= 1440px      | `--lg-up`, `--lg-down` |
