/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Use CSS variables for theming
        'todo': 'var(--todo-color)',
        'doing': 'var(--doing-color)',
        'done': 'var(--done-color)',
        'todo-header': 'var(--todo-header)',
        'doing-header': 'var(--doing-header)',
        'done-header': 'var(--done-header)',
        'priority-low': 'var(--priority-low)',
        'priority-medium': 'var(--priority-medium)',
        'priority-high': 'var(--priority-high)',
      },
    },
  },
  plugins: [],
}