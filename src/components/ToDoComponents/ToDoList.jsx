import { React, useState } from 'react'
import ToDoForm from './ToDoForm'
import ToDo from './ToDo';

function ToDoList() {
    const [todos, setTodos] = useState([]);

    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }

        const newTodos = [todo, ...todos];

        setTodos(newTodos);
        console.log(...todos);
    }

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }

        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
    };

    return (
        <div>
            <h3>What things do you have to do today?</h3>
            <ToDoForm onSubmit={addTodo} />
            <ToDo
                todos={todos}
                updateTodo={updateTodo}
            />
        </div>
    )
}

export default ToDoList;