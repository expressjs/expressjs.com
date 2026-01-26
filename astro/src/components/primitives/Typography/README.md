# Typography

A polymorphic text component for consistent typography across the site.

## Quick Start (Shorthand Components)

```astro
---
import { Display, H1, H2, H3, H4, H5, Body, Caption, Code } from '@components/primitives';
---

<Display>Hero Title</Display>
<H1>Page Title</H1>
<H2>Section Title</H2>
<H3>H3 title</H3>
<H4>H4 title</H4>
<H5>H5 title</H5>
<Body>Regular paragraph text.</Body>
<Caption>Last updated: Jan 2026</Caption>
<Code>npm install express</Code>
```

### Polymorphic `as` prop

Change the rendered HTML element while keeping the visual style:

```astro
<!-- Render an h2 element styled as h1 -->
<H1 as="h2">Looks like H1, but is an H2</H1>

<!-- Render a span styled as body -->
<Body as="span">Inline body text</Body>
```

## Base Component

For full control, use the base `Typography` component:

```astro
---
import { Typography } from '@components/primitives';
---

<Typography as="h1" variant="display" weight="bold" align="center"> Full control </Typography>
```

## Props

| Prop      | Type                | Default     | Description             |
| --------- | ------------------- | ----------- | ----------------------- |
| `as`      | `HTMLTag`           | `'p'`       | HTML element to render  |
| `variant` | `TypographyVariant` | `'body'`    | Typography style preset |
| `color`   | `TypographyColor`   | `'primary'` | Text color              |
| `weight`  | `TypographyWeight`  | -           | Font weight override    |
| `align`   | `TypographyAlign`   | -           | Text alignment          |
| `class`   | `string`            | -           | Additional CSS classes  |

## Variants

| Variant   | Size     | Weight   | Use case                      |
| --------- | -------- | -------- | ----------------------------- |
| `display` | 3.75rem  | bold     | Hero headings, landing pages  |
| `h1`      | 3rem     | bold     | Page titles                   |
| `h2`      | 2.25rem  | bold     | Section headings              |
| `h3`      | 1.875rem | semibold | Subsection headings           |
| `h4`      | 1.5rem   | semibold | Card titles, smaller sections |
| `body`    | 1rem     | normal   | Default paragraph text        |
| `body-lg` | 1.125rem | normal   | Intro paragraphs, lead text   |
| `body-sm` | 0.875rem | normal   | Secondary content             |
| `caption` | 0.75rem  | normal   | Helper text, metadata         |
| `code`    | 0.9em    | normal   | Inline code, monospace        |

## Colors

- `primary` — Main text color (default)
- `secondary` — Subdued text
- `tertiary` — Even more subdued
- `inherit` — Inherits from parent

## Accessibility

- Always use semantic `as` props (`h1`, `h2`, `p`, etc.) for proper document outline
- Don't skip heading levels (h1 → h3)
- The `variant` controls visual style; `as` controls semantics
