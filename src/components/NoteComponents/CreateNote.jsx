import LinearProgress from "@mui/material/LinearProgress";
import { useState } from 'react';
import { v4 as uuid } from "uuid";

function CreateNote({ saveHandler }) {

    const [inputText, setInputText] = useState("");
//   //character limit
//   const charLimit = 100;
//   const charLeft = charLimit - inputText.length;

const textHandler = (e) => {
    setInputText(e.target.value);
  };

  const handleSave = () => {
    const newNote = {
      id: uuid(),
      text: inputText,
    };
    saveHandler(newNote);
    setInputText("");
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
        {/* <span className="label">{charLeft} characters left</span> */}
        <button className="note__save" onClick={handleSave}>
          Save
        </button>
      </div>
      {/* <LinearProgress
        className="char__progress"
        variant="determinate"
        value={charLeft}
      /> */}
    </div>
  );
}

export default CreateNote;
