import React, { useEffect, useState } from "react";
import WebcamCapture from "./WebcamCapture";
import PopupModal from "./PopupModal.js";

const AddFind =(props) => {
const [name, setName] = useState("");
  const [comment, setComment] = useState('');
  const [addition, setAddition] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(()=>{
    if(addition){
        console.log('useEffect detected addition')
   //     props.geoFindMe();
        setAddition(false);
    }
},[addition, props])
  function handleComment(e) {
    setComment(e.target.value);
  }
  function handleChange(e) {
    setName(e.target.value);
  }
    const handleSubmit = (e) => {
      e.preventDefault();
        if(!name.trim()){
            return
        }
        setAddition(true);
        props.addTask(name);
        setName('');
    }
  
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
      <>
      <form onSubmit={handleSubmit}>
         <div className="centre">
         <button  type="button" className="btn btn__primary" onClick={handleOpenModal}>Take Photo</button>
         <PopupModal isOpen={isModalOpen} onClose={handleCloseModal}>    
         <div>
            <WebcamCapture
              id={props.id}
              name={props.name}
              imgSrc={props.imgSrc}
              comment={props.comment}
              onClose={props.PopupModal}
            ></WebcamCapture>
          </div>
    </PopupModal> 
          
        <h2 className="label-wrapper">
          
          <label htmlFor="new-todo-input" className="label__lg">
            What did you find?
          </label>
        </h2>           
            <div>
            <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="name"
          placeholder="Name of Find..."
          autoComplete="off"
          value={name}
          onChange={handleChange}
        /></div>
        <br/>
        <div>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="comment"
          placeholder="Comments...(optional)"
          autoComplete="off"
          value={comment}
          onChange={handleComment}
        />  
        <button type="submit" className="btn btn__primary" >Save Find</button>
        </div>
       </div>
      </form>
      </>
    )
}

export default AddFind;