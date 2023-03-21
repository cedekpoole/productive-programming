import { React, useState } from 'react';
import ToDoForm from './ToDoForm';
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';


const ToDo = ({ todos, updateTodo, removeTodo }) => {

    const [edit, setEdit] = useState({
        id: null,
        value: ''
    });

    const submitUpdate = value => {
        updateTodo(edit.id, value);
        setEdit({
            id: null,
            value: ''
        });
    };

    if (edit.id) {
        return <ToDoForm edit={edit} onSubmit={submitUpdate} />;
    }

    return todos.map((todo, index) => (
       <div className="todo-container">
         <div className="todo-row" key={index}>
            <div key={todo.id}>
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