import React from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'

const TaskList = ({data,onAcceptTask,onCompleteTask,onFailedTask}) => {
  return (
    <div id='taskbar' className='h-[250px] flex items-center justify-start gap-5 flex-nowrap mt-10  w-full p-2 overflow-x-auto'> 
      {data.tasks.map((elem, idx)=>{
        if(elem.active){
          return <AcceptTask key={idx} data={elem} onCompleteTask={onCompleteTask} onFailedTask={onFailedTask} />
        }
        if(elem.newTask){
          return <NewTask key={idx} data={elem} onAcceptTask={onAcceptTask}/>
        }
        if(elem.completed){
          return <CompleteTask key={idx} data={elem} />
        }
        if(elem.failed){
          return <FailedTask key={idx} data={elem}/>
        }
      })}      
    </div>
  )
}

export default TaskList
