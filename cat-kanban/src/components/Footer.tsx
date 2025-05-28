import React from 'react';

interface FooterProps {
  text?: string;
}

/**
 * Application footer component
 * Displays a simple footer with copyright text
 */
export function Footer({ text = '© Cat Kanban' }: FooterProps) {
  return (
    <div className="flex justify-center text-sm text-gray-500 dark:text-gray-400">
      {text} {new Date().getFullYear()}
    </div>
  );
}