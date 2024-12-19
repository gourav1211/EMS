import React from 'react'

const CreateTask = () => {
  return (
    <div className="mt-5 pl-5 pr-5">
        <form className="flex w-full bg-gray-800 p-3 items-start justify-between flex-wrap relative">
          <div className="w-1/2">
            <div>
              <h3>Task title</h3>
              <input className="bg-transparent border-2 p-1 mt-1 mb-1 rounded border-gray-500"
               type="text" placeholder="make ui design" />
            </div>
            <div>
              <h3>Date</h3>
              <input className="bg-transparent border-2 rounded border-gray-500 p-1 mt-1 mb-1"
               type="date" />
            </div>

            <div>
              <h3>Assign to</h3>
              <input className="mt-1 mb-1 p-1 bg-transparent border-2 border-gray-500 rounded"
               type="text" placeholder="employee name" />
            </div>

            <div>
              <h3>Category</h3>
              <input className="mt-1 mb-4 bg-transparent border-2 border-gray-500 p-1 rounded"
               type="text" placeholder="design ya dev ya etc" />
            </div>
          </div>

          <div className="w-1/2 flex flex-col">
            <h3>Description</h3>
            <textarea className="bg-transparent text-white border-2 border-gray-500 mt-1 mb-2 p-1 rounded" 
            cols="30" rows="10"></textarea>
            <button className="border-2 p-3 w-52 text-xl font-semibold h-15 rounded bg-emerald-500 border-emerald-500 active:scale-95  top-[50%] right-40">Create Task </button>
          </div>

          
        </form>
      </div>
  )
}

export default CreateTask
