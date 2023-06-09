import React, { useEffect, useState, useRef } from "react";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";
import logo from "./favicon-32x32.png";
import { deletePhoto } from "./db.js";
import Form from "./components/Form";


const FILTER_MAP = {
  All: () => true,
  Found: (task) => !task.recorded,
  Recorded: (task) => task.recorded,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);

  const [filter, setFilter] = useState("All");
  const [lastInsertedId, setLastInsertedId] = useState("");
  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

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

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify([...tasks]));
  }, [tasks]);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

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
  
  function deleteTask(id){
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
    deletePhoto(id); //should delete photo and task - no orphans
  };

  function editTask(id, newName){
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  };

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

  function toggleTaskCompleted (id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, recorded: !task.recorded };
      }
      return task;
    });
    setTasks(updatedTasks);
  };
  
  
  const photoedTask =(id)=>{
    console.log('photoedTask', id)
    const photoedTaskList = tasks.map(task=>{
      // if this task has the same ID as the edited task
      if(id===task.id){
        return {...task, photo: true}
      }
      return task
    })
    console.log(photoedTaskList)
    setTasks(photoedTaskList)
  }

  const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => (
    <>
      <Todo
        id={task.id}
        name={task.name}
        date={task.date}
        comment={task.comment}
        recorded={task.recorded}
        key={task.id}
        latitude={task.location.latitude}
        longitude={task.location.longitude}
        mapLink={task.location.mapLink}
        toggleTaskCompleted={toggleTaskCompleted}
        addTask={addTask}
        deleteTask={deleteTask}
        editTask={editTask}
        photoedTask={photoedTask}
      
      />
    </>
  )); //removed photoedTask from the list just now.

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const findsNoun = taskList.length !== 1 ? "finds" : "find";
  const headingText = `${taskList.length} ${findsNoun} logged`;

  return (
    <div className="todoapp stack-large">
      <img src={logo} alt="Logo" />
      <h1>NatureNotation</h1>
      <Form addTask={addTask} geoFindMe={geoFindMe} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;