import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const NotePage = () => {
  let { id } = useParams();
  let [note, setNote] = useState(null);

  useEffect(() => {
    getNote(id);
  }, [id]);

  let getNote = async (noteId) => {
    let response = await fetch(`/api/notes/${noteId}`);
    let data = await response.json();
    setNote(data);
  };

  return (
    <div>
      <h1>{note?.body}</h1>
    </div>
  );
};

export default NotePage;
