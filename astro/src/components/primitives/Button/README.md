# Button Component

Interactive button primitive with support for variants, sizes, and icon slots.

## Usage

```astro
import { Button } from '@/components/primitives';

<Button variant="primary" size="md">
  Click me
</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `'button' \| 'a' \| 'span'` | `'button'` | HTML element to render |
| `size` | `'md' \| 'sm' \| 'xs'` | `'md'` | Button size variant |
| `variant` | `'primary' \| 'inverse'` | `'primary'` | Button style variant |
| `ghost` | `boolean` | `false` | Ghost style (transparent background) |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Button type (only for button element) |

## Sizes

### Medium (default)
```astro
<Button size="md">Medium Button</Button>
```

### Small
```astro
<Button size="sm">Small Button</Button>
```

### Extra Small
```astro
<Button size="xs">Extra Small</Button>
```

## Variants

### Primary (default)
```astro
<Button variant="primary">Primary Button</Button>
```

### Inverse
```astro
<Button variant="inverse">Inverse Button</Button>
```

## Ghost Modifier

Remove background for a ghost/outline style:

```astro
<Button variant="primary" ghost>Ghost Primary</Button>
<Button variant="inverse" ghost>Ghost Inverse</Button>
```

## Icon Slots

The Button component provides two named slots for icons:

- `left` - Icon positioned before the text
- `right` - Icon positioned after the text

```astro
<Button variant="primary">
  <Icon slot="left" name="arrow-left" />
  Back
</Button>

<Button variant="primary">
  Continue
  <Icon slot="right" name="arrow-right" />
</Button>

<Button variant="primary">
  <Icon slot="left" name="download" />
  Download
  <Icon slot="right" name="external" />
</Button>
```

## Polymorphic Usage

Render as different HTML elements while maintaining button styling:

### As anchor tag
```astro
<Button as="a" href="/docs" variant="primary">
  Go to Docs
</Button>
```

### As span (for custom click handlers)
```astro
<Button as="span" variant="inverse">
  Custom Element
</Button>
```

## Examples

### Basic buttons
```astro
<Button>Default Button</Button>
<Button variant="primary">Primary</Button>
<Button variant="inverse">Inverse</Button>
```

### Ghost buttons
```astro
<Button ghost>Ghost Default</Button>
<Button variant="primary" ghost>Ghost Primary</Button>
<Button variant="inverse" ghost>Ghost Inverse</Button>
```

### With icons
```astro
<Button variant="primary">
  <Icon slot="left" name="plus" />
  Add Item
</Button>

<Button variant="inverse" size="sm">
  <Icon slot="left" name="edit" />
  Edit
</Button>
```

### Different sizes
```astro
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
```

### As links
```astro
<Button as="a" href="/docs" variant="primary">
  Documentation
</Button>

<Button as="a" href="https://example.com" target="_blank" variant="inverse">
  External Link
  <Icon slot="right" name="external" />
</Button>
```

### Disabled state
```astro
<Button disabled>Disabled Button</Button>
<Button variant="primary" disabled>Disabled Primary</Button>
```

### Submit button
```astro
<form>
  <Button type="submit" variant="primary">
    Submit Form
  </Button>
</form>
```

## Accessibility

- Uses semantic HTML elements (`<button>`, `<a>`)
- Supports keyboard navigation
- Includes focus-visible outline
- Disabled state prevents interaction
- For links styled as buttons, use `as="a"` with proper `href`

## Design Tokens

The Button component uses CSS custom properties from the design system:

- `--color-button-primary-bg`
- `--color-button-primary-text`
- `--color-button-primary-bg-hover`
- `--color-bg-inverse`
- `--color-text-inverse`
- `--space-*` (spacing tokens)
- `--border-radius-md`
- `--color-focus-ring`

## Notes

- The default slot is for button text content
- Icons should be passed through named slots (`left`, `right`)
- When using `as="a"`, remember to include the `href` attribute
- Ghost buttons have transparent backgrounds with colored text and borders
