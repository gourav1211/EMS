import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthProvider'; // Get logged-in user info
import TaskListNumbers from '../others/TaskListNumbers';
import NewTask from '../TaskList/NewTask';
import AcceptTask from '../TaskList/AcceptTask';
import CompleteTask from '../TaskList/CompleteTask';
import FailedTask from '../TaskList/FailedTask';

const API_URL = 'http://localhost:5000/api'; // Adjust if needed

const EmployeeDashboard = () => {
  const { user } = useAuth(); // Get user from AuthContext
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmployeeData = async () => {
    // Ensure user and user._id are available
    if (!user?._id) {
        setError("User not logged in or user ID missing.");
        setLoading(false);
        return;
    }
    setLoading(true);
    setError(null);
    try {
      // Fetch data for the logged-in employee using their MongoDB _id
      const response = await axios.get(`${API_URL}/employees/${user._id}`);
       // Map MongoDB _id to id for consistency in child components
       // Also map task _id to id
      const formattedData = {
          ...response.data,
          id: response.data._id,
          tasks: response.data.tasks.map(t => ({...t, id: t._id}))
        };
      setEmployeeData(formattedData);
    } catch (err) {
      console.error("Error fetching employee data:", err);
      setError(err.response?.data?.msg || 'Failed to fetch your data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, [user?._id]); // Refetch if user changes (specifically user._id)

  // Function to handle task status updates (accept, complete, fail)
  const handleUpdateTaskStatus = async (taskId, status) => {
    // Use employeeData.id which is the mapped _id
    if (!employeeData?.id || !taskId) {
        console.error("Missing employeeId or taskId for update");
        setError("Cannot update task: Missing information.");
        return;
    };

    // Optimistic UI update (optional but improves perceived performance)
    const originalEmployeeData = { ...employeeData };
    const updatedTasks = employeeData.tasks.map(task => {
        if (task.id === taskId) {
            return {
                ...task,
                newTask: false,
                active: status === 'active',
                completed: status === 'completed',
                failed: status === 'failed'
            };
        }
        return task;
    });
    // Recalculate numbers locally for optimistic update
    const updatedTaskNumbers = updatedTasks.reduce((acc, task) => {
        if (task.completed) acc.completed++;
        else if (task.failed) acc.failed++;
        else if (task.active) acc.active++;
        else if (task.newTask) acc.newTask++;
        return acc;
    }, { active: 0, newTask: 0, completed: 0, failed: 0 });

    setEmployeeData({ ...employeeData, tasks: updatedTasks, taskNumbers: updatedTaskNumbers });
    setError(null); // Clear previous errors

    try {
      // Send request to backend (taskId is the mapped _id)
      await axios.put(`${API_URL}/employees/${employeeData.id}/tasks/${taskId}`, { status });
      // Data is already updated optimistically, could refetch here for consistency if needed:
      // fetchEmployeeData();
    } catch (err) {
      console.error(`Error updating task ${taskId} to ${status}:`, err);
      // Rollback optimistic update on error
      setEmployeeData(originalEmployeeData);
      setError(`Failed to update task status. ${err.response?.data?.msg || ''}`);
    }
  };


  if (loading) return <div className="p-4">Loading your dashboard...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  // Ensure employeeData and tasks exist before trying to filter
  if (!employeeData || !employeeData.tasks) return <div className="p-4">Could not load employee data or tasks.</div>;

  // Filter tasks based on their status using the potentially optimistically updated state
  const newTasks = employeeData.tasks.filter(task => task.newTask && !task.active && !task.completed && !task.failed);
  const activeTasks = employeeData.tasks.filter(task => task.active && !task.completed && !task.failed);
  const completedTasks = employeeData.tasks.filter(task => task.completed);
  const failedTasks = employeeData.tasks.filter(task => task.failed);

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-800 dark:text-white">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">X3M Company</h2>

      {/* Display Task Counts */}
      <TaskListNumbers taskNumbers={employeeData.taskNumbers} />

      {/* Display Task Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <NewTask tasks={newTasks} onAcceptTask={(taskId) => handleUpdateTaskStatus(taskId, 'active')} />
        <AcceptTask tasks={activeTasks} onCompleteTask={(taskId) => handleUpdateTaskStatus(taskId, 'completed')} onFailTask={(taskId) => handleUpdateTaskStatus(taskId, 'failed')} />
        <CompleteTask tasks={completedTasks} />
        <FailedTask tasks={failedTasks} />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
