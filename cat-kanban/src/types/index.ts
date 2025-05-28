/**
 * Type definitions for the Kanban Board application
 */

/**
 * Task status options
 */
export type TaskStatus = "todo" | "doing" | "done";

/**
 * Task priority levels
 */
export type TaskPriority = "low" | "medium" | "high";

/**
 * Task interface representing a task card on the Kanban board
 */
export interface Task {
  id: string; // Unique identifier
  title: string; // Task title
  description?: string; // Optional description
  status: TaskStatus; // Task status/column
  priority: TaskPriority; // Task priority
  dueDate?: string; // Optional due date (ISO string)
  createdAt: string; // Creation timestamp (ISO string)
  updatedAt: string; // Last update timestamp (ISO string)
}

/**
 * Task creation payload (excludes auto-generated fields)
 */
export type TaskCreationPayload = Omit<Task, "id" | "createdAt" | "updatedAt">;

/**
 * Task update payload
 */
export type TaskUpdatePayload = Partial<Omit<Task, "createdAt" | "updatedAt">>;
