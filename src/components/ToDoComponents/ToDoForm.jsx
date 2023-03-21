import { React, useState } from 'react'

function ToDoForm() {

    const [todoInput, setTodoInput] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
    }

  return (
    <div className="todo-container">
    <form className="todo-form" onSubmit={handleSubmit}>
        <input 
        type="text" 
        placeholder="Add a todo" 
        value={todoInput}
        name="text" 
        className="todo-input" />
        <button className="todo-button">Add ToDo</button>
    </form>
    </div>
  )
}

export default ToDoForm;