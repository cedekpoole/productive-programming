import { React, useState, useEffect } from "react";
import "../components/NoteComponents/Note.css";
import "../components/NoteComponents/Notes.css";
import Note from "../components/NoteComponents/Note";
import NotesCreateNote from "../components/NoteComponents/NotesCreateNote";
import NotesHeader from "../components/NoteComponents/NotesHeader";
import SearchNotes from "../components/NoteComponents/SearchNotes";
import { v4 as uuid } from "uuid";


function Notes() {
    //states
    const [notes, setNotes] = useState([]);
    const [inputText, setInputText] = useState("");
    const [filteredNotes, setFilteredNotes] = useState(notes);
    const [searchText, setSearchText] = useState("");


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

    const handleSearchNote = (searchText) => {
        setSearchText(searchText);

        if (!searchText) {
            setFilteredNotes(notes);
        } else {
            const filtered = notes.filter((note) =>
            note.text.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredNotes(filtered);
        }
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
        setFilteredNotes(storedNotes);
    }, []);

    useEffect(() => {
        setFilteredNotes(notes);
    }, [notes]);

    return (
        <div className="notes">
            <NotesHeader />
            <SearchNotes handleSearchNote={handleSearchNote}/>
            <div className="notes__content">
                {filteredNotes.map((note) => (
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
