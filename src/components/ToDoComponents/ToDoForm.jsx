import { React, useState, useRef, useEffect } from 'react';
import { v4 as uuid } from "uuid";


function ToDoForm(props) {

    const [input, setInput] = useState(props.edit ? props.edit.value : '');

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    })

    const handleChange = e => {
        setInput(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            id: uuid(),
            text: input
        });
        setInput('');
    };


    return (
            <form className="todo-form" onSubmit={handleSubmit}>
                <input
                    placeholder={props.edit ? "Update todo" : "Add a todo"}
                    value={input}
                    onChange={handleChange}
                    name="text"
                    className={`todo-input ${props.edit && "edit"}`}
                    ref={inputRef}
                />
                <button onClick={handleSubmit} className={`todo-button ${props.edit && "edit"}`}>
                    {props.edit ? "Update" : "Add todo"}
                </button>
            </form>
    );
}

export default ToDoForm;

