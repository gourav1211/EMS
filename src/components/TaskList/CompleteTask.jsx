import React from 'react';

// Receive tasks as props
const CompleteTask = ({ tasks = [] }) => {
  return (
    <div className="bg-green-100 p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-3 text-green-800">Completed Tasks ({tasks.length})</h3>
      {tasks.length === 0 ? (
        <p className="text-sm text-gray-600">No completed tasks.</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
             // Use task.id which is the mapped _id
            <li key={task.id} className="bg-white p-3 rounded border border-green-200 shadow-sm opacity-75">
              <h4 className="font-medium line-through">{task.title}</h4>
              <p className="text-sm text-gray-500 line-through">{task.description}</p>
              <p className="text-xs text-gray-400">Completed | Category: {task.category}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompleteTask;
