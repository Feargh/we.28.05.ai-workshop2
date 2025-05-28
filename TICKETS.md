# Kanban Board: Development Tickets

## Ticket Structure

Each ticket includes:
- **ID**: Unique identifier (e.g., BE-01)
- **Title**: Brief description
- **Description**: Detailed explanation
- **Deliverables**: Specific artifacts to be produced
- **Prerequisites**: Tickets that must be completed first
- **Assignee**: Developer responsible (Fearghal for FE, Alex for BE)
- **Definition of Done**: Criteria for completion

## Backend Tickets (Alex)

### BE-01: Project Setup and Initial Configuration
- **Description**: Initialize Next.js project with TypeScript, set up directory structure, configure Tailwind CSS, and establish base configurations.
- **Deliverables**: 
  - Initialized Next.js project with TypeScript
  - Configured Tailwind CSS
  - Directory structure as specified in ARCHITECTURE.md
  - Base configuration files (.gitignore, tsconfig.json, etc.)
- **Prerequisites**: None
- **Assignee**: Alex
- **Definition of Done**: Project structure is set up and all developers can run the development server.

### BE-02: Define TypeScript Data Models
- **Description**: Create TypeScript interfaces for Task and other data models as specified in ARCHITECTURE.md.
- **Deliverables**:
  - types/index.ts file with Task interface and other necessary types
- **Prerequisites**: BE-01
- **Assignee**: Alex
- **Definition of Done**: TypeScript interfaces are defined and available for import in other components.

### BE-03: Implement File-based Data Storage
- **Description**: Create utility functions for reading from and writing to the JSON file used for task storage.
- **Deliverables**:
  - utils/fileStorage.ts with functions for file operations
  - Initial data/tasks.json file structure
- **Prerequisites**: BE-02
- **Assignee**: Alex
- **Definition of Done**: Functions can successfully read and write task data to the JSON file.

### BE-04: Create Task API Routes (GET and POST)
- **Description**: Implement Next.js API routes for fetching all tasks and creating new tasks.
- **Deliverables**:
  - pages/api/tasks.ts for GET and POST operations
  - Error handling and validation logic
- **Prerequisites**: BE-03
- **Assignee**: Alex
- **Definition of Done**: API endpoints return appropriate responses and can be tested with Postman or similar tools.

### BE-05: Create Task API Routes (PUT and DELETE)
- **Description**: Implement Next.js API routes for updating and deleting tasks.
- **Deliverables**:
  - pages/api/tasks/[id].ts for PUT and DELETE operations
  - Error handling and validation logic
- **Prerequisites**: BE-04
- **Assignee**: Alex
- **Definition of Done**: API endpoints return appropriate responses and can be tested with Postman or similar tools.

### BE-06: Implement Filtering Capabilities
- **Description**: Add filtering capabilities to the GET API route based on priority and due date.
- **Deliverables**:
  - Updated GET endpoint with query parameter handling
  - Filter logic implementation
- **Prerequisites**: BE-04
- **Assignee**: Alex
- **Definition of Done**: API can filter tasks by priority and due date parameters.

### BE-07: API Error Handling and Validation
- **Description**: Enhance API routes with comprehensive error handling and input validation.
- **Deliverables**:
  - Improved error handling in all API routes
  - Input validation middleware or functions
  - Consistent error response format
- **Prerequisites**: BE-05, BE-06
- **Assignee**: Alex
- **Definition of Done**: API routes handle errors gracefully and validate inputs properly.

## Frontend Tickets (Fearghal)

### FE-01: Create Base UI Components
- **Description**: Create base UI components for the application including layout components and basic styling.
- **Deliverables**:
  - Basic layout components (Layout.tsx)
  - Global styling setup using Tailwind
  - Component styling patterns established
- **Prerequisites**: BE-01
- **Assignee**: Fearghal
- **Definition of Done**: Base components are created and styled according to specifications.

### FE-02: Implement Board and Column Components
- **Description**: Create the Board component with three fixed columns (To Do, Doing, Done).
- **Deliverables**:
  - components/Board.tsx
  - components/Column.tsx
  - Responsive layout for columns
- **Prerequisites**: FE-01, BE-02
- **Assignee**: Fearghal
- **Definition of Done**: Board renders with three visually distinct columns that are responsive.

