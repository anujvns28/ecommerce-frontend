import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/logo.svg"
import {AiOutlineDown} from "react-icons/ai"
import {LiaUser} from "react-icons/lia"
import { useSelector } from 'react-redux'
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
    const {token} = useSelector((state) => state.auth)
  return (
    <div className='border-b border-blue-100 nav-shadow'>
      <div className='flex flex-row items-center justify-between h-20 w-11/12 mx-auto ' >

      <Link to={"/"}>
      <div className='flex flex-col  items-center justify-center'>
        <img width={70} src={logo} />
        <h1 className='text-2xl  font-semibold text-blue-500'>shouseDekho.com</h1>
       </div>
      </Link>

       <div className='hidden xl:flex flex-row gap-10 w-10/12 justify-between px-4'>
       <div className=''>
       <input
          placeholder="Search For Product ,Brands By Name"
          className='w-[650px] h-10 py-1 relative  rounded-md bg-slate-300 flex  items-center justify-centere border border-solid px-5 outline-none'
        />
       </div>

       <div className='flex relative group cursor-pointer items-center flex-row gap-1  justify-center '>
                <p>Categories</p>
                <AiOutlineDown />
        </div>  

        <div className='flex relative  cursor-pointer hover:text-neutral-500 items-center flex-row   justify-center '>
        <p className='text-2xl font-bold '><LiaUser /></p>
        <p>Become Seller</p>
        </div>

        <div className='flex gap-2  items-center relative'>
        {
            !token && <p className='hover:text-neutral-500'>
              <Link to={"/login"}> Log in
              </Link>
            </p>
          }
          {
            !token && <p className='bg-blue-500 hover:bg-blue-700 font-bold text-white px-4 py-2 rounded-full'>
              <Link to={"/signup"}> sign up
              </Link>
            </p>
          }
        </div> 
        </div>

        <div className='xl:hidden block'>
          <p className='text-2xl'><RxHamburgerMenu/></p>
          </div>     

    </div>
    </div>
  )
}

export default Navbar
