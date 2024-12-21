import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const AllTask = () => {
  const authData = useContext(AuthContext);

  return (
    <div className="bg-black p-5 mt-5 rounded">
      <div className="bg-red-400 py-2 px-4 flex justify-between mb-2">
        <h2 className="text-lg font-medium w-1/5">Employee Name</h2>
        <h3 className="text-lg font-medium w-1/5">New Task</h3>
        <h5 className="text-lg font-medium w-1/5">Active Task</h5>
        <h5 className="text-lg font-medium w-1/5">Completed</h5>
        <h5 className="text-lg font-medium w-1/5">Failed</h5>
      </div>
      <div className="overflow-auto">
        {authData.employees.map((elem) => {
          return (
            <div className=" border-2 border-emerald-500 py-2 px-4 flex justify-between mb-2">
              <h2 className="text-lg font-medium w-1/5 text-red-500">{elem.firstName}</h2>
              <h3 className="text-lg font-medium w-1/5 text-blue-500">{elem.taskNumbers.newTask }</h3>
              <h5 className="text-lg font-medium w-1/5 text-yellow-500">{elem.taskNumbers.active }</h5>
              <h5 className="text-lg font-medium w-1/5 text-white">{elem.taskNumbers.completed }</h5>
              <h5 className="text-lg font-medium w-1/5 text-red-500">{elem.taskNumbers.failed }</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllTask;
