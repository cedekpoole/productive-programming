import { useState } from 'react';
import { v4 as uuid } from "uuid";

function CreateNote({ saveHandler }) {

  // set states
  const [inputText, setInputText] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  // set inputText to input value
  const textHandler = (e) => {
    setInputText(e.target.value);
  };

  // function to save note with id and text
  const handleSave = () => {
    const newNote = {
      id: uuid(),
      text: inputText,
    };
    saveHandler(newNote);
    setInputText("");
    setSaveMessage("Note saved");
    // show 'save message'
    setShowSaveMessage(true);
    setTimeout(() => {
      setShowSaveMessage(false);
      setSaveMessage("");
    }, 1000);
  };

  return (
    <div className="note" style={{ background: "rgba(255, 255, 255, 0)" }}>
      <textarea
        cols="10"
        rows="5"
        value={inputText}
        placeholder="Type your note...."
        onChange={textHandler}
        maxLength="100"
      ></textarea>
      <div className="note__footer">
        {/* if note 'saved' add 'show' class */}
        {saveMessage && <div className={`note__message ${showSaveMessage ? "show" : ""}`}>{saveMessage}</div>}
        <button className="note__save" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateNote;
