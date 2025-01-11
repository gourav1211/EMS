import React from "react";

const NewTask = ({data,onAcceptTask}) => {
  const handleAcceptTask = () => {
    onAcceptTask(data.title);
  };
  return (
    <div className="flex-shrink-0 h-full w-[250px] bg-yellow-400 rounded-xl p-5">
      <div className="flex justify-between items-center">
        <h3 className="bg-red-600 text-sm px-3 py-1 rounded">{data.category}</h3>
        <h4 className="text-base">{data.date}</h4>
      </div>
      <h2 className="mt-3 text-xl font-semibold">{data.title}</h2>
      <p className="text-sm mt-2">
        {data.description}
      </p>
      <div className="mt-4">
        <button onClick={handleAcceptTask} className="bg-green-500 px-2 rounded active:scale-95 py-1 text-sm">
          Accept Task
        </button>
      </div>
    </div>
  );
};

export default NewTask;
