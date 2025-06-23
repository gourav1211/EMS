import React from 'react';

// Receive tasks as props
const AllTask = ({ tasks = [] }) => {

  const getStatus = (task) => {
    if (task.completed) return { text: 'Completed', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (task.failed) return { text: 'Failed', color: 'text-red-600', bgColor: 'bg-red-100' };
    if (task.active) return { text: 'Active', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    if (task.newTask) return { text: 'New', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    return { text: 'Unknown', color: 'text-gray-600', bgColor: 'bg-gray-100' };
  };

  return (
    <div className="mt-6">
      <h4 className="text-md font-medium mb-3">All Tasks ({tasks.length})</h4>
      {tasks.length === 0 ? (
        <p className="text-sm text-gray-600">No tasks assigned to this employee.</p>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => {
            const status = getStatus(task);
            return (
               // Use task.id which is the mapped _id
              <div key={task.id} className={`p-3 rounded border shadow-sm ${status.bgColor}`}>
                <div className="flex justify-between items-start">
                  <div>
                     <h5 className={`font-medium ${task.completed || task.failed ? 'line-through' : ''}`}>{task.title}</h5>
                     <p className={`text-sm text-gray-600 ${task.completed || task.failed ? 'line-through' : ''}`}>{task.description}</p>
                     <p className="text-xs text-gray-500 mt-1">Due: {task.date} | Category: {task.category}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${status.bgColor} ${status.color}`}>
                    {status.text}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllTask;
