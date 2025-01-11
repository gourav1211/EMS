import React from 'react'
import FailedTask from './FailedTask';

const AcceptTask = ({data,onCompleteTask,onFailedTask}) => {

  const handleCompleteTask = () => {
    onCompleteTask(data.title);
  }
  const handleFailedTask = () => {
    onFailedTask(data.title);
  }
  return (
    <div className='flex-shrink-0 h-full w-[250px] bg-red-400 rounded-xl p-5'>
        <div className='flex justify-between items-center'>
            <h3 className='bg-red-600 text-sm px-3 py-1 rounded' >
                {data.category}
            </h3>
            <h4 className='text-base'>{data.date}</h4>
        </div>
        <h2 className='mt-3 text-xl font-semibold'>{data.title}</h2>
        <p className='text-sm mt-2'>{data.description}</p>
        <div className='flex justify-between mt-4 '>
            <button onClick={handleCompleteTask} className='bg-green-500 active:scale-95 rounded mr-1 py-1 px-2 text-sm'>Mark as Completed</button>
            <button onClick={handleFailedTask} className='bg-red-500 rounded active:scale-95 py-1 px-2 text-sm'>Mark as Failed</button>
        </div>
      </div>

  )
}

export default AcceptTask
