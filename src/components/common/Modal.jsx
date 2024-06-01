import React from 'react'
import { useNavigate } from 'react-router-dom'

const Modal = ({modalData}) => {
   
  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
     <div className='flex w-[350px] py-7 flex-col rounded-md gap-4 bg-slate-500 text-white border border-black p-5'>
     <div className=''>
     <p className='text-2xl font-semibold '>{modalData.text1}</p>
      <p className='text-xm pt-2'>{modalData.text2}</p>
     </div>
      <div className='flex flex-row gap-3'>
        <button className='py-2 px-4 rounded-md bg-yellow-400 text-black '
        onClick={() => modalData.handler1()}>{modalData.btn1}</button>
        <button className='py-2 px-4 rounded-md bg-slate-300 text-black '
        onClick={() => modalData.handler2()}>{modalData.btn2}</button>
      </div>
     </div>

    </div>
  )
}

export default Modal
