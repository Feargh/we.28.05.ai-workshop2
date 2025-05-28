"use client";

import { Layout, Header, Footer, Card, Button, Board, Task } from "@/components";
import { useTasks } from '@/hooks/useTasks';

export default function Home() {
  const { loading, error, getTasksByStatus } = useTasks();
  
  const todoTasks = getTasksByStatus('todo');
  const doingTasks = getTasksByStatus('doing');
  const doneTasks = getTasksByStatus('done');

  return (
    <Layout header={<Header />} footer={<Footer />}>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome to Cat Kanban
        </h1>

        <p className="text-gray-600 dark:text-gray-300">
          Your simple and efficient task management board. Organize your tasks
          across different stages of completion.
        </p>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Kanban Board</h2>
          
          {loading && <p>Loading tasks...</p>}
          
          {error && <p className="text-red-500">Error: {error}</p>}
          
          {!loading && !error && (
            <Board
              todoColumn={
                <div className="space-y-3">
                  {todoTasks.map(task => (
                    <Task key={task.id} task={task} />
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
                  {doingTasks.map(task => (
                    <Task key={task.id} task={task} />
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
                  {doneTasks.map(task => (
                    <Task key={task.id} task={task} />
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card
            header={<h2 className="font-semibold">Component Examples</h2>}
            footer={
              <div className="text-sm text-gray-500">Base UI components</div>
            }
          >
            <div className="flex flex-col gap-4">
              <p>These are examples of our base UI components:</p>

              <div className="flex flex-wrap gap-2">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="success">Success</Button>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button size="small">Small</Button>
                <Button>Medium</Button>
                <Button size="large">Large</Button>
              </div>
            </div>
          </Card>

          <Card className="md:col-span-2">
            <div className="flex flex-col gap-4">
              <h2 className="font-semibold text-lg">About this project</h2>
              <p>This is a Kanban board application built with:</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                <li>Next.js</li>
                <li>React</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
              </ul>
              <p className="mt-2">
                The board allows you to manage tasks by moving them between
                To Do, Doing, and Done columns.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}