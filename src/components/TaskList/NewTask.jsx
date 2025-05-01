import React from 'react';

// Receive tasks and onAcceptTask function as props
const NewTask = ({ tasks = [], onAcceptTask }) => {
  return (
    <div className="bg-blue-100 p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-3 text-blue-800">New Tasks ({tasks.length})</h3>
      {tasks.length === 0 ? (
        <p className="text-sm text-gray-600">No new tasks.</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            // Use task.id which is the mapped _id
            <li key={task.id} className="bg-white p-3 rounded border border-blue-200 shadow-sm">
              <h4 className="font-medium">{task.title}</h4>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p className="text-xs text-gray-500">Due: {task.date} | Category: {task.category}</p>
              <button
                onClick={() => onAcceptTask(task.id)} // Pass task.id
                className="mt-2 px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
              >
                Accept Task
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewTask;
