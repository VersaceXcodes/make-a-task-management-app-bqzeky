import React from 'react';

type Props = {
  filter: string;
  sort: string;
  onFilterChange: (filter: string) => void;
  onSortChange: (sort: string) => void;
  totalTasks: number;
  activeTasks: number;
  completedTasks: number;
};

const TaskFilter: React.FC<Props> = ({ 
  filter, 
  sort, 
  onFilterChange, 
  onSortChange, 
  totalTasks, 
  activeTasks, 
  completedTasks 
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 justify-center text-sm">
        <div className="px-4 py-2 bg-gray-100 rounded-md">
          <span className="font-medium">Total Tasks:</span>{" "}
          <span className="text-indigo-600">{totalTasks}</span>
        </div>
        <div className="px-4 py-2 bg-gray-100 rounded-md">
          <span className="font-medium">Active:</span>{" "}
          <span className="text-green-600">{activeTasks}</span>
        </div>
        <div className="px-4 py-2 bg-gray-100 rounded-md">
          <span className="font-medium">Completed:</span>{" "}
          <span className="text-gray-600">{completedTasks}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
          <select
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Tasks</option>
            <option value="active">Active Tasks</option>
            <option value="completed">Completed Tasks</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="priority">Priority (High to Low)</option>
            <option value="dueDate">Due Date</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TaskFilter;