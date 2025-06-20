import React from 'react';
import { Select } from './ui/select';

interface TaskFilterProps {
  filter: string;
  sort: string;
  onFilterChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

export default function TaskFilter({ filter, sort, onFilterChange, onSortChange }: TaskFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">
          Filter Tasks
        </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="all">All Tasks</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      <div className="flex-1">
        <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
          Sort By
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="priority">Priority (High to Low)</option>
          <option value="dueDate">Due Date</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>
    </div>
  );
}