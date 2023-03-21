

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
                {/* <span className="label">{charLeft} left</span> */}
                <button className="note__save" onClick={notesSaveHandler}>
                    Save
                </button>
            </div>
        </div>
    );
}

export default NotesCreateNote;