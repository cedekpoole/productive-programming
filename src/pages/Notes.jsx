import { React, useState, useEffect, useRef } from "react";
import "../components/NoteComponents/Note.css";
import "../components/NoteComponents/Notes.css";
import Note from "../components/NoteComponents/Note";
import NotesCreateNote from "../components/NoteComponents/NotesCreateNote";
import NotesHeader from "../components/NoteComponents/NotesHeader";
import { v4 as uuid } from "uuid";


function Notes() {
    //states
    const [notes, setNotes] = useState([]);
    const [inputText, setInputText] = useState("");

    // get text and store in state
    const textHandler = (e) => {
        setInputText(e.target.value);
    };

    const notesSaveHandler = () => {
        const newNote = {
            id: uuid(),
            text: inputText,
        };

        // Store the newly created note in the local storage
        const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        const updatedNotes = [...storedNotes, newNote];
        localStorage.setItem("notes", JSON.stringify(updatedNotes));

        setNotes(updatedNotes);
        setInputText("");
    };


    //delete note function
    const deleteNote = (id) => {
        const filteredNotes = notes.filter((note) => note.id !== id);
        setNotes(filteredNotes);
        localStorage.setItem("notes", JSON.stringify(filteredNotes));
    };

    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        setNotes(storedNotes);
    }, []);

    return (
        <div className="notes">
            <NotesHeader />
            <div className="notes__content">
                {notes.map((note) => (
                    <Note
                        key={note.id}
                        id={note.id}
                        text={note.text}
                        deleteNote={deleteNote}
                    />
                ))}
                <NotesCreateNote
                    textHandler={textHandler}
                    notesSaveHandler={notesSaveHandler}
                    inputText={inputText}
                />
            </div>

        </div>
    );
}

export default Notes;