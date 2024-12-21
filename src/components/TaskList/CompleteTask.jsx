import React from "react";

const CompleteTask = ({data}) => {
  return (
    <div>
      <div className="flex-shrink-0 h-full w-[250px] bg-green-400 rounded-xl p-5">
        <div className="flex justify-between items-center">
          <h3 className="bg-red-600 text-sm px-3 py-1 rounded">{data.category}</h3>
          <h4 className="text-base">{data.date} </h4>
        </div>
        <h2 className="mt-3 text-xl font-semibold">{data.title}</h2>
        <p className="text-sm mt-2">
          {data.description}
        </p>
        <div className="">
          <button className="mt-4 w-full bg-green-800 rounded px-2 py-1 active:scale-95">Complete</button>
        </div>
      </div>
    </div>
  );
};

export default CompleteTask;
