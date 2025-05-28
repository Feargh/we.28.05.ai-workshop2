"use client";

import { useState } from "react";
import {
  Task,
  TaskCreationPayload,
  TaskPriority,
  TaskStatus,
  TaskUpdatePayload,
} from "@/types";
import { Button } from "./Button";
import { Card } from "./Card";
import { useTasks } from "@/hooks/useTasks";

interface TaskFormProps {
  task?: Task;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function TaskForm({ task, onSuccess, onCancel }: TaskFormProps) {
  const { createTask, updateTask } = useTasks();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    priority: TaskPriority;
    status: TaskStatus;
    dueDate: string;
  }>({
    title: task?.title || "",
    description: task?.description || "",
    priority: task?.priority || "medium",
    status: task?.status || "todo",
    dueDate: task?.dueDate
      ? new Date(task.dueDate).toISOString().substring(0, 10)
      : "",
  });

  const isEditMode = !!task;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is modified
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Title is required
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    // Due date must be valid if provided
    if (formData.dueDate) {
      const dueDateObj = new Date(formData.dueDate);
      if (isNaN(dueDateObj.getTime())) {
        newErrors.dueDate = "Please enter a valid date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);

      const payload: TaskCreationPayload | TaskUpdatePayload = {
        title: formData.title,
        status: formData.status,
        priority: formData.priority,
        description: formData.description || undefined,
        dueDate: formData.dueDate || undefined,
      };

      if (isEditMode && task) {
        await updateTask(task.id, payload);
      } else {
        await createTask(payload as TaskCreationPayload);
      }

      // Call onSuccess callback if provided
      onSuccess?.();
    } catch (error) {
      console.error("Error submitting task:", error);
      setErrors({ submit: "Failed to save task. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form header
  const formHeader = (
    <h3 className="font-medium text-gray-900 dark:text-gray-100">
      {isEditMode ? "Edit Task" : "Create New Task"}
    </h3>
  );

  // Form footer with actions
  const formFooter = (
    <div className="flex justify-end space-x-3">
      {onCancel && (
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      )}
      <Button
        type="submit"
        variant="primary"
        disabled={isSubmitting}
        onClick={handleSubmit}
      >
        {isSubmitting
          ? "Saving..."
          : isEditMode
          ? "Update Task"
          : "Create Task"}
      </Button>
    </div>
  );

  return (
    <Card header={formHeader} footer={formFooter}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title field */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors.title
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="Enter task title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        {/* Description field */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter task description (optional)"
          />
        </div>

        {/* Status field */}
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="todo">To Do</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
        </div>

        {/* Priority field */}
        <div>
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Due Date field */}
        <div>
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors.dueDate
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
          />
          {errors.dueDate && (
            <p className="mt-1 text-sm text-red-500">{errors.dueDate}</p>
          )}
        </div>

        {/* General submission error */}
        {errors.submit && (
          <div className="p-3 bg-red-100 border border-red-300 rounded text-red-700 text-sm dark:bg-red-900 dark:border-red-700 dark:text-red-300">
            {errors.submit}
          </div>
        )}
      </form>
    </Card>
  );
}
