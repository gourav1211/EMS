import React from 'react'
import Header from '../others/Header'
import TaskListNumbers from '../others/TaskListNumbers'
import TaskList from '../TaskList/TaskList'

const EmployeeDashboard = (props) => {
  return (
    <div>
        <Header changeUser={props.changeUser} data={props.data}/>
        <TaskListNumbers data={props.data}/>
        <TaskList data={props.data}/>
    </div>
  )
}

export default EmployeeDashboard
