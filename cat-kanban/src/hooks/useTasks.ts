"use client";

import { useContext } from 'react';
import { TaskContext } from '@/contexts/TaskContext';
import { Task, TaskStatus } from '@/types';

/**
 * Custom hook for accessing task data and operations
 * 
 * @returns Task data and operations from TaskContext
 */
export function useTasks() {
  const context = useContext(TaskContext);
  
  // Throw an error if the hook is used outside of a TaskProvider
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  
  /**
   * Move a task to a different status column
   * 
   * @param id - Task ID
   * @param status - New status
   * @returns Promise resolving to the updated task
   */
  const moveTask = async (id: string, status: TaskStatus): Promise<Task> => {
    return context.updateTask(id, { status });
  };
  
  /**
   * Get tasks grouped by status
   * 
   * @returns Object with tasks grouped by status
   */
  const getTasksGroupedByStatus = () => {
    return {
      todo: context.getTasksByStatus('todo'),
      doing: context.getTasksByStatus('doing'),
      done: context.getTasksByStatus('done'),
    };
  };
  
  return {
    // All context properties
    tasks: context.tasks,
    loading: context.loading,
    error: context.error,
    createTask: context.createTask,
    updateTask: context.updateTask,
    deleteTask: context.deleteTask,
    refreshTasks: context.refreshTasks,
    
    // Additional helper functions
    moveTask,
    getTasksGroupedByStatus,
    getTasksByStatus: context.getTasksByStatus,
  };
}