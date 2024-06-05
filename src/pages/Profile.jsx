import { useSelector } from 'react-redux'
import { MdEdit, MdEmojiFoodBeverage, MdSwitchAccount } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import { MdAddLocation } from "react-icons/md";
import { Link, Outlet, matchPath, useLocation, useParams } from 'react-router-dom';
import { GiRunningShoe } from "react-icons/gi";
import { AiOutlineShoppingCart } from "react-icons/ai"
import { AiOutlineHeart } from "react-icons/ai"
import {AiFillCaretDown} from "react-icons/ai"
import { TbPassword } from "react-icons/tb";
import UpdateProfileImg from '../components/core/profile/UpdateProfileImg';
import { useState } from 'react';


const Profile = () => {
  
  const accountSetting = [
    
    {
      name : "Update Profile ",
      logo: <MdSwitchAccount/>,
      link:"/my-profile/view-profile"
    },
    {
      name : "Add Address",
      logo: <MdAddLocation/>,
      link:"/my-profile/add-address"
    },
    {
      name : "Update Password",
      logo: <TbPassword/>,
      link:"/my-profile/update-password"
    },
  ]

  

  const myStuff = [
    {
      name:"Wishlist",
      logo:<AiOutlineHeart/>,
      link:"/my-profile/wishlist"
    },
    {
      name:"Cart",
      logo:<AiOutlineShoppingCart/>,
      link:"/cart"
    },
  ]
   
  const { user } = useSelector((state) => state.profile);
  const [changeImage,setChangeImg] = useState(false);
  const location = useLocation();
  
  const matchRoute = (data) => {
    return matchPath({path:data},location.pathname)
    }

  return (
    <div className='w-[1260px] mx-auto'>
      {
        user
          ? <div className='flex flex-row gap-4'>
            <div className=' w-[30%] h-screen p-4 flex flex-col gap-3'>
              <div className='w-full  border border-black flex flex-row gap-2 p-3 '>
                <div className='  cursor-pointer ' >
                  <img onClick={() => setChangeImg(true)}
                  className='w-[60px] h-[60px] rounded-full '
                    src={user.image} />
                </div>
                <div className='p-2'>
                  <p className='text-xs'>Hello,</p>
                  <h1 className='text-xl'>{user.firstName} {user.lastName}</h1>
                </div>
              </div>
              <div className='w-full h-full border border-red-700 p-3 '>
               

                 <details className='cursor-pointer' open>
                  <summary className='flex'>
                  <div className='flex w-full flex-row gap-3 items-center justify-between mb-1 border border-black p-3 mt-4'>
                  <div className='flex w-full flex-row gap-3 items-center'>
                  <p className='text-2xl'><IoMdSettings/></p>
                  <h1 className='text-xl'>SETTINGS</h1>
                  </div>
                  <AiFillCaretDown className={`text-xl text-richblack-300`} />
                 </div>
                  </summary>

                  {
                  accountSetting.map((item,index) =>{
                    return <Link to={item.link}>
                    <div key={index} className={`flex flex-row gap-3 items-center cursor-pointer   rounded-md  p-3
                        ${matchRoute(item.link) ? "bg-slate-500 text-white" : "hover:text-slate-600"} `}>
                    <p className='text-2xl'>{item.logo}</p>
                    <h1 className=''>{item.name}</h1>
                   </div>
                    </Link>
                  })
                }
                 </details>
          
               <details className='cursor-pointer'>
                <summary className='flex'>
                <div className='flex w-full flex-row gap-3 items-center mb-1 border justify-between border-black p-3 mt-4'>
                  <div className='flex w-full flex-row gap-3 items-center'>
                  <p className='text-2xl'><GiRunningShoe/></p>
                  <h1 className='text-xl'>MY STUFF</h1>
                  </div>
                  <AiFillCaretDown className={`text-xl text-richblack-300`} />
                 </div>
                </summary>
               

                 {
                  myStuff.map((item,index) =>{
                    return <Link to={item.link}>
                    <div key={index} className={`flex flex-row gap-3 items-center cursor-pointer   rounded-md  p-3
                        ${matchRoute(item.link) ? "bg-slate-500 text-white" : "hover:text-slate-600"} `}>
                    <p className='text-2xl'>{item.logo}</p>
                    <h1 className=''>{item.name}</h1>
                   </div>
                    </Link>
                  })
                }
               </details>
               {
                changeImage && <UpdateProfileImg setChangeImg={setChangeImg}/>
               }

              </div>
            </div>
            <div className='border border-black w-[75%]  my-2 p-6 flex flex-col gap-3'>
           <Outlet  />
            </div>
          </div>
          : <div className='w-full h-full flex items-center justify-center'>Loading...</div>
      }
     
    </div>
  )
}

export default Profile
