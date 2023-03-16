import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import React, { useState } from 'react';

const Notes = ({ note }) => {
  return (
    <div>
      <h2>Note:</h2>
      <div>{note}</div>
    </div>
  );
};

const NotesWidget = () => {
  const { quill, quillRef } = useQuill();
  const [noteValue, setNoteValue] = useState('');

  const handleSaveButtonClick = () => {
    let saveNote = quillRef.current.firstChild.innerHTML;
    setNoteValue(saveNote);
  };
  

  return (
    <div>
      <div style={{ width: 500, height: 300 }}>
        <div ref={quillRef} />
      </div>
      <button onClick={handleSaveButtonClick}>Save</button>
      {noteValue && <Notes note={noteValue} />}
    </div>
  );
};

export default NotesWidget;
