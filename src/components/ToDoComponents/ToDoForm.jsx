import { React, useState, useRef, useEffect } from 'react';
import { v4 as uuid } from "uuid";


function ToDoForm(props) {

    // initial value of input determined by if props object has edit property
    const [input, setInput] = useState(props.edit ? props.edit.value : '');

    // store reference to input used in form element
    const inputRef = useRef(null);

    // set focus on input
    useEffect(() => {
        inputRef.current.focus();
    })

    // update input state when value changes
    const handleChange = e => {
        setInput(e.target.value);
    };

    // set new id and input when form submitted
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

