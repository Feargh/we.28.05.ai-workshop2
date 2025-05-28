import React from 'react';
import { Column } from './Column';
import { TaskStatus } from '../types';

interface BoardProps {
  children?: React.ReactNode;
  todoColumn?: React.ReactNode;
  doingColumn?: React.ReactNode;
  doneColumn?: React.ReactNode;
}

export function Board({ 
  children,
  todoColumn,
  doingColumn,
  doneColumn
}: BoardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Column title="To Do" status="todo">
        {todoColumn || children}
      </Column>
      
      <Column title="Doing" status="doing">
        {doingColumn || children}
      </Column>
      
      <Column title="Done" status="done">
        {doneColumn || children}
      </Column>
    </div>
  );
}