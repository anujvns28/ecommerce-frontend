import React from 'react'

const SubCategoryCard = ({item}) => {
  return (
    <div className='drop-shadow-lg p-3 mb-4 rounded-xl bg-white    group transition-all duration-800 '>
      
    <div className=' flex justify-center w-full items-center bg-slate-100 border-b rounded-lg '>  
    <img className=' object-cover rounded-t-md h-[250px] w-[250px] lg:h-[350px] lg:w-[400px] border' 
    src={item.image} />
    </div>
    <div className="flex flex-col gap-2 px-1 py-3  mt-1 items-center rounded-md ">
          <p className="text-xl font-semibold text-richblack-5 italic">{item.name}</p>
    </div>
     
    </div>
  )
}

export default SubCategoryCard
