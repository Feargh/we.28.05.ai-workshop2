import { Task, TaskCreationPayload, TaskUpdatePayload } from '@/types';

/**
 * API Utility functions for task operations
 */

const API_BASE_URL = '/api/tasks';

/**
 * Fetches all tasks from the API
 * @returns Promise resolving to an array of tasks
 */
export async function fetchTasks(): Promise<Task[]> {
  try {
    const response = await fetch(API_BASE_URL);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch tasks');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}

/**
 * Creates a new task
 * @param task - Task creation payload
 * @returns Promise resolving to the created task
 */
export async function createTask(task: TaskCreationPayload): Promise<Task> {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create task');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}

/**
 * Updates an existing task
 * @param id - Task ID
 * @param updates - Task update payload
 * @returns Promise resolving to the updated task
 */
export async function updateTask(id: string, updates: TaskUpdatePayload): Promise<Task> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update task');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}

/**
 * Deletes a task
 * @param id - Task ID
 * @returns Promise resolving to void on success
 */
export async function deleteTask(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok && response.status !== 204) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete task');
    }
    
    return;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
}