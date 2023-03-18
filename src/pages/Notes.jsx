import { React, useState, useEffect, useRef } from "react";
import "../components/NoteComponents/Note.css";
import Note from "../components/NoteComponents/Note"
import CreateNote from "../components/NoteComponents/CreateNote";
import { v4 as uuid } from "uuid";


function Notes() {
    //states
    const [notes, setNotes] = useState([]);
    const [inputText, setInputText] = useState("");

    // get text and store in state
    const textHandler = (e) => {
        setInputText(e.target.value);
    };

    // add new note to the state array
    const saveHandler = () => {
        setNotes((prevState) => [
            ...prevState,
            {
                id: uuid(),
                text: inputText
            }
        ]);
        //clear the textarea
        setInputText("");
    };

    //delete note function
    const deleteNote = (id) => {
        const filteredNotes = notes.filter((note) => note.id !== id);
        setNotes(filteredNotes);
    };

    //apply the save and get functions using useEffect
    //get the saved notes and add them to the array
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("Notes"));
        if (data) {
            setNotes(data);
        }
    }, []);

    //saving data to local storage
    const isInitialMount = useRef(true);
    useEffect(() => {
        if (!isInitialMount.current) {
            localStorage.setItem("Notes", JSON.stringify(notes));
        } else {
            isInitialMount.current = false;
        }
    }, [notes]);






    return (
        <div className="notes">
            {notes.map((note) => (
                <Note
                    key={note.id}
                    id={note.id}
                    text={note.text}
                    deleteNote={deleteNote}
                />
            ))}
            <CreateNote
                textHandler={textHandler}
                saveHandler={saveHandler}
                inputText={inputText}
            />
        </div>
    );
}

export default Notes;