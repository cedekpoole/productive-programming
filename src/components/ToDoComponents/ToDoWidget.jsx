import React from 'react'
import ToDoList from './ToDoList'
import './ToDoWidget.css'

function ToDoWidget() {
  return (
    <div className="todo-widget-container">
        <ToDoList />
    </div>
  )
}

export default ToDoWidget