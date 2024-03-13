import axios from "axios";

import React, { useState } from "react";


const TodoForm = ({setTodos, fetchData}) => {
    // define objects
    const [newTodo, setNewTodo] = useState({
        'body': ''
    })
    // listen to input box
    const handleChange = (e) => {
        setNewTodo(prev => ({
            ...prev,
            'body': e.target.value
        }))
        // console.log(newTodo)
    }
    // post request on click
    const postTodo = async() => {
        try{
            await axios.post('http://127.0.0.1:8000/api/todo/', newTodo)
            // setTodos(prevTodos => [...prevTodos, newTodo]) // recompile the list
            setNewTodo({'body':''}) // don't accidently post old content because not set to empty from
            fetchData() // auto refresh the list
        }catch (error){
            console.log(error)
        }
    }

    return (
        <div className="py-2">
            <input type='text' placeholder='Add To Do' className='input input-bordered input-info w-full max-w-xs' 
            onChange={handleChange} value={newTodo.body}
            onKeyDown={(e) => {
                if(e.key === 'Enter') {postTodo()}  //Both Enter and button click post
            }}
            />
            <button className="btn btn-info ml-2" onClick={postTodo}>Add To Do</button>
        </div>
    )
}

export default TodoForm