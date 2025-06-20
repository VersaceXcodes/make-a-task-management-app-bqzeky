import React, { useState } from 'react';

type TaskInput = {
  title: string;
  description: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
};

type Props = {
  onSubmit: (task: TaskInput) => void;
};

const AddTaskForm: React.FC<Props> = ({ onSubmit }) => {
  const [task, setTask] = useState<TaskInput>({ 
    title: '', 
    description: '', 
    dueDate: '',
    priority: 'medium' 
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.title.trim()) {
      alert('Task title is required!');
      return;
    }
    onSubmit({
      ...task,
      dueDate: task.dueDate || undefined
    });
    setTask({ 
      title: '', 
      description: '', 
      dueDate: '',
      priority: 'medium' 
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Task Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="What needs to be done?"
            required
          />
          {errors.title && (
            <p id="title-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.title}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="dueDate">
            Due Date (optional)
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.dueDate ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none`}
            aria-invalid={!!errors.dueDate}
            aria-describedby={errors.dueDate ? 'dueDate-error' : undefined}
          />
          {errors.dueDate && (
            <p id="dueDate-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.dueDate}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="priority">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-gray-700 mb-2" htmlFor="description">
          Description (optional)
        </label>
        <textarea
          id="description"
          name="description"
          value={task.description}
          onChange={handleChange}
          rows={3}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          placeholder="Add details about your task..."
        ></textarea>
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg transition duration-200 shadow-md font-medium"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;