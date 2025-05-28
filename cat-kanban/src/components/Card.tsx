import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * Card component for displaying content in a contained box
 */
export function Card({ children, className = '', header, footer }: CardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}>
      {header && (
        <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          {header}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
      {footer && (
        <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3 bg-gray-50 dark:bg-gray-900">
          {footer}
        </div>
      )}
    </div>
  );
}