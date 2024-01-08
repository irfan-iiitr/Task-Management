import React, { useEffect, useState } from 'react'
import options from '../assets/options'
import { FaCaretDown } from "react-icons/fa";
import TodoList from './TodoList';
import ErrorMsg from './Toast/ErrorMsg';
import SuccessMsgToast from './Toast/SuccessMsg';
import { useDispatch, useSelector } from 'react-redux';
import { addTodos, removeTodos, updateTodo } from '../reduxStore/todoSlice';
import { motion } from 'framer-motion';

const InputBox = () => {
  const dispatch=useDispatch();
  const todosItem = useSelector((state) => state.todos.todosList.length > 0 ? state.todos.todosList : JSON.parse(localStorage.getItem('todosList')) || []);

  const [todo,setTodo]= useState("");
  const [category,setCategory]= useState("");
  const [errMsg,setErrMsg]=useState("");
  const [successMsg,setSuccessMsg]=useState("");
  const [showError,setShowError]=useState(false);
  const [showSuccess,setShowSuccess]=useState(false);
  const [showRemoveAll,setShowRemoveAll]=useState(false);
  const [isEditing,setIsEditing]=useState(null);
  const [newTodo, setNewTodo] = useState('');
  const [newCategory, setNewCategory] = useState('');
  



  const handleTodo=(e)=>{
    e.preventDefault();


    if(isEditing){
      console.log(isEditing.id);
      console.log(newTodo);
      console.log(newCategory);
      dispatch(
        updateTodo({
          id:isEditing.id,
          todo:newTodo,
          category:newCategory,
          complete:isEditing.complete
        })
      )
      setNewTodo("");
      setNewCategory("");
      setIsEditing(null);
    }
    else{
    if(todo==="") {setErrMsg("Please write your task"); setShowError(true); setShowSuccess(false)}
    else if(category==="") {setErrMsg("Please select your category"); setShowError(true); setShowSuccess(false);}
    else if(category==="Categories") {setErrMsg("Please select Valid category"); setShowError(true); setShowSuccess(false);}
    else{ 
        dispatch(
          addTodos({
            id:Math.random()*1000,
            todo:todo,
            category:category,
            complete:false
          })
          )
      setTodo("");
      setShowError(false);
      setShowSuccess(true);
      setSuccessMsg("Todo added successfully");
    }
  }
  }

  useEffect(()=>{
    const timer=setTimeout(()=>{
      showError && setShowError(false);
      showSuccess && setShowSuccess(false);
      isEditing && setIsEditing(null);
    },2000)
    return ()=>clearTimeout(timer)
  },[showError,showSuccess])

// console.log(isEditing);

  return (
    
    <div className='w-full bg-bodyColor lex flex-col gap-4'>
    
    { isEditing? (
        <div className='flex items-center gap-5 h-12'>
        <input  value={newTodo} onChange={(e) => setNewTodo(e.target.value)}    className="w-[80%] h-full px-4 py-2 overflow-hidden text-white text-base bg-bodyColor border-[1px] border-gray-700 rounded-md outline-none
        placeholder:text-gray-400 focus-visible:border-red-500 hover:border-white transition-all duration-300 ease-in-out tracking-wide "  
        placeholder='Add your task here...'
        type="text" />
        <label className='w-[70%] sm:w-[20%]    h-full relative'>
    <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}   className=' flex items-center justify-center w-full h-full text-center  outline-none bg-bodyColor border border-gray-400
    cursor-pointer rounded-md appearance-none hover:border-white focus-visible:border-red-500 '>
      {
        options.map((option, index) => {
          return <option className='text-white  text-center ' key={index} value={option.value}>{option.title}</option>
        })
      }
    </select>
    <span className='absolute right-3 top-4'><FaCaretDown></FaCaretDown></span>
  </label>
        </div>
    ):(
      <div className='flex items-center gap-5 h-12'>
      <input onChange={(e)=>setTodo(e.target.value)}  value={todo} className="w-[80%] h-full px-4 py-2 overflow-hidden text-white text-base bg-bodyColor border-[1px] border-gray-700 rounded-md outline-none
      placeholder:text-gray-400 focus-visible:border-red-500 hover:border-white transition-all duration-300 ease-in-out tracking-wide "  
      placeholder='Add your task here...'
      type="text" />
      <label className='w-[70%] sm:w-[20%]    h-full relative'>
  <select onChange={(e)=>setCategory(e.target.value)}  value={category} className=' flex items-center justify-center w-full h-full text-center  outline-none bg-bodyColor border border-gray-400
  cursor-pointer rounded-md appearance-none hover:border-white focus-visible:border-red-500 '>
    {
      options.map((option, index) => {
        return <option className='text-white  text-center ' key={index} value={option.value}>{option.title}</option>
      })
    }
  </select>
  <span className='absolute right-2 top-4'><FaCaretDown></FaCaretDown></span>
</label>
      </div>
    )

    }

        <button  onClick={handleTodo} className='w-full border mt-3 border-gray-400 hover:border-gray-200 duration-200 font-titleFont
        font-semibold text-gray-300 hover:text-red-500 h-10 uppercase rounded-md '>
          Add Todo
        </button>

        <div className='flex flex-col gap-4'>
        <ul className='grd grid-cols-1 gap-4  shadow-todoShadow mt-6 p-0 '>
            {
              todosItem.length>0? (
                <>
                 {
              todosItem.map((item)=>(
                <TodoList key={item.id} todoValue={item} setIsEditing={setIsEditing} setNewCategory={setNewCategory} setNewTodo={setNewTodo}></TodoList>
              ))
             }
                </>
              ):(
                <p className='text-center text-base text-yellow-500 font-titleFont shadow-todoShadow'>No todos added yet</p>
              )
            }
        </ul>

        {todosItem.length>0 && (
          <motion.button onClick={()=>setShowRemoveAll(true)} initial={{y:10,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.5}}
           className='w-40 h-8 text-sm font-titleFont text-orange-500 hover:text-red-500 font-semibold uppercase
           mx-auto bg-transparent border border-gray-500 hover:border-red-500 duration-300'
          > 
          Delete All Tasks</motion.button>
        )}
        </div>

        
       {
        showError? <ErrorMsg errMsg={errMsg}></ErrorMsg> : null
       }
       {
        showSuccess? <SuccessMsgToast successMsg={successMsg} ></SuccessMsgToast> : null
       }

        {
          showRemoveAll && (
            <div className='absolute top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='w-[400px] h-[200px] bg-bodyColor rounded-md shadow-todoShadow flex flex-col justify-center items-center'>
              <p className='text-white text-lg font-titleFont'>Are you sure you want to delete all tasks?</p>
              <div className='flex gap-4 mt-4'>
                <button onClick={()=>setShowRemoveAll(false)} className='w-20 h-8 bg-red-500 hover:bg-red-600 duration-300 text-white font-titleFont font-semibold rounded-md'>No</button>
                <button onClick={()=>dispatch(removeTodos()) & setShowRemoveAll(false)} className='w-20 h-8 bg-green-500 hover:bg-green-600 duration-300 text-white font-titleFont font-semibold rounded-md'>Yes</button>
              </div>
            </div>
          </div>
          )  
        }
    </div>
  )
}

export default InputBox
