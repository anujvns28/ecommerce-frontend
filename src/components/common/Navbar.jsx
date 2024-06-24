import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import logo from "../../assets/logo.svg"
import { AiOutlineDown } from "react-icons/ai"
import { LiaUser } from "react-icons/lia"
import { useDispatch, useSelector } from 'react-redux'
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineShoppingCart } from "react-icons/ai"
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { getAllCategories } from '../../service/operation/category'
import { HiArrowLongRight } from "react-icons/hi2"
import { BiLogOut } from "react-icons/bi"
import { AiOutlineUser } from "react-icons/ai"
import { VscGift } from "react-icons/vsc"
import { AiOutlineHeart } from "react-icons/ai"
import { MdAdd } from "react-icons/md"
import { RxDashboard } from "react-icons/rx"
import { IoSettingsOutline } from "react-icons/io5";
import { logout } from '../../service/operation/auth'
import useGetViewPort from '../../hook/useGetViewPort'
import { getAllSubCategoriesProduct } from '../../service/operation/subCategory'
import { setFilteredProduct, setSubCategory, setTotalProduct } from '../../slice/Product'
import { setIsSellerAccount } from '../../slice/user'



const Navbar = () => {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const {cart} = useSelector((state) => state.product)
  const [toggled, setToggled] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showUserLinks, setShowUserLinks] = useState(false)
  const viewport = useGetViewPort();

  const dispatch = useDispatch();

  const userLinksRef = useRef();

  const buyerLinks = [
    {
      id: 1,
      name: viewport < 800 ? "Setting" : "My Profile",
      icon: viewport < 800 ? <IoSettingsOutline /> : <AiOutlineUser />,
      link: viewport < 800 ? "/my-profile" : "/my-profile/view-profile",
    },
    {
      id: 2,
      name: "Orders",
      icon: <VscGift />,
      link: "/orders",
    },
    {
      id: 3,
      name: "Wishlist",
      icon: <AiOutlineHeart />,
      link: "/wishlist",
    },
  ]

  const sellerLikns = [
    {
      id: 1,
      name: viewport < 800 ? "Setting" : "My Profile",
      icon: viewport < 800 ? <IoSettingsOutline /> : <AiOutlineUser />,
      link: viewport < 800 ? "/my-profile" : "/my-profile/view-profile",
    },
    {
      id: 2,
      name: "Products",
      icon: <VscGift />,
      link: "/products",
    },
    {
      id: 3,
      name: "Add Products",
      icon: <MdAdd />,
      link: "/create-product",
    },
    {
      id: 4,
      name: "Dashboard",
      icon: <RxDashboard />,
      link: "/dashboard",
    },
  ]

  const navigate = useNavigate();

  const fetchAllCategory = async () => {
    const result = await getAllCategories();
    if (result) {
      const category = result.data.filter((item) => item.subCategories.length > 0);
      setCategories(category)
    }
  }

  // close otherliks div
  window.addEventListener("click", (e) => {
    if (e.target == userLinksRef.current) {
      setShowUserLinks(true)
    } else {
      setShowUserLinks(false)
    }
  })

  const handelSubCategoryProduct = async (item) => {
    const result = await getAllSubCategoriesProduct(item._id);
    if (result) {
      dispatch(setSubCategory(result.data));
      dispatch(setFilteredProduct(result.data.product))
      dispatch(setTotalProduct(result.data.product))
      localStorage.setItem("allProduct", JSON.stringify(result.data.product))
      setToggled(false)
    }
  }

  const handleSellerAccount = () => {
     navigate("/signup")
     dispatch(setIsSellerAccount(true));
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
                              category.subCategories
                                .map((subCategory) => {
                                  return <Link to={`/products/${category._id}/${subCategory._id}`}>
                                    <div onClick={() => handelSubCategoryProduct(subCategory)}
                                      className='hover:bg-slate-400  py-4 px-4 rounded-md relative'>
                                      {subCategory.name}
                                    </div>
                                  </Link >
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


          <div onClick={handleSellerAccount}
           className='flex relative  cursor-pointer hover:text-neutral-500 items-center flex-row   justify-center '>
            <p className='text-2xl font-bold '><LiaUser /></p>
            <p>{user ? user.accountType === "Buyer" ? "Become Seller" : "Seller Account" : "Become Seller"}</p>
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
             {/* cart */}
            {
              token && <p className='text-2xl'>
                {
                  cart.length > 0 ? <div className='w-5 h-5 bg-red-500 rounded-full absolute -top-1 left-3'>
                    <p className='text-white text-xs flex items-center justify-center'> {cart.length}</p>
                  </div>
                    : ""
                }
                {
                  user.accountType === "Seller" ? ""
                    : <Link to={"/cart"}> <AiOutlineShoppingCart /></Link>
                }
              </p>
            }

            {
              user && <div>
                <div onClick={() => setShowUserLinks(!showUserLinks)}
                  className='w-[35px] h-[35px] object-cover cursor-pointer rounded-full '>
                  <img ref={userLinksRef}
                    className='rounded-full w-[35px] h-[35px] object-cover' src={user.image} />
                </div>

                {/* links */}
                {
                  showUserLinks &&
                  <div
                    className='relative w-full  -translate-x-[130px] z-50 hidden lg:block '>
                    {
                      user.accountType === "Buyer"
                        ? <div className='p-3 rounded-md bg-slate-400 absolute z-50 w-[150px]'>
                          {
                            buyerLinks.map((links) => {
                              return <Link to={links.link} >
                                <div onClick={() => setShowUserLinks(!showUserLinks)}
                                  className='flex flex-row gap-2 p-2 items-center justify-start hover:bg-slate-500 rounded-md'
                                  key={links.id}
                                >
                                  <p>{links.name}</p>
                                  <p>{links.icon}</p>
                                </div>
                              </Link>
                            })
                          }
                          <div onClick={() => logout(dispatch, navigate)}
                            className='flex flex-row gap-2 p-2 items-center justify-start hover:bg-slate-400 rounded-md'>
                            <p>Logout</p>
                            <p><BiLogOut /></p>
                          </div>
                        </div>
                        : <div>
                          {
                            <div className='p-3 rounded-md bg-slate-300 absolute z-50 w-[170px]'>
                              {
                                sellerLikns.map((links) => {
                                  return <Link to={links.link}>
                                    <div onClick={() => setShowUserLinks(!showUserLinks)}
                                      className='flex flex-row gap-2 p-2 items-center justify-start hover:bg-slate-400 rounded-md'
                                      key={links.id}>
                                      <p>{links.name}</p>
                                      <p>{links.icon}</p>
                                    </div>
                                  </Link>
                                })
                              }
                              <div onClick={() => logout(dispatch, navigate)}
                                className='flex flex-row gap-2 p-2 items-center justify-start hover:bg-slate-400 rounded-md'>
                                <p>Logout</p>
                                <p><BiLogOut /></p>
                              </div>
                            </div>

                          }
                        </div>
                    }
                  </div>
                }
              </div>
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
          {/* mobile  cart  */}

          {
            token && <p className='text-2xl'>
              {
                cart.length > 0 ? <div className='w-5 h-5 bg-red-500 rounded-full absolute z-20 -translate-y-3 translate-x-2'>
                  <p className='text-white text-xs flex items-center justify-center'> {cart.length}</p>
                </div>
                  : ""
              }
              {
                user.accountType === "Seller" ? ""
                  : <Link to={"/cart"}>
                    <p className='relative'> <AiOutlineShoppingCart /></p>
                  </Link>
              }
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
                      category.subCategories
                        .map((subCategory) => {
                          return <Link to={`/products/${category._id}/${subCategory._id}`}>
                            <MenuItem onClick={() => handelSubCategoryProduct(subCategory)}
                            > {subCategory.name}</MenuItem>
                          </Link>
                        })
                    }
                  </SubMenu>
                })
                : <div className='custom-loader'></div>
            }

            <p className='text-sm px-3 pt-2 text-black font-bold'>Pages</p>

            {
              token ?
                <div>
                  {
                    user.accountType === "Buyer" ?
                      buyerLinks.map((links) => {
                        return <MenuItem>
                          <Link to={links.link}>
                            <div onClick={() => setToggled(false)}
                              className='flex flex-row gap-2 p-2 items-center justify-start hover:bg-slate-500 rounded-md'
                              key={links.id}
                            >
                              <p>{links.name}</p>
                              <p>{links.icon}</p>
                            </div>
                          </Link>
                        </MenuItem>
                      })

                      : sellerLikns.map((links) => {
                        return <MenuItem>
                          <Link to={links.link}>
                            <div onClick={() => setToggled(false)}
                              className='flex flex-row gap-2 p-2 items-center justify-start hover:bg-slate-400 rounded-md'
                              key={links.id}>
                              <p>{links.name}</p>
                              <p>{links.icon}</p>
                            </div>
                          </Link>
                        </MenuItem>
                      })

                  }
                </div>
                :
                <div>
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
                </div>
            }

            {
              token && <div>
                <p className='text-sm px-3 pt-2 text-black font-bold'>My Stuf</p>
                <Link to={'/cart'} onClick={() => setToggled(false)}> <MenuItem>Cart</MenuItem></Link>
                <Link to={'/wishlist'} onClick={() => setToggled(false)}> <MenuItem>Wishlist</MenuItem></Link>
              </div>
            }

            {
              token && <MenuItem onClick={() => {
                logout(dispatch, navigate)
                setToggled(false)
              }}
                className='text-center  '>
                <div className='rounded-md bg-black text-white py-2 '>
                  Logout
                </div>
              </MenuItem>
            }
          </Menu>
        </Sidebar>
      </div>
    </div>
  )
}

export default Navbar
