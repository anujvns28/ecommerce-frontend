import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/logo.svg"
import { AiOutlineDown } from "react-icons/ai"
import { LiaUser } from "react-icons/lia"
import { useSelector } from 'react-redux'
import { RxHamburgerMenu } from "react-icons/rx";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

const Navbar = () => {
  const { token } = useSelector((state) => state.auth)
  const [toggled, setToggled] = useState(false);

  return (
    <div className='border-b border-blue-100 nav-shadow py-1'>
      <div className='flex flex-row items-center justify-between h-20 w-11/12 mx-auto ' >

        <Link to={"/"}>
          <div className='flex flex-col  items-center justify-center'>
            <img width={70} src={logo} />
            <h1 className='text-2xl  font-semibold text-blue-500'>shouseDekho.com</h1>
          </div>
        </Link>

        <div className='hidden xl:flex flex-row gap-10 w-10/12 justify-between px-4'>

          <input
            placeholder="Search For Product, Brands By Name"
            class="w-full max-w-[40rem] h-10 py-1 relative rounded-md bg-slate-300 flex items-center justify-center border border-solid px-5 outline-none sm:w-3/4 md:w-3/5 lg:w-1/2"
          />

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
              !token && <p className='hover:text-neutral-500 leading-snug'>
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
        {/* mobile device */}
        <div className='xl:hidden flex flex-row gap-4 items-center justify-center'>
        {
          !token && <p className='hover:text-neutral-500 text-black'>
                <Link to={"/login"}> Log in
                </Link>
              </p>
            }

          <p onClick={() => setToggled(!toggled)} 
          className='text-2xl cursor-pointer'><RxHamburgerMenu /></p>
        </div>

      </div>
      {/* mobile device serach box */}
      <div className='w-11/12 mx-auto xl:hidden block'>
        <input
          placeholder="Search For Product ,Brands By Name"
          className='w-full h-10 py-1 relative  rounded-md bg-slate-300 flex  items-center justify-centere border border-solid px-5 outline-none'
        />
      </div>
     {/* mobilnav */}
      <div className='absolute'  style={{ display: 'flex', height: '100%', }}>
      <Sidebar backgroundColor='white'
       onBackdropClick={() => setToggled(false)} toggled={toggled} breakPoint="always">

        <Link to={"/"}>
          <div className='flex py-4 border-b flex-col  items-center justify-center'>
            <img width={70} src={logo} />
            <h1 className='text-2xl  font-semibold text-blue-500'>shouseDekho.com</h1>
          </div>
        </Link>

        <Menu>
          <p className='text-sm px-3 pt-2 text-black font-bold'>Categories</p>
          <SubMenu  label="Charts">
                <MenuItem > Pie charts</MenuItem>
                <MenuItem> Line charts</MenuItem>
                <MenuItem> Bar charts</MenuItem>
              </SubMenu>
              <SubMenu label="Maps">
                <MenuItem> Google maps</MenuItem>
                <MenuItem> Open street maps</MenuItem>
              </SubMenu>
              <SubMenu label="Theme">
                <MenuItem> Dark</MenuItem>
                <MenuItem> Light</MenuItem>
              </SubMenu>
          <p className='text-sm px-3 pt-2 text-black font-bold'>Pages</p>    
          <MenuItem>Log in</MenuItem>
          <MenuItem>Signup</MenuItem>
          <p className='text-sm px-3 pt-2 text-black font-bold'>My Stuf</p>
          <MenuItem>Cart</MenuItem>
          <MenuItem>Wishlist</MenuItem>
        </Menu>
      </Sidebar>
    </div>
    </div>
  )
}

export default Navbar
