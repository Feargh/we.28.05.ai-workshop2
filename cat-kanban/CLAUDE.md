**IMPORTANT FOR CLAUDE: Reference this file before implementing anything**

# Project: Kanban Board

## Project Overview

A collaborative Kanban board application built as a local web app where users can manage tasks by adding, updating, and moving them between columns: "To Do", "Doing", and "Done". The app uses JSON file storage for persistence and focuses on a clean, responsive UI with core task management functionality.

## Tech Stack

- Languages: TypeScript
- Frameworks: Next.js, React (functional components with hooks)
- Tools: npm, Tailwind CSS v4, JSON file storage

## Code Style & Conventions

### Import/Module Standards

- Group imports by type with a blank line between groups: React/Next.js imports, third-party libraries, internal components/hooks, types, utilities
- Use absolute imports for project files (e.g., `components/Task` instead of `../components/Task`)
- Destructure imports when appropriate (e.g., `import { useState } from 'react'`)

### Naming Conventions

- Functions: camelCase, descriptive verbs (e.g., `createTask`, `updateStatus`)
- Components: PascalCase, noun-based (e.g., `TaskCard`, `BoardColumn`)
- Constants: camelCase for regular constants, UPPER_SNAKE_CASE for true constants
- Files: camelCase for utilities/hooks, PascalCase for components

### Patterns to Follow

- Use functional components with hooks for all React components
- Implement error boundaries at the page level for UI errors
- Use try/catch for data operations with user-friendly error messages
- Organize code by technical type (components, hooks, utils, etc.)
- Keep components small and focused on a single responsibility
- Use TypeScript interfaces for data structures and component props

## Development Workflow

- Branch strategy: Feature branches with PRs to main branch
- Commit message format: Conventional Commits (`type(scope): message`)
  - Types: feat, fix, docs, style, refactor, test, chore
  - Example: `feat(board): add task filtering by priority`
- PR requirements: Code review by teammate, passes manual testing

## Testing Strategy

- Manual testing of all features
- Test plan documented in PR description
- Test from different browsers if time permits

## Environment Setup

- Required environment variables: None for local development
- Setup commands:
  - `npm install` - Install dependencies
  - `npm run dev` - Start development server

## Common Commands

```bash
# Build command
npm run build

# Test command
npm run test

# Lint command
npm run lint

# Development server
npm run dev
```

## Project Structure

Key directories and their purpose:

- `/pages` - Next.js pages and API routes
- `/components` - Reusable React components
- `/hooks` - Custom React hooks
- `/contexts` - React context providers
- `/types` - TypeScript type definitions
- `/utils` - Utility functions
- `/data` - Data storage (JSON file)
- `/styles` - Global styles and Tailwind configuration
- `/public` - Static assets

## Review Process Guidelines

Before submitting any code, ensure the following steps are completed:

1. **Run all lint, check and test commands**

2. **Review outputs and iterate until all issues are resolved**

3. **Assess compliance**:
   For each standard, explicitly state ✅ or ❌ and explain why:

   - Code style and formatting: Follows TypeScript and React best practices
   - Naming conventions: Uses camelCase for functions/files, PascalCase for components
   - Architecture patterns (refer to `ARCHITECTURE.md`): Adheres to defined data flow and component structure
   - Error handling: Implements error boundaries and try/catch blocks
   - Test coverage: Manual testing of all features completed
   - Documentation: Code is self-documenting with clear function and variable names

4. **Self-review checklist**:
   - [ ] Code follows defined patterns
   - [ ] No debug/commented code
   - [ ] Error handling implemented
   - [ ] Tests completed
   - [ ] Documentation updated if needed

## Known Issues & Workarounds

- JSON file storage has limited concurrent write capability - implement proper error handling for write conflicts
- No authentication or user management - all users share the same board
- Local development only - no deployment configuration provided
- Tailwind CSS v4 requires specific configuration - use @tailwindcss/postcss plugin in postcss.config.mjs and @import syntax in globals.css
- Next.js App Router components using React hooks or Context API must include "use client" directive

## Tailwind CSS v4 Configuration

- Use @import 'tailwindcss' in globals.css instead of @tailwind directives
- Configure postcss.config.mjs with @tailwindcss/postcss plugin
- Create tailwind.config.js with content paths and theme extensions
- Use CSS variables for theming and consistent color patterns
- Define component-specific utility classes in @layer components

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- Refer to `FUNCTIONAL.md` for feature specifications
- Refer to `ARCHITECTURE.md` for architectural details