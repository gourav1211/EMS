import React from 'react'

const TaskListNumbers = ({data}) => {
  return (
    <div className='pl-5 pr-5 flex flex-wrap justify-between w-screen'>
        <div className="bg-blue-400 mt-10 w-[40%] p-4 rounded-xl">
            <h2 className='text-3xl font-semibold'>{data.taskNumbers.newTask}</h2>
            <h2 className='text-2xl font-semibold'>New task</h2>
        </div>
        <div className="bg-green-400 mt-10 w-[40%] p-4 rounded-xl">
            <h2 className='text-3xl font-semibold'>{data.taskNumbers.completed}</h2>
            <h2 className='text-2xl font-semibold'>Completed task</h2>
        </div>
        <div className="bg-yellow-400 mt-10 w-[40%] p-4 rounded-xl">
            <h2 className='text-3xl font-semibold'>{data.taskNumbers.active}</h2>
            <h2 className='text-2xl font-semibold'>Accepted task</h2>
        </div>
        <div className="bg-red-400 mt-10 w-[40%] p-4 rounded-xl">
            <h2 className='text-3xl font-semibold'>{data.taskNumbers.failed}</h2>
            <h2 className='text-2xl font-semibold'>Failed task</h2>
        </div>
        
      
    </div>
  )
}

export default TaskListNumbers
