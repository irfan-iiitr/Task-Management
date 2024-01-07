import React from 'react'
import {motion} from "framer-motion"


const ErrorMsg = ({errMsg}) => {
  return (
    <motion.div  initial={{y:-20,opacity:0}} animate={{y:0,opacity:1}} transition={{y:{type:'spring',stiffness:120},}}
    
    className=' border-red-500 text-red-500 absolute shadow-todoShadow font-titleFont tracking-wide font-medium
    text-lg top-2 left-[30%] md:left-[40%] bg-bodyColor  md:px-10 md:py-4 rounded-sm border-b-4 '>
         <p className='text-white'>{errMsg}</p>
    </motion.div>
  )
}

export default ErrorMsg
