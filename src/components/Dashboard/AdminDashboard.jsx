import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateTask from '../others/CreateTask';
import TaskListNumbers from '../others/TaskListNumbers';
import AllTask from '../others/AllTask';

// Base URL from Vite env (must begin with VITE_ prefix)
const API_URL = import.meta.env.VITE_API_URI_BACKEND || 'http://localhost:5000/api';

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateTask, setShowCreateTask] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/employees`);
      const formattedEmployees = response.data.map(emp => ({
         ...emp,
         id: emp._id,
         tasks: emp.tasks.map(t => ({...t, id: t._id}))
        }));
      setEmployees(formattedEmployees);
      if (selectedEmployee) {
          const reselected = formattedEmployees.find(emp => emp.id === selectedEmployee.id);
          setSelectedEmployee(reselected || null);
      }

    } catch (err) {
      console.error("Error fetching employees:", err);
      setError('Failed to fetch employees.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const refreshEmployeeData = async (employeeId) => {
     try {
        await fetchEmployees();
     } catch (err) {
        console.error("Error refreshing employee data:", err);
        setError('Failed to refresh employee data.');
     }
  };

  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowCreateTask(false);
  };

  if (loading && employees.length === 0) return <div className="p-4">Loading employees...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-800 dark:text-white">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Employee List */}
        <div className="md:col-span-1 bg-white dark:bg-gray-700 p-4 rounded shadow border border-gray-200 dark:border-gray-600">
          <h3 className="text-lg font-medium mb-2">Employees</h3>
          {loading && <p>Refreshing...</p>}
          {!loading && employees.length === 0 ? (
            <p>No employees found.</p>
          ) : (
            <ul className="space-y-2">
              {employees.map((employee) => (
                <li key={employee.id}>
                  <button
                    onClick={() => handleSelectEmployee(employee)}
                    className={`w-full text-left p-2 rounded ${selectedEmployee?.id === employee.id ? 'bg-indigo-100 text-indigo-900 dark:text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-600'}`}
                  >
                    {employee.firstName} ({employee.email})
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Employee Details & Tasks */}
        <div className="md:col-span-2 bg-white dark:bg-gray-700 p-4 rounded shadow border border-gray-200 dark:border-gray-600">
          {selectedEmployee ? (
            <>
              <h3 className="text-lg font-medium mb-2">
                Tasks for {selectedEmployee.firstName}
              </h3>
              <TaskListNumbers taskNumbers={selectedEmployee.taskNumbers} />

              <button
                onClick={() => setShowCreateTask(!showCreateTask)}
                className="my-4 px-4 py-2 bg-green-500 text-white dark:text-white rounded hover:bg-green-600 dark:hover:bg-green-700"
              >
                {showCreateTask ? 'Cancel' : 'Create New Task'}
              </button>

              {showCreateTask && (
                <CreateTask
                  employeeId={selectedEmployee.id}
                  onTaskCreated={() => {
                     setShowCreateTask(false);
                     refreshEmployeeData(selectedEmployee.id);
                   }}
                />
              )}

              <AllTask tasks={selectedEmployee.tasks || []} />
            </>
          ) : (
            <p>Select an employee to view their tasks.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
