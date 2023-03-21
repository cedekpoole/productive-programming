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

    const removeTodo = id => {
        const removedTodo = [...todos].filter(todo => todo.id !== id);
        setTodos(removedTodo);
    };

    return (
        <div className="todo-widget">
            <h5>What things do you have to do today?</h5>
            <ToDoForm onSubmit={addTodo} />
            <ToDo
                todos={todos}
                updateTodo={updateTodo}
                removeTodo={removeTodo}
            />
        </div>
    )
}

export default ToDoList;