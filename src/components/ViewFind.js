import React, { useState, useRef, useEffect } from "react";
import FindForm from "./FindForm";
import ViewPhoto from "./ViewPhoto.js";
import PopupModal from "./PopupModal.js";

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

const ViewFind = (props) => {
    const [isEditing, setEditing] = useState(false);
    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);
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
          <p>
          <br></br> | found on: {props.date}
          <br></br> | lat: {props.latitude}
          <br></br> | long: {props.longitude}
          <br></br> | Comment: {props.comment}
        </p>
        <div className="map-container">
              <div className="lefto">
            <a href={props.mapLink}>Map</a></div>
      <iframe
      title="OpenStreetMap"
      width="100%"
      height="400"
      src={`https://www.openstreetmap.org/export/embed.html?bbox=${props.longitude},${props.latitude},${props.longitude},${props.latitude}&layer=mapnik&marker=${props.latitude},${props.longitude}`}
      ></iframe>
     </div>
      
  <div className="btn-group">
  <button type="button" className="btn" onClick={() => setEditing(true)} ref={editButtonRef} >
    Edit
  </button>
  <PopupModal isOpen={isModalOpen} onClose={handleCloseModal}>    
    <div>
  <FindForm
   id={props.id}
   name={props.name}
  ></FindForm>
  </div>
  </PopupModal> 

  <button  type="button" className="btn" onClick={handleOpenModal}>
    View Photo
    </button>
    <PopupModal isOpen={isModalOpen} onClose={handleCloseModal}>    
    <div>
     <ViewPhoto
     id={props.id}
     alt={props.name}
    ></ViewPhoto>
    </div>
    </PopupModal> 
  
  
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
};

  export default ViewFind