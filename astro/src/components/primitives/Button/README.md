# Button

A versatile button component with multiple variants and sizes.

## Usage

```astro
---
import Button from '@primitives/Button/Button.astro';
---

<Button>Default Button</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
```

## Props

| Prop        | Type                                                                | Default     | Description                   |
| ----------- | ------------------------------------------------------------------- | ----------- | ----------------------------- |
| `variant`   | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'destructive'` | `'primary'` | Visual style                  |
| `size`      | `'sm' \| 'md' \| 'lg'`                                              | `'md'`      | Button size                   |
| `href`      | `string`                                                            | -           | Renders as `<a>` link         |
| `disabled`  | `boolean`                                                           | `false`     | Disabled state                |
| `fullWidth` | `boolean`                                                           | `false`     | Full width button             |
| `type`      | `'button' \| 'submit' \| 'reset'`                                   | `'button'`  | Button type (when not a link) |

## Examples

### As a link

```astro
<Button href="/docs" variant="primary">Read the Docs</Button>
```

### Sizes

```astro
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### Full width

```astro
<Button fullWidth>Submit Form</Button>
```

## CSS Architecture

Styles are in `Button.css` using `@layer components` for proper cascade ordering.

Classes follow BEM-like naming:

- `.btn` - Base class
- `.btn--primary` - Variant modifier
- `.btn--sm` - Size modifier
- `.btn--full` - Full width modifier
