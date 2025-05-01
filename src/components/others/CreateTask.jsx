import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust if needed

// Receive employeeId and onTaskCreated callback as props
const CreateTask = ({ employeeId, onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!employeeId) {
        setError("No employee selected.");
        setLoading(false);
        return;
    }

    const newTask = { title, description, date, category };

    try {
      // POST to the specific employee's task endpoint
      // Note: employeeId here is the MongoDB _id
      await axios.post(`${API_URL}/employees/${employeeId}/tasks`, newTask);

      // Clear the form
      setTitle('');
      setDescription('');
      setDate('');
      setCategory('');

      // Notify parent component that task was created
      if (onTaskCreated) {
        onTaskCreated();
      }

    } catch (err) {
      console.error("Error creating task:", err);
      setError(err.response?.data?.msg || 'Failed to create task.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 p-4 border rounded shadow-sm bg-gray-50">
      <h3 className="text-lg font-medium mb-3">Create New Task</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
         <div>
           <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
           <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
         </div>
         <div>
           <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
           <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows="3" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
         </div>
         <div>
           <label htmlFor="date" className="block text-sm font-medium text-gray-700">Due Date</label>
           <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
         </div>
         <div>
           <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
           <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
         </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 text-white rounded ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
        >
          {loading ? 'Creating...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
