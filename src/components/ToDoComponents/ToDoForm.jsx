import { React, useState } from 'react';
import { v4 as uuid } from "uuid";
 

function ToDoForm(props) {

    const [input, setInput] = useState("");

    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            id: uuid(),
            text: input
        });
        setInput('');
    };

    const handleChange = e => {
        setInput(e.target.value);
    };

  return (
    <div className="todo-container">
    <form className="todo-form" onSubmit={handleSubmit}>
        <input 
        type="text" 
        placeholder="Add a todo" 
        value={input}
        onChange={handleChange}
        name="text" 
        className="todo-input" />
        <button className="todo-button">Add ToDo</button>
    </form>
    </div>
  )
}

export default ToDoForm;