# Kanban Board: Architecture Specification

## Technology Stack

- **Language**: TypeScript
- **Framework**: Next.js (full-stack)
- **UI Library**: React (functional components with hooks)
- **Styling**: Tailwind CSS
- **Data Storage**: JSON file
- **Package Manager**: npm

## Application Architecture

The application follows a full-stack Next.js architecture with the following components:

### Frontend

- React functional components with hooks for state management
- React Context API for shared state
- Client-side data fetching using fetch API or SWR
- Tailwind CSS for styling

### Backend

- Next.js API routes for data operations
- File-based JSON storage
- Server-side validation

## Directory Structure

The project follows a type-based organization:

```
/
├── pages/              # Next.js pages and API routes
│   ├── index.tsx       # Main board page
│   ├── api/            # API endpoints
│   │   └── tasks.ts    # Task CRUD operations
├── src/                # Source code
│   ├── app/            # Next.js App Router (current setup)
│   │   ├── page.tsx    # Main board page
│   │   ├── layout.tsx  # Root layout
│   │   └── globals.css # Global styles
│   ├── components/     # Reusable React components (will be added)
│   │   ├── Board.tsx   # Main board component
│   │   ├── Column.tsx  # Individual column component
│   │   ├── Task.tsx    # Task card component
│   │   ├── TaskForm.tsx # Form for creating/editing tasks
│   │   └── ...
│   ├── hooks/          # Custom React hooks (will be added)
│   │   ├── useTasks.ts # Hook for task data operations
│   │   └── ...
│   ├── contexts/       # React contexts (will be added)
│   │   └── TaskContext.tsx # Task data and operations context
│   ├── types/          # TypeScript type definitions
│   │   └── index.ts    # Task and other shared types
│   └── utils/          # Utility functions
│       ├── fileStorage.ts # File operations for data persistence
│       └── ...
├── data/               # Data storage
│   └── tasks.json      # JSON file for tasks
├── styles/             # Global styles (if using pages router)
│   └── globals.css     # Tailwind imports and global styles
└── public/             # Static assets
```

## Data Flow

1. The user interacts with the UI (creates, moves, or deletes a task)
2. React component calls an API function from the hooks layer
3. The API function makes a request to the Next.js API route
4. The API route performs the operation on the JSON file
5. The response is returned to the frontend
6. The UI updates to reflect the change

## Data Model

### Task

```typescript
interface Task {
  id: string;          // Unique identifier
  title: string;       // Task title
  description?: string; // Optional description
  status: TaskStatus;  // Task status/column (todo, doing, done)
  priority: TaskPriority; // Task priority (low, medium, high)
  dueDate?: string;    // Optional due date (ISO string)
  createdAt: string;   // Creation timestamp (ISO string)
  updatedAt: string;   // Last update timestamp (ISO string)
}

type TaskStatus = "todo" | "doing" | "done";
type TaskPriority = "low" | "medium" | "high";
```

## File Storage

The application uses file-based JSON storage with the following utility functions:

- `readTasks()`: Reads all tasks from the JSON file
- `writeTasks(tasks)`: Writes tasks to the JSON file
- `addTask(task)`: Adds a new task to the JSON file
- `updateTask(updatedTask)`: Updates an existing task in the JSON file
- `deleteTask(id)`: Deletes a task from the JSON file

## API Endpoints

All endpoints are Next.js API routes under `/api/`.

### GET `/api/tasks`

- Returns all tasks
- Optional query parameters for filtering

### POST `/api/tasks`

- Creates a new task
- Requires task data in request body (excluding id, createdAt, updatedAt)

### PUT `/api/tasks/:id`

- Updates an existing task
- Requires task data in request body

### DELETE `/api/tasks/:id`

- Deletes a task
- Requires task id in URL

## Error Handling

- React error boundaries for UI rendering errors
- Try/catch blocks for data operations
- Consistent error response format from API
- User-friendly error messages displayed in the UI

## State Management

- React useState for local component state
- React Context API for shared application state
- SWR for data fetching, caching, and revalidation

## Performance Considerations

- Optimize component re-renders with memoization
- Efficient data fetching with SWR
- Lazy loading of components when appropriate

## Security Considerations

- Input validation on both client and server
- No sensitive data stored in the application
- Error messages that don't expose implementation details