import React , { useState } from 'react'
import Task from "./Task"

const Home = () => {
  const [tasks,setTasks] = useState([])
  const [title,setTitle] = useState("")
  const [Discription,setDiscription] = useState("")
  console.log(title)
  const submitHandler = (e) =>{

    e.preventDefault();
    setTasks([...tasks])
  }
  return (
  <div className='container'>
    <h1>Goal</h1>
    <form onSubmit={submitHandler}>
      <input type="text" placeholder='Title' value={title} onChange={(e)=>{
        setTitle(e.target.value)
      }}/>
      <textarea placeholder='Description' value={Discription} onChange={(e)=>{
        setDiscription(e.target.value)
      }}/>
      <button type='submit'>Add</button>
    </form>

    {tasks.map(
      ()=>{
        <Task />
      }
    )}
  </div>
  )
}

export default Home

