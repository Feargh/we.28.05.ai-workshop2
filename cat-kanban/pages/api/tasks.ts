import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskCreationPayload } from '@/types';
import { readTasks, addTask } from '@/utils/fileStorage';

/**
 * API handler for tasks
 * Supports GET and POST methods
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Extract the request method
  const { method } = req;

  // Handle different HTTP methods
  switch (method) {
    case 'GET':
      return handleGetTasks(req, res);
    case 'POST':
      return handleCreateTask(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}

/**
 * GET /api/tasks
 * Returns all tasks
 */
async function handleGetTasks(req: NextApiRequest, res: NextApiResponse) {
  try {
    const tasks = await readTasks();
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
}

/**
 * POST /api/tasks
 * Creates a new task
 */
async function handleCreateTask(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = req.body as TaskCreationPayload;
    
    // Validate required fields
    if (!body.title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    if (!body.status) {
      return res.status(400).json({ error: 'Status is required' });
    }
    
    if (!body.priority) {
      return res.status(400).json({ error: 'Priority is required' });
    }
    
    // Create new task with auto-generated fields
    const now = new Date().toISOString();
    const newTask: Task = {
      id: uuidv4(),
      title: body.title,
      description: body.description,
      status: body.status,
      priority: body.priority,
      dueDate: body.dueDate,
      createdAt: now,
      updatedAt: now,
    };
    
    // Add task to storage
    const result = await addTask(newTask);
    
    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
}