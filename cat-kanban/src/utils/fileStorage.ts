import fs from 'fs/promises';
import path from 'path';
import { Task } from '../types';

// Path to the tasks data file
const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'tasks.json');

/**
 * Reads all tasks from the JSON file
 * @returns Promise resolving to an array of tasks
 */
export async function readTasks(): Promise<Task[]> {
  try {
    // Check if the file exists
    await fs.access(DATA_FILE_PATH).catch(async () => {
      // If it doesn't, create it with an empty array
      await writeTasks([]);
    });

    // Read the file
    const data = await fs.readFile(DATA_FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading tasks file:', error);
    throw new Error('Failed to read tasks data');
  }
}

/**
 * Writes tasks to the JSON file
 * @param tasks - Array of tasks to write
 * @returns Promise resolving when write is complete
 */
export async function writeTasks(tasks: Task[]): Promise<void> {
  try {
    // Create the directory if it doesn't exist
    const dir = path.dirname(DATA_FILE_PATH);
    await fs.mkdir(dir, { recursive: true });

    // Write the file
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(tasks, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing tasks file:', error);
    throw new Error('Failed to write tasks data');
  }
}

/**
 * Adds a new task to the JSON file
 * @param task - Task to add
 * @returns Promise resolving to the added task
 */
export async function addTask(task: Task): Promise<Task> {
  try {
    const tasks = await readTasks();
    tasks.push(task);
    await writeTasks(tasks);
    return task;
  } catch (error) {
    console.error('Error adding task:', error);
    throw new Error('Failed to add task');
  }
}

/**
 * Updates an existing task in the JSON file
 * @param updatedTask - Task with updated fields
 * @returns Promise resolving to the updated task
 */
export async function updateTask(updatedTask: Task): Promise<Task | null> {
  try {
    const tasks = await readTasks();
    const index = tasks.findIndex(task => task.id === updatedTask.id);
    
    if (index === -1) {
      return null;
    }
    
    tasks[index] = updatedTask;
    await writeTasks(tasks);
    return updatedTask;
  } catch (error) {
    console.error('Error updating task:', error);
    throw new Error('Failed to update task');
  }
}

/**
 * Deletes a task from the JSON file
 * @param id - ID of the task to delete
 * @returns Promise resolving to a boolean indicating success
 */
export async function deleteTask(id: string): Promise<boolean> {
  try {
    const tasks = await readTasks();
    const initialLength = tasks.length;
    const filteredTasks = tasks.filter(task => task.id !== id);
    
    if (filteredTasks.length === initialLength) {
      return false; // Task not found
    }
    
    await writeTasks(filteredTasks);
    return true;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw new Error('Failed to delete task');
  }
}