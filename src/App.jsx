
import './App.css'

import InputBox from './components/InputBox.jsx'

function App() {


  return (
    <div className='w-full min-h-screen pt-4 font-bodyFont text-white px-4 flex flex-col gap-10 justify-center items-center'>
      {/* <h1 className="text-3xl font-bold text-red-500 underline text-center">Hello world!</h1>  */}
      <div className='w-[350px]  md:w-[850px] h-full  bg-bodyColor p-10 flex flex-col gap-10'>
      <InputBox></InputBox>
      </div>
    </div>
  )
}

export default App
