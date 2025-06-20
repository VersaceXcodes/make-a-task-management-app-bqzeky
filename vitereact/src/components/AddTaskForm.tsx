import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select } from './ui/select';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  dueDate: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface AddTaskFormProps {
  onSubmit: (data: TaskFormData) => void;
}

export default function AddTaskForm({ onSubmit }: AddTaskFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'medium',
    },
  });

  const onSubmitForm = async (data: TaskFormData) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Task Title *
        </label>
        <Input
          id="title"
          {...register('title')}
          className={`mt-1 block w-full ${errors.title ? 'border-red-500' : ''}`}
          placeholder="Enter task title"
          aria-describedby={errors.title ? 'title-error' : undefined}
        />
        {errors.title && (
          <p id="title-error" className="mt-1 text-sm text-red-500">
            {errors.title.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <Textarea
          id="description"
          {...register('description')}
          className={`mt-1 block w-full ${errors.description ? 'border-red-500' : ''}`}
          placeholder="Enter task description"
          rows={3}
          aria-describedby={errors.description ? 'description-error' : undefined}
        />
        {errors.description && (
          <p id="description-error" className="mt-1 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
          Due Date
        </label>
        <Input
          type="date"
          id="dueDate"
          {...register('dueDate')}
          className="mt-1 block w-full"
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      <div>
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
          Priority
        </label>
        <select
          id="priority"
          {...register('priority')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          {isSubmitting ? 'Adding Task...' : 'Add Task'}
        </Button>
      </div>
    </form>
  );
}