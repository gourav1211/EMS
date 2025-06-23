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
  const [searchTerm, setSearchTerm] = useState('');

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

  const refreshEmployeeData = async () => {
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

  const filteredEmployees = searchTerm
    ? employees.filter(emp => 
        emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()))
    : employees;

  if (loading && employees.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 text-red-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <div className="text-xl font-medium text-red-600">Error</div>
          <p className="text-gray-800">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-400">Manage employees and their tasks efficiently</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Employee List */}
        <div className="lg:col-span-1">
          <div className="card p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Employees</h3>
              <button 
                onClick={refreshEmployeeData} 
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Refresh employees"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
            
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input pl-10 w-full"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {loading && <p className="text-center py-2 text-gray-500 dark:text-gray-400">Refreshing...</p>}
            
            {!loading && filteredEmployees.length === 0 ? (
              <div className="text-center py-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p className="mt-2 text-gray-500 dark:text-gray-400">No employees found</p>
              </div>
            ) : (
              <ul className="space-y-2 max-h-[calc(100vh-350px)] overflow-y-auto pr-1">
                {filteredEmployees.map((employee) => (
                  <li key={employee.id}>
                    <button
                      onClick={() => handleSelectEmployee(employee)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        selectedEmployee?.id === employee.id 
                          ? 'bg-primary-50 dark:bg-primary-900/30 border-l-4 border-primary-500' 
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center">
                            <span className="text-primary-700 dark:text-primary-300 font-medium">
                              {employee.firstName.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{employee.firstName}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{employee.email}</p>
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Employee Details & Tasks */}
        <div className="lg:col-span-3">
          <div className="card h-full p-6">
            {selectedEmployee ? (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Tasks for {selectedEmployee.firstName}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{selectedEmployee.email}</p>
                  </div>
                  
                  <button
                    onClick={() => setShowCreateTask(!showCreateTask)}
                    className={`btn ${showCreateTask ? 'btn-outline' : 'btn-success'} flex items-center`}
                  >
                    {showCreateTask ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Cancel
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create Task
                      </>
                    )}
                  </button>
                </div>
                
                <div className="mb-4">
                  <TaskListNumbers taskNumbers={selectedEmployee.taskNumbers} />
                </div>

                {showCreateTask && (
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mb-6 border border-gray-100 dark:border-gray-700 animate-slide-up">
                    <CreateTask
                      employeeId={selectedEmployee.id}
                      onTaskCreated={() => {
                        setShowCreateTask(false);
                        refreshEmployeeData();
                      }}
                    />
                  </div>
                )}

                <div>
                  <AllTask tasks={selectedEmployee.tasks || []} />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                <p className="text-lg text-gray-500 dark:text-gray-400">Select an employee to view their tasks</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
