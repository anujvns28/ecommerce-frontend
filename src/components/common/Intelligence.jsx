import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";

const Intelligence = ({searchOutputs,setSearchOutputs}) => {
    const navigate = useNavigate();

    const hanelClick = (item) => {
        navigate(`/shouse/${item._id}`);
        setSearchOutputs([]);
    }

  return (
    <div className='absolute'>
      {
        searchOutputs && 
        <div className=' py-4 z-50 rounded-lg lg:top-[50px] top-2 lg:w-[35rem] min-w-[21rem]   bg-white text-black absolute border border-black'>
           {
            searchOutputs.length == 0 ? <div className='items-center justify-center flex'>Loading..</div>
            : <div>
              {
              searchOutputs.map((item) => {
                  return <div onClick={() => hanelClick(item)}
                  className='hover:bg-slate-400 cursor-pointer'>
                     <div className='flex gap-2 flex-row items-center px-4'>
                     <p className=' font-bold  py-[1px]'><CiSearch/></p>
                     <p className=' font-bold  py-[1px] '> {item.productName.length > 30 ? item.productName.substring(0,35) + "..." : item.productName}</p>
                     </div>
                  </div>
                 
              })
          }
            </div>
           }
        </div>
      }
    </div>
  )
}

export default Intelligence
