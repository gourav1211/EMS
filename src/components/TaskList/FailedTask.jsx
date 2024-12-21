import React from "react";

const FailedTask = ({data}) => {
  return (
    <div className="flex-shrink-0 h-full w-[250px] bg-blue-400 rounded-xl p-5">
      <div className="flex justify-between items-center">
        <h3 className="bg-red-600 text-sm px-3 py-1 rounded">{data.category}</h3>
        <h4 className="text-base">{data.date}</h4>
      </div>
      <h2 className="mt-3 text-xl font-semibold">{data.title}</h2>
      <p className="text-sm mt-2">
        {data.description}
      </p>
      <div className="mt-2">
        <button className="w-full bg-red-500 mt-3 px-2 py-1 rounded"> Failed</button>
      </div>
    </div>
  );
};

export default FailedTask;
