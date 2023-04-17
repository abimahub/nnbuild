import React, { useEffect, useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { addPhoto } from "../db.js";

const WebcamCapture = (props) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [imgId, setImgId] = useState(null);
  const [photoSave, setPhotoSave] = useState(false);
  const [name, setName] = useState("");
  const [comment, setComment] = useState('');
  function handleComment(e) {
    setComment(e.target.value);
  }
  function handleChange(e) {
    setName(e.target.value);
  }
    const handleSubmit = (e) => {
      e.preventDefault();
      props.addTask(props.id, name)
      props.addTask(props.id, comment)
      setName("");
      setComment("");
    };

  useEffect(() => {
    if (photoSave) {
      console.log("useEffect detected photoSave");
      props.photoedTask(imgId);
      setPhotoSave(imgId);
    }
  },[photoSave, imgId, props] 
  );

  const capture = useCallback((id) => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    console.log("capture", imageSrc.length, id);
  }, [webcamRef, setImgSrc]);

  const savePhoto = (id, imgSrc) => {
    console.log("savePhoto", imgSrc.length, id);
    addPhoto(id, imgSrc);
    setImgId(id);
    setPhotoSave(true);
  };
  const cancelPhoto = (id, imgSrc) => {
    console.log("cancelPhoto", imgSrc.length, id);
  };
  return (
    <>
        <form onSubmit={handleSubmit}>
        {!imgSrc && (<Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
        ></Webcam>)}
        {imgSrc && (
            <img 
                src={imgSrc}
                alt={props.name}
            />
        )}
        <div className='btn-group'>
            {!imgSrc && (
                <button 
                    type="button"
                    className="btn"
                    onClick={()=>capture(props.id)}
                >
                    Capture Photo
                </button>
            )}
            {imgSrc && (
                <button
                    type="button"
                    className="btn"
                    onClick={()=>savePhoto(props.id,imgSrc)}
                >   
                    Save Photo
                </button>
            )}
            {imgSrc && (
                <button
                    type="button"
                    className="btn"
                    onClick={()=>cancelPhoto(props.id,imgSrc)}
                >
                    Cancel
                </button>
            )}
        </div>
       <div>
       <h3 className="label-wrapper">  
        <label htmlFor="new-todo-input" className="label__lg">
          Log your find
        </label>
      </h3>
      </div><div>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        placeholder="name of find"
        value={name}
        onChange={handleChange}
        required
      />
      </div><div>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        placeholder="comment..."
        value={comment}
        onChange={handleComment}
        required
      /> </div>
      <button type="submit" className="btn btn__primary btn__lg">
      Save Find
      </button>
    </form>
    </>      
  )
};


export default WebcamCapture