import React, { useState, useRef, useEffect } from "react";
import Modal from 'react-modal';
import ViewFind from "./ViewFind.js";

Modal.setAppElement('#root'); // Specify the root element of your app

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function Todo(props) {
  
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newComment, setNewComment] = useState('');
  const editFieldRef = useRef(false);
  const editButtonRef = useRef(false);
  const wasEditing = usePrevious(isEditing);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    } else if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  function handleComment(e) {
    setNewComment(e.target.value);
  }
  function handleChange(e) {
    setNewName(e.target.value);
  }
    const handleSubmit = (e) => {
      e.preventDefault();
      props.editTask(props.id, newName)
      props.editTask(props.id, newComment)
      setNewName("");
      setNewComment("");
      setEditing(false);
    };


    const editingTemplate = (
      <form className="stack-small" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="todo-label" htmlFor={props.id}>
            New name for {props.name}
          </label>
          <input
            id={props.id}
            className="todo-text"
            type="text"
            value={newName}
            onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label className="todo-label" htmlFor={props.id}>
            Input new comment... {props.comment}
          </label>
          <input
            id={props.id}
            className="todo-text"
            type="text"
            value={newComment}
            onChange={handleComment}/>
        </div>
        <div className="btn-group">
          <button type="button" className="btn todo-cancel" onClick={() => setEditing(false)} >
            Cancel
            <span className="visually-hidden">renaming {props.name}</span>
          </button>
  
          <button type="submit" className="btn btn__primary todo-edit">
            Save
            <span className="visually-hidden">new name for {props.name}</span>
          </button>
        </div>
      </form>
    );
  
    const viewTemplate = (
      <div className="stack-small">
        <div className="c-cb">
          <input
            id={props.id}
            type="checkbox"
            defaultChecked={props.recorded}
            onChange={() => props.toggleTaskCompleted(props.id)}
          />
  
          <label className="todo-label" htmlFor={props.id}>
            {props.name}</label>
               
    <div className="btn-group">
    <button type="button" className="btn" onClick={() => setEditing(true)} ref={editButtonRef} >
      Edit
    <span className="visually-hidden">{props.name}</span>
    </button>
    
    <button  type="button" className="btn" onClick={handleOpenModal}>
      View Details
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>    
      <div>
       <ViewFind
       id={props.id}
       alt={props.name}
       name={props.name}
      ></ViewFind>
      </div>
      </Modal> 
    
    <button
      type="button"
      className="btn btn__danger"
      onClick={() => props.deleteTask(props.id)}
    >
      Delete <span className="visually-hidden">{props.name}</span>
    </button>
    </div>
    </div>
    </div>
    );
    return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
  }