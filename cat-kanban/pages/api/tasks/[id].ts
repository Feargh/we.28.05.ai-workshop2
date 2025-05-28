import { NextApiRequest, NextApiResponse } from 'next';
import { Task, TaskUpdatePayload } from '@/types';
import { readTasks, updateTask, deleteTask } from '@/utils/fileStorage';

/**
 * API handler for operations on a specific task
 * Supports PUT and DELETE methods
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Extract the request method and task id
  const { method } = req;
  const { id } = req.query;

  // Ensure id is a string
  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Invalid task ID' });
  }

  // Handle different HTTP methods
  switch (method) {
    case 'PUT':
      return handleUpdateTask(req, res, id);
    case 'DELETE':
      return handleDeleteTask(req, res, id);
    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}

/**
 * PUT /api/tasks/[id]
 * Updates an existing task
 */
async function handleUpdateTask(
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) {
  try {
    const body = req.body as TaskUpdatePayload;
    
    // Ensure we have an ID
    if (!id) {
      return res.status(400).json({ error: 'Task ID is required' });
    }

    // Ensure the body is not empty
    if (Object.keys(body).length === 0) {
      return res.status(400).json({ error: 'No update data provided' });
    }

    // Get the existing task
    const tasks = await readTasks();
    const existingTask = tasks.find(task => task.id === id);
    
    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Create updated task with new timestamp
    const updatedTask: Task = {
      ...existingTask,
      ...body,
      id, // Ensure ID remains the same
      updatedAt: new Date().toISOString(), // Update timestamp
      createdAt: existingTask.createdAt // Preserve original creation timestamp
    };
    
    // Update task in storage
    const result = await updateTask(updatedTask);
    
    if (!result) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.status(200).json(result);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
}

/**
 * DELETE /api/tasks/[id]
 * Deletes a task
 */
async function handleDeleteTask(
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) {
  try {
    // Ensure we have an ID
    if (!id) {
      return res.status(400).json({ error: 'Task ID is required' });
    }

    // Delete the task
    const success = await deleteTask(id);
    
    if (!success) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.status(204).end(); // No content response for successful deletion
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
}