import { React, useState } from 'react'
import ToDoForm from './ToDoForm'

function ToDoList() {
    const [todos, setTodos] = useState([]);

    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return
        }

        const newTodos = [todo, ...todos];

        setTodos(newTodos);
        console.log(...todos);
    }

  return (
    <div>
        <h3>What things do you have to do today?</h3>
        <ToDoForm onSubmit={addTodo}/>
    </div>
  )
}

export default ToDoList