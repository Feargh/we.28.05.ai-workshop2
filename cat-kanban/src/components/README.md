# Component Styling Patterns

This document outlines the styling patterns and conventions used for components in the Cat Kanban project.

## General Principles

- Use Tailwind CSS for all styling
- Follow a consistent pattern for component props
- Keep components small and focused on a single responsibility
- Use TypeScript interfaces for component props

## Common Patterns

### Layout Components

- `Layout.tsx`: Main layout with optional header and footer
- Use flexbox for vertical layouts (`flex flex-col`)
- Use responsive padding and max-width containers

### Interactive Elements

- `Button.tsx`: Reusable button with variants and sizes
- Use consistent focus states with `focus:ring-2 focus:ring-offset-2`
- Use hover states with color transitions
- Include appropriate ARIA attributes

### Containers

- `Card.tsx`: Content container with optional header and footer
- Use consistent border colors and rounded corners
- Apply subtle shadows for depth
- Use proper spacing with padding

## Color System

- Use CSS variables for theming
- Follow dark mode conventions with `dark:` variants
- Use semantic color naming in CSS variables

## Typography

- Use consistent font sizes with Tailwind's scale
- Follow a typographic hierarchy
- Use appropriate line heights

## Responsive Design

- Mobile-first approach
- Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`)
- Ensure all components work well on both desktop and tablet

## Component Props

- Follow consistent naming conventions
- Use optional chaining for optional props
- Provide sensible defaults

## Example

```tsx
interface ComponentProps {
  // Required props
  children: React.ReactNode;
  
  // Optional props with defaults
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function Component({ 
  children, 
  variant = 'primary',
  className = '',
}: ComponentProps) {
  // Component implementation
}
```