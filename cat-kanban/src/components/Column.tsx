import React from 'react';
import { TaskStatus } from '../types';

interface ColumnProps {
  title: string;
  status: TaskStatus;
  children?: React.ReactNode;
}

export function Column({ title, status, children }: ColumnProps) {
  // Map status to appropriate CSS class for styling
  const columnColorClass = {
    todo: 'bg-todo',
    doing: 'bg-doing',
    done: 'bg-done',
  }[status];
  
  const headerColorClass = {
    todo: 'bg-todo-header',
    doing: 'bg-doing-header',
    done: 'bg-done-header',
  }[status];

  return (
    <div className={`kanban-column ${columnColorClass}`}>
      <h2 className={`kanban-column-header ${headerColorClass}`}>
        {title}
      </h2>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}