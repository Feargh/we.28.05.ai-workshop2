"use client";

import { useState } from "react";
import {
  Layout,
  Header,
  Footer,
  Card,
  Button,
  Board,
  Task,
  TaskForm,
} from "@/components";
import { useTasks } from "@/hooks/useTasks";
import { Task as TaskType } from "@/types";
import { deleteTask } from "@/utils/api";

export default function Home() {
  const { loading, error, getTasksByStatus, refreshTasks } = useTasks();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<TaskType | null>(null);

  const todoTasks = getTasksByStatus("todo");
  const doingTasks = getTasksByStatus("doing");
  const doneTasks = getTasksByStatus("done");

  const handleTaskFormSuccess = () => {
    setShowTaskForm(false);
    setTaskToEdit(null);
    refreshTasks();
  };

  const handleEditTask = (task: TaskType) => {
    setTaskToEdit(task);
    setShowTaskForm(true);
  };

  const handleDeleteTask = async (task: TaskType) => {
    // setTaskToDelete(task);
    await deleteTask(task.id);
    refreshTasks();
  };

  return (
    <Layout header={<Header />} footer={<Footer />}>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome to Cat Kanban
          </h1>
          <Button
            onClick={() => {
              setTaskToEdit(null);
              setShowTaskForm(true);
            }}
            variant="primary"
          >
            Create Task
          </Button>
        </div>

        <p className="text-gray-600 dark:text-gray-300">
          Your simple and efficient task management board. Organize your tasks
          across different stages of completion.
        </p>

        {showTaskForm && (
          <div className="mb-6">
            <TaskForm
              task={taskToEdit || undefined}
              onSuccess={handleTaskFormSuccess}
              onCancel={() => {
                setShowTaskForm(false);
                setTaskToEdit(null);
              }}
            />
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Kanban Board</h2>

          {loading && <p>Loading tasks...</p>}

          {error && <p className="text-red-500">Error: {error}</p>}

          {!loading && !error && (
            <Board
              todoColumn={
                <div className="space-y-3">
                  {todoTasks.map((task) => (
                    <Task
                      key={task.id}
                      task={task}
                      onEdit={() => handleEditTask(task)}
                      onDelete={() => handleDeleteTask(task)}
                    />
                  ))}
                  {todoTasks.length === 0 && (
                    <p className="text-sm text-gray-500 text-center p-4">
                      No tasks yet
                    </p>
                  )}
                </div>
              }
              doingColumn={
                <div className="space-y-3">
                  {doingTasks.map((task) => (
                    <Task
                      key={task.id}
                      task={task}
                      onEdit={() => handleEditTask(task)}
                      onDelete={() => handleDeleteTask(task)}
                    />
                  ))}
                  {doingTasks.length === 0 && (
                    <p className="text-sm text-gray-500 text-center p-4">
                      No tasks in progress
                    </p>
                  )}
                </div>
              }
              doneColumn={
                <div className="space-y-3">
                  {doneTasks.map((task) => (
                    <Task
                      key={task.id}
                      task={task}
                      onEdit={() => handleEditTask(task)}
                      onDelete={() => handleDeleteTask(task)}
                    />
                  ))}
                  {doneTasks.length === 0 && (
                    <p className="text-sm text-gray-500 text-center p-4">
                      No completed tasks
                    </p>
                  )}
                </div>
              }
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
