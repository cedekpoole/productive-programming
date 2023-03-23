import { React, useEffect, useState } from 'react'
import ToDoForm from './ToDoForm'
import ToDo from './ToDo';

function ToDoList() {
    // retrieve data from local storage to set initial value of todos
    const [todos, setTodos] = useState(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos')) ?? [];
        // if todo 'completed' remove from local storage
        const completedTodoIds = JSON.parse(localStorage.getItem('completedTodoIds')) ?? [];
        const filteredTodos = savedTodos.filter(todo => !completedTodoIds.includes(todo.id));
        return filteredTodos;
      });
      
    // set todos in local storage when change occurs
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    // if todo is not empty then add
    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }

        const newTodos = [todo, ...todos];

        setTodos(newTodos);
    }

    // if updated todo is not empty then update todo
    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }

        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
    };

    // remove todo using filtering
    const removeTodo = id => {
        const removedTodo = [...todos].filter(todo => todo.id !== id);
        setTodos(removedTodo);
    };

    // function to deal with completing a todo
    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);

        // set completed todos in local storage
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