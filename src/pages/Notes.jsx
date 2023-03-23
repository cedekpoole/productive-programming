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

    // for each new note add id and text value
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

    // function to search notes
    const handleSearchNote = (searchText) => {
        setSearchText(searchText);

        // if no search term, show all notes
        if (!searchText) {
            setFilteredNotes(notes);
        // for search term filter notes to show all with search value
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
        // re-set notes to not show deleted
        localStorage.setItem("notes", JSON.stringify(filteredNotes));
    };

    // retrieve notes from local storage, set as initial state, run once
    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        setNotes(storedNotes);
        setFilteredNotes(storedNotes);
    }, []);

    // update filteredNotes state whenever state changes
    useEffect(() => {
        setFilteredNotes(notes);
        // only run when state changes
    }, [notes]);

    return (
        <div className="notes notes-container container">
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
