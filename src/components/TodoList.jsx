import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { deleteTodos } from '../reduxStore/todoSlice';
import { MdWork } from "react-icons/md";
import { MdPerson2 } from "react-icons/md";
import { MdMiscellaneousServices } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";

const TodoList = ({todoValue ,setIsEditing,setNewTodo,setNewCategory}) => {
    const [marked,setMarked] =useState(false);
    const dispatch = useDispatch();
    // console.log(todoValue);

    const handleEdit =()=>{
      setIsEditing(todoValue);
      setNewTodo(todoValue.todo);
      setNewCategory(todoValue.category);
      console.log(todoValue.todo);
    }
  return (

    <motion.li initial={{y:10,capacity:0}} animate={{y:0,opacity:1}} transition={{y:{type:'spring',stiffness:120},}} 
     onClick={()=>setMarked(!marked)} className='w-full font-titleFont   ng: text-xl border border-l-[6px] rounded-md
     py-2 cursor-pointer border-green-500 flex items-center justify-between pl-3  mb-4'>
       <div className='mr-2'> {todoValue.todo}</div> {" "} 

  <div className=' flex gap-1  md:gap-4'>

   
{todoValue.category==="Business" && <MdWork></MdWork>}
{todoValue.category==="Personal" && <MdPerson2></MdPerson2>}
{todoValue.category==="Others" && <MdMiscellaneousServices></MdMiscellaneousServices>}
    

<span onClick={handleEdit} 
          className='text-xl  text-gray-300  hover:text-green-500 duration-300 cursor-pointer mr-2 ml-2'>
             
             <MdModeEditOutline ></MdModeEditOutline> 
         </span>


  <span onClick={()=>dispatch(deleteTodos(todoValue.id))} 
          className='text-xl  text-gray-300  hover:text-red-500 duration-300 cursor-pointer mr-2'>
             
            <MdDelete />
         </span>
  </div>
    </motion.li>
  )
}

export default TodoList

