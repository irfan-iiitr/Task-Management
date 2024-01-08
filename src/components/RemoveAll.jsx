import React from 'react'
import {removeTodos} from '../reduxStore/todoSlice'
import { useDispatch } from 'react-redux';

const RemoveAll = ({setShowRemoveAll}) => {
    const dispatch = useDispatch();

    const handleDeleteAll=()=>{
         dispatch(removeTodos());
         setShowRemoveAll(false);
         console.log("delete all");
    }
  return (
    <div className='absolute top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='w-[400px] h-[200px] bg-bodyColor rounded-md shadow-todoShadow flex flex-col justify-center items-center'>
              <p className='text-white text-lg font-titleFont'>Are you sure you want to delete all tasks?</p>
              <div className='flex gap-4 mt-4'>
                <button onClick={() => setShowRemoveAll(false)} className='w-20 h-8 bg-red-500 hover:bg-red-600 duration-300 text-white font-titleFont font-semibold rounded-md'>No</button>
                <button onClick={handleDeleteAll} className='w-20 h-8 bg-green-500 hover:bg-green-600 duration-300 text-white font-titleFont font-semibold rounded-md'>Yes</button>
              </div>
            </div>
          </div>
  )
}

export default RemoveAll
