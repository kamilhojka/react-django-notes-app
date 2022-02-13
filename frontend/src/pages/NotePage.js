import React, { useState, useEffect, createFactory } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  let [note, setNote] = useState(null);

  useEffect(() => {
    getNote(id);
  }, [id]);

  let getNote = async (noteId) => {
    if (id === "new") return;
    let response = await fetch(`/api/notes/${noteId}/`);
    let data = await response.json();
    setNote(data);
  };

  let updateNote = async (noteId) => {
    await fetch(`/api/notes/${noteId}/update/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  let createNote = async () => {
    await fetch(`/api/notes/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  let deleteNote = async (noteId) => {
    await fetch(`/api/notes/${noteId}/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  let handleSubmit = async () => {
    if (id !== "new" && !note.body) {
      await deleteNote(id);
    } else if (id !== "new") {
      await updateNote(id);
    } else if (id === "new" && note !== null) {
      await createNote();
    }
    navigate("/");
  };

  let handleDelete = async () => {
    await deleteNote(id);
    navigate("/");
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {id !== "new" ? (
          <button onClick={handleDelete}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
        defaultValue={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
