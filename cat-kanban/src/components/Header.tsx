import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  title?: string;
}

/**
 * Application header component
 * Displays the app title and can be extended with navigation
 */
export function Header({ title = 'Cat Kanban' }: HeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {title}
          </Link>
        </h1>
      </div>
      <nav className="flex items-center space-x-4">
        {/* Navigation items can be added here */}
      </nav>
    </div>
  );
}