
// New note component for Notes page
function NotesCreateNote({textHandler, notesSaveHandler, inputText}) {
    return (
        <div className="note">
            <textarea
                cols="10"
                rows="5"
                value={inputText}
                placeholder="Type your note...."
                onChange={textHandler}
                maxLength="100"
            ></textarea>
            <div className="note__footer">
                <button className="note__save" onClick={notesSaveHandler}>
                    Save
                </button>
            </div>
        </div>
    );
}

export default NotesCreateNote;