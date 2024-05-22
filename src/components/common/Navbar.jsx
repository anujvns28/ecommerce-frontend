import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../../assets/logo.svg"
import { AiOutlineDown } from "react-icons/ai"
import { LiaUser } from "react-icons/lia"
import { useSelector } from 'react-redux'
import { RxHamburgerMenu } from "react-icons/rx";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { getAllCategories } from '../../service/operation/category'
import { HiArrowLongRight } from "react-icons/hi2"

const Navbar = () => {
  const { token } = useSelector((state) => state.auth)
  const [toggled, setToggled] = useState(false);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const fetchAllCategory = async () => {
    const result = await getAllCategories();
    if (result) {
      console.log()
      const category = result.categoies.filter((item)=>item.subCategorys.length>0);
      setCategories(category)
    }
  }

  useEffect(() => {
    fetchAllCategory();
  }, [])

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
            <div className="w-20 absolute  bg-slate-300  invisible left-[50%] top-[50%] z-[1000] flex  translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900  transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em]  lg:w-[300px]">
              <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-slate-300"></div>
              {
                !categories ? <div className=' flex items-center justify-center'>Loading...</div>
                  : <div >
                    {
                      categories.map((category) => {
                        return <div className='hover:bg-slate-400 anuj py-4 px-4 rounded-md relative'>
                          <div
                            className='flex justify-between '>
                            {category.categoryName}
                            <p className='text-2xl'>  <HiArrowLongRight /></p>
                          </div>
                          <div className='absolute p-4 rounded-md bg-slate-300 subCategories'>
                            {
                              category.subCategorys
                              .map((subCategory) => {
                                return <div className='hover:bg-slate-400  py-4 px-4 rounded-md relative'>
                                  {subCategory.name}
                                </div>
                              })
                            }
                          </div>
                        </div>
                      })
                    }
                  </div>
              }
            </div>
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
      <div className='absolute' style={{ display: 'flex', height: '100%', }}>
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

            {
              categories ? 
              categories.map((category) => {
                return <SubMenu label={category.categoryName}>
                       {
                        category.subCategorys
                        .map((subCategory) => {
                         return <MenuItem > {subCategory.name}</MenuItem>
                        })
                       }
                  </SubMenu>
              })
              : <div className='custom-loader'></div>
            }

            <p className='text-sm px-3 pt-2 text-black font-bold'>Pages</p>
            <MenuItem onClick={() => {
              navigate("/login")
              setToggled(false)
            }} >
              Log in
            </MenuItem>
            <MenuItem onClick={() => {
              navigate("/signup")
              setToggled(false)
            }}>
            Signup
            </MenuItem>
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
