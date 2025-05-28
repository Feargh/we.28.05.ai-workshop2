import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * Main layout component that provides consistent structure for all pages
 * Includes optional header and footer slots
 */
export function Layout({ children, header, footer }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      {header && (
        <header className="bg-white dark:bg-gray-800 shadow-sm py-4 px-6">
          {header}
        </header>
      )}

      {/* Main content */}
      <main className="flex-1 p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Footer */}
      {footer && (
        <footer className="bg-white dark:bg-gray-800 py-4 px-6 border-t border-gray-200 dark:border-gray-700">
          {footer}
        </footer>
      )}
    </div>
  );
}