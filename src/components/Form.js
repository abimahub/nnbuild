import React, { useState, useEffect } from "react";
import PopupModal from "./PopupModal";
import { nanoid } from "nanoid";
import AddFind from "./AddFind.js";

function Form(props) {
  const [addition, setAddition] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastInsertedId, setLastInsertedId] = useState("");
  const [tasks, setTasks] = useState(props.tasks);

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

  function locateTask(id, location) {
    console.log("locate Task", id, "before");
    console.log(location, tasks);
    const locatedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, location: location };
      }
      return task;
    });
    console.log(locatedTaskList);
    setTasks(locatedTaskList);
  };
  function addTask(name){
    const id = "todo-" + nanoid();
   // add in a checker to ensure photo has been taken, if not return some text and cancel btn onclick
   // if(imgId === null || imgId === undefined) {
    const newTask = {
      id: id,
      date: new Date().toLocaleString(),
      name,
      recorded: false,
      location: { latitude: "##", longitude: "##", error: "##", mapLink: "##" }
    };
    setLastInsertedId(id);
    setTasks([...tasks, newTask]);
  };
  function geoFindMe() {
    console.log("geoFindMe", lastInsertedId);
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const mapLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      // console.log(mapLink)
      console.log(`Latitude: ${latitude}°, Longitude: ${longitude}°`);
      locateTask(lastInsertedId, {
        latitude: latitude,
        longitude: longitude,
        error: "",
        mapLink: mapLink,
      });
    }
  
    function error() {
      console.log("Unable to retrieve your location");
    }
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      console.log("Locating...");
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };



  return (
    <form>
      <h2 className="label-wrapper">
        
        <label htmlFor="new-todo-input" className="label__lg">
          What did you find?
        </label>
      </h2>
      <div className="centre">
      <button  type="button" className="btn btn__primary" onClick={handleOpenModal}>Log Find</button>
         <PopupModal isOpen={isModalOpen} onClose={handleCloseModal}>    
         <div>
            <AddFind
              id={props.id}
              name={props.name}
              imgSrc={props.imgSrc}
              comment={props.comment}
              onClose={props.PopupModal}
            ></AddFind>
          </div>
          </PopupModal> 
         <> 
      </>
      </div>
    </form>
  );
}

export default Form;
