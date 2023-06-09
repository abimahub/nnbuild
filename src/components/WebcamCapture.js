import React, { useEffect, useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { addPhoto, deletePhoto } from "../db.js";


const WebcamCapture = (props) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [imgId, setImgId] = useState(null);
  const [photoSave, setPhotoSave] = useState(false);
  
  useEffect(() => {
    if (photoSave) {
      console.log("useEffect detected photoSave");
      setPhotoSave(imgId);
    }
  }, [photoSave, imgId, props] 
  );
    
  
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    console.log("capture", imageSrc.length, props.id);
  }, [webcamRef, setImgSrc, props.id]);

  const savePhoto = () => {
    console.log("savePhoto", imgSrc.length, props.id);
    addPhoto(props.id, imgSrc);
    setImgId(props.id);
    setPhotoSave(true);
  };
  const cancelPhoto = () => {
    console.log("cancelPhoto", imgSrc.length, props.id);
    //need to delete record from Db - no orphans
    deletePhoto(props.id);
    setImgSrc(null)
  };
  return (
    <>
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
                    onClick={capture}
                >
                    Capture Photo
                </button>
            )}
            {imgSrc && (
                <button
                    type="button"
                    className="btn"
                    onClick={savePhoto}
                >   
                    Save Photo
                </button>
            )}
            {imgSrc && (
                <button
                    type="button"
                    className="btn"
                    onClick={cancelPhoto}
                >
                    Cancel
                </button>
            )} 
            </div>
            </>     
  );
};
export default WebcamCapture;