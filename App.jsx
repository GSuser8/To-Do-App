import React, {useState} from "react";

function App(){

  const [listItem, setListItem] = useState("");
  const [list, setList] = useState([]);
  const [isDone, setIsDone] = useState({});

  function handleChange(event){
    const value = event.target.value;
    console.log(event.target);
    setListItem(value);
  }

  function handleKeyDown(event){
    const pressed = event.key;
    if(pressed === 'Enter'){
      handleClick();
    }
  }

  function handleClick(){
    if(listItem !== ""){
      setList(prev=>{
        return [...prev, listItem]
      })
      setListItem("");
    }
  }

  function handleDel(givenItem){
    //console.log("Given Item is  :  " + givenItem)
    setList(prev=>{
      return list.filter((item) => item!==givenItem)
    });
    setIsDone(prev=>{
      const newIsDone = {...prev};
      delete newIsDone[givenItem];
      return newIsDone;
    })
  }

  function handleDone(item){
    //console.log(item);
    setIsDone(prev=>({
      ...prev,
      [item]:!prev[item]
    }))
  }

  return <div className="app">
    <div className="container">
      <h1><span id="spanH1">ToDo list</span></h1>
      <input type="text" placeholder="Enter task" onChange={handleChange} onKeyDown={handleKeyDown} value={listItem}/>
      <button onClick={handleClick} id="submit">Add</button>
      <ul>
        {list.map((item)=>{
          return <div class="anItem"><li key={item}>
            <button className="chk" style={{backgroundColor:isDone[item] ? 'rgb(79, 192, 171)' : "white"}} onClick={()=>{
              handleDone(item)
            }}></button>
            <div className="txt" style={{textDecoration : isDone[item] ? 'line-through': 'none'}}>{item}</div>
            <button className="delete" onClick={()=>{
              handleDel(item)
            }}>x</button>
          </li></div>
        })}
      </ul>
    </div>
  </div>;
}

export default App;