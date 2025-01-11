import React, { useEffect, useContext } from "react";
import Header from "../others/Header";
import TaskListNumbers from "../others/TaskListNumbers";
import TaskList from "../TaskList/TaskList";
import { AuthContext } from "../../context/AuthProvider";
import { setLocalStorage } from "../../utils/LocalStorage";

const EmployeeDashboard = (props) => {
  const [userData, setUserData] = useContext(AuthContext);

  const handleFailedTask = (taskId) => {
    const updatedData = userData.map((user) => {
      if (user.id === props.data.id) {
        const updatedTasks = user.tasks.map((task) => {
          if (task.title === taskId) {
            return { ...task, active: false, failed: true };
          }
          return task;
        });
        return {
          ...user,
          tasks: updatedTasks,
          taskNumbers: {
            ...user.taskNumbers,
            active: user.taskNumbers.active - 1,
            failed: user.taskNumbers.failed + 1,
          },
        };
      }
      return user;
    });
    setUserData(updatedData);
  };

  const handleCompleteTask = (taskId) => {
    const updatedData = userData.map((user) => {
      if (user.id === props.data.id) {
        const updatedTasks = user.tasks.map((task) => {
          if (task.title === taskId) {
            return { ...task, active: false, completed: true };
          }
          return task;
        });

        return {
          ...user,
          tasks: updatedTasks,
          taskNumbers: {
            ...user.taskNumbers,
            active: user.taskNumbers.active - 1,
            completed: user.taskNumbers.completed + 1,
          },
        };
      }
      return user;
    });

    setUserData(updatedData);
  };

  const handleAcceptTask = (taskId) => {
    const updatedData = userData.map((user) => {
      if (user.id === props.data.id) {
        const updatedTasks = user.tasks.map((task) => {
          if (task.title === taskId) {
            return { ...task, active: true, newTask: false };
          }
          return task;
        });

        return {
          ...user,
          tasks: updatedTasks,
          taskNumbers: {
            ...user.taskNumbers,
            active: user.taskNumbers.active + 1,
            newTask: user.taskNumbers.newTask - 1,
          },
        };
      }
      return user;
    });

    setUserData(updatedData);
  };

  const currentUserData = userData.find((user) => user.id === props.data.id);
  useEffect(() => {
    // console.log(userData);
    // setLocalStorage("employees", userData);
  }, [userData]);

  return (
    <div>
      <Header changeUser={props.changeUser} data={props.data} />
      <TaskListNumbers data={currentUserData} />
      <TaskList
        data={currentUserData}
        onAcceptTask={handleAcceptTask}
        onCompleteTask={handleCompleteTask}
        onFailedTask={handleFailedTask}
      />
    </div>
  );
};

export default EmployeeDashboard;
