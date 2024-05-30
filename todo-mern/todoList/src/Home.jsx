import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import { BsCircleFill, BsFillCircleFill } from "react-icons/bs"; // Ensure this import is correct based on your icon library

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/get")
      .then(result => setTodos(result.data))
      .catch(err => console.log(err))
  }, [])

  const handleEdit = (id) => {
    axios
      .put("http://localhost:3001/update/" + id)
      .then(result => {
        location.reload()
      })
      
      .catch(err => console.log(err))
  }

  const handleDelete = (id)=>{
    axios
      .put("http://localhost:3001/delete/" + id)
      .then(result => {
        location.reload()
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="home">
      <h2>TodoList</h2>
      <Create />
      <br />
      {todos.length === 0 ? (
        <div>
          <h2>No Items</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div className="task" key={todo._id}>
            <div className="checkbox" onClick={() => handleEdit(todo. _id)}>
              {todo.done ? <BsFillCircleFill className="icon"></BsFillCircleFill>
              :
              <BsCircleFill className="icon" />
              }
              
              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            </div>
            <div>
              <span>
                <BsCircleFill className="icon" onClick={()=>{handleDelete(todo._id)}} />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
