import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

const CreateTask = () => {
  const [userData, setUserData] = useContext(AuthContext);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [category, setCategory] = useState("");

  const [newTask, setNewTask] = useState({});
  const submitHandler = (e) => {
    e.preventDefault();

    const taskInfo = {
      active: false,
      newTask: true,
      failed: false,
      completed: false,
      title: taskTitle,
      description: taskDescription,
      date: taskDate,
      category: category,
    };

    const updatedData = userData.map((elem) => {
      if (assignTo === elem.firstName) {
        // let temp_arr = elem.tasks;
        // temp_arr.push(taskInfo);
        return {
          ...elem,
          tasks: [...elem.tasks, taskInfo], 
          // tasks: temp_arr,
          taskNumbers: {
            ...elem.taskNumbers,
            newTask: elem.taskNumbers.newTask + 1, 
          },
        };
      }
      return elem;
    });

    setUserData(updatedData); // Update the user data state
    console.log("New data: ", updatedData);

    // Reset form fields after submission
    setAssignTo("");
    setCategory("");
    setTaskDate("");
    setTaskTitle("");
    setTaskDescription("");
  };

  return (
    <div className="mt-5 pl-5 pr-5">
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
        className="flex w-full bg-gray-800 p-3 items-start justify-between flex-wrap relative"
      >
        <div className="w-1/2">
          <div>
            <h3>Task title</h3>
            <input
              value={taskTitle}
              onChange={(e) => {
                setTaskTitle(e.target.value);
              }}
              className="bg-transparent border-2 p-1 mt-1 mb-1 rounded border-gray-500"
              type="text"
              placeholder="make ui design"
            />
          </div>
          <div>
            <h3>Date</h3>
            <input
              value={taskDate}
              onChange={(e) => {
                setTaskDate(e.target.value);
              }}
              className="bg-transparent border-2 rounded border-gray-500 p-1 mt-1 mb-1"
              type="date"
            />
          </div>

          <div>
            <h3>Assign to</h3>
            <input
              value={assignTo}
              onChange={(e) => {
                setAssignTo(e.target.value);
              }}
              className="mt-1 mb-1 p-1 bg-transparent border-2 border-gray-500 rounded"
              type="text"
              placeholder="employee name"
            />
          </div>

          <div>
            <h3>Category</h3>
            <input
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              className="mt-1 mb-4 bg-transparent border-2 border-gray-500 p-1 rounded"
              type="text"
              placeholder="design ya dev ya etc"
            />
          </div>
        </div>

        <div className="w-1/2 flex flex-col">
          <h3>Description</h3>
          <textarea
            value={taskDescription}
            onChange={(e) => {
              setTaskDescription(e.target.value);
            }}
            className="bg-transparent text-white border-2 border-gray-500 mt-1 mb-2 p-1 rounded"
            cols="30"
            rows="10"
          ></textarea>
          <button className="border-2 p-3 w-52 text-xl font-semibold h-15 rounded bg-emerald-500 border-emerald-500 active:scale-95  top-[50%] right-40">
            Create Task{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
