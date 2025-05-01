import React from 'react';

// Receive taskNumbers object as props
const TaskListNumbers = ({ taskNumbers }) => {
  // Provide default values if taskNumbers is null or undefined
  const {
    active = 0,
    newTask = 0,
    completed = 0,
    failed = 0
  } = taskNumbers || {}; // Default to an empty object if taskNumbers is null/undefined

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-blue-100 p-3 rounded shadow text-center">
        <p className="text-xl font-bold text-blue-800">{newTask}</p>
        <p className="text-sm text-blue-700">New Tasks</p>
      </div>
      <div className="bg-yellow-100 p-3 rounded shadow text-center">
        <p className="text-xl font-bold text-yellow-800">{active}</p>
        <p className="text-sm text-yellow-700">Active Tasks</p>
      </div>
      <div className="bg-green-100 p-3 rounded shadow text-center">
        <p className="text-xl font-bold text-green-800">{completed}</p>
        <p className="text-sm text-green-700">Completed Tasks</p>
      </div>
      <div className="bg-red-100 p-3 rounded shadow text-center">
        <p className="text-xl font-bold text-red-800">{failed}</p>
        <p className="text-sm text-red-700">Failed Tasks</p>
      </div>
    </div>
  );
};

export default TaskListNumbers;
