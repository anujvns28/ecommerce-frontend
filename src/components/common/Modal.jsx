import React from 'react'
import { useNavigate } from 'react-router-dom'

const Modal = ({modalData}) => {
   
  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center overflow-auto bg-gradient-to-br  bg-opacity-60 backdrop-blur-sm">
    <div className="lg:w-[350px] w-[300px] p-8 flex flex-col gap-6 rounded-2xl shadow-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border border-transparent">
      <div>
        <p className="text-3xl font-bold">{modalData.text1}</p>
        <p className="text-base pt-4 opacity-90">{modalData.text2}</p>
      </div>
      <div className="flex flex-row gap-4 justify-end">
        <button
          className="py-3 px-6 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => modalData.handler1()}
        >
          {modalData.btn1}
        </button>
        <button
          className="py-3 px-6 rounded-lg bg-teal-400 text-black font-semibold hover:bg-teal-500 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => modalData.handler2()}
        >
          {modalData.btn2}
        </button>
      </div>
    </div>
  </div>
  
  
  )
}

export default Modal
