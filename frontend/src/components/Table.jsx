import axios from 'axios'
import React, { useState } from 'react'
import { MdOutlineDeleteOutline, MdEditNote, MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank, MdIncompleteCircle} from 'react-icons/md'

const Table = ({todos, setTodos, isLoading }) => {

    const [editText, setEditText] = useState({
        'body': ''
    })

    const handleDelete = async (id) => {
        try{
            await axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`)
            const newList = todos.filter(todo => todo.id !== id)
            setTodos(newList)
        }catch (error){
            console.log(error);
        }
    }

    const handleEdit = async (id, value) => {
        try{
            const response = await axios.patch(`http://127.0.0.1:8000/api/todo/${id}/`, value)
            const newTodos = todos.map(todo => todo.id === id ? response.data : todo)
            setTodos(newTodos)
        }catch (error){
            console.log(error);
        }
    }

    const handleCheckbox = (id, value) => {
        handleEdit(id, {
            'completed': !value
        })
    }

    const handleChange = (e) => {
        setEditText(prev => ({
            ...prev,
            'body': e.target.value
        }))
        console.log(editText);
    }

    const handleClick = () => {
        handleEdit(editText.id, editText)
        setEditText({
            'body': ''
        })
    }

    return (
        <div className='py-8'>
            <table className='w-11/12 max-w-4x1'>
                <thead className='border-b-2 border-info'>
                    <tr>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Checkbox</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>To Do</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Data Created</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Actions</th>
                    </tr>
                </thead>
                {isLoading? <caption>Loading Data</caption>:
                    <tbody>
                        {todos.map((todoItem, index) => {
                            return(
                                <tr key={todoItem.id} className='border-b border-info'>
                                    <th className='p-3' title={todoItem.id}>
                                        <span onClick={() => handleCheckbox(todoItem.id, todoItem.completed)}
                                            className='inline-block cursor-pointer'>
                                            {todoItem.completed ? <MdOutlineCheckBox />: <MdOutlineCheckBoxOutlineBlank/>}
                                        </span>
                                    </th>
                                    <th className='p-3 text-sm font-normal'>{todoItem.body}</th>
                                    <th className='p-3 text-sm text-center'>
                                        <span onClick={() => handleCheckbox(todoItem.id, todoItem.completed)} 
                                            className={`p-1.5 text-xs font-medium tracking-wider rounded-md cursor-pointer
                                            ${todoItem.completed ? 'bg-green-300 dark:bg-green-800' :'bg-red-300 dark:bg-red-900'}`}>
                                            {todoItem.completed ? 'Done' : 'Incomplete'}
                                        </span>
                                    </th>
                                    <th className='p-3 text-sm font-normal'>
                                        {new Date(todoItem.created).toLocaleDateString("en-US")}, 
                                        {new Date(todoItem.created).toLocaleTimeString("en-US")}
                                    </th>
                                    <th className='p-3 text-sm font-medium grid grid-flow-col items-center mt-2 mb-2'>
                                        <span className='text-xl cursor-pointer btn btn-info btn-outline hover:not(btn-outline) mr-2'
                                            onClick={()=>document.getElementById('my_modal_1').showModal()}>
                                            <MdEditNote onClick={() => setEditText(todoItem)}/>
                                        </span>
                                        <span className='text-xl cursor-pointer btn btn-outline btn-warning'>
                                            <MdOutlineDeleteOutline onClick={ () => handleDelete(todoItem.id)} />
                                        </span>
                                    </th>
                                </tr>
                            )
                        })}
                    </tbody>
                }
            </table>    
            <dialog id='my_modal_1' className='modal modal-bottom sm:modal-middle'>
                <div className='modal-box'>
                    <h3 className='font-bold text-lg py-3'>Edit To Do</h3>
                    <input type="text" value={editText.body} onChange={handleChange} className='input input-bordered input-info w-full'/>
                    {/* <p className="py-4 font-thin">Press ESC or click the X to close</p> */}
                    <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        <button className="btn mr-2 btn-info" onClick={handleClick}>Update</button>
                        {/* <button className="btn btn-neutral">Close</button> */}
                    </form>
                    </div>
                </div>                
            </dialog>
        </div>
    )
}

export default Table