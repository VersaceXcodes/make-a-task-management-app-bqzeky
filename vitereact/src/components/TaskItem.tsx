import React, { useState } from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { format } from 'date-fns';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
}

interface TaskItemProps {
  task: Task;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleToggleComplete = () => {
    onUpdate(task.id, { completed: !task.completed });
  };

  const handleSaveEdit = () => {
    if (editedTitle.trim()) {
      onUpdate(task.id, { title: editedTitle });
      setIsEditing(false);
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formattedDate = task.dueDate
    ? format(new Date(task.dueDate), 'MMM d, yyyy')
    : null;

  return (
    <div className="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <Checkbox
            checked={task.completed}
            onCheckedChange={handleToggleComplete}
            aria-label={`Mark ${task.title} as ${task.completed ? 'incomplete' : 'complete'}`}
          />
          
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="flex-1 p-1 border rounded"
              autoFocus
              onBlur={handleSaveEdit}
              onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
            />
          ) : (
            <div className="flex-1">
              <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className="mt-1 text-sm text-gray-500">{task.description}</p>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
          
          {formattedDate && (
            <span className="text-sm text-gray-500">
              Due: {formattedDate}
            </span>
          )}

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              aria-label={isEditing ? "Cancel editing" : "Edit task"}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(task.id)}
              aria-label="Delete task"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}