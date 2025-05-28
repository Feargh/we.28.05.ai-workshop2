"use client";

import React from 'react';
import { Task as TaskType } from '@/types';
import { Card } from './Card';
import { Button } from './Button';
import { useTasks } from '@/hooks/useTasks';

interface TaskProps {
  task: TaskType;
  onEdit?: () => void;
  onDelete?: () => void;
}

/**
 * Task component that displays a task as a card in a Kanban column
 */
export function Task({ task, onEdit, onDelete }: TaskProps) {
  const { moveTask } = useTasks();
  
  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString();
  };
  
  // Priority badge styles
  const priorityClass = {
    low: 'priority-low',
    medium: 'priority-medium',
    high: 'priority-high',
  }[task.priority];
  
  // Priority label for display
  const priorityLabel = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
  }[task.priority];
  
  // Card header with title and priority badge
  const cardHeader = (
    <div className="flex justify-between items-center">
      <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate mr-2">
        {task.title}
      </h3>
      <span className={`priority-badge ${priorityClass}`}>
        {priorityLabel}
      </span>
    </div>
  );
  
  // Status controls for moving tasks
  const renderStatusControls = () => {
    switch (task.status) {
      case 'todo':
        return (
          <Button 
            size="small" 
            variant="primary"
            onClick={() => moveTask(task.id, 'doing')}
          >
            Start
          </Button>
        );
      case 'doing':
        return (
          <div className="flex space-x-2">
            <Button 
              size="small" 
              variant="secondary"
              onClick={() => moveTask(task.id, 'todo')}
            >
              Back
            </Button>
            <Button 
              size="small" 
              variant="success"
              onClick={() => moveTask(task.id, 'done')}
            >
              Complete
            </Button>
          </div>
        );
      case 'done':
        return (
          <Button 
            size="small" 
            variant="secondary"
            onClick={() => moveTask(task.id, 'doing')}
          >
            Reopen
          </Button>
        );
      default:
        return null;
    }
  };
  
  // Card footer with controls
  const cardFooter = (
    <div className="flex justify-between items-center">
      <div className="flex space-x-2">
        {onEdit && (
          <Button size="small" variant="secondary" onClick={onEdit}>
            Edit
          </Button>
        )}
        {onDelete && (
          <Button size="small" variant="danger" onClick={onDelete}>
            Delete
          </Button>
        )}
      </div>
      <div>
        {renderStatusControls()}
      </div>
    </div>
  );
  
  return (
    <Card 
      header={cardHeader}
      footer={cardFooter}
      className="task-card mb-3"
    >
      <div className="space-y-3">
        {task.description && (
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {task.description}
          </p>
        )}
        
        {task.dueDate && (
          <div className="text-xs text-gray-600 dark:text-gray-400">
            <span className="font-medium">Due:</span> {formatDate(task.dueDate)}
          </div>
        )}
        
        <div className="text-xs text-gray-500 dark:text-gray-500">
          Created: {formatDate(task.createdAt)}
        </div>
      </div>
    </Card>
  );
}