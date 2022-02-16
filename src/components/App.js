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

  const addList=(task)=>{
    //API add task in DB
    let oz = null;
    const date = new Date();
    const curTime = date.getHours() + ":" + date.getMinutes();
    if(document.getElementById("feedingAmount")!= null){
      oz = document.getElementById("feedingAmount").value;
    }
    console.log(oz);
    setCounter(counter+1);
    updateList(list => [...list, <Task key={"Task"+counter} option={task} amount={oz} created_at={curTime}/>]); 
  }

  const Task=({option, created_at, amount=null})=>{
    let idx = tasks.indexOf(option);
    const [seconds, setSeconds] = useState("00");
    const [minutes, setMinutes] = useState("00");
    const [hours, setHours] = useState("00");
    const [timerSwitch, setSwitch] = useState(true);

    
    useEffect(() => {
      if (timerSwitch){
        const timerStart = setInterval(() => {
        
          if (parseInt(minutes) === 60) {
            setMinutes("00");
            if(parseInt(hours) + 1 < 10){
              setHours("0"+ (parseInt(hours) + 1));
            } else {
              setHours(parseInt(hours) + 1);
            }
          } else if(parseInt(seconds) === 60){
            setSeconds("00");
            if(parseInt(minutes) + 1 < 10){
              setMinutes("0" +(parseInt(minutes) + 1));
            } else {
              setMinutes(parseInt(minutes) + 1);
            }
          }else{
            if(parseInt(seconds) + 1 < 10){
              setSeconds("0" +(parseInt(seconds) + 1));
            } else {
              setSeconds(parseInt(seconds) + 1);
            }      
          }
        }, 1000);
        return () => clearInterval(timerStart);
      }

    }, [seconds, minutes, hours]);

    if(idx === 0){
      return(
        <>
        <div className="list-content">
          <div className="emoji">&#127868;</div>
          <div className="content">{amount} oz</div>
          <div className="timestamp">{created_at}</div>
        </div>
        </>
        
      )
    } else if(idx === 1){
      if(timerSwitch === false){
        return(
          <>
          <div className="list-content">
            <div className="emoji">&#127769;&#11088;</div>
            <div className="timestamp">{created_at}</div>
            <div className="timer">{hours}:{minutes}</div>
          </div>
          </>
        )
      }
      return(
        <>
        <div className="list-content">
          <div className="emoji">&#127769;&#11088;</div>
          <div className="timestamp">{created_at}</div>
          <div className="timer">{hours}:{minutes}:{seconds}</div>
          <button onClick={()=>setSwitch(false)}>STOP</button>
        </div>
        </>
      )
    } else {
      if(timerSwitch === false){
        return(
          <>
          <div className="list-content">
            <div className="emoji">&#9918;</div>
            <div className="timestamp">{created_at}</div>
            <div className="timer">{hours}:{minutes}</div>
          </div>
          </>
        )
      }
      return(
        <>
        <div className="list-content">
          <div className="emoji">&#9918;</div>
          <div className="timestamp">{created_at}</div>
          <div className="timer">{hours}:{minutes}:{seconds}</div>
          <button onClick={()=>setSwitch(false)}>STOP</button></div>
        </>
      )
    }
    
  }
  
  //(Maybe or maybe not) to use this as a tag variable name start with Upper letter
  const TaskDropdown=({options}) => {
    //use useState to set boolean and return component with feeding amount select or without
    const [task, setTask] = useState("Feed");
  
    return (
      <>
        <select className="task" onChange={(e)=>{setTask(e.target.value)}}>
          {options.map(el => <option key={el} value={el}>{el}</option>)}
        </select>
        {(task === "Feed")?
        <>
          <FeedingAmount amountOption={amountOptions} />
          <button className="addBtn" onClick={()=>addList(task)}>Add</button>
        </>
        :<><button className="addBtn" onClick={()=>addList(task)}>Start</button></>}
      </>
      
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
        <div className="date-box">
          <h1>{date}</h1>
        </div>
        <div className="bottom-section">
          <div className="add-container">
            <div className="task-box">
              <TaskDropdown options={tasks} />
            </div>
          </div>
          <div className="record-container">
            <div className="list-wrap" id="list-wrap">
              {list}
            </div>
          </div>
        </div> 
      </div>
    </div>
  );
};

export default App;
