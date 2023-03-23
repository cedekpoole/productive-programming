import { React, useState } from 'react';
import ToDoForm from './ToDoForm';
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';


const ToDo = ({ todos, updateTodo, removeTodo, completeTodo }) => {

    // set initial state to object with no values
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    });

    // clear values in input field to update
    const submitUpdate = value => {
        updateTodo(edit.id, value);
        setEdit({
            id: null,
            value: ''
        });
    };

    // conditional rendering of form based on edit state id
    if (edit.id) {
        return <ToDoForm edit={edit} onSubmit={submitUpdate} />;
    }

    return todos.map((todo, index) => (
        <div className="todo-container" key={todo.id}>
            <div
                className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
            >
                <div key={todo.id} onClick={() => completeTodo(todo.id)}>
                    {todo.text}
                </div>
                <div className='todo-icons'>
                    <DeleteForeverOutlinedIcon
                        className="todo-delete"
                        onClick={() => removeTodo(todo.id)}
                        aria-hidden="true"
                    />
                    <EditOutlinedIcon
                        className="todo-edit"
                        onClick={() => setEdit({ id: todo.id, value: todo.text })}
                    />
                </div>
            </div>
        </div>
    ));
};

export default ToDo;