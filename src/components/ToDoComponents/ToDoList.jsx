import { React, useEffect, useState } from 'react'
import ToDoForm from './ToDoForm'
import ToDo from './ToDo';

function ToDoList() {
    const [todos, setTodos] = useState(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos')) ?? [];
        const completedTodoIds = JSON.parse(localStorage.getItem('completedTodoIds')) ?? [];
        const filteredTodos = savedTodos.filter(todo => !completedTodoIds.includes(todo.id));
        return filteredTodos;
      });
      
      
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);


    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }

        const newTodos = [todo, ...todos];

        setTodos(newTodos);
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

    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);

        const completedTodoIds = updatedTodos
            .filter(todo => todo.isComplete)
            .map(todo => todo.id);
            localStorage.setItem('completedTodoIds', JSON.stringify(completedTodoIds))

    };

    return (
        <div className="todo-widget">
            <h5>What things do you have to do today?</h5>
            <ToDoForm onSubmit={addTodo} />
            <ToDo
                todos={todos}
                updateTodo={updateTodo}
                removeTodo={removeTodo}
                completeTodo={completeTodo}
            />
        </div>
    )
}

export default ToDoList;