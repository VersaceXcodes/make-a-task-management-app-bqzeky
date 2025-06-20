import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import TaskFilter from './TaskFilter';
import AddTaskForm from './AddTaskForm';
import ToastNotification from './ToastNotification';
import Spinner from './Spinner';

type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
};

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api/tasks`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddTask = async (newTask: Omit<Task, 'id' | 'createdAt' | 'completed'>) => {
    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newTask,
          completed: false,
          createdAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        showNotification('Task added successfully!', 'success');
        fetchTasks();
      } else {
        showNotification('Failed to add task', 'error');
      }
    } catch (error) {
      showNotification('Failed to add task', 'error');
    }
  };

  const handleUpdateTask = async (id: string, updatedTask: Partial<Task>) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        showNotification('Task updated successfully!', 'success');
        fetchTasks();
      } else {
        showNotification('Failed to update task', 'error');
      }
    } catch (error) {
      showNotification('Failed to update task', 'error');
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          showNotification('Task deleted successfully!', 'success');
          fetchTasks();
        } else {
          showNotification('Failed to delete task', 'error');
        }
      } catch (error) {
        showNotification('Failed to delete task', 'error');
      }
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sort === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sort === 'oldest') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sort === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    } else if (sort === 'dueDate' && a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    return 0;
  });

  const getPriorityClass = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">Task Manager</h1>
      
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Task</h2>
        <AddTaskForm onSubmit={handleAddTask} />
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Filter & Sort Tasks</h2>
        <TaskFilter 
          filter={filter} 
          sort={sort} 
          onFilterChange={setFilter} 
          onSortChange={setSort} 
        />
      </div>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <h2 className="text-xl font-semibold p-6 border-b text-gray-800">
          Your Tasks ({filteredTasks.length})
        </h2>
        
        {notification && (
          <ToastNotification 
            message={notification.message} 
            type={notification.type} 
            onClose={() => setNotification(null)} 
          />
        )}
        
        {loading ? (
          <Spinner />
        ) : sortedTasks.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-gray-400 mb-4">No tasks found</div>
            <p className="text-gray-600 max-w-md mx-auto">
              You don't have any tasks matching your filters. 
              Try changing your filter settings or add a new task!
            </p>
          </div>
        ) : (
          <ul className="divide-y">
            {sortedTasks.map(task => (
              <TaskItem 
                key={task.id} 
                task={task} 
                onUpdate={handleUpdateTask} 
                onDelete={handleDeleteTask}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskList;