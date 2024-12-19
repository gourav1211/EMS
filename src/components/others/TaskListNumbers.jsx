import React from 'react'

const TaskListNumbers = () => {
  return (
    <div className='pl-5 pr-5 flex flex-wrap justify-between w-screen'>
        <div className="bg-blue-400 mt-10 w-[40%] p-4 rounded-xl">
            <h2 className='text-3xl font-semibold'>0</h2>
            <h2 className='text-2xl font-semibold'>New task</h2>
        </div>
        <div className="bg-green-400 mt-10 w-[40%] p-4 rounded-xl">
            <h2 className='text-3xl font-semibold'>0</h2>
            <h2 className='text-2xl font-semibold'>New task</h2>
        </div>
        <div className="bg-yellow-400 mt-10 w-[40%] p-4 rounded-xl">
            <h2 className='text-3xl font-semibold'>0</h2>
            <h2 className='text-2xl font-semibold'>New task</h2>
        </div>
        <div className="bg-red-400 mt-10 w-[40%] p-4 rounded-xl">
            <h2 className='text-3xl font-semibold'>0</h2>
            <h2 className='text-2xl font-semibold'>New task</h2>
        </div>
        
      
    </div>
  )
}

export default TaskListNumbers
