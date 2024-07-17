import React from 'react'
import { useState,useEffect} from 'react'
import {AiFillDelete} from 'react-icons/ai'
import {TiEdit} from 'react-icons/ti'
const TodoApp = () => {
  const LOCAL_STORAGE_KEY = "task-list"
  const [task,setTask]=useState("")
  const [addTask,setAddTask]=useState(() =>{
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))||[]
  })


useEffect(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(addTask));
}, [addTask]);

const inputText = (e) =>{
    const input = e.target.value
    setTask(input)
  }
  const submitInputData = (event) =>{
    event.preventDefault();
    if(task.trim() !== ''){
      
    setAddTask((prev) => [...prev,task]);
    setTask('')
    }
  }
  const deleteTask = (index) =>{
  //  const deleteData = [...addTask]
  //  deleteData.splice(index,1)
  //  setAddTask(deleteData)
  const deleteData = addTask.filter((item,i) => i !== index)
  setAddTask(deleteData)
  
  } 
  
  const editTask=(index) =>{
    const editInput =prompt('Edit task :',addTask[index])
    if(editInput !== null && editInput !== ''){
      const updatedTask = [...addTask]
      updatedTask[index]=editInput
      setAddTask(updatedTask)
    }
    
  }


  return (
    <>
     <div className="container">
        <div className="navbar">
              <h1>To-Do App</h1>
        </div>
        <div className="inputBox">
         <form onSubmit={submitInputData}>
            <input 
              className='input'
              type="text"
              placeholder='Write a Task and Add'
              onChange={inputText}
              value={task}
              
           />
            <button className='input-btn'>Add</button>
            </form>
        </div>
        
              <ol>
                {addTask.map((data,index) =>(
                   <li key={index} className='taskList'>
                        <span className='text'>{data}</span>
                        <div className="button">
                        <button className='deleteBtn' onClick={()=>deleteTask(index)}><AiFillDelete/></button>
                        <button className='editBtn'onClick={()=>editTask(index)}><TiEdit/></button>
                        </div>
                      </li>
                      
                ))}
              </ol>
        
     </div>
    </>
  )
}

export default TodoApp