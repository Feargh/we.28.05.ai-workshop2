"use client";

import { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Task, TaskCreationPayload, TaskUpdatePayload, TaskStatus } from '@/types';
import * as api from '@/utils/api';

/**
 * Task Context interface
 */
interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  createTask: (task: TaskCreationPayload) => Promise<Task>;
  updateTask: (id: string, updates: TaskUpdatePayload) => Promise<Task>;
  deleteTask: (id: string) => Promise<void>;
  getTasksByStatus: (status: TaskStatus) => Task[];
  refreshTasks: () => Promise<void>;
}

/**
 * Default context value
 */
const defaultContextValue: TaskContextType = {
  tasks: [],
  loading: false,
  error: null,
  createTask: async () => {
    throw new Error('TaskContext not initialized');
  },
  updateTask: async () => {
    throw new Error('TaskContext not initialized');
  },
  deleteTask: async () => {
    throw new Error('TaskContext not initialized');
  },
  getTasksByStatus: () => [],
  refreshTasks: async () => {
    throw new Error('TaskContext not initialized');
  },
};

/**
 * Create the context with default value
 */
export const TaskContext = createContext<TaskContextType>(defaultContextValue);

/**
 * TaskProvider props
 */
interface TaskProviderProps {
  children: ReactNode;
}

/**
 * TaskProvider component that provides task state and operations
 */
export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch tasks from API
   */
  const refreshTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTasks = await api.fetchTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create a new task
   */
  const createTask = useCallback(async (taskData: TaskCreationPayload): Promise<Task> => {
    try {
      setError(null);
      const newTask = await api.createTask(taskData);
      setTasks(prevTasks => [...prevTasks, newTask]);
      return newTask;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
      throw err;
    }
  }, []);

  /**
   * Update an existing task
   */
  const updateTask = useCallback(async (id: string, updates: TaskUpdatePayload): Promise<Task> => {
    try {
      setError(null);
      const updatedTask = await api.updateTask(id, updates);
      setTasks(prevTasks =>
        prevTasks.map(task => (task.id === id ? updatedTask : task))
      );
      return updatedTask;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
      throw err;
    }
  }, []);

  /**
   * Delete a task
   */
  const deleteTask = useCallback(async (id: string): Promise<void> => {
    try {
      setError(null);
      await api.deleteTask(id);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
      throw err;
    }
  }, []);

  /**
   * Get tasks filtered by status
   */
  const getTasksByStatus = useCallback(
    (status: TaskStatus): Task[] => {
      return tasks.filter(task => task.status === status);
    },
    [tasks]
  );

  /**
   * Load tasks on initial mount
   */
  useEffect(() => {
    refreshTasks();
  }, [refreshTasks]);

  /**
   * Context value
   */
  const contextValue: TaskContextType = {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    getTasksByStatus,
    refreshTasks,
  };

  return <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>;
};