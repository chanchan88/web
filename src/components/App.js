import './App.css';
import react, { useState, useEffect} from "react";



function App() {
  let d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
  let date = year+"."+month+"."+day;
  const [list, updateList] = useState([]);
  const [counter, setCounter] = useState(0);

  const amountOptions = [
    1,
    2,
    3,
    4,
    5
  ]
  const tasks = [
    "Feed",
    "Sleep",
    "Play"
  ] 

  const addFeed=(task)=>{
    alert(task)
    //API add task in DB
    setCounter(counter+1);
    updateList(list => [...list, <Task key={"Task"+counter} />]); 
  }
  const addTimer=()=>{

  }

  const Task=({task})=>{
    console.log(task);
    return(
      <div>Milk</div>
    )
  }
  
  //(Maybe or maybe not) to use this as a tag variable name start with Upper letter
  const TaskDropdown=({options}) => {
    //use useState to set boolean and return component with feeding amount select or without
    const [task, setTask] = useState("Feed");
  
    return (
      <div>
        <select className="task" onChange={(e)=>{setTask(e.target.value)}}>
          {options.map(el => <option key={el} value={el}>{el}</option>)}
        </select>
        {(task === "Feed")?
        <>
          <FeedingAmount amountOption={amountOptions} />
          <button className="feedBtn" onClick={()=>addFeed(task)}>Add</button>
        </>
        :<><button className="timerBtn" onClick={addTimer}>Start</button></>}
      </div>
      
    );
  };
  
  const FeedingAmount=({amountOption})=>{
    return(
      <select className="feedingAmount" id="feedingAmount">
        {amountOption.map(el => <option key={el.toString()} value={el}>{el}</option>)}
      </select>
    );
  };

  return (
    <div>
      <div className="wrap">
        <div className="left-container">
          <h1>Information</h1>
        </div>
        <div className="right-container">
          <div className="date-box">
            <h1>{date}</h1>
          </div>
          <div className="task-box">
            <TaskDropdown options={tasks} />
          </div>
          <div className="list-box" id="list-box">
            {list}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default App;
