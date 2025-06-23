import React from 'react';

// Receive tasks, onCompleteTask, onFailTask as props
const AcceptTask = ({ tasks = [], onCompleteTask, onFailTask }) => {
  return (
    <div className="bg-yellow-100 p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-3 text-yellow-800">Active Tasks ({tasks.length})</h3>
      {tasks.length === 0 ? (
        <p className="text-sm text-gray-600">No active tasks.</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
             // Use task.id which is the mapped _id
            <li key={task.id} className="bg-white p-3 rounded border border-yellow-200 shadow-sm">
              <h4 className="font-medium">{task.title}</h4>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p className="text-xs text-gray-500">Due: {task.date} | Category: {task.category}</p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => onCompleteTask(task.id)} // Pass task.id
                  className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                >
                  Complete
                </button>
                <button
                  onClick={() => onFailTask(task.id)} // Pass task.id
                  className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                >
                  Fail
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AcceptTask;