### FE-03: Create Task Context and Hooks
- **Description**: Implement React Context for task state management and custom hooks for task operations.
- **Deliverables**:
  - contexts/TaskContext.tsx
  - hooks/useTasks.ts
  - API utility functions in utils/api.ts
- **Prerequisites**: BE-02, BE-04
- **Assignee**: Fearghal
- **Definition of Done**: Context provides task data and operations to components, hooks handle API calls.

### FE-04: Implement Task Card Component
- **Description**: Create the Task card component to display task information.
- **Deliverables**:
  - components/Task.tsx
  - Visual indicators for priority
  - Due date display
- **Prerequisites**: FE-03
- **Assignee**: Fearghal
- **Definition of Done**: Task cards display all required information and are styled appropriately.

### FE-05: Create Task Creation Form
- **Description**: Implement form for creating new tasks.
- **Deliverables**:
  - components/TaskForm.tsx
  - Form validation
  - UI feedback for submission
- **Prerequisites**: FE-03
- **Assignee**: Fearghal
- **Definition of Done**: Users can create new tasks via form that validates inputs.

### FE-06: Implement Task Edit Functionality
- **Description**: Add the ability to edit existing tasks.
- **Deliverables**:
  - Edit mode for TaskForm.tsx
  - Integration with TaskContext for updates
- **Prerequisites**: FE-05, BE-05
- **Assignee**: Fearghal
- **Definition of Done**: Users can edit existing tasks, with changes persisted via API.

### FE-07: Implement Task Movement Between Columns
- **Description**: Add functionality to move tasks between columns (change status).
- **Deliverables**:
  - UI controls for changing task status
  - Integration with TaskContext for updates
- **Prerequisites**: FE-04, BE-05
- **Assignee**: Fearghal
- **Definition of Done**: Users can move tasks between columns with visual feedback.

### FE-08: Implement Task Deletion
- **Description**: Add functionality to delete tasks.
- **Deliverables**:
  - Delete button on Task cards
  - Confirmation dialog
  - Integration with TaskContext
- **Prerequisites**: FE-04, BE-05
- **Assignee**: Fearghal
- **Definition of Done**: Users can delete tasks with confirmation.

### FE-09: Implement Filtering Interface
- **Description**: Create UI for filtering tasks by priority and due date.
- **Deliverables**:
  - Filter controls in UI
  - Integration with TaskContext
  - Visual indication of active filters
- **Prerequisites**: FE-03, BE-06
- **Assignee**: Fearghal
- **Definition of Done**: Users can filter tasks with visual feedback.

### FE-10: Add Error Handling and Loading States
- **Description**: Implement error boundaries, loading states, and user-friendly error messages.
- **Deliverables**:
  - Error boundary components
  - Loading indicators
  - Error message displays
- **Prerequisites**: FE-03
- **Assignee**: Fearghal
- **Definition of Done**: Application handles errors gracefully and provides feedback during loading.

## Integration Tickets

### INT-01: End-to-End Testing and Bug Fixes
- **Description**: Perform manual testing of all features and fix any bugs found.
- **Deliverables**:
  - Test plan execution results
  - Bug fixes as needed
- **Prerequisites**: All BE and FE tickets
- **Assignee**: Both Fearghal and Alex
- **Definition of Done**: Application passes all manual tests and operates as expected.

### INT-02: Performance Optimization
- **Description**: Identify and address any performance issues.
- **Deliverables**:
  - Optimized components (memoization)
  - Improved data fetching
  - General performance improvements
- **Prerequisites**: INT-01
- **Assignee**: Both Fearghal and Alex
- **Definition of Done**: Application meets performance requirements specified in FUNCTIONAL.md.

## Development Timeline

The tickets are ordered to allow both developers to work simultaneously with minimal blocking:

1. Alex starts with project setup (BE-01) and data models (BE-02)
2. Fearghal can begin base UI work (FE-01) after project setup
3. Alex continues with file storage (BE-03) and initial API routes (BE-04)
4. Fearghal implements board structure (FE-02) and task context (FE-03)
5. Development continues in parallel with frontend consuming available APIs
6. Integration testing and optimization happen at the end

This structure allows both developers to work efficiently without excessive wait times while maintaining logical dependencies between tickets.