import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import WebcamCapture from "./WebcamCapture";



function Form(props) {
  const [addition, setAddition] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (addition) {
      console.log("useEffect detected addition");
      props.geoFindMe();
      setAddition(false);
    }
  }, [addition, props]);

  return (
    <form>
      <h2 className="label-wrapper">
        
        <label htmlFor="new-todo-input" className="label__lg">
          What did you find?
        </label>
      </h2>
      <div className="btn-group">
      <button  type="button" className="btn btn__primary" onClick={handleOpenModal}>Log Find</button>
         <Modal isOpen={isModalOpen} onClose={handleCloseModal}>    
         <div>
            <WebcamCapture
              id={props.id}
              name={props.name}
              imgSrc={props.imgSrc}
              comment={props.comment}
            ></WebcamCapture>
          </div>
          </Modal> 
           
      </div>
    </form>
  );
}

export default Form;
